import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Switch, TextInput, Alert,
  SafeAreaView, StatusBar
} from 'react-native';
import COLORS from './colors';

const MOODS = [
  { value: 1, emoji: '😢', label: 'Awful' },
  { value: 2, emoji: '😕', label: 'Low' },
  { value: 3, emoji: '😐', label: 'Okay' },
  { value: 4, emoji: '🙂', label: 'Good' },
  { value: 5, emoji: '😄', label: 'Great' },
];

const ENERGY_LEVELS = [
  { value: 1, emoji: '🪫', label: 'Drained' },
  { value: 2, emoji: '😴', label: 'Tired' },
  { value: 3, emoji: '😌', label: 'Okay' },
  { value: 4, emoji: '⚡', label: 'Energised' },
  { value: 5, emoji: '🚀', label: 'Supercharged' },
];

const SLEEP_LEVELS = [
  { value: 1, emoji: '😩', label: 'Terrible' },
  { value: 2, emoji: '😪', label: 'Poor' },
  { value: 3, emoji: '😐', label: 'Fair' },
  { value: 4, emoji: '😴', label: 'Good' },
  { value: 5, emoji: '✨', label: 'Amazing' },
];

const COMMON_SYMPTOMS = [
  'Cramps', 'Bloating', 'Headache', 'Fatigue',
  'Breast tenderness', 'Mood swings', 'Nausea',
  'Back pain', 'Spotting', 'Hot flashes',
];

