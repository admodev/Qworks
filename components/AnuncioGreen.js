import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

class PlanGreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            duracion: "mensual",
            conversaciones: 7,
            compraDeConversaciones: "multiplos de 4",
            recomendar: true,
            calificar: true,
            comentar: false,
            compartir: true,
            subirFoto: true,
            webs: [],
            redes: ["facebook", "instagram", "2webs"],
        });
    }
    render() {
        switch(webs) {
            case webs < 2:
                continue;
            case webs >= 2:
                break;
        }
        return(
            <View>
                <Text>Hola</Text>
            </View>
        );
    }
}

export default PlanGreen;