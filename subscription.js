import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar, Modal,
} from 'react-native';
import COLORS from './colors';

const PLANS = [
  {
    id: 'FREE',
    name: 'Free',
    emoji: '🆓',
    color: '#9B8FA0',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'Get started with the basics',
    features: [
      { text: 'Basic cycle tracking', included: true },
      { text: '5 Bella AI messages per day', included: true },
      { text: 'Community access (read only)', included: true },
      { text: 'Health Academy (3 articles)', included: true },
      { text: 'Medical disclaimer & safety info', included: true },
      { text: 'Unlimited Bella AI messages', included: false },
      { text: 'Full symptom checker', included: false },
      { text: 'Nutrition planner', included: false },
      { text: 'Care finder', included: false },
      { text: 'Community posting', included: false },
      { text: 'Baby names', included: false },
      { text: 'Intimacy health', included: false },
      { text: 'Admin dashboard', included: false },
    ],
  },
  {
    id: 'PLUS',
    name: 'Plus',
    emoji: '⭐',
    color: COLORS.primary,
    monthlyPrice: 7.99,
    annualPrice: 63.99,
    description: 'Perfect for women who want more',
    badge: 'Most Popular',
    trial: '7-day free trial',
    features: [
      { text: 'Everything in Free', included: true },
      { text: 'Unlimited Bella AI messages', included: true },
      { text: 'Full symptom checker', included: true },
      { text: 'Nutrition planner', included: true },
      { text: 'Care finder', included: true },
      { text: 'Community posting', included: true },
      { text: 'Full Health Academy', included: true },
      { text: 'Baby names finder', included: true },
      { text: 'Advanced cycle insights', included: true },
      { text: 'Intimacy health articles', included: true },
      { text: 'Priority support', included: false },
      { text: 'Admin dashboard', included: false },
    ],
  },
  {
    id: 'PRO',
    name: 'Pro',
    emoji: '👑',
    color: '#F59E0B',
    monthlyPrice: 12.99,
    annualPrice: 103.99,
    description: 'The complete Bellava experience',
    badge: 'Best Value',
    trial: '7-day free trial',
    features: [
      { text: 'Everything in Plus', included: true },
      { text: 'Priority support', included: true },
      { text: 'Early access to new features', included: true },
      { text: 'Personalised health insights', included: true },
      { text: 'Export health data', included: true },
      { text: 'Partner mode', included: true },
      { text: 'BBT graph and fertility tools', included: true },
      { text: 'Offline access', included: true },
      { text: 'No advertisements ever', included: true },
      { text: 'Direct feedback to Bellava team', included: true },
    ],
  },
];

