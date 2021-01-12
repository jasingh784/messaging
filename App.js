import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Image, Pressable, BackHandler } from 'react-native';
import * as Location from 'expo-location';

import Status from './components/Status';

import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';

import { createImageMessage, createLocationMessage, createTextMessage} from './utils/MessageUtils';


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

  const [fullscreenImageId, setfullscreenImageId] = useState(null)
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const subscribtion = BackHandler.addEventListener('hardwareBackPress', () => {
      if(fullscreenImageId) {
        dismissFullScreenImage();
        return true;
      }
      else return false;
    });
    return () => {
      subscribtion.remove();
    }
  }, [])

  handlePressMessage = ({id, type } ) => {
    switch(type) {
      case 'text':
        Alert.alert(
          'Delete message?',
          'Are you sure you want to permanently delete this message?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => {
                const messagesToDelete = messages;
                setMessages(messagesToDelete.filter(message => message.id !== id));
              },
            },
          ],
        );
        break;
      case 'image':
        setfullscreenImageId(id)
        break;
      default:
        break;
    }
  };
  
  dismissFullScreenImage = () => {
    setfullscreenImageId(null);
  }

  renderFullScreenImage = () => {
    if(!fullscreenImageId) return null;

    const image = messages.find(message => message.id === fullscreenImageId);

    if(!image) return null;

    const { uri } = image;

    return(
      <Pressable style={styles.fullScreenOverlay} onPress={dismissFullScreenImage}>
        <Image style={styles.fullscreenImage} source={{ uri }} />
      </Pressable>
    )
  }

  handleSubmit = (text) => {
    const currentMessages = messages;

    setMessages([createTextMessage(text), ...currentMessages]);
  }

  handlePressToolbarCamera = () => {}

  handlePressToolbarLocation = () => {

    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if(status !== 'granted') {
        console.log('Premission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      const { coords: {latitude, longitude} } = location;

      const currentMessages = messages;

      setMessages([createLocationMessage({
        latitude,
        longitude,
      }), ...currentMessages]);
    })();
  }

  return (
    <View style={styles.container}>
      <Status />
      <MessageList messages={messages} onPressMessage={handlePressMessage}/>
      <Toolbar 
        onSubmit={handleSubmit}
        onPressCamera={handlePressToolbarCamera}
        onPressLocation={handlePressToolbarLocation}
      />
      <RenderInputMethodEditor />
      {renderFullScreenImage()}
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
  fullScreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 2,
  },
  fullscreenImage: {
    flex: 1,
    resizeMode: 'contain',
  }
});
