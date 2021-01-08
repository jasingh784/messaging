import React from 'react'
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, Image, Text, Pressable, View} from 'react-native';
import { MessageShape } from '../utils/MessageUtils';
import { MapView, Marker }from 'react-native-maps';

const keyExtractor = item => item.id.toString();

function MessageList(props) {

    const { messages } = props

    const renderMessageItem = ({ item }) => {
        const { onPressMessage } = props

        return (
            <View key={item.id} style={styles.messageRow} >
                <Pressable onPress={() => onPressMessage(item)} >
                    {console.log('inside pressable')}
                    {renderMessageBody(item)}
                </Pressable>
            </View>
        )
    }

    const renderMessageBody = ({ type, text, uri, coordinate }) => {
        switch (type) {
            case 'text':
                return (
                    <View style={styles.messageBubble}>
                        {console.log('inside case text')}
                        <Text style={styles.text}>{text}</Text>
                    </View>
                );
            case 'image':
                return (
                    <Image style={styles.image} source={{ uri }} />
                );
            case 'location':
                return (
                    <MapView 
                        style={styles.map}
                        initialRegion = {{
                            ...coordinate,
                            latitudeDelta: 0.08,
                            longitudeDelta: 0.08,
                        }}
                    >
                        <Marker coordinate={coordinate} />
                    </MapView>
                );
            default:
                return null;
        };
    }

    return (
        <FlatList
            style={styles.container}
            inverted
            data={messages}
            renderItem={renderMessageItem}
            keyExtractor={keyExtractor}
            keyboardShouldPersistTaps={'handled'}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'visible',
    },
    messageRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 4,
        marginRight: 10,
        marginLeft: 60,
    },
    messageBubble: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'rgb(16,35,255)',
        borderRadius: 20,
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    map: {
        width: 250,
        height: 250,
        borderRadius: 10,
    },
    }
);

MessageList.prototype = {
    messages: PropTypes.arrayOf(MessageShape).isRequired,
    onPressMessage: PropTypes.func,
};

MessageList.defaultProps = {
    onPressMessage: () => {},
};

export default MessageList
