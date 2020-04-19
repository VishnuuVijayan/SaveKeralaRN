import React, { Component, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import DisasterScreen from "./screens/DisasterScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
// const Stack = createStackNavigator();
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import LoadingScreen from "./screens/LoadingScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "./RootNavigation";
import HelpView from "./component/HelpView";

const Drawer = createDrawerNavigator();

class AppNavigator extends Component {
  state = {
    loading: true,
  };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return <View></View>;
    }
    return (
      <NavigationContainer ref={navigationRef}>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" children={StackNavigator} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
        component={HomeScreen}
      />

      <Stack.Screen name="Test" component={HelpView} />
      <Stack.Screen
        name="Disaster"
        component={DisasterScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
    </Stack.Navigator>
  );
}

export default AppNavigator;
