import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import calibrateImage from './assets/images/calibrateImage.png';
import { AppContext } from './AppContext';

const CompassHelper = () => {

    const appContext = useContext(AppContext);
    const [windowHeight] = useState(Dimensions.get('window').height);
    const [windowWidth] = useState(Dimensions.get('window').width);

    const styles = StyleSheet.create({
        container: {
            width: windowWidth,
            height: windowHeight,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center'
        },
        content: {
            backgroundColor: '#333399',
            width: windowWidth - 20,
            alignItems: 'center',
            paddingBottom : 40
        },
        text: {
            color: 'white',
            marginLeft: 10,
            marginRight: 10,
            marginTop: 30,
            fontFamily: "A-Space Light Demo",
            fontSize: 12
        },

        textTitle: {
            fontFamily: "A-Space Bold Demo",
            fontSize: 13,
            color: 'white',
            textAlign: 'center',
            marginBottom: 50,
            marginTop: 40
        },

        image: {
            width: 255,
            height: 100
        }
    });

    /**
     * Will close the compass helper untill the restart of the application
     */
    const turnOffCompassHelper = () => {
        appContext.setFirstTimeOpenCompass(false);
    }

    return (
        <TouchableOpacity style={styles.container} onPress={turnOffCompassHelper}>
            {appContext.translation.texts ? <View style={styles.content}>
                <Text style={styles.textTitle}>{appContext.translation.texts.compassHelper.title}</Text>

                <Image style={styles.image} source={calibrateImage} />
                <View>
                    <Text style={styles.text}>
                        1. {appContext.translation.texts.compassHelper.firstInstruction}
                    </Text>

                    <Text style={styles.text}>
                        2. {appContext.translation.texts.compassHelper.secondInstruction}
                    </Text>
                </View>
            </View> : null}
        </TouchableOpacity>
    );
}

export default CompassHelper;