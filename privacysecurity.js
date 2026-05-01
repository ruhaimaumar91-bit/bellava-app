import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar,
  Alert, Switch,
} from 'react-native';
import COLORS from './colors';

export default function PrivacySecurityScreen({ onBack }) {
  const [biometrics, setBiometrics] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [crashReports, setCrashReports] = useState(true);
  const [locationData, setLocationData] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF0F5" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy & Security</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Security Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔒 Security</Text>

          <View style={styles.card}>
            <View style={styles.toggleRow}>
              <View style={styles.toggleLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#EAF4FF' }]}>
                  <Text style={styles.iconEmoji}>👆</Text>
                </View>
                <View>
                  <Text style={styles.toggleLabel}>Face ID / Touch ID</Text>
                  <Text style={styles.toggleSub}>Use biometrics to unlock app</Text>
                </View>
              </View>
              <Switch
                value={biometrics}
                onValueChange={setBiometrics}
                trackColor={{ false: '#EDE0E8', true: '#C9748F' }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.toggleRow}>
              <View style={styles.toggleLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#F0EAFF' }]}>
                  <Text style={styles.iconEmoji}>🔐</Text>
                </View>
                <View>
                  <Text style={styles.toggleLabel}>Two-Factor Authentication</Text>
                  <Text style={styles.toggleSub}>Extra security for your account</Text>
                </View>
              </View>
              <Switch
                value={twoFactor}
                onValueChange={(val) => {
                  setTwoFactor(val);
                  if (val) Alert.alert('2FA Enabled 💜', 'You will receive a code by email when logging in.');
                }}
                trackColor={{ false: '#EDE0E8', true: '#C9748F' }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.actionRow}
              onPress={() => Alert.alert('Change Password', 'A password reset link will be sent to your email.', [
                { text: 'Cancel' },
                { text: 'Send Link 💜' }
              ])}
            >
              <View style={styles.toggleLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#EAFAF1' }]}>
                  <Text style={styles.iconEmoji}>🔑</Text>
                </View>
                <View>
                  <Text style={styles.toggleLabel}>Change Password</Text>
                  <Text style={styles.toggleSub}>Update your account password</Text>
                </View>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.actionRow}
              onPress={() => Alert.alert('Active Sessions', 'You are logged in on 1 device.\n\niPhone — London, UK\nLast active: Just now', [
                { text: 'OK' },
                { text: 'Log Out All Devices', style: 'destructive' }
              ])}
            >
              <View style={styles.toggleLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#FFF3CD' }]}>
                  <Text style={styles.iconEmoji}>📱</Text>
                </View>
                <View>
                  <Text style={styles.toggleLabel}>Active Sessions</Text>
                  <Text style={styles.toggleSub}>Manage logged in devices</Text>
                </View>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Privacy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛡️ Privacy</Text>

          <View style={styles.card}>
            <View style={styles.toggleRow}>
              <View style={styles.toggleLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#FFE8E8' }]}>
                  <Text style={styles.iconEmoji}>📊</Text>
                </View>
                <View>
                  <Text style={styles.toggleLabel}>Analytics</Text>
                  <Text style={styles.toggleSub}>Help improve Bellava</Text>
                </View>
              </View>
              <Switch
                value={analytics}
                onValueChange={setAnalytics}
                trackColor={{ false: '#EDE0E8', true: '#C9748F' }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.toggleRow}>
              <View style={styles.toggleLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#EAFAF1' }]}>
                  <Text style={styles.iconEmoji}>🐛</Text>
                </View>
                <View>
                  <Text style={styles.toggleLabel}>Crash Reports</Text>
                  <Text style={styles.toggleSub}>Send crash reports to fix bugs</Text>
                </View>
              </View>
              <Switch
                value={crashReports}
                onValueChange={setCrashReports}
                trackColor={{ false: '#EDE0E8', true: '#C9748F' }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.toggleRow}>
              <View style={styles.toggleLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#EAF4FF' }]}>
                  <Text style={styles.iconEmoji}>📍</Text>
                </View>
                <View>
                  <Text style={styles.toggleLabel}>Location Data</Text>
                  <Text style={styles.toggleSub}>For care finder features</Text>
                </View>
              </View>
              <Switch
                value={locationData}
                onValueChange={setLocationData}
                trackColor={{ false: '#EDE0E8', true: '#C9748F' }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.toggleRow}>
              <View style={styles.toggleLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#F0EAFF' }]}>
                  <Text style={styles.iconEmoji}>🤝</Text>
                </View>
                <View>
                  <Text style={styles.toggleLabel}>Data Sharing</Text>
                  <Text style={styles.toggleSub}>Share anonymised data for research</Text>
                </View>
              </View>
              <Switch
                value={dataSharing}
                onValueChange={setDataSharing}
                trackColor={{ false: '#EDE0E8', true: '#C9748F' }}
                thumbColor="#fff"
              />
            </View>
          </View>
        </View>

        {/* Your Data Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📁 Your Data</Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.actionRow}
              onPress={() => Alert.alert('Download Data 💜', 'We will prepare your data and email it to you within 30 days as required by UK GDPR.', [
                { text: 'Cancel' },
                { text: 'Request Download 💜' }
              ])}
            >
              <View style={styles.toggleLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#EAFAF1' }]}>
                  <Text style={styles.iconEmoji}>⬇️</Text>
                </View>
                <View>
                  <Text style={styles.toggleLabel}>Download My Data</Text>
                  <Text style={styles.toggleSub}>Get a copy of all your data</Text>
                </View>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.actionRow}
              onPress={() => Alert.alert('Delete Account ⚠️', 'This will permanently delete your account and all data. This cannot be undone.', [
                { text: 'Cancel' },
                { text: 'Delete Forever', style: 'destructive', onPress: () => Alert.alert('Account Deleted', 'Your account has been scheduled for deletion.') }
              ])}
            >
              <View style={styles.toggleLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#FFE8E8' }]}>
                  <Text style={styles.iconEmoji}>🗑️</Text>
                </View>
                <View>
                  <Text style={[styles.toggleLabel, { color: '#E74C3C' }]}>Delete My Account</Text>
                  <Text style={styles.toggleSub}>Permanently remove all data</Text>
                </View>
              </View>
              <Text style={[styles.arrow, { color: '#E74C3C' }]}>›</Text>
            </TouchableOpacity>
          </View>
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
  section: { marginHorizontal: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#2D1B2E', marginBottom: 10 },
  card: {
    backgroundColor: '#fff', borderRadius: 20, padding: 16,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
  actionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
  toggleLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  iconBox: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  iconEmoji: { fontSize: 20 },
  toggleLabel: { fontSize: 14, fontWeight: '700', color: '#2D1B2E' },
  toggleSub: { fontSize: 12, color: '#9B8FA0', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#FAF0F5', marginVertical: 4 },
  arrow: { fontSize: 22, color: '#9B8FA0' },
});
