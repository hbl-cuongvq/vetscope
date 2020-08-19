import Config from 'react-native-config';

const loadingTitle = 'Loading...';

const contactParams = {
  title: loadingTitle,
  url: `${Config.BASE_URL}/contact_no_login`,
};

const aboutParams = {
  title: loadingTitle,
  url: `${Config.BASE_URL}/static/about`,
};

const signInParams = {
  title: loadingTitle,
  url: `${Config.BASE_URL}/login`,
};

const signUpParams = {
  title: loadingTitle,
  url: `${Config.BASE_URL}/users/sign_up`,
};

const lectureParams = {
  title: loadingTitle,
  url: `${Config.BASE_URL}/lectures`,
};

const termsParams = {
  title: loadingTitle,
  url: `${Config.BASE_URL}/static/terms`,
};

const privacyParams = {
  title: loadingTitle,
  url: `${Config.BASE_URL}/static/privacy`,
};

const procedureParams = {
  title: loadingTitle,
  url: `${Config.BASE_URL}/procedures`,
};

const currentTopicsParams = {
  title: loadingTitle,
  url: `${Config.BASE_URL}/lounge`,
};

const searchParams = {
  title: loadingTitle,
  url: `${Config.BASE_URL}/videos?search_word=`,
};

const forgotPasswordParams = {
  title: loadingTitle,
  url: `${Config.BASE_URL}/users/password/new`,
};

export {
  contactParams,
  aboutParams,
  signInParams,
  signUpParams,
  lectureParams,
  termsParams,
  privacyParams,
  procedureParams,
  currentTopicsParams,
  searchParams,
  forgotPasswordParams,
};
