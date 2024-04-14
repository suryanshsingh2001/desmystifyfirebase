import {View, Text, Button} from 'react-native';
import React, { useEffect } from 'react';
import {getCurrentUser, signOut} from '../Firebase/auth';

const HomeScreen = ({navigation}) => {
  const handleLogout = async () => {
    await signOut();
    console.log('User Logged Out');
  };

 
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text
        style={{
          color: 'black',
          margin: 10,
          padding: 10,
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        Demystify Firebase
      </Text>

      <View style={{margin: 10, padding: 10, flexDirection: 'row', columnGap: 10}}>
        <Button
          title="Go to Profile"
          onPress={() => navigation.navigate('Profile')}
          color={'#f194ff'}
        />

        <Button
          title="Go to Posts"
          onPress={() => navigation.navigate('Posts')}
          color={'#f194ff'}
        />

        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default HomeScreen;
