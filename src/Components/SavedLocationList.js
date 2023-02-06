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

function SavedLocationItem({ item, onDeleteClicked, onItemClicked }) {
  let savedLocation = useSelector((state) => state.savedLocations);
  const dispatch = useDispatch([deleteSavedLocation]);

  const navigation = useNavigation();

  const getAddressString = (data) => {
    let addressString = "";

    if (data?.hno) addressString += data?.hno + ",";
    if (data?.block) addressString += data?.block + ",";
    if (data?.buildingName) addressString += data?.buildingName + ",";
    if (data?.street) addressString += data?.street + ",";
    if (data?.road) addressString += data?.road + ",";
    if (data?.city) addressString += data?.city + ",";
    if (data?.town) addressString += data?.town + ",";
    if (data?.state) addressString += data?.state + ",";
    if (data?.district) addressString += data?.district + ",";
    if (data?.country) addressString += data?.country + ",";
    if (data?.postCode) addressString += data?.postCode;

    return addressString;
  };

  function onPressedSavedLocation() {
    //navigation.navigate('ManageExpense', {
    // expenseId: id
    //});
    // navigation.navigate('MyTicketDetails', {ticketNo:ticketNo, intxnId:intxnId, intxnType:intxnType})
  }

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() =>
        onItemClicked(
          item.custFavAddrId,
          getAddressString(item),
          item.latitude,
          item.longitude,
          item.street,
          item.state,
          item.district,
          item.postCode
        )
      }
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={{ padding: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Image
              style={styles.rightArrow}
              source={require("../Assets/icons/ic_overlay_normal.png")}
            />
          </View>
          <View style={{ flex: 4, justifyContent: "center" }}>
            <Text style={[styles.status]}>{getAddressString(item)}</Text>
          </View>
          <View
            style={{
              flex: 2,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              color: color.BLACK,
            }}
          >
            {/* <Image
              style={[
                styles.rightArrow,
                styles.searchIcon,
                { marginRight: 20 },
              ]}
              source={require("../Assets/icons/ic_edit_nav.png")}
            /> */}

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                onDeleteClicked(item.custFavAddrId, getAddressString(item))
              }
            >
              <Image
                style={[styles.rightArrow, styles.searchIcon]}
                source={require("../Assets/icons/ic_delete_red.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const SavedLocationList = ({
  savedLocationList,
  onDeleteClicked,
  onItemClicked,
}) => (
  <View>
    {savedLocationList?.length > 0 ? (
      <FlatList
        contentContainerStyle={{
          paddingBottom: 20,
          paddingLeft: 2,
          paddingRight: 2,
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={savedLocationList}
        key={savedLocationList.custFavAddrId}
        renderItem={({ item }) => (
          <SavedLocationItem
            item={item}
            onDeleteClicked={onDeleteClicked}
            onItemClicked={onItemClicked}
          />
        )}
      />
    ) : (
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 25, color: color.BCAE_PRIMARY }}>
          Saved Location list is empty !!
        </Text>
      </View>
    )}
  </View>
);

export default SavedLocationList;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  ticketItem: {
    padding: 10,
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
    marginVertical: 8,
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
    fontSize: 16,
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
