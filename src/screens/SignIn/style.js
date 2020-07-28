import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH, normalize} from '../../configs/responsive';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#011A27',
  },
  backgroundImage: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  body: {
    paddingHorizontal: 24,
    backgroundColor: 'rgba(0,13,20,0.8)',
  },
  bodyDiangleShapeLeft: {
    borderTopWidth: 40,
    borderTopColor: 'transparent',
    borderLeftWidth: parseInt(SCREEN_WIDTH / 2, 10),
    borderLeftColor: 'rgba(0,13,20,0.8)',
    position: 'absolute',
    top: -40,
    left: 0,
  },
  bodyDiangleShapeRight: {
    borderTopWidth: 40,
    borderTopColor: 'transparent',
    borderRightWidth: parseInt(SCREEN_WIDTH / 2, 10),
    borderRightColor: 'rgba(0,13,20,0.8)',
    position: 'absolute',
    top: -40,
    right: 0,
  },
  welcomeHeader: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    height: normalize(232),
  },
  welcomeText: {
    fontSize: normalize(22),
    color: 'white',
    letterSpacing: 0.6,
    textShadowColor: 'black',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 12,
  },
  linkWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  underLine: {
    textDecorationLine: 'underline',
  },
  bold: {
    fontWeight: 'bold',
  },
  linkText: {
    color: '#18d08c',
    fontSize: normalize(14),
    textShadowColor: 'black',
    textShadowOffset: {
      width: 1.5,
      height: 1.5,
    },
    textShadowRadius: 6,
  },
  checkBoxWrapper: {
    marginBottom: 24,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  checkBoxText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: normalize(14),
    marginLeft: 10,
  },
  submitBtn: {
    padding: 6,
    borderWidth: 1,
    borderColor: '#18d08c',
    borderRadius: 4,
    width: normalize(220),
    height: normalize(48),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  submitBtnText: {
    color: '#18d08c',
    fontSize: normalize(20),
  },
  forgotWrapper: {
    alignSelf: 'center',
    marginVertical: 24,
  },
  forgotText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: normalize(12),
    textDecorationLine: 'underline',
  },
  welcomeAnimated: (fade, slide) => ({
    opacity: fade,
    marginTop: slide,
  }),
});

export default styles;
