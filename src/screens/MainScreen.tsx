import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../theme/appTheme';
import { ButtonCalc } from '../components/ButtonCalc';
import { useCalculadora } from '../hooks/useCalculadora';

export const MainScreen = () => {

  const {
    previousNumber,
    baseNumber,
    clearScreen,
    setActionOnScreen,
    plusAndMinus,
    delLastAction,
    setOperator,
    calculateResult
  } = useCalculadora()

  return (
    <View style={styles.container}>

      {previousNumber !== '0' &&
        (<Text style={[theme.baseText, styles.resultHistory]}>{previousNumber}</Text>)
      }

      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={[theme.baseText, styles.resultText]}
      >
        {baseNumber}
      </Text>

      <View style={theme.row}>
        <ButtonCalc textColor="#000" color="#9B9B9B" text="C" action={clearScreen} />
        <ButtonCalc textColor="#000" color="#9B9B9B" text="+/-" action={plusAndMinus} />
        <ButtonCalc textColor="#000" color="#9B9B9B" text="del" action={delLastAction} />
        <ButtonCalc color="#FF9427" text="/" action={() => setOperator('/')} />
      </View>

      <View style={theme.row}>
        <ButtonCalc text="7" action={setActionOnScreen} />
        <ButtonCalc text="8" action={setActionOnScreen} />
        <ButtonCalc text="9" action={setActionOnScreen} />
        <ButtonCalc color="#FF9427" text="X" action={() => setOperator('*')} />
      </View>

      <View style={theme.row}>
        <ButtonCalc text="4" action={setActionOnScreen} />
        <ButtonCalc text="5" action={setActionOnScreen} />
        <ButtonCalc text="6" action={setActionOnScreen} />
        <ButtonCalc color="#FF9427" text="-" action={() => setOperator('-')} />
      </View>

      <View style={theme.row}>
        <ButtonCalc text="1" action={setActionOnScreen} />
        <ButtonCalc text="2" action={setActionOnScreen} />
        <ButtonCalc text="3" action={setActionOnScreen} />
        <ButtonCalc color="#FF9427" text="+" action={() => setOperator('+')} />
      </View>

      <View style={theme.row}>
        <ButtonCalc text="0" fullWidth action={setActionOnScreen} />
        <ButtonCalc text="," action={setActionOnScreen} />
        <ButtonCalc color="#FF9427" text="=" action={calculateResult} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-end'
  },
  resultHistory: {
    fontSize: 30,
    textAlign: 'right',
    color: 'rgba(255, 255, 255, 0.5)'
  },
  resultText: {
    fontSize: 60,
    textAlign: 'right',
    marginBottom: 10
  },
});