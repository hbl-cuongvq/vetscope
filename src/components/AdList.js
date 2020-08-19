import React from 'react';
import {ScrollView} from 'react-native';
import PropTypes from 'prop-types';

import AdItem from './AdItem';

const AdList = ({ads, onPressItem}) => {
  return (
    <ScrollView horizontal pagingEnabled>
      {ads.map((item) => (
        <AdItem
          key={item.id}
          item={item}
          onPressItem={() => onPressItem(item)}
        />
      ))}
    </ScrollView>
  );
};

AdList.propTypes = {
  ads: PropTypes.array.isRequired,
  onPressItem: PropTypes.func.isRequired,
};

export default AdList;
