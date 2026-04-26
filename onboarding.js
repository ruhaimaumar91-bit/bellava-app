import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, StatusBar, Dimensions, Animated,
} from 'react-native';
import COLORS from './colors';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: 1,
    emoji: '🌸',
    title: 'Welcome to Bellava',
    subtitle: 'The women\'s health app built with love — for every woman, on every journey.',
    bg: '#FFF0F5',
    topColor: '#C9748F',
    bottomColor: '#F2D7DF',
    dots: ['#FFB6C8', '#FFC8D8', '#FFD8E8'],
  },
  {
    id: 2,
    emoji: '🤰',
    title: 'For Every Journey',
    subtitle: 'Whether you are trying to conceive, pregnant, on a surrogacy journey or focusing on your wellbeing — Bellava is for you.',
    bg: '#F5EEFF',
    topColor: '#9B59B6',
    bottomColor: '#E8D5FF',
    dots: ['#C8A0E8', '#D8B8F0', '#E8D0F8'],
  },
  {
    id: 3,
    emoji: '🤖',
    title: 'Meet Bella',
    subtitle: 'Your personal AI health companion. Ask anything about your health — day or night, in your language, on your terms.',
    bg: '#E8F4FF',
    topColor: '#4A90C4',
    bottomColor: '#C8E4FF',
    dots: ['#90C8F0', '#A8D8F8', '#C0E4FF'],
  },
  {
    id: 4,
    emoji: '🌱',
    title: 'Track Your Cycle',
    subtitle: 'Understand your body like never before. Track your period, predict ovulation and get personalised health insights.',
    bg: '#F0FFF4',
    topColor: '#27AE60',
    bottomColor: '#C8F0D8',
    dots: ['#80D8A8', '#98E8B8', '#B0F0C8'],
  },
  {
    id: 5,
    emoji: '👥',
    title: 'You Are Not Alone',
    subtitle: 'Join a community of women who understand. Share, support and grow together — in a safe, judgement-free space.',
    bg: '#FFF5E6',
    topColor: '#E67E22',
    bottomColor: '#FFE0B8',
    dots: ['#FFB870', '#FFC888', '#FFD8A0'],
  },
  {
    id: 6,
    emoji: '💜',
    title: 'Your Health.\nYour Body.\nYour Power.',
    subtitle: 'Bellava is built for every woman — wherever you are in the world. Let\'s begin your journey.',
    bg: '#FFF0F5',
    topColor: '#C9748F',
    bottomColor: '#F2D7DF',
    dots: ['#FFB6C8', '#FFC8D8', '#FFD8E8'],
  },
];

