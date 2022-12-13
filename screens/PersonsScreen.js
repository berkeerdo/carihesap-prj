import React from "react";
import { SafeAreaView, View } from "react-native";
import {
  Divider,
  Layout,
  Text,
  Input,
  Card,
  StyleService,
  List,
} from "@ui-kitten/components";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";

export const PersonsScreen = ({ navigation }) => {
  const [value, setValue] = React.useState("");
  const [data, setData] = React.useState([]);

  const newData = new Array(8).fill({
    name: "Mahmut",
    company: "Biye Teks",
  });

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider />
      <Layout style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 15 }}>
        <Input
          placeholder="Arama"
          accessoryLeft={<FontAwesomeIcon name="search" size={20} />}
          onChangeText={(e) => setValue(e)}
        />
        <List
          data={newData}
          renderItem={renderItem}
          ItemSeparatorComponent={Divider}
          style={{
            marginTop: 20,
            borderRadius: 15,
            paddingHorizontal: 15,
          }}
        />
      </Layout>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  Card: {
    borderRadius: 15,
  },
});
