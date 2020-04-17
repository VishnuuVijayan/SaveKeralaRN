import React, { useState, useEffect } from "react";
import { View, Text, Image, Dimensions, ScrollView } from "react-native";
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
  Form,
  Item,
  Picker,
} from "native-base";
import Axios from "axios";
import LoadingScreen from "./LoadingScreen";
import Accordion from "../component/Accordion";

const { width, height } = Dimensions.get("window");

function DisasterScreen({ route, navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [district, setDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [tahsidar, setTahsildar] = useState([]);
  const [collector, setCollector] = useState([]);

  async function dataFetch() {
    const { id } = route.params;
    await Axios.get("http://165.22.223.187:5000/disaster/details/" + id)
      .then((res) => {
        const data = res.data;
        setData(data);
      })
      .catch((error) => console.log("Error"));

    Axios.get("http://192.168.43.191:5000/tahsildarlist/list/districts").then(
      (res) => {
        let datas = res.data;
        let uniqueDistricts = [];
        datas.map((data) => {
          if (uniqueDistricts.indexOf(data.district) === -1) {
            uniqueDistricts.push(data.district);
          }
          return 0;
        });
        setDistricts(uniqueDistricts);
        setDistrict(uniqueDistricts[0]);
      }
    );
    setLoading(false);
  }

  const handlePickerChange = async (value) => {
    setDistrict(value);
    await Axios.get("http://192.168.43.191:5000/collectorlist/" + value).then(
      (res) => {
        const data = res.data;
        setCollector(data);
      }
    );
  };

  useEffect(() => {
    dataFetch();
    // console.log(district);
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
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            marginTop: 25,
            marginBottom: 25,
          }}
        >
          <Text style={{ fontSize: 35, letterSpacing: 2, fontWeight: "bold" }}>
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
        </View>
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
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 40,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                Need Help?
              </Text>
              <Text
                style={{
                  fontSize: 15,
                }}
              >
                Select your District
              </Text>
            </View>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined, marginTop: 30 }}
              placeholder="Select District"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={district}
              onValueChange={handlePickerChange}
            >
              {districts.map(function (district) {
                return <Picker.Item label={district} value={district} />;
              })}
            </Picker>
          </View>
        </View>
      </View>
    </Container>
  );
}

export default DisasterScreen;
