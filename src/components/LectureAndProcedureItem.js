import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import CacheImage from '../components/CacheImage'

import PropTypes from 'prop-types';

import LinearGradient from 'react-native-linear-gradient';

import ccIcon from '../assets/icon_cc.png';

import {SCREEN_WIDTH, normalize} from '../configs/responsive';

const widthItem = normalize(296, 'width');
const heightItem = normalize(166.5, 'width');
const gradientColor = ['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)'];

const LectureAndProcedureItem = ({item, isLastItem, onPressItem}) => {
  const joinString = (nameArr) => {
    return nameArr.map((itemName) => itemName.name).join(' ');
  };

  return (
    <TouchableOpacity
      style={[styles.container, styles.marginItem(isLastItem)]}
      onPress={onPressItem}>
      <View>
        <CacheImage style={styles.thumbnail} uri={item.thumbnail} />
        <LinearGradient
          colors={gradientColor}
          style={styles.gradientWrapper(item.subtitles_available)}>
          {item.subtitles_available && (
            <Image style={styles.ccIcon} source={ccIcon} />
          )}
          <Text style={styles.videoTime}>{item.video_time || ''}</Text>
        </LinearGradient>
      </View>

      <View style={styles.txt}>
        <Text style={[styles.title, styles.link]}>{item.title || ''}</Text>
        <Text style={styles.text}>
          {item.lecturer_name || joinString(item.lecturers) || ''}
        </Text>
        <View style={[styles.row, styles.flexWrap]}>
          <Text style={[styles.text, styles.italic, styles.provided]}>
            Provided by{' '}
          </Text>
          <Text style={styles.text}>
            {item.provider_name || joinString(item.providers) || ''}
          </Text>
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
  thumbnail: {
    width: widthItem,
    height: heightItem,
  },
  row: {
    flexDirection: 'row',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  gradientWrapper: (subtitlesAvailable) => ({
    position: 'absolute',
    width: widthItem,
    bottom: 0,
    height: normalize(64),
    justifyContent: subtitlesAvailable ? 'space-between' : 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
  }),
  videoTime: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: normalize(12),
    padding: 4,
  },
  ccIcon: {
    width: normalize(30),
    height: normalize(26),
  },
  marginItem: (isLastItem) => ({
    marginRight: isLastItem ? SCREEN_WIDTH - widthItem : 8,
  }),
});
