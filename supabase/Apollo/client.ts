import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    defaultDataIdFromObject
  } from '@apollo/client'
  import { setContext } from '@apollo/client/link/context'
  import { relayStylePagination } from '@apollo/client/utilities'
  import { supabase } from '../supabase'
  
  const cache = new InMemoryCache({
    dataIdFromObject(responseObject) {
      if ('nodeId' in responseObject) {
        return `${responseObject.nodeId}`
      }
  
      return defaultDataIdFromObject(responseObject)
    },
    possibleTypes: { Node: ['Todos'] }, // optional, but useful to specify supertype-subtype relationships
    typePolicies: {
      Query: {
        fields: {
          todosCollection: relayStylePagination(), // example of paginating a collection
          node: {
            read(_, { args, toReference }) {
              const ref = toReference({
                nodeId: args?.nodeId,
              })
  
              return ref
            },
          },
        },
      },
    },
  })

  const httpLink = createHttpLink({
    uri: 'https://atjycrgmblfzyzxmmrca.supabase.co/graphql/v1',
  })
  
  const authLink = setContext(async (_, { headers }) => {
    const token = (await supabase.auth.getSession()).data.session?.access_token
  
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    }
  })
  
  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  })
  
  export default apolloClient
  