import React from 'react'
import {
    StyleSheet
} from 'react-native'

import { searchParams } from '../navigations/RouteParams'

import Ionicons from 'react-native-vector-icons/Ionicons'

const SearchIcon = ({ navigation }) => {
    return (
        <Ionicons
            name='search'
            size={28}
            color='white'
            style={[styles.icon]}
            onPress={() => {
                navigation.push('WebView', searchParams)
            }}
        />
    )
}

export default SearchIcon

const styles = StyleSheet.create({
    icon: {
        zIndex: 999
    }
})