import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar,
  TextInput, Alert,
} from 'react-native';
import COLORS from './colors';

const SYMPTOM_CATEGORIES = [
  {
    category: 'Menstrual',
    emoji: '🌸',
    color: '#E74C3C',
    symptoms: ['Heavy bleeding', 'Light bleeding', 'Irregular periods', 'Missed period', 'Painful cramps', 'Spotting between periods', 'Long periods', 'Short periods'],
  },
  {
    category: 'Pain',
    emoji: '⚡',
    color: '#F59E0B',
    symptoms: ['Pelvic pain', 'Lower back pain', 'Breast tenderness', 'Headache', 'Abdominal pain', 'Joint pain', 'Ovary pain'],
  },
  {
    category: 'Hormonal',
    emoji: '🔄',
    color: '#9B59B6',
    symptoms: ['Mood swings', 'Anxiety', 'Depression', 'Irritability', 'Brain fog', 'Low libido', 'Hot flashes', 'Night sweats'],
  },
  {
    category: 'Digestive',
    emoji: '🫃',
    color: '#27AE60',
    symptoms: ['Bloating', 'Nausea', 'Constipation', 'Diarrhea', 'Appetite changes', 'Food cravings', 'Heartburn'],
  },
  {
    category: 'Energy',
    emoji: '⚡',
    color: '#3498DB',
    symptoms: ['Fatigue', 'Insomnia', 'Excessive sleep', 'Low energy', 'Dizziness', 'Fainting'],
  },
  {
    category: 'Skin & Hair',
    emoji: '✨',
    color: '#E67E22',
    symptoms: ['Acne', 'Hair loss', 'Dry skin', 'Oily skin', 'Excessive hair growth', 'Brittle nails'],
  },
];

