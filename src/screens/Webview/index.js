import React, {useEffect, useState, useContext} from 'react';
import {View, BackHandler, Animated, ActivityIndicator} from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {normalize} from '../../configs/responsive';

import {HeaderBackButton} from '@react-navigation/stack';

import WebviewCustom from '../../components/WebviewCustom';
import {AuthContext} from '../../contexts/AuthContext';

import styles from './style';

const jsCode = `
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
`;

const WebViewScreen = ({route, navigation}) => {
  const {url, title, canGoBack, isReload} = route.params;
  const {setParams, setOptions} = navigation;
  const [nativeEvent, setNativeEvent] = useState(null);
  const auth = useContext(AuthContext);
  const insets = useSafeAreaInsets();

  let webViewRef;

  const goBack = () => {
    if (webViewRef) {
      if (canGoBack) {
        webViewRef.goBack();
      } else {
        navigation.goBack();
      }
      return true;
    }
    return false;
  };

  const isShowAuthScreen = ['SignUp', 'ForgotPassword'].includes(route.name);

  const getTitle = () => {
    return title.split(' | ')[0];
  };

  useEffect(() => {
    if (isReload) {
      webViewRef.reload();
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
      headerShown: !isShowAuthScreen,
      title: getTitle(),
      headerLeft: () => <HeaderBackButton onPress={goBack} tintColor="white" />,
    });

    BackHandler.addEventListener('hardwareBackPress', goBack);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress');
    };
  });

  const onLoadEnd = () => {
    webViewRef.injectJavaScript(jsCode);
  };

  const slide = new Animated.Value(0);
  const onScroll = Animated.event([], {
    listener: (event) => slide.setValue(-event.nativeEvent.contentOffset.y),
    useNativeDriver: false,
  });

  const Loading = () => (
    <ActivityIndicator size="large" color="white" style={styles.loadingIcon} />
  );

  return (
    <View style={styles.container}>
      {isShowAuthScreen && (
        <Animated.View style={styles.arrowLeft(insets, slide)} accessible>
          <SimpleLineIcons
            name="arrow-left"
            size={normalize(20)}
            color="white"
            onPress={goBack}
          />
        </Animated.View>
      )}

      <WebviewCustom
        setRef={(r) => (webViewRef = r)}
        source={{
          uri: url,
          headers: {
            Authorization: `Bearer ${auth.tokenState}`,
          },
        }}
        onLoad={(event) => {
          setNativeEvent(event.nativeEvent);
        }}
        renderLoading={() => <Loading />}
        onLoadEnd={onLoadEnd}
        injectedJavaScript={jsCode}
        startInLoadingState={true}
        sharedCookiesEnabled={true}
        onScroll={onScroll}
        style={styles.webView}
      />
    </View>
  );
};

export default WebViewScreen;
