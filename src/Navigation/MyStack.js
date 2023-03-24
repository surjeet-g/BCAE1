import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "../Screens/Splash/Splash";
import Login from "../Screens/Login/Login";
import Register from "../Screens/Register/Register";
import EditProfile from "../Screens/EditProfile/EditProfile";
import BottomBarNavigation from "./BottomBarNavigation";
import ForgotPassword from "../Screens/ForgotPassword/ForgotPassword";
import SavedLocation from "../Screens/Location/SavedLocation";

import Location from "../Screens/Location/Location";
import AddLocation from "../Screens/Location/AddLocation";
import ShowWebPage from "../Screens/TabScreens/ShowWebPage";

import Anouncement from "../Screens/TabScreens/Announcement";
import ConfirmForgotPassword from "../Screens/ForgotPassword/ConfirmForgotPassword";
import Notification from "../Screens/TabScreens/Notification";
import ResetPassword from "../Screens/ForgotPassword/ResetPassword";
import About from "../Screens/TabScreens/About";
import InquiryNotification from "../Screens/TabScreens/InquiryNotification";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Splash"
          component={Splash}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Register with us"
          component={Register}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ForgotPassword"
          component={ForgotPassword}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="BottomBar"
          component={BottomBarNavigation}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="EditProfile"
          component={EditProfile}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SavedLocation"
          component={SavedLocation}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Location"
          component={Location}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="AddLocation"
          component={AddLocation}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ShowWebPage"
          component={ShowWebPage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Anouncement"
          component={Anouncement}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Notification"
          component={Notification}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ConfirmForgotPassword"
          component={ConfirmForgotPassword}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ResetPassword"
          component={ResetPassword}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="About"
          component={About}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="InquiryNotification"
          component={InquiryNotification}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MyStack;
