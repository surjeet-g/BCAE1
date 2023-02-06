import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  Pressable,
  Alert,
} from "react-native";
import {
  spacing,
  fontSizes,
  color,
  buttonSize,
  buttonType,
  validatePassword,
  DEBUG_BUILD,
  STAGE_FAQ,
  PROD_FAQ,
} from "../../Utilities/Constants/Constant";
import { useDispatch, useSelector } from "react-redux";
import { strings } from "../../Utilities/Language";
import { Toast } from "../../Components/Toast";
import { Button } from "../../Components/Button";
import { EditText } from "../../Components/EditText";
import Header from "../TabScreens/Component/Header";
import { changePassword } from "../../Screens/ForgotPassword/ForgotPasswordDispatcher";
import { CustomActivityIndicator } from "../../Components/CustomActivityIndicator";

const ResetPassword = ({ route, navigation }) => {
  let login = useSelector((state) => state.login);
  let forgot = useSelector((state) => state.forgot);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureTextEntryOld, setsecureTextEntryOld] = useState(true);
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [secureTextEntryConfim, setsecureTextEntryConfim] = useState(true);
  const [myscreenmae, setMyscreenmae] = useState("Reset Password");
  const { email, inviteToken } = route.params;

  const hideShowClickOld = () => {
    setsecureTextEntryOld(!secureTextEntryOld);
  };
  const hideShowClick = () => {
    setsecureTextEntry(!secureTextEntry);
  };
  const hideShowClickConfirm = () => {
    setsecureTextEntryConfim(!secureTextEntryConfim);
  };

  const onOldPasswordChange = (textStr) => {
    setOldPassword(textStr);
  };

  const onPasswordChange = (textStr) => {
    setPassword(textStr);
  };

  const onConfirmPasswordChange = (textStr) => {
    setConfirmPassword(textStr);
  };

  const onSubmitPasswordChanged = () => {
    if (password == confirmPassword) {
      requestChangePassword();
    } else {
      Alert.alert(strings.attention, strings.password_not_match, [
        { text: strings.ok, onPress: () => {} },
      ]);
    }
  };

  const dispatch = useDispatch([changePassword]);
  const requestChangePassword = () => {
    if (validatePassword(password)) {
      dispatch(changePassword(email, oldPassword, password, confirmPassword));
    } else {
      Alert.alert(strings.attention, strings.passwordValidError, [
        {
          text: strings.ok,
          onPress: () => {},
        },
      ]);
    }
  };
  const showSuccessMessage = (message) => {
    Alert.alert(strings.attention, message, [
      {
        text: strings.ok,
        onPress: () => {
          navigation.navigate("Splash", {});
        },
      },
    ]);
  };
  const showErrorMessage = (message) => {
    return (
      <View style={{ marginTop: spacing.HEIGHT_6, flexDirection: "row" }}>
        <Text style={styles.errorText}>{message}</Text>
      </View>
    );
  };
  orSection = () => {
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
        navigation={navigation}
        Text={myscreenmae}
        backIconVisibility={true}
        rightIconsVisibility={false}
        resetPassword={true}
      ></Header>
      <ScrollView
        style={{
          flexGrow: 1,
          paddingHorizontal: spacing.WIDTH_30,
          paddingTop: spacing.HEIGHT_40 * 2,
        }}
        nestedScrollEnabled={true}
      >
        <View style={{ marginBottom: spacing.WIDTH_30, alignItems: "center" }}>
          <Image
            style={styles.logo}
            source={require("../../Assets/icons/ic_td123_logo.png")}
          ></Image>
        </View>

        <View
          style={{
            marginTop: spacing.WIDTH_15,
            marginBottom: spacing.WIDTH_30,
            alignItems: "center",
            flex: 1,
            flexDirection: "row",
          }}
        >
          <Pressable
            onPress={() =>
              navigation.navigate("Anouncement", { fromLogin: true })
            }
            style={{
              marginTop: spacing.HEIGHT_6,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
            }}
          >
            <Image
              style={styles.upperLogo}
              source={require("../../Assets/icons/announcement_login.png")}
            />
            <Text style={styles.upperText}>{strings.announcement}</Text>
          </Pressable>

          <View
            style={{
              width: 1,
              height: 40,
              backgroundColor: color.DISABLED_GREY,
            }}
          ></View>

          <Pressable
            onPress={() =>
              navigation.navigate("ShowWebPage", {
                fromLogin: false,
                url: DEBUG_BUILD ? STAGE_FAQ : PROD_FAQ,
                title: "FAQ",
              })
            }
            style={{
              marginTop: spacing.HEIGHT_6,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
            }}
          >
            <Image
              style={styles.upperLogo}
              source={require("../../Assets/icons/faq_login.png")}
            />
            <Text style={styles.upperText}>{strings.faq}</Text>
          </Pressable>
        </View>
        <View>
          <EditText
            onChangeText={(text) => onOldPasswordChange(text)}
            value={oldPassword}
            placeHolder={strings.old_password}
            secureTextEntry={secureTextEntryOld}
            hideShowClick={hideShowClickOld}
            isHideShow={oldPassword.length > 0}
          />
        </View>
        <View style={{ marginBottom: 5 }}>
          <EditText
            onChangeText={(text) => onPasswordChange(text)}
            value={password}
            placeHolder={strings.new_password}
            secureTextEntry={secureTextEntry}
            hideShowClick={hideShowClick}
            isHideShow={password.length > 0}
          />
        </View>
        <View style={{ marginBottom: 15 }}>
          <EditText
            onChangeText={(text) => onConfirmPasswordChange(text)}
            value={confirmPassword}
            placeHolder={strings.confirmPassword}
            secureTextEntry={secureTextEntryConfim}
            hideShowClick={hideShowClickConfirm}
            isHideShow={confirmPassword.length > 0}
          />
        </View>
        <View>
          {forgot.initForgotPassword ? (
            <CustomActivityIndicator
              size={buttonSize.LARGE}
              bgColor={color.BLACK}
              loderColor={color.WHITE}
            />
          ) : (
            <Button
              type={buttonType.PRIMARY}
              size={buttonSize.LARGE}
              label={strings.ok}
              disabled={
                password == "" || oldPassword == "" || confirmPassword == ""
                  ? true
                  : false
              }
              bgColor={color.BCAE_PRIMARY}
              textColor={color.WHITE}
              textPro={{
                color: color.WHITE,
                fontSize: fontSizes.FONT_16,
                fontWeight: "400",
                lineHeight: spacing.HEIGHT_16,
              }}
              onPress={onSubmitPasswordChanged}
            />
          )}
          {!forgot.initForgotPassword &&
            forgot?.loggedProfile.status == "200" &&
            showSuccessMessage(forgot?.loggedProfile?.message)}
          {!forgot.initForgotPassword &&
            forgot?.loggedProfile.status != "200" &&
            showErrorMessage(forgot?.loggedProfile?.message)}
        </View>
        {orSection()}

        <View>
          <Text style={styles.noAccText}>{strings.dont_account}</Text>
          <Pressable
            onPress={() => navigation.navigate("Register with us", {})}
          >
            <Text style={styles.rgisterText}>
              {strings.register_with_us.toUpperCase()}
            </Text>
          </Pressable>
        </View>

        {/* {
          orSection()
        }

        <View style={{ marginTop: spacing.HEIGHT_32 }}>
          <Button
            size={buttonSize.LARGE}
            img={require('../../Assets/icons/ic_goole_logo.png')}
            imgPro={{ marginRight: spacing.HEIGHT_5, height: spacing.WIDTH_16, width: spacing.WIDTH_16, }}
            label={strings.sign_up_with_google}
            bgColor={color.BCAE_LIGHT_BLUE_3}
            textPro={{ color: color.WHITE, fontSize: fontSizes.FONT_16, fontWeight: '500', lineHeight: spacing.HEIGHT_19 }}
          />
        </View>

        <View style={{ marginTop: spacing.HEIGHT_10 }}>
          <Button
            size={buttonSize.LARGE}
            img={require('../../Assets/icons/ic_apple_logo.png')}
            imgPro={{ marginRight: spacing.HEIGHT_5, height: spacing.WIDTH_16, width: spacing.WIDTH_16, }}
            label={strings.sign_up_with_apple}
            bgColor={color.BLACK}
            textPro={{ color: color.WHITE, fontSize: fontSizes.FONT_16, fontWeight: '500', lineHeight: spacing.HEIGHT_19 }}
          />
        </View> */}

        <View style={{ paddingBottom: spacing.HEIGHT_40 * 3 }} />
      </ScrollView>

      {!login.initLogin &&
        (login?.loggedProfile?.errorCode == "10000" ||
          login?.loggedProfile?.errorCode == "10001") && (
          <View style={styles.toast}>
            <Toast
              bgColor={color.TOAST_RED}
              customStyle={{ paddingHorizontal: spacing.WIDTH_30 }}
              textPro={{
                color: color.WHITE,
                fontSize: fontSizes.FONT_14,
                fontWeight: "700",
              }}
              img={
                login?.loggedProfile?.errorCode == "10001"
                  ? require("../../Assets/icons/ic_no_Internet.png")
                  : require("../../Assets/icons/ci_error-warning-fill.png")
              }
              message={
                login?.loggedProfile?.errorCode == "10001"
                  ? strings.no_network
                  : strings.something_went_wrong
              }
            />
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.BCAE_OFF_WHITE,
  },
  logo: {
    height: 128,
    width: 128,
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
    color: color.BCAE_PRIMARY,
    fontSize: fontSizes.FONT_14,
    lineHeight: spacing.WIDTH_17,
    textAlign: "center",
  },
  upperText: {
    color: color.PLACEHOLDER,
    fontSize: fontSizes.FONT_12,
    fontWeight: "500",
    marginTop: 5,
    lineHeight: spacing.WIDTH_14,
  },
  upperLogo: {
    width: spacing.WIDTH_16,
    height: spacing.WIDTH_16,
  },
});

export default ResetPassword;
