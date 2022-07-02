import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import React, { useContext, useEffect } from "react";
import { userContext } from "../context/GlobalWrapper";
import { Avatar } from "react-native-elements";
import Card from "../components/Card";
import Carousel from "react-native-reanimated-carousel";
import { Image } from "react-native";

const size = Dimensions.get("window");

export default function HomeScreen() {
  const user = useContext(userContext);

  useEffect(() => {
    console.log("User is ", user.getUser());
  }, []);

  const data = [
    {
      image: require("../assets/car2.png"),
      name: "Porche",
      rent: 2300,
      year: 2022,
    },
    {
      image: require("../assets/car1.jpeg"),
      name: "Toyota",
      rent: 1500,
      year: 2020,
    },
    {
      image: require("../assets/car3.png"),
      name: "Chevorlet",
      rent: 4500,
      year: 2021,
    },
    {
      image: require("../assets/car2.png"),
      name: "BMW",
      rent: 6300,
      year: 2022,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.welcomeRow}>
        <Avatar
          rounded={true}
          size={"large"}
          source={require("../assets/man.jpg")}
          containerStyle={{ elevation: 2 }}
        />
        <Text style={styles.welcomeText}>Welcome,{"\n"}Ahmad</Text>
      </View>
      <Text style={styles.productListText}>Product List</Text>
      <View style={styles.proudctListContainer}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <Card
              image={item.image}
              companyName={item.name}
              rentalDaily={item.rent}
              year={item.year}
            />
          )}
        />
      </View>
      <Text style={styles.productListText}>Offers List</Text>
      <Carousel
        mode="parallax-horizontal"
        width={size.width * 0.95}
        height={size.height * 0.15}
        data={data}
        renderItem={({ item }) => (
          <Image
            source={item.image}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  welcomeRow: {
    flexDirection: "row",
    marginTop: "5%",
    width: "100%",
    height: "10%",
    alignItems: "center",
    paddingLeft: "10%",
  },
  welcomeText: {
    marginLeft: "5%",
    fontSize: 18,
    fontWeight: "bold",
  },
  productListText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "5%",
    marginBottom: "1%",
  },
  proudctListContainer: {
    width: "100%",
    height: "52%",
  },
});
