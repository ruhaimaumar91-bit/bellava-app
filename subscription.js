import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar,
  Alert,
} from 'react-native';
import COLORS from './colors';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    emoji: '🆓',
    monthlyPrice: 0,
    annualPrice: 0,
    color: '#9B8FA0',
    bg: '#F9F9F9',
    popular: false,
    features: [
      { text: 'Basic cycle tracking', included: true },
      { text: 'Period predictions', included: true },
      { text: '5 Bella AI messages/day', included: true },
      { text: 'Community reading', included: true },
      { text: 'Basic symptom logging', included: true },
      { text: '3 Academy articles/month', included: true },
      { text: 'Basic health tips', included: true },
      { text: 'Unlimited Bella AI', included: false },
      { text: 'Full cycle analytics', included: false },
      { text: 'Community posting', included: false },
      { text: 'Full Academy access', included: false },
      { text: 'Pregnancy tracker', included: false },
      { text: 'Virtual consultations', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    emoji: '⭐',
    monthlyPrice: 3.99,
    annualPrice: 31.99,
    annualMonthly: 2.67,
    annualSaving: 16,
    color: '#C9748F',
    bg: '#FAF0F5',
    popular: true,
    features: [
      { text: 'Everything in Free', included: true },
      { text: 'Unlimited Bella AI messages', included: true },
      { text: 'Full cycle insights & analytics', included: true },
      { text: 'Symptom history & patterns', included: true },
      { text: 'Community posting & commenting', included: true },
      { text: 'Full Academy access', included: true },
      { text: 'Pregnancy tracker', included: true },
      { text: 'Baby names feature', included: true },
      { text: 'Nutrition tracker', included: true },
      { text: 'Export health data', included: true },
      { text: 'Virtual consultations', included: false },
      { text: 'Intimacy health features', included: false },
      { text: 'Partner access & sharing', included: false },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    emoji: '👑',
    monthlyPrice: 7.99,
    annualPrice: 63.99,
    annualMonthly: 5.33,
    annualSaving: 20,
    color: '#9B59B6',
    bg: '#F5F0FF',
    popular: false,
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Virtual consultations', included: true },
      { text: 'Intimacy health features', included: true },
      { text: 'Care finder with booking', included: true },
      { text: 'Partner access & sharing', included: true },
      { text: 'Priority Bella AI responses', included: true },
      { text: 'Personalised health reports', included: true },
      { text: 'Early access to new features', included: true },
      { text: 'Priority customer support', included: true },
      { text: 'Unlimited everything', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Custom health goals', included: true },
      { text: 'Family health sharing', included: true },
    ],
  },
];
export default function SubscriptionScreen({ onBack, currentPlan, onUpgrade }) {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSubscribe = (plan) => {
    if (plan.id === 'free') {
      Alert.alert('Free Plan 💜', 'You are already on the free plan. Upgrade anytime!');
      return;
    }
    const price = billingPeriod === 'monthly'
      ? `$${plan.monthlyPrice}/month`
      : `$${plan.annualPrice}/year ($${plan.annualMonthly}/month)`;
    Alert.alert(
      `Upgrade to ${plan.name} ${plan.emoji}`,
      `You selected the ${plan.name} plan at ${price}.\n\nIn-app purchases coming soon! We will notify you when payments are live.`,
      [
        { text: 'Maybe Later' },
        { text: 'Notify Me 💜', onPress: () => Alert.alert('You\'re on the list! 💜', 'We will notify you as soon as payments are live!') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF0F5" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose Your Plan</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>💜</Text>
          <Text style={styles.heroTitle}>Unlock Your Full Health Journey</Text>
          <Text style={styles.heroSub}>Join thousands of women taking control of their health</Text>
        </View>

        {/* Billing Toggle */}
        <View style={styles.billingToggle}>
          <TouchableOpacity
            style={[styles.billingBtn, billingPeriod === 'monthly' && styles.billingBtnActive]}
            onPress={() => setBillingPeriod('monthly')}
          >
            <Text style={[styles.billingBtnText, billingPeriod === 'monthly' && styles.billingBtnTextActive]}>
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.billingBtn, billingPeriod === 'annual' && styles.billingBtnActive]}
            onPress={() => setBillingPeriod('annual')}
          >
            <Text style={[styles.billingBtnText, billingPeriod === 'annual' && styles.billingBtnTextActive]}>
              Annual
            </Text>
            <View style={styles.savingBadge}>
              <Text style={styles.savingBadgeText}>Save 20%</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Plans */}
        {PLANS.map(plan => (
          <TouchableOpacity
            key={plan.id}
            style={[
              styles.planCard,
              { borderColor: plan.color },
              selectedPlan === plan.id && styles.planCardSelected,
              plan.popular && styles.planCardPopular,
            ]}
            onPress={() => setSelectedPlan(plan.id)}
            activeOpacity={0.9}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <View style={[styles.popularBadge, { backgroundColor: plan.color }]}>
                <Text style={styles.popularBadgeText}>⭐ Most Popular</Text>
              </View>
            )}

            {/* Plan Header */}
            <View style={styles.planHeader}>
              <View style={styles.planLeft}>
                <Text style={styles.planEmoji}>{plan.emoji}</Text>
                <View>
                  <Text style={[styles.planName, { color: plan.color }]}>{plan.name}</Text>
                  {currentPlan === plan.id && (
                    <View style={styles.currentBadge}>
                      <Text style={styles.currentBadgeText}>Current Plan</Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.planRight}>
                {plan.monthlyPrice === 0 ? (
                  <Text style={[styles.planPrice, { color: plan.color }]}>Free</Text>
                ) : billingPeriod === 'monthly' ? (
                  <View style={styles.priceBox}>
                    <Text style={[styles.planPrice, { color: plan.color }]}>${plan.monthlyPrice}</Text>
                    <Text style={styles.planPeriod}>/month</Text>
                  </View>
                ) : (
                  <View style={styles.priceBox}>
                    <Text style={[styles.planPrice, { color: plan.color }]}>${plan.annualMonthly}</Text>
                    <Text style={styles.planPeriod}>/month</Text>
                  </View>
                )}
                {billingPeriod === 'annual' && plan.annualPrice > 0 && (
                  <Text style={styles.annualTotal}>${plan.annualPrice}/year</Text>
                )}
                {billingPeriod === 'annual' && plan.annualSaving && (
                  <View style={[styles.saveBadge, { backgroundColor: plan.color + '22' }]}>
                    <Text style={[styles.saveBadgeText, { color: plan.color }]}>
                      Save {plan.annualSaving}%
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* Features */}
            <View style={styles.featuresList}>
              {plan.features.map((feature, i) => (
                <View key={i} style={styles.featureRow}>
                  <Text style={[styles.featureIcon, { color: feature.included ? plan.color : '#EDE0E8' }]}>
                    {feature.included ? '✓' : '✕'}
                  </Text>
                  <Text style={[styles.featureText, !feature.included && styles.featureTextDisabled]}>
                    {feature.text}
                  </Text>
                </View>
              ))}
            </View>

            {/* Subscribe Button */}
            <TouchableOpacity
              style={[
                styles.subscribeBtn,
                { backgroundColor: plan.id === 'free' ? '#EDE0E8' : plan.color },
              ]}
              onPress={() => handleSubscribe(plan)}
            >
              <Text style={[
                styles.subscribeBtnText,
                { color: plan.id === 'free' ? '#9B8FA0' : '#fff' }
              ]}>
                {plan.id === 'free' ? 'Current Plan' :
                  currentPlan === plan.id ? '✓ Active Plan' :
                    `Get ${plan.name} ${plan.emoji}`}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        {/* Trust Badges */}
        <View style={styles.trustRow}>
          <View style={styles.trustItem}>
            <Text style={styles.trustEmoji}>🔒</Text>
            <Text style={styles.trustText}>Secure Payment</Text>
          </View>
          <View style={styles.trustItem}>
            <Text style={styles.trustEmoji}>↩️</Text>
            <Text style={styles.trustText}>Cancel Anytime</Text>
          </View>
          <View style={styles.trustItem}>
            <Text style={styles.trustEmoji}>💜</Text>
            <Text style={styles.trustText}>7 Day Free Trial</Text>
          </View>
        </View>

        {/* FAQ */}
        <View style={styles.faqCard}>
          <Text style={styles.faqTitle}>❓ Frequently Asked Questions</Text>
          {[
            { q: 'Can I cancel anytime?', a: 'Yes! Cancel anytime from your App Store or Google Play account settings. No questions asked.' },
            { q: 'Is there a free trial?', a: 'Yes! Pro and Premium plans come with a 7-day free trial. No charge until the trial ends.' },
            { q: 'What payment methods are accepted?', a: 'We accept Apple Pay, Google Pay and all major credit and debit cards.' },
            { q: 'Can I switch plans?', a: 'Yes! You can upgrade or downgrade your plan at any time from your profile settings.' },
          ].map((faq, i) => (
            <TouchableOpacity
              key={i}
              style={styles.faqRow}
              onPress={() => Alert.alert(faq.q, faq.a)}
            >
              <Text style={styles.faqQ}>{faq.q}</Text>
              <Text style={styles.faqArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Legal */}
        <Text style={styles.legalText}>
          Subscriptions automatically renew unless cancelled 24 hours before renewal.
          Prices shown in USD. By subscribing you agree to our Terms of Service and Privacy Policy.
        </Text>

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
  hero: {
    alignItems: 'center', paddingHorizontal: 24,
    paddingTop: 8, paddingBottom: 24,
  },
  heroEmoji: { fontSize: 48, marginBottom: 12 },
  heroTitle: { fontSize: 24, fontWeight: '800', color: '#2D1B2E', textAlign: 'center', marginBottom: 8 },
  heroSub: { fontSize: 15, color: '#9B8FA0', textAlign: 'center', lineHeight: 22 },
  billingToggle: {
    flexDirection: 'row', marginHorizontal: 20, marginBottom: 20,
    backgroundColor: '#fff', borderRadius: 50, padding: 4,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  billingBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 50,
    alignItems: 'center', flexDirection: 'row',
    justifyContent: 'center', gap: 6,
  },
  billingBtnActive: { backgroundColor: '#C9748F' },
  billingBtnText: { fontSize: 15, fontWeight: '700', color: '#9B8FA0' },
  billingBtnTextActive: { color: '#fff' },
  savingBadge: {
    backgroundColor: '#27AE60', borderRadius: 10,
    paddingHorizontal: 8, paddingVertical: 2,
  },
  savingBadgeText: { fontSize: 10, fontWeight: '800', color: '#fff' },
  planCard: {
    backgroundColor: '#fff', borderRadius: 24,
    marginHorizontal: 20, marginBottom: 16,
    padding: 20, borderWidth: 2,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 12, elevation: 3,
  },
  planCardSelected: { shadowOpacity: 0.15, shadowRadius: 16, elevation: 6 },
  planCardPopular: { shadowColor: '#C9748F', shadowOpacity: 0.15 },
  popularBadge: {
    alignSelf: 'flex-start', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 5, marginBottom: 12,
  },
  popularBadgeText: { color: '#fff', fontWeight: '800', fontSize: 12 },
  planHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 16,
  },
  planLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  planEmoji: { fontSize: 32 },
  planName: { fontSize: 22, fontWeight: '800' },
  currentBadge: {
    backgroundColor: '#EAFAF1', borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 2, marginTop: 2,
  },
  currentBadgeText: { fontSize: 11, fontWeight: '700', color: '#27AE60' },
  planRight: { alignItems: 'flex-end' },
  priceBox: { flexDirection: 'row', alignItems: 'baseline', gap: 2 },
  planPrice: { fontSize: 28, fontWeight: '800' },
  planPeriod: { fontSize: 13, color: '#9B8FA0', fontWeight: '600' },
  annualTotal: { fontSize: 12, color: '#9B8FA0', marginTop: 2 },
  saveBadge: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3, marginTop: 4 },
  saveBadgeText: { fontSize: 11, fontWeight: '800' },
  featuresList: { marginBottom: 16 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 5 },
  featureIcon: { fontSize: 14, fontWeight: '800', width: 16 },
  featureText: { fontSize: 14, color: '#2D1B2E', fontWeight: '500' },
  featureTextDisabled: { color: '#C0C0C0' },
  subscribeBtn: {
    borderRadius: 50, paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#C9748F', shadowOpacity: 0.2, shadowRadius: 8, elevation: 3,
  },
  subscribeBtnText: { fontSize: 16, fontWeight: '800' },
  trustRow: {
    flexDirection: 'row', justifyContent: 'space-around',
    marginHorizontal: 20, marginBottom: 20,
    backgroundColor: '#fff', borderRadius: 20, padding: 16,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  trustItem: { alignItems: 'center', gap: 6 },
  trustEmoji: { fontSize: 24 },
  trustText: { fontSize: 11, fontWeight: '700', color: '#2D1B2E', textAlign: 'center' },
  faqCard: {
    backgroundColor: '#fff', borderRadius: 20,
    marginHorizontal: 20, marginBottom: 16, padding: 16,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  faqTitle: { fontSize: 16, fontWeight: '800', color: '#2D1B2E', marginBottom: 12 },
  faqRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#FAF0F5',
  },
  faqQ: { fontSize: 14, fontWeight: '600', color: '#2D1B2E', flex: 1 },
  faqArrow: { fontSize: 20, color: '#9B8FA0' },
  legalText: {
    fontSize: 11, color: '#9B8FA0', textAlign: 'center',
    marginHorizontal: 20, marginBottom: 16, lineHeight: 18,
  },
});
