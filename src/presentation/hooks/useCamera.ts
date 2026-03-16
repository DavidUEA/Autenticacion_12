import { useState } from 'react';
import { launchCamera, PhotoQuality } from 'react-native-image-picker';

export const useCamera = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const takePicture = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.5 as PhotoQuality, // Calidad media para que no pese tanto
      saveToPhotos: true,
    });

    if (result.didCancel) {
      console.log('Usuario canceló la cámara');
      return;
    }

    if (result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      if (uri) {
        setImageUri(uri);
      }
    }
  };

  return {
    // Propiedades
    imageUri,

    // Métodos
    takePicture,
  };
};