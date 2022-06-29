import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { createUserTable } from "../db/user.db";
import LoginForm from "../components/auth/LoginForm";

export default function LoginScreen() {
  useEffect(() => {
    // create table if not exist
    createUserTable();
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <LoginForm />
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
