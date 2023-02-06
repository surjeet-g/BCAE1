import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyTicketsDetails from "../Screens/TabScreens/MyTicketsDetails";
import MyTickets from "../Screens/TabScreens/MyTickets";

const Stack = createStackNavigator();

export default function MyTicketStack() {
  return (
    <Stack.Navigator initialRouteName="MyTickets">
      <Stack.Screen
        options={{ headerShown: false }}
        name="MyTickets"
        component={MyTickets}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="MyTicketDetails"
        component={MyTicketsDetails}
      />
    </Stack.Navigator>
  );
}
