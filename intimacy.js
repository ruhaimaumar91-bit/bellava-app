import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar, Modal,
} from 'react-native';
import COLORS from './colors';

const TOPICS = [
  {
    id: 'understanding',
    emoji: '💜',
    title: 'Understanding Your Body',
    color: '#9B59B6',
    bg: '#F5EEFF',
    articles: [
      {
        title: 'Your Pelvic Floor — Why It Matters',
        duration: '4 min read',
        content: `Your pelvic floor is a group of muscles that sit at the base of your pelvis. They support your bladder, bowel, and uterus — and play a huge role in your sexual health and comfort.

💜 WHY IT MATTERS
A strong pelvic floor can improve sexual sensation, prevent leaking when you sneeze or exercise, and support recovery after childbirth.

🏋️ PELVIC FLOOR EXERCISES (KEGELS)
1. Identify the muscles — imagine stopping the flow of urine mid-stream
2. Squeeze and hold for 3–5 seconds
3. Release fully for 3–5 seconds
4. Repeat 10–15 times, three times a day

⚠️ SIGNS OF A WEAK PELVIC FLOOR
• Leaking urine when laughing, sneezing or exercising
• A feeling of heaviness in the pelvis
• Reduced sensation during intimacy
• Difficulty reaching orgasm

If you experience these symptoms consistently, speak to your GP or a women's health physiotherapist.`,
      },
      {
        title: 'Vaginal Discharge — What Is Normal?',
        duration: '3 min read',
        content: `Vaginal discharge is completely normal and healthy. It is your body's way of keeping the vagina clean and protected.

🌸 WHAT IS NORMAL?
• Clear to white or slightly yellow
• May be stretchy like egg white around ovulation
• Increases in volume mid-cycle
• Has a mild, not unpleasant odour

⚠️ WHEN TO SEE A DOCTOR
• Discharge is green, grey or strongly yellow
• Unusual or fishy odour
• Accompanied by itching, burning or soreness
• Thick and cottage-cheese-like (possible thrush)
• Unexpected bleeding between periods

📝 TRACKING TIP
Log your discharge in Bellava's tracker to spot your fertile window and identify any changes that need attention.`,
      },
      {
        title: 'The Female Orgasm — Facts and Myths',
        duration: '5 min read',
        content: `Understanding your own pleasure is part of knowing your body. Here are some important facts.

✅ FACTS
• Only about 25% of women consistently orgasm through penetration alone
• The clitoris has over 8,000 nerve endings
• Orgasms can reduce period cramps due to uterine contractions and endorphin release
• Stress, fatigue and hormones all affect sexual response
• It is completely normal to need clitoral stimulation to reach orgasm

❌ COMMON MYTHS
• Something is wrong with you if you cannot orgasm from penetration alone — FALSE
• Orgasms should always be easy and quick — FALSE
• Desire should always be spontaneous — FALSE
• Intimacy is only about orgasm — FALSE

💜 RESPONSIVE DESIRE
Many women find that desire follows arousal. This is completely normal and not a sign of a problem.

If you are experiencing persistent difficulty with sexual function or pain, speak to your GP or a psychosexual therapist.`,
      },
    ],
  },
  {
    id: 'cycle',
    emoji: '🌙',
    title: 'Intimacy and Your Cycle',
    color: '#E91E8C',
    bg: '#FFF0F8',
    articles: [
      {
        title: 'How Your Cycle Affects Your Libido',
        duration: '4 min read',
        content: `Your desire for intimacy naturally shifts throughout your cycle — and that is completely normal.

🌙 MENSTRUAL PHASE (Days 1–5)
Oestrogen and progesterone are at their lowest. Many women feel less desire for intimacy. Some find that orgasms help with cramp relief. Listen to your body.

🌱 FOLLICULAR PHASE (Days 6–13)
Oestrogen rises and many women feel a natural increase in energy and confidence. Libido often increases during this phase.

✨ OVULATION (Days 14–16)
This is typically when desire peaks. Testosterone spikes alongside oestrogen, which can increase libido significantly.

🌕 LUTEAL PHASE (Days 17–28)
As progesterone rises, many women notice reduced libido — especially in the week before their period. This is hormonal and completely normal.

💡 TIP
Track your mood and desire in Bellava to understand your unique pattern. Every woman is different.`,
      },
      {
        title: 'Intimacy During Your Period',
        duration: '3 min read',
        content: `Having sex during your period is safe and a personal choice. Here is what you need to know.

✅ POTENTIAL BENEFITS
• Orgasms can relieve period cramps
• Increased natural lubrication
• Some women feel more connected and relaxed

💜 THINGS TO CONSIDER
• Use protection — you can still get pregnant during your period
• STI transmission risk still exists
• Use a dark towel or waterproof sheet for comfort

⚠️ WHEN TO AVOID
• If you have pelvic inflammatory disease or active infection
• If your partner has an STI

Always use contraception if you are not trying to conceive.`,
      },
      {
        title: 'Painful Intimacy — When to Seek Help',
        duration: '5 min read',
        content: `Pain during or after sex — known medically as dyspareunia — is more common than many women realise. It is not something you should simply put up with.

😣 COMMON CAUSES
• Insufficient lubrication
• Vaginismus (involuntary tightening of vaginal muscles)
• Endometriosis
• Pelvic inflammatory disease
• Ovarian cysts
• Vaginal dryness
• Thrush or bacterial vaginosis

💜 WHAT TO DO
1. Speak to your GP — this is a medical issue and you deserve support
2. Ask for a referral to a women's health physiotherapist
3. Consider psychosexual counselling if there is an emotional component
4. Use a water-based lubricant to reduce friction

⚠️ SEEK URGENT HELP IF
• Pain is sudden and severe
• Accompanied by fever or unusual discharge
• You notice unexplained bleeding after sex

You deserve a pain-free and fulfilling intimate life. Please do not suffer in silence.`,
      },
    ],
  },
  {
    id: 'wellness',
    emoji: '🌿',
    title: 'Sexual Wellness',
    color: '#27AE60',
    bg: '#F0FFF4',
    articles: [
      {
        title: 'Contraception — Your Options',
        duration: '6 min read',
        content: `Choosing the right contraception is a personal decision. Here is a simple overview of the most common options available in the UK.

💊 HORMONAL METHODS
• Combined pill — oestrogen and progestogen, taken daily
• Mini pill — progestogen only, taken daily
• Contraceptive patch — worn on skin, changed weekly
• Hormonal coil (Mirena) — lasts 5–8 years
• Implant — inserted in arm, lasts 3 years
• Injection — given every 8–13 weeks

🔵 NON-HORMONAL METHODS
• Copper coil (IUD) — lasts up to 10 years, hormone-free
• Condoms — the only method that also protects against STIs
• Diaphragm or cervical cap — used with spermicide

🚨 EMERGENCY CONTRACEPTION
• Emergency pill — take within 72–120 hours
• Copper coil — most effective, can be inserted within 5 days

💜 IMPORTANT
Always discuss your options with your GP or sexual health clinic.`,
      },
      {
        title: 'STI Awareness — Know Your Status',
        duration: '4 min read',
        content: `Sexually transmitted infections are common and nothing to be ashamed of. Regular testing is part of looking after your sexual health.

📋 COMMON STIs IN THE UK
• Chlamydia — often has no symptoms; the most common STI in the UK
• Gonorrhoea — may cause unusual discharge or pelvic pain
• Herpes — causes sores or blisters around the genitals or mouth
• HIV — treatable with medication
• HPV — very common; some strains cause genital warts
• Syphilis — rising in the UK

✅ GETTING TESTED
• Free testing available via NHS sexual health clinics
• Home test kits available from SH:24
• Recommended after every new partner, or annually if sexually active

💜 REMEMBER
• Many STIs have no symptoms
• Early treatment prevents complications
• Testing is confidential and non-judgemental`,
      },
      {
        title: 'Vaginal Dryness — Causes and Solutions',
        duration: '3 min read',
        content: `Vaginal dryness is common at all ages — not just during menopause. It can affect comfort in daily life and during intimacy.

🔍 COMMON CAUSES
• Low oestrogen after childbirth, breastfeeding or menopause
• Hormonal contraception
• Stress and anxiety
• Certain medications
• Not enough arousal time before penetration

💜 SOLUTIONS
• Water-based lubricants — safe with condoms
• Vaginal moisturisers used regularly
• Oestrogen cream prescribed by GP
• Hormone replacement therapy — discuss with your GP

✅ SIMPLE TIPS
• Allow more time for foreplay and arousal
• Stay hydrated
• Avoid scented soaps near the vagina
• Wear breathable cotton underwear

If dryness is persistent or affecting your quality of life, please speak to your GP.`,
      },
    ],
  },
  {
    id: 'relationships',
    emoji: '💑',
    title: 'Relationships and Boundaries',
    color: '#E67E22',
    bg: '#FFF5E6',
    articles: [
      {
        title: 'Communicating with Your Partner About Sex',
        duration: '4 min read',
        content: `Open communication is one of the most important parts of a healthy intimate relationship.

💬 HOW TO START THE CONVERSATION
• Choose a calm, private moment — not during or immediately after sex
• Use "I feel" statements rather than "you always" or "you never"
• Be specific about what you enjoy and what you would like more or less of
• Listen actively to your partner without interrupting
• Check in regularly — needs and desires change over time

💜 TOPICS WORTH DISCUSSING
• Likes, dislikes and boundaries
• Contraception and STI testing
• Consent — always ongoing and can be withdrawn at any time
• Frequency and timing
• Any pain or discomfort you are experiencing

🚫 REMEMBER
You are never obligated to do anything you are not comfortable with. A caring partner will respect your boundaries without guilt or pressure.`,
      },
      {
        title: 'Consent — What It Really Means',
        duration: '3 min read',
        content: `Consent is a fundamental part of every sexual encounter.

✅ CONSENT MUST BE
• Freely given — without pressure, manipulation or intoxication
• Reversible — you can change your mind at any time
• Informed — you know exactly what you are agreeing to
• Enthusiastic — yes means yes, not the absence of no
• Specific — agreeing to one thing does not mean agreeing to everything

❌ CONSENT IS NOT
• Silence or lack of resistance
• Given once and valid forever
• Possible when someone is drunk or unconscious
• Implied by previous sexual activity

🆘 IF YOUR BOUNDARIES HAVE BEEN VIOLATED
• It is not your fault
• Rape Crisis England and Wales: 0808 802 9999
• You can speak to your GP or go to a Sexual Assault Referral Centre
• You do not have to report to the police to access support`,
      },
      {
        title: 'Low Libido — Is It Normal?',
        duration: '4 min read',
        content: `Low libido — reduced interest in sex — is one of the most common concerns women report and is almost always manageable.

🔍 COMMON CAUSES
• Stress, burnout and exhaustion
• Hormonal changes
• Relationship difficulties
• Anxiety or depression
• Certain medications
• Past trauma or negative sexual experiences
• Body image concerns

💜 WHAT CAN HELP
• Addressing underlying stress or mental health with your GP
• Switching contraception — some methods reduce libido more than others
• Couples counselling or psychosexual therapy
• Open conversation with your partner
• Treating any underlying conditions

⚠️ WHEN TO SEE A GP
If low libido is causing you distress or has changed suddenly without an obvious cause, speak to your GP. Blood tests can rule out hormonal imbalances.

You are not broken. Your body and desire are valid exactly as they are.`,
      },
    ],
  },
];

