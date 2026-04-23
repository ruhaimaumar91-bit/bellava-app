import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar, Modal,
} from 'react-native';
import COLORS from './colors';

const MOODS = [
  { id: 'great', emoji: '😄', label: 'Great', color: '#27AE60' },
  { id: 'good', emoji: '🙂', label: 'Good', color: '#4AC455' },
  { id: 'okay', emoji: '😐', label: 'Okay', color: '#F39C12' },
  { id: 'low', emoji: '😔', label: 'Low', color: '#E67E22' },
  { id: 'bad', emoji: '😢', label: 'Bad', color: '#E74C3C' },
];

const ENERGY_LEVELS = [
  { id: 'high', emoji: '⚡', label: 'High', color: '#F39C12' },
  { id: 'medium', emoji: '🔋', label: 'Medium', color: '#27AE60' },
  { id: 'low', emoji: '🪫', label: 'Low', color: '#E74C3C' },
];

const SLEEP_HOURS = ['4', '5', '6', '7', '8', '9', '10+'];

const SYMPTOMS = [
  { emoji: '😣', label: 'Cramps' },
  { emoji: '😤', label: 'Bloating' },
  { emoji: '🤕', label: 'Headache' },
  { emoji: '😴', label: 'Fatigue' },
  { emoji: '🤢', label: 'Nausea' },
  { emoji: '😰', label: 'Anxiety' },
  { emoji: '😠', label: 'Irritable' },
  { emoji: '🥵', label: 'Hot flushes' },
  { emoji: '💧', label: 'Spotting' },
  { emoji: '🦴', label: 'Back pain' },
  { emoji: '🫁', label: 'Bloated' },
  { emoji: '💤', label: 'Insomnia' },
];

const WATER_GOALS = [1, 2, 3, 4, 5, 6, 7, 8];

const FLOW_LEVELS = [
  { id: 'none', label: 'None', emoji: '⬜' },
  { id: 'spotting', label: 'Spotting', emoji: '🟡' },
  { id: 'light', label: 'Light', emoji: '🟠' },
  { id: 'medium', label: 'Medium', emoji: '🔴' },
  { id: 'heavy', label: 'Heavy', emoji: '🟥' },
];

