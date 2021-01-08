import React from "react";
import { SafeAreaView } from "react-native";
import RenderCards from "../components/RenderMultiple";

export default function RecomendacionesRenderizadas() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RenderCards
        image={"https://picsum.photos/200/300"}
        name={"Carlos"}
        actividad={"Martillero Público"}
        recomendaciones={"10"}
        localidad={"Pacheco"}
        provincia={"Buenos Aires"}
        idAnuncio={"PlsfYMo9kDdPKnHIuZ0uPJkTyeL2"}
      />
    </SafeAreaView>
  );
}
