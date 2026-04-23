import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar, Modal,
} from 'react-native';
import COLORS from './colors';

const PHASES = [
  {
    id: 'menstrual',
    emoji: '🌙',
    label: 'Menstrual',
    days: 'Days 1–5',
    color: '#E74C3C',
    bg: '#FFF0F0',
    description: 'Your body is shedding the uterine lining. Focus on replenishing iron and reducing inflammation.',
    foods: [
      { emoji: '🥩', name: 'Red meat / lentils', reason: 'Replenishes iron lost during bleeding' },
      { emoji: '🫐', name: 'Blueberries', reason: 'Antioxidants to reduce inflammation' },
      { emoji: '🍫', name: 'Dark chocolate', reason: 'Magnesium helps ease cramps' },
      { emoji: '🐟', name: 'Salmon', reason: 'Omega-3s reduce period pain' },
      { emoji: '🌿', name: 'Spinach', reason: 'Iron and folate to combat fatigue' },
      { emoji: '🍌', name: 'Banana', reason: 'Potassium eases bloating and cramps' },
      { emoji: '🫚', name: 'Ginger tea', reason: 'Natural anti-inflammatory for cramps' },
    ],
    avoid: ['Salty snacks (increase bloating)', 'Alcohol (worsens cramps)', 'Caffeine (can worsen cramps)', 'Processed foods'],
    tip: 'Drink plenty of warm water and herbal teas. Rest when you need to — your body is working hard.',
  },
  {
    id: 'follicular',
    emoji: '🌱',
    label: 'Follicular',
    days: 'Days 6–13',
    color: '#27AE60',
    bg: '#F0FFF4',
    description: 'Oestrogen is rising and your energy is returning. This is a great time to eat lighter, energising foods.',
    foods: [
      { emoji: '🥚', name: 'Eggs', reason: 'Protein and choline support hormone production' },
      { emoji: '🥦', name: 'Broccoli', reason: 'Supports oestrogen metabolism' },
      { emoji: '🌾', name: 'Oats', reason: 'Slow-release energy to fuel your day' },
      { emoji: '🥑', name: 'Avocado', reason: 'Healthy fats support hormone balance' },
      { emoji: '🍓', name: 'Strawberries', reason: 'Vitamin C boosts iron absorption' },
      { emoji: '🫘', name: 'Chickpeas', reason: 'Plant protein and fibre for energy' },
      { emoji: '🥕', name: 'Carrots', reason: 'Fibre helps flush excess oestrogen' },
    ],
    avoid: ['Refined sugar (energy crashes)', 'Processed carbs', 'Excessive dairy'],
    tip: 'Your digestion is stronger now. Try new recipes and experiment with colourful vegetables.',
  },
  {
    id: 'ovulation',
    emoji: '✨',
    label: 'Ovulation',
    days: 'Days 14–16',
    color: '#F39C12',
    bg: '#FFFDE6',
    description: 'You are at peak energy. Your body needs antioxidants and zinc to support a healthy egg release.',
    foods: [
      { emoji: '🎃', name: 'Pumpkin seeds', reason: 'Zinc supports healthy ovulation' },
      { emoji: '🍅', name: 'Tomatoes', reason: 'Lycopene supports egg quality' },
      { emoji: '🥬', name: 'Kale', reason: 'Folate supports fertility' },
      { emoji: '🍋', name: 'Citrus fruits', reason: 'Vitamin C and antioxidants' },
      { emoji: '🫒', name: 'Olive oil', reason: 'Anti-inflammatory healthy fats' },
      { emoji: '🌰', name: 'Walnuts', reason: 'Omega-3s improve egg quality' },
      { emoji: '🫘', name: 'Beans', reason: 'Zinc and iron to support ovulation' },
    ],
    avoid: ['Alcohol (affects egg quality)', 'Trans fats', 'Excessive sugar'],
    tip: 'You have the most energy now. Make the most of it — cook nourishing meals and stay active.',
  },
  {
    id: 'luteal',
    emoji: '🌕',
    label: 'Luteal',
    days: 'Days 17–28',
    color: '#8E44AD',
    bg: '#F5EEFF',
    description: 'Progesterone rises and you may notice PMS symptoms. Focus on magnesium, B vitamins and complex carbs.',
    foods: [
      { emoji: '🍠', name: 'Sweet potato', reason: 'Complex carbs stabilise blood sugar and mood' },
      { emoji: '🥜', name: 'Almonds', reason: 'Magnesium reduces PMS symptoms' },
      { emoji: '🍵', name: 'Chamomile tea', reason: 'Calms anxiety and aids sleep' },
      { emoji: '🐔', name: 'Turkey / chicken', reason: 'Tryptophan boosts serotonin' },
      { emoji: '🌻', name: 'Sunflower seeds', reason: 'Vitamin B6 reduces mood swings' },
      { emoji: '🍚', name: 'Brown rice', reason: 'Slow carbs reduce cravings' },
      { emoji: '🥛', name: 'Dairy or fortified milk', reason: 'Calcium eases PMS symptoms' },
    ],
    avoid: ['Caffeine (worsens anxiety)', 'Salt (increases bloating)', 'Alcohol', 'Refined sugar'],
    tip: 'Cravings are normal in this phase. Satisfy them with wholefood alternatives — dark chocolate over milk chocolate, sweet potato over crisps.',
  },
];

