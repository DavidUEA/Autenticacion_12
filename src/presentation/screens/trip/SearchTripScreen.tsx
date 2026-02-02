import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// 1. Datos de prueba (Fake Data) para simular viajes
const DATA_VIAJES = [
  { id: '1', conductor: 'Juan Pérez', origen: 'Centro', destino: 'Norte', precio: '$2.50', hora: '14:00' },
  { id: '2', conductor: 'Maria Lopez', origen: 'Mall del Río', destino: 'Aeropuerto', precio: '$3.00', hora: '14:30' },
  { id: '3', conductor: 'Carlos Ruiz', origen: 'Estadio', destino: 'Sur', precio: '$1.50', hora: '15:00' },
];

export const SearchTripScreen = () => {
  const navigation = useNavigation();

  // 2. Cómo se ve cada tarjeta de viaje
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconContainer}>
        <Text style={{fontSize: 24}}>🚗</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.ruta}>{item.origen} ➝ {item.destino}</Text>
        <Text style={styles.conductor}>Conductor: {item.conductor}</Text>
        <Text style={styles.hora}>Salida: {item.hora}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{item.precio}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Viajes Disponibles</Text>

      <FlatList
        data={DATA_VIAJES}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F9FBFC' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: { justifyContent: 'center', marginRight: 15 },
  infoContainer: { flex: 1, justifyContent: 'center' },
  ruta: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  conductor: { fontSize: 14, color: 'gray' },
  hora: { fontSize: 14, color: '#007AFF', marginTop: 4 },
  priceContainer: { justifyContent: 'center' },
  price: { fontSize: 18, fontWeight: 'bold', color: '#27AE60' },
});