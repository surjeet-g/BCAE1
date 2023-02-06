import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  Pressable,
  Alert,
} from "react-native";
import CountryPicker from "react-native-country-codes-picker";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../Components/Button";
import { CustomActivityIndicator } from "../../../Components/CustomActivityIndicator";
import { EditText } from "../../../Components/EditText";
import {
  fontSizes,
  color,
  spacing,
  buttonSize,
  buttonType,
} from "../../../Utilities/Constants/Constant";
import { strings } from "../../../Utilities/Language";
import {
  resetForgotPassword,
  verifyForgotPasswordData,
} from "../ForgotPasswordDispatcher";
const { height, width } = Dimensions.get("screen");

const MobileLoging = (props) => {
  let forgot = useSelector((state) => state.forgot);

  const [number, setNumber] = useState("");
  const [show, setShow] = useState(false);
  const [numberError, setNumberError] = useState("");

  const [countryCode, setCountryCode] = useState("+673");

  const dispatch = useDispatch([verifyForgotPasswordData, resetForgotPassword]);

  const submit = () => {
    if (number === "") {
      //setUsernameError(strings.numberError);
    } else if (number.length !== 7) {
      Alert.alert(strings.attention, strings.sevenDigit, [
        { text: strings.ok, onPress: () => {} },
      ]);
    } else {
      dispatch(verifyForgotPasswordData(props.navigation, number));
    }
  };

  const onChangeNumber = (textStr) => {
    setNumber(textStr);

    setNumberError("");
  };
  const clearTextClick = () => {
    setNumber("");
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
    <View style={{ flex: 1 }}>
      <CountryPicker
        style={{ width: "100%", backgroundColor: "red" }}
        show={show}
        pickerButtonOnPress={(item) => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
      />
      <View>
        <View style={{ flexDirection: "row", marginBottom: spacing.HEIGHT_20 }}>
          <TouchableOpacity
            //onPress={() => setShow(true)}
            style={styles.countrycode}
          >
            <Text style={styles.countrycodetext}>
              {countryCode}
              {/* <Image
                source={require("../../../Assets/icons/dropdown.png")}
              ></Image> */}
            </Text>
          </TouchableOpacity>

          <View style={{}}>
            <EditText
              customStyle={{ paddingLeft: width / 8 }}
              onChangeText={(text) => onChangeNumber(text)}
              value={number}
              placeHolder={strings.mobile_no}
              clearText={clearTextClick}
              keyboardType="numeric"
              isClose={number.length > 0}
            />
          </View>
        </View>
        {!forgot?.initForgotPassword &&
          (forgot?.loggedProfile?.errorCode === "404" ||
            forgot?.loggedProfile?.errorCode === "500") &&
          showErrorMessage(forgot?.loggedProfile?.message)}
        {numberError !== "" && showErrorMessage(numberError)}
      </View>

      <View style={{ marginTop: 40 }}>
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
            disabled={number == "" ? true : false}
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
  countrycode: {
    // width: "25%",
    height: height / 17,
    marginTop: height / 44.3,
    backgroundColor: color.BCAE_OFF_WHITE,
    padding: 10,
    paddingLeft: 0,
    alignItems: "center",
    // borderBottomWidth: 0.4,
    //   borderColor: color.BCAE_PRIMARY,
    position: "absolute",
  },
  countrycodetext: {
    color: color.BLACK,
    marginTop: spacing.HEIGHT_8,
    fontSize: fontSizes.FONT_14,
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    color: color.BCAE_PRIMARY,
    fontSize: fontSizes.FONT_18,
    fontWeight: "500",
  },
});

export default MobileLoging;
