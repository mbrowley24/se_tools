package userservice

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
	"os"
	"se_tools/internals/models/appUser"
	"se_tools/internals/models/roles"
	"se_tools/utils"
	"time"
)

type LoginService struct {
	collection *mongo.Collection
	utils      *utils.Utilities
}

func Start(collection *mongo.Collection, utils *utils.Utilities) *LoginService {

	return &LoginService{
		collection: collection,
		utils:      utils,
	}
}

func (l *LoginService) AdminUser(role roles.Role) error {

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	userName := os.Getenv("ADMIN_USERNAME")
	firstName := os.Getenv("ADMIN_FIRSTNAME")
	lastName := os.Getenv("ADMIN_LASTNAME")
	email := os.Getenv("ADMIN_EMAIL")
	password := os.Getenv("ADMIN_PASSWORD")

	count, err := l.collection.CountDocuments(ctx, bson.M{"username": userName})
	if err != nil {
		return err
	}

	if count > 0 {
		return nil
	}

	hashPw, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if err != nil {
		return err
	}

	publicId := l.utils.RandomStringGenerator(30)

	for {

		filter := bson.M{"public_id": publicId}

		count, err := l.collection.CountDocuments(ctx, filter)

		if err != nil {
			return err
		}

		if count == 0 {
			break
		}

		publicId = l.utils.RandomStringGenerator(30)
	}

	location, err := time.LoadLocation("America/Denver")

	if err != nil {
		return err
	}

	now := time.Now().In(location)
	admin := appUser.User{
		PublicId:      publicId,
		Username:      userName,
		FirstName:     firstName,
		LastName:      lastName,
		Email:         email,
		ResetPassword: false,
		Active:        true,
		Locked:        false,
		LoginAttempts: 0,
		Roles:         role,
		Password:      string(hashPw),
		OAuth:         "",
		Token:         "",
		Offset:        "America/Denver",
		CsrfToken:     "",
		LastSeen:      now,
		LastLogin:     now,
		CreatedAt:     now,
		UpdatedAt:     now,
	}

	if _, err = l.collection.InsertOne(ctx, admin); err != nil {
		return err
	}

	return nil

}
