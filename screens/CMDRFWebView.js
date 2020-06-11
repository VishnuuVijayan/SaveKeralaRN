import React from "react";
import { View } from "react-native";
import WebView from "react-native-webview";
import Header from "../components/Header";
import { Container } from "native-base";

export default function CMDRFWebView({ navigation }) {
  return (
    <Container>
      <Header name="CMDRF" navigation={navigation} />
      <WebView
        source={{
          uri: "https://donation.cmdrf.kerala.gov.in/"
        }}
        // style={{ marginTop: 20 }}
      />
    </Container>
  );
}
