import React, { useEffect, useState, useRef } from 'react'
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    Animated
} from 'react-native'

import HeaderHome from '../components/HeaderHome'
import AdList from '../components/AdList'
import LectureList from '../components/LectureList'
import ProcedureList from '../components/ProcedureList'
import CurrentTopics from '../components/CurrentTopics'
import Footer from '../components/Footer'

import Axios from 'axios'

const { width } = Dimensions.get('window')

const Home = ({ navigation }) => {
    const fade = new Animated.Value(1)
    const slide = new Animated.Value(0)
    const [ads, setAds] = useState([])
    const [lectures, setLectures] = useState([])
    const [procedures, setProcedures] = useState([])
    const [discussions, setDiscussions] = useState([])
    const [polls, setPolls] = useState([])
    let offset = 0

    useEffect(() => {
        const getAds = async () => {
            try {
                let resAds = await Axios.get('https://5f0430828b06d60016dde1f5.mockapi.io/api/v1/ads?page=3&&limit=5')
                setAds(resAds.data)

                let resLectures = await Axios.get('https://5f0430828b06d60016dde1f5.mockapi.io/api/v1/lectures?page=4&&limit=5')
                setLectures(resLectures.data)

                let resProcedures = await Axios.get('https://5f0430828b06d60016dde1f5.mockapi.io/api/v1/procedure?page=1&&limit=5')
                setProcedures(resProcedures.data)

                let resDiscussions = await Axios.get('https://5f0430828b06d60016dde1f5.mockapi.io/api/v1/topics?page=1&&limit=6')
                setDiscussions(resDiscussions.data)

                let resPolls = await Axios.get('https://5f0430828b06d60016dde1f5.mockapi.io/api/v1/topics?page=2&&limit=6')
                setPolls(resPolls.data)
            } catch (err) {
                console.log(err)
            }
        }
        getAds()
    }, [])

    const onScrollHandle = (event) => {
        let currentOffset = event.nativeEvent.contentOffset.y
        let direction = currentOffset > offset ? 'down' : 'up'
        offset = currentOffset
        if (direction === 'down') {
            onScrollDown()
        }

        if (direction === 'up') {
            onScrollUp()
        }
    }

    const onScrollDown = () => {
        Animated.timing(fade, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start()
        Animated.timing(slide, {
            toValue: -50,
            duration: 200,
            useNativeDriver: false,
        }).start()
    }

    const onScrollUp = () => {
        Animated.timing(fade, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start()
        Animated.timing(slide, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start()
    }

    const openSideBar = () => navigation.openDrawer()

    return (
        <View
            style={styles.container}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            <HeaderHome
                fade={fade}
                slide={slide}
                openSideBar={openSideBar}
                navigation={navigation}
            />
            <ScrollView
                onScrollEndDrag={onScrollHandle}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.contentWrapper}>
                    {
                        ads.length > 0 &&
                        <AdList ads={ads} navigation={navigation}/>
                    }

                    {
                        lectures.length > 0 &&
                        <LectureList lectures={lectures} navigation={navigation} />
                    }
                    {
                        procedures.length > 0 &&
                        <ProcedureList procedures={procedures} navigation={navigation} />
                    }
                    <CurrentTopics
                        discussions={discussions}
                        polls={polls}
                        navigation={navigation}
                    />
                </View>

                <Footer />
            </ScrollView>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#011A27',
        flex: 1
    },
    contentWrapper: {
        marginBottom: 24
    },
    icon: {
        zIndex: 999
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        width: width,
        padding: 8,
        zIndex: 999
    }
})