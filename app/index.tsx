import { useState, useEffect } from 'react'
import { supabase } from '../supabase/supabase'
import Auth from '../components/Auth'
import Account from '../components/Account'
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';



export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const client = new ApolloClient({
    uri: 'https://atjycrgmblfzyzxmmrca.supabase.co/graphql/v1',
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    }) 
  }, [])

  return (
    <ApolloProvider client={client}>
    <View>
      {session && session.user ? (<Account key={session.user.id} session={session} />) : <Auth />}
    </View>
    </ApolloProvider>
  )
}