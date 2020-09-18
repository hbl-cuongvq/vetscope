/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useContext, useCallback} from 'react';
import {View, BackHandler, Animated, ActivityIndicator} from 'react-native';

import {HeaderBackButton} from '@react-navigation/stack';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import WebviewCustom from '../../components/WebviewCustom';
import {AuthContext} from '../../contexts/AuthContext';

import styles from './style';

const jsCode = `
        try {
          let header = document.getElementById("header");
          if (header) {
            header.style.display = 'none';
            header.style.visibility="hidden";
            header.style.height=0;
          }
  
          let title = document.querySelector(".formContent_header .title");
          if (title) {
            title.style.display = 'none';
            title.style.visibility="hidden";
            title.style.height=0;
          }
  
          let formContent = document.querySelector(".formContent");
          if (formContent) {
            formContent.style.marginTop='32px';
          }
  
          let content = document.getElementById("content");
          if (content) {
            content.style.paddingTop = 0;
          }
  
          let fixedSignup = document.getElementsByClassName("fixedSignup");
          for (var i=0;i<fixedSignup.length;i++){
              fixedSignup[i].style.display = 'none';
              fixedSignup[i].style.visibility="hidden";
              fixedSignup[i].style.height=0;
          }
  
          let formContentBack = document.getElementsByClassName("formContent_back");
          for (var i=0;i<formContentBack.length;i++){
              formContentBack[i].style.display = 'none';
              formContentBack[i].style.visibility="hidden";
              formContentBack[i].style.height=0;
          }
  
          let body = document.querySelector("body");
          if (body) {
            body.style.userSelect='none';
            body.style.webkitUserSelect='none';
            body.style.MozUserSelect ='none';
          }
  
          let fixedBtn = document.getElementById("fixedBtn");
          if (fixedBtn) {
            fixedBtn.style.paddingBottom = '24px';
          }
        } catch(error) {
          console.log(error)
        }
        true;
`;

const WebViewScreen = ({route, navigation}) => {
  const {url, title, canGoBack, isReload} = route.params;
  const {setParams, setOptions} = navigation;
  const [nativeEvent, setNativeEvent] = useState(null);
  const auth = useContext(AuthContext);
  const [isLoading, setIsloading] = useState(true);
  const insets = useSafeAreaInsets();

  const scrollY = new Animated.Value(0);
  const backButtonHeight = 45;
  const headerHeight = insets.top + backButtonHeight;
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, headerHeight * 2);

  const translateY = diffClampScrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
  });

  const redirectHome = () => navigation.navigate('Home');

  const webViewRef = React.createRef();

  const isShowAuthScreen = ['SignUp', 'ForgotPassword'].includes(route.name);

  const goBack = useCallback(() => {
    try {
      if (nativeEvent) {
        if (canGoBack) {
          webViewRef.current.goBack();
        } else {
          if (isShowAuthScreen) {
            navigation.navigate('SignIn');
          } else {
            navigation.navigate('Home');
          }
        }
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }, [webViewRef, canGoBack]);

  const getTitle = () => {
    return title.split(' | ')[0];
  };

  useEffect(() => {
    if (isReload) {
      webViewRef.current.reload();
    }
  }, [isReload, webViewRef]);

  useEffect(() => {
    if (nativeEvent) {
      setParams({
        url: nativeEvent.url,
        title: nativeEvent.title,
        canGoBack: nativeEvent.canGoBack,
        isReload: false,
      });
    }
  }, [nativeEvent, setParams]);

  useEffect(() => {
    setOptions({
      title: isShowAuthScreen ? '' : getTitle(),
      headerShown: !isShowAuthScreen,
      headerLeft: () => (
        <HeaderBackButton
          onPress={goBack}
          tintColor="white"
          labelVisible={false}
        />
      ),
    });

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      goBack,
    );

    return () => {
      backHandler.remove();
    };
  });

  const Loading = () => (
    <View style={styles.loadingWrapper}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );

  return (
    <View style={styles.container}>
      {isShowAuthScreen && (
        <Animated.View
          style={styles.backButtonAnimate(insets, translateY)}
          accessible>
          <HeaderBackButton
            onPress={goBack}
            tintColor="white"
            labelVisible={false}
          />
        </Animated.View>
      )}

      {isLoading && <Loading />}

      <WebviewCustom
        setRef={(r) => {
          webViewRef.current = r;
        }}
        source={{
          uri: url,
          headers: {
            Authorization: `Bearer ${auth.tokenState}`,
          },
        }}
        onLoadEnd={(event) => {
          setNativeEvent(event.nativeEvent);
          webViewRef.current.injectJavaScript(jsCode);
          setIsloading(false);
        }}
        redirectHome={redirectHome}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        setIsloading={setIsloading}
        style={styles.webView(isLoading)}
        containerStyle={styles.webView(isLoading)}
      />
    </View>
  );
};

export default WebViewScreen;
