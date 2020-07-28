import React from 'react';

import {View, StyleSheet} from 'react-native';

import PropTypes from 'prop-types';

import {DrawerItem} from '@react-navigation/drawer';

const DrawerContent = ({navigation}) => {
  return (
    <View style={styles.container}>
      <DrawerItem
        label="Home"
        inactiveTintColor="white"
        onPress={() => navigation.navigate('Home')}
      />
      <DrawerItem
        label="Contact"
        inactiveTintColor="white"
        onPress={() => navigation.navigate('Contact')}
      />
      <DrawerItem
        label="About"
        inactiveTintColor="white"
        onPress={() => navigation.navigate('About')}
      />
      <DrawerItem
        label="Sign in"
        inactiveTintColor="white"
        onPress={() => navigation.navigate('SignIn')}
      />
      <DrawerItem
        label="Sign up"
        inactiveTintColor="white"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
};

export default DrawerContent;

DrawerContent.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(24,208,140,0.9)',
    flex: 1,
  },
});
