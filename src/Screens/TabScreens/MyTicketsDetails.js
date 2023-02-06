import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
  WebView,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getMyTicketDetailsData } from "../../Redux/MyTicketDetailsDispatcher";
import ViewMoreText from "react-native-view-more-text";
import Timeline from "../../Components/Timeline";
import { Button } from "../../Components/Button";

import {
  spacing,
  fontSizes,
  color,
  buttonType,
  buttonSize,
} from "../../Utilities/Constants/Constant";
import { CustomActivityIndicator } from "../../Components/CustomActivityIndicator";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Moment from "moment";

import {
  getAttachmentData,
  uploadAttachmentData,
} from "../../Redux/AttachmentDispatcher";
import { strings } from "../../Utilities/Language/index";
import FollowUp from "./FollowUp";

import {
  getFollowUpData,
  getFollowUpWithAtttachmentData,
  InsertFollowUpData,
} from "../../Redux/FollowUpDispatcher";
import Header from "./Component/Header";
import get from "lodash.get";
import { downloadFile } from "../../Utilities/API/FileSystem";
import LoadingAnimation from "../../Components/LoadingAnimation";

const MyTicketDetails = ({ route, navigation }) => {
  const [isFollowUpLoaing, setFollowUpLoading] = useState(false);
  const [docItem, setDocItem] = React.useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [uploadedDocsData, setUploadedDocData] = useState([]);
  const dispatchFollowUp = useDispatch([
    // getFollowUpData,
    getFollowUpWithAtttachmentData,
    InsertFollowUpData,
  ]);

  const [activeFollowUpData, setActiveFollowUpData] = useState({});
  let profile = useSelector((state) => state.profile);
  let myTicketDetails = useSelector((state) => state.myTicketDetails);
  const attachmentList = useSelector((state) => state.attachment);
  const followUpData = useSelector((state) => state.followup);

  const { intxnId, intxnType } = route.params;
  // const { intxnId, intxnType } = { intxnId: "239856", intxnType: "REQCOMP" };
  const dispatch = useDispatch([getMyTicketDetailsData]);
  // console.warn("", intxnId, intxnType);
  const dispatchAttachment = useDispatch([
    getAttachmentData,
    uploadAttachmentData,
  ]);
  //followup form submission
  const followUpUpdateAction = async () => {
    if (description == "") return null;

    setFollowUpLoading(true);
    await dispatchAttachment(
      uploadAttachmentData(
        uploadedDocsData,
        { description: description, intxnId: intxnId },
        (uploadedIds, uploadedDocsData, followupAction) =>
          dispatch(
            InsertFollowUpData(uploadedIds, uploadedDocsData, followupAction)
          ),
        (status) => {
          setFollowUpLoading(false);
          setModalVisible(false);
          if (status == "success") {
            dispatchFollowUp(
              getFollowUpWithAtttachmentData(intxnId, intxnType)
            );
            dispatchAttachment(getAttachmentData(intxnId, intxnType));
            setUploadedDocData([]);
            setDocItem([]);
          }
        }
      )
    );
  };

  const onPressInquiryNotification = () => {
    console.log(
      "onPressInquiryNotification=====>" +
        JSON.stringify(myTicketDetails?.myTicketDetailsData)
    );
    navigation.navigate("InquiryNotification", {
      ouId: myTicketDetails?.myTicketDetailsData?.parentUnit,
      serviceType: myTicketDetails?.myTicketDetailsData?.businessEntityCode,
      problemCode: myTicketDetails?.myTicketDetailsData?.problemCode,
      deptId: myTicketDetails?.myTicketDetailsData?.createdEntity,
    });
  };

  const fetchMyTicketDetailsDataAndAttachment = () => {
    //getFollowUpData
    dispatch(getMyTicketDetailsData(intxnId, intxnType));
    dispatchAttachment(getAttachmentData(intxnId, intxnType));
    // if (intxnType == "REQCOMP")
    dispatchFollowUp(getFollowUpWithAtttachmentData(intxnId, intxnType));
  };

  useEffect(() => {
    fetchMyTicketDetailsDataAndAttachment();
  }, []);
  const [followUpFormat, setFollowupFormat] = useState([]);
  //merger followup

  useEffect(() => {
    // const { getfollowupwithatttachmentData, followUpData } = followUpData;
    const temp = [];
    const followUpInfo = followUpData.getfollowupwithatttachmentData;

    if (get(followUpInfo, "length", false)) {
      followUpInfo.map((data) => {
        temp.push({
          icon: (
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../Assets/icons/doc_timeline.png")}
            />
          ),
          status: data.intxnStatus,
          attachments: data.attachments,
          txnId: data.txnId,
          description: data.departmentDescription,
          intxnId: data.intxnId,
          createdAt: data.flwCreatedAt,
          problemCode: data.problemCode,
        });
      });
      setFollowupFormat(temp);
    }
  }, [followUpData.getfollowupwithatttachmentData]);

  const getFileExtention = (fileUrl) => {
    // To get the file extension
    const typeOfDoc = /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
    if (typeOfDoc == undefined) return "doc";
    const imgList = ["jpg", "jpeg", "gif", "png"];
    if (imgList.includes(fileUrl.toLocaleLowerCase())) return "img";
    return "doc";
  };
  const renderDetail = (data) => {
    const followupForm =
      get(data, "attachments.length", false) == false ? false : true;
    if (followupForm) {
      return (
        <View style={styles.followupDetailsTabCont}>
          <View style={styles.followUpBox1}>
            <Image
              style={{ width: 20, height: 20, borderRadius: 20 }}
              source={{
                uri: `data:image/jpeg;base64,${profile?.savedProfileData?.profilePicture}`,
              }}
            />
          </View>
          <View style={styles.followupBox2}>
            <Text
              style={{
                ...styles.requestText,
                ...{ fontWeight: "500", marginBottom: spacing.HEIGHT_3 },
              }}
            >
              {data.description}
            </Text>
            <View
              style={{ flexDirection: "row", marginBottom: spacing.HEIGHT_6 }}
            >
              <Text style={styles.requestText}>
                {Moment(data?.createdAt).format("DD MMM - hh:mm")}
              </Text>
              <Image
                style={{
                  width: spacing.WIDTH_20,
                  height: spacing.WIDTH_20,
                  marginLeft: spacing.WIDTH_15,
                }}
                source={require("../../Assets/icons/attachment.png")}
              />
            </View>
            <Button
              type={buttonType.PRIMARY}
              size={buttonSize.MEDIUM}
              label={strings.click_to_more}
              bgColor={color.WHITE}
              textColor={color.BLACK}
              textPro={{
                elevation: 4,
                paddingHorizontal: spacing.WIDTH_10,
                color: color.BLACK,
                fontSize: fontSizes.FONT_16,
                fontWeight: "400",
                lineHeight: spacing.HEIGHT_16,
              }}
              onPress={() => {
                setActiveFollowUpData({ type: "view", data });
                setModalVisible(true);
              }}
            />
          </View>
        </View>
      );
    }
    return (
      <View
        style={{
          marginTop: -spacing.HEIGHT_12,
          flexDirection: "column",
          paddingRight: 50,
        }}
      >
        <Text
          style={{
            marginLeft: 10,
            fontWeight: "600",
          }}
        >
          {data?.status == "CLOSED" ? "Assigned" : "New Request"}
        </Text>

        <Text
          style={{
            marginLeft: 10,
          }}
        >
          {Moment(data?.createdAt).format("DD MMM - hh:mm")}
        </Text>
      </View>
    );
  };
  const renderFollowUp = () => {
    if (followUpFormat && followUpFormat.length == 0) return null;
    return (
      <Timeline
        style={styles.followup}
        data={followUpFormat}
        showTime={false}
        innerCircle={"icon"}
        renderDetail={(item) => renderDetail(item)}
        lineColor="#e5e5e5"
        isUsingFlatlist={true}
      />
    );
  };
  return (
    <>
      <Header
        navigation={navigation}
        Text="Interaction"
        backIconVisibility={true}
        rightIconsVisibility={true}
      ></Header>
      <SafeAreaView style={styles.rootContainer}>
        <ScrollView>
          <View
            key={1}
            style={{
              ...{
                backgroundColor: color.white,
                alignItems: "center",
                flex: 1,
                marginBottom: 50,
              },
            }}
          >
            {myTicketDetails?.initMyTicketDetails ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 200,
                }}
              >
                <LoadingAnimation></LoadingAnimation>
                <Text style={styles.emptyList}>{strings.please_wait}</Text>
              </View>
            ) : (
              <>
                <View style={[styles.cardView]}>
                  <View style={{ flexDirection: "column" }}>
                    <View style={styles.ticketItemHeading}>
                      <Image
                        style={styles.searchIcon}
                        source={require("../../Assets/icons/ic_ticket_red.png")}
                      />
                      <Text
                        style={[styles.textBase_primary, styles.description]}
                      >
                        {myTicketDetails?.myTicketDetailsData?.typeDescription}
                      </Text>
                      <View style={styles.alignRight}>
                        <Image
                          style={styles.searchIcon}
                          source={require("../../Assets/icons/ic_td123_logo.png")}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={[styles.box1]}>
                        {myTicketDetails?.myTicketDetailsData?.intxnType ===
                          "REQINQ" && (
                          <>
                            <View style={{ flexDirection: "row" }}>
                              <View style={{ flex: 1 }}>
                                <Text style={[styles.status]}>
                                  {strings.inquiryNo}
                                </Text>
                              </View>
                              <View style={{ flex: 1, alignItems: "flex-end" }}>
                                <Pressable onPress={onPressInquiryNotification}>
                                  <Text style={[styles.notification]}>
                                    {strings.inquiryInfo}
                                  </Text>
                                </Pressable>
                              </View>
                            </View>

                            <Text style={[styles.requestText]}>
                              {myTicketDetails?.myTicketDetailsData?.intxnId}
                            </Text>
                          </>
                        )}
                        {myTicketDetails?.myTicketDetailsData?.intxnType ===
                          "REQCOMP" && (
                          <>
                            <Text style={[styles.status]}>
                              {strings.requestNo}
                            </Text>
                            <Text style={[styles.requestText]}>
                              {myTicketDetails?.myTicketDetailsData?.intxnId}
                            </Text>
                          </>
                        )}
                      </View>

                      <View style={[styles.box3]}></View>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                      <View style={[styles.box1]}>
                        <Text style={[styles.status]}>{strings.date}</Text>
                        <Text style={[styles.requestText]}>
                          {Moment(
                            myTicketDetails?.myTicketDetailsData?.createdAt
                          ).format("DD MMM - hh:mm")}
                        </Text>
                      </View>
                      <View style={[styles.box2]}>
                        <Text style={[styles.status]}>{strings.status}</Text>
                        <Text style={[styles.requestText]}>
                          {
                            myTicketDetails?.myTicketDetailsData
                              ?.currStatusDescription
                          }
                        </Text>
                      </View>
                      <View style={[styles.box3]}></View>
                    </View>
                    {/* interaction type row */}
                    <View
                      style={{
                        flexDirection: "row",

                        flex: 1,
                        height: "100%",
                      }}
                    >
                      <View style={[styles.box1]}>
                        <Text style={[styles.status]}>
                          {strings.inquiryType}
                        </Text>
                        <Text style={[styles.requestText]}>
                          {myTicketDetails?.myTicketDetailsData?.ticketType}
                        </Text>
                      </View>
                      <View style={[styles.box2]}>
                        <Text style={[styles.status]}>
                          {strings.serviceType}
                        </Text>
                        {myTicketDetails?.myTicketDetailsData?.intxnType ===
                        "REQCOMP" ? (
                          <Text style={[styles.requestText]}>
                            {
                              myTicketDetails?.myTicketDetailsData
                                ?.categoryDescription
                            }
                          </Text>
                        ) : (
                          <Text style={[styles.requestText]}>
                            {
                              myTicketDetails?.myTicketDetailsData
                                ?.typeDescription
                            }
                          </Text>
                        )}
                      </View>
                      <View style={[styles.box3]}></View>
                    </View>
                    {/* interaction type row end*/}

                    <View style={{ flexDirection: "row" }}>
                      <View style={[styles.box1]}>
                        <Text style={[styles.status]}>
                          {strings.problemType}
                        </Text>
                        <Text style={[styles.requestText]}>
                          {
                            myTicketDetails?.myTicketDetailsData
                              ?.problemCodeDescription
                          }
                        </Text>
                      </View>
                    </View>
                    {intxnType == "REQCOMP" && (
                      <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <View style={[styles.enquiryDesc]}>
                          <Text style={[styles.status]}>
                            {strings.description}
                          </Text>

                          <ViewMoreText
                            numberOfLines={4}
                            renderViewMore={(onPress) => (
                              <Pressable
                                onPress={onPress}
                                style={styles.showMore}
                              >
                                <Text style={styles.requestText}>
                                  {strings.view_more}
                                </Text>
                                <Image
                                  style={{
                                    marginTop: spacing.HEIGHT_5,
                                    width: spacing.WIDTH_20,
                                    height: spacing.WIDTH_20,
                                  }}
                                  source={require("../../Assets/icons/down.png")}
                                />
                              </Pressable>
                            )}
                            renderViewLess={(onPress) => (
                              <Pressable
                                onPress={onPress}
                                style={styles.showMore}
                              >
                                <Text style={styles.requestText}>
                                  {strings.view_less}
                                </Text>
                                <Image
                                  style={{
                                    marginTop: spacing.HEIGHT_3,
                                    width: spacing.WIDTH_20,
                                    height: spacing.WIDTH_20,
                                    transform: [{ rotate: "180deg" }],
                                  }}
                                  source={require("../../Assets/icons/down.png")}
                                />
                              </Pressable>
                            )}
                            // textStyle={{ textAlign: "center" }}
                          >
                            <Text style={[styles.requestText]}>
                              {myTicketDetails?.myTicketDetailsData
                                ?.description || strings.details_na + "\n\n"}
                            </Text>
                          </ViewMoreText>
                        </View>
                      </View>
                    )}

                    {attachmentList?.attachmentData?.length > 0 && (
                      <>
                        <Text
                          style={[
                            styles.textBase,
                            styles.description,
                            { marginTop: 20 },
                          ]}
                        >
                          {strings.my_attachments}
                        </Text>
                        {attachmentList.attachmentData?.map((attachment) => (
                          <Pressable
                            key={attachment?.fileName}
                            style={styles.ticketItemHeading}
                            onPressIn={async () => {
                              await downloadFile(
                                attachment?.base64,
                                attachment?.fileName
                              );
                            }}
                          >
                            {getFileExtention(attachment?.fileName) == "doc" ? (
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
                            <Text style={styles.description}>
                              {attachment?.fileName}
                            </Text>
                          </Pressable>
                        ))}
                      </>
                    )}
                    {get(
                      myTicketDetails,
                      "myTicketDetailsData.addressString",
                      ""
                    ) != "" && (
                      <>
                        <View style={{ flexDirection: "row" }}>
                          <Text
                            style={[
                              styles.textBase,
                              styles.description,
                              { marginTop: 20 },
                            ]}
                          >
                            {strings.interaction_location}
                          </Text>
                        </View>
                        {get(
                          myTicketDetails,
                          "myTicketDetailsData.address.addressType",
                          false
                        ) && (
                          <View style={{ flexDirection: "row" }}>
                            <View style={styles.ticketItemHeading}>
                              <Image
                                style={styles.searchIcon}
                                source={require("../../Assets/icons/ic_overlay_normal.png")}
                              />
                              <Text
                                style={[styles.textBase, styles.description]}
                              >
                                {get(
                                  myTicketDetails,
                                  "myTicketDetailsData.address.addressType",
                                  ""
                                )}
                              </Text>
                            </View>
                          </View>
                        )}
                        <View style={{ flexDirection: "row" }}>
                          <View style={styles.ticketItemHeading}>
                            <Text style={[styles.textBase, styles.description]}>
                              {
                                myTicketDetails?.myTicketDetailsData
                                  ?.addressString
                              }
                            </Text>
                          </View>
                        </View>
                      </>
                    )}
                    {get(myTicketDetails, "myTicketDetailsData.latitude", "") !=
                      "" && (
                      <>
                        <View
                          style={[
                            styles.cardView,
                            {
                              flexDirection: "row",
                              height: 200,
                              padding: 20,
                            },
                          ]}
                        >
                          <MapView
                            provider={PROVIDER_GOOGLE}
                            style={[styles.map]}
                            initialRegion={{
                              latitude: get(
                                myTicketDetails,
                                "myTicketDetailsData.latitude",
                                ""
                              ),
                              longitude: get(
                                myTicketDetails,
                                "myTicketDetailsData.longitude",
                                ""
                              ),
                              latitudeDelta: 0.0922,
                              longitudeDelta: 0.0421,
                            }}
                          >
                            <Marker
                              key={1}
                              coordinate={{
                                latitude:
                                  myTicketDetails?.myTicketDetailsData
                                    ?.latitude,
                                longitude:
                                  myTicketDetails?.myTicketDetailsData
                                    ?.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                              }}
                              // title={marker.title}
                              // description={marker.description}
                            />
                          </MapView>
                        </View>
                      </>
                    )}
                  </View>
                </View>
                <View style={[styles.cardViewTimeLine]}>
                  {renderFollowUp()}
                </View>
                <View style={styles.bottonSpaceCorrection}>
                  <Button
                    imgRight={require("../../Assets/icons/follow-up.png")}
                    type={buttonType.PRIMARY}
                    size={buttonSize.MEDIUM}
                    label={strings.follow_up}
                    bgColor={color.BCAE_PRIMARY}
                    textColor={color.WHITE}
                    textPro={{
                      elevation: 4,
                      paddingHorizontal: spacing.WIDTH_15,
                      // paddingVertical: spacing.HEIGHT_,
                      color: color.WHITE,
                      fontSize: fontSizes.FONT_14,
                      fontWeight: "400",
                      lineHeight: spacing.HEIGHT_30,
                    }}
                    imgPro={{
                      marginRight: spacing.WIDTH_10,
                    }}
                    onPress={() => {
                      setActiveFollowUpData({ type: "form", data: {} });
                      setModalVisible(true);
                    }}
                  />
                </View>
              </>
            )}
          </View>
        </ScrollView>

        <FollowUp
          uploadedDocsData={uploadedDocsData}
          setUploadedDocData={setUploadedDocData}
          typeOfInteraction={intxnType}
          isFollowUpLoaing={isFollowUpLoaing}
          updateAction={() => followUpUpdateAction()}
          activeFollowUpData={activeFollowUpData}
          isView={false}
          description={description}
          setDescription={(status) => setDescription(status)}
          modalVisible={modalVisible}
          setModalVisible={(status) => setModalVisible(status)}
          docItem={docItem}
          setDocItem={(status) => setDocItem(status)}
        />
      </SafeAreaView>
    </>
  );
};

