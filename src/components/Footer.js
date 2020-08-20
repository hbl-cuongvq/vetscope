import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {normalize} from '../configs/responsive';

const Footer = ({hidden}) => {
  const insets = useSafeAreaInsets();

  return hidden ? null : (
    <View style={styles.container(insets)}>
      <Text style={styles.textFooter}>© VETSCOPE All rights reversed.</Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: (insets) => ({
    backgroundColor: '#0a2738',
    height: normalize(40 + insets.bottom),
    paddingTop: 14,
    paddingBottom: insets.bottom
  }),
  textFooter: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: normalize(10),
    letterSpacing: 0.8,
    textAlign: 'center',
  },
});