export default function IntimacyScreen({ onBack }) {
  const [activeSection, setActiveSection] = useState('understanding');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const section = TOPICS.find(t => t.id === activeSection);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Intimacy Health</Text>
          <Text style={styles.headerSub}>Know your body. Own your health. 💜</Text>
        </View>
      </View>

      {/* Disclaimer Banner */}
      <View style={styles.disclaimerBanner}>
        <Text style={styles.disclaimerText}>
          ⚕️ This content is for educational purposes only and does not replace medical advice.
        </Text>
      </View>

      {/* Section Tabs */}
      <ScrollView
        horizontal showsHorizontalScrollIndicator={false}
        style={styles.tabScroll}
        contentContainerStyle={styles.tabScrollContent}
      >
        {TOPICS.map(topic => (
          <TouchableOpacity
            key={topic.id}
            style={[styles.sectionTab, activeSection === topic.id && { backgroundColor: topic.color }]}
            onPress={() => setActiveSection(topic.id)}
          >
            <Text style={styles.sectionTabEmoji}>{topic.emoji}</Text>
            <Text style={[styles.sectionTabLabel, activeSection === topic.id && { color: '#fff' }]}>
              {topic.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Articles */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.sectionBanner, { backgroundColor: section.bg, borderLeftColor: section.color }]}>
          <Text style={[styles.sectionBannerTitle, { color: section.color }]}>
            {section.emoji} {section.title}
          </Text>
          <Text style={styles.sectionBannerSub}>
            {section.articles.length} articles in this section
          </Text>
        </View>

        {section.articles.map((article, i) => (
          <TouchableOpacity
            key={i}
            style={styles.articleCard}
            onPress={() => setSelectedArticle(article)}
          >
            <View style={[styles.articleAccent, { backgroundColor: section.color }]} />
            <View style={styles.articleBody}>
              <Text style={styles.articleTitle}>{article.title}</Text>
              <View style={styles.articleMeta}>
                <Text style={styles.articleDuration}>🕐 {article.duration}</Text>
                <View style={[styles.readBtn, { backgroundColor: section.bg }]}>
                  <Text style={[styles.readBtnText, { color: section.color }]}>Read →</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.supportCard}>
          <Text style={styles.supportTitle}>🆘 Need Support?</Text>
          <Text style={styles.supportText}>
            If you are experiencing abuse, assault, or are in crisis:
          </Text>
          <Text style={styles.supportLine}>• Rape Crisis: 0808 802 9999</Text>
          <Text style={styles.supportLine}>• Women's Aid: 0808 2000 247</Text>
          <Text style={styles.supportLine}>• NHS 111 for urgent medical help</Text>
          <Text style={styles.supportLine}>• 999 in an emergency</Text>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>

      {/* Article Modal */}
      <Modal visible={!!selectedArticle} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedArticle && (
                <>
                  <View style={[styles.modalTopicBadge, { backgroundColor: section.bg }]}>
                    <Text style={[styles.modalTopicText, { color: section.color }]}>
                      {section.emoji} {section.title}
                    </Text>
                  </View>
                  <Text style={styles.modalTitle}>{selectedArticle.title}</Text>
                  <Text style={styles.modalDuration}>🕐 {selectedArticle.duration}</Text>
                  <Text style={styles.modalContent}>{selectedArticle.content}</Text>
                  <View style={styles.modalDisclaimer}>
                    <Text style={styles.modalDisclaimerText}>
                      ⚠️ This article is for educational purposes only. It does not constitute medical advice. If you have concerns about your health, please speak to a qualified healthcare professional.
                    </Text>
                  </View>
                </>
              )}
              <TouchableOpacity
                style={[styles.closeBtn, { borderColor: section.color }]}
                onPress={() => setSelectedArticle(null)}
              >
                <Text style={[styles.closeBtnText, { color: section.color }]}>Close Article</Text>
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
  disclaimerBanner: {
    backgroundColor: '#FFF8E6', paddingHorizontal: 16, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: '#FFE0A0',
  },
  disclaimerText: { fontSize: 12, color: '#9A6800', textAlign: 'center' },
  tabScroll: { maxHeight: 64, backgroundColor: COLORS.white },
  tabScrollContent: { paddingHorizontal: 16, paddingVertical: 10, gap: 10 },
  sectionTab: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 50,
    backgroundColor: COLORS.background,
  },
  sectionTabEmoji: { fontSize: 16 },
  sectionTabLabel: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  content: { flex: 1, padding: 16 },
  sectionBanner: {
    borderRadius: 16, padding: 16, marginBottom: 14, borderLeftWidth: 4,
  },
  sectionBannerTitle: { fontSize: 16, fontWeight: '800', marginBottom: 4 },
  sectionBannerSub: { fontSize: 13, color: COLORS.textLight },
  articleCard: {
    flexDirection: 'row', backgroundColor: COLORS.white,
    borderRadius: 16, marginBottom: 12, overflow: 'hidden',
    borderWidth: 1, borderColor: COLORS.border,
  },
  articleAccent: { width: 5 },
  articleBody: { flex: 1, padding: 16 },
  articleTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginBottom: 10 },
  articleMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  articleDuration: { fontSize: 12, color: COLORS.textLight },
  readBtn: { borderRadius: 50, paddingHorizontal: 14, paddingVertical: 6 },
  readBtnText: { fontSize: 13, fontWeight: '700' },
  supportCard: {
    backgroundColor: '#FFF0F0', borderRadius: 16, padding: 16,
    borderLeftWidth: 4, borderLeftColor: '#E74C3C', marginTop: 8,
  },
  supportTitle: { fontSize: 16, fontWeight: '800', color: '#E74C3C', marginBottom: 8 },
  supportText: { fontSize: 13, color: COLORS.text, marginBottom: 8 },
  supportLine: { fontSize: 13, color: COLORS.text, marginBottom: 4, fontWeight: '600' },
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
  modalTopicBadge: {
    alignSelf: 'flex-start', borderRadius: 50,
    paddingHorizontal: 14, paddingVertical: 7, marginBottom: 12,
  },
  modalTopicText: { fontSize: 13, fontWeight: '700' },
  modalTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text, marginBottom: 6 },
  modalDuration: { fontSize: 13, color: COLORS.textLight, marginBottom: 16 },
  modalContent: { fontSize: 14, color: COLORS.text, lineHeight: 24 },
  modalDisclaimer: {
    backgroundColor: '#FFF8E6', borderRadius: 12, padding: 14,
    marginTop: 20, marginBottom: 8,
  },
  modalDisclaimerText: { fontSize: 12, color: '#9A6800', lineHeight: 18 },
  closeBtn: {
    borderWidth: 2, borderRadius: 50, paddingVertical: 14,
    alignItems: 'center', marginTop: 12,
  },
  closeBtnText: { fontWeight: '700', fontSize: 16 },
});
