import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar, Modal,
} from 'react-native';
import COLORS from './colors';

const CATEGORIES = [
  { id: 'all', label: 'All', emoji: '📚' },
  { id: 'cycle', label: 'Cycle', emoji: '🌸' },
  { id: 'fertility', label: 'Fertility', emoji: '🌱' },
  { id: 'pregnancy', label: 'Pregnancy', emoji: '🤰' },
  { id: 'hormones', label: 'Hormones', emoji: '⚗️' },
  { id: 'nutrition', label: 'Nutrition', emoji: '🥗' },
  { id: 'mental', label: 'Mental Health', emoji: '🧠' },
  { id: 'intimacy', label: 'Intimacy', emoji: '💕' },
];

const ARTICLES = [
  {
    id: 1, category: 'cycle', emoji: '🌸',
    title: 'Understanding Your Menstrual Cycle',
    subtitle: 'The 4 phases every woman should know',
    duration: '5 min read', level: 'Beginner', levelColor: '#4AC455',
    content: `Your menstrual cycle is divided into four phases, each with its own hormonal changes and physical effects.

🌸 PHASE 1 — Menstrual Phase (Days 1-5)
Your period begins on day 1. The uterine lining sheds as oestrogen and progesterone drop. You may feel tired, crampy, or emotional. Rest and warmth help during this time.

🌱 PHASE 2 — Follicular Phase (Days 6-13)
Oestrogen rises as follicles in your ovaries develop. You may feel more energetic, creative, and social. Your skin often looks better during this phase.

💫 PHASE 3 — Ovulation Phase (Days 14-16)
A mature egg is released from the ovary. You may notice clear, stretchy discharge and a slight temperature rise. This is your most fertile time.

🌙 PHASE 4 — Luteal Phase (Days 17-28)
Progesterone rises to prepare for potential pregnancy. You may experience PMS symptoms like bloating, mood changes, or breast tenderness in the week before your period.

Understanding these phases helps you work WITH your body rather than against it.`,
  },
  {
    id: 2, category: 'hormones', emoji: '⚗️',
    title: 'Oestrogen, Progesterone & You',
    subtitle: 'How your hormones shape your health',
    duration: '6 min read', level: 'Intermediate', levelColor: '#F39C12',
    content: `Hormones are chemical messengers that control almost every function in your body. Understanding the main female hormones helps you make sense of how you feel.

⚗️ OESTROGEN
Produced mainly by the ovaries, oestrogen is responsible for developing female characteristics, regulating the menstrual cycle, and maintaining bone density. It peaks during the follicular phase and at ovulation.

Effects of balanced oestrogen:
• Good mood and energy
• Clear skin
• Strong bones
• Regular periods

Signs of low oestrogen:
• Irregular or absent periods
• Hot flushes
• Vaginal dryness
• Low mood or anxiety

⚗️ PROGESTERONE
Produced after ovulation, progesterone prepares the uterus for pregnancy and helps maintain it. It rises during the luteal phase.

Effects of balanced progesterone:
• Calming effect on mood
• Better sleep
• Reduced anxiety

Signs of low progesterone:
• PMS symptoms
• Spotting before period
• Difficulty sleeping
• Anxiety and mood swings

⚗️ TESTOSTERONE
Yes — women produce testosterone too! It contributes to libido, energy, and muscle strength. It peaks around ovulation.

If you suspect a hormonal imbalance, speak to your GP who can arrange a blood test.`,
  },
  {
    id: 3, category: 'fertility', emoji: '🌱',
    title: 'Understanding Your Fertility Window',
    subtitle: 'When are you most likely to conceive?',
    duration: '4 min read', level: 'Beginner', levelColor: '#4AC455',
    content: `If you are trying to conceive — or trying to avoid pregnancy naturally — understanding your fertile window is essential.

🌱 WHAT IS THE FERTILE WINDOW?
You can only get pregnant in the days around ovulation. Sperm can survive in the body for up to 5 days, and the egg survives for about 24 hours after release. This means your fertile window is approximately 6 days long.

📅 WHEN IS OVULATION?
In a 28-day cycle, ovulation typically occurs around day 14. However, cycles vary — ovulation can happen anywhere from day 10 to day 21 in different women.

🔍 SIGNS OF OVULATION
• Cervical mucus becomes clear and stretchy (like raw egg white)
• Slight rise in basal body temperature (BBT)
• Mild one-sided pelvic pain (mittelschmerz)
• Increased libido
• Breast tenderness

📊 HOW TO TRACK OVULATION
1. Use Bellava's cycle tracker to log your period start date
2. Track your cervical mucus changes daily
3. Take your BBT every morning before getting up
4. Look for the pattern over 2-3 months

⚠️ IMPORTANT
Fertility tracking is not a reliable form of contraception unless done correctly and consistently. Speak to your GP or a family planning specialist for advice.`,
  },
  {
    id: 4, category: 'nutrition', emoji: '🥗',
    title: 'Eating for Your Cycle',
    subtitle: 'The best foods for each phase',
    duration: '5 min read', level: 'Beginner', levelColor: '#4AC455',
    content: `What you eat can significantly impact how you feel throughout your cycle. Each phase has different nutritional needs.

🌙 MENSTRUAL PHASE (Days 1-5)
Focus on: Iron, magnesium, anti-inflammatories
Best foods: Red meat or lentils, dark chocolate, salmon, spinach, ginger tea
Avoid: Excess salt, alcohol, caffeine

🌱 FOLLICULAR PHASE (Days 6-13)
Focus on: Protein, healthy fats, oestrogen-supporting foods
Best foods: Eggs, avocado, broccoli, oats, strawberries
Avoid: Refined sugar, processed carbs

✨ OVULATION PHASE (Days 14-16)
Focus on: Antioxidants, zinc, vitamin C
Best foods: Pumpkin seeds, tomatoes, kale, citrus fruits, walnuts
Avoid: Alcohol, trans fats

🌕 LUTEAL PHASE (Days 17-28)
Focus on: Magnesium, B vitamins, complex carbohydrates
Best foods: Sweet potato, almonds, turkey, brown rice, chamomile tea
Avoid: Caffeine, excess salt, refined sugar

💡 GENERAL TIPS
• Stay hydrated — aim for 6-8 glasses of water daily
• Reduce ultra-processed foods throughout your cycle
• Magnesium supplements may help with PMS symptoms — consult your GP first`,
  },
  {
    id: 5, category: 'mental', emoji: '🧠',
    title: 'Hormones and Mental Health',
    subtitle: 'Why your mood changes with your cycle',
    duration: '5 min read', level: 'Intermediate', levelColor: '#F39C12',
    content: `If your mood shifts dramatically at certain times of the month, hormones are almost certainly involved. This is real, validated, and not "just in your head."

🧠 THE HORMONE-MOOD CONNECTION
Oestrogen boosts serotonin (your feel-good hormone) and dopamine. When oestrogen drops — before your period or during perimenopause — serotonin drops too, which can cause low mood, anxiety, and irritability.

📅 MOOD PATTERNS THROUGH YOUR CYCLE

Menstrual Phase: Lower energy, more introspective. Rest is important.
Follicular Phase: Rising oestrogen lifts mood and confidence. Many women feel their best.
Ovulation: Peak mood, sociability, and energy for most women.
Luteal Phase: Progesterone rises and oestrogen drops. PMS symptoms may appear including anxiety, irritability, and low mood.

😔 PMDD — PREMENSTRUAL DYSPHORIC DISORDER
PMDD is a severe form of PMS that significantly impacts daily life. Symptoms include extreme mood swings, depression, and anxiety in the week before your period. It is a recognised medical condition — if you think you have PMDD, please speak to your GP.

💜 WHAT HELPS
• Regular exercise (even gentle movement)
• Reducing caffeine and alcohol
• Magnesium and B6 supplements (consult GP first)
• Cognitive behavioural therapy (CBT)
• In some cases, hormonal treatment or antidepressants

You deserve support. Your mental health is as important as your physical health.`,
  },
  {
    id: 6, category: 'pregnancy', emoji: '🤰',
    title: 'Early Pregnancy — What to Expect',
    subtitle: 'The first trimester explained',
    duration: '6 min read', level: 'Beginner', levelColor: '#4AC455',
    content: `The first trimester (weeks 1-12) is a time of huge change. Here is what to expect.

🤰 COMMON SYMPTOMS
• Nausea (morning sickness — although it can strike any time)
• Extreme fatigue
• Breast tenderness
• Frequent urination
• Food aversions or cravings
• Mood changes
• Light spotting (implantation bleeding)

📋 FIRST STEPS
1. Take a pregnancy test — if positive, book a GP appointment
2. Start taking folic acid (400mcg daily) immediately if you haven't already
3. Register with a midwife — your GP can refer you
4. Book your dating scan (usually at 8-12 weeks)
5. Avoid alcohol, smoking, and raw/undercooked foods

💊 WHAT TO AVOID
• Alcohol — no safe level in pregnancy
• Smoking
• Raw eggs, unpasteurised cheese, raw meat
• Certain medications — always check with your GP or pharmacist
• High doses of vitamin A
• High-mercury fish (shark, swordfish, marlin)

💜 EMOTIONAL WELLBEING
The first trimester can be an emotional rollercoaster. Anxiety and mood swings are normal. Talk to your midwife or GP if you are struggling — perinatal mental health support is available on the NHS.`,
  },
  {
    id: 7, category: 'intimacy', emoji: '💕',
    title: 'Pelvic Floor Health',
    subtitle: 'Why it matters and how to strengthen it',
    duration: '4 min read', level: 'Beginner', levelColor: '#4AC455',
    content: `Your pelvic floor is a group of muscles that support your bladder, bowel, and uterus. Keeping it strong is one of the best things you can do for your long-term health.

💕 WHY IT MATTERS
A strong pelvic floor:
• Prevents urinary leakage (incontinence)
• Supports pelvic organs
• Improves sexual sensation
• Aids recovery after childbirth
• Reduces prolapse risk

🏋️ PELVIC FLOOR EXERCISES (KEGELS)
1. Identify the muscles — imagine stopping the flow of urine
2. Squeeze and hold for 3-5 seconds
3. Release fully for 3-5 seconds
4. Repeat 10-15 times
5. Do this 3 times daily

⚠️ SIGNS OF A WEAK PELVIC FLOOR
• Leaking urine when you sneeze, cough, or exercise
• Urgency to urinate that is hard to control
• Reduced sensation during intimacy
• A feeling of heaviness in the pelvis

📍 GETTING HELP
If pelvic floor issues are affecting your quality of life, ask your GP for a referral to a women's health physiotherapist. This is available on the NHS and can make a significant difference.`,
  },
];

