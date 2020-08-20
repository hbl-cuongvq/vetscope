import React from 'react';
import {Image, StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import Logo from '../assets/logo.png';
import {SCREEN_WIDTH} from '../configs/responsive';

const logoWidth = parseInt(SCREEN_WIDTH * 0.64, 10);
const logoHeight = parseInt((logoWidth / 15) * 8, 10);

const Splash = () => {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Image
        source={Logo}
        style={styles.logo}
      />
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#011A27',
  },
  logo: {
    width: logoWidth,
    height: logoHeight,
    resizeMode: 'contain',
  },
});
