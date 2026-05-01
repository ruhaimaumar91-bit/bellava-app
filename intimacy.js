import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar,
  Alert,
} from 'react-native';
import COLORS from './colors';

const TOPICS = [
  {
    id: '1', title: 'Intimacy & Your Cycle',
    emoji: '🌸', color: '#C9748F',
    description: 'Your desire and energy for intimacy naturally changes throughout your cycle. Understanding these patterns can help you connect better with your body and partner.',
    content: [
      { phase: 'Menstrual (Days 1-5)', tip: 'Many women feel less desire during this phase. Self-care and rest are important. Some find intimacy helps with cramps due to oxytocin release.' },
      { phase: 'Follicular (Days 6-13)', tip: 'Rising oestrogen boosts energy and mood. You may feel more social and open to connection. A great time for dates and new experiences.' },
      { phase: 'Ovulation (Days 14-16)', tip: 'Peak desire and confidence! Oestrogen and testosterone are highest. You may feel most attractive and interested in intimacy.' },
      { phase: 'Luteal (Days 17-28)', tip: 'Progesterone rises and desire may decrease. Focus on emotional intimacy, communication and self-care with your partner.' },
    ],
  },
  {
    id: '2', title: 'Sexual Health Basics',
    emoji: '💊', color: '#9B59B6',
    description: 'Understanding your sexual health is an important part of overall wellbeing. Here is what every woman should know.',
    content: [
      { phase: 'STI Testing', tip: 'Regular STI testing is recommended for sexually active women. Many STIs have no symptoms. Annual testing or with new partners is advised.' },
      { phase: 'Contraception', tip: 'There are many contraception options available. Talk to your GP about what is right for you including hormonal and non-hormonal options.' },
      { phase: 'Cervical Screening', tip: 'Cervical screening (smear test) is recommended every 3 years from age 25 in the UK. It detects abnormal cells before they become cancer.' },
      { phase: 'Vaginal Health', tip: 'Normal discharge varies throughout your cycle. Changes in colour, smell or consistency may indicate infection. See your GP if concerned.' },
    ],
  },
  {
    id: '3', title: 'Body Confidence',
    emoji: '✨', color: '#F59E0B',
    description: 'Building a positive relationship with your body is essential for intimate wellbeing. Your body is worthy of love and care at every stage.',
    content: [
      { phase: 'Body Positivity', tip: 'Your body changes throughout your cycle and life. Practice gratitude for what your body does rather than focusing on how it looks.' },
      { phase: 'Self Care Rituals', tip: 'Regular self-care builds body confidence. Try moisturising, warm baths, gentle movement and activities that make you feel good in your skin.' },
      { phase: 'Mindful Movement', tip: 'Exercise that you enjoy builds confidence. Focus on strength and how movement makes you feel rather than changing your appearance.' },
      { phase: 'Positive Affirmations', tip: 'Daily affirmations can shift negative self-talk. Try "My body is strong", "I am worthy of love" and "I embrace my natural beauty".' },
    ],
  },
  {
    id: '4', title: 'Relationship Wellness',
    emoji: '❤️', color: '#E74C3C',
    description: 'Healthy relationships support your overall health and wellbeing. Communication, boundaries and mutual respect are the foundations of intimate wellness.',
    content: [
      { phase: 'Communication', tip: 'Open honest communication about needs, desires and boundaries strengthens relationships. Practice using "I feel" statements.' },
      { phase: 'Setting Boundaries', tip: 'Healthy boundaries are essential in all relationships. Your boundaries are valid and should always be respected by your partner.' },
      { phase: 'Emotional Intimacy', tip: 'Emotional connection is as important as physical intimacy. Quality time, shared experiences and active listening build deep bonds.' },
      { phase: 'Seeking Support', tip: 'Relationship challenges are normal. Couples counselling and individual therapy are signs of strength not weakness. Seek support early.' },
    ],
  },
  {
    id: '5', title: 'Pelvic Floor Health',
    emoji: '💪', color: '#27AE60',
    description: 'Your pelvic floor muscles support your bladder, bowel and uterus. Keeping them strong is vital for intimate health and overall wellbeing.',
    content: [
      { phase: 'What is the Pelvic Floor?', tip: 'The pelvic floor is a group of muscles that support your pelvic organs. They can weaken due to pregnancy, childbirth, age or weight.' },
      { phase: 'Kegel Exercises', tip: 'Kegels strengthen pelvic floor muscles. Squeeze and hold for 5 seconds, release for 5 seconds. Repeat 10 times, 3 times daily.' },
      { phase: 'Signs of Weakness', tip: 'Leaking urine when coughing, sneezing or exercising is common but not normal. A women\'s health physiotherapist can help significantly.' },
      { phase: 'Seeking Help', tip: 'Pelvic floor physiotherapy is available on the NHS. Ask your GP for a referral. It is highly effective for most pelvic floor issues.' },
    ],
  },
  {
    id: '6', title: 'Libido & Hormones',
    emoji: '🔄', color: '#3498DB',
    description: 'Your libido is directly connected to your hormones. Understanding these connections can help you support your sexual health naturally.',
    content: [
      { phase: 'Low Libido Causes', tip: 'Low libido can be caused by hormonal changes, stress, medication, relationship issues or health conditions. It is common and treatable.' },
      { phase: 'Hormonal Connection', tip: 'Oestrogen and testosterone play key roles in libido. These fluctuate throughout your cycle and decline during perimenopause.' },
      { phase: 'Natural Support', tip: 'Regular exercise, quality sleep, stress management and a balanced diet can all support healthy hormone levels and libido.' },
      { phase: 'When to See a Doctor', tip: 'If low libido is affecting your quality of life, speak to your GP. Hormone testing and treatment options are available.' },
    ],
  },
];

