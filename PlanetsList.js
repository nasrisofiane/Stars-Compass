import React, { useContext, useState } from 'react';
import { View, Dimensions, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { AppContext } from './AppContext';
import PlanetsImage from './assets/images/planets/PlanetsImage';

const PlanetsList = () => {

    const [windowWidth] = useState(Dimensions.get('window').width);
    const appContext = useContext(AppContext);
    const [imagesLoaded, setImageLoaded] = useState(false);

    /**
     * If a planet is pressed, pass the name of the planet to the appConext Method and retrieve user's location
     * @param {*} planetName 
     */
    const onPlanetPressed = (planetName) => {
        appContext.getUserLocation();
        appContext.setSelectedPlanet({ planetName: planetName });

    }

    /**
     * Return an Image that will retrieve the correct picture depending on the planet's name
     * @param {*} planetName 
     * @param {*} index 
     */
    const addPlanetImage = (planetName, index) => {
        //variable that get saturn style, as it's a special image more wide than other
        const saturnImage = planetName === "Saturn" ? styles.saturnImage : null;

        return <Image style={[styles.image, saturnImage]} source={PlanetsImage[planetName]} onLoadEnd={() => { planetEndLoading(index) }} fadeDuration={0} />
    }

    /**
     * Method that will setImageLoaded to true once the last picture has been returned and displayed on the user's screen
     * @param {*} index 
     */
    const planetEndLoading = (index) => {

        //If index + 1 correspond to the numbers of planets, it mean that this index is the last picture.
        if (index + 1 == appContext.planetsName.length) {
            setImageLoaded(true);
        }
    }

    /**
     * Return all planets with their name and picture
     */
    const createPlanets = () => {
        return (
            appContext.planetsName.map((planetName, index) => {

                //Check if translation texts are available
                if (appContext.translation.texts) {

                    return (
                        <TouchableOpacity key={index} style={styles.container} onPress={() => onPlanetPressed(planetName)}>

                            {/*View that is not shown until all image are loaded thanks to the opacity that is equal to 0 until all pictures are loaded*/}
                            <View style={{ ...styles.planetInfos, opacity: imagesLoaded ? 1 : 0 }}>

                                {addPlanetImage(planetName, index)}
                                <Text style={styles.planetName}>{appContext.translation.texts.planetsName[planetName]}</Text>

                            </View>

                        </TouchableOpacity>
                    );
                }
            })
        )
    }

    const styles = StyleSheet.create({
        planetsContainer: {
            width: windowWidth,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around"
        },

        planetInfos: {
            flexDirection: 'row',
            width: windowWidth / 3.1,
            maxWidth: 165,
            padding: 5,
            marginTop: 5,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#333399"
        },

        planetName: {
            marginTop: 5,
            color: "#FFF",
            fontFamily: "A-Space Regular Demo"
        },

        image: {
            zIndex: 100,
            width: 40,
            height: 40
        },

        saturnImage: {
            transform: [{ rotate: "20deg" }],
            height: 40,
            width: 98,
        }
    });

    return (
        <View style={styles.planetsContainer}>
            {createPlanets()}
        </View>
    );
}

export default PlanetsList;