const MEAL_PLANS = {
  menstrual: [
    { meal: 'Breakfast', emoji: '☀️', suggestion: 'Warm oat porridge with banana and dark chocolate chips' },
    { meal: 'Lunch', emoji: '🌤️', suggestion: 'Lentil soup with spinach and wholegrain bread' },
    { meal: 'Dinner', emoji: '🌙', suggestion: 'Grilled salmon with steamed broccoli and brown rice' },
    { meal: 'Snack', emoji: '🍃', suggestion: 'Ginger tea with a small piece of dark chocolate' },
  ],
  follicular: [
    { meal: 'Breakfast', emoji: '☀️', suggestion: 'Scrambled eggs with avocado toast and strawberries' },
    { meal: 'Lunch', emoji: '🌤️', suggestion: 'Chickpea salad with cucumber, tomato and lemon dressing' },
    { meal: 'Dinner', emoji: '🌙', suggestion: 'Stir-fried vegetables with tofu and oat noodles' },
    { meal: 'Snack', emoji: '🍃', suggestion: 'Carrot sticks with hummus' },
  ],
  ovulation: [
    { meal: 'Breakfast', emoji: '☀️', suggestion: 'Greek yogurt with kiwi, walnuts and a drizzle of honey' },
    { meal: 'Lunch', emoji: '🌤️', suggestion: 'Kale and tomato salad with pumpkin seeds and olive oil' },
    { meal: 'Dinner', emoji: '🌙', suggestion: 'Prawn and avocado stir-fry with brown rice' },
    { meal: 'Snack', emoji: '🍃', suggestion: 'Orange slices with a handful of mixed nuts' },
  ],
  luteal: [
    { meal: 'Breakfast', emoji: '☀️', suggestion: 'Baked sweet potato with almond butter and cinnamon' },
    { meal: 'Lunch', emoji: '🌤️', suggestion: 'Chicken and brown rice bowl with steamed broccoli' },
    { meal: 'Dinner', emoji: '🌙', suggestion: 'Turkey stew with root vegetables and wholegrain bread' },
    { meal: 'Snack', emoji: '🍃', suggestion: 'Chamomile tea with sunflower seeds and dark chocolate' },
  ],
};

