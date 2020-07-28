import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, BackHandler} from 'react-native';

import {HeaderBackButton} from '@react-navigation/stack';

import {WebView} from 'react-native-webview';

import styles from './style';

const jscode = `
        let header = document.getElementById("header");
            if (header) {
                header.style.display = 'none';
                header.style.visibility="hidden";
                header.style.height=0;
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
`;

const WebViewScreen = ({route, navigation}) => {
  const {url, title, canGoBack} = route.params;
  const {setParams, setOptions} = navigation;
  const [nativeEvent, setNativeEvent] = useState(null);

  let webViewRef;

  const Loading = () => (
    <ActivityIndicator size="large" color="white" style={styles.loading} />
  );

  const goBack = () => {
    if (webViewRef) {
      if (canGoBack) {
        webViewRef.goBack();
      } else {
        navigation.navigate('Home');
      }
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (nativeEvent) {
      setParams({
        url: nativeEvent.url,
        title: nativeEvent.title,
        canGoBack: nativeEvent.canGoBack,
      });
    }
  }, [nativeEvent, setParams]);

  useEffect(() => {
    setOptions({
      title: title,
      headerLeft: () => <HeaderBackButton onPress={goBack} tintColor="white" />,
    });

    BackHandler.addEventListener('hardwareBackPress', goBack);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress');
    };
  });

  return (
    <View style={styles.container}>
      <WebView
        ref={(r) => (webViewRef = r)}
        source={{uri: url}}
        onLoad={(event) => {
          setNativeEvent(event.nativeEvent);
        }}
        startInLoadingState={true}
        renderLoading={() => <Loading />}
        injectedJavaScript={jscode}
        style={styles.webView}
      />
    </View>
  );
};

export default WebViewScreen;
