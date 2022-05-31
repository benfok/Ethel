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
    token
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

export const ADD_LIST = gql`
mutation addList($listName: String!, $owner: ID!, $categoryId: ID!) {
  addList(listName: $listName, owner: $owner, categoryId: $categoryId) {
    _id
    listName
    owner
    items {
      _id
    }
    sharedList
    sharedWith {
      _id
    }
    createdAt
  }
}
`;

export const REMOVE_LIST = gql`
mutation removeList($listId: ID!, $categoryId: ID!) {
  removeList(listId: $listId, categoryId: $categoryId) {
    _id
  }
}
`;

export const SHARE_LIST = gql`
mutation shareList($listId: ID!, $sharedWithId: ID!) {
  shareList(listId: $listId, sharedWithId: $sharedWithId) {
    _id
    listName
    sharedList
    owner
    sharedWith {
      _id
      firstName
      lastName
      email
    }
  }
}
`;

export const UPDATE_SHARE_HISTORY = gql`
mutation updateShareHistory($sharedWithId: ID!) {
  updateShareHistory(sharedWithId: $sharedWithId) {
    _id
    firstName
    lastName
    shareHistory {
      _id
      firstName
      lastName
      email
    }
  }
}
`;

export const MOVE_LIST = gql`
mutation moveList($listId: ID!, $oldCategoryId: ID!, $newCategoryId: ID!) {
  moveList(listId: $listId, oldCategoryId: $oldCategoryId, newCategoryId: $newCategoryId) {
    _id
    firstName
    lastName
    categories {
      _id
      categoryName
      lists {
        _id
      }
    }
  }
}
`;