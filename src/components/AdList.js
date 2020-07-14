import React from 'react'
import {
    ScrollView
} from 'react-native'

import AdItem from './AdItem'

const AdList = ({ ads, navigation }) => {
    return (
        <ScrollView
            horizontal
            pagingEnabled
        >
            {
                ads.map(item => (
                    <AdItem 
                        key={item.id} 
                        item={item} 
                        navigation={navigation}
                    />
                ))
            }
        </ScrollView>
    )
}

export default AdList
