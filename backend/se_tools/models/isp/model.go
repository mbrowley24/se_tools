package isp

import "go.mongodb.org/mongo-driver/bson/primitive"

type Model struct {
	ID      primitive.ObjectID `bson:"_id,omitempty"`
	Name    string             `bson:"name"`
	Maps    string             `bson:"maps"`
	Website string             `bson:"website"`
}

func (m *Model) ToDTO() ModelDto {
	return ModelDto{
		Name:       m.Name,
		Maps:       m.Maps,
		Website:    m.Website,
		Categories: []CategoryDto{},
	}
}

type ModelDto struct {
	Name       string        `json:"name"`
	Maps       string        `json:"maps"`
	Website    string        `json:"website"`
	Categories []CategoryDto `json:"categories"`
}

type Category struct {
	ID   primitive.ObjectID `bson:"_id,omitempty"`
	Name string             `bson:"name"`
	ISP  primitive.ObjectID `bson:"isp"`
}

func (c *Category) ToDTO() CategoryDto {
	return CategoryDto{
		Name:     c.Name,
		Services: []ServiceDto{},
	}
}

type CategoryDto struct {
	Name     string       `json:"name"`
	Services []ServiceDto `json:"services"`
}

type Service struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"`
	Name     string             `bson:"name"`
	Link     string             `bson:"link"`
	Category primitive.ObjectID `bson:"category"`
}

func (s *Service) ToDTO() ServiceDto {
	return ServiceDto{
		Name: s.Name,
		Link: s.Link,
	}

}

type ServiceDto struct {
	Name string `json:"name"`
	Link string `json:"link"`
}

type ISPDTO struct {
}