const CONDITIONS = {
  'Heavy bleeding': { condition: 'Menorrhagia', urgency: 'medium', advice: 'Heavy bleeding lasting more than 7 days may indicate fibroids, endometriosis or hormonal imbalance. See your GP if this is persistent.' },
  'Missed period': { condition: 'Amenorrhea', urgency: 'medium', advice: 'Missed periods can be caused by stress, weight changes, PCOS or pregnancy. Take a pregnancy test first then see your GP.' },
  'Painful cramps': { condition: 'Dysmenorrhea', urgency: 'low', advice: 'Painful cramps are common but severe pain may indicate endometriosis. Try heat therapy and ibuprofen. See GP if pain is debilitating.' },
  'Pelvic pain': { condition: 'Possible Endometriosis/PCOS', urgency: 'high', advice: 'Persistent pelvic pain needs medical evaluation. Could indicate endometriosis, ovarian cysts or PID. See your GP soon.' },
  'Hot flashes': { condition: 'Perimenopause/Menopause', urgency: 'low', advice: 'Hot flashes are common during perimenopause. HRT and lifestyle changes can help. Discuss with your GP.' },
  'Hair loss': { condition: 'Possible PCOS/Thyroid', urgency: 'medium', advice: 'Hair loss in women can indicate hormonal imbalance, PCOS or thyroid issues. Blood tests from GP can help diagnose.' },
  'Mood swings': { condition: 'Hormonal Imbalance/PMS', urgency: 'low', advice: 'Mood swings are often linked to hormonal changes during your cycle. Severe mood changes may indicate PMDD.' },
  'Bloating': { condition: 'PMS/IBS', urgency: 'low', advice: 'Bloating around your period is normal. Persistent bloating unrelated to cycle may indicate IBS or other digestive issues.' },
  'Fatigue': { condition: 'Anaemia/Hormonal', urgency: 'medium', advice: 'Persistent fatigue in women is often linked to iron deficiency anaemia, thyroid issues or hormonal imbalance. Get blood tests.' },
  'Acne': { condition: 'Hormonal Acne/PCOS', urgency: 'low', advice: 'Hormonal acne often appears on chin and jawline. May be linked to PCOS. Speak to GP about hormonal treatments.' },
  'Irregular periods': { condition: 'PCOS/Thyroid', urgency: 'medium', advice: 'Irregular periods are a key sign of PCOS or thyroid dysfunction. See your GP for hormone blood tests.' },
  'Night sweats': { condition: 'Perimenopause/Infection', urgency: 'medium', advice: 'Night sweats can indicate perimenopause, infection or rarely lymphoma. See GP if persistent and unexplained.' },
  'Low libido': { condition: 'Hormonal Imbalance', urgency: 'low', advice: 'Low libido can be caused by low oestrogen, testosterone, stress or relationship factors. Discuss with GP or sex therapist.' },
  'Breast tenderness': { condition: 'PMS/Hormonal', urgency: 'low', advice: 'Breast tenderness before period is normal PMS. Unexplained lumps or one-sided pain should be checked by GP immediately.' },
  'Anxiety': { condition: 'PMDD/Mental Health', urgency: 'medium', advice: 'Cycle-linked anxiety may indicate PMDD. Please speak to your GP or a mental health professional. You deserve support.' },
};
export default function SymptomCheckerScreen({ onBack }) {
  const [searchText, setSearchText] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showResults, setShowResults] = useState(false);

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
    setShowResults(false);
  };

  const allSymptoms = SYMPTOM_CATEGORIES.flatMap(c => c.symptoms);

  const filteredCategories = SYMPTOM_CATEGORIES.map(cat => ({
    ...cat,
    symptoms: cat.symptoms.filter(s =>
      s.toLowerCase().includes(searchText.toLowerCase())
    ),
  })).filter(cat => cat.symptoms.length > 0);

  const getResults = () => {
    const results = selectedSymptoms.map(symptom => ({
      symptom,
      ...(CONDITIONS[symptom] || {
        condition: 'General Symptom',
        urgency: 'low',
        advice: 'Monitor this symptom and speak to your GP if it persists or worsens.',
      }),
    }));
    return results;
  };

  const getUrgencyColor = (urgency) => {
    if (urgency === 'high') return '#E74C3C';
    if (urgency === 'medium') return '#F59E0B';
    return '#27AE60';
  };

  const getUrgencyLabel = (urgency) => {
    if (urgency === 'high') return '🚨 See Doctor Soon';
    if (urgency === 'medium') return '⚠️ Monitor Closely';
    return '✅ Usually Normal';
  };

  const results = getResults();
  const hasHighUrgency = results.some(r => r.urgency === 'high');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF0F5" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Symptom Checker</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            ⚠️ This tool is for information only. Always consult a qualified healthcare professional for medical advice.
          </Text>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search symptoms..."
            placeholderTextColor={COLORS.textLight}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Selected Symptoms */}
        {selectedSymptoms.length > 0 && (
          <View style={styles.selectedBox}>
            <View style={styles.selectedHeader}>
              <Text style={styles.selectedTitle}>Selected ({selectedSymptoms.length})</Text>
              <TouchableOpacity onPress={() => { setSelectedSymptoms([]); setShowResults(false); }}>
                <Text style={styles.clearAll}>Clear All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.selectedTags}>
              {selectedSymptoms.map(s => (
                <TouchableOpacity
                  key={s}
                  style={styles.selectedTag}
                  onPress={() => toggleSymptom(s)}
                >
                  <Text style={styles.selectedTagText}>{s} ✕</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.checkBtn}
              onPress={() => setShowResults(true)}
            >
              <Text style={styles.checkBtnText}>🔍 Check My Symptoms</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Results */}
        {showResults && results.length > 0 && (
          <View style={styles.resultsBox}>
            <Text style={styles.resultsTitle}>📋 Your Results</Text>
            {hasHighUrgency && (
              <View style={styles.urgentBanner}>
                <Text style={styles.urgentText}>🚨 Some symptoms need urgent attention. Please see a doctor soon.</Text>
              </View>
            )}
            {results.map((result, i) => (
              <View key={i} style={[styles.resultCard, { borderLeftColor: getUrgencyColor(result.urgency) }]}>
                <View style={styles.resultHeader}>
                  <Text style={styles.resultSymptom}>{result.symptom}</Text>
                  <View style={[styles.urgencyBadge, { backgroundColor: getUrgencyColor(result.urgency) + '22' }]}>
                    <Text style={[styles.urgencyText, { color: getUrgencyColor(result.urgency) }]}>
                      {getUrgencyLabel(result.urgency)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.resultCondition}>Possible: {result.condition}</Text>
                <Text style={styles.resultAdvice}>{result.advice}</Text>
              </View>
            ))}
            <View style={styles.bellaCard}>
              <Text style={styles.bellaCardText}>💜 Want to discuss your symptoms with Bella AI?</Text>
              <TouchableOpacity
                style={styles.bellaBtn}
                onPress={() => Alert.alert('Bella AI 💜', 'Go to the AI Chat tab to talk to Bella about your symptoms!')}
              >
                <Text style={styles.bellaBtnText}>Ask Bella →</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Symptom Categories */}
        {filteredCategories.map(cat => (
          <View key={cat.category} style={styles.categorySection}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
              <Text style={[styles.categoryTitle, { color: cat.color }]}>{cat.category}</Text>
            </View>
            <View style={styles.symptomsGrid}>
              {cat.symptoms.map(symptom => (
                <TouchableOpacity
                  key={symptom}
                  style={[
                    styles.symptomBtn,
                    selectedSymptoms.includes(symptom) && { backgroundColor: cat.color, borderColor: cat.color }
                  ]}
                  onPress={() => toggleSymptom(symptom)}
                >
                  <Text style={[
                    styles.symptomText,
                    selectedSymptoms.includes(symptom) && styles.symptomTextActive
                  ]}>
                    {symptom}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Bottom Disclaimer */}
        <View style={styles.bottomDisclaimer}>
          <Text style={styles.bottomDisclaimerText}>
            🏥 In an emergency always call 999 (UK) or your local emergency number.{'\n\n'}
            This symptom checker is not a diagnostic tool. Always seek professional medical advice.
          </Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF0F5' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12,
  },
  backBtn: { padding: 8 },
  backText: { fontSize: 16, color: '#C9748F', fontWeight: '700' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#2D1B2E' },
  disclaimer: {
    marginHorizontal: 20, marginBottom: 16,
    backgroundColor: '#FFF3CD', borderRadius: 12,
    padding: 12, borderLeftWidth: 4, borderLeftColor: '#F59E0B',
  },
  disclaimerText: { fontSize: 13, color: '#856404', lineHeight: 20 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 16,
    marginHorizontal: 20, marginBottom: 16,
    paddingHorizontal: 14, paddingVertical: 12,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: '#2D1B2E' },
  clearText: { fontSize: 16, color: '#9B8FA0', fontWeight: '700' },
  selectedBox: {
    backgroundColor: '#fff', borderRadius: 20,
    marginHorizontal: 20, marginBottom: 16, padding: 16,
    shadowColor: '#C9748F', shadowOpacity: 0.1, shadowRadius: 8, elevation: 3,
  },
  selectedHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 10,
  },
  selectedTitle: { fontSize: 15, fontWeight: '800', color: '#2D1B2E' },
  clearAll: { fontSize: 13, fontWeight: '700', color: '#E74C3C' },
  selectedTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
  selectedTag: {
    backgroundColor: '#C9748F', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  selectedTagText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  checkBtn: {
    backgroundColor: '#C9748F', borderRadius: 50,
    paddingVertical: 14, alignItems: 'center',
  },
  checkBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  resultsBox: {
    marginHorizontal: 20, marginBottom: 20,
  },
  resultsTitle: { fontSize: 18, fontWeight: '800', color: '#2D1B2E', marginBottom: 12 },
  urgentBanner: {
    backgroundColor: '#FFE8E8', borderRadius: 12,
    padding: 12, marginBottom: 12,
    borderLeftWidth: 4, borderLeftColor: '#E74C3C',
  },
  urgentText: { fontSize: 13, color: '#E74C3C', fontWeight: '700', lineHeight: 20 },
  resultCard: {
    backgroundColor: '#fff', borderRadius: 16,
    padding: 16, marginBottom: 10,
    borderLeftWidth: 4,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  resultHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 6, gap: 8,
  },
  resultSymptom: { fontSize: 15, fontWeight: '800', color: '#2D1B2E', flex: 1 },
  urgencyBadge: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
  urgencyText: { fontSize: 11, fontWeight: '700' },
  resultCondition: { fontSize: 13, fontWeight: '700', color: '#9B59B6', marginBottom: 6 },
  resultAdvice: { fontSize: 13, color: '#2D1B2E', lineHeight: 20 },
  bellaCard: {
    backgroundColor: '#2D1B2E', borderRadius: 16,
    padding: 16, marginTop: 8,
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
  },
  bellaCardText: { flex: 1, fontSize: 13, color: '#fff', lineHeight: 20 },
  bellaBtn: {
    backgroundColor: '#C9748F', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 8, marginLeft: 10,
  },
  bellaBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  categorySection: { marginHorizontal: 20, marginBottom: 20 },
  categoryHeader: {
    flexDirection: 'row', alignItems: 'center',
    gap: 8, marginBottom: 10,
  },
  categoryEmoji: { fontSize: 20 },
  categoryTitle: { fontSize: 16, fontWeight: '800' },
  symptomsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  symptomBtn: {
    borderWidth: 1.5, borderColor: '#EDE0E8',
    borderRadius: 20, paddingHorizontal: 14,
    paddingVertical: 8, backgroundColor: '#fff',
  },
  symptomText: { fontSize: 13, color: '#2D1B2E', fontWeight: '600' },
  symptomTextActive: { color: '#fff' },
  bottomDisclaimer: {
    marginHorizontal: 20, marginBottom: 16,
    backgroundColor: '#F0EAFF', borderRadius: 16,
    padding: 16,
  },
  bottomDisclaimerText: {
    fontSize: 13, color: '#9B59B6',
    lineHeight: 22, textAlign: 'center',
  },
});
