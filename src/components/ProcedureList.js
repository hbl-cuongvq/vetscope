import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';

import LectureAndProcedureItem from './LectureAndProcedureItem';

import {normalize} from '../configs/responsive';

const itemWidth = normalize(296, 'width');

const itemMargin = 8;

const ProcedureList = ({procedures, onPressSeeAllProcedure, onPressItem}) => {
  return (
    <View style={styles.container}>
      <View
        style={[styles.row, styles.justifySpaceBetween, styles.marginTitle]}>
        <View style={styles.row}>
          <Text style={[styles.title, styles.bold]}>Procedure - </Text>
          <Text style={[styles.title, styles.popular]}>Popular</Text>
        </View>
        <TouchableOpacity onPress={onPressSeeAllProcedure}>
          <Text style={styles.link}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        snapToOffsets={procedures.map(
          (procedure, index) => (itemWidth + itemMargin) * (index + 1),
        )}
        snapToInterval={1}
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum={true}
        snapToStart={true}
        snapToEnd={true}>
        {procedures.map((item, index) => (
          <LectureAndProcedureItem
            key={item.id}
            item={item}
            isLastItem={index === procedures.length - 1}
            onPressItem={() => onPressItem(item)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ProcedureList;

ProcedureList.propTypes = {
  procedures: PropTypes.array.isRequired,
  onPressSeeAllProcedure: PropTypes.func.isRequired,
  onPressItem: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.5)',
  },
  listContainer: {
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    fontSize: normalize(16),
    color: 'white',
  },
  popular: {
    fontStyle: 'italic',
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
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
});
