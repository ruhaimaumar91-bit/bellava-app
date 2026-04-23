import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar,
  TextInput, Modal,
} from 'react-native';
import COLORS from './colors';

const BABY_NAMES = [
  { name: 'Amara', gender: 'girl', origin: 'African', meaning: 'Grace and eternal beauty', popular: true },
  { name: 'Sofia', gender: 'girl', origin: 'Greek', meaning: 'Wisdom', popular: true },
  { name: 'Aisha', gender: 'girl', origin: 'Arabic', meaning: 'Living and prosperous', popular: true },
  { name: 'Isla', gender: 'girl', origin: 'Scottish', meaning: 'Island', popular: true },
  { name: 'Zara', gender: 'girl', origin: 'Arabic', meaning: 'Blossoming flower', popular: true },
  { name: 'Olivia', gender: 'girl', origin: 'Latin', meaning: 'Olive tree — symbol of peace', popular: true },
  { name: 'Fatima', gender: 'girl', origin: 'Arabic', meaning: 'One who abstains', popular: false },
  { name: 'Imani', gender: 'girl', origin: 'Swahili', meaning: 'Faith and belief', popular: false },
  { name: 'Luna', gender: 'girl', origin: 'Latin', meaning: 'Moon', popular: true },
  { name: 'Nadia', gender: 'girl', origin: 'Slavic', meaning: 'Hope', popular: false },
  { name: 'Layla', gender: 'girl', origin: 'Arabic', meaning: 'Night beauty', popular: true },
  { name: 'Yasmin', gender: 'girl', origin: 'Persian', meaning: 'Jasmine flower', popular: false },
  { name: 'Nia', gender: 'girl', origin: 'Swahili', meaning: 'Purpose', popular: false },
  { name: 'Emilia', gender: 'girl', origin: 'Latin', meaning: 'To strive or excel', popular: true },
  { name: 'Seren', gender: 'girl', origin: 'Welsh', meaning: 'Star', popular: false },
  { name: 'Adaeze', gender: 'girl', origin: 'Igbo', meaning: 'Daughter of a king', popular: false },
  { name: 'Mia', gender: 'girl', origin: 'Scandinavian', meaning: 'Mine or beloved', popular: true },
  { name: 'Rahima', gender: 'girl', origin: 'Arabic', meaning: 'Merciful and compassionate', popular: false },
  { name: 'Elara', gender: 'girl', origin: 'Greek', meaning: 'Bright and shining one', popular: false },
  { name: 'Nour', gender: 'girl', origin: 'Arabic', meaning: 'Light', popular: false },
  { name: 'Aurora', gender: 'girl', origin: 'Latin', meaning: 'Dawn — new beginnings', popular: true },
  { name: 'Freya', gender: 'girl', origin: 'Norse', meaning: 'Goddess of love', popular: true },
  { name: 'Miriam', gender: 'girl', origin: 'Hebrew', meaning: 'Wished-for child', popular: false },
  { name: 'Aaliya', gender: 'girl', origin: 'Arabic', meaning: 'Exalted and sublime', popular: false },
  { name: 'Celeste', gender: 'girl', origin: 'Latin', meaning: 'Heavenly', popular: false },
  { name: 'Adanna', gender: 'girl', origin: 'Igbo', meaning: 'Her father\'s daughter', popular: false },
  { name: 'Blessing', gender: 'girl', origin: 'English', meaning: 'Gift from God', popular: false },
  { name: 'Violet', gender: 'girl', origin: 'Latin', meaning: 'Purple flower', popular: true },
  { name: 'Elijah', gender: 'boy', origin: 'Hebrew', meaning: 'My God is Yahweh', popular: true },
  { name: 'Omar', gender: 'boy', origin: 'Arabic', meaning: 'Flourishing and long-lived', popular: true },
  { name: 'Kofi', gender: 'boy', origin: 'Akan', meaning: 'Born on Friday', popular: false },
  { name: 'Luca', gender: 'boy', origin: 'Italian', meaning: 'Bringer of light', popular: true },
  { name: 'Idris', gender: 'boy', origin: 'Welsh / Arabic', meaning: 'Interpreter, prophet', popular: false },
  { name: 'Theo', gender: 'boy', origin: 'Greek', meaning: 'Gift of God', popular: true },
  { name: 'Zion', gender: 'boy', origin: 'Hebrew', meaning: 'Highest point', popular: false },
  { name: 'Noah', gender: 'boy', origin: 'Hebrew', meaning: 'Rest and comfort', popular: true },
  { name: 'Tariq', gender: 'boy', origin: 'Arabic', meaning: 'Morning star', popular: false },
  { name: 'Felix', gender: 'boy', origin: 'Latin', meaning: 'Happy and fortunate', popular: true },
  { name: 'Emeka', gender: 'boy', origin: 'Igbo', meaning: 'Great deeds', popular: false },
  { name: 'Malik', gender: 'boy', origin: 'Arabic', meaning: 'King', popular: false },
  { name: 'Ibrahim', gender: 'boy', origin: 'Arabic', meaning: 'Father of nations', popular: false },
  { name: 'Sebastian', gender: 'boy', origin: 'Greek', meaning: 'Venerable, revered', popular: true },
  { name: 'Kwame', gender: 'boy', origin: 'Akan', meaning: 'Born on Saturday', popular: false },
  { name: 'Leo', gender: 'boy', origin: 'Latin', meaning: 'Lion — brave and strong', popular: true },
  { name: 'Yusuf', gender: 'boy', origin: 'Arabic', meaning: 'God increases', popular: false },
  { name: 'Arlo', gender: 'boy', origin: 'English', meaning: 'Fortified hill', popular: true },
  { name: 'Raphael', gender: 'boy', origin: 'Hebrew', meaning: 'God has healed', popular: false },
  { name: 'Ethan', gender: 'boy', origin: 'Hebrew', meaning: 'Strong and firm', popular: true },
  { name: 'Emmanuel', gender: 'boy', origin: 'Hebrew', meaning: 'God is with us', popular: false },
  { name: 'Tobias', gender: 'boy', origin: 'Hebrew', meaning: 'God is good', popular: false },
  { name: 'River', gender: 'neutral', origin: 'English', meaning: 'Flowing water — calm and free', popular: false },
  { name: 'Phoenix', gender: 'neutral', origin: 'Greek', meaning: 'Rising from the ashes', popular: true },
  { name: 'Sage', gender: 'neutral', origin: 'Latin', meaning: 'Wise and knowing', popular: false },
  { name: 'Eden', gender: 'neutral', origin: 'Hebrew', meaning: 'Place of delight', popular: false },
  { name: 'Remi', gender: 'neutral', origin: 'French / Yoruba', meaning: 'Oarsman / love me', popular: false },
  { name: 'Rowan', gender: 'neutral', origin: 'Gaelic', meaning: 'Little red one', popular: true },
  { name: 'Indigo', gender: 'neutral', origin: 'Greek', meaning: 'Deep blue — intuitive', popular: false },
  { name: 'Cleo', gender: 'neutral', origin: 'Greek', meaning: 'Pride and glory', popular: false },
  { name: 'Ezra', gender: 'neutral', origin: 'Hebrew', meaning: 'Help', popular: true },
  { name: 'Asa', gender: 'neutral', origin: 'Hebrew', meaning: 'Healer', popular: false },
];

