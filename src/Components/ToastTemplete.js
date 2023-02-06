import React from "react";
import { View, Text, Image } from "react-native";
import { spacing } from "../Utilities/Constants/Constant";

export const ToastTemplete = ({ bgColor, text }) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: bgColor,
        paddingLeft: spacing.WIDTH_10,
        paddingVertical: spacing.WIDTH_15,
      }}
    >
      {bgColor == "red" ? (
        <Image
          style={{ height: spacing.WIDTH_20, width: spacing.WIDTH_20 }}
          source={require("../Assets/icons/ci_error-warning-fill.png")}
        />
      ) : null}

      <Text
        style={{
          color: "white",
          fontWeight: "500",
          marginLeft: spacing.HEIGHT_10,
          overflowWrap: "break-word",
          marginRight: spacing.WIDTH_19,
        }}
      >
        {text}
      </Text>
    </View>
  );
};
