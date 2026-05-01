import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar,
  Alert, Animated,
} from 'react-native';
import COLORS from './colors';

const CYCLE_SYMPTOMS = ['⚡ Cramps', '🤕 Headache', '🎈 Bloating', '😴 Fatigue', '😤 Mood Swings', '💗 Tender Breasts'];
const PREGNANCY_SYMPTOMS = ['🤢 Nausea', '🔙 Back Pain', '💧 Swelling', '🔥 Heartburn', '😴 Fatigue', '👣 Kicks Felt'];

const SHOPPING_ITEMS = [
  { id: '1', name: 'Prenatal Vitamins', category: 'Health', color: '#E74C3C' },
  { id: '2', name: 'Nursing Bras (3)', category: 'Baby', color: '#7B6B9E' },
  { id: '3', name: 'Baby Wipes', category: 'Baby', color: '#7B6B9E' },
  { id: '4', name: 'Folate-rich Foods', category: 'Nutrition', color: '#27AE60' },
  { id: '5', name: 'Hospital Bag', category: 'Essentials', color: '#9B59B6' },
];

const MEALS = [
  { name: 'Greek Yogurt Bowl', time: '8:30 AM', cal: 320, emoji: '🥣' },
  { name: 'Grilled Salmon', time: '12:45 PM', cal: 425, emoji: '🐟' },
];

const CALENDAR_DAYS = [
  { day: 'S', date: 1, type: 'period' },
  { day: 'M', date: 2, type: 'period' },
  { day: 'T', date: 3, type: 'period' },
  { day: 'W', date: 4, type: 'period' },
  { day: 'T', date: 5, type: 'period' },
  { day: 'F', date: 6, type: 'normal' },
  { day: 'S', date: 7, type: 'normal' },
  { day: 'S', date: 8, type: 'normal' },
  { day: 'M', date: 9, type: 'normal' },
  { day: 'T', date: 10, type: 'normal' },
  { day: 'W', date: 11, type: 'normal' },
  { day: 'T', date: 12, type: 'fertile' },
  { day: 'F', date: 13, type: 'fertile' },
  { day: 'S', date: 14, type: 'today' },
  { day: 'S', date: 15, type: 'fertile' },
  { day: 'M', date: 16, type: 'fertile' },
  { day: 'T', date: 17, type: 'normal' },
  { day: 'W', date: 18, type: 'normal' },
  { day: 'T', date: 19, type: 'normal' },
  { day: 'F', date: 20, type: 'normal' },
  { day: 'S', date: 21, type: 'normal' },
  { day: 'S', date: 22, type: 'normal' },
  { day: 'M', date: 23, type: 'normal' },
  { day: 'T', date: 24, type: 'normal' },
  { day: 'W', date: 25, type: 'normal' },
  { day: 'T', date: 26, type: 'normal' },
  { day: 'F', date: 27, type: 'normal' },
  { day: 'S', date: 28, type: 'normal' },
];

function BouncingBaby() {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, { toValue: -12, duration: 600, useNativeDriver: true }),
        Animated.timing(bounceAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return (
    <Animated.Text style={[styles.babyEmoji, { transform: [{ translateY: bounceAnim }] }]}>
      👶
    </Animated.Text>
  );
}

