package userservice

import (
	"context"
	"net/http"
	"se_tools/models/appUser"
	"se_tools/repository"
	"se_tools/utils"
	"time"

	"github.com/pascaldekloe/jwt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	db         repository.DbRepository
	collection repository.Collection
	utils      utils.Utilities
}

func (u *UserService) adminuser() (appUser.AdminUser, error) {

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

	return superUser, nil
}

func (u *UserService) ComparePassword(password string, hash string) error {

	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
}

func (u *UserService) cookie(token string) (http.Cookie, error) {

	var cookie http.Cookie

	cookie.Name = "yeomantoken"
	cookie.Value = token
	cookie.Expires = time.Now().Add(time.Hour * 8)
	cookie.HttpOnly = true
	cookie.Secure = false

	return cookie, nil

}

func (u *UserService) CreateAdminUser(ctx context.Context, roles []primitive.ObjectID) error {

	adminUser, err := u.adminuser()

	if err != nil {
		return err
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

	user := appUser.User{

		Username:      adminUser.Username,
		FirstName:     adminUser.FirstName,
		LastName:      adminUser.LastName,
		Email:         adminUser.Email,
		PublicId:      publicId,
		Password:      hash,
		ResetPassword: false,
		Active:        true,
		Locked:        false,
		LoginAttempts: 0,
		Roles:         roles,
		Token:         "",
		CsrfToken:     "",
		LastSeen:      now,
		LastLogin:     now,
		CreatedAt:     now,
		UpdatedAt:     now,
	}

	_, err = collection.InsertOne(ctx, user)

	if err != nil {
		return err
	}

	return nil

}

func (u *UserService) createPassword(password string) (string, error) {

	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if err != nil {
		return "", err
	}

	return string(hash), nil
}

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

func (u *UserService) setCookieHandler(w http.ResponseWriter, cookie http.Cookie) {

	http.SetCookie(w, &cookie)

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

func (u *UserService) UserLogin(w http.ResponseWriter, token string) error {

	cookie, err := u.cookie(token)

	if err != nil {
		return err
	}

	u.setCookieHandler(w, cookie)

	return nil

}
