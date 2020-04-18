import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Axios from "axios";
import LoadingScreen from "../screens/LoadingScreen";
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Body,
  Title,
  ListItem,
  List,
  Text,
} from "native-base";

function HelpView() {
  const [collector, setCollector] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tahsildar, setTahsildar] = useState([]);

  const dataFetch = async () => {
    await Axios.get("http://165.22.223.187:5000/collectorlist/Palakkad")
      .then((res) => {
        const data = res.data;
        setCollector(data);
      })
      .catch((error) => console.log("Error"));
    await Axios.get("http://165.22.223.187:5000/tahsildarlist/Palakkad").then(
      (res) => {
        const data = res.data;
        setTahsildar(data);
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
    <Container style={{ margin: 10 }}>
      <Content>
        <List>
          <ListItem itemHeader first>
            <Text>District Collector</Text>
          </ListItem>
          <ListItem>
            <Text>
              {collector[0].collector_fname +
                " " +
                collector[0].collector_lname}
            </Text>
          </ListItem>

          <ListItem itemHeader>
            <Text>Tahsildar </Text>
          </ListItem>
          {tahsildar.map((item) => {
            return (
              <ListItem key={item.taluk}>
                <Text>{item.taluk}</Text>
              </ListItem>
            );
          })}
        </List>
      </Content>
    </Container>
  );
}

export default HelpView;
