import React from "react";
import { View, ActivityIndicator } from "react-native";
import { color, spacing, buttonSize } from "../Utilities/Constants/Constant";

export const FullPageLoder = (props) => {
  let bgColor = props.bgColor ? props.bgColor : color.TRANSPARENT;
  let loderColor = props.loderColor ? props.loderColor : color.BLACK;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: bgColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {<ActivityIndicator color={loderColor} animating={true} size="large" />}
    </View>
  );
};
