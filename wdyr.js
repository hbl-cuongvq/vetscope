import React from 'react';
import Config from 'react-native-config'

if (Config.APP_STATE === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}