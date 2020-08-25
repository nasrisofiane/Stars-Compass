import React, {  useState, useContext } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { AppContext } from './AppContext';
import { Icon } from 'react-native-elements';

const Navigation = () => {
    const [windowWidth] = useState(Dimensions.get('window').width);
    const appContext = useContext(AppContext);

    const styles = StyleSheet.create({
        navigation: {
            backgroundColor: '#FFE600',
            width: windowWidth,
            height: 55,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
        },

        buttons: {
            flex: 1,
            height: 55,
            justifyContent: 'center',
        },

        earthIcon: {
            color: appContext.actualScreen === 'planets' ? '#FFF' : '#333399'
        },

        compassIcon: {
            color: appContext.actualScreen === 'compass' ? '#FFF' : '#333399'
        }
    });

    /**
     * Pass screenname to the appContext method to switch between screens
     * @param {*} screenName 
     */
    const handleGoToScreen = (screenName) => {
        if (screenName === 'compass') {
            if (!appContext.selectedPlanet.planetName) {
                
                //if no planet has been selected an error will be shown on the user's screen
                appContext.setHasError(appContext.translation.texts.errors.noPlanetSelected);
                return;
            }
        }

        appContext.setActualScreen(screenName);
    }

    const languageScreen = () => {
        appContext.setTranslationWindowOpened(true);
    }


    return (
        <View style={styles.navigation}>
            <TouchableOpacity style={styles.buttons} onPress={() => handleGoToScreen('planets')}>
                <Icon name='earth' color={styles.earthIcon.color} type='fontisto' size={35} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons} onPress={languageScreen}>
                <Icon name='language' color="#333399" type='fontisto' size={28} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons} onPress={() => handleGoToScreen('compass')}>
                <Icon name='compass' color={styles.compassIcon.color} type='fontisto' size={35} />
            </TouchableOpacity>
        </View>
    );
}

export default Navigation;