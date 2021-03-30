import * as React from 'react';
import { StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import CardsUsuarios from '../components/Cards';
import Drawer from 'react-native-drawer';
import ControlPanel from '../components/DrawerControlPanel';

const OnboardingPage = ({ navigation }) => {
  let state = {
    shows: [],
    isLoading: true,
    search: false,
    title: '',
    data: [],
  };

  return (
    <Drawer ref={(ref) => (_drawer = ref)} content={<ControlPanel />}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <Image
          source={require('../assets/gradients/20x20.png')}
          style={{
            flex: 1,
            position: 'absolute',
            resizeMode: 'cover',
            width: '100%',
            height: '5%',
          }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 25 }}
        >
          <CardsUsuarios />
        </ScrollView>
      </SafeAreaView>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  primeraCard: {
    marginTop: 50,
    backgroundColor: '#483D8B',
    shadowColor: '#000',
    borderRadius: 15,
    paddingTop: -5,
    paddingBottom: 2,
    marginBottom: 100,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  card: {
    backgroundColor: '#483D8B',
    shadowColor: '#000',
    borderRadius: 15,
    paddingTop: -5,
    paddingBottom: 2,
    marginBottom: 100,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

export default OnboardingPage;
