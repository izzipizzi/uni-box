import React, {createContext, useReducer} from 'react';

const initialState = {
  box: {
    name: '',
    width: 100,
    type: 'square',
    height: 100,
    length: 100,

    color: '',
    loading: true,
    material: {
      _id: '',
      name: '',
      texture: '',

    },
    textureScaleX: 100,
    textureScaleY: 100,
    textureOffsetX: 100,
    textureOffsetY: 100,
    previewImg: ''
  }
};


const BoxContext = createContext({
  box: null,
  setBox: (box) => {
  },
});

function boxReducer(state, action) {
  switch (action.type) {
    case 'SET_BOX':
      return {
        ...state,
        box: action.payload
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

  return (
    <BoxContext.Provider
      value={
        {
          box: state.box, setBox
        }
      }
      {...props}
    />
  )
    ;
}

export {BoxContext, BoxProvider};
