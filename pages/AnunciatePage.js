import React, { useState, useEffect, setState } from "react";
import { Image, View, Platform, ScrollView, TextInput } from "react-native";
import {
    Avatar,
    Badge,
    Button,
    CheckBox,
    Input,
    SocialIcon,
    Text,
} from "react-native-elements";
import * as firebase from "firebase";
import 'firebase/database';
import * as ImagePicker from "expo-image-picker";

var database = firebase.database();

const AnunciatePage = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido]  = useState("");
    const [emailPersonal, setEmailPersonal] = useState("");
    const [domicilio, setDomicilio] = useState("");
    const [pisoDptoCasa, setPisoDptoCasa] = useState("");
    const [cuitCuil, setCuitCuil] = useState("");
    const [actividad, setActividad] = useState("");
    const [telefono, setTelefono] = useState("");
    const [celular, setCelular] = useState("");
    const [provincia, setProvincia] = useState("");
    const [localidad, setLocalidad] = useState("");
    const [local, setLocal] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [factura, setFactura] = useState("");
    const [direccionDelLocal, setDireccionDelLocal] = useState("");
    const [nombreDeLaEmpresa, setNombreDeLaEmpresa] = useState("");
    const [matricula, setMatricula] = useState("");
    const [numeroDeMatricula, setNumeroDeMatricula] = useState("");
    const [emailLaboral, setEmailLaboral] = useState("");
    const [tengoWhatsapp, setTengoWhatsapp] = useState(false);
    const [descripcionPersonal, setDescripcionPersonal] = useState("");
    const [diasHorarios, setDiasHorarios] = useState([]);
    const [desde, setDesde] = useState("");
    const [hasta, setHasta] = useState("");
    const [terminos, setTerminos] = useState(false);

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
            quality: 0.5,
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
        <Text h3 style={{ color: "#fff", marginTop: 30, marginBottom: 25 }}>
        Foto de Perfil
        </Text>
        {image && (
            <Avatar
  rounded
  source={{ uri: image }}
  size="xlarge"
/>
        )}
        {image == null && (
            <Button
            buttonStyle={{ marginTop: 10, backgroundColor: "#F4743B" }}
            title="Subir foto"
            onPress={pickImage}
            />
        )}
        </View>
        <View
        style={{
            flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 25,
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
        }}
        >
        <Text h3 style={{ color: "#fff", margintop: 10, marginBottom: 25 }}>
        Información Personal
        </Text>
        <Input placeholder="Nombre"
        style={{ color: "#ffffff", fontSize: 16 }}
        />
        <Input placeholder="Apellido" style={{ color: "#ffffff", fontSize: 16 }} />
        <Input placeholder="Email Personal" style={{ color: "#ffffff", fontSize: 16 }}/>
        <Input placeholder="Domicilio" style={{ color: "#ffffff", fontSize: 16 }}/>
        <Input placeholder="Piso / Dpto / Casa" style={{ color: "#ffffff", fontSize: 16 }}/>
        <Input placeholder="CUIL / CUIT" style={{ color: "#ffffff", fontSize: 16 }}/>
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
