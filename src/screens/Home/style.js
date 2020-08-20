import {SCREEN_WIDTH} from '../../configs/responsive';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#011A27',
    flex: 1,
  },
  contentWrapper: {
    marginBottom: 24,
  },
  icon: {
    zIndex: 999,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: SCREEN_WIDTH,
    padding: 8,
    zIndex: 999,
  },
});

export default styles;
