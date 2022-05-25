import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
    user {
      firstName
      lastName
      email
      password
      _id
    }
  }
}
`;

export const ADD_ITEM = gql`
mutation addItem($listId: ID!, $itemText: String!) {
  addItem(listId: $listId, itemText: $itemText) {
    _id
    items {
      _id
      itemText
      completed
    }
  }
}
`;