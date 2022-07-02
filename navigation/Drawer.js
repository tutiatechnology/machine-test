import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import HomeScreen from "../screens/HomeScreen";

const Drawer = createDrawerNavigator();

function DrawerNavigator(props) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, alignItems: "center", padding: "5%" }}>
            <Avatar
              size={225}
              rounded={true}
              source={require("../assets/fer.jpg")}
            />
            <Pressable
              style={{
                width: "100%",
                height: "6%",
                borderRadius: 5,
                backgroundColor: "red",
                marginTop: "10%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => console.log("pressed")}
            >
              <Text
                style={{ fontSize: 18, color: "white", fontWeight: "bold" }}
              >
                Logout
              </Text>
            </Pressable>
          </View>
        );
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Dashboard",
          headerTitleStyle: {
            fontSize: 22,
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
