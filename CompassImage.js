import React, { useState, useEffect, useContext, useRef } from 'react';
import { Animated, SafeAreaView, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { AppContext } from './AppContext';
import { Indicator } from './CompassIndicator';
import PhoneAngles from './PhoneAngles';
import arrowImage from './assets/images/arrow.png'
import rulerImage from './assets/images/ruler_degrees.png';

const CompassImage = () => {

  const [northDegrees, setNorthDegrees] = useState(0);
  const [trackedPlanetAzimuth, setTrackedPlanetAzimuth] = useState(0);
  const [trackedPlanetElevation, setTrackedPlanetElevation] = useState(0);
  const [trackedPlanetName, setTrackedPlanetName] = useState('Unknown');
  const [windowHeight] = useState(Dimensions.get('window').height);
  const [windowWidth] = useState(Dimensions.get('window').width);
  const [imageHeight] = useState(Image.resolveAssetSource(rulerImage).height);
  const [rulerPosition, setRulerPosition] = useState(0);
  const appContext = useContext(AppContext);
  const SmoothMoveTracker = useRef(new Animated.Value(0)).current;

  /**
   * Set the north degrees depending on the params
   * @param {*} degrees 
   */
  const getHeadingDegrees = (degrees) => {
    setNorthDegrees(degrees);
  }

  /**
   * Get the inclination of the user's phone and place the compass at the right height of the ruler
   * @param {*} pichDegrees 
   */
  const getRulerPosition = (pichDegrees) => {

    //Compass picture margin
    const compassMargin = 110;

    const heightForEachDegrees = imageHeight / 360;

    //Get the height for the compass position depending on the pich degrees
    const actualHeight = pichDegrees * heightForEachDegrees;

    //Compass picture has a margin, to get right height position of the compass image we have to subsctract compass picture margin.
    setRulerPosition(actualHeight - compassMargin);
  }

  /**
   * Place the planet on the ruler at the right height
   */
  const getPlanetDegrees = () => {

    //planets picture margin
    const planetMargin = 7.5;

    const heightForEachDegrees = imageHeight / 360;

    //get the right height of the planet position on the ruler
    const actualHeight = trackedPlanetElevation * heightForEachDegrees;

    //Substract the planet picture margin to get a more accurate position.
    return actualHeight - planetMargin;
  }

  /**
   * Add the planet image on the ruler
   */
  const addPlanetImage = () => {

    //If the tracked planet is Saturn, a specific styles is stored in this variable.
    let saturnImage = trackedPlanetName === "Saturn" ? styles.saturnImage : null;

    return <Image style={[styles.planetPosition, saturnImage]} source={PlanetsImage[trackedPlanetName]} />
  }

  /**
   * Retrieve the planet elevation
   */
  const handlePlanetElevation = () => {

    let elevation = parseFloat(appContext.selectedPlanet.position.elevation);

    if (elevation < 0) {

      //degrees are received as -180/+180, +360 will convert this datas into 0 to 360 
      elevation = elevation + 360;
    }
    setTrackedPlanetElevation(elevation);
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: windowHeight,
      justifyContent: "center",
      alignItems: "center"
    },

    northImage: {
      transform: [{ rotate: `${360 - northDegrees}deg` }]
    },

    trackedPlanetImage: {
      resizeMode: 'contain',
      height: 220,
      zIndex: 2,
      position: 'absolute',
      transform: [{ rotate: `${360 - northDegrees + trackedPlanetAzimuth}deg` }],
    },

    rulerDegrees: {

      resizeMode: 'contain',
      position: 'relative',
    },

    planetPosition: {
      height: 15,
      width: 15,
      position: 'absolute',
      right: 114,
      top: getPlanetDegrees()
    },

    saturnImage: {
      height: 15,
      width: 37,
      right: 102,
      transform: [{ rotate: "20deg" }]
    },

    scrollViewContent: {
      justifyContent: "center",
      alignItems: "center",
    },

    scrollView: {
      width: windowWidth
    }
  });

  useEffect(() => {

    setTrackedPlanetAzimuth(Math.round(appContext.selectedPlanet.position.azimuth));
    handlePlanetElevation();
    setTrackedPlanetName(appContext.selectedPlanet.planetName);

  }, [appContext.selectedPlanet.position]);

  useEffect(() => {

    //Animation that will move the compass from the previous position to the new position in a smooth way
    Animated.timing(
      SmoothMoveTracker,
      {
        toValue: rulerPosition,
        duration: 500,
        useNativeDriver: false,
      }
    ).start();

  }, [rulerPosition]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>

        <Indicator getHeadingDegrees={getHeadingDegrees} />
        <PhoneAngles getRulerPosition={getRulerPosition} />
        <Animated.Image style={{ ...styles.trackedPlanetImage, top: SmoothMoveTracker }} source={arrowImage} />
        <Image style={styles.rulerDegrees} source={rulerImage} />
        {addPlanetImage()}

      </ScrollView>
    </SafeAreaView>
  );
};

export default CompassImage;