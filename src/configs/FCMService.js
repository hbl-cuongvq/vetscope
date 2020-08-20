import messaging from '@react-native-firebase/messaging';
import {localNotificationService} from './LocalNotification';
import * as RootNavigation from '../navigations/RootNavigation';

class FCMServiceClass {
  handleMessageForeground = () => {
    messaging().onMessage(async (remoteMessage) => {
      console.log(remoteMessage);
      await localNotificationService.displayImmediately(
        remoteMessage.notification,
        remoteMessage.data,
      );
    });
  };

  handleMessageBackground = () => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {});
  };

  checkApplicationPermission = async () => {
    await messaging().requestPermission();
  };

  handlePressMessageBackground = () => {
    // Not check on IOS
    messaging().onNotificationOpenedApp((remoteMessage) => {
      if (remoteMessage) {
        // Notification caused app to open from background state
        // Need more config
        if (remoteMessage.data.url) {
          let params = {
            url: remoteMessage.data.url,
            title: 'Loading...',
            isReload: true,
          };
          RootNavigation.navigate('WebView', params);
        } else {
          RootNavigation.navigate('Home');
        }
      }
    });
  };

  handlePressMessageAppQuit = (setInitialRoute, setInitialParams) => {
    // Not check on IOS
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          // Notification caused app to open from quit state
          // Need more config
          if (remoteMessage.data.url) {
            setInitialRoute('Home');
            let params = {
              url: remoteMessage.data.url,
              title: 'Loading...',
              isReload: true,
            };
            setInitialParams(params);
          }
        }
      });
  };

  getDeviceToken = async () => {
    return await messaging().getToken();
  };
}

const fcmService = new FCMServiceClass();

export {fcmService};
