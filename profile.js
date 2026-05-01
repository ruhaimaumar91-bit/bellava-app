import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar,
  Alert, Switch,
} from 'react-native';
import COLORS from './colors';

const MENU_ITEMS = [
  { id: '1', emoji: '👤', label: 'Personal Information', color: '#C9748F' },
  { id: '2', emoji: '🔔', label: 'Notifications', color: '#F59E0B' },
  { id: '3', emoji: '🔒', label: 'Privacy & Security', color: '#3498DB' },
  { id: '4', emoji: '💜', label: 'Subscription Plan', color: '#9B59B6' },
  { id: '5', emoji: '🌍', label: 'Language', color: '#27AE60' },
  { id: '6', emoji: '♿', label: 'Accessibility', color: '#E67E22' },
  { id: '7', emoji: '❓', label: 'Help & Support', color: '#1ABC9C' },
  { id: '8', emoji: '⭐', label: 'Rate Bellava', color: '#F1C40F' },
  { id: '9', emoji: '📄', label: 'Privacy Policy', color: '#95A5A6' },
  { id: '10', emoji: '📋', label: 'Terms of Service', color: '#95A5A6' },
];

const STATS = [
  { label: 'Days Tracked', value: '47', emoji: '📅' },
  { label: 'Symptoms Logged', value: '23', emoji: '📝' },
  { label: 'Streak', value: '12', emoji: '🔥' },
];

