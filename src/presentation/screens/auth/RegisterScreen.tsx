import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';

// ---------------------------------------------------------
// 1. ESQUEMA DE VALIDACIÓN (ZOD)
// ---------------------------------------------------------
const registerSchema = z.object({
  fullName: z.string()
    .min(3, { message: 'El nombre es muy corto (mínimo 3 letras)' })
    .regex(/^[a-zA-Z\s]+$/, { message: 'El nombre solo debe contener letras' }),

  email: z.string()
    .email({ message: 'Ingresa un correo válido (ej: usuario@email.com)' }),

  password: z.string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    .regex(/[A-Z]/, { message: 'Debe incluir al menos una mayúscula' })
    .regex(/[0-9]/, { message: 'Debe incluir al menos un número' }),

  passwordConfirmation: z.string(),

  role: z.enum(['passenger', 'driver']), // Agregamos el rol al esquema
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Las contraseñas no coinciden",
  path: ["passwordConfirmation"],
});

// Tipo de dato automático
type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterScreen = () => {
  const navigation = useNavigation<any>();
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  // ---------------------------------------------------------
  // 2. CONFIGURACIÓN DEL FORMULARIO
  // ---------------------------------------------------------
  const { control, handleSubmit, setError, watch, setValue, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'passenger', // Valor por defecto
      fullName: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    mode: 'onChange'
  });

  // Observamos valores para lógica visual
  const currentRole = watch('role');
  const emailValue = watch('email');

  // ---------------------------------------------------------
  // 3. VALIDACIÓN ASÍNCRONA (Simulación de "Correo existe")
  // ---------------------------------------------------------
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (emailValue && !errors.email && emailValue.includes('@')) {
        setIsCheckingEmail(true);
        // Simulamos espera del servidor (1 segundo)
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (emailValue === 'test@test.com') {
          setError('email', { type: 'manual', message: '⚠️ Este correo ya está registrado' });
        }
        setIsCheckingEmail(false);
      }
    }, 500); // Debounce de 500ms

    return () => clearTimeout(timer);
  }, [emailValue]);

  // Acción Final
  const onRegisterPressed = (data: RegisterFormData) => {
    console.log("Formulario válido:", data);
    Alert.alert(
      "¡Bienvenido!",
      `Cuenta de ${data.role === 'passenger' ? 'Pasajero' : 'Conductor'} creada con éxito.`,
      [{ text: "OK", onPress: () => navigation.navigate('Home') }]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>
      <Text style={styles.subtitle}>Únete a Travel Compartido</Text>

      {/* CAMPO: NOMBRE */}
      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, value } }) => (
          <CustomInput placeholder="Nombre Completo" value={value} onChangeText={onChange} />
        )}
      />
      {errors.fullName && <Text style={styles.errorText}>{errors.fullName.message}</Text>}

      {/* CAMPO: EMAIL (Con loading) */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <View>
            <CustomInput
              placeholder="Correo Electrónico"
              value={value}
              onChangeText={(text: string) => onChange(text.toLowerCase())}
              keyboardType="email-address"
            />
            {isCheckingEmail && <ActivityIndicator size="small" color="#007AFF" style={styles.loader}/>}
          </View>
        )}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      {/* CAMPO: CONTRASEÑA */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <CustomInput placeholder="Contraseña" value={value} onChangeText={onChange} secureTextEntry />
        )}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      {/* CAMPO: CONFIRMAR CONTRASEÑA */}
      <Controller
        control={control}
        name="passwordConfirmation"
        render={({ field: { onChange, value } }) => (
          <CustomInput placeholder="Confirmar Contraseña" value={value} onChangeText={onChange} secureTextEntry />
        )}
      />
      {errors.passwordConfirmation && <Text style={styles.errorText}>{errors.passwordConfirmation.message}</Text>}

      {/* SELECCIÓN DE ROL (Integrado con React Hook Form) */}
      <View style={styles.roleContainer}>
        <Text style={styles.label}>Quiero registrarme como:</Text>
        <View style={styles.roleButtonsRow}>
            {/* Botón Pasajero */}
            <TouchableOpacity
              onPress={() => setValue('role', 'passenger')}
              style={[styles.roleBtn, currentRole === 'passenger' && styles.roleBtnActive]}
            >
              <Text style={[styles.roleText, currentRole === 'passenger' && styles.roleTextActive]}>Pasajero 🎒</Text>
            </TouchableOpacity>

            {/* Botón Conductor */}
            <TouchableOpacity
              onPress={() => setValue('role', 'driver')}
              style={[styles.roleBtn, currentRole === 'driver' && styles.roleBtnActive]}
            >
              <Text style={[styles.roleText, currentRole === 'driver' && styles.roleTextActive]}>Conductor 🚗</Text>
            </TouchableOpacity>
        </View>
      </View>

      <View style={{marginTop: 10}}>
        <CustomButton text="Registrarse" onPress={handleSubmit(onRegisterPressed)} />
      </View>

      <CustomButton
        text="¿Ya tienes cuenta? Inicia Sesión"
        onPress={() => navigation.navigate('Login')}
        type="SECONDARY"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9FBFC',
    flexGrow: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#051C60',
    marginBottom: 10,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center'
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
    fontWeight: '600'
  },
  loader: {
    position: 'absolute',
    right: 15,
    top: 15
  },
  roleContainer: {
    marginVertical: 15,
  },
  label: {
    marginBottom: 10,
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14
  },
  roleButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },
  roleBtn: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    backgroundColor: 'white',
    alignItems: 'center'
  },
  roleBtnActive: {
    backgroundColor: '#E8F1FF', // Fondo azul claro
    borderColor: '#007AFF',
  },
  roleText: {
    fontWeight: 'bold',
    color: 'gray'
  },
  roleTextActive: {
    color: '#007AFF'
  }
});