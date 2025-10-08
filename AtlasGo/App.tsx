import React from 'react';
import { SafeAreaView, View, Text, Pressable, StyleSheet, StatusBar, Dimensions } from 'react-native';

const PINK = '#FF2C6B';    // background color
const NAVY = '#0B2A86';    // dark blue accent
const WHITE = '#FFFFFF';

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.screen}>
        {/* Top-right navy circular shape */}
        <View style={[styles.circle, styles.circleTopRight]} />

        {/* Bottom-left navy circular shape */}
        <View style={[styles.circle, styles.circleBottomLeft]} />

        {/* Main title text */}
        <Text style={styles.title}>Track the{'\n'}bus</Text>

        {/* Center bottom white round button */}
        <Pressable style={styles.cta}>
          <Text style={styles.ctaArrow}>→</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const CIRCLE = width * 0.85; // diameter of decorative circles

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: PINK },
  screen: {
    flex: 1,
    backgroundColor: PINK,
    overflow: 'hidden',
    paddingHorizontal: 28,
    justifyContent: 'center',
  },

  // Decorative navy circles
  circle: {
    position: 'absolute',
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
    backgroundColor: NAVY,
    opacity: 1,
  },
  circleTopRight: {
    top: -CIRCLE * 0.35,
    right: -CIRCLE * 0.25,
  },
  circleBottomLeft: {
    bottom: -CIRCLE * 0.30,
    left: -CIRCLE * 0.35,
  },

  // Title text
  title: {
    color: WHITE,
    fontSize: 44,
    fontWeight: '800',
    lineHeight: 50,
  },

  // White circular button
  cta: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 48,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaArrow: {
    fontSize: 26,
    color: NAVY,
    fontWeight: '700',
    marginTop: -2,
  },
});
