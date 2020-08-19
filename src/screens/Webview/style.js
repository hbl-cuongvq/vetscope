import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#011A27',
    flex: 1,
  },
  webView: {
    backgroundColor: 'transparent',
  },
  backArrow: (insets) => ({
    position: 'absolute',
    zIndex: 9999,
    top: insets.top + 24,
    left: 16,
  }),
});

export default styles;
