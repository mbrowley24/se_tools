package ispservice

import (
	"context"
	"se_tools/models/isp"
	"se_tools/repository"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Service struct {
	collection repository.Collection
	db         repository.DbRepository
}

func (s *Service) findAll(ctx context.Context) ([]isp.Model, error) {

	var isps []isp.Model

	//get collection
	db, err := s.db.Database(ctx)

	if err != nil {
		return isps, err
	}

	//defer closing db connection
	defer func(ctx context.Context) {

		err := db.Client().Disconnect(ctx)

		if err != nil {
			return
		}
	}(ctx)

	collection := db.Collection(s.collection.ISP())

	//find all ISPs
	cursor, err := collection.Find(ctx, bson.M{})

	if err != nil {
		return isps, err
	}

	//decode results
	err = cursor.All(ctx, &isps)

	if err != nil {
		return isps, err
	}

	return isps, nil

}

func (s *Service) findAllCategories(ctx context.Context, id primitive.ObjectID) ([]isp.Category, error) {

	var categories []isp.Category

	//get collection
	db, err := s.db.Database(ctx)

	if err != nil {
		return categories, err
	}

	//defer closing db connection
	defer func(ctx context.Context) {

		err := db.Client().Disconnect(ctx)

		if err != nil {
			return
		}
	}(ctx)

	collection := db.Collection(s.collection.ISPServiceCategories())

	//find all categories
	cursor, err := collection.Find(ctx, bson.M{"isp": id})

	if err != nil {
		return categories, err
	}

	//decode results
	err = cursor.All(ctx, &categories)

	if err != nil {
		return categories, err
	}

	return categories, nil

}

func (s *Service) findAllServices(ctx context.Context, id primitive.ObjectID) ([]isp.Service, error) {

	var services []isp.Service

	db, err := s.db.Database(ctx)

	if err != nil {
		return nil, err
	}

	defer func(ctx context.Context) {

		err := db.Client().Disconnect(ctx)

		if err != nil {
			return
		}
	}(ctx)

	collection := db.Collection(s.collection.ISPServices())

	cursor, err := collection.Find(ctx, bson.M{"category": id})

	if err != nil {
		return nil, err
	}

	err = cursor.All(ctx, &services)

	if err != nil {
		return nil, err
	}

	return services, nil
}

// GetISPByName is a function that returns an ISP by its name
func (s *Service) findISPByName(ctx context.Context, name string) (isp.Model, error) {

	var isp isp.Model

	//get collection
	db, err := s.db.Database(ctx)

	if err != nil {
		return isp, err
	}

	//defer closing db connection
	defer func(ctx context.Context) {

		err := db.Client().Disconnect(ctx)

		if err != nil {
			return
		}
	}(ctx)

	//find ISP by name
	filter := bson.M{"name": name}

	collection := db.Collection(s.collection.ISP())

	//query db and decode result
	err = collection.FindOne(ctx, filter).Decode(&isp)

	if err != nil {
		return isp, err
	}

	return isp, nil
}

func (s *Service) GetDashboardData(ctx context.Context) ([]isp.ModelDto, error) {

	var dtos []isp.ModelDto

	for i := 0; i < 100; i++ {
		println(i)

	}
	start := time.Now()
	// //get db client and check for errors
	// db, err := s.db.Database(ctx)

	// if err != nil {
	// 	return dtos, err
	// }

	// //defer closing the db connection
	// defer func(ctx context.Context) {

	// 	err := db.Client().Disconnect(ctx)

	// 	if err != nil {
	// 		return
	// 	}
	// }(ctx)

	//get all ISPs models from db and check for errors
	isps, err := s.findAll(ctx)

	if err != nil {
		println("Error finding ISPs")
		return dtos, err
	}

	//iterate over all ISPs
	for _, isp := range isps {

		//convert ISP model to DTO
		dto := isp.ToDTO()

		//find all categories for the ISP and check for errors
		categories, err := s.findAllCategories(ctx, isp.ID)
		if err != nil {
			println(err.Error())
			println("Error finding categories")
			return dtos, err
		}

		//iterate over all categories
		for _, category := range categories {

			//convert category model to DTO
			categoryDto := category.ToDTO()

			//find all services for the category and check for errors
			services, err := s.findAllServices(ctx, category.ID)

			if err != nil {
				return dtos, err
			}

			//iterate over all services
			for _, service := range services {

				println(service.Name)
				//convert service model to DTO
				serviceDto := service.ToDTO()

				//append service DTO to category DTO
				categoryDto.Services = append(categoryDto.Services, serviceDto)
			}

			//append category DTO to ISP DTO
			dto.Categories = append(dto.Categories, categoryDto)
		}

		//append ISP DTO to DTOs slice
		dtos = append(dtos, dto)

	}

	duration := time.Since(start)
	println(duration)

	return dtos, nil

}
