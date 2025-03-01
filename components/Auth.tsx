import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState } from 'react-native'
import { supabase } from '../supabase/supabase'
import { Button, Input } from '@rneui/themed'
import LoadingModal from './UHLoadScreen'
import { Asset } from "expo-asset";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh()
    } else {
        supabase.auth.stopAutoRefresh()
    }
})

export default function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
    }

    async function signUpWithEmail() {
        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false)
    }

    const [isModalVisible, setModalVisible] = useState(false);



    return (
        <View style={styles.container}>
            <View style={styles.verticallySpaced}>
                <Button
                    title="Show Loading Modal"
                    onPress={() => setModalVisible(true)}
                />
            </View>

            <LoadingModal
                visible={isModalVisible}
                estimatedTime={30000} // 25 seconds
                headerText="Please wait while we create your next lesson   "
                setVisible={setModalVisible}

            />

        </View>
    )
    {/* //     <View style={[styles.verticallySpaced, styles.mt20]}>
        //         <Input
        //             label="Email"
        //             leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        //             onChangeText={(text) => setEmail(text)}
        //             value={email}
        //             placeholder="email@address.com"
        //             autoCapitalize={'none'}
        //         />
        //     </View>
        //     <View style={styles.verticallySpaced}>
        //         <Input
        //             label="Password"
        //             leftIcon={{ type: 'font-awesome', name: 'lock' }}
        //             onChangeText={(text) => setPassword(text)}
        //             value={password}
        //             secureTextEntry={true}
        //             placeholder="Password"
        //             autoCapitalize={'none'}
        //         />
        //     </View>
        //     <View style={[styles.verticallySpaced, styles.mt20]}>
        //         <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
        //     </View>
        //     <View style={styles.verticallySpaced}>
        //         <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
        //     </View> */}


}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
})

// currently disabled email confimation until stmp settings added
//  but then we will need to add deep linking schema 
//  instructions found here: https://supabase.com/docs/guides/auth/native-mobile-deep-linking?platform=react-native
