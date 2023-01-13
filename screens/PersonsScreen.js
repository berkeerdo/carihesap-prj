import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import {
  Divider,
  Layout,
  Text,
  Input,
  Card,
  StyleService,
  List,
  Modal,
  Button,
} from "@ui-kitten/components";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import { db } from "../db/config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  where,
  query,
} from "firebase/firestore/lite";
import { onSnapshot } from "firebase/firestore";

export const PersonsScreen = ({ navigation, users }) => {
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [persons, setPersons] = React.useState([]);
  const [selectedPerson, setSelectedPerson] = React.useState([]);
  const [name, setName] = useState();
  const [company, setCompany] = useState();
  const [phone1, setPhone1] = useState();
  const [phone2, setPhone2] = useState();
  const [adress, setAdress] = useState();
  const [selectedId, setSelectedId] = useState();
  const [note, setNote] = useState(selectedPerson.note);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    GetData();
  }, []);

  const changes = () => {
    selectedPerson.map((item) => {
      setName(item.name);
      setAdress(item.adress);
      setCompany(item.company);
      setNote(item.note);
      setPhone1(item.phone1);
      setPhone2(item.phone2);
      setSelectedId(item.id);
    });
  };

  const GetParticularData = async (name) => {
    const colRef = collection(db, "persons");
    const q = query(colRef, where("name", "==", name));
    setLoading(true);
    await getDocs(q)
      .then((snapshot) => {
        let personList = [];
        snapshot.docs.forEach((doc) => {
          personList.push({ ...doc.data(), id: doc.id });
        });
        setSelectedPerson(personList);
        changes();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.messsage);
      });
  };

  const GetData = async () => {
    const personsCol = collection(db, "persons");
    await getDocs(personsCol)
      .then((snapshot) => {
        let personList = [];
        snapshot.docs.forEach((doc) => {
          personList.push({ ...doc.data(), id: doc.id });
        });
        setPersons(personList);
      })
      .catch((err) => {
        console.log(err.messsage);
      });
  };

  const DeleteData = async (id) => {
    const docRef = doc(db, "persons", id);
    await deleteDoc(docRef);
    GetData();
  };

  const handleEdit = async (id) => {
    const docRef = doc(db, "persons", id);

    const payload = {
      name: name,
      company: company,
      phone1: phone1,
      phone2: phone2,
      adress: adress,
      note: note,
    };

    setDoc(docRef, payload);
    GetData();
  };

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

        <ScrollView
          style={{
            marginTop: 20,
            borderRadius: 15,
            paddingHorizontal: 15,
            backgroundColor: "#F5F5F9",
          }}
        >
          {persons.map((item, index) => (
            <Card key={item.id} style={[themedStyles.Card, { marginTop: 20 }]}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text category="h6">{item.name}</Text>
                <View style={{ display: "flex", alignItems: "flex-end" }}>
                  <Text category="s2">Şirketi:</Text>
                  <Text category="h6">{item.company}</Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: 6,
                }}
              >
                <Button
                  size="small"
                  onPress={() => {
                    setModalVisible(true);
                    GetParticularData(item.name);
                  }}
                >
                  <Text>Görüntüle</Text>
                </Button>
                <Button size="small" onPress={() => DeleteData(item.id)}>
                  <Text>Sil</Text>
                </Button>
              </View>
            </Card>
          ))}
        </ScrollView>
        <Modal
          visible={modalVisible}
          backdropStyle={themedStyles.backdrop}
          style={themedStyles.modal}
          onBackdropPress={() => setModalVisible(false)}
        >
          {loading ? (
            <Card style={themedStyles.Card}>
              <Text>Loading...</Text>
            </Card>
          ) : (
            <Layout
              style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 15 }}
            >
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
                      <Text>{name}</Text>
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
                      <Text>{phone1}</Text>
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
                      <Text>{phone2}</Text>
                    </View>
                  </View>
                </Card>
                <Card style={[themedStyles.ModalCard]}>
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
                      <Text>{company}</Text>
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
                      <Text>{adress}</Text>
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
                      <Text>{note}</Text>
                    </View>
                  </View>
                </Card>
              </ScrollView>
            </Layout>
          )}
        </Modal>
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
  ModalCard: {
    borderRadius: 15,
  },
  CardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 2,
  },
  modal: {
    width: "80%",
    padding: 4,
  },
});
