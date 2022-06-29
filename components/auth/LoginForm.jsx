import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import tw from "twrnc";
import { openDatabase } from "../../db/connect";
export default function LoginForm() {
  const [values, setValues] = useState({
    identifier: "",
    password: "",
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const handleLogin = () => {
    setError("");
    for (const key in values) {
      if (!values[key]) {
        setPending(false);
        setError("Email and Password are required!");
        return;
      }
    }
    //    show loader instead of button
    openDatabase().then((res) => {
      console.log("res", res);
      res.transaction((tx) => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          "SELECT * FROM users",
          null, // passing sql query and parameters:null
          // success callback which sends two things Transaction object and ResultSet Object
          (txObj, { rows: { _array } }) => console.log("ar", _array),
          // failure callback which sends two things Transaction object and Error
          (txObj, error) => console.log("Error ", error)
        ); // end executeSQL
      }); // end transaction
    });
    setPending(true);
  };
  return (
    <View style={tw` max-w-full p-10 items-center justify-center`}>
      <Text style={tw`text-lg text-black `}>Login</Text>
      <TextInput
        onChangeText={(e) => {
          setValues({ ...values, identifier: e });
        }}
        value={values.identifier}
        placeholder="Email or Phone"
        dataDetectorTypes="all"
      />
      <TextInput
        onChangeText={(e) => {
          setValues({ ...values, password: e });
        }}
        value={values.password}
        placeholder="Password"
        secureTextEntry={true}
      />
      {pending ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity onPress={handleLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
      )}
      {error !== "" && <Text style={tw`text-red-500`}>{error}</Text>}
    </View>
  );
}
