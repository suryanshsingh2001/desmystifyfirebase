import {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import MainStackNavigator from './routes/MainStackNavigator';
import AuthStackNavigator from './routes/AuthStackNavigator';
import auth from '@react-native-firebase/auth';

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  //Handles user state changes
  const onAuthStateChanged = (user: any) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default App;
