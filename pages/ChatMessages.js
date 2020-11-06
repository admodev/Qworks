import React from "react";
import { Image, SafeAreaView, ScrollView } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as RootNavigation from "../RootNavigation.js";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/database";

var itm = [];

export default class MessagesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    let user = firebase.auth().currentUser;
    let id = user.uid;
    let dbRef = firebase
      .database()
      .ref("chats/")
      .orderByChild("id")
      .equalTo(id);
    dbRef.on("value", (snap) => {
      let items = [];
      snap.forEach((child) => {
        items.push({
          image: child.val().image,
          nombre: child.val().nombre,
          message: child.val().message,
          idAnuncio: child.val().id,
        });
      });
      itm = items;
      this.setState({ items: items });
      console.log(itm);
      console.log("itemstate " + this.state.items);
      itm.forEach((itms) => {
        console.log("title*" + itms.title);
      });
    });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          source={require("../assets/gradients/20x20.png")}
          style={{
            flex: 1,
            position: "absolute",
            resizeMode: "cover",
            width: "100%",
            height: "5%",
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.state.items.map((u, i) => {
            <ListItem key={i} bottomDivider>
              {image == null ? (
                <Avatar source={require("../assets/icon.png")} />
              ) : (
                <Avatar source={{ uri: u.image }} />
              )}
              <TouchableOpacity
                onPress={() => RootNavigation.navigate("ChatComponent")}
              >
                <ListItem.Content>
                  <ListItem.Title>{u.nombre}</ListItem.Title>
                  <ListItem.Subtitle>{u.message}</ListItem.Subtitle>
                </ListItem.Content>
              </TouchableOpacity>
            </ListItem>;
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
