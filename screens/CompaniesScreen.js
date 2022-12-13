import React from "react";
import { SafeAreaView, View } from "react-native";
import {
  Divider,
  Layout,
  Text,
  StyleService,
  List,
  Input,
  Card,
} from "@ui-kitten/components";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";

export const CompaniesScreen = ({ navigation }) => {
  const [value, setValue] = React.useState("");
  const [data, setData] = React.useState([]);

  const newData = new Array(3).fill({
    name: "Biye Teks",
    ammount: 2,
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
        <Text category="h6">{item.ammount}</Text>
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
