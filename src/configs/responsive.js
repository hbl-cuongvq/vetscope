import {Dimensions, PixelRatio, Platform} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// based on iPhone 8's scale
const wscale = SCREEN_WIDTH / 375;
const hscale = SCREEN_HEIGHT / 667;

const normalize = (size, based = 'width' || 'height') => {
  const newSize = based === 'height' ? size * hscale : size * wscale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export {SCREEN_HEIGHT, SCREEN_WIDTH, normalize};
