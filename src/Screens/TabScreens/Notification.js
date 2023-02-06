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
import { CustomActivityIndicator } from "../../Components/CustomActivityIndicator";
import {
  bottomBarHeight,
  spacing,
  fontSizes,
  color,
  buttonType,
  buttonSize,
} from "../../Utilities/Constants/Constant";
import { commonStyle } from "../../Utilities/Style/commonStyle";
import { getNotificationsData } from "../../Redux/NotificationsDispatcher";
import moment from "moment";
import LoadingAnimation from "../../Components/LoadingAnimation";
// const dispatchNotifications= useDispatch([Notifications]);

var { height, width } = Dimensions.get("screen");

const Notification = ({ route, navigation }) => {
  const [myscreenmae, setscreenname] = useState("Notifications");
  const notifications = useSelector((state) => state.notifications);

  // const { fromLogin } = route.params;
  const fromLogin = true;
  const dispatch = useDispatch([getNotificationsData]);

  const fetchNotificationData = () => dispatch(getNotificationsData());

  useEffect(() => {
    fetchNotificationData();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={
          fromLogin ? styles.outerContainerFromLogin : styles.outerContainer
        }
      >
        <Header
          IsShowBell={false}
          navigation={navigation}
          Text={myscreenmae}
          backIconVisibility={true}
          rightIconsVisibility={true}
        ></Header>
        <View style={styles.innerContainer}>
          {notifications.initNotifications && (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 200,
              }}
            >
              <LoadingAnimation></LoadingAnimation>
            </View>
          )}

          {!notifications?.initNotifications &&
          !notifications?.isNotificationsError &&
          notifications?.notificationsData?.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={notifications?.notificationsData}
              ItemSeparatorComponent={() => <View style={styles.line} />}
              renderItem={({ item }) => {
                return (
                  <Pressable
                    style={{
                      width: width - spacing.WIDTH_10,
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    <View
                      style={{
                        ...commonStyle.column_center_center,
                        ...{ flex: 0.1, marginRight: spacing.WIDTH_5 },
                      }}
                    >
                      <View
                        style={{
                          ...styles.roundIcon,
                          ...{
                            backgroundColor: true
                              ? color.BCAE_PRIMARY
                              : color.DISABLED_GREY,
                          },
                        }}
                      />
                    </View>
                    <View
                      style={{
                        ...commonStyle.column_space_evenly,
                        ...{ flex: 0.7 },
                      }}
                    >
                      <Text
                        style={{
                          color: color.BLACK,
                          fontSize: fontSizes.FONT_15,
                          marginBottom: spacing.HEIGHT_3,
                        }}
                      >
                        #{item.notificationId}
                      </Text>
                      <Text
                        style={{
                          marginBottom: spacing.HEIGHT_3,
                          fontWeight: "bold",
                          fontSize: fontSizes.FONT_15,
                          color: color.BLACK,
                        }}
                      >
                        {item.body}
                      </Text>
                      <Text
                        style={{
                          // fontWeight: "bold",
                          fontSize: fontSizes.FONT_15,
                          color: color.DARK_GREY,
                        }}
                      >
                        {item.source}
                      </Text>
                    </View>
                    <View
                      style={{
                        ...commonStyle.column_start,
                        ...{ flex: 0.4, marginRight: spacing.WIDTH_5 },
                      }}
                    >
                      <Text
                        style={{
                          width: width / 4,
                        }}
                      >
                        {moment(item.createdAt).fromNow()}
                      </Text>
                    </View>
                  </Pressable>
                );
              }}
            />
          ) : (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {notifications?.initNotifications ? (
                <Text style={styles.emptyList}>{strings.please_wait}</Text>
              ) : (
                <Text style={styles.emptyList}>
                  {!notifications?.notificationsData?.errorCode === "10001"
                    ? strings.no_internet
                    : strings.empty_notification_list}
                </Text>
              )}
            </View>
          )}

          {!notifications?.initNotifications &&
            notifications?.isNotificationsError && (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.emptyList}>
                  {!notifications?.notificationsData?.errorCode === "10001"
                    ? strings.no_internet
                    : ""}
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
    marginBottom: bottomBarHeight,
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
export default Notification;
