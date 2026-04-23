import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar,
} from 'react-native';
import COLORS from './colors';

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'cycle',
    emoji: '🌸',
    title: 'Period starting soon',
    message: 'Based on your cycle, your period is expected in 3 days. Stock up on essentials and be kind to yourself.',
    time: '2 hours ago',
    read: false,
    color: '#E91E8C',
    bg: '#FFF0F8',
  },
  {
    id: 2,
    type: 'bella',
    emoji: '🤖',
    title: 'Bella has a tip for you',
    message: 'You are in your luteal phase. Try magnesium-rich foods like almonds and dark chocolate to ease PMS symptoms.',
    time: '5 hours ago',
    read: false,
    color: '#7B6B9E',
    bg: '#F5EEFF',
  },
  {
    id: 3,
    type: 'community',
    emoji: '💬',
    title: 'New reply in Community',
    message: 'Sofia replied to your post: "I had the same experience! It really helped me to track my symptoms daily."',
    time: '8 hours ago',
    read: false,
    color: '#4A90C4',
    bg: '#E8F4FF',
  },
  {
    id: 4,
    type: 'cycle',
    emoji: '✨',
    title: 'Ovulation window starting',
    message: 'You are entering your fertile window. This is your most energetic phase — great time for exercise and socialising.',
    time: '1 day ago',
    read: true,
    color: '#F39C12',
    bg: '#FFFDE6',
  },
  {
    id: 5,
    type: 'health',
    emoji: '💜',
    title: 'Daily check-in reminder',
    message: 'Don\'t forget to log your mood, symptoms and water intake today. Just 30 seconds to stay on track.',
    time: '1 day ago',
    read: true,
    color: COLORS.primary,
    bg: COLORS.primaryLight,
  },
  {
    id: 6,
    type: 'academy',
    emoji: '📚',
    title: 'New article in Academy',
    message: 'Understanding PCOS: Symptoms, causes and what you can do — a new article has been added to the Health Academy.',
    time: '2 days ago',
    read: true,
    color: '#C4844A',
    bg: '#FFF4E4',
  },
  {
    id: 7,
    type: 'cycle',
    emoji: '🌙',
    title: 'Period ended',
    message: 'Your period has ended based on your tracking. You are now entering the follicular phase — energy levels will rise.',
    time: '3 days ago',
    read: true,
    color: '#27AE60',
    bg: '#F0FFF4',
  },
  {
    id: 8,
    type: 'bella',
    emoji: '🤖',
    title: 'Bella checked in',
    message: 'Hi! Just checking in — how are you feeling today? Tap to chat with me about anything on your mind.',
    time: '4 days ago',
    read: true,
    color: '#7B6B9E',
    bg: '#F5EEFF',
  },
  {
    id: 9,
    type: 'health',
    emoji: '💧',
    title: 'Hydration reminder',
    message: 'Staying hydrated during your luteal phase is especially important. Aim for 8 glasses of water today.',
    time: '5 days ago',
    read: true,
    color: '#2196F3',
    bg: '#E8F4FF',
  },
  {
    id: 10,
    type: 'subscription',
    emoji: '⭐',
    title: 'Unlock unlimited Bella access',
    message: 'You have used all your free Bella messages today. Upgrade to Plus or Pro for unlimited access to your AI health companion.',
    time: '6 days ago',
    read: true,
    color: '#F59E0B',
    bg: '#FFF8E4',
  },
];

const FILTER_TABS = [
  { id: 'all', label: 'All', emoji: '🔔' },
  { id: 'cycle', label: 'Cycle', emoji: '🌸' },
  { id: 'bella', label: 'Bella', emoji: '🤖' },
  { id: 'community', label: 'Community', emoji: '💬' },
  { id: 'health', label: 'Health', emoji: '💜' },
];

