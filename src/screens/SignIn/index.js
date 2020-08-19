/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  ActivityIndicator
} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context'

import styles from './style';

import InputCustom from '../../components/InputCustom';
import FacebookButton from '../../components/FacebookButton';

import WelcomeHeader from '../../components/WelcomeHeader';

import BackgroundImage from '../../assets/bg_signup.png';
import MailIcon from '../../assets/icon_mail.png';
import LockIcon from '../../assets/icon_lock.png';

import {AuthContext} from '../../contexts/AuthContext';

const SignIn = ({navigation}) => {
  const goToSignUp = () => navigation.navigate('SignUp');
  const goToForgotPassword = () => navigation.navigate('ForgotPassword');
  const auth = useContext(AuthContext);
  const insets = useSafeAreaInsets();

  const [hidden, setHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const keyboardDidShow = () => setHidden(true);
  const keyboardDidHide = () => setHidden(false);

  const onLoginWithEmailPassword = async () => {
    setIsLoading(true);
    let isLogin = await auth.onLogin();
    if (!isLogin) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    navigation.setOptions({
      headerTransparent: true,
      headerTitleStyle: {
        opacity: 0,
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        style={styles.backgroundImage}
      />

      <WelcomeHeader onPress={goToSignUp} hidden={hidden} />

      <View style={styles.body(hidden)}>
        <View style={styles.bodyTriangleShapeLeft} />
        <View style={styles.bodyTriangleShapeRight} />
        <View>
          <InputCustom
            label={'Email'}
            imageSource={MailIcon}
            keyboardType="email-address"
            auth={auth.email}
            onChangeText={auth.onChangeEmail}
          />

          <InputCustom
            label={'Password'}
            imageSource={LockIcon}
            secureTextEntry={true}
            auth={auth.password}
            onChangeText={auth.onChangePassword}
          />

          <View style={styles.row}>
            <TouchableOpacity style={styles.submitBtn} onPress={onLoginWithEmailPassword}>
              {
                isLoading ? 
                <ActivityIndicator size="small" color="#18d08c"/>
                :
                <Text style={styles.submitBtnText}>Log in</Text>
              }
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.forgotWrapper}
            onPress={goToForgotPassword}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <FacebookButton insets={insets} />
      </View>
    </View>
  );
};

export default SignIn;
