import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar, Modal,
} from 'react-native';
import COLORS from './colors';

const TOPICS = [
  { id: 'hormones', emoji: '🌸', label: 'Hormones & Cycle', color: '#E91E8C', bg: '#FF6B9D' },
  { id: 'pregnancy', emoji: '🤰', label: 'Pregnancy Care', color: '#9B59B6', bg: '#A855F7' },
  { id: 'mental', emoji: '🧠', label: 'Mental Health', color: '#4A90C4', bg: '#60A5FA' },
  { id: 'birthcontrol', emoji: '💊', label: 'Birth Control', color: '#27AE60', bg: '#34D399' },
  { id: 'nutrition', emoji: '🥗', label: 'Nutrition', color: '#F39C12', bg: '#FB923C' },
  { id: 'intimacy', emoji: '💜', label: 'Intimacy Health', color: '#C9748F', bg: '#F472B6' },
];

const LESSONS = [
  {
    id: 1, topic: 'hormones',
    title: 'Understanding Your Menstrual Cycle',
    duration: '8:45', views: '12k', progress: 65,
    emoji: '🔬',
    description: 'Learn how your hormones change throughout your cycle and how this affects your mood, energy and body.',
    keyPoints: [
      'The 4 phases of your menstrual cycle',
      'How oestrogen and progesterone work',
      'Why you feel different each week',
      'Tracking your cycle for better health',
    ],
  },
  {
    id: 2, topic: 'pregnancy',
    title: 'First Trimester: What to Expect',
    duration: '12:15', views: '28k', progress: 0,
    emoji: '👶',
    description: 'A complete guide to the first 12 weeks of pregnancy — symptoms, nutrition, scans and emotional wellbeing.',
    keyPoints: [
      'Week by week changes in your body',
      'Managing morning sickness naturally',
      'Essential nutrients — folic acid, iron, vitamin D',
      'Your first antenatal appointments',
    ],
  },
  {
    id: 3, topic: 'mental',
    title: 'Managing PMS Symptoms',
    duration: '9:30', views: '15k', progress: 100,
    emoji: '🌿',
    description: 'Evidence-based strategies for managing premenstrual syndrome including mood changes, fatigue and physical symptoms.',
    keyPoints: [
      'Understanding why PMS happens',
      'Diet changes that actually help',
      'Exercise and movement for PMS',
      'When to seek medical support',
    ],
  },
  {
    id: 4, topic: 'hormones',
    title: 'PCOS Explained Simply',
    duration: '11:20', views: '34k', progress: 0,
    emoji: '🔭',
    description: 'Polycystic ovary syndrome affects 1 in 10 women. Learn what it is, how it is diagnosed and how to manage it.',
    keyPoints: [
      'What PCOS actually is',
      'Symptoms and diagnosis',
      'Managing PCOS naturally',
      'Treatment options available on NHS',
    ],
  },
  {
    id: 5, topic: 'nutrition',
    title: 'Eating for Your Cycle',
    duration: '7:45', views: '19k', progress: 30,
    emoji: '🥑',
    description: 'How to eat differently in each phase of your cycle to boost energy, reduce symptoms and support hormones.',
    keyPoints: [
      'Menstrual phase — iron rich foods',
      'Follicular phase — light and energising',
      'Ovulation phase — anti-inflammatory foods',
      'Luteal phase — magnesium and complex carbs',
    ],
  },
  {
    id: 6, topic: 'pregnancy',
    title: 'Preparing for Labour and Birth',
    duration: '15:30', views: '41k', progress: 0,
    emoji: '🏥',
    description: 'Everything you need to know about the stages of labour, pain relief options and your birth preferences.',
    keyPoints: [
      'The 3 stages of labour',
      'Pain relief options explained',
      'Writing your birth plan',
      'When to go to hospital',
    ],
  },
  {
    id: 7, topic: 'birthcontrol',
    title: 'Birth Control Options Explained',
    duration: '10:15', views: '22k', progress: 0,
    emoji: '💊',
    description: 'A clear, judgement-free guide to all contraception options — hormonal, non-hormonal and long-term.',
    keyPoints: [
      'Combined pill and mini pill',
      'Coil — IUD and IUS',
      'Implant and injection',
      'Barrier methods and natural family planning',
    ],
  },
  {
    id: 8, topic: 'mental',
    title: 'Anxiety and Your Hormones',
    duration: '8:00', views: '17k', progress: 0,
    emoji: '🧘',
    description: 'The connection between hormone fluctuations and anxiety — and practical tools to manage it.',
    keyPoints: [
      'How hormones affect mental health',
      'Cycle-linked anxiety patterns',
      'Breathing and grounding techniques',
      'When to seek professional support',
    ],
  },
  {
    id: 9, topic: 'intimacy',
    title: 'Understanding Your Body',
    duration: '6:30', views: '11k', progress: 0,
    emoji: '💜',
    description: 'A body-positive guide to understanding your anatomy, desire and sexual health as a woman.',
    keyPoints: [
      'Female anatomy explained clearly',
      'Understanding libido across your cycle',
      'Sexual health and STI awareness',
      'Communicating your needs',
    ],
  },
];

