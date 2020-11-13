import React, { Component, useState, setState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, SocialIcon } from "react-native-elements";
import SearchInput, { createFilter } from "react-native-search-filter";

const KEYS_TO_FILTERS = ["u.name", "u.profession"];

export default class SearchFilterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
    };
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }
  render() {
    const filteredUsers = users.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../assets/gradients/20x20.png")}
            style={{
              flex: 1,
              position: "absolute",
              resizeMode: "cover",
              width: "100%",
              height: "100%",
            }}
          />
          <SearchInput
            onChangeText={(term) => {
              this.searchUpdated(term);
            }}
            style={styles.searchInput}
            placeholder="Buscar profesionales"
          />
          <ScrollView>
            {filteredUsers.map((user) => {
              return (
                <TouchableOpacity key={user.id} style={styles.userItem}>
                  <View>
                    <Image
                      source={user.user.photo}
                      style={{
                        width: 150,
                        height: 150,
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 30,
                        color: "#fff",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      {user.user.name}
                    </Text>
                    <Text style={styles.userProfession}>{user.profession}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  userItem: {
    borderWidth: 1,
    borderColor: "orange",
    margin: 15,
    padding: 10,
    borderRadius: 15,
  },
  userProfession: {
    color: "#fff",
    fontSize: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  searchInput: {
    paddingLeft: 100,
    paddingRight: 100,
    borderColor: "orange",
    borderWidth: 2,
    marginTop: 10,
    borderRadius: 15,
  },
});
