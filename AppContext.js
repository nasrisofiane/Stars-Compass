import React, { createContext, useState, useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import { SERVER_API_URL } from 'react-native-dotenv';
import Geolocation from 'react-native-geolocation-service';
import frenchTranslation from './assets/langs/fr_FR.json';
import japaneseTranslation from './assets/langs/jp_JP.json';
import englishTranslation from './assets/langs/en_EN.json';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const [planetsName, setPlanetsName] = useState([]);
    const [selectedPlanet, setSelectedPlanet] = useState({ planetName: null, position: {} });
    const [hasLocationPermission, setHasLocationPermission] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [actualScreen, setActualScreen] = useState('planets');
    const [hasError, setHasError] = useState('');
    const [firstTimeOpenCompass, setFirstTimeOpenCompass] = useState(true);
    const [translation, setTranslation] = useState({});
    const [translationWindowOpened, setTranslationWindowOpened] = useState(true);

    /**
     * Set all the application texts to the selected language
     */
    const setTranslationText = () => {
        let text;

        switch (translation.lang) {
            case 'FR':
                text = frenchTranslation;
                break;

            case 'EN':
                text = englishTranslation;
                break;

            case 'JP':
                text = japaneseTranslation;
                break;

            default:
                text = englishTranslation;
                break;
        }
        setTranslation(prev => {return { ...prev , texts : text }});
    }

    /**
     * Request to the user the permission to access his location
     */
    const requestUserLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Stars tracker App Permission",
                    message: "Stars tracker App needs access to your current location to track stars from your current location",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "Ok"
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setHasLocationPermission(true);
            }
            else if(granted == "never_ask_again"){
                setHasLocationPermission("never_ask_again");
            } 
            else {
                setHasLocationPermission(false);
            }
            
        } catch (err) {
        }
    }

    /**
     * Get the user's current location, this method doing a single request and does not track the user's location.
     */
    const getUserLocation = () => {
        if (hasLocationPermission) {
            Geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation(position.coords);
                },
                (error) => {
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, forceRequestLocation: true }
            );
        }
    }

    /**
     * Get all planets name from the API
     */
    const getPlanetsName = async () => {
        try {
            let response = await fetch(SERVER_API_URL);

            if (response.ok) {
                const data = await response.json();
                setPlanetsName(data.planets);

            }
            else {
                setPlanetsName(null);
            }
        } catch (error) {
            setHasError(translation.texts.errors.noServerConnection);
        }


    }

    useEffect(() => {
        setTranslationText();
        getPlanetsName();
        requestUserLocationPermission();
    }, []);

    useEffect(() => {
        if (userLocation) {
            setActualScreen('compass');
        }

    }, [userLocation]);

    useEffect(() => {
        setTranslationText();
    }, [translation.lang]);

    return (
        <AppContext.Provider value={{
            SERVER_API_URL: SERVER_API_URL,
            planetsName: planetsName,
            hasLocationPermission: hasLocationPermission,
            userLocation: userLocation,
            selectedPlanet: selectedPlanet,
            setSelectedPlanet: (planetInfos) => {
                setSelectedPlanet(prev => { return { ...prev, ...planetInfos } });
            },
            requestUserLocationPermission: requestUserLocationPermission,
            getUserLocation: getUserLocation,
            setUserLocation: setUserLocation,
            setActualScreen: setActualScreen,
            hasError: hasError,
            setHasError: setHasError,
            actualScreen: actualScreen,
            firstTimeOpenCompass: firstTimeOpenCompass,
            setFirstTimeOpenCompass: setFirstTimeOpenCompass,
            translation : translation,
            setTranslation : setTranslation,
            translationWindowOpened : translationWindowOpened,
            setTranslationWindowOpened : setTranslationWindowOpened
        }}>
            {props.children}
        </AppContext.Provider>
    );
}
