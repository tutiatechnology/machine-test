import { useNavigation, StackActions } from "@react-navigation/native";
import { useContext, useState } from "react";
import { userContext } from "../../context/GlobalWrapper";
import { ImageBackground, Pressable, Keyboard } from "react-native";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Input } from "react-native-elements";
import { Formik } from "formik";
import * as yup from "yup";
import tw from "twrnc";
import { API } from "../../config";

export default function LoginForm() {
  const navigation = useNavigation();
  const context = useContext(userContext);
  const [pending, setPending] = useState(false);
  const [serverError, setServerError] = useState("");
  // yup validation
  const loginValidationSchema = yup.object().shape({
    identifier: yup.string().when("isEmail", {
      is: "1",
      then: yup.string().email("invalid email").required("email is required."),
      otherwise: yup
        .string()
        .required("invalid phone.")
        .min(6, "invalid phone"),
    }),
    password: yup.string().required("Password is required."),
  });
  const handleLogin = (values) => {
    setPending(true);
    Keyboard.dismiss();
    setServerError("");
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
        const { data } = await res.json();
        if (data) {
          context.setUser(data);
          // reset to dashboard
          navigation.dispatch(StackActions.replace("Drawer"));
          return;
        } else {
          setServerError("invalid credentials!");
        }
        setPending(false);
      })
      .catch((err) => {
        console.error(err);
        setServerError("invalid credentials!");
        setPending(false);
      });
  };
  const ErrorComponent = ({ data }) => (
    <Text
      style={{
        marginTop: "5%",
        color: "red",
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: "2%",
        borderRadius: 3,
      }}
    >
      {data}
    </Text>
  );
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
      <Formik
        initialValues={{ identifier: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <Input
              placeholder={"Email or Phone No"}
              placeholderTextColor="white"
              inputStyle={{ color: "white" }}
              inputContainerStyle={{
                borderBottomColor: "white",
                width: "60%",
                alignSelf: "center",
              }}
              onChangeText={handleChange("identifier")}
              value={values.identifier}
              dataDetectorTypes="all"
              onBlur={handleBlur("identifier")}
            />
            {errors.identifier && <ErrorComponent data={errors.identifier} />}
            <Input
              placeholder={"Password"}
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

            {pending ? (
              <ActivityIndicator color={"white"} size="large" />
            ) : (
              <TouchableOpacity onPress={handleSubmit}>
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
            {serverError !== "" && <ErrorComponent data={serverError} />}
          </>
        )}
      </Formik>

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
