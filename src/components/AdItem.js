import React from 'react';
import {Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import LinearGradient from 'react-native-linear-gradient';

import {normalize, SCREEN_WIDTH} from '../configs/responsive';

const thumbHeight = normalize(407, 'height');
const gradientHeight = normalize(188, 'height');
const gradientColors = ['rgba(0,0,0,0)', 'rgba(0,0,0,0.9)'];

const AdItem = ({item, onPressItem}) => {
  return (
    <TouchableOpacity onPress={onPressItem}>
      <Image style={styles.thumb} source={{uri: item.thumb}} />
      <LinearGradient colors={gradientColors} style={styles.linearGradient}>
        <Text style={styles.adTitle}>{item.title || ''}</Text>
        <Text style={styles.adDetail}>{item.detail || ''}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AdItem;

AdItem.propTypes = {
  item: PropTypes.object.isRequired,
  onPressItem: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  adTitle: {
    fontSize: normalize(26),
    color: 'white',
  },
  adDetail: {
    color: 'white',
    fontSize: normalize(13),
  },
  linearGradient: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: gradientHeight,
    bottom: 0,
    padding: 12,
    justifyContent: 'flex-end',
  },
  thumb: {
    width: SCREEN_WIDTH,
    height: thumbHeight,
  },
});