export default function OnboardingScreen({ onFinish }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateTransition = (nextIndex) => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: -30, duration: 200, useNativeDriver: true }),
    ]).start(() => {
      setCurrentSlide(nextIndex);
      slideAnim.setValue(30);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.sequence([
          Animated.timing(scaleAnim, { toValue: 0.95, duration: 150, useNativeDriver: true }),
          Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
        ]),
      ]).start();
    });
  };

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      animateTransition(currentSlide + 1);
    } else {
      onFinish();
    }
  };

  const handleDotPress = (index) => {
    if (index !== currentSlide) animateTransition(index);
  };

  const slide = SLIDES[currentSlide];
  const isLast = currentSlide === SLIDES.length - 1;

  return (
    <View style={[styles.container, { backgroundColor: slide.bg }]}>
      <StatusBar barStyle="light-content" backgroundColor={slide.topColor} />

      {/* Top Wave */}
      <View style={[styles.topWave, { backgroundColor: slide.topColor }]}>
        <View style={[styles.topWaveBottom, { backgroundColor: slide.bg }]} />
      </View>

      {/* Skip Button */}
      <SafeAreaView style={styles.skipContainer}>
        <TouchableOpacity style={styles.skipBtn} onPress={onFinish}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* Main Content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim },
            ],
          },
        ]}
      >
        {/* Emoji Circle */}
        <View style={[styles.emojiOuter, { borderColor: `${slide.topColor}30` }]}>
          <View style={[styles.emojiInner, { borderColor: `${slide.topColor}50` }]}>
            <View style={[styles.emojiCircle, { backgroundColor: slide.topColor }]}>
              <Text style={styles.emoji}>{slide.emoji}</Text>
            </View>
          </View>
        </View>

        {/* Text */}
        <Text style={[styles.title, { color: slide.topColor }]}>
          {slide.title}
        </Text>
        <Text style={styles.subtitle}>{slide.subtitle}</Text>

        {/* Feature pills for slide 1 */}
        {currentSlide === 0 && (
          <View style={styles.pillsRow}>
            {['🌸 Cycle', '🤖 Bella AI', '👥 Community', '🏥 Care'].map((pill, i) => (
              <View key={i} style={[styles.pill, { backgroundColor: `${slide.topColor}20` }]}>
                <Text style={[styles.pillText, { color: slide.topColor }]}>{pill}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Journey cards for slide 2 */}
        {currentSlide === 1 && (
          <View style={styles.journeyCards}>
            {[
              { emoji: '🌱', label: 'Trying to Conceive', color: '#27AE60' },
              { emoji: '🤰', label: 'Pregnant', color: '#9B59B6' },
              { emoji: '👶', label: 'Surrogacy', color: '#E91E8C' },
              { emoji: '💜', label: 'Wellbeing', color: '#C9748F' },
            ].map((j, i) => (
              <View key={i} style={[styles.journeyChip, { backgroundColor: `${j.color}15`, borderColor: `${j.color}40` }]}>
                <Text style={styles.journeyChipEmoji}>{j.emoji}</Text>
                <Text style={[styles.journeyChipLabel, { color: j.color }]}>{j.label}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Stats for last slide */}
        {isLast && (
          <View style={styles.statsRow}>
            {[
              { value: '23+', label: 'Features' },
              { value: '6', label: 'Languages' },
              { value: '💜', label: 'Made with' },
            ].map((stat, i) => (
              <View key={i} style={styles.statItem}>
                <Text style={[styles.statValue, { color: slide.topColor }]}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        )}
      </Animated.View>

      {/* Bottom Section */}
      <View style={styles.bottom}>
        {/* Dots */}
        <View style={styles.dotsRow}>
          {SLIDES.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleDotPress(index)}
            >
              <Animated.View
                style={[
                  styles.dot,
                  {
                    backgroundColor: index === currentSlide ? slide.topColor : `${slide.topColor}30`,
                    width: index === currentSlide ? 28 : 8,
                  },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Progress text */}
        <Text style={[styles.progressText, { color: slide.topColor }]}>
          {currentSlide + 1} of {SLIDES.length}
        </Text>

        {/* Next Button */}
        <TouchableOpacity
          style={[styles.nextBtn, { backgroundColor: slide.topColor }]}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.nextBtnText}>
            {isLast ? 'Start My Journey 💜' : 'Next →'}
          </Text>
        </TouchableOpacity>

        {/* Company */}
        <Text style={styles.company}>by Reine Mande Ltd · London 🇬🇧</Text>
      </View>

      {/* Bottom Wave */}
      <View style={[styles.bottomWave, { backgroundColor: slide.bottomColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topWave: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 120,
    zIndex: 0,
  },
  topWaveBottom: {
    position: 'absolute',
    bottom: -30,
    left: -20,
    right: -20,
    height: 60,
    borderRadius: 999,
  },
  skipContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 10,
  },
  skipBtn: {
    margin: 20,
    marginTop: 52,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 50,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingTop: 80,
  },
  emojiOuter: {
    width: 160, height: 160,
    borderRadius: 80,
    borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 32,
  },
  emojiInner: {
    width: 136, height: 136,
    borderRadius: 68,
    borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
  },
  emojiCircle: {
    width: 112, height: 112,
    borderRadius: 56,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  emoji: { fontSize: 52 },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 8,
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 50,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '700',
  },
  journeyCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
  journeyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
  },
  journeyChipEmoji: { fontSize: 18 },
  journeyChipLabel: { fontSize: 13, fontWeight: '700' },
  statsRow: {
    flexDirection: 'row',
    marginTop: 28,
    gap: 32,
  },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 28, fontWeight: '800', marginBottom: 4 },
  statLabel: { fontSize: 12, color: COLORS.textLight },
  bottom: {
    paddingHorizontal: 28,
    paddingBottom: 40,
    alignItems: 'center',
    zIndex: 10,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 20,
    opacity: 0.7,
  },
  nextBtn: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 16,
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  company: {
    fontSize: 12,
    color: COLORS.textLight,
    opacity: 0.7,
  },
  bottomWave: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: 8,
    zIndex: 0,
  },
});
