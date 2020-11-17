import React from "react";
import { ScrollView, Text, View } from "react-native";

export default class FiltroMasTresEstrellasScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      search: "",
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("calificaciones/")
      .orderByKey()
      .once("value", (snap) => {
        let items = [];
        snap.forEach((child) => {
          items.push({
            refKey: child.val().key,
            ratedUser: child.val().ratedUser,
            rating: child.val().rating,
          });
        });
      });

    console.log(itm);
  }
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        {this.state.items.map((u, i) => {
          <View
            key={i}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ marginTop: "30%" }}>{u.ratedUser}</Text>
            <Text style={{ marginTop: "30%" }}>{u.rating}</Text>
          </View>;
        })}
      </ScrollView>
    );
  }
}
