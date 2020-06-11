import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Axios from "axios";
import {
  Container,
  Content,
  Item,
  Input,
  Picker,
  Icon,
  Button,
  Form,
  CheckBox
} from "native-base";
import Header from "../components/Header";
import LoadingScreen from "./LoadingScreen";

const bloodgroups = ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"];

export default function VolunteerRegn({ navigation }) {
  const [district, setDistrict] = React.useState("Select District...");
  const [districts, setDistricts] = React.useState([]);
  const [panchayat, setPanchayat] = React.useState("Select Panchayat");
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
      panchayat,
      district,
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

    setLoading(false);
  };

  const secondaryDataFecth = async () => {
    await Axios.get(
      "http://165.22.223.187:5000/secretary/panchayat_list/" + district
    ).then((res) => {
      let data = res.data;
      setLocalBodies(data);
    });
    setLoading(false);
    console.log(localbodies);
  };

  useEffect(() => {
    dataFetch();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <Header name="Volunteer Registeration" navigation={navigation} />
      <Content style={{ margin: 20 }}>
        <Text
          style={{
            // alignSelf:"center",
            fontSize: 20,
            letterSpacing: 1,
            marginBottom: 30
          }}
        >
          Register as Volunteer
        </Text>
        <Form onSubmit={onSubmit}>
          <Item regular style={{ marginBottom: 10, borderRadius: 10 }}>
            <Input
              keyboardType="number-pad"
              value={contact}
              onChange={(val) => {
                setContact(val.nativeEvent.text);
              }}
              placeholder="Enter contact number..."
            />
          </Item>
          <Item regular style={{ marginBottom: 10, borderRadius: 10 }}>
            <Input
              style={{ marginTop: 20 }}
              value={address}
              maxLength={200}
              onChange={(val) => {
                setAddress(val.nativeEvent.text);
              }}
              // numberOfLines={3}
              scrollEnabled={true}
              // multiline={true}
              placeholder="Address.."
            />
          </Item>
          <Item regular style={{ marginBottom: 10, borderRadius: 10 }}>
            <Input
              value={skills}
              onChange={(val) => {
                setSkills(val.nativeEvent.text);
              }}
              placeholder="Skills..."
            />
          </Item>
          <Item regular style={{ marginBottom: 10, borderRadius: 10 }}>
            <Input
              value={dept}
              onChange={(val) => {
                setDept(val.nativeEvent.text);
              }}
              placeholder="Department..."
            />
          </Item>
          <Picker
            label="Select District.."
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: undefined }}
            placeholder="Select your SIM"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            selectedValue={district}
            onValueChange={(value) => {
              setDistrict(value);

              setLoading(true);
              secondaryDataFecth();
            }}
          >
            <Picker.Item label="Select District..." value="0" />
            {districts.map((item) => {
              return <Picker.Item key={item} label={item} value={item} />;
            })}
          </Picker>
          <Picker
            label="Select Panchayat.."
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: undefined }}
            placeholder="Select your SIM"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            selectedValue={district}
            onValueChange={(value) => {
              setDistrict(value);
            }}
          >
            <Picker.Item label="Select Panchayat..." value="0" />
            {localbodies.map((item) => {
              return (
                <Picker.Item
                  key={item.panchayat}
                  label={item.panchayat}
                  value={item.panchayat}
                />
              );
            })}
          </Picker>

          <Picker
            label="Select Panchayat.."
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: undefined }}
            placeholder="Select your SIM"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            selectedValue={bg}
            onValueChange={(value) => {
              setBg(value);
            }}
          >
            <Picker.Item label="Select Blood Group..." value="0" />
            {bloodgroups.map((item) => {
              return <Picker.Item key={item} label={item} value={item} />;
            })}
          </Picker>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <CheckBox
              style={{ borderRadius: 10 }}
              checked={readytovolunteer}
              onPress={() => setReadyToVolunteer(!readytovolunteer)}
            />
            <Text style={{ marginLeft: 30, marginTop: 2 }}>
              Register as a volunteer?
            </Text>
          </View>
          <Button block info style={{ marginTop: 20, borderRadius: 10 }}>
            <Text style={{ color: "#fff", fontSize: 18 }}>Update Details </Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}
