import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();


let mongoManager;
export const getMongoClient = async () => {
  MongoClient.connect(process.env.uri)
    .then((client) => {
      mongoManager = client.db(process.env.db);
      console.log("Connection Successfull");
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getManager =  () => {
    if(mongoManager) {
        return mongoManager;
    }
}
