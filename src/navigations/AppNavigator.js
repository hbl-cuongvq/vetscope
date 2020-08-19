import React, {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {navigationRef, setIsReadyRef} from './RootNavigation';

import Home from '../screens/Home';
import WebView from '../screens/Webview';
import SignIn from '../screens/SignIn';

import {
  contactParams,
  aboutParams,
  signUpParams,
  termsParams,
  privacyParams,
  forgotPasswordParams,
} from './RouteParams';

import {AuthContext} from '../contexts/AuthContext';

import {StackOptions} from './NavigatorOptions';
import DrawerContent from './DrawerContent';

const AuthWebview = (props) => <WebView {...props} />;

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const HomeNavigator = ({initialRouteName, initialParams, style}) => {
  return (
    <Animated.View style={[styles.stack, style]}>
      <Stack.Navigator
        screenOptions={StackOptions}
        initialRouteName={initialRouteName}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="WebView"
          component={WebView}
          initialParams={initialParams}
        />
        <Stack.Screen
          name="Contact"
          component={WebView}
          initialParams={contactParams}
        />
        <Stack.Screen
          name="About"
          component={WebView}
          initialParams={aboutParams}
        />
        <Stack.Screen
          name="Terms"
          component={WebView}
          initialParams={termsParams}
        />
        <Stack.Screen
          name="Privacy"
          component={WebView}
          initialParams={privacyParams}
        />
      </Stack.Navigator>
    </Animated.View>
  );
};

const AuthenticationNavigator = () => (
  <Stack.Navigator screenOptions={StackOptions} initialRouteName="SignIn">
    <Stack.Screen
      name="SignIn"
      component={SignIn}
      options={{animationEnabled: false}}
    />
    <Stack.Screen
      name="SignUp"
      component={AuthWebview}
      initialParams={signUpParams}
    />
    <Stack.Screen
      name="ForgotPassword"
      component={AuthWebview}
      initialParams={forgotPasswordParams}
    />
  </Stack.Navigator>
);

const AppNavigator = ({initialRouteName, initialParams}) => {
  const auth = useContext(AuthContext);

  const [progress, setProgress] = useState(new Animated.Value(0));

  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {borderRadius, transform: [{scale}]};

  const HomeNavigatorWithRouteName = () => (
    <HomeNavigator
      initialRouteName={initialRouteName}
      initialParams={initialParams}
      style={animatedStyle}
    />
  );

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        setIsReadyRef(true);
      }}>
      {auth.isLogin === true ? (
        <Drawer.Navigator
          overlayColor="transparent"
          drawerType="slide"
          sceneContainerStyle={styles.sceneContainer}
          drawerContent={(props) => {
            setProgress(props.progress);
            return <DrawerContent {...props} />;
          }}>
          <Drawer.Screen name="Stack" component={HomeNavigatorWithRouteName} />
        </Drawer.Navigator>
      ) : (
        <AuthenticationNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    elevation: 5,
    overflow: 'hidden',
  },
  sceneContainer: {
    backgroundColor: '#011A27',
  },
});
