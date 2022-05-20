const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    categories: [Category]
    shareHistory: [User]
  }

  type Category {
      _id: ID
      categoryName: String
      color: String
      lists: [List]
  }

  type List {
      _id: ID
      listName: String
      owner: String
      items: [Item]
      sharedWith: [User]
      createdAt: Date
  }

  type Item {
      itemText: String
      completed: Boolean
      deleted: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }

    type Query {
    users: [User]
    user(email: String!): User
  }

  type Mutation {
    addUser(firstName: String!, lastName: String! email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
