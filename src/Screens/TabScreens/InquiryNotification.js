import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { strings } from "../../Utilities/Language/index";
import Header from "./Component/Header";
import {
  bottomBarHeight,
  spacing,
  fontSizes,
  color,
  buttonType,
  buttonSize,
} from "../../Utilities/Constants/Constant";
import { commonStyle } from "../../Utilities/Style/commonStyle";
import { getInquiryNotificationsData } from "../../Redux/InquiryNotificationsDispatcher";
import moment from "moment";
import LoadingAnimation from "../../Components/LoadingAnimation";

var { height, width } = Dimensions.get("screen");

const InquiryNotification = ({ route, navigation }) => {
  const [myscreenmae, setscreenname] = useState("Info");
  const inquiryNotifications = useSelector(
    (state) => state.inquiryNotifications
  );

  const { ouId, serviceType, problemCode, deptId } = route.params;
  const dispatch = useDispatch([getInquiryNotificationsData]);
  console.log(
    "fetchInquiryNotificationData=====>" +
      ouId +
      "," +
      serviceType +
      "," +
      problemCode +
      "," +
      deptId
  );
  const fetchInquiryNotificationData = () =>
    dispatch(
      getInquiryNotificationsData(ouId, serviceType, problemCode, deptId)
    );
  useEffect(() => {
    fetchInquiryNotificationData(ouId, serviceType, problemCode, deptId);
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={styles.outerContainer}>
        <Header
          IsShowBell={false}
          navigation={navigation}
          Text={myscreenmae}
          backIconVisibility={true}
          rightIconsVisibility={true}
        ></Header>
        <View style={styles.innerContainer}>
          {inquiryNotifications.initInquiryNotifications && (
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

          {!inquiryNotifications?.initInquiryNotifications &&
            !inquiryNotifications?.isInquiryNotificationsError &&
            inquiryNotifications?.inquiryNotificationsData?.length > 0 && (
              <>
                <Text>{inquiryNotifications?.inquiryNotificationsData}</Text>
                <Text>==========XXX==========</Text>
              </>
            )}

          {!inquiryNotifications?.initInquiryNotifications &&
            !inquiryNotifications?.isInquiryNotificationsError &&
            inquiryNotifications?.inquiryNotificationsData?.length == 0 && (
              <>
                <Text>{strings.no_info}</Text>
                <Text>==========XXX==========</Text>
              </>
            )}

          {!inquiryNotifications?.initInquiryNotifications &&
            inquiryNotifications?.isInquiryNotificationsError && (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.emptyList}>
                  {!inquiryNotifications?.inquiryNotificationsData
                    ?.errorCode === "10001"
                    ? strings.no_internet
                    : strings.empty_notification_list}
                </Text>
              </View>
            )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  roundIcon: {
    width: spacing.WIDTH_8,
    height: spacing.WIDTH_8,
    borderRadius: spacing.WIDTH_8,
  },
  line: {
    marginVertical: spacing.HEIGHT_20,
    marginLeft: spacing.WIDTH_40,
    width: width - spacing.WIDTH_40,
    height: 0.5,
    backgroundColor: color.DISABLED_GREY,
  },
  outerContainer: {
    flex: 1,
    backgroundColor: color.WHITE,
    alignItems: "center",
  },
  outerContainerFromLogin: {
    flex: 1,
    marginBottom: 0,
    backgroundColor: color.WHITE,
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    width: "100%",
    backgroundColor: color.WHITE,
    alignItems: "center",
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
export default InquiryNotification;
