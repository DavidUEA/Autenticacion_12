import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { SearchTripScreen } from '../screens/trip/SearchTripScreen';
// import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen'; // Asegúrate de tener este archivo o bórralo si no lo usas
import { OnboardingScreen } from '../screens/auth/OnboardingScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    // Agregué el espacio que faltaba antes de initialRouteName
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Onboarding">

      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SearchTrip" component={SearchTripScreen} />

    </Stack.Navigator>
  );
};