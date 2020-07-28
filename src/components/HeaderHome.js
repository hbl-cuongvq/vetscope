import React from 'react';

import {Animated, StyleSheet} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import PropTypes from 'prop-types';

import Ionicons from 'react-native-vector-icons/Ionicons';

import SearchIcon from './SearchIcon';

import {SCREEN_WIDTH, normalize} from '../configs/responsive';

const HeaderHome = ({fade, slide, openSideBar, onPressSearch}) => {
  const insets = useSafeAreaInsets();

  return (
    <Animated.View
      style={[
        styles.header,
        {
          opacity: fade,
          top: slide,
        },
        styles.paddingNotch(insets.top),
      ]}>
      {/* MENU ICON */}
      <Ionicons
        name="menu"
        size={normalize(28, 'width')}
        onPress={openSideBar}
        color="white"
        style={styles.icon}
      />
      {/* SEARCH ICON */}
      <SearchIcon onPressSearch={onPressSearch} />
    </Animated.View>
  );
};

export default HeaderHome;

HeaderHome.propTypes = {
  openSideBar: PropTypes.func.isRequired,
  onPressSearch: PropTypes.func.isRequired,
  fade: PropTypes.object,
  slide: PropTypes.object,
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: SCREEN_WIDTH,
    paddingHorizontal: 8,
    zIndex: 999,
  },
  paddingNotch: (topInset) => ({
    paddingTop: topInset + 4,
  }),
});
