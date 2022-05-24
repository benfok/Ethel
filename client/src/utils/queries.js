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
                    _id
                    itemText
                    completed
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