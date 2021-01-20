import React, { useEffect, useState} from 'react'
import { Image, StyleSheet, Pressable } from 'react-native'

import PropTypes from 'prop-types'
import * as MediaLibrary from 'expo-media-library';
import Grid from './Grid'
import { usePermissions }from 'expo-permissions';

const keyExtractor = ( { uri }) => uri;

function ImageGrid() {

    const [images, setImages] = useState([]);
    const [ourCursor, setOurCursor] = useState(null)
    const [has_next_page, setHas_next_page] = useState(null)
    
    let loading = false;
    let cursor = null;
    
    useEffect(() => {

        getImages();
        
    }, [])

    useEffect(() => {
        loading = false;
        cursor = has_next_page ? ourCursor : null
        
    }, [images])

    async function getImages(after) {

        if(loading) return;

        loading = true;

        const { status } = await MediaLibrary.requestPermissionsAsync();

        if(status !== 'granted') {
            console.log('camera roll permission denied');
        } else {
            console.log('camera permission granted');
            const results = await MediaLibrary.getAssetsAsync({
                first: 20,
                after,
            });
            const { assets } = results;
            const { endCursor } = results;
            const { hasNextPage } = results;

            console.log(assets);
            console.log(endCursor);
            console.log(hasNextPage);

            setOurCursor(endCursor);
            setHas_next_page(hasNextPage);

            setImages(...images, assets)
        }
    }

    getNextImages = () => {
        if(!cursor) return;

        getImages(cursor);
    }

    renderItem = ({ item: { uri }, size, marginTop, marginLeft}) => {
        const style = {
            width: size,
            height: size,
            marginLeft,
            marginTop,
        };

        return (
            // <Pressable 
            //     key={uri}
            //     onPress={()=> onPressImage(uri)}
            //     style={style}
            // >
                <Image source={{ uri }} style={style} />
            // </Pressable>
            
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

ImageGrid.propTypes = {
    onPressImage: PropTypes.func,
}

ImageGrid.defaultProps = {
    onPressImage: () => {},
}
export default ImageGrid