export default function TrackerScreen({ onBack, userPlan }) {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long',
  });

  const [mood, setMood] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [sleep, setSleep] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [water, setWater] = useState(0);
  const [flow, setFlow] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleSymptom = (label) => {
    setSymptoms(prev =>
      prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]
    );
  };

  const getProgress = () => {
    let total = 0;
    if (mood) total += 20;
    if (energy) total += 20;
    if (sleep) total += 20;
    if (symptoms.length > 0 || flow) total += 20;
    if (water > 0) total += 20;
    return total;
  };

  const handleSave = () => {
    if (!mood) return;
    setShowSuccess(true);
  };

  const progress = getProgress();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Daily Tracker</Text>
          <Text style={styles.headerSub}>{dateStr}</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{progress}% logged</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* Mood */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>😊 How are you feeling?</Text>
          <View style={styles.moodRow}>
            {MOODS.map(m => (
              <TouchableOpacity
                key={m.id}
                style={[
                  styles.moodBtn,
                  mood === m.id && { backgroundColor: m.color, borderColor: m.color },
                ]}
                onPress={() => setMood(m.id)}
              >
                <Text style={styles.moodEmoji}>{m.emoji}</Text>
                <Text style={[
                  styles.moodLabel,
                  mood === m.id && { color: '#fff' },
                ]}>
                  {m.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Energy */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>⚡ Energy level</Text>
          <View style={styles.energyRow}>
            {ENERGY_LEVELS.map(e => (
              <TouchableOpacity
                key={e.id}
                style={[
                  styles.energyBtn,
                  energy === e.id && { backgroundColor: e.color, borderColor: e.color },
                ]}
                onPress={() => setEnergy(e.id)}
              >
                <Text style={styles.energyEmoji}>{e.emoji}</Text>
                <Text style={[
                  styles.energyLabel,
                  energy === e.id && { color: '#fff' },
                ]}>
                  {e.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sleep */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>😴 Hours of sleep</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.sleepRow}>
              {SLEEP_HOURS.map(h => (
                <TouchableOpacity
                  key={h}
                  style={[
                    styles.sleepBtn,
                    sleep === h && styles.sleepBtnActive,
                  ]}
                  onPress={() => setSleep(h)}
                >
                  <Text style={[
                    styles.sleepText,
                    sleep === h && styles.sleepTextActive,
                  ]}>
                    {h}h
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Flow */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>💧 Period flow</Text>
          <View style={styles.flowRow}>
            {FLOW_LEVELS.map(f => (
              <TouchableOpacity
                key={f.id}
                style={[
                  styles.flowBtn,
                  flow === f.id && styles.flowBtnActive,
                ]}
                onPress={() => setFlow(f.id)}
              >
                <Text style={styles.flowEmoji}>{f.emoji}</Text>
                <Text style={[
                  styles.flowLabel,
                  flow === f.id && { color: COLORS.primary, fontWeight: '700' },
                ]}>
                  {f.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Symptoms */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔍 Symptoms today</Text>
          <View style={styles.symptomsGrid}>
            {SYMPTOMS.map(s => (
              <TouchableOpacity
                key={s.label}
                style={[
                  styles.symptomChip,
                  symptoms.includes(s.label) && styles.symptomChipActive,
                ]}
                onPress={() => toggleSymptom(s.label)}
              >
                <Text style={styles.symptomEmoji}>{s.emoji}</Text>
                <Text style={[
                  styles.symptomLabel,
                  symptoms.includes(s.label) && { color: COLORS.primary },
                ]}>
                  {s.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Water */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>💧 Water intake (glasses)</Text>
          <View style={styles.waterRow}>
            {WATER_GOALS.map(w => (
              <TouchableOpacity
                key={w}
                style={[
                  styles.waterBtn,
                  water >= w && styles.waterBtnActive,
                ]}
                onPress={() => setWater(w)}
              >
                <Text style={styles.waterEmoji}>💧</Text>
                <Text style={[
                  styles.waterLabel,
                  water >= w && { color: '#2196F3', fontWeight: '700' },
                ]}>
                  {w}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.waterNote}>
            {water === 0 ? 'Tap to log glasses of water' : `${water} glass${water > 1 ? 'es' : ''} logged 💜`}
          </Text>
        </View>

        {/* Save button */}
        <TouchableOpacity
          style={[styles.saveBtn, !mood && styles.saveBtnDisabled]}
          onPress={handleSave}
          disabled={!mood}
        >
          <Text style={styles.saveBtnText}>
            {mood ? 'Save Today\'s Log 💜' : 'Select your mood to save'}
          </Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Success Modal */}
      <Modal visible={showSuccess} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEmoji}>🎉</Text>
            <Text style={styles.modalTitle}>Logged!</Text>
            <Text style={styles.modalText}>
              Your daily check-in has been saved. Keep tracking to understand your cycle better. 💜
            </Text>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => {
                setShowSuccess(false);
                onBack();
              }}
            >
              <Text style={styles.modalBtnText}>Back to Home</Text>
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
  progressContainer: {
    paddingHorizontal: 20, paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
    flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  progressBar: {
    flex: 1, height: 8, backgroundColor: COLORS.border,
    borderRadius: 4, overflow: 'hidden',
  },
  progressFill: {
    height: '100%', backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressText: { fontSize: 12, fontWeight: '700', color: COLORS.primary, width: 70 },
  content: { flex: 1, padding: 16 },
  card: {
    backgroundColor: COLORS.white, borderRadius: 20,
    padding: 18, marginBottom: 14,
    shadowColor: '#000', shadowOpacity: 0.04,
    shadowRadius: 8, elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: '800', color: COLORS.text, marginBottom: 14 },
  moodRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 6 },
  moodBtn: {
    flex: 1, alignItems: 'center', paddingVertical: 10,
    borderRadius: 14, backgroundColor: COLORS.background,
    borderWidth: 1.5, borderColor: COLORS.border,
  },
  moodEmoji: { fontSize: 24, marginBottom: 4 },
  moodLabel: { fontSize: 11, fontWeight: '600', color: COLORS.textLight },
  energyRow: { flexDirection: 'row', gap: 10 },
  energyBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 8,
    paddingVertical: 14, borderRadius: 14,
    backgroundColor: COLORS.background,
    borderWidth: 1.5, borderColor: COLORS.border,
  },
  energyEmoji: { fontSize: 22 },
  energyLabel: { fontSize: 14, fontWeight: '700', color: COLORS.textLight },
  sleepRow: { flexDirection: 'row', gap: 8 },
  sleepBtn: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: COLORS.background,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: COLORS.border,
  },
  sleepBtnActive: {
    backgroundColor: COLORS.primary, borderColor: COLORS.primary,
  },
  sleepText: { fontSize: 13, fontWeight: '700', color: COLORS.textLight },
  sleepTextActive: { color: '#fff' },
  flowRow: { flexDirection: 'row', justifyContent: 'space-between' },
  flowBtn: {
    flex: 1, alignItems: 'center', paddingVertical: 10,
    borderRadius: 12, backgroundColor: COLORS.background,
    borderWidth: 1, borderColor: COLORS.border, marginHorizontal: 3,
  },
  flowBtnActive: {
    backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary,
  },
  flowEmoji: { fontSize: 20, marginBottom: 4 },
  flowLabel: { fontSize: 10, color: COLORS.textLight, fontWeight: '600' },
  symptomsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  symptomChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: 50, backgroundColor: COLORS.background,
    borderWidth: 1.5, borderColor: COLORS.border,
  },
  symptomChipActive: {
    backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary,
  },
  symptomEmoji: { fontSize: 16 },
  symptomLabel: { fontSize: 13, color: COLORS.textLight, fontWeight: '600' },
  waterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  waterBtn: {
    alignItems: 'center', paddingHorizontal: 10, paddingVertical: 8,
    borderRadius: 12, backgroundColor: COLORS.background,
    borderWidth: 1.5, borderColor: COLORS.border,
  },
  waterBtnActive: {
    backgroundColor: '#E3F2FD', borderColor: '#2196F3',
  },
  waterEmoji: { fontSize: 18 },
  waterLabel: { fontSize: 12, color: COLORS.textLight, fontWeight: '600' },
  waterNote: { fontSize: 13, color: COLORS.textLight, marginTop: 4 },
  saveBtn: {
    backgroundColor: COLORS.primary, borderRadius: 50,
    paddingVertical: 18, alignItems: 'center',
    marginBottom: 8,
    shadowColor: COLORS.primary, shadowOpacity: 0.3,
    shadowRadius: 10, elevation: 3,
  },
  saveBtnDisabled: { backgroundColor: COLORS.border, shadowOpacity: 0 },
  saveBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center', justifyContent: 'center',
  },
  modalCard: {
    backgroundColor: COLORS.white, borderRadius: 28,
    padding: 32, alignItems: 'center', margin: 32,
    shadowColor: '#000', shadowOpacity: 0.15,
    shadowRadius: 20, elevation: 8,
  },
  modalEmoji: { fontSize: 52, marginBottom: 12 },
  modalTitle: { fontSize: 24, fontWeight: '800', color: COLORS.text, marginBottom: 10 },
  modalText: {
    fontSize: 15, color: COLORS.textLight,
    textAlign: 'center', lineHeight: 22, marginBottom: 24,
  },
  modalBtn: {
    backgroundColor: COLORS.primary, borderRadius: 50,
    paddingVertical: 14, paddingHorizontal: 40,
  },
  modalBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
