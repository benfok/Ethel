import { gql } from '@apollo/client';

export const QUERY_CURRENT_USER_ALL_DATA = gql`
    query currentUserAllData {
        currentUser {
        _id
        firstName
        lastName
        email
        categories {
            _id
            categoryName
            color
            userEditable
            lists {
                _id
                listName
                owner
                items {
                    _id
                    itemText
                    completed
                }
                sharedList
                sharedWith {
                    _id
                }
                createdAt
                }
            }
        shareHistory {
            _id
            }
        }
    }
`;

export const QUERY_CURRENT_USER = gql`
    query currentUser {
        currentUser {
        _id
        categories {
            _id
            categoryName
            color
            userEditable
            lists {
                _id
                listName
                sharedList
            }
        }
        }
    }
`;

export const QUERY_USER_CATEGORIES = gql`
    query currentUserCategories {
        currentUser {
        _id
        categories {
            _id
            categoryName
            color
            userEditable
        }
        }
    }
`;

export const QUERY_LIST = gql`
    query list($listId: ID!) {
        list(listId: $listId) {
        _id
        listName
        owner
        items {
            _id
            itemText
            completed
        }
        sharedList
        createdAt
        sharedWith {
            firstName
            _id
            lastName
        }
        }
    }
`;