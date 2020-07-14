import React from 'react'

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions
} from 'react-native'

import TopicItem from './TopicItem'
const {width} = Dimensions.get('window')

const itemWidth = parseInt(width * 34 / 100)

const TopicList = ({ data, type, navigation }) => {
    return (
        <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.container}
            snapToOffsets={data.map((item, index) => itemWidth * (index) * 2 + 8 * (index) * 2)}
            disableIntervalMomentum
        >
            {
                data.map((item, index) => (
                    <TopicItem
                        key={item.id}
                        item={item}
                        type={type}
                        index={index}
                        length={data.length}
                        navigation={navigation}
                    />
                ))
            }
        </ScrollView>
    )
}

export default TopicList

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8
    }
})