const EXPERT_SESSIONS = [
  {
    id: 1,
    name: 'Dr. Emily Chen',
    role: 'OB/GYN Specialist',
    topic: 'Fertility, Pregnancy & Women\'s Health',
    date: 'May 8, 7 PM',
    emoji: '👩‍⚕️',
    color: '#27AE60',
    bg: '#F0FFF4',
  },
  {
    id: 2,
    name: 'Dr. Amara Osei',
    role: 'Nutritionist & Women\'s Health',
    topic: 'Eating for Hormonal Balance',
    date: 'May 15, 6 PM',
    emoji: '🥗',
    color: '#F39C12',
    bg: '#FFFDE6',
  },
  {
    id: 3,
    name: 'Dr. Sarah Mitchell',
    role: 'Psychologist',
    topic: 'Mental Health & Your Cycle',
    date: 'May 22, 7 PM',
    emoji: '🧠',
    color: '#4A90C4',
    bg: '#E8F4FF',
  },
];

const COMMUNITY_STORIES = [
  {
    id: 1, name: 'Jessica M.',
    initial: 'J', color: '#9B59B6',
    topic: 'First Trimester Journey',
    preview: 'Week 12 update: Morning sickness finally subsiding! Here\'s what helped me get through...',
    likes: 234, comments: 45,
  },
  {
    id: 2, name: 'Amanda K.',
    initial: 'A', color: '#4A90C4',
    topic: 'PCOS Management',
    preview: 'My experience with diet changes and cycle regulation over 6 months — the results surprised me...',
    likes: 189, comments: 67,
  },
  {
    id: 3, name: 'Fatima A.',
    initial: 'F', color: '#E91E8C',
    topic: 'TTC Journey',
    preview: 'After 8 months of trying, I finally got my positive test! Here is everything I learned...',
    likes: 312, comments: 89,
  },
];