function CircleProgress({ percent, color, size, label, sublabel }) {
  const animVal = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animVal, { toValue: percent, duration: 1200, useNativeDriver: false }).start();
  }, []);
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', width: size, height: size }}>
      <View style={[styles.circleOuter, { width: size, height: size, borderRadius: size / 2, borderColor: '#EDE0E8' }]}>
        <View style={[styles.circleInner, { width: size - 24, height: size - 24, borderRadius: (size - 24) / 2 }]}>
          <Text style={[styles.circleLabel, { color, fontSize: size > 140 ? 32 : 22 }]}>{label}</Text>
          <Text style={styles.circleSub}>{sublabel}</Text>
        </View>
      </View>
      <View style={[styles.circleArc, { width: size, height: size, borderRadius: size / 2, borderColor: color }]} />
    </View>
  );
}
export default function CycleScreen() {
  const [mode, setMode] = useState('cycle');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [contractions, setContractions] = useState([
    { num: 1, duration: '45s', intensity: 'Moderate', gap: '8 min' },
    { num: 2, duration: '52s', intensity: 'Strong', gap: '9 min' },
    { num: 3, duration: '38s', intensity: 'Mild', gap: '10 min' },
  ]);
  const timerRef = useRef(null);

  const toggleSymptom = (s) => {
    setSelectedSymptoms(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  const toggleItem = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedItems = Object.values(checkedItems).filter(Boolean).length;

  const startTimer = () => {
    if (timerRunning) {
      clearInterval(timerRef.current);
      setTimerRunning(false);
      const mins = Math.floor(timerSeconds / 60);
      const secs = timerSeconds % 60;
      const newContraction = {
        num: contractions.length + 1,
        duration: `${secs}s`,
        intensity: timerSeconds > 50 ? 'Strong' : timerSeconds > 30 ? 'Moderate' : 'Mild',
        gap: `${Math.floor(Math.random() * 5) + 7} min`,
      };
      setContractions(prev => [newContraction, ...prev.slice(0, 2)]);
      setTimerSeconds(0);
    } else {
      setTimerRunning(true);
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTimerRunning(false);
    setTimerSeconds(0);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const symptoms = mode === 'cycle' ? CYCLE_SYMPTOMS : PREGNANCY_SYMPTOMS;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF0F5" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tracker</Text>
      </View>

      {/* Mode Toggle */}
      <View style={styles.modeToggle}>
        <TouchableOpacity
          style={[styles.modeBtn, mode === 'cycle' && styles.modeBtnActive]}
          onPress={() => setMode('cycle')}
        >
          <Text style={[styles.modeBtnText, mode === 'cycle' && styles.modeBtnTextActive]}>
            ✦ Cycle Mode
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeBtn, mode === 'pregnancy' && styles.modeBtnActivePreg]}
          onPress={() => setMode('pregnancy')}
        >
          <Text style={[styles.modeBtnText, mode === 'pregnancy' && styles.modeBtnTextActive]}>
            🌙 Pregnancy Mode
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ===== CYCLE MODE ===== */}
        {mode === 'cycle' && (
          <View>
            {/* Day Ring */}
            <View style={styles.ringCard}>
              <View style={styles.ringWrap}>
                <View style={styles.ringOuter}>
                  <View style={styles.ringInner}>
                    <Text style={styles.ringDay}>Day 14</Text>
                    <Text style={styles.ringOf}>of 28</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Calendar */}
            <View style={styles.card}>
              <View style={styles.calHeader}>
                <TouchableOpacity><Text style={styles.calArrow}>‹</Text></TouchableOpacity>
                <Text style={styles.calMonth}>April 2026</Text>
                <TouchableOpacity><Text style={styles.calArrow}>›</Text></TouchableOpacity>
              </View>
              <View style={styles.calDayRow}>
                {['S','M','T','W','T','F','S'].map((d, i) => (
                  <Text key={i} style={styles.calDayLabel}>{d}</Text>
                ))}
              </View>
              <View style={styles.calGrid}>
                {CALENDAR_DAYS.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.calCell,
                      item.type === 'period' && styles.calPeriod,
                      item.type === 'fertile' && styles.calFertile,
                      item.type === 'today' && styles.calToday,
                    ]}
                  >
                    <Text style={[
                      styles.calCellText,
                      (item.type === 'period' || item.type === 'fertile' || item.type === 'today') && styles.calCellTextWhite,
                    ]}>{item.date}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#E74C3C' }]} />
                  <Text style={styles.legendText}>Period</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#9B59B6' }]} />
                  <Text style={styles.legendText}>Fertile</Text>
                </View>
              </View>
            </View>

            {/* Track Symptoms */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Track Symptoms</Text>
              <View style={styles.symptomGrid}>
                {symptoms.map(s => (
                  <TouchableOpacity
                    key={s}
                    style={[styles.symptomBtn, selectedSymptoms.includes(s) && styles.symptomBtnActive]}
                    onPress={() => toggleSymptom(s)}
                  >
                    <Text style={styles.symptomPlus}>{selectedSymptoms.includes(s) ? '✓' : '+'}</Text>
                    <Text style={[styles.symptomText, selectedSymptoms.includes(s) && styles.symptomTextActive]}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {selectedSymptoms.length > 0 && (
                <TouchableOpacity style={styles.saveBtn}
                  onPress={() => Alert.alert('Saved! 💜', 'Your symptoms have been logged.')}>
                  <Text style={styles.saveBtnText}>Save Symptoms 💜</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Fertility Insights */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Fertility Insights</Text>
              <View style={styles.fertilityCard}>
                <View style={styles.fertilityHeader}>
                  <View style={styles.fertilityIcon}>
                    <Text style={{ fontSize: 20 }}>🌸</Text>
                  </View>
                  <View>
                    <Text style={styles.fertilityTitle}>Peak Fertility</Text>
                    <Text style={styles.fertilitySub}>Next 48 hours</Text>
                  </View>
                </View>
                <Text style={styles.fertilityPoint}>• Cervical mucus: Egg white consistency</Text>
                <Text style={styles.fertilityPoint}>• Body temp: +0.3°F from baseline</Text>
                <Text style={styles.fertilityPoint}>• LH surge detected yesterday</Text>
              </View>
            </View>
          </View>
        )}

        {/* ===== PREGNANCY MODE ===== */}
        {mode === 'pregnancy' && (
          <View>
            {/* Week Ring */}
            <View style={styles.pregRingCard}>
              <View style={styles.weekBadge}>
                <Text style={styles.weekBadgeText}>WEEK 24</Text>
              </View>
              <Text style={styles.trimesterTitle}>Second Trimester</Text>
              <Text style={styles.trimesterSub}>16 weeks to go 🎉</Text>
              <View style={styles.pregRingWrap}>
                <View style={styles.pregRingOuter}>
                  <View style={styles.pregRingInner}>
                    <Text style={styles.pregPercent}>60%</Text>
                    <Text style={styles.pregComplete}>complete</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Baby Development */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>💗 Baby's Development</Text>
              <View style={styles.babyCard}>
                <BouncingBaby />
                <View style={styles.babyInfo}>
                  <Text style={styles.babySize}>Size of a corn</Text>
                  <Text style={styles.babyMeasure}>About 30cm long</Text>
                </View>
              </View>
              <Text style={styles.babyDesc}>
                Your baby can hear your voice now! Their lungs are developing, and they're practicing breathing movements. 🎵
              </Text>
              <View style={styles.milestoneCard}>
                <Text style={styles.milestoneTitle}>✦ This Week's Milestone</Text>
                <Text style={styles.milestoneText}>
                  Baby's face is fully formed and they're developing regular sleep patterns. You might feel stronger movements now! ⭐
                </Text>
              </View>
            </View>

            {/* Pregnancy Symptoms */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Track Symptoms</Text>
              <View style={styles.symptomGrid}>
                {symptoms.map(s => (
                  <TouchableOpacity
                    key={s}
                    style={[styles.symptomBtn, selectedSymptoms.includes(s) && styles.symptomBtnActive]}
                    onPress={() => toggleSymptom(s)}
                  >
                    <Text style={styles.symptomPlus}>{selectedSymptoms.includes(s) ? '✓' : '+'}</Text>
                    <Text style={[styles.symptomText, selectedSymptoms.includes(s) && styles.symptomTextActive]}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Upcoming Appointment */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Upcoming Appointments</Text>
              <View style={styles.appointmentCard}>
                <View style={styles.appointmentLeft}>
                  <View style={styles.appointmentAvatar}>
                    <Text style={{ fontSize: 24 }}>👩‍⚕️</Text>
                  </View>
                  <View>
                    <Text style={styles.appointmentName}>Dr. Sarah Mitchell</Text>
                    <Text style={styles.appointmentType}>Prenatal Checkup</Text>
                  </View>
                </View>
                <View style={styles.appointmentBottom}>
                  <View>
                    <Text style={styles.appointmentDate}>May 5, 2026</Text>
                    <Text style={styles.appointmentTime}>10:30 AM</Text>
                  </View>
                  <TouchableOpacity style={styles.rescheduleBtn}
                    onPress={() => Alert.alert('Reschedule', 'Booking system coming soon! 💜')}>
                    <Text style={styles.rescheduleBtnText}>Reschedule</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Contraction Timer */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>⏱ Contraction Timer</Text>
              <View style={styles.timerCard}>
                <Text style={styles.timerDisplay}>{formatTime(timerSeconds)}</Text>
                <View style={styles.timerBtns}>
                  <TouchableOpacity style={styles.timerPlayBtn} onPress={startTimer}>
                    <Text style={styles.timerPlayIcon}>{timerRunning ? '⏹' : '▶'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.timerResetBtn} onPress={resetTimer}>
                    <Text style={styles.timerResetIcon}>↺</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.timerSubtitle}>Recent Contractions</Text>
                {contractions.map((c, i) => (
                  <View key={i} style={styles.contractionRow}>
                    <View style={styles.contractionNum}>
                      <Text style={styles.contractionNumText}>{c.num}</Text>
                    </View>
                    <View style={styles.contractionInfo}>
                      <Text style={styles.contractionDuration}>{c.duration}</Text>
                      <Text style={styles.contractionIntensity}>{c.intensity}</Text>
                    </View>
                    <Text style={styles.contractionGap}>{c.gap}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Pregnancy Shopping List */}
            <View style={styles.card}>
              <View style={styles.shoppingHeader}>
                <Text style={styles.cardTitle}>🛒 Pregnancy Shopping List</Text>
                <TouchableOpacity style={styles.addBtn}
                  onPress={() => Alert.alert('Add Item', 'Coming soon! 💜')}>
                  <Text style={styles.addBtnText}>+</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.shoppingProgress}>
                <Text style={styles.shoppingProgressText}>{completedItems} of {SHOPPING_ITEMS.length} items complete</Text>
                <Text style={styles.shoppingPercent}>{Math.round((completedItems / SHOPPING_ITEMS.length) * 100)}%</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${(completedItems / SHOPPING_ITEMS.length) * 100}%` }]} />
              </View>
              {SHOPPING_ITEMS.map(item => (
                <TouchableOpacity key={item.id} style={styles.shoppingItem} onPress={() => toggleItem(item.id)}>
                  <View style={[styles.checkbox, checkedItems[item.id] && styles.checkboxOn]}>
                    {checkedItems[item.id] && <Text style={styles.tick}>✓</Text>}
                  </View>
                  <View style={styles.shoppingItemInfo}>
                    <Text style={[styles.shoppingItemName, checkedItems[item.id] && styles.itemDone]}>{item.name}</Text>
                    <Text style={styles.shoppingItemCat}>{item.category}</Text>
                  </View>
                  <View style={[styles.catBadge, { backgroundColor: item.color + '22' }]}>
                    <Text style={[styles.catBadgeText, { color: item.color }]}>{item.category}</Text>
                  </View>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.shareBtn}
                onPress={() => Alert.alert('Share 💜', 'Sharing with partner coming soon!')}>
                <Text style={styles.shareBtnText}>Share List with Partner</Text>
              </TouchableOpacity>
            </View>

            {/* Nutrition Today */}
            <View style={styles.card}>
              <View style={styles.shoppingHeader}>
                <Text style={styles.cardTitle}>🍎 Nutrition Today</Text>
                <TouchableOpacity style={[styles.addBtn, { backgroundColor: '#27AE60' }]}
                  onPress={() => Alert.alert('Add Meal', 'Coming soon! 💜')}>
                  <Text style={styles.addBtnText}>+</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.calCircleWrap}>
                <View style={styles.calCircle}>
                  <Text style={styles.calNum}>1,432</Text>
                  <Text style={styles.calOf}>of 2,000 cal</Text>
                </View>
              </View>
              {[
                { name: 'Protein', cur: 65, total: 80, color: '#E74C3C', emoji: '🥩' },
                { name: 'Carbs', cur: 180, total: 220, color: '#F59E0B', emoji: '🍞' },
                { name: 'Fats', cur: 45, total: 60, color: '#27AE60', emoji: '🥑' },
              ].map(m => (
                <View key={m.name} style={styles.macroRow}>
                  <Text style={styles.macroEmoji}>{m.emoji}</Text>
                  <View style={styles.macroInfo}>
                    <View style={styles.macroTop}>
                      <Text style={styles.macroName}>{m.name}</Text>
                      <Text style={styles.macroVal}>{m.cur}g / {m.total}g</Text>
                    </View>
                    <View style={styles.macroBar}>
                      <View style={[styles.macroFill, { width: `${(m.cur / m.total) * 100}%`, backgroundColor: m.color }]} />
                    </View>
                  </View>
                </View>
              ))}
              <Text style={[styles.cardTitle, { marginTop: 16, fontSize: 14 }]}>Recent Meals</Text>
              {MEALS.map((meal, i) => (
                <View key={i} style={styles.mealRow}>
                  <Text style={styles.mealEmoji}>{meal.emoji}</Text>
                  <View style={styles.mealInfo}>
                    <Text style={styles.mealName}>{meal.name}</Text>
                    <Text style={styles.mealTime}>{meal.time}</Text>
                  </View>
                  <Text style={styles.mealCal}>{meal.cal} cal</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF0F5' },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#C9748F' },
  modeToggle: {
    flexDirection: 'row', marginHorizontal: 20, marginBottom: 16,
    backgroundColor: '#fff', borderRadius: 50, padding: 4,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
  },
  modeBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 50 },
  modeBtnActive: { backgroundColor: '#C9748F' },
  modeBtnActivePreg: { backgroundColor: '#9B59B6' },
  modeBtnText: { fontSize: 14, fontWeight: '700', color: '#9B8FA0' },
  modeBtnTextActive: { color: '#fff' },
  card: {
    backgroundColor: '#fff', borderRadius: 20, marginHorizontal: 20,
    marginBottom: 16, padding: 16, shadowColor: '#000',
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: '800', color: '#2D1B2E', marginBottom: 12 },
  ringCard: {
    backgroundColor: '#fff', borderRadius: 20, marginHorizontal: 20,
    marginBottom: 16, padding: 24, alignItems: 'center',
    borderWidth: 1.5, borderColor: '#EDE0E8',
    shadowColor: '#C9748F', shadowOpacity: 0.08, shadowRadius: 8, elevation: 2,
  },
  ringWrap: { alignItems: 'center', justifyContent: 'center' },
  ringOuter: {
    width: 160, height: 160, borderRadius: 80,
    borderWidth: 12, borderColor: '#E74C3C',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#E74C3C', shadowOpacity: 0.2, shadowRadius: 12, elevation: 4,
  },
  ringInner: { alignItems: 'center' },
  ringDay: { fontSize: 36, fontWeight: '800', color: '#C9748F' },
  ringOf: { fontSize: 14, color: '#9B8FA0' },
  calHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  calArrow: { fontSize: 24, color: '#9B8FA0', fontWeight: '700' },
  calMonth: { fontSize: 16, fontWeight: '800', color: '#2D1B2E' },
  calDayRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8 },
  calDayLabel: { fontSize: 12, color: '#9B8FA0', fontWeight: '600', width: 32, textAlign: 'center' },
  calGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  calCell: {
    width: '14.28%', aspectRatio: 1, alignItems: 'center',
    justifyContent: 'center', marginBottom: 4,
  },
  calPeriod: { backgroundColor: '#E74C3C', borderRadius: 20 },
  calFertile: { backgroundColor: '#9B59B6', borderRadius: 20 },
  calToday: { backgroundColor: '#C9748F', borderRadius: 20 },
  calCellText: { fontSize: 14, fontWeight: '600', color: '#2D1B2E' },
  calCellTextWhite: { color: '#fff' },
  legendRow: { flexDirection: 'row', gap: 20, marginTop: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 12, color: '#9B8FA0' },
  symptomGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  symptomBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderWidth: 1.5, borderColor: '#EDE0E8', borderRadius: 50,
    paddingHorizontal: 14, paddingVertical: 10, backgroundColor: '#FAF0F5',
  },
  symptomBtnActive: { backgroundColor: '#C9748F', borderColor: '#C9748F' },
  symptomPlus: { fontSize: 14, color: '#C9748F', fontWeight: '800' },
  symptomText: { fontSize: 13, color: '#2D1B2E', fontWeight: '600' },
  symptomTextActive: { color: '#fff' },
  saveBtn: {
    backgroundColor: '#C9748F', borderRadius: 50,
    paddingVertical: 14, alignItems: 'center', marginTop: 14,
  },
  saveBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  fertilityCard: {
    backgroundColor: '#F5F0FF', borderRadius: 16,
    padding: 14, borderWidth: 1.5, borderColor: '#9B59B6',
  },
  fertilityHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  fertilityIcon: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: '#9B59B6', alignItems: 'center', justifyContent: 'center',
  },
  fertilityTitle: { fontSize: 16, fontWeight: '800', color: '#2D1B2E' },
  fertilitySub: { fontSize: 13, color: '#9B8FA0' },
  fertilityPoint: { fontSize: 13, color: '#2D1B2E', lineHeight: 22 },
  pregRingCard: {
    backgroundColor: '#fff', borderRadius: 20, marginHorizontal: 20,
    marginBottom: 16, padding: 24, alignItems: 'center',
    borderWidth: 1.5, borderColor: '#EDE0E8',
    shadowColor: '#9B59B6', shadowOpacity: 0.1, shadowRadius: 8, elevation: 2,
  },
  weekBadge: {
    backgroundColor: '#F0EAFF', borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 6, marginBottom: 8,
  },
  weekBadgeText: { fontSize: 13, fontWeight: '800', color: '#9B59B6' },
  trimesterTitle: { fontSize: 28, fontWeight: '800', color: '#2D1B2E', marginBottom: 4 },
  trimesterSub: { fontSize: 15, color: '#9B59B6', fontWeight: '600', marginBottom: 16 },
  pregRingWrap: { alignItems: 'center' },
  pregRingOuter: {
    width: 140, height: 140, borderRadius: 70,
    borderWidth: 12, borderColor: '#9B59B6',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#9B59B6', shadowOpacity: 0.2, shadowRadius: 12, elevation: 4,
  },
  pregRingInner: { alignItems: 'center' },
  pregPercent: { fontSize: 32, fontWeight: '800', color: '#9B59B6' },
  pregComplete: { fontSize: 13, color: '#9B8FA0' },
  babyCard: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 12 },
  babyEmoji: { fontSize: 56 },
  babyInfo: { flex: 1 },
  babySize: { fontSize: 20, fontWeight: '800', color: '#9B59B6' },
  babyMeasure: { fontSize: 14, color: '#9B8FA0' },
  babyDesc: { fontSize: 14, color: '#2D1B2E', lineHeight: 22, marginBottom: 12 },
  milestoneCard: {
    backgroundColor: '#27AE60', borderRadius: 16, padding: 14,
  },
  milestoneTitle: { fontSize: 15, fontWeight: '800', color: '#fff', marginBottom: 6 },
  milestoneText: { fontSize: 13, color: '#fff', lineHeight: 20 },
  appointmentCard: {
    borderWidth: 1.5, borderColor: '#3498DB', borderRadius: 16, padding: 14,
  },
  appointmentLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  appointmentAvatar: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: '#3498DB', alignItems: 'center', justifyContent: 'center',
  },
  appointmentName: { fontSize: 15, fontWeight: '800', color: '#2D1B2E' },
  appointmentType: { fontSize: 13, color: '#9B8FA0' },
  appointmentBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  appointmentDate: { fontSize: 14, fontWeight: '700', color: '#2D1B2E' },
  appointmentTime: { fontSize: 13, color: '#9B8FA0' },
  rescheduleBtn: {
    backgroundColor: '#3498DB', borderRadius: 50,
    paddingHorizontal: 16, paddingVertical: 10,
  },
  rescheduleBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  timerCard: { alignItems: 'center' },
  timerDisplay: { fontSize: 52, fontWeight: '800', color: '#E74C3C', marginBottom: 16 },
  timerBtns: { flexDirection: 'row', gap: 16, marginBottom: 20 },
  timerPlayBtn: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: '#E74C3C', alignItems: 'center', justifyContent: 'center',
    shadowColor: '#E74C3C', shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  timerPlayIcon: { fontSize: 22, color: '#fff' },
  timerResetBtn: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: '#FAF0F5', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: '#EDE0E8',
  },
  timerResetIcon: { fontSize: 24, color: '#9B8FA0' },
  timerSubtitle: { fontSize: 14, fontWeight: '700', color: '#2D1B2E', alignSelf: 'flex-start', marginBottom: 8 },
  contractionRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    width: '100%', paddingVertical: 8,
    borderBottomWidth: 1, borderBottomColor: '#FAF0F5',
  },
  contractionNum: {
    width: 28, height: 28, borderRadius: 8,
    backgroundColor: '#C9748F', alignItems: 'center', justifyContent: 'center',
  },
  contractionNumText: { color: '#fff', fontWeight: '800', fontSize: 13 },
  contractionInfo: { flex: 1 },
  contractionDuration: { fontSize: 14, fontWeight: '700', color: '#2D1B2E' },
  contractionIntensity: { fontSize: 12, color: '#9B8FA0' },
  contractionGap: { fontSize: 13, fontWeight: '700', color: '#C9748F' },
  shoppingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  addBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#3498DB', alignItems: 'center', justifyContent: 'center',
  },
  addBtnText: { color: '#fff', fontSize: 20, fontWeight: '700', lineHeight: 24 },
  shoppingProgress: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  shoppingProgressText: { fontSize: 13, color: '#9B8FA0' },
  shoppingPercent: { fontSize: 13, fontWeight: '700', color: '#3498DB' },
  progressBar: { height: 6, backgroundColor: '#EDE0E8', borderRadius: 3, marginBottom: 14 },
  progressFill: { height: 6, backgroundColor: '#3498DB', borderRadius: 3 },
  shoppingItem: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#FAF0F5', gap: 10,
  },
  checkbox: {
    width: 22, height: 22, borderRadius: 6, borderWidth: 2,
    borderColor: '#C9748F', alignItems: 'center', justifyContent: 'center',
  },
  checkboxOn: { backgroundColor: '#C9748F' },
  tick: { color: '#fff', fontSize: 13, fontWeight: '800' },
  shoppingItemInfo: { flex: 1 },
  shoppingItemName: { fontSize: 14, fontWeight: '700', color: '#2D1B2E' },
  itemDone: { textDecorationLine: 'line-through', color: '#9B8FA0' },
  shoppingItemCat: { fontSize: 12, color: '#9B8FA0' },
  catBadge: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  catBadgeText: { fontSize: 11, fontWeight: '700' },
  shareBtn: {
    backgroundColor: '#3498DB', borderRadius: 50,
    paddingVertical: 14, alignItems: 'center', marginTop: 16,
  },
  shareBtnText: { color: '#fff', fontWeight: '800', fontSize: 14 },
  calCircleWrap: { alignItems: 'center', marginBottom: 16 },
  calCircle: {
    width: 120, height: 120, borderRadius: 60,
    borderWidth: 8, borderColor: '#27AE60',
    alignItems: 'center', justifyContent: 'center',
  },
  calNum: { fontSize: 22, fontWeight: '800', color: '#27AE60' },
  calOf: { fontSize: 11, color: '#9B8FA0' },
  macroRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  macroEmoji: { fontSize: 20 },
  macroInfo: { flex: 1 },
  macroTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  macroName: { fontSize: 14, fontWeight: '700', color: '#2D1B2E' },
  macroVal: { fontSize: 13, color: '#9B8FA0' },
  macroBar: { height: 8, backgroundColor: '#EDE0E8', borderRadius: 4 },
  macroFill: { height: 8, borderRadius: 4 },
  mealRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#FAF0F5',
  },
  mealEmoji: { fontSize: 24 },
  mealInfo: { flex: 1 },
  mealName: { fontSize: 14, fontWeight: '700', color: '#2D1B2E' },
  mealTime: { fontSize: 12, color: '#9B8FA0' },
  mealCal: { fontSize: 14, fontWeight: '700', color: '#27AE60' },
  circleOuter: { borderWidth: 10, alignItems: 'center', justifyContent: 'center' },
  circleInner: { backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  circleLabel: { fontWeight: '800' },
  circleSub: { fontSize: 12, color: '#9B8FA0' },
  circleArc: { position: 'absolute', borderWidth: 10, borderTopColor: 'transparent', borderRightColor: 'transparent' },
});
