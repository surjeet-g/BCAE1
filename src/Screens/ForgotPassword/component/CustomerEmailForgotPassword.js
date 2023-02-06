import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { EditText } from "../../../Components/EditText";
import {
  spacing,
  fontSizes,
  color,
  buttonType,
  buttonSize,
  validateEmail,
  validatePassword,
} from "../../../Utilities/Constants/Constant";
import { strings } from "../../../Utilities/Language";
import { Button } from "../../../Components/Button";
import { CustomActivityIndicator } from "../../../Components/CustomActivityIndicator";
import { useDispatch, useSelector } from "react-redux";
import {
  resetForgotPassword,
  verifyForgotPasswordData,
} from "../ForgotPasswordDispatcher";

const CustomerEmailForgotPassword = (props) => {
  let forgot = useSelector((state) => state.forgot);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const dispatch = useDispatch([verifyForgotPasswordData, resetForgotPassword]);

  console.log("====forgot===", forgot);
  const onIDChange = (textStr) => {
    setUsername(textStr);
    if (textStr.length == 0) {
      dispatch(resetForgotPassword());
    }
    setUsernameError("");
  };

  const clearTextClick = () => {
    setUsername("");
    dispatch(resetForgotPassword());
    setUsernameError(strings.emailValidError);
  };

  //alert(JSON.stringify(forgot))

  const submit = () => {
    if (!validateEmail(username)) {
      setUsernameError(strings.emailValidError);
    } else {
      dispatch(verifyForgotPasswordData(props.navigation, username));
    }
  };

  const showErrorMessage = (errMessage) => {
    return (
      <View style={{ marginTop: spacing.HEIGHT_6, flexDirection: "row" }}>
        <Image
          style={styles.errorLogo}
          source={require("../../../Assets/icons/ci_error_warning.png")}
        />
        <Text style={styles.errorText}>{errMessage}</Text>
      </View>
    );
  };

  return (
    <View>
      <View style={{ marginBottom: spacing.HEIGHT_20 }}>
        <EditText
          onChangeText={(text) => onIDChange(text)}
          value={username}
          placeHolder={strings.customer_email_ID}
          clearText={clearTextClick}
          isClose={username.length > 0}
        />
        {!forgot?.initForgotPassword &&
          (forgot?.loggedProfile?.errorCode == "404" ||
            forgot?.loggedProfile?.errorCode == "500") &&
          showErrorMessage(forgot?.loggedProfile?.message)}
        {usernameError !== "" && showErrorMessage(usernameError)}
      </View>

      <View style={{ marginBottom: spacing.HEIGHT_20 }}></View>
      <View>
        {forgot?.initForgotPassword ? (
          <CustomActivityIndicator
            size={buttonSize.LARGE}
            bgColor={color.BLACK}
            loderColor={color.WHITE}
          />
        ) : (
          <Button
            type={buttonType.PRIMARY}
            size={buttonSize.LARGE}
            label={strings.reset_password}
            disabled={username == "" ? true : false}
            bgColor={color.BCAE_PRIMARY}
            textColor={color.WHITE}
            textPro={{
              color: color.WHITE,
              fontSize: fontSizes.FONT_16,
              fontWeight: "400",
              lineHeight: spacing.HEIGHT_16,
            }}
            onPress={submit}
          />
        )}
      </View>

      <Pressable onPress={() => props.navigation.goBack()}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 35,
          }}
        >
          <Image source={require("../../../Assets/icons/ic_left_arrow.png")} />
          <Text style={{ marginLeft: 10, color: color.PLACEHOLDER }}>
            {strings.back_to_login}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  forgotText: {
    color: color.BCAE_DARK_BLUE,
    fontSize: fontSizes.FONT_14,
    fontWeight: "500",
  },
  errorText: {
    color: color.ERROR_TEXT_RED,
    fontSize: fontSizes.FONT_14,
    fontWeight: "500",
    lineHeight: spacing.WIDTH_14,
  },
  errorLogo: {
    width: spacing.WIDTH_16,
    height: spacing.WIDTH_16,
    marginTop: -2,
    marginRight: spacing.WIDTH_4,
  },
  noAccText: {
    marginTop: spacing.HEIGHT_32,
    color: color.PLACEHOLDER,
    fontSize: fontSizes.FONT_12,
    lineHeight: spacing.WIDTH_14,
    textAlign: "center",
  },
});

export default CustomerEmailForgotPassword;
