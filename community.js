import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar,
  Alert, Animated,
} from 'react-native';
import COLORS from './colors';

const TOPICS = [
  {
    id: '1', title: 'Hormones\n& Cycle', emoji: '🌸',
    gradient: ['#E74C3C', '#C0392B'], fullTitle: 'Hormones & Cycle',
    description: 'Understanding your hormones is the key to understanding your body. Learn how oestrogen, progesterone and testosterone affect your cycle, mood, energy and overall health.',
    articles: [
      { title: 'The 4 Phases of Your Cycle Explained', readTime: '5 min', emoji: '🔄' },
      { title: 'How Oestrogen Affects Your Mood', readTime: '4 min', emoji: '😊' },
      { title: 'Signs Your Hormones Are Out of Balance', readTime: '6 min', emoji: '⚠️' },
      { title: 'Foods That Balance Your Hormones', readTime: '5 min', emoji: '🥗' },
      { title: 'Cycle Syncing: Work With Your Hormones', readTime: '7 min', emoji: '📅' },
    ],
    tips: ['Track your cycle for at least 3 months to see patterns', 'Note mood changes throughout your cycle', 'Eat iron-rich foods during your period'],
  },
  {
    id: '2', title: 'Pregnancy\nCare', emoji: '🤰',
    gradient: ['#9B59B6', '#8E44AD'], fullTitle: 'Pregnancy Care',
    description: 'Everything you need to know about pregnancy from conception to birth. Week by week guidance, symptom management and expert advice for every stage of your journey.',
    articles: [
      { title: 'First Trimester: Week by Week Guide', readTime: '8 min', emoji: '👶' },
      { title: 'Essential Nutrients During Pregnancy', readTime: '5 min', emoji: '💊' },
      { title: 'Managing Morning Sickness Naturally', readTime: '4 min', emoji: '🤢' },
      { title: 'Safe Exercises During Pregnancy', readTime: '6 min', emoji: '🏃' },
      { title: 'Preparing Your Birth Plan', readTime: '7 min', emoji: '📋' },
    ],
    tips: ['Take folic acid before and during pregnancy', 'Attend all prenatal appointments', 'Stay hydrated and rest when needed'],
  },
  {
    id: '3', title: 'Mental\nHealth', emoji: '🧠',
    gradient: ['#3498DB', '#2980B9'], fullTitle: 'Mental Health',
    description: 'Your mental health is just as important as your physical health. Explore the connection between hormones and mood, and discover evidence-based strategies for emotional wellbeing.',
    articles: [
      { title: 'How Your Cycle Affects Your Mental Health', readTime: '6 min', emoji: '🔄' },
      { title: 'Understanding PMDD vs PMS', readTime: '5 min', emoji: '📊' },
      { title: 'Anxiety Management Techniques', readTime: '7 min', emoji: '😮‍💨' },
      { title: 'When to Seek Professional Help', readTime: '4 min', emoji: '👩‍⚕️' },
      { title: 'Building Emotional Resilience', readTime: '8 min', emoji: '💪' },
    ],
    tips: ['Practice mindfulness for 10 minutes daily', 'Track mood alongside your cycle', 'Reach out for support when needed'],
  },
  {
    id: '4', title: 'Birth\nControl', emoji: '💊',
    gradient: ['#27AE60', '#229954'], fullTitle: 'Birth Control',
    description: 'A comprehensive guide to contraception options available to women. Understand the benefits, side effects and effectiveness of each method to make an informed choice.',
    articles: [
      { title: 'Complete Guide to Contraception', readTime: '10 min', emoji: '📖' },
      { title: 'Hormonal vs Non-Hormonal Options', readTime: '6 min', emoji: '⚖️' },
      { title: 'The Pill: Benefits and Side Effects', readTime: '5 min', emoji: '💊' },
      { title: 'IUD: Everything You Need to Know', readTime: '7 min', emoji: '🔩' },
      { title: 'Emergency Contraception Guide', readTime: '4 min', emoji: '🚨' },
    ],
    tips: ['Talk to your GP about the best option for you', 'No contraception is 100% effective', 'Regular STI testing is recommended'],
  },
  {
    id: '5', title: 'Nutrition', emoji: '🥗',
    gradient: ['#F39C12', '#E67E22'], fullTitle: 'Nutrition & Health',
    description: 'Nutrition plays a vital role in hormonal health, cycle regulation and overall wellbeing. Learn which foods support your body through every phase of your cycle.',
    articles: [
      { title: 'Eating for Your Cycle Phases', readTime: '7 min', emoji: '🌸' },
      { title: 'Iron-Rich Foods for Your Period', readTime: '4 min', emoji: '🥩' },
      { title: 'Anti-Inflammatory Diet for Women', readTime: '6 min', emoji: '🫐' },
      { title: 'Supplements for Hormonal Health', readTime: '5 min', emoji: '💊' },
      { title: 'Gut Health and Hormones Connection', readTime: '8 min', emoji: '🦠' },
    ],
    tips: ['Eat plenty of iron during your period', 'Magnesium helps reduce PMS symptoms', 'Stay hydrated throughout your cycle'],
  },
  {
    id: '6', title: 'Intimacy\nHealth', emoji: '💜',
    gradient: ['#C9748F', '#A85570'], fullTitle: 'Intimacy Health',
    description: 'Intimacy and sexual health are important parts of overall wellbeing. Explore topics around desire, relationships, sexual health and body confidence in a safe space.',
    articles: [
      { title: 'Understanding Your Libido & Hormones', readTime: '6 min', emoji: '🔄' },
      { title: 'Pelvic Floor Health Guide', readTime: '5 min', emoji: '💪' },
      { title: 'Communication in Relationships', readTime: '7 min', emoji: '💬' },
      { title: 'Sexual Health: STI Guide', readTime: '8 min', emoji: '🏥' },
      { title: 'Body Confidence & Self-Love', readTime: '5 min', emoji: '✨' },
    ],
    tips: ['Pelvic floor exercises benefit all women', 'Open communication strengthens relationships', 'Regular sexual health checks are important'],
  },
];

