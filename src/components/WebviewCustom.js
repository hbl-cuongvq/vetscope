import React, {useState} from 'react';
import {WebView} from 'react-native-webview';

const WebviewCustom = (props) => {
  const {uri, onLoadStart, setRef, ...restProps} = props;
  const [currentURI, setCurrentURI] = useState(props.source.uri);
  const newSource = {...props.source, uri: currentURI};

  const onShouldStartLoadWithRequest = (request) => {
    // If we're loading the current URI, allow it to load
    if (request.url === currentURI) {
      return true;
    }
    // We're loading a new URL -- change state first
    setCurrentURI(request.url);
    return false;
  };

  return (
    <WebView
      ref={(r) => setRef(r)}
      source={newSource}
      onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
      {...restProps}
    />
  );
};

export default WebviewCustom;
