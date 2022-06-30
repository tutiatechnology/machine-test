import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ImageBackground, Pressable, Keyboard } from "react-native";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Input } from "react-native-elements";
import tw from "twrnc";
import { API } from "../../config";

export default function LoginForm() {
  const navigation = useNavigation();
  const [values, setValues] = useState({
    identifier: "",
    password: "",
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const handleLogin = () => {
    Keyboard.dismiss();
    setError("");
    for (const key in values) {
      if (!values[key]) {
        setPending(false);
        setError("Email and Password are required!");
        return;
      }
    }
    //    show loader instead of button
    fetch(`${API}/login`, {
      method: "POST",
      body: JSON.stringify({
        identifier: values.identifier,
        password: values.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (data?.data) {
        } else {
          setError("invalid credentials!");
        }
        setPending(false);
      })
      .catch((err) => {
        setError("invalid credentials!");
        setPending(false);
      });

    setPending(true);
  };
  return (
    <ImageBackground
      source={require("../../assets/fer.jpg")}
      resizeMode="cover"
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
    >
      <Text style={tw`text-24 text-white pb-10  `}>Login</Text>
      <Input
        placeholder={"Email or Phone No"}
        placeholderTextColor="white"
        inputStyle={{ color: "white" }}
        inputContainerStyle={{
          borderBottomColor: "white",
          width: "60%",
          alignSelf: "center",
        }}
        onChangeText={(e) => {
          setValues({ ...values, identifier: e });
        }}
        value={values.identifier}
        dataDetectorTypes="all"
      />
      <Input
        placeholder={"Password"}
        placeholderTextColor="white"
        inputStyle={{ color: "white" }}
        inputContainerStyle={{
          borderBottomColor: "white",
          width: "60%",
          alignSelf: "center",
        }}
        onChangeText={(e) => {
          setValues({ ...values, password: e });
        }}
        value={values.password}
        secureTextEntry={true}
      />
      {pending ? (
        <ActivityIndicator color={"white"} size="large" />
      ) : (
        <TouchableOpacity onPress={handleLogin}>
          <Text
            style={{
              color: "white",
              backgroundColor: "rgba(0,0,0,0.2)",
              paddingHorizontal: "10%",
              paddingVertical: "3%",
              fontSize: 16,
              fontWeight: "bold",
              borderRadius: 5,
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      )}
      {error !== "" && (
        <Text
          style={{
            marginTop: "5%",
            color: "red",
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "2%",
          }}
        >
          {error}
        </Text>
      )}
      <View
        style={{ flexDirection: "row", position: "absolute", bottom: "5%" }}
      >
        <Text style={{ color: "white", marginRight: "3%" }}>
          Don't have account?
        </Text>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text
            style={{
              textDecorationLine: "underline",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Signup
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}
