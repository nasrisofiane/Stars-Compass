import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { AppContextProvider, AppContext } from './AppContext';
import Compass from './Compass';
import PlanetsScreen from './PlanetsScreen';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './Navigation';
import ErrorModal from './ErrorModal';
import LanguageScreen from './LanguageScreen';

const App: () => React$Node = () => {

  const [actualScreen, setActualScreen] = useState('');
  const [hasError, setHasError] = useState('');
  const [translationWindowOpened, setTranslationWindowOpened] = useState(true);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  /**
   * A simple screen manager
   */
  const screensManager = () => {
    if (actualScreen === 'planets') {
      return <PlanetsScreen />;
    }
    else if (actualScreen === 'compass') {
      return <Compass />
    }
  }

  /**
   * Method that will display an error message to the user's screen if has error is not empty
   */
  const errorModalManager = () => {
    if (hasError != '') {
      return <ErrorModal message={hasError}/>
    }
  }

  return (
    <AppContextProvider>
      <AppContext.Consumer>
        {
          value => {
            setActualScreen(value.actualScreen);
            setHasError(value.hasError);
            setTranslationWindowOpened(value.translationWindowOpened);
          }
        }
      </AppContext.Consumer>

      {screensManager()}
      <Navigation />
      {errorModalManager()}
      {translationWindowOpened ? <LanguageScreen/> : null}

    </AppContextProvider>
  );
};

export default App;
