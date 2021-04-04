import React, { createContext, useReducer } from 'react';
import gql from 'graphql-tag';

const initialState = {
  user: null
};

const userByTokenQuery = gql`
  query userByToken($token:String!){
    getUserByToken(token:$token){
      _id,
      name,
      email,
      role,
      boxes
    }
  }
`;

//send token to server --- getUserByToken


// const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
//
// if (decodedToken.exp * 1000 < Date.now()) {
//   localStorage.removeItem('jwtToken');
// } else {
//   initialState.user = decodedToken;
// }


const AuthContext = createContext({
  user: null,
  login: (userData) => {
  },
  logout: () => {
  },
  getToken: () => {

  }
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  if (localStorage.getItem('user')) {
    initialState.user = JSON.parse(localStorage.getItem('user'));
  }

  function getToken() {
    return localStorage.getItem('jwt');
  }

  function login(userData) {

    localStorage.setItem('jwt', userData.token);

    console.log(userData.user);
    localStorage.setItem('user', JSON.stringify(userData.user));
    // localStorage.setItem('user',userData.user);
    dispatch({
      type: 'LOGIN',
      payload: userData
    });
  }

  function logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <AuthContext.Provider
      value={
        {
          user: state.user, login, logout, getToken
        }
      }
      {...props}
    />
  )
    ;
}

export { AuthContext, AuthProvider };
