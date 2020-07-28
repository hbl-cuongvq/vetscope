import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {normalize} from '../configs/responsive';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textFooter}>© VETSCOPE All rights reversed.</Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0a2738',
    height: normalize(44),
    paddingTop: 14,
  },
  textFooter: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: normalize(11),
    textAlign: 'center',
  },
});
