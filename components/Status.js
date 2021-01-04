import React, { useState } from 'react'
import Constants from 'expo-constants'
import { StyleSheet, Platform, StatusBar, NetInfo, Text, View, SafeAreaView } from 'react-native';

function Status() {

    const [info, setInfo] = useState('none');

    const isConnected = info !== 'none' ? true : false;
    console.log(isConnected);

    const backgroundColor = isConnected ? 'white' : 'red';

    if(Platform.OS === 'ios') {
        console.log("inside ios return")
        return (
            <SafeAreaView style={[styles.status, { backgroundColor }]}>
                <StatusBar barStyle="light-content" hidden={false}/>
            </SafeAreaView>
        )
    }
    return (
        null
    )
}

const statusHeight = (Platform.OS === 'ios' ? Constants.statusBarHeight : 0);

console.log(statusHeight);

const styles = StyleSheet.create({
    status: {
        flex: 1,
        zIndex: 1, 
        height: statusHeight,
    },
});

export default Status
