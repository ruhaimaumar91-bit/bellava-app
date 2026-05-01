import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar, Alert,
} from 'react-native';
import COLORS from './colors';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const PHASES = [
  { name: 'Menstrual', days: 'Days 1–5', color: '#E74C3C', emoji: '🔴', tip: 'Rest and be gentle with yourself. Iron-rich foods help energy levels.' },
  { name: 'Follicular', days: 'Days 6–13', color: '#F59E0B', emoji: '🌱', tip: 'Energy rising! Great time to start new projects and exercise.' },
  { name: 'Ovulation', days: 'Days 14–16', color: '#4CAF82', emoji: '✨', tip: 'Peak energy and confidence. Best time for important meetings.' },
  { name: 'Luteal', days: 'Days 17–28', color: '#7B6B9E', emoji: '🌙', tip: 'Wind down and prioritise rest. Magnesium helps with PMS symptoms.' },
];

const SYMPTOMS = ['😴 Tired', '🤕 Cramps', '😊 Happy', '😤 Moody', '🤢 Nausea', '💧 Bloating', '🔥 Hot flashes', '💪 Energetic'];

const SHOPPING_ITEMS = [
  { id: '1', name: 'Prenatal Vitamins', category: 'Health', emoji: '💊' },
  { id: '2', name: 'Nursing Bras (3)', category: 'Baby', emoji: '👙' },
  { id: '3', name: 'Baby Wipes', category: 'Baby', emoji: '🧻' },
  { id: '4', name: 'Folate-rich Foods', category: 'Nutrition', emoji: '🥦' },
  { id: '5', name: 'Hospital Bag Essentials', category: 'Essentials', emoji: '👜' },
];

const MEALS = [
  { name: 'Greek Yogurt Bowl', time: '8:30 AM', cal: 320, emoji: '🥣' },
  { name: 'Grilled Salmon', time: '12:45 PM', cal: 425, emoji: '🐟' },
  { name: 'Mixed Nuts & Fruit', time: '3:00 PM', cal: 180, emoji: '🥜' },
];

const CAT_COLORS = { Health: '#E74C3C', Baby: '#7B6B9E', Nutrition: '#4CAF82', Essentials: '#F59E0B' };

