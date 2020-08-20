import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {normalize} from '../configs/responsive';

const SearchIcon = ({onPressSearch}) => {
  const searchIcon = useMemo(
    () => (
      <TouchableOpacity style={styles.icon} onPress={onPressSearch}>
        <Ionicons name="search" size={normalize(28)} color="white" />
      </TouchableOpacity>
    ),
    [onPressSearch],
  );

  return searchIcon;
};

export default SearchIcon;

SearchIcon.propTypes = {
  onPressSearch: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  icon: {
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});
