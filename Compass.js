import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { AppContext } from './AppContext';
import CompassImage from './CompassImage';
import image from './assets/images/bg.png';
import LoadingScreen from './LoadingScreen';
import CompassHelper from './CompassHelper';

const Compass = () => {

    const appContext = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);

    const styles = StyleSheet.create({
        image: {
            flex: 1,
            justifyContent: "center",
        },
        imageStyle: {
            resizeMode: 'cover'
        }
    });

    /**
     * Method that create a correct object format and ready to be send to the server.
     */
    const getUserLocationToSend = () => {
        let location = appContext.userLocation;
        if (location) {
            return {
                location: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    altitude: location.altitude
                },
                date: new Date()
            };
        }
        else {
            return false;
        }

    }
     
    /**
     * Retrieve all the necessary informations for the current planet
     */
    const getSelectedPlanetPosition = async () => {
        let userLocation = getUserLocationToSend();

        if (userLocation) {
            setIsLoading(true);

            let postSettings = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userLocation)
            };

            let response = await fetch(`${appContext.SERVER_API_URL}/${appContext.selectedPlanet.planetName}`, postSettings);
            let data = await response.json();
            appContext.setSelectedPlanet({ position: data.message });
            setIsLoading(false);
        }
        else {
        }
    }

    /**
     * A simple method that return a view depending on a condition
     */
    const viewManager = () => {
        if (isLoading) {
            return (
                <LoadingScreen />
            );
        }
        else {
            return (
                <>
                    <CompassImage />
                    {appContext.firstTimeOpenCompass ? <CompassHelper /> : null}
                </>
            );
        }
    }

    useEffect(() => {
        getSelectedPlanetPosition();
    }, []);

    return (
        <ImageBackground source={image} imageStyle={styles.imageStyle} style={styles.image}>
            {viewManager()}
        </ImageBackground>
    );
}

export default Compass;