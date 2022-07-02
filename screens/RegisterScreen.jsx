import { useNavigation, StackActions } from "@react-navigation/native";
import { useContext, useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Input } from "react-native-elements";
import RadioButton from "react-native-radio-button";
import { API } from "../config";
import { Formik } from "formik";
import * as yup from "yup";
import tw from "twrnc";
import { userContext } from "../context/GlobalWrapper";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [isFocus, setIsFocus] = useState(false);
  const [pending, setPending] = useState(false);
  const [serverError, setServerError] = useState("");
  const context = useContext(userContext);

  const handleRegister = (values) => {
    Keyboard.dismiss();
    setServerError("");
    setPending(true);
    fetch(`${API}/signup`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          context.setUser(values);
          // reset to dashboard
          navigation.dispatch(StackActions.replace("Drawer"));
          return;
        } else {
          setServerError("Sorry, server error!");
        }
        setPending(false);
      })
      .catch((err) => {
        setServerError("Sorry, server error!");
        setPending(false);
      });
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
  const registerValidationSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("email is required."),
    name: yup.string("invalid name").required("name is required."),
    phone: yup.string().required("invalid phone.").min(6, "invalid phone"),
    password: yup
      .string()
      .required("Password is required.")
      .min(7, "Password at least 7 char."),
    gender: yup.string().required("gender is required."),
    city: yup.string().required("city is required."),
  });
  const ErrorComponent = ({ data }) => (
    <Text
      style={{
        color: "red",
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 3,
      }}
    >
      {data}
    </Text>
  );
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
      <Formik
        initialValues={{
          email: "",
          password: "",
          phone: "",
          name: "",
          gender: "",
          city: "",
        }}
        validationSchema={registerValidationSchema}
        onSubmit={handleRegister}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          setFieldValue,
        }) => (
          <>
            <Input
              placeholder={"Enter Name"}
              placeholderTextColor="white"
              inputStyle={{ color: "white" }}
              inputContainerStyle={{
                borderBottomColor: "white",
                width: "60%",
                alignSelf: "center",
              }}
              onChangeText={handleChange("name")}
              value={values.name}
              dataDetectorTypes="all"
            />
            {errors.name && <ErrorComponent data={errors.name} />}
            <Input
              placeholder={"Enter Email"}
              placeholderTextColor="white"
              inputStyle={{ color: "white" }}
              inputContainerStyle={{
                borderBottomColor: "white",
                width: "60%",
                alignSelf: "center",
              }}
              onChangeText={handleChange("email")}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && <ErrorComponent data={errors.email} />}

            <Input
              placeholder={"Enter Mobile Number"}
              placeholderTextColor="white"
              inputStyle={{ color: "white" }}
              inputContainerStyle={{
                borderBottomColor: "white",
                width: "60%",
                alignSelf: "center",
              }}
              onChangeText={handleChange("phone")}
              value={values.phone}
              dataDetectorTypes="phoneNumber"
              keyboardType="number-pad"
            />
            {errors.phone && <ErrorComponent data={errors.phone} />}

            <Input
              placeholder={"Enter Password"}
              placeholderTextColor="white"
              inputStyle={{ color: "white" }}
              inputContainerStyle={{
                borderBottomColor: "white",
                width: "60%",
                alignSelf: "center",
              }}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry={true}
            />
            {errors.password && <ErrorComponent data={errors.password} />}

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
              placeholder={!isFocus ? "Select City" : "..."}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              valueField="value"
              value={values.city}
              onChange={(item) => {
                console.log(item);
                setFieldValue("city", item.value);
                setIsFocus(false);
              }}
            />
            {errors.city && <ErrorComponent data={errors.city} />}

            <Text
              style={{
                color: "white",
                alignSelf: "flex-start",
                marginLeft: "20%",
                marginTop: "3%",
                fontSize: 15,
              }}
            >
              Select gender
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: "60%",
                justifyContent: "space-between",
                marginTop: "5%",
                marginBottom: "6%",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <RadioButton
                  animation="bounceIn"
                  innerColor="white"
                  outerColor="white"
                  isSelected={values.gender === "male" ? true : false}
                  onPress={() => setFieldValue("gender", "male")}
                />
                <Text style={{ color: "white", marginLeft: "10%" }}>Male</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <RadioButton
                  animation="bounceIn"
                  innerColor="white"
                  outerColor="white"
                  isSelected={values.gender === "female" ? true : false}
                  onPress={() => setFieldValue("gender", "female")}
                />
                <Text style={{ color: "white", paddingLeft: "5%" }}>
                  Female
                </Text>
              </View>
              {errors.gender && <ErrorComponent data={errors.gender} />}
            </View>
            {pending ? (
              <ActivityIndicator color={"white"} size="large" />
            ) : (
              <TouchableOpacity onPress={handleSubmit}>
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
          </>
        )}
      </Formik>
      {serverError !== "" && <ErrorComponent data={serverError} />}
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
