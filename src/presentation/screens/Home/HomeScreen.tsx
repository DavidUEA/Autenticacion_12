import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
  Image
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

// 1. IMPORTAMOS TUS HOOKS DE HARDestWARE (Asegúrate de haber creado estos archivos)
import { useLocation } from '../../hooks/useLocation';
import { useCamera } from '../../hooks/useCamera';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();

  // 2. INICIALIZAMOS LOS HOOKS (Arquitectura Desacoplada - Actividad C)
  const { position, getLocation } = useLocation();
  const { imageUri, takePicture } = useCamera();

  const onLogoutPressed = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  const onSearchTripPressed = () => {
    navigation.navigate('SearchTrip');
  };

  const onPublishTripPressed = () => {
    Alert.alert("Próximamente", "Aquí publicarás tu ruta.");
  };

  // Lógica de autenticación previa
  const probarEndpointProtegido = async () => {
    try {
      const token = await EncryptedStorage.getItem('user_session');
      if (!token) {
        Alert.alert('Error', 'No hay token guardado.');
        return;
      }
      const response = await axios.get('http://10.0.2.2:3000/api/perfil', {
        headers: { Authorization: `Bearer ${token}` }
      });
      Alert.alert('🔒 Acceso VIP Exitoso', response.data.mensaje);
    } catch (error: any) {
      Alert.alert('❌ Error', 'Acceso denegado.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>

        <View style={styles.header}>
          <Text style={styles.welcomeText}>Hola, Andy 👋</Text>
          <Text style={styles.subText}>Panel de Funcionalidades Nativas</Text>
        </View>

        {/* --- SECCIÓN DE HARDWARE (Taller Actual) --- */}
        <View style={styles.nativeSection}>
          <Text style={styles.sectionTitle}>Funcionalidades de Hardware</Text>

          <View style={styles.row}>
            {/* BOTÓN GPS */}
            <TouchableOpacity
              onPress={getLocation}
              style={[styles.nativeButton, { backgroundColor: '#673AB7' }]}
            >
              <Text style={styles.buttonText}>📍 Ubicación</Text>
            </TouchableOpacity>

            {/* BOTÓN CÁMARA */}
            <TouchableOpacity
              onPress={takePicture}
              style={[styles.nativeButton, { backgroundColor: '#E91E63' }]}
            >
              <Text style={styles.buttonText}>📸 Cámara</Text>
            </TouchableOpacity>
          </View>

          {/* Resultado de Ubicación */}
          {position && (
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>Lat: {position.lat.toFixed(4)} | Lon: {position.lon.toFixed(4)}</Text>
            </View>
          )}

          {/* Resultado de Cámara */}
          {imageUri && (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
              <Text style={styles.imageLabel}>Foto capturada con éxito</Text>
            </View>
          )}
        </View>

        {/* --- SECCIÓN DE VIAJES --- */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.card, styles.searchCard]} onPress={onSearchTripPressed}>
            <Text style={styles.cardTitle}>🔍 Buscar Viaje</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, styles.publishCard]} onPress={onPublishTripPressed}>
            <Text style={styles.cardTitle}>🚗 Publicar Viaje</Text>
          </TouchableOpacity>
        </View>

        {/* --- BOTONES DE TAREA Y SESIÓN --- */}
        <TouchableOpacity onPress={probarEndpointProtegido} style={styles.testButton}>
          <Text style={styles.testButtonText}>Probar Endpoint Protegido (JWT)</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onLogoutPressed} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FBFC' },
  header: { padding: 20, marginTop: 10 },
  welcomeText: { fontSize: 26, fontWeight: 'bold', color: '#333' },
  subText: { fontSize: 16, color: 'gray' },

  nativeSection: { padding: 20, backgroundColor: '#fff', margin: 15, borderRadius: 15, elevation: 3 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#444' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  nativeButton: { flex: 0.48, padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },

  infoBox: { backgroundColor: '#F3E5F5', padding: 10, borderRadius: 8, alignItems: 'center' },
  infoText: { color: '#4A148C', fontWeight: '600' },

  imagePreviewContainer: { marginTop: 15, alignItems: 'center' },
  previewImage: { width: '100%', height: 200, borderRadius: 10, backgroundColor: '#eee' },
  imageLabel: { marginTop: 5, color: 'green', fontSize: 12 },

  buttonsContainer: { padding: 20, gap: 15 },
  card: { padding: 20, borderRadius: 15, elevation: 2 },
  searchCard: { backgroundColor: '#007AFF' },
  publishCard: { backgroundColor: '#34C759' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: 'white' },

  testButton: { backgroundColor: '#FF9800', marginHorizontal: 20, padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  testButtonText: { color: 'white', fontWeight: 'bold' },
  logoutButton: { marginTop: 20, padding: 15, alignItems: 'center' },
  logoutText: { color: 'red', fontWeight: 'bold' },
});