import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar, Modal,
} from 'react-native';
import COLORS from './colors';

const PREGNANCY_WEEKS = [
  {
    week: 1, trimester: 1,
    title: 'Week 1',
    babySize: '🌱 Poppy seed',
    babyLength: '0.1mm',
    babyWeight: 'Too tiny to measure',
    development: 'Fertilisation occurs. A single cell divides rapidly to form a blastocyst — the beginning of your baby.',
    bodyChanges: 'Your body does not yet know it is pregnant. The fertilised egg is travelling to the uterus.',
    tips: ['Start taking folic acid 400mcg daily if you have not already', 'Avoid alcohol and smoking from now', 'Book a GP appointment to confirm pregnancy'],
    symptoms: ['No symptoms yet', 'Possibly light spotting (implantation bleeding)'],
    milestone: '🌱 Journey begins',
  },
  {
    week: 4, trimester: 1,
    title: 'Week 4',
    babySize: '🫐 Poppy seed',
    babyLength: '1–2mm',
    babyWeight: 'Less than 1g',
    development: 'The embryo implants in the uterine wall. The neural tube — which becomes the brain and spine — begins forming.',
    bodyChanges: 'Your period is late. HCG hormone levels rise, causing a positive pregnancy test.',
    tips: ['Take a pregnancy test if you have not already', 'Book a midwife appointment', 'Continue folic acid', 'Avoid raw or undercooked foods'],
    symptoms: ['Missed period', 'Breast tenderness', 'Mild fatigue', 'Slight nausea'],
    milestone: '✅ Positive test',
  },
  {
    week: 6, trimester: 1,
    title: 'Week 6',
    babySize: '🫐 Sweet pea',
    babyLength: '6mm',
    babyWeight: 'Less than 1g',
    development: 'The heart begins beating — around 100–160 beats per minute. Tiny buds form that will become arms and legs.',
    bodyChanges: 'Morning sickness often starts. Your uterus is growing but not yet visible.',
    tips: ['Eat small frequent meals to manage nausea', 'Stay hydrated', 'Rest when you need to — fatigue is normal', 'Avoid vitamin A supplements'],
    symptoms: ['Morning sickness (any time of day)', 'Extreme fatigue', 'Frequent urination', 'Food aversions', 'Sore breasts'],
    milestone: '💓 Heartbeat begins',
  },
  {
    week: 8, trimester: 1,
    title: 'Week 8',
    babySize: '🫑 Raspberry',
    babyLength: '1.6cm',
    babyWeight: '1g',
    development: 'All major organs are forming. Tiny fingers and toes are developing. The embryo officially becomes a foetus.',
    bodyChanges: 'Your uterus is the size of a large orange. You may feel bloated. Breasts continue to grow.',
    tips: ['Book your dating scan (usually 8–12 weeks)', 'Tell your employer when you are ready', 'Look into maternity pay entitlements', 'Register with a midwife if not done'],
    symptoms: ['Nausea and vomiting', 'Fatigue', 'Bloating', 'Constipation', 'Mood swings'],
    milestone: '🤱 Now a foetus',
  },
  {
    week: 12, trimester: 1,
    title: 'Week 12',
    babySize: '🍋 Lime',
    babyLength: '5.4cm',
    babyWeight: '14g',
    development: 'Your baby can move, though you cannot feel it yet. Fingers and toes are fully formed. Kidneys produce urine.',
    bodyChanges: 'End of the first trimester. Risk of miscarriage drops significantly. Your bump may start to show.',
    tips: ['Attend your 12-week scan', 'Consider telling family and friends', 'Look into antenatal classes', 'Check you are getting enough iron'],
    symptoms: ['Nausea often improves', 'Energy may return', 'Visible bump starting', 'Skin changes possible'],
    milestone: '🎉 First trimester complete',
  },
  {
    week: 16, trimester: 2,
    title: 'Week 16',
    babySize: '🥑 Avocado',
    babyLength: '11.6cm',
    babyWeight: '100g',
    development: 'Baby can make facial expressions. Eyebrows and eyelashes are forming. Baby can hear your voice.',
    bodyChanges: 'Your bump is growing. You may feel the first flutters of movement soon.',
    tips: ['Talk and sing to your baby — they can hear you', 'Start thinking about your birth plan', 'Wear comfortable, supportive clothing', 'Stay active with gentle exercise'],
    symptoms: ['Reduced nausea', 'More energy', 'Back pain beginning', 'Skin changes (linea nigra)', 'Possible congestion'],
    milestone: '👂 Baby can hear you',
  },
  {
    week: 20, trimester: 2,
    title: 'Week 20',
    babySize: '🍌 Banana',
    babyLength: '25cm',
    babyWeight: '300g',
    development: 'Halfway there! Baby is swallowing and can hear clearly. Vernix (protective coating) covers the skin.',
    bodyChanges: 'You should be feeling regular movements. Your bump is clearly visible.',
    tips: ['Attend your 20-week anomaly scan', 'Consider a pregnancy pillow for sleep', 'Start pelvic floor exercises', 'Look into hypnobirthing or NCT classes'],
    symptoms: ['Baby movements felt', 'Back and hip pain', 'Heartburn starting', 'Swollen ankles possible', 'Round ligament pain'],
    milestone: '🔍 Halfway scan',
  },
  {
    week: 24, trimester: 2,
    title: 'Week 24',
    babySize: '🌽 Corn on the cob',
    babyLength: '30cm',
    babyWeight: '600g',
    development: 'Baby is now considered viable outside the womb with medical support. Lungs are developing rapidly.',
    bodyChanges: 'Your uterus reaches your belly button. Stretch marks may appear. Braxton Hicks contractions may begin.',
    tips: ['Monitor baby movements daily', 'Sleep on your left side for better circulation', 'Stay hydrated to reduce Braxton Hicks', 'Consider a birth preferences plan'],
    symptoms: ['Braxton Hicks contractions', 'Stretch marks', 'Backache', 'Increased discharge', 'Shortness of breath'],
    milestone: '💪 Viability milestone',
  },
  {
    week: 28, trimester: 3,
    title: 'Week 28',
    babySize: '🥬 Lettuce',
    babyLength: '37cm',
    babyWeight: '1kg',
    development: 'Baby opens eyes for the first time. Brain development accelerates. Baby gains weight rapidly now.',
    bodyChanges: 'Third trimester begins. Baby movements are strong and regular. Sleep becomes more difficult.',
    tips: ['Attend your 28-week midwife appointment', 'Discuss your birth plan with your midwife', 'Prepare your hospital bag', 'Look into cord blood banking if interested'],
    symptoms: ['Strong baby kicks', 'Difficulty sleeping', 'Frequent urination returns', 'Heartburn', 'Varicose veins possible'],
    milestone: '🎯 Third trimester begins',
  },
  {
    week: 32, trimester: 3,
    title: 'Week 32',
    babySize: '🎃 Squash',
    babyLength: '42cm',
    babyWeight: '1.7kg',
    development: 'Baby practises breathing movements. Fingernails reach fingertips. Baby is likely head-down by now.',
    bodyChanges: 'You may feel short of breath as the uterus presses on your diaphragm. Colostrum may leak from breasts.',
    tips: ['Pack your hospital bag', 'Attend antenatal appointments every 2 weeks', 'Rest and conserve energy', 'Learn the signs of preterm labour'],
    symptoms: ['Breathlessness', 'Pelvic pressure', 'Insomnia', 'Swollen hands and feet', 'Colostrum leaking'],
    milestone: '🏁 Hospital bag time',
  },
  {
    week: 36, trimester: 3,
    title: 'Week 36',
    babySize: '🥦 Head of broccoli',
    babyLength: '47cm',
    babyWeight: '2.6kg',
    development: 'Baby is almost fully developed. Lungs are nearly mature. Baby drops lower into the pelvis (engagement).',
    bodyChanges: 'You may breathe more easily as baby drops. Increased pelvic pressure and frequent urination.',
    tips: ['Attend weekly midwife appointments', 'Finalise your birth plan', 'Know the signs of labour', 'Rest as much as possible'],
    symptoms: ['Pelvic pressure and lightning crotch', 'Easier breathing', 'Increased urination', 'Nesting instinct', 'Cervix softening'],
    milestone: '⬇️ Baby engages',
  },
  {
    week: 40, trimester: 3,
    title: 'Week 40',
    babySize: '🍉 Watermelon',
    babyLength: '51cm',
    babyWeight: '3.4kg',
    development: 'Baby is fully developed and ready to meet you. The skull bones are not yet fused to allow passage through the birth canal.',
    bodyChanges: 'Due date week! You may experience early labour signs — Braxton Hicks, show, or waters breaking.',
    tips: ['Know the signs of labour (regular contractions, show, waters breaking)', 'Contact your midwife if waters break or contractions are 5 minutes apart', 'Stay calm and trust your body', 'You have got this!'],
    symptoms: ['Irregular contractions', 'Pelvic and back pressure', 'Loss of mucus plug possible', 'Nesting at full force', 'Anxiety and excitement'],
    milestone: '🎉 Due date week!',
  },
];

