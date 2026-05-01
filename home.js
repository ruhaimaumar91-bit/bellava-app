import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar,
  Alert, Animated,
} from 'react-native';
import COLORS from './colors';

const QUICK_ACTIONS = [
  { id: '1', emoji: '🌸', label: 'Log Period', color: '#E74C3C', bg: '#FFE8E8' },
  { id: '2', emoji: '💊', label: 'Medication', color: '#9B59B6', bg: '#F0EAFF' },
  { id: '3', emoji: '💧', label: 'Water', color: '#3498DB', bg: '#EAF4FF' },
  { id: '4', emoji: '😴', label: 'Sleep', color: '#27AE60', bg: '#EAFAF1' },
];

const HEALTH_TIPS = [
  { emoji: '🥗', tip: 'Iron-rich foods help during your period. Try spinach and lentils today!', color: '#27AE60' },
  { emoji: '💆', tip: 'Stress affects your cycle. Try 5 minutes of deep breathing today.', color: '#9B59B6' },
  { emoji: '💧', tip: 'Stay hydrated! Aim for 8 glasses of water to reduce bloating.', color: '#3498DB' },
  { emoji: '🏃', tip: 'Light exercise during your luteal phase can reduce PMS symptoms.', color: '#C9748F' },
];

const UPCOMING = [
  { emoji: '👩‍⚕️', title: 'Dr. Sarah Mitchell', sub: 'Prenatal Checkup', date: 'May 5', color: '#3498DB' },
  { emoji: '💉', title: 'Blood Test', sub: 'Hormone Panel', date: 'May 12', color: '#E74C3C' },
];

