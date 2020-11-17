import React, { useState, useEffect, setState } from "react";
import { Image, View, Platform, ScrollView, TextInput } from "react-native";
import { Avatar, Button, CheckBox, Input, Text } from "react-native-elements";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import * as ImagePicker from "expo-image-picker";
import * as Updates from "expo-updates";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const EditarAnuncioScreen = ({ navigation }) => {
  let database = firebase.database();
  let user = firebase.auth().currentUser;
  let id = user.uid;
  let storage = firebase.storage();
  let storageRef = storage.ref();
  var userDefaultImage = storageRef.child("userDefaultImage/icon.png");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [image, setImage] = useState(null);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
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
  const toggleWhatsapp = React.useCallback(() =>
    setTengoWhatsapp(!tengoWhatsapp)
  );
  const toggleTerminos = React.useCallback(() => setTerminos(!terminos));
  const [lunesChecked, setLunesChecked] = useState(false);
  const toggleLunesChecked = React.useCallback(() =>
    setLunesChecked(!lunesChecked)
  );
  const [martesChecked, setMartesChecked] = useState(false);
  const toggleMartesChecked = React.useCallback(() =>
    setMartesChecked(!martesChecked)
  );
  const [miercolesChecked, setMiercolesChecked] = useState(false);
  const toggleMiercolesChecked = React.useCallback(() =>
    setMiercolesChecked(!miercolesChecked)
  );
  const [juevesChecked, setJuevesChecked] = useState(false);
  const toggleJuevesChecked = React.useCallback(() =>
    setJuevesChecked(!juevesChecked)
  );
  const [viernesChecked, setViernesChecked] = useState(false);
  const toggleViernesChecked = React.useCallback(() =>
    setViernesChecked(!viernesChecked)
  );
  const [sabadoChecked, setSabadoChecked] = useState(false);
  const toggleSabadoChecked = React.useCallback(() =>
    setSabadoChecked(!sabadoChecked)
  );
  const [domingoChecked, setDomingoChecked] = useState(false);
  const toggleDomingoChecked = React.useCallback(() =>
    setDomingoChecked(!domingoChecked)
  );
  const [desdeAmChecked, setDesdeAmChecked] = useState(false);
  const toggleDesdeAmChecked = React.useCallback(() =>
    setDesdeAmChecked(!desdeAmChecked)
  );
  const [desdePmChecked, setDesdePmChecked] = useState(false);
  const toggleDesdePmChecked = React.useCallback(() =>
    setDesdePmChecked(!desdePmChecked)
  );
  const [hastaAmChecked, setHastaAmChecked] = useState(false);
  const toggleHastaAmChecked = React.useCallback(() =>
    setHastaAmChecked(!hastaAmChecked)
  );
  const [hastaPmChecked, setHastaPmChecked] = useState(false);
  const toggleHastaPmChecked = React.useCallback(() =>
    setHastaPmChecked(!hastaPmChecked)
  );
  function concatLunes() {
    setDiasHorarios(diasHorarios.concat("Lunes"));
    toggleLunesChecked();
  }
  function concatMartes() {
    setDiasHorarios(diasHorarios.concat("Martes"));
    toggleMartesChecked();
  }
  function concatMiercoles() {
    setDiasHorarios(diasHorarios.concat("Miercoles"));
    toggleMiercolesChecked();
  }
  function concatJueves() {
    setDiasHorarios(diasHorarios.concat("Jueves"));
    toggleJuevesChecked();
  }
  function concatViernes() {
    setDiasHorarios(diasHorarios.concat("Viernes"));
    toggleViernesChecked();
  }
  function concatSabado() {
    setDiasHorarios(diasHorarios.concat("Sabado"));
    toggleSabadoChecked();
  }
  function concatDomingo() {
    setDiasHorarios(diasHorarios.concat("Domingo"));
    toggleDomingoChecked();
  }
  function writeUserData(
    image,
    nombre,
    apellido,
    emailPersonal,
    domicilio,
    pisoDptoCasa,
    cuitCuil,
    actividad,
    telefono,
    celular,
    provincia,
    localidad,
    local,
    empresa,
    factura,
    direccionDelLocal,
    nombreDeLaEmpresa,
    matricula,
    numeroDeMatricula,
    emailLaboral,
    tengoWhatsapp,
    descripcionPersonal,
    diasHorarios,
    desde,
    hasta,
    terminos
  ) {
    firebase
      .database()
      .ref("anuncios/")
      .push({})
      .set({
        id: user.uid,
        image,
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
        terminos: terminos,
      })
      .then(function () {
        if (error) {
          console.log(error);
        }
      })
      .finally(() => {
        Updates.reloadAsync();
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
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Esperando ubicación..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

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
    if (result.uri) {
      setImage(result.uri);
    }
  };

  location;
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
          {image ? (
            <Avatar rounded source={{ uri: image }} size="xlarge" />
          ) : (
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
          <Text h3 style={{ color: "#fff", marginTop: 10, marginBottom: 25 }}>
            Información Personal
          </Text>
          <Input
            placeholder="Nombre"
            style={{ color: "#ffffff", fontSize: 16 }}
            onChangeText={(nombre) => setNombre(nombre)}
            value={nombre}
          />
          <Input
            placeholder="Apellido"
            style={{ color: "#ffffff", fontSize: 16 }}
            onChangeText={(apellido) => setApellido(apellido)}
            value={apellido}
          />
          <Input
            placeholder="Email Personal"
            style={{ color: "#ffffff", fontSize: 16 }}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(emailPersonal) => setEmailPersonal(emailPersonal)}
            value={emailPersonal}
          />
          <Input
            placeholder="Domicilio"
            style={{ color: "#ffffff", fontSize: 16 }}
            onChangeText={(domicilio) => setDomicilio(domicilio)}
            value={domicilio}
          />
          <Input
            placeholder="Piso / Dpto / Casa"
            style={{ color: "#ffffff", fontSize: 16 }}
            onChangeText={(pisoDptoCasa) => setPisoDptoCasa(pisoDptoCasa)}
            value={pisoDptoCasa}
          />
          <Input
            placeholder="CUIL / CUIT"
            style={{ color: "#ffffff", fontSize: 16 }}
            keyboardType="numeric"
            onChangeText={(cuitCuil) => setCuitCuil(cuitCuil)}
            value={cuitCuil}
          />
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
          <Text h3 style={{ color: "#fff", marginTop: 10, marginBottom: 25 }}>
            Información Laboral
          </Text>
          <Input
            placeholder="Actividad"
            style={{ color: "#ffffff", fontSize: 16 }}
            onChangeText={(actividad) => setActividad(actividad)}
            value={actividad}
          />
          <Input
            placeholder="Teléfono"
            style={{ color: "#ffffff", fontSize: 16 }}
            keyboardType="phone-pad"
            onChangeText={(telefono) => setTelefono(telefono)}
            value={telefono}
          />
          <Input
            placeholder="Celular"
            style={{ color: "#ffffff", fontSize: 16 }}
            keyboardType="phone-pad"
            onChangeText={(celular) => setCelular(celular)}
            value={celular}
          />
          <Input
            placeholder="Provincia"
            style={{ color: "#ffffff", fontSize: 16 }}
            onChangeText={(provincia) => setProvincia(provincia)}
            value={provincia}
          />
          <Input
            placeholder="Localidad"
            style={{ color: "#ffffff", fontSize: 16 }}
            onChangeText={(localidad) => setLocalidad(localidad)}
            value={localidad}
          />
          <Input
            placeholder="Local"
            style={{ color: "#ffffff", fontSize: 16 }}
            onChangeText={(local) => setLocal(local)}
            value={local}
          />
          <Input
            placeholder="Empresa"
            style={{ color: "#ffffff", fontSize: 16 }}
            onChangeText={(empresa) => setEmpresa(empresa)}
            value={empresa}
          />
          <Input
            placeholder="Factura"
            style={{ color: "#ffffff", fontSize: 16 }}
            onChangeText={(factura) => setFactura(factura)}
            value={factura}
          />
          <Input
            placeholder="Dirección del local"
            style={{ color: "#ffffff", fontSize: 16 }}
            onChangeText={(direccionDelLocal) =>
              setDireccionDelLocal(direccionDelLocal)
            }
            value={direccionDelLocal}
          />
          <Input
            placeholder="Nombre de la empresa"
            style={{ color: "#ffffff", fontSize: 16 }}
            onChangeText={(nombreDeLaEmpresa) =>
              setNombreDeLaEmpresa(nombreDeLaEmpresa)
            }
            value={nombreDeLaEmpresa}
          />
          <Input
            placeholder="Matrícula"
            style={{ color: "#ffffff", fontSize: 16 }}
            onChangeText={(matricula) => setMatricula(matricula)}
            value={matricula}
          />
          <Input
            placeholder="Número de matrícula"
            style={{ color: "#ffffff", fontSize: 16 }}
            keyboardType="numeric"
            onChangeText={(numeroDeMatricula) =>
              setNumeroDeMatricula(numeroDeMatricula)
            }
            value={numeroDeMatricula}
          />
          <Input
            placeholder="Email laboral"
            style={{ color: "#ffffff", fontSize: 16 }}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(emailLaboral) => setEmailLaboral(emailLaboral)}
            value={emailLaboral}
          />
          <CheckBox
            title="Tengo WhatsApp"
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
          <Text h3 style={{ color: "#fff", marginTop: 10, marginBottom: 25 }}>
            Descripcion / Resumen Personal
          </Text>
          <TextInput
            placeholder="Ingrese una descripción personal..."
            placeholderTextColor={"white"}
            style={{
              height: 200,
              width: "80%",
              borderColor: "#ffffff",
              borderWidth: 1,
              borderRadius: 15,
              color: "#ffffff",
              margin: 10,
              textAlignVertical: "top",
            }}
            multiline={true}
            onChangeText={(descripcionPersonal) =>
              setDescripcionPersonal(descripcionPersonal)
            }
            value={descripcionPersonal}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Text h3 style={{ color: "#fff", marginTop: 10, marginBottom: 25 }}>
            Dias y horarios de atención
          </Text>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <CheckBox
              title="Lunes"
              onPress={() => concatLunes()}
              checked={lunesChecked}
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
            />
            <CheckBox
              title="Martes"
              onPress={() => concatMartes()}
              checked={martesChecked}
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
            />
            <CheckBox
              title="Miercoles"
              onPress={() => concatMiercoles()}
              checked={miercolesChecked}
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
            />
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <CheckBox
              title="Jueves"
              onPress={() => concatJueves()}
              checked={juevesChecked}
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
            />
            <CheckBox
              title="Viernes"
              onPress={() => concatViernes()}
              checked={viernesChecked}
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
            />
            <CheckBox
              title="Sábado"
              onPress={() => concatSabado()}
              checked={sabadoChecked}
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
            />
          </View>
          <CheckBox
            title="Domingo"
            onPress={() => concatDomingo()}
            checked={domingoChecked}
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
          />
          <View style={{ width: "80%" }}>
            <Input
              placeholder="Desde ... hs"
              style={{ color: "#ffffff", fontSize: 16 }}
              containerStyle={{
                backgroundColor: "transparent",
                borderColor: "transparent",
                borderWidth: 0,
                marginTop: 15,
                marginLeft: "auto",
                marginRight: "auto",
              }}
              textStyle={{ color: "#ffffff" }}
              keyboardType="numeric"
            />
            <Input
              placeholder="Hasta ... hs"
              style={{ color: "#ffffff", fontSize: 16 }}
              containerStyle={{
                backgroundColor: "transparent",
                borderColor: "transparent",
                borderWidth: 0,
                marginTop: 15,
                marginLeft: "auto",
                marginRight: "auto",
              }}
              textStyle={{ color: "#ffffff" }}
              keyboardType="numeric"
            />
          </View>
        </View>
        <Text h3 style={{ color: "#fff", textAlign: "center" }}>
          Medios De Pago
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 5,
            marginRight: 5,
          }}
        >
          <MaterialCommunityIcons
            name="cash-usd"
            color={"#fff"}
            size={35}
            style={{ marginTop: 20 }}
          />
          <CheckBox
            title="Efectivo"
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
            checked={true}
          />
          <MaterialCommunityIcons
            name="card-bulleted-outline"
            color={"#fff"}
            size={35}
            style={{ marginTop: 20 }}
          />
          <CheckBox
            title="Mercado Pago"
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
            checked={true}
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
            Términos y condiciones
          </Text>
          <CheckBox
            title="Acepto los términos y condiciones y la política de privacidad"
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
            onPress={() =>
              writeUserData(
                image,
                nombre,
                apellido,
                emailPersonal,
                domicilio,
                pisoDptoCasa,
                cuitCuil,
                actividad,
                telefono,
                celular,
                provincia,
                localidad,
                local,
                empresa,
                factura,
                direccionDelLocal,
                nombreDeLaEmpresa,
                matricula,
                numeroDeMatricula,
                emailLaboral,
                tengoWhatsapp,
                descripcionPersonal,
                diasHorarios,
                desde,
                hasta,
                terminos
              )
            }
            title="Editar"
            buttonStyle={{
              backgroundColor: "#F4743B",
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default EditarAnuncioScreen;