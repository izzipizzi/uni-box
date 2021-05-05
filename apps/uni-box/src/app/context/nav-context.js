import React, { createContext, useReducer } from 'react';

const initialState = {

  isToMyBoxes: false,
  isToAdmin: false,
  isToHome: false,
};


const NavContext = createContext({
  isToMyBoxes: null,
  isToAdmin: null,
  isToHome: null,

  toMyBoxes: (value) => {
  },
  toHome: (value) => {
  },
  toAdmin: (value) => {
  },

});

function NavReducer(state, action) {
  switch (action.type) {
    case 'TO_MY_BOXES':
      return {
        ...state,
        isToMyBoxes: action.payload
      };
      case 'TO_ADMIN':
      return {
        ...state,
        isToAdmin: action.payload
      };
    case 'TO_HOME':
      return {
        ...state,
        isToHome: action.payload
      };
    default:
      return state;
  }
}

function NavProvider(props) {
  const [state, dispatch] = useReducer(NavReducer, initialState);



  function toMyBoxes(value) {
    dispatch({
      type: 'TO_MY_BOXES',
      payload: value

    });
  }

  function toAdmin(value) {
    dispatch({
      type: 'TO_ADMIN',
      payload: value

    });
  }
  function toHome(value) {
    dispatch({
      type: 'TO_HOME',
      payload: value

    });
  }


  return (
    <NavContext.Provider
      value={
        {
          isToMyBoxes: state.isToMyBoxes,
          isToAdmin: state.isToAdmin,
          isToHome: state.isToHome,
         toMyBoxes, toAdmin , toHome
        }
      }
      {...props}
    />
  )
    ;
}

export { NavContext, NavProvider };
