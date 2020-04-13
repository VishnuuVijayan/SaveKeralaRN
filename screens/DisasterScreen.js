import React from "react";
import { View, Text } from "react-native";
import {
  Container,
  Content,
  Header,
  Right,
  Left,
  Title,
  Body,
  Icon,
  Button,
} from "native-base";
// import Header from "../components/Header";

function DisasterScreen({ navigation }) {
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon
              name="ios-menu"
              style={{ color: "#fff" }}
              onPress={() => navigation.openDrawer()}
            />
          </Button>
        </Left>
        <Body>
          <Title>Details</Title>
        </Body>
        <Body />
        <Right>
          <Icon
            name="home"
            style={{ color: "#fff", paddingRight: 10 }}
            onPress={() => navigation.navigate("Home")}
          />
        </Right>
      </Header>
      <Content
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text> DisasterScreen</Text>
      </Content>
    </Container>
  );
}

export default DisasterScreen;
