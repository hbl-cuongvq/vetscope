import React, {useEffect, useState} from 'react';
import {View, ScrollView, Animated} from 'react-native';

import HeaderHome from '../../components/HeaderHome';
import AdList from '../../components/AdList';
import LectureList from '../../components/LectureList';
import ProcedureList from '../../components/ProcedureList';
import CurrentTopics from '../../components/CurrentTopics';
import Footer from '../../components/Footer';

import {
  searchParams,
  currentTopicsParams,
  lectureParams,
  procedureParams,
} from '../../navigations/RouteParams';

import styles from './style';

import Axios from 'axios';

const Home = ({navigation}) => {
  const fade = new Animated.Value(1);
  const slide = new Animated.Value(0);
  const [ads, setAds] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [polls, setPolls] = useState([]);
  let offset = 0;

  useEffect(() => {
    const getAds = async () => {
      try {
        const [
          resAds,
          resLectures,
          resProcedures,
          resDiscussions,
          resPolls,
        ] = await Promise.all([
          Axios.get(
            'https://5f0430828b06d60016dde1f5.mockapi.io/api/v1/ads?page=3&&limit=5',
          ),
          Axios.get(
            'https://5f0430828b06d60016dde1f5.mockapi.io/api/v1/lectures?page=4&&limit=5',
          ),
          Axios.get(
            'https://5f0430828b06d60016dde1f5.mockapi.io/api/v1/procedure?page=1&&limit=5',
          ),
          Axios.get(
            'https://5f0430828b06d60016dde1f5.mockapi.io/api/v1/topics?page=1&&limit=6',
          ),
          Axios.get(
            'https://5f0430828b06d60016dde1f5.mockapi.io/api/v1/topics?page=2&&limit=6',
          ),
        ]);
        setAds(resAds.data);
        setLectures(resLectures.data);
        setProcedures(resProcedures.data);
        setDiscussions(resDiscussions.data);
        setPolls(resPolls.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAds();
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
      url: item.url,
      title: 'Loading...',
    });

  return (
    <View
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <HeaderHome
        fade={fade}
        slide={slide}
        openSideBar={openSideBar}
        onPressSearch={onPressSearch}
      />
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
    </View>
  );
};

export default Home;
