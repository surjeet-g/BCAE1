import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { color, fontSizes } from "../../../Utilities/Constants/Constant";

const Header = (props) => {
  const saveProfile = () => {
    props.submit();
  };
  return (
    <View
      style={{
        height: 50,
        backgroundColor: color.BCAE_PRIMARY,
      }}
    >
      <View
        style={
          props.transparent ? styles.transparentContainer : styles.container
        }
      >
        <View style={{ flexDirection: "row" }}>
          <View style={[styles.box1]}>
            <Pressable onPress={() => props.navigation.goBack()}>
              {props.backIconVisibility && (
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: "white",
                    transform: [{ rotate: "90deg" }],
                  }}
                  source={require("../../../Assets/icons/dropdown.png")}
                ></Image>
              )}
            </Pressable>
          </View>
          <View style={[styles.headerBox2]}>
            <Text style={styles.textView}>{props.Text}</Text>
          </View>
          <View style={[styles.box3]}>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <TouchableOpacity activeOpacity={0.5} onPress={saveProfile}>
                <Text style={styles.textView}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    backgroundColor: color.BCAE_PRIMARY,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  transparentContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "transparent",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  ProfileContainer: {
    width: "90%",
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 10,
    elevation: 3,
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    paddingBottom: 20,
    marginBottom: 0,
  },
  textView: {
    color: "white",
    fontSize: fontSizes.FONT_18,
    fontWeight: "500",
  },
  box1: {
    flex: 2,
    height: 50,
    padding: 5,
    justifyContent: "center",
  },
  box2: {
    flex: 6,
    justifyContent: "center",
    height: 50,
    padding: 5,
  },
  box3: {
    flex: 2,
    justifyContent: "center",
    height: 50,
    padding: 5,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderWidth: 2,
    borderRadius: 75,
  },
  editImage: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 75,
    marginBottom: -20,
  },
  headerBox2: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    padding: 5,
  },
  profileName: {
    color: "white",
    fontSize: 18,
  },
  profileMenuImage: {
    width: 25,
    height: 25,
  },
  profileMenuText: {
    fontSize: 16,
    color: "#090A0A",
  },
});
export default Header;
