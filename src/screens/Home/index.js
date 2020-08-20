import React, {useEffect, useState, useContext, useCallback} from 'react';
import {View, StatusBar, Animated, BackHandler} from 'react-native';
import {AuthContext} from '../../contexts/AuthContext';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import HeaderHome from '../../components/HeaderHome';
import AdList from '../../components/AdList';
import LectureList from '../../components/LectureList';
import ProcedureList from '../../components/ProcedureList';
import CurrentTopics from '../../components/CurrentTopics';
import Footer from '../../components/Footer';
import ConfirmEmail, {CheckConfirm} from '../../components/ConfirmEmail';
import LoadingHome from '../../components/LoadingHome';

import Config from 'react-native-config';

import {
  searchParams,
  currentTopicsParams,
  lectureParams,
  procedureParams,
} from '../../navigations/RouteParams';

import styles from './style';

import Axios from 'axios';

import {getToken} from '../../common/localStorageManager';

const Home = ({navigation, route}) => {
  const [ads, setAds] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [polls, setPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useContext(AuthContext);
  const insets = useSafeAreaInsets();

  const headerMaxHeight = 40;
  const headerHeight = insets.top + headerMaxHeight;

  const scrollY = new Animated.Value(0);
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, headerHeight * 2);

  const headerY = diffClampScrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
  });

  const getData = async (source) => {
    try {
      let token = await getToken();
      if (token) {
        let result = await Axios({
          method: 'get',
          url: `${Config.BASE_URL}/api/v1/home`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cancelToken: source.token,
        });

        if (result) {
          setAds(result.data.advertisements);
          setLectures(result.data.lectures);
          setProcedures(result.data.procedures);
          setDiscussions(result.data.discussions);
          setPolls(result.data.polls);
          setIsLoading(false);
        }
      }
    } catch (error) {
      if (typeof error === 'string') {
        console.log(error);
      } else {
        let message = error.response?.data?.message;
        if (message) {
          console.log(message);
        }
      }
    }
  };

  useEffect(() => {
    let CancelToken = Axios.CancelToken;
    let source = CancelToken.source();

    getData(source);

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        BackHandler.exitApp();
      },
    );

    let {isPressedNotification, initialParams} = route.params;
    if (isPressedNotification && auth.tokenState) {
      navigation.navigate('WebView', initialParams);
    }

    return () => {
      source.cancel();
      backHandler.remove();
    };
  }, []);

  const openSideBar = useCallback(() => navigation.openDrawer(), [navigation]);

  const onPressSearch = useCallback(
    () => navigation.push('WebView', searchParams),
    [navigation],
  );

  const onPressSeeAllTopic = () =>
    navigation.navigate('WebView', currentTopicsParams);

  const onPressSeeAllLecture = () =>
    navigation.navigate('WebView', lectureParams);

  const onPressSeeAllProcedure = () =>
    navigation.navigate('WebView', procedureParams);

  const onPressItem = (item) =>
    navigation.navigate('WebView', {
      url: item.link_url || item.detail_url || '',
      title: 'Loading...',
    });

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <HeaderHome
        openSideBar={openSideBar}
        onPressSearch={onPressSearch}
        headerY={headerY}
      />

      {auth.isWaitingToConfirm ? (
        <CheckConfirm />
      ) : (
        !auth.confirmEmail && <ConfirmEmail />
      )}
      {isLoading ? (
        <LoadingHome />
      ) : (
        <Animated.ScrollView
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}
          bounces={false}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.contentWrapper}>
            {ads.length > 0 && <AdList ads={ads} onPressItem={onPressItem} />}

            {lectures.length > 0 && (
              <LectureList
                lectures={lectures}
                onPressItem={onPressItem}
                onPressSeeAllLecture={onPressSeeAllLecture}
              />
            )}
            {procedures.length > 0 && (
              <ProcedureList
                procedures={procedures}
                onPressItem={onPressItem}
                onPressSeeAllProcedure={onPressSeeAllProcedure}
              />
            )}
            <CurrentTopics
              discussions={discussions}
              polls={polls}
              onPressItem={onPressItem}
              onPressSeeAllTopic={onPressSeeAllTopic}
            />
          </View>

          <Footer />
        </Animated.ScrollView>
      )}
    </View>
  );
};

Home.whyDidYouRender = true;

export default Home;
