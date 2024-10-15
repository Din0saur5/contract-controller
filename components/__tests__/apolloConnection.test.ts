import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { supabase } from '../../supabase/supabase';

describe('Apollo Client', () => {
  it('should be able to connect to Supabase GraphQL when authenticated', async () => {
    const sessionData = await supabase.auth.getSession()
    const session = sessionData.data.session;
    expect(session).not.toBeNull();

    const authLink = setContext((_, { headers }) => {
      const token = session ? session.access_token : '';
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    });

    const httpLink = new HttpLink({
      uri: process.env.SUPABASE_GRAPHQL_URL,
    });

    const testClient = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });

    const GET_ALL_USERS = gql`
      query GetAllUsers {
        profiles {
          id
          username
          email
        }
      }
    `;

    const result = await testClient.query({
      query: GET_ALL_USERS,
    });

    expect(result.data).toHaveProperty('profiles');
    expect(result.data.profiles.length).toBeGreaterThan(0);
  });

  it('should not connect to Supabase GraphQL without authentication', async () => {
    const httpLink = new HttpLink({
      uri: process.env.SUPABASE_GRAPHQL_URL,
    });

    const testClient = new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
    });

    const GET_ALL_USERS = gql`
      query GetAllUsers {
        profiles {
          id
          username
          email
        }
      }
    `;

    await expect(testClient.query({ query: GET_ALL_USERS })).rejects.toThrow();
  });
});