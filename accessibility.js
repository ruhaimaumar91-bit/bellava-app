import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar,
  Switch, Alert,
} from 'react-native';
import COLORS from './colors';

export default function AccessibilityScreen({ onBack }) {
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [boldText, setBoldText] = useState(false);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [fontSize, setFontSize] = useState('Medium');

  const FONT_SIZES = ['Small', 'Medium', 'Large', 'Extra Large'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF0F5" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Accessibility</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Vision Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👁️ Vision</Text>
          <View style={styles.card}>

            <View style={styles.toggleRow}>
              <View style={styles.toggleLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#EAF4FF' }]}>
                  <Text style={styles.iconEmoji}>🔠</Text>
                </View>
                <View>
                  <Text style={styles.toggleLabel}>Large Text</Text>
                  <Text style={styles.toggleSub}>Increase text size throughout app</Text>
                </View>
              </View>
              <Switch
                value={largeText}
                onValueChange={setLargeText}
                trackColor={{ false: '#EDE0E8', true: '#C9748F' }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.toggleRow}>
              <View style={styles.toggleLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#2D1B2E' }]}>
                  <Text style={styles.iconEmoji}>🌗</Text>
                </View>
                <View>
                  <Text style={styles.toggleLabel}>High Contrast</Text>
                  <Text style={styles.toggleSub}>Improve text visibility</Text>
                </View>
              </View>
              <Switch
                value={highContrast}
                onValueChange={setHighContrast}
                trackColor={{ false: '#EDE0E8', true: '#C9748F' }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.toggleRow}>
              <View style={styles.toggleLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#F9EEF3' }]}>
                  <Text style={styles.iconEmoji}>𝗕</Text>
                </View>
                <View>
                  <Text style={styles.toggleLabel}>Bold Text</Text>
                  <Text style={styles.toggleSub}>Make all text bold</Text>
                </View>
              </View>
              <Switch
                value={boldText}
                onValueChange={setBoldText}
                trackColor={{ false: '#EDE0E8', true: '#C9748F' }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.toggleRow}>
              <View style={styles.toggleLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#EAFAF1' }]}>
                  <Text style={styles.iconEmoji}>🔊</Text>
                </View>
                <View>
                  <Text style={styles.toggleLabel}>Screen Reader Support</Text>
                  <Text style={styles.toggleSub}>Optimised for VoiceOver & TalkBack</Text>
                </View>
              </View>
              <Switch
                value={screenReader}
                onValueChange={setScreenReader}
                trackColor={{ false: '#EDE0E8', true: '#C9748F' }}
                thumbColor="#fff"
              />
            </View>
          </View>
        </View>

        {/* Font Size Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Font Size</Text>
          <View style={styles.card}>
            <Text style={styles.cardDesc}>Choose your preferred text size</Text>
            <View style={styles.fontSizeGrid}>
              {FONT_SIZES.map(size => (
                <TouchableOpacity
                  key={size}
                  style={[styles.fontSizeBtn, fontSize === size && styles.fontSizeBtnActive]}
                  onPress={() => {
                    setFontSize(size);
                    Alert.alert('Font Size Updated 💜', `Text size set to ${size}`);
                  }}
                >
                  <Text style={[styles.fontSizeBtnText, fontSize === size && styles.fontSizeBtnTextActive]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.previewBox}>
              <Text style={[styles.previewText, {
                fontSize: fontSize === 'Small' ? 12 : fontSize === 'Medium' ? 15 : fontSize === 'Large' ? 18 : 22
              }]}>
                Preview: Your cycle is on day 14 💜
              </Text>
            </View>
          </View>
        </View>

        {/* Motion Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Motion & Sound</Text>
          <View style={styles.card}>

            <View style={styles.toggleRow}>
              <View style={styles.toggleLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#FFF3CD' }]}>
                  <Text style={styles.iconEmoji}>🎭</Text>
                </View>
                <View>
                  <Text style={styles.toggleLabel}>Reduce Motion</Text>
                  <Text style={styles.toggleSub}>Disable animations and transitions</Text>
                </View>
              </View>
              <Switch
                value={reduceMotion}
                onValueChange={setReduceMotion}
                trackColor={{ false: '#EDE0E8', true: '#C9748F' }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.toggleRow}>
              <View style={styles.toggleLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#F0EAFF' }]}>
                  <Text style={styles.iconEmoji}>📳</Text>
                </View>
                <View>
                  <Text style={styles.toggleLabel}>Haptic Feedback</Text>
                  <Text style={styles.toggleSub}>Vibration when tapping buttons</Text>
                </View>
              </View>
              <Switch
                value={hapticFeedback}
                onValueChange={setHapticFeedback}
                trackColor={{ false: '#EDE0E8', true: '#C9748F' }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.toggleRow}>
              <View style={styles.toggleLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#EAFAF1' }]}>
                  <Text style={styles.iconEmoji}>🔔</Text>
                </View>
                <View>
                  <Text style={styles.toggleLabel}>Sound Effects</Text>
                  <Text style={styles.toggleSub}>Play sounds for interactions</Text>
                </View>
              </View>
              <Switch
                value={soundEffects}
                onValueChange={setSoundEffects}
                trackColor={{ false: '#EDE0E8', true: '#C9748F' }}
                thumbColor="#fff"
              />
            </View>
          </View>
        </View>

        {/* Help Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💜 Need More Help?</Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.helpRow}
              onPress={() => Alert.alert('Accessibility Support 💜', 'Email us at accessibility@bellava.com\n\nWe are committed to making Bellava accessible to everyone.')}
            >
              <View style={[styles.iconBox, { backgroundColor: '#F9EEF3' }]}>
                <Text style={styles.iconEmoji}>📧</Text>
              </View>
              <View style={styles.helpInfo}>
                <Text style={styles.toggleLabel}>Contact Accessibility Team</Text>
                <Text style={styles.toggleSub}>accessibility@bellava.com</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.helpRow}
              onPress={() => Alert.alert('Accessibility Guide 💜', 'Our full accessibility guide is available at bellava.com/accessibility')}
            >
              <View style={[styles.iconBox, { backgroundColor: '#EAF4FF' }]}>
                <Text style={styles.iconEmoji}>📖</Text>
              </View>
              <View style={styles.helpInfo}>
                <Text style={styles.toggleLabel}>Accessibility Guide</Text>
                <Text style={styles.toggleSub}>View our full accessibility docs</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Reset Button */}
        <TouchableOpacity
          style={styles.resetBtn}
          onPress={() => {
            setLargeText(false);
            setHighContrast(false);
            setReduceMotion(false);
            setScreenReader(false);
            setBoldText(false);
            setHapticFeedback(true);
            setSoundEffects(true);
            setFontSize('Medium');
            Alert.alert('Reset Complete 💜', 'All accessibility settings have been reset to default.');
          }}
        >
          <Text style={styles.resetBtnText}>↺ Reset to Default Settings</Text>
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
  section: { marginHorizontal: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#2D1B2E', marginBottom: 10 },
  card: {
    backgroundColor: '#fff', borderRadius: 20, padding: 16,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  cardDesc: { fontSize: 13, color: '#9B8FA0', marginBottom: 12 },
  toggleRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingVertical: 8,
  },
  toggleLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  iconBox: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  iconEmoji: { fontSize: 20 },
  toggleLabel: { fontSize: 14, fontWeight: '700', color: '#2D1B2E' },
  toggleSub: { fontSize: 12, color: '#9B8FA0', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#FAF0F5', marginVertical: 4 },
  arrow: { fontSize: 22, color: '#9B8FA0' },
  fontSizeGrid: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  fontSizeBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 12,
    borderWidth: 1.5, borderColor: '#EDE0E8',
    alignItems: 'center', backgroundColor: '#FAF0F5',
  },
  fontSizeBtnActive: { backgroundColor: '#C9748F', borderColor: '#C9748F' },
  fontSizeBtnText: { fontSize: 12, fontWeight: '700', color: '#9B8FA0' },
  fontSizeBtnTextActive: { color: '#fff' },
  previewBox: {
    backgroundColor: '#FAF0F5', borderRadius: 12,
    padding: 14, alignItems: 'center',
  },
  previewText: { color: '#2D1B2E', fontWeight: '600', textAlign: 'center' },
  helpRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 },
  helpInfo: { flex: 1 },
  resetBtn: {
    marginHorizontal: 20, marginBottom: 16,
    backgroundColor: '#fff', borderRadius: 20,
    padding: 16, alignItems: 'center',
    borderWidth: 1.5, borderColor: '#EDE0E8',
  },
  resetBtnText: { fontSize: 15, fontWeight: '700', color: '#9B8FA0' },
});
