/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Animated,
  ScrollView,
} from 'react-native';

import styles from './style';

import CheckBox from '../../components/CheckBox';

import InputCustom from '../../components/InputCustom';

import Footer from '../../components/Footer';

import BackgroundImage from '../../assets/bg_signup.png';
import MailIcon from '../../assets/icon_mail.png';
import LockIcon from '../../assets/icon_lock.png';
import AngleRight from '../../assets/icon_angle_right.png';

const SignIn = ({navigation}) => {
  const [isChecked, setIsChecked] = useState(false);
  const fade = new Animated.Value(0);
  const slide = new Animated.Value(-30);

  const goToSignUp = () => navigation.navigate('SignUp');
  const welcomeStr = 'Welcome back!\nPlease log in with your email.';

  useEffect(() => {
    navigation.setOptions({
      title: 'Sign In | VETSCOPE',
    });

    welcomeAppeare();
  }, []);

  const welcomeAppeare = () => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
    Animated.timing(slide, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        style={styles.backgroundImage}
      />

      <Animated.View
        style={[styles.welcomeHeader, styles.welcomeAnimated(fade, slide)]}>
        <Text style={styles.welcomeText}>{welcomeStr}</Text>
        <TouchableOpacity style={styles.linkWrapper} onPress={goToSignUp}>
          <Text style={[styles.linkText, styles.underLine]}>
            New here? Let's create an account.{' '}
          </Text>
          <Image source={AngleRight} />
          <Text style={[styles.linkText, styles.bold]}> Sign Up</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.body}>
        <View style={styles.bodyDiangleShapeLeft} />
        <View style={styles.bodyDiangleShapeRight} />

        <InputCustom
          label={'Email'}
          imageSource={MailIcon}
          keyboardType="email-address"
        />

        <InputCustom
          label={'Password'}
          imageSource={LockIcon}
          secureTextEntry={true}
        />

        <View style={styles.checkBoxWrapper}>
          <CheckBox isChecked={isChecked} setIsChecked={setIsChecked} />
          <Text style={styles.checkBoxText}>Remember me</Text>
        </View>

        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotWrapper}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </ScrollView>
  );
};

export default SignIn;
