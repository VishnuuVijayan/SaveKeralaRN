import React from "react";
import { View } from "react-native";
import {
  Header,
  Left,
  Right,
  Body,
  Text,
  Icon,
  Title,
  Button,
} from "native-base";
import * as RootNavigation from "../RootNavigation";

const AppHeader = (props) => {
  const navigation = props.navigation;
  return (
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
        <Title>{props.name}</Title>
      </Body>
      <Body />
      {props.type !== "A" ? (
        <Right>
          <Icon
            name="home"
            style={{ color: "#fff", paddingRight: 10 }}
            onPress={() => RootNavigation.navigate("Home")}
          />
        </Right>
      ) : null}
    </Header>
  );
};

export default AppHeader;
