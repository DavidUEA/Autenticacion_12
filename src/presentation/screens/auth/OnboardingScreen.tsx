import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomButton } from '../../components/CustomButton';

const { width } = Dimensions.get('window');

// Datos de las 3 pantallas de introducción
const SLIDES = [
  {
    id: '1',
    title: '¡Bienvenido!',
    description: 'La forma más segura y económica de viajar entre ciudades en Ecuador.',
    icon: '👋',
  },
  {
    id: '2',
    title: 'Ahorra Dinero',
    description: 'Comparte los gastos de gasolina con otros pasajeros o conductores.',
    icon: '💰',
  },
  {
    id: '3',
    title: 'Viaja Seguro',
    description: 'Validamos la identidad de todos los miembros para tu tranquilidad.',
    icon: 'shield',
  },
];

export const OnboardingScreen = () => {
  const navigation = useNavigation<any>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Detectar qué diapositiva se está viendo
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  // Acción para ir al Registro
  const onFinish = () => {
    // replace evita que puedan volver atrás al onboarding
    navigation.replace('Register');
  };

  // Acción del botón Siguiente
  const onNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      onFinish();
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.slide}>
      <Text style={styles.icon}>{item.icon === 'shield' ? '🛡️' : item.icon}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Carrusel */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />

      {/* Puntitos indicadores */}
      <View style={styles.pagination}>
        {SLIDES.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.dotActive,
            ]}
          />
        ))}
      </View>

      {/* Botones */}
      <View style={styles.footer}>
        {currentIndex < SLIDES.length - 1 ? (
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onFinish} style={styles.skipButton}>
              <Text style={styles.skipText}>Saltar</Text>
            </TouchableOpacity>

            <View style={{ width: 150 }}>
              <CustomButton text="Siguiente" onPress={onNext} />
            </View>
          </View>
        ) : (
          <CustomButton text="¡Empezar!" onPress={onFinish} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  slide: {
    width: width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  icon: { fontSize: 80, marginBottom: 20 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  dotActive: {
    backgroundColor: '#007AFF',
    width: 20,
  },
  footer: {
    padding: 20,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: { padding: 10 },
  skipText: { color: 'gray', fontSize: 16, fontWeight: '600' },
});