import React, {useState} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput
} from 'react-native'

const InputCustom = ({ label, imageSource, secureTextEntry, keyboardType }) => {
    const [isFocus, setIsFocus] = useState(false)

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View
                style={isFocus ? styles.inputWrapperFocus : styles.inputWrapper}
            >
                <Image
                    source={imageSource}
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                />
            </View>
        </View>
    )
}

export default InputCustom

const styles = StyleSheet.create({
    container: { 
        marginVertical: 6 
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        borderRadius: 2,
        height: 38,
        backgroundColor: 'rgba(1,26,39,0.8)'
    },
    inputWrapperFocus: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#18d08c',
        borderRadius: 2,
        height: 38,
        backgroundColor: 'rgba(1,21,24,0.8)'
    },
    icon: {
        width: 16,
        height: 16,
        resizeMode: 'cover',
        marginHorizontal: 8
    },
    label: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)',
        paddingVertical: 4,
        letterSpacing: 0.6
    },
    input: {
        flex: 1,
        color: 'white',
        fontSize: 16
    }
})