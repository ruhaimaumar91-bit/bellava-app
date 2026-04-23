import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar,
  TextInput, Modal,
} from 'react-native';
import COLORS from './colors';

const CATEGORIES = [
  { id: 'all', label: 'All', emoji: '💬' },
  { id: 'cycle', label: 'Cycle', emoji: '🌸' },
  { id: 'pregnancy', label: 'Pregnancy', emoji: '🤰' },
  { id: 'menopause', label: 'Menopause', emoji: '🌿' },
  { id: 'mental', label: 'Mental Health', emoji: '🧠' },
  { id: 'nutrition', label: 'Nutrition', emoji: '🥗' },
  { id: 'fitness', label: 'Fitness', emoji: '💪' },
  { id: 'relationships', label: 'Relationships', emoji: '💑' },
];

const INITIAL_POSTS = [
  {
    id: 1,
    author: 'Aisha M.',
    avatar: '👩🏾',
    category: 'cycle',
    time: '2 hours ago',
    content: 'Has anyone else noticed their cycle getting shorter after coming off the pill? Mine went from 28 days to 24 days. Would love to hear your experiences! 🌸',
    likes: 24,
    comments: 8,
    liked: false,
  },
  {
    id: 2,
    author: 'Sofia L.',
    avatar: '👩🏻',
    category: 'mental',
    time: '4 hours ago',
    content: 'Reminder to everyone struggling with PMS mood swings — you are not crazy, you are not difficult, your hormones are just doing a lot of work. Be kind to yourself today 💜',
    likes: 87,
    comments: 12,
    liked: false,
  },
  {
    id: 3,
    author: 'Fatima K.',
    avatar: '👩🏽',
    category: 'nutrition',
    time: '6 hours ago',
    content: 'Just started seed cycling this month for hormone balance. Day 14 — flaxseeds in the first half, pumpkin seeds in the second. Anyone tried this? Did it help your cycle? 🌱',
    likes: 41,
    comments: 19,
    liked: false,
  },
  {
    id: 4,
    author: 'Imani T.',
    avatar: '👩🏿',
    category: 'fitness',
    time: '8 hours ago',
    content: 'Cycle syncing my workouts has been a game changer! Heavy lifting during follicular and ovulation, yoga and walks during luteal and menstrual. My body thanks me every month 💪',
    likes: 63,
    comments: 14,
    liked: false,
  },
  {
    id: 5,
    author: 'Nadia R.',
    avatar: '👩🏼',
    category: 'menopause',
    time: '1 day ago',
    content: 'To all the women going through perimenopause — the brain fog is real and it does get better. Magnesium glycinate before bed changed everything for me. You are not alone 🌿',
    likes: 95,
    comments: 27,
    liked: false,
  },
  {
    id: 6,
    author: 'Layla S.',
    avatar: '👩🏽',
    category: 'pregnancy',
    time: '1 day ago',
    content: 'Week 8 of pregnancy and the nausea is absolutely relentless. Ginger tea and small meals every 2 hours is helping a little. Any other tips from mamas who have been through this? 🤰',
    likes: 38,
    comments: 22,
    liked: false,
  },
];

