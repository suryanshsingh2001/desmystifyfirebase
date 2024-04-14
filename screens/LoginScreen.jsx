import {View, Text, Button} from 'react-native';
import {signInAnonymously} from '../Firebase/auth';

const LoginScreen = ({navigation}) => {
  const handleLogin = async () => {
    await signInAnonymously();
    console.log('User Logged In');
  };

  return (
    <View style={{flex:1, alignItems: "center", margin: 10}}>
      <Text style={{fontSize: 20, color: "black", marginBottom: 20}}>Login Screen</Text>
      <Button title="Click To Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
