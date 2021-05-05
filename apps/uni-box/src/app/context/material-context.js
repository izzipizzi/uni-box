import React, {createContext, useReducer} from 'react';
import { defaultBox, defaultMaterial } from '../constatnts';


const initialState = {
  material: defaultMaterial,
  userMaterials:[],
  defaultMaterials:[]
};
const MaterialContext = createContext({
  material: null,
  userMaterials: null,
  defaultMaterials:null,

  setMaterial: (material) => {
  },
  setUserMaterials: (materials) => {
  },
  setDefaultMaterials: (materials) => {
  },
});

function materialReducer(state, action) {
  switch (action.type) {
    case 'SET_MATERIAL':
      return {
        ...state,
        material: action.payload
      };
    case 'SET_USER_MATERIALS':
      return {
        ...state,
        userMaterials: action.payload
      };
      case 'SET_DEFAULT_MATERIALS':
      return {
        ...state,
        defaultMaterials: action.payload
      };
    default:
      return state;
  }
}

function MaterialProvider(props) {
  const [state, dispatch] = useReducer(materialReducer, initialState);


  function setMaterial(materialData) {
    dispatch({
      type: 'SET_MATERIAL',
      payload: materialData
    });
  }
  function setUserMaterials(materialsData) {
    dispatch({
      type: 'SET_USER_MATERIALS',
      payload: materialsData
    });
  }

  function setDefaultMaterials(materialsData) {
    dispatch({
      type: 'SET_DEFAULT_MATERIALS',
      payload: materialsData
    });
  }


  return (
    <MaterialContext.Provider
      value={
        {
          material: state.material,
          userMaterials: state.userMaterials,
          defaultMaterials: state.defaultMaterials,
          setMaterial, setUserMaterials,setDefaultMaterials
        }
      }
      {...props}
    />
  )
    ;
}

export {MaterialContext, MaterialProvider};