const TRIMESTER_COLORS = {
  1: { color: '#9B59B6', bg: '#F5EEFF', label: 'First Trimester' },
  2: { color: '#27AE60', bg: '#F0FFF4', label: 'Second Trimester' },
  3: { color: '#E91E8C', bg: '#FFF0F8', label: 'Third Trimester' },
};

export default function PregnancyScreen({ onBack }) {
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(12);
  const [showWeekModal, setShowWeekModal] = useState(false);
  const [showSetWeek, setShowSetWeek] = useState(false);

  const currentData = PREGNANCY_WEEKS.find(w => w.week <= currentWeek) ||
    PREGNANCY_WEEKS[PREGNANCY_WEEKS.length - 1];

  const trimester = TRIMESTER_COLORS[currentData.trimester];
  const progress = (currentWeek / 40) * 100;

  const selectedData = selectedWeek
    ? PREGNANCY_WEEKS.find(w => w.week === selectedWeek)
    : null;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>🤰 Pregnancy Tracker</Text>
          <Text style={styles.headerSub}>Week by week journey</Text>
        </View>
        <TouchableOpacity
          style={styles.setWeekBtn}
          onPress={() => setShowSetWeek(true)}
        >
          <Text style={styles.setWeekText}>Set Week</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* Current Week Hero */}
        <View style={[styles.heroCard, { backgroundColor: trimester.color }]}>
          <View style={styles.heroBg} />
          <Text style={styles.heroWeekLabel}>You are currently</Text>
          <Text style={styles.heroWeek}>Week {currentWeek}</Text>
          <Text style={styles.heroTrimester}>{trimester.label}</Text>
          <Text style={styles.heroBabySize}>{currentData.babySize}</Text>
          <Text style={styles.heroMilestone}>{currentData.milestone}</Text>

          {/* Progress Bar */}
          <View style={styles.progressBarWrap}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{Math.round(progress)}% complete</Text>
          </View>
        </View>

        {/* Current Week Details */}
        <View style={[styles.detailCard, { borderLeftColor: trimester.color }]}>
          <Text style={[styles.detailTitle, { color: trimester.color }]}>
            👶 Your Baby This Week
          </Text>
          <View style={styles.babyStats}>
            <View style={styles.babyStat}>
              <Text style={styles.babyStatValue}>{currentData.babyLength}</Text>
              <Text style={styles.babyStatLabel}>Length</Text>
            </View>
            <View style={[styles.babyStatDivider, { backgroundColor: trimester.color }]} />
            <View style={styles.babyStat}>
              <Text style={styles.babyStatValue}>{currentData.babyWeight}</Text>
              <Text style={styles.babyStatLabel}>Weight</Text>
            </View>
          </View>
          <Text style={styles.detailText}>{currentData.development}</Text>
        </View>

        <View style={[styles.detailCard, { borderLeftColor: '#F39C12' }]}>
          <Text style={[styles.detailTitle, { color: '#F39C12' }]}>
            🤱 Your Body This Week
          </Text>
          <Text style={styles.detailText}>{currentData.bodyChanges}</Text>
        </View>

        {/* Symptoms */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>😌 Common Symptoms</Text>
          <View style={styles.chipsRow}>
            {currentData.symptoms.map((symptom, i) => (
              <View key={i} style={[styles.chip, { backgroundColor: trimester.bg }]}>
                <Text style={[styles.chipText, { color: trimester.color }]}>{symptom}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tips */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>💡 Tips for This Week</Text>
          {currentData.tips.map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <View style={[styles.tipDot, { backgroundColor: trimester.color }]} />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Week Selector */}
        <Text style={styles.sectionTitle}>📅 All Weeks</Text>
        <Text style={styles.sectionSub}>Tap any week to see what to expect</Text>

        {/* Trimester Groups */}
        {[1, 2, 3].map(trimNum => {
          const trimInfo = TRIMESTER_COLORS[trimNum];
          const weeks = PREGNANCY_WEEKS.filter(w => w.trimester === trimNum);
          return (
            <View key={trimNum} style={styles.trimesterGroup}>
              <View style={[styles.trimesterHeader, { backgroundColor: trimInfo.bg }]}>
                <Text style={[styles.trimesterTitle, { color: trimInfo.color }]}>
                  {trimInfo.label}
                </Text>
              </View>
              <View style={styles.weeksRow}>
                {weeks.map(weekData => (
                  <TouchableOpacity
                    key={weekData.week}
                    style={[
                      styles.weekChip,
                      { borderColor: trimInfo.color },
                      currentWeek >= weekData.week && {
                        backgroundColor: trimInfo.color,
                      },
                    ]}
                    onPress={() => {
                      setSelectedWeek(weekData.week);
                      setShowWeekModal(true);
                    }}
                  >
                    <Text style={[
                      styles.weekChipText,
                      currentWeek >= weekData.week && { color: '#fff' },
                    ]}>
                      W{weekData.week}
                    </Text>
                    {currentWeek === weekData.week && (
                      <Text style={styles.weekChipCurrent}>YOU</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        })}

        {/* Emergency Info */}
        <View style={styles.emergencyCard}>
          <Text style={styles.emergencyTitle}>🚨 When to Call Your Midwife</Text>
          {[
            'Reduced or no baby movements',
            'Severe headache or visual disturbances',
            'Heavy bleeding at any stage',
            'Sudden severe abdominal pain',
            'Signs of labour before 37 weeks',
            'Waters breaking',
          ].map((item, i) => (
            <Text key={i} style={styles.emergencyItem}>• {item}</Text>
          ))}
          <Text style={styles.emergencyNote}>
            Midwife: 📞 contact your local maternity unit
            {'\n'}Emergency: 📞 999 | NHS Urgent: 📞 111
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Week Detail Modal */}
      <Modal visible={showWeekModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            {selectedData && (
              <>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.modalWeekHeader}>
                    <Text style={styles.modalWeekEmoji}>{selectedData.babySize}</Text>
                    <View>
                      <Text style={[styles.modalWeekTitle, {
                        color: TRIMESTER_COLORS[selectedData.trimester].color,
                      }]}>
                        {selectedData.title}
                      </Text>
                      <Text style={styles.modalWeekMilestone}>{selectedData.milestone}</Text>
                    </View>
                  </View>

                  <View style={styles.modalStatsRow}>
                    <View style={styles.modalStat}>
                      <Text style={styles.modalStatValue}>{selectedData.babyLength}</Text>
                      <Text style={styles.modalStatLabel}>Length</Text>
                    </View>
                    <View style={styles.modalStat}>
                      <Text style={styles.modalStatValue}>{selectedData.babyWeight}</Text>
                      <Text style={styles.modalStatLabel}>Weight</Text>
                    </View>
                  </View>

                  <Text style={styles.modalSectionTitle}>👶 Development</Text>
                  <Text style={styles.modalText}>{selectedData.development}</Text>

                  <Text style={styles.modalSectionTitle}>🤱 Your Body</Text>
                  <Text style={styles.modalText}>{selectedData.bodyChanges}</Text>

                  <Text style={styles.modalSectionTitle}>💡 Tips</Text>
                  {selectedData.tips.map((tip, i) => (
                    <View key={i} style={styles.modalTipRow}>
                      <Text style={styles.modalTipDot}>•</Text>
                      <Text style={styles.modalText}>{tip}</Text>
                    </View>
                  ))}

                  <View style={{ height: 20 }} />
                </ScrollView>
                <TouchableOpacity
                  style={[styles.setCurrentBtn, {
                    backgroundColor: TRIMESTER_COLORS[selectedData.trimester].color,
                  }]}
                  onPress={() => {
                    setCurrentWeek(selectedData.week);
                    setShowWeekModal(false);
                  }}
                >
                  <Text style={styles.setCurrentBtnText}>
                    Set as My Current Week 🤰
                  </Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowWeekModal(false)}
            >
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Set Week Modal */}
      <Modal visible={showSetWeek} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>How many weeks are you? 🤰</Text>
            <ScrollView style={styles.weekPickerScroll}>
              {Array.from({ length: 42 }, (_, i) => i + 1).map(week => (
                <TouchableOpacity
                  key={week}
                  style={[
                    styles.weekPickerRow,
                    currentWeek === week && styles.weekPickerRowActive,
                  ]}
                  onPress={() => {
                    setCurrentWeek(week);
                    setShowSetWeek(false);
                  }}
                >
                  <Text style={[
                    styles.weekPickerText,
                    currentWeek === week && { color: COLORS.primary, fontWeight: '800' },
                  ]}>
                    Week {week}
                    {week <= 12 ? ' — First Trimester' :
                     week <= 27 ? ' — Second Trimester' :
                     ' — Third Trimester'}
                  </Text>
                  {currentWeek === week && (
                    <Text style={styles.weekPickerCheck}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowSetWeek(false)}
            >
              <Text style={styles.closeBtnText}>Cancel</Text>
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
  setWeekBtn: {
    backgroundColor: COLORS.primaryLight, borderRadius: 50,
    paddingHorizontal: 14, paddingVertical: 8,
  },
  setWeekText: { fontSize: 13, fontWeight: '700', color: COLORS.primary },
  content: { flex: 1 },
  heroCard: {
    padding: 28, alignItems: 'center',
    overflow: 'hidden', position: 'relative',
  },
  heroBg: {
    position: 'absolute', top: -40, right: -40,
    width: 160, height: 160, borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  heroWeekLabel: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
  heroWeek: { fontSize: 48, fontWeight: '800', color: '#fff', marginBottom: 4 },
  heroTrimester: { fontSize: 15, color: 'rgba(255,255,255,0.9)', marginBottom: 12 },
  heroBabySize: { fontSize: 32, marginBottom: 8 },
  heroMilestone: {
    fontSize: 14, color: '#fff', fontWeight: '700',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 50, marginBottom: 20,
  },
  progressBarWrap: { width: '100%', alignItems: 'center' },
  progressBarBg: {
    width: '100%', height: 8, backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4, overflow: 'hidden', marginBottom: 8,
  },
  progressBarFill: {
    height: '100%', backgroundColor: '#fff', borderRadius: 4,
  },
  progressText: { fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: '600' },
  detailCard: {
    backgroundColor: COLORS.white, borderRadius: 20,
    margin: 16, marginBottom: 0, padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  detailTitle: { fontSize: 16, fontWeight: '800', marginBottom: 12 },
  babyStats: {
    flexDirection: 'row', alignItems: 'center',
    marginBottom: 12, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  babyStat: { flex: 1, alignItems: 'center' },
  babyStatValue: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  babyStatLabel: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  babyStatDivider: { width: 1, height: 40 },
  detailText: { fontSize: 14, color: COLORS.text, lineHeight: 22 },
  card: {
    backgroundColor: COLORS.white, borderRadius: 20,
    margin: 16, marginBottom: 0, padding: 16,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: '800', color: COLORS.text, marginBottom: 12 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 50 },
  chipText: { fontSize: 13, fontWeight: '600' },
  tipRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    gap: 10, paddingVertical: 6,
  },
  tipDot: { width: 8, height: 8, borderRadius: 4, marginTop: 6, flexShrink: 0 },
  tipText: { fontSize: 14, color: COLORS.text, lineHeight: 21, flex: 1 },
  sectionTitle: {
    fontSize: 17, fontWeight: '800', color: COLORS.text,
    marginHorizontal: 16, marginTop: 20, marginBottom: 4,
  },
  sectionSub: { fontSize: 13, color: COLORS.textLight, marginHorizontal: 16, marginBottom: 12 },
  trimesterGroup: { marginHorizontal: 16, marginBottom: 12 },
  trimesterHeader: {
    borderRadius: 12, padding: 10, marginBottom: 8,
  },
  trimesterTitle: { fontSize: 14, fontWeight: '800' },
  weeksRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  weekChip: {
    paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: 12, borderWidth: 1.5,
    backgroundColor: COLORS.white, alignItems: 'center',
  },
  weekChipText: { fontSize: 13, fontWeight: '700', color: COLORS.textLight },
  weekChipCurrent: { fontSize: 9, fontWeight: '800', color: '#fff', marginTop: 2 },
  emergencyCard: {
    backgroundColor: '#FFF0F0', borderRadius: 20,
    margin: 16, padding: 16,
    borderLeftWidth: 4, borderLeftColor: '#E74C3C',
  },
  emergencyTitle: { fontSize: 16, fontWeight: '800', color: '#E74C3C', marginBottom: 10 },
  emergencyItem: { fontSize: 14, color: COLORS.text, marginBottom: 6, lineHeight: 20 },
  emergencyNote: {
    fontSize: 13, color: COLORS.textLight, marginTop: 10, lineHeight: 22,
    backgroundColor: '#fff', borderRadius: 10, padding: 10,
  },
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
  modalTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text, marginBottom: 16 },
  modalWeekHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16,
  },
  modalWeekEmoji: { fontSize: 40 },
  modalWeekTitle: { fontSize: 22, fontWeight: '800' },
  modalWeekMilestone: { fontSize: 13, color: COLORS.textLight, marginTop: 2 },
  modalStatsRow: {
    flexDirection: 'row', marginBottom: 16,
    backgroundColor: COLORS.background, borderRadius: 14, padding: 14, gap: 20,
  },
  modalStat: { flex: 1, alignItems: 'center' },
  modalStatValue: { fontSize: 16, fontWeight: '800', color: COLORS.text },
  modalStatLabel: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  modalSectionTitle: {
    fontSize: 15, fontWeight: '800', color: COLORS.text,
    marginTop: 12, marginBottom: 6,
  },
  modalText: { fontSize: 14, color: COLORS.text, lineHeight: 22, flex: 1 },
  modalTipRow: { flexDirection: 'row', gap: 8, marginBottom: 4 },
  modalTipDot: { fontSize: 16, color: COLORS.primary },
  setCurrentBtn: {
    borderRadius: 50, paddingVertical: 15,
    alignItems: 'center', marginBottom: 10,
  },
  setCurrentBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  closeBtn: {
    borderWidth: 2, borderColor: COLORS.border, borderRadius: 50,
    paddingVertical: 14, alignItems: 'center',
  },
  closeBtnText: { color: COLORS.textLight, fontWeight: '700', fontSize: 15 },
  weekPickerScroll: { maxHeight: 300, marginBottom: 16 },
  weekPickerRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, borderBottomWidth: 1,
    borderBottomColor: COLORS.border, justifyContent: 'space-between',
  },
  weekPickerRowActive: { backgroundColor: COLORS.primaryLight },
  weekPickerText: { fontSize: 14, color: COLORS.text },
  weekPickerCheck: { fontSize: 16, color: COLORS.primary, fontWeight: '700' },
});
