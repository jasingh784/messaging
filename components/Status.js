import React, { useEffect, useState } from 'react'
import Constants from 'expo-constants'
import { StyleSheet, Platform, StatusBar, Text, View, SafeAreaView } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

function Status() {

    const [info, setInfo] = useState(null);

    const isConnected = info ? true : false;
    

    const backgroundColor = isConnected ? 'white' : 'red';

    const statusBar = (
        <StatusBar 
            backgroundColor={backgroundColor}
            barStyle={isConnected ? 'dark-content' : 'light-content'}
            animated={false}
        />
    )

    const messageContainer = (
        <View style={styles.messageContainer} pointEvents={'none'}>
            {statusBar}
            {!isConnected && (
                <View style={styles.bubble}>
                    <Text style={styles.text}>No network connection</Text>
                </View>
            )}

        </View>
    )

    useEffect(() => {
        
        async function getNetworkInfo() {
            const info = await NetInfo.getConnectionInfo();

            setInfo(info);
        }

        const subscription = NetInfo.addEventListener(state => {
            setInfo(state.isConnected);
        });
        
        return () => {
            subscription();
        }
    }, [])

    handleConnectionChange = (info) => {
        setInfo(info);
    }

    if(Platform.OS === 'ios') {
        
        return (
            <View style={[styles.status, { backgroundColor }]}>{messageContainer}</View>
        )
    }
    return (
        messageContainer
    )
}

const statusHeight = (Platform.OS === 'ios' ? Constants.statusBarHeight : 0);

const styles = StyleSheet.create({
    status: {
        zIndex: 1,
        height: statusHeight,
    },  
    messageContainer: {
        zIndex: 1, 
        position: 'absolute',
        top: statusHeight + 20,
        right: 0,
        left: 0,
        height: 80,
        alignItems: 'center',
    },
    bubble: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'red',
    },
    text: {
        color: 'white',
    },
});

export default Status
