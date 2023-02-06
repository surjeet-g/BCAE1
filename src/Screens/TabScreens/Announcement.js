import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { strings } from "../../Utilities/Language/index";
import Header from "./Component/Header";
import { getAnnouncementsData } from "../../Redux/AnnouncementDispatcher";
import { CustomActivityIndicator } from "../../Components/CustomActivityIndicator";
import {
  bottomBarHeight,
  spacing,
  fontSizes,
  color,
  buttonType,
  buttonSize,
} from "../../Utilities/Constants/Constant";
import AnnouncementList from "../../Components/AnnouncementList";
import LoadingAnimation from "../../Components/LoadingAnimation";

const Announcement = ({ route, navigation }) => {
  const [myscreenmae, setscreenname] = useState("Announcement");
  let announcements = useSelector((state) => state.announcements);
  // const { fromLogin } = route.params;
  // const { fromLogin } = route.params;
  const fromLogin = false;
  const dispatch = useDispatch([getAnnouncementsData]);
  const fetchAnnouncementsData = async () => {
    console.log("first hit");
    await dispatch(getAnnouncementsData(navigation, ""));
    console.log("second hit");
  };
  useEffect(() => {
    fetchAnnouncementsData();
  }, []);
  return (
    <SafeAreaView
      style={fromLogin ? styles.outerContainerFromLogin : styles.outerContainer}
    >
      <Header
        navigation={navigation}
        Text={myscreenmae}
        backIconVisibility={fromLogin}
        rightIconsVisibility={!fromLogin}
        bcae={fromLogin ? false : true}
      ></Header>
      <View style={styles.innerContainer}>
        {announcements.initAnnouncements && (
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

        {!announcements?.initAnnouncements &&
        !announcements?.isAnnouncementsError &&
        announcements?.announcementsData?.length > 0 ? (
          <View>
            <AnnouncementList
              announcementItemList={announcements?.announcementsData}
            ></AnnouncementList>
          </View>
        ) : (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            {announcements?.initAnnouncements ? (
              <Text style={styles.emptyList}>{strings.please_wait}</Text>
            ) : (
              <Text style={styles.emptyList}>
                {announcements?.announcementsData?.errorCode === "10001"
                  ? strings.no_internet
                  : strings.empty_announcement_list}
              </Text>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
export default Announcement;
