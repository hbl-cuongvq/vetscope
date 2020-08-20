import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#011A27',
    flex: 1,
  },
  webView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  arrowLeft: (insets, slide) => ({
    transform: [{translateY: slide}],
    zIndex: 9999,
    position: 'absolute',
    left: 16,
    top: insets.top + 24,
  }),
  blur: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  loadingIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -16}],
    marginTop: -16,
  },
});

export default styles;
