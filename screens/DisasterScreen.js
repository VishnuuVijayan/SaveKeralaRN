import React, { useState, useEffect } from "react";
import { View, Text, Image, Dimensions } from "react-native";
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
  ListItem,
} from "native-base";
import Axios from "axios";
import LoadingScreen from "./LoadingScreen";
import Accordion from "../component/Accordion";

const { width, height } = Dimensions.get("window");

function DisasterScreen({ route, navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();

  async function dataFetch() {
    try {
      const { id } = route.params;
      console.log(id);
      await Axios.get("http://165.22.223.187:5000/disaster/details/" + id)
        .then((res) => {
          const data = res.data;
          setData(data);
          setLoading(false);
          console.log(data);
        })
        .catch((error) => console.log("Error"));
    } catch (e) {
      navigation.navigate("Home");
    }
  }

  useEffect(() => {
    dataFetch();
  }, []);
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <Container style={{ backgroundColor: "#fafafa" }}>
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
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 30, letterSpacing: 2, fontWeight: "bold" }}>
          {data.disaster_name}
        </Text>
        <Text
          style={{
            fontSize: 15,
            marginTop: 5,
            letterSpacing: 2,
            fontWeight: "bold",
          }}
        >
          {"(" + data.slug + ")"}
        </Text>

        <View style={{ marginTop: 20 }}>
          <Image
            style={{
              width,
              maxWidth: width - 20,
              height,
              maxHeight: height / 3,
              borderRadius: 10,
            }}
            source={{ uri: data.imgsrc }}
          />
          <View style={{ marginTop: 10 }}>
            <Accordion
              data={[
                {
                  title: "About " + data.disaster_name,
                  content: data.description,
                },
              ]}
            />
          </View>
        </View>
      </View>
    </Container>
  );
}

export default DisasterScreen;
