import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, PricingCard } from "react-native-elements";

const PagosPage = ({ navigation }) => {
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
        <View style={{ flex: 1 }}>
          <PricingCard
            color="#4f9deb"
            title="Plan Free"
            price="$0"
            info={["30 días, 3 contactos, 3 conversaciones"]}
            button={{ title: "Contratar" }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <PricingCard
            color="#4f9deb"
            title="Plan Green"
            price="$1638 I/INC"
            info={[
              "60 días, 10 contactos, 10 conversaciones, interacciones de los usuarios con mi perfil ilimitadas",
            ]}
            button={{ title: "Contratar" }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <PricingCard
            color="#4f9deb"
            title="Plan Orange"
            price="$2772 I/INC"
            info={[
              "120 días, 30 contactos, 30 conversaciones, alcance del perfil intermedio, envio y recepcion de material fotográfico para optimizar el tiempo y los presupuestos (limitado a 30 fotos), interacción de los usuarios con tu perfil ilimitada, agregar a tu anuncio tus redes sociales y metodos de pago que aceptas, describirte a vos y a tus gustos",
            ]}
            button={{ title: "Contratar" }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <PricingCard
            color="#4f9deb"
            title="Plan Blue"
            price="$6552 I/I"
            info={[
              "180 días, 100 contactos, 100 conversaciones, alcance del perfil premium, visibilidad del perfil premium, envío de material fotográfico para optimizar el tiempo y presupuestos ilimitado",
            ]}
            button={{ title: "Contratar" }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PagosPage;
