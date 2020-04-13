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

const Drawer = createDrawerNavigator();

class App extends Component {
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
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerStyle: {
                backgroundColor: "#f4511e",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Drawer.Screen
            name="disaster"
            component={DisasterScreen}
            options={{
              title: "Disaster Details",
              // title: 'My home',
              headerStyle: {
                backgroundColor: "#f4511e",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Drawer.Screen name="loading" component={LoadingScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
