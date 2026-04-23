import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar, Animated,
} from 'react-native';
import COLORS from './colors';

const JOURNEYS = [
  {
    id: 'conceive',
    emoji: '🌱',
    title: 'Trying to Conceive',
    subtitle: 'Track ovulation, understand your fertile window and get support on your TTC journey',
    color: '#27AE60',
    bg: '#F0FFF4',
    features: ['Ovulation tracking', 'Fertile window alerts', 'TTC tips from Bella', 'Cycle insights'],
  },
  {
    id: 'pregnant',
    emoji: '🤰',
    title: 'I am Pregnant',
    subtitle: 'Week by week pregnancy tracking, symptom logging and expert guidance for every trimester',
    color: '#9B59B6',
    bg: '#F5EEFF',
    features: ['Weekly baby updates', 'Symptom tracker', 'Appointment reminders', 'Birth plan tools'],
  },
  {
    id: 'surrogacy',
    emoji: '👶',
    title: 'Surrogacy Journey',
    subtitle: 'Whether you are a surrogate or intended parent, Bellava supports every step of your journey',
    color: '#E91E8C',
    bg: '#FFF0F8',
    features: ['Surrogacy information', 'Legal guidance links', 'Emotional support', 'Bella AI support'],
  },
  {
    id: 'wellbeing',
    emoji: '💜',
    title: 'General Wellbeing',
    subtitle: 'Track your cycle, understand your hormones and take control of your overall health',
    color: '#C9748F',
    bg: '#FFF0F5',
    features: ['Cycle tracking', 'Mood and symptoms', 'Health academy', 'Community support'],
  },
];

export default function JourneyScreen({ onSelect, userName }) {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const firstName = userName ? userName.split(' ')[0] : 'Beautiful';

  const handleContinue = () => {
    if (!selected) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSelect(selected);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoLetter}>B</Text>
        </View>
        <Text style={styles.headerTitle}>Welcome, {firstName}! 💜</Text>
        <Text style={styles.headerSub}>
          Tell us about your journey so Bellava can personalise everything for you
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.question}>What best describes you right now?</Text>
        <Text style={styles.questionSub}>You can change this anytime in your profile</Text>

        {JOURNEYS.map(journey => {
          const isSelected = selected === journey.id;
          return (
            <TouchableOpacity
              key={journey.id}
              style={[
                styles.journeyCard,
                { borderColor: isSelected ? journey.color : COLORS.border },
                isSelected && { backgroundColor: journey.bg },
              ]}
              onPress={() => setSelected(journey.id)}
              activeOpacity={0.85}
            >
              {/* Selected indicator */}
              {isSelected && (
                <View style={[styles.selectedBadge, { backgroundColor: journey.color }]}>
                  <Text style={styles.selectedBadgeText}>✓ Selected</Text>
                </View>
              )}

              <View style={styles.journeyTop}>
                <View style={[styles.journeyEmojiWrap, { backgroundColor: journey.bg }]}>
                  <Text style={styles.journeyEmoji}>{journey.emoji}</Text>
                </View>
                <View style={styles.journeyInfo}>
                  <Text style={[
                    styles.journeyTitle,
                    isSelected && { color: journey.color },
                  ]}>
                    {journey.title}
                  </Text>
                  <Text style={styles.journeySubtitle}>{journey.subtitle}</Text>
                </View>
              </View>

              {/* Features */}
              {isSelected && (
                <View style={styles.featuresRow}>
                  {journey.features.map((feature, i) => (
                    <View key={i} style={[styles.featureChip, { backgroundColor: journey.color }]}>
                      <Text style={styles.featureChipText}>✓ {feature}</Text>
                    </View>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        {/* Note */}
        <View style={styles.noteCard}>
          <Text style={styles.noteText}>
            💜 Bellava adapts to your journey. Bella AI, your home screen and health tips will all be personalised based on your choice.
          </Text>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.continueBtn,
            !selected && styles.continueBtnDisabled,
          ]}
          onPress={handleContinue}
          disabled={!selected || loading}
        >
          <Text style={styles.continueBtnText}>
            {loading
              ? 'Setting up your Bellava...'
              : selected
              ? 'Continue with ' + JOURNEYS.find(j => j.id === selected)?.emoji
              : 'Select your journey to continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    alignItems: 'center',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  logoCircle: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 14,
  },
  logoLetter: { fontSize: 26, fontWeight: '800', color: COLORS.primary },
  headerTitle: {
    fontSize: 24, fontWeight: '800', color: '#fff', marginBottom: 8,
  },
  headerSub: {
    fontSize: 14, color: 'rgba(255,255,255,0.85)',
    textAlign: 'center', lineHeight: 22,
  },
  content: { flex: 1, padding: 20 },
  question: {
    fontSize: 20, fontWeight: '800',
    color: COLORS.text, marginBottom: 6, marginTop: 8,
  },
  questionSub: {
    fontSize: 13, color: COLORS.textLight, marginBottom: 20,
  },
  journeyCard: {
    backgroundColor: COLORS.white, borderRadius: 20,
    padding: 18, marginBottom: 14,
    borderWidth: 2, borderColor: COLORS.border,
    position: 'relative',
  },
  selectedBadge: {
    position: 'absolute', top: -10, right: 16,
    borderRadius: 50, paddingHorizontal: 12, paddingVertical: 4,
    zIndex: 10,
  },
  selectedBadgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  journeyTop: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 14,
  },
  journeyEmojiWrap: {
    width: 56, height: 56, borderRadius: 28,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  journeyEmoji: { fontSize: 28 },
  journeyInfo: { flex: 1 },
  journeyTitle: {
    fontSize: 17, fontWeight: '800',
    color: COLORS.text, marginBottom: 6,
  },
  journeySubtitle: {
    fontSize: 13, color: COLORS.textLight, lineHeight: 20,
  },
  featuresRow: {
    flexDirection: 'row', flexWrap: 'wrap',
    gap: 8, marginTop: 14,
  },
  featureChip: {
    borderRadius: 50, paddingHorizontal: 12, paddingVertical: 6,
  },
  featureChipText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  noteCard: {
    backgroundColor: COLORS.primaryLight, borderRadius: 16,
    padding: 16, marginTop: 4,
  },
  noteText: {
    fontSize: 13, color: COLORS.primary,
    lineHeight: 20, textAlign: 'center',
  },
  bottomBar: {
    padding: 20, backgroundColor: COLORS.white,
    borderTopWidth: 1, borderTopColor: COLORS.border,
  },
  continueBtn: {
    backgroundColor: COLORS.primary, borderRadius: 50,
    paddingVertical: 18, alignItems: 'center',
    shadowColor: COLORS.primary, shadowOpacity: 0.3,
    shadowRadius: 12, elevation: 4,
  },
  continueBtnDisabled: {
    backgroundColor: COLORS.border, shadowOpacity: 0,
  },
  continueBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
