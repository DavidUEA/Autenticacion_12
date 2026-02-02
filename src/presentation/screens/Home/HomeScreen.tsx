import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();


  const onLogoutPressed = () => {

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  const onSearchTripPressed = () => {
      // Cambia la alerta por esto:
      navigation.navigate('SearchTrip');
  };

  const onPublishTripPressed = () => {
    Alert.alert("Próximamente", "Aquí publicarás tu ruta.");
    // navigation.navigate('PublishTrip');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Hola, Usuario 👋</Text>
        <Text style={styles.subText}>¿Qué quieres hacer hoy?</Text>
      </View>

      <View style={styles.buttonsContainer}>
        {/* Opción para Pasajero */}
        <TouchableOpacity style={[styles.card, styles.searchCard]} onPress={onSearchTripPressed}>
          <Text style={styles.cardIcon}>🔍</Text>
          <Text style={styles.cardTitle}>Buscar Viaje</Text>
          <Text style={styles.cardDesc}>Encuentra un conductor que vaya a tu destino.</Text>
        </TouchableOpacity>

        {/* Opción para Conductor */}
        <TouchableOpacity style={[styles.card, styles.publishCard]} onPress={onPublishTripPressed}>
          <Text style={styles.cardIcon}>🚗</Text>
          <Text style={styles.cardTitle}>Publicar Viaje</Text>
          <Text style={styles.cardDesc}>Comparte tu auto y divide gastos.</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onLogoutPressed} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
  header: {
    padding: 20,
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  buttonsContainer: {
    padding: 20,
    gap: 20,
  },
  card: {
    padding: 20,
    borderRadius: 15,
    elevation: 5, // Sombra en Android
    shadowColor: "#000", // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  searchCard: {
    backgroundColor: '#007AFF', // Azul
  },
  publishCard: {
    backgroundColor: '#34C759', // Verde
  },
  cardIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  cardDesc: {
    fontSize: 14,
    color: '#E0E0E0', // Blanco grisáceo
  },
  logoutButton: {
    marginTop: 'auto',
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  logoutText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
});