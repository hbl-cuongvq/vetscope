import React from 'react'

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import {currentTopicsParams} from '../navigations/RouteParams'

import TopicList from './TopicList'

const CurrentTopics = ({discussions, polls, navigation}) => {
    return discussions.length > 0 && polls.length > 0 && (
        <View style={styles.container}>
            <View style={[styles.row, styles.marginTitle, {justifyContent: 'space-between'}]}>
                <Text style={[styles.title, styles.bold]}>Current Topics</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('WebView', currentTopicsParams)
                    }}
                >
                <Text style={styles.link}>See All</Text>
                </TouchableOpacity>
            </View>
            <TopicList
                type='Discussion'
                data={discussions}
                navigation={navigation}
            />
            <View style={{marginBottom: 2}}></View>
            <TopicList
                type='Poll'
                data={polls}
                navigation={navigation}
            />
        </View>
    )
}

export default CurrentTopics

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(255,255,255,0.5)'
    },
    title: {
        fontSize: 16,
        color: 'white'
    },
    marginTitle: {
        marginHorizontal: 12,
        marginBottom: 16
    },
    link: {
        color: '#18d08c'
    },
    bold: {
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row'
    }
})