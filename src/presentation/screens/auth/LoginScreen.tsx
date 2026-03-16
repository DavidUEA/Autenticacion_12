import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

export const LoginScreen = () => {
  const navigation = useNavigation<any>();

  // Dejamos tu usuario del backend por defecto para probar rápido
  const [email, setEmail] = useState('david_34@hotmail.es');
  const [password, setPassword] = useState('password123');

  const onLoginPressed = async () => {
      if (email === '' || password === '') {
          Alert.alert("Error", "Por favor ingresa correo y contraseña");
          return;
      }

      try {
          // 1. Viajamos al servidor para pedir el token (Actividad A)
          const response = await axios.post('http://10.0.2.2:3000/api/login', {
              email: email,
              password: password
          });

          // 2. Extraemos el "Pase VIP" (Token)
          const token = response.data.token;

          // 3. ACTIVIDAD D: Guardar el token en la "caja fuerte"
          await EncryptedStorage.setItem('user_session', token);

          Alert.alert('¡Éxito!', 'Sesión iniciada. Token guardado en bóveda de seguridad.');

          // 4. Navegar a la pantalla principal
          navigation.navigate('Home');

      } catch (error: any) {
          // Si el servidor nos rechaza o está apagado
          if (error.response) {
              Alert.alert('Error', error.response.data.mensaje);
          } else {
              Alert.alert('Error', 'No se pudo conectar. ¿El servidor backend está encendido?');
          }
      }
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