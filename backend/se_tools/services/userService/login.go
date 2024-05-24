package userservice

import (
	"context"
	"errors"
	"net/http"
	"se_tools/models/appUser"
	"se_tools/repository"
	"se_tools/utils"
	"strings"
	"time"

	"github.com/pascaldekloe/jwt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	db         repository.DbRepository
	collection repository.Collection
	utils      utils.Utilities
}

// adminuser gets the admin user from the environment variables
func (u *UserService) adminuser(roleId primitive.ObjectID) (appUser.AdminUser, error) {

	var superUser appUser.AdminUser

	username, err := u.utils.Env("ADMIN_USERNAME")

	if err != nil {

		return superUser, err
	}

	superUser.Username = username

	firstName, err := u.utils.Env("ADMIN_FIRSTNAME")

	if err != nil {

		return superUser, err
	}

	superUser.FirstName = firstName

	lastName, err := u.utils.Env("ADMIN_LASTNAME")

	if err != nil {
		return superUser, err
	}

	superUser.LastName = lastName

	email, err := u.utils.Env("ADMIN_EMAIL")

	if err != nil {

		return superUser, err

	}

	superUser.Email = email

	password, err := u.utils.Env("ADMIN_PASSWORD")

	if err != nil {
		return superUser, err
	}

	superUser.Password = password

	superUser.Roles = []primitive.ObjectID{roleId}

	return superUser, nil
}

// ComparePassword compares a password with a hash
func (u *UserService) ComparePassword(password string, hash string) error {

	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
}

// Cookie creates a cookie
func (u *UserService) Cookie(token string) (http.Cookie, error) {

	var cookie http.Cookie

	cookie.Name = "yeomantoken"
	cookie.Value = token
	cookie.Expires = time.Now().Add(time.Hour * 8)
	cookie.HttpOnly = true
	cookie.Secure = false

	return cookie, nil

}

// CreateAdminUser creates an admin user
func (u *UserService) CreateAdminUser(ctx context.Context, roleId primitive.ObjectID) error {

	adminUser, err := u.adminuser(roleId)

	if err != nil {
		return err
	}

	exists, err := u.existsByUsername(ctx, adminUser.Username)

	if err != nil {
		return err
	}

	if exists {
		return nil
	}

	hash, err := u.createPassword(adminUser.Password)

	if err != nil {
		return err
	}

	db, err := u.db.Database(ctx)

	if err != nil {
		return err
	}

	publicId, err := u.generatePublicId()

	if err != nil {
		return err
	}

	collection := db.Collection(u.collection.Users())
	now := time.Now()

	user := bson.M{

		"username":       adminUser.Username,
		"first_name":     adminUser.FirstName,
		"last_name":      adminUser.LastName,
		"email":          adminUser.Email,
		"public_id":      publicId,
		"password":       hash,
		"reset_password": false,
		"active":         true,
		"locked":         false,
		"login_attempts": 0,
		"roles":          adminUser.Roles,
		"oAuth":          "",
		"token":          "",
		"csrf_token":     "",
		"last_seen":      now,
		"last_login":     now,
		"created_at":     now,
		"updated_at":     now,
	}

	_, err = collection.InsertOne(ctx, user)

	if err != nil {
		return err
	}

	return nil

}

// createPassword creates a password hash
func (u *UserService) createPassword(password string) (string, error) {

	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if err != nil {
		return "", err
	}

	return string(hash), nil
}

// existsByUsername checks if a user exists by username
func (u *UserService) existsByUsername(ctx context.Context, username string) (bool, error) {

	db, err := u.db.Database(ctx)

	if err != nil {
		return false, err
	}

	collection := db.Collection(u.collection.Users())

	filter := bson.M{"username": username}

	count, err := collection.CountDocuments(ctx, filter)

	if err != nil {
		return false, err
	}

	return count > 0, nil
}

// existsByPublicId checks if a user exists by public id
func (u *UserService) existsByPublicId(ctx context.Context, publicId string) (bool, error) {

	exists := false

	db, err := u.db.Database(ctx)

	if err != nil {
		return false, err
	}

	collection := db.Collection(u.collection.Users())

	filter := bson.M{"public_id": publicId}

	count, err := collection.CountDocuments(ctx, filter)

	if err != nil {
		return false, err
	}

	if count > 0 {

		exists = true
		return exists, nil
	}

	return exists, nil

}

func (u *UserService) FilterById(id primitive.ObjectID) bson.M {

	return bson.M{"_id": id}
}

// FindUserByToken finds a user by token
func (u *UserService) FindUserByIdString(ctx context.Context, db *mongo.Database, idString string) (appUser.User, error) {

	var user appUser.User

	//get collection for users
	collection := db.Collection(u.collection.Users())

	//get object id from claims and check for error
	id, err := primitive.ObjectIDFromHex(idString)

	if err != nil {
		return user, err

	}

	//filter by public id
	filter := u.FilterById(id)
	//find user decode and check for error
	err = collection.FindOne(ctx, filter).Decode(&user)

	if err != nil {

		return user, err
	}

	println(user.FirstName)
	return user, nil

}

