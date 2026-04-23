import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar, Modal,
} from 'react-native';
import COLORS from './colors';

const LANGUAGES = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'ar', flag: '🇸🇦', label: 'العربية' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'pt', flag: '🇵🇹', label: 'Português' },
];

const NOTIFICATION_SETTINGS = [
  { id: 'daily', label: 'Daily check-in reminder', emoji: '📅' },
  { id: 'period', label: 'Period prediction alerts', emoji: '🌸' },
  { id: 'ovulation', label: 'Ovulation window alerts', emoji: '✨' },
  { id: 'community', label: 'Community replies', emoji: '💬' },
  { id: 'appointments', label: 'Appointment reminders', emoji: '🏥' },
  { id: 'bella', label: 'Bella health tips', emoji: '🤖' },
  { id: 'marketing', label: 'News and updates', emoji: '📢' },
];

export default function ProfileScreen({ onBack, userName, userEmail, userPlan, onLogout, onNavigate }) {
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState({
    daily: true,
    period: true,
    ovulation: true,
    community: true,
    appointments: true,
    bella: true,
    marketing: false,
  });
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const firstName = userName ? userName.split(' ')[0] : 'Beautiful';
  const currentLanguage = LANGUAGES.find(l => l.code === language);

  const toggleNotification = (id) => {
    setNotifications(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const planColor = () => {
    if (userPlan === 'PRO') return '#F59E0B';
    if (userPlan === 'PLUS') return COLORS.primary;
    return COLORS.textLight;
  };

  const planEmoji = () => {
    if (userPlan === 'PRO') return '👑';
    if (userPlan === 'PLUS') return '⭐';
    return '🆓';
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarLetter}>
              {firstName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.profileName}>{firstName}</Text>
          <Text style={styles.profileEmail}>{userEmail || 'No email set'}</Text>
          <View style={[styles.planBadge, { backgroundColor: planColor() }]}>
            <Text style={styles.planBadgeText}>
              {planEmoji()} {userPlan} Plan
            </Text>
          </View>
          {userPlan === 'FREE' && (
            <TouchableOpacity
              style={styles.upgradeBtn}
              onPress={() => onNavigate('subscription')}
            >
              <Text style={styles.upgradeBtnText}>Upgrade to Plus or Pro 💜</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Language Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌍 Language</Text>
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => setShowLanguageModal(true)}
          >
            <Text style={styles.settingEmoji}>{currentLanguage.flag}</Text>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>App Language</Text>
              <Text style={styles.settingValue}>{currentLanguage.label}</Text>
            </View>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔔 Notifications</Text>
          {NOTIFICATION_SETTINGS.map(setting => (
            <View key={setting.id} style={styles.notifRow}>
              <Text style={styles.notifEmoji}>{setting.emoji}</Text>
              <Text style={styles.notifLabel}>{setting.label}</Text>
              <TouchableOpacity
                style={[
                  styles.toggle,
                  notifications[setting.id] && styles.toggleOn,
                ]}
                onPress={() => toggleNotification(setting.id)}
              >
                <View style={[
                  styles.toggleThumb,
                  notifications[setting.id] && styles.toggleThumbOn,
                ]} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Account</Text>
          {[
            { emoji: '✏️', label: 'Edit Profile', action: () => {} },
            { emoji: '🔒', label: 'Change Password', action: () => {} },
            { emoji: '⭐', label: 'Manage Subscription', action: () => onNavigate('subscription') },
            { emoji: '📥', label: 'Download My Data', action: () => {} },
          ].map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.settingRow}
              onPress={item.action}
            >
              <Text style={styles.settingEmoji}>{item.emoji}</Text>
              <Text style={[styles.settingInfo, { flex: 1 }]}>
                <Text style={styles.settingLabel}>{item.label}</Text>
              </Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Legal & Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Legal & Support</Text>
          {[
            { emoji: '🔒', label: 'Privacy Policy' },
            { emoji: '📄', label: 'Terms of Service' },
            { emoji: '⚕️', label: 'Medical Disclaimer' },
            { emoji: '💬', label: 'Contact Support' },
            { emoji: '⭐', label: 'Rate Bellava' },
            { emoji: '🐛', label: 'Report a Bug' },
          ].map((item, i) => (
            <TouchableOpacity key={i} style={styles.settingRow}>
              <Text style={styles.settingEmoji}>{item.emoji}</Text>
              <Text style={[styles.settingLabel, { flex: 1 }]}>{item.label}</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <View style={styles.appLogoSmall}>
            <Text style={styles.appLogoLetter}>B</Text>
          </View>
          <Text style={styles.appName}>Bellava</Text>
          <Text style={styles.appVersion}>Version 1.0.0 — by Reine Mande Ltd</Text>
          <Text style={styles.appTagline}>Your health. Your body. Your power. 💜</Text>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => setShowLogoutModal(true)}
        >
          <Text style={styles.logoutBtnText}>Sign Out</Text>
        </TouchableOpacity>

        {/* Delete Account */}
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => setShowDeleteModal(true)}
        >
          <Text style={styles.deleteBtnText}>Delete Account</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Language Modal */}
      <Modal visible={showLanguageModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Choose Language</Text>
            {LANGUAGES.map(lang => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.langRow,
                  language === lang.code && styles.langRowActive,
                ]}
                onPress={() => {
                  setLanguage(lang.code);
                  setShowLanguageModal(false);
                }}
              >
                <Text style={styles.langFlag}>{lang.flag}</Text>
                <Text style={[
                  styles.langLabel,
                  language === lang.code && { color: COLORS.primary, fontWeight: '700' },
                ]}>
                  {lang.label}
                </Text>
                {language === lang.code && (
                  <Text style={styles.langCheck}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowLanguageModal(false)}
            >
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Logout Modal */}
      <Modal visible={showLogoutModal} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEmoji}>👋</Text>
            <Text style={styles.modalTitle}>Sign out?</Text>
            <Text style={styles.modalSub}>
              You can always sign back in to access your Bellava account.
            </Text>
            <TouchableOpacity
              style={styles.confirmLogoutBtn}
              onPress={() => {
                setShowLogoutModal(false);
                onLogout();
              }}
            >
              <Text style={styles.confirmLogoutText}>Yes, sign out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setShowLogoutModal(false)}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Delete Account Modal */}
      <Modal visible={showDeleteModal} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEmoji}>⚠️</Text>
            <Text style={styles.modalTitle}>Delete Account?</Text>
            <Text style={styles.modalSub}>
              This will permanently delete your account and all your data. This action cannot be undone.
            </Text>
            <TouchableOpacity
              style={styles.confirmDeleteBtn}
              onPress={() => {
                setShowDeleteModal(false);
                onLogout();
              }}
            >
              <Text style={styles.confirmDeleteText}>Yes, delete my account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setShowDeleteModal(false)}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
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
  content: { flex: 1 },
  profileCard: {
    backgroundColor: COLORS.primary, padding: 28,
    alignItems: 'center',
  },
  avatarCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#fff', alignItems: 'center',
    justifyContent: 'center', marginBottom: 12,
  },
  avatarLetter: { fontSize: 36, fontWeight: '800', color: COLORS.primary },
  profileName: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 4 },
  profileEmail: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 12 },
  planBadge: {
    borderRadius: 50, paddingHorizontal: 16, paddingVertical: 7, marginBottom: 12,
  },
  planBadgeText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  upgradeBtn: {
    backgroundColor: '#fff', borderRadius: 50,
    paddingHorizontal: 20, paddingVertical: 10,
  },
  upgradeBtnText: { color: COLORS.primary, fontWeight: '700', fontSize: 14 },
  section: {
    backgroundColor: COLORS.white, marginTop: 12,
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 15, fontWeight: '800', color: COLORS.text,
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 12, gap: 12,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  settingEmoji: { fontSize: 20 },
  settingInfo: { flex: 1 },
  settingLabel: { fontSize: 15, color: COLORS.text, fontWeight: '500' },
  settingValue: { fontSize: 13, color: COLORS.textLight, marginTop: 2 },
  settingArrow: { fontSize: 22, color: COLORS.textLight },
  notifRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 12, gap: 12,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  notifEmoji: { fontSize: 20 },
  notifLabel: { flex: 1, fontSize: 15, color: COLORS.text },
  toggle: {
    width: 48, height: 28, borderRadius: 14,
    backgroundColor: COLORS.border, padding: 2,
    justifyContent: 'center',
  },
  toggleOn: { backgroundColor: COLORS.primary },
  toggleThumb: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: '#fff',
  },
  toggleThumbOn: { alignSelf: 'flex-end' },
  appInfo: {
    alignItems: 'center', padding: 24,
    backgroundColor: COLORS.white, marginTop: 12,
  },
  appLogoSmall: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  appLogoLetter: { color: '#fff', fontSize: 22, fontWeight: '800' },
  appName: { fontSize: 20, fontWeight: '800', color: COLORS.text, marginBottom: 4 },
  appVersion: { fontSize: 12, color: COLORS.textLight, marginBottom: 4 },
  appTagline: { fontSize: 13, color: COLORS.primary, fontWeight: '600' },
  logoutBtn: {
    margin: 16, marginBottom: 8,
    borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 50, paddingVertical: 14,
    alignItems: 'center', backgroundColor: COLORS.white,
  },
  logoutBtnText: { color: COLORS.text, fontWeight: '700', fontSize: 16 },
  deleteBtn: {
    marginHorizontal: 16, marginBottom: 8,
    borderRadius: 50, paddingVertical: 14,
    alignItems: 'center',
  },
  deleteBtnText: { color: '#E74C3C', fontWeight: '600', fontSize: 15 },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: COLORS.white, borderTopLeftRadius: 28,
    borderTopRightRadius: 28, padding: 24,
  },
  modalCard: {
    backgroundColor: COLORS.white, borderTopLeftRadius: 28,
    borderTopRightRadius: 28, padding: 28, alignItems: 'center',
  },
  modalHandle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: COLORS.border, alignSelf: 'center', marginBottom: 20,
  },
  modalEmoji: { fontSize: 44, marginBottom: 12 },
  modalTitle: { fontSize: 22, fontWeight: '800', color: COLORS.text, marginBottom: 12 },
  modalSub: {
    fontSize: 14, color: COLORS.textLight,
    textAlign: 'center', lineHeight: 22, marginBottom: 20,
  },
  langRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, gap: 14,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  langRowActive: { backgroundColor: COLORS.primaryLight },
  langFlag: { fontSize: 26 },
  langLabel: { fontSize: 16, color: COLORS.text, flex: 1 },
  langCheck: { fontSize: 18, color: COLORS.primary, fontWeight: '700' },
  closeBtn: {
    marginTop: 16, borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 50, paddingVertical: 14, alignItems: 'center',
  },
  closeBtnText: { color: COLORS.textLight, fontWeight: '700', fontSize: 15 },
  confirmLogoutBtn: {
    width: '100%', backgroundColor: COLORS.primary,
    borderRadius: 50, paddingVertical: 15,
    alignItems: 'center', marginBottom: 10,
  },
  confirmLogoutText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  confirmDeleteBtn: {
    width: '100%', backgroundColor: '#E74C3C',
    borderRadius: 50, paddingVertical: 15,
    alignItems: 'center', marginBottom: 10,
  },
  confirmDeleteText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  cancelBtn: {
    borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 50, paddingVertical: 13,
    paddingHorizontal: 48,
  },
  cancelBtnText: { color: COLORS.textLight, fontWeight: '700', fontSize: 15 },
});
