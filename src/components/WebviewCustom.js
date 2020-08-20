import React, {useState} from 'react';
import {WebView} from 'react-native-webview';
import Config from 'react-native-config';

const WebviewCustom = (props) => {
  const {uri, onLoadStart, setRef, redirectHome, ...restProps} = props;
  const [currentURI, setCurrentURI] = useState(props.source.uri);
  const newSource = {...props.source, uri: currentURI};

  const onShouldStartLoadWithRequest = (request) => {
    if (`${Config.BASE_URL}/`.includes(request.url)) {
      redirectHome();
      return false;
    }

    setCurrentURI(request.url);
    return true;
  };

  return (
    <WebView
      ref={(r) => setRef(r)}
      source={newSource}
      cacheEnabled
      sharedCookiesEnabled={true}
      domStorageEnabled={true}
      bounces={false}
      onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
      {...restProps}
    />
  );
};

export default WebviewCustom;
