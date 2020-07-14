import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler';

const CheckBox = ({ isChecked, setIsChecked }) => {
    return (
        <TouchableOpacity
            onPress={() => setIsChecked(!isChecked)}
        >
            {
                isChecked ?
                    <Image
                        source={require('../assets/icon_check_act.png')}
                    />
                    :
                    <Image
                        source={require('../assets/icon_check_off.png')}
                    />
            }
        </TouchableOpacity>
    )
}

export default CheckBox

const styles = StyleSheet.create({
})