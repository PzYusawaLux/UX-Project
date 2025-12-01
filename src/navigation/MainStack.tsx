import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Onboarding1 from "../screens/Onboarding1";
import Onboarding2 from "../screens/Onboarding2";
import Onboarding3 from "../screens/Onboarding3";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import ForgotPassword from "../screens/ForgotPassword";
import Home from "../screens/Home";
import Search from "../screens/Search";
import TicketDetails from "../screens/TicketDetails";
import TicketCancel from "../screens/TicketCancel";
import MapScreen from "../screens/MapScreen";
import StationScreen from "../screens/StationScreen";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";
import Notifications from "../screens/Notifications";
import Help from "../screens/Help";
import FAQ from "../screens/FAQ";
import Support from "../screens/Support";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      <Stack.Screen name="Onboarding1" component={Onboarding1} />
      <Stack.Screen name="Onboarding2" component={Onboarding2} />
      <Stack.Screen name="Onboarding3" component={Onboarding3} />

      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="TicketDetails" component={TicketDetails} />
      <Stack.Screen name="TicketCancel" component={TicketCancel} />

      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="StationScreen" component={StationScreen} />

      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="FAQ" component={FAQ} />
      <Stack.Screen name="Support" component={Support} />

    </Stack.Navigator>
  );
}
