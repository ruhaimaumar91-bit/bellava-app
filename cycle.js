import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar, Modal,
} from 'react-native';
import COLORS from './colors';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const PHASE_INFO = [
  {
    id: 'menstrual',
    emoji: '🌙',
    label: 'Menstrual',
    days: 'Days 1–5',
    color: '#E74C3C',
    bg: '#FFF0F0',
    description: 'Your period. Rest, warmth and iron-rich foods help. Be kind to yourself.',
  },
  {
    id: 'follicular',
    emoji: '🌱',
    label: 'Follicular',
    days: 'Days 6–13',
    color: '#27AE60',
    bg: '#F0FFF4',
    description: 'Energy rises. Great time for new projects, exercise and socialising.',
  },
  {
    id: 'ovulation',
    emoji: '✨',
    label: 'Ovulation',
    days: 'Days 14–16',
    color: '#F39C12',
    bg: '#FFFDE6',
    description: 'Peak energy and confidence. Most fertile time of your cycle.',
  },
  {
    id: 'luteal',
    emoji: '🌕',
    label: 'Luteal',
    days: 'Days 17–28',
    color: '#8E44AD',
    bg: '#F5EEFF',
    description: 'Wind down. PMS may appear. Rest, nourish and reduce stress.',
  },
];

const PERIOD_SYMPTOMS = [
  'Cramps', 'Bloating', 'Headache', 'Fatigue', 'Mood changes',
  'Back pain', 'Breast tenderness', 'Nausea', 'Spotting', 'Heavy flow',
];

