import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";

import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Pressable,
  SafeAreaView,
  Platform,
  Alert,
} from "react-native";
import {
  spacing,
  color,
  fontSizes,
  buttonSize,
  validateNumber,
  validateEmail,
  validatePassword,
  passwordHash,
  TDLog,
  DEBUG_BUILD,
  STAGE_TERMS,
  PROD_TERMS,
  STAGE_PRIVACY,
  PROD_PRIVACY,
} from "../../Utilities/Constants/Constant";
import { EditText } from "../../Components/EditText";
import { CustomDropDown } from "../../Components/CustomDropDown";
import {
  fetchRegisterFormData,
  getOtpForCheck,
  sendOtp,
  userRegister,
} from "./RegisterDispatcher";
import { TextBoxWithCTA } from "../../Components/TextBoxWithCTA";
import { Button } from "../../Components/Button";
import { strings } from "../../Utilities/Language/index";
import { FullPageLoder } from "../../Components/FullPageLoder";
import Header from "../TabScreens/Component/Header";
import { CustomActivityIndicator } from "../../Components/CustomActivityIndicator";
import { setOtpFormData } from "./RegisterAction";
import { TextBoxWithCTAEmail } from "../../Components/TextBoxWithCTAEmail";

const Register = ({ navigation, props }) => {
  let registerForm = useSelector((state) => state.registerForm);
  //4 minute
  const OTP_TIMER = 60 * 4;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [service, setService] = useState("");

  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [mobileNo, setMobileNo] = useState("");
  const [countryCode, setCountryCode] = useState("673");
  const [otp, setOTP] = useState("");
  const [otpEmail, setEmailOTP] = useState("");
  const [email, setEmail] = useState("");
  const [isSelected, setSelection] = useState(false);
  const [isSelectedTerm, setSelectionTerm] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [secureTextEntryConfim, setsecureTextEntryConfim] = useState(true);
  const [isButtomDiable, setButtomEnableDisable] = useState(true);

  const [myscreenmae, setscreenname] = useState("Register With Us");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [genderError, setgenderError] = useState("");
  const [serviceError, setServiceError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [otpNumberError, setOtpNumberError] = useState("");
  const [isMobileOtpSuccess, setIsMobileOtpSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [otpEmailError, setOtpEmailError] = useState("");
  const [isEmailOtpSuccess, setIsEmailOtpSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setConfirmPasswordError] = useState("");
  const [termError, setTermError] = useState("");
  const [privaceyError, setPrivaceyError] = useState("");
  const [otpTimer, setOtpTimer] = useState(OTP_TIMER);
  const [isDisableSendOtp, setIsDisableSendOtp] = useState(false);
  const [selectedValueServ, setValueServ] = useState("");
  const [selectedValueGender, setValueGender] = useState("");

  const [street, setStreet] = useState("");
  const [state, setStateProfile] = useState("");
  const [district, setDistrict] = useState("");
  const [postcode, setPostcode] = useState("");
  const [hno, setHno] = useState("");

  const dispatch = useDispatch([
    fetchRegisterFormData,
    sendOtp,
    userRegister,
    getOtpForCheck,
  ]);

  useEffect(() => {
    dispatch(fetchRegisterFormData());

    dispatch(setOtpFormData({}, "Register"));
    dispatch(setOtpFormData({}, "mobile"));
    dispatch(setOtpFormData({}, "mobileOtp"));
    dispatch(setOtpFormData({}, "email"));
    dispatch(setOtpFormData({}, "emailOtp"));
  }, []);
  useEffect(() => {
    check(PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            if (Platform.OS === "ios") {
              request(PERMISSIONS.IOS.LOCATION_ALWAYS)
                .then((result) => console.log(result))
                .catch((error) => console.log(error));
            }
            break;
          case RESULTS.DENIED:
            console.log(
              "The permission has not been requested / is denied but requestable"
            );
            break;
          case RESULTS.LIMITED:
            console.log("The permission is limited: some actions are possible");
            break;
          case RESULTS.GRANTED:
            console.log("The permission is granted");
            break;
          case RESULTS.BLOCKED:
            console.log("The permission is denied and not requestable anymore");
            break;
        }
      })
      .catch((error) => {
        // …
      });
  }, []);

  const buttonEnableDiable = () => {
    // console.log("buttonEnableDiable==>"+firstName+"<===>"+lastName+"<===>"+gender+"<===>"+location
    // +"<===>"+mobileNo+"<===>"+otp+"<===>"+email
    // +"<===>"+otpEmail+"<===>"+password+"<===>"+confirmPassword)
    if (
      firstName === "" ||
      lastName === "" ||
      gender === "" ||
      location === "" ||
      mobileNo === "" ||
      otp === "" ||
      email === "" ||
      otpEmail === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setButtomEnableDisable(true);
      //console.log("buttonEnableDiable==>1");
    } else {
      //console.log("buttonEnableDiable==>2");

      setButtomEnableDisable(false);
    }
  };

  const onFirstNameChange = (textStr) => {
    setFirstName(textStr);
    setFirstNameError("");
    buttonEnableDiable();
  };
  const onLocationChanged = (textStr) => {
    setLocation(textStr);
    setLocationError("");
    buttonEnableDiable();
  };

  const clearFirstName = () => {
    setFirstName("");
    setFirstNameError(strings.firstNameError);
  };
  const locationIconClick = () => {
    navigation.navigate("AddLocation", {
      onPlaceChosen,
      fromPage: "Register",
    });
  };
  const onLastNameChange = (textStr) => {
    setLastName(textStr);
    setLastNameError("");
    buttonEnableDiable();
  };
  const clearLastName = () => {
    setLastName("");
    setLastNameError(strings.lastNameError);
  };

  const onGenderClick = (textStr) => {
    // console.log(textStr.description)
    setGender(textStr.description);
    buttonEnableDiable();
  };

  const onServiceClick = (textStr) => {
    // console.log(textStr.description)
    setService(textStr.description);
    buttonEnableDiable();
  };

  const onCountryClick = (textStr) => {
    setCountry(textStr.onChangeText);
    setCountryCode(textStr?.mapping?.countryCode ?? "");
    buttonEnableDiable();
  };
  const onLocationClick = (textStr) => {
    setLocation(textStr.onChangeText);
    buttonEnableDiable();
  };

  const onMobleNoChange = (textStr) => {
    setMobileNo(textStr);
    setNumberError("");
    buttonEnableDiable();
  };
  const onOTPChange = (textStr) => {
    setOTP(textStr);
    setOtpNumberError("");
    buttonEnableDiable();
  };
  const onEmailOTPChange = (textStr) => {
    setEmailOTP(textStr);
    setOtpEmailError("");
    buttonEnableDiable();
  };
  const onEmailChange = (textStr) => {
    setEmail(textStr);
    setEmailError("");
    buttonEnableDiable();
  };

  const submitResndOTP = () => {
    if (mobileNo.length !== 7) {
      Alert.alert(strings.attention, strings.sevenDigit, [
        { text: strings.ok, onPress: () => { } },
      ]);
    } else {
      if (firstName.trim() === "") {
        Toast.show({
          type: "bctError",
          text1: strings.firstNameError,
        });
        setFirstNameError(strings.firstNameError);
      } else if (!validateNumber(mobileNo)) {
        Toast.show({
          type: "bctError",
          text1: strings.mobileValidError,
        });
        setNumberError(strings.mobileValidError);
      } else {
        //alert("submitResndOTP");
        dispatch(
          sendOtp(
            countryCode + mobileNo,
            firstName,
            "mobile",
            showOtpSentMessage
          )
        );
        buttonEnableDiable();
        //setIsDisableSendOtp(true);
        //runOtpTimer(otpTimer);
      }
    }
  };

  const runOtpTimer = (otpTimer) => {
    setTimeout(() => {
      setOtpTimer(otpTimer);
      otpTimer = otpTimer - 1;
      if (otpTimer < 0) {
        setIsDisableSendOtp(false);
        setOtpTimer(OTP_TIMER);
      } else {
        runOtpTimer(otpTimer);
        //alert(otpTimer);
      }
    }, 1000);
  };

  const submitConfirmMobileOTP = () => {
    if (otp === "") {
      setOtpNumberError(strings.numberOtpError);
    } else {
      //alert(countryCode + mobileNo);
      dispatch(getOtpForCheck(countryCode + mobileNo, "mobileOtp")); // country code to be added to verify OTP
      buttonEnableDiable();
    }
  };
  //alert(JSON.stringify(Register));
  const submitConfirmEmailOTP = () => {
    if (otpEmail === "") {
      setOtpEmailError(strings.emailOtpError);
    } else {
      dispatch(getOtpForCheck(email, "emailOtp"));
      buttonEnableDiable();
    }
  };
  const submitEmail = () => {
    if (firstName.trim() === "") {
      Toast.show({
        type: "bctError",
        text1: strings.firstNameError,
      });
      setFirstNameError(strings.firstNameError);
    } else if (!validateEmail(email)) {
      setEmailError(strings.emailValidError);
    } else {
      dispatch(sendOtp(email, firstName, "email"));
      buttonEnableDiable();
    }
  };

  const onCheckBoxClick = () => {
    //console.log("onCheckBoxClick====>isSelected===>"+isSelected)
    setSelection(!isSelected);
    setTermError("");
    setPrivaceyError("");
  };

  const onCheckBoxClickTerm = () => {
    //console.log("onCheckBoxClickTerm====>isSelectedTerm==>"+isSelectedTerm)
    setSelectionTerm(!isSelectedTerm);

    setTermError("");
  };
  const showAlert = (message = "") => {
    // if (
    //   !registerForm.initRegisterForm &&
    //   registerForm?.otpFormData?.status == "200" &&
    //   registerForm?.otpUsageType === "Register"
    // ) {
    //showErrorMessage(registerForm?.otpFormData?.message)
    Alert.alert("Info", message, [
      {
        text: "OK",
        onPress: () => {
          dispatch(setOtpFormData({}, "Register"));
          dispatch(setOtpFormData({}, "mobile"));
          dispatch(setOtpFormData({}, "mobileOtp"));
          dispatch(setOtpFormData({}, "email"));
          dispatch(setOtpFormData({}, "emailOtp"));
          navigation.navigate("Login", {});
        },
      },
    ]);
    // }
    // if (
    //   !registerForm.initOtpForm &&
    //   !registerForm?.isOtpFormError &&
    //   registerForm?.otpUsageType === "mobile"
    // ) {
    //   setIsDisableSendOtp(true);
    //   runOtpTimer(otpTimer);
    // }
  };

  const hideShowClick = () => {
    setsecureTextEntry(!secureTextEntry);
  };
  const hideShowClickConfirm = () => {
    setsecureTextEntryConfim(!secureTextEntryConfim);
  };

  const onPasswordChange = (textStr) => {
    setPassword(textStr);

    setPasswordError("");
    buttonEnableDiable();
  };

  const onConfirmPasswordChange = (textStr) => {
    setConfirmPassword(textStr);

    setConfirmPasswordError("");
    buttonEnableDiable();
  };

  const onPlaceChosen = (params) => {
    // here is your callback function
    TDLog("onPlaceChosen register screen", JSON.stringify(params));
    setLocation(
      params.street +
      "," +
      params.state +
      "," +
      params.district +
      "," +
      params.country +
      "," +
      params.postCode
    );
    setLatitude(params.currentLatitude);
    setLongitude(params.currentLongitude);

    setStreet(params.street);
    setStateProfile(params.state);
    setDistrict(params.district);
    setCountry(params.country);
    setPostcode(params.postCode);
    setHno(params.hno)
  };
  const formatOtpTimer = (otpTmr) => {
    let minute = 0;

    let second = 0;

    let finalString = "";

    minute = parseInt(otpTmr / 60);

    second = otpTmr % 60;

    if (minute > 0) {
      finalString = minute + "m " + second + "s";
    } else {
      finalString = second + "s";
    }

    return finalString;
  };
  const emailOTPVerification =
    registerForm?.otpFormDataForEmail?.data?.otp === otpEmail;
  const mobileOTPVerifcation =
    registerForm?.otpFormDataForMobile?.data?.otp === otp;

  const submit = () => {
    if (!mobileOTPVerifcation) {
      Toast.show({
        type: "bctError",
        text1: strings.otpErrorMsgForMobile,
      });
      return null;
    }
    if (!emailOTPVerification) {
      Toast.show({
        type: "bctError",
        text1: strings.otpErrorMsgForEmail,
      });
      return null;
    }
    // console.warm("hitting", mobileOTPVerifcation);
    console.log("userRegister===>0" + JSON.stringify(registerForm));
    console.log("userRegister===>1");
    if (firstName.trim() === "") {
      setFirstNameError(strings.firstNameError);
    } else if (lastName.trim() === "") {
      setLastNameError(strings.lastNameError);
    } else if (service === "") {
      setServiceError(strings.serviceError);
    } else if (gender === "") {
      setgenderError(strings.genderError);
    } else if (!validateNumber(mobileNo)) {
      setNumberError(strings.mobileValidError);
    } else if (otp.trim() === "") {
      setOtpNumberError(strings.numberOtpError);
    } else if (!validateEmail(email)) {
      setEmailError(strings.emailValidError);
    } else if (otpEmail.trim() === "") {
      setOtpEmailError(strings.emailOtpError);
    } else if (!validatePassword(password)) {
      setPasswordError(strings.passwordValidError);
    } else if (!validatePassword(confirmPassword)) {
      setConfirmPasswordError(strings.passwordValidError);
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(strings.passwordandconfirmpasswordnotsame);
    } else if (!isSelectedTerm) {
      setTermError(strings.termError);
    } else if (!isSelected) {
      setPrivaceyError(strings.privaceyError);
    } else {
      console.log("userRegister===>1");
      let pasHash = passwordHash(password).then((datahash) => {
        console.log("userRegister===>2");
        const myArray = location.split(",").reverse();
        console.log("userRegister===>3");
        let registerObject = {
          firstName: firstName,
          lastName: lastName,
          gender: gender === "Male" ? "M" : "F",
          country: myArray.length > 0 ? myArray[0] : "",
          extn: countryCode,
          contactNo: mobileNo,
          mobileOTP: otp,
          email: email,
          emailOTP: otpEmail,
          password: datahash,
          confirmPassword: datahash,
          deviceType: Platform.OS === "android" ? "android" : "ios",
          profilePicture: "",
          deviceId: "",
          serviceCode: service,
          address: {
            address: location,
            hno: hno,
            buildingName: "",
            street: street,
            road: "",
            city: "",
            state: state,
            district: district,
            country: country,
            latitude: latitude,
            longitude: longitude,
            postCode: postcode,
          },
        };
        console.warn("userRegister===>2" + JSON.stringify(registerObject));

        // console.warn("userRegister===>2" + JSON.stringify(registerObject));
        dispatch(
          userRegister(registerObject, "Register", (message) =>
            showAlert(message)
          )
        );
      });
    }
  };

  const showMobileErrorMessage = () => {
    return (
      <View style={{ marginTop: spacing.HEIGHT_6, flexDirection: "row" }}>
        <Image
          style={styles.errorLogo}
          source={require("../../Assets/icons/ci_error_warning.png")}
        />
        <Text style={styles.errorText}>{strings.otpMobileFailed}</Text>
      </View>
    );
  };

  const showEmailErrorMessage = () => {
    return (
      <View style={{ marginTop: spacing.HEIGHT_6, flexDirection: "row" }}>
        <Image
          style={styles.errorLogo}
          source={require("../../Assets/icons/ci_error_warning.png")}
        />
        <Text style={styles.errorText}>{strings.otpEmailFailed}</Text>
      </View>
    );
  };

  const showErrorMessage = (errMessage) => {
    if (typeof errMessage != "string") return null;
    let pattern = /Successful/i;
    let result = errMessage.match(pattern);

    if (result != null) {
      return null;
    }

    return (
      <View style={{ marginTop: spacing.HEIGHT_10, flexDirection: "row" }}>
        <Image
          style={styles.errorLogo}
          source={require("../../Assets/icons/ci_error_warning.png")}
        />
        <Text style={styles.errorText}>{errMessage}</Text>
      </View>
    );
  };

  const showOtpSentMessage = () => {
    setIsDisableSendOtp(true);
    runOtpTimer(otpTimer);
  };

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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header
          Text={myscreenmae}
          navigation={navigation}
          backIconVisibility={true}
          registerfaq={true}
        ></Header>
        {registerForm.initRegisterForm ? (
          <FullPageLoder
            bgColor={color.DISABLED_GREY}
            loderColor={color.WHITE}
          />
        ) : (
          <ScrollView
            style={{
              flexGrow: 1,
              paddingHorizontal: spacing.WIDTH_30,
              paddingTop: spacing.HEIGHT_20,
            }}
            nestedScrollEnabled={true}
          >
            {/* Logo */}
            <View style={{ alignItems: "center" }}>
              <Image
                style={styles.logo}
                source={require("../../Assets/icons/ic_td123_logo.png")}
              ></Image>
            </View>

            {/* First Name */}
            <View style={{ marginTop: spacing.HEIGHT_30 }}>
              <EditText
                onChangeText={(text) => onFirstNameChange(text)}
                value={firstName}
                placeHolder={strings.first_name}
                clearText={clearFirstName}
                isClose={firstName.length > 0}
              />

              {firstNameError !== "" && showErrorMessage(firstNameError)}
            </View>

            {/* Last Name */}
            <View style={{ marginTop: 5 }}>
              <EditText
                onChangeText={(text) => onLastNameChange(text)}
                value={lastName}
                placeHolder={strings.last_name}
                clearText={clearLastName}
                isClose={lastName.length > 0}
              />

              {lastNameError !== "" && showErrorMessage(lastNameError)}
            </View>

            {/* Service */}
            <View style={{ marginTop: 5 }}>
              <CustomDropDown
                selectedValue={selectedValueServ}
                setValue={setValueServ}
                data={registerForm?.registerFormData?.SERVICECODE ?? []}
                onChangeText={(text) => onServiceClick(text)}
                value={service}
                placeHolder={strings.service}
              />

              {serviceError !== "" && showErrorMessage(serviceError)}
            </View>

            {/* Gender */}
            <View style={{ marginTop: 10 }}>
              <CustomDropDown
                selectedValue={selectedValueGender}
                setValue={setValueGender}
                data={registerForm?.registerFormData?.GENDER ?? []}
                onChangeText={(text) => onGenderClick(text)}
                value={gender}
                placeHolder={strings.gender}
              />

              {genderError !== "" && showErrorMessage(genderError)}
            </View>

            {/* Country */}
            {/* <View style={{ marginTop: spacing.HEIGHT_20 }}>
                            <CustomDropDown
                                data={registerForm?.registerFormData?.COUNTRY ?? []}
                                onChangeText={(text) => onCountryClick(text)}
                                value={country}
                                placeHolder={strings.country}
                            />
                            {!registerForm.initRegisterForm && registerForm?.loggedProfile?.errorCode == '404' &&
                                showErrorMessage(registerForm?.otpFormDataForEmail?.message||registerForm?.otpFormDataForEmail?.message)
                            }
                            {countryError !== "" &&
                                showErrorMessage(countryError)
                            }
                        </View> */}

            <View style={{ marginTop: spacing.HEIGHT_30 }}>
              {location != "" && (
                <Text style={styles.placeHolderText}>{strings.location}</Text>
              )}

              <Pressable
                onPress={() => locationIconClick()}
                style={styles.textLocation}
              >
                <Text
                  style={{
                    color: location != "" ? color.BLACK : color.PLACEHOLDER,
                    fontSize: 14,
                    marginBottom: 0,
                    width: "90%",
                    marginBottom: "2%",
                  }}
                  placeHolder={strings.location}
                >
                  {location || strings.location}
                </Text>
                <Image
                  style={{
                    position: "absolute",
                    right: 5,
                    bottom: 5,
                    height: 20,
                    width: 20,
                  }}
                  source={require("../../Assets/icons/map.png")}
                ></Image>
              </Pressable>
            </View>

            {/* Location */}
            {/* <View style={{ marginTop: spacing.HEIGHT_20 }}>
                            <CustomDropDown
                                data={registerForm?.registerFormData?.LOCATION ?? []}
                                onChangeText={(text) => onLocationClick(text)}
                                value={location}
                                placeHolder={strings.location}
                            />
                            {!registerForm.initRegisterForm && registerForm?.loggedProfile?.errorCode == '404' &&
                                showErrorMessage(registerForm?.otpFormDataForEmail?.message||registerForm?.otpFormDataForEmail?.message)
                            }

                            {locationError !== "" &&
                                showErrorMessage(locationError)
                            }
                        </View> */}

            {/* Mobile Number */}
            <View style={{ marginTop: 5 }}>
              <TextBoxWithCTA
                onChangeText={(text) => onMobleNoChange(text)}
                value={mobileNo}
                placeHolder={strings.mobile_number}
                isResendOTP={true}
                loader={
                  registerForm?.initOtpForm &&
                    registerForm?.otpUsageType === "mobile"
                    ? true
                    : false
                }
                countryCode={countryCode}
                label={strings.send_otp}
                onPress={submitResndOTP}
                bgColor={color.BCAE_PRIMARY}
                keyboardType={"numeric"}
                isDisableButton={isDisableSendOtp}
                btnTextPro={{
                  color: color.WHITE,
                  fontSize: fontSizes.FONT_12,
                  fontWeight: "400",
                  lineHeight: spacing.HEIGHT_14,
                }}
              />
              {otpTimer > 0 && otpTimer < OTP_TIMER && (
                <View style={{ alignItems: "flex-end", marginTop: 10 }}>
                  <Text style={styles.errorText}>
                    {strings.otp_sent} {formatOtpTimer(otpTimer)}
                  </Text>
                </View>
              )}
              {!registerForm.initOtpForm &&
                registerForm?.isOtpFormError &&
                registerForm?.otpFormDataForMobile?.errorCode > 200 &&
                registerForm?.otpUsageType === "mobile" &&
                showErrorMessage(registerForm?.otpFormDataForMobile?.message)}
              {numberError !== "" && showErrorMessage(numberError)}
            </View>
            {/* OTP */}
            <View style={{ marginTop: 5 }}>
              <TextBoxWithCTA
                onChangeText={(text) => onOTPChange(text)}
                value={otp}
                placeHolder={strings.otp}
                isConfirmOTP={true}
                label={strings.confirm_otp}
                loader={
                  registerForm?.initOtpForm &&
                    registerForm?.otpUsageType === "mobileOtp"
                    ? true
                    : false
                }
                correctOtp={mobileOTPVerifcation}
                onPress={submitConfirmMobileOTP}
                bgColor={color.BCAE_PRIMARY}
                keyboardType={"numeric"}
                btnTextPro={{
                  color: color.WHITE,
                  fontSize: fontSizes.FONT_12,
                  fontWeight: "400",
                  lineHeight: spacing.HEIGHT_14,
                }}
              />
              {otp !== "" &&
                !registerForm.initOtpForm &&
                registerForm?.otpFormDataForMobile?.data?.otp !== undefined &&
                registerForm?.otpFormDataForMobile?.data?.otp !== otp &&
                registerForm?.otpUsageType === "mobileOtp" &&
                showMobileErrorMessage()}

              {otp !== "" &&
                !registerForm.initOtpForm &&
                registerForm?.otpFormDataForMobile?.data?.data === null &&
                registerForm?.otpUsageType === "mobileOtp" &&
                showMobileErrorMessage()}

              {otpNumberError !== "" && showErrorMessage(otpNumberError)}
            </View>
            {/* Email */}
            <View style={{ marginTop: 5 }}>
              <TextBoxWithCTAEmail
                onChangeText={(text) => onEmailChange(text)}
                value={email}
                placeHolder={strings.email}
                isEmail={true}
                loader={
                  registerForm?.initOtpForm &&
                    registerForm?.otpUsageType === "email"
                    ? true
                    : false
                }
                label={"CONFIRM EMAIL"}
                onPress={submitEmail}
                bgColor={color.BCAE_PRIMARY}
                btnTextPro={{
                  color: color.WHITE,
                  fontSize: fontSizes.FONT_12,
                  fontWeight: "400",
                  lineHeight: spacing.HEIGHT_14,
                }}
              />
              {!registerForm.initOtpForm &&
                registerForm?.isOtpFormError &&
                registerForm?.otpFormDataForEmail?.errorCode > 200 &&
                registerForm?.otpUsageType === "email" &&
                showErrorMessage(registerForm?.otpFormDataForEmail?.message)}

              {emailError !== "" && showErrorMessage(emailError)}
            </View>

            {/* OTP */}
            {/* {console.log("registerForm====>"+registerForm?.otpUsageType  +"===="+registerForm?.otpFormData.data.otp)} */}

            <View style={{ marginTop: 5 }}>
              <TextBoxWithCTA
                onChangeText={(text) => onEmailOTPChange(text)}
                value={otpEmail}
                placeHolder={strings.otp}
                isConfirmOTP={true}
                label={"CONFIRM OTP"}
                loader={
                  registerForm?.initOtpForm &&
                    registerForm?.otpUsageType === "emailOtp"
                    ? true
                    : false
                }
                correctOtp={emailOTPVerification}
                onPress={submitConfirmEmailOTP}
                bgColor={color.BCAE_PRIMARY}
                keyboardType={"numeric"}
                btnTextPro={{
                  color: color.WHITE,
                  fontSize: fontSizes.FONT_12,
                  fontWeight: "400",
                  lineHeight: spacing.HEIGHT_14,
                }}
              />
              {/* //{ console.log("otpEmail==>"+otpEmail+"===>"+registerForm.initOtpForm+"===="+registerForm?.otpFormData?.data?.otp+"===="+registerForm?.otpUsageTyp )} */}
              {otpEmail !== "" &&
                !registerForm.initOtpForm &&
                registerForm?.otpFormDataForEmail?.data?.otp !== undefined &&
                registerForm?.otpFormDataForEmail?.data?.otp !== otpEmail &&
                registerForm?.otpUsageType === "emailOtp" &&
                showEmailErrorMessage()}

              {otpEmail !== "" &&
                !registerForm.initOtpForm &&
                registerForm?.otpFormDataForEmail?.data?.data === null &&
                registerForm?.otpUsageType === "emailOtp" &&
                showEmailErrorMessage()}

              {otpEmailError !== "" && showErrorMessage(otpEmailError)}
            </View>
            <View style={{ marginBottom: 5 }}>
              <EditText
                onChangeText={(text) => onPasswordChange(text)}
                value={password}
                placeHolder={strings.password}
                secureTextEntry={secureTextEntry}
                hideShowClick={hideShowClick}
                isHideShow={password.length > 0}
              />

              {passwordError !== "" && showErrorMessage(passwordError)}
            </View>

            <View style={{ marginBottom: 5 }}>
              <EditText
                onChangeText={(text) => onConfirmPasswordChange(text)}
                value={confirmPassword}
                placeHolder={strings.confirmPassword}
                secureTextEntry={secureTextEntryConfim}
                hideShowClick={hideShowClickConfirm}
                isHideShow={confirmPassword.length > 0}
              />

              {passwordConfirmError !== "" &&
                showErrorMessage(passwordConfirmError)}
            </View>

            <Pressable
              onPress={onCheckBoxClickTerm}
              style={{ flexDirection: "row", marginTop: spacing.HEIGHT_24 }}
            >
              <Image
                style={styles.checkBox}
                source={
                  isSelectedTerm
                    ? require("../../Assets/icons/ci_checked.png")
                    : require("../../Assets/icons/ci_uncheck.png")
                }
              ></Image>
              <Text style={{ marginLeft: spacing.WIDTH_8 }}>
                I have agree to your{" "}
              </Text>
              <Text
                onPress={() =>
                  navigation.navigate("ShowWebPage", {
                    fromLogin: true,
                    title: "Terms & Conditions",
                    url: DEBUG_BUILD ? STAGE_TERMS : PROD_TERMS,
                  })
                }
                style={{ color: color.BCAE_DARK_BLUE }}
              >
                Terms &amp; Conditions.
              </Text>
            </Pressable>

            {termError !== "" && showErrorMessage(termError)}
            <Pressable
              onPress={onCheckBoxClick}
              style={{ flexDirection: "row", marginTop: spacing.HEIGHT_24 }}
            >
              <Image
                style={styles.checkBox}
                source={
                  isSelected
                    ? require("../../Assets/icons/ci_checked.png")
                    : require("../../Assets/icons/ci_uncheck.png")
                }
              ></Image>
              <Text style={{ marginLeft: spacing.WIDTH_8 }}>
                I have read your{" "}
              </Text>
              <Text
                onPress={() =>
                  navigation.navigate("ShowWebPage", {
                    fromLogin: true,
                    title: "Privacy Policy",
                    url: DEBUG_BUILD ? STAGE_PRIVACY : PROD_PRIVACY,
                  })
                }
                style={{ color: color.BCAE_DARK_BLUE }}
              >
                Privacy Policy.
              </Text>
            </Pressable>

            {privaceyError !== "" && showErrorMessage(privaceyError)}

            {/* {
                                    console.log("registerForm===>"+JSON.stringify(registerForm?.otpFormData))
                                } */}
            {!registerForm.initRegisterForm &&
              registerForm?.otpFormData?.errorCode !== "200" &&
              registerForm?.otpUsageType === "Register" &&
              showErrorMessage(registerForm?.otpFormData?.message)}

            {/* {showAlert()} */}

            <View style={{ marginTop: spacing.HEIGHT_24 }}>
              {registerForm?.initOtpForm &&
                registerForm?.otpUsageType === "Register" ? (
                <CustomActivityIndicator
                  size={buttonSize.LARGE}
                  bgColor={color.BLACK}
                  loderColor={color.WHITE}
                />
              ) : (
                <Button
                  size={buttonSize.LARGE}
                  label={"REGISTER"}
                  bgColor={color.BCAE_PRIMARY}
                  disabled={isButtomDiable}
                  textPro={{
                    color: color.WHITE,
                    fontSize: fontSizes.FONT_16,
                    fontWeight: "400",
                    lineHeight: spacing.HEIGHT_19,
                  }}
                  onPress={submit}
                />
              )}
            </View>

            {orSection()}

            <View>
              <Text style={styles.alreadyAccount}>{strings.already_acc}</Text>
              <Pressable onPress={() => navigation.navigate("Login", {})}>
                <Text style={styles.loginText}>
                  {strings.login.toUpperCase()}
                </Text>
              </Pressable>
            </View>

            <View style={{ paddingBottom: spacing.HEIGHT_50 }} />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
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
  orText: {
    color: color.BCAE_LIGHT_BLUE,
    fontSize: fontSizes.FONT_10,
    fontWeight: "500",
    lineHeight: spacing.WIDTH_16,
    paddingHorizontal: spacing.WIDTH_7,
  },
  alreadyAccount: {
    marginTop: spacing.HEIGHT_30,
    fontWeight: "400",
    color: color.PLACEHOLDER,
    fontSize: fontSizes.FONT_12,
    lineHeight: spacing.WIDTH_14,
    textAlign: "center",
  },
  loginText: {
    marginTop: spacing.HEIGHT_6,
    fontWeight: "500",
    color: color.BCAE_PRIMARY,
    fontSize: fontSizes.FONT_14,
    lineHeight: spacing.WIDTH_17,
    textAlign: "center",
  },
  checkBox: {
    height: spacing.WIDTH_20,
    width: spacing.WIDTH_20,
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
  textLocation: {
    marginTop: spacing.HEIGHT_10,
    borderBottomWidth: 1,
    borderBottomColor: color.INPUT_TEXT_BORDER,
    flexDirection: "row",
  },
  placeHolderText: {
    color: color.PLACEHOLDER,
    fontSize: fontSizes.FONT_12,
    fontWeight: "500",
  },
});

export default Register;
