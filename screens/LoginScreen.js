import React from "react";
import { View, Text } from "react-native";
import { Container, Content } from "native-base";

const LoginScreen = () => {
  return (
    <Container>
      <Content
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>LoginScreen</Text>
      </Content>
    </Container>
  );
};

export default LoginScreen;
