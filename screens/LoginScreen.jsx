import { View, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import LoginForm from "../components/auth/LoginForm";

export default function LoginScreen() {
  useEffect(() => {
    // create table if not exist
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
