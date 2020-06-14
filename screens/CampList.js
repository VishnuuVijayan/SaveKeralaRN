import React from "react";
import { View, Text } from "react-native";
import { Container, Content, Icon } from "native-base";
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
      </Content>
    </Container>
  );
}