const TIPS = [
  { emoji: '💜', tip: 'Communication is the foundation of intimacy. Talk openly with your partner about your needs and feelings.' },
  { emoji: '🛁', tip: 'Self-care rituals like warm baths and massage can help you feel more connected to your body.' },
  { emoji: '🌿', tip: 'Stress significantly impacts libido. Prioritise relaxation and mindfulness in your daily routine.' },
  { emoji: '💊', tip: 'Some medications like antidepressants can affect libido. Speak to your GP about alternatives if this affects you.' },
  { emoji: '🏃', tip: 'Regular exercise boosts mood, body confidence and libido through endorphin release.' },
  { emoji: '😴', tip: 'Quality sleep is essential for healthy hormone levels and intimate wellbeing.' },
];
export default function IntimacyScreen({ onBack }) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [activeTip, setActiveTip] = useState(0);
  const [savedTopics, setSavedTopics] = useState([]);

  const toggleSave = (id) => {
    setSavedTopics(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF0F5" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Intimacy Health</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Topic Detail Modal */}
      {selectedTopic && (
        <View style={styles.modalOverlay}>
          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
              <View style={styles.modal}>

                {/* Modal Header */}
                <View style={[styles.modalHero, { backgroundColor: selectedTopic.color + '22' }]}>
                  <Text style={styles.modalHeroEmoji}>{selectedTopic.emoji}</Text>
                </View>

                <View style={styles.modalBody}>
                  <Text style={styles.modalTitle}>{selectedTopic.title}</Text>
                  <Text style={styles.modalDesc}>{selectedTopic.description}</Text>

                  <View style={styles.divider} />

                  {selectedTopic.content.map((item, i) => (
                    <View key={i} style={[styles.contentCard, { borderLeftColor: selectedTopic.color }]}>
                      <Text style={[styles.contentPhase, { color: selectedTopic.color }]}>
                        {item.phase}
                      </Text>
                      <Text style={styles.contentTip}>{item.tip}</Text>
                    </View>
                  ))}

                  <View style={styles.bellaCard}>
                    <Text style={styles.bellaCardText}>
                      💜 Have questions about intimacy health? Ask Bella AI for personalised guidance.
                    </Text>
                    <TouchableOpacity
                      style={styles.bellaBtn}
                      onPress={() => Alert.alert('Bella AI 💜', 'Go to the AI Chat tab to talk to Bella!')}
                    >
                      <Text style={styles.bellaBtnText}>Ask Bella →</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.disclaimer}>
                    <Text style={styles.disclaimerText}>
                      💜 This information is for educational purposes only. Always consult a healthcare professional for personal medical advice.
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => setSelectedTopic(null)}
                  >
                    <Text style={styles.closeBtnText}>← Back</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Text style={styles.heroEmoji}>💜</Text>
          <Text style={styles.heroTitle}>Intimacy & Wellness</Text>
          <Text style={styles.heroSub}>Education, confidence and connection</Text>
        </View>

        {/* Daily Tip */}
        <View style={styles.tipCard}>
          <View style={styles.tipHeader}>
            <Text style={styles.tipTitle}>💡 Daily Wellness Tip</Text>
            <TouchableOpacity onPress={() => setActiveTip(prev => (prev + 1) % TIPS.length)}>
              <Text style={styles.nextTip}>Next →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipEmoji}>{TIPS[activeTip].emoji}</Text>
            <Text style={styles.tipText}>{TIPS[activeTip].tip}</Text>
          </View>
        </View>

        {/* Topics Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 Health Topics</Text>
          <Text style={styles.sectionSub}>Tap any topic to learn more</Text>
          {TOPICS.map(topic => (
            <TouchableOpacity
              key={topic.id}
              style={styles.topicCard}
              onPress={() => setSelectedTopic(topic)}
            >
              <View style={[styles.topicIcon, { backgroundColor: topic.color + '22' }]}>
                <Text style={styles.topicEmoji}>{topic.emoji}</Text>
              </View>
              <View style={styles.topicInfo}>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.topicDesc} numberOfLines={2}>{topic.description}</Text>
                <Text style={[styles.topicLearn, { color: topic.color }]}>Learn more →</Text>
              </View>
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={() => toggleSave(topic.id)}
              >
                <Text style={styles.saveIcon}>
                  {savedTopics.includes(topic.id) ? '💜' : '🤍'}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Support Resources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🆘 Support Resources</Text>
          {[
            { name: 'Relate — Relationship Support', phone: '0300 100 1234', emoji: '❤️', color: '#E74C3C' },
            { name: 'Brook — Sexual Health', phone: '0808 802 1234', emoji: '💊', color: '#9B59B6' },
            { name: 'Rape Crisis England & Wales', phone: '0808 802 9999', emoji: '💜', color: '#C9748F' },
            { name: 'Sexual Health London (NHS)', phone: '0300 555 1200', emoji: '🏥', color: '#3498DB' },
          ].map((resource, i) => (
            <TouchableOpacity
              key={i}
              style={styles.resourceCard}
              onPress={() => Alert.alert(resource.name, `Call: ${resource.phone}\n\nThis is a confidential support service.`, [
                { text: 'Close' },
                { text: `Call ${resource.phone}` }
              ])}
            >
              <View style={[styles.resourceIcon, { backgroundColor: resource.color + '22' }]}>
                <Text style={styles.resourceEmoji}>{resource.emoji}</Text>
              </View>
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceName}>{resource.name}</Text>
                <Text style={[styles.resourcePhone, { color: resource.color }]}>{resource.phone}</Text>
              </View>
              <Text style={styles.resourceArrow}>📞</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Disclaimer */}
        <View style={styles.bottomDisclaimer}>
          <Text style={styles.bottomDisclaimerText}>
            💜 Bellava provides educational health information only. This is not medical advice. Always consult a qualified healthcare professional for personal guidance.
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
  modalOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100,
  },
  modal: { backgroundColor: '#FAF0F5', minHeight: '100%' },
  modalHero: {
    height: 160, alignItems: 'center', justifyContent: 'center',
  },
  modalHeroEmoji: { fontSize: 72 },
  modalBody: { padding: 20 },
  modalTitle: { fontSize: 24, fontWeight: '800', color: '#2D1B2E', marginBottom: 10 },
  modalDesc: { fontSize: 15, color: '#2D1B2E', lineHeight: 24, marginBottom: 16 },
  divider: { height: 1, backgroundColor: '#EDE0E8', marginBottom: 16 },
  contentCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 14,
    marginBottom: 10, borderLeftWidth: 4,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  contentPhase: { fontSize: 14, fontWeight: '800', marginBottom: 6 },
  contentTip: { fontSize: 14, color: '#2D1B2E', lineHeight: 22 },
  bellaCard: {
    backgroundColor: '#2D1B2E', borderRadius: 16,
    padding: 16, marginTop: 8, marginBottom: 16,
  },
  bellaCardText: { fontSize: 13, color: '#fff', lineHeight: 20, marginBottom: 12 },
  bellaBtn: {
    backgroundColor: '#C9748F', borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 8, alignSelf: 'flex-start',
  },
  bellaBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  disclaimer: {
    backgroundColor: '#F9EEF3', borderRadius: 16,
    padding: 14, marginBottom: 16,
  },
  disclaimerText: { fontSize: 13, color: '#C9748F', lineHeight: 20, textAlign: 'center' },
  closeBtn: {
    borderWidth: 1.5, borderColor: '#EDE0E8', borderRadius: 50,
    paddingVertical: 14, alignItems: 'center', marginBottom: 20,
  },
  closeBtnText: { color: '#9B8FA0', fontWeight: '700', fontSize: 15 },
  heroBanner: {
    marginHorizontal: 20, marginBottom: 16,
    backgroundColor: '#2D1B2E', borderRadius: 24,
    padding: 24, alignItems: 'center',
    shadowColor: '#2D1B2E', shadowOpacity: 0.2, shadowRadius: 12, elevation: 4,
  },
  heroEmoji: { fontSize: 48, marginBottom: 8 },
  heroTitle: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 4 },
  heroSub: { fontSize: 14, color: '#9B8FA0', textAlign: 'center' },
  tipCard: {
    backgroundColor: '#fff', borderRadius: 20,
    marginHorizontal: 20, marginBottom: 16, padding: 16,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  tipHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 12,
  },
  tipTitle: { fontSize: 15, fontWeight: '800', color: '#2D1B2E' },
  nextTip: { fontSize: 13, fontWeight: '700', color: '#C9748F' },
  tipContent: {
    flexDirection: 'row', alignItems: 'flex-start',
    gap: 10, backgroundColor: '#FAF0F5',
    borderRadius: 12, padding: 12,
  },
  tipEmoji: { fontSize: 24 },
  tipText: { flex: 1, fontSize: 14, color: '#2D1B2E', lineHeight: 22 },
  section: { marginHorizontal: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#2D1B2E', marginBottom: 4 },
  sectionSub: { fontSize: 13, color: '#9B8FA0', marginBottom: 12 },
  topicCard: {
    flexDirection: 'row', backgroundColor: '#fff',
    borderRadius: 20, padding: 14, marginBottom: 10,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
    alignItems: 'center', gap: 12,
  },
  topicIcon: {
    width: 56, height: 56, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  topicEmoji: { fontSize: 26 },
  topicInfo: { flex: 1 },
  topicTitle: { fontSize: 15, fontWeight: '800', color: '#2D1B2E', marginBottom: 4 },
  topicDesc: { fontSize: 12, color: '#9B8FA0', lineHeight: 18, marginBottom: 4 },
  topicLearn: { fontSize: 12, fontWeight: '700' },
  saveBtn: { padding: 4 },
  saveIcon: { fontSize: 20 },
  resourceCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 16,
    padding: 14, marginBottom: 8, gap: 12,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  resourceIcon: {
    width: 44, height: 44, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  resourceEmoji: { fontSize: 22 },
  resourceInfo: { flex: 1 },
  resourceName: { fontSize: 14, fontWeight: '700', color: '#2D1B2E', marginBottom: 2 },
  resourcePhone: { fontSize: 13, fontWeight: '700' },
  resourceArrow: { fontSize: 20 },
  bottomDisclaimer: {
    marginHorizontal: 20, marginBottom: 16,
    backgroundColor: '#F9EEF3', borderRadius: 16, padding: 16,
  },
  bottomDisclaimerText: {
    fontSize: 13, color: '#C9748F',
    lineHeight: 20, textAlign: 'center',
  },
});
