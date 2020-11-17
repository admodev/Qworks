import React from "react";
import { ScrollView, Text, View } from "react-native";
import * as firebase from "firebase";
import "firebase/database";

var itm = [];

export default class FiltroMenosTresEstrellasScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    firebase
      .database()
      .ref("calificaciones/")
      .orderByKey()
      .on("child_added", (snap) => {
        let items = [];
        snap.forEach((child) => {
          items.push({
            ratedUser: child.val().ratedUser,
            rating: child.val().rating,
          });
        });
      });

    console.log(itm.rating);
  }
  render() {
    return (
      <ScrollView>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Placeholder for changes...</Text>
        </View>
      </ScrollView>
    );
  }
}
