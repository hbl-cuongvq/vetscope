import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';

import moment from 'moment';

import {SCREEN_WIDTH, normalize} from '../configs/responsive';

const widthItem = normalize(138, 'width');
const heightItem = normalize(176, 'width');
const marginItem = 8;

const TopicItem = ({item, type, isLastItem, onPressItem}) => {
  const dateString = (created) => {
    let date = new Date(created);
    if (date instanceof Date) {
      return moment(date).fromNow().toString();
    }
    return '';
  };

  const pickColor =
    type === 'Discussion' ? '#B48EE0' : type === 'Poll' ? '#F26586' : 'white';

  return (
    <TouchableOpacity
      style={[styles.container, styles.marginItem(isLastItem)]}
      onPress={onPressItem}>
      <Text style={styles.typeColor(pickColor)}>{type}</Text>
      <Text style={styles.title} lineBreakMode={'tail'} numberOfLines={4}>
        {item.title || ''}
      </Text>
      <View style={styles.row}>
        <Text style={styles.comments}>{item.comments || ''}</Text>
        <Text style={styles.created}> - {dateString(item.created)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TopicItem;

TopicItem.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string,
  isLastItem: PropTypes.bool.isRequired,
  onPressItem: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    width: widthItem,
    height: heightItem,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.5)',
    padding: 12,
    borderRadius: 2,
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    fontSize: normalize(18),
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 4,
  },
  comments: {
    fontSize: normalize(12),
    color: 'white',
    fontWeight: 'bold',
  },
  created: {
    fontSize: normalize(12),
    color: 'rgba(255,255,255,0.7)',
  },
  marginItem: (isLastItem) => ({
    marginRight: isLastItem
      ? SCREEN_WIDTH - widthItem * 2 - marginItem
      : marginItem,
  }),
  typeColor: (color) => ({
    color: color,
  }),
});
