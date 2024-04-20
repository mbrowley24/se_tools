package initservice

import (
	"context"
	"path/filepath"
	authoritiesservice "se_tools/services/authoritiesService"
	roleservices "se_tools/services/roleServices"
	"se_tools/utils"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

type InitData struct {
	auth  authoritiesservice.Services
	roles roleservices.Services
	utils utils.Utilities
}

func (i *InitData) RolesAuths(ctx context.Context) error {

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

	for scanner.Scan() {

		text := scanner.Text()

		role_auths := strings.Split(text, ":")

		roleName := role_auths[0]

		authNames := strings.Split(role_auths[1], ",")

		role, err := i.roles.FindByName(ctx, roleName)

		if err != nil {
			println("Error finding role")
			return err
		}

		for _, authName := range authNames {

			auth, err := i.auth.FindByName(ctx, authName)

			if err != nil {
				println("Error finding authority")
				return err
			}

			filter := bson.M{"_id": role.ID}

			update := bson.M{"$addToSet": bson.M{
				"authorities": auth.ID},
				"$set": bson.M{"updated_at": time.Now()},
			}

			_, err = i.roles.Update(ctx, filter, update)

			if err != nil {
				println("Error updating role")
				return err

			}

		}

	}

	return nil
}

func (i *InitData) Init(ctx context.Context) error {

	err := i.roles.CreateRoles(ctx)

	if err != nil {
		println("Error creating roles")
		return err
	}

	err = i.auth.CreateAuthorities(ctx)

	if err != nil {
		println("Error creating authorities")
		return err
	}

	err = i.RolesAuths(ctx)

	if err != nil {
		println("Error creating roles and authorities")
		return err
	}

	return nil
}
