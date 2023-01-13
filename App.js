import React, { useEffect, useState } from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { BottomTabNavigator } from "./navigation/BottomTabNavigator";
import { View, Text } from "react-native";

export default App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const LoadingComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Loading names...</Text>
      </View>
    );
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        {isLoading ? <LoadingComponent /> : <BottomTabNavigator />}
      </ApplicationProvider>
    </>
  );
};
