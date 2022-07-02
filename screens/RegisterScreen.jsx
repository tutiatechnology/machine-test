import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Image, ImageBackground, Pressable, StyleSheet } from "react-native";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Input } from "react-native-elements";
import RadioButton from "react-native-radio-button";
import tw from "twrnc";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [value, setValue] = useState();
  const [gender, setGender] = useState();
  const [isFocus, setIsFocus] = useState(false);
  const [values, setValues] = useState({
    identifier: "",
    password: "",
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const handleLogin = () => {
    navigation.navigate("Drawer");
    // setError("");
    // for (const key in values) {
    //   if (!values[key]) {
    //     setPending(false);
    //     setError("Email and Password are required!");
    //     return;
    //   }
    // }
    // //    show loader instead of button
    // openDatabase().then((res) => {
    //   console.log("res", res);
    //   res.transaction((tx) => {
    //     // sending 4 arguments in executeSql
    //     tx.executeSql(
    //       "SELECT * FROM users",
    //       null, // passing sql query and parameters:null
    //       // success callback which sends two things Transaction object and ResultSet Object
    //       (txObj, { rows: { _array } }) => console.log("ar", _array),
    //       // failure callback which sends two things Transaction object and Error
    //       (txObj, error) => console.log("Error ", error)
    //     ); // end executeSQL
    //   }); // end transaction
    // });
    // setPending(true);
  };

  const data = [
    { label: "New York", value: "New York" },
    { label: "Tokyo", value: "Tokyo" },
    { label: "Paris", value: "Paris" },
    { label: "Madrid", value: "Madrid" },
    { label: "Istanbul", value: "Istanbul" },
    { label: "Kabul", value: "Kabul" },
    { label: "Berlin", value: "Berlin" },
    { label: "London", value: "London" },
  ];

  return (
    <ImageBackground
      source={require("../assets/fer.jpg")}
      resizeMode="cover"
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
    >
      <Text style={tw`text-20 text-white pb-7  `}>Sign up</Text>
      <Input
        placeholder={"Enter Name"}
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
        placeholder={"Enter Email"}
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
        placeholder={"Enter Mobile Number"}
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
        placeholder={"Enter Password"}
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
      <Dropdown
        data={data}
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        iconColor="white"
        search={false}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select City" : "..."}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
      <View
        style={{
          flexDirection: "row",
          width: "60%",
          justifyContent: "space-between",
          marginVertical: "5%",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <RadioButton
            animation="bounceIn"
            innerColor="white"
            outerColor="white"
            isSelected={gender === "male" ? true : false}
            onPress={() => setGender("male")}
          />
          <Text style={{ color: "white", marginLeft: "10%" }}>Male</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <RadioButton
            animation="bounceIn"
            innerColor="white"
            outerColor="white"
            isSelected={gender === "female" ? true : false}
            onPress={() => setGender("female")}
          />
          <Text style={{ color: "white", paddingLeft: "5%" }}>Female</Text>
        </View>
      </View>
      {pending ? (
        <ActivityIndicator color={"white"} size="large" />
      ) : (
        <TouchableOpacity onPress={handleLogin}>
          <Text
            style={{
              color: "white",
              backgroundColor: "rgba(0,0,0,0.5)",
              paddingHorizontal: "10%",
              paddingVertical: "3%",
              fontSize: 16,
              fontWeight: "bold",
              borderRadius: 5,
            }}
          >
            Signup
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
          Already have account?
        </Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              textDecorationLine: "underline",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Sign In
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    width: "60%",
    borderColor: "lightgrey",
    borderBottomWidth: 1.5,
    paddingHorizontal: 8,
    marginBottom: "5%",
  },
  icon: {
    marginRight: 5,
    color: "white",
  },

  placeholderStyle: {
    fontSize: 16,
    color: "white",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white",
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: "white",
  },
});
