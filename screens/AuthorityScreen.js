import React, { useState, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import {
  Container,
  Header,
  Icon,
  Button,
  Left,
  Right,
  Body,
  Title,
  Content,
  Card,
  CardItem,
} from "native-base";
import Axios from "axios";
import { setProvidesAudioData } from "expo/build/AR";
import LoadingScreen from "./LoadingScreen";

const { height } = Dimensions.get("window");

const AuthorityScreen = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dataFetch = async () => {
    const { id, type } = route.params;
    console.log(id);
    switch (type) {
      case "A": {
        await Axios.get(
          "http://165.22.223.187:5000/collectorlist/details/" + id
        )
          .then((res) => {
            const data = res.data;
            setData(data);
            console.log(data);
            setLoading(false);
          })
          .catch((err) => console.log("Error" + err));
      }
      case "B": {
        await Axios.get(
          "http://165.22.223.187:5000/tahsildarlist/details/" + id
        ).then((res) => {
          const data = res.data;
          setData(data);
          console.log(data);
          setLoading(false);
        });
      }
      case "C": {
        await Axios.get(
          "http://165.22.223.187:5000/secretary/details/" + id
        ).then((res) => {
          const data = res.data;
          setData(data);
          console.log(data);
          setLoading(false);
        });
      }
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }
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
        padder
        contentContainerStyle={{ flex: 1, justifyContent: "center" }}
      >
        <Card>
          <CardItem header bordered>
            <Text>NativeBase</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>
                NativeBase is a free and open source framework that enable
                developers to build high-quality mobile apps using React Native
                iOS and Android apps with a fusion of ES6.
              </Text>
            </Body>
          </CardItem>
          <CardItem footer bordered>
            <Text>GeekyAnts</Text>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default AuthorityScreen;
