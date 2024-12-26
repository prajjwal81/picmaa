import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface ButtonInt {
  press: () => void;
  text: String;
  height: String;
  width: String;
}

export default function Button({press, text, height, width}: ButtonInt) {
  return (
    <Pressable
      style={[
        styles.container,
        {
          height: height === '0' ? '10%' : height,
          width: width == '0' ? '80%' : width,
        },
      ]}
      onPress={() => press()}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 137, 123, 1)',
    width: '80%',
    alignSelf: 'center',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
