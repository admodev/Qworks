import React, { useState, useEffect, setState } from "react";
import { Image, View, Platform, ScrollView, TextInput } from "react-native";
import {
  Badge,
  Button,
  CheckBox,
  Input,
  SocialIcon,
  Text,
} from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

const AnunciatePage = ({ navigation }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert(
            "Perdón, necesitamos tu permiso para que puedas subir una foto!"
          );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <View style={{ flex: 1 }}>
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
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
          }}
        >
          <Text h3 style={{ color: "#fff" }}>
            Foto
          </Text>
          <Button
            buttonStyle={{ marginTop: 10, backgroundColor: "#F4743B" }}
            title="Subir foto"
            onPress={pickImage}
          />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
          }}
        >
          <Text h3 style={{ color: "#fff" }}>
            Información Personal
          </Text>
          <Input placeholder="Nombre" />
          <Input placeholder="Apellido" />
          <Input placeholder="Email Personal" />
          <Input placeholder="Domicilio" />
          <Input placeholder="Piso / Dpto / Casa" />
          <Input placeholder="CUIL / CUIT" />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
          }}
        >
          <Text h3 style={{ color: "#fff" }}>
            Información Laboral
          </Text>
          <Input placeholder="Actividad" />
          <Input placeholder="Teléfono (Linea 1)" />
          <Input placeholder="Teléfono (Linea 2)" />
          <Input placeholder="Celular" />
          <Input placeholder="Provincia" />
          <Input placeholder="Localidad" />
          <Input placeholder="Local" />
          <Input placeholder="Empresa" />
          <Input placeholder="Factura" />
          <Input placeholder="Dirección del local" />
          <Input placeholder="Nombre de la empresa" />
          <Input placeholder="Matrícula" />
          <Input placeholder="Número de matrícula" />
          <Input placeholder="Email laboral" />
          <CheckBox title="Tengo WhatsApp" />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
          }}
        >
          <Text h3 style={{ color: "#fff" }}>
            Descripcion / Resumen Personal
          </Text>
          <TextInput
            style={{
              height: 80,
              borderColor: "gray",
              borderWidth: 1,
              placeholderTextColor: "gray",
            }}
            placeholder="Resumen Personal"
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
          }}
        >
          <Text h3 style={{ color: "#fff" }}>
            Dias y horarios de atención
          </Text>
          <CheckBox title="Lunes" />
          <CheckBox title="Martes" />
          <CheckBox title="Miercoles" />
          <CheckBox title="Jueves" />
          <CheckBox title="Viernes" />
          <CheckBox title="Sábado" />
          <CheckBox title="Domingo" />
          <Input placeholder="Desde" />
          <Input placeholder="Hasta" />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
          }}
        >
          <Text h3 style={{ color: "#fff" }}>
            Términos y condiciones
          </Text>
          <CheckBox title="Acepto los términos y condiciones y la política de privacidad" />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
          }}
        >
          <Button
            onPress={() => navigation.navigate("PagosPage")}
            title="Continuar"
            buttonStyle={{
              marginTop: 10,
              backgroundColor: "#F4743B",
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AnunciatePage;
