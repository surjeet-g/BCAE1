import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  spacing,
  fontSizes,
  color,
  buttonType,
  buttonSize,
} from "../Utilities/Constants/Constant";
import { useDispatch, useSelector } from "react-redux";
import { deleteSavedLocation } from "../Redux/SavedLocationDispatcher";
import { strings } from "../Utilities/Language";

function AttachmentItems({ item, onDeleteClicked }) {
  const navigation = useNavigation();

  function onPressedSavedLocation() {
    //navigation.navigate('ManageExpense', {
    // expenseId: id
    //});
    // navigation.navigate('MyTicketDetails', {ticketNo:ticketNo, intxnId:intxnId, intxnType:intxnType})
  }

  return (
    <Pressable
      onPress={onPressedSavedLocation}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={{ paddingTop: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 4, justifyContent: "center" }}>
            <Text style={[styles.status]}>{item.fileName}</Text>
          </View>
          <View
            style={{
              flex: 2,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              color: color.BLACK,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => onDeleteClicked(item.fileName)}
            >
              <Image
                style={[styles.rightArrow, styles.searchIcon]}
                source={require("../Assets/icons/ic_delete_red.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const AttachmentList = ({ attachmentList, onDeleteClicked }) => (
  <View style={{ marginTop: 20 }}>
    {attachmentList?.length > 0 ? (
      <FlatList
        contentContainerStyle={{
          paddingBottom: 20,
          paddingLeft: 2,
          paddingRight: 2,
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={attachmentList}
        key={attachmentList.fileName}
        renderItem={({ item }) => (
          <AttachmentItems item={item} onDeleteClicked={onDeleteClicked} />
        )}
      />
    ) : (
      <View style={{ alignItems: "center" }}>
        <Text
          style={{ marginTop: 10, fontSize: 14, color: color.BCAE_PRIMARY }}
        >
          Attachment list is empty !!
        </Text>
      </View>
    )}
  </View>
);

export default AttachmentList;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  ticketItem: {
    marginVertical: 8,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "blue",
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    minWidth: "90%",
  },
  ticketItemHeading: {
    minWidth: "95%",
    marginVertical: 2,
    backgroundColor: "white",
    flexDirection: "row",
  },
  textBase: {
    color: color.BCAE_PRIMARY,
  },
  description: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
  },
  status: {
    fontSize: 8,
    fontWeight: "400",
    color: color.BLACK,
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
    width: spacing.WIDTH_22,
    height: spacing.WIDTH_22,
  },
  rightArrow: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
