import React, { useEffect } from "react";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./src/Redux/Store";
import MyStack from "./src/Navigation/MyStack";

import Toast from "react-native-toast-message";
import { ToastTemplete } from "./src/Components/ToastTemplete";
import { useNavigation } from "@react-navigation/native";
import { LogBox, SafeAreaView } from "react-native";

let navigation = useNavigation;

const toastConfig = {
  bctError: ({ text1, props }) => (
    <ToastTemplete bgColor="red" text={text1} type="error" />
  ),
  bctSuccess: ({ text1, props }) => (
    <ToastTemplete bgColor="green" text={text1} type="error" />
  ),
};
const App = () => {
  useEffect(() => {
    // LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
    // LogBox.ignoreAllLogs(); //Ignore all log notifications
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StoreProvider store={store}>
        <MyStack />

        <Toast config={toastConfig} position="bottom" bottomOffset={30} />
      </StoreProvider>
    </SafeAreaView>
  );
};

export default App;