// FindUserId finds a user by id
func (u *UserService) FindUserById(ctx context.Context, db *mongo.Database, id primitive.ObjectID) (appUser.User, error) {

	var user appUser.User

	collection := db.Collection(u.collection.Users())

	filter := bson.M{"_id": id}

	err := collection.FindOne(ctx, filter).Decode(&user)

	if err != nil {
		return user, err
	}

	return user, nil
}

// FindByUsername finds a user by username
func (u *UserService) FindByUsername(ctx context.Context, username string) (appUser.User, error) {

	var user appUser.User

	db, err := u.db.Database(ctx)

	if err != nil {
		return user, err
	}

	collection := db.Collection(u.collection.Users())

	filter := bson.M{"username": username}

	err = collection.FindOne(ctx, filter).Decode(&user)

	if err != nil {
		return user, err
	}

	return user, nil

}

func (u *UserService) generatePublicId() (string, error) {

	publicId := u.utils.RandomStringGenerator(30)

	exists, err := u.existsByPublicId(context.Background(), publicId)

	if err != nil {
		return "", err
	}

	for exists {

		publicId = u.utils.RandomStringGenerator(30)

		exists, err = u.existsByPublicId(context.Background(), publicId)

		if err != nil {
			return "", err
		}
	}

	return publicId, nil

}

// get Author name from user
func (u *UserService) GetAuthorName(user appUser.User) string {

	//get use (Author) first and last name and capitalize first letter of first and last name
	firstName := strings.ToUpper(user.FirstName[0:1]) + strings.ToLower(user.FirstName[1:])
	lastName := strings.ToUpper(user.LastName[0:1]) + strings.ToLower(user.LastName[1:])

	return firstName + " " + lastName

}

func (u *UserService) getCookie(r *http.Request) (*http.Cookie, error) {

	cookie, err := r.Cookie("yeomantoken")

	if err != nil {
		return nil, err
	}

	return cookie, nil

}

func (u *UserService) getObjectId(id string) (primitive.ObjectID, error) {

	objectId, err := primitive.ObjectIDFromHex(id)

	if err != nil {

		return primitive.NilObjectID, err

	}

	return objectId, nil

}

func (u *UserService) SetCookieHandler(w http.ResponseWriter, cookie *http.Cookie) {

	http.SetCookie(w, cookie)

}

// internal function to sign in a user
func (u UserService) GenerateJWT(ctx context.Context, user appUser.User) (string, error) {
	//claims container
	var claims jwt.Claims

	//find user by username

	claims.Subject = user.ID.Hex()
	claims.Issued = jwt.NewNumericTime(time.Now())
	claims.NotBefore = jwt.NewNumericTime(time.Now())
	claims.Expires = jwt.NewNumericTime(time.Now().Add(time.Hour * 8))
	claims.Issuer = "theaveragese.com"
	claims.Audiences = []string{"theaveragese.com"}

	jwtSecret, err := u.utils.Env("JWT_SECRET")

	if err != nil {
		return "", err
	}

	token, err := claims.HMACSign(jwt.HS256, []byte(jwtSecret))

	if err != nil {
		return "", err
	}

	return string(token), nil

}

// get claims from token
func (u *UserService) getClaims(token string) (*jwt.Claims, error) {

	jwtSecret, err := u.utils.Env("JWT_SECRET")

	// println(jwtSecret)
	if err != nil {
		return nil, err
	}

	claims, err := jwt.HMACCheck([]byte(token), []byte(jwtSecret))

	if err != nil {
		println("error checking token")
		return nil, err
	}

	return claims, nil
}

// Check if cookie is still valid
func (u *UserService) CookieStillValid(cookie *http.Cookie) error {

	now := time.Now()

	isAfter := cookie.Expires.After(now)

	if isAfter {
		println("cookie expired")
		return errors.New("token expired")
	}

	return nil
}

func (u *UserService) ValidateTokenAndGetClaims(r *http.Request) (*jwt.Claims, error) {

	//get cookie from request and check for error
	cookie, err := u.getCookie(r)

	if err != nil {
		println("error getting cookie")
		return nil, err
	}

	//check if cookie is still valid
	err = u.CookieStillValid(cookie)

	if err != nil {
		println("cookie not valid")
		return nil, err
	}

	token := cookie.Value

	claims, err := u.getClaims(token)

	if err != nil {
		println("error getting claims")
		return nil, err
	}

	if !claims.Valid(time.Now()) {
		return nil, errors.New("token not valid")
	}

	if !claims.AcceptAudience("theaveragese.com") {
		return nil, errors.New("invalid audience")
	}

	if claims.Issuer != "theaveragese.com" {
		return nil, errors.New("invalid issuer")
	}

	return claims, nil
}
