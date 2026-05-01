import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar,
  Alert,
} from 'react-native';
import COLORS from './colors';

const COURSES = [
  {
    id: '1', title: 'Understanding Your Menstrual Cycle',
    category: 'Hormones', categoryColor: '#E74C3C',
    duration: '8:45', views: '24k', progress: 65,
    emoji: '🌸', level: 'Beginner',
    description: 'Learn everything about your cycle phases, hormones and what they mean for your health and wellbeing.',
    lessons: ['What is the menstrual cycle?', 'The 4 phases explained', 'Hormones and their roles', 'Tracking your cycle', 'When to see a doctor'],
  },
  {
    id: '2', title: 'First Trimester: What to Expect',
    category: 'Pregnancy', categoryColor: '#9B59B6',
    duration: '12:15', views: '31k', progress: 0,
    emoji: '👶', level: 'Beginner',
    description: 'A comprehensive guide to your first 12 weeks of pregnancy including symptoms, development and self care.',
    lessons: ['Week by week development', 'Common symptoms', 'Nutrition in pregnancy', 'Exercise guidelines', 'When to call your midwife'],
  },
  {
    id: '3', title: 'Managing PMS Symptoms Naturally',
    category: 'Wellness', categoryColor: '#27AE60',
    duration: '9:30', views: '18k', progress: 100,
    emoji: '🌿', level: 'Beginner',
    description: 'Natural and evidence-based approaches to managing PMS including diet, exercise and lifestyle changes.',
    lessons: ['What causes PMS?', 'Diet changes that help', 'Exercise and mood', 'Supplements and herbs', 'When PMS becomes PMDD'],
  },
  {
    id: '4', title: 'PCOS: Everything You Need to Know',
    category: 'Hormones', categoryColor: '#E74C3C',
    duration: '15:20', views: '42k', progress: 30,
    emoji: '🔄', level: 'Intermediate',
    description: 'Deep dive into Polycystic Ovary Syndrome — symptoms, diagnosis, treatment and living well with PCOS.',
    lessons: ['What is PCOS?', 'Symptoms and diagnosis', 'Hormonal imbalances', 'Diet for PCOS', 'Fertility and PCOS', 'Medical treatments'],
  },
  {
    id: '5', title: 'Endometriosis Explained',
    category: 'Hormones', categoryColor: '#E74C3C',
    duration: '11:00', views: '28k', progress: 0,
    emoji: '💊', level: 'Intermediate',
    description: 'Understanding endometriosis — what it is, how it affects you and what treatment options are available.',
    lessons: ['What is endometriosis?', 'Symptoms to watch for', 'Getting a diagnosis', 'Treatment options', 'Living with endometriosis'],
  },
  {
    id: '6', title: 'Nutrition for Hormonal Health',
    category: 'Nutrition', categoryColor: '#F59E0B',
    duration: '10:45', views: '19k', progress: 0,
    emoji: '🥗', level: 'Beginner',
    description: 'How food affects your hormones and practical tips for eating to support your cycle and overall health.',
    lessons: ['Foods that balance hormones', 'Anti-inflammatory diet', 'Supplements to consider', 'Meal planning for your cycle', 'Foods to avoid'],
  },
  {
    id: '7', title: 'Mental Health and Your Cycle',
    category: 'Mental Health', categoryColor: '#3498DB',
    duration: '13:30', views: '22k', progress: 0,
    emoji: '🧠', level: 'Beginner',
    description: 'Exploring the connection between hormones and mental health including anxiety, depression and PMDD.',
    lessons: ['Hormones and mood', 'Cycle linked anxiety', 'PMDD vs PMS', 'Coping strategies', 'When to seek help'],
  },
  {
    id: '8', title: 'Fertility Basics: Trying to Conceive',
    category: 'Fertility', categoryColor: '#C9748F',
    duration: '14:00', views: '35k', progress: 0,
    emoji: '🤰', level: 'Beginner',
    description: 'Everything you need to know about fertility, ovulation tracking and optimising your chances of conception.',
    lessons: ['Understanding ovulation', 'Tracking fertile days', 'Lifestyle factors', 'When to seek help', 'Fertility tests'],
  },
  {
    id: '9', title: 'Perimenopause and Menopause',
    category: 'Wellness', categoryColor: '#27AE60',
    duration: '16:20', views: '29k', progress: 0,
    emoji: '🌙', level: 'Intermediate',
    description: 'A guide to understanding and managing perimenopause and menopause including HRT and natural approaches.',
    lessons: ['What is perimenopause?', 'Common symptoms', 'HRT explained', 'Natural remedies', 'Bone and heart health'],
  },
  {
    id: '10', title: 'Birth Control Guide',
    category: 'Sexual Health', categoryColor: '#E67E22',
    duration: '18:00', views: '47k', progress: 0,
    emoji: '🛡️', level: 'Beginner',
    description: 'A complete guide to contraception options including hormonal, non-hormonal and emergency contraception.',
    lessons: ['Types of contraception', 'Hormonal methods', 'Non-hormonal options', 'Emergency contraception', 'Talking to your GP'],
  },
];

