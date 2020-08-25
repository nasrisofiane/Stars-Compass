import { useEffect } from 'react';
import { accelerometer, SensorTypes, setUpdateIntervalForType } from "react-native-sensors";

//Contain the subscription to the accelerometer
let subscription = null;

const PhoneAngles = (props) => {

    useEffect(() => {
        setUpdateIntervalForType(SensorTypes.accelerometer, 400);

        subscription = accelerometer.subscribe(({ x, y, z }) => {

            //Change the angle the phone will point to, - 90 will allow user's phone to point a planet with top of his phone.
            let degrees = (Math.atan2(z, -y) * 180 / Math.PI) - 90;

            if (degrees < 0) {

                //degrees are received as -180/+180, +360 will convert this datas into 0 to 360 
                degrees = Math.abs(degrees + 360);
            }
            
            props.getRulerPosition(degrees);
        });

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    return null;
}

export default PhoneAngles;