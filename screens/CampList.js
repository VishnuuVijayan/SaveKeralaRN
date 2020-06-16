import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  Container,
  Content,
  Icon,
  Card,
  Body,
  Right,
  CardItem,
  Left,
  Thumbnail,
  Button
} from "native-base";
import { camps } from "../data/camps";
import Header from "../components/Header";
export default function CampList({ navigation }) {
  return (
    <Container>
      <Header name="Camps" navigation={navigation} />
      <Content>
        <View
          style={{
            backgroundColor: "#eeeeee",
            height: 40,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Text
            style={{
              marginLeft: 20,
              fontSize: 18
            }}
          >
            Camps
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginRight: 30,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ fontSize: 18 }}>Filter</Text>
            <Icon
              name="filter"
              type="FontAwesome"
              style={{ fontSize: 15, marginLeft: 5 }}
            />
          </View>
        </View>
        {camps.map((item) => {
          return (
            <Card
              style={{ width: "90%", alignSelf: "center" }}
              key={item.campId}
            >
              <CardItem bordered>
                <Left>
                  <Thumbnail source={{ uri: item.image }} />
                  <Body>
                    <Text>{item.campName}</Text>
                    <Text note>{item.place + ", " + item.district}</Text>
                  </Body>
                </Left>
              </CardItem>

              <CardItem>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row"
                  }}
                  onPress={() =>
                    navigation.navigate("camp-landing-page", {
                      id: item.campId
                    })
                  }
                >
                  <Text>View Details</Text>
                  <Icon
                    name="doubleright"
                    type="AntDesign"
                    style={{ fontSize: 15, marginLeft: 5 }}
                  />
                </TouchableOpacity>
              </CardItem>
            </Card>
          );
        })}
      </Content>
    </Container>
  );
}
