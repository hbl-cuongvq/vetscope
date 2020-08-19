import React from 'react';

import {StyleSheet, ScrollView} from 'react-native';

import PropTypes from 'prop-types';

import TopicItem from './TopicItem';

import {normalize} from '../configs/responsive';

const itemWidth = normalize(138, 'width');
const itemMargin = 8;

const TopicList = ({data, type, onPressItem}) => {
  return (
    <ScrollView
      horizontal
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      snapToOffsets={data.map(
        (item, index) => (itemWidth + itemMargin) * index * 2,
      )}
      snapToInterval={2}
      snapToAlignment="start"
      decelerationRate="fast"
      disableIntervalMomentum={true}
      snapToStart={true}
      snapToEnd={true}
      scrollEventThrottle={1}>
      {data.map((item, index) => (
        <TopicItem
          key={item.id}
          item={item}
          type={type}
          isLastItem={index === data.length - 1}
          onPressItem={() => onPressItem(item)}
        />
      ))}
    </ScrollView>
  );
};

export default TopicList;

TopicList.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  onPressItem: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
});
