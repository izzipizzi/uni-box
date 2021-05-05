import gql from 'graphql-tag';

export  const VALIDATE_BOX = gql`
  mutation validateBox($boxId: ID!) {
    validateBox(boxId: $boxId)
  }
`;
export  const DECLINE_BOX = gql`
  mutation declineBox($boxId: ID!) {
    declineBox(boxId: $boxId)
  }
`;
