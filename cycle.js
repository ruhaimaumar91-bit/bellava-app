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
    id: 'menstrual', emoji: '🌙', label: 'Menstrual',
    days: 'Days 1–5', color: '#E74C3C', bg: '#FFF0F0',
    description: 'Your period. Rest, warmth and iron-rich foods help. Be kind to yourself.',
  },
  {
    id: 'follicular', emoji: '🌱', label: 'Follicular',
    days: 'Days 6–13', color: '#27AE60', bg: '#F0FFF4',
    description: 'Energy rises. Great time for new projects, exercise and socialising.',
  },
  {
    id: 'ovulation', emoji: '✨', label: 'Ovulation',
    days: 'Days 14–16', color: '#F39C12', bg: '#FFFDE6',
    description: 'Peak energy and confidence. Most fertile time of your cycle.',
  },
  {
    id: 'luteal', emoji: '🌕', label: 'Luteal',
    days: 'Days 17–28', color: '#8E44AD', bg: '#F5EEFF',
    description: 'Wind down. PMS may appear. Rest, nourish and reduce stress.',
  },
];

const JOURNEY_TIPS = {
  conceive: [
    { emoji: '🌱', tip: 'Track your LH surge with ovulation test strips for the most accurate fertile window detection.' },
    { emoji: '🌡️', tip: 'Take your basal body temperature every morning before getting up to spot your ovulation pattern.' },
    { emoji: '🥗', tip: 'Folic acid 400mcg daily, iron and zinc support healthy fertility for both partners.' },
    { emoji: '💜', tip: 'The TTC journey can be emotional. Be kind to yourself and lean on your support network.' },
  ],
  pregnant: [
    { emoji: '🤰', tip: 'Your cycle tracker now helps monitor pregnancy symptoms week by week.' },
    { emoji: '💊', tip: 'Continue taking folic acid until at least week 12. Ask your midwife about vitamin D.' },
    { emoji: '🏥', tip: 'Book your dating scan between 8-12 weeks if you have not already done so.' },
    { emoji: '💜', tip: 'Mood changes are completely normal in pregnancy. Talk to your midwife if you are struggling.' },
  ],
  surrogacy: [
    { emoji: '👶', tip: 'Whether you are a surrogate or intended parent, tracking health and wellbeing is important.' },
    { emoji: '💜', tip: 'Surrogacy UK and COTS are excellent resources for support and legal guidance.' },
    { emoji: '🏥', tip: 'Regular check-ins with your healthcare team are essential throughout the surrogacy journey.' },
    { emoji: '🌸', tip: 'The emotional aspects of surrogacy are unique. Consider connecting with a surrogacy counsellor.' },
  ],
  wellbeing: [
    { emoji: '🌸', tip: 'Understanding your cycle phases helps you work with your body, not against it.' },
    { emoji: '🥗', tip: 'Eating iron-rich foods during your period helps replenish what is lost during bleeding.' },
    { emoji: '💪', tip: 'Gentle exercise during your period can actually help reduce cramps and improve mood.' },
    { emoji: '💜', tip: 'Your cycle is unique to you. Track for 3 months to understand your personal patterns.' },
  ],
};

const PERIOD_SYMPTOMS = [
  'Cramps', 'Bloating', 'Headache', 'Fatigue', 'Mood changes',
  'Back pain', 'Breast tenderness', 'Nausea', 'Spotting', 'Heavy flow',
];

