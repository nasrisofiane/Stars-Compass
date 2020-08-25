import React, { useContext, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { AppContext } from './AppContext';
import franceFlag from './assets/images/france.jpg';
import japanFlag from './assets/images/japan.jpg';
import englandFlag from './assets/images/england.png';

const LanguageScreen = () => {
    const [windowHeight] = useState(Dimensions.get('screen').height);
    const [windowWidth] = useState(Dimensions.get('screen').width);
    const appContext = useContext(AppContext);

    const styles = StyleSheet.create({
        container: {
            width: windowWidth,
            height: windowHeight,
            position: 'absolute',
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999
        },

        flagsContainer: {
            width: 200,
            height: 90,
            backgroundColor: "#333399",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center"
        },

        flags: {
            width: 50,
            height: 30,
            borderWidth: 1,
            borderColor: "#FFE600",
        }
    });

    /**
     * On flag pressed will turn the application into another language and will close the language window.
     * @param {*} lang 
     */
    const onFlagPressed = (lang) => {
        console.log(windowHeight);
        //If the previous language is not the same as the new selected language.
        if (appContext.translation.lang != lang) {
            appContext.setTranslation({ lang: lang });
        }

        appContext.setTranslationWindowOpened(false);

    }

    return (
        <View style={styles.container}>
            <View style={styles.flagsContainer}>
                <TouchableOpacity onPress={() => onFlagPressed("FR")}>
                    <Image style={styles.flags} source={franceFlag} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onFlagPressed("EN")}>
                    <Image style={styles.flags} source={englandFlag} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onFlagPressed("JP")}>
                    <Image style={styles.flags} source={japanFlag} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default LanguageScreen;