import React, {useMemo} from 'react';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

const CacheImage = ({uri, style}) => {
  const image = useMemo(() => (
    <FastImage
      style={style}
      source={{
        uri: uri,
        cache: FastImage.cacheControl.immutable,
        priority: FastImage.priority.high,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  ), [uri]);

  return image;
};

export default CacheImage;

CacheImage.propTypes = {
  uri: PropTypes.string.isRequired,
  style: PropTypes.object,
};
