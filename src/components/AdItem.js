import React from 'react'
import {
    Image,
    Text,
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity
} from 'react-native'

const { width } = Dimensions.get('window')

import LinearGradient from 'react-native-linear-gradient'

const AdItem = ({ item, navigation }) => {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('WebView', {
                url: item.url,
                title: 'Loading...'
            })}
        >
            <View>
                <Image
                    style={{
                        width: width,
                        height: 471
                    }}
                    source={{ uri: item.thumb }}
                />
            </View>

            <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.9)']}
                style={styles.linearGradient}
            >
                <Text
                    style={styles.adTitle}
                >{item.title}</Text>
                <Text
                    style={styles.adDetail}
                >{item.detail}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default AdItem

const styles = StyleSheet.create({
    adTitle: {
        fontSize: 26,
        color: 'white'
    },
    adDetail: {
        color: 'white',
        fontSize: 13
    },
    linearGradient: {
        position: 'absolute',
        width: width,
        height: parseInt(width * 137 / 100),
        bottom: 0,
        padding: 12,
        justifyContent: 'flex-end'
    }
})
