import React from "react";
import { View, Text } from "react-native";
import { Container, Content } from "native-base";
import Header from "../components/Header";

const VolunteerScreen = ({ navigation }) => {
  return (
    <Container>
      <Header name="Volunteer Registeration" navigation={navigation} />
      <Content
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>Voluteer Screen</Text>
      </Content>
    </Container>
  );
};

export default VolunteerScreen;
