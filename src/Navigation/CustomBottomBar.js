import React, { useState } from "react";
import { StyleSheet, View, Image, Text, Pressable, Modal } from "react-native";
import { Button } from "../Components/Button";
import {
  spacing,
  fontSizes,
  color,
  buttonSize,
  bottomBarHeight,
} from "../Utilities/Constants/Constant";
import { strings } from "../Utilities/Language";
import { useDispatch, useSelector } from "react-redux";

const CustomBottomBar = ({ state, descriptors, navigation }) => {
  let profile = useSelector((state) => state.profile);
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(!modal);
  };

  const onNavClick = (val) => {
    setModal(false);
    console.log("val===>" + val);
    if (val === "Home") {
      navigation.navigate("Dashboard", {});
    } else if (val === "Interactions") {
      navigation.navigate("MyTicketsStack", {});
    } else if (val === "Announcement") {
      navigation.navigate("Announcement", {});
    } else if (val === "Chat") {
      navigation.navigate("Chat", {
        contactNo: profile.savedProfileData.contactNo,
      });
    }
  };

  const onNavClickButton = (val) => {
    setModal(false);
    if (val === "Enquiry") {
      navigation.navigate("CreateEnquiry", { refresh: true });
    } else if (val === "Complaint") {
      navigation.navigate("CreateComplaint", { refresh: true });
    }
  };
  return (
    <Pressable
      onPress={() => setModal(false)}
      style={{
        height: modal ? "100%" : bottomBarHeight,
        position: "absolute",
        justifyContent: "flex-end",
        left: 0,
        bottom: 0,
        right: 0,
        width: "100%",
        backgroundColor: "transparent",
      }}
    >
      {modal && (
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => onNavClickButton("Complaint")}
            style={styles.button}
          >
            <Text style={styles.buttontext}>{strings.complaint}</Text>
          </Pressable>
          <Pressable
            onPress={() => onNavClickButton("Enquiry")}
            style={styles.button}
          >
            <Text style={styles.buttontext}>{strings.inquiry}</Text>
          </Pressable>
        </View>
      )}

      <View style={styles.bottomcontainer}>
        <Pressable
          onPress={() => onNavClick("Home")}
          style={{
            marginTop: spacing.HEIGHT_2,
            marginBottom: spacing.HEIGHT_2,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "20%",
          }}
        >
          <Image
            style={state.index === 0 ? styles.selectedLogo : styles.upperLogo}
            source={require("../Assets/icons/home.png")}
          />
          <Text
            style={state.index === 0 ? styles.selectedText : styles.upperText}
          >
            {strings.home}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onNavClick("Interactions")}
          style={{
            marginTop: spacing.HEIGHT_2,
            marginBottom: spacing.HEIGHT_2,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "20%",
          }}
        >
          <Image
            style={state.index === 1 ? styles.selectedLogo : styles.upperLogo}
            source={require("../Assets/icons/myticket.png")}
          />
          <Text
            style={state.index === 1 ? styles.selectedText : styles.upperText}
          >
            {strings.interaction}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => openModal()}
          style={{
            marginTop: spacing.HEIGHT_2,
            marginBottom: spacing.HEIGHT_2,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "20%",
          }}
        >
          <Image
            style={styles.addLogo}
            source={require("../Assets/icons/ic_more.png")}
          />
          {/* <Text style={styles.upperText}>{strings.announcement}</Text> */}
        </Pressable>

        <Pressable
          onPress={() => onNavClick("Announcement")}
          style={{
            marginTop: spacing.HEIGHT_2,
            marginBottom: spacing.HEIGHT_2,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "20%",
          }}
        >
          <Image
            style={state.index === 3 ? styles.selectedLogo : styles.upperLogo}
            source={require("../Assets/icons/announcement.png")}
          />
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={state.index === 3 ? styles.selectedText : styles.upperText}
          >
            {strings.announcement}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onNavClick("Chat")}
          style={{
            marginTop: spacing.HEIGHT_2,
            marginBottom: spacing.HEIGHT_2,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "20%",
          }}
        >
          <Image
            style={state.index === 4 ? styles.selectedLogo : styles.upperLogo}
            source={require("../Assets/icons/chat.png")}
          />
          <Text
            style={state.index === 4 ? styles.selectedText : styles.upperText}
          >
            {strings.chat}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    width: "100%",
    padding: 10,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  bottomcontainer: {
    height: 50,
    width: "100%",
    backgroundColor: color.WHITE,
    flexDirection: "row",
  },
  upperText: {
    color: color.PLACEHOLDER,
    fontSize: fontSizes.FONT_10,
    fontWeight: "500",
    marginTop: 5,
    lineHeight: spacing.WIDTH_14,
  },
  upperLogo: {
    width: spacing.WIDTH_20,
    height: spacing.WIDTH_20,
  },
  selectedText: {
    color: color.BCAE_PRIMARY,
    fontSize: fontSizes.FONT_10,
    fontWeight: "500",
    marginTop: 5,
    lineHeight: spacing.WIDTH_14,
  },
  selectedLogo: {
    tintColor: color.BCAE_PRIMARY,
    width: spacing.WIDTH_20,
    height: spacing.WIDTH_20,
  },
  addLogo: {
    width: spacing.WIDTH_30,
    height: spacing.WIDTH_30,
  },
  button: {
    width: 100,
    height: spacing.WIDTH_35,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "500",
    borderRadius: 15,
    backgroundColor: color.BCAE_PRIMARY,
  },
  buttontext: {
    fontSize: 14,
    color: color.WHITE,
  },
});

export default CustomBottomBar;
