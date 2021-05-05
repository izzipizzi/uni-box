import React, {createContext, useReducer} from 'react';
import { defaultBox } from '../constatnts';


const initialState = {
  viewBox: defaultBox,
  noValidatedBoxes:[],
};
const AdminBoxContext = createContext({
  viewBox: null,
  noValidatedBoxes:null,
  setViewBox: (box) => {
  },
  setNoValidatedBoxes: (boxes) => {
  },
});

function adminBoxReducer(state, action) {
  switch (action.type) {
    case 'SET_VIEW_BOX':
      return {
        ...state,
        viewBox: action.payload
      };
    case 'SET_NO_VALIDATED_BOXES':
      return {
        ...state,
        noValidatedBoxes: action.payload
      };
    default:
      return state;
  }
}

function AdminBoxProvider(props) {
  const [state, dispatch] = useReducer(adminBoxReducer, initialState);


  function setViewBox(boxData) {
    dispatch({
      type: 'SET_VIEW_BOX',
      payload: boxData
    });
  }
  function setNoValidatedBoxes(boxesData) {
    dispatch({
      type: 'SET_NO_VALIDATED_BOXES',
      payload: boxesData
    });
  }


  return (
    <AdminBoxContext.Provider
      value={
        {
          viewBox: state.viewBox,
          noValidatedBoxes: state.noValidatedBoxes,
          setViewBox, setNoValidatedBoxes
        }
      }
      {...props}
    />
  )
    ;
}

export {AdminBoxContext, AdminBoxProvider};