export default function AcademyScreen({ onBack }) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showLesson, setShowLesson] = useState(false);

  const filteredLessons = selectedTopic
    ? LESSONS.filter(l => l.topic === selectedTopic)
    : LESSONS;

  const continueLearning = LESSONS.filter(l => l.progress > 0 && l.progress < 100);
  const popularLessons = [...LESSONS].sort((a, b) => parseInt(b.views) - parseInt(a.views)).slice(0, 3);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>📚 Bellava Academy</Text>
          <Text style={styles.headerSub}>Learn about your health journey ✨</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* Continue Learning */}
        {continueLearning.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📈 Continue Learning</Text>
            {continueLearning.map(lesson => (
              <TouchableOpacity
                key={lesson.id}
                style={styles.continueCard}
                onPress={() => { setSelectedLesson(lesson); setShowLesson(true); }}
              >
                <View style={styles.continueThumb}>
                  <Text style={styles.continueEmoji}>{lesson.emoji}</Text>
                  <View style={styles.playOverlay}>
                    <Text style={styles.playIcon}>▶</Text>
                  </View>
                </View>
                <View style={styles.continueInfo}>
                  <Text style={styles.continueTitle}>{lesson.title}</Text>
                  <View style={styles.continueMeta}>
                    <Text style={styles.continueDuration}>⏱ {lesson.duration}</Text>
                    <Text style={[styles.continueProgress, { color: COLORS.primary }]}>
                      {lesson.progress}% complete
                    </Text>
                  </View>
                  <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${lesson.progress}%` }]} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Explore Topics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔍 Explore Topics</Text>
          <View style={styles.topicsGrid}>
            {TOPICS.map(topic => (
              <TouchableOpacity
                key={topic.id}
                style={[
                  styles.topicCard,
                  { backgroundColor: topic.bg },
                  selectedTopic === topic.id && styles.topicCardSelected,
                ]}
                onPress={() => setSelectedTopic(
                  selectedTopic === topic.id ? null : topic.id
                )}
              >
                <Text style={styles.topicEmoji}>{topic.emoji}</Text>
                <Text style={styles.topicLabel}>{topic.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Lessons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedTopic
              ? `${TOPICS.find(t => t.id === selectedTopic)?.emoji} ${TOPICS.find(t => t.id === selectedTopic)?.label}`
              : '🎯 All Lessons'}
          </Text>
          {filteredLessons.map(lesson => (
            <TouchableOpacity
              key={lesson.id}
              style={styles.lessonCard}
              onPress={() => { setSelectedLesson(lesson); setShowLesson(true); }}
            >
              <View style={[styles.lessonThumb, {
                backgroundColor: TOPICS.find(t => t.id === lesson.topic)?.bg + '40' || '#F0F0F0',
              }]}>
                <Text style={styles.lessonEmoji}>{lesson.emoji}</Text>
                <View style={styles.playBtn}>
                  <Text style={styles.playBtnIcon}>▶</Text>
                </View>
              </View>
              <View style={styles.lessonInfo}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <View style={[styles.topicTag, {
                  backgroundColor: TOPICS.find(t => t.id === lesson.topic)?.bg + '20',
                }]}>
                  <Text style={[styles.topicTagText, {
                    color: TOPICS.find(t => t.id === lesson.topic)?.color,
                  }]}>
                    {TOPICS.find(t => t.id === lesson.topic)?.label}
                  </Text>
                </View>
                <View style={styles.lessonMeta}>
                  <Text style={styles.lessonDuration}>⏱ {lesson.duration}</Text>
                  <Text style={styles.lessonViews}>👁 {lesson.views} views</Text>
                </View>
                {lesson.progress > 0 && (
                  <View style={styles.progressBarBg}>
                    <View style={[
                      styles.progressBarFill,
                      { width: `${lesson.progress}%` },
                      lesson.progress === 100 && { backgroundColor: '#27AE60' },
                    ]} />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular This Week */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⭐ Popular This Week</Text>
          {popularLessons.map(lesson => (
            <TouchableOpacity
              key={lesson.id}
              style={styles.popularCard}
              onPress={() => { setSelectedLesson(lesson); setShowLesson(true); }}
            >
              <View style={[styles.popularThumb, {
                backgroundColor: TOPICS.find(t => t.id === lesson.topic)?.bg + '30',
              }]}>
                <Text style={styles.popularEmoji}>{lesson.emoji}</Text>
                <View style={styles.playBtnSmall}>
                  <Text style={styles.playBtnSmallIcon}>▶</Text>
                </View>
              </View>
              <View style={styles.popularInfo}>
                <Text style={styles.popularTitle}>{lesson.title}</Text>
                <View style={[styles.topicTag, {
                  backgroundColor: TOPICS.find(t => t.id === lesson.topic)?.bg + '20',
                }]}>
                  <Text style={[styles.topicTagText, {
                    color: TOPICS.find(t => t.id === lesson.topic)?.color,
                  }]}>
                    {TOPICS.find(t => t.id === lesson.topic)?.label}
                  </Text>
                </View>
                <View style={styles.lessonMeta}>
                  <Text style={styles.lessonDuration}>⏱ {lesson.duration}</Text>
                  <Text style={styles.lessonViews}>👁 {lesson.views} views</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Ask Our Experts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👩‍⚕️ Ask Our Experts</Text>
          <Text style={styles.sectionSub}>Live sessions with real healthcare professionals</Text>
          {EXPERT_SESSIONS.map(session => (
            <View key={session.id} style={[styles.expertCard, { borderColor: session.color }]}>
              <View style={styles.expertTop}>
                <View style={[styles.expertAvatar, { backgroundColor: session.bg }]}>
                  <Text style={styles.expertEmoji}>{session.emoji}</Text>
                </View>
                <View style={styles.expertInfo}>
                  <Text style={styles.expertName}>{session.name}</Text>
                  <Text style={styles.expertRole}>{session.role}</Text>
                </View>
              </View>
              <Text style={styles.expertTopic}>{session.topic}</Text>
              <View style={styles.expertBottom}>
                <TouchableOpacity
                  style={[styles.registerBtn, { backgroundColor: session.color }]}
                >
                  <Text style={styles.registerBtnText}>Register Now</Text>
                </TouchableOpacity>
                <View style={styles.nextSession}>
                  <Text style={styles.nextSessionLabel}>Next Session</Text>
                  <Text style={[styles.nextSessionDate, { color: session.color }]}>
                    {session.date}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Community Stories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💬 Community Stories</Text>
          {COMMUNITY_STORIES.map(story => (
            <TouchableOpacity key={story.id} style={styles.storyCard}>
              <View style={styles.storyTop}>
                <View style={[styles.storyAvatar, { backgroundColor: story.color }]}>
                  <Text style={styles.storyInitial}>{story.initial}</Text>
                </View>
                <View>
                  <Text style={styles.storyName}>{story.name}</Text>
                  <Text style={styles.storyTopic}>{story.topic}</Text>
                </View>
              </View>
              <Text style={styles.storyPreview}>{story.preview}</Text>
              <View style={styles.storyBottom}>
                <Text style={styles.storyLikes}>❤️ {story.likes}</Text>
                <Text style={styles.storyComments}>💬 {story.comments}</Text>
                <Text style={[styles.readMore, { color: COLORS.primary }]}>Read More →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Lesson Modal */}
      <Modal visible={showLesson} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            {selectedLesson && (
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Video Placeholder */}
                <View style={[styles.videoPlaceholder, {
                  backgroundColor: TOPICS.find(t => t.id === selectedLesson.topic)?.bg + '40',
                }]}>
                  <Text style={styles.videoEmoji}>{selectedLesson.emoji}</Text>
                  <TouchableOpacity style={styles.bigPlayBtn}>
                    <Text style={styles.bigPlayIcon}>▶</Text>
                  </TouchableOpacity>
                  <Text style={styles.videoDuration}>⏱ {selectedLesson.duration}</Text>
                </View>

                <View style={styles.modalContent}>
                  <View style={[styles.topicTag, {
                    backgroundColor: TOPICS.find(t => t.id === selectedLesson.topic)?.bg + '20',
                    alignSelf: 'flex-start', marginBottom: 8,
                  }]}>
                    <Text style={[styles.topicTagText, {
                      color: TOPICS.find(t => t.id === selectedLesson.topic)?.color,
                    }]}>
                      {TOPICS.find(t => t.id === selectedLesson.topic)?.label}
                    </Text>
                  </View>

                  <Text style={styles.modalTitle}>{selectedLesson.title}</Text>

                  <View style={styles.modalMeta}>
                    <Text style={styles.metaItem}>⏱ {selectedLesson.duration}</Text>
                    <Text style={styles.metaItem}>👁 {selectedLesson.views} views</Text>
                  </View>

                  {selectedLesson.progress > 0 && (
                    <View style={styles.modalProgressWrap}>
                      <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, {
                          width: `${selectedLesson.progress}%`,
                          backgroundColor: selectedLesson.progress === 100 ? '#27AE60' : COLORS.primary,
                        }]} />
                      </View>
                      <Text style={styles.progressLabel}>
                        {selectedLesson.progress === 100 ? '✅ Completed' : `${selectedLesson.progress}% complete`}
                      </Text>
                    </View>
                  )}

                  <Text style={styles.modalDesc}>{selectedLesson.description}</Text>

                  <Text style={styles.keyPointsTitle}>📌 What you will learn:</Text>
                  {selectedLesson.keyPoints.map((point, i) => (
                    <View key={i} style={styles.keyPointRow}>
                      <View style={[styles.keyPointDot, { backgroundColor: COLORS.primary }]} />
                      <Text style={styles.keyPointText}>{point}</Text>
                    </View>
                  ))}

                  <TouchableOpacity
                    style={[styles.startBtn, {
                      backgroundColor: TOPICS.find(t => t.id === selectedLesson.topic)?.color || COLORS.primary,
                    }]}
                  >
                    <Text style={styles.startBtnText}>
                      {selectedLesson.progress === 0 ? '▶ Start Lesson' :
                       selectedLesson.progress === 100 ? '🔁 Watch Again' :
                       '▶ Continue Lesson'}
                    </Text>
                  </TouchableOpacity>

                  <View style={{ height: 20 }} />
                </View>
              </ScrollView>
            )}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowLesson(false)}
            >
              <Text style={styles.closeBtnText}>Close</Text>
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
  content: { flex: 1 },
  section: { padding: 20, paddingBottom: 0 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: COLORS.text, marginBottom: 6 },
  sectionSub: { fontSize: 13, color: COLORS.textLight, marginBottom: 12 },
  continueCard: {
    backgroundColor: COLORS.white, borderRadius: 20,
    overflow: 'hidden', marginBottom: 16,
    shadowColor: '#000', shadowOpacity: 0.06,
    shadowRadius: 10, elevation: 3,
  },
  continueThumb: {
    height: 160, backgroundColor: '#F5EEFF',
    alignItems: 'center', justifyContent: 'center',
  },
  continueEmoji: { fontSize: 60 },
  playOverlay: {
    position: 'absolute',
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center', justifyContent: 'center',
  },
  playIcon: { fontSize: 22, color: COLORS.primary },
  continueInfo: { padding: 16 },
  continueTitle: { fontSize: 16, fontWeight: '800', color: COLORS.text, marginBottom: 8 },
  continueMeta: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  continueDuration: { fontSize: 13, color: COLORS.textLight },
  continueProgress: { fontSize: 13, fontWeight: '700' },
  progressBarBg: {
    height: 6, backgroundColor: COLORS.border,
    borderRadius: 3, overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%', backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  topicsGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    gap: 12, marginTop: 8, marginBottom: 8,
  },
  topicCard: {
    width: '47%', borderRadius: 20,
    padding: 20, alignItems: 'center',
    justifyContent: 'center',
  },
  topicCardSelected: {
    borderWidth: 3, borderColor: '#fff',
    shadowColor: '#000', shadowOpacity: 0.2,
    shadowRadius: 8, elevation: 6,
  },
  topicEmoji: { fontSize: 32, marginBottom: 8 },
  topicLabel: { fontSize: 14, fontWeight: '800', color: '#fff', textAlign: 'center' },
  lessonCard: {
    flexDirection: 'row', backgroundColor: COLORS.white,
    borderRadius: 16, overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.04,
    shadowRadius: 8, elevation: 2,
  },
  lessonThumb: {
    width: 110, alignItems: 'center',
    justifyContent: 'center', position: 'relative',
  },
  lessonEmoji: { fontSize: 36 },
  playBtn: {
    position: 'absolute',
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center', justifyContent: 'center',
  },
  playBtnIcon: { fontSize: 14, color: COLORS.primary },
  lessonInfo: { flex: 1, padding: 12 },
  lessonTitle: { fontSize: 14, fontWeight: '800', color: COLORS.text, marginBottom: 6 },
  topicTag: {
    alignSelf: 'flex-start', borderRadius: 50,
    paddingHorizontal: 10, paddingVertical: 4, marginBottom: 6,
  },
  topicTagText: { fontSize: 11, fontWeight: '700' },
  lessonMeta: { flexDirection: 'row', gap: 10 },
  lessonDuration: { fontSize: 11, color: COLORS.textLight },
  lessonViews: { fontSize: 11, color: COLORS.textLight },
  popularCard: {
    flexDirection: 'row', backgroundColor: COLORS.white,
    borderRadius: 16, overflow: 'hidden', marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.04,
    shadowRadius: 8, elevation: 2,
  },
  popularThumb: {
    width: 90, height: 90,
    alignItems: 'center', justifyContent: 'center',
  },
  popularEmoji: { fontSize: 32 },
  playBtnSmall: {
    position: 'absolute',
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center', justifyContent: 'center',
  },
  playBtnSmallIcon: { fontSize: 12, color: COLORS.primary },
  popularInfo: { flex: 1, padding: 12, justifyContent: 'center' },
  popularTitle: { fontSize: 14, fontWeight: '800', color: COLORS.text, marginBottom: 6 },
  expertCard: {
    backgroundColor: COLORS.white, borderRadius: 20,
    padding: 16, marginBottom: 12,
    borderWidth: 1.5,
    shadowColor: '#000', shadowOpacity: 0.04,
    shadowRadius: 8, elevation: 2,
  },
  expertTop: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  expertAvatar: {
    width: 52, height: 52, borderRadius: 26,
    alignItems: 'center', justifyContent: 'center',
  },
  expertEmoji: { fontSize: 28 },
  expertInfo: { flex: 1 },
  expertName: { fontSize: 15, fontWeight: '800', color: COLORS.text },
  expertRole: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  expertTopic: { fontSize: 14, color: COLORS.text, marginBottom: 14, lineHeight: 20 },
  expertBottom: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  registerBtn: {
    borderRadius: 50, paddingHorizontal: 20, paddingVertical: 10,
  },
  registerBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  nextSession: { flex: 1 },
  nextSessionLabel: { fontSize: 11, color: COLORS.textLight },
  nextSessionDate: { fontSize: 14, fontWeight: '800', marginTop: 2 },
  storyCard: {
    backgroundColor: COLORS.white, borderRadius: 16,
    padding: 16, marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.04,
    shadowRadius: 8, elevation: 2,
  },
  storyTop: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  storyAvatar: {
    width: 44, height: 44, borderRadius: 22,
    alignItems: 'center', justifyContent: 'center',
  },
  storyInitial: { color: '#fff', fontWeight: '800', fontSize: 18 },
  storyName: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  storyTopic: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  storyPreview: { fontSize: 14, color: COLORS.text, lineHeight: 20, marginBottom: 12 },
  storyBottom: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  storyLikes: { fontSize: 13, color: COLORS.textLight },
  storyComments: { fontSize: 13, color: COLORS.textLight },
  readMore: { fontSize: 13, fontWeight: '700', marginLeft: 'auto' },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: COLORS.white, borderTopLeftRadius: 28,
    borderTopRightRadius: 28, maxHeight: '92%',
  },
  modalHandle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: COLORS.border, alignSelf: 'center', marginTop: 12, marginBottom: 4,
  },
  videoPlaceholder: {
    height: 200, alignItems: 'center',
    justifyContent: 'center', position: 'relative',
  },
  videoEmoji: { fontSize: 64 },
  bigPlayBtn: {
    position: 'absolute',
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center', justifyContent: 'center',
  },
  bigPlayIcon: { fontSize: 28, color: COLORS.primary },
  videoDuration: {
    position: 'absolute', bottom: 12, right: 12,
    fontSize: 12, color: COLORS.textLight,
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8,
  },
  modalContent: { padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text, marginBottom: 8 },
  modalMeta: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  metaItem: { fontSize: 13, color: COLORS.textLight },
  modalProgressWrap: { marginBottom: 12 },
  progressLabel: { fontSize: 12, color: COLORS.textLight, marginTop: 6 },
  modalDesc: { fontSize: 14, color: COLORS.text, lineHeight: 22, marginBottom: 16 },
  keyPointsTitle: { fontSize: 15, fontWeight: '800', color: COLORS.text, marginBottom: 10 },
  keyPointRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 10, paddingVertical: 5,
  },
  keyPointDot: { width: 8, height: 8, borderRadius: 4, flexShrink: 0 },
  keyPointText: { fontSize: 14, color: COLORS.text, flex: 1 },
  startBtn: {
    borderRadius: 50, paddingVertical: 16,
    alignItems: 'center', marginTop: 20,
  },
  startBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  closeBtn: {
    margin: 16, marginTop: 8,
    borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 50, paddingVertical: 14, alignItems: 'center',
  },
  closeBtnText: { color: COLORS.textLight, fontWeight: '700', fontSize: 15 },
});
