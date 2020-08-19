import AsyncStorage from '@react-native-community/async-storage';

const TOKEN_KEY = 'token';
const COVER_IMAGE_KEY = 'cover_image';
const IMAGE_PATH_KEY = 'image_path';
const FIRST_NAME_KEY = 'first_name';
const MIDDLE_NAME_KEY = 'middle_name';
const LAST_NAME_KEY = 'last_name';
const NICK_NAME_KEY = 'nick_name';

// TOKEN
export const getToken = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return token;
};

export const setToken = async (token) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const deleteToken = () => {
  return AsyncStorage.removeItem(TOKEN_KEY);
};

// COVER IMAGE
const getCoverImage = async () => {
  const coverImage = await AsyncStorage.getItem(COVER_IMAGE_KEY);
  return coverImage;
};

const setCoverImage = async (coverImage) => {
  if (coverImage) {
    await AsyncStorage.setItem(COVER_IMAGE_KEY, coverImage);
  }
};

const deleteCoverImage = () => {
  return AsyncStorage.removeItem(COVER_IMAGE_KEY);
};

// IMAGE PATH
const getImagePath = async () => {
  const imagePath = await AsyncStorage.getItem(IMAGE_PATH_KEY);
  return imagePath;
};

const setImagePath = async (imagePath) => {
  if (imagePath) {
    await AsyncStorage.setItem(IMAGE_PATH_KEY, imagePath);
  }
};

const deleteImagePath = () => {
  return AsyncStorage.removeItem(IMAGE_PATH_KEY);
};

// FIRST NAME
const getFirstName = async () => {
  const firstName = await AsyncStorage.getItem(FIRST_NAME_KEY);
  return firstName;
};

const setFirstName = async (firstName) => {
  if (firstName) {
    await AsyncStorage.setItem(FIRST_NAME_KEY, firstName);
  }
};

const deleteFirstName = () => {
  return AsyncStorage.removeItem(FIRST_NAME_KEY);
};

// MIDDLE NAME
const getMiddleName = async () => {
  const middleName = await AsyncStorage.getItem(MIDDLE_NAME_KEY);
  return middleName;
};

const setMiddleName = async (middleName) => {
  if (middleName) {
    await AsyncStorage.setItem(MIDDLE_NAME_KEY, middleName);
  }
};

const deleteMiddleName = () => {
  return AsyncStorage.removeItem(MIDDLE_NAME_KEY);
};

// LAST NAME
const getLastName = async () => {
  const lastName = await AsyncStorage.getItem(LAST_NAME_KEY);
  return lastName;
};

const setLastName = async (lastName) => {
  if (lastName) {
    await AsyncStorage.setItem(LAST_NAME_KEY, lastName);
  }
};

const deleteLastName = () => {
  return AsyncStorage.removeItem(LAST_NAME_KEY);
};

// NICK NAME
const getNickName = async () => {
  const nickName = await AsyncStorage.getItem(NICK_NAME_KEY);
  return nickName;
};

const setNickName = async (nickName) => {
  if (nickName) {
    await AsyncStorage.setItem(NICK_NAME_KEY, nickName);
  }
};

const deleteNickName = () => {
  return AsyncStorage.removeItem(NICK_NAME_KEY);
};

export const setProfile = async (
  cover_image,
  image_path,
  first_name,
  middle_name,
  last_name,
  nick_name,
) => {
  await setCoverImage(cover_image);
  await setImagePath(image_path);
  await setFirstName(first_name);
  await setMiddleName(middle_name);
  await setLastName(last_name);
  await setNickName(nick_name);
};

export const getProfile = async () => {
  let coverImage = await getCoverImage();
  let imagePath = await getImagePath();
  let firstName = await getFirstName();
  let middleName = await getMiddleName();
  let lastName = await getLastName();
  let nickName = await getNickName();

  let profile = {
    coverImage: coverImage,
    imagePath: imagePath,
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    nickName: nickName,
  };

  return profile;
};

export const deleteProfile = async () => {
  await deleteCoverImage();
  await deleteImagePath();
  await deleteFirstName();
  await deleteMiddleName();
  await deleteLastName();
  await deleteNickName();
};
