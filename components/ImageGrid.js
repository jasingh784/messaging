import React, { useState} from 'react'
import { Image, StyleSheet, Pressable } from 'react-native'
import CameraRoll from '@react-native-community/cameraroll';
import PropTypes from 'prop-types'

import Grid from './Grid'
import { render } from 'react-dom';

const keyExtractor = ( { uri }) => uri;

function ImageGrid() {

    const [images, setImages] = useState([
        { uri: 'https://picsum.photos/600/600?image=10' },
        { uri: 'https://picsum.photos/600/600?image=20' },
        { uri: 'https://picsum.photos/600/600?image=30' },
        { uri: 'https://picsum.photos/600/600?image=40' },
    ])

    renderItem = ({ item: { uri }, size, marginTop, marginLeft}) => {
        const style = {
            width: size,
            height: size,
            marginLeft,
            marginTop,
        };

        return (
            <Image source={{ uri }} style={style} />
        )
    }
    return (
        <Grid 
            data={ images }
            renderItem={renderItem}
            keyExtractor={keyExtractor}
        />
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
    }
})

ImageGrid.PropTypes = {
    onPressImage: PropTypes.func,
}

ImageGrid.defaultProps = {
    onPressImage: () => {},
}
export default ImageGrid
