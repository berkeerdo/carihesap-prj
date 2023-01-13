import React, { useEffect, useState } from "react";
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
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  where,
  query,
} from "firebase/firestore/lite";
import { db } from "../db/config";

export const HomeScreen = ({ navigation }) => {
  const theme = useTheme();
  const [activityName, setActivityName] = useState("");
  const [amount, setAmount] = useState(0);
  const [data, setData] = useState([]);
  const [alacakAmount, setAlacakAmount] = useState();
  const [borcAmount, setBorcAmount] = useState();

  useEffect(() => {
    GetData();
    data.map((item) => {
      if (item.activity_name === "alacak") {
        setAlacakAmount(item.amount);
      } else if (item.activity_name === "borc") {
        setBorcAmount(item.amount);
      }
    });
  }, []);

  const GetData = async () => {
    const colRef = collection(db, "activities");
    await getDocs(colRef)
      .then((snapshot) => {
        let exchangeList = [];
        snapshot.docs.forEach((doc) => {
          exchangeList.push({ ...doc.data(), id: doc.id });
        });
        setData(exchangeList);
        console.log(exchangeList);
      })
      .catch((err) => {
        console.log(err.messsage);
      });
  };

  const AddData = async () => {
    await addDoc(collection(db, "activities"), {
      activity_name: activityName,
      amount: amount,
    });
    setActivityName("");
    setAmount(0);
  };

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
                <Text category="h5">₺ {alacakAmount}</Text>
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
                <Text category="h5">₺ {borcAmount}</Text>
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
