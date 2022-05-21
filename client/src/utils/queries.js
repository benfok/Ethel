import { gql } from '@apollo/client';

export const QUERY_CURRENT_USER = gql`
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
            lists {
                _id
                listName
                owner
                items {
                    itemText
                    completed
                    deleted
                }
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