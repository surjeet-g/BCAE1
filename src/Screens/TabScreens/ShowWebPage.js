import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import { useSelector } from "react-redux";
import { CustomActivityIndicator } from "../../Components/CustomActivityIndicator";
import Header from "./Component/Header";
import {
  spacing,
  fontSizes,
  color,
  buttonType,
  buttonSize,
  bottomBarHeight,
} from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language";
import LoadingAnimation from "../../Components/LoadingAnimation";

const ShowWebPage = ({ route, navigation }) => {
  let login = useSelector((state) => state.login);
  let myscreenmae = route?.params?.title ? route?.params?.title : "Title";
  const [showWebView, setShowWebView] = useState(false);

  useEffect(() => {
    const willFocusSubscription = navigation.addListener("focus", () => {
      setTimeout(function () {
        setShowWebView(true);
      }, 1000);
    });
    return willFocusSubscription;
  }, []);

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
        backIconVisibility={true}
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
          source={{
            uri: route?.params?.url ? route?.params?.url : "https://google.com",
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.BCAE_OFF_WHITE,
  },

  bottomView: {
    flex: 1,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  emptyList: {
    fontSize: 20,
    color: color.BCAE_PRIMARY,
  },
});
export default ShowWebPage;
