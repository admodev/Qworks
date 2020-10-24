import React from "react";

export default function AuthStateHook() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var email = user.email;
            var uid = user.uid;
            var providerData = user.providerData;
        } else {
            user == null;
        }
    });
}