const CATEGORIES = ['All', 'Hormones', 'Pregnancy', 'Wellness', 'Nutrition', 'Mental Health', 'Fertility', 'Sexual Health'];

const ARTICLES = [
  { id: '1', title: '10 Signs Your Hormones Might Be Out of Balance', readTime: '5 min', emoji: '🔬', category: 'Hormones' },
  { id: '2', title: 'The Best Foods to Eat During Your Period', readTime: '4 min', emoji: '🥦', category: 'Nutrition' },
  { id: '3', title: 'How Stress Affects Your Menstrual Cycle', readTime: '6 min', emoji: '😤', category: 'Wellness' },
  { id: '4', title: 'What Your Discharge Is Telling You', readTime: '3 min', emoji: '💧', category: 'Health' },
  { id: '5', title: 'Exercise Through Your Cycle: A Guide', readTime: '7 min', emoji: '🏃', category: 'Fitness' },
];
export default function AcademyScreen({ onBack }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [completedLessons, setCompletedLessons] = useState({});

  const filteredCourses = COURSES.filter(c =>
    activeCategory === 'All' || c.category === activeCategory
  );

  const completedCourses = COURSES.filter(c => c.progress === 100).length;
  const inProgressCourses = COURSES.filter(c => c.progress > 0 && c.progress < 100).length;

  const toggleLesson = (courseId, lessonIndex) => {
    const key = `${courseId}-${lessonIndex}`;
    setCompletedLessons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF0F5" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Academy</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <View style={styles.modalOverlay}>
          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
              <View style={styles.modal}>
                <View style={styles.modalThumb}>
                  <Text style={styles.modalThumbEmoji}>{selectedCourse.emoji}</Text>
                </View>
                <View style={styles.modalContent}>
                  <View style={styles.modalMeta}>
                    <View style={[styles.catBadge, { backgroundColor: selectedCourse.categoryColor + '22' }]}>
                      <Text style={[styles.catBadgeText, { color: selectedCourse.categoryColor }]}>
                        {selectedCourse.category}
                      </Text>
                    </View>
                    <View style={styles.levelBadge}>
                      <Text style={styles.levelBadgeText}>{selectedCourse.level}</Text>
                    </View>
                  </View>
                  <Text style={styles.modalTitle}>{selectedCourse.title}</Text>
                  <View style={styles.modalStats}>
                    <Text style={styles.modalStat}>⏱ {selectedCourse.duration}</Text>
                    <Text style={styles.modalStat}>👁 {selectedCourse.views} views</Text>
                    <Text style={styles.modalStat}>📚 {selectedCourse.lessons.length} lessons</Text>
                  </View>
                  <Text style={styles.modalDesc}>{selectedCourse.description}</Text>

                  {selectedCourse.progress > 0 && (
                    <View style={styles.progressSection}>
                      <View style={styles.progressLabelRow}>
                        <Text style={styles.progressLabel}>Your Progress</Text>
                        <Text style={styles.progressPercent}>{selectedCourse.progress}%</Text>
                      </View>
                      <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${selectedCourse.progress}%` }]} />
                      </View>
                    </View>
                  )}

                  <Text style={styles.lessonsTitle}>📋 Lessons</Text>
                  {selectedCourse.lessons.map((lesson, i) => {
                    const key = `${selectedCourse.id}-${i}`;
                    const done = completedLessons[key] || (selectedCourse.progress === 100);
                    return (
                      <TouchableOpacity
                        key={i}
                        style={styles.lessonRow}
                        onPress={() => toggleLesson(selectedCourse.id, i)}
                      >
                        <View style={[styles.lessonCheck, done && styles.lessonCheckDone]}>
                          {done && <Text style={styles.lessonCheckText}>✓</Text>}
                        </View>
                        <Text style={[styles.lessonText, done && styles.lessonTextDone]}>
                          {i + 1}. {lesson}
                        </Text>
                        <Text style={styles.lessonDuration}>
                          {Math.floor(Math.random() * 3) + 1}:00
                        </Text>
                      </TouchableOpacity>
                    );
                  })}

                  <TouchableOpacity
                    style={styles.startBtn}
                    onPress={() => Alert.alert(
                      selectedCourse.progress > 0 ? 'Continue Learning 💜' : 'Start Course 💜',
                      'Video lessons coming soon! For now mark lessons complete as you learn.',
                      [{ text: 'Got it! 💜' }]
                    )}
                  >
                    <Text style={styles.startBtnText}>
                      {selectedCourse.progress === 100 ? '✅ Completed!' :
                        selectedCourse.progress > 0 ? '▶ Continue Learning' : '▶ Start Course'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => setSelectedCourse(null)}
                  >
                    <Text style={styles.closeBtnText}>← Back to Academy</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Progress Summary */}
        <View style={styles.progressCard}>
          <Text style={styles.progressCardTitle}>Your Learning Journey 🎓</Text>
          <View style={styles.progressStats}>
            <View style={styles.progressStat}>
              <Text style={styles.progressStatNum}>{completedCourses}</Text>
              <Text style={styles.progressStatLabel}>Completed</Text>
            </View>
            <View style={styles.progressDivider} />
            <View style={styles.progressStat}>
              <Text style={styles.progressStatNum}>{inProgressCourses}</Text>
              <Text style={styles.progressStatLabel}>In Progress</Text>
            </View>
            <View style={styles.progressDivider} />
            <View style={styles.progressStat}>
              <Text style={styles.progressStatNum}>{COURSES.length}</Text>
              <Text style={styles.progressStatLabel}>Total Courses</Text>
            </View>
          </View>
        </View>

        {/* Continue Learning */}
        {COURSES.filter(c => c.progress > 0 && c.progress < 100).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📈 Continue Learning</Text>
            {COURSES.filter(c => c.progress > 0 && c.progress < 100).map(course => (
              <TouchableOpacity
                key={course.id}
                style={styles.continueCard}
                onPress={() => setSelectedCourse(course)}
              >
                <View style={[styles.continueThumb, { backgroundColor: course.categoryColor + '22' }]}>
                  <Text style={styles.continueEmoji}>{course.emoji}</Text>
                </View>
                <View style={styles.continueInfo}>
                  <Text style={styles.continueTitle} numberOfLines={2}>{course.title}</Text>
                  <View style={styles.miniProgressBar}>
                    <View style={[styles.miniProgressFill, {
                      width: `${course.progress}%`,
                      backgroundColor: course.categoryColor,
                    }]} />
                  </View>
                  <Text style={styles.continueProgress}>{course.progress}% complete</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Category Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.catBtn, activeCategory === cat && styles.catBtnActive]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.catBtnText, activeCategory === cat && styles.catBtnTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Courses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⭐ Courses</Text>
          {filteredCourses.map(course => (
            <TouchableOpacity
              key={course.id}
              style={styles.courseCard}
              onPress={() => setSelectedCourse(course)}
            >
              <View style={styles.courseLeft}>
                <View style={[styles.courseThumb, { backgroundColor: course.categoryColor + '22' }]}>
                  <Text style={styles.courseEmoji}>{course.emoji}</Text>
                  {course.progress === 100 && (
                    <View style={styles.completedBadge}>
                      <Text style={styles.completedBadgeText}>✓</Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.courseInfo}>
                <View style={[styles.catBadgeSmall, { backgroundColor: course.categoryColor + '22' }]}>
                  <Text style={[styles.catBadgeSmallText, { color: course.categoryColor }]}>
                    {course.category}
                  </Text>
                </View>
                <Text style={styles.courseTitle} numberOfLines={2}>{course.title}</Text>
                <View style={styles.courseMeta}>
                  <Text style={styles.courseMetaText}>⏱ {course.duration}</Text>
                  <Text style={styles.courseMetaText}>👁 {course.views}</Text>
                  <Text style={styles.courseMetaText}>📚 {course.lessons.length}</Text>
                </View>
                {course.progress > 0 && (
                  <View style={styles.miniProgressBar}>
                    <View style={[styles.miniProgressFill, {
                      width: `${course.progress}%`,
                      backgroundColor: course.categoryColor,
                    }]} />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Articles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📖 Quick Reads</Text>
          {ARTICLES.map(article => (
            <TouchableOpacity
              key={article.id}
              style={styles.articleCard}
              onPress={() => Alert.alert(article.title, 'Full article coming soon! 💜')}
            >
              <View style={styles.articleLeft}>
                <Text style={styles.articleEmoji}>{article.emoji}</Text>
              </View>
              <View style={styles.articleInfo}>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <View style={styles.articleMeta}>
                  <Text style={styles.articleReadTime}>⏱ {article.readTime} read</Text>
                  <View style={styles.articleCatBadge}>
                    <Text style={styles.articleCatText}>{article.category}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.articleArrow}>→</Text>
            </TouchableOpacity>
          ))}
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
  modalThumb: {
    height: 200, backgroundColor: '#F9EEF3',
    alignItems: 'center', justifyContent: 'center',
  },
  modalThumbEmoji: { fontSize: 80 },
  modalContent: { padding: 20 },
  modalMeta: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  catBadge: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  catBadgeText: { fontSize: 12, fontWeight: '700' },
  levelBadge: {
    backgroundColor: '#EDE0E8', borderRadius: 10,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  levelBadgeText: { fontSize: 12, fontWeight: '700', color: '#9B8FA0' },
  modalTitle: { fontSize: 22, fontWeight: '800', color: '#2D1B2E', marginBottom: 10 },
  modalStats: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  modalStat: { fontSize: 13, color: '#9B8FA0', fontWeight: '600' },
  modalDesc: { fontSize: 14, color: '#2D1B2E', lineHeight: 22, marginBottom: 16 },
  progressSection: { marginBottom: 16 },
  progressLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressLabel: { fontSize: 14, fontWeight: '700', color: '#2D1B2E' },
  progressPercent: { fontSize: 14, fontWeight: '800', color: '#C9748F' },
  progressBar: { height: 8, backgroundColor: '#EDE0E8', borderRadius: 4 },
  progressFill: { height: 8, backgroundColor: '#C9748F', borderRadius: 4 },
  lessonsTitle: { fontSize: 16, fontWeight: '800', color: '#2D1B2E', marginBottom: 12 },
  lessonRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 8,
  },
  lessonCheck: {
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 2, borderColor: '#EDE0E8',
    alignItems: 'center', justifyContent: 'center',
  },
  lessonCheckDone: { backgroundColor: '#C9748F', borderColor: '#C9748F' },
  lessonCheckText: { color: '#fff', fontSize: 12, fontWeight: '800' },
  lessonText: { flex: 1, fontSize: 14, color: '#2D1B2E', fontWeight: '600' },
  lessonTextDone: { color: '#9B8FA0', textDecorationLine: 'line-through' },
  lessonDuration: { fontSize: 12, color: '#9B8FA0' },
  startBtn: {
    backgroundColor: '#C9748F', borderRadius: 50,
    paddingVertical: 16, alignItems: 'center', marginTop: 16, marginBottom: 10,
  },
  startBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  closeBtn: {
    borderWidth: 1.5, borderColor: '#EDE0E8', borderRadius: 50,
    paddingVertical: 14, alignItems: 'center', marginBottom: 20,
  },
  closeBtnText: { color: '#9B8FA0', fontWeight: '700', fontSize: 15 },
  progressCard: {
    backgroundColor: '#2D1B2E', borderRadius: 20,
    marginHorizontal: 20, marginBottom: 16, padding: 20,
  },
  progressCardTitle: { fontSize: 16, fontWeight: '800', color: '#fff', marginBottom: 16 },
  progressStats: { flexDirection: 'row', alignItems: 'center' },
  progressStat: { flex: 1, alignItems: 'center' },
  progressStatNum: { fontSize: 28, fontWeight: '800', color: '#C9748F' },
  progressStatLabel: { fontSize: 12, color: '#9B8FA0', marginTop: 4 },
  progressDivider: { width: 1, height: 40, backgroundColor: '#9B8FA0' },
  section: { marginHorizontal: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#2D1B2E', marginBottom: 12 },
  continueCard: {
    flexDirection: 'row', backgroundColor: '#fff',
    borderRadius: 16, padding: 12, marginBottom: 10,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
    gap: 12, alignItems: 'center',
  },
  continueThumb: {
    width: 60, height: 60, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  continueEmoji: { fontSize: 28 },
  continueInfo: { flex: 1 },
  continueTitle: { fontSize: 14, fontWeight: '700', color: '#2D1B2E', marginBottom: 8 },
  miniProgressBar: { height: 4, backgroundColor: '#EDE0E8', borderRadius: 2, marginBottom: 4 },
  miniProgressFill: { height: 4, borderRadius: 2 },
  continueProgress: { fontSize: 11, color: '#9B8FA0', fontWeight: '600' },
  catScroll: { paddingLeft: 20, marginBottom: 16 },
  catBtn: {
    backgroundColor: '#fff', borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 8,
    marginRight: 8, borderWidth: 1.5, borderColor: '#EDE0E8',
  },
  catBtnActive: { backgroundColor: '#C9748F', borderColor: '#C9748F' },
  catBtnText: { fontSize: 13, fontWeight: '600', color: '#9B8FA0' },
  catBtnTextActive: { color: '#fff' },
  courseCard: {
    flexDirection: 'row', backgroundColor: '#fff',
    borderRadius: 16, marginBottom: 10, overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  courseLeft: { padding: 12 },
  courseThumb: {
    width: 70, height: 70, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  courseEmoji: { fontSize: 32 },
  completedBadge: {
    position: 'absolute', top: -4, right: -4,
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: '#27AE60', alignItems: 'center', justifyContent: 'center',
  },
  completedBadgeText: { color: '#fff', fontSize: 11, fontWeight: '800' },
  courseInfo: { flex: 1, padding: 12, paddingLeft: 0 },
  catBadgeSmall: { alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, marginBottom: 4 },
  catBadgeSmallText: { fontSize: 10, fontWeight: '700' },
  courseTitle: { fontSize: 14, fontWeight: '700', color: '#2D1B2E', marginBottom: 6 },
  courseMeta: { flexDirection: 'row', gap: 10, marginBottom: 6 },
  courseMetaText: { fontSize: 11, color: '#9B8FA0' },
  articleCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 16,
    padding: 14, marginBottom: 8, gap: 12,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  articleLeft: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: '#F9EEF3', alignItems: 'center', justifyContent: 'center',
  },
  articleEmoji: { fontSize: 22 },
  articleInfo: { flex: 1 },
  articleTitle: { fontSize: 14, fontWeight: '700', color: '#2D1B2E', marginBottom: 4 },
  articleMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  articleReadTime: { fontSize: 12, color: '#9B8FA0' },
  articleCatBadge: { backgroundColor: '#F9EEF3', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  articleCatText: { fontSize: 11, color: '#C9748F', fontWeight: '700' },
  articleArrow: { fontSize: 18, color: '#C9748F', fontWeight: '700' },
});
