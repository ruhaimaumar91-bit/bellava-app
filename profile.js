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

const JOURNEYS = [
  { id: 'conceive', emoji: '🌱', label: 'Trying to Conceive', color: '#27AE60' },
  { id: 'pregnant', emoji: '🤰', label: 'Pregnant', color: '#9B59B6' },
  { id: 'surrogacy', emoji: '👶', label: 'Surrogacy Journey', color: '#E91E8C' },
  { id: 'wellbeing', emoji: '💜', label: 'General Wellbeing', color: '#C9748F' },
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

const AVATAR_COLORS = [
  '#C9748F', '#9B59B6', '#27AE60', '#E91E8C',
  '#F39C12', '#4A90C4', '#E74C3C', '#1ABC9C',
];

export default function ProfileScreen({
  onBack, userName, userEmail, userPlan,
  userJourney, onLogout, onNavigate,
}) {
  const [language, setLanguage] = useState('en');
  const [journey, setJourney] = useState(userJourney || 'wellbeing');
  const [avatarColor, setAvatarColor] = useState(COLORS.primary);
  const [notifications, setNotifications] = useState({
    daily: true, period: true, ovulation: true,
    community: true, appointments: true, bella: true, marketing: false,
  });
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showJourneyModal, setShowJourneyModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const firstName = userName ? userName.split(' ')[0] : 'Beautiful';
  const currentLanguage = LANGUAGES.find(l => l.code === language);
  const currentJourney = JOURNEYS.find(j => j.id === journey);

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
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* Profile Hero Card */}
        <View style={styles.heroCard}>
          {/* Background decoration */}
          <View style={styles.heroBg} />
          <View style={styles.heroContent}>

            {/* Avatar */}
            <TouchableOpacity
              style={styles.avatarWrap}
              onPress={() => setShowAvatarModal(true)}
            >
              <View style={[styles.avatarCircle, { backgroundColor: avatarColor }]}>
                <Text style={styles.avatarLetter}>
                  {firstName.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.editAvatarBadge}>
                <Text style={styles.editAvatarIcon}>✏️</Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.profileName}>{firstName}</Text>
            <Text style={styles.profileEmail}>{userEmail || 'No email set'}</Text>

            {/* Plan Badge */}
            <View style={[styles.planBadge, { backgroundColor: planColor() }]}>
              <Text style={styles.planBadgeText}>
                {planEmoji()} {userPlan} Plan
              </Text>
            </View>

            {/* Journey Badge */}
            {currentJourney && (
              <View style={[styles.journeyBadge, { backgroundColor: `${currentJourney.color}20`, borderColor: `${currentJourney.color}40` }]}>
                <Text style={styles.journeyBadgeEmoji}>{currentJourney.emoji}</Text>
                <Text style={[styles.journeyBadgeText, { color: currentJourney.color }]}>
                  {currentJourney.label}
                </Text>
              </View>
            )}

            {/* Upgrade button for free users */}
            {userPlan === 'FREE' && (
              <TouchableOpacity
                style={styles.upgradeBtn}
                onPress={() => onNavigate('subscription')}
              >
                <Text style={styles.upgradeBtnText}>✨ Upgrade to Plus or Pro</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          {[
            { emoji: '🌸', value: '28', label: 'Cycle Days' },
            { emoji: '📊', value: '12', label: 'Logs' },
            { emoji: '🤖', value: '5', label: 'Bella Chats' },
          ].map((stat, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={styles.statEmoji}>{stat.emoji}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Journey Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌸 My Journey</Text>
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => setShowJourneyModal(true)}
          >
            <Text style={styles.settingEmoji}>{currentJourney?.emoji || '💜'}</Text>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Current Journey</Text>
              <Text style={styles.settingValue}>{currentJourney?.label || 'General Wellbeing'}</Text>
            </View>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>
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
                style={[styles.toggle, notifications[setting.id] && styles.toggleOn]}
                onPress={() => toggleNotification(setting.id)}
              >
                <View style={[styles.toggleThumb, notifications[setting.id] && styles.toggleThumbOn]} />
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
            <TouchableOpacity key={i} style={styles.settingRow} onPress={item.action}>
              <Text style={styles.settingEmoji}>{item.emoji}</Text>
              <Text style={[styles.settingLabel, { flex: 1 }]}>{item.label}</Text>
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

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => setShowDeleteModal(true)}
        >
          <Text style={styles.deleteBtnText}>Delete Account</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Avatar Colour Modal */}
      <Modal visible={showAvatarModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Choose Your Colour 🎨</Text>
            <Text style={styles.modalSub}>Pick a colour for your profile avatar</Text>
            <View style={styles.colourGrid}>
              {AVATAR_COLORS.map((color, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.colourDot,
                    { backgroundColor: color },
                    avatarColor === color && styles.colourDotSelected,
                  ]}
                  onPress={() => setAvatarColor(color)}
                >
                  {avatarColor === color && (
                    <Text style={styles.colourCheck}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.avatarPreview}>
              <View style={[styles.avatarPreviewCircle, { backgroundColor: avatarColor }]}>
                <Text style={styles.avatarPreviewLetter}>
                  {firstName.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.avatarPreviewText}>Preview</Text>
            </View>
            <TouchableOpacity
              style={styles.doneBtn}
              onPress={() => setShowAvatarModal(false)}
            >
              <Text style={styles.doneBtnText}>Save 💜</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Journey Modal */}
      <Modal visible={showJourneyModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Change Your Journey 🌸</Text>
            <Text style={styles.modalSub}>Your app will personalise to your new journey</Text>
            {JOURNEYS.map(j => (
              <TouchableOpacity
                key={j.id}
                style={[
                  styles.journeyRow,
                  journey === j.id && { backgroundColor: `${j.color}10`, borderColor: j.color },
                ]}
                onPress={() => {
                  setJourney(j.id);
                  setShowJourneyModal(false);
                }}
              >
                <Text style={styles.journeyRowEmoji}>{j.emoji}</Text>
                <Text style={[
                  styles.journeyRowLabel,
                  journey === j.id && { color: j.color, fontWeight: '700' },
                ]}>
                  {j.label}
                </Text>
                {journey === j.id && (
                  <Text style={[styles.journeyCheck, { color: j.color }]}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowJourneyModal(false)}
            >
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Language Modal */}
      <Modal visible={showLanguageModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Choose Language 🌍</Text>
            {LANGUAGES.map(lang => (
              <TouchableOpacity
                key={lang.code}
                style={[styles.langRow, language === lang.code && styles.langRowActive]}
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
          <View style={[styles.modalSheet, { alignItems: 'center' }]}>
            <Text style={styles.modalEmoji}>👋</Text>
            <Text style={styles.modalTitle}>Sign out?</Text>
            <Text style={styles.modalSub}>
              You can always sign back in to access your Bellava account.
            </Text>
            <TouchableOpacity
              style={styles.confirmLogoutBtn}
              onPress={() => { setShowLogoutModal(false); onLogout(); }}
            >
              <Text style={styles.confirmLogoutText}>Yes, sign out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowLogoutModal(false)}
            >
              <Text style={styles.closeBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Delete Modal */}
      <Modal visible={showDeleteModal} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalSheet, { alignItems: 'center' }]}>
            <Text style={styles.modalEmoji}>⚠️</Text>
            <Text style={styles.modalTitle}>Delete Account?</Text>
            <Text style={styles.modalSub}>
              This will permanently delete your account and all your data. This cannot be undone.
            </Text>
            <TouchableOpacity
              style={styles.confirmDeleteBtn}
              onPress={() => { setShowDeleteModal(false); onLogout(); }}
            >
              <Text style={styles.confirmDeleteText}>Yes, delete my account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowDeleteModal(false)}
            >
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
  content: { flex: 1 },
  heroCard: {
    backgroundColor: COLORS.primary,
    paddingBottom: 28,
    overflow: 'hidden',
  },
  heroBg: {
    position: 'absolute',
    top: -60, right: -60,
    width: 200, height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  heroContent: { alignItems: 'center', paddingTop: 28, paddingHorizontal: 24 },
  avatarWrap: { position: 'relative', marginBottom: 14 },
  avatarCircle: {
    width: 88, height: 88, borderRadius: 44,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 3, borderColor: '#fff',
    shadowColor: '#000', shadowOpacity: 0.2,
    shadowRadius: 10, elevation: 6,
  },
  avatarLetter: { fontSize: 38, fontWeight: '800', color: '#fff' },
  editAvatarBadge: {
    position: 'absolute', bottom: 0, right: 0,
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2,
  },
  editAvatarIcon: { fontSize: 14 },
  profileName: { fontSize: 24, fontWeight: '800', color: '#fff', marginBottom: 4 },
  profileEmail: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 14 },
  planBadge: {
    borderRadius: 50, paddingHorizontal: 16, paddingVertical: 7,
    marginBottom: 10,
  },
  planBadgeText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  journeyBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderRadius: 50, paddingHorizontal: 14, paddingVertical: 8,
    borderWidth: 1, marginBottom: 14,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  journeyBadgeEmoji: { fontSize: 16 },
  journeyBadgeText: { fontSize: 13, fontWeight: '700', color: '#fff' },
  upgradeBtn: {
    backgroundColor: '#fff', borderRadius: 50,
    paddingHorizontal: 20, paddingVertical: 10,
  },
  upgradeBtnText: { color: COLORS.primary, fontWeight: '700', fontSize: 14 },
  statsRow: {
    flexDirection: 'row', margin: 16, gap: 12,
  },
  statCard: {
    flex: 1, backgroundColor: COLORS.white,
    borderRadius: 16, padding: 14, alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 8, elevation: 2,
  },
  statEmoji: { fontSize: 22, marginBottom: 6 },
  statValue: { fontSize: 20, fontWeight: '800', color: COLORS.primary },
  statLabel: { fontSize: 11, color: COLORS.textLight, marginTop: 2 },
  section: {
    backgroundColor: COLORS.white, marginTop: 12,
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8,
  },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: COLORS.text, marginBottom: 12 },
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
    backgroundColor: COLORS.border, padding: 2, justifyContent: 'center',
  },
  toggleOn: { backgroundColor: COLORS.primary },
  toggleThumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#fff' },
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
    borderRadius: 50, paddingVertical: 14, alignItems: 'center',
  },
  deleteBtnText: { color: '#E74C3C', fontWeight: '600', fontSize: 15 },
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
  modalEmoji: { fontSize: 44, marginBottom: 12, textAlign: 'center' },
  modalTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text, marginBottom: 6 },
  modalSub: {
    fontSize: 14, color: COLORS.textLight, marginBottom: 20, lineHeight: 22,
  },
  colourGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    gap: 14, justifyContent: 'center', marginBottom: 20,
  },
  colourDot: {
    width: 52, height: 52, borderRadius: 26,
    alignItems: 'center', justifyContent: 'center',
  },
  colourDotSelected: {
    borderWidth: 3, borderColor: '#fff',
    shadowColor: '#000', shadowOpacity: 0.2,
    shadowRadius: 8, elevation: 4,
  },
  colourCheck: { color: '#fff', fontWeight: '800', fontSize: 20 },
  avatarPreview: { alignItems: 'center', marginBottom: 20 },
  avatarPreviewCircle: {
    width: 72, height: 72, borderRadius: 36,
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  avatarPreviewLetter: { color: '#fff', fontSize: 30, fontWeight: '800' },
  avatarPreviewText: { fontSize: 13, color: COLORS.textLight },
  doneBtn: {
    backgroundColor: COLORS.primary, borderRadius: 50,
    paddingVertical: 15, alignItems: 'center',
  },
  doneBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  journeyRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, gap: 14,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
    borderRadius: 12, paddingHorizontal: 8,
    borderWidth: 1, borderColor: 'transparent', marginBottom: 6,
  },
  journeyRowEmoji: { fontSize: 26 },
  journeyRowLabel: { fontSize: 16, color: COLORS.text, flex: 1 },
  journeyCheck: { fontSize: 18, fontWeight: '700' },
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
    marginTop: 12, borderWidth: 2, borderColor: COLORS.border,
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
});
