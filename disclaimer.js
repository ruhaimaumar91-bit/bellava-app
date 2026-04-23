import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar, Animated,
} from 'react-native';
import COLORS from './colors';

const POINTS = [
  {
    emoji: '⚕️',
    title: 'Not Medical Advice',
    text: 'Bellava and Bella AI provide general health information only. Nothing in this app constitutes medical advice, diagnosis, or treatment.',
  },
  {
    emoji: '👩‍⚕️',
    title: 'Always Consult a Professional',
    text: 'Always seek the advice of a qualified healthcare provider for any medical condition or health concern. Never disregard professional advice because of something you read in this app.',
  },
  {
    emoji: '🚨',
    title: 'In an Emergency',
    text: 'If you are experiencing a medical emergency, call 999 (UK) or your local emergency number immediately. Do not rely on this app in an emergency.',
  },
  {
    emoji: '🔒',
    title: 'Your Data is Safe',
    text: 'Bellava takes your privacy seriously. Your health data is encrypted and never sold to third parties. You can request deletion of your data at any time.',
  },
  {
    emoji: '🌍',
    title: 'Global Use',
    text: 'Bellava is designed for women globally. Health information may vary by region. Always follow local medical guidance and regulations.',
  },
  {
    emoji: '💜',
    title: 'Mental Health Support',
    text: 'If you are in crisis or experiencing thoughts of self-harm, please contact: Samaritans: 116 123 | Crisis Text Line: Text SHOUT to 85258 | Emergency: 999',
  },
];

export default function DisclaimerScreen({ onAccept }) {
  const [agreed, setAgreed] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isAtBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 40;
    if (isAtBottom) setScrolledToBottom(true);
  };

  const handleAccept = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(() => onAccept());
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Text style={styles.headerEmoji}>⚕️</Text>
        </View>
        <Text style={styles.headerTitle}>Medical Disclaimer</Text>
        <Text style={styles.headerSub}>Please read carefully before continuing</Text>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introBanner}>
          <Text style={styles.introText}>
            Bellava is a women's health companion app. By using Bellava, you acknowledge and agree to the following:
          </Text>
        </View>

        {POINTS.map((point, index) => (
          <View key={index} style={styles.pointCard}>
            <View style={styles.pointHeader}>
              <Text style={styles.pointEmoji}>{point.emoji}</Text>
              <Text style={styles.pointTitle}>{point.title}</Text>
            </View>
            <Text style={styles.pointText}>{point.text}</Text>
          </View>
        ))}

        <View style={styles.legalBox}>
          <Text style={styles.legalTitle}>📋 Terms Summary</Text>
          <Text style={styles.legalText}>
            By continuing you agree to Bellava's Terms of Service and Privacy Policy. You confirm you are 18 years of age or older. You understand this app does not replace professional medical care. Bellava is operated by Reine Mande Ltd, London, United Kingdom.
          </Text>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Bottom */}
      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.checkRow}
          onPress={() => setAgreed(!agreed)}
        >
          <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
            {agreed && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkLabel}>
            I have read and agree to the above disclaimer and Bellava's Terms of Service and Privacy Policy.
          </Text>
        </TouchableOpacity>

        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={[
              styles.acceptBtn,
              (!agreed) && styles.acceptBtnDisabled,
            ]}
            onPress={handleAccept}
            disabled={!agreed}
          >
            <Text style={styles.acceptBtnText}>
              {agreed ? 'Enter Bellava 💜' : 'Please agree to continue'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 20,
    paddingHorizontal: 24,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerIcon: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
  },
  headerEmoji: { fontSize: 30 },
  headerTitle: {
    fontSize: 22, fontWeight: '800',
    color: COLORS.text, marginBottom: 6,
  },
  headerSub: { fontSize: 14, color: COLORS.textLight },
  scroll: { flex: 1 },
  scrollContent: { padding: 20 },
  introBanner: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 16, padding: 16, marginBottom: 16,
    borderLeftWidth: 4, borderLeftColor: COLORS.primary,
  },
  introText: {
    fontSize: 14, color: COLORS.text,
    lineHeight: 22, fontWeight: '500',
  },
  pointCard: {
    backgroundColor: COLORS.white, borderRadius: 16,
    padding: 16, marginBottom: 12,
    borderWidth: 1, borderColor: COLORS.border,
  },
  pointHeader: {
    flexDirection: 'row', alignItems: 'center',
    gap: 10, marginBottom: 8,
  },
  pointEmoji: { fontSize: 22 },
  pointTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  pointText: { fontSize: 13, color: COLORS.textLight, lineHeight: 21 },
  legalBox: {
    backgroundColor: '#FFF8E6', borderRadius: 16,
    padding: 16, borderWidth: 1, borderColor: '#FFE0A0',
  },
  legalTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  legalText: { fontSize: 12, color: COLORS.textLight, lineHeight: 20 },
  bottom: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  checkRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    gap: 12, marginBottom: 16,
  },
  checkbox: {
    width: 24, height: 24, borderRadius: 6,
    borderWidth: 2, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkmark: { color: '#fff', fontSize: 14, fontWeight: '700' },
  checkLabel: {
    fontSize: 13, color: COLORS.textLight,
    flex: 1, lineHeight: 20,
  },
  acceptBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 50, paddingVertical: 16,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3, shadowRadius: 10, elevation: 3,
  },
  acceptBtnDisabled: {
    backgroundColor: COLORS.border,
    shadowOpacity: 0,
  },
  acceptBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
