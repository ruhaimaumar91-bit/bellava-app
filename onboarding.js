import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar,
  Dimensions, Animated,
} from 'react-native';
import COLORS from './colors';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: 1,
    emoji: '🌸',
    title: 'Know Your Cycle',
    subtitle: 'Track your period, predict ovulation, and understand your body like never before.',
    bg: '#FFF0F5',
    accent: COLORS,
  },
  {
    id: 2,
    emoji: '🤖',
    title: 'Meet Bella',
    subtitle: 'Your personal AI health companion. Ask anything about your health — anytime, in your language.',
    bg: '#F5EEFF',
    accent: COLORS,
  },
  {
    id: 3,
    emoji: '👥',
    title: 'You Are Not Alone',
    subtitle: 'Join a community of women who understand. Share, support, and grow together.',
    bg: '#E8F4FF',
    accent: COLORS,
  },
  {
    id: 4,
    emoji: '💜',
    title: 'Your Health Journey Starts Now',
    subtitle: 'Bellava is built for every woman — wherever you are in the world.',
    bg: '#FFF5E6',
    accent: COLORS,
  },
];

export default function OnboardingScreen({ onFinish }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const goToSlide = (index) => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
    setCurrentSlide(index);
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
  };

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      goToSlide(currentSlide + 1);
    } else {
      onFinish();
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Skip button */}
      <TouchableOpacity style={styles.skipBtn} onPress={onFinish}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Slides */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={styles.scrollView}
      >
        {SLIDES.map((slide, index) => (
          <Animated.View
            key={slide.id}
            style={[
              styles.slide,
              { backgroundColor: slide.bg },
              index === currentSlide && { opacity: fadeAnim },
            ]}
          >
            <View style={styles.emojiContainer}>
              <Text style={styles.emoji}>{slide.emoji}</Text>
            </View>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.subtitle}>{slide.subtitle}</Text>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Dots */}
      <View style={styles.dotsRow}>
        {SLIDES.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dot, currentSlide === index && styles.dotActive]}
            onPress={() => goToSlide(index)}
          />
        ))}
      </View>

      {/* Next / Get Started button */}
      <View style={styles.bottomArea}>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextBtnText}>
            {currentSlide === SLIDES.length - 1 ? 'Get Started 💜' : 'Next →'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  skipBtn: {
    position: 'absolute',
    top: 56,
    right: 24,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(0,0,0,0.06)',
    borderRadius: 50,
  },
  skipText: { fontSize: 14, color: COLORS.textLight, fontWeight: '600' },
  scrollView: { flex: 1 },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  emojiContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  emoji: { fontSize: 64 },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 10,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
    width: 24,
  },
  bottomArea: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  nextBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});
