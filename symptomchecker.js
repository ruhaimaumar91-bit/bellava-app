import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar, Modal,
} from 'react-native';
import COLORS from './colors';

const SYMPTOM_CATEGORIES = [
  {
    id: 'pain',
    emoji: '😣',
    label: 'Pain',
    color: '#FF6B6B',
    bg: '#FFF0F0',
    symptoms: [
      'Period cramps', 'Lower back pain', 'Pelvic pain', 'Breast tenderness',
      'Headache / migraine', 'Joint pain', 'Abdominal pain', 'Ovulation pain',
    ],
  },
  {
    id: 'mood',
    emoji: '🧠',
    label: 'Mood',
    color: '#9B59B6',
    bg: '#F5EEFF',
    symptoms: [
      'Anxiety', 'Low mood / depression', 'Irritability', 'Mood swings',
      'Feeling overwhelmed', 'Lack of motivation', 'Brain fog', 'Emotional sensitivity',
    ],
  },
  {
    id: 'body',
    emoji: '🌡️',
    label: 'Body',
    color: '#E67E22',
    bg: '#FFF5E6',
    symptoms: [
      'Bloating', 'Fatigue', 'Nausea', 'Dizziness', 'Spotting',
      'Hot flushes', 'Chills / cold', 'Night sweats', 'Weight changes',
    ],
  },
  {
    id: 'skin',
    emoji: '✨',
    label: 'Skin & Hair',
    color: '#E91E8C',
    bg: '#FFF0F8',
    symptoms: [
      'Acne / breakouts', 'Oily skin', 'Dry skin', 'Hair loss / thinning',
      'Increased body hair', 'Skin sensitivity', 'Nail changes',
    ],
  },
  {
    id: 'energy',
    emoji: '⚡',
    label: 'Energy & Sleep',
    color: '#F1C40F',
    bg: '#FFFDE6',
    symptoms: [
      'Insomnia', 'Oversleeping', 'Low energy', 'High energy',
      'Restless sleep', 'Vivid dreams', 'Afternoon slump',
    ],
  },
  {
    id: 'digestion',
    emoji: '🫁',
    label: 'Digestion',
    color: '#27AE60',
    bg: '#F0FFF4',
    symptoms: [
      'Constipation', 'Diarrhoea', 'Bloating', 'Food cravings',
      'Loss of appetite', 'Increased appetite', 'Nausea after eating',
    ],
  },
];

const INTENSITY_LEVELS = [
  { value: 1, label: 'Mild', emoji: '😐', color: '#27AE60' },
  { value: 2, label: 'Moderate', emoji: '😟', color: '#F39C12' },
  { value: 3, label: 'Severe', emoji: '😣', color: '#E74C3C' },
];

