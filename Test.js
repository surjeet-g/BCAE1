import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from "react-native";
const Test = () => {
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => {
          console.warn("httin");
        }}
      >
        <Text>Check permission</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Test;
