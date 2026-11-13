import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WelcomeScreen = ({ navigation }: any) => {
  const { width, height } = useWindowDimensions();

  // Adjust text sizes according to the screen size
  const titleSize = Math.min(Math.max(width * 0.075, 25), 36);
  const quoteSize = Math.min(Math.max(width * 0.045, 15), 20);
  const compactScreen = height < 700;
  const logoSize = compactScreen ? 82 : 105;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={require('../assets/Gym background.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <Image
              source={require('../assets/fitness logo.jpg')}
              style={[
                styles.logo,
                {
                  width: logoSize,
                  height: logoSize,
                  borderRadius: logoSize / 2,
                },
              ]}
              resizeMode="cover"
              accessibilityLabel="Fitness Club logo"
            />

            <Text
              style={[
                styles.title,
                {
                  fontSize: titleSize,
                  lineHeight: titleSize * 1.3,
                },
              ]}
            >
              Welcome to{' '}
              <Text style={styles.brandName}>Fitness Club!</Text>
            </Text>

            <Text
              style={[styles.quote, { fontSize: quoteSize }]}
            >
              Eat, Sleep, Train, Repeat
            </Text>

            <View style={styles.spacer} />

            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => navigation.navigate('UserLogin')}
              accessibilityRole="button"
              accessibilityLabel="Get Started"
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </Pressable>

            <Text style={styles.footer}>
              YOUR FITNESS JOURNEY STARTS HERE
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111813',
  },

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(17, 24, 19, 0.68)',
  },

  safeArea: {
    flex: 1,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '7%',
    paddingVertical: 20,
  },

  logo: {
    marginBottom: 28,
    borderWidth: 2,
    borderColor: '#B7F34B',
    overflow: 'hidden',
  },

  title: {
    color: '#FFFFFF',
    fontWeight: '800',
    textAlign: 'center',
  },

  brandName: {
    color: '#B7F34B',
  },

  quote: {
    color: '#FFFFFF',
    marginTop: 18,
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.5,
  },

  spacer: {
    flexGrow: 0.65,
    minHeight: 35,
  },

  button: {
    width: '100%',
    maxWidth: 420,
    minHeight: 56,
    backgroundColor: '#B7F34B',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },

  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  buttonText: {
    color: '#111813',
    fontSize: 17,
    fontWeight: '800',
  },

  footer: {
    color: '#FFFFFF',
    opacity: 0.75,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: 22,
  },
});

export default WelcomeScreen;