export default function SymptomCheckerScreen({ onBack }) {
  const [activeCategory, setActiveCategory] = useState('pain');
  const [selectedSymptoms, setSelectedSymptoms] = useState({});
  const [showResults, setShowResults] = useState(false);

  const currentCategory = SYMPTOM_CATEGORIES.find(c => c.id === activeCategory);
  const totalSelected = Object.keys(selectedSymptoms).length;

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev => {
      const existing = prev[symptom];
      if (existing) {
        const updated = { ...prev };
        delete updated[symptom];
        return updated;
      }
      return { ...prev, [symptom]: 1 };
    });
  };

  const setIntensity = (symptom, value) => {
    setSelectedSymptoms(prev => ({ ...prev, [symptom]: value }));
  };

  const getAdvice = () => {
    const symptoms = Object.keys(selectedSymptoms);
    const hasPain = symptoms.some(s =>
      ['Period cramps', 'Pelvic pain', 'Lower back pain', 'Abdominal pain'].includes(s)
    );
    const hasMood = symptoms.some(s =>
      ['Anxiety', 'Low mood / depression', 'Mood swings', 'Irritability'].includes(s)
    );
    const hasSevere = Object.values(selectedSymptoms).some(v => v === 3);
    let advice = [];
    if (hasSevere) {
      advice.push({
        emoji: '⚠️',
        title: 'Consider seeing a doctor',
        text: 'You have marked some symptoms as severe. It is always worth speaking to a healthcare professional if symptoms are affecting your daily life.',
        color: '#E74C3C',
      });
    }
    if (hasPain) {
      advice.push({
        emoji: '🌡️',
        title: 'Managing pain',
        text: 'A hot water bottle, gentle movement, and anti-inflammatory pain relief (like ibuprofen) can help. If pain is severe or unusual, speak to your GP.',
        color: '#FF6B6B',
      });
    }
    if (hasMood) {
      advice.push({
        emoji: '🧠',
        title: 'Supporting your mood',
        text: 'Mood changes are common before your period. Gentle exercise, sunlight, and talking to someone you trust can all help. If low mood persists, speak to your GP.',
        color: '#9B59B6',
      });
    }
    advice.push({
      emoji: '💜',
      title: 'Track your patterns',
      text: 'The more you track, the better Bellava can help you understand your cycle. Try logging symptoms for 2-3 months to spot patterns.',
      color: COLORS.primary,
    });
    return advice;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Symptom Checker</Text>
          <Text style={styles.headerSub}>Track how you feel today</Text>
        </View>
        {totalSelected > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{totalSelected}</Text>
          </View>
        )}
      </View>

      {/* Category Tabs */}
      <ScrollView
        horizontal showsHorizontalScrollIndicator={false}
        style={styles.tabs}
        contentContainerStyle={styles.tabsContent}
      >
        {SYMPTOM_CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.tab, activeCategory === cat.id && { backgroundColor: cat.color }]}
            onPress={() => setActiveCategory(cat.id)}
          >
            <Text style={styles.tabEmoji}>{cat.emoji}</Text>
            <Text style={[styles.tabLabel, activeCategory === cat.id && { color: '#fff' }]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Symptoms List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>
          {currentCategory.emoji} {currentCategory.label} Symptoms
        </Text>

        {currentCategory.symptoms.map(symptom => {
          const isSelected = !!selectedSymptoms[symptom];
          const intensity = selectedSymptoms[symptom];
          return (
            <View
              key={symptom}
              style={[
                styles.symptomCard,
                isSelected && { borderColor: currentCategory.color, borderWidth: 2 },
              ]}
            >
              <TouchableOpacity
                style={styles.symptomRow}
                onPress={() => toggleSymptom(symptom)}
              >
                <View style={[
                  styles.checkbox,
                  isSelected && { backgroundColor: currentCategory.color, borderColor: currentCategory.color },
                ]}>
                  {isSelected && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={[
                  styles.symptomLabel,
                  isSelected && { color: currentCategory.color, fontWeight: '700' },
                ]}>
                  {symptom}
                </Text>
              </TouchableOpacity>

              {isSelected && (
                <View style={styles.intensityRow}>
                  <Text style={styles.intensityTitle}>How severe?</Text>
                  <View style={styles.intensityBtns}>
                    {INTENSITY_LEVELS.map(level => (
                      <TouchableOpacity
                        key={level.value}
                        style={[
                          styles.intensityBtn,
                          intensity === level.value && { backgroundColor: level.color },
                        ]}
                        onPress={() => setIntensity(symptom, level.value)}
                      >
                        <Text style={styles.intensityEmoji}>{level.emoji}</Text>
                        <Text style={[
                          styles.intensityLabel,
                          intensity === level.value && { color: '#fff' },
                        ]}>
                          {level.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </View>
          );
        })}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Button */}
      {totalSelected > 0 && (
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.resultsBtn} onPress={() => setShowResults(true)}>
            <Text style={styles.resultsBtnText}>
              View Advice ({totalSelected} symptom{totalSelected !== 1 ? 's' : ''}) 💜
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Results Modal */}
      <Modal visible={showResults} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Your Symptom Summary 💜</Text>
              <View style={styles.selectedList}>
                <Text style={styles.selectedHeader}>Symptoms logged today:</Text>
                {Object.entries(selectedSymptoms).map(([symptom, intensity]) => {
                  const level = INTENSITY_LEVELS.find(l => l.value === intensity);
                  return (
                    <View key={symptom} style={styles.selectedItem}>
                      <Text style={styles.selectedSymptom}>• {symptom}</Text>
                      <Text style={[styles.selectedIntensity, { color: level.color }]}>
                        {level.emoji} {level.label}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <Text style={styles.adviceHeader}>💡 Personalised Advice</Text>
              {getAdvice().map((advice, i) => (
                <View key={i} style={[styles.adviceCard, { borderLeftColor: advice.color }]}>
                  <Text style={styles.adviceTitle}>{advice.emoji} {advice.title}</Text>
                  <Text style={styles.adviceText}>{advice.text}</Text>
                </View>
              ))}
              <Text style={styles.disclaimer}>
                ⚠️ This is general health information only. Bellava is not a substitute for medical advice. Always consult a qualified healthcare professional for diagnosis and treatment.
              </Text>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setShowResults(false)}>
                <Text style={styles.closeBtnText}>Close</Text>
              </TouchableOpacity>
              <View style={{ height: 40 }} />
            </ScrollView>
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
  badge: {
    marginLeft: 'auto', backgroundColor: COLORS.primary,
    width: 32, height: 32, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  badgeText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  tabs: { maxHeight: 70, backgroundColor: COLORS.white },
  tabsContent: { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  tab: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 50,
    backgroundColor: COLORS.background,
  },
  tabEmoji: { fontSize: 16 },
  tabLabel: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  content: { flex: 1, padding: 16 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: COLORS.text, marginBottom: 14 },
  symptomCard: {
    backgroundColor: COLORS.white, borderRadius: 16,
    padding: 16, marginBottom: 10,
    borderWidth: 1.5, borderColor: COLORS.border,
  },
  symptomRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  checkbox: {
    width: 24, height: 24, borderRadius: 6,
    borderWidth: 2, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
  },
  checkmark: { color: '#fff', fontWeight: '700', fontSize: 14 },
  symptomLabel: { fontSize: 15, color: COLORS.text, flex: 1 },
  intensityRow: {
    marginTop: 12, paddingTop: 12,
    borderTopWidth: 1, borderTopColor: COLORS.border,
  },
  intensityTitle: { fontSize: 13, color: COLORS.textLight, marginBottom: 8 },
  intensityBtns: { flexDirection: 'row', gap: 8 },
  intensityBtn: {
    flex: 1, alignItems: 'center', paddingVertical: 8,
    borderRadius: 12, backgroundColor: COLORS.background,
  },
  intensityEmoji: { fontSize: 18 },
  intensityLabel: { fontSize: 12, fontWeight: '600', color: COLORS.text, marginTop: 2 },
  bottomBar: {
    padding: 16, backgroundColor: COLORS.white,
    borderTopWidth: 1, borderTopColor: COLORS.border,
  },
  resultsBtn: {
    backgroundColor: COLORS.primary, borderRadius: 50,
    paddingVertical: 16, alignItems: 'center',
  },
  resultsBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: COLORS.white, borderTopLeftRadius: 28,
    borderTopRightRadius: 28, padding: 24, maxHeight: '90%',
  },
  modalHandle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: COLORS.border, alignSelf: 'center', marginBottom: 20,
  },
  modalTitle: { fontSize: 22, fontWeight: '800', color: COLORS.text, marginBottom: 16 },
  selectedList: {
    backgroundColor: COLORS.background, borderRadius: 16,
    padding: 16, marginBottom: 20,
  },
  selectedHeader: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginBottom: 10 },
  selectedItem: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 6,
  },
  selectedSymptom: { fontSize: 14, color: COLORS.text, flex: 1 },
  selectedIntensity: { fontSize: 13, fontWeight: '600' },
  adviceHeader: { fontSize: 17, fontWeight: '800', color: COLORS.text, marginBottom: 12 },
  adviceCard: {
    backgroundColor: COLORS.white, borderRadius: 16,
    padding: 16, marginBottom: 12, borderLeftWidth: 4,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  adviceTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginBottom: 6 },
  adviceText: { fontSize: 14, color: COLORS.textLight, lineHeight: 21 },
  disclaimer: {
    fontSize: 12, color: COLORS.textLight, lineHeight: 18,
    backgroundColor: '#FFF8E6', borderRadius: 12,
    padding: 14, marginTop: 8, marginBottom: 16,
  },
  closeBtn: {
    borderWidth: 2, borderColor: COLORS.primary, borderRadius: 50,
    paddingVertical: 14, alignItems: 'center',
  },
  closeBtnText: { color: COLORS.primary, fontWeight: '700', fontSize: 16 },
});
