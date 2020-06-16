import React, { useState, useEffect } from "react";
import { View, Text, Image, Dimensions, ScrollView } from "react-native";
import {
  Container,
  Content,
  // Header,
  Right,
  Left,
  Title,
  Body,
  Icon,
  Button,
  Form,
  Item,
  Picker
} from "native-base";
import Header from "../components/Header";

import Axios from "axios";
import LoadingScreen from "./LoadingScreen";
import Accordion from "../components/Accordion";
import { DrawerActions } from "@react-navigation/native";
// import HelpView from "./HelpViewScreen";

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

    Axios.get("http://165.22.223.187:5000/tahsildarlist/list/districts").then(
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
    await Axios.get("http://165.22.223.187:5000/collectorlist/" + value).then(
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
      <Header name="Details" navigation={navigation} />
      <View style={{ margin: 10 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            marginTop: 25,
            marginBottom: 25
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
              fontWeight: "bold"
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
              borderRadius: 10
            }}
            source={{ uri: data.imgsrc }}
          />
          <View style={{ marginTop: 10 }}>
            <Accordion
              data={[
                {
                  title: "About " + data.disaster_name,
                  content: data.description
                }
              ]}
            />
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 40
              }}
            >
              <Text
                style={{
                  fontSize: 20
                }}
              >
                Need Help?
              </Text>
              <Text
                style={{
                  fontSize: 15
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
                return (
                  <Picker.Item
                    key={district}
                    label={district}
                    value={district}
                  />
                );
              })}
            </Picker>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20
              }}
            >
              <Button
                primary
                style={{
                  justifyContent: "center",
                  borderRadius: 5,
                  width: width / 3
                }}
                onPress={() =>
                  navigation.navigate("help", {
                    district: district
                  })
                }
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 17,
                    textTransform: "uppercase"
                  }}
                >
                  Get Help
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
}

export default DisasterScreen;
