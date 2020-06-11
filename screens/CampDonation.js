import React from "react";
import { View, Text } from "react-native";
import { Container, Content } from "native-base";
import Header from "../components/Header";

export default function CampDonation({ navigation }) {
  return (
    <Container>
      <Header name="Donate to Camps" navigation={navigation} />
      <Content
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>Hello</Text>
      </Content>
    </Container>
  );
}
