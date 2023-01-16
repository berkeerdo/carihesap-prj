import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import {
  Divider,
  Layout,
  Text,
  Input,
  Card,
  StyleService,
  List,
  Button,
} from "@ui-kitten/components";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore/lite";
import { db } from "../db/config";

export const ExchangeScreen = ({ navigation }) => {
  const [value, setValue] = React.useState("");
  const [data, setData] = React.useState([]);
  const navigateBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    GetData();
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
      })
      .catch((err) => {
        console.log(err.messsage);
      });
  };

  const DeleteData = async (id) => {
    const docRef = doc(db, "activities", id);
    await deleteDoc(docRef);
    GetData();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider />
      <Layout style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 15 }}>
        <Button onPress={() => GetData()}>Yenile</Button>
        <ScrollView>
          {data.map((item, index) => (
            <Card
              key={item.id}
              style={[
                themedStyles.Card,
                {
                  marginTop: 20,
                  backgroundColor:
                    item.activity_name === "alacak" ? "#99d98c" : "#f87171",
                },
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
                <Text category="h6" style={{ textTransform: "capitalize" }}>
                  {item.activity_name}
                </Text>
                <View style={{ display: "flex", alignItems: "flex-end" }}>
                  <Text category="s2">Amount:</Text>
                  <Text category="h6">{item.amount}</Text>
                </View>
              </View>
              <View style={{ marginVertical: 5 }}>
                <Divider />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: 10,
                }}
              >
                <Text category="h6">Tarafından: </Text>
                <Text category="s1">{item.by_who}</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: 6,
                }}
              >
                <Button onPress={() => DeleteData(item.id)} size="small">
                  <Text>Sil</Text>
                </Button>
              </View>
            </Card>
          ))}
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  Card: {
    borderRadius: 15,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
