import Axios from 'axios';
import Config from 'react-native-config';
import {getToken} from '../common/localStorageManager';
import {fcmService} from '../configs/FCMService';
import {Platform} from 'react-native';

class authClass {
  login = async (email, password) => {
    let result = await Axios({
      method: 'post',
      url: `${Config.BASE_URL}/api/v1/login`,
      data: {
        email: email,
        password: password,
      },
    });

    if (result.status === 200) {
      return result.data;
    }
  };

  logout = async () => {
    let deviceToken = await fcmService.getDeviceToken();

    let token = await getToken();
    if (token) {
      Axios({
        method: 'delete',
        url: `${Config.BASE_URL}/api/v1/device_notification`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          token: deviceToken,
          platform: Platform.OS,
        },
      }).then(async () => {
        await Axios({
          method: 'delete',
          url: `${Config.BASE_URL}/api/v1/logout`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      });
    }
  };

  loginWithFacebook = async (params) => {
    let result = await Axios({
      method: 'post',
      url: `${Config.BASE_URL}/api/v1/auth/facebook`,
      params: params,
    });

    if (result.status === 200) {
      return result.data;
    }
  };

  checkEmail = async (token) => {
    let result = await Axios({
      method: 'get',
      url: `${Config.BASE_URL}/api/v1/check_email`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (result.status === 200) {
      return result.data;
    }
  };

  confirmEmail = async (email, workType) => {
    let token = await getToken();

    let result = await Axios({
      method: 'patch',
      url: `${Config.BASE_URL}/api/v1/users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        email: email,
        work_type: workType,
      },
    });

    if (result.status === 200) {
      return result;
    }
  };

  sendDeviceInfo = async (token) => {
    let deviceToken = await fcmService.getDeviceToken();

    try {
      await Axios({
        method: 'post',
        url: `${Config.BASE_URL}/api/v1/device_notification`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          token: deviceToken,
          platform: Platform.OS,
        },
      });
    } catch ({response}) {
      console.log(response.data.message);
    }
  };

  loginWithFacebook = async (params) => {
    let result = await Axios({
      method: 'post',
      url: `${Config.BASE_URL}/api/v1/auth/facebook`,
      params: params,
    });

    if (result.status === 200) {
      return result.data;
    }
  };

  checkEmail = async () => {
    let token = await getToken();
    let result = await Axios({
      method: 'get',
      url: `${Config.BASE_URL}/api/v1/check_email`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (result.status === 200) {
      return result.data;
    }
  };

  confirmEmail = async (email, workType) => {
    let token = await getToken();
    let result = await Axios({
      method: 'patch',
      url: `${Config.BASE_URL}/api/v1/users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        email: email,
        work_type: workType,
      },
    });

    if (result.status === 200) {
      return result.data;
    }
  };
}

const authentication = new authClass();

export {authentication};
