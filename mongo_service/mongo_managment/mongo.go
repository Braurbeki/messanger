package mongo_managment

import (
	p "mongo_service/util"
	"reflect"
	// "fmt"
	"log"
	// "go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const props_name = "config/api.properties"

func Setup() {
	props := p.ReadProperties(props_name)
	host := props.GetString("mongo.host", "localhost")
	port := props.GetString("mongo.port", "27017")
	connectionURI := "mongodb://" + host + ":" + port
	cOptions := options.Client().ApplyURI(connectionURI)
	client, err := mongo.Connect(Ctx, cOptions)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(Ctx, nil)
	if err != nil {
		log.Fatal(err)
	}

	db := client.Database("messanger")
	userCol = db.Collection("user")
	messageBoxCol = db.Collection("messageBox")
	messagesCol = db.Collection("messages")
	messageCol = db.Collection("message")
}

func CreateUser(u User) (string, error) {
	//To create user we need to init MessageBox for him
	mBoxId := insert(MessageBox{Messages: []string{}, Id: u.Nickname}, messageBoxCol)
	if mBoxId == "" {
		return "", nil
	}
	u.MessageBox = mBoxId
	u.Id = u.Nickname
	userId := insert(u, userCol)
	
	return userId, nil
}

func GetUser(id string) (User, error) {
	var u User
	encoded, err := findOne(id, userCol)
	encoded.Decode(&u)
	if err != nil {
		return u, err
	}
	return u, nil
}

func GetUsers() ([]User, error) {
	var users []User
	var user User
	findAll(userCol, user, users)
	return users, nil
}

// func UpdateItem(id int, status bool, message string) error {
// 	log.Println(id, status, message)
// 	filter := bson.D{{"_id", id}}
// 	update := bson.D{{"$set", bson.D{{"done", status}}}}
// 	_, err := TodoListCol.UpdateOne(
// 		Ctx,
// 		filter,
// 		update,
// 	)
// 	update = bson.D{{"$set", bson.D{{"message", message}}}}
// 	_, err = TodoListCol.UpdateOne(
// 		Ctx,
// 		filter,
// 		update,
// 	)
// 	return err
// }

// func DeleteItem(id int, ) error {
// 	_, err := TodoListCol.DeleteOne(Ctx, bson.D{{"_id", id}})
// 	if err != nil {
// 		return err
// 	}
// 	return nil
// }
