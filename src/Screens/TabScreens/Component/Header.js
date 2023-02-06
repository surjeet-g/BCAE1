import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Switch,
  Alert,
  Linking,
} from "react-native";
import {
  spacing,
  fontSizes,
  color,
  buttonType,
  buttonSize,
  bottomBarHeight,
  validatePassword,
  DEBUG_BUILD,
  STAGE_FAQ,
  PROD_FAQ,
} from "../../../Utilities/Constants/Constant";
import { Button } from "../../../Components/Button";
import { CustomActivityIndicator } from "../../../Components/CustomActivityIndicator";
import { EditText } from "../../../Components/EditText";
import { strings } from "../../../Utilities/Language";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavedProfileData } from "../../../Redux/ProfileDispatcher";
import {
  logoutUser,
  deleteNdLogoutUser,
} from "../../../Redux/LogoutDispatcher";
import { resetMyDashboardData } from "../../../Redux/MyDashboardDispatcher";
import { resetMyTicketsData } from "../../../Redux/MyTicketsDispatcher";
import {
  changePassword,
  resetPasswordChangeData,
} from "../../../Screens/ForgotPassword/ForgotPasswordDispatcher";
import { saveDataToDB, getDataFromDB } from "../../../Storage/token";
import { storageKeys } from "../../../Utilities/Constants/Constant";
import { saveToken } from "../../../Storage/token";
import NetInfo from "@react-native-community/netinfo";
var { height, width } = Dimensions.get("screen");
const Header = (props, { IsShowBell }) => {
  let profile = useSelector((state) => state.profile);
  let logout = useSelector((state) => state.logout);
  let forgot = useSelector((state) => state.forgot);
  let dashboard = useSelector((state) => state.myDashboardData);
  let myTickets = useSelector((state) => state.myTickets);

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureTextEntryOld, setsecureTextEntryOld] = useState(true);
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [secureTextEntryConfim, setsecureTextEntryConfim] = useState(true);

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

  const dispatch = useDispatch([
    fetchSavedProfileData,
    changePassword,
    resetPasswordChangeData,
    logoutUser,
  ]);

  const requestChangePassword = () => {
    if (validatePassword(password)) {
      dispatch(
        changePassword(
          profile.savedProfileData.email,
          oldPassword,
          password,
          confirmPassword
        )
      );
    } else {
      Alert.alert(strings.attention, strings.passwordValidError, [
        {
          text: strings.ok,
          onPress: () => {},
        },
      ]);
    }
  };

  const performLogoutUser = () => {
    //while logout we have to reset the data of first two tab as still it has logout info

    dispatch(logoutUser(props.navigation, profile?.savedProfileData?.userId));
  };
  const performLogoutDeleUser = () => {
    //while logout we have to reset the data of first two tab as still it has logout info

    dispatch(deleteNdLogoutUser(props.navigation, profile?.savedProfileData));
  };

  const fetchMyProfileData = () => dispatch(fetchSavedProfileData());

  useEffect(() => {
    getDataFromDB(storageKeys.PUSH_NOTIFICATION).then((result) => {
      if (result) {
        setIsNotiEnabled(result.push_notification);
      }
    });
    fetchMyProfileData();
  }, []);

  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [isNotiEnabled, setIsNotiEnabled] = useState(false);
  const [TD123, setTD123] = useState("123");

  const hideProfileModal = () => setProfileModalVisible(false);
  const showProfileModal = () => {
    NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        setProfileModalVisible(true);
      } else {
        Alert.alert(strings.attention, strings.no_internet, [
          {
            text: strings.ok,
            onPress: () => {
              props.navigation.navigate("Splash", {});
            },
          },
        ]);
      }
    });
  };

  const toggleSwitch = () => {
    setIsNotiEnabled(!isNotiEnabled);
    saveDataToDB(storageKeys.PUSH_NOTIFICATION, {
      push_notification: !isNotiEnabled,
    }).then(function () {});
  };

  const onLogoutPressed = () =>
    Alert.alert(strings.attention, strings.are_you_sure_logout, [
      {
        text: strings.cancel,
        onPress: () => console.log("Cancel Pressed"),
      },
      {
        text: strings.ok,
        onPress: () => {
          hideProfileModal();
          performLogoutUser();
        },
      },
    ]);

  const onDeletePressed = () =>
    Alert.alert(strings.attention, strings.are_you_sure_delete_account, [
      {
        text: strings.cancel,
        onPress: () => console.log("Cancel Pressed"),
      },
      {
        text: strings.ok,
        onPress: () => {
          hideProfileModal();
          performLogoutDeleUser();
        },
      },
    ]);

  const onCallTD123Pressed = () => {
    hideProfileModal();
    Linking.openURL(`tel:${TD123}`);
  };

  const onMailPressed = () => {
    hideProfileModal();
    Linking.openURL("mailto:info@123.com.bn?subject=&body=");
  };

  const showWebPageAbout = () => {
    hideProfileModal();
    props.navigation.navigate("About", {});
  };

  const showWebPageFAQ = () => {
    hideProfileModal();
    props.navigation.navigate("ShowWebPage", {
      fromLogin: false,
      url: DEBUG_BUILD ? STAGE_FAQ : PROD_FAQ,
      title: "FAQ",
    });
  };

  const onSavedLocationPressed = () => {
    hideProfileModal();
    props.navigation.navigate("SavedLocation", {});
    // props.navigation.navigate('SavedLocation', {customerId: profile.savedProfileData.customerId})
  };
  const onEditProfilePressed = () => {
    hideProfileModal();
    props.navigation.navigate("EditProfile", {}); //{customerId:profile.savedProfileData.customerId})
  };

  const onChangePasswordPressed = () => {
    setShowChangePassword(!showChangePassword);
    dispatch(resetPasswordChangeData());
  };

  const onChangePasswordBackPressed = () => {
    setShowChangePassword(!showChangePassword);
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

  const showSuccessMessage = (message) => {
    Alert.alert(strings.attention, message, [
      {
        text: strings.ok,
        onPress: () => {
          setShowChangePassword(!showChangePassword);
          setOldPassword("");
          setPassword("");
          setConfirmPassword("");
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

  const backNavigation = () => {
    if (props.resetPassword) {
      Alert.alert(
        strings.attention,
        strings.mandatory_password_change + "\n" + strings.want_to_continue,
        [
          { text: strings.cancel, onPress: () => {} },
          ,
          { text: strings.ok, onPress: () => props.navigation.goBack() },
        ]
      );
    } else {
      if (props.Text === "Interaction") {
        props.navigation.navigate("MyTickets");
      } else {
        props.navigation.goBack();
      }
    }
  };

  return (
    <View
      style={props.transparent ? styles.transparentContainer : styles.container}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={[styles.box1]}>
          <Pressable onPress={backNavigation}>
            {props.backIconVisibility && (
              <Image
                style={{
                  height: 25,
                  width: 25,
                  transform: [{ rotate: "90deg" }],
                }}
                source={require("../../../Assets/icons/dropdown.png")}
              ></Image>
            )}
          </Pressable>
          {props.bcae && (
            <Image
              style={{ height: 50, width: 50 }}
              source={require("../../../Assets/icons/ic_td123_logo.png")}
            ></Image>
          )}
        </View>
        <View style={[styles.headerBox2]}>
          <Text style={{ ...styles.textView, ...{ color: color.BLACK } }}>
            {props.Text}
          </Text>
        </View>

        <View style={[styles.box3]}>
          {props.rightIconsVisibility && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {props?.IsShowBell != false && (
                <>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate("Notification")}
                  >
                    <Image
                      style={{
                        height:
                          Platform.OS === "android"
                            ? spacing.HEIGHT_25
                            : height / 30,
                        width: Platform.OS === "android" ? 20 : width / 20,
                        resizeMode: "contain",
                        marginRight: 20,
                      }}
                      source={require("../../../Assets/icons/bell.png")}
                    ></Image>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={showProfileModal}
                  >
                    <Image
                      style={{ height: spacing.HEIGHT_25, width: 25 }}
                      source={require("../../../Assets/icons/menu.png")}
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}

          {props.registerfaq && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() =>
                  props.navigation.navigate("ShowWebPage", {
                    fromLogin: true,
                    title: "FAQ",
                    url: DEBUG_BUILD ? STAGE_FAQ : PROD_FAQ,
                  })
                }
              >
                <Image
                  style={{ height: 25, width: 25, resizeMode: "contain" }}
                  source={require("../../../Assets/icons/faq_login.png")}
                />
              </TouchableOpacity>
            </View>
          )}

          {props.refreshIconVisibility && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={props.onRefreshClicked}
              >
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: color.BCAE_PRIMARY,
                    resizeMode: "contain",
                  }}
                  source={require("../../../Assets/icons/ic_refresh.png")}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <Modal
        animationType="fade"
        visible={profileModalVisible}
        mode="overFullScreen"
        onBackdropPress={() => {
          hideProfileModal();
        }}
        transparent={true}
        outsideClick={() => {
          if (closeOnClickOutside) {
            hideProfileModal();
          }
        }}
      >
        <View style={styles.ProfileContainer}>
          <View
            style={{
              height: 90,
              backgroundColor: color.BCAE_PRIMARY,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              justifyContent: "center",
              paddingLeft: 20,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={[styles.box1]}>
                <Image
                  style={styles.profileImage}
                  source={{
                    uri: `data:image/jpeg;base64,${profile?.savedProfileData?.profilePicture}`,
                  }}
                ></Image>
              </View>
              <View style={[styles.box2]}>
                <Text style={[styles.profileName]}>{strings.hello}</Text>

                <Text style={[styles.profileName]}>
                  {profile?.savedProfileData?.firstName +
                    " " +
                    profile?.savedProfileData?.lastName}
                </Text>
              </View>
              <View style={[styles.box3]}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={onEditProfilePressed}
                >
                  <Image
                    style={styles.editImage}
                    source={require("../../../Assets/icons/ic_edit.png")}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {!showChangePassword && (
            <View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={onChangePasswordPressed}
              >
                <View
                  style={{
                    height: 60,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    justifyContent: "center",
                    paddingLeft: 20,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View style={[styles.box1]}>
                      <Image
                        style={styles.profileMenuImage}
                        source={require("../../../Assets/icons/ic_change_password.png")}
                      ></Image>
                    </View>
                    <View style={[styles.box2]}>
                      <Text style={styles.profileMenuText}>
                        {strings.change_password}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.box3,
                        { alignItems: "flex-end", marginRight: 20 },
                      ]}
                    >
                      <Image
                        source={require("../../../Assets/icons/ic_right_arrow.png")}
                      ></Image>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  height: 60,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  justifyContent: "center",
                  paddingLeft: 20,
                }}
              >
                <View style={{ flexDirection: "row", opacity: 0.3 }}>
                  <View style={[styles.box1]}>
                    <Image
                      style={styles.profileMenuImage}
                      source={require("../../../Assets/icons/ic_change_language.png")}
                    ></Image>
                  </View>
                  <View style={[styles.box2]}>
                    <Text style={styles.profileMenuText}>
                      {strings.change_language}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.box3,
                      { alignItems: "flex-end", marginRight: 20 },
                    ]}
                  >
                    <Image
                      source={require("../../../Assets/icons/ic_right_arrow.png")}
                    ></Image>
                  </View>
                </View>
              </View>

              <View
                style={{
                  height: 60,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  justifyContent: "center",
                  paddingLeft: 20,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.box1]}>
                    <Image
                      style={styles.profileMenuImage}
                      source={require("../../../Assets/icons/bell.png")}
                    ></Image>
                  </View>
                  <View style={[styles.box2]}>
                    <Text style={styles.profileMenuText}>
                      {strings.notification}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.box3,
                      { alignItems: "flex-end", marginRight: 20 },
                    ]}
                  >
                    <Switch
                      trackColor={{
                        false: color.DISABLED_GREY,
                        true: "#ca5b5ea8",
                      }}
                      thumbColor={
                        isNotiEnabled ? color.BCAE_PRIMARY : color.DISABLED_GREY
                      }
                      // ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isNotiEnabled}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  height: 60,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  justifyContent: "center",
                  paddingLeft: 20,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={onSavedLocationPressed}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View style={[styles.box1]}>
                      <Image
                        style={styles.profileMenuImage}
                        source={require("../../../Assets/icons/ic_overlay_normal.png")}
                      ></Image>
                    </View>
                    <View style={[styles.box2]}>
                      <Text style={styles.profileMenuText}>
                        {strings.saved_location}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.box3,
                        { alignItems: "flex-end", marginRight: 20 },
                      ]}
                    >
                      <Image
                        source={require("../../../Assets/icons/ic_right_arrow.png")}
                      ></Image>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  height: 60,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  justifyContent: "center",
                  paddingLeft: 20,
                }}
              >
                <TouchableOpacity activeOpacity={0.5} onPress={showWebPageFAQ}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={[styles.box1]}>
                      <Image
                        style={styles.profileMenuImage}
                        source={require("../../../Assets/icons/ic_profile_faq.png")}
                      ></Image>
                    </View>
                    <View style={[styles.box2]}>
                      <Text style={styles.profileMenuText}>FAQ</Text>
                    </View>
                    <View
                      style={[
                        styles.box3,
                        { alignItems: "flex-end", marginRight: 20 },
                      ]}
                    >
                      <Image
                        source={require("../../../Assets/icons/ic_right_arrow.png")}
                      ></Image>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  height: 60,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  justifyContent: "center",
                  paddingLeft: 20,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={onCallTD123Pressed}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View style={[styles.box1]}>
                      <Image
                        style={styles.profileMenuImage}
                        source={require("../../../Assets/icons/ic_call.png")}
                      ></Image>
                    </View>
                    <View style={[styles.box2]}>
                      <Text style={styles.profileMenuText}>TD123</Text>
                    </View>
                    <View
                      style={[
                        styles.box3,
                        { alignItems: "flex-end", marginRight: 20 },
                      ]}
                    ></View>
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  height: 60,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  justifyContent: "center",
                  paddingLeft: 20,
                }}
              >
                <TouchableOpacity activeOpacity={0.5} onPress={onMailPressed}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={[styles.box1]}>
                      <Image
                        style={styles.profileMenuImage}
                        source={require("../../../Assets/icons/ic_profile_message.png")}
                      ></Image>
                    </View>
                    <View style={[styles.box2]}>
                      <Text style={styles.profileMenuText}>
                        info@123.com.bn
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.box3,
                        { alignItems: "flex-end", marginRight: 20 },
                      ]}
                    ></View>
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  height: 60,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  justifyContent: "center",
                  paddingLeft: 20,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={showWebPageAbout}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View style={[styles.box1]}>
                      <Image
                        style={styles.profileMenuImage}
                        source={require("../../../Assets/icons/ic_profile_info.png")}
                      ></Image>
                    </View>
                    <View style={[styles.box2]}>
                      <Text style={styles.profileMenuText}>
                        {strings.about}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.box3,
                        { alignItems: "flex-end", marginRight: 20 },
                      ]}
                    >
                      <Image
                        source={require("../../../Assets/icons/ic_right_arrow.png")}
                      ></Image>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  height: 60,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  justifyContent: "center",
                  paddingLeft: 20,
                }}
              >
                <TouchableOpacity activeOpacity={0.5} onPress={onLogoutPressed}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={[styles.box1]}>
                      <Image
                        style={styles.profileMenuImage}
                        source={require("../../../Assets/icons/ic_profile_logout.png")}
                      ></Image>
                    </View>
                    <View style={[styles.box2]}>
                      <Text style={styles.profileMenuText}>
                        {strings.logout}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.box3,
                        { alignItems: "flex-end", marginRight: 20 },
                      ]}
                    ></View>
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  height: 60,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  justifyContent: "center",
                  paddingLeft: 20,
                }}
              >
                <TouchableOpacity activeOpacity={0.5} onPress={onDeletePressed}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={[styles.box1]}>
                      <Image
                        style={styles.profileMenuImage}
                        source={require("../../../Assets/icons/delete.png")}
                      ></Image>
                    </View>
                    <View style={[styles.box2]}>
                      <Text style={styles.profileMenuText}>
                        {strings.delete_account}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.box3,
                        { alignItems: "flex-end", marginRight: 20 },
                      ]}
                    ></View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {showChangePassword && (
            <View style={{ padding: 20 }}>
              <View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={onChangePasswordBackPressed}
                >
                  <View
                    style={{
                      justifyContent: "flex-start",
                      alignItems: "center",
                      flexDirection: "row",
                      marginBottom: 10,
                    }}
                  >
                    <Image
                      source={require("../../../Assets/icons/ic_left_arrow_back.png")}
                    ></Image>
                    <Text style={[styles.textBack, { marginStart: 20 }]}>
                      Back
                    </Text>
                  </View>
                </TouchableOpacity>
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
                      password == "" ||
                      oldPassword == "" ||
                      confirmPassword == ""
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
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  transparentContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "transparent",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  ProfileContainer: {
    width: "90%",
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 10,
    elevation: 3,
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    paddingBottom: 20,
    marginBottom: 0,
  },
  textView: {
    color: color.BCAE_PRIMARY,
    fontSize: fontSizes.FONT_18,
    fontWeight: "500",
  },
  box1: {
    flex: 2,
    height: 50,
    padding: 5,
    justifyContent: "center",
  },
  box2: {
    flex: 6,
    justifyContent: "center",
    height: 50,
    padding: 5,
  },
  box3: {
    flex: 2,
    justifyContent: "center",
    height: 50,
    padding: 5,
  },
  profileImage: {
    width: 55,
    height: 55,
    borderWidth: 2,
    borderRadius: 75,
  },
  editImage: {
    width: 35,
    height: 35,
    borderWidth: 2,
    borderRadius: 75,
  },
  headerBox2: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    padding: 5,
  },
  profileName: {
    color: "white",
    fontSize: 18,
  },

  profileMenuImage: {
    resizeMode: "contain",
    height: Platform.OS === "android" ? spacing.HEIGHT_25 : width / 20,
    width: Platform.OS === "android" ? spacing.HEIGHT_25 : width / 20,
  },
  profileMenuText: {
    fontSize: 14,
    color: color.CLICK_BACK_TEXT,
  },
  textBack: {
    color: color.CLICK_BACK_TEXT,
    fontSize: fontSizes.FONT_16,
    fontWeight: "500",
  },
  errorText: {
    color: color.ERROR_TEXT_RED,
    fontSize: fontSizes.FONT_14,
    fontWeight: "500",
    lineHeight: spacing.WIDTH_14,
  },
  successText: {
    color: color.BCAE_PRIMARY,
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
});
export default Header;
