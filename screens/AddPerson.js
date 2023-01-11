import React, { useState } from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import {
  Divider,
  Layout,
  Text,
  StyleService,
  Button,
  Input,
  Card,
} from "@ui-kitten/components";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import * as SQLite from "expo-sqlite";

export const AddPersonScreen = ({ navigation, users, setUsers, setActive }) => {
  const db = SQLite.openDatabase("mainDB.db");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone1, setPhone1] = useState(Number);
  const [phone2, setPhone2] = useState(Number);
  const [adress, setAdress] = useState("");
  const [note, setNote] = useState("");

  const addUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO names (name) values (?)",
        [name],
        (txObj, resultSet) => {
          let existingUsers = [...users];
          existingUsers.push({
            id: resultSet.insertId,
            name: name,
            phone1: phone1,
            phone2: phone2,
            company: company,
            adress: adress,
            note: note,
          });
          setUsers(existingUsers);
          setName("");
          setPhone1("");
          setPhone2("");
          setCompany("");
          setAdress("");
          setNote("");
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider />
      <Layout style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 15 }}>
        <ScrollView>
          <Card style={[themedStyles.Card]}>
            <View style={[themedStyles.CardContainer, {}]}>
              <FontAwesomeIcon
                name="user"
                size={24}
                style={{ marginRight: 10 }}
              />
              <View style={{ flex: 1 }}>
                <Text category="label" style={{ marginBottom: 5 }}>
                  Ad-Soyad
                </Text>
                <Input
                  value={name}
                  placeholder="Ad-Soyad"
                  onChangeText={(e) => setName(e)}
                  size="small"
                />
              </View>
            </View>
          </Card>
          <Card style={[themedStyles.Card]}>
            <View style={[themedStyles.CardContainer, {}]}>
              <FontAwesomeIcon
                name="phone"
                size={22}
                style={{ marginRight: 10 }}
              />
              <View style={{ flex: 1 }}>
                <Text category="label" style={{ marginBottom: 5 }}>
                  Telefon-1
                </Text>
                <Input
                  value={phone1}
                  placeholder="Telefon"
                  onChangeText={(e) => setPhone1(e)}
                  size="small"
                />
              </View>
            </View>
          </Card>
          <Card style={[themedStyles.Card]}>
            <View style={[themedStyles.CardContainer, {}]}>
              <FontAwesomeIcon
                name="phone"
                size={22}
                style={{ marginRight: 10 }}
              />
              <View style={{ flex: 1 }}>
                <Text category="label" style={{ marginBottom: 5 }}>
                  Telefon-2
                </Text>
                <Input
                  value={phone2}
                  placeholder="Telefon"
                  onChangeText={(e) => setPhone2(e)}
                  size="small"
                />
              </View>
            </View>
          </Card>
          <Card style={[themedStyles.Card]}>
            <View style={[themedStyles.CardContainer, {}]}>
              <FontAwesomeIcon
                name="building"
                size={24}
                style={{ marginRight: 10 }}
              />
              <View style={{ flex: 1 }}>
                <Text category="label" style={{ marginBottom: 5 }}>
                  Firma
                </Text>
                <Input
                  value={company}
                  placeholder="Firma"
                  onChangeText={(e) => setCompany(e)}
                  size="small"
                />
              </View>
            </View>
          </Card>
          <Card style={[themedStyles.Card]}>
            <View style={[themedStyles.CardContainer, {}]}>
              <FontAwesomeIcon
                name="map-marker-alt"
                size={24}
                style={{ marginRight: 10 }}
              />
              <View style={{ flex: 1 }}>
                <Text category="label" style={{ marginBottom: 5 }}>
                  Adres
                </Text>
                <Input
                  value={adress}
                  placeholder="Adres"
                  onChangeText={(e) => setAdress(e)}
                  size="small"
                />
              </View>
            </View>
          </Card>
          <Card style={[themedStyles.Card]}>
            <View style={[themedStyles.CardContainer, {}]}>
              <FontAwesomeIcon
                name="sticky-note"
                size={24}
                style={{ marginRight: 10 }}
              />
              <View style={{ flex: 1 }}>
                <Text category="label" style={{ marginBottom: 5 }}>
                  Not
                </Text>
                <Input
                  value={note}
                  placeholder="Not"
                  onChangeText={(e) => setNote(e)}
                  size="small"
                />
              </View>
            </View>
          </Card>
        </ScrollView>
        <Button
          onPress={() => {
            addUser();
            setActive(true);
            navigation.goBack();
          }}
          appearance="outline"
        >
          Ekle
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  Card: {
    borderRadius: 15,
    marginBottom: 10,
  },
  CardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
