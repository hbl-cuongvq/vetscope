import React, {useEffect, useState, useContext} from 'react';
import {View, ScrollView, Animated} from 'react-native';
import {AuthContext} from '../../contexts/AuthContext';

import HeaderHome from '../../components/HeaderHome';
import AdList from '../../components/AdList';
import LectureList from '../../components/LectureList';
import ProcedureList from '../../components/ProcedureList';
import CurrentTopics from '../../components/CurrentTopics';
import Footer from '../../components/Footer';
import ConfirmEmail, {CheckConfirm} from '../../components/ConfirmEmail';
import LoadingHome from '../../components/LoadingHome'

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

const Home = ({navigation}) => {
  const fade = new Animated.Value(1);
  const slide = new Animated.Value(0);
  const [ads, setAds] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [polls, setPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useContext(AuthContext);

  let offset = 0;

  const getData = async () => {
    try {
      let token = await getToken();
      if (token) {
        let result = await Axios({
          method: 'get',
          url: `${Config.BASE_URL}/api/v1/home`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    } catch ({response}) {
      console.log(response.data.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onScrollHandle = (event) => {
    let currentOffset = event.nativeEvent.contentOffset.y;
    let direction = currentOffset > offset ? 'down' : 'up';
    offset = currentOffset;
    if (direction === 'down') {
      onScrollDown();
    }

    if (direction === 'up') {
      onScrollUp();
    }
  };

  const onScrollDown = () => {
    Animated.timing(fade, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(slide, {
      toValue: -50,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const onScrollUp = () => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(slide, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const openSideBar = () => navigation.openDrawer();

  const onPressSearch = () => navigation.push('WebView', searchParams);

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
      {auth.isWaitingToConfirm ? (
        <CheckConfirm />
      ) : (
        !auth.confirmEmail && <ConfirmEmail />
      )}
      <HeaderHome
        fade={fade}
        slide={slide}
        openSideBar={openSideBar}
        onPressSearch={onPressSearch}
      />
      {isLoading ? (
        <LoadingHome />
      ) : (
        <ScrollView
          onScrollEndDrag={onScrollHandle}
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
        </ScrollView>
      )}
    </View>
  );
};

export default Home;
