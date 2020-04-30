import React from "react";
import { View, Text } from "react-native";
import {
  Container,
  Content,
  // Header,
  Right,
  Left,
  Title,
  Body,
  Icon,
  Button,
} from "native-base";
import Header from "../component/Header";

const SettingsScreen = ({ navigation }) => {
  return (
    <Container>
      <Header name="Settings" navigation={navigation} />
      <Content
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text> SettingsScreen</Text>
      </Content>
    </Container>
  );
};

export default SettingsScreen;
