import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar,
  Dimensions, Animated,
} from 'react-native';
import COLORS from './colors';

const { width } = Dimensions.get('window');

const FEATURES = [
  { id: 'cycle', emoji: '🌸', title: 'Cycle Tracker', subtitle: 'Track your period', bg: '#FFE4EC', accent: '#C9748F' },
  { id: 'bella', emoji: '🤖', title: 'Ask Bella', subtitle: 'Your AI nurse', bg: '#E8E4FF', accent: '#7B6B9E' },
  { id: 'tracker', emoji: '📊', title: 'Daily Tracker', subtitle: 'Log your symptoms', bg: '#E4F4FF', accent: '#4A90C4' },
  { id: 'community', emoji: '👥', title: 'Community', subtitle: 'Connect with women', bg: '#E4FFE8', accent: '#4AC455' },
  { id: 'academy', emoji: '📚', title: 'Academy', subtitle: 'Learn about your body', bg: '#FFF4E4', accent: '#C4844A' },
  { id: 'carefinder', emoji: '🏥', title: 'Care Finder', subtitle: 'Clinics near you', bg: '#F4E4FF', accent: '#9B4AC4' },
  { id: 'nutrition', emoji: '🥗', title: 'Nutrition', subtitle: 'Eat for your cycle', bg: '#F0FFE4', accent: '#7AC44A' },
  { id: 'symptomchecker', emoji: '🔍', title: 'Symptom Checker', subtitle: 'Check how you feel', bg: '#FFE4E4', accent: '#C44A4A' },
  { id: 'babynames', emoji: '👶', title: 'Baby Names', subtitle: 'Find the perfect name', bg: '#FFE4F4', accent: '#C44A90' },
  { id: 'intimacy', emoji: '💜', title: 'Intimacy Health', subtitle: 'Know your body', bg: '#F4E4FF', accent: '#9B59B6' },
  { id: 'notifications', emoji: '🔔', title: 'Notifications', subtitle: 'Your reminders', bg: '#FFFDE4', accent: '#C4B44A' },
  { id: 'subscription', emoji: '⭐', title: 'Upgrade', subtitle: 'Unlock all features', bg: '#FFF8E4', accent: '#F59E0B' },
];

const CYCLE_PHASES = [
  { id: 'menstrual', label: 'Menstrual', emoji: '🌙', color: '#E74C3C', day: '1-5' },
  { id: 'follicular', label: 'Follicular', emoji: '🌱', color: '#27AE60', day: '6-13' },
  { id: 'ovulation', label: 'Ovulation', emoji: '✨', color: '#F39C12', day: '14-16' },
  { id: 'luteal', label: 'Luteal', emoji: '🌕', color: '#8E44AD', day: '17-28' },
];

const JOURNEY_CONTENT = {
  conceive: {
    emoji: '🌱',
    title: 'TTC Journey',
    text: 'Your fertile window is approaching. Track your ovulation today.',
    color: '#27AE60',
    bg: '#F0FFF4',
    quickActions: [
      { id: 'cycle', emoji: '🌱', label: 'Ovulation' },
      { id: 'tracker', emoji: '📊', label: 'Log Today' },
      { id: 'bella', emoji: '🤖', label: 'Ask Bella' },
      { id: 'nutrition', emoji: '🥗', label: 'Nutrition' },
    ],
  },
  pregnant: {
    emoji: '🤰',
    title: 'Pregnancy Journey',
    text: 'You are doing amazing. Log your symptoms and check your weekly update.',
    color: '#9B59B6',
    bg: '#F5EEFF',
    quickActions: [
      { id: 'tracker', emoji: '📊', label: 'Symptoms' },
      { id: 'bella', emoji: '🤖', label: 'Ask Bella' },
      { id: 'academy', emoji: '📚', label: 'Learn' },
      { id: 'carefinder', emoji: '🏥', label: 'Care' },
    ],
  },
  surrogacy: {
    emoji: '👶',
    title: 'Surrogacy Journey',
    text: 'Bella is here to support you every step of the way.',
    color: '#E91E8C',
    bg: '#FFF0F8',
    quickActions: [
      { id: 'bella', emoji: '🤖', label: 'Ask Bella' },
      { id: 'community', emoji: '👥', label: 'Community' },
      { id: 'academy', emoji: '📚', label: 'Learn' },
      { id: 'carefinder', emoji: '🏥', label: 'Care' },
    ],
  },
  wellbeing: {
    emoji: '💜',
    title: 'Wellbeing Journey',
    text: 'Track your cycle and understand your body better every day.',
    color: '#C9748F',
    bg: '#FFF0F5',
    quickActions: [
      { id: 'cycle', emoji: '🌸', label: 'Cycle' },
      { id: 'bella', emoji: '🤖', label: 'Ask Bella' },
      { id: 'community', emoji: '👥', label: 'Community' },
      { id: 'academy', emoji: '📚', label: 'Academy' },
    ],
  },
};

