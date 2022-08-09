import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/Screens/Login';
import Signup from './src/Screens/Signup';
import Home from './src/Screens/Home';
import Show from './src/Screens/Show'
import Employee from './src/Screens/Employee'

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      {/* <Stack.Screen options={{ headerShown: false }} name="Employee" component={Employee} /> */}
      <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />

        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Signup" component={Signup} />
        <Stack.Screen options={{ headerShown: false }} name="Show" component={Show} />




      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;