function PulsingHeart() {
  const pulse = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.2, duration: 600, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return (
    <Animated.Text style={[{ fontSize: 28 }, { transform: [{ scale: pulse }] }]}>💜</Animated.Text>
  );
}
export default function HomeScreen({ userName, userPlan, onNavigate }) {
  const [tipIndex, setTipIndex] = useState(0);
  const [water, setWater] = useState(3);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const nextTip = () => {
    Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
      setTipIndex(prev => (prev + 1) % HEALTH_TIPS.length);
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    });
  };

  const tip = HEALTH_TIPS[tipIndex];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF0F5" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning 🌸</Text>
            <Text style={styles.userName}>{userName || 'Beautiful'}</Text>
          </View>
          <View style={styles.headerRight}>
            <PulsingHeart />
            <View style={[styles.planBadge, userPlan === 'PRO' ? styles.planPro : userPlan === 'PLUS' ? styles.planPlus : styles.planFree]}>
              <Text style={styles.planText}>{userPlan || 'FREE'}</Text>
            </View>
          </View>
        </View>

        {/* Cycle Summary Card */}
        <View style={styles.cycleCard}>
          <View style={styles.cycleLeft}>
            <Text style={styles.cycleDay}>Day 14</Text>
            <Text style={styles.cyclePhase}>Ovulation Phase ✨</Text>
            <Text style={styles.cycleSub}>Peak energy today!</Text>
            <View style={styles.cycleProgressBar}>
              <View style={styles.cycleProgressFill} />
            </View>
            <Text style={styles.cycleDaysLeft}>14 days until next period</Text>
          </View>
          <View style={styles.cycleRight}>
            <View style={styles.cycleRing}>
              <Text style={styles.cycleRingNum}>14</Text>
              <Text style={styles.cycleRingOf}>of 28</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickGrid}>
            {QUICK_ACTIONS.map(action => (
              <TouchableOpacity
                key={action.id}
                style={[styles.quickBtn, { backgroundColor: action.bg }]}
                onPress={() => {
                  if (action.label === 'Water') {
                    setWater(prev => Math.min(prev + 1, 8));
                    Alert.alert('💧 Water logged!', `${water + 1} of 8 glasses today. Keep it up!`);
                  } else {
                    Alert.alert(action.label, `${action.label} logged! 💜`);
                  }
                }}
              >
                <Text style={styles.quickEmoji}>{action.emoji}</Text>
                <Text style={[styles.quickLabel, { color: action.color }]}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bella AI Card */}
        <TouchableOpacity
          style={styles.bellaCard}
          onPress={() => onNavigate && onNavigate('bella')}
        >
          <View style={styles.bellaLeft}>
            <View style={styles.bellaAvatar}>
              <Text style={styles.bellaAvatarText}>B</Text>
            </View>
            <View>
              <Text style={styles.bellaTitle}>Ask Bella 💜</Text>
              <Text style={styles.bellaSub}>Your AI health companion</Text>
            </View>
          </View>
          <View style={styles.bellaArrow}>
            <Text style={styles.bellaArrowText}>→</Text>
          </View>
        </TouchableOpacity>

        {/* Water Tracker */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>💧 Daily Water</Text>
            <Text style={styles.waterCount}>{water}/8 glasses</Text>
          </View>
          <View style={styles.waterRow}>
            {[...Array(8)].map((_, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.waterGlass, i < water && styles.waterGlassFull]}
                onPress={() => setWater(i + 1)}
              >
                <Text style={styles.waterGlassEmoji}>{i < water ? '💧' : '🫙'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Health Tip */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>💡 Health Tip</Text>
            <TouchableOpacity onPress={nextTip}>
              <Text style={styles.nextTip}>Next →</Text>
            </TouchableOpacity>
          </View>
          <Animated.View style={[styles.tipBox, { opacity: fadeAnim, backgroundColor: tip.color + '15' }]}>
            <Text style={styles.tipEmoji}>{tip.emoji}</Text>
            <Text style={styles.tipText}>{tip.tip}</Text>
          </Animated.View>
        </View>

        {/* Virtual Consultation */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>👩‍⚕️ Virtual Consultation</Text>
          <View style={styles.consultCard}>
            <View style={styles.consultAvatar}>
              <Text style={{ fontSize: 28 }}>👩‍⚕️</Text>
            </View>
            <View style={styles.consultInfo}>
              <Text style={styles.consultName}>Dr. Emily Chen</Text>
              <Text style={styles.consultRole}>OB/GYN Specialist</Text>
              <View style={styles.starsRow}>
                <Text style={styles.stars}>★★★★★</Text>
                <Text style={styles.rating}>4.9 (234)</Text>
              </View>
            </View>
            <View style={styles.consultOnline}>
              <View style={styles.onlineDot} />
            </View>
          </View>
          <Text style={styles.consultAvail}>✅ Available Today</Text>
          <View style={styles.timeSlots}>
            {['2:00 PM', '3:30 PM', '5:00 PM'].map(t => (
              <TouchableOpacity
                key={t}
                style={styles.timeSlot}
                onPress={() => Alert.alert('Book Appointment', `Book ${t} with Dr. Emily Chen? 💜`)}
              >
                <Text style={styles.timeSlotText}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={styles.bookBtn}
            onPress={() => Alert.alert('Book Video Consultation 💜', 'Booking system coming soon!')}
          >
            <Text style={styles.bookBtnText}>📹 Book Video Consultation</Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📅 Upcoming</Text>
          {UPCOMING.map((item, i) => (
            <View key={i} style={styles.upcomingRow}>
              <View style={[styles.upcomingIcon, { backgroundColor: item.color + '22' }]}>
                <Text style={{ fontSize: 20 }}>{item.emoji}</Text>
              </View>
              <View style={styles.upcomingInfo}>
                <Text style={styles.upcomingTitle}>{item.title}</Text>
                <Text style={styles.upcomingSub}>{item.sub}</Text>
              </View>
              <View style={[styles.upcomingDate, { backgroundColor: item.color + '22' }]}>
                <Text style={[styles.upcomingDateText, { color: item.color }]}>{item.date}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF0F5' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12,
  },
  greeting: { fontSize: 14, color: '#9B8FA0', fontWeight: '600' },
  userName: { fontSize: 24, fontWeight: '800', color: '#2D1B2E' },
  headerRight: { alignItems: 'center', gap: 8 },
  planBadge: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  planFree: { backgroundColor: '#EDE0E8' },
  planPlus: { backgroundColor: '#F0EAFF' },
  planPro: { backgroundColor: '#FFF3CD' },
  planText: { fontSize: 11, fontWeight: '800', color: '#2D1B2E' },
  cycleCard: {
    marginHorizontal: 20, marginBottom: 20, backgroundColor: '#C9748F',
    borderRadius: 24, padding: 20, flexDirection: 'row',
    shadowColor: '#C9748F', shadowOpacity: 0.3, shadowRadius: 12, elevation: 6,
  },
  cycleLeft: { flex: 1 },
  cycleDay: { fontSize: 28, fontWeight: '800', color: '#fff' },
  cyclePhase: { fontSize: 16, fontWeight: '700', color: '#FFE8F0', marginBottom: 4 },
  cycleSub: { fontSize: 13, color: '#FFD6E7', marginBottom: 12 },
  cycleProgressBar: {
    height: 6, backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3, marginBottom: 6,
  },
  cycleProgressFill: {
    height: 6, backgroundColor: '#fff',
    borderRadius: 3, width: '50%',
  },
  cycleDaysLeft: { fontSize: 12, color: '#FFD6E7' },
  cycleRight: { alignItems: 'center', justifyContent: 'center' },
  cycleRing: {
    width: 80, height: 80, borderRadius: 40,
    borderWidth: 4, borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  cycleRingNum: { fontSize: 24, fontWeight: '800', color: '#fff' },
  cycleRingOf: { fontSize: 11, color: '#FFD6E7' },
  section: { marginHorizontal: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#2D1B2E', marginBottom: 12 },
  quickGrid: { flexDirection: 'row', gap: 10 },
  quickBtn: {
    flex: 1, borderRadius: 16, paddingVertical: 14,
    alignItems: 'center', gap: 6,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  quickEmoji: { fontSize: 24 },
  quickLabel: { fontSize: 11, fontWeight: '700', textAlign: 'center' },
  bellaCard: {
    marginHorizontal: 20, marginBottom: 20,
    backgroundColor: '#2D1B2E', borderRadius: 20,
    padding: 16, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between',
    shadowColor: '#2D1B2E', shadowOpacity: 0.2, shadowRadius: 12, elevation: 4,
  },
  bellaLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  bellaAvatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#C9748F', alignItems: 'center', justifyContent: 'center',
  },
  bellaAvatarText: { color: '#fff', fontSize: 20, fontWeight: '800' },
  bellaTitle: { fontSize: 16, fontWeight: '800', color: '#fff' },
  bellaSub: { fontSize: 13, color: '#9B8FA0' },
  bellaArrow: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#C9748F', alignItems: 'center', justifyContent: 'center',
  },
  bellaArrowText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  card: {
    backgroundColor: '#fff', borderRadius: 20, marginHorizontal: 20,
    marginBottom: 16, padding: 16, shadowColor: '#000',
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardTitle: { fontSize: 16, fontWeight: '800', color: '#2D1B2E', marginBottom: 12 },
  waterCount: { fontSize: 14, fontWeight: '700', color: '#3498DB' },
  waterRow: { flexDirection: 'row', justifyContent: 'space-between' },
  waterGlass: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: '#FAF0F5', alignItems: 'center', justifyContent: 'center',
  },
  waterGlassFull: { backgroundColor: '#EAF4FF' },
  waterGlassEmoji: { fontSize: 20 },
  nextTip: { fontSize: 13, fontWeight: '700', color: '#C9748F' },
  tipBox: {
    borderRadius: 16, padding: 14,
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
  },
  tipEmoji: { fontSize: 24 },
  tipText: { flex: 1, fontSize: 14, color: '#2D1B2E', lineHeight: 22 },
  consultCard: {
    flexDirection: 'row', alignItems: 'center',
    gap: 12, marginBottom: 12,
  },
  consultAvatar: {
    width: 52, height: 52, borderRadius: 16,
    backgroundColor: '#EAF4FF', alignItems: 'center', justifyContent: 'center',
  },
  consultInfo: { flex: 1 },
  consultName: { fontSize: 15, fontWeight: '800', color: '#2D1B2E' },
  consultRole: { fontSize: 12, color: '#9B8FA0', marginBottom: 4 },
  starsRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  stars: { fontSize: 12, color: '#F59E0B' },
  rating: { fontSize: 12, color: '#9B8FA0' },
  consultOnline: { alignItems: 'center', justifyContent: 'center' },
  onlineDot: {
    width: 12, height: 12, borderRadius: 6, backgroundColor: '#27AE60',
    shadowColor: '#27AE60', shadowOpacity: 0.4, shadowRadius: 4, elevation: 2,
  },
  consultAvail: { fontSize: 13, color: '#27AE60', fontWeight: '700', marginBottom: 12 },
  timeSlots: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  timeSlot: {
    flex: 1, borderWidth: 1.5, borderColor: '#27AE60',
    borderRadius: 12, paddingVertical: 10, alignItems: 'center',
  },
  timeSlotText: { fontSize: 13, fontWeight: '700', color: '#27AE60' },
  bookBtn: {
    backgroundColor: '#27AE60', borderRadius: 50,
    paddingVertical: 14, alignItems: 'center',
  },
  bookBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  upcomingRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 12, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: '#FAF0F5',
  },
  upcomingIcon: {
    width: 44, height: 44, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  upcomingInfo: { flex: 1 },
  upcomingTitle: { fontSize: 14, fontWeight: '700', color: '#2D1B2E' },
  upcomingSub: { fontSize: 12, color: '#9B8FA0' },
  upcomingDate: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6 },
  upcomingDateText: { fontSize: 12, fontWeight: '800' },
});
