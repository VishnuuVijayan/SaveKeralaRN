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
  const [loading, setLoading] = useState(true);
  const [collector, setCollector] = useState([]);
  const [tahsildar, setTahsildar] = useState([]);
  const [secretary, setSecretary] = useState([]);

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
      }
    );
    await Axios.get("http://165.22.223.187:5000/secretary/Palakkad").then(
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

          <ListItem itemHeader style={{ marginTop: 30 }}>
            <Text>Tahsildar </Text>
          </ListItem>
          {tahsildar.map((item) => {
            return (
              <ListItem key={item._id}>
                <Text>{item.taluk}</Text>
              </ListItem>
            );
          })}
          <ListItem itemHeader style={{ marginTop: 30 }}>
            <Text>Grama Panchayat Secretaries </Text>
          </ListItem>
          {secretary.map((item) => {
            return (
              <ListItem key={item._id}>
                <Text>{item.panchayat}</Text>
              </ListItem>
            );
          })}
        </List>
      </Content>
    </Container>
  );
}

export default HelpView;
