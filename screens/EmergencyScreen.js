import React from "react";
import { View, Text } from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Picker,
  Icon,
} from "native-base";
import Header from "../component/Header";
import LoadingScreen from "./LoadingScreen";
import Axios from "axios";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

const EmergencyScreen = ({ navigation }) => {
  const [picker, setPicker] = React.useState("Select District...");
  const [secondPicker, setsecondPicker] = React.useState("Select category...");
  const [loading, setLoading] = React.useState(true);
  const [district, setDistrict] = React.useState("");
  const [districts, setDistricts] = React.useState([]);
  const [disaster, setDisaster] = React.useState("");
  const [disasters, setDisasters] = React.useState([]);
  const [service, setService] = React.useState("");
  const [location, setLocation] = React.useState();
  React.useEffect(() => {
    dataFetch();
    _getLocation();
  }, []);

  _getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      console.log("Permission Denied!!");
    }
    const userLocation = await Location.getCurrentPositionAsync();
    setLocation(userLocation);
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
      setDistrict(uniqueDistricts[0]);
    });
    Axios.get("http://165.22.223.187:5000/disaster/").then((res) => {
      let datas = res.data;
      setDisasters(datas);
    });
    setLoading(false);
  };
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <Container>
      <Header name="Emergency" navigation={navigation} />
      <Content style={{ margin: 20 }}>
        <Text style={{ fontSize: 20, letterSpacing: 1 }}>
          Report an Emergency
        </Text>
        <Form style={{ marginTop: 20 }}>
          <Item picker>
            <Picker
              label="Select District.."
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              placeholder="Select your SIM"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={picker}
              onValueChange={(value) => setPicker(value)}
            >
              <Picker.Item label="Select District..." value="0" />
              {districts.map((item) => {
                return <Picker.Item key={item} label={item} value={item} />;
              })}
            </Picker>
          </Item>
          <Item picker>
            <Picker
              label="Select District.."
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              placeholder="Select your SIM"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={secondPicker}
              onValueChange={(value) => setsecondPicker(value)}
            >
              <Picker.Item label="Select Disaster ..." value="0" />
              {disasters.map((item) => {
                return (
                  <Picker.Item
                    key={item._id}
                    label={item.disaster_name}
                    value={item.disaster_name}
                  />
                );
              })}
            </Picker>
          </Item>
          <Picker
            label="Select District.."
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: undefined }}
            placeholder="Select your SIM"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            selectedValue={service}
            onValueChange={(value) => setService(value)}
          >
            <Picker.Item label="Select Emergency ..." value="0" />

            <Picker.Item label="blah1" value="blah1" />
            <Picker.Item label="blah2" value="blah2" />
            <Picker.Item label="blah3" value="blah3" />
            <Picker.Item label="blah4" value="blah4" />
            <Picker.Item label="blah5" value="blah5" />
            <Picker.Item label="blah6" value="blah6" />
            <Picker.Item label="blah7" value="blah7" />
          </Picker>
          <Item floatingLabel last>
            <Label>Your Name...</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label>Phone Number...</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label>Exact Location...</Label>
            <Input />
          </Item>
        </Form>
      </Content>
    </Container>
  );
};

export default EmergencyScreen;
