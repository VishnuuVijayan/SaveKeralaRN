import React from "react";
import { View, Text, Image } from "react-native";
import {
  Container,
  Content,
  Card,
  Thumbnail,
  Left,
  Right,
  CardItem,
  Body,
  Icon,
  Button
} from "native-base";
import Header from "../components/Header";

export default function DonateHome({ navigation }) {
  return (
    <Container>
      <Header name="Donate" navigation={navigation} />
      <Content style={{ margin: 20 }}>
        <Card>
          <CardItem>
            <Body>
              <Text style={{ fontSize: 20, marginBottom: 20 }}>
                Contribute to Camps
              </Text>
              <Text note>
                You can donate your valuable contributions to the camps nearby.
              </Text>
            </Body>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={{
                uri:
                  "https://www.pngitem.com/pimgs/m/422-4227285_camps-icon-camp-icon-hd-png-download.png"
              }}
              style={{ height: 200, width: null, flex: 1 }}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Text>Last Updated 18 hrs ago</Text>
            </Left>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}
