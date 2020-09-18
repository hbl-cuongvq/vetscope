/* eslint-disable no-catch-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable no-alert */
import React, {useEffect, useState, useRef} from 'react';

import {AppState} from 'react-native';

const AuthContext = React.createContext();

import Splash from '../components/Splash';

import {authentication} from '../api/auth';

import {
  deleteToken,
  getToken,
  setToken,
  deleteProfile,
  setProfile,
} from '../common/localStorageManager';

import {EMAIL_REGEX, EMAIL_CONFIRM_STATUS} from '../constants/authConstants';

import {LoginManager, AccessToken} from 'react-native-fbsdk';

const AuthProvider = ({children}) => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState(null);
  const [isWaitingToConfirm, setIsWaitingToConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tokenState, setTokenState] = useState(null);
  const appState = useRef(AppState.currentState);

  const onCheckEmail = async (token) => {
    try {
      let {message, email} = await authentication.checkEmail(token);

      if (message === EMAIL_CONFIRM_STATUS.CONFIRMED) {
        // save confirm email
        setConfirmEmail(email);
        setIsWaitingToConfirm(false);
      }

      if (message === EMAIL_CONFIRM_STATUS.UNCONFIRMED) {
        setIsWaitingToConfirm(true);
      }
    } catch (error) {
      if (typeof error === 'string') {
        console.log(error);
      } else {
        let message = error.response?.data?.message;
        if (message !== EMAIL_CONFIRM_STATUS.NOTFOUND) {
          console.log(message);
        }

        // token expired
        let status = error.response?.status;
        if (status === 401) {
          // force logout
          setDefault();
        }
      }
    }
  };

  const onConfirmEmail = async (email, typeWork) => {
    try {
      const result = await authentication.confirmEmail(email, typeWork);

      if (result) {
        let token = await getToken();
        if (token) {
          await onCheckEmail(token);
        }
      }
    } catch (error) {
      let message = error.response?.data?.message;
      if (message) {
        alert(message);
      }
    }
  };

  const validate = (email, password) => {
    // check email empty
    if (!email) {
      return {error: 'Email is require'};
    }

    // check format email
    let isValidEmail = EMAIL_REGEX.test(email);
    if (!isValidEmail) {
      return {error: 'Email is not valid!'};
    }

    // check password empty
    if (!password) {
      return {error: 'Password is require!'};
    }

    // email and password is ok
    return {error: null};
  };

  const onLogin = async () => {
    // validate
    let {error} = validate(email, password);
    if (error) {
      alert(error);
      return false;
    }

    // validate done
    try {
      let {token, profile} = await authentication.login(email, password);
      if (token) {
        await setToken(token);

        await onCheckEmail();

        await authentication.sendDeviceInfo(token);

        setTokenState(token);

        // set profile
        setProfile(
          profile.cover_image.toString(),
          profile.image_path.toString(),
          profile.first_name,
          profile.middle_name,
          profile.last_name,
          profile.nick_name,
        ).catch((err) => console.log(err));
        setIsLogin(true);

        return true;
      }
    } catch (error) {
      let message = error.response?.data?.message;
      if (message) alert(message);
      return false;
    }
  };

  const setDefault = async () => {
    // delete local storage key
    await deleteToken();
    await deleteProfile();

    // set auth state
    setEmail('');
    setPassword('');
    setIsLogin(false);
    setTokenState(null);
    setConfirmEmail(null);
    setIsWaitingToConfirm(false);
  };

  const onLogout = async () => {
    try {
      await authentication.logout();
      await setDefault();
    } catch (error) {
      if (typeof error === 'string') {
        alert(error);
      } else {
        let message = error.response?.data?.message;
        alert(message);
      }
    }
  };

  const onLoginWithFacebook = async () => {
    try {
      let {isCancelled} = await LoginManager.logInWithPermissions([
        'public_profile',
      ]);

      if (isCancelled) {
        console.log('Login was cancelled');
        return {isCancel: true};
      }

      let {accessToken} = await AccessToken.getCurrentAccessToken();

      if (accessToken) {
        let {token, profile} = await authentication.loginWithFacebook({
          authorization_code: accessToken,
        });
        if (token) {
          await setToken(token);
          await onCheckEmail();
          await authentication.sendDeviceInfo(token);
          setTokenState(token);
          // set profile
          setProfile(
            profile.cover_image.toString(),
            profile.image_path.toString(),
            profile.first_name,
            profile.middle_name,
            profile.last_name,
            profile.nick_name,
          ).catch((err) => console.log(err));

          setIsLogin(true);
          return {isCancel: false};
        }
      }
    } catch ({response}) {
      alert(response.data.message);
    }
  };

  const onChangeEmail = (text) => setEmail(text);

  const onChangePassword = (text) => setPassword(text);

  const checkLogin = async () => {
    // await deleteToken();
    let token = await getToken();
    if (token) {
      await onCheckEmail(token);
      setIsLogin(true);
      setTokenState(token);
    } else {
      setIsLogin(false);
    }
  };

  const handleAppStateChange = async (nextAppState) => {
    appState.current = nextAppState;
    if (appState.current === 'active') {
      await checkLogin();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider
      value={{
        email: email,
        password: password,
        confirmEmail: confirmEmail,
        isWaitingToConfirm: isWaitingToConfirm,
        isLogin: isLogin,
        onLogin: onLogin,
        onLoginWithFacebook: onLoginWithFacebook,
        onLogout: onLogout,
        onChangeEmail: onChangeEmail,
        onChangePassword: onChangePassword,
        onConfirmEmail: onConfirmEmail,
        tokenState: tokenState,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider, AuthContext};
