import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image,
  FlatList,
  Pressable,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import RNLocation from "react-native-location";
import { useDispatch, useSelector } from "react-redux";
import Geolocation from "@react-native-community/geolocation";

const { height } = Dimensions.get("screen");
import {
  getMyDashboardData,
  resetMyDashboardData,
} from "../../Redux/MyDashboardDispatcher";
import {
  spacing,
  fontSizes,
  color,
  buttonType,
  buttonSize,
  bottomBarHeight,
} from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language/index";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { CustomActivityIndicator } from "../../Components/CustomActivityIndicator";
import Header from "./Component/Header";
import { saveToken } from "../../Storage/token";
import Moment from "moment";
import LoadingAnimation from "../../Components/LoadingAnimation";
import { logoutUser } from "../../Redux/LogoutDispatcher";

const Dashboard = ({ route, navigation }) => {
  let mapPlotedCoordinates = [];
  let profile = useSelector((state) => state.profile);
  let dashboard = useSelector((state) => state.myDashboardData);
  const [markerSelected, setMarkerSelected] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [myscreenmae, setscreenname] = useState("Home");

  const [currentCoordinate, setCurrentCoordinate] = useState({
    latitude: 4.5353,
    longitude: 114.7277,
  });

  const [loadingMessage, setLoadingString] = useState(strings.please_wait);

  const mapRef = useRef(null);
  //onst [otpTimer, setOtpTimer] = useState(OTP_TIMER);
  //const OTP_TIMER = 3;

  const latitudeDelta = 0.025;
  const longitudeDelta = 0.025;

  const dispatch = useDispatch([
    getMyDashboardData,
    resetMyDashboardData,
    logoutUser,
  ]);
  const fetchMyDashboardData = (page) => {
    // console.log("from fetch my dashboard", page, dashboard.noData);
    dispatch(getMyDashboardData(page));
  };

  const [counter, setCounter] = useState(0);
  // useEffect(() => {
  //   //getting data form local storage
  //   setTimeout(() => {
  //     setCounter(1);
  //   }, 3000);
  // }, []);

  const noData = dashboard?.noData;

  useEffect(() => {
    //getting data form local storage
    CheckForGPSEnablement().then((data) => {
      if (data) {
        try {
          Geolocation.getCurrentPosition((info) => {
            let lat = info.coords.latitude;
            let long = info.coords.longitude;
            setCurrentCoordinate({
              latitude: lat,
              longitude: long,
            });
          });
        } catch (err) {
          console.log("error getting current location");
        }
      }
    });

    fetchMyDashboardData(0);
  }, []);

  //checking section timeout
  const [sessionPopupDisable, setSessionPopupDisable] = useState(true);

  useEffect(() => {
    if (
      !dashboard?.initMyDashboard &&
      sessionPopupDisable &&
      dashboard?.myDashboardData?.errorCode == "401"
    ) {
      setSessionPopupDisable(false);

      sessionOut();
    }
  }, [dashboard]);

  const LoadMoreRandomData = () => {
    if (!dashboard?.noData) fetchMyDashboardData(dashboard.page + 1);
  };

  const onMarkerPressed = () => {
    setMarkerSelected(true);
  };

  const animateToRegion = async () => {
    mapRef.current.animateToRegion(
      {
        latitude:
          dashboard?.myDashboardData[0]?.latitude || currentCoordinate.latitude,
        longitude:
          dashboard?.myDashboardData[0]?.longitude ||
          currentCoordinate.longitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      },
      1000
    );
  };

  const sessionOut = async () =>
    Alert.alert(strings.attention, strings.session_expired, [
      {
        text: strings.ok,
        onPress: async () => {
          dispatch(logoutUser(navigation, profile?.savedProfileData?.userId));
        },
      },
    ]);

  const CheckForGPSEnablement = () => {
    return new Promise((resolve) => {
      RNLocation.configure({
        distanceFilter: 100, // Meters
        desiredAccuracy: {
          ios: "best",
          android: "balancedPowerAccuracy",
        },
        // Android only
        androidProvider: "auto",
        interval: 5000, // Milliseconds
        fastestInterval: 10000, // Milliseconds
        maxWaitTime: 5000, // Milliseconds
        // iOS Only
        activityType: "other",
        allowsBackgroundLocationUpdates: false,
        headingFilter: 1, // Degrees
        headingOrientation: "portrait",
        pausesLocationUpdatesAutomatically: false,
        showsBackgroundLocationIndicator: false,
      })
        .then((x) => {
          console.log({ x });
          resolve(true);
        })
        .catch((err) => {
          console.log({ err });
          resolve(false);
        });
    });
  };

  const getAddressFromResponse = (data) => {
    let addressString = "";
    if (data.houseNo) {
      addressString += data.houseNo + ",";
    }
    if (data.block) {
      addressString += data.block + ",";
    }
    if (data.buildingName) {
      addressString += data.buildingName + ",";
    }
    if (data.street) {
      addressString += data.street + ",";
    }
    if (data.town) {
      addressString += data.town + ",";
    }
    if (data.city) {
      addressString += data.city + ",";
    }
    if (data.district) {
      addressString += data.district + ",";
    }
    if (data.state) {
      addressString += data.state + ",";
    }
    if (data.country) {
      addressString += data.country + ",";
    } else {
      addressString += "Brunei";
    }

    if (data.postCode) {
      addressString += " " + data.postCode;
    }
    return addressString;
  };
  const markerAddedWithRemoveDuplication = (marker) => {
    const matchedCoord = mapPlotedCoordinates.filter(
      (mark) =>
        mark.latitude == marker.latitude && mark.longitude == marker.longitude
    );
    if (matchedCoord.length === 0) {
      return (
        <View>
          <Image
            source={require("../../Assets/icons/ic_overlay_normal.png")}
            style={styles.icon}
          />
        </View>
      );
    }
  };
  const onScroll = useCallback(
    (event) => {
      const slideSize = 330;
      const index = event.nativeEvent.contentOffset.x / slideSize;
      const roundIndex = Math.round(index);
      if (mapRef) {
        mapRef?.current?.animateToRegion(
          {
            latitude: dashboard?.myDashboardData[roundIndex]?.latitude,
            longitude: dashboard?.myDashboardData[roundIndex]?.longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          },
          100
        );
      }
      setHighlightedIndex(roundIndex);
      // console.log(
      //   "event.nativeEvent.contentOffset.x : " +
      //     event.nativeEvent.contentOffset.x +
      //     "slideSize : " +
      //     slideSize +
      //     "roundIndex:",
      //   roundIndex
      // );
    },
    [dashboard]
  );
  const ListItem = ({ title, type, status, ticketNo, date, address }) => {
    function OnClickTicketItem() {}

    return (
      <Pressable
        onPress={OnClickTicketItem}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.ticketItem]}>
          <View style={{ flexDirection: "column" }}>
            <View style={styles.ticketItemHeading}>
              {type == "Master Interaction" && (
                <Text
                  numberOfLines={1}
                  style={[styles.textBase, styles.description]}
                >
                  Master Interaction
                </Text>
              )}
              {type != "Master Interaction" && (
                <Text style={[styles.textBase, styles.description]}>
                  My Interaction
                </Text>
              )}
            </View>
            <View style={{ flexDirection: "column", marginBottom: 10 }}>
              <View style={[styles.box1]}>
                <View style={{ flex: 7 }}>
                  <Text style={[styles.ticketNo]}>{ticketNo}</Text>
                </View>
                <View style={{ flex: 3, alignItems: "flex-end" }}>
                  <Text style={[styles.date]}>
                    {Moment(date).format("DD MMM")}
                  </Text>
                </View>
              </View>

              <Text numberOfLines={1} style={[styles.title]}>
                {title}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={[styles.box1loc]}>
                <Image
                  source={require("../../Assets/icons/ic_overlay_normal.png")}
                  style={styles.icon}
                />
              </View>
              <View style={[styles.box3add]}>
                <Text style={[styles.date, []]}>{address}</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };
  const loaderDom = () => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 200,
        }}
      >
        <LoadingAnimation></LoadingAnimation>
        <Text style={styles.emptyList}>{loadingMessage}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {dashboard?.initMyDashboard && loaderDom(loadingMessage)}
      {!dashboard.initMyDashboard && !dashboard?.isMyDashboardError && (
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          showsUserLocation={true}
          followsUserLocation={true}
          style={styles.map}
          onMapReady={animateToRegion}
          initialRegion={{
            latitude:
              dashboard?.myDashboardData[0]?.latitude ||
              currentCoordinate.latitude,
            longitude:
              dashboard?.myDashboardData[0]?.longitude ||
              currentCoordinate.longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          }}
        >
          {!dashboard?.initMyDashboard &&
            dashboard?.myDashboardData?.length > 0 &&
            dashboard?.myDashboardData?.map((marker, index) => {
              const dom = (
                <Marker
                  key={marker.intxnId}
                  onPress={() => onMarkerPressed(marker, index)}
                  coordinate={{
                    latitude: marker?.latitude,
                    longitude: marker?.longitude,
                  }}
                  //coordinate={{latitude: 4.931796, longitude: 114.836504}}
                  title={marker.address}
                >
                  <TouchableOpacity onPress={() => setMarkerSelected(true)}>
                    {index == highlightedIndex ? (
                      <View>
                        <Image
                          source={require("../../Assets/icons/ic_overlay_highlighted.png")}
                          style={styles.icon}
                        />
                      </View>
                    ) : (
                      markerAddedWithRemoveDuplication({
                        latitude: marker?.latitude,
                        longitude: marker?.longitude,
                      })
                    )}
                  </TouchableOpacity>

                  <Callout tooltip={true} width={210} style={styles.ticketItem}>
                    <View>
                      <Text style={[styles.textBase, styles.description]}>
                        {getAddressFromResponse(marker)}
                      </Text>
                    </View>
                  </Callout>
                </Marker>
              );

              mapPlotedCoordinates.push({
                latitude: marker?.latitude,
                longitude: marker?.longitude,
              });

              return dom;
            })}
        </MapView>
      )}
      <View>
        {(!dashboard?.initMyDashboard && dashboard?.isMyDashboardError) ||
          (!dashboard?.initMyDashboard && dashboard?.myDashboardData && (
            <Header
              navigation={navigation}
              Text={myscreenmae}
              backIconVisibility={false}
              transparent={true}
              bcae={true}
              rightIconsVisibility={true}
            ></Header>
          ))}

        {dashboard?.initMyDashboardBackground && (
          <Text>data fetched in background</Text>
        )}
      </View>
      {!dashboard?.initMyDashboard &&
        dashboard?.isMyDashboardError &&
        dashboard?.myDashboardData?.errorCode === "10001" && (
          <View style={{ alignItems: "center" }}>
            <Text style={styles.emptyList}>{strings.no_internet}</Text>
          </View>
        )}
      {!dashboard?.initMyDashboard && dashboard?.myDashboardData.length > 0 && (
        <View style={[{ height: "auto" }, styles.bottomView]}>
          <FlatList
            contentContainerStyle={{ padding: 20 }}
            horizontal
            onScroll={onScroll}
            data={dashboard?.myDashboardData}
            onEndReachedThreshold={0.5}
            onEndReached={LoadMoreRandomData}
            renderItem={({ item }, data) => {
              return (
                <ListItem
                  title={
                    item.serviceTypeDesc
                      ? item.serviceTypeDesc
                      : item.ticketTypeDesc
                  }
                  type={item.intxnType}
                  status={item.currStatusDesc}
                  ticketNo={item.intxnId}
                  date={item.createdAt}
                  address={getAddressFromResponse(item)}
                />
              );
            }}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={() => {
              if (noData) {
                return null;
              }
              return (
                <View style={{ marginBottom: spacing.HEIGHT_30 }}>
                  <ActivityIndicator size="large" />
                </View>
              );
            }}
          />
        </View>
      )}

      {!dashboard?.initMyDashboard && dashboard?.myDashboardData.length < 1 && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 120,
          }}
        >
          <Text style={[styles.textBase, styles.description]}>
            {strings.empty_ticket_list}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: bottomBarHeight,
    backgroundColor: color.WHITE,
  },
  bottomView: {
    flex: 1,
    // marginLeft: 20,
    width: "100%",
    position: "absolute",
    bottom: height / 25,
  },

  map: {
    marginTop: Platform.OS === "android" ? 50 : height / 14,
    ...StyleSheet.absoluteFillObject,
    // marginBottom: Platform.OS === "android" ? 0 : height / 5,
  },
  ticketItem: {
    width: 320,
    padding: 10,
    marginRight: 35,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "blue",
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  ticketItemHeading: {
    minWidth: "95%",
    marginVertical: 4,
    backgroundColor: "white",
    flexDirection: "row",
  },
  textBase: {
    color: color.BCAE_PRIMARY,
  },
  description: {
    fontSize: 20,
    fontWeight: "400",
  },
  ticketNo: {
    fontSize: 16,
    fontWeight: "500",
    color: "#090A0A",
  },
  title: {
    fontSize: 14,
    fontWeight: "400",
    color: "#375B9E",
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
    flexDirection: "row",
  },
  box3: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    height: 50,
  },
  box1loc: {
    height: 50,
  },
  box3add: {
    flex: 4,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    height: 50,
  },
  date: {
    fontSize: 14,
    fontWeight: "400",
    color: "#7D7D7D",
  },
  searchIcon: {
    width: spacing.WIDTH_21,
    height: spacing.WIDTH_21,
  },
  rightArrow: {
    alignItems: "center",
    justifyContent: "center",
  },
  emptyList: {
    fontSize: 20,
    color: color.BCAE_PRIMARY,
  },
  icon: {
    width: 30,
    height: 35,
  },
});
export default Dashboard;
