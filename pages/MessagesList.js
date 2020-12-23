import React, { useState, setState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import MessagesScreen from './ChatMessages';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Timer } from 'react-native-stopwatch-timer';

export default function UserMessagesList({ route, navigation }) {
  let [timerStart, setTimerStart] = useState(false);
  let [totalDuration, setTotalDuration] = useState(1800000);
  let [timerReset, setTimerReset] = useState(false);
  const handleTimerComplete = () => alert('Te quedaste sin tiempo!');

  function toggleTimer() {
    setTimerStart(!timerStart);
  }

  function resetTimer() {
    setTimerReset(!timerReset);
  }

  if (timerStart == true && totalDuration == 0) {
    resetTimer();
  }

  function getFormattedTime(time) {
    let currentTime = time;
  }

  timerStart == false
    ? toggleTimer()
    : console.log('El tiempo esta corriendo...');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <MessagesScreen />
      </ScrollView>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 0,
        }}
      >
        <Text style={{ fontSize: 18 }}>Se productivo, te quedan: </Text>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <MaterialCommunityIcons name='clock' color={'orange'} size={35} />
          <Timer
            totalDuration={totalDuration}
            msecs
            start={timerStart}
            reset={timerReset}
            handleFinish={handleTimerComplete}
            getTime={getFormattedTime}
            options={options}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const options = {
  container: {
    backgroundColor: 'transparent',
  },
  text: {
    color: '#000000',
  },
};
