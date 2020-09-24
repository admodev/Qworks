import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  Text,
  SafeAreaView,
} from "react-native";
import { Card } from "react-native-elements";

const OnboardingPage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card containerStyle={styles.card}>
          <Card.Image
            source={{
              uri:
                "https://i.picsum.photos/id/1/5616/3744.jpg?hmac=kKHwwU8s46oNettHKwJ24qOlIAsWN9d2TtsXDoCWWsQ",
            }}
            style={{ borderRadius: 50, margin: 30 }}
          />
          <Text
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 10,
              fontSize: 20,
              color: "#fff",
            }}
          >
            Alejandro Rodriguez, Redactor
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("ChatPage")}
            style={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              backgroundColor: "transparent",
            }}
          >
            <Text
              style={{ color: "#fff", marginLeft: "auto", marginRight: "auto" }}
            >
              Contratar
            </Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  card: {
    backgroundColor: "#483D8B",
    borderColor: "orange",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 1,
    shadowColor: "#000",
    borderRadius: 15,
    margin: 25,
    marginBottom: 100,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

export default OnboardingPage;
