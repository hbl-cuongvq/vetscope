import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

const { width } = Dimensions.get('window')

const widthItem = parseInt(width * 72 / 100)
const heightItem = parseInt(widthItem * 56 / 100)

const Item = ({ item, index, length, navigation }) => {
    return (
        <TouchableOpacity
            style={[styles.container, {
                marginRight: index === length - 1 ? width - widthItem : 8
            }]}
            onPress={() => {
                navigation.navigate('WebView', {
                    url: item.url,
                    title: 'Loading...'
                })
            }}    
        >
            <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}
            >
                <Image
                    style={styles.image}
                    source={{ uri: item.thumb }}
                />
            </LinearGradient>

            <View style={styles.txt}>
                <Text style={[styles.title, styles.link]}>{item.title}</Text>
                <Text style={styles.text}>{item.people}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.text, styles.italic, styles.provided]}>Provided by </Text>
                    <Text style={styles.text}>{item.provided}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Item

const styles = StyleSheet.create({
    container: {
        marginRight: 8,
        width: widthItem
    },
    title: {
        fontSize: 16
    },
    link: {
        color: '#18d08c'
    },
    txt: {
        padding: 4
    },
    text: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12
    },
    italic: {
        fontStyle: 'italic'
    },
    provided: {
        color: 'rgba(255,255,255,0.4)',

    },
    image: {
        width: widthItem,
        height: heightItem
    }
})