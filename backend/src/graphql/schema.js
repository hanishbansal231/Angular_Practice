import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String
    access_token:String
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }


  type Query {
    getUserById(input: ID!): User!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
  }
  type Mutation {
    loginUser(input: LoginUserInput!): User!
  }
`;

export default typeDefs;
