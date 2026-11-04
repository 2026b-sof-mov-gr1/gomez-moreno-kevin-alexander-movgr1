import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Animated, Dimensions, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

function App() {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 3.5, // Expande el círculo hasta cubrir la pantalla
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.spring(translateYAnim, {
          toValue: 0,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        })
      ])
    ]).start();
  }, [scaleAnim, translateYAnim, opacityAnim]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      <Animated.View style={[
        styles.circleBackground,
        { transform: [{ scale: scaleAnim }] }
      ]} />
      
      <Animated.View style={[
        styles.textContainer,
        { 
          opacity: opacityAnim,
          transform: [{ translateY: translateYAnim }] 
        }
      ]}>
        <Text style={styles.title}>¡Hola Mundo!</Text>
        <Text style={styles.subtitle}>Experiencia a pantalla completa 🌌</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09090B', overflow: 'hidden' },
  circleBackground: {
    position: 'absolute',
    top: height / 2 - width / 2,
    left: 0,
    width: width,
    height: width,
    borderRadius: width / 2,
    backgroundColor: '#4338CA',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: { 
    fontSize: 52, 
    fontWeight: '900', 
    color: '#FFFFFF', 
    textAlign: 'center', 
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10 
  },
  subtitle: { 
    fontSize: 20, 
    color: '#E0E7FF', 
    fontWeight: '500', 
    textAlign: 'center' 
  }
});

export default App;