const LANGUAGES = ['English', 'French', 'Arabic', 'Spanish', 'German', 'Portuguese'];
export default function ProfileScreen({ userName, userEmail, userPlan, onLogout, onNavigate }) {
  const [notifications, setNotifications] = useState(true);
  const [periodReminders, setPeriodReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleMenuItem = (item) => {
    if (item.label === 'Privacy & Security') {
      onNavigate('privacysecurity');
    } else if (item.label === 'Accessibility') {
      onNavigate('accessibility');
    } else if (item.label === 'Subscription Plan') {
      onNavigate('subscription');
    } else if (item.label === 'Notifications') {
      onNavigate('notifications');
    } else if (item.label === 'Language') {
      setShowLanguage(!showLanguage);
    } else if (item.label === 'Personal Information') {
      Alert.alert(
        'Personal Information 💜',
        `Name: ${userName || 'Not set'}\nEmail: ${userEmail || 'Not set'}\n\nEditing coming soon!`
      );
    } else if (item.label === 'Rate Bellava') {
      Alert.alert(
        'Rate Bellava ⭐',
        'Thank you for using Bellava!\nPlease rate us on the App Store.',
        [{ text: 'Not Now' }, { text: 'Rate Now ⭐' }]
      );
    } else if (item.label === 'Help & Support') {
      Alert.alert(
        'Help & Support 💜',
        'Email us at support@bellava.com\n\nWe respond within 24 hours!',
        [{ text: 'OK' }]
      );
    } else if (item.label === 'Privacy Policy') {
      Alert.alert('Privacy Policy', 'Visit bellava.com/privacy for our full privacy policy.');
    } else if (item.label === 'Terms of Service') {
      Alert.alert('Terms of Service', 'Visit bellava.com/terms for our full terms of service.');
    } else {
      Alert.alert(item.label, 'Coming soon! 💜');
    }
  };

  const initials = userName
    ? userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'B';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF0F5" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <TouchableOpacity
              style={styles.editAvatarBtn}
              onPress={() => Alert.alert('Change Photo', 'Photo upload coming soon! 💜')}
            >
              <Text style={styles.editAvatarIcon}>📷</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{userName || 'Bellava User'}</Text>
          <Text style={styles.profileEmail}>{userEmail || 'user@bellava.com'}</Text>
          <View style={[
            styles.planBadge,
            userPlan === 'PRO' ? styles.planPro :
            userPlan === 'PLUS' ? styles.planPlus :
            styles.planFree
          ]}>
            <Text style={styles.planBadgeText}>
              {userPlan === 'PRO' ? '👑 PRO' : userPlan === 'PLUS' ? '⭐ PLUS' : '🆓 FREE'} Member
            </Text>
          </View>
          {userPlan === 'FREE' && (
            <TouchableOpacity
              style={styles.upgradeBtn}
              onPress={() => onNavigate('subscription')}
            >
              <Text style={styles.upgradeBtnText}>✨ Upgrade to Pro — $3.99/mo</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {STATS.map((stat, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={styles.statEmoji}>{stat.emoji}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Quick Toggles */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick Settings</Text>
          <View style={styles.toggleRow}>
            <View style={styles.toggleLeft}>
              <Text style={styles.toggleEmoji}>🔔</Text>
              <Text style={styles.toggleLabel}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#EDE0E8', true: '#C9748F' }}
              thumbColor="#fff"
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.toggleRow}>
            <View style={styles.toggleLeft}>
              <Text style={styles.toggleEmoji}>🌸</Text>
              <Text style={styles.toggleLabel}>Period Reminders</Text>
            </View>
            <Switch
              value={periodReminders}
              onValueChange={setPeriodReminders}
              trackColor={{ false: '#EDE0E8', true: '#C9748F' }}
              thumbColor="#fff"
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.toggleRow}>
            <View style={styles.toggleLeft}>
              <Text style={styles.toggleEmoji}>🌙</Text>
              <Text style={styles.toggleLabel}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#EDE0E8', true: '#C9748F' }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Language Picker */}
        {showLanguage && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🌍 Select Language</Text>
            {LANGUAGES.map(lang => (
              <TouchableOpacity
                key={lang}
                style={styles.langRow}
                onPress={() => {
                  setSelectedLanguage(lang);
                  setShowLanguage(false);
                  Alert.alert('Language Changed! 💜', `App language set to ${lang}`);
                }}
              >
                <Text style={styles.langText}>{lang}</Text>
                {selectedLanguage === lang && (
                  <Text style={styles.langCheck}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Menu Items */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Settings</Text>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuRow, i < MENU_ITEMS.length - 1 && styles.menuRowBorder]}
              onPress={() => handleMenuItem(item)}
            >
              <View style={[styles.menuIcon, { backgroundColor: item.color + '22' }]}>
                <Text style={styles.menuEmoji}>{item.emoji}</Text>
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => Alert.alert(
            'Log Out',
            'Are you sure you want to log out?',
            [
              { text: 'Cancel' },
              { text: 'Log Out', style: 'destructive', onPress: () => onLogout && onLogout() }
            ]
          )}
        >
          <Text style={styles.logoutText}>🚪 Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Bellava v1.0.0 • Made with 💜 by Reine Mande Ltd</Text>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF0F5' },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#2D1B2E' },
  profileCard: {
    backgroundColor: '#fff', borderRadius: 24, marginHorizontal: 20,
    marginBottom: 16, padding: 24, alignItems: 'center',
    shadowColor: '#C9748F', shadowOpacity: 0.1, shadowRadius: 12, elevation: 4,
  },
  avatarWrap: { position: 'relative', marginBottom: 12 },
  avatar: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: '#C9748F', alignItems: 'center', justifyContent: 'center',
    shadowColor: '#C9748F', shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  avatarText: { color: '#fff', fontSize: 36, fontWeight: '800' },
  editAvatarBtn: {
    position: 'absolute', bottom: 0, right: 0,
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2,
  },
  editAvatarIcon: { fontSize: 16 },
  profileName: { fontSize: 22, fontWeight: '800', color: '#2D1B2E', marginBottom: 4 },
  profileEmail: { fontSize: 14, color: '#9B8FA0', marginBottom: 12 },
  planBadge: {
    borderRadius: 20, paddingHorizontal: 16,
    paddingVertical: 6, marginBottom: 12,
  },
  planFree: { backgroundColor: '#EDE0E8' },
  planPlus: { backgroundColor: '#F0EAFF' },
  planPro: { backgroundColor: '#FFF3CD' },
  planBadgeText: { fontSize: 13, fontWeight: '800', color: '#2D1B2E' },
  upgradeBtn: {
    backgroundColor: '#C9748F', borderRadius: 50,
    paddingHorizontal: 20, paddingVertical: 10,
  },
  upgradeBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  statsRow: {
    flexDirection: 'row', marginHorizontal: 20,
    marginBottom: 16, gap: 10,
  },
  statCard: {
    flex: 1, backgroundColor: '#fff', borderRadius: 16,
    padding: 12, alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  statEmoji: { fontSize: 20, marginBottom: 4 },
  statValue: { fontSize: 18, fontWeight: '800', color: '#C9748F', marginBottom: 2 },
  statLabel: { fontSize: 10, color: '#9B8FA0', textAlign: 'center', fontWeight: '600' },
  card: {
    backgroundColor: '#fff', borderRadius: 20, marginHorizontal: 20,
    marginBottom: 16, padding: 16, shadowColor: '#000',
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: '800', color: '#2D1B2E', marginBottom: 12 },
  toggleRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingVertical: 8,
  },
  toggleLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  toggleEmoji: { fontSize: 20 },
  toggleLabel: { fontSize: 15, fontWeight: '600', color: '#2D1B2E' },
  divider: { height: 1, backgroundColor: '#FAF0F5', marginVertical: 4 },
  langRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#FAF0F5',
  },
  langText: { fontSize: 15, color: '#2D1B2E', fontWeight: '600' },
  langCheck: { fontSize: 16, color: '#C9748F', fontWeight: '800' },
  menuRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 12, gap: 12,
  },
  menuRowBorder: { borderBottomWidth: 1, borderBottomColor: '#FAF0F5' },
  menuIcon: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  menuEmoji: { fontSize: 20 },
  menuLabel: { flex: 1, fontSize: 15, fontWeight: '600', color: '#2D1B2E' },
  menuArrow: { fontSize: 20, color: '#9B8FA0' },
  logoutBtn: {
    marginHorizontal: 20, marginBottom: 12,
    backgroundColor: '#fff', borderRadius: 20,
    padding: 16, alignItems: 'center',
    borderWidth: 1.5, borderColor: '#E74C3C',
    shadowColor: '#E74C3C', shadowOpacity: 0.08,
    shadowRadius: 8, elevation: 2,
  },
  logoutText: { fontSize: 16, fontWeight: '800', color: '#E74C3C' },
  version: {
    textAlign: 'center', fontSize: 12,
    color: '#9B8FA0', marginBottom: 8,
  },
});
