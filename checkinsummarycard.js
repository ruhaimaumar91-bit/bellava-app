import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import COLORS from './colors';

const MOOD_EMOJIS = { 1: '😢', 2: '😕', 3: '😐', 4: '🙂', 5: '😄' };
const ENERGY_EMOJIS = { 1: '🪫', 2: '😴', 3: '😌', 4: '⚡', 5: '🚀' };

export default function CheckInSummaryCard({ onPress, checkInData }) {
  if (!checkInData) {
    return (
      <TouchableOpacity style={styles.emptyCard} onPress={onPress}>
        <Text style={styles.emptyEmoji}>🌸</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.emptyTitle}>Daily Check-In</Text>
          <Text style={styles.emptySub}>How are you feeling today?</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Today's Check-In ✅</Text>
        <Text style={styles.cardType}>
          {checkInData.checkInType === 'morning' ? '🌅 Morning' : '🌙 Evening'}
        </Text>
      </View>
      <View style={styles.statsRow}>
        {checkInData.mood && (
          <View style={styles.statItem}>
            <Text style={styles.statEmoji}>{MOOD_EMOJIS[checkInData.mood]}</Text>
            <Text style={styles.statLabel}>Mood</Text>
          </View>
        )}
        {checkInData.energy && (
          <View style={styles.statItem}>
            <Text style={styles.statEmoji}>{ENERGY_EMOJIS[checkInData.energy]}</Text>
            <Text style={styles.statLabel}>Energy</Text>
          </View>
        )}
        {checkInData.waterIntake > 0 && (
          <View style={styles.statItem}>
            <Text style={styles.statEmoji}>💧</Text>
            <Text style={styles.statLabel}>{checkInData.waterIntake} glasses</Text>
          </View>
        )}
        {checkInData.symptoms?.length > 0 && (
          <View style={styles.statItem}>
            <Text style={styles.statEmoji}>🩺</Text>
            <Text style={styles.statLabel}>{checkInData.symptoms.length} symptoms</Text>
          </View>
        )}
        {checkInData.medicationTaken && (
          <View style={styles.statItem}>
            <Text style={styles.statEmoji}>💊</Text>
            <Text style={styles.statLabel}>Meds ✓</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  emptyCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.white, borderRadius: 16,
    padding: 16, marginHorizontal: 20, marginVertical: 8,
    borderWidth: 2, borderColor: COLORS.primary,
    borderStyle: 'dashed',
  },
  emptyEmoji: { fontSize: 32, marginRight: 12 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: COLORS.primary },
  emptySub: { fontSize: 13, color: COLORS.textLight, marginTop: 2 },
  arrow: { fontSize: 22, color: COLORS.primary },
  card: {
    backgroundColor: COLORS.white, borderRadius: 16,
    padding: 16, marginHorizontal: 20, marginVertical: 8,
    shadowColor: COLORS.primary, shadowOpacity: 0.1,
    shadowRadius: 8, elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 12,
  },
  cardTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  cardType: { fontSize: 13, color: COLORS.primary },
  statsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  statItem: { alignItems: 'center', minWidth: 56 },
  statEmoji: { fontSize: 26 },
  statLabel: { fontSize: 11, color: COLORS.textLight, marginTop: 4, textAlign: 'center' },
});
