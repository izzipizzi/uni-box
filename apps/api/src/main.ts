/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import cors from 'cors'
import morgan from 'morgan'
import * as bodyParser from "body-parser";
import * as cookieParser from 'cookie-parser'

import {graphqlHTTP} from "express-graphql";

const mongoose = require('mongoose')


import rootSchema from "./app/graphql/rootSchema";


const materialController = require('./app/controllers/materialController')
const app = express();
require("dotenv").config()


app.use(cors())

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true

}).then(() => {
  console.log(`He-he ....\nDB connected`)
})


app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
// app.use(expressValidator)


app.use('/api', materialController)
app.use('/graphql', graphqlHTTP({
  schema: rootSchema,
  graphiql: true,
}))


const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