export default function NotificationsScreen({ onBack }) {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const filtered = activeFilter === 'all'
    ? notifications
    : notifications.filter(n => n.type === activeFilter);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
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
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <Text style={styles.headerSub}>{unreadCount} unread</Text>
          )}
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity style={styles.markAllBtn} onPress={markAllRead}>
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        {FILTER_TABS.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.filterTab, activeFilter === tab.id && styles.filterTabActive]}
            onPress={() => setActiveFilter(tab.id)}
          >
            <Text style={styles.filterEmoji}>{tab.emoji}</Text>
            <Text style={[styles.filterLabel, activeFilter === tab.id && styles.filterLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Notifications List */}
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔔</Text>
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptyText}>
              You are all caught up! Notifications about your cycle, Bella tips and community updates will appear here.
            </Text>
          </View>
        ) : (
          filtered.map(notif => (
            <TouchableOpacity
              key={notif.id}
              style={[
                styles.notifCard,
                !notif.read && styles.notifCardUnread,
              ]}
              onPress={() => markRead(notif.id)}
              activeOpacity={0.8}
            >
              <View style={[styles.notifIcon, { backgroundColor: notif.bg }]}>
                <Text style={styles.notifEmoji}>{notif.emoji}</Text>
              </View>

              <View style={styles.notifContent}>
                <View style={styles.notifHeader}>
                  <Text style={[
                    styles.notifTitle,
                    !notif.read && styles.notifTitleUnread,
                  ]}>
                    {notif.title}
                  </Text>
                  {!notif.read && <View style={styles.unreadDot} />}
                </View>
                <Text style={styles.notifMessage} numberOfLines={2}>
                  {notif.message}
                </Text>
                <Text style={styles.notifTime}>{notif.time}</Text>
              </View>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => deleteNotification(notif.id)}
              >
                <Text style={styles.deleteIcon}>✕</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
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
  headerSub: { fontSize: 13, color: COLORS.primary, marginTop: 2, fontWeight: '600' },
  markAllBtn: {
    backgroundColor: COLORS.primaryLight, borderRadius: 50,
    paddingHorizontal: 14, paddingVertical: 8,
  },
  markAllText: { fontSize: 13, color: COLORS.primary, fontWeight: '600' },
  filterScroll: { maxHeight: 56, backgroundColor: COLORS.white },
  filterContent: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  filterTab: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 50, backgroundColor: COLORS.background,
  },
  filterTabActive: { backgroundColor: COLORS.primary },
  filterEmoji: { fontSize: 14 },
  filterLabel: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  filterLabelActive: { color: '#fff' },
  list: { flex: 1, padding: 16 },
  notifCard: {
    flexDirection: 'row', backgroundColor: COLORS.white,
    borderRadius: 20, padding: 14, marginBottom: 10,
    gap: 12, alignItems: 'flex-start',
    shadowColor: '#000', shadowOpacity: 0.04,
    shadowRadius: 8, elevation: 2,
  },
  notifCardUnread: {
    borderLeftWidth: 3, borderLeftColor: COLORS.primary,
  },
  notifIcon: {
    width: 48, height: 48, borderRadius: 24,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  notifEmoji: { fontSize: 22 },
  notifContent: { flex: 1 },
  notifHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  notifTitle: { fontSize: 14, fontWeight: '600', color: COLORS.text, flex: 1 },
  notifTitleUnread: { fontWeight: '800' },
  unreadDot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: COLORS.primary, flexShrink: 0,
  },
  notifMessage: { fontSize: 13, color: COLORS.textLight, lineHeight: 19, marginBottom: 6 },
  notifTime: { fontSize: 11, color: COLORS.textLight },
  deleteBtn: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: COLORS.background,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  deleteIcon: { fontSize: 12, color: COLORS.textLight },
  emptyState: {
    alignItems: 'center', paddingVertical: 60, paddingHorizontal: 40,
  },
  emptyEmoji: { fontSize: 52, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text, marginBottom: 10 },
  emptyText: {
    fontSize: 14, color: COLORS.textLight,
    textAlign: 'center', lineHeight: 22,
  },
});
