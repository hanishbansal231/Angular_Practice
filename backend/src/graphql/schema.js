import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type Query {
    hello: String!
}

  type Mutation {
    createUser(input: CreateUserInput!): User!
  }
`;

export default typeDefs;
