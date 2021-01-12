import React, { useState, useRef } from 'react'
import { StyleSheet, Text, TextInput, Pressable, View} from 'react-native';
import PropTypes from 'prop-types'

const ToolbarButton = ( { title, onPress }) => (
    <Pressable onPress={onPress} >
        <Text style={styles.button}>{title}</Text>
    </Pressable>
)


ToolbarButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
}


function Toolbar(props) {

    const [text, setText] = useState('');
    const inputRef = useRef();

    const { onPressCamera, onPressLocation} = props;

    handleChangeText = (text) => {
        setText(text);
    }

    handleSubmitEditing = () => {
        const { onSubmit } = props;
        if(!text) return;

        onSubmit(text);
        setText('')
    }

    return (
        <View style={styles.toolbar}>
            <ToolbarButton title={'C'} onPress={onPressCamera} />
            <ToolbarButton title={'L'} onPress={onPressLocation} />
            <View style={styles.inputContainer} >
                <TextInput
                    style={styles.input}
                    underlineColorAndroid={'transparent'}
                    placeholder={'Type something'}
                    blurOnSubmit={false}
                    value={text}
                    onChangeText={handleChangeText}
                    onSubmitEditing={handleSubmitEditing} 
                    ref={inputRef}>
                </TextInput> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        paddingLeft: 16,
        backgroundColor: 'white',
    },
    button: {
        top: -2,        
        marginRight: 12,
        fontSize: 20,
        color: 'grey',
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.04)',
        borderRadius: 16,
        paddingVertical: 4,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(0,0,0,0.02)',
    },
    input: {
        flex: 1,
        fontSize: 18,
    },
})

Toolbar.prototype = {
    isFocused: PropTypes.bool.isRequired,
    onChangeFocus: PropTypes.func,
    onSubmit: PropTypes.func,
    onPressCamera: PropTypes.func,
    onPressLocation: PropTypes.func,
};

Toolbar.defaultProps = {
    onChangeFocus: () => {},
    onSubmit: () => {},
    onPressCamera: () => {},
    onPressLocation: () => {},
};

export default Toolbar
