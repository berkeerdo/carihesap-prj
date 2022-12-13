import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "../screens/HomeScreen";
import { PersonsScreen } from "../screens/PersonsScreen";
import { CompaniesScreen } from "../screens/CompaniesScreen";
import { ExchangeScreen } from "../screens/ExchangeScreen";
import { WalletScreen } from "../screens/WalletScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Divider,
  StyleService,
  Button,
} from "@ui-kitten/components";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialComIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => {
  return (
    <>
      <Divider style={themedStyles.divider} />
      <BottomNavigation
        selectedIndex={state.index}
        onSelect={(index) => navigation.navigate(state.routeNames[index])}
      >
        <BottomNavigationTab
          icon={<FontAwesomeIcon name="users" size={18} />}
        />
        <BottomNavigationTab
          icon={<MaterialComIcons name="office-building" size={22} />}
        />
        <BottomNavigationTab
          icon={<MaterialIcons name="house" size={24} color="#0047AB" />}
        />
        <BottomNavigationTab
          icon={<FontAwesomeIcon name="exchange-alt" size={22} />}
        />
        <BottomNavigationTab
          icon={<FontAwesomeIcon name="wallet" size={22} />}
        />
      </BottomNavigation>
    </>
  );
};

const TabNavigator = () => (
  <Navigator
    initialRouteName={"Cari"}
    tabBar={(props) => <BottomTabBar {...props} />}
    screenOptions={({ navigation }) => ({
      headerTitleAlign: "center",
      headerStyle: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,

        elevation: 8,
      },
      headerLeft: () => (
        <Button
          onPress={() => navigation.navigate("Settings")}
          appearance="ghost"
          style={{ borderRadius: 100, marginLeft: 5 }}
        >
          <FontAwesomeIcon name="cog" size={20} style={{ marginLeft: 10 }} />
        </Button>
      ),
    })}
  >
    {/* <Screen name="Kisiler" options={{ headerTitle: "Kişiler" }} /> */}
    <Screen
      name="Persons"
      options={({ navigation }) => ({
        headerTitle: "Kişiler",
        headerRight: () => (
          <FontAwesomeIcon
            name="plus-circle"
            size={20}
            style={{ marginRight: 15 }}
          />
        ),
      })}
    >
      {(props) => <PersonsScreen {...props} />}
    </Screen>
    <Screen
      name="Companies"
      options={({ navigation }) => ({
        headerTitle: "Şirketler",
        headerRight: () => (
          <FontAwesomeIcon
            name="plus-circle"
            size={20}
            style={{ marginRight: 15 }}
          />
        ),
      })}
    >
      {(props) => <CompaniesScreen {...props} />}
    </Screen>
    <Screen name="Cari" options={{ headerTitle: "Cari Hesap Takip" }}>
      {(props) => <HomeScreen {...props} />}
    </Screen>
    <Screen name="Exchange" options={{ headerTitle: "Hareketler" }}>
      {(props) => <ExchangeScreen {...props} />}
    </Screen>
    <Screen name="Wallet" options={{ headerTitle: "Cüzdan" }}>
      {(props) => <WalletScreen {...props} />}
    </Screen>
    <Screen
      name="Settings"
      options={({ navigation }) => ({
        headerLeft: () => (
          <Button
            onPress={() => navigation.navigate("Cari")}
            appearance="ghost"
            style={{ borderRadius: 100, marginLeft: 5 }}
          >
            <FontAwesomeIcon name="angle-left" />
          </Button>
        ),
      })}
    >
      {(props) => <SettingsScreen {...props} />}
    </Screen>
  </Navigator>
);

export const BottomTabNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);

const themedStyles = StyleService.create({
  divider: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 0.4,

    elevation: 1,
  },
});
