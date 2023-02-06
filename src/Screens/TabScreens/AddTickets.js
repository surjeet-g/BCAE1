import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { color } from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language/index";

const AddTickets = ({ route, navigation }) => {
  let login = useSelector((state) => state.login);
  return (
    <View style={styles.container}>
      <Text>{strings.welcome}</Text>
      <Text>{login?.loggedProfile?.data?.user?.firstName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(52,52,52,alpha)",
  },

  bottomView: {
    flex: 1,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
});
export default AddTickets;
