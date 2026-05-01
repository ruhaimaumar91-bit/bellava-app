import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, StatusBar, Animated,
  Dimensions, ScrollView,
} from 'react-native';
import COLORS from './colors';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    emoji: '💜',
    title: 'Welcome to Bellava',
    subtitle: 'Your personal women\'s health companion',
    description: 'Track your cycle, understand your body and get personalised health guidance — all in one beautiful app.',
    bg: '#FAF0F5',
    accent: '#C9748F',
    features: ['🌸 Cycle tracking', '🤖 AI health nurse Bella', '📚 Health academy'],
  },
  {
    id: '2',
    emoji: '🌸',
    title: 'Track & Understand',
    subtitle: 'Your body has a story to tell',
    description: 'Log symptoms, moods and cycle data to reveal patterns and get insights that help you live better every day.',
    bg: '#F5F0FF',
    accent: '#9B59B6',
    features: ['📅 Cycle & pregnancy tracking', '😊 Mood & symptom logging', '💊 Medication reminders'],
  },
  {
    id: '3',
    emoji: '🤖',
    title: 'Meet Bella',
    subtitle: 'Your AI health companion',
    description: 'Bella is your personal AI nurse available 24/7. Ask health questions, get cycle insights and receive caring support whenever you need it.',
    bg: '#F0FAF5',
    accent: '#27AE60',
    features: ['💬 24/7 health guidance', '🔒 Private & confidential', '🌍 Available in 6 languages'],
  },
];

export default function OnboardingScreen({ onFinish }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const goToSlide = (index) => {
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
    setCurrentSlide(index);
  };

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      goToSlide(currentSlide + 1);
    } else {
      onFinish();
    }
  };

  const handleScroll = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentSlide(index);
  };

  const slide = SLIDES[currentSlide];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: slide.bg }]}>
      <StatusBar barStyle="dark-content" backgroundColor={slide.bg} />

      {/* Skip Button */}
      <View style={styles.topBar}>
        <View />
        <TouchableOpacity onPress={onFinish} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Slides */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
      >
        {SLIDES.map((s, i) => (
          <View key={s.id} style={[styles.slide, { width, backgroundColor: s.bg }]}>

            {/* Emoji */}
            <View style={[styles.emojiCircle, { backgroundColor: s.accent + '22' }]}>
              <Text style={styles.slideEmoji}>{s.emoji}</Text>
            </View>

            {/* Text */}
            <Text style={[styles.slideTitle, { color: s.accent }]}>{s.title}</Text>
            <Text style={styles.slideSubtitle}>{s.subtitle}</Text>
            <Text style={styles.slideDesc}>{s.description}</Text>

            {/* Features */}
            <View style={styles.featuresBox}>
              {s.features.map((f, fi) => (
                <View key={fi} style={[styles.featureRow, { backgroundColor: s.accent + '15' }]}>
                  <Text style={styles.featureText}>{f}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom */}
      <View style={styles.bottom}>

        {/* Dots */}
        <View style={styles.dotsRow}>
          {SLIDES.map((_, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.dot,
                i === currentSlide
                  ? [styles.dotActive, { backgroundColor: slide.accent }]
                  : styles.dotInactive,
              ]}
              onPress={() => goToSlide(i)}
            />
          ))}
        </View>

        {/* Next / Get Started Button */}
        <TouchableOpacity
          style={[styles.nextBtn, { backgroundColor: slide.accent }]}
          onPress={handleNext}
        >
          <Text style={styles.nextBtnText}>
            {currentSlide === SLIDES.length - 1 ? 'Get Started 💜' : 'Next →'}
          </Text>
        </TouchableOpacity>

        {/* Already have account */}
        {currentSlide === SLIDES.length - 1 && (
          <TouchableOpacity onPress={onFinish} style={styles.loginRow}>
            <Text style={styles.loginText}>
              Already have an account? <Text style={[styles.loginLink, { color: slide.accent }]}>Log in</Text>
            </Text>
          </TouchableOpacity>
        )}

        {/* Disclaimer */}
        <Text style={styles.disclaimerText}>
          By continuing you agree to our Terms of Service and Privacy Policy.{'\n'}
          Bellava is not a substitute for professional medical advice.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 20, paddingTop: 8,
  },
  skipBtn: { padding: 8 },
  skipText: { fontSize: 15, color: '#9B8FA0', fontWeight: '600' },
  slide: {
    alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 32, paddingTop: 20,
  },
  emojiCircle: {
    width: 140, height: 140, borderRadius: 70,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 32,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 12, elevation: 3,
  },
  slideEmoji: { fontSize: 72 },
  slideTitle: { fontSize: 30, fontWeight: '800', textAlign: 'center', marginBottom: 8 },
  slideSubtitle: { fontSize: 16, color: '#9B8FA0', textAlign: 'center', marginBottom: 16, fontWeight: '600' },
  slideDesc: { fontSize: 15, color: '#2D1B2E', textAlign: 'center', lineHeight: 24, marginBottom: 24 },
  featuresBox: { width: '100%', gap: 8 },
  featureRow: {
    borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10,
    alignItems: 'center',
  },
  featureText: { fontSize: 14, fontWeight: '700', color: '#2D1B2E' },
  bottom: {
    paddingHorizontal: 24, paddingBottom: 32, paddingTop: 16,
    alignItems: 'center',
  },
  dotsRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  dot: { height: 8, borderRadius: 4 },
  dotActive: { width: 24 },
  dotInactive: { width: 8, backgroundColor: '#EDE0E8' },
  nextBtn: {
    width: '100%', borderRadius: 50,
    paddingVertical: 16, alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#C9748F', shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  nextBtnText: { color: '#fff', fontWeight: '800', fontSize: 17 },
  loginRow: { marginBottom: 12 },
  loginText: { fontSize: 14, color: '#9B8FA0' },
  loginLink: { fontWeight: '700' },
  disclaimerText: {
    fontSize: 11, color: '#9B8FA0',
    textAlign: 'center', lineHeight: 18,
  },
});
