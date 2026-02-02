import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

export const LoginScreen = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginPressed = () => {

      if (email === '' || password === '') {
          Alert.alert("Error", "Por favor ingresa correo y contraseña");
          return;
      }

      navigation.navigate('Home');
  };


  const onForgotPasswordPressed = () => {
      console.warn('Olvidé contraseña');

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Travel Compartido</Text>
      <Text style={styles.subtitle}>Bienvenido de nuevo</Text>

      <CustomInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />

      <CustomInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <CustomButton text="Iniciar Sesión" onPress={onLoginPressed} />

      <CustomButton
        text="¿Olvidaste tu contraseña?"
        onPress={onForgotPasswordPressed}
        type="SECONDARY"
      />

      <CustomButton
        text="¿No tienes cuenta? Regístrate"
        onPress={() => navigation.navigate('Register')}
        type="SECONDARY"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FBFC',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 30,
  },
});