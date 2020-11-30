import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import MessagesScreen from "./ChatMessages";

export default function UserMessagesList({ route, navigation }) {
    return(
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator="false">
                <MessagesScreen />
            </ScrollView>
        </SafeAreaView>
    );
}
