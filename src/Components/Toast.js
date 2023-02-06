import React, { useEffect, useState } from "react";
import { Text, View, Image, Animated } from "react-native";
import { color, spacing } from "../Utilities/Constants/Constant";

export const Toast = (props) => {
  const opacity = useState(new Animated.Value(1))[0];
  let width = { width: "100%" };
  let bgColor = props.bgColor ?? color.BLACK;
  let textPro = props.textPro ?? {};
  let customStyle = props.customStyle ?? {};
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Animated.View
        style={{
          backgroundColor: bgColor,
          alignItems: "center",
          justifyContent: "center",
          height: spacing.HEIGHT_48,
          opacity,
          ...width,
          ...customStyle,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            // backgroundColor: "#000",
          }}
        >
          {props?.img ? (
            <Image
              style={{ height: spacing.WIDTH_14, width: spacing.WIDTH_14 }}
              source={props.img}
            ></Image>
          ) : null}
          <Text
            style={{
              ...textPro,
              marginLeft: spacing.HEIGHT_10,
            }}
          >
            {props.message ? props.message : ""}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};
