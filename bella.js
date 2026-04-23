import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator,
} from 'react-native';
import COLORS from './colors';

const BELLA_API_KEY = 'sk-ant-api03-k0zoDpjSMzMKCXzFNOOWVtFcFRFiCje4mr8JbN2Oc3uhLbeUGKiUA3ZETC1nP6iaoHNdpneY5SILRgZIbNhc-Q-7Vq9KgAA';

const getSystemPrompt = (journey) => {
  const base = `You are Bella, a warm, knowledgeable and compassionate AI health companion for women, built into the Bellava app by Reine Mande Ltd.

You are NOT a doctor and must NEVER diagnose conditions or prescribe medication.

ALWAYS:
- Recommend seeing a real doctor or healthcare professional for any serious, urgent or persistent symptoms
- Be warm, encouraging and non-judgmental
- Keep responses clear and easy to understand
- Add a disclaimer when discussing medical topics

IF anyone mentions self-harm, suicide or a mental health crisis:
- Respond with compassion
- Immediately provide: UK Samaritans: 116 123 | Crisis Text Line: Text SHOUT to 85258
- Encourage them to seek immediate help`;

  if (journey === 'conceive') {
    return base + `

This user is TRYING TO CONCEIVE. Focus your support on:
- Ovulation tracking and fertile window advice
- TTC tips, nutrition and lifestyle for fertility
- Emotional support for the TTC journey
- When to seek fertility specialist advice
- Positive, hopeful and encouraging tone always`;
  }
  if (journey === 'pregnant') {
    return base + `

This user is PREGNANT. Focus your support on:
- Pregnancy symptoms and what is normal
- Week by week pregnancy information
- Nutrition and lifestyle during pregnancy
- When to contact their midwife or GP
- Emotional support through each trimester
- Always remind them their midwife is their best resource`;
  }
  if (journey === 'surrogacy') {
    return base + `

This user is ON A SURROGACY JOURNEY. Focus your support on:
- Emotional support for surrogates and intended parents
- General health and wellbeing during surrogacy
- Signposting to surrogacy organisations and legal resources
- Compassionate, non-judgmental support always`;
  }
  return base + `

This user is focused on GENERAL WOMEN'S HEALTH AND WELLBEING. Focus on:
- Menstrual cycle questions and education
- Hormone health and balance
- Nutrition and lifestyle for women's health
- Mental wellbeing and self care
- General health questions`;
};

const getWelcomeMessage = (journey) => {
  if (journey === 'conceive') {
    return "Hi! I'm Bella 💜 I'm here to support you on your TTC journey. Whether you have questions about ovulation, fertile windows, nutrition for fertility or just need someone to talk to — I'm here. How can I help you today?\n\n⚕️ Remember: I'm not a doctor. Always consult a healthcare professional for medical concerns.";
  }
  if (journey === 'pregnant') {
    return "Hi! I'm Bella 💜 Congratulations on your pregnancy! I'm here to support you through every week of this incredible journey. Ask me anything about symptoms, nutrition, what to expect, or how you are feeling. How can I help you today?\n\n⚕️ Remember: I'm not a doctor. Always consult your midwife or GP for medical concerns.";
  }
  if (journey === 'surrogacy') {
    return "Hi! I'm Bella 💜 I'm here to support you on your surrogacy journey. Whether you are a surrogate or an intended parent, I'm here to listen, inform and encourage you every step of the way. How can I help you today?\n\n⚕️ Remember: I'm not a doctor. Always consult a healthcare professional for medical concerns.";
  }
  return "Hi! I'm Bella 💜 Your AI health companion. I'm here to support you with women's health questions, cycle advice, and general wellbeing. How can I help you today?\n\n⚕️ Remember: I'm not a doctor. Always consult a healthcare professional for medical concerns.";
};

const FREE_MESSAGE_LIMIT = 5;

