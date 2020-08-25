import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { AppContext } from './AppContext';

const ErrorModal = props => {
    const [windowHeight] = useState(Dimensions.get('screen').height);
    const [windowWidth] = useState(Dimensions.get('screen').width);
    const appContext = useContext(AppContext);

    const styles = StyleSheet.create({
        modalContainer: {
            backgroundColor: 'rgba(0, 0, 0, 0.63)',
            position: 'absolute',
            top: 0,
            zIndex: 9999,
            height: windowHeight,
            width: windowWidth,
            justifyContent: 'center',
            alignItems: 'center'
        },

        modalBox: {
            backgroundColor: '#333399',
            height: 100,
            width: windowWidth - 50,
            justifyContent : 'center',
            alignItems : 'center'
        },

        buttonContainer: {
            backgroundColor: '#FFE600',
            width : windowWidth / 3.2,
            height : 30,
            justifyContent : 'center',
            alignItems : 'center',
            position : 'absolute',
            bottom : 10,
            
        },

        buttonText : {
            fontFamily : "A-Space Bold Demo",
            color : '#333399'
        },

        textModal: {
            fontSize : 10,
            margin : 10,
            fontFamily : "A-Space Regular Demo",
            marginBottom : 35,
            color: 'white'
        }
    });

    /**
     * Just close the error modal.
     */
    const closeModal = () =>{
        appContext.setHasError('');
    }

    return (
        <TouchableOpacity style={styles.modalContainer} onPress={closeModal}>
            <View style={styles.modalBox}>
                <Text style={styles.textModal}>{props.message}</Text>
                <TouchableOpacity style={styles.buttonContainer} onPress={closeModal}>
                    <Text style={styles.buttonText}>Ok</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

export default ErrorModal;