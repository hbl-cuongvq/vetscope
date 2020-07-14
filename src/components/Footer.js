import React from 'react'
import {
    View, 
    Text,
    StyleSheet
} from 'react-native'

const Footer = () => {
    return(
        <View style={styles.container}>
            <Text
                style={styles.textFooter}
            >© VETSCOPE All rights reversed.</Text>
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0a2738',
        height: 56,
        paddingTop: 14
    },
    textFooter: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 10,
        textAlign: 'center'
    }
})