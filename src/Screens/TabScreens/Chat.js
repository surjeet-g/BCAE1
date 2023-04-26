import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Alert, SafeAreaView, Linking } from "react-native";
import WebView from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Component/Header";
import { fetchSavedProfileData } from "../../Redux/ProfileDispatcher";
import { CustomActivityIndicator } from "../../Components/CustomActivityIndicator";
import {
  spacing,
  fontSizes,
  color,
  buttonType,
  buttonSize,
  bottomBarHeight,
  DEBUG_BUILD,
  STAGE_CHAT_URL,
  PROD_CHAT_URL,
} from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language";
import LoadingAnimation from "../../Components/LoadingAnimation";
import get from 'lodash.get'
import { downloadFile } from "../../Utilities/API/FileSystem";
import RNFetchBlob from "rn-fetch-blob";

const Chat = ({ route, navigation }) => {
  const handleUrlWithZip = (input) => {



    const urlDownload = input;

    let fileName = urlDownload


    //Downloading the file on a folder

    const dirs = RNFetchBlob.fs.dirs;
    const path = dirs.DocumentDir + "/" + fileName;

    RNFetchBlob
      .config({
        // response data will be saved to this path if it has access right.
        path: path
      })
      .fetch('GET', urlDownload, {
        //some headers ..

      })
      .progress((received, total) => {
        console.warn('progress', received / total)
      })
      .then(async (res) => {

        const base64String = await res.base64();
        const contentType = get(res, 'respInfo.headers.Content-Type', 'image/jpg')
        downloadFile('data:' + contentType + ';base64,' + base64String, "chatDoc")



      })


  }
  const webViewRef = useRef();
  let contactNo = route.params.contactNo;

  const dispatch = useDispatch([fetchSavedProfileData]);

  const [myscreenmae, setscreenname] = useState("Chat");
  const [showWebView, setShowWebView] = useState(false);

  const fetchMyProfileData = () => dispatch(fetchSavedProfileData());
  useEffect(() => {
    fetchMyProfileData();

    const willFocusSubscription = navigation.addListener("focus", () => {
      setTimeout(function () {
        setShowWebView(true);
      }, 2000);
    });
    return willFocusSubscription;
  }, []);

  const onRefreshClicked = () => {
    Alert.alert(strings.attention, strings.refresh_chat, [
      {
        text: strings.cancel,
      },
      {
        text: strings.ok,
        onPress: () => {
          webViewRef.current.reload();
        },
      },
    ]);
  };
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          marginBottom: route?.params?.fromLogin ? 0 : bottomBarHeight,
        },
      ]}
    >
      <Header
        Text={myscreenmae}
        navigation={navigation}
        backIconVisibility={false}
        refreshIconVisibility={true}
        onRefreshClicked={onRefreshClicked}
        bcae={true}
      ></Header>

      {!showWebView && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 200,
          }}
        >
          <LoadingAnimation></LoadingAnimation>
          <Text style={styles.emptyList}>{strings.please_wait}</Text>
        </View>
      )}

      {showWebView && (
        <WebView
          startInLoadingState={true}
          // allowUniversalAccessFromFileURLs={true}
          // javaScriptEnabled={true}
          // mixedContentMode={'always'}
          onMessage={(data) => {
            // console.warn("hiting on message", data.nativeEvent.data)
            Linking.openURL(data.nativeEvent.data)
          }}
          ref={webViewRef}
          source={{
            uri: (DEBUG_BUILD ? STAGE_CHAT_URL : PROD_CHAT_URL) + contactNo,
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyList: {
    fontSize: 20,
    color: color.BCAE_PRIMARY,
  },
});

export default Chat;
