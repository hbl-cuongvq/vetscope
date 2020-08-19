import {StyleSheet} from 'react-native';

import {normalize} from '../configs/responsive';

const styles = StyleSheet.create({
  container: (topInset, bottomInset) => ({
    backgroundColor: '#011A27',
    flex: 1,
    // paddingTop: topInset,
    paddingBottom: bottomInset,
    elevation: 10,
  }),
  coverImage: {
    width: '100%',
    height: '26%',
    backgroundColor: '#16bc7f',
  },
  roundAvatar: {
    width: 112,
    height: 112,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: -56,
    borderRadius: 100,
  },
  rectangle: {
    width: '100%',
    height: 64,
    backgroundColor: '#011A27',
    borderTopWidth: 4,
    borderTopColor: 'white',
    marginTop: -60,
  },
  avatarWrapper: {
    backgroundColor: '#011A27',
    borderRadius: 72,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -112,
    alignSelf: 'center',
    elevation: 6,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 72,
    backgroundColor: '#011A27',
  },
  fullName: {
    alignSelf: 'center',
    color: 'white',
    fontSize: normalize(20),
    marginTop: 16,
    textShadowColor: 'white',
    textShadowRadius: 6,
    letterSpacing: 1.4,
  },
  drawerItem: {
    alignSelf: 'stretch',
  },
  drawerAboutIcon: {
    width: normalize(20),
    height: normalize(26),
  },
  icon: {
    width: normalize(20),
    height: normalize(20),
  },
  iconLogout: {
    width: normalize(21),
    height: normalize(17),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'stretch',
  },
  drawerLogout: {
    backgroundColor: 'tomato',
  },
  labelStyle: {
    letterSpacing: 0.8,
  },
  nickName: {
    alignSelf: 'center',
    color: 'white',
    marginTop: 4,
    marginBottom: 24,
    fontSize: normalize(12),
    letterSpacing: 0.8,
  },
  itemAnim: (translateX) => ({
    transform: [
      {
        translateX,
      },
    ],
  }),
  homeIconMargin: {
    marginLeft: -4,
  },
  logoutItem: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  signOutItem: (insets) => ({
    marginBottom: insets.bottom
  })
});

export default styles;