export default function SubscriptionScreen({ onBack, onUpgrade, currentPlan }) {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const getPrice = (plan) => {
    if (plan.monthlyPrice === 0) return 'Free';
    if (billingCycle === 'annual') {
      return `£${(plan.annualPrice / 12).toFixed(2)}/mo`;
    }
    return `£${plan.monthlyPrice}/mo`;
  };

  const getSaving = (plan) => {
    if (plan.monthlyPrice === 0) return null;
    const annualMonthly = plan.annualPrice / 12;
    const saving = ((plan.monthlyPrice - annualMonthly) / plan.monthlyPrice * 100).toFixed(0);
    return `Save ${saving}%`;
  };

  const handleSelect = (plan) => {
    if (plan.id === 'FREE' || plan.id === currentPlan) return;
    setSelectedPlan(plan);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    if (selectedPlan) {
      onUpgrade(selectedPlan.id);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Upgrade Bellava</Text>
          <Text style={styles.headerSub}>Choose the plan that works for you 💜</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>💜</Text>
          <Text style={styles.heroTitle}>Your health deserves the best</Text>
          <Text style={styles.heroSub}>
            Join thousands of women using Bellava to understand their bodies better.
          </Text>
        </View>

        {/* Billing Toggle */}
        <View style={styles.billingToggle}>
          <TouchableOpacity
            style={[styles.billingBtn, billingCycle === 'monthly' && styles.billingBtnActive]}
            onPress={() => setBillingCycle('monthly')}
          >
            <Text style={[styles.billingBtnText, billingCycle === 'monthly' && styles.billingBtnTextActive]}>
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.billingBtn, billingCycle === 'annual' && styles.billingBtnActive]}
            onPress={() => setBillingCycle('annual')}
          >
            <Text style={[styles.billingBtnText, billingCycle === 'annual' && styles.billingBtnTextActive]}>
              Annual
            </Text>
            <View style={styles.savingBadge}>
              <Text style={styles.savingBadgeText}>Save 33%</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Plans */}
        {PLANS.map(plan => {
          const isCurrentPlan = plan.id === currentPlan;
          const isFree = plan.id === 'FREE';

          return (
            <View
              key={plan.id}
              style={[
                styles.planCard,
                { borderColor: plan.color },
                isCurrentPlan && styles.planCardCurrent,
                plan.id === 'PLUS' && styles.planCardFeatured,
              ]}
            >
              {/* Badge */}
              {plan.badge && (
                <View style={[styles.planBadge, { backgroundColor: plan.color }]}>
                  <Text style={styles.planBadgeText}>{plan.badge}</Text>
                </View>
              )}

              {isCurrentPlan && (
                <View style={[styles.planBadge, { backgroundColor: '#27AE60' }]}>
                  <Text style={styles.planBadgeText}>✅ Current Plan</Text>
                </View>
              )}

              {/* Plan Header */}
              <View style={styles.planHeader}>
                <Text style={styles.planEmoji}>{plan.emoji}</Text>
                <View style={styles.planHeaderInfo}>
                  <Text style={[styles.planName, { color: plan.color }]}>{plan.name}</Text>
                  <Text style={styles.planDescription}>{plan.description}</Text>
                </View>
                <View style={styles.planPricing}>
                  <Text style={[styles.planPrice, { color: plan.color }]}>
                    {getPrice(plan)}
                  </Text>
                  {billingCycle === 'annual' && plan.monthlyPrice > 0 && (
                    <Text style={styles.planAnnualTotal}>
                      £{plan.annualPrice}/yr
                    </Text>
                  )}
                  {billingCycle === 'annual' && plan.monthlyPrice > 0 && (
                    <View style={styles.savingChip}>
                      <Text style={styles.savingChipText}>{getSaving(plan)}</Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Trial badge */}
              {plan.trial && (
                <View style={styles.trialBadge}>
                  <Text style={styles.trialText}>🎉 {plan.trial} — no card required</Text>
                </View>
              )}

              {/* Features */}
              <View style={styles.featuresList}>
                {plan.features.map((feature, i) => (
                  <View key={i} style={styles.featureRow}>
                    <Text style={[
                      styles.featureIcon,
                      { color: feature.included ? '#27AE60' : '#DDD' },
                    ]}>
                      {feature.included ? '✓' : '✕'}
                    </Text>
                    <Text style={[
                      styles.featureText,
                      !feature.included && styles.featureTextMuted,
                    ]}>
                      {feature.text}
                    </Text>
                  </View>
                ))}
              </View>

              {/* CTA Button */}
              {!isCurrentPlan && !isFree && (
                <TouchableOpacity
                  style={[styles.planBtn, { backgroundColor: plan.color }]}
                  onPress={() => handleSelect(plan)}
                >
                  <Text style={styles.planBtnText}>
                    {plan.trial ? `Start Free Trial 💜` : `Get ${plan.name}`}
                  </Text>
                </TouchableOpacity>
              )}

              {isFree && !isCurrentPlan && (
                <View style={styles.freePlanNote}>
                  <Text style={styles.freePlanNoteText}>Your current free features</Text>
                </View>
              )}
            </View>
          );
        })}

        {/* Legal */}
        <View style={styles.legalBox}>
          <Text style={styles.legalText}>
            💳 Subscriptions are billed through the App Store or Google Play. Cancel any time in your device settings. 7-day free trial available for Plus and Pro — no payment required to start. Prices shown in GBP. Bellava is operated by Reine Mande Ltd, London UK.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Confirm Modal */}
      <Modal visible={showConfirm} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            {selectedPlan && (
              <>
                <Text style={styles.modalEmoji}>{selectedPlan.emoji}</Text>
                <Text style={styles.modalTitle}>
                  Start {selectedPlan.name} Plan
                </Text>
                <Text style={styles.modalSub}>
                  {selectedPlan.trial
                    ? `Your 7-day free trial starts today. After the trial, you will be charged £${billingCycle === 'annual' ? selectedPlan.annualPrice + '/year' : selectedPlan.monthlyPrice + '/month'}.`
                    : `You will be charged £${billingCycle === 'annual' ? selectedPlan.annualPrice + '/year' : selectedPlan.monthlyPrice + '/month'}.`
                  }
                </Text>
                <TouchableOpacity
                  style={[styles.confirmBtn, { backgroundColor: selectedPlan.color }]}
                  onPress={handleConfirm}
                >
                  <Text style={styles.confirmBtnText}>
                    {selectedPlan.trial ? 'Start Free Trial 💜' : `Upgrade to ${selectedPlan.name} 💜`}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setShowConfirm(false)}
                >
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
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
  headerSub: { fontSize: 13, color: COLORS.textLight, marginTop: 2 },
  content: { flex: 1, padding: 16 },
  hero: {
    alignItems: 'center', paddingVertical: 24,
    marginBottom: 8,
  },
  heroEmoji: { fontSize: 48, marginBottom: 12 },
  heroTitle: { fontSize: 22, fontWeight: '800', color: COLORS.text, textAlign: 'center', marginBottom: 8 },
  heroSub: { fontSize: 14, color: COLORS.textLight, textAlign: 'center', lineHeight: 22 },
  billingToggle: {
    flexDirection: 'row', backgroundColor: COLORS.background,
    borderRadius: 16, padding: 4, marginBottom: 20, gap: 4,
  },
  billingBtn: {
    flex: 1, paddingVertical: 12, borderRadius: 12,
    alignItems: 'center', flexDirection: 'row',
    justifyContent: 'center', gap: 6,
  },
  billingBtnActive: { backgroundColor: COLORS.white },
  billingBtnText: { fontSize: 15, fontWeight: '600', color: COLORS.textLight },
  billingBtnTextActive: { color: COLORS.text },
  savingBadge: {
    backgroundColor: '#E8F8EE', borderRadius: 50,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  savingBadgeText: { fontSize: 11, fontWeight: '700', color: '#27AE60' },
  planCard: {
    backgroundColor: COLORS.white, borderRadius: 24,
    padding: 20, marginBottom: 16,
    borderWidth: 2, position: 'relative',
  },
  planCardCurrent: { borderWidth: 2, borderColor: '#27AE60' },
  planCardFeatured: {
    shadowColor: COLORS.primary,
    shadowOpacity: 0.15, shadowRadius: 16, elevation: 6,
  },
  planBadge: {
    position: 'absolute', top: -12, right: 20,
    borderRadius: 50, paddingHorizontal: 14, paddingVertical: 5,
    zIndex: 10,
  },
  planBadgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  planHeader: {
    flexDirection: 'row', alignItems: 'center',
    marginBottom: 14, gap: 12,
  },
  planEmoji: { fontSize: 32 },
  planHeaderInfo: { flex: 1 },
  planName: { fontSize: 20, fontWeight: '800' },
  planDescription: { fontSize: 13, color: COLORS.textLight, marginTop: 2 },
  planPricing: { alignItems: 'flex-end' },
  planPrice: { fontSize: 18, fontWeight: '800' },
  planAnnualTotal: { fontSize: 11, color: COLORS.textLight },
  savingChip: {
    backgroundColor: '#E8F8EE', borderRadius: 50,
    paddingHorizontal: 8, paddingVertical: 3, marginTop: 4,
  },
  savingChipText: { fontSize: 11, fontWeight: '700', color: '#27AE60' },
  trialBadge: {
    backgroundColor: '#FFF3E0', borderRadius: 12,
    padding: 10, marginBottom: 14, alignItems: 'center',
  },
  trialText: { fontSize: 13, fontWeight: '600', color: '#E65100' },
  featuresList: { marginBottom: 16 },
  featureRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 10, paddingVertical: 5,
  },
  featureIcon: { fontSize: 16, fontWeight: '700', width: 20 },
  featureText: { fontSize: 14, color: COLORS.text, flex: 1 },
  featureTextMuted: { color: COLORS.textLight },
  planBtn: {
    borderRadius: 50, paddingVertical: 15,
    alignItems: 'center',
  },
  planBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  freePlanNote: {
    backgroundColor: COLORS.background, borderRadius: 12,
    padding: 12, alignItems: 'center',
  },
  freePlanNoteText: { fontSize: 13, color: COLORS.textLight },
  legalBox: {
    backgroundColor: COLORS.background, borderRadius: 12,
    padding: 14, marginTop: 4,
  },
  legalText: { fontSize: 11, color: COLORS.textLight, lineHeight: 18, textAlign: 'center' },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: COLORS.white, borderTopLeftRadius: 28,
    borderTopRightRadius: 28, padding: 28, alignItems: 'center',
  },
  modalHandle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: COLORS.border, marginBottom: 20,
  },
  modalEmoji: { fontSize: 48, marginBottom: 12 },
  modalTitle: { fontSize: 22, fontWeight: '800', color: COLORS.text, marginBottom: 10 },
  modalSub: {
    fontSize: 14, color: COLORS.textLight, textAlign: 'center',
    lineHeight: 22, marginBottom: 24,
  },
  confirmBtn: {
    width: '100%', borderRadius: 50,
    paddingVertical: 16, alignItems: 'center', marginBottom: 12,
  },
  confirmBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  cancelBtn: {
    borderWidth: 2, borderColor: COLORS.border, borderRadius: 50,
    paddingVertical: 14, paddingHorizontal: 48,
  },
  cancelBtnText: { color: COLORS.textLight, fontWeight: '700', fontSize: 15 },
});
