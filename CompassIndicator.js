import { useEffect } from 'react';
import CompassHeading from 'react-native-compass-heading';

const Indicator = (props) => {

    useEffect(() => {
        
        //Number of degrees to update the compass
        const degree_update_rate = 1;
        
        CompassHeading.start(degree_update_rate, degree => {
            props.getHeadingDegrees(degree);
        });

        return () => {
            CompassHeading.stop();
        };
    }, []);

    return null;
};

export { Indicator };