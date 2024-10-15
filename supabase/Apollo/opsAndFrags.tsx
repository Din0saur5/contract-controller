import { gql, useQuery } from '@apollo/client';

const GET_ALL_USERS = gql`
  query GetAllUsers {
    profiles {
      id
      username
      email
    }
  }
`;

