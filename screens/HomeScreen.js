import React, { useEffect, useState } from "react";
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
import Swiper from "react-native-swiper";
// import { fetchUpdateAsync } from "expo/build/Updates/Updates";
import Axios from "axios";

function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);

  function fetchData() {}

  useEffect(() => {
    Axios.get("http://localhost:5000/disaster/isactive")
      .then((response) => {
        const data = response.data;
        setData(data);
        console.log(data);
      })
      .catch(() => {
        alert("Error Recieving Data");
      });
  }, []);

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
        <Swiper style={{ height: 200 }}>
          <View style={{ flex: 1 }}>
            <Image
              style={{
                height: null,
                flex: 1,
                width: null,
                resizeMode: "contain",
              }}
              source={{
                uri:
                  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            {/* {" "} */}
            <Image
              style={{
                height: null,
                flex: 1,
                width: null,
                resizeMode: "contain",
              }}
              source={{
                uri:
                  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            {/* {" "} */}
            <Image
              style={{
                height: null,
                flex: 1,
                width: null,
                resizeMode: "contain",
              }}
              source={{
                uri:
                  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
              }}
            />
          </View>
        </Swiper>
      </Content>
    </Container>
    // </View>
  );
}
export default HomeScreen;
