import React, { useEffect } from "react";
import { StyleSheet, View, Text, Image, Platform } from "react-native";
import { strings } from "../../Utilities/Language";
import { changeLanguage } from "../../Utilities/Language/MulitLanguageSupport";
import { getLanguage } from "../../Utilities/Language/language";
import {
  spacing,
  fontSizes,
  color,
  buttonType,
  buttonSize,
} from "../../Utilities/Constants/Constant";
import { Button } from "../../Components/Button";
import { ScrollView } from "react-native-gesture-handler";
import { getToken } from "../../Storage/token";
import { networkAvailable } from "../../Utilities/API";

/**
* Check if user is already logged in or not. if logged, navigate to homescreen 
* @namespace Splash
*/
const Splash = ({ route, navigation }) => {

  useEffect(() => {
    checkLanguage();
  }, []);

  const checkLanguage = async () => {
    let language = await getLanguage();
    if (language != null && language != undefined) {
      changeLanguage(language);
    } else {
      changeLanguage({ name: "English", langCode: "en" });
    }
  };

  /**
  * Check if user is already logged in or not. if logged, navigate to homescreen 
  * @memberOf Splash
  * @param  {string} customerUuid Customer UUID info
  */
  const checkLogin = () => {
    getToken()
      .then(function (token) {
        return token;
      })
      .then(function (token) {
        if (
          token.accessToken == null &&
          typeof token.accessToken == "undefined"
        ) {
          navigation.navigate("Login");
        } else {
          navigation.navigate("BottomBar");
        }
      });
  };

  return (
    <View
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: "column",
        },
      ]}
    >
      <View style={{ flex: 1.3, backgroundColor: "white", padding: 20 }}>
        <Image
          style={styles.logo}
          source={require("../../Assets/icons/ic_td123_logo.png")}
        ></Image>
      </View>
      <View style={[styles.triangleCorner]}></View>
      <View style={{ flex: 3, backgroundColor: color.BCAE_PRIMARY }}>
        <View style={{ width: "100%", padding: 40 }}>
          <Text style={styles.highlightText}>{strings.brand_name}</Text>
          <Text
            style={{
              alignSelf: "flex-end",
              backgroundColor: color.VERSION_BACKGROUND,
            }}
          >
            {Platform.OS === "android" ? strings.version : "3.0.1"}
          </Text>
        </View>

        <View
          style={{
            position: "absolute",
            bottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Button
            type={buttonType.PRIMARY}
            size={buttonSize.LARGE}
            label={strings.get_started}
            disabled={false}
            bgColor={color.WHITE}
            textPro={{
              color: color.BLACK,
              fontSize: fontSizes.FONT_14,
              fontWeight: "400",
              lineHeight: spacing.HEIGHT_16,
            }}
            onPress={checkLogin}
          ></Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: "100%",
  },
  container: {
    flex: 1,
  },
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: "white",
    borderRightColor: color.BCAE_PRIMARY,
    borderRightWidth: 400,
    borderTopWidth: 200,
    borderTopColor: "white",
  },
  highlightText: {
    color: color.WHITE,
    fontSize: fontSizes.FONT_19 * 2,
    fontWeight: "100",
    lineHeight: spacing.HEIGHT_27 * 2,
  },
});
export default Splash;
