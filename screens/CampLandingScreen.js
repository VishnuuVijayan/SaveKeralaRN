import React, { useState, useEffect } from "react";
import { View, Text, Image, Dimensions, Linking } from "react-native";
import { Container, Content, Button, Icon } from "native-base";
import Header from "../components/Header";
import { camps } from "../data/camps";
import LoadingScreen from "./LoadingScreen";
const { width, height } = Dimensions.get("window");

export default function CampLandingScreen({ route, navigation }) {
  const [data, setData] = React.useState({});
  const [reqln, setreqln] = React.useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const { id } = route.params;
    getData(id);
    timer();
  }, []);

  const getData = async (id) => {
    setData(search(id, camps));
    const req = await data.requirements;
    setreqln(req.length);
  };

  function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].campId === nameKey) {
        return myArray[i];
      }
    }
  }

  function timer() {
    setTimeout(function () {
      setLoading(false);
    }, 2000);
  }

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <Container>
      <Header name="Camp Details" />
      <Content
        contentContainerStyle={{
          alignSelf: "center",
          width: "90%",
          marginTop: 30
        }}
      >
        <Text style={{ fontSize: 25, letterSpacing: 1 }}>{data.campName}</Text>
        <Text style={{ fontSize: 18, marginTop: 10 }}>
          {data.place + ", " + data.district}
        </Text>
        <Image
          style={{
            width,
            maxWidth: width - 20,
            height,
            maxHeight: height / 3,
            borderRadius: 10,
            marginTop: 30
          }}
          source={{ uri: data.image }}
        />
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 15 }}>
            Camp Officer Name : {data.campOfficerName}
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 15 }}>Contact : {data.contact}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 15 }}>
            Current Occupancy : {data.currentOccupancy}
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 15 }}>
            Maximum Occupancy : {data.maxOccupancy}
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 15 }}>
            Requirements :{" "}
            {data.requirements.map((item, index) => {
              if (index === reqln - 1) {
                return item;
              } else {
                return item + ", ";
              }
            })}
          </Text>
          <Button
            style={{
              borderRadius: 10,
              fontSize: 18,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20
            }}
            onPress={() => Linking.openURL(data.location)}
          >
            <Text style={{ color: "#fff" }}>View Location</Text>
            <Icon
              name="gps-fixed"
              type="MaterialIcons"
              style={{ marginLeft: 15, fontSize: 15 }}
            />
          </Button>
        </View>
      </Content>
    </Container>
  );
}
