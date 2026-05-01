import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar,
  Switch, Alert,
} from 'react-native';
import COLORS from './colors';

const NOTIFICATION_GROUPS = [
  {
    title: '🌸 Cycle Notifications',
    color: '#C9748F',
    items: [
      { id: 'period_start', label: 'Period Starting Soon', sub: 'Reminder 2 days before predicted period', default: true },
      { id: 'period_late', label: 'Period Late Alert', sub: 'Alert when period is 2+ days late', default: true },
      { id: 'ovulation', label: 'Ovulation Window', sub: 'Notify during fertile window', default: true },
      { id: 'cycle_summary', label: 'Weekly Cycle Summary', sub: 'Weekly insights about your cycle', default: false },
      { id: 'log_reminder', label: 'Daily Log Reminder', sub: 'Remind me to log symptoms daily', default: false },
    ],
  },
  {
    title: '🤰 Pregnancy Notifications',
    color: '#9B59B6',
    items: [
      { id: 'weekly_update', label: 'Weekly Baby Update', sub: 'Your baby\'s development this week', default: true },
      { id: 'appointment', label: 'Appointment Reminders', sub: 'Remind me before prenatal appointments', default: true },
      { id: 'milestone', label: 'Pregnancy Milestones', sub: 'Celebrate important pregnancy moments', default: true },
      { id: 'kick_counter', label: 'Kick Counter Reminder', sub: 'Daily reminder to count baby kicks', default: false },
    ],
  },
  {
    title: '💊 Health Reminders',
    color: '#27AE60',
    items: [
      { id: 'medication', label: 'Medication Reminder', sub: 'Daily reminder to take medications', default: false },
      { id: 'water', label: 'Water Intake Reminder', sub: 'Hourly reminders to stay hydrated', default: false },
      { id: 'vitamins', label: 'Vitamins & Supplements', sub: 'Morning reminder for vitamins', default: false },
      { id: 'exercise', label: 'Exercise Reminder', sub: 'Daily movement reminder', default: false },
    ],
  },
  {
    title: '🤖 Bella AI Updates',
    color: '#3498DB',
    items: [
      { id: 'bella_tips', label: 'Daily Health Tips', sub: 'Personalised health tips from Bella', default: true },
      { id: 'bella_insights', label: 'Cycle Insights', sub: 'AI insights based on your data', default: true },
      { id: 'bella_checkIn', label: 'Weekly Check-in', sub: 'Weekly wellbeing check from Bella', default: false },
    ],
  },
  {
    title: '📚 Academy & Community',
    color: '#F59E0B',
    items: [
      { id: 'new_course', label: 'New Courses Available', sub: 'Notify when new content is added', default: false },
      { id: 'community_reply', label: 'Community Replies', sub: 'When someone replies to your post', default: true },
      { id: 'expert_session', label: 'Expert Sessions', sub: 'Reminder before live expert sessions', default: true },
    ],
  },
  {
    title: '💜 App Notifications',
    color: '#E74C3C',
    items: [
      { id: 'app_updates', label: 'App Updates', sub: 'New features and improvements', default: false },
      { id: 'offers', label: 'Special Offers', sub: 'Subscription deals and promotions', default: false },
      { id: 'newsletter', label: 'Health Newsletter', sub: 'Monthly women\'s health newsletter', default: false },
    ],
  },
];