export default function CycleScreen({ onBack, userPlan, userJourney }) {
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

  const journey = userJourney || 'wellbeing';
  const tips = JOURNEY_TIPS[journey] || JOURNEY_TIPS.wellbeing;

  const getJourneyColor = () => {
    if (journey === 'conceive') return '#27AE60';
    if (journey === 'pregnant') return '#9B59B6';
    if (journey === 'surrogacy') return '#E91E8C';
    return COLORS.primary;
  };

  const getJourneyTitle = () => {
    if (journey === 'conceive') return '🌱 TTC Cycle Tracker';
    if (journey === 'pregnant') return '🤰 Pregnancy Tracker';
    if (journey === 'surrogacy') return '👶 Surrogacy Tracker';
    return '🌸 Cycle Tracker';
  };

  const journeyColor = getJourneyColor();

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const getDayType = (day) => {
    if (periodDays.includes(day)) return 'period';
    if (day === ovulationDay) return 'ovulation';
    if (day === ovulationDay - 1 || day === ovulationDay + 1) return 'fertile';
    if (day > periodDays[periodDays.length - 1] && day < ovulationDay - 1) return 'follicular';
    if (day > ovulationDay + 1) return 'luteal';
    return 'normal';
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
      <View style={[styles.header, { borderBottomColor: journeyColor }]}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>{getJourneyTitle()}</Text>
          <Text style={styles.headerSub}>Your monthly overview</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* Current Phase Banner */}
        <View style={[styles.phaseBanner, {
          backgroundColor: currentPhase.bg,
          borderLeftColor: currentPhase.color,
        }]}>
          <Text style={styles.phaseEmoji}>{currentPhase.emoji}</Text>
          <View style={styles.phaseInfo}>
            <Text style={[styles.phaseLabel, { color: currentPhase.color }]}>
              {currentPhase.label} Phase — {currentPhase.days}
            </Text>
            <Text style={styles.phaseDesc}>{currentPhase.description}</Text>
          </View>
        </View>

        {/* Fertile Window Banner for TTC */}
        {journey === 'conceive' && (
          <View style={styles.fertileWindow}>
            <Text style={styles.fertileWindowEmoji}>🌱</Text>
            <View style={styles.fertileWindowInfo}>
              <Text style={styles.fertileWindowTitle}>Fertile Window</Text>
              <Text style={styles.fertileWindowText}>
                Days {ovulationDay - 2}–{ovulationDay + 1} are your most fertile days
              </Text>
            </View>
          </View>
        )}

        {/* Clean Calendar */}
        <View style={styles.calendarCard}>
          {/* Month Navigation */}
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

          {/* Day Headers */}
          <View style={styles.dayHeaders}>
            {DAYS_OF_WEEK.map(d => (
              <Text key={d} style={styles.dayHeader}>{d}</Text>
            ))}
          </View>

          {/* Calendar Grid — Clean Design */}
          <View style={styles.calendarGrid}>
            {calendarDays.map((day, index) => {
              if (!day) return (
                <View key={`empty-${index}`} style={styles.calendarCell} />
              );

              const type = getDayType(day);
              const isToday = day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear();
              const isPeriod = type === 'period';
              const isOvulation = type === 'ovulation';
              const isFertile = type === 'fertile';
              const hasSymptoms = selectedSymptoms[day]?.length > 0;

              return (
                <TouchableOpacity
                  key={day}
                  style={styles.calendarCell}
                  onPress={() => {
                    setSelectedDay(day);
                    setShowDayModal(true);
                  }}
                >
                  {/* Day Circle */}
                  <View style={[
                    styles.dayCircle,
                    isToday && { backgroundColor: journeyColor },
                    isPeriod && !isToday && { backgroundColor: '#FFE8E8' },
                    isOvulation && !isToday && { backgroundColor: '#FFF3CD' },
                    isFertile && journey === 'conceive' && !isToday && { backgroundColor: '#E8F8EE' },
                  ]}>
                    <Text style={[
                      styles.calendarDayText,
                      isToday && { color: '#fff', fontWeight: '800' },
                      isPeriod && !isToday && { color: '#E74C3C', fontWeight: '700' },
                      isOvulation && !isToday && { color: '#F39C12', fontWeight: '700' },
                      isFertile && journey === 'conceive' && !isToday && { color: '#27AE60', fontWeight: '700' },
                    ]}>
                      {day}
                    </Text>
                  </View>

                  {/* Mini Dot Indicators */}
                  <View style={styles.dotRow}>
                    {isPeriod && (
                      <View style={[styles.miniDot, { backgroundColor: '#E74C3C' }]} />
                    )}
                    {isOvulation && (
                      <View style={[styles.miniDot, { backgroundColor: '#F39C12' }]} />
                    )}
                    {isFertile && journey === 'conceive' && (
                      <View style={[styles.miniDot, { backgroundColor: '#27AE60' }]} />
                    )}
                    {hasSymptoms && (
                      <View style={[styles.miniDot, { backgroundColor: journeyColor }]} />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Clean Legend */}
          <View style={styles.legend}>
            {[
              { color: '#E74C3C', label: 'Period' },
              { color: '#F39C12', label: 'Ovulation' },
              { color: '#27AE60', label: 'Fertile' },
              { color: journeyColor, label: 'Today' },
            ].map(item => (
              <View key={item.label} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                <Text style={styles.legendText}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Journey Tips */}
        <Text style={styles.sectionTitle}>
          {journey === 'conceive' ? '🌱 TTC Tips' :
           journey === 'pregnant' ? '🤰 Pregnancy Tips' :
           journey === 'surrogacy' ? '👶 Surrogacy Support' :
           '💜 Cycle Tips'}
        </Text>

        {tips.map((tip, i) => (
          <View key={i} style={[styles.tipCard, { borderLeftColor: journeyColor }]}>
            <Text style={styles.tipEmoji}>{tip.emoji}</Text>
            <Text style={styles.tipText}>{tip.tip}</Text>
          </View>
        ))}

        {/* Cycle Stats */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>📊 Your Cycle Stats</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: journeyColor }]}>{cycleLength}</Text>
              <Text style={styles.statLabel}>Cycle length</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: journeyColor }]}>{periodLength}</Text>
              <Text style={styles.statLabel}>Period days</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: journeyColor }]}>{ovulationDay}</Text>
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
                    {periodDays.includes(selectedDay)
                      ? '🔴 Period day (tap to remove)'
                      : '➕ Mark as period day'}
                  </Text>
                </TouchableOpacity>

                <Text style={styles.symptomsTitle}>Log symptoms:</Text>
                <View style={styles.symptomsGrid}>
                  {PERIOD_SYMPTOMS.map(symptom => {
                    const isSelected = selectedSymptoms[selectedDay]?.includes(symptom);
                    return (
                      <TouchableOpacity
                        key={symptom}
                        style={[
                          styles.symptomChip,
                          isSelected && { backgroundColor: COLORS.primaryLight, borderColor: journeyColor },
                        ]}
                        onPress={() => toggleSymptom(selectedDay, symptom)}
                      >
                        <Text style={[
                          styles.symptomChipText,
                          isSelected && { color: journeyColor, fontWeight: '700' },
                        ]}>
                          {symptom}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </>
            )}
            <TouchableOpacity
              style={[styles.closeBtn, { backgroundColor: journeyColor }]}
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
    borderBottomWidth: 2, gap: 12,
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
    borderLeftWidth: 4, marginBottom: 12, gap: 12,
  },
  phaseEmoji: { fontSize: 32 },
  phaseInfo: { flex: 1 },
  phaseLabel: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  phaseDesc: { fontSize: 13, color: COLORS.textLight, lineHeight: 20 },
  fertileWindow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F0FFF4', borderRadius: 16,
    padding: 14, marginBottom: 12, gap: 12,
    borderWidth: 1, borderColor: '#27AE60',
  },
  fertileWindowEmoji: { fontSize: 28 },
  fertileWindowInfo: { flex: 1 },
  fertileWindowTitle: { fontSize: 15, fontWeight: '800', color: '#27AE60', marginBottom: 2 },
  fertileWindowText: { fontSize: 13, color: COLORS.textLight },
  calendarCard: {
    backgroundColor: COLORS.white, borderRadius: 24,
    padding: 20, marginBottom: 20,
    shadowColor: '#000', shadowOpacity: 0.06,
    shadowRadius: 16, elevation: 4,
  },
  monthNav: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 20,
  },
  navBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: COLORS.background,
    alignItems: 'center', justifyContent: 'center',
  },
  navArrow: { fontSize: 24, color: COLORS.primary, fontWeight: '700' },
  monthTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  dayHeaders: {
    flexDirection: 'row', marginBottom: 8,
  },
  dayHeader: {
    flex: 1, textAlign: 'center',
    fontSize: 12, fontWeight: '700',
    color: COLORS.textLight,
  },
  calendarGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
  },
  calendarCell: {
    width: '14.28%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  dayCircle: {
    width: 36, height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarDayText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  dotRow: {
    flexDirection: 'row',
    gap: 2,
    height: 6,
    alignItems: 'center',
    marginTop: 1,
  },
  miniDot: {
    width: 4, height: 4,
    borderRadius: 2,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16, paddingTop: 16,
    borderTopWidth: 1, borderTopColor: COLORS.border,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12, color: COLORS.textLight, fontWeight: '500' },
  sectionTitle: {
    fontSize: 17, fontWeight: '800',
    color: COLORS.text, marginBottom: 12, marginTop: 4,
  },
  tipCard: {
    flexDirection: 'row', alignItems: 'flex-start',
    backgroundColor: COLORS.white, borderRadius: 16,
    padding: 14, marginBottom: 10, gap: 12,
    borderLeftWidth: 4,
  },
  tipEmoji: { fontSize: 22 },
  tipText: { fontSize: 14, color: COLORS.text, lineHeight: 21, flex: 1 },
  statsCard: {
    backgroundColor: COLORS.white, borderRadius: 20,
    padding: 20, marginTop: 8,
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 10, elevation: 2,
  },
  statsTitle: { fontSize: 16, fontWeight: '800', color: COLORS.text, marginBottom: 16 },
  statsRow: { flexDirection: 'row', alignItems: 'center' },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 28, fontWeight: '800' },
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
  periodToggleActive: { backgroundColor: '#FFE0E0', borderColor: '#E74C3C' },
  periodToggleText: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  symptomsTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  symptomsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  symptomChip: {
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 50, backgroundColor: COLORS.background,
    borderWidth: 1.5, borderColor: COLORS.border,
  },
  symptomChipText: { fontSize: 13, color: COLORS.textLight, fontWeight: '600' },
  closeBtn: {
    borderRadius: 50, paddingVertical: 14, alignItems: 'center',
  },
  closeBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
