import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar,
  TextInput, Alert,
} from 'react-native';
import COLORS from './colors';

const BABY_NAMES = [
  { name: 'Amara', gender: 'girl', origin: 'African', meaning: 'Grace and eternal beauty', popular: true },
  { name: 'Aria', gender: 'girl', origin: 'Italian', meaning: 'Air, song or melody', popular: true },
  { name: 'Aisha', gender: 'girl', origin: 'Arabic', meaning: 'Alive and well', popular: true },
  { name: 'Aurora', gender: 'girl', origin: 'Latin', meaning: 'Dawn, new beginnings', popular: true },
  { name: 'Amelia', gender: 'girl', origin: 'English', meaning: 'Industrious and striving', popular: true },
  { name: 'Aaliya', gender: 'girl', origin: 'Arabic', meaning: 'Exalted, sublime', popular: false },
  { name: 'Bella', gender: 'girl', origin: 'Italian', meaning: 'Beautiful', popular: true },
  { name: 'Beatrice', gender: 'girl', origin: 'Latin', meaning: 'She who brings happiness', popular: false },
  { name: 'Celeste', gender: 'girl', origin: 'French', meaning: 'Heavenly, of the sky', popular: false },
  { name: 'Charlotte', gender: 'girl', origin: 'French', meaning: 'Free woman, strong', popular: true },
  { name: 'Clara', gender: 'girl', origin: 'Latin', meaning: 'Bright and clear', popular: true },
  { name: 'Chloe', gender: 'girl', origin: 'Greek', meaning: 'Blooming, fertility', popular: true },
  { name: 'Dalia', gender: 'girl', origin: 'Arabic', meaning: 'Gentle, a branch', popular: false },
  { name: 'Diana', gender: 'girl', origin: 'Latin', meaning: 'Divine, goddess of the moon', popular: false },
  { name: 'Elena', gender: 'girl', origin: 'Greek', meaning: 'Bright, shining light', popular: true },
  { name: 'Elara', gender: 'girl', origin: 'Greek', meaning: 'Happy, joyful', popular: false },
  { name: 'Eva', gender: 'girl', origin: 'Hebrew', meaning: 'Life, living', popular: true },
  { name: 'Fatima', gender: 'girl', origin: 'Arabic', meaning: 'Captivating, one who abstains', popular: true },
  { name: 'Florence', gender: 'girl', origin: 'Latin', meaning: 'Flourishing, prosperous', popular: false },
  { name: 'Freya', gender: 'girl', origin: 'Norse', meaning: 'Goddess of love and beauty', popular: true },
  { name: 'Grace', gender: 'girl', origin: 'English', meaning: 'Elegance, divine grace', popular: true },
  { name: 'Hana', gender: 'girl', origin: 'Arabic', meaning: 'Happiness and bliss', popular: false },
  { name: 'Isla', gender: 'girl', origin: 'Scottish', meaning: 'Island, serene', popular: true },
  { name: 'Imani', gender: 'girl', origin: 'African', meaning: 'Faith and belief', popular: false },
  { name: 'Jasmine', gender: 'girl', origin: 'Persian', meaning: 'Gift from God, fragrant flower', popular: true },
  { name: 'Layla', gender: 'girl', origin: 'Arabic', meaning: 'Night, dark beauty', popular: true },
  { name: 'Luna', gender: 'girl', origin: 'Latin', meaning: 'Moon, mystical', popular: true },
  { name: 'Lena', gender: 'girl', origin: 'Greek', meaning: 'Bright, shining', popular: false },
  { name: 'Mia', gender: 'girl', origin: 'Scandinavian', meaning: 'Mine, beloved', popular: true },
  { name: 'Maya', gender: 'girl', origin: 'Hebrew', meaning: 'Water, illusion', popular: true },
  { name: 'Nadia', gender: 'girl', origin: 'Slavic', meaning: 'Hope', popular: false },
  { name: 'Noor', gender: 'girl', origin: 'Arabic', meaning: 'Light, divine light', popular: true },
  { name: 'Olivia', gender: 'girl', origin: 'Latin', meaning: 'Olive tree, peace', popular: true },
  { name: 'Phoebe', gender: 'girl', origin: 'Greek', meaning: 'Bright, radiant', popular: false },
  { name: 'Rose', gender: 'girl', origin: 'English', meaning: 'The flower, love', popular: true },
  { name: 'Rania', gender: 'girl', origin: 'Arabic', meaning: 'Queenly, gazing', popular: false },
  { name: 'Sofia', gender: 'girl', origin: 'Greek', meaning: 'Wisdom', popular: true },
  { name: 'Sara', gender: 'girl', origin: 'Hebrew', meaning: 'Princess, noble lady', popular: true },
  { name: 'Sienna', gender: 'girl', origin: 'Italian', meaning: 'Orange-red, earthy', popular: false },
  { name: 'Zara', gender: 'girl', origin: 'Arabic', meaning: 'Blossom, flower', popular: true },
  { name: 'Zoe', gender: 'girl', origin: 'Greek', meaning: 'Life, alive', popular: true },
  { name: 'Adam', gender: 'boy', origin: 'Hebrew', meaning: 'Son of the earth', popular: true },
  { name: 'Amir', gender: 'boy', origin: 'Arabic', meaning: 'Prince, leader', popular: true },
  { name: 'Arthur', gender: 'boy', origin: 'Celtic', meaning: 'Bear, strong', popular: true },
  { name: 'Benjamin', gender: 'boy', origin: 'Hebrew', meaning: 'Son of the right hand', popular: true },
  { name: 'Caleb', gender: 'boy', origin: 'Hebrew', meaning: 'Faithful, devoted', popular: false },
  { name: 'Daniel', gender: 'boy', origin: 'Hebrew', meaning: 'God is my judge', popular: true },
  { name: 'David', gender: 'boy', origin: 'Hebrew', meaning: 'Beloved', popular: true },
  { name: 'Elijah', gender: 'boy', origin: 'Hebrew', meaning: 'My God is Yahweh', popular: true },
  { name: 'Ethan', gender: 'boy', origin: 'Hebrew', meaning: 'Strong, firm', popular: true },
  { name: 'Felix', gender: 'boy', origin: 'Latin', meaning: 'Happy, fortunate', popular: false },
  { name: 'George', gender: 'boy', origin: 'Greek', meaning: 'Farmer, earth worker', popular: true },
  { name: 'Hassan', gender: 'boy', origin: 'Arabic', meaning: 'Handsome, good', popular: true },
  { name: 'Ibrahim', gender: 'boy', origin: 'Arabic', meaning: 'Father of nations', popular: true },
  { name: 'Isaac', gender: 'boy', origin: 'Hebrew', meaning: 'He will laugh', popular: false },
  { name: 'James', gender: 'boy', origin: 'English', meaning: 'Supplanter, strong', popular: true },
  { name: 'Kai', gender: 'boy', origin: 'Hawaiian', meaning: 'Sea, ocean', popular: true },
  { name: 'Liam', gender: 'boy', origin: 'Irish', meaning: 'Strong-willed warrior', popular: true },
  { name: 'Leo', gender: 'boy', origin: 'Latin', meaning: 'Lion, brave', popular: true },
  { name: 'Lucas', gender: 'boy', origin: 'Latin', meaning: 'Light, illumination', popular: true },
  { name: 'Muhammad', gender: 'boy', origin: 'Arabic', meaning: 'Praised, praiseworthy', popular: true },
  { name: 'Noah', gender: 'boy', origin: 'Hebrew', meaning: 'Rest, comfort', popular: true },
  { name: 'Oliver', gender: 'boy', origin: 'Latin', meaning: 'Olive tree, peace', popular: true },
  { name: 'Omar', gender: 'boy', origin: 'Arabic', meaning: 'Flourishing, long-lived', popular: true },
  { name: 'Oscar', gender: 'boy', origin: 'Norse', meaning: 'God spear, divine strength', popular: false },
  { name: 'Ryan', gender: 'boy', origin: 'Irish', meaning: 'Little king', popular: true },
  { name: 'Samuel', gender: 'boy', origin: 'Hebrew', meaning: 'God has heard', popular: true },
  { name: 'Sebastian', gender: 'boy', origin: 'Greek', meaning: 'Venerable, revered', popular: false },
  { name: 'Theodore', gender: 'boy', origin: 'Greek', meaning: 'Gift of God', popular: true },
  { name: 'Thomas', gender: 'boy', origin: 'Aramaic', meaning: 'Twin', popular: true },
  { name: 'William', gender: 'boy', origin: 'English', meaning: 'Strong-willed warrior', popular: true },
  { name: 'Yusuf', gender: 'boy', origin: 'Arabic', meaning: 'God increases', popular: true },
  { name: 'Zain', gender: 'boy', origin: 'Arabic', meaning: 'Beauty, grace', popular: true },
  { name: 'Ariel', gender: 'neutral', origin: 'Hebrew', meaning: 'Lion of God', popular: false },
  { name: 'Avery', gender: 'neutral', origin: 'English', meaning: 'Ruler of elves', popular: true },
  { name: 'Casey', gender: 'neutral', origin: 'Irish', meaning: 'Brave in battle', popular: false },
  { name: 'Jordan', gender: 'neutral', origin: 'Hebrew', meaning: 'Flowing down, river', popular: true },
  { name: 'Morgan', gender: 'neutral', origin: 'Welsh', meaning: 'Sea circle, bright', popular: false },
  { name: 'River', gender: 'neutral', origin: 'English', meaning: 'Flowing water, peaceful', popular: true },
  { name: 'Robin', gender: 'neutral', origin: 'English', meaning: 'Bright fame', popular: false },
  { name: 'Sage', gender: 'neutral', origin: 'English', meaning: 'Wise, herb', popular: true },
  { name: 'Sky', gender: 'neutral', origin: 'English', meaning: 'The sky, limitless', popular: false },
  { name: 'Taylor', gender: 'neutral', origin: 'English', meaning: 'Tailor, one who cuts', popular: false },
];

