import * as React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';

type AnounceProps = {
  nombre: string;
  apellido: string;
  cuitCuil: number;
};

const EditAnounce: React.FunctionComponent<AnounceProps> = () => {
  const [values, setValues] = React.useState({
    nombre: '',
    apellido: '',
    cuitCuil: 0,
  });

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.firstView}>
        <Input
          placeholder='Nombre'
          onChangeText={(nombre) =>
            setValues({
              ...values,
              nombre: nombre,
            })
          }
        />
        <Input
          placeholder='Apellido'
          onChangeText={(apellido) =>
            setValues({
              ...values,
              apellido: apellido,
            })
          }
        />
        <Input
          placeholder='Cuit / Cuil'
          keyboardType='number-pad'
          onChangeText={(cuitCuil) =>
            setValues({
              ...values,
              cuitCuil: parseInt(cuitCuil),
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  firstView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EditAnounce;
