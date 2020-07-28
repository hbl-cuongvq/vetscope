import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from '../screens/Home';
import WebView from '../screens/Webview';
import SignIn from '../screens/SignIn';

import {contactParams, aboutParams, signUpParams} from './RouteParams';

import {StackOptions} from './NavigatorOptions';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

const HomeStack = createStackNavigator();

const HomeNavigator = () => (
  <HomeStack.Navigator screenOptions={StackOptions}>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="WebView" component={WebView} />
    <HomeStack.Screen
      name="Contact"
      component={WebView}
      initialParams={contactParams}
    />
    <HomeStack.Screen
      name="About"
      component={WebView}
      initialParams={aboutParams}
    />
    <HomeStack.Screen name="SignIn" component={SignIn} />
    <HomeStack.Screen
      name="SignUp"
      component={WebView}
      initialParams={signUpParams}
    />
  </HomeStack.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={({navigation}) => (
          <DrawerContent navigation={navigation} />
        )}>
        <Drawer.Screen name="HomeStack" component={HomeNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
