import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';

import AdItem from './AdItem';

import {normalize} from '../configs/responsive';

const height = normalize(407, 'height');

const AdList = ({ads, onPressItem}) => {
  return (
    <Swiper
      showsButtons={false}
      loop
      showsPagination
      autoplay
      autoplayTimeout={3}
      horizontal
      activeDotStyle={styles.hiddenDot}
      style={styles.swiper}>
      {ads.map((item) => (
        <AdItem
          key={item.id}
          item={item}
          onPressItem={() => onPressItem(item)}
        />
      ))}
    </Swiper>
  );
};

AdList.propTypes = {
  ads: PropTypes.array.isRequired,
  onPressItem: PropTypes.func.isRequired,
};

export default AdList;

const styles = StyleSheet.create({
  swiper: {
    height: height,
  },
  hiddenDot: {
    display: 'none',
    height: 0,
  },
});
