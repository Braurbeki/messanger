package mongo_managment

import (
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func insert(m interface{}, col *mongo.Collection) string {
	result, err := col.InsertOne(Ctx, m)
	if err != nil {
		log.Println(err)
		return ""
	}

	return fmt.Sprintf("%v", result.InsertedID)
}

func findOne(id string, col *mongo.Collection) (*mongo.SingleResult, error) {
	filter := bson.D{{"_id", id}}
	return userCol.FindOne(Ctx, filter), nil
}

func findAll(col *mongo.Collection, item interface{}, items []interface{}) error {
	cursor, err := col.Find(Ctx, bson.D{})
	if err != nil {
		return nil
	}
	defer cursor.Close(Ctx)
	
	for cursor.Next(Ctx) {
		err := cursor.Decode(&item)
		if err != nil {
			return err
		}
		items = append(items, item)
	}
	fmt.Println(items...)
	return nil
}