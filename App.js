import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Status from './components/Status';

import MessageList from './components/MessageList';
import { createImageMessage, createLocationMessage, createTextMessage} from './utils/MessageUtils';

export const RenderMessageList = (props) => {
  const { messages, onPressMessage } = props
  return (
    <View style={styles.content}>
      <MessageList messages={messages} onPressMessage={onPressMessage} />
    </View>
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

  const [messages, setMessages] = useState([
    createImageMessage('http://unsplash.it/300/300'),
    createTextMessage('World'),
    createTextMessage("Hello"),
    createLocationMessage({
      latitude: 37.78825,
      longitude: -122.4324,
    }),
  ])

  handlePressMessage = (item) => {}

  return (
    <View style={styles.container}>
      <Status />
      <RenderMessageList messages={messages} onPressMessage={handlePressMessage}/>
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
