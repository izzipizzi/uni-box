import React, { createContext, useReducer } from 'react';
import { BoxMode } from '../enums/BoxMode';

const initialState = {
  boxMode: BoxMode.CREATE,
  isModeModal: false,
  isMaterialSaveModal: false,
  isToMyBoxes: false,
  isBoxSaveModal: false,
  makeSnapshot: false,
  error: {
    state: false,
    msg: ''
  },
  success: {
    state: false,
    msg: ''
  }
};


const UIContext = createContext({
  boxMode: null,
  isModeModal: null,
  isBoxSaveModal: null,
  isMaterialSaveModal: null,
  makeSnapshot: null,
  isToMyBoxes: null,
  error: null,
  success: null,


  setBoxMode: (mode) => {
  },
  setError: (error) => {
  },
  setSuccess: (success) => {
  },
  setShowModeModal: (value) => {
  },
  setShowMaterialSaveModal: (value) => {
  },

  setMakeSnapshot: (value) => {
  },
  setShowBoxSaveModal: (value) => {
  },
  toMyBoxes: (value) => {
  }

});

function UIReducer(state, action) {
  switch (action.type) {
    case 'SET_BOX_MODE':
      return {
        ...state,
        boxMode: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
      case 'SET_SUCCESS':
      return {
        ...state,
        success: action.payload
      };
    case 'SET_SHOW_MODE_MODAL':
      return {
        ...state,
        isModeModal: action.payload
      };

    case 'SET_MAKE_SNAPSHOT':
      return {
        ...state,
        makeSnapshot: action.payload
      };
    case 'SET_SHOW_BOX_SAVE_MODAL':
      return {
        ...state,
        isBoxSaveModal: action.payload
      };
      case 'SET_SHOW_MATERIAL_SAVE_MODAL':
      return {
        ...state,
        isMaterialSaveModal : action.payload
      };
    default:
      return state;
  }
}

function UIProvider(props) {
  const [state, dispatch] = useReducer(UIReducer, initialState);


  function setBoxMode(mode) {
    dispatch({
      type: 'SET_BOX_MODE',
      payload: mode
    });
  }
  function setError(error) {
    dispatch({
      type: 'SET_ERROR',
      payload: error,
    });
  }
  function setSuccess(success) {
    dispatch({
      type: 'SET_SUCCESS',
      payload: success,
    });
  }

  function setMakeSnapshot(value) {
    dispatch({
      type: 'SET_MAKE_SNAPSHOT',
      payload: value
    });
  }

  function setShowModeModal(value) {
    dispatch({
      type: 'SET_SHOW_MODE_MODAL',
      payload: value

    });
  }

  function setShowBoxSaveModal(value) {
    dispatch({
      type: 'SET_SHOW_BOX_SAVE_MODAL',
      payload: value

    });
  }
  function setShowMaterialSaveModal(value) {
    dispatch({
      type: 'SET_SHOW_MATERIAL_SAVE_MODAL',
      payload: value

    });
  }


  return (
    <UIContext.Provider
      value={
        {
          boxMode: state.boxMode,
          isModeModal: state.isModeModal,
          isBoxSaveModal: state.isBoxSaveModal,
          isMaterialSaveModal: state.isMaterialSaveModal,
          makeSnapshot: state.makeSnapshot,
          error: state.error,
          success: state.success,

          setBoxMode, setShowModeModal, setShowBoxSaveModal, setMakeSnapshot,setError,setSuccess,setShowMaterialSaveModal
        }
      }
      {...props}
    />
  )
    ;
}

export { UIContext, UIProvider };
