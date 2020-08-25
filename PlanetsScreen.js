import React, { useContext, useState } from 'react';
import { Linking, Dimensions, Text, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppContext } from './AppContext';
import PlanetsList from './PlanetsList';
import image from './assets/images/bg.png';

const PlanetsScreen = () => {

    const appContext = useContext(AppContext);
    const [ windowWidth ] = useState(Dimensions.get('window').width);
    const [ windowHeight ] = useState(Dimensions.get('window').height);

    const styles = StyleSheet.create({

        locationErrorContainer: {
            width: windowWidth,
            height: windowHeight,
            backgroundColor: 'rgba(0, 0, 0, 0.63)',
            justifyContent: "center",
            alignItems: "center",
            position: 'absolute',
            zIndex: 999
        },

        locationErrorText: {
            marginBottom: 35,
            color: '#FFF',
            fontFamily: "A-Space Regular Demo",
            fontSize: 10
        },

        locationErrorContent: {
            width: windowWidth - 50,
            padding: 15,
            backgroundColor: "#333399"
        },

        locationErrorButton: {
            backgroundColor: "#FFE600",
            padding: 10,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: "A-Space Bold Demo",
            color: '#333399'
        },

        locationErrorButtonText: {
            fontFamily: "A-Space Bold Demo",
            color: '#333399',
            fontSize: 12
        },
        
        image: {
            flex: 1,
            justifyContent: "center"
        },
        imageStyle: {
            resizeMode: 'cover'
        }
    });

    /**
     * A simple view manager that depend on user's location permission
     */
    const viewManager = () => {
        switch (appContext.hasLocationPermission) {
            case true:

                return (
                    <View>
                        <PlanetsList />
                    </View >
                );

            case false:
                return (
                    <View style={styles.locationErrorContainer}>
                        <View style={styles.locationErrorContent}>
                            {appContext.translation.texts ? <Text style={styles.locationErrorText}>{appContext.translation.texts.permissions.location.userDenied}</Text> : null}

                            <TouchableOpacity style={styles.locationErrorButton} onPress={appContext.requestUserLocationPermission}>
                                {appContext.translation.texts ? <Text style={styles.locationErrorButtonText}>{appContext.translation.texts.permissions.location.allowAccess}</Text> : null}
                            </TouchableOpacity>
                        </View>
                    </View>
                );

            case "never_ask_again":
                if(appContext.translation.texts){
                    return (
                        <View style={styles.locationErrorContainer}>
                            <View style={styles.locationErrorContent}>
                                <Text style={styles.locationErrorText}>{appContext.translation.texts.permissions.location.userDenied}</Text>
                                <Text style={styles.locationErrorText}>{appContext.translation.texts.permissions.location.neverAskAgain}</Text>
                                <Text style={styles.locationErrorText}>1. {appContext.translation.texts.permissions.location.stepsToEnableLocation.first}</Text>
                                <Text style={styles.locationErrorText}>2. {appContext.translation.texts.permissions.location.stepsToEnableLocation.second}</Text>
                                <Text style={styles.locationErrorText}>3. {appContext.translation.texts.permissions.location.stepsToEnableLocation.third}</Text>
                                <TouchableOpacity style={styles.locationErrorButton} onPress={() => Linking.openSettings()}>
                                    <Text style={styles.locationErrorButtonText}>{appContext.translation.texts.permissions.location.openAppSettings}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }
        }
    }

    return (
        <ImageBackground source={image} imageStyle={styles.imageStyle} style={styles.image}>
            {viewManager()}
        </ImageBackground>

    );
}

export default PlanetsScreen;
