import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import {
  Container,
  // Header,
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
import Header from "../component/Header";

import { setProvidesAudioData } from "expo/build/AR";
import LoadingScreen from "./LoadingScreen";

const { height } = Dimensions.get("window");

const AuthorityScreen = ({ route, navigation }) => {
  const { id, type } = route.params;
  // const [collector, setCollector] = useState([]);
  const [data, setData] = useState([]);
  // const [secretary, setSeecretary] = useState([]);
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
        break;
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
        break;
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
        break;
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
      <Header name="Contact Details" />
      <Content
        padder
        contentContainerStyle={{ flex: 1, justifyContent: "center" }}
      >
        <Card>
          <CardItem header bordered>
            <Text
              style={{
                textTransform: "uppercase",
                fontSize: 22,
                letterSpacing: 2,
                textAlign: "center",
              }}
            >
              {type === "A"
                ? data.district + " District Collector Details"
                : type === "B"
                ? "Tahsildar Details"
                : "Grama Panchayat Secretary Details"}
            </Text>
          </CardItem>
          <CardItem bordered>
            {type === "A" ? (
              <Collector data={data} />
            ) : type == "B" ? (
              <Tahsildar data={data} />
            ) : (
              <Secretary data={data} />
            )}
          </CardItem>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("help", { district: data.district })
            }
          >
            <CardItem footer bordered style={{ justifyContent: "center" }}>
              <Text>Go Back</Text>
            </CardItem>
          </TouchableOpacity>
        </Card>
      </Content>
    </Container>
  );
};

const Collector = ({ data }) => {
  return (
    <Body>
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          letterSpacing: 1,
        }}
      >
        Collector Name : {data.collector_fname + " " + data.collector_lname}
      </Text>
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          letterSpacing: 1,
          marginTop: 10,
        }}
      >
        Contact Number : {data.contact}
      </Text>
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          letterSpacing: 1,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        E-mail : {data.email}
      </Text>
    </Body>
  );
};

const Tahsildar = ({ data }) => {
  return (
    <Body>
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          letterSpacing: 1,
        }}
      >
        Tahsildar Name : {data.t_fname + " " + data.t_lname}
      </Text>
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          letterSpacing: 1,
          marginTop: 10,
        }}
      >
        Contact Number : {data.contact}
      </Text>
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          letterSpacing: 1,
          marginTop: 10,
        }}
      >
        Taluk : {data.taluk}
      </Text>
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          letterSpacing: 1,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        District : {data.district}
      </Text>
    </Body>
  );
};

const Secretary = ({ data }) => {
  return (
    <Body>
      <Text
        style={{
          fontSize: 18,
          lineHeight: 25,
          letterSpacing: 1,
        }}
      >
        Secretary Name : {data.secratary_name}
      </Text>
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          letterSpacing: 1,
          marginTop: 10,
        }}
      >
        Contact Number : {data.contact}
      </Text>
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          letterSpacing: 1,
          marginTop: 10,
        }}
      >
        E-mail : {data.email}
      </Text>
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          letterSpacing: 1,
          marginBottom: 10,
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        Grama Panchayat : {data.panchayat}
      </Text>
    </Body>
  );
};

export default AuthorityScreen;