const ORIGINS = ['All', 'African', 'Arabic', 'English', 'Greek', 'Hebrew', 'Latin', 'Igbo', 'Akan', 'Norse', 'Other'];

export default function BabyNamesScreen({ onBack }) {
  const [genderFilter, setGenderFilter] = useState('all');
  const [originFilter, setOriginFilter] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [favourites, setFavourites] = useState([]);
  const [selectedName, setSelectedName] = useState(null);
  const [showFavourites, setShowFavourites] = useState(false);

  const filtered = useMemo(() => {
    return BABY_NAMES.filter(n => {
      const matchGender = genderFilter === 'all' || n.gender === genderFilter;
      const matchOrigin = originFilter === 'All' ||
        n.origin.toLowerCase().includes(originFilter.toLowerCase());
      const matchSearch = n.name.toLowerCase().includes(searchText.toLowerCase()) ||
        n.meaning.toLowerCase().includes(searchText.toLowerCase());
      return matchGender && matchOrigin && matchSearch;
    });
  }, [genderFilter, originFilter, searchText]);

  const toggleFavourite = (name) => {
    setFavourites(prev =>
      prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]
    );
  };

  const isFavourite = (name) => favourites.includes(name);

  const genderColor = (g) => {
    if (g === 'girl') return '#E91E8C';
    if (g === 'boy') return '#2196F3';
    return '#9C27B0';
  };

  const genderEmoji = (g) => {
    if (g === 'girl') return '🌸';
    if (g === 'boy') return '💙';
    return '✨';
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
          <Text style={styles.headerTitle}>Baby Names</Text>
          <Text style={styles.headerSub}>Find the perfect name 👶</Text>
        </View>
        <TouchableOpacity style={styles.favBtn} onPress={() => setShowFavourites(true)}>
          <Text style={styles.favBtnText}>💜 {favourites.length}</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search names or meanings..."
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

      {/* Gender Filter */}
      <View style={styles.genderRow}>
        {[
          { id: 'all', label: '👶 All', color: '#7B6B9E' },
          { id: 'girl', label: '🌸 Girl', color: '#E91E8C' },
          { id: 'boy', label: '💙 Boy', color: '#2196F3' },
          { id: 'neutral', label: '✨ Neutral', color: '#9C27B0' },
        ].map(g => (
          <TouchableOpacity
            key={g.id}
            style={[styles.genderBtn, genderFilter === g.id && { backgroundColor: g.color }]}
            onPress={() => setGenderFilter(g.id)}
          >
            <Text style={[styles.genderLabel, genderFilter === g.id && { color: '#fff' }]}>
              {g.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Origin Filter */}
      <ScrollView
        horizontal showsHorizontalScrollIndicator={false}
        style={styles.originScroll}
        contentContainerStyle={styles.originContent}
      >
        {ORIGINS.map(o => (
          <TouchableOpacity
            key={o}
            style={[styles.originBtn, originFilter === o && styles.originBtnActive]}
            onPress={() => setOriginFilter(o)}
          >
            <Text style={[styles.originLabel, originFilter === o && styles.originLabelActive]}>
              {o}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.resultsCount}>{filtered.length} names found</Text>

      {/* Names List */}
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {filtered.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.nameCard}
            onPress={() => setSelectedName(item)}
          >
            <View style={[styles.genderDot, { backgroundColor: genderColor(item.gender) }]}>
              <Text style={styles.genderDotEmoji}>{genderEmoji(item.gender)}</Text>
            </View>
            <View style={styles.nameInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.nameTxt}>{item.name}</Text>
                {item.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>⭐ Popular</Text>
                  </View>
                )}
              </View>
              <Text style={styles.nameOrigin}>{item.origin}</Text>
              <Text style={styles.nameMeaning} numberOfLines={1}>{item.meaning}</Text>
            </View>
            <TouchableOpacity
              style={styles.heartBtn}
              onPress={() => toggleFavourite(item.name)}
            >
              <Text style={styles.heartIcon}>
                {isFavourite(item.name) ? '💜' : '🤍'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
        <View style={{ height: 60 }} />
      </ScrollView>

      {/* Name Detail Modal */}
      <Modal visible={!!selectedName} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            {selectedName && (
              <>
                <Text style={styles.modalGenderEmoji}>{genderEmoji(selectedName.gender)}</Text>
                <Text style={styles.modalName}>{selectedName.name}</Text>
                <View style={[styles.modalGenderBadge, { backgroundColor: genderColor(selectedName.gender) }]}>
                  <Text style={styles.modalGenderLabel}>
                    {selectedName.gender.charAt(0).toUpperCase() + selectedName.gender.slice(1)} Name
                  </Text>
                </View>
                <View style={styles.modalDetailRow}>
                  <Text style={styles.modalDetailLabel}>🌍 Origin</Text>
                  <Text style={styles.modalDetailValue}>{selectedName.origin}</Text>
                </View>
                <View style={styles.modalDetailRow}>
                  <Text style={styles.modalDetailLabel}>💡 Meaning</Text>
                  <Text style={styles.modalDetailValue}>{selectedName.meaning}</Text>
                </View>
                {selectedName.popular && (
                  <View style={styles.modalPopular}>
                    <Text style={styles.modalPopularText}>⭐ Popular name in our community</Text>
                  </View>
                )}
                <TouchableOpacity
                  style={[
                    styles.modalFavBtn,
                    isFavourite(selectedName.name)
                      ? { backgroundColor: COLORS.primary }
                      : { borderWidth: 2, borderColor: COLORS.primary },
                  ]}
                  onPress={() => toggleFavourite(selectedName.name)}
                >
                  <Text style={[
                    styles.modalFavBtnText,
                    !isFavourite(selectedName.name) && { color: COLORS.primary },
                  ]}>
                    {isFavourite(selectedName.name) ? '💜 Saved to Favourites' : '🤍 Add to Favourites'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedName(null)}>
                  <Text style={styles.closeBtnText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Favourites Modal */}
      <Modal visible={showFavourites} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalName}>💜 Your Favourites</Text>
            {favourites.length === 0 ? (
              <Text style={styles.emptyFav}>
                You have not saved any names yet. Tap 🤍 on a name to save it here.
              </Text>
            ) : (
              <ScrollView style={{ width: '100%', maxHeight: 300 }}>
                {favourites.map((fav, i) => {
                  const nameData = BABY_NAMES.find(n => n.name === fav);
                  return (
                    <View key={i} style={styles.favItem}>
                      <Text style={styles.favItemEmoji}>
                        {nameData ? genderEmoji(nameData.gender) : '👶'}
                      </Text>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.favItemName}>{fav}</Text>
                        {nameData && (
                          <Text style={styles.favItemMeaning}>{nameData.meaning}</Text>
                        )}
                      </View>
                      <TouchableOpacity onPress={() => toggleFavourite(fav)}>
                        <Text style={{ fontSize: 20 }}>💜</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
            )}
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowFavourites(false)}>
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
  favBtn: {
    backgroundColor: COLORS.background, borderRadius: 50,
    paddingHorizontal: 14, paddingVertical: 8,
    borderWidth: 1, borderColor: COLORS.border,
  },
  favBtnText: { fontSize: 14, fontWeight: '700', color: COLORS.primary },
  searchBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.white, margin: 16, borderRadius: 16,
    paddingHorizontal: 14, paddingVertical: 12,
    borderWidth: 1, borderColor: COLORS.border, gap: 10,
  },
  searchIcon: { fontSize: 18 },
  searchInput: { flex: 1, fontSize: 15, color: COLORS.text },
  clearBtn: { fontSize: 16, color: COLORS.textLight, paddingHorizontal: 4 },
  genderRow: { flexDirection: 'row', marginHorizontal: 16, gap: 8, marginBottom: 10 },
  genderBtn: {
    flex: 1, paddingVertical: 9, borderRadius: 12,
    alignItems: 'center', backgroundColor: COLORS.background,
  },
  genderLabel: { fontSize: 12, fontWeight: '700', color: COLORS.text },
  originScroll: { maxHeight: 48 },
  originContent: { paddingHorizontal: 16, gap: 8, paddingVertical: 4 },
  originBtn: {
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 50, backgroundColor: COLORS.background,
  },
  originBtnActive: { backgroundColor: COLORS.primary },
  originLabel: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  originLabelActive: { color: '#fff' },
  resultsCount: {
    fontSize: 13, color: COLORS.textLight,
    marginHorizontal: 20, marginTop: 10, marginBottom: 6,
  },
  list: { flex: 1, paddingHorizontal: 16 },
  nameCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.white, borderRadius: 16,
    padding: 14, marginBottom: 10,
    borderWidth: 1, borderColor: COLORS.border, gap: 12,
  },
  genderDot: {
    width: 44, height: 44, borderRadius: 22,
    alignItems: 'center', justifyContent: 'center',
  },
  genderDotEmoji: { fontSize: 20 },
  nameInfo: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  nameTxt: { fontSize: 17, fontWeight: '800', color: COLORS.text },
  popularBadge: {
    backgroundColor: '#FFF8E1', borderRadius: 50,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  popularText: { fontSize: 11, fontWeight: '600', color: '#F59E0B' },
  nameOrigin: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  nameMeaning: { fontSize: 13, color: COLORS.text, marginTop: 2 },
  heartBtn: { padding: 4 },
  heartIcon: { fontSize: 22 },
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
  modalGenderEmoji: { fontSize: 48, marginBottom: 8 },
  modalName: { fontSize: 26, fontWeight: '800', color: COLORS.text, marginBottom: 10 },
  modalGenderBadge: {
    borderRadius: 50, paddingHorizontal: 20, paddingVertical: 8, marginBottom: 20,
  },
  modalGenderLabel: { color: '#fff', fontWeight: '700', fontSize: 14 },
  modalDetailRow: {
    width: '100%', flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  modalDetailLabel: { fontSize: 14, color: COLORS.textLight, fontWeight: '600' },
  modalDetailValue: { fontSize: 14, color: COLORS.text, fontWeight: '600', flex: 1, textAlign: 'right' },
  modalPopular: {
    backgroundColor: '#FFF8E1', borderRadius: 12, padding: 12,
    marginTop: 14, width: '100%',
  },
  modalPopularText: { fontSize: 13, color: '#F59E0B', fontWeight: '600', textAlign: 'center' },
  modalFavBtn: {
    width: '100%', paddingVertical: 15, borderRadius: 50,
    alignItems: 'center', marginTop: 20, backgroundColor: COLORS.primary,
  },
  modalFavBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  closeBtn: {
    borderWidth: 2, borderColor: COLORS.border, borderRadius: 50,
    paddingVertical: 13, paddingHorizontal: 48, marginTop: 12,
  },
  closeBtnText: { color: COLORS.textLight, fontWeight: '700', fontSize: 15 },
  emptyFav: {
    fontSize: 14, color: COLORS.textLight, textAlign: 'center',
    lineHeight: 22, marginVertical: 20,
  },
  favItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 12, borderBottomWidth: 1,
    borderBottomColor: COLORS.border, gap: 12, width: '100%',
  },
  favItemEmoji: { fontSize: 24 },
  favItemName: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  favItemMeaning: { fontSize: 13, color: COLORS.textLight, marginTop: 2 },
});
