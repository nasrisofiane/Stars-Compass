import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated, Easing } from 'react-native';
import { AppContext } from './AppContext';
import PlanetsImage from './assets/images/planets/PlanetsImage';

const LoadingScreen = (props) => {
    const appContext = useContext(AppContext);
    const [spinAnim] = useState(new Animated.Value(0));

    const styles = StyleSheet.create({
        loading: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        },
    
        image: {
            width: 50,
            height: 50
        },
    
        imageSaturn : {
            width : 120,
            height : 50
        },
    
        text: {
            fontFamily : "A-Space Regular Demo",
            fontSize : 14,
            marginTop : 50,
            color: '#FFF'
        }
    });

    useEffect(() => {
        
        //Animation that will spin an element on mount time
        Animated.loop(Animated.timing(
            spinAnim,
            {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true
            }
        )).start();

    }, []);

    /**
     * Create an element with the previous animation attached to it to return the complete element.
     */
    const createSpinner = () => {
        
        let isSaturn = appContext.selectedPlanet.planetName === 'Saturn' ? styles.imageSaturn : null;

        const spin = spinAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });

        return (
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <Image style={[styles.image, isSaturn]} source={PlanetsImage[appContext.selectedPlanet.planetName]} />
            </Animated.View>
        );
    }

    return (
        <View style={styles.loading}>
            {createSpinner()}
            <Text style={styles.text}>{appContext.translation.texts.loading}</Text>
        </View>
    );
}

export default LoadingScreen;