export default function BellaScreen({ onBack, userPlan, userJourney }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: getWelcomeMessage(userJourney),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const scrollRef = useRef(null);

  const SYSTEM_PROMPT = getSystemPrompt(userJourney);
  const isFreeUser = !userPlan || userPlan === 'FREE';
  const limitReached = isFreeUser && messageCount >= FREE_MESSAGE_LIMIT;

  const sendMessage = async () => {
    if (!input.trim() || loading || limitReached) return;
    const userMessage = { role: 'user', content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);
    setMessageCount(prev => prev + 1);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': BELLA_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: updatedMessages.map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      if (data.content && data.content[0]) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.content[0].text,
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "I'm sorry, I couldn't process that. Please try again. If you need urgent help, please contact your GP or call 111. 💜",
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please check your internet and try again. For urgent health concerns, contact your GP or call NHS 111. 💜",
      }]);
    } finally {
      setLoading(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  const getJourneyColor = () => {
    if (userJourney === 'conceive') return '#27AE60';
    if (userJourney === 'pregnant') return '#9B59B6';
    if (userJourney === 'surrogacy') return '#E91E8C';
    return COLORS.primary;
  };

  const getJourneyLabel = () => {
    if (userJourney === 'conceive') return '🌱 TTC Support Mode';
    if (userJourney === 'pregnant') return '🤰 Pregnancy Support Mode';
    if (userJourney === 'surrogacy') return '👶 Surrogacy Support Mode';
    return '💜 Wellbeing Support Mode';
  };

  const journeyColor = getJourneyColor();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={journeyColor} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: journeyColor }]}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.bellaAvatar}>
          <Text style={styles.bellaAvatarText}>B</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>Bella</Text>
          <Text style={styles.headerSub}>{getJourneyLabel()}</Text>
        </View>
        {isFreeUser && (
          <View style={styles.limitBadge}>
            <Text style={styles.limitText}>{FREE_MESSAGE_LIMIT - messageCount} left</Text>
          </View>
        )}
      </View>

      {/* Disclaimer */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          ⚕️ Bella is not a doctor. Always consult a healthcare professional for medical advice.
        </Text>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={styles.messages}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.bubble,
              msg.role === 'user' ? styles.userBubble : styles.bellaBubble,
            ]}
          >
            {msg.role === 'assistant' && (
              <View style={[styles.bellaIcon, { backgroundColor: journeyColor }]}>
                <Text style={styles.bellaIconText}>B</Text>
              </View>
            )}
            <View style={[
              styles.bubbleContent,
              msg.role === 'user'
                ? [styles.userBubbleContent, { backgroundColor: journeyColor }]
                : styles.bellaBubbleContent,
            ]}>
              <Text style={[
                styles.bubbleText,
                msg.role === 'user' ? styles.userText : styles.bellaText,
              ]}>
                {msg.content}
              </Text>
            </View>
          </View>
        ))}

        {loading && (
          <View style={styles.bubble}>
            <View style={[styles.bellaIcon, { backgroundColor: journeyColor }]}>
              <Text style={styles.bellaIconText}>B</Text>
            </View>
            <View style={styles.bellaBubbleContent}>
              <ActivityIndicator size="small" color={journeyColor} />
              <Text style={styles.typingText}>Bella is thinking...</Text>
            </View>
          </View>
        )}

        {limitReached && (
          <View style={styles.limitCard}>
            <Text style={styles.limitCardTitle}>💜 Daily Limit Reached</Text>
            <Text style={styles.limitCardText}>
              Free users can send {FREE_MESSAGE_LIMIT} messages per day. Upgrade to PLUS or PRO for unlimited Bella access.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Input */}
      {!limitReached ? (
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Ask Bella anything..."
            placeholderTextColor={COLORS.textLight}
            value={input}
            onChangeText={setInput}
            multiline
            maxLength={500}
            editable={!loading}
          />
          <TouchableOpacity
            style={[
              styles.sendBtn,
              { backgroundColor: journeyColor },
              (!input.trim() || loading) && styles.sendBtnDisabled,
            ]}
            onPress={sendMessage}
            disabled={!input.trim() || loading}
          >
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[styles.upgradeBar, { backgroundColor: journeyColor }]}>
          <Text style={styles.upgradeText}>Upgrade for unlimited Bella access 💜</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14, gap: 10,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  backArrow: { fontSize: 20, color: '#fff' },
  bellaAvatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
  },
  bellaAvatarText: { fontSize: 20, color: COLORS.primary, fontWeight: '800' },
  headerInfo: { flex: 1 },
  headerName: { fontSize: 17, fontWeight: '800', color: '#fff' },
  headerSub: { fontSize: 11, color: 'rgba(255,255,255,0.85)' },
  limitBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 50, paddingHorizontal: 10, paddingVertical: 5,
  },
  limitText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  disclaimer: {
    backgroundColor: '#FFF8E6', paddingHorizontal: 16, paddingVertical: 8,
    borderBottomWidth: 1, borderBottomColor: '#FFE0A0',
  },
  disclaimerText: { fontSize: 11, color: '#9A6800', textAlign: 'center' },
  messages: { flex: 1 },
  messagesContent: { padding: 16, gap: 12 },
  bubble: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginBottom: 4 },
  userBubble: { flexDirection: 'row-reverse' },
  bellaBubble: { flexDirection: 'row' },
  bellaIcon: {
    width: 32, height: 32, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  bellaIconText: { color: '#fff', fontWeight: '800', fontSize: 14 },
  bubbleContent: { maxWidth: '78%', borderRadius: 20, padding: 14 },
  userBubbleContent: { borderBottomRightRadius: 4 },
  bellaBubbleContent: {
    backgroundColor: COLORS.white, borderBottomLeftRadius: 4,
    borderWidth: 1, borderColor: COLORS.border,
    flexDirection: 'row', alignItems: 'center', gap: 8,
  },
  bubbleText: { fontSize: 15, lineHeight: 22 },
  userText: { color: '#fff' },
  bellaText: { color: COLORS.text },
  typingText: { fontSize: 13, color: COLORS.textLight, fontStyle: 'italic' },
  limitCard: {
    backgroundColor: '#F5EEFF', borderRadius: 16, padding: 20,
    alignItems: 'center', margin: 8,
    borderWidth: 1, borderColor: COLORS.primary,
  },
  limitCardTitle: { fontSize: 16, fontWeight: '800', color: COLORS.primary, marginBottom: 8 },
  limitCardText: { fontSize: 14, color: COLORS.text, textAlign: 'center', lineHeight: 21 },
  inputRow: {
    flexDirection: 'row', alignItems: 'flex-end',
    padding: 12, backgroundColor: COLORS.white,
    borderTopWidth: 1, borderTopColor: COLORS.border, gap: 10,
  },
  input: {
    flex: 1, backgroundColor: COLORS.background, borderRadius: 24,
    paddingHorizontal: 16, paddingVertical: 12,
    fontSize: 15, color: COLORS.text, maxHeight: 120,
    borderWidth: 1, borderColor: COLORS.border,
  },
  sendBtn: {
    width: 46, height: 46, borderRadius: 23,
    alignItems: 'center', justifyContent: 'center',
  },
  sendBtnDisabled: { opacity: 0.4 },
  sendIcon: { color: '#fff', fontSize: 18 },
  upgradeBar: { padding: 16, alignItems: 'center' },
  upgradeText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
