import * as express from 'express';
import * as body_parser from 'body-parser';
import * as cors from 'cors';
import * as mongoConnection from '../config/connection';
import * as path from 'path';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(body_parser.json());
app.use(cors());

var autoRoutes = require('express-auto-routes')(app); // you don't need `routes` folder any more
autoRoutes(path.join(__dirname, './controllers'));

mongoConnection.getMongoClient();


app.listen(PORT, () => {
    console.log(`Server Running at port ${PORT}`);
})

