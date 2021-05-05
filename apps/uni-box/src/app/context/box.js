import React, {createContext, useReducer} from 'react';
import { defaultBox } from '../constatnts';


const initialState = {
  box: defaultBox,
  boxes:[],
  publicBoxes:[]
};
const BoxContext = createContext({
  box: null,
  boxes: null,
  publicBoxes:null,

  setBox: (box) => {
  },
  setBoxes: (boxes) => {
  },
  setPublicBoxes: (boxes) => {
  },
});

function boxReducer(state, action) {
  switch (action.type) {
    case 'SET_BOX':
      return {
        ...state,
        box: action.payload
      };
    case 'SET_BOXES':
      return {
        ...state,
        boxes: action.payload
      };
      case 'SET_PUBLIC_BOXES':
      return {
        ...state,
        publicBoxes: action.payload
      };
    default:
      return state;
  }
}

function BoxProvider(props) {
  const [state, dispatch] = useReducer(boxReducer, initialState);


  function setBox(boxData) {
    dispatch({
      type: 'SET_BOX',
      payload: boxData
    });
  }
  function setBoxes(boxesData) {
    dispatch({
      type: 'SET_BOXES',
      payload: boxesData
    });
  }

  function setPublicBoxes(boxesData) {
    dispatch({
      type: 'SET_PUBLIC_BOXES',
      payload: boxesData
    });
  }


  return (
    <BoxContext.Provider
      value={
        {
          box: state.box,
          boxes: state.boxes,
          publicBoxes: state.publicBoxes,
          setBox, setBoxes,setPublicBoxes
        }
      }
      {...props}
    />
  )
    ;
}

export {BoxContext, BoxProvider};
