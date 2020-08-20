import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import PropTypes from 'prop-types';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {normalize} from '../configs/responsive';

const SearchIcon = ({onPressSearch}) => {
  const searchIcon = useMemo(
    () => (
      <Ionicons
        name="search"
        size={normalize(28)}
        color="white"
        style={[styles.icon]}
        onPress={onPressSearch}
      />
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
    zIndex: 999,
  },
});
