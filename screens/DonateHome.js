import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import { Container, Content, Card, Left, CardItem, Body } from "native-base";
import Header from "../components/Header";
import Cmdrf from "../assets/cmdrf.png";

export default function DonateHome({ navigation }) {
  return (
    <Container>
      <Header name="Donate" navigation={navigation} />
      <Content style={{ margin: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate("campdonations")}>
          <Card>
            <CardItem>
              <Body>
                <Text style={{ fontSize: 20, marginBottom: 20 }}>
                  Contribute to Camps
                </Text>
                <Text note>
                  You can donate your valuable contributions to the camps
                  nearby.
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
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("cmdrf")}>
          <Card>
            <CardItem>
              <Body>
                <Text style={{ fontSize: 20, marginBottom: 20 }}>
                  Donate to CMDRF
                </Text>
                <Text note>
                  You can donate your best to Chief Minister's Distress Reief
                  Fund for fighting disasters that may occur in Kerala.
                </Text>
              </Body>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={Cmdrf}
                style={{ height: 200, width: null, flex: 1 }}
              />
            </CardItem>
          </Card>
        </TouchableOpacity>
      </Content>
    </Container>
  );
}