const POPULAR = [
  { id: '1', title: 'What Happens During Your Cycle', category: 'Hormones', categoryColor: '#E74C3C', duration: '6:22', views: '12k', emoji: '🔬' },
  { id: '2', title: 'First Trimester: What to Expect', category: 'Pregnancy', categoryColor: '#9B59B6', duration: '12:15', views: '28k', emoji: '👶' },
  { id: '3', title: 'Managing PMS Symptoms', category: 'Wellness', categoryColor: '#27AE60', duration: '9:30', views: '15k', emoji: '🌿' },
];

const POSTS = [
  { id: '1', name: 'Jessica M.', initial: 'J', color: '#9B59B6', topic: 'First Trimester Journey', content: 'Week 12 update: Morning sickness finally subsiding! Here\'s what helped me...', likes: 234, comments: 45 },
  { id: '2', name: 'Amanda K.', initial: 'A', color: '#3498DB', topic: 'PCOS Management', content: 'My experience with diet changes and cycle regulation over 6 months', likes: 189, comments: 67 },
];

function TopicTile({ topic, onTopicPress }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bounce = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, { toValue: -6, duration: 1200, useNativeDriver: true }),
        Animated.timing(bounceAnim, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ])
    );
    const delay = parseInt(topic.id) * 200;
    setTimeout(() => bounce.start(), delay);
    return () => bounce.stop();
  }, []);

  const onPressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.92, useNativeDriver: true }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
  };

  return (
    <TouchableOpacity
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={() => onTopicPress && onTopicPress(topic)}
      activeOpacity={1}
    >
      <Animated.View style={[
        styles.topicTile,
        { backgroundColor: topic.gradient[0] },
        { transform: [{ scale: scaleAnim }, { translateY: bounceAnim }] }
      ]}>
        <Animated.Text style={[styles.topicEmoji, { transform: [{ translateY: bounceAnim }] }]}>
          {topic.emoji}
        </Animated.Text>
        <Text style={styles.topicTitle}>{topic.title}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}
