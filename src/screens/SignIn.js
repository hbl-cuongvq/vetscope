import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
    Animated
} from 'react-native'

import CheckBox from '../components/CheckBox'

import InputCustom from '../components/InputCustom'

import Footer from '../components/Footer'

const { width } = Dimensions.get('window')

const SignIn = ({ navigation }) => {
    const [isChecked, setIsChecked] = useState(false)
    const fade = new Animated.Value(0)
    const slide = new Animated.Value(-30)

    const goToSignUp = () => navigation.navigate('SignUp')

    useEffect(() => {
        navigation.setOptions({
            title: 'Sign In | VETSCOPE'
        })

        welcomeAppeare()
    }, [])

    const welcomeAppeare = () => {
        Animated.timing(fade, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false,
        }).start()
        Animated.timing(slide, {
            toValue: 0,
            duration: 400,
            useNativeDriver: false,
        }).start()
    }

    return (
        <ScrollView
            style={styles.container}
        >
            <Image
                source={require('../assets/bg_signup.png')}
                style={styles.backgroundImage}
            />

            <Animated.View
                style={[
                    styles.welcomeHeader,
                    {
                        opacity: fade,
                        marginTop: slide
                    }
                ]}
            >
                <Text style={styles.welcomeText}>{`Welcome back!\nPlease log in with your email.`}</Text>
                <TouchableOpacity style={styles.linkWrapper}
                    onPress={goToSignUp}
                >
                    <Text style={[styles.linkText, styles.underLine]}>New here? Let's create an account. </Text>
                    <Image
                        source={require('../assets/icon_angle_right.png')}
                    />
                    <Text style={[styles.linkText, styles.bold]}> Sign Up</Text>
                </TouchableOpacity>
            </Animated.View>

            <View
                style={styles.body}
            >
                <View style={styles.bodyDiangleShapeLeft}></View>
                <View style={styles.bodyDiangleShapeRight}></View>

                <InputCustom
                    label={'Email'}
                    imageSource={require('../assets/icon_mail.png')}
                    keyboardType="email-address"
                />

                <InputCustom
                    label={'Password'}
                    imageSource={require('../assets/icon_lock.png')}
                    secureTextEntry={true}
                />

                <View style={styles.checkBoxWrapper}>
                    <CheckBox
                        isChecked={isChecked}
                        setIsChecked={setIsChecked}
                    />
                    <Text style={styles.checkBoxText}>Remember me</Text>
                </View>

                <TouchableOpacity
                    style={styles.submitBtn}
                >
                    <Text style={styles.submitBtnText}>Log in</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.forgotWrapper}
                >
                    <Text style={styles.forgotText}>Forgot password?</Text>
                </TouchableOpacity>
            </View>

            <Footer />
        </ScrollView>
    )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#011A27'
    },
    backgroundImage: {
        position: "absolute",
        width: width,
        height: width
    },
    body: {
        paddingHorizontal: 24,
        backgroundColor: 'rgba(0,13,20,0.8)'
    },
    bodyDiangleShapeLeft: {
        borderTopWidth: 40,
        borderTopColor: 'transparent',
        borderLeftWidth: width * 50 / 100,
        borderLeftColor: 'rgba(0,13,20,0.8)',
        position: 'absolute',
        top: -40
    },
    bodyDiangleShapeRight: {
        borderTopWidth: 40,
        borderTopColor: 'transparent',
        borderRightWidth: width * 50 / 100,
        borderRightColor: 'rgba(0,13,20,0.8)',
        position: 'absolute',
        top: -40,
        right: 0
    },
    welcomeHeader: {
        justifyContent: 'center',
        paddingHorizontal: 16,
        height: 232
    },
    welcomeText: {
        fontSize: 22,
        color: 'white',
        letterSpacing: 0.6,
        textShadowColor: 'black',
        textShadowOffset: {
            width: 2,
            height: 2
        },
        textShadowRadius: 12,
    },
    linkWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24
    },
    underLine: {
        textDecorationLine: 'underline'
    },
    bold: {
        fontWeight: 'bold'
    },
    linkText: {
        color: '#18d08c',
        fontSize: 14,
        textShadowColor: 'black',
        textShadowOffset: {
            width: 1.5,
            height: 1.5
        },
        textShadowRadius: 6,
    },
    checkBoxWrapper: {
        marginBottom: 24,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    checkBoxText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 14,
        marginLeft: 10
    },
    submitBtn: {
        padding: 6,
        borderWidth: 1,
        borderColor: '#18d08c',
        borderRadius: 4,
        width: 220,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    submitBtnText: {
        color: '#18d08c',
        fontSize: 20
    },
    forgotWrapper: {
        alignSelf: 'center',
        marginVertical: 24,
    },
    forgotText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 12,
        textDecorationLine: 'underline'
    }
})