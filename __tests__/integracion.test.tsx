import React from 'react';
import { render } from '@testing-library/react-native';
import { Text, TouchableOpacity, View } from 'react-native';

// Simulamos un componente de tu interfaz
const MiBotonComponente = () => (
  <View>
    <Text>Bienvenido Andy</Text>
    <TouchableOpacity>
      <Text>Presionar Ubicación</Text>
    </TouchableOpacity>
  </View>
);

describe('Pruebas de Integración: Componentes de UI', () => {
  test('Debe renderizar el mensaje de bienvenida y el botón correctamente', () => {
    const { getByText } = render(<MiBotonComponente />);

    // Verificamos que los textos existan en la pantalla
    expect(getByText('Bienvenido Andy')).toBeTruthy();
    expect(getByText('Presionar Ubicación')).toBeTruthy();
  });
});