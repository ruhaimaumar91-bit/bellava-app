import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar, Modal, TextInput,
} from 'react-native';
import COLORS from './colors';

const ADMIN_EMAIL = 'ruhaima@bellava.com';
const ADMIN_PASSWORD = 'Bellava@Admin2025!';

const MOCK_STATS = {
  totalUsers: 1247,
  activeToday: 89,
  newThisWeek: 134,
  plusSubscribers: 203,
  proSubscribers: 87,
  freeUsers: 957,
  totalRevenue: '£4,821',
  monthlyRevenue: '£1,340',
  communityPosts: 342,
  bellaChats: 2891,
  mostUsedFeature: 'Cycle Tracker',
  avgSessionMin: 6.4,
};

const MOCK_USERS = [
  { id: 1, name: 'Aisha M.', email: 'aisha@email.com', plan: 'PRO', joined: '12 Jan 2025', status: 'Active' },
  { id: 2, name: 'Sofia L.', email: 'sofia@email.com', plan: 'PLUS', joined: '18 Jan 2025', status: 'Active' },
  { id: 3, name: 'Fatima K.', email: 'fatima@email.com', plan: 'FREE', joined: '02 Feb 2025', status: 'Active' },
  { id: 4, name: 'Imani T.', email: 'imani@email.com', plan: 'PRO', joined: '14 Feb 2025', status: 'Active' },
  { id: 5, name: 'Nadia R.', email: 'nadia@email.com', plan: 'FREE', joined: '20 Feb 2025', status: 'Inactive' },
  { id: 6, name: 'Layla S.', email: 'layla@email.com', plan: 'PLUS', joined: '01 Mar 2025', status: 'Active' },
  { id: 7, name: 'Zara B.', email: 'zara@email.com', plan: 'FREE', joined: '10 Mar 2025', status: 'Active' },
  { id: 8, name: 'Emilia C.', email: 'emilia@email.com', plan: 'PRO', joined: '22 Mar 2025', status: 'Active' },
];

const MOCK_REPORTS = [
  { id: 1, user: 'User #4421', reason: 'Inappropriate post in community', date: '20 Apr 2025', status: 'Pending' },
  { id: 2, user: 'User #2109', reason: 'Spam messages', date: '18 Apr 2025', status: 'Resolved' },
  { id: 3, user: 'User #3387', reason: 'Offensive comment', date: '15 Apr 2025', status: 'Pending' },
];

const ANNOUNCEMENTS = [
  { id: 1, title: 'New Feature: BBT Graph', date: '15 Apr 2025', sent: true },
  { id: 2, title: 'App Maintenance Sunday 2am', date: '10 Apr 2025', sent: true },
  { id: 3, title: 'Welcome to Bellava Beta!', date: '01 Apr 2025', sent: true },
];

