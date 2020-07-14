import React from 'react'

import {
    View,
    StyleSheet,
    Image,
    Text,
} from 'react-native'

import EvilIcons from 'react-native-vector-icons/EvilIcons'

import {
    DrawerItem
} from '@react-navigation/drawer'

const DrawerContent = ({ navigation }) => {
    return (
        <View
            style={styles.container}
        >
            {/* ACCOUNT DISPLAY */}
            <View style={styles.accountWrapper}>
                {/* AVATAR  */}
                <EvilIcons
                    name='user'
                    size={72}
                    color="white"
                    style={styles.avatar}
                />

                {/* DISPLAY NAME */}
                <Text style={styles.displayName}>Display name</Text>

                {/* SIGN OUT BUTTON */}
                <Image style={styles.SignOutIcon} source={require('../assets/icon_signout.png')}/>
            </View>

            <View
                style={styles.itemsWrapper}
            >
                <DrawerItem
                    label="Sign in"
                    inactiveTintColor="white"
                    onPress={() => navigation.navigate('SignIn')}
                    icon={() => <Image style={styles.icon} source={require('../assets/icon_account.png')} />}
                />
                <DrawerItem
                    label="Contact"
                    inactiveTintColor="white"
                    onPress={() => navigation.navigate('Contact')}
                    icon={() => <Image style={styles.icon} source={require('../assets/icon_contact.png')} />}
                />
                <DrawerItem
                    label="About"
                    inactiveTintColor="white"
                    onPress={() => navigation.navigate('About')}
                    icon={() => <Image style={styles.icon} source={require('../assets/icon_about.png')} />}
                />
                <View
                    style={styles.row}
                >
                    <DrawerItem
                        label="Terms"
                        labelStyle={styles.labelCustomStyle}
                        inactiveTintColor="white"
                        onPress={() => navigation.navigate('Terms')}
                        style={styles.drawerCustomStyle}
                    />
                    <View
                        style={styles.line}
                    ></View>
                    <DrawerItem
                        label="Privacy"
                        labelStyle={styles.labelCustomStyle}
                        inactiveTintColor="white"
                        onPress={() => navigation.navigate('Privacy')}
                        style={styles.drawerCustomStyle}
                    />
                </View>

            </View>
        </View>
    )
}
export default DrawerContent

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(24,208,140,0.9)',
        flex: 1
    },
    icon: {
        width: 28,
        height: 30,
        resizeMode: 'contain'
    },
    SignOutIcon: {
        position: 'absolute',
        width: 22,
        height: 18,
        top: 0,
        right: 0
    },
    accountWrapper: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'rgba(255,255,255,0.7)',
        borderBottomWidth: 1,
        marginTop: 24,
        paddingBottom: 24,
        marginHorizontal: 10,
        marginBottom: 16
    },
    displayName: {
        color: 'white',
        fontSize: 18,
        alignSelf: 'center'
    },
    avatar: {
        fontSize: 160
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16
    },
    drawerCustomStyle: {
        height: 36,
        justifyContent: 'center',
        flex: 1,
    },
    labelCustomStyle: {
        transform: [{translateX: 30}],
    },
    line: {
        height: 36,
        borderRightColor: 'rgba(255,255,255,0.7)',
        borderRightWidth: 1
    }
})