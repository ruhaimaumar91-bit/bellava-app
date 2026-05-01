import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar,
  TextInput, Alert, Linking,
} from 'react-native';
import COLORS from './colors';

const CARE_TYPES = [
  { id: 'all', label: 'All', emoji: '🏥' },
  { id: 'gp', label: 'GP', emoji: '👩‍⚕️' },
  { id: 'gynae', label: 'Gynae', emoji: '🌸' },
  { id: 'mental', label: 'Mental Health', emoji: '🧠' },
  { id: 'sexual', label: 'Sexual Health', emoji: '💜' },
  { id: 'fertility', label: 'Fertility', emoji: '🤰' },
  { id: 'emergency', label: 'Emergency', emoji: '🚨' },
];

const PROVIDERS = [
  {
    id: '1', name: 'NHS 111', type: 'emergency',
    specialty: 'Medical Advice Line', rating: 4.5,
    address: 'Available 24/7 across the UK',
    phone: '111', website: 'https://111.nhs.uk',
    nhs: true, emergency: true,
    description: 'Free NHS medical advice for urgent but non-emergency concerns. Available 24 hours a day, 7 days a week.',
    services: ['Medical advice', 'GP referrals', 'Mental health support', 'Urgent care'],
  },
  {
    id: '2', name: 'Samaritans', type: 'mental',
    specialty: 'Mental Health Support', rating: 4.9,
    address: 'Available 24/7 UK wide',
    phone: '116 123', website: 'https://www.samaritans.org',
    nhs: false, emergency: true,
    description: 'Free emotional support for anyone in distress or struggling to cope. Available 24/7.',
    services: ['Emotional support', 'Crisis support', 'Confidential listening'],
  },
  {
    id: '3', name: 'BPAS Clinic', type: 'gynae',
    specialty: 'Reproductive Health', rating: 4.7,
    address: 'Multiple locations across UK',
    phone: '03457 30 40 30', website: 'https://www.bpas.org',
    nhs: false, emergency: false,
    description: 'Leading provider of reproductive healthcare including contraception, abortion services and vasectomy.',
    services: ['Contraception', 'Abortion services', 'STI testing', 'Counselling'],
  },
  {
    id: '4', name: 'Planned Parenthood', type: 'sexual',
    specialty: 'Sexual Health', rating: 4.6,
    address: 'Various UK locations',
    phone: '0300 123 7123', website: 'https://www.plannedparenthood.org',
    nhs: false, emergency: false,
    description: 'Comprehensive sexual and reproductive health services for women and men.',
    services: ['STI testing', 'Contraception', 'HIV testing', 'Cancer screening'],
  },
  {
    id: '5', name: 'Fertility Network UK', type: 'fertility',
    specialty: 'Fertility Support', rating: 4.8,
    address: 'UK wide support network',
    phone: '01424 732361', website: 'https://fertilitynetworkuk.org',
    nhs: false, emergency: false,
    description: 'Support for people affected by fertility issues including IVF guidance and emotional support.',
    services: ['IVF support', 'Fertility advice', 'Support groups', 'Counselling'],
  },
  {
    id: '6', name: 'Mind Mental Health', type: 'mental',
    specialty: 'Mental Health', rating: 4.8,
    address: 'UK wide services',
    phone: '0300 123 3393', website: 'https://www.mind.org.uk',
    nhs: false, emergency: false,
    description: 'Mental health charity providing advice and support for anyone experiencing mental health problems.',
    services: ['Mental health advice', 'Crisis support', 'Therapy referrals', 'Online support'],
  },
  {
    id: '7', name: 'Eve Appeal', type: 'gynae',
    specialty: "Women's Cancer", rating: 4.9,
    address: 'UK wide charity',
    phone: '0808 802 0019', website: 'https://eveappeal.org.uk',
    nhs: false, emergency: false,
    description: "UK's leading gynaecological cancer charity. Free nurse helpline for women concerned about symptoms.",
    services: ['Cancer information', 'Nurse helpline', 'Research', 'Support groups'],
  },
  {
    id: '8', name: 'Sexual Health London', type: 'sexual',
    specialty: 'Sexual Health', rating: 4.5,
    address: 'London clinics & online',
    phone: '0300 555 1200', website: 'https://www.sh.uk',
    nhs: true, emergency: false,
    description: 'Free NHS sexual health services including STI testing, contraception and HIV treatment.',
    services: ['Free STI testing', 'Contraception', 'HIV treatment', 'PrEP'],
  },
  {
    id: '9', name: 'Endometriosis UK', type: 'gynae',
    specialty: 'Endometriosis Support', rating: 4.9,
    address: 'UK wide support',
    phone: '0808 808 2227', website: 'https://www.endometriosis-uk.org',
    nhs: false, emergency: false,
    description: 'Leading charity for those affected by endometriosis. Helpline, support groups and information.',
    services: ['Helpline', 'Support groups', 'Information', 'Research'],
  },
  {
    id: '10', name: 'Verita Health', type: 'fertility',
    specialty: 'Private Fertility Clinic', rating: 4.7,
    address: 'London & Manchester',
    phone: '020 3263 6025', website: 'https://veritahealth.co.uk',
    nhs: false, emergency: false,
    description: 'Private fertility clinic offering IVF, egg freezing, fertility testing and reproductive surgery.',
    services: ['IVF', 'Egg freezing', 'Fertility testing', 'Donor services'],
  },
];

