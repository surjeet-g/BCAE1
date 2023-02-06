import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import {
  color,
  spacing,
  buttonType,
  buttonSize,
} from "../Utilities/Constants/Constant";

export const Button = (props) => {
  let type = props.type ?? buttonType.PRIMARY;
  let size = props.size ?? buttonSize.FLEXI;
  let disabled = "disabled" in props ? props.disabled : false;
  let label = props.label ?? "Button";
  let onClicked = props.onPress ?? null;
  let bgColor = disabled
    ? color.DISABLED_GREY
    : props.bgColor
    ? props.bgColor
    : color.TRANSPARENT;
  let textColor = props.textColor ? props.textColor : color.BLACK;
  let width = size === buttonSize.LARGE ? { width: "100%" } : {};
  let customStyle = props.customStyle ?? {};
  let activeOpacity = props.opacity ?? 0.2;
  let textPro = props.textPro ?? {};
  let imgPro = props.imgPro ?? {};

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        onPress={onClicked}
        disabled={disabled}
        activeOpacity={activeOpacity}
        style={{
          flexDirection: "row",
          paddingHorizontal:
            size === buttonSize.FLEXI || size === buttonSize.SMALL
              ? spacing.WIDTH_20
              : 0,
          backgroundColor: bgColor,
          borderRadius: spacing.HEIGHT_3,
          justifyContent: "center",
          alignItems: "center",
          height:
            size === buttonSize.SMALL ? spacing.HEIGHT_30 : spacing.HEIGHT_49,
          ...width,
          borderWidth: 0,
          borderColor: disabled ? color.DISABLED_GREY : color.TRANSPARENT,
          ...customStyle,
        }}
      >
        {props?.img ? (
          <Image style={{ ...imgPro }} source={props.img}></Image>
        ) : null}
        {
          <Text
            style={{
              ...textPro,
            }}
          >
            {label}
          </Text>
        }
        {props?.imgRight ? (
          <Image style={{ ...imgPro }} source={props.imgRight}></Image>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};