export default function CommunityScreen({ onBack, userName, userPlan }) {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostText, setNewPostText] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('cycle');
  const [selectedPost, setSelectedPost] = useState(null);

  const firstName = userName ? userName.split(' ')[0] : 'You';

  const filteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  const handleLike = (postId) => {
    setPosts(prev => prev.map(p =>
      p.id === postId
        ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
        : p
    ));
  };

  const handlePost = () => {
    if (!newPostText.trim()) return;
    const newPost = {
      id: Date.now(),
      author: firstName,
      avatar: '👩',
      category: newPostCategory,
      time: 'Just now',
      content: newPostText.trim(),
      likes: 0,
      comments: 0,
      liked: false,
    };
    setPosts(prev => [newPost, ...prev]);
    setNewPostText('');
    setShowNewPost(false);
  };

  const getCategoryColor = (catId) => {
    const colors = {
      cycle: '#E91E8C',
      pregnancy: '#9C27B0',
      menopause: '#27AE60',
      mental: '#2196F3',
      nutrition: '#FF9800',
      fitness: '#F44336',
      relationships: '#E91E8C',
      all: COLORS.primary,
    };
    return colors[catId] || COLORS.primary;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Community</Text>
          <Text style={styles.headerSub}>Women supporting women 💜</Text>
        </View>
        <TouchableOpacity
          style={styles.newPostBtn}
          onPress={() => setShowNewPost(true)}
        >
          <Text style={styles.newPostBtnText}>+ Post</Text>
        </TouchableOpacity>
      </View>

      {/* Category tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContent}
      >
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryTab,
              activeCategory === cat.id && {
                backgroundColor: getCategoryColor(cat.id),
              },
            ]}
            onPress={() => setActiveCategory(cat.id)}
          >
            <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
            <Text style={[
              styles.categoryLabel,
              activeCategory === cat.id && { color: '#fff' },
            ]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Posts */}
      <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
        {filteredPosts.map(post => (
          <TouchableOpacity
            key={post.id}
            style={styles.postCard}
            onPress={() => setSelectedPost(post)}
            activeOpacity={0.9}
          >
            {/* Post header */}
            <View style={styles.postHeader}>
              <View style={styles.authorRow}>
                <Text style={styles.avatar}>{post.avatar}</Text>
                <View>
                  <Text style={styles.authorName}>{post.author}</Text>
                  <Text style={styles.postTime}>{post.time}</Text>
                </View>
              </View>
              <View style={[
                styles.categoryBadge,
                { backgroundColor: `${getCategoryColor(post.category)}20` },
              ]}>
                <Text style={[
                  styles.categoryBadgeText,
                  { color: getCategoryColor(post.category) },
                ]}>
                  {CATEGORIES.find(c => c.id === post.category)?.emoji}{' '}
                  {CATEGORIES.find(c => c.id === post.category)?.label}
                </Text>
              </View>
            </View>

            {/* Post content */}
            <Text style={styles.postContent} numberOfLines={3}>
              {post.content}
            </Text>

            {/* Post actions */}
            <View style={styles.postActions}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => handleLike(post.id)}
              >
                <Text style={styles.actionIcon}>
                  {post.liked ? '💜' : '🤍'}
                </Text>
                <Text style={[
                  styles.actionCount,
                  post.liked && { color: COLORS.primary },
                ]}>
                  {post.likes}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionIcon}>💬</Text>
                <Text style={styles.actionCount}>{post.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionIcon}>↗️</Text>
                <Text style={styles.actionCount}>Share</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.communityNote}>
          <Text style={styles.communityNoteText}>
            💜 This is a safe, supportive space. Be kind, be honest, and remember — we are all in this together.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* New Post Modal */}
      <Modal visible={showNewPost} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Share with the community 💜</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.modalCategoryRow}
            >
              {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.modalCategoryBtn,
                    newPostCategory === cat.id && {
                      backgroundColor: getCategoryColor(cat.id),
                    },
                  ]}
                  onPress={() => setNewPostCategory(cat.id)}
                >
                  <Text style={[
                    styles.modalCategoryText,
                    newPostCategory === cat.id && { color: '#fff' },
                  ]}>
                    {cat.emoji} {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TextInput
              style={styles.postInput}
              placeholder="What's on your mind? Share your experience, ask a question, or offer support..."
              placeholderTextColor={COLORS.textLight}
              value={newPostText}
              onChangeText={setNewPostText}
              multiline
              numberOfLines={5}
              maxLength={500}
            />
            <Text style={styles.charCount}>{newPostText.length}/500</Text>

            <TouchableOpacity
              style={[styles.postBtn, !newPostText.trim() && styles.postBtnDisabled]}
              onPress={handlePost}
              disabled={!newPostText.trim()}
            >
              <Text style={styles.postBtnText}>Post to Community 💜</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setShowNewPost(false)}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Post Detail Modal */}
      <Modal visible={!!selectedPost} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            {selectedPost && (
              <>
                <View style={styles.postHeader}>
                  <View style={styles.authorRow}>
                    <Text style={styles.avatar}>{selectedPost.avatar}</Text>
                    <View>
                      <Text style={styles.authorName}>{selectedPost.author}</Text>
                      <Text style={styles.postTime}>{selectedPost.time}</Text>
                    </View>
                  </View>
                </View>
                <ScrollView style={{ maxHeight: 300 }}>
                  <Text style={styles.postContentFull}>{selectedPost.content}</Text>
                </ScrollView>
                <View style={styles.postActions}>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => {
                      handleLike(selectedPost.id);
                      setSelectedPost(prev => ({
                        ...prev,
                        liked: !prev.liked,
                        likes: prev.liked ? prev.likes - 1 : prev.likes + 1,
                      }));
                    }}
                  >
                    <Text style={styles.actionIcon}>
                      {selectedPost.liked ? '💜' : '🤍'}
                    </Text>
                    <Text style={styles.actionCount}>{selectedPost.likes}</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setSelectedPost(null)}
            >
              <Text style={styles.cancelBtnText}>Close</Text>
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
  newPostBtn: {
    backgroundColor: COLORS.primary, borderRadius: 50,
    paddingHorizontal: 16, paddingVertical: 8,
  },
  newPostBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  categoryScroll: { maxHeight: 56, backgroundColor: COLORS.white },
  categoryContent: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  categoryTab: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 50,
    backgroundColor: COLORS.background,
  },
  categoryEmoji: { fontSize: 14 },
  categoryLabel: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  feed: { flex: 1, padding: 16 },
  postCard: {
    backgroundColor: COLORS.white, borderRadius: 20,
    padding: 16, marginBottom: 14,
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 10, elevation: 2,
  },
  postHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 12,
  },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { fontSize: 32 },
  authorName: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  postTime: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  categoryBadge: { borderRadius: 50, paddingHorizontal: 10, paddingVertical: 5 },
  categoryBadgeText: { fontSize: 12, fontWeight: '600' },
  postContent: {
    fontSize: 15, color: COLORS.text,
    lineHeight: 22, marginBottom: 14,
  },
  postContentFull: {
    fontSize: 15, color: COLORS.text,
    lineHeight: 24, marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row', gap: 20,
    paddingTop: 12, borderTopWidth: 1, borderTopColor: COLORS.border,
  },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  actionIcon: { fontSize: 18 },
  actionCount: { fontSize: 14, color: COLORS.textLight, fontWeight: '600' },
  communityNote: {
    backgroundColor: COLORS.primaryLight, borderRadius: 16,
    padding: 16, marginBottom: 8,
  },
  communityNoteText: {
    fontSize: 13, color: COLORS.primary,
    textAlign: 'center', lineHeight: 20,
  },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: COLORS.white, borderTopLeftRadius: 28,
    borderTopRightRadius: 28, padding: 24,
  },
  modalHandle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: COLORS.border, alignSelf: 'center', marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20, fontWeight: '800',
    color: COLORS.text, marginBottom: 16,
  },
  modalCategoryRow: { gap: 8, marginBottom: 16 },
  modalCategoryBtn: {
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 50, backgroundColor: COLORS.background,
  },
  modalCategoryText: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  postInput: {
    backgroundColor: COLORS.background, borderRadius: 16,
    padding: 16, fontSize: 15, color: COLORS.text,
    minHeight: 120, textAlignVertical: 'top',
    borderWidth: 1.5, borderColor: COLORS.border, marginBottom: 8,
  },
  charCount: {
    fontSize: 12, color: COLORS.textLight,
    textAlign: 'right', marginBottom: 16,
  },
  postBtn: {
    backgroundColor: COLORS.primary, borderRadius: 50,
    paddingVertical: 16, alignItems: 'center', marginBottom: 10,
  },
  postBtnDisabled: { opacity: 0.4 },
  postBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  cancelBtn: {
    borderWidth: 1.5, borderColor: COLORS.border, borderRadius: 50,
    paddingVertical: 14, alignItems: 'center',
  },
  cancelBtnText: { color: COLORS.textLight, fontWeight: '600', fontSize: 15 },
});
