import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  Pressable,
  Platform,
  Dimensions,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  spacing,
  fontSizes,
  color,
  buttonType,
  buttonSize,
} from "../Utilities/Constants/Constant";
import { strings } from "../Utilities/Language";
const { height, width } = Dimensions.get("screen");
import Moment from "moment";
function MyTicketItem({
  title,
  type,
  status,
  created,
  ticketNo,
  intxnId,
  intxnType,
}) {
  const navigation = useNavigation();

  function OnClickTicketItem() {
    //navigation.navigate('ManageExpense', {
    // expenseId: id
    //});
    navigation.navigate("MyTicketDetails", {
      ticketNo: ticketNo,
      intxnId: intxnId,
      intxnType: intxnType,
    });
  }

  return (
    <Pressable
      onPress={OnClickTicketItem}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={[styles.ticketItem]}>
        <View style={{ flexDirection: "column" }}>
          <View style={styles.ticketItemHeading}>
            <View style={{ flex: 1 }}>
              {type === "REQINQ" && (
                <Image
                  style={styles.searchIcon}
                  source={require("../Assets/icons/ic_enquiry.png")}
                />
              )}
              {type === "REQCOMP" && (
                <Image
                  style={styles.searchIcon}
                  source={require("../Assets/icons/ic_request.png")}
                />
              )}
            </View>
            <View style={{ flex: 9 }}>
              <Text
                numberOfLines={1}
                style={[styles.textBase, styles.description]}
              >
                {title}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.box1]}>
              {type === "REQINQ" && (
                <Text style={[styles.status]}>Enquiry No</Text>
              )}
              {type === "REQCOMP" && (
                <Text style={[styles.status]}>Request No</Text>
              )}
              <Text style={[styles.requestText]}>{intxnId}</Text>
            </View>
            <View style={[styles.box2]}>
              <Text style={[styles.status]}>Status</Text>
              <Text style={[styles.requestText]}>{status}</Text>
            </View>
            <View style={[styles.box2]}>
              <Text style={[styles.status]}>Created</Text>
              <Text style={[styles.requestText]}>
                {Moment(created).fromNow()}
              </Text>
            </View>
            <View style={[styles.box3]}>
              <Image
                style={styles.rightArrow}
                source={require("../Assets/icons/ic_right_arrow.png")}
              />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const MyTicketList = ({
  ticketItemList,
  onEndReached,
  ListFooterComponent,
  isRefreshing,
  onRefresh,
}) => (
  <View
    style={{
      marginBottom: spacing.HEIGHT_20 * 10,
    }}
  >
    {ticketItemList?.length > 0 ? (
      <FlatList
        refreshControl={
          <RefreshControl
            colors={["#9Bd35A", "#689F38"]}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
        ListFooterComponent={ListFooterComponent}
        onEndReached={onEndReached}
        contentContainerStyle={{
          paddingBottom: 20,
          paddingLeft: 2,
          paddingRight: 2,
          // marginBottom: spacing.HEIGHT_29 * 10,
        }}
        // style={{ marginBottom: spacing.HEIGHT_29 * 3 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={ticketItemList}
        renderItem={({ item }) => (
          <MyTicketItem
            title={
              item.serviceTypeDesc ? item.serviceTypeDesc : item.ticketTypeDesc
            }
            type={item.intxnType}
            status={item.currStatusDesc}
            created={item.createdAt}
            ticketNo={item.prodType}
            intxnId={item.intxnId}
            intxnType={item.intxnType}
          />
        )}
      />
    ) : (
      <View style={{ height: 200 }}>
        <FlatList
          contentContainerStyle={{
            marginTop: 12,
            // backgroundColor: "red",
            flex: 1,
          }}
          style={{
            height: 300,
          }}
          ListEmptyComponent={({ item }) => {
            return (
              <View>
                <Text style={{ fontSize: 20, color: color.BCAE_PRIMARY }}>
                  {strings.empty_interactions}
                </Text>
              </View>
            );
          }}
          data={[]}
          refreshControl={
            <RefreshControl
              colors={["#9Bd35A", "#689F38"]}
              refreshing={isRefreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </View>
    )}
  </View>
);

export default MyTicketList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    minWidth: "95%",
  },
  ticketItemHeading: {
    minWidth: "95%",
    marginVertical: 5,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },
  textBase: {
    color: color.BLACK,
  },
  description: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
  },
  status: {
    fontSize: 10,
  },
  requestText: {
    fontSize: 14,
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
    flex: 4,
    height: 50,
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
    resizeMode: "contain",
    tintColor: color.BCAE_PRIMARY,
    width: Platform.OS === "android" ? spacing.WIDTH_21 : width / 17,
    height: Platform.OS === "android" ? spacing.WIDTH_21 : width / 17,
  },
  rightArrow: {
    alignItems: "center",
    justifyContent: "center",
  },
});
