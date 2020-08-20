import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {normalize} from '../configs/responsive';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const WelcomeHeader = ({onPress, hidden}) => {
  const welcomeStr = 'Welcome back!\nPlease log in with your email.';

  return hidden ? null : (
    <View style={styles.welcomeHeader}>
      <Text style={styles.welcomeText}>{welcomeStr}</Text>
      <TouchableOpacity style={styles.linkWrapper} onPress={onPress}>
        <Text style={[styles.linkText, styles.underLine]}>
          New here? Let's create an account.{' '}
        </Text>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={normalize(26)}
          color="#18d08c"
        />
        <Text style={[styles.linkText, styles.bold]}> Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeHeader;

const styles = StyleSheet.create({
  welcomeHeader: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    flex: 0.6,
  },
  welcomeText: {
    fontSize: normalize(24),
    color: 'white',
    letterSpacing: 0.6,
    textShadowColor: 'black',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 12,
  },
  linkWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  underLine: {
    textDecorationLine: 'underline',
  },
  linkText: {
    color: '#18d08c',
    fontSize: normalize(14),
    textShadowColor: 'black',
    textShadowOffset: {
      width: 1.5,
      height: 1.5,
    },
    textShadowRadius: 6,
  },
  bold: {
    fontWeight: 'bold',
  },
});
