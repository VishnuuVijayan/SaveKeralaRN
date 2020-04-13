import React, { useEffect, useState, Component } from "react";
import { View, Text, Image } from "react-native";
// import Header from "../components/Header";
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Body,
  Title,
  Button,
} from "native-base";
import Carousel from "../component/Carousel";
import { dummyData } from "../data/Data";

import Axios from "axios";

function HomeScreen({ navigation }) {
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
          <Title> Home</Title>
        </Body>
        <Body />
        <Right />
      </Header>
      <Content
      // contentContainerStyle={{
      //   flex: 1,
      //   justifyContent: "center",
      //   alignItems: "center",
      // }}
      >
        <Carousel data={dummyData} />
        <Text>Hello</Text>
      </Content>
    </Container>
  );
}
export default HomeScreen;
