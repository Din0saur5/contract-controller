import { useState, useEffect } from 'react'
import { supabase } from '../../supabase/supabase'
import Auth from '../../components/Auth'
import Account from '../../components/Account'
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Home from '@/components/Home'

export default function Main() {
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
        <Home/>
        {/* add component called TabBar.tsx have radio input with state setter and then a switch statment on the state.
         add a finish loading contingency  */}
      </View>
      </ApolloProvider>
    )
  }