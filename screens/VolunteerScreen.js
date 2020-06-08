import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Axios from "axios";
import { Container, Content, Item, Input, Picker, Icon } from "native-base";
import Header from "../components/Header";
import LoadingScreen from "./LoadingScreen";

export default function VolunteerRegn() {
  const [district, setDistrict] = React.useState("Select District...");
  const [districts, setDistricts] = React.useState([]);
  const [panchayat, setPanchayat] = React.useState("Select District...");
  const [localbodies, setLocalBodies] = React.useState([]);
  const [locality, setLocality] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [skills, setSkills] = React.useState("");
  const [bg, setBg] = React.useState("");
  const [dept, setDept] = React.useState("");
  const [readytovolunteer, setReadyToVolunteer] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const onSubmit = () => {
    // e.preventDefault();
    // const { user } = this.props.auth;
    // const { _id, email, first_name, last_name } = user;
    const {
      locality,
      contact,
      address,
      skills,
      bg,
      dept,
      readytovolunteer
    } = this.state;

    const newVolunteer = {
      locality,
      contact,
      address,
      skills,
      bg,
      dept,
      readytovolunteer
    };

    // Axios.post("/users/update/" + _id, newVolunteer).then((res) =>
    //   console.log(res.data)
    // );
  };

  const dataFetch = async () => {
    await Axios.get(
      "http://165.22.223.187:5000/tahsildarlist/list/districts"
    ).then((res) => {
      let datas = res.data;
      let uniqueDistricts = [];
      datas.map((data) => {
        if (uniqueDistricts.indexOf(data.district) === -1) {
          uniqueDistricts.push(data.district);
        }
        return 0;
      });
      setDistricts(uniqueDistricts);
    });
    Axios.get("http://165.22.223.187:5000/disaster/").then((res) => {
      let datas = res.data;
      setDisasters(datas);
    });
    setLoading(false);
  };

  useEffect(async () => {
    await dataFetch();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <Header name="Contact Details" />
      <Content>
        <Item picker>
          <Picker
            label="Select District.."
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: undefined }}
            placeholder="Select your SIM"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            selectedValue={district}
            onValueChange={(value) => setDistrict(value)}
          >
            <Picker.Item label="Select District..." value="0" />
            {districts.map((item) => {
              return <Picker.Item key={item} label={item} value={item} />;
            })}
          </Picker>
        </Item>
        <Item regular>
          <Input
            value={address}
            onChange={(val) => {
              setAddress(val.nativeEvent.text);
            }}
            placeholder="Regular Textbox"
          />
        </Item>
      </Content>
    </Container>
  );
}
