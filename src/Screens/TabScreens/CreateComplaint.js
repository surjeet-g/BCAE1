//import liraries
import React, { Component, useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
  ImageBackground,
  Alert,
  Platform,
} from "react-native";
import get from "lodash.get";
import Toast from "react-native-toast-message";
import { Button } from "../../Components/Button";
import DocumentPicker, { types } from "react-native-document-picker";
import ImagePicker, {
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";

import AttachmentList from "../../Components/AttachmentList";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { CustomActivityIndicator } from "../../Components/CustomActivityIndicator";
import { CustomDropDown } from "../../Components/CustomDropDown";
import { EditText } from "../../Components/EditText";
import {
  createInquiry,
  fetchDetailsData,
  resetInquiry,
} from "../../Redux/InquiryDispatcher";
import { getMyDashboardData } from "../../Redux/MyDashboardDispatcher";
import { getMyTicketsData } from "../../Redux/MyTicketsDispatcher";
import {
  buttonSize,
  color,
  spacing,
  buttonType,
  fontSizes,
} from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language";
import Header from "./Component/Header";
import { PopupDescription as Popup } from "../../Components/PopupDescription";
import RNFS from "react-native-fs";
import { TDLog } from "../../Utilities/Constants/Constant";
import LoadingAnimation from "../../Components/LoadingAnimation";
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";

// create a component
const CreateComplaint = ({ route, navigation }) => {
  let enquilryDetailsData = useSelector((state) => state.enquiry);
  const [modalVisible, setModalVisible] = useState(false);
  const [organizationName, setOrganizationName] = useState("");
  const [organizationItem, setOrganizationItem] = useState("");
  const [servicename, setServiceName] = useState("");
  const [problem, setProblem] = useState("");
  const [description, setDescription] = useState("");
  const [attachmentModalVisible, setAttachmentModalVisible] = useState(false);
  const [contactPreference, setContactPreference] = useState("CNT_PREF_PHONE");
  const [fileAttachments, setFileAttachments] = useState([]);
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [selectedValue, setValue] = useState("");
  const [selectedValueType, setValueType] = useState("");
  const [selectedValuePrblm, setValuePrblm] = useState("");
  const [selectedValueOrg, setValueOrg] = useState("");
  const [selectedValueDeptId, setValueDeptId] = useState("");
  const [depDropdown, setDepDropdown] = useState([]);
  const [depIds, setDepIds] = useState([]);
  const [selectValueDepIds, setselectValueDepIds] = useState("");
  const [deptID, setDepID] = useState("");
  const [finalDepId, setfinalDepId] = useState("");
  const [selectedOUDep, setSelectedOuDp] = useState([]);
  const [street, setStreet] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [country, setCountry] = useState("");
  const [postCode, setPostcode] = useState("");

  useEffect(() => {
    const willFocusSubscription = navigation.addListener("state", () => {
      resetAllStateData();
    });
    return willFocusSubscription;
  }, []);

  const resetAllStateData = () => {
    setfinalDepId("");
    setValueType("");
    setselectValueDepIds("");
    setValuePrblm("");
    setValue("");
    setValueOrg("");
    setServiceName("");
    setProblem("");
    setValueDeptId("");
    setDescription("");
    setAttachmentModalVisible(false);
    setContactPreference("CNT_PREF_PHONE");
    setFileAttachments([]);
    setLocation("");
    setLatitude("");
    setLongitude("");
  };

  const hideAttachmentModal = () => setAttachmentModalVisible(false);
  const showAttachmentModal = () => {
    if (fileAttachments.length < 5) {
      let totalSize = 0;
      fileAttachments.forEach((element) => {
        totalSize += element.fileSize;
      });
      if (totalSize < 25000000) {
        setAttachmentModalVisible(true);
      } else {
        Alert.alert(strings.attention, strings.max_file_size, [
          { text: strings.ok, onPress: () => {} },
        ]);
      }
    } else {
      Alert.alert(strings.attention, strings.max_number_of_file, [
        { text: strings.ok, onPress: () => {} },
      ]);
    }
  };

  const dispatch = useDispatch([
    fetchDetailsData,
    resetInquiry,
    getMyDashboardData,
    getMyTicketsData,
  ]);
  useEffect(() => {
    dispatch(fetchDetailsData("ORGANIZATION"));
    dispatch(fetchDetailsData("initial"));
    dispatch(fetchDetailsData("PROBLEM_CODE"));
  }, []);

  const fetchMyDashboardData = () => {
    dispatch(getMyDashboardData());
  };

  const fetchMyInteractionData = () => {
    dispatch(getMyTicketsData(() => {}));
  };

  const onServiceNameClick = (textStr) => {
    setServiceName(textStr.code);
    setfinalDepId("");
    setselectValueDepIds("");
    setValuePrblm("");
    setProblem("");
    setValueDeptId("");
    setfinalDepId("");
    onDepDropdown([]);
    setDepDropdown([]);
  };

  const onOrganizationNameClick = (textStr) => {
    console.log("enter fun", textStr);
    if (
      !enquilryDetailsData.initInquiry &&
      enquilryDetailsData?.organization &&
      enquilryDetailsData?.organization.length > 0
    ) {
      console.log("enter if case ", enquilryDetailsData?.organization);
      let selectedOUDep = enquilryDetailsData?.organization?.filter(
        (data) =>
          data?.status?.includes("AC") &&
          data?.unitType?.includes("DEPT") &&
          data?.isChat === "Y" &&
          // data?.langEng != "" &&
          // data?.langEng != null &&
          data?.parentUnit === textStr?.unitId
      );

      setSelectedOuDp(selectedOUDep);
      console.log("enter if case ", selectedOUDep);
      // console.log(
      //   "onOrganizationNameClick selectedOU" + JSON.stringify(selectedOU)
      // );
    }

    setOrganizationName(textStr?.unitDesc);
    setOrganizationItem(textStr);
    setfinalDepId("");
    setValueType("");
    setselectValueDepIds("");
    setValuePrblm("");
    setValue("");
    setServiceName("");
    setProblem("");
    setValueDeptId("");
    setDepDropdown([]);
  };

  const onProblemClick = (textStr) => {
    setProblem(textStr.code);
  };

  const onDepDropdown = (depIds) => {
    // console.log("deptids", depIds);
    console.log("selectedou", selectedOUDep);
    let finalArr = [];
    depIds.length > 0 &&
      selectedOUDep.length > 0 &&
      depIds.map((dep) => {
        console.log("enter deptID", dep);
        selectedOUDep.map((ouDepItem) => {
          if (ouDepItem.unitId == dep) {
            console.log("matching");
            finalArr.push({ description: ouDepItem.unitDesc, id: dep });
          }
        });
      });
    console.log("hiting dept on DepDropDown", finalArr);
    //directly setting
    if (finalArr.length == 1) {
      console.log("hiting inside", finalArr);
      setfinalDepId(finalArr[0]?.id);
    } else if (finalArr.length > 1) {
      console.log("hiting more", finalArr);
      setDepDropdown(finalArr);
    }
  };

  const onDescriptionChange = (textStr) => {
    setDescription(textStr);
  };
  const clearDescription = () => {
    setDescription("");
  };

  const locationIconClick = () => {
    navigation.navigate("SavedLocation", {
      onPlaceChosen,
      fromPage: "CreateEnquiry",
    });
  };
  const openCamara = () => {
    launchCamera(
      {
        mediaType: "photo|video",
        includeBase64: true,
        width: 1024,
        height: 1024,
        compressImageQuality: 1,
      },
      (response) => {
        hideAttachmentModal();
        if (response.didCancel) {
          console.log("User cancelled image picker");
          Toast.show({
            type: "bctError",
            text1: "User cancelled image picker",
          });
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
          Toast.show({
            type: "bctError",
            text1: "ImagePicker Error: " + response.error,
          });
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
          // alert(response.customButton);
        } else if (response?.errorCode) {
          let errorMsg = "";
          switch (response?.errorCode) {
            case "camera_unavailable":
              errorMsg = "Camara unavailable";

              break;
            case "permission":
              errorMsg = "Permission not grant";

              break;
            case "others":
              errorMsg = "Technical error";

              break;

            default:
              errorMsg = "Technical error";
              break;
          }
          Toast.show({
            type: "bctError",
            text1: errorMsg,
          });
        } else {
          // const source = { uri: response.uri };

          if (response?.assets[0]?.fileSize < 5000000) {
            setFileAttachments([
              ...fileAttachments,
              {
                fileType: response?.assets[0]?.type,
                fileName: response?.assets[0]?.fileName,
                fileSize: response?.assets[0]?.fileSize,
                uri: response?.assets[0]?.uri,
                base64: response?.assets[0]?.base64,
              },
            ]);
          } else {
            Toast.show({
              type: "bctError",
              text1: strings.max_per_file_size,
            });
          }
        }
      }
    );
  };
  const launchCamera1 = () => {
    // let options = {
    //   storageOptions: {
    //     skipBackup: true,
    //     path: "images",
    //     mediaType: "photo",
    //     includeBase64: true,
    //     maxHeight: 200,
    //     maxWidth: 200,
    //   },
    // };
    // if (Platform.OS === "ios") {

    // }

    check(PERMISSIONS.IOS.CAMERA)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            request(PERMISSIONS.IOS.CAMERA)
              .then((result) => {
                console.warn("point three", result);
                openCamara();
              })
              .catch((error) => console.log(error));

            break;
          case RESULTS.DENIED:
            request(PERMISSIONS.IOS.CAMERA)
              .then((result) => {
                console.warn("point w", result);
                openCamara();
              })
              .catch((error) => console.log(error));
            break;
          case RESULTS.LIMITED:
            console.log("The permission is limited: some actions are possible");
            break;
          case RESULTS.GRANTED:
            console.warn("greant", result);
            openCamara();

            break;
          case RESULTS.BLOCKED:
            console.log("The permission is denied and not requestable anymore");
            break;
        }
      })
      .catch((error) => {
        // …
      });

    // hideAttachmentModal();
  };

  const launchImageLibrary1 = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
        mediaType: "photo|video",
        includeBase64: true,
        maxHeight: 200,
        maxWidth: 200,
      },
    };
    launchImageLibrary(
      {
        mediaType: "photo|video",
        includeBase64: true,
        width: 1024,
        height: 1024,
        compressImageQuality: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
          Toast.show({
            type: "bctError",
            text1: "User cancelled image picker",
          });
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
          Toast.show({
            type: "bctError",
            text1: "ImagePicker Error: " + response.error,
          });
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
        } else if (response.errorCode) {
          Toast.show({
            type: "bctError",
            text1: "Technical Issue",
          });
        } else {
          if (response?.assets[0]?.fileSize < 5000000) {
            setFileAttachments([
              ...fileAttachments,
              {
                fileType: response?.assets[0]?.type,
                fileName: response?.assets[0]?.fileName,
                fileSize: response?.assets[0]?.fileSize,
                uri: response?.assets[0]?.uri,
                base64: response?.assets[0]?.base64,
              },
            ]);
          } else {
            Toast.show({
              type: "bctError",
              text1: strings.max_per_file_size,
            });
          }
        }
      }
    );
    hideAttachmentModal();
  };

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: "fullScreen",
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.xls,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
        ],
        allowMultiSelection: true,
        base64: true,
      });

      if (response[0]?.size < 5000000) {
        fileAttachments.push({
          fileType: response[0]?.type,
          fileName: response[0]?.name,
          fileSize: response[0]?.size,
          uri: response[0]?.uri,
          base64: await RNFS.readFile(response[0]?.uri, "base64"),
        });
        setFileAttachments(fileAttachments);
      } else {
        Toast.show({
          type: "bctError",
          text1: strings.max_per_file_size,
        });
      }
      hideAttachmentModal();
    } catch (err) {
      // console.warn(err);
    }
  }, []);

  const onPressPhone = () => {
    setContactPreference("CNT_PREF_PHONE");
  };

  const onPressMail = () => {
    setContactPreference("CNT_PREF_EMAIL");
  };

  const onPressWhatsApp = () => {
    setContactPreference("CNT_PREF_WA");
  };

  const onDeleteClicked = (key) => {
    Alert.alert(
      strings.attention,
      strings.are_you_sure_delete + " \n\n" + key,
      [
        {
          text: strings.cancel,
        },
        {
          text: strings.ok,
          onPress: () => {
            const newArray = fileAttachments?.filter(
              (data) => data?.fileName != key
            );
            setFileAttachments(newArray);
          },
        },
      ]
    );
  };

  const onSubmitComplaint = () => {
    if (
      servicename === "" ||
      description === "" ||
      location === "" ||
      contactPreference === "" ||
      selectedValuePrblm === ""
    ) {
      Alert.alert(strings.attention, strings.field_empty_alert, [
        { text: strings.ok, onPress: () => {} },
      ]);
    } else {
      const myArray = location.split(",").reverse();
      console.log("htting final finalDepId", finalDepId);
      const obj = {
        intxnType: "REQCOMP",
        serviceType: servicename,
        ticketDescription: description,
        inquiryCategory: "COMPLAINT",
        problem: problem,
        flatHouseUnitNo: "",
        block: "",
        building: "",
        street: street,
        road: "",
        district: district,
        state: state,
        village: "",
        cityTown: "",
        country: country,
        postCode: postCode,
        contactPreference: contactPreference,
        fileAttachments: fileAttachments,
        deptID: finalDepId,
        latitude: latitude,
        longitude: longitude,
      };
      TDLog("finalDepId ======== ", finalDepId);

      dispatch(createInquiry(obj, resetAllStateData));
    }
  };

  const onPlaceChosen = (params) => {
    console.warn("onplace choose ", params);
    // here is your callback function
    TDLog("onPlaceChosen create complaint", JSON.stringify(params));
    TDLog(
      "onPlaceChosen create complaint Params",
      params.street +
        "," +
        params.state +
        "," +
        params.district +
        "," +
        params.country +
        "," +
        params.postCode
    );
    setLocation(
      params.street +
        "," +
        params.state +
        "," +
        params.district +
        "," +
        params.country +
        "," +
        params.postCode
    );
    TDLog("onPlaceChosen create complaint location", location);
    setLatitude(params.latitude);
    setLongitude(params.longitude);
    setStreet(params.street);
    setState(params.state);
    setDistrict(params.district);
    setCountry(params.country);
    setPostcode(params.postCode);
  };

  const showSuccessMessage = (successMessage, interactionId) => {
    Alert.alert(strings.attention, successMessage, [
      {
        text: strings.navigatePost,
        onPress: () => {
          dispatch(resetInquiry());
          fetchMyDashboardData();
          fetchMyInteractionData();
          navigation.navigate("MyTicketsStack", {
            screen: "MyTicketDetails",
            params: {
              intxnId: interactionId,
              intxnType: "REQCOMP",
            },
          });
        },
      },
      {
        text: strings.close,
        onPress: () => {
          dispatch(resetInquiry());
          fetchMyDashboardData();
          fetchMyInteractionData();
          navigation.navigate("Dashboard", {});
        },
        style: "cancel",
      },
    ]);
  };
  const showErrorMessage = (errMessage) => {
    Alert.alert(
      strings.attention,
      errMessage + ". " + strings.please_try_later,
      [
        {
          text: strings.ok,
          onPress: () => {
            dispatch(resetInquiry());
          },
        },
      ]
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <Header Text={strings.createComplaint} navigation={navigation}></Header>

        {enquilryDetailsData?.initDetailsData ? (
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
        ) : !enquilryDetailsData?.isDetailsDataError ? (
          <ScrollView
            style={{ flexGrow: 1 }}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            <Text>{strings.inquiry_note}</Text>
            <View style={styles.EnquiryView}>
              {
                <View style={{ marginTop: spacing.HEIGHT_20 }}>
                  <CustomDropDown
                    selectedValue={selectedValueOrg}
                    setValue={setValueOrg}
                    data={
                      !enquilryDetailsData.initInquiry &&
                      enquilryDetailsData?.organization &&
                      enquilryDetailsData?.organization.length > 0
                        ? enquilryDetailsData?.organization?.filter(
                            (data) =>
                              data?.status?.includes("AC") &&
                              data?.unitType?.includes("OU") &&
                              data?.langEng != "" &&
                              data?.langEng != null
                          ) ?? []
                        : []
                    }
                    onChangeText={(text) => onOrganizationNameClick(text)}
                    value={organizationName}
                    placeHolder={strings.ouname + "*"}
                  />
                </View>
              }

              <View style={{ marginTop: spacing.HEIGHT_20 }}>
                <CustomDropDown
                  selectedValue={selectedValueType}
                  setValue={setValueType}
                  data={
                    !enquilryDetailsData.initInquiry
                      ? enquilryDetailsData?.DetailsDataData?.data?.PROD_TYPE?.filter(
                          (data) => {
                            let deptArr = [];
                            if (get(data, "mapping.ouDept.length", 0) > 0) {
                              deptArr = get(data, "mapping.ouDept", []).map(
                                (item) => item?.ouId || ""
                              );
                            }

                            return (
                              data?.mapping?.isMobile === "Y" &&
                              data?.mapping?.ticketType?.includes("REQCOMP") &&
                              deptArr.includes(organizationItem?.unitId)
                            );
                          }
                        ) ?? []
                      : []
                    // enquilryDetailsData?.DetailsDataData?.data?.PROD_TYPE ?? []
                  }
                  onChangeText={(text) => onServiceNameClick(text)}
                  value={servicename}
                  placeHolder={strings.sericeName + "*"}
                />
              </View>

              <View style={{ marginTop: spacing.HEIGHT_20 }}>
                <CustomDropDown
                  selectedValue={selectedValuePrblm}
                  setValue={setValuePrblm}
                  data={
                    !enquilryDetailsData.initInquiry
                      ? enquilryDetailsData?.problemCode?.PROBLEM_CODE?.filter(
                          (data) =>
                            data?.mapping?.serviceType?.includes(servicename) &&
                            data?.mapping?.isMobile === "Y" &&
                            data?.mapping?.ticketType?.includes("REQCOMP") &&
                            servicename != ""
                        ) ?? []
                      : []
                  }
                  onChangeText={(text) => {
                    setfinalDepId("");
                    onDepDropdown([]);

                    const depIdsTemp = get(text, "mapping.deptId", []);
                    // const depIdsTemp = [
                    //   "DPT0000001.OPU0000001.ORG0000001",
                    //   "DPT0000001.OPU0000001.ORG0000001",
                    // ];
                    //deptID set directly
                    onDepDropdown(depIdsTemp);
                    onProblemClick(text);
                  }}
                  value={problem}
                  placeHolder={strings.problemType + "*"}
                />
              </View>
              {depDropdown.length > 1 && (
                <View style={{ marginTop: spacing.HEIGHT_20 }}>
                  <CustomDropDown
                    selectedValue={selectedValueDeptId}
                    setValue={setValueDeptId}
                    data={
                      !enquilryDetailsData.initInquiry ? depDropdown ?? [] : []
                    }
                    onChangeText={(text) => {
                      setfinalDepId(text?.id);
                      setValueDeptId(text?.description);
                    }}
                    value={selectedValueDeptId}
                    placeHolder={strings.selectDepId + "*"}
                  />
                </View>
              )}

              <View style={{ marginTop: spacing.HEIGHT_15 }}>
                <EditText
                  onChangeText={(text) => onDescriptionChange(text)}
                  value={description}
                  placeHolder={strings.problem_description + "*"}
                  clearText={clearDescription}
                  multiline={true}
                  lines={2}
                  isClose={description.length > 0}
                />
              </View>
              <TouchableOpacity
                style={{ marginTop: 10 }}
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Text style={{ color: color.BCAE_PRIMARY }}>
                  {strings.view_desc}
                </Text>
              </TouchableOpacity>

              <AttachmentList
                attachmentList={fileAttachments}
                onDeleteClicked={onDeleteClicked}
              ></AttachmentList>
              <Pressable
                style={styles.textAttach}
                onPress={() => showAttachmentModal()}
              >
                <Text
                  style={{
                    color: color.INPUT_TEXT_BORDER,
                    fontSize: 14,
                    marginBottom: 5,
                  }}
                >
                  {strings.attachment + " (" + strings.optional + ")"}
                </Text>

                <Image
                  style={{
                    position: "absolute",
                    right: 5,
                    bottom: 5,
                    height: 20,
                    width: 20,
                    resizeMode: "cover",
                  }}
                  source={require("../../Assets/icons/attachment.png")}
                ></Image>
              </Pressable>

              <Pressable
                onPress={() => locationIconClick()}
                style={styles.textLocation}
              >
                <Text
                  style={{
                    color: location != "" ? color.BLACK : color.PLACEHOLDER,
                    fontSize: 14,
                    marginBottom: 5,
                    width: "95%",
                  }}
                  placeHolder={strings.location}
                >
                  {location || "Location"}
                </Text>
                <Image
                  style={{
                    position: "absolute",
                    right: 5,
                    bottom: 5,
                    height: 20,
                    width: 20,
                  }}
                  source={require("../../Assets/icons/map.png")}
                ></Image>
              </Pressable>

              <View style={styles.preference}>
                <Text style={{ color: color.BCAE_PRIMARY }}>
                  {strings.contact_pref}
                </Text>
                <View style={styles.preferenceImageline}>
                  <View style={styles.predImageBox}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={onPressPhone}
                    >
                      {contactPreference === "CNT_PREF_PHONE" && (
                        <ImageBackground
                          resizeMode="cover"
                          style={styles.selectedBackground}
                        >
                          <Image
                            style={styles.prefImgae}
                            source={require("../../Assets/icons/ic_call_selected.png")}
                          ></Image>
                          <Text style={styles.selectedText}>Phone</Text>
                        </ImageBackground>
                      )}
                      {contactPreference != "CNT_PREF_PHONE" && (
                        <ImageBackground
                          resizeMode="cover"
                          style={styles.normalBackground}
                        >
                          <Image
                            style={styles.prefImgae}
                            source={require("../../Assets/icons/ic_call_normal.png")}
                          ></Image>
                          <Text style={styles.normalText}>Phone</Text>
                        </ImageBackground>
                      )}
                    </TouchableOpacity>
                  </View>
                  <View style={styles.predImageBox}>
                    <TouchableOpacity activeOpacity={0.9} onPress={onPressMail}>
                      {contactPreference === "CNT_PREF_EMAIL" && (
                        <ImageBackground
                          resizeMode="cover"
                          style={styles.selectedBackground}
                        >
                          <Image
                            style={styles.prefImgae}
                            source={require("../../Assets/icons/ic_mail_selected.png")}
                          ></Image>
                          <Text style={styles.selectedText}>e-Mail</Text>
                        </ImageBackground>
                      )}
                      {contactPreference != "CNT_PREF_EMAIL" && (
                        <ImageBackground
                          resizeMode="cover"
                          style={styles.normalBackground}
                        >
                          <Image
                            style={styles.prefImgae}
                            source={require("../../Assets/icons/ic_mail_normal.png")}
                          ></Image>
                          <Text style={styles.normalText}>e-Mail</Text>
                        </ImageBackground>
                      )}
                    </TouchableOpacity>
                  </View>

                  <View style={styles.predImageBox}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={onPressWhatsApp}
                    >
                      {contactPreference === "CNT_PREF_WA" && (
                        <ImageBackground
                          resizeMode="cover"
                          style={styles.selectedBackground}
                        >
                          <Image
                            style={styles.prefImgae}
                            source={require("../../Assets/icons/ic_whatsapp_selected.png")}
                          ></Image>
                          <Text style={styles.selectedText}>Whatsapp</Text>
                        </ImageBackground>
                      )}
                      {contactPreference != "CNT_PREF_WA" && (
                        <ImageBackground
                          resizeMode="cover"
                          style={styles.normalBackground}
                        >
                          <Image
                            style={styles.prefImgae}
                            source={require("../../Assets/icons/ic_whatsapp_normal.png")}
                          ></Image>
                          <Text style={styles.normalText}>Whatsapp</Text>
                        </ImageBackground>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ marginTop: 40 }}>
                  {enquilryDetailsData.initInquiry ? (
                    <CustomActivityIndicator
                      size={buttonSize.LARGE}
                      bgColor={color.BLACK}
                      loderColor={color.WHITE}
                    />
                  ) : !enquilryDetailsData.initInquiry &&
                    !enquilryDetailsData.isInquiryError &&
                    enquilryDetailsData?.inquiryData ? (
                    enquilryDetailsData?.inquiryData?.status === "NEW" ? (
                      <View>
                        {showSuccessMessage(
                          strings.complaint_success,
                          enquilryDetailsData?.inquiryData?.interactionId
                        )}
                      </View>
                    ) : (
                      <Button
                        type={buttonType.PRIMARY}
                        size={buttonSize.LARGE}
                        label={strings.submitComplaint}
                        disabled={
                          servicename === "" ||
                          problem === "" ||
                          finalDepId === "" ||
                          description === "" ||
                          location === "" ||
                          contactPreference === ""
                            ? true
                            : false
                        }
                        bgColor={color.BCAE_PRIMARY}
                        textColor={color.WHITE}
                        textPro={{
                          color: color.WHITE,
                          fontSize: fontSizes.FONT_16,
                          fontWeight: "400",
                          lineHeight: spacing.HEIGHT_16,
                        }}
                        onPress={onSubmitComplaint}
                      />
                    )
                  ) : (
                    <View>
                      {showErrorMessage(
                        enquilryDetailsData?.inquiryData?.message
                      )}
                    </View>
                  )}
                </View>
                {/* <TouchableOpacity activeOpacity={0.5} onPress={() => clearFlag()}>
                <Image
                  style={[styles.rightArrow, styles.searchIcon]}
                  source={require("../../Assets/icons/ic_delete_red.png")}
                />
              </TouchableOpacity> */}
                <TouchableOpacity style={{ height: 50 }}></TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        ) : (
          <View style={{ alignItems: "center" }}>
            <Text style={styles.emptyList}>{strings.no_internet}</Text>
          </View>
        )}
      </View>
      <Modal
        animationType="fade"
        visible={attachmentModalVisible}
        mode="overFullScreen"
        onBackdropPress={() => {
          hideAttachmentModal();
        }}
        transparent={true}
        outsideClick={() => {
          if (attachmentModalVisible) {
            hideAttachmentModal();
          }
        }}
      >
        <View
          style={{
            marginTop: spacing.WIDTH_10 * 20,
            marginBottom: spacing.WIDTH_30 * 0.3,
            alignItems: "center",

            flexDirection: "row",
          }}
        >
          <View
            style={{
              alignItems: "center",
              flex: 1,

              flexDirection: "row",
              backgroundColor: color.BCAE_OFF_WHITE,
              borderRadius: 10,
              padding: 10,
            }}
          >
            <Pressable
              onPress={() => handleDocumentSelection()}
              style={{
                marginTop: spacing.HEIGHT_6,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "33%",
              }}
            >
              <Image
                style={styles.upperLogo}
                source={require("../../Assets/icons/documents.png")}
              />
              <Text style={styles.upperText}>{strings.document}</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                // hideAttachmentModal();
                launchCamera1();
              }}
              style={{
                marginTop: spacing.HEIGHT_6,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "33%",
              }}
            >
              <Image
                style={styles.upperLogo}
                source={require("../../Assets/icons/camera.png")}
              />
              <Text style={styles.upperText}>{strings.camera}</Text>
            </Pressable>

            <Pressable
              onPress={() => launchImageLibrary1()}
              style={{
                marginTop: spacing.HEIGHT_6,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "33%",
              }}
            >
              <Image
                style={styles.upperLogo}
                source={require("../../Assets/icons/gallery.png")}
              />
              <Text style={styles.upperText}>{strings.gallery}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Popup
        title={strings.view_desc}
        modalVisible={modalVisible}
        isOnlyCloseButton={true}
        setModalVisible={(status) => setModalVisible(status)}
        isFollowUpLoaing={false}
      >
        <Text
          style={{
            marginTop: 30,
            textAlign: "center",
            paddingVertical: spacing.HEIGHT_17,
          }}
        >
          {description}
        </Text>
      </Popup>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  HeaderView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
  EnquiryView: {
    flex: 1,
    backgroundColor: "white",
  },
  headingText: {
    fontSize: 12,
    color: "grey",
    marginTop: 15,
  },
  textInput: {
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: color.BCAE_PRIMARY,
  },
  textAttach: {
    marginTop: spacing.HEIGHT_20,
    borderBottomWidth: 1,
    borderBottomColor: color.INPUT_TEXT_BORDER,
    flexDirection: "row",
  },
  textLocation: {
    marginTop: spacing.HEIGHT_30,
    borderBottomWidth: 1,
    borderBottomColor: color.INPUT_TEXT_BORDER,
    flexDirection: "row",
  },
  preference: {
    marginTop: spacing.HEIGHT_20,
    //borderBottomWidth: 1,
    // borderBottomColor: color.INPUT_TEXT_BORDER,
    flexDirection: "column",
  },
  preferenceImageline: {
    marginTop: spacing.HEIGHT_5,
    // borderBottomWidth: 1,
    // borderBottomColor: color.INPUT_TEXT_BORDER,
    flexDirection: "row",
  },
  predImageBox: {
    height: 50,
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  prefImgae: {
    height: 25,
    width: 25,
    alignItems: "center",
  },
  prefText: {
    fontSize: 12,
    color: color.BLACK,
    alignItems: "center",
  },
  SubmitButton: {
    backgroundColor: color.BCAE_PRIMARY,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  emptyList: {
    fontSize: 20,
    color: color.BCAE_PRIMARY,
  },
  selectedBackground: {
    marginTop: 20,
    padding: 10,
    width: 100,
    height: 60,
    alignItems: "center",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "blue",
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    backgroundColor: color.BCAE_PRIMARY,
  },
  normalBackground: {
    marginTop: 20,
    padding: 10,
    width: 100,
    height: 60,
    alignItems: "center",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "white",
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    backgroundColor: color.WHITE,
  },
  selectedText: {
    fontSize: 14,
    fontWeight: "500",
    color: color.WHITE,
  },
  normalText: {
    fontSize: 14,
    fontWeight: "500",
    color: color.BLACK,
  },
  errorText: {
    color: color.ERROR_TEXT_RED,
    fontSize: fontSizes.FONT_14,
    fontWeight: "500",
    lineHeight: spacing.WIDTH_14,
  },
  upperLogo: {
    width: spacing.WIDTH_30,
    height: spacing.WIDTH_30,
  },
});
//make this component available to the app
export default CreateComplaint;
