import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyTicketsData,
  resetMyTicketsData,
} from "../../Redux/MyTicketsDispatcher";
import { strings } from "../../Utilities/Language/index";
import MyTicketList from "../../Components/MyTicketList";
import {
  spacing,
  fontSizes,
  color,
  buttonType,
  buttonSize,
  bottomBarHeight,
} from "../../Utilities/Constants/Constant";
import { ToggleButton } from "../../Components/ToggleButton";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { CustomActivityIndicator } from "../../Components/CustomActivityIndicator";
import { Toast } from "../../Components/Toast";
import Header from "./Component/Header";
import { saveToken } from "../../Storage/token";
import LoadingAnimation from "../../Components/LoadingAnimation";

const MyTickets = ({ route, navigation }) => {
  let profile = useSelector((state) => state.profile);
  const [myscreenmae, setscreenname] = useState("Interaction");
  let myTickets = useSelector((state) => state.myTickets);
  const [isFirstSelected, setFirstSelected] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [searchText, setSearchText] = useState("");
  const [visible, setVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    fetchMyTicketsData(setIsRefreshing(false));
  }, []);

  const dispatch = useDispatch([getMyTicketsData, resetMyTicketsData]);
  const fetchMyTicketsData = (cb = () => {}) => dispatch(getMyTicketsData(cb));
  useEffect(() => {
    fetchMyTicketsData();
  }, []);

  const handleFilterChangeAll = () => {
    setSelectedFilter("ALL");
    setVisible(false);
  };
  const handleFilterChangeEnquiry = () => {
    setSelectedFilter("REQINQ");
    setVisible(false);
  };
  const handleFilterChangeComplaint = () => {
    setSelectedFilter("REQCOMP");
    setVisible(false);
  };

  const sessionOut = () =>
    Alert.alert(strings.attention, strings.session_expired, [
      {
        text: strings.ok,
        onPress: () => {
          (async () => {
            await saveToken("");
            await dispatch(resetMyTicketsData());
          })();

          navigation.navigate("Splash", {});
        },
      },
    ]);

  const onPressFirst = () => {
    setFirstSelected(true);
    if (!myTickets?.initMytickets && !myTickets?.isMyTicketsError) {
      myTickets?.myTicketsData?.filter(
        (data) => data.currStatus != "REASSIGNED"
      );
    }
  };
  const onPressSecond = () => {
    setFirstSelected(false);
    if (!myTickets?.initMytickets && !myTickets?.isMyTicketsError) {
      myTickets?.myTicketsData?.filter(
        (data) => data.currStatus == "REASSIGNED"
      );
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
        {sessionOut()}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <Header
        navigation={navigation}
        Text={myscreenmae}
        backIconVisibility={false}
        rightIconsVisibility={true}
        bcae={true}
      ></Header>
      <View style={styles.innerContainer}>
        <View style={styles.inputBox}>
          <Image
            style={styles.searchIcon}
            source={require("../../Assets/icons/ic_search.png")}
          />
          <TextInput
            style={styles.searchInput}
            onChangeText={setSearchText}
            value={searchText}
            placeholder="Search interactions with ID"
            keyboardType="default"
            inlineImageLeft="Search"
          />
        </View>

        <View style={styles.toggleContainer}>
          <ToggleButton
            isFirstSelected={isFirstSelected}
            label={{ first: strings.opened, second: strings.resolved }}
            bgColor={{
              selected: color.BCAE_PRIMARY,
              unselected: color.BCAE_LIGHT_BLUE_2,
            }}
            textColor={{
              selected: color.WHITE,
              unselected: color.BCAE_PRIMARY,
            }}
            textPro={{
              fontSize: fontSizes.FONT_13,
              fontWeight: "600",
              lineHeight: spacing.HEIGHT_16,
            }}
            onPressFirst={onPressFirst}
            onPressSecond={onPressSecond}
          ></ToggleButton>
        </View>
        <View style={{ flexDirection: "row", width: "95%", marginTop: 20 }}>
          <View style={styles.allItemsContainerText}>
            <Text style={styles.allItems}>{strings.all_interaction}</Text>
          </View>
          <View style={styles.allItemsContainerFilter}>
            <View
              style={{
                height: "70%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Menu
                visible={visible}
                anchor={
                  <TouchableOpacity activeOpacity={0.5} onPress={showMenu}>
                    <Image
                      source={require("../../Assets/icons/ic_filter.png")}
                    />
                  </TouchableOpacity>
                }
                onRequestClose={hideMenu}
              >
                <MenuItem onPress={handleFilterChangeAll}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.ticketItemHeading}>
                      {selectedFilter != "ALL" && (
                        <Image
                          style={styles.searchIcon}
                          source={require("../../Assets/icons/ic_unselected_radio.png")}
                        />
                      )}
                      {selectedFilter == "ALL" && (
                        <Image
                          style={styles.searchIcon}
                          source={require("../../Assets/icons/ic_selected_radio.png")}
                        />
                      )}
                      <Text style={[styles.description]}> All</Text>
                    </View>
                  </View>
                </MenuItem>
                <MenuItem onPress={handleFilterChangeEnquiry}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.ticketItemHeading}>
                      {selectedFilter != "REQINQ" && (
                        <Image
                          style={styles.searchIcon}
                          source={require("../../Assets/icons/ic_unselected_radio.png")}
                        />
                      )}
                      {selectedFilter == "REQINQ" && (
                        <Image
                          style={styles.searchIcon}
                          source={require("../../Assets/icons/ic_selected_radio.png")}
                        />
                      )}
                      <Text style={[styles.description]}> Enquiry</Text>
                    </View>
                  </View>
                </MenuItem>
                <MenuItem onPress={handleFilterChangeComplaint}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.ticketItemHeading}>
                      {selectedFilter != "REQCOMP" && (
                        <Image
                          style={styles.searchIcon}
                          source={require("../../Assets/icons/ic_unselected_radio.png")}
                        />
                      )}
                      {selectedFilter == "REQCOMP" && (
                        <Image
                          style={styles.searchIcon}
                          source={require("../../Assets/icons/ic_selected_radio.png")}
                        />
                      )}
                      <Text style={[styles.description]}> Complaint</Text>
                    </View>
                  </View>
                </MenuItem>
              </Menu>
            </View>
          </View>
        </View>
        {!myTickets?.initMytickets &&
          myTickets?.isMyTicketsError &&
          myTickets?.myTicketsData?.errorCode == 401 &&
          showErrorMessage(myTickets?.myTicketsData?.message)}
        {myTickets.initMytickets && (
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

        {!myTickets?.initMytickets &&
        !myTickets?.isMyTicketsError &&
        myTickets?.myTicketsData.length > 0 ? (
          <MyTicketList
            isRefreshing={isRefreshing}
            onRefresh={onRefresh}
            ticketItemList={
              searchText.length == 0
                ? isFirstSelected
                  ? selectedFilter == "ALL"
                    ? myTickets?.myTicketsData?.filter(
                        (data) => data?.currStatus != "CLOSED"
                      )
                    : myTickets?.myTicketsData
                        ?.filter((data) => data?.currStatus != "CLOSED")
                        ?.filter((data) => data?.intxnType == selectedFilter)
                  : selectedFilter == "ALL"
                  ? myTickets?.myTicketsData?.filter(
                      (data) => data?.currStatus == "CLOSED"
                    )
                  : myTickets?.myTicketsData
                      ?.filter((data) => data?.currStatus == "CLOSED")
                      ?.filter((data) => data?.intxnType == selectedFilter)
                : isFirstSelected
                ? selectedFilter == "ALL"
                  ? myTickets?.myTicketsData
                      ?.filter((data) => data?.currStatus != "CLOSED")
                      ?.filter((data) =>
                        ("" + data?.intxnId).includes(searchText)
                      )
                  : myTickets?.myTicketsData
                      ?.filter((data) => data?.currStatus != "CLOSED")
                      ?.filter((data) => data?.intxnType == selectedFilter)
                      ?.filter((data) =>
                        ("" + data?.intxnId).includes(searchText)
                      )
                : selectedFilter == "ALL"
                ? myTickets?.myTicketsData
                    ?.filter((data) => data?.currStatus == "CLOSED")
                    ?.filter((data) =>
                      ("" + data?.intxnId).includes(searchText)
                    )
                : myTickets?.myTicketsData
                    ?.filter((data) => data?.currStatus == "CLOSED")
                    ?.filter((data) => data?.intxnType == selectedFilter)
                    ?.filter((data) =>
                      ("" + data?.intxnId).includes(searchText)
                    )
            }
          />
        ) : (
          <>
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
                  if (myTickets?.initMytickets) return null;
                  return (
                    <View
                      style={{
                        height: "70%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={styles.emptyList}>
                        {strings.empty_ticket_list}
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
            <View
              style={{
                height: "70%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {!myTickets?.initMytickets &&
                myTickets?.isMyTicketsError &&
                myTickets?.myTicketsData?.errorCode === "10001" && (
                  <Text style={styles.emptyList}>{strings.no_internet}</Text>
                )}
            </View>
          </>
        )}
        {!myTickets?.initMytickets &&
          (myTickets?.myTicketsData?.errorCode == "10000" ||
            myTickets?.myTicketsData?.errorCode == "10001") && (
            <View style={styles.toast}>
              <Toast
                bgColor={color.TOAST_RED}
                customStyle={{ paddingHorizontal: spacing.WIDTH_30 }}
                textPro={{
                  color: color.WHITE,
                  fontSize: fontSizes.FONT_14,
                  fontWeight: "700",
                }}
                img={
                  myTickets?.myTicketsData?.errorCode == "10001"
                    ? require("../../Assets/icons/ic_no_Internet.png")
                    : require("../../Assets/icons/ci_error-warning-fill.png")
                }
                message={
                  myTickets?.myTicketsData?.errorCode == "10001"
                    ? strings.no_network
                    : strings.something_went_wrong
                }
              />
            </View>
          )}
      </View>
    </SafeAreaView>
  );
};

export default MyTickets;

// styles
const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  rootContainer: {
    flex: 1,
    // marginBottom: bottomBarHeight,
    alignItems: "center",
    backgroundColor: color.WHITE,
  },
  inputBox: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    backgroundColor: "white",
    borderRadius: 3,
    margin: 5,
    borderColor: "#9FA5AA",
    borderWidth: 1,
  },
  searchInput: {
    height: 45,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 3,
    color: "#9E9E9E",
  },
  searchIcon: {
    width: spacing.WIDTH_21,
    height: spacing.WIDTH_21,
    marginLeft: 5,
    marginRight: 5,
  },
  menuIcon: {
    width: spacing.WIDTH_21,
    height: spacing.WIDTH_21,
    marginLeft: 5,
    marginRight: 5,
  },
  menuText: {},
  toggleContainer: {
    width: "95%",
    height: spacing.WIDTH_35,
    marginTop: 20,
  },
  allItemsContainerText: {
    flex: 1,
    height: 45,
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
  },
  allItemsContainerFilter: {
    flex: 1,
    height: 45,
    width: "90%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  allItems: {
    textAlign: "left",
    fontSize: 15,
    color: color.BCAE_PRIMARY,
  },
  emptyList: {
    fontSize: 20,
    color: color.BCAE_PRIMARY,
  },
  menuRow: {
    flex: 4,
    height: 50,
    padding: 5,
  },
  ticketItemHeading: {
    minWidth: "95%",
    marginVertical: 8,
    // backgroundColor: "white",
    flexDirection: "row",
  },
});
