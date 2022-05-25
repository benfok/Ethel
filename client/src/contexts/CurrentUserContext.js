import React, { createContext, useContext, useReducer } from 'react';
import { userReducer } from '../utils/reducer';

// create the context using the react createContext function
export const CurrentUserContext = createContext();

// provide a custom hook name
export const useCurrentUserContext = () => useContext(CurrentUserContext);

// define the state and set values as required
// current user refers to the looged in user and their DB user document. So this would include changes to user or category data, but not lists or items
export const CurrentUserContextProvider = (props) => {
    const [ currentUser, dispatch ] = useReducer(userReducer, []);
    return (
        <CurrentUserContext.Provider value={{currentUser, dispatch}}>
            { props.children }
        </CurrentUserContext.Provider>
    )
}