const QUIET_HOURS = ['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 PM', '11:00 PM', '12:00 AM'];
export default function NotificationsScreen({ onBack }) {
  const initialState = {};
  NOTIFICATION_GROUPS.forEach(group => {
    group.items.forEach(item => {
      initialState[item.id] = item.default;
    });
  });

  const [notifications, setNotifications] = useState(initialState);
  const [masterSwitch, setMasterSwitch] = useState(true);
  const [quietHoursOn, setQuietHoursOn] = useState(false);
  const [quietStart, setQuietStart] = useState('10:00 PM');
  const [quietEnd, setQuietEnd] = useState('7:00 AM');

  const toggleNotification = (id) => {
    if (!masterSwitch) {
      Alert.alert('Notifications Off 💜', 'Turn on master notifications to manage individual settings.');
      return;
    }
    setNotifications(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAll = (groupItems, value) => {
    const updates = {};
    groupItems.forEach(item => { updates[item.id] = value; });
    setNotifications(prev => ({ ...prev, ...updates }));
  };

  const enabledCount = Object.values(notifications).filter(Boolean).length;
  const totalCount = Object.values(notifications).length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF0F5" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Master Switch */}
        <View style={styles.masterCard}>
          <View style={styles.masterLeft}>
            <Text style={styles.masterEmoji}>🔔</Text>
            <View>
              <Text style={styles.masterTitle}>All Notifications</Text>
              <Text style={styles.masterSub}>{enabledCount} of {totalCount} enabled</Text>
            </View>
          </View>
          <Switch
            value={masterSwitch}
            onValueChange={(val) => {
              setMasterSwitch(val);
              if (!val) Alert.alert('Notifications Paused 💜', 'You can turn them back on anytime.');
            }}
            trackColor={{ false: '#EDE0E8', true: '#C9748F' }}
            thumbColor="#fff"
          />
        </View>

        {/* Quiet Hours */}
        <View style={styles.card}>
          <View style={styles.quietHeader}>
            <View style={styles.quietLeft}>
              <Text style={styles.quietEmoji}>🌙</Text>
              <View>
                <Text style={styles.quietTitle}>Quiet Hours</Text>
                <Text style={styles.quietSub}>No notifications during this time</Text>
              </View>
            </View>
            <Switch
              value={quietHoursOn}
              onValueChange={setQuietHoursOn}
              trackColor={{ false: '#EDE0E8', true: '#C9748F' }}
              thumbColor="#fff"
            />
          </View>
          {quietHoursOn && (
            <View style={styles.quietTimes}>
              <View style={styles.quietTimeBox}>
                <Text style={styles.quietTimeLabel}>From</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {QUIET_HOURS.map(time => (
                    <TouchableOpacity
                      key={time}
                      style={[styles.timeBtn, quietStart === time && styles.timeBtnActive]}
                      onPress={() => setQuietStart(time)}
                    >
                      <Text style={[styles.timeBtnText, quietStart === time && styles.timeBtnTextActive]}>
                        {time}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <View style={styles.quietTimeBox}>
                <Text style={styles.quietTimeLabel}>To</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {QUIET_HOURS.map(time => (
                    <TouchableOpacity
                      key={time}
                      style={[styles.timeBtn, quietEnd === time && styles.timeBtnActive]}
                      onPress={() => setQuietEnd(time)}
                    >
                      <Text style={[styles.timeBtnText, quietEnd === time && styles.timeBtnTextActive]}>
                        {time}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          )}
        </View>

        {/* Notification Groups */}
        {NOTIFICATION_GROUPS.map((group, gi) => (
          <View key={gi} style={styles.card}>
            <View style={styles.groupHeader}>
              <Text style={[styles.groupTitle, { color: group.color }]}>{group.title}</Text>
              <View style={styles.groupActions}>
                <TouchableOpacity onPress={() => toggleAll(group.items, true)}>
                  <Text style={[styles.groupAction, { color: group.color }]}>All On</Text>
                </TouchableOpacity>
                <Text style={styles.groupActionDivider}>|</Text>
                <TouchableOpacity onPress={() => toggleAll(group.items, false)}>
                  <Text style={styles.groupAction}>All Off</Text>
                </TouchableOpacity>
              </View>
            </View>
            {group.items.map((item, ii) => (
              <View key={item.id}>
                <View style={styles.notifRow}>
                  <View style={styles.notifLeft}>
                    <Text style={styles.notifLabel}>{item.label}</Text>
                    <Text style={styles.notifSub}>{item.sub}</Text>
                  </View>
                  <Switch
                    value={notifications[item.id] && masterSwitch}
                    onValueChange={() => toggleNotification(item.id)}
                    trackColor={{ false: '#EDE0E8', true: group.color }}
                    thumbColor="#fff"
                  />
                </View>
                {ii < group.items.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        ))}

        {/* Reset Button */}
        <TouchableOpacity
          style={styles.resetBtn}
          onPress={() => {
            setNotifications(initialState);
            setMasterSwitch(true);
            setQuietHoursOn(false);
            Alert.alert('Reset! 💜', 'Notifications reset to default settings.');
          }}
        >
          <Text style={styles.resetBtnText}>↺ Reset to Default</Text>
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => Alert.alert('Saved! 💜', 'Your notification preferences have been saved.')}
        >
          <Text style={styles.saveBtnText}>Save Preferences 💜</Text>
        </TouchableOpacity>

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
  masterCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#2D1B2E', borderRadius: 20,
    marginHorizontal: 20, marginBottom: 16, padding: 16,
    shadowColor: '#2D1B2E', shadowOpacity: 0.2, shadowRadius: 8, elevation: 4,
  },
  masterLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  masterEmoji: { fontSize: 28 },
  masterTitle: { fontSize: 16, fontWeight: '800', color: '#fff' },
  masterSub: { fontSize: 12, color: '#9B8FA0', marginTop: 2 },
  card: {
    backgroundColor: '#fff', borderRadius: 20,
    marginHorizontal: 20, marginBottom: 16, padding: 16,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  quietHeader: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
  },
  quietLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  quietEmoji: { fontSize: 24 },
  quietTitle: { fontSize: 15, fontWeight: '700', color: '#2D1B2E' },
  quietSub: { fontSize: 12, color: '#9B8FA0' },
  quietTimes: { marginTop: 14, gap: 10 },
  quietTimeBox: { gap: 8 },
  quietTimeLabel: { fontSize: 13, fontWeight: '700', color: '#2D1B2E' },
  timeBtn: {
    borderWidth: 1.5, borderColor: '#EDE0E8',
    borderRadius: 20, paddingHorizontal: 12,
    paddingVertical: 6, marginRight: 8,
    backgroundColor: '#FAF0F5',
  },
  timeBtnActive: { backgroundColor: '#C9748F', borderColor: '#C9748F' },
  timeBtnText: { fontSize: 13, fontWeight: '600', color: '#9B8FA0' },
  timeBtnTextActive: { color: '#fff' },
  groupHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 12,
  },
  groupTitle: { fontSize: 15, fontWeight: '800' },
  groupActions: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  groupAction: { fontSize: 12, fontWeight: '700', color: '#9B8FA0' },
  groupActionDivider: { fontSize: 12, color: '#EDE0E8' },
  notifRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingVertical: 8,
  },
  notifLeft: { flex: 1, paddingRight: 10 },
  notifLabel: { fontSize: 14, fontWeight: '700', color: '#2D1B2E' },
  notifSub: { fontSize: 12, color: '#9B8FA0', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#FAF0F5' },
  resetBtn: {
    marginHorizontal: 20, marginBottom: 10,
    backgroundColor: '#fff', borderRadius: 20,
    padding: 14, alignItems: 'center',
    borderWidth: 1.5, borderColor: '#EDE0E8',
  },
  resetBtnText: { fontSize: 14, fontWeight: '700', color: '#9B8FA0' },
  saveBtn: {
    marginHorizontal: 20, marginBottom: 16,
    backgroundColor: '#C9748F', borderRadius: 50,
    padding: 16, alignItems: 'center',
    shadowColor: '#C9748F', shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  saveBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
