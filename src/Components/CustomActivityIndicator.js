import React from "react";
import { View, ActivityIndicator } from "react-native";
import { color, spacing, buttonSize } from "../Utilities/Constants/Constant";

export const CustomActivityIndicator = (props) => {
  let size = props.size ?? buttonSize.FLEXI;
  let bgColor = props.bgColor ? props.bgColor : color.TRANSPARENT;
  let loderColor = props.loderColor ? props.loderColor : color.BLACK;
  let width = size === buttonSize.LARGE ? { width: "100%" } : {};
  let customStyle = props.customStyle ?? {};
  let topMargin = props.topMargin ? props.topMargin : 0;

  return (
    <View style={{ flexDirection: "row" }}>
      <View
        style={{
          marginTop: topMargin,
          backgroundColor: bgColor,
          borderRadius: spacing.HEIGHT_3,
          justifyContent: "center",
          alignItems: "center",
          height:
            size === buttonSize.SMALL ? spacing.HEIGHT_30 : spacing.HEIGHT_47,
          ...width,
          ...customStyle,
        }}
      >
        {
          <ActivityIndicator
            color={loderColor}
            animating={true}
            size="small"
            style={{ alignSelf: "center", height: 50, width: 50 }}
          />
        }
      </View>
    </View>
  );
};
