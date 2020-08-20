import React, {useMemo} from 'react';

import {Animated, StyleSheet} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import PropTypes from 'prop-types';

import Ionicons from 'react-native-vector-icons/Ionicons';

import SearchIcon from './SearchIcon';

import {SCREEN_WIDTH, normalize} from '../configs/responsive';

const HeaderHome = ({openSideBar, onPressSearch, headerY}) => {
  const insets = useSafeAreaInsets();

  const header = useMemo(
    () => (
      <Animated.View
        style={[
          styles.header,
          styles.paddingNotch(insets.top),
          styles.animate(headerY),
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
    ),
    [headerY, openSideBar, onPressSearch],
  );

  return header;
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
  animate: (translateY) => ({
    transform: [{translateY: translateY}],
  }),
});
