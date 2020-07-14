import React from 'react'

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native'

import moment from 'moment'

const { width } = Dimensions.get('window')


const widthItem = parseInt(width * 34 / 100)
const heightItem = parseInt(widthItem * 127 / 100)

const TopicItem = ({ item, type, index, length, navigation }) => {
    const dateString = (date) => moment(new Date(date)).fromNow().toString()
    const pickColor = (type) => type === 'Discussion' ? '#B48EE0' : type === 'Poll' ? '#F26586' : 'white'

    return (
        <TouchableOpacity
            style={[styles.container, {
                marginRight: index === length - 1 ? width - widthItem * 2 - 8 : 8
            }]}
            onPress={() => navigation.navigate('WebView', {
                url: item.url,
                title: 'Loading...'
            })}
        >
            <Text style={[styles.type, { color: pickColor(type)}]}>{type}</Text>
            <Text
                style={styles.title}
                lineBreakMode={'tail'}
                numberOfLines={4}
            >{item.title}</Text>
            <View
                style={styles.row}
            >
                <Text style={styles.comments}>{item.comments}</Text>
                <Text style={styles.created}> - {dateString(item.created)}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default TopicItem

const styles = StyleSheet.create({
    container: {
        marginRight: 10,
        width: widthItem,
        height: heightItem,
        borderWidth: 0.5,
        borderColor: 'rgba(255,255,255,0.5)',
        padding: 12,
        borderRadius: 2
    },
    row: {
        flexDirection: 'row'
    },
    type: {

    },
    title: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        marginVertical: 4
    },
    comments: {
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold'
    },
    created: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.7)',
    }
})