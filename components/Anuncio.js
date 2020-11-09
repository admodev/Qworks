import React, { useState, setState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  Text,
} from "react-native";
import {
  Button,
  Card,
  Icon,
  Input,
  Overlay,
  Rating,
  AirbnbRating,
} from "react-native-elements";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import * as RootNavigation from "../RootNavigation.js";
import { StackActions } from "@react-navigation/native";
import CardsUsuarios from "./Cards";
import { concat } from "react-native-reanimated";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Updates from "expo-updates";

const AnuncioSeleccionado = ({ route }) => {
  let id = route.params.id;
  let routeParamsToString = id.toString();
  let image,
    nombre,
    apellido,
    actividad,
    emailPersonal,
    celular,
    descripcionPersonal,
    desde,
    diasHorarios,
    direccionDelLocal,
    emailLaboral,
    empresa,
    factura,
    hasta,
    local,
    localidad,
    matricula,
    nombreDeLaEmpresa,
    numeroDeMatricula,
    pisoDptoCasa,
    provincia,
    telefono;
  let dbRef = firebase
    .database()
    .ref("anuncios/")
    .orderByChild("id")
    .equalTo(id);
  let dbResult = dbRef.on("value", (snap) => {
    snap.forEach((child) => {
      key: child.key, (nombre = child.val().nombre);
      image = child.val().image;
      apellido = child.val().apellido;
      actividad = child.val().actividad;
      emailPersonal = child.val().emailPersonal;
      id = child.val().id;
      celular = child.val().celular;
      descripcionPersonal = child.val().descripcionPersonal;
      desde = child.val().desde;
      diasHorarios = child.val().diasHorarios;
      direccionDelLocal = child.val().direccionDelLocal;
      emailLaboral = child.val().emailLaboral;
      empresa = child.val().empresa;
      factura = child.val().factura;
      hasta = child.val().hasta;
      local = child.val().local;
      localidad = child.val().localidad;
    });
  });
  let storage = firebase.storage();
  let storageRef = storage.ref();
  let defaultImageRef = storageRef
    .child("defaultUserImage/icon.png")
    .toString();
  let userProfilePic = storageRef.child("userProfilePics/").child(id).child;
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  let userId = firebase.auth().currentUser.uid;

  function agregarFavorito(id) {
    firebase
      .database()
      .ref("anuncios/" + user.uid)
      .set({
        favoritos: [id],
      })
      .then(function () {
        Updates.reloadAsync();
      });
  }

  function calificarUsuario(rating) {
    firebase
      .database()
      .ref("anuncios/" + id)
      .set({
        calificacion: rating,
      })
      .then(function () {
        Updates.reloadAsync();
      });
  }

  let { rating } = 3;

  return (
    <SafeAreaView style={{ margin: 25, backgroundColor: "transparent" }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Card
          style={styles.card}
          containerStyle={{
            padding: 0,
            borderRadius: 15,
            backgroundColor: "transparent",
            borderWidth: 0,
          }}
        >
          <Image
            source={require("../assets/patron.jpg")}
            style={{
              flex: 1,
              position: "absolute",
              resizeMode: "cover",
              width: "100%",
              height: "100%",
              borderRadius: 10,
            }}
          />
          <Image
            source={require("../assets/gradients/20x20.png")}
            style={{
              flex: 1,
              position: "absolute",
              resizeMode: "cover",
              width: "100%",
              height: "100%",
              opacity: 0.9,
              borderRadius: 10,
            }}
          />
          <TouchableOpacity onPress={toggleOverlay}>
            {image == null ? (
              <Card.Image
                source={require("../assets/icon.png")}
                style={{
                  borderRadius: 100,
                  marginTop: 10,
                  marginBottom: 20,
                  marginLeft: 60,
                  marginRight: 60,
                }}
              />
            ) : (
              <Card.Image
                source={{ uri: image }}
                style={{
                  borderRadius: 100,
                  marginTop: 10,
                  marginBottom: 20,
                  marginLeft: 60,
                  marginRight: 60,
                }}
              />
            )}
          </TouchableOpacity>
          <Overlay
            isVisible={visible}
            onBackdropPress={toggleOverlay}
            overlayStyle={{ width: "85%", height: "85%", borderRadius: 10 }}
          >
            {image == null ? (
              <Card.Image
                source={require("../assets/icon.png")}
                style={{
                  borderRadius: 100,
                  marginTop: "auto",
                  marginBottom: "auto",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "100%",
                  height: "100%",
                }}
              />
            ) : (
              <Card.Image
                source={{ uri: image }}
                style={{
                  borderRadius: 100,
                  marginTop: "auto",
                  marginBottom: "auto",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "100%",
                  height: "100%",
                }}
              />
            )}
          </Overlay>
          <Text
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
              fontSize: 20,
              marginTop: 10,
              color: "#fff",
            }}
          >
            {nombre} {apellido}
          </Text>
          <Text
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 10,
              textAlign: "center",
              fontSize: 20,
              color: "#fff",
            }}
          >
            {actividad}
          </Text>
          <AirbnbRating
            showRating={true}
            reviews={["Malo", "Promedio", "Bueno", "Profesional", "Excelente"]}
            defaultRating={rating}
            type="star"
            onFinishRating={() => calificarUsuario(rating)}
            style={{
              margin: 10,
            }}
          />
          <Text
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 10,
              textAlign: "center",
              fontSize: 20,
              color: "#fff",
            }}
          >
            {emailPersonal}
          </Text>
          <TouchableOpacity onPress={() => agregarFavorito()}>
            <Text
              style={{
                color: "#fff",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 10,
                marginBottom: 10,
                fontSize: 20,
              }}
            >
              Favorito
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert("Proximamente...")}>
            <Text
              style={{
                color: "#fff",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 10,
                marginBottom: 10,
                fontSize: 20,
              }}
            >
              Ver Mapa
            </Text>
          </TouchableOpacity>
        </Card>
        <Card
          style={styles.card}
          containerStyle={{
            padding: 0,
            borderRadius: 15,
            backgroundColor: "transparent",
            borderWidth: 0,
          }}
        >
          <Image
            source={require("../assets/patron.jpg")}
            style={{
              flex: 1,
              position: "absolute",
              resizeMode: "cover",
              width: "100%",
              height: "100%",
              borderRadius: 10,
            }}
          />
          <Image
            source={require("../assets/gradients/20x20.png")}
            style={{
              flex: 1,
              position: "absolute",
              resizeMode: "cover",
              width: "100%",
              height: "100%",
              opacity: 0.9,
              borderRadius: 10,
            }}
          />
          <Text
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
              fontSize: 20,
              marginTop: 10,
              color: "#fff",
            }}
          >
            Celular: {celular}
          </Text>
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 10,
                textAlign: "center",
                fontSize: 20,
                color: "#fff",
              }}
            >
              Dias y horarios laborales:
            </Text>
            <Text
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 10,
                textAlign: "center",
                fontSize: 20,
                color: "#fff",
              }}
            >
              {diasHorarios.join(", ")}
            </Text>
          </View>
          <Text
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 10,
              textAlign: "center",
              fontSize: 20,
              color: "#fff",
            }}
          >
            Local: {direccionDelLocal}
          </Text>
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                color: "#fff",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 10,
                marginBottom: 10,
                fontSize: 20,
              }}
            >
              Email laboral:
            </Text>
            <Text
              style={{
                color: "#fff",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 10,
                marginBottom: 10,
                fontSize: 20,
              }}
            >
              {emailLaboral}
            </Text>
          </View>
          <Text
            style={{
              color: "#fff",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 10,
              marginBottom: 10,
              fontSize: 20,
            }}
          >
            Empresa {empresa}
          </Text>
          <Text
            style={{
              color: "#fff",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 10,
              marginBottom: 10,
              fontSize: 20,
            }}
          >
            Factura {factura}
          </Text>
          <Text
            style={{
              color: "#fff",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 10,
              marginBottom: 10,
              fontSize: 20,
            }}
          >
            Local {local}
          </Text>
          <Text
            style={{
              color: "#fff",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 10,
              marginBottom: 10,
              fontSize: 20,
            }}
          >
            Localidad
          </Text>
          <Text
            style={{
              color: "#fff",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 10,
              marginBottom: 10,
              fontSize: 20,
            }}
          >
            {localidad}
          </Text>
        </Card>
      </ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          margin: 10,
          position: "absolute",
          bottom: -120,
        }}
      >
        <Image
          source={require("../assets/gradients/20x20.png")}
          style={{
            flex: 1,
            position: "absolute",
            resizeMode: "cover",
            width: 320,
            height: 55,
            margin: 10,
            borderRadius: 5,
          }}
        />
        <View style={{ margin: 10, marginLeft: 20 }}>
          <Button
            title="Recomendar"
            titleStyle={{ fontSize: 12, marginBottom: 15 }}
            buttonStyle={{
              width: 120,
              height: 50,
              backgroundColor: "transparent",
            }}
          />
          <MaterialCommunityIcons
            name="account-group"
            color={"white"}
            size={22}
            style={{ position: "absolute", marginLeft: 40, marginTop: 22 }}
          />
        </View>
        <View style={{ margin: 10 }}>
          <Button
            title="Enviar Mensaje"
            onPress={() =>
              RootNavigation.navigate("ChatComponent", {
                userOne: firebase.auth().currentUser.uid,
                userTwo: routeParamsToString,
              })
            }
            titleStyle={{ fontSize: 12, marginTop: 15 }}
            buttonStyle={{
              width: 120,
              height: 50,
              backgroundColor: "transparent",
            }}
          />
          <Image
            source={require("../assets/icon.png")}
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              position: "absolute",
              marginTop: -45,
              marginLeft: 30,
            }}
          />
        </View>
        <View style={{ margin: 10 }}>
          <Button
            title="Comentar"
            onPress={() =>
              RootNavigation.navigate("ComentarScreen", { id: id })
            }
            titleStyle={{ fontSize: 12, marginTop: 15 }}
            buttonStyle={{
              width: 120,
              height: 50,
              backgroundColor: "transparent",
            }}
          />
          <MaterialCommunityIcons
            name="comment-multiple-outline"
            color={"white"}
            size={18}
            style={{ position: "absolute", marginLeft: 50, marginTop: 4 }}
          />
        </View>
      </View>
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
    marginTop: 50,
    backgroundColor: "#483D8B",
    shadowColor: "#000",
    borderRadius: 15,
    paddingTop: -5,
    paddingBottom: 2,
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

export default AnuncioSeleccionado;
