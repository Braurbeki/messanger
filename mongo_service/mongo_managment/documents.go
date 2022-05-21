package mongo_managment

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
)

var (
	Ctx             = context.TODO()
	userCol 		*mongo.Collection
	messageBoxCol   *mongo.Collection
	messagesCol     *mongo.Collection
	messageCol      *mongo.Collection
)

type User struct {
	Id          string   `bson:"_id"`
	Nickname    string   `bson:"nickname"`
	Hashed_pwd  string   `bson:"hashed_pwd"`
	MessageBox  string   `bson:"messageBox"`
}

type MessageBox struct {
	Id          string   `bson:"_id"`
	Messages  []string   `bson:"messages"`
}

type Messages struct {
	Id          string   `bson:"_id"`
	Message   []string   `bson:"message"`
}

type Message struct {
	Id          string   `bson:"_id"`
	Message     string   `bson:"message"`
}