const CALENDAR = [
  { day: 'Mon', date: 28, type: 'period' },
  { day: 'Tue', date: 29, type: 'period' },
  { day: 'Wed', date: 30, type: 'period' },
  { day: 'Thu', date: 1, type: 'today' },
  { day: 'Fri', date: 2, type: 'fertile' },
  { day: 'Sat', date: 3, type: 'fertile' },
  { day: 'Sun', date: 4, type: 'fertile' },
];
export default function CycleScreen() {
  const [activeTab, setActiveTab] = useState('cycle');
  const [currentPhase, setCurrentPhase] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedDay, setSelectedDay] = useState(3);

  const toggleSymptom = (s) => {
    setSelectedSymptoms(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  const toggleItem = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedItems = Object.values(checkedItems).filter(Boolean).length;
  const totalCal = MEALS.reduce((a, m) => a + m.cal, 0);
  const phase = PHASES[currentPhase];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF0F5" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Tracker 📅</Text>
          <Text style={styles.headerSub}>Cycle day 14 of 28</Text>
        </View>
        <View style={styles.dayBadge}>
          <Text style={styles.dayBadgeText}>Day 14</Text>
        </View>
      </View>

      {/* Top Tabs */}
      <View style={styles.tabRow}>
        {[
          { id: 'cycle', label: '🌸 Cycle' },
          { id: 'pregnancy', label: '🤰 Pregnancy' },
          { id: 'nutrition', label: '🥗 Nutrition' },
        ].map(t => (
          <TouchableOpacity
            key={t.id}
            style={[styles.tabBtn, activeTab === t.id && styles.tabBtnActive]}
            onPress={() => setActiveTab(t.id)}
          >
            <Text style={[styles.tabText, activeTab === t.id && styles.tabTextActive]}>
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* CYCLE TAB */}
        {activeTab === 'cycle' && (
          <View>
            {/* Calendar Strip */}
            <View style={styles.calendarCard}>
              <Text style={styles.cardTitle}>May 2026</Text>
              <View style={styles.calendarRow}>
                {CALENDAR.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.calDay,
                      item.type === 'period' && styles.calPeriod,
                      item.type === 'today' && styles.calToday,
                      item.type === 'fertile' && styles.calFertile,
                      selectedDay === i && styles.calSelected,
                    ]}
                    onPress={() => setSelectedDay(i)}
                  >
                    <Text style={styles.calDayLabel}>{item.day}</Text>
                    <Text style={[
                      styles.calDayNum,
                      (item.type === 'today' || selectedDay === i) && styles.calDayNumWhite,
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
                  <View style={[styles.legendDot, { backgroundColor: '#C9748F' }]} />
                  <Text style={styles.legendText}>Today</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#4CAF82' }]} />
                  <Text style={styles.legendText}>Fertile</Text>
                </View>
              </View>
            </View>

            {/* Current Phase */}
            <View style={[styles.phaseCard, { borderColor: phase.color }]}>
              <View style={styles.phaseHeader}>
                <Text style={styles.phaseEmoji}>{phase.emoji}</Text>
                <View>
                  <Text style={styles.phaseName}>{phase.name} Phase</Text>
                  <Text style={styles.phaseDays}>{phase.days}</Text>
                </View>
              </View>
              <Text style={styles.phaseTip}>{phase.tip}</Text>
              <View style={styles.phaseNav}>
                {PHASES.map((p, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[styles.phaseDot, { backgroundColor: i === currentPhase ? p.color : '#EDE0E8' }]}
                    onPress={() => setCurrentPhase(i)}
                  />
                ))}
              </View>
            </View>

            {/* Log Symptoms */}
            <View style={styles.symptomCard}>
              <Text style={styles.cardTitle}>Log Today's Symptoms</Text>
              <View style={styles.symptomGrid}>
                {SYMPTOMS.map(s => (
                  <TouchableOpacity
                    key={s}
                    style={[styles.symptomBtn, selectedSymptoms.includes(s) && styles.symptomBtnActive]}
                    onPress={() => toggleSymptom(s)}
                  >
                    <Text style={[styles.symptomText, selectedSymptoms.includes(s) && styles.symptomTextActive]}>
                      {s}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {selectedSymptoms.length > 0 && (
                <TouchableOpacity
                  style={styles.saveBtn}
                  onPress={() => Alert.alert('Saved! 💜', 'Your symptoms have been logged.')}
                >
                  <Text style={styles.saveBtnText}>Save Symptoms 💜</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* PREGNANCY TAB */}
        {activeTab === 'pregnancy' && (
          <View>
            <View style={styles.shoppingCard}>
              <View style={styles.shoppingHeader}>
                <Text style={styles.cardTitle}>🛒 Pregnancy Shopping List</Text>
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() => Alert.alert('Add Item', 'Custom items coming soon! 💜')}
                >
                  <Text style={styles.addBtnText}>+</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.progressRow}>
                <Text style={styles.progressText}>{completedItems} of {SHOPPING_ITEMS.length} items complete</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${(completedItems / SHOPPING_ITEMS.length) * 100}%` }]} />
              </View>
              {SHOPPING_ITEMS.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.shoppingItem}
                  onPress={() => toggleItem(item.id)}
                >
                  <View style={[styles.checkbox, checkedItems[item.id] && styles.checkboxOn]}>
                    {checkedItems[item.id] && <Text style={styles.tick}>✓</Text>}
                  </View>
                  <Text style={styles.itemEmoji}>{item.emoji}</Text>
                  <View style={styles.itemInfo}>
                    <Text style={[styles.itemName, checkedItems[item.id] && styles.itemDone]}>
                      {item.name}
                    </Text>
                    <Text style={styles.itemCat}>{item.category}</Text>
                  </View>
                  <View style={[styles.catBadge, { backgroundColor: CAT_COLORS[item.category] + '22' }]}>
                    <Text style={[styles.catBadgeText, { color: CAT_COLORS[item.category] }]}>
                      {item.category}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.shareBtn}
                onPress={() => Alert.alert('Share List 💜', 'Sharing with partner coming soon!')}
              >
                <Text style={styles.shareBtnText}>📤 Share List with Partner</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* NUTRITION TAB */}
        {activeTab === 'nutrition' && (
          <View>
            <View style={styles.nutritionCard}>
              <View style={styles.nutritionHeader}>
                <Text style={styles.cardTitle}>🍎 Nutrition Today</Text>
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() => Alert.alert('Add Meal', 'Meal logging coming soon! 💜')}
                >
                  <Text style={styles.addBtnText}>+</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.calCircleWrap}>
                <View style={styles.calCircle}>
                  <Text style={styles.calNum}>{totalCal}</Text>
                  <Text style={styles.calLabel}>of 2,000 cal</Text>
                </View>
              </View>
              {[
                { name: 'Protein', current: 65, total: 80, color: '#E74C3C', emoji: '🥩' },
                { name: 'Carbs', current: 180, total: 220, color: '#F59E0B', emoji: '🍞' },
                { name: 'Fats', current: 45, total: 60, color: '#4CAF82', emoji: '🥑' },
              ].map(macro => (
                <View key={macro.name} style={styles.macroRow}>
                  <Text style={styles.macroEmoji}>{macro.emoji}</Text>
                  <View style={styles.macroInfo}>
                    <View style={styles.macroLabelRow}>
                      <Text style={styles.macroName}>{macro.name}</Text>
                      <Text style={styles.macroVal}>{macro.current}g / {macro.total}g</Text>
                    </View>
                    <View style={styles.macroBar}>
                      <View style={[styles.macroFill, { width: `${(macro.current / macro.total) * 100}%`, backgroundColor: macro.color }]} />
                    </View>
                  </View>
                </View>
              ))}
              <Text style={[styles.cardTitle, { marginTop: 16 }]}>Recent Meals</Text>
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
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#2D1B2E' },
  headerSub: { fontSize: 13, color: '#9B8FA0', marginTop: 2 },
  dayBadge: {
    backgroundColor: '#C9748F', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 8,
  },
  dayBadgeText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  tabRow: {
    flexDirection: 'row', marginHorizontal: 20, marginBottom: 16,
    backgroundColor: '#fff', borderRadius: 16, padding: 4,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  tabBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 12 },
  tabBtnActive: { backgroundColor: '#C9748F' },
  tabText: { fontSize: 12, fontWeight: '600', color: '#9B8FA0' },
  tabTextActive: { color: '#fff' },
  calendarCard: {
    backgroundColor: '#fff', borderRadius: 20, marginHorizontal: 20,
    marginBottom: 16, padding: 16, shadowColor: '#000',
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: '800', color: '#2D1B2E', marginBottom: 12 },
  calendarRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  calDay: {
    alignItems: 'center', padding: 8, borderRadius: 12, width: 44,
  },
  calPeriod: { backgroundColor: '#FFE8E8' },
  calToday: { backgroundColor: '#C9748F' },
  calFertile: { backgroundColor: '#E8F8F0' },
  calSelected: { backgroundColor: '#C9748F' },
  calDayLabel: { fontSize: 11, color: '#9B8FA0', marginBottom: 4 },
  calDayNum: { fontSize: 15, fontWeight: '700', color: '#2D1B2E' },
  calDayNumWhite: { color: '#fff' },
  legendRow: { flexDirection: 'row', gap: 16 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 12, color: '#9B8FA0' },
  phaseCard: {
    backgroundColor: '#fff', borderRadius: 20, marginHorizontal: 20,
    marginBottom: 16, padding: 16, borderWidth: 2,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  phaseHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  phaseEmoji: { fontSize: 32 },
  phaseName: { fontSize: 18, fontWeight: '800', color: '#2D1B2E' },
  phaseDays: { fontSize: 13, color: '#9B8FA0' },
  phaseTip: { fontSize: 14, color: '#2D1B2E', lineHeight: 22, marginBottom: 14 },
  phaseNav: { flexDirection: 'row', gap: 8 },
  phaseDot: { width: 12, height: 12, borderRadius: 6 },
  symptomCard: {
    backgroundColor: '#fff', borderRadius: 20, marginHorizontal: 20,
    marginBottom: 16, padding: 16, shadowColor: '#000',
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  symptomGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  symptomBtn: {
    borderWidth: 1.5, borderColor: '#EDE0E8', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#FAF0F5',
  },
  symptomBtnActive: { backgroundColor: '#C9748F', borderColor: '#C9748F' },
  symptomText: { fontSize: 13, color: '#9B8FA0', fontWeight: '600' },
  symptomTextActive: { color: '#fff' },
  saveBtn: {
    backgroundColor: '#C9748F', borderRadius: 50,
    paddingVertical: 12, alignItems: 'center', marginTop: 14,
  },
  saveBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  shoppingCard: {
    backgroundColor: '#fff', borderRadius: 20, marginHorizontal: 20,
    marginBottom: 16, padding: 16, shadowColor: '#000',
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  shoppingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  addBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#C9748F', alignItems: 'center', justifyContent: 'center',
  },
  addBtnText: { color: '#fff', fontSize: 20, fontWeight: '700', lineHeight: 24 },
  progressRow: { marginBottom: 6 },
  progressText: { fontSize: 13, color: '#9B8FA0' },
  progressBar: {
    height: 6, backgroundColor: '#EDE0E8', borderRadius: 3, marginBottom: 14,
  },
  progressFill: { height: 6, backgroundColor: '#4CAF82', borderRadius: 3 },
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
  itemEmoji: { fontSize: 20 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: '700', color: '#2D1B2E' },
  itemDone: { textDecorationLine: 'line-through', color: '#9B8FA0' },
  itemCat: { fontSize: 12, color: '#9B8FA0' },
  catBadge: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  catBadgeText: { fontSize: 11, fontWeight: '700' },
  shareBtn: {
    backgroundColor: '#7B6B9E', borderRadius: 50,
    paddingVertical: 14, alignItems: 'center', marginTop: 16,
  },
  shareBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  nutritionCard: {
    backgroundColor: '#fff', borderRadius: 20, marginHorizontal: 20,
    marginBottom: 16, padding: 16, shadowColor: '#000',
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  nutritionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  calCircleWrap: { alignItems: 'center', marginBottom: 20 },
  calCircle: {
    width: 130, height: 130, borderRadius: 65,
    borderWidth: 8, borderColor: '#4CAF82',
    alignItems: 'center', justifyContent: 'center',
  },
  calNum: { fontSize: 28, fontWeight: '800', color: '#4CAF82' },
  calLabel: { fontSize: 12, color: '#9B8FA0' },
  macroRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  macroEmoji: { fontSize: 20 },
  macroInfo: { flex: 1 },
  macroLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
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
  mealCal: { fontSize: 14, fontWeight: '700', color: '#4CAF82' },
});
