import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  spacing,
  fontSizes,
  color,
  buttonType,
  buttonSize,
} from "../Utilities/Constants/Constant";
import Moment from "moment";
import { commonStyle } from "../Utilities/Style/commonStyle";
// import { Hoverable, Pressable, } from 'react-native-web-hover'

function AnnouncementItem({ title, date, description }) {
  const navigation = useNavigation();
  const [toggleImage, setToggle] = useState(false);
  function OnClickAnnouncementItem() {
    // navigation.navigate('MyTicketDetails', {ticketNo:ticketNo, intxnId:intxnId, intxnType:intxnType})
  }

  return (
    <Pressable
      onPress={OnClickAnnouncementItem}
      style={({ pressed }) => pressed && styles.pressed}
      onPressIn={() => setToggle(true)}
      onPressOut={() => setToggle(false)}
    >
      <View style={[styles.ticketItem]}>
        <View
          style={[
            commonStyle.column_start_start,
            { flex: 0.15, marginTop: spacing.HEIGHT_7 },
          ]}
        >
          <Image
            style={styles.searchIcon}
            source={
              toggleImage
                ? require("../Assets/icons/announcement_login.png")
                : require("../Assets/icons/ic_announcement.png")
            }
          />
        </View>
        <View style={[commonStyle.column_start, { flex: 0.85 }]}>
          <Text numberOfLines={2} style={[styles.textBase, styles.description]}>
            {title}
          </Text>
          <Text style={[styles.status]}>{Moment(date).fromNow()}</Text>
          <Text style={[styles.requestText]} numberOfLines={3}>
            {description}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const AnnouncementList = ({ announcementItemList }) => (
  <View>
    {announcementItemList?.length > 0 ? (
      <FlatList
        contentContainerStyle={{
          paddingBottom: 40,
          paddingLeft: 2,
          paddingRight: 2,
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={announcementItemList}
        renderItem={({ item }) => (
          <AnnouncementItem
            title={item.announName}
            date={item.createdAt}
            description={item.announMsg}
          />
        )}
      />
    ) : (
      <View>
        <Text style={{ fontSize: 25, color: color.BCAE_PRIMARY }}>
          {" "}
          Announcement list is empty !!
        </Text>
      </View>
    )}
  </View>
);

export default AnnouncementList;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  ticketItem: {
    padding: 10,
    marginVertical: spacing.WIDTH_4,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "blue",
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    minWidth: "100%",
  },
  ticketItemHeading: {
    minWidth: "95%",
    marginVertical: 8,
    backgroundColor: "white",
    flexDirection: "row",
  },
  textBase: {
    color: color.BCAE_PRIMARY,
  },
  description: {
    fontSize: 16,
    // marginLeft: 10,
    fontWeight: "bold",
  },
  status: {
    marginBottom: 5,
    fontSize: 12,
    fontWeight: "400",
    color: "#9E9E9E",
  },
  requestText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#292D32",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  box1: {
    flex: 1,
    padding: 5,
  },
  box2: {
    flex: 4,
    height: 50,
    padding: 5,
  },
  box3: {
    flex: 1,
    justifyContent: "center",
    height: 50,
  },
  amount: {
    color: "pink",
    fontWeight: "bold",
  },
  searchIcon: {
    width: spacing.WIDTH_25,
    height: spacing.WIDTH_25,
  },
  rightArrow: {
    alignItems: "center",
    justifyContent: "center",
  },
});
