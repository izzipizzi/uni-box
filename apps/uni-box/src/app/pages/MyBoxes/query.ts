import gql from 'graphql-tag';

export const GET_BOXES_BY_USER = gql`
  query getBoxesByUser($userId: String!){
    getBoxesByUser(userId: $userId){
      _id
      name
      model
#      tape
      material{
        _id
        name
        texture
      }
      color
      width
      length
      height
      user
      textureScaleX
      textureScaleY
      textureOffsetX
      textureOffsetY
      previewImg
      textureRotation
      validated
      declined
      public
      price
    }
  }

`;
