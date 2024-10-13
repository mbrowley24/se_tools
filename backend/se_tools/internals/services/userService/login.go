package userservice

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"os"
	"se_tools/internals/models/appUser"
	"se_tools/internals/models/roles"
	"se_tools/utils"
	"strings"
	"time"

	"github.com/pascaldekloe/jwt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

type LoginService struct {
	Collection *mongo.Collection
	Ctx        context.Context
	utils      utils.Utilities
}

func (l *LoginService) Login(w http.ResponseWriter, r *http.Request) {

	var userCredentials appUser.Credentials

	//decode request body
	err := json.NewDecoder(r.Body).Decode(&userCredentials)

	//check for errors for decoding
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	//check if username exists if user not found return 403 error
	user, err := l.findByUsername(l.Ctx, userCredentials.Username)

	if err != nil {
		println("cannot find user")
		println(err.Error())
		invalid := errors.New("invalid username/password")

		http.Error(w, invalid.Error(), http.StatusForbidden)
		return
	}

	//compare password for a match if not return 403 error
	err = l.comparePassword(userCredentials.Password, user.Password)

	if err != nil {
		println("passwords do not match")
		println(err.Error())
		invalid := errors.New("invalid username/password")

		http.Error(w, invalid.Error(), http.StatusForbidden)
		return
	}

	//generate token
	token, err := l.GenerateJWT(l.Ctx, user)

	if err != nil {
		internalError := errors.New("internal server error")
		http.Error(w, internalError.Error(), http.StatusInternalServerError)
		return
	}

	//create and set cookie
	cookie, err := l.cookie(token)

	if err != nil {
		internalError := errors.New("internal server error")
		http.Error(w, internalError.Error(), http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &cookie)

	err = l.utils.WriteJSON(w, http.StatusOK, "", "Login successful")

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

// AdminUser admin user gets the admin user from the environment variables
func (l *LoginService) adminUser(role roles.Role) (appUser.AdminUser, error) {

	var superUser appUser.AdminUser

	username := os.Getenv("ADMIN_USERNAME")

	superUser.Username = username

	firstName := os.Getenv("ADMIN_FIRSTNAME")

	superUser.FirstName = firstName

	lastName := os.Getenv("ADMIN_LASTNAME")

	superUser.LastName = lastName

	email := os.Getenv("ADMIN_EMAIL")

	superUser.Email = email

	password := os.Getenv("ADMIN_PASSWORD")

	superUser.Password = password

	superUser.Roles = append(superUser.Roles, role)

	return superUser, nil
}

// ComparePassword compares a password with a hash
func (l *LoginService) comparePassword(password string, hash string) error {

	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
}

// Cookie creates a cookie
func (l *LoginService) cookie(token string) (http.Cookie, error) {

	var cookie http.Cookie

	cookie.Name = "yeoman token"
	cookie.Value = token
	cookie.Expires = time.Now().Add(time.Hour * 8)
	cookie.HttpOnly = true
	cookie.Secure = false

	return cookie, nil

}

// CreateAdminUser creates an admin user
func (l *LoginService) createAdminUser(role roles.Role) error {

	adminUser, err := l.adminUser(role)

	if err != nil {
		return err
	}

	exists, err := l.existsByUsername(adminUser.Username)

	if err != nil {
		return err
	}

	if exists {
		return nil
	}

	hash, err := l.createPassword(adminUser.Password)

	if err != nil {
		return err
	}

	publicId, err := l.generatePublicId()

	if err != nil {
		return err
	}

	now := time.Now()

	user := appUser.User{
		ID:            primitive.NewObjectID(),
		Username:      adminUser.Username,
		FirstName:     adminUser.FirstName,
		LastName:      adminUser.LastName,
		Email:         adminUser.Email,
		PublicId:      publicId,
		Password:      hash,
		ResetPassword: false,
		Active:        true,
		Locked:        false,
		LastLogin:     now,
		LoginAttempts: 0,
		Roles:         adminUser.Roles,
		OAuth:         "",
		Token:         "",
		CsrfToken:     "",
		LastSeen:      now,
		UpdatedAt:     now,
		CreatedAt:     now,
	}

	if _, err = l.Collection.InsertOne(l.Ctx, user); err != nil {
		return err
	}

	return nil

}

// createPassword creates a password hash
func (l *LoginService) createPassword(password string) (string, error) {

	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if err != nil {
		return "", err
	}

	return string(hash), nil
}

// existsByUsername checks if a user exists by username
func (l *LoginService) existsByUsername(username string) (bool, error) {

	filter := bson.M{"username": username}

	count, err := l.Collection.CountDocuments(l.Ctx, filter)

	if err != nil {
		return false, err
	}

	return count > 0, nil
}

// existsByPublicId checks if a user exists by public id
func (l *LoginService) existsByPublicId(ctx context.Context, publicId string) (bool, error) {

	exists := false

	filter := bson.M{"public_id": publicId}

	count, err := l.Collection.CountDocuments(l.Ctx, filter)

	if err != nil {
		return false, err
	}

	if count > 0 {

		exists = true
		return exists, nil
	}

	return exists, nil

}

func (l *LoginService) FilterById(id primitive.ObjectID) bson.M {

	return bson.M{"_id": id}
}

// FindUserByToken finds a user by token
func (l *LoginService) findUserByIdString(ctx context.Context, idString string) (appUser.User, error) {

	var user appUser.User

	//get object id from claims and check for error
	id, err := primitive.ObjectIDFromHex(idString)

	if err != nil {
		return user, err

	}

	//filter by public id
	filter := l.FilterById(id)

	//find user decode and check for error
	if err = l.Collection.FindOne(l.Ctx, filter).Decode(&user); err != nil {

		return user, err
	}

	return user, nil

}

// FindByUsername finds a user by username
func (l *LoginService) findByUsername(ctx context.Context, username string) (appUser.User, error) {

	var user appUser.User

	if err := l.Collection.FindOne(ctx, bson.M{"username": username}).Decode(&user); err != nil {
		return user, err
	}

	return user, nil

}

func (l *LoginService) generatePublicId() (string, error) {

	publicId := l.utils.RandomStringGenerator(30)

	exists, err := l.existsByPublicId(context.Background(), publicId)

	if err != nil {
		return "", err
	}

	for exists {

		publicId = l.utils.RandomStringGenerator(30)

		exists, err = l.existsByPublicId(context.Background(), publicId)

		if err != nil {
			return "", err
		}
	}

	return publicId, nil

}

// get Author name from user
func (l *LoginService) GetAuthorName(user appUser.User) string {

	//get use (Author) first and last name and capitalize first letter of first and last name
	firstName := strings.ToUpper(user.FirstName[0:1]) + strings.ToLower(user.FirstName[1:])
	lastName := strings.ToUpper(user.LastName[0:1]) + strings.ToLower(user.LastName[1:])

	return firstName + " " + lastName

}

func (l *LoginService) getCookie(r *http.Request) (*http.Cookie, error) {

	cookie, err := r.Cookie("yeomantoken")

	if err != nil {
		return nil, err
	}

	return cookie, nil

}

func (l *LoginService) getObjectId(id string) (primitive.ObjectID, error) {

	objectId, err := primitive.ObjectIDFromHex(id)

	if err != nil {

		return primitive.NilObjectID, err

	}

	return objectId, nil

}

func (l *LoginService) SetCookieHandler(w http.ResponseWriter, cookie *http.Cookie) {

	http.SetCookie(w, cookie)

}

// internal function to sign in a user
func (l *LoginService) GenerateJWT(ctx context.Context, user appUser.User) (string, error) {
	//claims container
	var claims jwt.Claims

	//find user by username

	claims.Subject = user.ID.Hex()
	claims.Issued = jwt.NewNumericTime(time.Now())
	claims.NotBefore = jwt.NewNumericTime(time.Now())
	claims.Expires = jwt.NewNumericTime(time.Now().Add(time.Hour * 8))
	claims.Issuer = "theaveragese.com"
	claims.Audiences = []string{"theaveragese.com"}

	jwtSecret := os.Getenv("JWT_SECRET")

	if len(jwtSecret) == 0 {
		return "", errors.New("internal server error")
	}

	token, err := claims.HMACSign(jwt.HS256, []byte(jwtSecret))

	if err != nil {
		return "", err
	}

	return string(token), nil

}

// get claims from token
func (l *LoginService) getClaims(token string) (*jwt.Claims, error) {

	jwtSecret := os.Getenv("JWT_SECRET")

	if len(jwtSecret) == 0 {
		return nil, errors.New("internal server error")
	}

	claims, err := jwt.HMACCheck([]byte(token), []byte(jwtSecret))

	if err != nil {
		println("error checking token")
		return nil, err
	}

	return claims, nil
}

// CookieValid Check if cookie is still valid
func (l *LoginService) CookieValid(cookie *http.Cookie) error {

	now := time.Now()

	isAfter := cookie.Expires.After(now)

	if isAfter {
		println("cookie expired")
		return errors.New("token expired")
	}

	return nil
}

func (l *LoginService) ValidateTokenAndGetClaims(r *http.Request) (*jwt.Claims, error) {

	//get cookie from request and check for error
	cookie, err := l.getCookie(r)

	if err != nil {
		println("error getting cookie")
		return nil, err
	}

	//check if cookie is still valid
	err = l.CookieValid(cookie)

	if err != nil {
		println("cookie not valid")
		return nil, err
	}

	token := cookie.Value

	claims, err := l.getClaims(token)

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