export default function AcademyScreen({ onBack, userPlan }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filtered = activeCategory === 'all'
    ? ARTICLES
    : ARTICLES.filter(a => a.category === activeCategory);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Health Academy</Text>
          <Text style={styles.headerSub}>Learn about your body 📚</Text>
        </View>
      </View>

      {/* Category tabs */}
      <ScrollView
        horizontal showsHorizontalScrollIndicator={false}
        style={styles.catScroll}
        contentContainerStyle={styles.catContent}
      >
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.catTab, activeCategory === cat.id && styles.catTabActive]}
            onPress={() => setActiveCategory(cat.id)}
          >
            <Text style={styles.catEmoji}>{cat.emoji}</Text>
            <Text style={[styles.catLabel, activeCategory === cat.id && styles.catLabelActive]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Articles */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.resultsText}>{filtered.length} articles</Text>
        {filtered.map(article => (
          <TouchableOpacity
            key={article.id}
            style={styles.articleCard}
            onPress={() => setSelectedArticle(article)}
          >
            <View style={styles.articleLeft}>
              <View style={styles.articleEmojiBg}>
                <Text style={styles.articleEmoji}>{article.emoji}</Text>
              </View>
            </View>
            <View style={styles.articleRight}>
              <View style={styles.articleMeta}>
                <View style={[styles.levelBadge, { backgroundColor: `${article.levelColor}20` }]}>
                  <Text style={[styles.levelText, { color: article.levelColor }]}>
                    {article.level}
                  </Text>
                </View>
                <Text style={styles.duration}>{article.duration}</Text>
              </View>
              <Text style={styles.articleTitle}>{article.title}</Text>
              <Text style={styles.articleSubtitle}>{article.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Article Modal */}
      <Modal visible={!!selectedArticle} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedArticle && (
                <>
                  <Text style={styles.modalEmoji}>{selectedArticle.emoji}</Text>
                  <View style={styles.modalMeta}>
                    <View style={[styles.levelBadge, { backgroundColor: `${selectedArticle.levelColor}20` }]}>
                      <Text style={[styles.levelText, { color: selectedArticle.levelColor }]}>
                        {selectedArticle.level}
                      </Text>
                    </View>
                    <Text style={styles.duration}>{selectedArticle.duration}</Text>
                  </View>
                  <Text style={styles.modalTitle}>{selectedArticle.title}</Text>
                  <Text style={styles.modalSubtitle}>{selectedArticle.subtitle}</Text>
                  <View style={styles.divider} />
                  <Text style={styles.modalContent}>{selectedArticle.content}</Text>
                  <View style={styles.disclaimer}>
                    <Text style={styles.disclaimerText}>
                      ⚠️ This article is for educational purposes only and does not replace professional medical advice. Always consult a qualified healthcare provider.
                    </Text>
                  </View>
                </>
              )}
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setSelectedArticle(null)}
              >
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
  catScroll: { maxHeight: 60, backgroundColor: COLORS.white },
  catContent: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  catTab: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 50, backgroundColor: COLORS.background,
  },
  catTabActive: { backgroundColor: COLORS.primary },
  catEmoji: { fontSize: 14 },
  catLabel: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  catLabelActive: { color: '#fff' },
  content: { flex: 1, padding: 16 },
  resultsText: { fontSize: 13, color: COLORS.textLight, marginBottom: 12 },
  articleCard: {
    flexDirection: 'row', backgroundColor: COLORS.white,
    borderRadius: 20, padding: 16, marginBottom: 12,
    gap: 14, alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.04,
    shadowRadius: 8, elevation: 2,
  },
  articleLeft: {},
  articleEmojiBg: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: COLORS.background,
    alignItems: 'center', justifyContent: 'center',
  },
  articleEmoji: { fontSize: 26 },
  articleRight: { flex: 1 },
  articleMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  levelBadge: { borderRadius: 50, paddingHorizontal: 8, paddingVertical: 3 },
  levelText: { fontSize: 11, fontWeight: '700' },
  duration: { fontSize: 11, color: COLORS.textLight },
  articleTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  articleSubtitle: { fontSize: 13, color: COLORS.textLight },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: COLORS.white, borderTopLeftRadius: 28,
    borderTopRightRadius: 28, padding: 24, maxHeight: '92%',
  },
  modalHandle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: COLORS.border, alignSelf: 'center', marginBottom: 20,
  },
  modalEmoji: { fontSize: 40, marginBottom: 12 },
  modalMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  modalTitle: { fontSize: 22, fontWeight: '800', color: COLORS.text, marginBottom: 6 },
  modalSubtitle: { fontSize: 15, color: COLORS.textLight, marginBottom: 16 },
  divider: { height: 1, backgroundColor: COLORS.border, marginBottom: 16 },
  modalContent: { fontSize: 15, color: COLORS.text, lineHeight: 26, marginBottom: 20 },
  disclaimer: {
    backgroundColor: '#FFF8E6', borderRadius: 12, padding: 14, marginBottom: 16,
  },
  disclaimerText: { fontSize: 12, color: '#9A6800', lineHeight: 18 },
  closeBtn: {
    borderWidth: 2, borderColor: COLORS.border, borderRadius: 50,
    paddingVertical: 14, alignItems: 'center',
  },
  closeBtnText: { color: COLORS.textLight, fontWeight: '700', fontSize: 15 },
});
