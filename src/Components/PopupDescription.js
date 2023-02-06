import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";
const { width } = Dimensions.get("screen");
import { color, fontSizes, spacing } from "../Utilities/Constants/Constant";
import { strings } from "../Utilities/Language/index";
import { commonStyle } from "../Utilities/Style/commonStyle";
export const PopupDescription = ({
  modalVisible,
  isOnlyCloseButton = true,
  setModalVisible,
  children,
  isFollowUpLoaing,
  title = strings.follow_up_ticker,
  updateAction = () => {},
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ flex: 1 }}>
            <Text style={styles.header}>{title}</Text>
            <ScrollView style={{ flex: 0.65 }}>
              <View style={styles.body}>{children}</View>
            </ScrollView>

            <View style={styles.line} />
            <View style={styles.tail}>
              <View style={styles.btnsCont}>
                <Pressable
                  style={styles.btnCont}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.btn}>Close</Text>
                </Pressable>

                {!isOnlyCloseButton && (
                  <Pressable
                    disabled={isFollowUpLoaing}
                    style={styles.btnCont}
                    onPress={async () => {
                      await updateAction();
                    }}
                  >
                    {isFollowUpLoaing ? (
                      <View style={commonStyle.row_space_arround}>
                        <Text style={styles.btn}>Processing..</Text>
                        <ActivityIndicator
                          size="small"
                          color={color.BCAE_DARK_BLUE}
                        />
                      </View>
                    ) : (
                      <Text style={styles.btn}>Update</Text>
                    )}
                  </Pressable>
                )}
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredViewTop: {
    flex: 1,
  },
  centeredView: {
    // flex: 1,
    width: "90%",
    marginLeft: spacing.WIDTH_20,
    flexDirection: "column",
    // opacity: 0.1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  header: {
    marginTop: 12,
    flex: 0.2,
    fontWeight: "600",
    color: color.BLACK,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -17,
    alignSelf: "center",
    textAlignVertical: "center",
    alignContent: "center",
  },
  body: {
    flex: 0.65,
    width: width - 70,
  },
  line: {
    height: 0.6,
    width: "105%",
    backgroundColor: color.DARK_GREY,
  },
  btnsCont: {
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: "red",
    // width: "100%",
    flex: 1,
  },
  tail: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    flex: 0.3,
    paddingVertical: spacing.HEIGHT_5,
    // borderTopColor: color.DARK_GREY,
    // borderTopWidth: 0.5,
    // borderTopStyle: "solid",
  },
  btn: {
    color: color.BCAE_PRIMARY,
    fontWeight: "600",
    padding: spacing.WIDTH_4,
    fontSize: fontSizes.FONT_17,
  },
  modalView: {
    // opacity: 1,
    minHeight: "35%",
    width: width - 60,
    paddingHorizontal: spacing.WIDTH_10,
    paddingVertical: spacing.HEIGHT_10,
    paddingBottom: 0,
    backgroundColor: "white",
    borderRadius: 10,
    // position: "absolute",
    // top: spacing.HEIGHT_50 * 4,
    marginTop: 90,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
