import React from 'react';
// 1. Importamos el contenedor principal que maneja la navegación
import { NavigationContainer } from '@react-navigation/native';

// 2. Importamos el "mapa" de rutas que creamos en el Paso 2
import { AppNavigator } from './src/presentation/navigation/AppNavigator';

function App(): React.JSX.Element {
  return (
    // 3. Envolvemos toda la app en el NavigationContainer para que funcionen los cambios de pantalla
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default App;