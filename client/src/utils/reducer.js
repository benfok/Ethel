import {
    SET_CURRENT_USER_DATA
} from './actions';

// The reducer is a function that accepts the current state and an action. It returns a new state based on that action.
export const userReducer = (state, {type, payload}) => {
    switch (type) {
        case SET_CURRENT_USER_DATA:
            return {
                ...state,
                currentUser: payload
            }
        default:
            return state
    }
};

