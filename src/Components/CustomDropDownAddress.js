import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { color, spacing, fontSizes } from "../Utilities/Constants/Constant";

export const CustomDropDownAddress = (props) => {
  const {
    selectedValue,
    setValue,
    isDisableDropDown = false,
    setDropDownEnable = () => {},
  } = props;
  const [hideShow, setHideShow] = useState(false);

  let customStyle = props.customStyle ?? {};

  const onSelected = (item) => {
    setValue(item.description);
    props.onChangeText(item);
    setHideShow(false);
  };

  const ondropDownClick = () => {
    setHideShow(!hideShow);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => onSelected(item)}>
      <View
        style={{
          paddingHorizontal: spacing.WIDTH_20,
          paddingVertical: spacing.HEIGHT_5,
        }}
      >
        <Text style={styles.dropDownText}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity style={{ zIndex: -1, marginTop: 10 }}>
        <TouchableOpacity style={{ zIndex: -1, height: 50 }}>
          <View style={{ marginTop: 5, zIndex: -1 }}>
            <Text style={styles.placeHolderText}>
              {selectedValue != "" ? props.placeHolder : " "}
            </Text>
          </View>
          <Pressable
            onPress={() => {
              setDropDownEnable();

              ondropDownClick();
            }}
            style={{ flexDirection: "row", zIndex: -2 }}
          >
            {
              <View
                style={{
                  position: "absolute",
                  marginTop: selectedValue == "" ? 12 : 0,
                  right: spacing.WIDTH_5,
                  zIndex: 1,
                  height: spacing.HEIGHT_20,
                  width: spacing.WIDTH_20,
                  alignItems: "flex-end",
                }}
              >
                <Image
                  source={require("../Assets/icons/ci_dropdown.png")}
                  style={{ width: spacing.WIDTH_16, height: spacing.WIDTH_16 }}
                />
              </View>
            }
            <TextInput
              editable={false}
              placeholder={props.placeHolder}
              style={{ ...styles.textInput, ...customStyle }}
              value={selectedValue}
            />
          </Pressable>
        </TouchableOpacity>
      </TouchableOpacity>
      {hideShow && !isDisableDropDown && (
        <View style={styles.dropDownCard}>
          <FlatList
            data={props?.data ?? []}
            renderItem={renderItem}
            keyExtractor={(item, index) => `key-${index}`}
            // keyExtractor={item => item.description}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  placeHolderText: {
    color: color.PLACEHOLDER,
    fontSize: fontSizes.FONT_12,
    fontWeight: "500",
    // marginBottom: spacing.WIDTH_5,
  },
  textInput: {
    height: 45,
    width: "100%",
    borderBottomColor: color.INPUT_TEXT_BORDER,
    borderBottomWidth: 0.8,
    color: color.BCAE_PRIMARY,
    fontSize: fontSizes.FONT_14,
    fontWeight: "500",
  },
  dropDownCard: {
    top: spacing.HEIGHT_30,
    position: "absolute",
    // shadowColor: '#171717',
    maxHeight: spacing.HEIGHT_50 * 5,
    paddingTop: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "white",
    borderRadius: spacing.WIDTH_8,
    width: "100%",
    marginVertical: spacing.WIDTH_10,
    elevation: 5,
  },
  dropDownText: {
    color: color.DARK_GREY,
    fontSize: fontSizes.FONT_12,
    fontWeight: "500",
    zIndex: 0,
  },
});
