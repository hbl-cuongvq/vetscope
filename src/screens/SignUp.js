import React, {useState} from 'react'
import {
    View,
    Text
} from 'react-native'

const SignUp = ({ navigation }) => {

    useState(() => {
        navigation.setOptions({
            title: 'Sign up'
        })
    }, []) 
    
    return (
        <View>
            <Text>sign up</Text>
        </View>
    )
}

export default SignUp