const ORIGINS = ['All', 'Arabic', 'English', 'Hebrew', 'Latin', 'Greek', 'African', 'French', 'Irish'];
export default function BabyNamesScreen({ onBack }) {
  const [searchText, setSearchText] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');
  const [originFilter, setOriginFilter] = useState('All');
  const [favourites, setFavourites] = useState([]);
  const [showFavourites, setShowFavourites] = useState(false);
  const [selectedName, setSelectedName] = useState(null);

  const toggleFavourite = (name) => {
    setFavourites(prev =>
      prev.includes(name)
        ? prev.filter(n => n !== name)
        : [...prev, name]
    );
  };

  const filteredNames = BABY_NAMES.filter(n => {
    const matchesSearch = n.name.toLowerCase().includes(searchText.toLowerCase()) ||
      n.meaning.toLowerCase().includes(searchText.toLowerCase());
    const matchesGender = genderFilter === 'all' || n.gender === genderFilter;
    const matchesOrigin = originFilter === 'All' || n.origin === originFilter;
    const matchesFavourites = !showFavourites || favourites.includes(n.name);
    return matchesSearch && matchesGender && matchesOrigin && matchesFavourites;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF0F5" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Baby Names</Text>
        <TouchableOpacity
          style={styles.favBtn}
          onPress={() => setShowFavourites(!showFavourites)}
        >
          <Text style={styles.favBtnText}>{showFavourites ? '💜' : '🤍'} {favourites.length}</Text>
        </TouchableOpacity>
      </View>

      {/* Name Detail Modal */}
      {selectedName && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalName}>{selectedName.name}</Text>
            <View style={[styles.modalGenderBadge, {
              backgroundColor: selectedName.gender === 'girl' ? '#FFE8F0' :
                selectedName.gender === 'boy' ? '#EAF4FF' : '#F0EAFF'
            }]}>
              <Text style={styles.modalGenderText}>
                {selectedName.gender === 'girl' ? '👧 Girl' :
                  selectedName.gender === 'boy' ? '👦 Boy' : '⭐ Neutral'}
              </Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>🌍 Origin</Text>
              <Text style={styles.modalValue}>{selectedName.origin}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>💡 Meaning</Text>
              <Text style={styles.modalValue}>{selectedName.meaning}</Text>
            </View>
            {selectedName.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularBadgeText}>⭐ Popular Choice</Text>
              </View>
            )}
            <View style={styles.modalBtns}>
              <TouchableOpacity
                style={[styles.modalFavBtn, favourites.includes(selectedName.name) && styles.modalFavBtnActive]}
                onPress={() => toggleFavourite(selectedName.name)}
              >
                <Text style={styles.modalFavBtnText}>
                  {favourites.includes(selectedName.name) ? '💜 Saved' : '🤍 Save'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setSelectedName(null)}
              >
                <Text style={styles.modalCloseBtnText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>

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
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Gender Filter */}
        <View style={styles.genderRow}>
          {[
            { id: 'all', label: '⭐ All', color: '#9B59B6' },
            { id: 'girl', label: '👧 Girls', color: '#C9748F' },
            { id: 'boy', label: '👦 Boys', color: '#3498DB' },
            { id: 'neutral', label: '🌈 Neutral', color: '#27AE60' },
          ].map(g => (
            <TouchableOpacity
              key={g.id}
              style={[styles.genderBtn, genderFilter === g.id && { backgroundColor: g.color, borderColor: g.color }]}
              onPress={() => setGenderFilter(g.id)}
            >
              <Text style={[styles.genderBtnText, genderFilter === g.id && styles.genderBtnTextActive]}>
                {g.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Origin Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.originScroll}>
          {ORIGINS.map(origin => (
            <TouchableOpacity
              key={origin}
              style={[styles.originBtn, originFilter === origin && styles.originBtnActive]}
              onPress={() => setOriginFilter(origin)}
            >
              <Text style={[styles.originBtnText, originFilter === origin && styles.originBtnTextActive]}>
                {origin}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Results Count */}
        <View style={styles.resultsRow}>
          <Text style={styles.resultsCount}>
            {showFavourites ? '💜 Saved Names' : `${filteredNames.length} names found`}
          </Text>
        </View>

        {/* Names Grid */}
        {filteredNames.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>No names found{'\n'}Try a different search!</Text>
          </View>
        ) : (
          <View style={styles.namesGrid}>
            {filteredNames.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.nameCard, {
                  borderTopColor: item.gender === 'girl' ? '#C9748F' :
                    item.gender === 'boy' ? '#3498DB' : '#9B59B6'
                }]}
                onPress={() => setSelectedName(item)}
              >
                <View style={styles.nameCardTop}>
                  <Text style={styles.nameText}>{item.name}</Text>
                  <TouchableOpacity onPress={() => toggleFavourite(item.name)}>
                    <Text style={styles.heartIcon}>
                      {favourites.includes(item.name) ? '💜' : '🤍'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.nameOrigin}>{item.origin}</Text>
                <Text style={styles.nameMeaning} numberOfLines={2}>{item.meaning}</Text>
                {item.popular && (
                  <View style={styles.popularTag}>
                    <Text style={styles.popularTagText}>⭐ Popular</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

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
  favBtn: {
    backgroundColor: '#F9EEF3', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  favBtnText: { fontSize: 14, fontWeight: '700', color: '#C9748F' },
  modalOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100,
    alignItems: 'center', justifyContent: 'center', padding: 20,
  },
  modal: {
    backgroundColor: '#fff', borderRadius: 24,
    padding: 24, width: '100%', alignItems: 'center',
  },
  modalName: { fontSize: 36, fontWeight: '800', color: '#2D1B2E', marginBottom: 12 },
  modalGenderBadge: { borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6, marginBottom: 16 },
  modalGenderText: { fontSize: 14, fontWeight: '700', color: '#2D1B2E' },
  modalRow: {
    width: '100%', flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#FAF0F5',
  },
  modalLabel: { fontSize: 14, color: '#9B8FA0', fontWeight: '600' },
  modalValue: { fontSize: 14, color: '#2D1B2E', fontWeight: '700', flex: 1, textAlign: 'right' },
  popularBadge: {
    backgroundColor: '#FFF3CD', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 6, marginTop: 12,
  },
  popularBadgeText: { fontSize: 13, fontWeight: '700', color: '#856404' },
  modalBtns: { flexDirection: 'row', gap: 10, marginTop: 20, width: '100%' },
  modalFavBtn: {
    flex: 1, borderWidth: 2, borderColor: '#C9748F',
    borderRadius: 50, paddingVertical: 12, alignItems: 'center',
  },
  modalFavBtnActive: { backgroundColor: '#C9748F' },
  modalFavBtnText: { fontSize: 15, fontWeight: '700', color: '#C9748F' },
  modalCloseBtn: {
    flex: 1, backgroundColor: '#FAF0F5',
    borderRadius: 50, paddingVertical: 12, alignItems: 'center',
  },
  modalCloseBtnText: { fontSize: 15, fontWeight: '700', color: '#9B8FA0' },
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
  genderRow: {
    flexDirection: 'row', marginHorizontal: 20,
    marginBottom: 12, gap: 8,
  },
  genderBtn: {
    flex: 1, paddingVertical: 8, borderRadius: 20,
    borderWidth: 1.5, borderColor: '#EDE0E8',
    alignItems: 'center', backgroundColor: '#fff',
  },
  genderBtnText: { fontSize: 11, fontWeight: '700', color: '#9B8FA0' },
  genderBtnTextActive: { color: '#fff' },
  originScroll: { paddingLeft: 20, marginBottom: 14 },
  originBtn: {
    backgroundColor: '#fff', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 8,
    marginRight: 8, borderWidth: 1.5, borderColor: '#EDE0E8',
  },
  originBtnActive: { backgroundColor: '#C9748F', borderColor: '#C9748F' },
  originBtnText: { fontSize: 13, fontWeight: '600', color: '#9B8FA0' },
  originBtnTextActive: { color: '#fff' },
  resultsRow: { paddingHorizontal: 20, marginBottom: 12 },
  resultsCount: { fontSize: 14, fontWeight: '700', color: '#9B8FA0' },
  emptyBox: { alignItems: 'center', paddingVertical: 40 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, color: '#9B8FA0', textAlign: 'center', lineHeight: 24 },
  namesGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 20, gap: 10,
  },
  nameCard: {
    width: '47%', backgroundColor: '#fff',
    borderRadius: 16, padding: 14,
    borderTopWidth: 3,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  nameCardTop: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 4,
  },
  nameText: { fontSize: 18, fontWeight: '800', color: '#2D1B2E' },
  heartIcon: { fontSize: 18 },
  nameOrigin: { fontSize: 11, color: '#9B59B6', fontWeight: '700', marginBottom: 4 },
  nameMeaning: { fontSize: 12, color: '#9B8FA0', lineHeight: 18 },
  popularTag: {
    backgroundColor: '#FFF3CD', borderRadius: 10,
    paddingHorizontal: 8, paddingVertical: 3, marginTop: 6,
    alignSelf: 'flex-start',
  },
  popularTagText: { fontSize: 10, fontWeight: '700', color: '#856404' },
});