export default function DailyCheckInScreen({ onBack, userName }) {
  const [checkInType, setCheckInType] = useState('morning');
  const [mood, setMood] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [sleepQuality, setSleepQuality] = useState(null);
  const [waterIntake, setWaterIntake] = useState(0);
  const [symptoms, setSymptoms] = useState([]);
  const [medicationTaken, setMedicationTaken] = useState(false);
  const [medicationNotes, setMedicationNotes] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const currentHour = new Date().getHours();
  const firstName = userName ? userName.split(' ')[0] : 'Beautiful';

  useEffect(() => {
    if (currentHour >= 12) {
      setCheckInType('evening');
    } else {
      setCheckInType('morning');
    }
  }, []);

  const toggleSymptom = (symptom) => {
    setSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const addWater = () => setWaterIntake(prev => Math.min(prev + 1, 12));
  const removeWater = () => setWaterIntake(prev => Math.max(prev - 1, 0));

  const saveCheckIn = () => {
    if (!mood) {
      Alert.alert('Almost there!', 'Please select your mood before saving. 💜');
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      Alert.alert(
        '🌸 Check-in saved!',
        'Well done for taking care of yourself today, ' + firstName + '. 💜',
        [{ text: 'Done', onPress: onBack }]
      );
    }, 1000);
  };

  if (saved) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.doneBox}>
          <Text style={styles.doneEmoji}>✅</Text>
          <Text style={styles.doneTitle}>Check-in complete!</Text>
          <Text style={styles.doneText}>
            Well done {firstName}! You have completed your {checkInType} check-in.
            Come back {checkInType === 'morning' ? 'this evening' : 'tomorrow morning'}!
          </Text>
          <TouchableOpacity style={styles.doneBtn} onPress={onBack}>
            <Text style={styles.doneBtnText}>Back to Home 💜</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>
              {checkInType === 'morning' ? '🌅 Morning' : '🌙 Evening'} Check-In
            </Text>
            <Text style={styles.headerSub}>
              {new Date().toLocaleDateString('en-GB', {
                weekday: 'long', day: 'numeric', month: 'long',
              })}
            </Text>
          </View>
        </View>

        <View style={styles.content}>

          {/* Toggle */}
          <View style={styles.typeToggle}>
            <TouchableOpacity
              style={[styles.typeBtn, checkInType === 'morning' && styles.typeBtnActive]}
              onPress={() => setCheckInType('morning')}
            >
              <Text style={[styles.typeBtnText, checkInType === 'morning' && styles.typeBtnTextActive]}>
                🌅 Morning
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.typeBtn, checkInType === 'evening' && styles.typeBtnActive]}
              onPress={() => setCheckInType('evening')}
            >
              <Text style={[styles.typeBtnText, checkInType === 'evening' && styles.typeBtnTextActive]}>
                🌙 Evening
              </Text>
            </TouchableOpacity>
          </View>

          {/* Mood */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How are you feeling? *</Text>
            <View style={styles.emojiRow}>
              {MOODS.map(item => (
                <TouchableOpacity
                  key={item.value}
                  style={[styles.emojiBtn, mood === item.value && styles.emojiBtnSelected]}
                  onPress={() => setMood(item.value)}
                >
                  <Text style={styles.emojiIcon}>{item.emoji}</Text>
                  <Text style={[styles.emojiLabel, mood === item.value && styles.emojiLabelSelected]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Energy */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⚡ Energy level</Text>
            <View style={styles.emojiRow}>
              {ENERGY_LEVELS.map(item => (
                <TouchableOpacity
                  key={item.value}
                  style={[styles.emojiBtn, energy === item.value && styles.emojiBtnSelected]}
                  onPress={() => setEnergy(item.value)}
                >
                  <Text style={styles.emojiIcon}>{item.emoji}</Text>
                  <Text style={[styles.emojiLabel, energy === item.value && styles.emojiLabelSelected]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Sleep — morning only */}
          {checkInType === 'morning' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>😴 How did you sleep?</Text>
              <View style={styles.emojiRow}>
                {SLEEP_LEVELS.map(item => (
                  <TouchableOpacity
                    key={item.value}
                    style={[styles.emojiBtn, sleepQuality === item.value && styles.emojiBtnSelected]}
                    onPress={() => setSleepQuality(item.value)}
                  >
                    <Text style={styles.emojiIcon}>{item.emoji}</Text>
                    <Text style={[styles.emojiLabel, sleepQuality === item.value && styles.emojiLabelSelected]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Water */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💧 Water intake (glasses)</Text>
            <View style={styles.waterRow}>
              <TouchableOpacity style={styles.waterBtn} onPress={removeWater}>
                <Text style={styles.waterBtnText}>−</Text>
              </TouchableOpacity>
              <View style={styles.waterCountBox}>
                <Text style={styles.waterCount}>{waterIntake}</Text>
                <Text style={styles.waterLabel}>glasses</Text>
              </View>
              <TouchableOpacity style={styles.waterBtn} onPress={addWater}>
                <Text style={styles.waterBtnText}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.waterVisual}>
              {Array.from({ length: 8 }).map((_, i) => (
                <Text key={i} style={{ fontSize: 20, opacity: i < waterIntake ? 1 : 0.2 }}>
                  💧
                </Text>
              ))}
            </View>
          </View>

          {/* Symptoms */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🔍 Any symptoms today?</Text>
            <View style={styles.symptomsGrid}>
              {COMMON_SYMPTOMS.map(symptom => (
                <TouchableOpacity
                  key={symptom}
                  style={[styles.symptomChip, symptoms.includes(symptom) && styles.symptomChipSelected]}
                  onPress={() => toggleSymptom(symptom)}
                >
                  <Text style={[styles.symptomText, symptoms.includes(symptom) && styles.symptomTextSelected]}>
                    {symptom}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Medication */}
          <View style={styles.section}>
            <View style={styles.medicationRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>💊 Medication taken?</Text>
                <Text style={styles.sectionSub}>Any pills, supplements or vitamins</Text>
              </View>
              <Switch
                value={medicationTaken}
                onValueChange={setMedicationTaken}
                trackColor={{ false: COLORS.border, true: COLORS.primaryLight }}
                thumbColor={medicationTaken ? COLORS.primary : '#f4f3f4'}
              />
            </View>
            {medicationTaken && (
              <TextInput
                style={styles.textInput}
                placeholder="Which medication? (optional)"
                placeholderTextColor={COLORS.textLight}
                value={medicationNotes}
                onChangeText={setMedicationNotes}
              />
            )}
          </View>

          {/* Notes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📝 Any notes?</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="How are you really feeling today?"
              placeholderTextColor={COLORS.textLight}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Save */}
          <TouchableOpacity
            style={[styles.saveBtn2, saving && styles.saveBtnDisabled]}
            onPress={saveCheckIn}
            disabled={saving}
          >
            <Text style={styles.saveBtnText2}>
              {saving ? 'Saving...' : '🌸 Save Check-In'}
            </Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 16, gap: 12,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  backArrow: { fontSize: 20, color: '#fff' },
  headerText: { flex: 1 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#fff' },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  content: { padding: 16 },
  typeToggle: {
    flexDirection: 'row', backgroundColor: COLORS.white,
    borderRadius: 16, padding: 4, marginBottom: 16,
    shadowColor: '#000', shadowOpacity: 0.06,
    shadowRadius: 8, elevation: 2,
  },
  typeBtn: { flex: 1, padding: 12, borderRadius: 12, alignItems: 'center' },
  typeBtnActive: { backgroundColor: COLORS.primary },
  typeBtnText: { fontSize: 14, color: COLORS.primary, fontWeight: '600' },
  typeBtnTextActive: { color: '#fff' },
  section: {
    backgroundColor: COLORS.white, borderRadius: 20,
    padding: 16, marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.04,
    shadowRadius: 8, elevation: 2,
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  sectionSub: { fontSize: 12, color: COLORS.textLight, marginTop: -8, marginBottom: 8 },
  emojiRow: { flexDirection: 'row', justifyContent: 'space-between' },
  emojiBtn: {
    alignItems: 'center', padding: 8, borderRadius: 14,
    borderWidth: 2, borderColor: 'transparent', width: '18%',
  },
  emojiBtnSelected: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight },
  emojiIcon: { fontSize: 26 },
  emojiLabel: { fontSize: 10, color: COLORS.textLight, marginTop: 4, textAlign: 'center' },
  emojiLabelSelected: { color: COLORS.primary, fontWeight: '700' },
  waterRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', marginBottom: 12,
  },
  waterBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center', justifyContent: 'center',
  },
  waterBtnText: { fontSize: 24, color: COLORS.primary, fontWeight: 'bold' },
  waterCountBox: { alignItems: 'center', marginHorizontal: 24 },
  waterCount: { fontSize: 36, fontWeight: '800', color: COLORS.primary },
  waterLabel: { fontSize: 12, color: COLORS.textLight },
  waterVisual: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 4 },
  symptomsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  symptomChip: {
    paddingHorizontal: 12, paddingVertical: 7,
    borderRadius: 50, borderWidth: 1.5,
    borderColor: COLORS.primary, backgroundColor: COLORS.white,
  },
  symptomChipSelected: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  symptomText: { fontSize: 13, color: COLORS.primary },
  symptomTextSelected: { color: '#fff', fontWeight: '600' },
  medicationRow: { flexDirection: 'row', alignItems: 'center' },
  textInput: {
    borderWidth: 1.5, borderColor: COLORS.border,
    borderRadius: 12, padding: 12,
    fontSize: 14, color: COLORS.text, marginTop: 8,
    backgroundColor: COLORS.background,
  },
  textArea: { height: 80, textAlignVertical: 'top' },
  saveBtn2: {
    backgroundColor: COLORS.primary, borderRadius: 50,
    padding: 18, alignItems: 'center', marginTop: 8,
    shadowColor: COLORS.primary, shadowOpacity: 0.3,
    shadowRadius: 12, elevation: 6,
  },
  saveBtnDisabled: { opacity: 0.6 },
  saveBtnText2: { color: '#fff', fontSize: 17, fontWeight: '700' },
  doneBox: {
    flex: 1, alignItems: 'center',
    justifyContent: 'center', padding: 32,
  },
  doneEmoji: { fontSize: 64, marginBottom: 16 },
  doneTitle: { fontSize: 24, fontWeight: '800', color: COLORS.primary, marginBottom: 8 },
  doneText: {
    fontSize: 15, color: COLORS.textLight,
    textAlign: 'center', lineHeight: 22, marginBottom: 24,
  },
  doneBtn: {
    backgroundColor: COLORS.primary, borderRadius: 50,
    paddingHorizontal: 32, paddingVertical: 14,
  },
  doneBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
