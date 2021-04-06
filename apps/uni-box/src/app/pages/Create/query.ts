import gql from 'graphql-tag';

export const GET_MATERIALS = gql`
  {
    getMaterials{
      _id
      name
      texture
    }
  }
`;


export const GET_MATERIALS_BY_USER = gql`
  query getMaterialsByUser($id: String!){
    getAllMaterialsByUser(id: $id){
      _id
      name
      texture
    }
  }

`;
