import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions, TouchableOpacity } from 'react-native';

interface Props {
  text: string;
  color?: string;
  textColor?: string;
  fullWidth?: boolean;
  action: (actionText: string) => void;
}

export const ButtonCalc = ({
  text,
  action,
  color = '#2D2D2D',
  textColor = '#fff',
  fullWidth = false,
}: Props) => {

  const { width, height } = useWindowDimensions()

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => action(text)}
    >
      <View
        style={{
          ...styles.buttonContainer,
          backgroundColor: color,
          width: (fullWidth) ? width * 0.44 : width * 0.20,
          height: height * 0.079,
        }}
      >
        <Text
          style={{
            ...styles.buttonText,
            color: textColor,
            fontSize: height * 0.04
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 100,
    justifyContent: 'center',
    height: 30,
    marginHorizontal: 8
  },
  buttonText: {
    fontWeight: '400',
    textAlign: 'center',
  }
});

/* #9B9B9B gris */
/* #2D2D2D gris oscuro (base) */
/* #FF9427 naranja */