export default function AdminScreen({ onBack, currentUserEmail }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [announcementText, setAnnouncementText] = useState('');

  const handleAdminLogin = () => {
    if (
      loginEmail.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
      loginPassword === ADMIN_PASSWORD
    ) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect email or password. Access denied.');
    }
  };

  const planColor = (plan) => {
    if (plan === 'PRO') return '#F59E0B';
    if (plan === 'PLUS') return COLORS.primary;
    return COLORS.textLight;
  };

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
        <View style={styles.loginContainer}>
          <TouchableOpacity onPress={onBack} style={styles.backBtnLogin}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={styles.loginCard}>
            <Text style={styles.loginIcon}>👑</Text>
            <Text style={styles.loginTitle}>Admin Access</Text>
            <Text style={styles.loginSub}>
              This area is restricted to authorised Bellava administrators only.
            </Text>
            <TextInput
              style={styles.loginInput}
              placeholder="Admin email"
              placeholderTextColor={COLORS.textLight}
              value={loginEmail}
              onChangeText={setLoginEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.loginInput}
              placeholder="Admin password"
              placeholderTextColor={COLORS.textLight}
              value={loginPassword}
              onChangeText={setLoginPassword}
              secureTextEntry
            />
            {loginError ? (
              <Text style={styles.loginError}>{loginError}</Text>
            ) : null}
            <TouchableOpacity style={styles.loginBtn} onPress={handleAdminLogin}>
              <Text style={styles.loginBtnText}>Access Admin Panel 👑</Text>
            </TouchableOpacity>
            <Text style={styles.loginWarning}>
              🔒 Unauthorised access attempts are logged and may result in account suspension.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#1A0A2E" />

      {/* Admin Header */}
      <View style={styles.adminHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backBtnAdmin}>
          <Text style={styles.backArrowAdmin}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.adminHeaderTitle}>👑 Admin Panel</Text>
          <Text style={styles.adminHeaderSub}>Bellava — Reine Mande Ltd</Text>
        </View>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => setIsAuthenticated(false)}
        >
          <Text style={styles.logoutBtnText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal showsHorizontalScrollIndicator={false}
        style={styles.tabs}
        contentContainerStyle={styles.tabsContent}
      >
        {[
          { id: 'overview', label: '📊 Overview' },
          { id: 'users', label: '👥 Users' },
          { id: 'reports', label: '🚨 Reports' },
          { id: 'announce', label: '📢 Announce' },
          { id: 'business', label: '💼 Business' },
        ].map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.tabActive]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[styles.tabLabel, activeTab === tab.id && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <>
            <Text style={styles.sectionTitle}>App Performance</Text>
            <View style={styles.statsGrid}>
              {[
                { label: 'Total Users', value: MOCK_STATS.totalUsers.toLocaleString(), emoji: '👥' },
                { label: 'Active Today', value: MOCK_STATS.activeToday, emoji: '🟢' },
                { label: 'New This Week', value: MOCK_STATS.newThisWeek, emoji: '🆕' },
                { label: 'Bella Chats', value: MOCK_STATS.bellaChats.toLocaleString(), emoji: '🤖' },
                { label: 'Community Posts', value: MOCK_STATS.communityPosts, emoji: '💬' },
                { label: 'Avg Session', value: `${MOCK_STATS.avgSessionMin} min`, emoji: '⏱️' },
              ].map((stat, i) => (
                <View key={i} style={styles.statCard}>
                  <Text style={styles.statEmoji}>{stat.emoji}</Text>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Subscriptions</Text>
            <View style={styles.subRow}>
              <View style={[styles.subCard, { borderColor: COLORS.textLight }]}>
                <Text style={styles.subEmoji}>🆓</Text>
                <Text style={styles.subCount}>{MOCK_STATS.freeUsers}</Text>
                <Text style={styles.subPlan}>FREE</Text>
              </View>
              <View style={[styles.subCard, { borderColor: COLORS.primary }]}>
                <Text style={styles.subEmoji}>⭐</Text>
                <Text style={[styles.subCount, { color: COLORS.primary }]}>{MOCK_STATS.plusSubscribers}</Text>
                <Text style={[styles.subPlan, { color: COLORS.primary }]}>PLUS</Text>
              </View>
              <View style={[styles.subCard, { borderColor: '#F59E0B' }]}>
                <Text style={styles.subEmoji}>👑</Text>
                <Text style={[styles.subCount, { color: '#F59E0B' }]}>{MOCK_STATS.proSubscribers}</Text>
                <Text style={[styles.subPlan, { color: '#F59E0B' }]}>PRO</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Revenue</Text>
            <View style={styles.revenueCard}>
              {[
                { label: '💰 Total Revenue', value: MOCK_STATS.totalRevenue },
                { label: '📅 This Month', value: MOCK_STATS.monthlyRevenue },
                { label: '🏆 Top Feature', value: MOCK_STATS.mostUsedFeature },
              ].map((item, i) => (
                <View key={i} style={styles.revenueRow}>
                  <Text style={styles.revenueLabel}>{item.label}</Text>
                  <Text style={styles.revenueValue}>{item.value}</Text>
                </View>
              ))}
            </View>

            <View style={styles.noteCard}>
              <Text style={styles.noteText}>
                📝 These are placeholder statistics. Once Supabase is connected, this dashboard will show real live data from your users.
              </Text>
            </View>
          </>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <>
            <Text style={styles.sectionTitle}>Registered Users ({MOCK_USERS.length})</Text>
            {MOCK_USERS.map(user => (
              <TouchableOpacity
                key={user.id}
                style={styles.userCard}
                onPress={() => setSelectedUser(user)}
              >
                <View style={styles.userAvatar}>
                  <Text style={styles.userAvatarText}>{user.name.charAt(0)}</Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                  <Text style={styles.userJoined}>Joined: {user.joined}</Text>
                </View>
                <View style={styles.userRight}>
                  <View style={[styles.planBadge, { backgroundColor: planColor(user.plan) }]}>
                    <Text style={styles.planBadgeText}>{user.plan}</Text>
                  </View>
                  <Text style={[
                    styles.userStatus,
                    { color: user.status === 'Active' ? '#27AE60' : COLORS.textLight },
                  ]}>
                    {user.status === 'Active' ? '🟢' : '⚫'} {user.status}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            <View style={styles.noteCard}>
              <Text style={styles.noteText}>
                📝 Real user data will appear here once Supabase authentication is connected.
              </Text>
            </View>
          </>
        )}

        {/* REPORTS TAB */}
        {activeTab === 'reports' && (
          <>
            <Text style={styles.sectionTitle}>Community Reports</Text>
            {MOCK_REPORTS.map(report => (
              <View key={report.id} style={styles.reportCard}>
                <View style={styles.reportHeader}>
                  <Text style={styles.reportUser}>{report.user}</Text>
                  <View style={[
                    styles.reportStatus,
                    { backgroundColor: report.status === 'Pending' ? '#FFF3CD' : '#D4EDDA' },
                  ]}>
                    <Text style={[
                      styles.reportStatusText,
                      { color: report.status === 'Pending' ? '#856404' : '#155724' },
                    ]}>
                      {report.status}
                    </Text>
                  </View>
                </View>
                <Text style={styles.reportReason}>{report.reason}</Text>
                <Text style={styles.reportDate}>📅 {report.date}</Text>
                {report.status === 'Pending' && (
                  <View style={styles.reportActions}>
                    <TouchableOpacity style={styles.reportActionBtn}>
                      <Text style={styles.reportActionWarn}>⚠️ Warn User</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.reportActionBtn}>
                      <Text style={styles.reportActionRemove}>🚫 Remove Post</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </>
        )}

        {/* ANNOUNCE TAB */}
        {activeTab === 'announce' && (
          <>
            <Text style={styles.sectionTitle}>Send Announcement</Text>
            <View style={styles.announceCard}>
              <Text style={styles.announceLabel}>Write your message to all Bellava users:</Text>
              <TextInput
                style={styles.announceInput}
                placeholder="e.g. We have just launched a new feature!"
                placeholderTextColor={COLORS.textLight}
                value={announcementText}
                onChangeText={setAnnouncementText}
                multiline
                numberOfLines={4}
              />
              <TouchableOpacity
                style={[styles.sendBtn, !announcementText && styles.sendBtnDisabled]}
                disabled={!announcementText}
                onPress={() => setShowAnnouncement(true)}
              >
                <Text style={styles.sendBtnText}>📢 Send to All Users</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Past Announcements</Text>
            {ANNOUNCEMENTS.map(a => (
              <View key={a.id} style={styles.pastAnnounce}>
                <Text style={styles.pastAnnounceTitle}>{a.title}</Text>
                <Text style={styles.pastAnnounceDate}>📅 {a.date} · ✅ Sent</Text>
              </View>
            ))}
          </>
        )}

        {/* BUSINESS TAB */}
        {activeTab === 'business' && (
          <>
            <Text style={styles.sectionTitle}>Business Overview</Text>
            {[
              { emoji: '🏢', label: 'Company', value: 'Reine Mande Ltd' },
              { emoji: '📍', label: 'Location', value: 'London, United Kingdom' },
              { emoji: '📱', label: 'App Name', value: 'Bellava' },
              { emoji: '🎯', label: 'Target Market', value: 'Women aged 18–45, UK & Global' },
              { emoji: '🌍', label: 'Languages', value: 'EN, FR, AR, ES, DE, PT' },
              { emoji: '💰', label: 'Tiers', value: 'Free / Plus / Pro' },
              { emoji: '🤖', label: 'AI Model', value: 'Claude (Anthropic)' },
              { emoji: '🗄️', label: 'Database', value: 'Supabase' },
            ].map((item, i) => (
              <View key={i} style={styles.bizRow}>
                <Text style={styles.bizEmoji}>{item.emoji}</Text>
                <Text style={styles.bizLabel}>{item.label}</Text>
                <Text style={styles.bizValue}>{item.value}</Text>
              </View>
            ))}

            <Text style={styles.sectionTitle}>Launch Checklist</Text>
            {[
              { done: true, task: 'App screens designed and built' },
              { done: true, task: 'Bella AI integrated' },
              { done: false, task: 'Supabase auth connected' },
              { done: false, task: 'Subscriptions (RevenueCat) live' },
              { done: false, task: 'Apple Developer account active' },
              { done: false, task: 'Google Play Developer account active' },
              { done: false, task: 'App Store listing written' },
              { done: false, task: 'Privacy Policy published' },
              { done: false, task: 'EAS Build configured' },
              { done: false, task: 'Beta testing complete' },
              { done: false, task: '🚀 LAUNCH!' },
            ].map((item, i) => (
              <View key={i} style={styles.checkRow}>
                <Text style={styles.checkIcon}>{item.done ? '✅' : '⬜'}</Text>
                <Text style={[styles.checkTask, item.done && styles.checkTaskDone]}>
                  {item.task}
                </Text>
              </View>
            ))}
          </>
        )}

        <View style={{ height: 60 }} />
      </ScrollView>

      {/* User Detail Modal */}
      <Modal visible={!!selectedUser} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            {selectedUser && (
              <>
                <View style={[styles.modalAvatar, { backgroundColor: planColor(selectedUser.plan) }]}>
                  <Text style={styles.modalAvatarText}>{selectedUser.name.charAt(0)}</Text>
                </View>
                <Text style={styles.modalName}>{selectedUser.name}</Text>
                <Text style={styles.modalEmail}>{selectedUser.email}</Text>
                {[
                  { label: 'Plan', value: selectedUser.plan },
                  { label: 'Joined', value: selectedUser.joined },
                  { label: 'Status', value: selectedUser.status },
                ].map((row, i) => (
                  <View key={i} style={styles.modalRow}>
                    <Text style={styles.modalRowLabel}>{row.label}</Text>
                    <Text style={styles.modalRowValue}>{row.value}</Text>
                  </View>
                ))}
                <View style={styles.modalActions}>
                  <TouchableOpacity style={styles.modalWarnBtn}>
                    <Text style={styles.modalWarnText}>⚠️ Send Warning</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalSuspendBtn}>
                    <Text style={styles.modalSuspendText}>🚫 Suspend</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedUser(null)}>
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Announcement Confirm Modal */}
      <Modal visible={showAnnouncement} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalName}>📢 Confirm Announcement</Text>
            <Text style={styles.announcePreview}>{announcementText}</Text>
            <Text style={styles.announceTo}>
              This will be sent to all {MOCK_STATS.totalUsers.toLocaleString()} users.
            </Text>
            <TouchableOpacity
              style={styles.sendBtn}
              onPress={() => {
                setShowAnnouncement(false);
                setAnnouncementText('');
              }}
            >
              <Text style={styles.sendBtnText}>✅ Confirm Send</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowAnnouncement(false)}>
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
  loginContainer: { flex: 1, padding: 24, justifyContent: 'center' },
  backBtnLogin: { position: 'absolute', top: 20, left: 20, padding: 8 },
  backArrow: { fontSize: 22, color: COLORS.primary },
  loginCard: {
    backgroundColor: COLORS.white, borderRadius: 24,
    padding: 28, alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 20, elevation: 4,
  },
  loginIcon: { fontSize: 52, marginBottom: 12 },
  loginTitle: { fontSize: 24, fontWeight: '800', color: COLORS.text, marginBottom: 8 },
  loginSub: {
    fontSize: 13, color: COLORS.textLight,
    textAlign: 'center', marginBottom: 24, lineHeight: 20,
  },
  loginInput: {
    width: '100%', borderWidth: 1.5, borderColor: COLORS.border,
    borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14,
    fontSize: 15, color: COLORS.text, marginBottom: 12,
    backgroundColor: COLORS.background,
  },
  loginError: { color: '#E74C3C', fontSize: 13, marginBottom: 12, textAlign: 'center' },
  loginBtn: {
    width: '100%', backgroundColor: '#1A0A2E',
    borderRadius: 50, paddingVertical: 16,
    alignItems: 'center', marginBottom: 16,
  },
  loginBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  loginWarning: { fontSize: 11, color: COLORS.textLight, textAlign: 'center', lineHeight: 18 },
  adminHeader: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1A0A2E', paddingHorizontal: 20,
    paddingVertical: 16, gap: 12,
  },
  backBtnAdmin: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  backArrowAdmin: { fontSize: 20, color: '#fff' },
  adminHeaderTitle: { fontSize: 18, fontWeight: '800', color: '#fff' },
  adminHeaderSub: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  logoutBtn: {
    marginLeft: 'auto', backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 50, paddingHorizontal: 14, paddingVertical: 8,
  },
  logoutBtnText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  tabs: { backgroundColor: '#1A0A2E', maxHeight: 52 },
  tabsContent: { paddingHorizontal: 16, paddingBottom: 10, gap: 8 },
  tab: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.1)',
  },
  tabActive: { backgroundColor: COLORS.primary },
  tabLabel: { fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.6)' },
  tabLabelActive: { color: '#fff' },
  content: { flex: 1, padding: 16 },
  sectionTitle: {
    fontSize: 17, fontWeight: '800',
    color: COLORS.text, marginTop: 8, marginBottom: 12,
  },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 8 },
  statCard: {
    backgroundColor: COLORS.white, borderRadius: 16,
    padding: 14, alignItems: 'center',
    width: '30%', flex: 1, minWidth: 90,
    borderWidth: 1, borderColor: COLORS.border,
  },
  statEmoji: { fontSize: 22, marginBottom: 6 },
  statValue: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  statLabel: { fontSize: 11, color: COLORS.textLight, textAlign: 'center', marginTop: 2 },
  subRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  subCard: {
    flex: 1, backgroundColor: COLORS.white,
    borderRadius: 16, padding: 16,
    alignItems: 'center', borderWidth: 2,
  },
  subEmoji: { fontSize: 24, marginBottom: 6 },
  subCount: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  subPlan: { fontSize: 12, fontWeight: '700', color: COLORS.textLight, marginTop: 2 },
  revenueCard: {
    backgroundColor: COLORS.white, borderRadius: 16,
    padding: 16, borderWidth: 1, borderColor: COLORS.border, marginBottom: 8,
  },
  revenueRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  revenueLabel: { fontSize: 14, color: COLORS.textLight },
  revenueValue: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  noteCard: { backgroundColor: '#FFF8E6', borderRadius: 12, padding: 14, marginTop: 8 },
  noteText: { fontSize: 12, color: '#9A6800', lineHeight: 18 },
  userCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.white, borderRadius: 16,
    padding: 14, marginBottom: 10,
    borderWidth: 1, borderColor: COLORS.border, gap: 12,
  },
  userAvatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  userAvatarText: { color: '#fff', fontWeight: '800', fontSize: 18 },
  userInfo: { flex: 1 },
  userName: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  userEmail: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  userJoined: { fontSize: 11, color: COLORS.textLight, marginTop: 2 },
  userRight: { alignItems: 'flex-end', gap: 6 },
  planBadge: { borderRadius: 50, paddingHorizontal: 10, paddingVertical: 4 },
  planBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  userStatus: { fontSize: 11, fontWeight: '600' },
  reportCard: {
    backgroundColor: COLORS.white, borderRadius: 16,
    padding: 16, marginBottom: 12,
    borderWidth: 1, borderColor: COLORS.border,
  },
  reportHeader: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8,
  },
  reportUser: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  reportStatus: { borderRadius: 50, paddingHorizontal: 10, paddingVertical: 4 },
  reportStatusText: { fontSize: 12, fontWeight: '600' },
  reportReason: { fontSize: 14, color: COLORS.text, marginBottom: 6 },
  reportDate: { fontSize: 12, color: COLORS.textLight, marginBottom: 10 },
  reportActions: { flexDirection: 'row', gap: 10 },
  reportActionBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 12,
    backgroundColor: COLORS.background, alignItems: 'center',
  },
  reportActionWarn: { fontSize: 13, fontWeight: '600', color: '#F59E0B' },
  reportActionRemove: { fontSize: 13, fontWeight: '600', color: '#E74C3C' },
  announceCard: {
    backgroundColor: COLORS.white, borderRadius: 16,
    padding: 16, borderWidth: 1, borderColor: COLORS.border, marginBottom: 16,
  },
  announceLabel: { fontSize: 14, color: COLORS.text, marginBottom: 10, fontWeight: '600' },
  announceInput: {
    borderWidth: 1.5, borderColor: COLORS.border, borderRadius: 14,
    padding: 14, fontSize: 14, color: COLORS.text,
    minHeight: 100, textAlignVertical: 'top',
    marginBottom: 14, backgroundColor: COLORS.background,
  },
  sendBtn: {
    backgroundColor: '#1A0A2E', borderRadius: 50,
    paddingVertical: 14, alignItems: 'center',
  },
  sendBtnDisabled: { opacity: 0.4 },
  sendBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  pastAnnounce: {
    backgroundColor: COLORS.white, borderRadius: 14,
    padding: 14, marginBottom: 10,
    borderWidth: 1, borderColor: COLORS.border,
  },
  pastAnnounceTitle: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  pastAnnounceDate: { fontSize: 12, color: COLORS.textLight, marginTop: 4 },
  bizRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.white, borderRadius: 14,
    padding: 14, marginBottom: 8,
    borderWidth: 1, borderColor: COLORS.border, gap: 10,
  },
  bizEmoji: { fontSize: 20 },
  bizLabel: { fontSize: 13, color: COLORS.textLight, width: 90 },
  bizValue: { fontSize: 13, fontWeight: '700', color: COLORS.text, flex: 1 },
  checkRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10, borderBottomWidth: 1,
    borderBottomColor: COLORS.border, gap: 10,
  },
  checkIcon: { fontSize: 18 },
  checkTask: { fontSize: 14, color: COLORS.text },
  checkTaskDone: { color: COLORS.textLight, textDecorationLine: 'line-through' },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: COLORS.white, borderTopLeftRadius: 28,
    borderTopRightRadius: 28, padding: 28, alignItems: 'center',
  },
  modalHandle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: COLORS.border, marginBottom: 20,
  },
  modalAvatar: {
    width: 64, height: 64, borderRadius: 32,
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  modalAvatarText: { color: '#fff', fontWeight: '800', fontSize: 26 },
  modalName: { fontSize: 22, fontWeight: '800', color: COLORS.text, marginBottom: 4 },
  modalEmail: { fontSize: 14, color: COLORS.textLight, marginBottom: 16 },
  modalRow: {
    width: '100%', flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  modalRowLabel: { fontSize: 14, color: COLORS.textLight },
  modalRowValue: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  modalActions: { flexDirection: 'row', gap: 10, marginTop: 16, width: '100%' },
  modalWarnBtn: {
    flex: 1, backgroundColor: '#FFF3CD',
    borderRadius: 50, paddingVertical: 12, alignItems: 'center',
  },
  modalWarnText: { color: '#856404', fontWeight: '700', fontSize: 14 },
  modalSuspendBtn: {
    flex: 1, backgroundColor: '#F8D7DA',
    borderRadius: 50, paddingVertical: 12, alignItems: 'center',
  },
  modalSuspendText: { color: '#721C24', fontWeight: '700', fontSize: 14 },
  announcePreview: {
    fontSize: 14, color: COLORS.text, lineHeight: 22,
    backgroundColor: COLORS.background, borderRadius: 12,
    padding: 14, width: '100%', marginVertical: 12,
  },
  announceTo: { fontSize: 13, color: COLORS.textLight, marginBottom: 16 },
  closeBtn: {
    borderWidth: 2, borderColor: COLORS.border, borderRadius: 50,
    paddingVertical: 13, paddingHorizontal: 48, marginTop: 12,
  },
  closeBtnText: { color: COLORS.textLight, fontWeight: '700', fontSize: 15 },
});
