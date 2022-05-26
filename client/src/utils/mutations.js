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

export const ADD_CATEGORY = gql`
mutation addCategory($categoryName: String!, $color: String!) {
  addCategory(categoryName: $categoryName, color: $color) {
    _id
    categories {
      _id
      categoryName
      color
      userEditable
      lists {
        _id
      }
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

export const REMOVE_ITEM = gql`
mutation removeItem($listId: ID!, $itemId: ID!) {
  removeItem(listId: $listId, itemId: $itemId) {
    _id
    items {
      _id
    }
  }
}
`;

export const TOGGLE_ITEM = gql`
mutation toggleItem($listId: ID!, $itemId: ID!, $checked: Boolean!) {
  toggleItem(listId: $listId, itemId: $itemId, checked: $checked)  {
    _id
    items {
      _id
      completed
    }
  }
}
`;