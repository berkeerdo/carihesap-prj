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

export const AddPersonScreen = ({ navigation }) => {
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
          existingUsers.push({ id: resultSet.insertId, name: name });
          setUsers(existingUsers);
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
                  placeholder="Firma"
                  onChangeText={(e) => setName(e)}
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
                  placeholder="Not"
                  onChangeText={(e) => setNote(e)}
                  size="small"
                />
              </View>
            </View>
          </Card>
        </ScrollView>
        <Button appearance="outline">Ekle</Button>
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
