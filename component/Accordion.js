import React from "react";
import { View, Text } from "react-native";
import { Accordion } from "native-base";

const AccordionDS = ({ data }) => {
  return (
    <View>
      <Accordion
        dataArray={data}
        animation={true}
        headerStyle={{ backgroundColor: "#b7daf8" }}
        contentStyle={{ backgroundColor: "#ddecf8" }}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
      />
    </View>
  );
};

export default AccordionDS;
