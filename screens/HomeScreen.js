import React from "react";
import { SafeAreaView, View } from "react-native";
import {
  Divider,
  Layout,
  Text,
  Card,
  useTheme,
  StyleService,
  Button,
} from "@ui-kitten/components";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialComIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const HomeScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 10 }}>
        <View
          style={[
            {
              borderWidth: 0.2,
              paddingVertical: 14,
              paddingHorizontal: 10,
              borderRadius: 15,
            },
          ]}
        >
          <Card style={[themedStyles.Card, { backgroundColor: "#99d98c" }]}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text category="h6">Alacak</Text>
              <View style={{ display: "flex", alignItems: "flex-end" }}>
                <Text category="s2">Eklemek için dokun</Text>
                <Text category="h5">₺ 0,00</Text>
              </View>
            </View>
          </Card>
          <Card
            style={[
              themedStyles.Card,
              { backgroundColor: "#f87171", marginTop: 20 },
            ]}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text category="h6">Borç</Text>
              <View style={{ display: "flex", alignItems: "flex-end" }}>
                <Text category="s2">Eklemek için dokun</Text>
                <Text category="h5">₺ 0,00</Text>
              </View>
            </View>
          </Card>
          <Card
            style={[
              themedStyles.Card,
              { backgroundColor: "#e7ecef", marginTop: 20, padding: 0 },
            ]}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text category="h6">Bakiye</Text>
              <Text>₺ 0,00</Text>
            </View>
          </Card>
        </View>

        <View style={{ padding: 20 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Button
              style={themedStyles.TabButton}
              onPress={() => navigation.navigate("Persons")}
              accessoryLeft={
                <FontAwesomeIcon name="users" size={16} color="white" />
              }
            >
              Kişiler
            </Button>
            <Button
              style={themedStyles.TabButton}
              onPress={() => navigation.navigate("Companies")}
              accessoryLeft={
                <MaterialComIcons
                  name="office-building"
                  size={20}
                  color="white"
                />
              }
            >
              Şirketler
            </Button>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Button
              style={themedStyles.TabButton}
              onPress={() => navigation.navigate("Exchange")}
              accessoryLeft={
                <FontAwesomeIcon name="exchange-alt" size={18} color="white" />
              }
            >
              Hareket
            </Button>
            <Button
              style={themedStyles.TabButton}
              onPress={() => navigation.navigate("Wallet")}
              accessoryLeft={
                <FontAwesomeIcon name="wallet" size={18} color="white" />
              }
            >
              Cüzdan
            </Button>
          </View>
        </View>
      </Layout>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  Card: {
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    borderRadius: 15,
  },
  TabButton: {
    width: 125,
  },
});
