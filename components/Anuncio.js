import React, { useState, setState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  Text,
  Platform,
} from "react-native";
import {
  Button,
  Card,
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
  let key, userId, comentario;
  var arr = [];
  let comentariosRef = firebase
    .database()
    .ref("comentarios/")
    .orderByKey()
    .on("value", function snapshotToArray(snapshot) {
      var returnArr = [];
      snapshot.forEach(function (childSnapshot) {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push({
          key: item.key,
          id: item.id,
          comentario: item.comentario,
        });
        arr = returnArr;
        console.log(arr);
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

  let user = firebase.auth().currentUser;

  function agregarFavorito(id) {
    firebase
      .database()
      .ref("favoritos/" + user.uid)
      .set({
        favoritos: id,
      })
      .then(function () {
        Updates.reloadAsync();
      });
  }

  let [rating, setRating] = useState("");

  function calificarUsuario(rating) {
    let ratingString = toString(rating);
    firebase
      .database()
      .ref("calificaciones/")
      .push({})
      .set({
        calificacion: ratingString,
      })
      .then(function () {
        Updates.reloadAsync();
      });
  }

  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        flex: 1,
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
        }}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{
          marginBottom: "30%",
        }}
      >
        {/* Card principal */}
        <Card
          style={styles.card}
          containerStyle={{
            ...Platform.select({
              android: {
                padding: 0,
                borderRadius: 15,
                backgroundColor: "transparent",
                borderWidth: 0,
                marginTop: "3%",
              },
              ios: {
                padding: 0,
                borderRadius: 15,
                backgroundColor: "transparent",
                borderWidth: 0,
                marginTop: "2%",
                height: "95%",
              },
            }),
          }}
        >
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
          <AirbnbRating
            showRating={true}
            reviews={["Malo", "Promedio", "Bueno", "Profesional", "Excelente"]}
            defaultRating={rating}
            type="star"
            onFinishRating={(rating) => setRating(rating)}
            style={{
              margin: 10,
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
          <Text
            style={{
              ...Platform.select({
                android: {
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: 10,
                  textAlign: "center",
                  fontSize: 20,
                  color: "#fff",
                },
                ios: {
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: 10,
                  textAlign: "center",
                  fontSize: 20,
                  color: "#fff",
                },
              }),
            }}
          >
            {localidad}
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
            {emailPersonal}
          </Text>
          <Text
            style={{
              ...Platform.select({
                android: {
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: 10,
                  textAlign: "center",
                  fontSize: 20,
                  color: "#fff",
                },
                ios: {
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: 10,
                  textAlign: "center",
                  fontSize: 20,
                  color: "#fff",
                },
              }),
            }}
          >
            Redes Sociales
          </Text>
          <TouchableOpacity onPress={() => agregarFavorito(id)}>
            <Text
              style={{
                ...Platform.select({
                  android: {
                    color: "#fff",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: 10,
                    marginBottom: 10,
                    fontSize: 20,
                  },
                  ios: {
                    color: "#fff",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: 10,
                    marginBottom: 10,
                    fontSize: 20,
                  },
                }),
              }}
            >
              Favorito
            </Text>
          </TouchableOpacity>
          <View
            style={{
              ...Platform.select({
                android: {
                  flex: 1,
                },
                ios: {
                  flex: 1,
                },
              }),
            }}
          >
            <TouchableOpacity onPress={() => alert("Proximamente...")}>
              <Text
                style={{
                  ...Platform.select({
                    android: {
                      color: "#fff",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: 10,
                      marginBottom: 10,
                      fontSize: 20,
                    },
                    ios: {
                      color: "#fff",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: 10,
                      marginBottom: 10,
                      fontSize: 20,
                    },
                  }),
                }}
              >
                Ubicación
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                ...Platform.select({
                  android: {
                    color: "#fff",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: 10,
                    marginBottom: 10,
                    fontSize: 20,
                  },
                  ios: {
                    color: "#fff",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: 10,
                    marginBottom: 10,
                    fontSize: 20,
                  },
                }),
              }}
            >
              Compartir
            </Text>
          </View>
        </Card>
        {/* Card detalles */}
        <Card
          style={styles.card}
          containerStyle={{
            ...Platform.select({
              android: {
                padding: 0,
                borderRadius: 15,
                backgroundColor: "transparent",
                borderWidth: 0,
                maxWidth: "150%",
                marginTop: "3%",
              },
              ios: {
                padding: 0,
                borderRadius: 15,
                backgroundColor: "transparent",
                borderWidth: 0,
                maxWidth: "200%",
                marginTop: "3%",
                height: "95%",
              },
            }),
          }}
        >
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
        {/* Card resúmen personal */}
        <Card
          style={styles.card}
          containerStyle={{
            ...Platform.select({
              android: {
                padding: 0,
                borderRadius: 15,
                backgroundColor: "transparent",
                borderWidth: 0,
                maxWidth: "150%",
                marginTop: "3%",
              },
              ios: {
                padding: 0,
                borderRadius: 15,
                backgroundColor: "transparent",
                borderWidth: 0,
                maxWidth: "100%",
                marginTop: "3%",
                height: "95%",
              },
            }),
          }}
        >
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
            Resúmen Personal:
          </Text>
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
            {descripcionPersonal}
          </Text>
        </Card>
        {/* Card comentarios */}
        <Card
          style={styles.card}
          containerStyle={{
            ...Platform.select({
              android: {
                padding: 0,
                borderRadius: 15,
                backgroundColor: "transparent",
                borderWidth: 0,
                maxWidth: "150%",
                marginTop: "3%",
              },
              ios: {
                padding: 0,
                borderRadius: 15,
                backgroundColor: "transparent",
                borderWidth: 0,
                maxWidth: "200%",
                marginTop: "3%",
                height: "95%",
              },
            }),
          }}
        >
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
            Comentarios
          </Text>
          {arr.map((u, i) => {
            return (
              <View key={i}>
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
                  {JSON.stringify(u.comentario)}
                </Text>
              </View>
            );
          })}
        </Card>
      </ScrollView>
      <View
        style={{
          ...Platform.select({
            android: {
              flex: 1,
              justifyContent: "space-around",
              flexDirection: "row",
              marginBottom: -20,
              marginLeft: 25,
              marginRight: 25,
              position: "absolute",
              bottom: "5%",
            },
            ios: {
              flex: 1,
              justifyContent: "space-around",
              flexDirection: "row",
              marginBottom: -20,
              marginLeft: 25,
              marginRight: 25,
              position: "absolute",
              bottom: -82,
            },
          }),
        }}
      >
        <Image
          source={require("../assets/gradients/20x20.png")}
          style={{
            flex: 1,
            position: "absolute",
            resizeMode: "cover",
            width: "115%",
            height: 55,
            margin: 10,
            borderRadius: 5,
          }}
        />
        <View style={{ margin: 10, marginLeft: 20 }}>
          <Button
            title="Recomendar"
            onPress={() => calificarUsuario()}
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
          {user == null ? (
            <Button
              title="Enviar Mensaje"
              onPress={() => alert("Debes ingresar para iniciar un chat!")}
              titleStyle={{ fontSize: 12, marginTop: 15 }}
              buttonStyle={{
                width: 120,
                height: 50,
                backgroundColor: "transparent",
              }}
            />
          ) : (
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
          )}
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
    ...Platform.select({
      ios: {
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
      android: {
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
    }),
  },
});

export default AnuncioSeleccionado;
