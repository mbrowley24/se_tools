package initservice

import (
	"context"
	"errors"
	"path/filepath"
	"se_tools/repository"
	authoritiesservice "se_tools/services/authoritiesService"
	categoryservice "se_tools/services/categoryService"
	industryservice "se_tools/services/industryService"
	roleservices "se_tools/services/roleServices"
	userservice "se_tools/services/userService"
	"se_tools/utils"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type InitData struct {
	adminuser  userservice.UserService
	auth       authoritiesservice.Services
	category   categoryservice.Service
	collection repository.Collection
	industry   industryservice.Service
	db         repository.DbRepository
	roles      roleservices.Services
	utils      utils.Utilities
}

func (i *InitData) RolesAuths(ctx context.Context, db *mongo.Database) error {

	absPath, err := filepath.Abs("services/initService/roles_auths.txt")

	if err != nil {
		println(err.Error())
		return err

	}

	file, err := i.utils.OpenFile(absPath)

	defer func() {
		err := file.Close()
		if err != nil {
			println(err.Error())
		}
	}()

	if err != nil {
		return err
	}

	scanner := i.utils.OpenScanner(file)

	roleCollection := db.Collection(i.collection.Roles())

	for scanner.Scan() {

		text := scanner.Text()

		role_auths := strings.Split(text, ":")

		roleName := role_auths[0]

		authNames := strings.Split(role_auths[1], ",")

		roleNameFilter := i.roles.FindByNameFilter(roleName)

		role, err := i.roles.FindByName(ctx, db, roleNameFilter)

		if err != nil {
			println("Error finding role")
			return err
		}

		for _, authName := range authNames {

			authNameFilter := i.auth.FilterByName(authName)

			auth, err := i.auth.FindByName(ctx, db, authNameFilter)

			if err != nil {
				println("Error finding authority")
				return err
			}

			filter := bson.M{"_id": role.ID}

			update := bson.M{"$addToSet": bson.M{
				"authorities": auth.ID},
				"$set": bson.M{"updated_at": time.Now()},
			}

			_, err = roleCollection.UpdateOne(ctx, filter, update)

			if err != nil {
				println("Error updating role")
				return err

			}

		}

	}

	return nil
}

func (i *InitData) Init(ctx context.Context) error {

	db, err := i.db.Database(ctx)

	if err != nil {

		return errors.New("internal server error")
	}

	err = i.roles.CreateRoles(ctx, db)

	if err != nil {
		println("Error creating roles")
		return err
	}

	err = i.auth.CreateAuthorities(ctx, db)

	if err != nil {
		println("Error creating authorities")
		return err
	}

	err = i.RolesAuths(ctx, db)

	if err != nil {
		println("Error creating roles and authorities")
		return err
	}

	roleFilter := i.roles.FindByNameFilter("admin")
	role, err := i.roles.FindByName(ctx, db, roleFilter)

	if err != nil {
		println("Error finding role")
		return err
	}

	err = i.adminuser.CreateAdminUser(ctx, role.ID)

	if err != nil {
		println("Error creating admin user")
		return err
	}

	err = i.industry.CreateIndustry(ctx, db)

	if err != nil {
		println("Error creating industry")
		return err
	}

	err = i.category.CreateCategory(ctx, db)

	if err != nil {
		println("Error creating category")
		println(err.Error())
		return err
	}

	return nil
}
