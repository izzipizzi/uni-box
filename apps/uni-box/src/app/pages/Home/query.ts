import gql from 'graphql-tag';

export const GET_PUBLIC_VALIDATED_BOXES = gql`
  {
    getPublicValidatedBoxes{
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
      user{
        _id
        name
      }
      textureScaleX
      textureScaleY
      textureOffsetX
      textureOffsetY
      previewImg
      textureRotation
      validated
      public
      declined
      price
    }
  }
`;

