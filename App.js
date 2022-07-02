import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import GlobalWrapper from "./context/GlobalWrapper";
import AppNavigation from "./navigation/AppNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <GlobalWrapper>
          <AppNavigation />
        </GlobalWrapper>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
