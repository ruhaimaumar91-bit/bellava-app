import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput, SafeAreaView,
  StatusBar, Alert,
} from 'react-native';
import COLORS from './colors';

const CATEGORIES = ['All', 'Cycle', 'Pregnancy', 'PCOS', 'Mental Health', 'Nutrition'];

const POSTS = [
  {
    id: '1', name: 'Jessica M.', initial: 'J', color: '#C9748F',
    topic: 'First Trimester Journey', time: '2h ago',
    content: 'Week 12 update: Morning sickness finally subsiding! Here\'s what helped me get through the worst weeks...',
    likes: 234, comments: 45, category: 'Pregnancy',
  },
  {
    id: '2', name: 'Amanda K.', initial: 'A', color: '#7B6B9E',
    topic: 'PCOS Management', time: '4h ago',
    content: 'My experience with diet changes and cycle regulation over 6 months. The results honestly surprised me...',
    likes: 189, comments: 67, category: 'PCOS',
  },
  {
    id: '3', name: 'Sarah L.', initial: 'S', color: '#4CAF82',
    topic: 'Cycle Tracking Tips', time: '6h ago',
    content: 'After 8 months of tracking I finally understand my body\'s patterns. Here are the 5 things I wish I knew sooner...',
    likes: 312, comments: 89, category: 'Cycle',
  },
  {
    id: '4', name: 'Priya R.', initial: 'P', color: '#E8A598',
    topic: 'Mental Health & Hormones', time: '8h ago',
    content: 'Nobody talks about how much hormones affect your mood. Sharing my journey with cycle-linked anxiety and what actually helped...',
    likes: 445, comments: 102, category: 'Mental Health',
  },
  {
    id: '5', name: 'Maria T.', initial: 'M', color: '#F59E0B',
    topic: 'Nutrition for Fertility', time: '12h ago',
    content: 'I changed my diet 3 months before TTC and here is exactly what I ate. Sharing my full meal plan...',
    likes: 267, comments: 54, category: 'Nutrition',
  },
];

