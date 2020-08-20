import notifee, {EventType, AndroidStyle} from '@notifee/react-native';
import * as RootNavigation from '../navigations/RootNavigation';

class LocalNotificationClass {
  displayImmediately = async (notify, data) => {
    try {
      // Create a channel
      const channelId = await notifee.createChannel({
        id: 'vetscope',
        name: 'Vetscope Channel',
      });

      // Display a notification
      await notifee.displayNotification({
        title: notify.title,
        body: notify.body,
        data: data,
        android: {
          channelId,
          smallIcon: 'ic_notification',
          sound: 'default'
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  handlePressMessageForeground = () => {
    // Not check on IOS
    notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.PRESS:
          // Notification caused app to open from foreground state
          // Need more config
          if (detail.notification.data.url) {
            let params = {
              url: detail.notification.data.url,
              title: 'Loading...',
              isReload: true,
            };
            RootNavigation.navigate('WebView', params);
          } else {
            RootNavigation.navigate('Home');
          }
          break;

        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
      }
    });
  };
}

const localNotificationService = new LocalNotificationClass();

export {localNotificationService};
