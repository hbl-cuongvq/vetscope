import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';

import LinearGradient from 'react-native-linear-gradient';

import {SCREEN_WIDTH, normalize} from '../configs/responsive';

const widthItem = normalize(296, 'width');
const heightItem = normalize(166.5, 'width');
const gradientColor = ['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)'];

const LectureAndProcedureItem = ({item, isLastItem, onPressItem}) => {
  return (
    <TouchableOpacity
      style={[styles.container, styles.marginItem(isLastItem)]}
      onPress={onPressItem}>
      <View>
        <Image style={styles.image} source={{uri: item.thumb}} />
        <LinearGradient colors={gradientColor} style={styles.gradientWrapper}>
          <Text style={styles.time}>{item.time || ''}</Text>
        </LinearGradient>
      </View>

      <View style={styles.txt}>
        <Text style={[styles.title, styles.link]}>{item.title || ''}</Text>
        <Text style={styles.text}>{item.people || ''}</Text>
        <View style={styles.row}>
          <Text style={[styles.text, styles.italic, styles.provided]}>
            Provided by{' '}
          </Text>
          <Text style={styles.text}>{item.provided || ''}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LectureAndProcedureItem;

LectureAndProcedureItem.propTypes = {
  item: PropTypes.object.isRequired,
  isLastItem: PropTypes.bool.isRequired,
  onPressItem: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginRight: 8,
    width: widthItem,
  },
  title: {
    fontSize: normalize(16),
  },
  link: {
    color: '#18d08c',
  },
  txt: {
    padding: 4,
  },
  text: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: normalize(12),
  },
  italic: {
    fontStyle: 'italic',
  },
  provided: {
    color: 'rgba(255,255,255,0.4)',
  },
  image: {
    width: widthItem,
    height: heightItem,
  },
  row: {
    flexDirection: 'row',
  },
  gradientWrapper: {
    position: 'absolute',
    width: widthItem,
    bottom: 0,
    height: normalize(64),
    justifyContent: 'flex-end',
  },
  time: {
    color: 'rgba(255,255,255,0.7)',
    alignSelf: 'flex-end',
    fontSize: normalize(12),
    padding: 4,
  },
  marginItem: (isLastItem) => ({
    marginRight: isLastItem ? SCREEN_WIDTH - widthItem : 8,
  }),
});
