import RNFetchBlob from "rn-fetch-blob";
import { Platform } from "react-native";
import FileViewer from "react-native-file-viewer";
import Share from "react-native-share";
import {
  PERMISSIONS,
  checkMultiple,
  requestMultiple,
} from "react-native-permissions";

export const ShareDoc = async (
  base64String,
  fileType = "image/png",
  fileName = "doc"
) => {
  if (Platform.OS !== "ios") {
    const shareOption = {
      url: "data:" + fileType + ";base64," + base64String,
      filename: fileName,
    };
    await Share.open(shareOption);
  } else {
    const dirs = RNFetchBlob.fs.dirs;
    const path = dirs.DocumentDir + "/" + fileName + ".png";
    RNFetchBlob.fs
      .writeFile(path, base64String, "base64")
      .then((result) => {
        Share.open({
          subject: "Document",
          url: path,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
};

export const downloadFile = async (base64Data, filesName = "sample.pdf") => {
  const fileArr = filesName.split(".");

  const ext = fileArr[1];

  const fileName = fileArr[0];

  const baseArr = base64Data.split("base64,");
  base64Data = baseArr[1];
  let fileType = baseArr[0];
  fileType = fileType.replace("data:", "");
  fileType = fileType.replace(";", "");
  await permission();
  let date = new Date();
  const { config, fs } = RNFetchBlob;

  const dirPath =
    Platform.OS === "ios"
      ? `${fs.dirs.DocumentDir}/bcae`
      : `${fs.dirs.DocumentDir}`;

  const filePath =
    dirPath +
    "/" +
    Math.floor(date.getTime() + date.getSeconds() / 2) +
    "." +
    ext;

  fs.writeFile(filePath, base64Data, "base64")
    .then(async (res) => {
      if (Platform.OS === "ios") {
        try {
          await ShareDoc(base64Data, fileType, fileName);
        } catch (err) {
          console.log("getting error while sharing");
        }
        return null;
      } else {
        RNFetchBlob.fs.scanFile([{ path: filePath, mime: fileType }]);
        const path = FileViewer.open(filePath, { showOpenWithDialog: true }) // absolute-path-to-my-local-file.
          .then(() => {
            console.log("point opened ");
            // success
          })
          .catch(async (error) => {
            // error
            try {
              await ShareDoc(base64Data, fileType, fileName);
            } catch (err) {
              console.log("getting error while sharing");
            }

            console.log("point error  ", error);
          });
      }

      return null;

      // Platform.OS === "android" &&
      // Alert.alert("success", "image Successfully downloaded!!");
    })
    .catch((err) => console.log("err", err));
};

const permission = async () => {
  const checkPermission = await checkMultiple(
    Platform.OS === "android"
      ? [
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ]
      : [PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY]
  );
  if (
    checkPermission["ios.permission.PHOTO_LIBRARY"] === "denied" ||
    checkPermission["ios.permission.PHOTO_LIBRARY_ADD_ONLY"] === "denied" ||
    checkPermission["android.permission.WRITE_EXTERNAL_STORAGE"] == "denied" ||
    checkPermission["android.permission.READ_EXTERNAL_STORAGE"] == "denied"
  ) {
    const requestPermission = await requestMultiple(
      Platform.OS === "android"
        ? [
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          ]
        : [
            PERMISSIONS.IOS.PHOTO_LIBRARY,
            PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
          ]
    );
  }
};
