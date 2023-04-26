import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import DocumentPicker, { isInProgress } from "react-native-document-picker";
import get from "lodash.get";
import { EditText } from "../../Components/EditText";
import { PopupFollowup as Popup } from "../../Components/PopupFollowup";
import { color, fontSizes, spacing } from "../../Utilities/Constants/Constant";
// import { commonStyle } from "../../Utilities/Styles/Common";
import { checkPermissionNdDownload } from "../../Utilities/API";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  clearUploadAttachmentArr,
  uploadAttachmentData,
} from "../../Redux/AttachmentDispatcher";
import RNFS from "react-native-fs";
import { ScrollView } from "react-native-gesture-handler";
var { height, width } = Dimensions.get("screen");
const FollowUp = ({
  updateAction = () => { },
  description,
  setDescription,
  isFollowUpLoaing,
  setDocItem,
  docItem,
  modalVisible,
  setModalVisible,
  typeOfInteraction,
  activeFollowUpData = {},
  uploadedDocsData,
  setUploadedDocData,
}) => {
  const isView = activeFollowUpData.type == "view" ? true : false;
  const dispatch = useDispatch([
    clearUploadAttachmentArr,
    uploadAttachmentData,
  ]);

  useEffect(() => {
    // dispatch(clearUploadAttachmentArr());
  }, [modalVisible]);

  const handleError = (err) => {
    if (DocumentPicker.isCancel(err)) {
      console.log("cancelled");
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.log(
        "multiple pickers were opened, only the last will be considered"
      );
    } else {
      throw err;
    }
  };

  const getFileExtention = (fileUrl) => {
    // To get the file extension
    const typeOfDoc = /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
    if (typeOfDoc == undefined) return "doc";
    const imgList = ["jpg", "jpeg", "gif", "png"];
    if (imgList.includes(fileUrl.toLocaleLowerCase())) return "img";
    return "doc";
  };

  return (
    <View
      style={{
        flex: 1,
        position: "absolute",
        height: height * 1.2,
        top: -height / 10,
      }}
    >
      <Popup
        isFollowUpLoaing={isFollowUpLoaing}
        updateAction={updateAction}
        modalVisible={modalVisible}
        isOnlyCloseButton={isView}
        setModalVisible={(status) => {
          setModalVisible(status);
        }}
      >
        <View>
          {!isView ? (
            <>
              <EditText
                //  placeHolder={strings.mobile_no}
                customStyle={{
                  borderColor: color.INPUT_TEXT_BORDER,
                  borderWidth: 0.8,
                  borderRadius: 5,
                  borderStyle: "solid",
                  padding: 12,
                }}
                clearText={() => { }}
                // keyboardType="numeric"
                isClose={false}
                lines={3}
                multiline={true}
                numberOfLines={3}
                value={description}
                onChangeText={(text) => {
                  if (text.length > 250) return null;
                  setDescription(text);
                }}
                placeHolder="Please enter remark"
              />
              <Text
                style={{
                  position: "relative",
                  top: -spacing.HEIGHT_30,
                  left: "80%",
                  color: color.DARK_GREY,
                  fontSize: fontSizes.FONT_15,
                }}
              >
                {description.length}/250
              </Text>
            </>
          ) : (
            <View
              style={{
                paddingHorizontal: spacing.WIDTH_14,
              }}
            >
              <Text style={{ color: color.BLACK, fontSize: fontSizes.FONT_15 }}>
                {get(activeFollowUpData, "data.description", "")}
              </Text>
              <Text
                style={{
                  color: color.DARK_GREY,
                  marginTop: spacing.HEIGHT_2,
                  marginBottom: spacing.HEIGHT_11,
                }}
              >
                {moment(get(activeFollowUpData, "data.createdAt", "")).format(
                  "DD MMM YYYY hh:MM A"
                )}
              </Text>
              {/* item listing */}
              <>
                <Pressable
                  onPress={async () => {
                    try {
                      await checkPermissionNdDownload(
                        `basae_url${get(activeFollowUpData, "uri", "")}`
                      );
                    } catch (er) {
                      console.log("error");
                    }
                  }}
                  style={styles.listOfAttachment}
                >
                  <Image
                    style={styles.img}
                    source={require("../../Assets/icons/attachment.png")}
                  />
                  <Text
                    style={{
                      marginLeft: spacing.WIDTH_5,
                      color: color.DARK_GREY,
                      fontSize: fontSizes.FONT_16,
                    }}
                  >
                    {get(activeFollowUpData, "uri", "")}
                  </Text>
                </Pressable>
              </>
              {/* item listing end */}
            </View>
          )}
          {!isView && (
            <>
              <Pressable
                // disabled={docItem.length > 4 ? true : false}
                onPress={async () => {
                  try {
                    const pickerResult = await DocumentPicker.pickSingle({
                      presentationStyle: "fullScreen",
                      copyTo: "cachesDirectory",
                    });

                    const base64Data = await RNFS.readFile(
                      pickerResult.fileCopyUri,
                      "base64"
                    );

                    const param = {
                      fileName: pickerResult.name,
                      fileType: pickerResult.type,
                      content:
                        "data:" + pickerResult.type + ";base64," + base64Data,
                      entityType:
                        typeOfInteraction === "REQCOMP"
                          ? "COMPLAINT"
                          : "INQUIRY",
                    };
                    setUploadedDocData([...uploadedDocsData, param]);
                    setDocItem([
                      ...docItem,
                      ...[
                        {
                          fileCopyUri: pickerResult.fileCopyUri,
                          name: pickerResult.name,
                        },
                      ],
                    ]);
                  } catch (e) {
                    handleError(e);
                  }
                }}
                style={styles.roundBtn}
              >
                <Text style={styles.roundText}>Attachments</Text>
                <Image
                  source={require("../../Assets/icons/attachment.png")}
                  style={styles.img}
                />
              </Pressable>
              <Text
                style={{
                  marginTop: spacing.HEIGHT_4,
                  color: color.PLACEHOLDER,
                  fontSize: fontSizes.FONT_14,
                  marginBottom: spacing.HEIGHT_20,
                }}
              >
                Maximum upload size - 2MB
              </Text>
            </>
          )}
          {/* listing all attachment list and delete */}
          <ScrollView
            contentContainerStyle={{
              marginBottom: spacing.HEIGHT_20,
              // height: spacing.HEIGHT_30 * 4,
            }}
          >
            {docItem &&
              docItem &&
              docItem?.map((docs, i) => {
                return (
                  <View style={styles.listItem} key={i}>
                    <Pressable
                      // key={attachment?.fileName}
                      style={styles.ticketItemHeading}
                      onPressIn={async () => {
                        // await checkPermissionNdDownload(
                        //   "https://www.techup.co.in/wp-content/uploads/2020/01/techup_logo_72-scaled.jpg"
                        // );
                      }}
                    >
                      {getFileExtention("smaple.pdf") == "doc" ? (
                        <Image
                          style={{
                            ...styles.searchIcon,
                            ...{ marginLeft: spacing.WIDTH_8 },
                          }}
                          source={require("../../Assets/icons/documents.png")}
                        />
                      ) : (
                        <Image
                          style={{
                            ...styles.searchIcon,
                            ...{ marginLeft: spacing.WIDTH_8 },
                          }}
                          source={require("../../Assets/icons/gallery.png")}
                        />
                      )}
                      <Text style={styles.description}>{docs?.name}</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        const doc = docItem.filter(function (item, idx) {
                          return idx !== i;
                        });

                        setDocItem(doc);
                      }}
                    >
                      <Image
                        style={{
                          ...styles.img,
                          ...{ marginTop: spacing.HEIGHT_6 },
                        }}
                        source={require("../../Assets/icons/ic_delete_red.png")}
                      />
                    </Pressable>
                  </View>
                );
              })}
          </ScrollView>
        </View>
      </Popup>
    </View>
  );
};

export default FollowUp;

const styles = StyleSheet.create({
  listOfAttachment: {
    flexDirection: "row",
  },
  description: {
    fontSize: fontSizes.FONT_16,
    marginLeft: 10,
    fontWeight: "bold",
    width: "80%",
  },
  roundBtn: {
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#e0f2ff",
    width: `${spacing.WIDTH_13 * 4}%`,
    borderRadius: 16,
    padding: "2%",
  },
  img: {
    width: 18,
    height: 18,
  },
  searchIcon: {
    width: spacing.WIDTH_21,
    height: spacing.WIDTH_21,
    marginLeft: 5,
    marginRight: 5,
  },
  ticketItemHeading: {
    minWidth: "95%",
    marginVertical: 8,
    // backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },
  roundText: {
    fontSize: fontSizes.FONT_17,
  },
  listItem: {
    marginRight: spacing.WIDTH_15,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
