import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Status from './components/Status';

const RenderMessageList = () => {
  return (
    <View style={styles.content}></View>
  )
}

  const RenderInputMethodEditor = () => {
    return (
      <View style={styles.inputMethodEditor}></View>
    );
  }

  const RenderToolbar = () => {
    return (
      <View style={styles.toolbar}></View>
    );
  }

export default function App() {

  return (
    <View style={styles.container}>
      <Status />
      <RenderMessageList />
      <RenderToolbar />
      <RenderInputMethodEditor />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
