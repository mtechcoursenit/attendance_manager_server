import { MongoClient } from "mongodb";

const uri =  "mongodb+srv://mtechcoursenit:Somnath7631@@cluster0.1qvt5v0.mongodb.net/?retryWrites=true&w=majority";

let mongoManager;

// export  const getMongoClient = async () => {
//     MongoClient.connect(uri).then(client => {
//         mongoManager = client.db('NodeJS');
//         console.log('Connection Successfull')
//     }).catch(err => {
//         console.error(err);
//     })
// }

export const getMongoClient = async () => {
  MongoClient.connect(uri)
    .then((client) => {
      mongoManager = client.db("NodeJS");
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
