import React, { useEffect, useState, Component } from "react";
import { View, Image, StyleSheet } from "react-native";
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
  Card,
  CardItem,
  Thumbnail,
  Text,
  DeckSwiper,
} from "native-base";
import Carousel from "../component/Carousel";
import { dummyData } from "../data/Data";
import { cards } from "../data/homecarddata";

import Axios from "axios";

function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:5000/disaster/isactive")
      .then((res) => {
        const data = res.data;
        setData(data);
        console.log(data);
      })
      .catch((err) => {
        console.log("Error recieving Data" + err.message);
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
        <Carousel data={dummyData} />
        {cards.map((card) => (
          <Card key={card.key}>
            <CardItem>
              <View style={{ width: 50, marginRight: 20 }}>
                <Image source={{ uri: card.image }} style={styles.image} />
              </View>
              <Text>{card.heading}</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
          </Card>
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
