import React, {useContext, useEffect, useState} from 'react';

import {AuthContext} from '../contexts/AuthContext';

import {View, Text, TouchableOpacity} from 'react-native';

import CacheImage from '../components/CacheImage';

import styles from './style';

import Animated from 'react-native-reanimated';

import {DrawerItem} from '@react-navigation/drawer';

import Feather from 'react-native-vector-icons/Feather';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {normalize} from '../configs/responsive';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {profileParams, editSettingsParams} from './RouteParams';

import {getProfile} from '../common/localStorageManager';

import {
  AboutIcon,
  ContactIcon,
  HomeIcon,
  PrivacyIcon,
  SignOutIcon,
  TermsIcon,
} from './DrawerIcons';

const defaultProfile = {
  coverImage: null,
  imagePath: null,
  firstName: null,
  middleName: null,
  lastName: null,
  nickName: null,
};

const DrawerContent = (props) => {
  const [profile, setProfile] = useState(defaultProfile);
  const auth = useContext(AuthContext);
  const insets = useSafeAreaInsets();
  const {navigation, progress, setProgress} = props;

  const itemsAnim = [
    Animated.interpolate(progress, {
      inputRange: [0, 1],
      outputRange: [-200, 0],
    }),
    Animated.interpolate(progress, {
      inputRange: [0, 1],
      outputRange: [-500, 0],
    }),
    Animated.interpolate(progress, {
      inputRange: [0, 1],
      outputRange: [-800, 0],
    }),
    Animated.interpolate(progress, {
      inputRange: [0, 1],
      outputRange: [-1100, 0],
    }),
    Animated.interpolate(progress, {
      inputRange: [0, 1],
      outputRange: [-1400, 0],
    }),
  ];

  const profileHandle = async () => {
    let localProfile = await getProfile();
    if (localProfile) {
      setProfile(localProfile);
    }
  };

  useEffect(() => {
    profileHandle();
    setProgress(progress);
  }, []);

  const onCloseDrawerAndLogout = async () => {
    await auth.onLogout();
    navigation.closeDrawer();
  };

  const fullName = (firstName, middleName, lastName) => {
    return [firstName, middleName, lastName].join(' ');
  };

  return (
    <Animated.View style={styles.container(insets.top, insets.bottom)}>
      {/* COVER IMAGE */}
      {profile.coverImage ? (
        <CacheImage uri={profile.coverImage} style={styles.coverImage} />
      ) : (
        <View style={styles.coverImage} />
      )}

      {/* CUSTOM SHAPE TO DESIGN BORDER */}
      <View style={styles.roundAvatar} />
      <View style={styles.rectangle} />

      {/* AVATAR */}
      <View style={styles.avatarWrapper}>
        {profile.imagePath ? (
          <CacheImage uri={profile.imagePath} style={styles.avatar} />
        ) : (
          <Feather name="user" size={normalize(72)} color="white" />
        )}
      </View>

      {/* FULL NAME */}
      <View style={styles.fullNameWrapper}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('WebView', profileParams)}>
          <Text style={styles.fullName}>
            {fullName(profile.firstName, profile.middleName, profile.lastName)}
          </Text>
        </TouchableOpacity>
        <MaterialIcons
          name="edit"
          color={'white'}
          size={normalize(22)}
          onPress={() =>
            props.navigation.navigate('WebView', editSettingsParams)
          }
        />
      </View>

      {/* NICK NAME */}
      <Text style={styles.nickName}>
        {profile.nickName ? `@${profile.nickName}` : ''}
      </Text>

      <Animated.View style={styles.itemAnim(itemsAnim[0])}>
        <DrawerItem
          label="Home"
          labelStyle={styles.labelStyle}
          inactiveTintColor="white"
          onPress={() => navigation.navigate('Home')}
          icon={HomeIcon}
        />
      </Animated.View>

      <Animated.View style={styles.itemAnim(itemsAnim[0])}>
        <DrawerItem
          label="About"
          labelStyle={styles.labelStyle}
          inactiveTintColor="white"
          onPress={() => navigation.navigate('About')}
          icon={AboutIcon}
        />
      </Animated.View>
      <Animated.View style={styles.itemAnim(itemsAnim[1])}>
        <DrawerItem
          label="Contact"
          labelStyle={styles.labelStyle}
          inactiveTintColor="white"
          onPress={() => navigation.navigate('Contact')}
          icon={ContactIcon}
        />
      </Animated.View>
      <Animated.View style={styles.itemAnim(itemsAnim[2])}>
        <DrawerItem
          label="Terms"
          labelStyle={styles.labelStyle}
          inactiveTintColor="white"
          icon={TermsIcon}
          onPress={() => navigation.navigate('Terms')}
          style={styles.drawerItem}
        />
      </Animated.View>
      <Animated.View style={styles.itemAnim(itemsAnim[3])}>
        <DrawerItem
          label="Privacy"
          labelStyle={styles.labelStyle}
          inactiveTintColor="white"
          icon={PrivacyIcon}
          onPress={() => navigation.navigate('Privacy')}
          style={styles.drawerItem}
        />
      </Animated.View>
      <Animated.View style={[styles.itemAnim(itemsAnim[4]), styles.logoutItem]}>
        <DrawerItem
          label="Logout"
          labelStyle={styles.labelStyle}
          inactiveTintColor="white"
          style={[styles.drawerItem, styles.signOutItem(insets)]}
          icon={SignOutIcon}
          onPress={onCloseDrawerAndLogout}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default DrawerContent;
