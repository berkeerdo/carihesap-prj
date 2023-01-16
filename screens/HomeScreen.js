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
  Input,
  Modal,
} from "@ui-kitten/components";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialComIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { collection, addDoc, getDocs } from "firebase/firestore/lite";
import { db } from "../db/config";

export const HomeScreen = ({ navigation }) => {
  const theme = useTheme();
  const [activityName, setActivityName] = useState("");
  const [amount, setAmount] = useState(0);
  const [data, setData] = useState([]);
  const [alacakAmount, setAlacakAmount] = useState(0);
  const [borcAmount, setBorcAmount] = useState(0);
  const [byWho, setByWho] = useState("");
  const [borcModal, setBorcModal] = useState(false);
  const [alacakModal, setAlacakModal] = useState(false);
  const [totalAlacakAmount, setTotalAlacakAmount] = useState([]);
  const [totalBorcAmount, setTotalBorcAmount] = useState([]);

  useEffect(() => {
    GetData();
    data.map((item) => {
      if (item.activity_name === "alacak") {
        setTotalAlacakAmount([]);
        totalAlacakAmount.push(parseInt(item.amount));
        let sum = 0;
        for (let i = 0; i < totalAlacakAmount.length; i++) {
          sum += totalAlacakAmount[i];
        }
        setAlacakAmount(sum);
      }
      if (item.activity_name === "borc") {
        setTotalBorcAmount([]);
        totalBorcAmount.push(parseInt(item.amount));
        let borcSum = 0;
        for (let a = 0; a < totalBorcAmount.length; a++) {
          borcSum += totalBorcAmount[a];
        }
        setBorcAmount(borcSum);
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
      })
      .catch((err) => {
        console.log(err.messsage);
      });
  };

  const AddData = async () => {
    await addDoc(collection(db, "activities"), {
      activity_name: activityName,
      by_who: byWho,
      amount: amount,
    });
    if (activityName === "alacak") {
      setAlacakAmount(parseInt(alacakAmount) + parseInt(amount));
    } else if (activityName === "borc") {
      setBorcAmount(parseInt(borcAmount) + parseInt(amount));
    }
    setActivityName("");
    setAmount(0);
    setByWho("");
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
          <Card
            style={[themedStyles.Card, { backgroundColor: "#99d98c" }]}
            onPress={() => {
              setAlacakModal(true);
              setActivityName("alacak");
            }}
          >
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
            onPress={() => {
              setBorcModal(true);
              setActivityName("borc");
            }}
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
              <Text>₺ {alacakAmount - borcAmount}</Text>
            </View>
          </Card>
          <Button
            style={{ marginTop: 20 }}
            onPress={() => {
              GetData();
            }}
          >
            Yenile
          </Button>
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
          </View>
        </View>
        <Modal
          visible={alacakModal}
          backdropStyle={themedStyles.backdrop}
          onBackdropPress={() => setAlacakModal(false)}
          style={themedStyles.Modal}
        >
          <Card disabled={true}>
            <Text category="h6">Alacak</Text>
            <Input
              style={themedStyles.Input}
              placeholder="Ad"
              value={byWho}
              onChangeText={(e) => setByWho(e)}
            />
            <Input
              style={themedStyles.Input}
              placeholder="Amount"
              value={amount}
              onChangeText={(e) => setAmount(e)}
            />
            <Button
              onPress={() => {
                AddData();
                setAlacakModal(false);
              }}
            >
              Ekle
            </Button>
          </Card>
        </Modal>
        <Modal
          visible={borcModal}
          backdropStyle={themedStyles.backdrop}
          onBackdropPress={() => setBorcModal(false)}
          style={themedStyles.Modal}
        >
          <Card disabled={true}>
            <Text category="h6">Borc</Text>
            <Input
              style={themedStyles.Input}
              placeholder="Ad"
              value={byWho}
              onChangeText={(e) => setByWho(e)}
            />
            <Input
              style={themedStyles.Input}
              placeholder="Amount"
              value={amount}
              onChangeText={(e) => setAmount(e)}
            />
            <Button
              onPress={() => {
                AddData();
                setBorcModal(false);
              }}
            >
              Ekle
            </Button>
          </Card>
        </Modal>
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
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  Modal: {
    width: "80%",
  },
  Input: {
    marginVertical: 15,
  },
});
