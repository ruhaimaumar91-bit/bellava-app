import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar,
  Modal, TextInput, Alert,
} from 'react-native';
import COLORS from './colors';

const ADMIN_EMAIL = 'hellobellava@gmail.com';
const ADMIN_PASSWORD = '(Siver1@)';

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
  { id: 1, title: 'New Feature: Pregnancy Tracker', date: '24 Apr 2025', sent: true },
  { id: 2, title: 'App Maintenance Sunday 2am', date: '10 Apr 2025', sent: true },
  { id: 3, title: 'Welcome to Bellava Beta!', date: '01 Apr 2025', sent: true },
];

export default function AdminScreen({ onBack }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [announcementText, setAnnouncementText] = useState('');
  const [faceIdAttempted, setFaceIdAttempted] = useState(false);

  const handleAdminLogin = () => {
    if (
      loginEmail.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
      loginPassword === ADMIN_PASSWORD
    ) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect credentials. Access denied.');
      Alert.alert(
        '🔒 Access Denied',
        'Incorrect email or password. This attempt has been logged.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleFaceID = () => {
    setFaceIdAttempted(true);
    Alert.alert(
      '👁️ Face ID / Touch ID',
      'Biometric authentication requires a physical device. On a real iPhone or Android phone this will use Face ID or fingerprint. For now please use your email and password.',
      [{ text: 'Use Password Instead' }]
    );
  };

  const planColor = (plan) => {
    if (plan === 'PRO') return '#F59E0B';
    if (plan === 'PLUS') return '#A78BFA';
    return '#6B7280';
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.loginBg}>
        <StatusBar barStyle="light-content" backgroundColor="#0A0A1A" />

        {/* Back button */}
        <SafeAreaView style={styles.loginSafeTop}>
          <TouchableOpacity onPress={onBack} style={styles.loginBackBtn}>
            <Text style={styles.loginBackText}>← Back</Text>
          </TouchableOpacity>
        </SafeAreaView>

        {/* Background decoration */}
        <View style={styles.loginCircle1} />
        <View style={styles.loginCircle2} />
        <View style={styles.loginCircle3} />

        <View style={styles.loginContainer}>

          {/* Logo */}
          <View style={styles.loginLogoWrap}>
            <View style={styles.loginLogo}>
              <Text style={styles.loginLogoLetter}>B</Text>
            </View>
            <View style={styles.loginCrown}>
              <Text style={styles.loginCrownText}>👑</Text>
            </View>
          </View>

          <Text style={styles.loginTitle}>Bellava Admin</Text>
          <Text style={styles.loginSub}>Restricted access — Reine Mande Ltd</Text>

          {/* Face ID Button */}
          <TouchableOpacity
            style={styles.faceIdBtn}
            onPress={handleFaceID}
          >
            <Text style={styles.faceIdIcon}>👁️</Text>
            <Text style={styles.faceIdText}>Sign in with Face ID</Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or use password</Text>
            <View style={styles.divider} />
          </View>

          {/* Email Input */}
          <View style={styles.inputWrap}>
            <Text style={styles.inputIcon}>📧</Text>
            <TextInput
              style={styles.loginInput}
              placeholder="Admin email"
              placeholderTextColor="#555577"
              value={loginEmail}
              onChangeText={setLoginEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputWrap}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              style={styles.loginInput}
              placeholder="Admin password"
              placeholderTextColor="#555577"
              value={loginPassword}
              onChangeText={setLoginPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeBtn}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>

          {loginError ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {loginError}</Text>
            </View>
          ) : null}

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleAdminLogin}
          >
            <Text style={styles.loginBtnText}>Access Admin Panel →</Text>
          </TouchableOpacity>

          <Text style={styles.loginWarning}>
            🔒 All access attempts are logged and monitored.
            {'\n'}Unauthorised access is a criminal offence.
          </Text>
        </View>
      </View>
    );
  }

  // ── ADMIN DASHBOARD ──────────────────────────────────

  return (
    <View style={styles.dashBg}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A1A" />

      {/* Admin Header */}
      <SafeAreaView style={styles.adminHeaderSafe}>
        <View style={styles.adminHeader}>
          <TouchableOpacity onPress={onBack} style={styles.backBtnAdmin}>
            <Text style={styles.backArrowAdmin}>←</Text>
          </TouchableOpacity>
          <View style={styles.adminHeaderCenter}>
            <Text style={styles.adminHeaderTitle}>👑 Admin Panel</Text>
            <Text style={styles.adminHeaderSub}>Bellava · Reine Mande Ltd</Text>
          </View>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => {
              Alert.alert(
                'Sign Out',
                'Are you sure you want to sign out of the admin panel?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Sign Out', onPress: () => setIsAuthenticated(false) },
                ]
              );
            }}
          >
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

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

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <>
            <Text style={styles.sectionTitle}>📊 App Performance</Text>
            <View style={styles.statsGrid}>
              {[
                { label: 'Total Users', value: MOCK_STATS.totalUsers.toLocaleString(), emoji: '👥', color: '#A78BFA' },
                { label: 'Active Today', value: MOCK_STATS.activeToday, emoji: '🟢', color: '#34D399' },
                { label: 'New This Week', value: MOCK_STATS.newThisWeek, emoji: '🆕', color: '#60A5FA' },
                { label: 'Bella Chats', value: MOCK_STATS.bellaChats.toLocaleString(), emoji: '🤖', color: '#F472B6' },
                { label: 'Posts', value: MOCK_STATS.communityPosts, emoji: '💬', color: '#FBBF24' },
                { label: 'Avg Session', value: `${MOCK_STATS.avgSessionMin}m`, emoji: '⏱️', color: '#FB923C' },
              ].map((stat, i) => (
                <View key={i} style={styles.statCard}>
                  <Text style={styles.statEmoji}>{stat.emoji}</Text>
                  <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>💰 Revenue</Text>
            <View style={styles.revenueCard}>
              {[
                { label: 'Total Revenue', value: MOCK_STATS.totalRevenue, color: '#34D399' },
                { label: 'This Month', value: MOCK_STATS.monthlyRevenue, color: '#60A5FA' },
                { label: 'Top Feature', value: MOCK_STATS.mostUsedFeature, color: '#F472B6' },
              ].map((item, i) => (
                <View key={i} style={[styles.revenueRow, i < 2 && styles.revenueRowBorder]}>
                  <Text style={styles.revenueLabel}>{item.label}</Text>
                  <Text style={[styles.revenueValue, { color: item.color }]}>{item.value}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>📱 Subscriptions</Text>
            <View style={styles.subRow}>
              {[
                { emoji: '🆓', label: 'FREE', value: MOCK_STATS.freeUsers, color: '#6B7280' },
                { emoji: '⭐', label: 'PLUS', value: MOCK_STATS.plusSubscribers, color: '#A78BFA' },
                { emoji: '👑', label: 'PRO', value: MOCK_STATS.proSubscribers, color: '#F59E0B' },
              ].map((sub, i) => (
                <View key={i} style={[styles.subCard, { borderColor: sub.color }]}>
                  <Text style={styles.subEmoji}>{sub.emoji}</Text>
                  <Text style={[styles.subValue, { color: sub.color }]}>{sub.value}</Text>
                  <Text style={styles.subLabel}>{sub.label}</Text>
                </View>
              ))}
            </View>

            <View style={styles.noteCard}>
              <Text style={styles.noteText}>
                📝 Live data will appear here once Supabase is fully connected.
              </Text>
            </View>
          </>
        )}

        {/* USERS */}
        {activeTab === 'users' && (
          <>
            <Text style={styles.sectionTitle}>👥 Users ({MOCK_USERS.length})</Text>
            {MOCK_USERS.map(user => (
              <TouchableOpacity
                key={user.id}
                style={styles.userCard}
                onPress={() => setSelectedUser(user)}
              >
                <View style={[styles.userAvatar, { backgroundColor: planColor(user.plan) }]}>
                  <Text style={styles.userAvatarText}>{user.name.charAt(0)}</Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userCardName}>{user.name}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                  <Text style={styles.userJoined}>Joined {user.joined}</Text>
                </View>
                <View style={styles.userRight}>
                  <View style={[styles.planBadge, { backgroundColor: planColor(user.plan) }]}>
                    <Text style={styles.planBadgeText}>{user.plan}</Text>
                  </View>
                  <Text style={[
                    styles.userStatus,
                    { color: user.status === 'Active' ? '#34D399' : '#6B7280' },
                  ]}>
                    {user.status === 'Active' ? '🟢' : '⚫'} {user.status}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            <View style={styles.noteCard}>
              <Text style={styles.noteText}>
                📝 Real user data will appear once Supabase is connected.
              </Text>
            </View>
          </>
        )}

        {/* REPORTS */}
        {activeTab === 'reports' && (
          <>
            <Text style={styles.sectionTitle}>🚨 Community Reports</Text>
            {MOCK_REPORTS.map(report => (
              <View key={report.id} style={styles.reportCard}>
                <View style={styles.reportTop}>
                  <Text style={styles.reportUser}>{report.user}</Text>
                  <View style={[
                    styles.reportBadge,
                    { backgroundColor: report.status === 'Pending' ? '#FFF3CD20' : '#D4EDDA20' },
                  ]}>
                    <Text style={[
                      styles.reportBadgeText,
                      { color: report.status === 'Pending' ? '#FBBF24' : '#34D399' },
                    ]}>
                      {report.status}
                    </Text>
                  </View>
                </View>
                <Text style={styles.reportReason}>{report.reason}</Text>
                <Text style={styles.reportDate}>📅 {report.date}</Text>
                {report.status === 'Pending' && (
                  <View style={styles.reportActions}>
                    <TouchableOpacity style={styles.reportWarnBtn}>
                      <Text style={styles.reportWarnText}>⚠️ Warn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.reportRemoveBtn}>
                      <Text style={styles.reportRemoveText}>🚫 Remove</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </>
        )}

        {/* ANNOUNCE */}
        {activeTab === 'announce' && (
          <>
            <Text style={styles.sectionTitle}>📢 Send Announcement</Text>
            <View style={styles.announceCard}>
              <Text style={styles.announceLabel}>Message to all Bellava users:</Text>
              <TextInput
                style={styles.announceInput}
                placeholder="Write your announcement here..."
                placeholderTextColor="#555577"
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

            <Text style={styles.sectionTitle}>📋 Past Announcements</Text>
            {ANNOUNCEMENTS.map(a => (
              <View key={a.id} style={styles.pastAnnounce}>
                <Text style={styles.pastAnnounceTitle}>{a.title}</Text>
                <Text style={styles.pastAnnounceDate}>📅 {a.date} · ✅ Sent</Text>
              </View>
            ))}
          </>
        )}

        {/* BUSINESS */}
        {activeTab === 'business' && (
          <>
            <Text style={styles.sectionTitle}>💼 Business Overview</Text>
            {[
              { emoji: '🏢', label: 'Company', value: 'Reine Mande Ltd' },
              { emoji: '📍', label: 'Location', value: 'London, United Kingdom' },
              { emoji: '📱', label: 'App', value: 'Bellava' },
              { emoji: '🎯', label: 'Market', value: 'Women 18–45, UK & Global' },
              { emoji: '🌍', label: 'Languages', value: 'EN, FR, AR, ES, DE, PT' },
              { emoji: '💰', label: 'Tiers', value: 'Free / Plus / Pro' },
              { emoji: '🤖', label: 'AI', value: 'Claude (Anthropic)' },
              { emoji: '🗄️', label: 'Database', value: 'Supabase' },
              { emoji: '📧', label: 'Support', value: 'support@bellava.com' },
            ].map((item, i) => (
              <View key={i} style={styles.bizRow}>
                <Text style={styles.bizEmoji}>{item.emoji}</Text>
                <Text style={styles.bizLabel}>{item.label}</Text>
                <Text style={styles.bizValue}>{item.value}</Text>
              </View>
            ))}

            <Text style={styles.sectionTitle}>🚀 Launch Checklist</Text>
            {[
              { done: true, task: 'All 23 screens built' },
              { done: true, task: 'Bella AI integrated' },
              { done: true, task: 'Journey personalisation' },
              { done: true, task: 'Pregnancy tracker' },
              { done: true, task: 'Profile all buttons working' },
              { done: false, task: 'Supabase auth connected' },
              { done: false, task: 'RevenueCat payments live' },
              { done: false, task: 'Apple Developer Account' },
              { done: false, task: 'App icon designed' },
              { done: false, task: 'EAS Build configured' },
              { done: false, task: 'Privacy Policy live URL' },
              { done: false, task: 'App Store listing written' },
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
                    <Text style={styles.modalWarnText}>⚠️ Warn User</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalSuspendBtn}>
                    <Text style={styles.modalSuspendText}>🚫 Suspend</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setSelectedUser(null)}
            >
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Announcement Confirm Modal */}
      <Modal visible={showAnnouncement} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalName}>📢 Confirm Send</Text>
            <View style={styles.announcePreviewBox}>
              <Text style={styles.announcePreviewText}>{announcementText}</Text>
            </View>
            <Text style={styles.announceToText}>
              Sending to {MOCK_STATS.totalUsers.toLocaleString()} users
            </Text>
            <TouchableOpacity
              style={styles.sendBtn}
              onPress={() => {
                setShowAnnouncement(false);
                setAnnouncementText('');
                Alert.alert('✅ Sent!', 'Your announcement has been sent to all users. 💜');
              }}
            >
              <Text style={styles.sendBtnText}>✅ Confirm Send</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowAnnouncement(false)}
            >
              <Text style={styles.closeBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // ── LOGIN STYLES ──
  loginBg: {
    flex: 1, backgroundColor: '#0A0A1A',
    justifyContent: 'center', alignItems: 'center',
  },
  loginSafeTop: {
    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
  },
  loginBackBtn: {
    margin: 20, marginTop: 52,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 50,
  },
  loginBackText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  loginCircle1: {
    position: 'absolute', width: 300, height: 300, borderRadius: 150,
    backgroundColor: '#C9748F20', top: -80, right: -80,
  },
  loginCircle2: {
    position: 'absolute', width: 200, height: 200, borderRadius: 100,
    backgroundColor: '#9B59B620', bottom: 60, left: -60,
  },
  loginCircle3: {
    position: 'absolute', width: 150, height: 150, borderRadius: 75,
    backgroundColor: '#C9748F15', bottom: -30, right: 40,
  },
  loginContainer: {
    width: '88%', alignItems: 'center',
  },
  loginLogoWrap: {
    position: 'relative', marginBottom: 20,
  },
  loginLogo: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.3)',
    shadowColor: COLORS.primary, shadowOpacity: 0.5,
    shadowRadius: 20, elevation: 10,
  },
  loginLogoLetter: { color: '#fff', fontSize: 36, fontWeight: '800' },
  loginCrown: {
    position: 'absolute', top: -10, right: -10,
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#FFD700',
    alignItems: 'center', justifyContent: 'center',
  },
  loginCrownText: { fontSize: 16 },
  loginTitle: {
    fontSize: 28, fontWeight: '800', color: '#fff',
    marginBottom: 8, letterSpacing: 0.5,
  },
  loginSub: {
    fontSize: 13, color: '#888899',
    marginBottom: 32, textAlign: 'center',
  },
  faceIdBtn: {
    width: '100%', flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center',
    gap: 12, backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16, paddingVertical: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
    marginBottom: 24,
  },
  faceIdIcon: { fontSize: 24 },
  faceIdText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  dividerRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 12, width: '100%', marginBottom: 20,
  },
  divider: { flex: 1, height: 1, backgroundColor: '#222233' },
  dividerText: { fontSize: 12, color: '#555577' },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#111122', borderRadius: 14,
    borderWidth: 1, borderColor: '#222233',
    paddingHorizontal: 14, marginBottom: 12, width: '100%',
  },
  inputIcon: { fontSize: 18, marginRight: 10 },
  loginInput: {
    flex: 1, paddingVertical: 15,
    fontSize: 15, color: '#fff',
  },
  eyeBtn: { padding: 4 },
  eyeIcon: { fontSize: 18 },
  errorBox: {
    backgroundColor: '#FF000015', borderRadius: 12,
    padding: 12, width: '100%', marginBottom: 12,
    borderWidth: 1, borderColor: '#FF000040',
  },
  errorText: { color: '#FF6B6B', fontSize: 13, fontWeight: '600' },
  loginBtn: {
    width: '100%', backgroundColor: COLORS.primary,
    borderRadius: 50, paddingVertical: 17,
    alignItems: 'center', marginTop: 8,
    shadowColor: COLORS.primary, shadowOpacity: 0.5,
    shadowRadius: 16, elevation: 8,
  },
  loginBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  loginWarning: {
    fontSize: 11, color: '#444455',
    textAlign: 'center', marginTop: 20, lineHeight: 18,
  },

  // ── DASHBOARD STYLES ──
  dashBg: { flex: 1, backgroundColor: '#0F0F1A' },
  adminHeaderSafe: { backgroundColor: '#0A0A1A' },
  adminHeader: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 14, gap: 12,
    backgroundColor: '#0A0A1A',
    borderBottomWidth: 1, borderBottomColor: '#1A1A2E',
  },
  backBtnAdmin: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },
  backArrowAdmin: { fontSize: 20, color: '#fff' },
  adminHeaderCenter: { flex: 1 },
  adminHeaderTitle: { fontSize: 18, fontWeight: '800', color: '#fff' },
  adminHeaderSub: { fontSize: 11, color: '#666677', marginTop: 2 },
  logoutBtn: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 50, paddingHorizontal: 14, paddingVertical: 8,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  logoutText: { color: '#888899', fontWeight: '600', fontSize: 13 },
  tabs: { backgroundColor: '#0A0A1A', maxHeight: 52 },
  tabsContent: { paddingHorizontal: 16, paddingBottom: 10, gap: 8 },
  tab: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.05)',
  },
  tabActive: { backgroundColor: COLORS.primary },
  tabLabel: { fontSize: 13, fontWeight: '600', color: '#666677' },
  tabLabelActive: { color: '#fff' },
  content: { flex: 1, padding: 16 },
  sectionTitle: {
    fontSize: 16, fontWeight: '800', color: '#fff',
    marginTop: 8, marginBottom: 12,
  },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 8 },
  statCard: {
    backgroundColor: '#1A1A2E', borderRadius: 16,
    padding: 14, alignItems: 'center',
    width: '30%', flex: 1, minWidth: 90,
    borderWidth: 1, borderColor: '#2A2A3E',
  },
  statEmoji: { fontSize: 22, marginBottom: 6 },
  statValue: { fontSize: 18, fontWeight: '800' },
  statLabel: { fontSize: 11, color: '#666677', textAlign: 'center', marginTop: 2 },
  revenueCard: {
    backgroundColor: '#1A1A2E', borderRadius: 16,
    padding: 16, borderWidth: 1, borderColor: '#2A2A3E', marginBottom: 8,
  },
  revenueRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 12,
  },
  revenueRowBorder: { borderBottomWidth: 1, borderBottomColor: '#2A2A3E' },
  revenueLabel: { fontSize: 14, color: '#888899' },
  revenueValue: { fontSize: 16, fontWeight: '800' },
  subRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  subCard: {
    flex: 1, backgroundColor: '#1A1A2E',
    borderRadius: 16, padding: 16,
    alignItems: 'center', borderWidth: 2,
  },
  subEmoji: { fontSize: 24, marginBottom: 6 },
  subValue: { fontSize: 22, fontWeight: '800' },
  subLabel: { fontSize: 12, fontWeight: '700', color: '#666677', marginTop: 2 },
  noteCard: {
    backgroundColor: '#1A1A2E', borderRadius: 12,
    padding: 14, marginTop: 8,
    borderWidth: 1, borderColor: '#2A2A3E',
  },
  noteText: { fontSize: 12, color: '#666677', lineHeight: 18 },
  userCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1A1A2E', borderRadius: 16,
    padding: 14, marginBottom: 10,
    borderWidth: 1, borderColor: '#2A2A3E', gap: 12,
  },
  userAvatar: {
    width: 44, height: 44, borderRadius: 22,
    alignItems: 'center', justifyContent: 'center',
  },
  userAvatarText: { color: '#fff', fontWeight: '800', fontSize: 18 },
  userInfo: { flex: 1 },
  userCardName: { fontSize: 15, fontWeight: '700', color: '#fff' },
  userEmail: { fontSize: 12, color: '#666677', marginTop: 2 },
  userJoined: { fontSize: 11, color: '#444455', marginTop: 2 },
  userRight: { alignItems: 'flex-end', gap: 6 },
  planBadge: { borderRadius: 50, paddingHorizontal: 10, paddingVertical: 4 },
  planBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  userStatus: { fontSize: 11, fontWeight: '600' },
  reportCard: {
    backgroundColor: '#1A1A2E', borderRadius: 16,
    padding: 16, marginBottom: 12,
    borderWidth: 1, borderColor: '#2A2A3E',
  },
  reportTop: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8,
  },
  reportUser: { fontSize: 14, fontWeight: '700', color: '#fff' },
  reportBadge: { borderRadius: 50, paddingHorizontal: 10, paddingVertical: 4 },
  reportBadgeText: { fontSize: 12, fontWeight: '600' },
  reportReason: { fontSize: 14, color: '#888899', marginBottom: 6 },
  reportDate: { fontSize: 12, color: '#555566', marginBottom: 10 },
  reportActions: { flexDirection: 'row', gap: 10 },
  reportWarnBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 12,
    backgroundColor: '#FBBF2420', alignItems: 'center',
  },
  reportWarnText: { fontSize: 13, fontWeight: '600', color: '#FBBF24' },
  reportRemoveBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 12,
    backgroundColor: '#EF444420', alignItems: 'center',
  },
  reportRemoveText: { fontSize: 13, fontWeight: '600', color: '#EF4444' },
  announceCard: {
    backgroundColor: '#1A1A2E', borderRadius: 16,
    padding: 16, borderWidth: 1, borderColor: '#2A2A3E', marginBottom: 16,
  },
  announceLabel: { fontSize: 14, color: '#888899', marginBottom: 10, fontWeight: '600' },
  announceInput: {
    backgroundColor: '#111122', borderRadius: 14,
    padding: 14, fontSize: 14, color: '#fff',
    minHeight: 100, textAlignVertical: 'top',
    marginBottom: 14, borderWidth: 1, borderColor: '#2A2A3E',
  },
  sendBtn: {
    backgroundColor: COLORS.primary, borderRadius: 50,
    paddingVertical: 14, alignItems: 'center',
    marginBottom: 10,
  },
  sendBtnDisabled: { opacity: 0.4 },
  sendBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  pastAnnounce: {
    backgroundColor: '#1A1A2E', borderRadius: 14,
    padding: 14, marginBottom: 10,
    borderWidth: 1, borderColor: '#2A2A3E',
  },
  pastAnnounceTitle: { fontSize: 14, fontWeight: '700', color: '#fff' },
  pastAnnounceDate: { fontSize: 12, color: '#666677', marginTop: 4 },
  bizRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1A1A2E', borderRadius: 14,
    padding: 14, marginBottom: 8,
    borderWidth: 1, borderColor: '#2A2A3E', gap: 10,
  },
  bizEmoji: { fontSize: 20 },
  bizLabel: { fontSize: 13, color: '#666677', width: 80 },
  bizValue: { fontSize: 13, fontWeight: '700', color: '#fff', flex: 1 },
  checkRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: '#1A1A2E', gap: 10,
  },
  checkIcon: { fontSize: 18 },
  checkTask: { fontSize: 14, color: '#888899' },
  checkTaskDone: { color: '#444455', textDecorationLine: 'line-through' },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#1A1A2E', borderTopLeftRadius: 28,
    borderTopRightRadius: 28, padding: 28, alignItems: 'center',
  },
  modalHandle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: '#333344', marginBottom: 20,
  },
  modalAvatar: {
    width: 64, height: 64, borderRadius: 32,
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  modalAvatarText: { color: '#fff', fontWeight: '800', fontSize: 26 },
  modalName: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 4 },
  modalEmail: { fontSize: 14, color: '#666677', marginBottom: 16 },
  modalRow: {
    width: '100%', flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#2A2A3E',
  },
  modalRowLabel: { fontSize: 14, color: '#666677' },
  modalRowValue: { fontSize: 14, fontWeight: '700', color: '#fff' },
  modalActions: { flexDirection: 'row', gap: 10, marginTop: 16, width: '100%' },
  modalWarnBtn: {
    flex: 1, backgroundColor: '#FBBF2420',
    borderRadius: 50, paddingVertical: 12, alignItems: 'center',
  },
  modalWarnText: { color: '#FBBF24', fontWeight: '700', fontSize: 14 },
  modalSuspendBtn: {
    flex: 1, backgroundColor: '#EF444420',
    borderRadius: 50, paddingVertical: 12, alignItems: 'center',
  },
  modalSuspendText: { color: '#EF4444', fontWeight: '700', fontSize: 14 },
  announcePreviewBox: {
    backgroundColor: '#111122', borderRadius: 12,
    padding: 14, width: '100%', marginVertical: 12,
  },
  announcePreviewText: { fontSize: 14, color: '#888899', lineHeight: 22 },
  announceToText: { fontSize: 13, color: '#666677', marginBottom: 16 },
  closeBtn: {
    borderWidth: 1, borderColor: '#2A2A3E', borderRadius: 50,
    paddingVertical: 13, paddingHorizontal: 48, marginTop: 10,
  },
  closeBtnText: { color: '#666677', fontWeight: '700', fontSize: 15 },
});