function TopicDetailScreen({ topic, onBack }) {
  const [savedArticles, setSavedArticles] = useState([]);

  const toggleSave = (title) => {
    setSavedArticles(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#FAF0F5' }]}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <View style={[styles.topicHero, { backgroundColor: topic.gradient[0] }]}>
          <TouchableOpacity onPress={onBack} style={styles.topicBackBtn}>
            <Text style={styles.topicBackText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.topicHeroEmoji}>{topic.emoji}</Text>
          <Text style={styles.topicHeroTitle}>{topic.fullTitle}</Text>
        </View>

        {/* Description */}
        <View style={styles.topicDescCard}>
          <Text style={styles.topicDescText}>{topic.description}</Text>
        </View>

        {/* Quick Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Quick Tips</Text>
          {topic.tips.map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <View style={[styles.tipDot, { backgroundColor: topic.gradient[0] }]} />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Articles */}
        <View style={styles.articlesSection}>
          <Text style={styles.articlesSectionTitle}>📚 Articles & Guides</Text>
          {topic.articles.map((article, i) => (
            <TouchableOpacity
              key={i}
              style={styles.articleCard}
              onPress={() => Alert.alert(article.title, 'Full article coming soon! 💜\n\nWe are adding new content every week.')}
            >
              <View style={[styles.articleIconBox, { backgroundColor: topic.gradient[0] + '22' }]}>
                <Text style={styles.articleEmoji}>{article.emoji}</Text>
              </View>
              <View style={styles.articleInfo}>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articleReadTime}>⏱ {article.readTime} read</Text>
              </View>
              <TouchableOpacity onPress={() => toggleSave(article.title)}>
                <Text style={styles.articleSave}>
                  {savedArticles.includes(article.title) ? '💜' : '🤍'}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Ask Bella */}
        <TouchableOpacity
          style={[styles.bellaCard, { backgroundColor: topic.gradient[0] }]}
          onPress={() => Alert.alert('Ask Bella 💜', 'Go to the AI Chat tab to ask Bella about ' + topic.fullTitle)}
        >
          <Text style={styles.bellaCardEmoji}>🤖</Text>
          <View style={styles.bellaCardInfo}>
            <Text style={styles.bellaCardTitle}>Ask Bella About This</Text>
            <Text style={styles.bellaCardSub}>Get personalised answers from your AI nurse</Text>
          </View>
          <Text style={styles.bellaCardArrow}>→</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default function CommunityScreen({ userName, userPlan, onNavigate }) {
  const [likedPosts, setLikedPosts] = useState({});
  const [selectedTopic, setSelectedTopic] = useState(null);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 0.65, duration: 1500, useNativeDriver: false,
    }).start();
  }, []);

  const toggleLike = (id) => {
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1], outputRange: ['0%', '100%'],
  });

  if (selectedTopic) {
    return <TopicDetailScreen topic={selectedTopic} onBack={() => setSelectedTopic(null)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF0F5" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Bellava Academy</Text>
          <Text style={styles.headerSub}>Learn about your health journey ✨</Text>
        </View>

        {/* Continue Learning */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionIcon}>📈</Text>
            <Text style={styles.sectionTitle}>Continue Learning</Text>
          </View>
          <TouchableOpacity
            style={styles.videoCard}
            onPress={() => Alert.alert('Video Player 💜', 'Video lessons coming soon!')}
          >
            <View style={styles.videoThumb}>
              <View style={styles.playBtn}>
                <Text style={styles.playIcon}>▶</Text>
              </View>
            </View>
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle}>Understanding Your Menstrual Cycle</Text>
              <View style={styles.videoMeta}>
                <Text style={styles.videoDuration}>⏱ 8:45</Text>
                <Text style={styles.videoDot}>•</Text>
                <Text style={styles.videoProgress}>65% complete</Text>
              </View>
              <View style={styles.progressBarWrap}>
                <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Explore Topics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore Topics</Text>
          <Text style={styles.sectionSub}>Tap to explore each topic 💜</Text>
          <View style={styles.topicsGrid}>
            {TOPICS.map(topic => (
              <TopicTile
                key={topic.id}
                topic={topic}
                onTopicPress={(t) => setSelectedTopic(t)}
              />
            ))}
          </View>
        </View>

        {/* Popular This Week */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionIcon}>⭐</Text>
            <Text style={styles.sectionTitle}>Popular This Week</Text>
          </View>
          {POPULAR.map(video => (
            <TouchableOpacity
              key={video.id}
              style={styles.popularCard}
              onPress={() => Alert.alert(video.title, 'Full video coming soon! 💜')}
            >
              <View style={styles.popularThumb}>
                <Text style={styles.popularEmoji}>{video.emoji}</Text>
                <View style={styles.popularPlayBtn}>
                  <Text style={styles.popularPlayIcon}>▶</Text>
                </View>
              </View>
              <View style={styles.popularInfo}>
                <Text style={styles.popularTitle}>{video.title}</Text>
                <View style={[styles.categoryBadge, { backgroundColor: video.categoryColor + '22' }]}>
                  <Text style={[styles.categoryText, { color: video.categoryColor }]}>{video.category}</Text>
                </View>
                <View style={styles.popularMeta}>
                  <Text style={styles.popularDuration}>⏱ {video.duration}</Text>
                  <Text style={styles.popularDot}>•</Text>
                  <Text style={styles.popularViews}>{video.views} views</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Expert Session */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ask Our Experts</Text>
          <View style={styles.expertCard}>
            <View style={styles.expertTop}>
              <View style={styles.expertAvatar}>
                <Text style={styles.expertEmoji}>👩‍⚕️</Text>
              </View>
              <View style={styles.expertInfo}>
                <Text style={styles.expertName}>Live Expert Session</Text>
                <Text style={styles.expertRole}>Dr. Emily Chen • OB/GYN</Text>
              </View>
            </View>
            <Text style={styles.expertDesc}>
              Join our monthly live Q&A about fertility, pregnancy, and women's health.
            </Text>
            <View style={styles.expertFooter}>
              <TouchableOpacity
                style={styles.registerBtn}
                onPress={() => Alert.alert('Registered! 💜', 'We will remind you before the session.')}
              >
                <Text style={styles.registerBtnText}>Register Now</Text>
              </TouchableOpacity>
              <View style={styles.nextSession}>
                <Text style={styles.nextLabel}>Next Session</Text>
                <Text style={styles.nextDate}>May 8, 7 PM</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Community Stories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Community Stories</Text>
          {POSTS.map(post => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <View style={[styles.avatar, { backgroundColor: post.color }]}>
                  <Text style={styles.avatarText}>{post.initial}</Text>
                </View>
                <View>
                  <Text style={styles.postName}>{post.name}</Text>
                  <Text style={styles.postTopic}>{post.topic}</Text>
                </View>
              </View>
              <Text style={styles.postContent}>{post.content}</Text>
              <View style={styles.postFooter}>
                <TouchableOpacity style={styles.actionBtn} onPress={() => toggleLike(post.id)}>
                  <Text style={styles.actionIcon}>{likedPosts[post.id] ? '❤️' : '🤍'}</Text>
                  <Text style={styles.actionText}>{likedPosts[post.id] ? post.likes + 1 : post.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={styles.actionIcon}>💬</Text>
                  <Text style={styles.actionText}>{post.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.readMoreBtn}
                  onPress={() => Alert.alert(post.name, post.content)}
                >
                  <Text style={styles.readMoreText}>Read More →</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF0F5' },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#C9748F' },
  headerSub: { fontSize: 14, color: '#9B8FA0', marginTop: 2 },
  section: { marginBottom: 24, paddingHorizontal: 20 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  sectionIcon: { fontSize: 18 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#2D1B2E', marginBottom: 4 },
  sectionSub: { fontSize: 13, color: '#9B8FA0', marginBottom: 12 },
  videoCard: {
    backgroundColor: '#fff', borderRadius: 20,
    overflow: 'hidden', shadowColor: '#C9748F',
    shadowOpacity: 0.1, shadowRadius: 12, elevation: 4,
  },
  videoThumb: {
    height: 160, backgroundColor: '#E8D5E8',
    alignItems: 'center', justifyContent: 'center',
  },
  playBtn: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8, elevation: 4,
  },
  playIcon: { fontSize: 20, color: '#C9748F', marginLeft: 4 },
  videoInfo: { padding: 16 },
  videoTitle: { fontSize: 16, fontWeight: '800', color: '#2D1B2E', marginBottom: 8 },
  videoMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  videoDuration: { fontSize: 13, color: '#9B8FA0' },
  videoDot: { color: '#9B8FA0' },
  videoProgress: { fontSize: 13, color: '#C9748F', fontWeight: '700' },
  progressBarWrap: { height: 6, backgroundColor: '#EDE0E8', borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: 6, backgroundColor: '#C9748F', borderRadius: 3 },
  topicsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  topicTile: {
    width: 155, height: 140, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
    padding: 12, shadowColor: '#000',
    shadowOpacity: 0.15, shadowRadius: 8, elevation: 4,
  },
  topicEmoji: { fontSize: 40, marginBottom: 8 },
  topicTitle: { fontSize: 14, fontWeight: '800', color: '#fff', textAlign: 'center', lineHeight: 20 },
  popularCard: {
    flexDirection: 'row', backgroundColor: '#fff',
    borderRadius: 16, marginBottom: 12, overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  popularThumb: {
    width: 90, height: 90, backgroundColor: '#E8D5E8',
    alignItems: 'center', justifyContent: 'center',
  },
  popularEmoji: { fontSize: 32 },
  popularPlayBtn: {
    position: 'absolute', bottom: 6, right: 6,
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
  },
  popularPlayIcon: { fontSize: 10, color: '#C9748F', marginLeft: 2 },
  popularInfo: { flex: 1, padding: 12, justifyContent: 'center' },
  popularTitle: { fontSize: 14, fontWeight: '700', color: '#2D1B2E', marginBottom: 6 },
  categoryBadge: { alignSelf: 'flex-start', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 3, marginBottom: 6 },
  categoryText: { fontSize: 11, fontWeight: '700' },
  popularMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  popularDuration: { fontSize: 12, color: '#9B8FA0' },
  popularDot: { color: '#9B8FA0', fontSize: 12 },
  popularViews: { fontSize: 12, color: '#9B8FA0' },
  expertCard: {
    backgroundColor: '#fff', borderRadius: 20, padding: 16,
    borderWidth: 2, borderColor: '#4CAF82',
    shadowColor: '#4CAF82', shadowOpacity: 0.1, shadowRadius: 8, elevation: 3,
  },
  expertTop: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  expertAvatar: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: '#4CAF82', alignItems: 'center', justifyContent: 'center',
  },
  expertEmoji: { fontSize: 26 },
  expertInfo: { flex: 1 },
  expertName: { fontSize: 16, fontWeight: '800', color: '#2D1B2E' },
  expertRole: { fontSize: 13, color: '#9B8FA0' },
  expertDesc: { fontSize: 14, color: '#2D1B2E', lineHeight: 22, marginBottom: 14 },
  expertFooter: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  registerBtn: {
    backgroundColor: '#4CAF82', borderRadius: 50,
    paddingHorizontal: 20, paddingVertical: 10,
  },
  registerBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  nextSession: {
    backgroundColor: '#F0FBF6', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 8,
  },
  nextLabel: { fontSize: 11, color: '#9B8FA0' },
  nextDate: { fontSize: 13, fontWeight: '700', color: '#4CAF82' },
  postCard: {
    backgroundColor: '#fff', borderRadius: 20, padding: 16,
    marginBottom: 12, shadowColor: '#000',
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  postHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  avatar: {
    width: 42, height: 42, borderRadius: 21,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  postName: { fontSize: 15, fontWeight: '700', color: '#2D1B2E' },
  postTopic: { fontSize: 12, color: '#9B8FA0' },
  postContent: { fontSize: 14, color: '#2D1B2E', lineHeight: 22, marginBottom: 12 },
  postFooter: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actionIcon: { fontSize: 16 },
  actionText: { fontSize: 13, fontWeight: '600', color: '#9B8FA0' },
  readMoreBtn: { marginLeft: 'auto' },
  readMoreText: { fontSize: 13, fontWeight: '700', color: '#C9748F' },
  topicHero: {
    height: 220, alignItems: 'center', justifyContent: 'center',
    paddingTop: 20,
  },
  topicBackBtn: {
    position: 'absolute', top: 16, left: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6,
  },
  topicBackText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  topicHeroEmoji: { fontSize: 72, marginBottom: 8 },
  topicHeroTitle: { fontSize: 26, fontWeight: '800', color: '#fff', textAlign: 'center' },
  topicDescCard: {
    backgroundColor: '#fff', borderRadius: 20,
    marginHorizontal: 20, marginTop: -20, marginBottom: 16,
    padding: 16, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
  },
  topicDescText: { fontSize: 15, color: '#2D1B2E', lineHeight: 24 },
  tipsCard: {
    backgroundColor: '#fff', borderRadius: 20,
    marginHorizontal: 20, marginBottom: 16, padding: 16,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  tipsTitle: { fontSize: 16, fontWeight: '800', color: '#2D1B2E', marginBottom: 12 },
  tipRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  tipDot: { width: 8, height: 8, borderRadius: 4 },
  tipText: { flex: 1, fontSize: 14, color: '#2D1B2E', lineHeight: 20 },
  articlesSection: { marginHorizontal: 20, marginBottom: 16 },
  articlesSectionTitle: { fontSize: 18, fontWeight: '800', color: '#2D1B2E', marginBottom: 12 },
  articleCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 16,
    padding: 14, marginBottom: 8, gap: 12,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  articleIconBox: {
    width: 48, height: 48, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  articleEmoji: { fontSize: 24 },
  articleInfo: { flex: 1 },
  articleTitle: { fontSize: 14, fontWeight: '700', color: '#2D1B2E', marginBottom: 4 },
  articleReadTime: { fontSize: 12, color: '#9B8FA0' },
  articleSave: { fontSize: 22 },
  bellaCard: {
    marginHorizontal: 20, marginBottom: 20,
    borderRadius: 20, padding: 16,
    flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  bellaCardEmoji: { fontSize: 32 },
  bellaCardInfo: { flex: 1 },
  bellaCardTitle: { fontSize: 16, fontWeight: '800', color: '#fff' },
  bellaCardSub: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  bellaCardArrow: { fontSize: 22, color: '#fff', fontWeight: '700' },
});