export default MyTicketDetails;

// styles
const styles = StyleSheet.create({
  followupDetailsTabCont: {
    paddingHorizontal: spacing.WIDTH_15,
    paddingVertical: spacing.HEIGHT_8,
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#fff7df",
  },
  followup: {
    marginTop: spacing.WIDTH_3,
    resizeMode: "contain",
  },

  rootContainer: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  cardView: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "blue",
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    // minWidth: "95%",
  },

  cardViewTimeLine: {
    flexDirection: "column",
    padding: 10,
    marginVertical: 8,
    // backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,

    minWidth: "95%",
  },

  ticketItemHeading: {
    minWidth: "95%",
    marginVertical: 8,
    backgroundColor: "white",
    flexDirection: "row",

    alignItems: "center",
  },
  textBase: {
    color: color.BLACK,
  },
  textBase_primary: {
    color: color.BCAE_PRIMARY,
  },
  description: {
    fontSize: fontSizes.FONT_18,
    marginLeft: spacing.WIDTH_8,
    marginBottom: spacing.HEIGHT_1,
    fontWeight: "bold",
    maxWidth: "69%",
  },
  inputBox: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    backgroundColor: "white",
    borderRadius: 3,
    margin: 5,
    borderColor: "#9FA5AA",
    borderWidth: 1,
  },
  searchInput: {
    height: 45,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 3,
    color: "#9E9E9E",
  },
  searchIcon: {
    width: spacing.WIDTH_35,
    height: spacing.WIDTH_35,
    marginLeft: 5,
    marginRight: 5,
  },
  menuIcon: {
    width: spacing.WIDTH_21,
    height: spacing.WIDTH_21,
    marginLeft: 5,
    marginRight: 5,
  },
  menuText: {},
  toggleContainer: {
    width: "95%",
    height: spacing.WIDTH_35,
    marginTop: 20,
  },
  allItemsContainerText: {
    flex: 1,
    height: 45,
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
  },
  allItemsContainerFilter: {
    flex: 1,
    height: 45,
    width: "90%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  allItems: {
    textAlign: "left",
    fontSize: 15,
    color: color.BCAE_PRIMARY,
  },
  emptyList: {
    fontSize: 20,
    color: color.BCAE_PRIMARY,
  },
  requestText: {
    fontSize: fontSizes.FONT_14,
    fontWeight: "bold",
    color: "#6c6c6c",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  box1: {
    flex: 4,
    minHeight: 50,
    padding: 5,
  },
  enquiryDesc: {
    flex: 4,
    height: "100%",
    padding: 5,
  },
  box2: {
    flex: 4,
    minHeight: 50,
    padding: 5,
  },
  box3: {
    flex: 1,
    justifyContent: "center",
    minHeight: 50,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "blue",
  },
  notification: {
    fontSize: fontSizes.FONT_17,
    fontWeight: "bold",
    color: color.BCAE_PRIMARY,
    textDecorationLine: "underline",
  },
  alignRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  showMore: {
    marginTop: spacing.WIDTH_10,
    justifyContent: "center",
    flex: 1,
    alignContent: "center",
    flexDirection: "row",
  },
  followUpBox1: {
    flex: 0.1,
  },
  followupBox2: {
    flex: 0.9,
  },
  bottonSpaceCorrection: {
    marginBottom: spacing.HEIGHT_50,
  },
});
