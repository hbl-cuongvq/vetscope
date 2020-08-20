import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';

const CheckBox = ({isChecked, setIsChecked}) => {
  return (
    <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
      {isChecked ? (
        <Image source={require('../assets/icon_check_act.png')} />
      ) : (
        <Image source={require('../assets/icon_check_off.png')} />
      )}
    </TouchableOpacity>
  );
};

export default CheckBox;

CheckBox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  setIsChecked: PropTypes.func,
};
