
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Home from '../screens/Home'
import WebView from '../screens/WebView'
import SignIn from '../screens/SignIn'

import {
    contactParams,
    aboutParams,
    signUpParams,
    termsParams,
    privacyParams
} from './RouteParams'

import {
    StackOptions,
    drawerStyle
} from './NavigatorOptions'
import DrawerContent from './DrawerContent'

const Drawer = createDrawerNavigator()

const HomeStack = createStackNavigator()

const HomeNavigator = () => (
    <HomeStack.Navigator
        screenOptions={StackOptions}
    >
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen name="WebView" component={WebView} />
        <HomeStack.Screen name="Contact" component={WebView} initialParams={contactParams} />
        <HomeStack.Screen name="About" component={WebView} initialParams={aboutParams} />
        <HomeStack.Screen name="SignIn" component={SignIn} />
        <HomeStack.Screen name="SignUp" component={WebView} initialParams={signUpParams}/>
        <HomeStack.Screen name="Terms" component={WebView} initialParams={termsParams} />
        <HomeStack.Screen name="Privacy" component={WebView} initialParams={privacyParams} />
    </HomeStack.Navigator>
)

const AppNavigator = () => {
    return (
    <NavigationContainer>
        <Drawer.Navigator
            drawerContent={({ navigation }) => <DrawerContent navigation={navigation} />}
            drawerStyle={drawerStyle}
        >
            <Drawer.Screen name="HomeStack" component={HomeNavigator} />
        </Drawer.Navigator>
    </NavigationContainer>
)}

export default AppNavigator
