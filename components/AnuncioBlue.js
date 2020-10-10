import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

class PlanBlue extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            duracion: "6 meses",
            conversaciones: 17,
            compraDeConversaciones: "multiplos de 4, 7 y 11",            
            recomendar: true,
            calificar: true,
            comentar: true,
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

export default PlanBlue;
