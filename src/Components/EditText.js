import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  Platform,
} from "react-native";
import { color, spacing, fontSizes } from "../Utilities/Constants/Constant";

export const EditText = (props) => {
  let customStyle = props.customStyle ?? {};
  return (
    <View style={{ marginTop: 10 }}>
      <View>
        <Text style={styles.placeHolderText}>
          {props.value != "" ? props.placeHolder : " "}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        {props.isClose ? (
          <Pressable
            style={{ position: "absolute", right: spacing.WIDTH_5, zIndex: 1 }}
            onPress={() => props.clearText()}
          >
            <Image
              source={require("../Assets/icons/ic_close.png")}
              style={{ width: spacing.WIDTH_16, height: spacing.WIDTH_16 }}
            />
          </Pressable>
        ) : null}
        {props.isHideShow ? (
          <Pressable
            style={{
              position: "absolute",
              right: spacing.WIDTH_5,
              zIndex: 1,
              marginTop: spacing.HEIGHT_5,
            }}
            onPress={() => props.hideShowClick()}
          >
            <Image
              source={
                props.secureTextEntry
                  ? require("../Assets/icons/ic_password_show.png")
                  : require("../Assets/icons/ic_password_hide.png")
              }
              style={{ width: spacing.WIDTH_24, height: spacing.WIDTH_24 }}
            />
          </Pressable>
        ) : null}

        {props.isLocation ? (
          <Pressable
            style={{
              position: "absolute",
              right: spacing.WIDTH_5,
              zIndex: 1,
              marginTop: spacing.HEIGHT_10,
            }}
            onPress={() => props.locationIconClick()}
          >
            <Image
              source={require("../Assets/icons/map.png")}
              style={{ width: spacing.WIDTH_24, height: spacing.WIDTH_24 }}
            />
          </Pressable>
        ) : null}
        {/* //{console.log("editable===>"+props?.editable)} */}
        <TextInput
          returnKeyType="done"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={props.placeHolder}
          secureTextEntry={
            props.secureTextEntry ? props.secureTextEntry : false
          }
          onChangeText={(text) => props.onChangeText(text)}
          style={[
            { ...styles.textInput, ...customStyle },
            { height: props?.multiline ? 35 * props?.lines : 45 },
          ]}
          keyboardType={props.keyboardType ? props.keyboardType : "default"}
          value={props.value}
          onSubmitEditing={() =>
            props.onSubmitEditing ? props.onSubmitEditing : null
          }
          multiline={props?.multiline ? true : false}
          numberOfLines={props?.lines ? props?.lines : 1}
          editable={!props?.editable ? props?.editable : true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  placeHolderText: {
    color: color.PLACEHOLDER,
    fontSize: fontSizes.FONT_12,
    fontWeight: "500",
  },
  textInput: {
    width: "100%",
    borderBottomColor: color.INPUT_TEXT_BORDER,
    borderBottomWidth: 0.8,
    color: color.BCAE_PRIMARY,
    fontSize: fontSizes.FONT_14,
    fontWeight: "500",
    paddingRight: 35,
  },
});
