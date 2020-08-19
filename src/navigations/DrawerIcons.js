import React from 'react';
import {Image} from 'react-native';

import signOutIcon from '../assets/icon_signout.png';
import aboutIcon from '../assets/icon_about.png';
import contactIcon from '../assets/icon_contact.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {normalize} from '../configs/responsive';

import styles from './style';

export const HomeIcon = () => (
  <AntDesign
    name="home"
    size={normalize(24)}
    color="white"
    style={styles.homeIconMargin}
  />
);

export const AboutIcon = () => (
  <Image source={aboutIcon} style={styles.drawerAboutIcon} />
);

export const ContactIcon = () => (
  <Image source={contactIcon} style={styles.icon} />
);

export const TermsIcon = () => (
  <MaterialIcons name="access-time" size={normalize(20)} color="white" />
);

export const PrivacyIcon = () => (
  <MaterialIcons name="security" size={normalize(20)} color="white" />
);

export const SignOutIcon = () => (
  <Image source={signOutIcon} style={styles.iconLogout} />
);
