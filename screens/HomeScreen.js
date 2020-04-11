import React, { useEffect, useState, Component } from "react";
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
import Carousel from "../components/Carousel";

import Axios from "axios";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    Axios.get("http://localhost:5000/disaster/isactive")
      .then((res) => {
        const data = res.data;
        console.log(res.data);
        this.setState({
          data: data,
        });
      })
      .catch((res) => {
        console.log("Error Retrieving Data");
      });
  }

  render() {
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
          <Carousel data={this.state.data} />
          <Text>Hello</Text>
        </Content>
      </Container>
    );
  }
}
export default HomeScreen;
