import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "@timwangdev/react-native-geocoder";
import Header from "../TabScreens/Component/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const Location = ({ navigation, props }) => {
  const [address, setPinAddress] = useState("You are here");
  const [cordinate, setCordinate] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  const mapRef = useRef(null);
  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  const getLocation = (posMap) => {
    const obj = {
      lat: posMap.latitude,
      lng: posMap.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    };

    //setCordinate(posMap);

    // mapRef?.current?.animateToRegion(obj,500);

    Geocoder.geocodePosition(obj).then((res) => {
      console.log(
        "res====>" + res + "---" + posMap.latitude + "===" + posMap.longitude
      );
      var myAddress = res["0"].formattedAddress;
      var countryCode = res["0"].countryCode;
      console.log("res====>" + myAddress + "----" + countryCode);
      setPinAddress(myAddress);

      Geocoder.geocodeAddress(myAddress).then((res) => {
        console.log("address====>" + JSON.stringify(res));
      });
    });
  };

  const getLocationOnPress = (posMap) => {
    const obj = {
      lat: posMap.latitude,
      lng: posMap.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    };

    setCordinate(posMap);
    mapRef?.current?.animateToRegion(obj, 500);

    Geocoder.geocodePosition(obj).then((res) => {
      console.log(
        "res====>" + res + "---" + posMap.latitude + "===" + posMap.longitude
      );
      var myAddress = res["0"].formattedAddress;
      var countryCode = res["0"].countryCode;
      console.log("res====>" + myAddress + "----" + countryCode);
      setPinAddress(myAddress);
    });
  };

  useEffect(() => {
    Geolocation.getCurrentPosition((posMap) => {
      const crd = posMap.coords;
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });

      setCordinate({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
      let obj = {
        lat: crd.latitude,
        lng: crd.longitude,
      };
      Geocoder.geocodePosition(obj).then((res) => {
        console.log(
          "res====>" + res + "---" + crd.latitude + "===" + crd.longitude
        );
        var myAddress = res["0"].formattedAddress;
        var countryCode = res["0"].countryCode;
        console.log("res====>" + myAddress + "----" + countryCode);
        setPinAddress(myAddress);
      });
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header
          Text={"Select Address"}
          navigation={navigation}
          backIconVisibility={true}
        ></Header>
        <MapView
          style={[styles.map, { marginTop: 50 }]}
          ref={mapRef}
          initialRegion={position}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          showsCompass={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          //onRegionChangeComplete={(region) => setRegion(region)}
          onPress={(e) => getLocationOnPress(e.nativeEvent.coordinate)}
          rotateEnabled={true}
        >
          <Marker
            //draggable
            coordinate={cordinate}
            //    onDragEnd={(e) => {console.log("e.nativeEvent.coordinate ==="+e.nativeEvent.coordinate )
            //    getLocation(e.nativeEvent.coordinate)}}
            onCalloutPress={() => {
              console.log("e.nativeEvent.coordinate ===" + address);
            }}
            //onDragEnd={(e) => {setPosition({ x:e.nativeEvent.coordinate })}}
            //title= {address}
            //  description='This is a description'
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 250,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "black",
                  padding: 5,
                  width: 250,
                  backgroundColor: "white",
                  borderRadius: 10,
                }}
              >
                {address}
              </Text>

              <Image
                source={require("../../Assets/icons/ic_overlay_highlighted.png")}
                style={styles.icon}
              />
            </View>
          </Marker>
        </MapView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Location;
