import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, SafeAreaView } from "react-native";
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

const About = ({ route, navigation }) => {
  let login = useSelector((state) => state.login);
  const [myscreenmae, setscreenname] = useState("About");
  const [showWebView, setShowWebView] = useState(false);
  useEffect(() => {}, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        Text={myscreenmae}
        navigation={navigation}
        backIconVisibility={true}
      ></Header>

      <View style={[styles.ticketItem]}>
        <Image source={require("../../Assets/icons/ic_td123_logo.png")}></Image>
        <Text>{strings.about_text}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.BCAE_OFF_WHITE,
  },
  ticketItem: {
    padding: 30,
    margin: 8,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "blue",
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
});
export default About;
