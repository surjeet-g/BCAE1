import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { color, spacing } from "../Utilities/Constants/Constant";
/**
* @method
* @param  {string} label Caption of component
* @param  {function} onPressFirst invoke clicking on first tab
* @param  {function} onPressSecond invoke clicking on second tab
* @param  {object} textPro customize the text inside toggle button
* @param  {boolean} isFirstSelected status of toggle buttom
* @returns {JSX} Return JSX 
*/
export const ToggleButton = (props) => {
  let label = props.label ?? {};
  let onPressFirst = props.onPressFirst ?? null;
  let onPressSecond = props.onPressSecond ?? null;
  let bgColor = props.bgColor;
  let textColor = props.textColor ? props.textColor : color.BLACK;
  let width = { width: "50%" };
  let customStyle = props.customStyle ?? {};
  let activeOpacity = props.opacity ?? 0.2;
  let textPro = props.textPro ?? {};
  let isFirstSelected = props.isFirstSelected ?? false;

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: bgColor.unselected,
        borderRadius: spacing.HEIGHT_24,
      }}
    >
      <TouchableOpacity
        onPress={onPressFirst}
        activeOpacity={activeOpacity}
        style={{
          paddingHorizontal: spacing.WIDTH_5,
          backgroundColor: isFirstSelected
            ? bgColor.selected
            : bgColor.unselected,
          borderRadius: spacing.HEIGHT_24,
          justifyContent: "center",
          alignItems: "center",
          height: spacing.HEIGHT_32,
          ...width,
          ...customStyle,
        }}
      >
        {
          <Text
            style={{
              ...textPro,
              color: isFirstSelected
                ? textColor.selected
                : textColor.unselected,
            }}
          >
            {label.first}
          </Text>
        }
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onPressSecond}
        activeOpacity={activeOpacity}
        style={{
          paddingHorizontal: spacing.WIDTH_5,
          backgroundColor: !isFirstSelected
            ? bgColor.selected
            : bgColor.unselected,
          borderRadius: spacing.HEIGHT_24,
          justifyContent: "center",
          alignItems: "center",
          height: spacing.HEIGHT_32,
          ...width,
          ...customStyle,
        }}
      >
        {
          <Text
            style={{
              ...textPro,
              color: !isFirstSelected
                ? textColor.selected
                : textColor.unselected,
            }}
          >
            {label.second}
          </Text>
        }
      </TouchableOpacity>
    </View>
  );
};
