
import React from 'react'

import {
    Animated,
    StyleSheet,
    Dimensions
} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'

import SearchIcon from './SearchIcon'

const { width } = Dimensions.get('window')

const HeaderHome = ({fade, slide, openSideBar, navigation}) => {
    return (
        <Animated.View
                style={[styles.header, {
                    opacity: fade,
                    top: slide,
                }]}
            >
                {/* MENU ICON */}
                <Ionicons
                    name='menu'
                    size={28}
                    onPress={openSideBar}
                    color='white'
                    style={styles.icon}
                />
                {/* SEARCH ICON */}
                <SearchIcon navigation={navigation} />
            </Animated.View>
    )
}

export default HeaderHome

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        width: width,
        padding: 8,
        zIndex: 999
    }
})