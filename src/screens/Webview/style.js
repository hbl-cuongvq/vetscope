import {StyleSheet} from 'react-native';
import {SCREEN_HEIGHT} from '../../configs/responsive';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#011A27',
    flex: 1,
    height: SCREEN_HEIGHT,
  },
  webView: (isLoading) => ({
    flex: isLoading ? 0 : 1,
    backgroundColor: 'transparent',
  }),
  arrowLeft: (insets, slide) => ({
    transform: [{translateY: slide}],
    zIndex: 9999,
    position: 'absolute',
    left: 16,
    top: insets.top + 24,
  }),
  loadingWrapper: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: SCREEN_HEIGHT,
    zIndex: 99999,
  },
  backButtonAnimate: (insets, translateY) => ({
    position: 'absolute',
    zIndex: 999,
    marginTop: insets.top + 4,
    marginLeft: 8,
    transform: [{translateY}],
  }),
});

export default styles;
