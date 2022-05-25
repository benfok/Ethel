import { gql } from '@apollo/client';

export const QUERY_CURRENT_USER_ALL_DATA = gql`
    query currentUser {
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
    query currentUserLite {
        currentUserLite {
        _id
        firstName
        lastName
        email
        categories {
            _id
            categoryName
            color
            userEditable
        }
            shareHistory {
            _id
            }
        }
    }
`;