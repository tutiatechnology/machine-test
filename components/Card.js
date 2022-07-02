import React, { useCallback } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const size = Dimensions.get("window");

const Card = ({ image, companyName, year, rentalDaily }) => {
  return (
    <View style={styles.cart}>
      <View style={styles.row}>
        <Image source={image} style={styles.image} />
        <View style={styles.column}>
          <Text style={styles.title}>{companyName}</Text>
          <Text
            style={[styles.title, { color: "#a7aab0", alignSelf: "flex-end" }]}
          >
            {year}
          </Text>
          {/* <Text></Text> */}
        </View>
      </View>
      <View style={styles.rentButtonRow}>
        <View style={{ flexDirection: "row", marginLeft: 15, marginTop: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {rentalDaily}
          </Text>
          <Text style={{ color: "#a7aab0", fontSize: 16 }}>/day</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTitle}>Book now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cart: {
    justifyContent: "space-between",
    borderRadius: 20,
    backgroundColor: "white",
    height: size.height * 0.18,
    width: "92%",
    alignSelf: "center",
    margin: 10,
    shadowColor: "black",
    shadowOffset: { width: -20, height: 30 },
    shadowOpacity: 5,
    shadowRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  image: {
    height: size.height * 0.1,
    width: size.width * 0.3,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    justifyContent: "space-between",
    height: size.height * 0.1,
    padding: 10,
  },
  rentButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: "50%",
    height: size.height * 0.065,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "dodgerblue",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
  },
});
export default Card;
