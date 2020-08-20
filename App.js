import React, {useEffect, useState} from 'react';
import AppNavigator from './src/navigations/AppNavigator';
import {fcmService} from './src/configs/FCMService';
import {localNotificationService} from './src/configs/LocalNotification';
import * as RootNavigation from './src/navigations/RootNavigation';
import {AuthProvider} from './src/contexts/AuthContext';

import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const [initialRoute, setInitialRoute] = useState('Home');
  const [initialParams, setInitialParams] = useState(null);

  useEffect(() => {
    fcmService.checkApplicationPermission();
    fcmService.handleMessageForeground();

    fcmService.handlePressMessageAppQuit(setInitialRoute, setInitialParams);
    fcmService.handlePressMessageBackground();
    localNotificationService.handlePressMessageForeground();

    SplashScreen.hide();

    return () => RootNavigation.setIsReadyRef(false);
  }, []);

  return (
    <AuthProvider>
      <AppNavigator
        initialRouteName={initialRoute}
        initialParams={initialParams}
      />
    </AuthProvider>
  );
};

export default App;
