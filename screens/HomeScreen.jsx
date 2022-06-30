import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import { userContext } from "../context/GlobalWrapper";

export default function HomeScreen() {
  const user = useContext(userContext);

  useEffect(() => {
    console.log("User is ", user.getUser());
  }, []);
  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  );
}
