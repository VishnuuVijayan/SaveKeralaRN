import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Axios from "axios";
import LoadingScreen from "./LoadingScreen";
import moduleName from "react-native-vector-icons";
import Header from "../component/Header";
import {
  Container,
  Content,
  // Header,
  Left,
  Right,
  Body,
  Title,
  ListItem,
  List,
  Icon,
  Button,
  Text,
} from "native-base";
import { navigationRef } from "../RootNavigation";

function HelpView({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [collector, setCollector] = useState([]);
  const [tahsildar, setTahsildar] = useState([]);
  const [secretary, setSecretary] = useState([]);

  const dataFetch = async () => {
    const { district } = route.params;

    console.log(district);
    await Axios.get("http://165.22.223.187:5000/collectorlist/" + district)
      .then((res) => {
        const data = res.data;
        setCollector(data);
      })
      .catch((error) => console.log("Error"));
    await Axios.get(
      "http://165.22.223.187:5000/tahsildarlist/" + district
    ).then((res) => {
      const data = res.data;
      setTahsildar(data);
    });
    await Axios.get("http://165.22.223.187:5000/secretary/" + district).then(
      (res) => {
        const data = res.data;
        setSecretary(data);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    dataFetch();
    // setLoading(false);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <Header name="Get Help" navigation={navigation} />
      <Content>
        <List>
          <ListItem itemHeader first>
            <Text>District Collector</Text>
          </ListItem>
          <ListItem
            onPress={() =>
              navigation.navigate("contact", {
                id: collector[0]._id,
                type: "A",
              })
            }
            style={{ flex: 1, justifyContent: "space-between" }}
          >
            <Text>
              {collector[0].collector_fname +
                " " +
                collector[0].collector_lname}
            </Text>
            <Icon
              name="arrow-forward"
              style={{ color: "lightgrey", fontSize: 18 }}
            />
          </ListItem>

          <ListItem itemHeader style={{ marginTop: 30 }}>
            <Text>Tahsildar </Text>
          </ListItem>
          {tahsildar.map((item) => {
            return (
              <ListItem
                onPress={() =>
                  navigation.navigate("contact", {
                    id: item._id,
                    type: "B",
                  })
                }
                key={item._id}
                style={{ flex: 1, justifyContent: "space-between" }}
              >
                <Text>{item.taluk}</Text>
                <Icon
                  key={item._id}
                  name="arrow-forward"
                  style={{ color: "lightgrey", fontSize: 18 }}
                />
              </ListItem>
            );
          })}
          <ListItem itemHeader style={{ marginTop: 30 }}>
            <Text>Grama Panchayat Secretaries </Text>
          </ListItem>
          {secretary.map((item) => {
            return (
              <ListItem
                onPress={() =>
                  navigation.navigate("contact", {
                    id: item._id,
                    type: "C",
                  })
                }
                key={item._id}
                style={{ flex: 1, justifyContent: "space-between" }}
              >
                <Text>{item.panchayat}</Text>
                <Icon
                  name="arrow-forward"
                  style={{ color: "lightgrey", fontSize: 18 }}
                />
              </ListItem>
            );
          })}
        </List>
      </Content>
    </Container>
  );
}

export default HelpView;