export default function HomeScreen({ userName, userPlan, userJourney, onNavigate }) {
  const [currentPhase] = useState(1);
  const scrollY = useRef(new Animated.Value(0)).current;

  const firstName = userName ? userName.split(' ')[0] : 'Beautiful';
  const journey = JOURNEY_CONTENT[userJourney] || JOURNEY_CONTENT.wellbeing;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 120],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <Animated.ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Header */}
        <Animated.View style={[styles.header, { minHeight: headerHeight, opacity: headerOpacity }]}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Good day,</Text>
              <Text style={styles.userName}>{firstName} 💜</Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity
                style={styles.notifBtn}
                onPress={() => onNavigate('notifications')}
              >
                <Text style={styles.notifIcon}>🔔</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileBtn}
                onPress={() => onNavigate('profile')}
              >
                <Text style={styles.profileInitial}>
                  {firstName.charAt(0).toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.planBadge}>
            <Text style={styles.planBadgeText}>
              {userPlan === 'PRO' ? '👑 PRO' : userPlan === 'PLUS' ? '⭐ PLUS' : '🆓 FREE'}
            </Text>
          </View>
        </Animated.View>

        {/* Journey Banner */}
        <TouchableOpacity
          style={[styles.journeyBanner, {
            backgroundColor: journey.bg,
            borderLeftColor: journey.color,
          }]}
          onPress={() => onNavigate('cycle')}
        >
          <Text style={styles.journeyBannerEmoji}>{journey.emoji}</Text>
          <View style={styles.journeyBannerInfo}>
            <Text style={[styles.journeyBannerTitle, { color: journey.color }]}>
              {journey.title}
            </Text>
            <Text style={styles.journeyBannerText}>{journey.text}</Text>
          </View>
          <Text style={[styles.journeyBannerArrow, { color: journey.color }]}>›</Text>
        </TouchableOpacity>

        {/* Flower Cycle Tracker */}
        <View style={styles.flowerSection}>
          <Text style={styles.sectionTitle}>Your Cycle</Text>
          <View style={styles.flowerContainer}>
            {CYCLE_PHASES.map((phase, index) => {
              const angles = [-45, 45, 135, 225];
              const angle = angles[index];
              const rad = (angle * Math.PI) / 180;
              const distance = 70;
              const x = Math.cos(rad) * distance;
              const y = Math.sin(rad) * distance;
              const isActive = index === currentPhase;
              return (
                <TouchableOpacity
                  key={phase.id}
                  style={[
                    styles.petal,
                    {
                      backgroundColor: isActive ? phase.color : `${phase.color}40`,
                      transform: [
                        { translateX: x },
                        { translateY: y },
                        { rotate: `${angle + 90}deg` },
                      ],
                      borderWidth: isActive ? 2 : 0,
                      borderColor: phase.color,
                    },
                  ]}
                  onPress={() => onNavigate('cycle')}
                >
                  <Text style={styles.petalEmoji}>{phase.emoji}</Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              style={styles.flowerCenter}
              onPress={() => onNavigate('cycle')}
            >
              <Text style={styles.flowerCenterEmoji}>🌸</Text>
              <Text style={styles.flowerCenterText}>Day 8</Text>
              <Text style={styles.flowerCenterSub}>Follicular</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.phaseLabels}
          >
            {CYCLE_PHASES.map((phase, index) => (
              <TouchableOpacity
                key={phase.id}
                style={[
                  styles.phaseLabel,
                  index === currentPhase && { backgroundColor: phase.color },
                ]}
                onPress={() => onNavigate('cycle')}
              >
                <Text style={styles.phaseLabelEmoji}>{phase.emoji}</Text>
                <Text style={[
                  styles.phaseLabelText,
                  index === currentPhase && { color: '#fff' },
                ]}>
                  {phase.label}
                </Text>
                <Text style={[
                  styles.phaseLabelDay,
                  index === currentPhase && { color: 'rgba(255,255,255,0.8)' },
                ]}>
                  Day {phase.day}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Journey Quick Actions */}
        <View style={styles.quickSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickRow}>
            {journey.quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.quickCard, { backgroundColor: FEATURES.find(f => f.id === action.id)?.bg || '#F0F0F0' }]}
                onPress={() => onNavigate(action.id)}
              >
                <Text style={styles.quickEmoji}>{action.emoji}</Text>
                <Text style={styles.quickLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* All Features Grid */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>All Features</Text>
          <View style={styles.featuresGrid}>
            {FEATURES.map((feature) => (
              <TouchableOpacity
                key={feature.id}
                style={[styles.featureCard, { backgroundColor: feature.bg }]}
                onPress={() => onNavigate(feature.id)}
              >
                <Text style={styles.featureEmoji}>{feature.emoji}</Text>
                <Text style={[styles.featureTitle, { color: feature.accent }]}>
                  {feature.title}
                </Text>
                <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Admin button */}
        <TouchableOpacity
          style={styles.adminBtn}
          onPress={() => onNavigate('admin')}
        >
          <Text style={styles.adminBtnText}>⚙️</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  greeting: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },
  userName: { fontSize: 24, fontWeight: '800', color: '#fff', marginTop: 2 },
  headerRight: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  notifBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  notifIcon: { fontSize: 18 },
  profileBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
  },
  profileInitial: { fontSize: 18, fontWeight: '800', color: COLORS.primary },
  planBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 50, paddingHorizontal: 14, paddingVertical: 6,
  },
  planBadgeText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  journeyBanner: {
    marginHorizontal: 20, marginTop: 16,
    borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center',
    gap: 12, borderLeftWidth: 4,
  },
  journeyBannerEmoji: { fontSize: 28 },
  journeyBannerInfo: { flex: 1 },
  journeyBannerTitle: { fontSize: 14, fontWeight: '800', marginBottom: 3 },
  journeyBannerText: { fontSize: 12, color: COLORS.textLight, lineHeight: 18 },
  journeyBannerArrow: { fontSize: 24, fontWeight: '700' },
  flowerSection: {
    margin: 20,
    backgroundColor: COLORS.white,
    borderRadius: 24, padding: 20,
    alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.06,
    shadowRadius: 12, elevation: 3,
  },
  sectionTitle: {
    fontSize: 18, fontWeight: '800',
    color: COLORS.text, marginBottom: 16,
    alignSelf: 'flex-start',
  },
  flowerContainer: {
    width: 200, height: 200,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 20,
  },
  petal: {
    position: 'absolute',
    width: 52, height: 72,
    borderRadius: 26,
    alignItems: 'center', justifyContent: 'center',
  },
  petalEmoji: { fontSize: 20 },
  flowerCenter: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 3, borderColor: COLORS.primary,
    zIndex: 10,
  },
  flowerCenterEmoji: { fontSize: 22 },
  flowerCenterText: { fontSize: 12, fontWeight: '800', color: COLORS.primary },
  flowerCenterSub: { fontSize: 10, color: COLORS.textLight },
  phaseLabels: { gap: 8, paddingHorizontal: 4 },
  phaseLabel: {
    alignItems: 'center', paddingHorizontal: 14,
    paddingVertical: 8, borderRadius: 16,
    backgroundColor: COLORS.background, minWidth: 80,
  },
  phaseLabelEmoji: { fontSize: 16 },
  phaseLabelText: { fontSize: 12, fontWeight: '700', color: COLORS.text, marginTop: 2 },
  phaseLabelDay: { fontSize: 10, color: COLORS.textLight },
  quickSection: { paddingHorizontal: 20, marginBottom: 8 },
  quickRow: { flexDirection: 'row', gap: 10 },
  quickCard: {
    flex: 1, borderRadius: 16, padding: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  quickEmoji: { fontSize: 26, marginBottom: 6 },
  quickLabel: { fontSize: 11, fontWeight: '700', color: COLORS.text, textAlign: 'center' },
  featuresSection: { paddingHorizontal: 20, marginTop: 16 },
  featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  featureCard: {
    width: (width - 52) / 2,
    borderRadius: 20, padding: 18,
    alignItems: 'flex-start',
  },
  featureEmoji: { fontSize: 28, marginBottom: 8 },
  featureTitle: { fontSize: 14, fontWeight: '800', marginBottom: 4 },
  featureSubtitle: { fontSize: 12, color: COLORS.textLight },
  adminBtn: {
    alignSelf: 'center', marginTop: 20,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: COLORS.background,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: COLORS.border,
  },
  adminBtnText: { fontSize: 18 },
});
