import React, { useEffect } from 'react'
import {
    View,
    StyleSheet,
    ActivityIndicator,
    BackHandler
} from 'react-native'

import { HeaderBackButton } from '@react-navigation/stack'

import { WebView } from 'react-native-webview'

const jscode = `
        let header = document.getElementById("header");
            if (header) {
                header.style.display = 'none';
                header.style.visibility="hidden";
                header.style.height=0;
        }

        let title = document.getElementsByClassName("title");
        for (var i=0;i<title.length;i++){
            title[i].style.display = 'none';
            title[i].style.visibility="hidden";
            title[i].style.height=0;
        }
        
        let fixedSignup = document.getElementsByClassName("fixedSignup");
        for (var i=0;i<fixedSignup.length;i++){
            fixedSignup[i].style.display = 'none';
            fixedSignup[i].style.visibility="hidden";
            fixedSignup[i].style.height=0;
        }

        let formContentBack = document.getElementsByClassName("formContent_back");
        for (var i=0;i<formContentBack.length;i++){
            formContentBack[i].style.display = 'none';
            formContentBack[i].style.visibility="hidden";
            formContentBack[i].style.height=0;
        }
`

const WebViewScreen = ({ route, navigation }) => {
    const { url, title, canGoBack } = route.params
    const { setParams, setOptions } = navigation

    let webViewRef

    const Loading = () => (
        <ActivityIndicator
            size='large'
            color='white'
            style={styles.loading}
        />
    )

    const goBack = () => {
        if (webViewRef) {
            if (canGoBack) {
                webViewRef.goBack()
            } else {
                navigation.navigate('Home')
            }
            return true
        }
        return false
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', goBack)

        setOptions({
            title: title,
            headerLeft: () => <HeaderBackButton onPress={goBack} tintColor='white' />,
            headerTintColor: 'white'
        })
    })

    return (
        <View style={styles.container}>
            <WebView
                ref={r => webViewRef = r}
                source={{ uri: url }}
                onLoad={(event) => {
                    setParams({
                        url: event.nativeEvent.url,
                        title: event.nativeEvent.title,
                        canGoBack: event.nativeEvent.canGoBack
                    })
                }}
                startInLoadingState={true}
                renderLoading={() => <Loading />}
                injectedJavaScript={jscode}
                style={styles.webView}
            />
        </View>
    )
}

export default WebViewScreen

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        alignSelf: 'center',
        top: 16
    },
    container: {
        backgroundColor: '#011A27',
        flex: 1
    },
    webView: {
        backgroundColor: '#011A27'
    }
})