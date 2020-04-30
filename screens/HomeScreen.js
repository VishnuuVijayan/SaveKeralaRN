import React, { useEffect, useState, Component } from "react";
import { View, Image, StyleSheet } from "react-native";
// import Header from "../components/Header";
import {
  Container,
  Content,
  // Header,
  Left,
  Right,
  Icon,
  Body,
  Title,
  Button,
  Card,
  CardItem,
  Thumbnail,
  Text,
  DeckSwiper,
} from "native-base";
import Carousel from "../component/Carousel";
import { dummyData } from "../data/Data";
import { cards } from "../data/homecarddata";
import Header from "../component/Header";

import Axios from "axios";
import LoadingScreen from "./LoadingScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
// import { response } from "express";

function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    Axios.get("http://165.22.223.187:5000/disaster/")
      .then((res) => {
        const data = res.data;
        setData(data);
        setLoading(false);
        // console.log(data);
      })
      .catch((error) => console.log("Error"));
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return (
      // <View>
      <LoadingScreen />
      // </View>
    );
  }
  return (
    <Container>
      <Header name="Home" navigation={navigation} />
      <Content
      // contentContainerStyle={{
      //   flex: 1,
      //   justifyContent: "center",
      //   alignItems: "center",
      // }}
      >
        <Carousel data={data} />
        {cards.map((card) => (
          <TouchableOpacity
            key={card.key}
            onPress={() => navigation.navigate(card.btnRoute)}
          >
            <Card>
              <CardItem>
                <View style={{ width: 50, marginRight: 20 }}>
                  <Image source={{ uri: card.image }} style={styles.image} />
                </View>
                <Body
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <Text>{card.heading}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
            </Card>
          </TouchableOpacity>
        ))}
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
export default HomeScreen;
