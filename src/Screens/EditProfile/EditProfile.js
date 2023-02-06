import React, { useEffect, useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Pressable,
  SafeAreaView,
  ImageBackground,
  Alert,
} from "react-native";
import {
  spacing,
  color,
  fontSizes,
  buttonSize,
  validateNumber,
  validateEmail,
} from "../../Utilities/Constants/Constant";
import { EditText } from "../../Components/EditText";
import { CustomDropDown } from "../../Components/CustomDropDown";
import {
  fetchRegisterFormData,
  getOtpForNumber,
} from "../Register/RegisterDispatcher";
import {
  fetchSavedProfileData,
  updateProfileData,
} from "../../Redux/ProfileDispatcher";
import { strings } from "../../Utilities/Language/index";
import { FullPageLoder } from "../../Components/FullPageLoder";
import ProfileHeader from "../TabScreens/Component/ProfileHeader";
import LoadingAnimation from "../../Components/LoadingAnimation";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fetchSavedLocations } from "../../Redux/SavedLocationDispatcher";
import { CustomActivityIndicator } from "../../Components/CustomActivityIndicator";
import { TDLog } from "../../Utilities/Constants/Constant";

const EditProfile = ({ navigation, props }) => {
  let savedLocation = useSelector((state) => state.savedLocations);
  const dispatchSaveLocation = useDispatch([fetchSavedLocations]);
  const fetchSavedLocationData = () =>
    dispatchSaveLocation(fetchSavedLocations());

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");

  const [location, setLocation] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [otp, setOTP] = useState("");
  const [otpEmail, setEmailOTP] = useState("");
  const [email, setEmail] = useState("");
  const [isSelected, setSelection] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [secureTextEntryConfim, setsecureTextEntryConfim] = useState(true);
  const [isSaveButtonDisable, setSaveButtomEnableDisable] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [myscreenmae, setscreenname] = useState("Edit Profile");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [genderError, setgenderError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [otpNumberError, setOtpNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpEmailError, setOtpEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setConfirmPasswordError] = useState("");
  const [profileImageData, setProfileImageData] = useState("");
  const [selectedValueGender, setValueGender] = useState("");
  const [selectedValueCountry, setValueCountry] = useState("");
  let registerForm = useSelector((state) => state.registerForm);
  const dispatch1 = useDispatch([fetchRegisterFormData]);

  const [street, setStreet] = useState("");
  const [state, setStateProfile] = useState("");
  const [district, setDistrict] = useState("");
  const [country, setCountry] = useState("");
  const [postCode, setPostcode] = useState("");

  useEffect(() => {
    dispatch1(fetchRegisterFormData());
  }, []);

  let profile = useSelector((state) => state.profile);
  const dispatch2 = useDispatch([fetchSavedProfileData, updateProfileData]);
  console.log(
    "profile?.savedProfileData?.country : " + profile?.savedProfileData?.country
  );

  useEffect(() => {
    dispatch2(fetchSavedProfileData());

    setProfileImageData(profile?.savedProfileData?.profilePicture);
    setFirstName(profile?.savedProfileData?.firstName);
    setLastName(profile?.savedProfileData?.lastName);
    setGender(profile?.savedProfileData?.gender);
    setValueGender(profile?.savedProfileData?.gender);
    setCountry("Brunei Darussalam");
    setValueCountry("Brunei Darussalam");
    setMobileNo(profile?.savedProfileData?.contactNo);
    setEmail(profile?.savedProfileData?.email);
    setLocation(getAddressString(profile?.savedProfileData));
    // console.warn("useeffect", profile?.savedProfileData);
    console.log(
      "country===>" + profile?.savedProfileData?.hno !==
        "" +
          "," +
          profile?.savedProfileData?.block +
          "," +
          profile?.savedProfileData?.buildingName +
          "," +
          profile?.savedProfileData?.road +
          "," +
          profile?.savedProfileData?.city +
          "," +
          profile?.savedProfileData?.town +
          "," +
          profile?.savedProfileData?.state +
          "," +
          profile?.savedProfileData?.district +
          "," +
          profile?.savedProfileData?.country
    );
  }, []);

  const genderLot = (gender) => {
    if (gender === "M") return "Male";
    if (gender === "F") return "Female";
    return gender;
  };
  const getAddressString = (data) => {
    let addressString = "";
    if (data?.hno) {
      addressString += data.hno + ",";
    }
    if (data?.block) {
      addressString += data.block + ",";
    }
    if (data?.buildingName) {
      addressString += data.buildingName + ",";
    }
    if (data?.street) {
      addressString += data.street + ",";
    }
    if (data?.town) {
      addressString += data.town + ",";
    }
    if (data?.city) {
      addressString += data.city + ",";
    }
    if (data?.district) {
      addressString += data.district + ",";
    }
    if (data?.state) {
      addressString += data.state + ",";
    }
    if (data?.country) {
      addressString += data.country + ",";
      setCountry(data?.country);
    } else {
      addressString += "Brunei Darussalam";
      setCountry("Brunei Darussalam");
    }

    if (data?.postCode) {
      addressString += "" + data.postCode;
    }
    return addressString;
  };

  const onPlaceChosen = (params) => {
    // here is your callback function
    TDLog("onPlaceChosen Edit profile", JSON.stringify(params));
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
  };

  const locationIconClick = () => {
    navigation.navigate("SavedLocation", {
      onPlaceChosen,
      fromPage: "EditProfile",
    });
  };

  const changeProfileImage = () => {
    let options = {
      title: "Select Image",
      customButtons: [
        { name: "customOptionKey", title: "Choose Photo from Custom Option" },
      ],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: true,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        console.log("Response = ", response);

        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
        } else {
          const source = { uri: response.uri };

          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          //alert(JSON.stringify(response?.assets[0]))
          setProfileImageData(response?.assets[0]?.base64);
        }
      }
    );
  };

  const buttonEnableDisable = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      gender === "" ||
      country === "" ||
      location === ""
    ) {
      setSaveButtomEnableDisable(true);
    } else {
      setSaveButtomEnableDisable(false);
    }
  };

  const onLocationChanged = (textStr) => {
    setLocation(textStr);
    setLocationError("");
  };
  const onFirstNameChange = (textStr) => {
    setFirstName(textStr);
    setFirstNameError("");
    buttonEnableDisable();
  };
  const clearFirstName = () => {
    setFirstName("");
    setFirstNameError(strings.firstNameError);
  };

  const onLastNameChange = (textStr) => {
    setLastName(textStr);
    setLastNameError("");
    buttonEnableDisable();
  };
  const clearLastName = () => {
    setLastName("");
    setLastNameError(strings.lastNameError);
  };

  const onGenderClick = (textStr) => {
    setGender(textStr?.description);
    buttonEnableDisable();
  };
  const onCountryClick = (textStr) => {
    setCountry(textStr?.description);
    setCountryCode(textStr?.mapping?.countryCode ?? "");
    buttonEnableDisable();
  };
  const onLocationClick = (textStr) => {
    setLocation(textStr.onChangeText);
    buttonEnableDisable();
  };

  const onMobleNoChange = (textStr) => {
    setMobileNo(textStr);
    setNumberError("");
    buttonEnableDisable();
  };
  const onOTPChange = (textStr) => {
    setOTP(textStr);
    setOtpNumberError("");
    buttonEnableDisable();
  };
  const onEmailOTPChange = (textStr) => {
    setEmailOTP(textStr);
    setOtpEmailError("");
    buttonEnableDisable();
  };
  const onEmailChange = (textStr) => {
    setEmail(textStr);
    setEmailError("");
    buttonEnableDisable();
  };

  const submitResndOTP = () => {
    if (!validateNumber(mobileNo)) {
      setNumberError(strings.mobileValidError);
    } else {
      //alert('submitResndOTP')
      dispatch1(getOtpForNumber(countryCode + mobileNo, firstName, "mobile"));
      buttonEnableDisable();
    }
  };
  const submitConfirmMobileOTP = () => {
    if (otp === "") {
      setOtpNumberError(strings.numberOtpError);
    } else {
      // dispatch(getOtpForNumber( email, firstName, "email"))
      buttonEnableDisable();
    }
  };

  const submitConfirmEmailOTP = () => {
    if (otpEmail === "") {
      setOtpEmailError(strings.emailOtpError);
    } else {
      //alert('submitResndOTP')
      // dispatch(getOtpForNumber( email, firstName, "email"))
      buttonEnableDisable();
    }
  };
  const submitEmail = () => {
    if (!validateEmail(email)) {
      setEmailError(strings.emailValidError);
    } else {
      //alert('submitResndOTP')
      dispatch1(getOtpForNumber(email, firstName, "email"));
      buttonEnableDisable();
    }
  };

  const onCheckBoxClick = () => {
    setSelection(!isSelected);
    buttonEnableDisable();
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
  };

  const onConfirmPasswordChange = (textStr) => {
    setConfirmPassword(textStr);

    setConfirmPasswordError("");
  };

  const submit = () => {
    if (isSaveButtonDisable) {
      Alert.alert(strings.attention, strings.field_empty_alert, [
        { text: strings.ok, onPress: () => {} },
      ]);
    } else {
      console.warn("submit", location, street);
      console.log("submit====>1-->" + location);
      const myArray = location.split(",").reverse();
      console.log("submit====>1-->" + location);
      if (firstName?.trim() === "") {
        setFirstNameError(strings.firstNameError);
      } else if (lastName?.trim() === "") {
        setLastNameError(strings.lastNameError);
      } else if (gender === "") {
        setgenderError(strings.genderError);
      } else if (country === "") {
        setCountryError(strings.countryError);
      }
      //else if (location === "") { setLocationError(strings.locationError) }
      else {
        let registerObject = {
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          profilePicture: profileImageData,
          address: {
            address: location,
            hno: "",
            buildingName: "",
            street: street,
            road: "",
            city: "",
            state: state,
            district: district,
            country: country,
            latitude: latitude,
            longitude: longitude,
            postCode: postCode,
          },
        };
        console.log(
          "EditProfile Object ===> " + JSON.stringify(registerObject)
        );
        dispatch2(
          updateProfileData(registerObject, profile.savedProfileData.userId)
        );
      }
      //dispatch2(updateProfileData(registerObject,profile.savedProfileData.userId));
    }
  };

  const showErrorMessage = (errMessage) => {
    return (
      <View style={{ marginTop: spacing.HEIGHT_6, flexDirection: "row" }}>
        <Image
          style={styles.errorLogo}
          source={require("../../Assets/icons/ci_error_warning.png")}
        />
        <Text style={styles.errorText}>{errMessage}</Text>
      </View>
    );
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
      {profile.initProfile && (
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
      {!profile.initProfile && (
        <View style={styles.container}>
          <ProfileHeader
            Text={myscreenmae}
            navigation={navigation}
            backIconVisibility={true}
            submit={submit}
          ></ProfileHeader>
          <View
            style={{
              height: 150,
              backgroundColor: color.BCAE_PRIMARY,
              paddingTop: 20,
            }}
          >
            <TouchableOpacity activeOpacity={0.5} onPress={changeProfileImage}>
              <View style={[{ alignItems: "center" }]}>
                <ImageBackground
                  source={{ uri: `data:image/jpeg;base64,${profileImageData}` }}
                  imageStyle={{ borderRadius: 80 }}
                  style={{ height: 110, width: 110 }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Image
                      source={require("../../Assets/icons/ic_camera_white.png")}
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 30,
                        marginBottom: 10,
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>

          {registerForm.initRegisterForm ? (
            <FullPageLoder
              bgColor={color.DISABLED_GREY}
              loderColor={color.BCAE_PRIMARY}
            />
          ) : (
            <ScrollView
              style={{ flexGrow: 1, paddingHorizontal: spacing.WIDTH_30 }}
              nestedScrollEnabled={true}
            >
              <View style={{ marginTop: spacing.HEIGHT_30 }}>
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      color: color.PLACEHOLDER,
                      fontSize: 14,
                      fontWeight: "500",
                    }}
                  >
                    User Name
                  </Text>
                  <Text
                    style={{
                      color: color.PROFILE_NAME,
                      fontSize: 18,
                      fontWeight: "500",
                    }}
                  >
                    {profile?.savedProfileData?.email}
                  </Text>
                </View>
              </View>

              <View style={{ marginTop: spacing.HEIGHT_30 }}>
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      color: color.PLACEHOLDER,
                      fontSize: 14,
                      fontWeight: "500",
                    }}
                  >
                    Customer ID
                  </Text>
                  <Text
                    style={{
                      color: color.PROFILE_NAME,
                      fontSize: 18,
                      fontWeight: "500",
                    }}
                  >
                    {profile?.savedProfileData?.customerId}
                  </Text>
                </View>
              </View>
              {/* First Name */}
              <View style={{ marginTop: spacing.HEIGHT_30 }}>
                <EditText
                  onChangeText={(text) => onFirstNameChange(text)}
                  value={firstName}
                  placeHolder={strings.first_name}
                  clearText={clearFirstName}
                  isClose={firstName?.length > 0}
                />
                {!registerForm.initRegisterForm &&
                  registerForm?.loggedProfile?.errorCode == "404" &&
                  this.showErrorMessage(registerForm?.loggedProfile?.message)}
                {firstNameError !== "" && showErrorMessage(firstNameError)}
              </View>

              {/* Last Name */}
              <View style={{ marginTop: spacing.HEIGHT_5 }}>
                <EditText
                  onChangeText={(text) => onLastNameChange(text)}
                  value={lastName}
                  placeHolder={strings.last_name}
                  clearText={clearLastName}
                  isClose={lastName?.length > 0}
                />
                {!registerForm.initRegisterForm &&
                  registerForm?.loggedProfile?.errorCode == "404" &&
                  this.showErrorMessage(registerForm?.loggedProfile?.message)}
                {lastNameError !== "" && showErrorMessage(lastNameError)}
              </View>

              {/* Gender */}
              <View style={{ marginTop: spacing.HEIGHT_20 }}>
                <CustomDropDown
                  selectedValue={genderLot(selectedValueGender)}
                  setValue={setValueGender}
                  data={registerForm?.registerFormData?.GENDER ?? []}
                  onChangeText={(text) => onGenderClick(text)}
                  value={genderLot(gender)}
                  placeHolder={strings.gender}
                />
                {!registerForm.initRegisterForm &&
                  registerForm?.loggedProfile?.errorCode == "404" &&
                  this.showErrorMessage(registerForm?.loggedProfile?.message)}
                {genderError !== "" && showErrorMessage(genderError)}
              </View>

              {/* Address */}
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

                {!registerForm.initRegisterForm &&
                  registerForm?.loggedProfile?.errorCode == "404" &&
                  this.showErrorMessage(registerForm?.loggedProfile?.message)}
                {locationError !== "" && showErrorMessage(locationError)}
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
                                this.showErrorMessage(registerForm?.loggedProfile?.message)
                            }

                            {locationError !== "" &&
                                showErrorMessage(locationError)
                            }
                        </View> */}

              {/* Country */}
              <View style={{ marginTop: spacing.HEIGHT_20 }}>
                <CustomDropDown
                  selectedValue={selectedValueCountry}
                  setValue={setValueCountry}
                  data={registerForm?.registerFormData?.COUNTRY ?? []}
                  onChangeText={(text) => {
                    onCountryClick(text);
                  }}
                  value={country}
                  placeHolder={strings.country}
                />
                {!registerForm.initRegisterForm &&
                  registerForm?.loggedProfile?.errorCode == "404" &&
                  this.showErrorMessage(registerForm?.loggedProfile?.message)}
                {countryError !== "" && showErrorMessage(countryError)}
              </View>

              {/* Mobile Number */}
              <View style={{ marginTop: spacing.HEIGHT_20 }}>
                <EditText
                  value={mobileNo}
                  placeHolder={strings.mobile_number}
                  clearText={clearFirstName}
                  isClose={0}
                  editable={false}
                />
                {!registerForm.initRegisterForm &&
                  registerForm?.loggedProfile?.errorCode == "404" &&
                  this.showErrorMessage(registerForm?.loggedProfile?.message)}
                {numberError !== "" && showErrorMessage(numberError)}
              </View>

              {/* Email */}
              <View style={{ marginTop: spacing.HEIGHT_20 }}>
                <EditText
                  value={email}
                  placeHolder={strings.email}
                  clearText={clearFirstName}
                  isClose={0}
                  editable={false}
                />
                {!registerForm.initRegisterForm &&
                  registerForm?.loggedProfile?.errorCode == "404" &&
                  this.showErrorMessage(registerForm?.loggedProfile?.message)}
                {emailError !== "" && showErrorMessage(emailError)}
              </View>

              <View style={{ paddingBottom: spacing.HEIGHT_50 }} />
            </ScrollView>
          )}
        </View>
      )}
    </SafeAreaView>
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
    color: color.BCAE_LIGHT_BLUE,
    fontSize: fontSizes.FONT_14,
    lineHeight: spacing.WIDTH_17,
    textAlign: "center",
  },
  checkBox: {
    height: spacing.WIDTH_20,
    width: spacing.WIDTH_20,
  },
  emptyList: {
    fontSize: 20,
    color: color.BCAE_PRIMARY,
  },
  errorText: {
    color: color.ERROR_TEXT_RED,
    fontSize: fontSizes.FONT_14,
    fontWeight: "500",
    lineHeight: spacing.WIDTH_14,
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

export default EditProfile;
