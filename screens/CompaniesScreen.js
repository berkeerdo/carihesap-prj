import React, { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import {
  Divider,
  Layout,
  Text,
  StyleService,
  List,
  Input,
  Card,
  Modal,
  Button,
} from "@ui-kitten/components";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import { db } from "../db/config";
import { collection, getDocs, addDoc } from "firebase/firestore/lite";

export const CompaniesScreen = ({
  navigation,
  modalVisible,
  setModalVisible,
}) => {
  const [value, setValue] = React.useState("");
  const [data, setData] = React.useState([]);
  const [companyValue, setCompanyValue] = React.useState("");

  const GetData = async () => {
    const companyCol = collection(db, "company");
    const companySnapshot = await getDocs(companyCol)
      .then((snapshot) => {
        let companyList = [];
        snapshot.docs.forEach((doc) => {
          companyList.push({ ...doc.data(), id: doc.id });
        });
        setData(companyList);
      })
      .catch((err) => {
        console.log(err.messsage);
      });
  };

  const AddData = async () => {
    await addDoc(collection(db, "company"), {
      company_name: companyValue,
    });
    setCompanyValue("");
    GetData();
  };

  useEffect(() => {
    GetData();
  }, []);

  const renderItem = ({ item, index }) => (
    <Card style={[themedStyles.Card, { marginTop: 20 }]}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text category="h6">{item.company_name}</Text>
        <Text category="h6">{item.count}</Text>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider />
      <Layout style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 15 }}>
        <View>
          <Input
            placeholder="Arama"
            style={{ paddingBottom: 8 }}
            accessoryLeft={<FontAwesomeIcon name="search" size={20} />}
            onChangeText={(e) => setValue(e)}
          />
          <Button onPress={() => GetData()}>Yenile</Button>
        </View>
        <List
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={Divider}
          style={{
            marginTop: 20,
            borderRadius: 15,
            paddingHorizontal: 15,
          }}
        />
      </Layout>
      <Modal
        visible={modalVisible}
        backdropStyle={themedStyles.backdrop}
        onBackdropPress={() => setModalVisible(false)}
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card style={{ width: "90%", flex: 1, alignItems: "center" }}>
          <Text category="label" style={{ marginBottom: 5 }}>
            Şirket Adı
          </Text>
          <Input
            value={companyValue}
            onChangeText={(e) => setCompanyValue(e)}
            placeholder="Şirket Adı"
            style={{ width: "100%" }}
          />
          <Button
            size="small"
            style={{ marginTop: 10 }}
            onPress={() => {
              AddData();
              setModalVisible(false);
            }}
          >
            Ekle
          </Button>
        </Card>
      </Modal>
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
