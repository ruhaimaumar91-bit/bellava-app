import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar,
  TextInput, Modal,
} from 'react-native';
import COLORS from './colors';

const CARE_CATEGORIES = [
  { id: 'all', label: 'All', emoji: '🏥' },
  { id: 'gp', label: 'GP', emoji: '👩‍⚕️' },
  { id: 'gynaecology', label: 'Gynaecology', emoji: '🌸' },
  { id: 'sexual', label: 'Sexual Health', emoji: '💊' },
  { id: 'mental', label: 'Mental Health', emoji: '🧠' },
  { id: 'fertility', label: 'Fertility', emoji: '🌱' },
  { id: 'maternity', label: 'Maternity', emoji: '🤰' },
  { id: 'pharmacy', label: 'Pharmacy', emoji: '💉' },
];

const MOCK_CLINICS = [
  {
    id: 1,
    name: 'Kings College Hospital',
    type: 'gp',
    address: 'Denmark Hill, London SE5 9RS',
    distance: '0.8 miles',
    rating: 4.5,
    open: true,
    hours: 'Mon-Fri 8am-6pm',
    phone: '020 3299 9000',
    nhs: true,
    services: ['GP', 'Gynaecology', 'Maternity', 'Mental Health'],
  },
  {
    id: 2,
    name: 'Brook Sexual Health Clinic',
    type: 'sexual',
    address: '96 Commercial St, London E1 6LZ',
    distance: '1.2 miles',
    rating: 4.8,
    open: true,
    hours: 'Mon-Sat 9am-5pm',
    phone: '020 7377 0899',
    nhs: true,
    services: ['STI Testing', 'Contraception', 'Sexual Health Advice'],
  },
  {
    id: 3,
    name: 'The Lister Hospital',
    type: 'gynaecology',
    address: 'Chelsea Bridge Rd, London SW1W 8RH',
    distance: '2.1 miles',
    rating: 4.7,
    open: false,
    hours: 'Mon-Fri 8am-8pm',
    phone: '020 7730 7733',
    nhs: false,
    services: ['Gynaecology', 'Fertility', 'Menopause Clinic', 'Ultrasound'],
  },
  {
    id: 4,
    name: 'Mind Mental Health Centre',
    type: 'mental',
    address: '15-19 Broadway, London E15 4BQ',
    distance: '2.4 miles',
    rating: 4.6,
    open: true,
    hours: 'Mon-Fri 9am-5pm',
    phone: '020 8519 2122',
    nhs: true,
    services: ['Counselling', 'CBT', 'Crisis Support', 'Perinatal Mental Health'],
  },
  {
    id: 5,
    name: 'Create Fertility Centre',
    type: 'fertility',
    address: '150 Fenchurch St, London EC3M 6BB',
    distance: '3.0 miles',
    rating: 4.9,
    open: true,
    hours: 'Mon-Fri 7:30am-6pm',
    phone: '0333 240 7300',
    nhs: false,
    services: ['IVF', 'IUI', 'Egg Freezing', 'Fertility Assessment'],
  },
  {
    id: 6,
    name: 'St Thomas Hospital Maternity',
    type: 'maternity',
    address: 'Westminster Bridge Rd, London SE1 7EH',
    distance: '3.2 miles',
    rating: 4.4,
    open: true,
    hours: '24 hours',
    phone: '020 7188 7188',
    nhs: true,
    services: ['Antenatal Care', 'Labour & Birth', 'Postnatal Care', 'Midwifery'],
  },
  {
    id: 7,
    name: 'Boots Pharmacy',
    type: 'pharmacy',
    address: '375 Oxford St, London W1C 2JT',
    distance: '4.1 miles',
    rating: 4.2,
    open: true,
    hours: 'Mon-Sat 7am-10pm',
    phone: '020 7409 2700',
    nhs: true,
    services: ['Prescriptions', 'Emergency Contraception', 'Pharmacy Consultations'],
  },
];

