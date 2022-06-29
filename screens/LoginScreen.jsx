import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { createUserTable } from "../db/user.db";

export default function LoginScreen() {
  useEffect(() => {
    // create table if not exist
    createUserTable();
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Login</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
