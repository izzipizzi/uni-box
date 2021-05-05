import gql from 'graphql-tag';

export const GET_PUBLIC_NO_VALIDATED_BOXES = gql`
  {
    getPublicNoValidatedBoxes{
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
    }
  }
`;

