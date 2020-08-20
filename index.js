import './wdyr'

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {fcmService} from './src/configs/FCMService';

fcmService.handleMessageBackground();
AppRegistry.registerComponent(appName, () => App);
