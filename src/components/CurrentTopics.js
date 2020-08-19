import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';

import TopicList from './TopicList';
import {normalize} from '../configs/responsive';

const CurrentTopics = ({
  discussions,
  polls,
  onPressSeeAllTopic,
  onPressItem,
}) => {
  return (
    discussions.length > 0 &&
    polls.length > 0 && (
      <View style={styles.container}>
        <View
          style={[styles.row, styles.marginTitle, styles.justifySpaceBetween]}>
          <Text style={[styles.title, styles.bold]}>Current Topics</Text>
          <TouchableOpacity onPress={onPressSeeAllTopic}>
            <Text style={styles.link}>See All</Text>
          </TouchableOpacity>
        </View>
        <TopicList
          type="Discussion"
          data={discussions}
          onPressItem={onPressItem}
        />
        <View style={styles.space} />
        <TopicList type="Poll" data={polls} onPressItem={onPressItem} />
      </View>
    )
  );
};

export default CurrentTopics;

CurrentTopics.propTypes = {
  discussions: PropTypes.array.isRequired,
  polls: PropTypes.array.isRequired,
  onPressItem: PropTypes.func.isRequired,
  onPressSeeAllTopic: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.5)',
  },
  title: {
    fontSize: normalize(16),
    color: 'white',
  },
  marginTitle: {
    marginHorizontal: 12,
    marginBottom: 16,
  },
  link: {
    color: '#18d08c',
  },
  bold: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  space: {
    marginBottom: 2,
  },
});
