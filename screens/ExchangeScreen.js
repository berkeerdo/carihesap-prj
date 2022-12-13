import React from "react";
import { Button, SafeAreaView } from "react-native";
import { Divider, Layout, Text } from "@ui-kitten/components";

export const ExchangeScreen = ({ navigation }) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text category="h1">Hareketler</Text>
      </Layout>
    </SafeAreaView>
  );
};
