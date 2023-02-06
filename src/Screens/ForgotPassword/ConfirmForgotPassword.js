import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  Pressable,
} from "react-native";
import {
  spacing,
  fontSizes,
  color,
  buttonSize,
  validateEmail,
} from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language";
import Header from "../TabScreens/Component/Header";

const ConfirmForgotPassword = ({ route, navigation }) => {
  const [myscreenmae, setscreenname] = useState("Forgot Password");

  const isEMail = validateEmail(route?.params?.email);
  const orSection = () => {
    return (
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: spacing.HEIGHT_32,
        }}
      >
        <View
          style={{
            width: "43%",
            height: 1,
            backgroundColor: color.DISABLED_GREY,
          }}
        ></View>
        <Text style={styles.orText}>{strings.or}</Text>
        <View
          style={{
            width: "43%",
            height: 1,
            backgroundColor: color.DISABLED_GREY,
            alignContent: "flex-end",
          }}
        ></View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        Text={myscreenmae}
        navigation={navigation}
        backIconVisibility={false}
      ></Header>

      <ScrollView
        style={{
          flexGrow: 1,
          paddingHorizontal: spacing.WIDTH_30,
          paddingTop: spacing.HEIGHT_50 * 2,
        }}
        nestedScrollEnabled={true}
      >
        <View style={{ marginBottom: spacing.WIDTH_30, alignItems: "center" }}>
          <Image
            style={styles.logo}
            source={require("../../Assets/icons/ic_td123_logo.png")}
          ></Image>
        </View>

        <Text style={styles.headline}>
          {isEMail ? strings.checkYourMail : strings.checkYourMob}
        </Text>

        <Text style={styles.subtext}>
          {isEMail ? strings.wesent : strings.wesend_mob}
        </Text>

        <Text style={styles.email}>{route?.params?.email}</Text>

        <Text style={styles.didtntrec}>
          {isEMail ? strings.didntRecive : strings.didntRecive_mob}
        </Text>

        <Text style={styles.clicktoresend}>
          {strings.clicktoresend.toUpperCase()}
        </Text>

        <Pressable onPress={() => navigation.goBack()}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 35,
            }}
          >
            <Image source={require("../../Assets/icons/ic_left_arrow.png")} />
            <Text style={{ marginLeft: 10, color: color.PLACEHOLDER }}>
              {strings.back_to_login}
            </Text>
          </View>
        </Pressable>

        <View style={{ paddingBottom: spacing.HEIGHT_40 * 3 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.BCAE_OFF_WHITE,
  },
  logo: {
    height: spacing.WIDTH_40,
    width: spacing.WIDTH_50 * 2,
  },
  headline: {
    color: color.BCAE_DARK_BLUE,
    fontSize: fontSizes.FONT_20,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  subtext: {
    color: color.BCAE_DARK_BLUE,
    fontSize: fontSizes.FONT_16,
    marginTop: 20,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  email: {
    color: color.BCAE_DARK_BLUE,
    fontSize: fontSizes.FONT_14,
    marginTop: 5,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  didtntrec: {
    color: color.PLACEHOLDER,
    fontSize: fontSizes.FONT_12,
    marginTop: 20,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  clicktoresend: {
    color: color.BCAE_PRIMARY,
    fontSize: fontSizes.FONT_16,
    marginTop: 10,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  toast: {
    position: "absolute",
    bottom: spacing.HEIGHT_31 * 2,
  },
  orText: {
    color: color.BCAE_LIGHT_BLUE,
    fontSize: fontSizes.FONT_10,
    fontWeight: "500",
    lineHeight: spacing.WIDTH_16,
    paddingHorizontal: spacing.WIDTH_7,
  },
  noAccText: {
    marginTop: spacing.HEIGHT_32,
    color: color.PLACEHOLDER,
    fontSize: fontSizes.FONT_12,
    lineHeight: spacing.WIDTH_14,
    textAlign: "center",
  },
  rgisterText: {
    marginTop: spacing.HEIGHT_6,
    fontWeight: "500",
    color: color.BCAE_LIGHT_BLUE,
    fontSize: fontSizes.FONT_14,
    lineHeight: spacing.WIDTH_17,
    textAlign: "center",
  },
});

export default ConfirmForgotPassword;
