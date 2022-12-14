import React, { useEffect, useState } from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { BottomTabNavigator } from "./navigation/BottomTabNavigator";
import * as SQLite from "expo-sqlite";
import { View, Text } from "react-native";

export default App = () => {
  const db = SQLite.openDatabase("mainDB.db");
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [currentName, setCurrentName] = useState(undefined);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS names (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)"
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM names",
        null,
        (txObj, resultSet) => setUsers(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

    setIsLoading(false);
  }, []);

  const LoadingComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Loading names...</Text>
      </View>
    );
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <BottomTabNavigator users={users} setUsers={setUsers} />
        )}
      </ApplicationProvider>
    </>
  );
};
