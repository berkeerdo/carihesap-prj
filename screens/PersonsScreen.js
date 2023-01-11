import React, { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
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
import * as SQLite from "expo-sqlite";

export const PersonsScreen = ({ navigation, users }) => {
  const db = SQLite.openDatabase("mainDB.db");
  const [value, setValue] = React.useState("");
  const [data, setData] = React.useState([]);

  const listData = () => {
    setData(users.map((item) => item));
  };

  useEffect(() => {
    listData();
  }, []);

  const deleteUser = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM names WHERE id = ?",
        [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingNames = [...users].filter((user) => user.id !== id);
            setData(existingNames);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };

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
        <Text category="h6">{item.name}</Text>
        <View style={{ display: "flex", alignItems: "flex-end" }}>
          <Text category="s2">Şirketi:</Text>
          <Text category="h6">{item.company}</Text>
        </View>
      </View>
    </Card>
  );

  const showUsers = () => {
    return data.map((item, index) => {
      return (
        <View key={item.id}>
          <Text>{item.name}</Text>
          <Button onPress={() => deleteUser(item.id)}>Delete</Button>
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider />
      <Layout style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 15 }}>
        <Input
          placeholder="Arama"
          accessoryLeft={<FontAwesomeIcon name="search" size={20} />}
          onChangeText={(e) => setValue(e)}
        />
        {/* <List
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={Divider}
          style={{
            marginTop: 20,
            borderRadius: 15,
            paddingHorizontal: 15,
          }}
        /> */}
        {showUsers()}
      </Layout>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  Card: {
    borderRadius: 15,
  },
});
