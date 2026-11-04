import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const COLORES = ['#4338CA', '#0F766E', '#BE123C', '#B45309'];

function App() {
  const { width, height } = useWindowDimensions();
  const horizontal = width > height;

  const [colorIdx, setColorIdx] = useState(0);
  const [toques, setToques] = useState(0);

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(40)).current;
  const pulso = useRef(new Animated.Value(1)).current;
  const botonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrada: aparece y sube a la vez
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // Latido infinito del emoji
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulso, { toValue: 1.15, duration: 800, useNativeDriver: true }),
        Animated.timing(pulso, { toValue: 1, duration: 800, useNativeDriver: true }),
      ]),
    ).start();
  }, [fade, slide, pulso]);

  const alPresionar = () => {
    setToques(n => n + 1);
    setColorIdx(i => (i + 1) % COLORES.length);
    Animated.sequence([
      Animated.timing(botonScale, { toValue: 0.92, duration: 80, useNativeDriver: true }),
      Animated.spring(botonScale, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={[styles.container, { backgroundColor: COLORES[colorIdx] }]}>
        <Animated.View
          style={[styles.centro, { opacity: fade, transform: [{ translateY: slide }] }]}>
          <Animated.Text style={[styles.emoji, { transform: [{ scale: pulso }] }]}>
            🚀
          </Animated.Text>
          <Text style={styles.titulo}>¡Hola Mundo!</Text>
          <Text style={styles.subtitulo}>Mi primera app con React Native</Text>
          <Text style={styles.info}>
            {horizontal ? 'Modo horizontal' : 'Modo vertical'} · {Math.round(width)}×
            {Math.round(height)}
          </Text>

          <Animated.View style={{ transform: [{ scale: botonScale }] }}>
            <Pressable style={styles.boton} onPress={alPresionar}>
              <Text style={styles.botonTexto}>Tócame ({toques})</Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  emoji: { fontSize: 72, marginBottom: 12 },
  titulo: { fontSize: 36, fontWeight: 'bold', color: '#fff' },
  subtitulo: { fontSize: 16, color: '#fff', marginTop: 6 },
  info: { fontSize: 13, color: '#E5E7EB', marginTop: 10, marginBottom: 28 },
  boton: {
    backgroundColor: '#fff',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 30,
  },
  botonTexto: { fontSize: 16, fontWeight: '600', color: '#111827' },
});

export default App;