const EXPERT = {
  name: 'Dr. Emily Chen',
  role: 'OB/GYN Specialist',
  emoji: '👩‍⚕️',
  date: 'May 8, 7 PM',
  topic: 'Join our monthly live Q&A about fertility, pregnancy, and women\'s health.',
};
export default function CommunityScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [likedPosts, setLikedPosts] = useState({});
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostText, setNewPostText] = useState('');

  const toggleLike = (id) => {
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredPosts = POSTS.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.content.toLowerCase().includes(searchText.toLowerCase()) ||
      post.name.toLowerCase().includes(searchText.toLowerCase()) ||
      post.topic.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF0F5" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Community 💜</Text>
          <Text style={styles.headerSub}>Connect with women like you</Text>
        </View>
        <TouchableOpacity style={styles.newPostBtn} onPress={() => setShowNewPost(!showNewPost)}>
          <Text style={styles.newPostBtnText}>+ Post</Text>
        </TouchableOpacity>
      </View>

      {/* New Post Box */}
      {showNewPost && (
        <View style={styles.newPostBox}>
          <TextInput
            style={styles.newPostInput}
            placeholder="Share your experience with the community... 💜"
            placeholderTextColor={COLORS.textLight}
            multiline
            value={newPostText}
            onChangeText={setNewPostText}
          />
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={() => {
              if (newPostText.trim()) {
                Alert.alert('Posted! 💜', 'Your post has been shared with the community.');
                setNewPostText('');
                setShowNewPost(false);
              }
            }}
          >
            <Text style={styles.submitBtnText}>Share with Community</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Search */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search stories, topics..."
            placeholderTextColor={COLORS.textLight}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.catBtn, activeCategory === cat && styles.catBtnActive]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.catText, activeCategory === cat && styles.catTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Expert Session Card */}
        <View style={styles.expertCard}>
          <View style={styles.expertLeft}>
            <View style={styles.expertAvatar}>
              <Text style={styles.expertEmoji}>{EXPERT.emoji}</Text>
            </View>
            <View style={styles.expertInfo}>
              <Text style={styles.expertName}>{EXPERT.name}</Text>
              <Text style={styles.expertRole}>{EXPERT.role}</Text>
            </View>
          </View>
          <View style={styles.expertBody}>
            <Text style={styles.expertTopic}>{EXPERT.topic}</Text>
            <View style={styles.expertFooter}>
              <TouchableOpacity style={styles.registerBtn}
                onPress={() => Alert.alert('Registered! 💜', 'We will remind you before the session.')}>
                <Text style={styles.registerBtnText}>Register Now</Text>
              </TouchableOpacity>
              <View style={styles.nextSession}>
                <Text style={styles.nextSessionLabel}>Next Session</Text>
                <Text style={styles.nextSessionDate}>{EXPERT.date}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Section Title */}
        <Text style={styles.sectionTitle}>Community Stories</Text>

        {/* Posts */}
        {filteredPosts.map(post => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={[styles.avatar, { backgroundColor: post.color }]}>
                <Text style={styles.avatarText}>{post.initial}</Text>
              </View>
              <View style={styles.postMeta}>
                <Text style={styles.postName}>{post.name}</Text>
                <Text style={styles.postTopic}>{post.topic}</Text>
              </View>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>
            <Text style={styles.postContent}>{post.content}</Text>
            <View style={styles.postFooter}>
              <TouchableOpacity style={styles.actionBtn} onPress={() => toggleLike(post.id)}>
                <Text style={styles.actionIcon}>{likedPosts[post.id] ? '❤️' : '🤍'}</Text>
                <Text style={styles.actionText}>
                  {likedPosts[post.id] ? post.likes + 1 : post.likes}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}
                onPress={() => Alert.alert('Comments', 'Comments coming soon! 💜')}>
                <Text style={styles.actionIcon}>💬</Text>
                <Text style={styles.actionText}>{post.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.readMoreBtn}
                onPress={() => Alert.alert(post.name, post.content)}>
                <Text style={styles.readMoreText}>Read More →</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF0F5' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#2D1B2E' },
  headerSub: { fontSize: 13, color: '#9B8FA0', marginTop: 2 },
  newPostBtn: {
    backgroundColor: '#C9748F', borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 8,
  },
  newPostBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  newPostBox: {
    marginHorizontal: 20, marginBottom: 12, backgroundColor: '#fff',
    borderRadius: 16, padding: 16, shadowColor: '#C9748F',
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  newPostInput: {
    fontSize: 14, color: '#2D1B2E', minHeight: 80,
    textAlignVertical: 'top', marginBottom: 12,
  },
  submitBtn: {
    backgroundColor: '#C9748F', borderRadius: 50,
    paddingVertical: 12, alignItems: 'center',
  },
  submitBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 16, marginHorizontal: 20,
    marginBottom: 14, paddingHorizontal: 14, paddingVertical: 10,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#2D1B2E' },
  catScroll: { paddingLeft: 20, marginBottom: 16 },
  catBtn: {
    backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 16,
    paddingVertical: 8, marginRight: 8, borderWidth: 1.5, borderColor: '#EDE0E8',
  },
  catBtnActive: { backgroundColor: '#C9748F', borderColor: '#C9748F' },
  catText: { fontSize: 13, fontWeight: '600', color: '#9B8FA0' },
  catTextActive: { color: '#fff' },
  expertCard: {
    marginHorizontal: 20, marginBottom: 20, backgroundColor: '#fff',
    borderRadius: 20, padding: 16, borderWidth: 1.5, borderColor: '#4CAF82',
    shadowColor: '#4CAF82', shadowOpacity: 0.1, shadowRadius: 8, elevation: 3,
  },
  expertLeft: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  expertAvatar: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: '#4CAF82', alignItems: 'center',
    justifyContent: 'center', marginRight: 12,
  },
  expertEmoji: { fontSize: 24 },
  expertInfo: { flex: 1 },
  expertName: { fontSize: 16, fontWeight: '800', color: '#2D1B2E' },
  expertRole: { fontSize: 13, color: '#9B8FA0' },
  expertBody: {},
  expertTopic: { fontSize: 14, color: '#2D1B2E', lineHeight: 20, marginBottom: 12 },
  expertFooter: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  registerBtn: {
    backgroundColor: '#4CAF82', borderRadius: 50,
    paddingHorizontal: 18, paddingVertical: 10,
  },
  registerBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  nextSession: {
    backgroundColor: '#F0FBF6', borderRadius: 12,
    paddingHorizontal: 12, paddingVertical: 8,
  },
  nextSessionLabel: { fontSize: 11, color: '#9B8FA0' },
  nextSessionDate: { fontSize: 13, fontWeight: '700', color: '#4CAF82' },
  sectionTitle: {
    fontSize: 18, fontWeight: '800', color: '#2D1B2E',
    marginHorizontal: 20, marginBottom: 12,
  },
  postCard: {
    backgroundColor: '#fff', borderRadius: 20, marginHorizontal: 20,
    marginBottom: 14, padding: 16, shadowColor: '#000',
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: {
    width: 42, height: 42, borderRadius: 21,
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  avatarText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  postMeta: { flex: 1 },
  postName: { fontSize: 15, fontWeight: '700', color: '#2D1B2E' },
  postTopic: { fontSize: 12, color: '#9B8FA0', marginTop: 1 },
  postTime: { fontSize: 12, color: '#9B8FA0' },
  postContent: { fontSize: 14, color: '#2D1B2E', lineHeight: 22, marginBottom: 12 },
  postFooter: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actionIcon: { fontSize: 16 },
  actionText: { fontSize: 13, fontWeight: '600', color: '#9B8FA0' },
  readMoreBtn: { marginLeft: 'auto' },
  readMoreText: { fontSize: 13, fontWeight: '700', color: '#C9748F' },
});
