import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import GlobalWrapper from "./context/GlobalWrapper";
import LoginScreen from "./screens/LoginScreen";
import { useEffect } from "react";
import { openDatabase } from "./db/connect";
export default function App() {
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    openDatabase().then((res) => {
      res.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, count INT)"
        );
      });
    });
  }, []);
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <GlobalWrapper>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </GlobalWrapper>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
