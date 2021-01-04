import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Status from './components/Status';

export function RenderMessageList() {
  return (
    <View style={styles.content}></View>
  )
}

  export function RenderInputMethodEditor() {
    return (
      <View style={styles.inputMethodEditor}></View>
    );
  }

  export function RenderToolbar() {
    return (
      <View style={styles.toolbar}></View>
    );
  }

export default function App() {

  return (
    <View style={styles.container}>
      <Status />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'black',
    backgroundColor: 'white'
  },
});