export default function CycleScreen({ onBack, userPlan }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [periodDays, setPeriodDays] = useState([3, 4, 5, 6, 7]);
  const [ovulationDay] = useState(14);
  const [showDayModal, setShowDayModal] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState({});
  const [cycleLength] = useState(28);
  const [periodLength] = useState(5);

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  const getDayType = (day) => {
    if (periodDays.includes(day)) return 'period';
    if (day === ovulationDay) return 'ovulation';
    if (day === ovulationDay - 1 || day === ovulationDay + 1) return 'fertile';
    if (day > periodDays[periodDays.length - 1] && day < ovulationDay - 1) return 'follicular';
    if (day > ovulationDay + 1) return 'luteal';
    return 'normal';
  };

  const getDayStyle = (type) => {
    switch (type) {
      case 'period': return { bg: '#FFE0E0', text: '#E74C3C', border: '#E74C3C' };
      case 'ovulation': return { bg: '#FFF3CD', text: '#F39C12', border: '#F39C12' };
      case 'fertile': return { bg: '#FFF9E6', text: '#F39C12', border: '#FFE0A0' };
      case 'follicular': return { bg: '#E8F8EE', text: '#27AE60', border: 'transparent' };
      case 'luteal': return { bg: '#F3E8FF', text: '#8E44AD', border: 'transparent' };
      default: return { bg: 'transparent', text: COLORS.text, border: 'transparent' };
    }
  };

  const togglePeriodDay = (day) => {
    setPeriodDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day].sort((a, b) => a - b)
    );
  };

  const toggleSymptom = (day, symptom) => {
    setSelectedSymptoms(prev => {
      const daySymptoms = prev[day] || [];
      return {
        ...prev,
        [day]: daySymptoms.includes(symptom)
          ? daySymptoms.filter(s => s !== symptom)
          : [...daySymptoms, symptom],
      };
    });
  };

  const getCurrentPhase = () => {
    const todayDay = today.getDate();
    const type = getDayType(todayDay);
    if (type === 'period') return PHASE_INFO[0];
    if (type === 'follicular') return PHASE_INFO[1];
    if (type === 'ovulation' || type === 'fertile') return PHASE_INFO[2];
    return PHASE_INFO[3];
  };

  const currentPhase = getCurrentPhase();

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Cycle Tracker</Text>
          <Text style={styles.headerSub}>Your monthly overview 🌸</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* Current Phase Banner */}
        <View style={[styles.phaseBanner, { backgroundColor: currentPhase.bg, borderLeftColor: currentPhase.color }]}>
          <Text style={styles.phaseEmoji}>{currentPhase.emoji}</Text>
          <View style={styles.phaseInfo}>
            <Text style={[styles.phaseLabel, { color: currentPhase.color }]}>
              {currentPhase.label} Phase — {currentPhase.days}
            </Text>
            <Text style={styles.phaseDesc}>{currentPhase.description}</Text>
          </View>
        </View>

        {/* Calendar */}
        <View style={styles.calendarCard}>
          {/* Month navigation */}
          <View style={styles.monthNav}>
            <TouchableOpacity onPress={prevMonth} style={styles.navBtn}>
              <Text style={styles.navArrow}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.monthTitle}>
              {MONTHS[currentMonth]} {currentYear}
            </Text>
            <TouchableOpacity onPress={nextMonth} style={styles.navBtn}>
              <Text style={styles.navArrow}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Day headers */}
          <View style={styles.dayHeaders}>
            {DAYS_OF_WEEK.map(d => (
              <Text key={d} style={styles.dayHeader}>{d}</Text>
            ))}
          </View>

          {/* Calendar grid */}
          <View style={styles.calendarGrid}>
            {calendarDays.map((day, index) => {
              if (!day) return <View key={`empty-${index}`} style={styles.calendarCell} />;
              const type = getDayType(day);
              const dayStyle = getDayStyle(type);
              const isToday = day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear();
              const hasSymptoms = selectedSymptoms[day]?.length > 0;

              return (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.calendarCell,
                    {
                      backgroundColor: dayStyle.bg,
                      borderWidth: isToday ? 2 : dayStyle.border !== 'transparent' ? 1 : 0,
                      borderColor: isToday ? COLORS.primary : dayStyle.border,
                    },
                  ]}
                  onPress={() => {
                    setSelectedDay(day);
                    setShowDayModal(true);
                  }}
                >
                  <Text style={[styles.calendarDayText, { color: dayStyle.text }]}>
                    {day}
                  </Text>
                  {type === 'period' && <Text style={styles.dayDot}>🔴</Text>}
                  {type === 'ovulation' && <Text style={styles.dayDot}>✨</Text>}
                  {hasSymptoms && <Text style={styles.dayDot}>📝</Text>}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Legend */}
          <View style={styles.legend}>
            {[
              { color: '#E74C3C', label: 'Period', bg: '#FFE0E0' },
              { color: '#F39C12', label: 'Ovulation', bg: '#FFF3CD' },
              { color: '#27AE60', label: 'Follicular', bg: '#E8F8EE' },
              { color: '#8E44AD', label: 'Luteal', bg: '#F3E8FF' },
            ].map(item => (
              <View key={item.label} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: item.bg, borderColor: item.color }]} />
                <Text style={styles.legendText}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Phase Guide */}
        <Text style={styles.sectionTitle}>Cycle Phases Guide</Text>
        {PHASE_INFO.map(phase => (
          <View key={phase.id} style={[styles.phaseCard, { backgroundColor: phase.bg, borderLeftColor: phase.color }]}>
            <View style={styles.phaseCardHeader}>
              <Text style={styles.phaseCardEmoji}>{phase.emoji}</Text>
              <View>
                <Text style={[styles.phaseCardLabel, { color: phase.color }]}>{phase.label}</Text>
                <Text style={styles.phaseCardDays}>{phase.days}</Text>
              </View>
            </View>
            <Text style={styles.phaseCardDesc}>{phase.description}</Text>
          </View>
        ))}

        {/* Cycle Stats */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>📊 Your Cycle Stats</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{cycleLength}</Text>
              <Text style={styles.statLabel}>Cycle length</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{periodLength}</Text>
              <Text style={styles.statLabel}>Period days</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{ovulationDay}</Text>
              <Text style={styles.statLabel}>Ovulation day</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Day Detail Modal */}
      <Modal visible={showDayModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            {selectedDay && (
              <>
                <Text style={styles.modalTitle}>
                  {MONTHS[currentMonth]} {selectedDay}, {currentYear}
                </Text>

                <TouchableOpacity
                  style={[
                    styles.periodToggle,
                    periodDays.includes(selectedDay) && styles.periodToggleActive,
                  ]}
                  onPress={() => togglePeriodDay(selectedDay)}
                >
                  <Text style={styles.periodToggleText}>
                    {periodDays.includes(selectedDay) ? '🔴 Period day (tap to remove)' : '➕ Mark as period day'}
                  </Text>
                </TouchableOpacity>

                <Text style={styles.symptomsTitle}>Log symptoms:</Text>
                <View style={styles.symptomsGrid}>
                  {PERIOD_SYMPTOMS.map(symptom => {
                    const isSelected = selectedSymptoms[selectedDay]?.includes(symptom);
                    return (
                      <TouchableOpacity
                        key={symptom}
                        style={[styles.symptomChip, isSelected && styles.symptomChipActive]}
                        onPress={() => toggleSymptom(selectedDay, symptom)}
                      >
                        <Text style={[styles.symptomChipText, isSelected && styles.symptomChipTextActive]}>
                          {symptom}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </>
            )}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowDayModal(false)}
            >
              <Text style={styles.closeBtnText}>Done ✓</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1, borderBottomColor: COLORS.border, gap: 12,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: COLORS.background,
    alignItems: 'center', justifyContent: 'center',
  },
  backArrow: { fontSize: 22, color: COLORS.primary },
  headerTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  headerSub: { fontSize: 13, color: COLORS.textLight, marginTop: 2 },
  content: { flex: 1, padding: 16 },
  phaseBanner: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 16, padding: 16,
    borderLeftWidth: 4, marginBottom: 16, gap: 12,
  },
  phaseEmoji: { fontSize: 32 },
  phaseInfo: { flex: 1 },
  phaseLabel: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  phaseDesc: { fontSize: 13, color: COLORS.textLight, lineHeight: 20 },
  calendarCard: {
    backgroundColor: COLORS.white, borderRadius: 20,
    padding: 16, marginBottom: 16,
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 10, elevation: 2,
  },
  monthNav: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 16,
  },
  navBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: COLORS.background,
    alignItems: 'center', justifyContent: 'center',
  },
  navArrow: { fontSize: 22, color: COLORS.primary, fontWeight: '700' },
  monthTitle: { fontSize: 17, fontWeight: '800', color: COLORS.text },
  dayHeaders: { flexDirection: 'row', marginBottom: 8 },
  dayHeader: {
    flex: 1, textAlign: 'center',
    fontSize: 12, fontWeight: '700',
    color: COLORS.textLight,
  },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  calendarCell: {
    width: '14.28%', aspectRatio: 1,
    alignItems: 'center', justifyContent: 'center',
    borderRadius: 10, marginBottom: 4,
  },
  calendarDayText: { fontSize: 14, fontWeight: '600' },
  dayDot: { fontSize: 8, marginTop: 1 },
  legend: {
    flexDirection: 'row', flexWrap: 'wrap',
    gap: 8, marginTop: 12, paddingTop: 12,
    borderTopWidth: 1, borderTopColor: COLORS.border,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: {
    width: 14, height: 14, borderRadius: 7,
    borderWidth: 1.5,
  },
  legendText: { fontSize: 11, color: COLORS.textLight },
  sectionTitle: {
    fontSize: 17, fontWeight: '800',
    color: COLORS.text, marginBottom: 12, marginTop: 4,
  },
  phaseCard: {
    borderRadius: 16, padding: 14,
    borderLeftWidth: 4, marginBottom: 10,
  },
  phaseCardHeader: {
    flexDirection: 'row', alignItems: 'center',
    gap: 10, marginBottom: 6,
  },
  phaseCardEmoji: { fontSize: 24 },
  phaseCardLabel: { fontSize: 14, fontWeight: '700' },
  phaseCardDays: { fontSize: 12, color: COLORS.textLight },
  phaseCardDesc: { fontSize: 13, color: COLORS.text, lineHeight: 20 },
  statsCard: {
    backgroundColor: COLORS.white, borderRadius: 20,
    padding: 20, marginTop: 8,
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 10, elevation: 2,
  },
  statsTitle: { fontSize: 16, fontWeight: '800', color: COLORS.text, marginBottom: 16 },
  statsRow: { flexDirection: 'row', alignItems: 'center' },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 28, fontWeight: '800', color: COLORS.primary },
  statLabel: { fontSize: 12, color: COLORS.textLight, marginTop: 4 },
  statDivider: { width: 1, height: 40, backgroundColor: COLORS.border },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: COLORS.white, borderTopLeftRadius: 28,
    borderTopRightRadius: 28, padding: 24,
  },
  modalHandle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: COLORS.border, alignSelf: 'center', marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20, fontWeight: '800',
    color: COLORS.text, marginBottom: 16,
  },
  periodToggle: {
    backgroundColor: COLORS.background, borderRadius: 50,
    paddingVertical: 12, paddingHorizontal: 20,
    alignItems: 'center', marginBottom: 20,
    borderWidth: 1.5, borderColor: COLORS.border,
  },
  periodToggleActive: {
    backgroundColor: '#FFE0E0', borderColor: '#E74C3C',
  },
  periodToggleText: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  symptomsTitle: {
    fontSize: 15, fontWeight: '700',
    color: COLORS.text, marginBottom: 12,
  },
  symptomsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  symptomChip: {
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 50, backgroundColor: COLORS.background,
    borderWidth: 1.5, borderColor: COLORS.border,
  },
  symptomChipActive: {
    backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary,
  },
  symptomChipText: { fontSize: 13, color: COLORS.textLight, fontWeight: '600' },
  symptomChipTextActive: { color: COLORS.primary },
  closeBtn: {
    backgroundColor: COLORS.primary, borderRadius: 50,
    paddingVertical: 14, alignItems: 'center',
  },
  closeBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