const EMERGENCY_NUMBERS = [
  { name: 'Emergency Services', number: '999', color: '#E74C3C', emoji: '🚨' },
  { name: 'NHS 111', number: '111', color: '#3498DB', emoji: '🏥' },
  { name: 'Samaritans', number: '116 123', color: '#27AE60', emoji: '💚' },
  { name: 'Domestic Abuse', number: '0808 2000 247', color: '#9B59B6', emoji: '💜' },
];
export default function CarefinderScreen({ onBack }) {
  const [searchText, setSearchText] = useState('');
  const [activeType, setActiveType] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showEmergency, setShowEmergency] = useState(false);

  const filteredProviders = PROVIDERS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchText.toLowerCase()) ||
      p.specialty.toLowerCase().includes(searchText.toLowerCase()) ||
      p.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = activeType === 'all' || p.type === activeType;
    return matchesSearch && matchesType;
  });

  const callNumber = (number) => {
    Linking.openURL(`tel:${number.replace(/\s/g, '')}`);
  };

  const openWebsite = (url) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF0F5" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Care Finder</Text>
        <TouchableOpacity
          style={styles.emergencyBtn}
          onPress={() => setShowEmergency(!showEmergency)}
        >
          <Text style={styles.emergencyBtnText}>🚨 SOS</Text>
        </TouchableOpacity>
      </View>

      {/* Provider Detail Modal */}
      {selectedProvider && (
        <View style={styles.modalOverlay}>
          <ScrollView>
            <View style={styles.modal}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalName}>{selectedProvider.name}</Text>
                {selectedProvider.nhs && (
                  <View style={styles.nhsBadge}>
                    <Text style={styles.nhsBadgeText}>NHS</Text>
                  </View>
                )}
                {selectedProvider.emergency && (
                  <View style={styles.emergencyBadge}>
                    <Text style={styles.emergencyBadgeText}>24/7</Text>
                  </View>
                )}
              </View>
              <Text style={styles.modalSpecialty}>{selectedProvider.specialty}</Text>
              <View style={styles.ratingRow}>
                <Text style={styles.stars}>{'★'.repeat(Math.floor(selectedProvider.rating))}</Text>
                <Text style={styles.ratingText}>{selectedProvider.rating}</Text>
              </View>
              <Text style={styles.modalDesc}>{selectedProvider.description}</Text>
              <Text style={styles.modalAddress}>📍 {selectedProvider.address}</Text>

              <Text style={styles.servicesTitle}>Services:</Text>
              <View style={styles.servicesList}>
                {selectedProvider.services.map((s, i) => (
                  <View key={i} style={styles.serviceTag}>
                    <Text style={styles.serviceTagText}>✓ {s}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.modalBtns}>
                <TouchableOpacity
                  style={styles.callBtn}
                  onPress={() => callNumber(selectedProvider.phone)}
                >
                  <Text style={styles.callBtnText}>📞 Call {selectedProvider.phone}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.webBtn}
                  onPress={() => openWebsite(selectedProvider.website)}
                >
                  <Text style={styles.webBtnText}>🌐 Visit Website</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setSelectedProvider(null)}
              >
                <Text style={styles.closeBtnText}>Close</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Emergency Numbers */}
        {showEmergency && (
          <View style={styles.emergencyBox}>
            <Text style={styles.emergencyTitle}>🚨 Emergency Numbers</Text>
            {EMERGENCY_NUMBERS.map((e, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.emergencyRow, { borderLeftColor: e.color }]}
                onPress={() => callNumber(e.number)}
              >
                <Text style={styles.emergencyEmoji}>{e.emoji}</Text>
                <View style={styles.emergencyInfo}>
                  <Text style={styles.emergencyName}>{e.name}</Text>
                  <Text style={[styles.emergencyNumber, { color: e.color }]}>{e.number}</Text>
                </View>
                <View style={[styles.callNowBtn, { backgroundColor: e.color }]}>
                  <Text style={styles.callNowText}>Call</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Search */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search clinics, services..."
            placeholderTextColor={COLORS.textLight}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Care Type Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeScroll}>
          {CARE_TYPES.map(type => (
            <TouchableOpacity
              key={type.id}
              style={[styles.typeBtn, activeType === type.id && styles.typeBtnActive]}
              onPress={() => setActiveType(type.id)}
            >
              <Text style={styles.typeEmoji}>{type.emoji}</Text>
              <Text style={[styles.typeLabel, activeType === type.id && styles.typeLabelActive]}>
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Results */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>{filteredProviders.length} services found</Text>
        </View>

        {filteredProviders.map(provider => (
          <TouchableOpacity
            key={provider.id}
            style={styles.providerCard}
            onPress={() => setSelectedProvider(provider)}
          >
            <View style={styles.providerTop}>
              <View style={styles.providerLeft}>
                <Text style={styles.providerName}>{provider.name}</Text>
                <Text style={styles.providerSpecialty}>{provider.specialty}</Text>
              </View>
              <View style={styles.providerBadges}>
                {provider.nhs && (
                  <View style={styles.nhsBadgeSmall}>
                    <Text style={styles.nhsBadgeSmallText}>NHS</Text>
                  </View>
                )}
                {provider.emergency && (
                  <View style={styles.emergencyBadgeSmall}>
                    <Text style={styles.emergencyBadgeSmallText}>24/7</Text>
                  </View>
                )}
              </View>
            </View>

            <Text style={styles.providerDesc} numberOfLines={2}>
              {provider.description}
            </Text>

            <View style={styles.providerBottom}>
              <View style={styles.ratingRowSmall}>
                <Text style={styles.starsSmall}>★</Text>
                <Text style={styles.ratingSmall}>{provider.rating}</Text>
              </View>
              <Text style={styles.providerAddress} numberOfLines={1}>
                📍 {provider.address}
              </Text>
            </View>

            <View style={styles.providerActions}>
              <TouchableOpacity
                style={styles.callBtnSmall}
                onPress={() => callNumber(provider.phone)}
              >
                <Text style={styles.callBtnSmallText}>📞 Call</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.webBtnSmall}
                onPress={() => openWebsite(provider.website)}
              >
                <Text style={styles.webBtnSmallText}>🌐 Website</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.detailsBtn}
                onPress={() => setSelectedProvider(provider)}
              >
                <Text style={styles.detailsBtnText}>Details →</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        {filteredProviders.length === 0 && (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>No services found{'\n'}Try a different search!</Text>
          </View>
        )}

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            💜 Always verify provider details before attending. Information may change. In emergency call 999.
          </Text>
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
  emergencyBtn: {
    backgroundColor: '#E74C3C', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  emergencyBtnText: { color: '#fff', fontWeight: '800', fontSize: 13 },
  modalOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, padding: 20,
  },
  modal: {
    backgroundColor: '#fff', borderRadius: 24,
    padding: 24, marginTop: 40,
  },
  modalHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' },
  modalName: { fontSize: 22, fontWeight: '800', color: '#2D1B2E', flex: 1 },
  nhsBadge: { backgroundColor: '#003087', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  nhsBadgeText: { color: '#fff', fontWeight: '800', fontSize: 12 },
  emergencyBadge: { backgroundColor: '#27AE60', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  emergencyBadgeText: { color: '#fff', fontWeight: '800', fontSize: 12 },
  modalSpecialty: { fontSize: 14, color: '#9B8FA0', marginBottom: 8 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  stars: { fontSize: 16, color: '#F59E0B' },
  ratingText: { fontSize: 14, fontWeight: '700', color: '#2D1B2E' },
  modalDesc: { fontSize: 14, color: '#2D1B2E', lineHeight: 22, marginBottom: 10 },
  modalAddress: { fontSize: 13, color: '#9B8FA0', marginBottom: 14 },
  servicesTitle: { fontSize: 14, fontWeight: '800', color: '#2D1B2E', marginBottom: 8 },
  servicesList: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  serviceTag: {
    backgroundColor: '#F9EEF3', borderRadius: 10,
    paddingHorizontal: 10, paddingVertical: 5,
  },
  serviceTagText: { fontSize: 12, color: '#C9748F', fontWeight: '600' },
  modalBtns: { gap: 10, marginBottom: 10 },
  callBtn: {
    backgroundColor: '#27AE60', borderRadius: 50,
    paddingVertical: 14, alignItems: 'center',
  },
  callBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  webBtn: {
    backgroundColor: '#3498DB', borderRadius: 50,
    paddingVertical: 14, alignItems: 'center',
  },
  webBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  closeBtn: {
    borderWidth: 1.5, borderColor: '#EDE0E8', borderRadius: 50,
    paddingVertical: 12, alignItems: 'center',
  },
  closeBtnText: { color: '#9B8FA0', fontWeight: '700', fontSize: 15 },
  emergencyBox: {
    marginHorizontal: 20, marginBottom: 16,
    backgroundColor: '#FFE8E8', borderRadius: 20, padding: 16,
    borderWidth: 1.5, borderColor: '#E74C3C',
  },
  emergencyTitle: { fontSize: 16, fontWeight: '800', color: '#E74C3C', marginBottom: 12 },
  emergencyRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 12, padding: 12,
    marginBottom: 8, borderLeftWidth: 4, gap: 10,
  },
  emergencyEmoji: { fontSize: 24 },
  emergencyInfo: { flex: 1 },
  emergencyName: { fontSize: 14, fontWeight: '700', color: '#2D1B2E' },
  emergencyNumber: { fontSize: 16, fontWeight: '800' },
  callNowBtn: { borderRadius: 12, paddingHorizontal: 14, paddingVertical: 8 },
  callNowText: { color: '#fff', fontWeight: '800', fontSize: 13 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 16,
    marginHorizontal: 20, marginBottom: 14,
    paddingHorizontal: 14, paddingVertical: 12,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: '#2D1B2E' },
  clearText: { fontSize: 16, color: '#9B8FA0', fontWeight: '700' },
  typeScroll: { paddingLeft: 20, marginBottom: 14 },
  typeBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#fff', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 8,
    marginRight: 8, borderWidth: 1.5, borderColor: '#EDE0E8',
  },
  typeBtnActive: { backgroundColor: '#C9748F', borderColor: '#C9748F' },
  typeEmoji: { fontSize: 14 },
  typeLabel: { fontSize: 13, fontWeight: '600', color: '#9B8FA0' },
  typeLabelActive: { color: '#fff' },
  resultsHeader: { paddingHorizontal: 20, marginBottom: 10 },
  resultsCount: { fontSize: 14, fontWeight: '700', color: '#9B8FA0' },
  providerCard: {
    backgroundColor: '#fff', borderRadius: 20,
    marginHorizontal: 20, marginBottom: 12, padding: 16,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  providerTop: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 6,
  },
  providerLeft: { flex: 1 },
  providerName: { fontSize: 16, fontWeight: '800', color: '#2D1B2E' },
  providerSpecialty: { fontSize: 13, color: '#9B8FA0', marginTop: 2 },
  providerBadges: { flexDirection: 'row', gap: 6 },
  nhsBadgeSmall: {
    backgroundColor: '#003087', borderRadius: 6,
    paddingHorizontal: 6, paddingVertical: 2,
  },
  nhsBadgeSmallText: { color: '#fff', fontWeight: '800', fontSize: 10 },
  emergencyBadgeSmall: {
    backgroundColor: '#27AE60', borderRadius: 6,
    paddingHorizontal: 6, paddingVertical: 2,
  },
  emergencyBadgeSmallText: { color: '#fff', fontWeight: '800', fontSize: 10 },
  providerDesc: { fontSize: 13, color: '#2D1B2E', lineHeight: 20, marginBottom: 10 },
  providerBottom: {
    flexDirection: 'row', alignItems: 'center',
    gap: 10, marginBottom: 10,
  },
  ratingRowSmall: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  starsSmall: { fontSize: 13, color: '#F59E0B' },
  ratingSmall: { fontSize: 13, fontWeight: '700', color: '#2D1B2E' },
  providerAddress: { flex: 1, fontSize: 12, color: '#9B8FA0' },
  providerActions: { flexDirection: 'row', gap: 8 },
  callBtnSmall: {
    backgroundColor: '#EAFAF1', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 8,
  },
  callBtnSmallText: { color: '#27AE60', fontWeight: '700', fontSize: 13 },
  webBtnSmall: {
    backgroundColor: '#EAF4FF', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 8,
  },
  webBtnSmallText: { color: '#3498DB', fontWeight: '700', fontSize: 13 },
  detailsBtn: {
    backgroundColor: '#F9EEF3', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 8, marginLeft: 'auto',
  },
  detailsBtnText: { color: '#C9748F', fontWeight: '700', fontSize: 13 },
  emptyBox: { alignItems: 'center', paddingVertical: 40 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, color: '#9B8FA0', textAlign: 'center', lineHeight: 24 },
  disclaimer: {
    marginHorizontal: 20, marginBottom: 16,
    backgroundColor: '#F9EEF3', borderRadius: 16, padding: 14,
  },
  disclaimerText: { fontSize: 13, color: '#C9748F', lineHeight: 20, textAlign: 'center' },
});
