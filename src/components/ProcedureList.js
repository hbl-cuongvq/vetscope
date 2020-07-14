import React from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native'

import {procedureParams} from '../navigations/RouteParams'

import Item from './Item'

const { width } = Dimensions.get('window')

const itemWidth = parseInt(width * 72 / 100)

const ProcedureList = ({ procedures, navigation }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.row, { justifyContent: 'space-between' }, styles.marginTitle]}>
                <View style={styles.row}>
                    <Text style={[styles.title, styles.bold]}>Procedure - </Text>
                    <Text style={[styles.title, styles.popular]}>Popular</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('WebView', procedureParams)
                    }}
                >
                    <Text style={styles.link}>See All</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                style={styles.listContainer}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                snapToOffsets={procedures.map((p, i) => itemWidth * (i + 1) + 8 * (i + 1))}
                disableIntervalMomentum
            >
                {
                    procedures.map((item, index) => (
                        <Item
                            key={item.id}
                            item={item}
                            index={index}
                            length={procedures.length}
                            navigation={navigation}
                        />
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default ProcedureList

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(255,255,255,0.5)'
    },
    listContainer: {
        paddingHorizontal: 8
    },
    row: {
        flexDirection: 'row'
    },
    title: {
        fontSize: 16,
        color: 'white'
    },
    popular: {
        fontStyle: 'italic'
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
    }
})