const calificador = (calificacion, action) => {
  if (action) {
    return calificacion + action.payload;
  }
};

export default calificador;
