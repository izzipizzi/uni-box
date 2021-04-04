const { gql } = require("apollo-server-express");

export const typeDefs = gql`
  type Query {
    hello: String
  }  type Mutation {
    singleUpload(file: Upload): String
  }`;
export const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
  Mutation: {
    singleUpload: (parent, args) => {
      console.log('args');
      console.log(args);
      return "Success";
    },
  },
};