const HELPLINES = [
  {
    emoji: '🆘',
    name: 'NHS 111',
    desc: 'Non-emergency medical advice',
    number: '111',
    color: '#2196F3',
  },
  {
    emoji: '🌸',
    name: 'Endometriosis UK',
    desc: 'Support for endometriosis',
    number: '0808 808 2227',
    color: '#E91E8C',
  },
  {
    emoji: '💜',
    name: 'Samaritans',
    desc: '24/7 emotional support',
    number: '116 123',
    color: '#9C27B0',
  },
  {
    emoji: '🤰',
    name: 'Tommy\'s Midwife',
    desc: 'Pregnancy health advice',
    number: '0800 014 7800',
    color: '#4CAF50',
  },
  {
    emoji: '🌿',
    name: 'Menopause Helpline',
    desc: 'British Menopause Society',
    number: '01628 890199',
    color: '#FF9800',
  },
];

export default function CareFinderScreen({ onBack, userPlan }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [activeTab, setActiveTab] = useState('clinics');

  const filtered = MOCK_CLINICS.filter(clinic => {
    const matchCat = activeCategory === 'all' || clinic.type === activeCategory;
    const matchSearch = clinic.name.toLowerCase().includes(searchText.toLowerCase()) ||
      clinic.address.toLowerCase().includes(searchText.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Care Finder</Text>
          <Text style={styles.headerSub}>Find healthcare near you 🏥</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'clinics' && styles.tabActive]}
          onPress={() => setActiveTab('clinics')}
        >
          <Text style={[styles.tabText, activeTab === 'clinics' && styles.tabTextActive]}>
            🏥 Clinics
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'helplines' && styles.tabActive]}
          onPress={() => setActiveTab('helplines')}
        >
          <Text style={[styles.tabText, activeTab === 'helplines' && styles.tabTextActive]}>
            📞 Helplines
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'clinics' && (
        <>
          {/* Search */}
          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search clinics or areas..."
              placeholderTextColor={COLORS.textLight}
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Text style={styles.clearBtn}>✕</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Category tabs */}
          <ScrollView
            horizontal showsHorizontalScrollIndicator={false}
            style={styles.catScroll}
            contentContainerStyle={styles.catContent}
          >
            {CARE_CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.catTab, activeCategory === cat.id && styles.catTabActive]}
                onPress={() => setActiveCategory(cat.id)}
              >
                <Text style={styles.catEmoji}>{cat.emoji}</Text>
                <Text style={[styles.catLabel, activeCategory === cat.id && styles.catLabelActive]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {activeTab === 'clinics' && (
          <>
            <Text style={styles.resultsText}>{filtered.length} clinics found</Text>
            {filtered.map(clinic => (
              <TouchableOpacity
                key={clinic.id}
                style={styles.clinicCard}
                onPress={() => setSelectedClinic(clinic)}
              >
                <View style={styles.clinicHeader}>
                  <View style={styles.clinicLeft}>
                    <Text style={styles.clinicName}>{clinic.name}</Text>
                    <Text style={styles.clinicAddress}>📍 {clinic.address}</Text>
                    <Text style={styles.clinicDistance}>🚶 {clinic.distance}</Text>
                  </View>
                  <View style={styles.clinicRight}>
                    <View style={[
                      styles.openBadge,
                      { backgroundColor: clinic.open ? '#E8F8EE' : '#FFE0E0' },
                    ]}>
                      <Text style={[
                        styles.openText,
                        { color: clinic.open ? '#27AE60' : '#E74C3C' },
                      ]}>
                        {clinic.open ? '🟢 Open' : '🔴 Closed'}
                      </Text>
                    </View>
                    {clinic.nhs && (
                      <View style={styles.nhsBadge}>
                        <Text style={styles.nhsText}>NHS</Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.clinicFooter}>
                  <Text style={styles.clinicRating}>⭐ {clinic.rating}</Text>
                  <Text style={styles.clinicHours}>🕐 {clinic.hours}</Text>
                </View>

                <View style={styles.servicesRow}>
                  {clinic.services.slice(0, 3).map((service, i) => (
                    <View key={i} style={styles.serviceChip}>
                      <Text style={styles.serviceChipText}>{service}</Text>
                    </View>
                  ))}
                  {clinic.services.length > 3 && (
                    <View style={styles.serviceChip}>
                      <Text style={styles.serviceChipText}>+{clinic.services.length - 3} more</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}

            <View style={styles.noteCard}>
              <Text style={styles.noteText}>
                📍 Showing sample clinics for London. Once location permission is enabled, Bellava will show real clinics near you.
              </Text>
            </View>
          </>
        )}

        {activeTab === 'helplines' && (
          <>
            <Text style={styles.helplineIntro}>
              Free, confidential support lines for women's health:
            </Text>
            {HELPLINES.map((line, i) => (
              <View key={i} style={[styles.helplineCard, { borderLeftColor: line.color }]}>
                <Text style={styles.helplineEmoji}>{line.emoji}</Text>
                <View style={styles.helplineInfo}>
                  <Text style={styles.helplineName}>{line.name}</Text>
                  <Text style={styles.helplineDesc}>{line.desc}</Text>
                  <Text style={[styles.helplineNumber, { color: line.color }]}>
                    📞 {line.number}
                  </Text>
                </View>
              </View>
            ))}

            <View style={styles.emergencyCard}>
              <Text style={styles.emergencyTitle}>🚨 Emergency</Text>
              <Text style={styles.emergencyText}>
                If you are in immediate danger or need urgent medical help:
              </Text>
              <Text style={styles.emergencyNumber}>Call 999</Text>
              <Text style={styles.emergencyText}>
                For non-emergency medical advice: Call 111
              </Text>
            </View>
          </>
        )}

        <View style={{ height: 60 }} />
      </ScrollView>

      {/* Clinic Detail Modal */}
      <Modal visible={!!selectedClinic} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            {selectedClinic && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalName}>{selectedClinic.name}</Text>
                  <View style={[
                    styles.openBadge,
                    { backgroundColor: selectedClinic.open ? '#E8F8EE' : '#FFE0E0' },
                  ]}>
                    <Text style={[
                      styles.openText,
                      { color: selectedClinic.open ? '#27AE60' : '#E74C3C' },
                    ]}>
                      {selectedClinic.open ? '🟢 Open now' : '🔴 Closed'}
                    </Text>
                  </View>
                </View>

                {[
                  { icon: '📍', label: selectedClinic.address },
                  { icon: '🕐', label: selectedClinic.hours },
                  { icon: '📞', label: selectedClinic.phone },
                  { icon: '🚶', label: selectedClinic.distance + ' away' },
                  { icon: '⭐', label: `${selectedClinic.rating} rating` },
                ].map((item, i) => (
                  <View key={i} style={styles.modalRow}>
                    <Text style={styles.modalRowIcon}>{item.icon}</Text>
                    <Text style={styles.modalRowText}>{item.label}</Text>
                  </View>
                ))}

                <Text style={styles.servicesTitle}>Services offered:</Text>
                <View style={styles.servicesRow}>
                  {selectedClinic.services.map((service, i) => (
                    <View key={i} style={styles.serviceChip}>
                      <Text style={styles.serviceChipText}>{service}</Text>
                    </View>
                  ))}
                </View>

                {selectedClinic.nhs && (
                  <View style={styles.nhsInfo}>
                    <Text style={styles.nhsInfoText}>
                      ✅ This is an NHS facility — most services are free with a valid NHS number.
                    </Text>
                  </View>
                )}
              </>
            )}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setSelectedClinic(null)}
            >
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
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
  tabRow: {
    flexDirection: 'row', backgroundColor: COLORS.white,
    paddingHorizontal: 16, paddingBottom: 12, gap: 8,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1, paddingVertical: 10, borderRadius: 50,
    alignItems: 'center', backgroundColor: COLORS.background,
  },
  tabActive: { backgroundColor: COLORS.primary },
  tabText: { fontSize: 14, fontWeight: '700', color: COLORS.textLight },
  tabTextActive: { color: '#fff' },
  searchBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.white, margin: 16, borderRadius: 16,
    paddingHorizontal: 14, paddingVertical: 12,
    borderWidth: 1, borderColor: COLORS.border, gap: 10,
  },
  searchIcon: { fontSize: 18 },
  searchInput: { flex: 1, fontSize: 15, color: COLORS.text },
  clearBtn: { fontSize: 16, color: COLORS.textLight },
  catScroll: { maxHeight: 52 },
  catContent: { paddingHorizontal: 16, gap: 8, paddingBottom: 8 },
  catTab: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 50, backgroundColor: COLORS.background,
  },
  catTabActive: { backgroundColor: COLORS.primary },
  catEmoji: { fontSize: 14 },
  catLabel: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  catLabelActive: { color: '#fff' },
  content: { flex: 1, padding: 16 },
  resultsText: { fontSize: 13, color: COLORS.textLight, marginBottom: 12 },
  clinicCard: {
    backgroundColor: COLORS.white, borderRadius: 20,
    padding: 16, marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 10, elevation: 2,
  },
  clinicHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginBottom: 10,
  },
  clinicLeft: { flex: 1, marginRight: 10 },
  clinicName: { fontSize: 16, fontWeight: '800', color: COLORS.text, marginBottom: 4 },
  clinicAddress: { fontSize: 12, color: COLORS.textLight, marginBottom: 2 },
  clinicDistance: { fontSize: 12, color: COLORS.textLight },
  clinicRight: { alignItems: 'flex-end', gap: 6 },
  openBadge: { borderRadius: 50, paddingHorizontal: 10, paddingVertical: 5 },
  openText: { fontSize: 12, fontWeight: '600' },
  nhsBadge: {
    backgroundColor: '#003087', borderRadius: 6,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  nhsText: { color: '#fff', fontSize: 11, fontWeight: '800' },
  clinicFooter: {
    flexDirection: 'row', gap: 16,
    paddingVertical: 8, borderTopWidth: 1,
    borderTopColor: COLORS.border, borderBottomWidth: 1,
    borderBottomColor: COLORS.border, marginBottom: 10,
  },
  clinicRating: { fontSize: 13, color: COLORS.text, fontWeight: '600' },
  clinicHours: { fontSize: 13, color: COLORS.textLight },
  servicesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  serviceChip: {
    backgroundColor: COLORS.background, borderRadius: 50,
    paddingHorizontal: 10, paddingVertical: 5,
    borderWidth: 1, borderColor: COLORS.border,
  },
  serviceChipText: { fontSize: 11, color: COLORS.text, fontWeight: '600' },
  noteCard: {
    backgroundColor: '#FFF8E6', borderRadius: 12, padding: 14, marginTop: 4,
  },
  noteText: { fontSize: 12, color: '#9A6800', lineHeight: 18 },
  helplineIntro: { fontSize: 14, color: COLORS.textLight, marginBottom: 16 },
  helplineCard: {
    flexDirection: 'row', backgroundColor: COLORS.white,
    borderRadius: 16, padding: 16, marginBottom: 12,
    borderLeftWidth: 4, gap: 14, alignItems: 'center',
  },
  helplineEmoji: { fontSize: 28 },
  helplineInfo: { flex: 1 },
  helplineName: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  helplineDesc: { fontSize: 13, color: COLORS.textLight, marginTop: 2 },
  helplineNumber: { fontSize: 15, fontWeight: '800', marginTop: 6 },
  emergencyCard: {
    backgroundColor: '#FFF0F0', borderRadius: 16, padding: 20,
    borderWidth: 1, borderColor: '#FFB0B0', marginTop: 8, alignItems: 'center',
  },
  emergencyTitle: { fontSize: 20, fontWeight: '800', color: '#E74C3C', marginBottom: 8 },
  emergencyText: { fontSize: 14, color: COLORS.text, textAlign: 'center', marginBottom: 6 },
  emergencyNumber: { fontSize: 28, fontWeight: '800', color: '#E74C3C', marginVertical: 8 },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: COLORS.white, borderTopLeftRadius: 28,
    borderTopRightRadius: 28, padding: 24, maxHeight: '85%',
  },
  modalHandle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: COLORS.border, alignSelf: 'center', marginBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 16,
  },
  modalName: { fontSize: 18, fontWeight: '800', color: COLORS.text, flex: 1, marginRight: 10 },
  modalRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 12, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  modalRowIcon: { fontSize: 18 },
  modalRowText: { fontSize: 14, color: COLORS.text, flex: 1 },
  servicesTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginTop: 14, marginBottom: 10 },
  nhsInfo: {
    backgroundColor: '#E3F2FD', borderRadius: 12, padding: 12, marginTop: 12,
  },
  nhsInfoText: { fontSize: 13, color: '#1565C0', lineHeight: 20 },
  closeBtn: {
    borderWidth: 2, borderColor: COLORS.border, borderRadius: 50,
    paddingVertical: 14, alignItems: 'center', marginTop: 16,
  },
  closeBtnText: { color: COLORS.textLight, fontWeight: '700', fontSize: 15 },
});