export default function NutritionScreen({ onBack }) {
  const [activePhase, setActivePhase] = useState('menstrual');
  const [activeTab, setActiveTab] = useState('foods');
  const [selectedFood, setSelectedFood] = useState(null);

  const phase = PHASES.find(p => p.id === activePhase);
  const meals = MEAL_PLANS[activePhase];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Nutrition Planner</Text>
          <Text style={styles.headerSub}>Eat for your cycle 🌿</Text>
        </View>
      </View>

      {/* Phase Selector */}
      <ScrollView
        horizontal showsHorizontalScrollIndicator={false}
        style={styles.phaseScroll}
        contentContainerStyle={styles.phaseScrollContent}
      >
        {PHASES.map(p => (
          <TouchableOpacity
            key={p.id}
            style={[styles.phaseTab, activePhase === p.id && { backgroundColor: p.color }]}
            onPress={() => setActivePhase(p.id)}
          >
            <Text style={styles.phaseEmoji}>{p.emoji}</Text>
            <Text style={[styles.phaseLabel, activePhase === p.id && { color: '#fff' }]}>
              {p.label}
            </Text>
            <Text style={[styles.phaseDays, activePhase === p.id && { color: 'rgba(255,255,255,0.8)' }]}>
              {p.days}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Phase Banner */}
      <View style={[styles.phaseBanner, { backgroundColor: phase.bg, borderLeftColor: phase.color }]}>
        <Text style={[styles.phaseBannerTitle, { color: phase.color }]}>
          {phase.emoji} {phase.label} Phase
        </Text>
        <Text style={styles.phaseBannerText}>{phase.description}</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {['foods', 'meals', 'avoid'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && { backgroundColor: phase.color }]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabLabel, activeTab === tab && { color: '#fff' }]}>
              {tab === 'foods' ? '✅ Eat These' : tab === 'meals' ? '🍽️ Meal Ideas' : '❌ Avoid'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'foods' && (
          <>
            {phase.foods.map((food, i) => (
              <TouchableOpacity
                key={i}
                style={styles.foodCard}
                onPress={() => setSelectedFood(food)}
              >
                <Text style={styles.foodEmoji}>{food.emoji}</Text>
                <View style={styles.foodInfo}>
                  <Text style={styles.foodName}>{food.name}</Text>
                  <Text style={styles.foodReason}>{food.reason}</Text>
                </View>
                <Text style={styles.foodArrow}>›</Text>
              </TouchableOpacity>
            ))}
            <View style={[styles.tipCard, { backgroundColor: phase.bg, borderLeftColor: phase.color }]}>
              <Text style={styles.tipTitle}>💡 Bella's Tip</Text>
              <Text style={styles.tipText}>{phase.tip}</Text>
            </View>
          </>
        )}

        {activeTab === 'meals' && (
          <>
            <Text style={styles.mealsIntro}>
              Sample meal plan for your {phase.label.toLowerCase()} phase:
            </Text>
            {meals.map((meal, i) => (
              <View key={i} style={styles.mealCard}>
                <View style={[styles.mealBadge, { backgroundColor: phase.color }]}>
                  <Text style={styles.mealEmoji}>{meal.emoji}</Text>
                </View>
                <View style={styles.mealInfo}>
                  <Text style={[styles.mealLabel, { color: phase.color }]}>{meal.meal}</Text>
                  <Text style={styles.mealSuggestion}>{meal.suggestion}</Text>
                </View>
              </View>
            ))}
          </>
        )}

        {activeTab === 'avoid' && (
          <>
            <Text style={styles.avoidIntro}>
              Try to limit these during your {phase.label.toLowerCase()} phase:
            </Text>
            {phase.avoid.map((item, i) => (
              <View key={i} style={styles.avoidCard}>
                <Text style={styles.avoidIcon}>⚠️</Text>
                <Text style={styles.avoidText}>{item}</Text>
              </View>
            ))}
            <View style={styles.disclaimerCard}>
              <Text style={styles.disclaimerText}>
                This is general nutritional guidance. Individual needs vary. If you have dietary restrictions or medical conditions, speak to a registered dietitian.
              </Text>
            </View>
          </>
        )}
        <View style={{ height: 60 }} />
      </ScrollView>

      {/* Food Detail Modal */}
      <Modal visible={!!selectedFood} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            {selectedFood && (
              <>
                <Text style={styles.modalEmoji}>{selectedFood.emoji}</Text>
                <Text style={styles.modalFoodName}>{selectedFood.name}</Text>
                <Text style={styles.modalFoodReason}>{selectedFood.reason}</Text>
                <View style={[styles.modalPhaseBadge, { backgroundColor: phase.bg }]}>
                  <Text style={[styles.modalPhaseText, { color: phase.color }]}>
                    Best for: {phase.label} Phase {phase.emoji}
                  </Text>
                </View>
              </>
            )}
            <TouchableOpacity
              style={[styles.closeBtn, { borderColor: phase.color }]}
              onPress={() => setSelectedFood(null)}
            >
              <Text style={[styles.closeBtnText, { color: phase.color }]}>Close</Text>
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
  phaseScroll: { maxHeight: 90, backgroundColor: COLORS.white },
  phaseScrollContent: { paddingHorizontal: 16, paddingVertical: 12, gap: 10 },
  phaseTab: {
    alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10,
    borderRadius: 16, backgroundColor: COLORS.background, minWidth: 90,
  },
  phaseEmoji: { fontSize: 20 },
  phaseLabel: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginTop: 2 },
  phaseDays: { fontSize: 11, color: COLORS.textLight },
  phaseBanner: {
    marginHorizontal: 16, marginTop: 12, borderRadius: 16,
    padding: 16, borderLeftWidth: 4,
  },
  phaseBannerTitle: { fontSize: 16, fontWeight: '800', marginBottom: 6 },
  phaseBannerText: { fontSize: 13, color: COLORS.text, lineHeight: 20 },
  tabs: {
    flexDirection: 'row', marginHorizontal: 16, marginTop: 12,
    backgroundColor: COLORS.background, borderRadius: 16, padding: 4, gap: 4,
  },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: 'center' },
  tabLabel: { fontSize: 13, fontWeight: '700', color: COLORS.textLight },
  content: { flex: 1, paddingHorizontal: 16, marginTop: 12 },
  foodCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.white, borderRadius: 16,
    padding: 14, marginBottom: 10, gap: 12,
    borderWidth: 1, borderColor: COLORS.border,
  },
  foodEmoji: { fontSize: 28 },
  foodInfo: { flex: 1 },
  foodName: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  foodReason: { fontSize: 13, color: COLORS.textLight, marginTop: 2 },
  foodArrow: { fontSize: 22, color: COLORS.textLight },
  tipCard: { borderRadius: 16, padding: 16, marginTop: 8, borderLeftWidth: 4 },
  tipTitle: { fontSize: 15, fontWeight: '800', color: COLORS.text, marginBottom: 6 },
  tipText: { fontSize: 14, color: COLORS.text, lineHeight: 21 },
  mealsIntro: { fontSize: 14, color: COLORS.textLight, marginBottom: 14 },
  mealCard: {
    flexDirection: 'row', backgroundColor: COLORS.white,
    borderRadius: 16, padding: 14, marginBottom: 10,
    gap: 14, alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.border,
  },
  mealBadge: {
    width: 48, height: 48, borderRadius: 24,
    alignItems: 'center', justifyContent: 'center',
  },
  mealEmoji: { fontSize: 22 },
  mealInfo: { flex: 1 },
  mealLabel: { fontSize: 13, fontWeight: '700', marginBottom: 4 },
  mealSuggestion: { fontSize: 14, color: COLORS.text, lineHeight: 20 },
  avoidIntro: { fontSize: 14, color: COLORS.textLight, marginBottom: 14 },
  avoidCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.white, borderRadius: 16,
    padding: 14, marginBottom: 10, gap: 12,
    borderWidth: 1, borderColor: '#FFE0E0',
  },
  avoidIcon: { fontSize: 22 },
  avoidText: { fontSize: 14, color: COLORS.text, flex: 1 },
  disclaimerCard: { backgroundColor: '#FFF8E6', borderRadius: 12, padding: 14, marginTop: 8 },
  disclaimerText: { fontSize: 12, color: COLORS.textLight, lineHeight: 18 },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: COLORS.white, borderTopLeftRadius: 28,
    borderTopRightRadius: 28, padding: 28, alignItems: 'center',
  },
  modalHandle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: COLORS.border, marginBottom: 24,
  },
  modalEmoji: { fontSize: 52, marginBottom: 12 },
  modalFoodName: { fontSize: 22, fontWeight: '800', color: COLORS.text, marginBottom: 10 },
  modalFoodReason: {
    fontSize: 15, color: COLORS.textLight,
    textAlign: 'center', lineHeight: 22, marginBottom: 16,
  },
  modalPhaseBadge: { borderRadius: 50, paddingHorizontal: 20, paddingVertical: 10, marginBottom: 24 },
  modalPhaseText: { fontSize: 14, fontWeight: '700' },
  closeBtn: {
    borderWidth: 2, borderRadius: 50, paddingVertical: 14,
    paddingHorizontal: 48, alignItems: 'center',
  },
  closeBtnText: { fontWeight: '700', fontSize: 16 },
});
