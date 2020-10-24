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
    // Pasar valores booleanos (por ejemplo: tengoWhatsapp de falso a verdadero y viceversa.
    const toggleWhatsapp = React.useCallback(() => setTengoWhatsapp(!tengoWhatsapp));
    const toggleTerminos = React.useCallback(() => setTerminos(!terminos));

    function concatLunes() {
        setDiasHorarios(diasHorarios.concat("Lunes"));
        checked = true;
    }

    function writeUserData(image, nombre, apellido, emailPersonal, domicilio, pisoDptoCasa, cuitCuil, actividad, telefono, celular, provincia, localidad, local, empresa, factura, direccionDelLocal, nombreDeLaEmpresa, matricula, numeroDeMatricula, emailLaboral, tengoWhatsapp, descripcionPersonal, diasHorarios, desde, hasta, terminos) {
        firebase.database().ref('anuncios/' + userId).set({
            image: image,
            nombre: nombre,
            apellido: apellido,
            emailPersonal: emailPersonal,
            domicilio: domicilio,
            pisoDptoCasa: pisoDptoCasa,
            cuitCuil: cuitCuil,
            actividad: actividad,
            telefono: telefono,
            celular: celular,
            provincia: provincia,
            localidad: localidad,
            local: local,
            empresa: empresa,
            factura: factura,
            direccionDelLocal: direccionDelLocal,
            nombreDeLaEmpresa: nombreDeLaEmpresa,
            matricula: matricula,
            numeroDeMatricula: numeroDeMatricula,
            emailLaboral: emailLaboral,
            tengoWhatsapp: tengoWhatsapp,
            descripcionPersonal: descripcionPersonal,
            diasHorarios: diasHorarios,
            desde: desde,
            hasta: hasta,
            terminos: terminos
        });
    }

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
        onChangeText={(nombre) => setNombre(nombre)}
        value={nombre}
        />
        <Input placeholder="Apellido" style={{ color: "#ffffff", fontSize: 16 }} onChangeText={(apellido) => setApellido(apellido)}
        value={apellido} />
        <Input placeholder="Email Personal" style={{ color: "#ffffff", fontSize: 16 }} 
        onChangeText={(emailPersonal) => setEmailPersonal(emailPersonal)}
        value={emailPersonal}
        />
        <Input placeholder="Domicilio" style={{ color: "#ffffff", fontSize: 16 }} 
        onChangeText={(domicilio) => setDomicilio(domicilio)}
        value={domicilio}
        />
        <Input placeholder="Piso / Dpto / Casa" style={{ color: "#ffffff", fontSize: 16 }} 
        onChangeText={(pisoDptoCasa) => setPisoDptoCasa(pisoDptoCasa)}
        value={pisoDptoCasa}
        />
        <Input placeholder="CUIL / CUIT" style={{ color: "#ffffff", fontSize: 16 }} 
        onChangeText={(cuitCuil) => setCuilCuit(cuitCuil)}
        value={cuitCuil}
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
        Información Laboral
        </Text>
        <Input placeholder="Actividad" 
        onChangeText={(actividad) => setActividad(actividad)}
        value={actividad}
        />
        <Input placeholder="Teléfono" 
        onChangeText={(telefono) => setTelefono(telefono)}
        value={telefono}
        />
        <Input placeholder="Celular" 
        onChangeText={(celular) => setCelular(celular)}
        value={celular}
        />
        <Input placeholder="Provincia" 
        onChangeText={(provincia) => setProvincia(provincia)}
        value={provincia}
        />
        <Input placeholder="Localidad"
        onChangeText={(localidad) => setLocalidad(localidad)}
        value={localidad}
        />
        <Input placeholder="Local" 
        onChangeText={(local) => setLocal(local)}
        value={local}
        />
        <Input placeholder="Empresa" 
        onChangeText={(empresa) => setEmpresa(empresa)}
        value={empresa}
        />
        <Input placeholder="Factura" 
        onChangeText={(factura) => setFactura(factura)}
        value={factura}
        />
        <Input placeholder="Dirección del local" 
        onChangeText={(direccionDelLocal) => setDireccionDelLocal(direccionDelLocal)}
        value={direccionDelLocal}
        />
        <Input placeholder="Nombre de la empresa" 
        onChangeText={(nombreDeLaEmpresa) => setNombreDeLaEmpresa(nombreDeLaEmpresa)}
        value={nombreDeLaEmpresa}
        />
        <Input placeholder="Matrícula" 
        onChangeText={(matricula)}
        value={matricula}
        />
        <Input placeholder="Número de matrícula" 
        onChangeText={(numeroDeMatricula) => setNumeroDeMatricula}
        value={numeroDeMatricula}
        />
        <Input placeholder="Email laboral" 
        onChangeText={(emailLaboral) => setEmailLaboral(emailLaboral)}
        value={emailLaboral}
        />
        <CheckBox title="Tengo WhatsApp"
        containerStyle={{
            backgroundColor: "transparent",
                borderColor: "transparent",
                borderWidth: 0,
                marginLeft: "auto",
                marginRight: "auto",
        }}
        textStyle={{ color: "#ffffff" }}
        checkedColor={"white"}
        onPress={toggleWhatsapp}
        checked={tengoWhatsapp}
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
        onChangeText={(descripcionPersonal) => setDescripcionPersonal(descripcionPersonal)}
        value={descripcionPersonal}
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
        <View style={{ flex: 1, flexDirection: "row" }}>
        <CheckBox title="Lunes"
        onPress={() => concatLunes()}
        containerStyle={{
            backgroundColor: "transparent",
                borderColor: "transparent",
                borderWidth: 0,
                marginTop: 15,
                marginLeft: "auto",
                marginRight: "auto",
        }}
        textStyle={{ color: "#ffffff" }}
        checkedColor={"white"}/>
        <CheckBox title="Martes" containerStyle={{
            backgroundColor: "transparent",
                borderColor: "transparent",
                borderWidth: 0,
                marginTop: 15,
                marginLeft: "auto",
                marginRight: "auto",
        }}
        textStyle={{ color: "#ffffff" }}
        checkedColor={"white"}/>
        <CheckBox title="Miercoles" containerStyle={{
            backgroundColor: "transparent",
                borderColor: "transparent",
                borderWidth: 0,
                marginTop: 15,
                marginLeft: "auto",
                marginRight: "auto",
        }}
        textStyle={{ color: "#ffffff" }}
        checkedColor={"white"}/>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
        <CheckBox title="Jueves" containerStyle={{
            backgroundColor: "transparent",
                borderColor: "transparent",
                borderWidth: 0,
                marginTop: 15,
                marginLeft: "auto",
                marginRight: "auto",
        }}
        textStyle={{ color: "#ffffff" }}
        checkedColor={"white"}/>
        <CheckBox title="Viernes" containerStyle={{
            backgroundColor: "transparent",
                borderColor: "transparent",
                borderWidth: 0,
                marginTop: 15,
                marginLeft: "auto",
                marginRight: "auto",
        }}
        textStyle={{ color: "#ffffff" }}
        checkedColor={"white"}/>
        <CheckBox title="Sábado" containerStyle={{
            backgroundColor: "transparent",
                borderColor: "transparent",
                borderWidth: 0,
                marginTop: 15,
                marginLeft: "auto",
                marginRight: "auto",
        }}
        textStyle={{ color: "#ffffff" }}
        checkedColor={"white"}/>
        </View>
        <CheckBox title="Domingo" containerStyle={{
            backgroundColor: "transparent",
                borderColor: "transparent",
                borderWidth: 0,
                marginTop: 15,
                marginLeft: "auto",
                marginRight: "auto",
        }}
        textStyle={{ color: "#ffffff" }}
        checkedColor={"white"}/>
        <Input placeholder="Desde" containerStyle={{
            backgroundColor: "transparent",
                borderColor: "transparent",
                borderWidth: 0,
                marginTop: 15,
                marginLeft: "auto",
                marginRight: "auto",
        }}
        textStyle={{ color: "#ffffff" }}
        checkedColor={"white"}/>
        <Input placeholder="Hasta" containerStyle={{
            backgroundColor: "transparent",
                borderColor: "transparent",
                borderWidth: 0,
                marginTop: 15,
                marginLeft: "auto",
                marginRight: "auto",
        }}
        textStyle={{ color: "#ffffff" }}
        checkedColor={"white"}/>
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
        <CheckBox title="Acepto los términos y condiciones y la política de privacidad" 
        containerStyle={{
            backgroundColor: "transparent",
                borderColor: "transparent",
                borderWidth: 0,
                marginTop: 15,
                marginLeft: "auto",
                marginRight: "auto",
        }}
        textStyle={{ color: "#ffffff" }}
        checkedColor={"white"}
        onPress={toggleTerminos}
        checked={terminos}
        />
        </View>
        <View
        style={{
            flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 25,
                marginBottom: 30,
        }}
        >
        <Button
        onPress={() => navigation.navigate("PagosPage")}
        title="Continuar"
        buttonStyle={{
            backgroundColor: "#F4743B",
        }}
        />
        </View>
        </ScrollView>
        </View>
    );
};

export default AnunciatePage;
