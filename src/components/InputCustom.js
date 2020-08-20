import React, {useState, useCallback} from 'react';
import {View, Text, Image, StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {normalize} from '../configs/responsive';

const InputCustom = ({
  label,
  imageSource,
  keyboardType,
  onChangeText,
  value,
  isAcceptSecureControl,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [isSecureText, setIsSecureText] = useState(true);

  const secureControl = useCallback(() => setIsSecureText(!isSecureText), [isSecureText]);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={isFocus ? styles.inputWrapperFocus : styles.inputWrapper}>
        <Image source={imageSource} style={styles.icon} />
        <TextInput
          style={styles.input}
          secureTextEntry={isAcceptSecureControl ? isSecureText : false}
          keyboardType={keyboardType}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChangeText={onChangeText}
          value={value}
        />
        {isAcceptSecureControl && (
          <Ionicons
            name={isSecureText ? 'eye' : 'eye-off'}
            size={normalize(16)}
            color="white"
            onPress={secureControl}
            style={styles.secureControlIcon}
          />
        )}
      </View>
    </View>
  );
};

export default InputCustom;

InputCustom.propTypes = {
  label: PropTypes.string,
  imageSource: PropTypes.node,
  isAcceptSecureControl: PropTypes.bool,
  keyboardType: PropTypes.string,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    backgroundColor: 'rgba(1,26,39,0.8)',
  },
  inputWrapperFocus: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#18d08c',
    borderRadius: 2,
    backgroundColor: 'rgba(1,21,24,0.8)',
  },
  icon: {
    width: normalize(16),
    height: normalize(16),
    resizeMode: 'cover',
    marginHorizontal: 8,
  },
  label: {
    fontSize: normalize(14),
    color: 'rgba(255,255,255,0.7)',
    paddingVertical: 4,
    letterSpacing: 0.6,
    marginTop: 12,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: normalize(16),
    padding: 8,
  },
  secureControlIcon: {
    paddingHorizontal: 8
  }
});
