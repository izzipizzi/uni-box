/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import {generateMiddlewareGraphql} from "./app/middlewares/graphql-express/graphql-express.middleware";
import AuthMiddleware from "./app/middlewares/auth/auth.middleware";
import { ApolloServer, gql } from 'apollo-server-express';


const mongoose = require('mongoose')
const materialController =  require('./app/controllers/materialController')


const start = async () => {
  const port = process.env.port || 3333;
  const API_PATH = '/graphql';

  const app = express();
  app.use(cors({
    credentials: true
  }));
  app.use(bodyParser.json());
  app.use( bodyParser.urlencoded({ extended: true }));

  const local = true;
  require("dotenv").config()
  mongoose.connect(local ? process.env.MONGODB_URI_LOCAL : process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true

  }).then(() => {
    console.log(`He-he ....\nDB connected`)
  })
  const graphqlMiddleware = await generateMiddlewareGraphql();

  app.use(morgan());

  app.use('/api', materialController)

  app.post(API_PATH,
    [
      bodyParser.json(),
      AuthMiddleware,
      graphqlMiddleware,

    ],
  );
  //
  // const typeDefs = gql`
  //   type Query {
  //     hello: String
  //   }
  //   type Mutation {
  //     createMaterial(name:String!,texture:Upload,normal_texture:Upload):String
  //   }
  // `;
  //
  // const resolvers = {
  //   Query: {
  //     hello: () => "Hello world!",
  //   },
  //   Mutation: {
  //     createMaterial: (parent, args) => {
  //       console.log(args);
  //       // return "Success";
  //     },
  //   },
  // };
  //
  // const server = new ApolloServer({ typeDefs, resolvers });
  //
  // server.applyMiddleware({ app });


  app.listen(port, () => {
    console.log(`Graphql server started on http://localhost:${port}${API_PATH}`);
  });


}

start()
