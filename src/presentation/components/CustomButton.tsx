import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  text: string;
  onPress: () => void;
  type?: 'PRIMARY' | 'SECONDARY';
}

export const CustomButton = ({ text, onPress, type = 'PRIMARY' }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, type === 'PRIMARY' ? styles.primary : styles.secondary]}
    >
      <Text style={[styles.text, type === 'PRIMARY' ? styles.textPrimary : styles.textSecondary]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', padding: 15, marginVertical: 10, alignItems: 'center', borderRadius: 10 },
  primary: { backgroundColor: '#007AFF' },
  secondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#007AFF' },
  text: { fontWeight: 'bold' },
  textPrimary: { color: 'white' },
  textSecondary: { color: '#007AFF' },
});