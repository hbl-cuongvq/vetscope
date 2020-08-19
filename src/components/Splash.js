import React from 'react';
import { View, ActivityIndicator, Image, StyleSheet } from 'react-native';
import Logo from '../assets/logo.png'
import {SCREEN_WIDTH} from '../configs/responsive'

const logoWidth = parseInt(SCREEN_WIDTH * 0.64);
const logoHeight = parseInt(logoWidth / 15 * 8);

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <ActivityIndicator size="large" color="white" style={styles.loadingIcon}/>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#011A27'
  },
  logo: {
    width: logoWidth,
    height: logoHeight,
    transform: [{translateY: 5}],
    resizeMode: 'contain'
  },
  loadingIcon: {
    position: 'absolute',
    transform: [{translateY: 60}]
  }
})