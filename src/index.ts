import * as express from 'express';
import * as body_parser from 'body-parser';
import * as cors from 'cors';
import * as mongoConnection from '../config/connection';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { createMQProducer } from './rabbitmq/rabbitmq-index';
import { rabbitmqConfig } from './rabbitmqConfig/rabbitmq.config';
import { getMessage } from './handler/message-handler';
import { middlware } from './middleware';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(body_parser.json());
app.use(cors());
app.use(middlware);

var autoRoutes = require('express-auto-routes')(app); // you don't need `routes` folder any more
autoRoutes(path.join(__dirname, './controllers'));

mongoConnection.getMongoClient();

let broker;
createMQProducer(rabbitmqConfig)
    .then(result => {
        broker = result;
        getMessage();
    })
    .catch(error => {
        console.error(error);
    });

export const getBroker = () => {
    if (broker) {
        return broker;
    }
}

app.listen(PORT, () => {
    console.log(`Server Running at port ${PORT}`);
})

