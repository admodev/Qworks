import React from "react";

const standard = {
    duracion: "6 meses",
    compraDeConversaciones: "multiplos de 3",
    recomendar: false,
    calificar: true,
    comentar: false,
    compartir: true,
    subirFoto: true,
    webs: [],
    redes: ["facebook", "instagram", "2 webs"],
}

const green = {
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
}

const orange = {
    duracion: "trimestral",
    conversaciones: 11,
    compraDeConversaciones: "multiplos de 4 y 7",
    recomendar: true,
    calificar: true,
    comentar: true,
    compartir: true,
    subirFoto: true,
    webs: [],
    redes: ["facebook", "instagram", "2webs"],
}

const blue = {
    duracion: "6 meses",
    conversaciones: 21,
    compraDeConversaciones: "multiplos de 4, 7 y 11",            
    recomendar: true,
    calificar: true,
    comentar: true,
    compartir: true,
    subirFoto: true,
    webs: [],
    redes: ["facebook", "instagram", "2webs"],
}

export default class PlanesUsuarios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultPlan: standard,
        }
    }
    render() {
        return(
            <>
            </>
        );
    }
}
