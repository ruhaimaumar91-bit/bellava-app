import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, SafeAreaView, StatusBar,
  ScrollView, Alert, ActivityIndicator,
} from 'react-native';
import { createClient } from '@supabase/supabase-js';
import COLORS from './colors';

const supabase = createClient(
  'https://omqjsdpacpfzmjvovfew.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tcWpzZHBhY3Bmem1qdm92ZmV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMjYyMjMsImV4cCI6MjA1OTgwMjIyM30.qxMMGpHoaT1bOGOaVFOHog0mesQ7HtLpNQgCPVNKuGA'
);

export default function SignupScreen({ onSignupSuccess, onGoToLogin }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    // Validation
    if (!firstName.trim()) {
      Alert.alert('Missing info', 'Please enter your first name. 💜');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Missing info', 'Please enter your email address. 💜');
      return;
    }
    if (!password) {
      Alert.alert('Missing info', 'Please enter a password. 💜');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Password too short', 'Your password must be at least 6 characters. 💜');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Please make sure both passwords match. 💜');
      return;
    }
    if (!agreed) {
      Alert.alert('Please agree', 'Please agree to the Terms of Service and Privacy Policy to continue. 💜');
      return;
    }

    setLoading(true);

    try {
      // Step 1 — Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (authError) {
        if (authError.message.includes('already registered')) {
          Alert.alert(
            'Account exists',
            'An account with this email already exists. Please log in instead. 💜'
          );
        } else {
          Alert.alert('Sign up failed', authError.message);
        }
        setLoading(false);
        return;
      }

      if (!authData?.user) {
        Alert.alert('Something went wrong', 'Please try again. 💜');
        setLoading(false);
        return;
      }

      // Step 2 — Save profile using upsert (safer than insert)
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: authData.user.id,
          email: email.trim().toLowerCase(),
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          plan: 'FREE',
          journey: 'wellbeing',
        });

      if (profileError) {
        console.log('Profile error:', profileError.message);
        // Still let user in even if profile save fails
        // They can update profile later
      }

      // Step 3 — Success!
      setLoading(false);
      onSignupSuccess(
        firstName.trim() + (lastName.trim() ? ' ' + lastName.trim() : ''),
        email.trim().toLowerCase()
      );

    } catch (error) {
      console.log('Signup error:', error);
      Alert.alert('Something went wrong', 'Please check your connection and try again. 💜');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={styles.logoWrap}>
          <View style={styles.logo}>
            <Text style={styles.logoLetter}>B</Text>
          </View>
        </View>

        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>Join thousands of women on Bellava 💜</Text>

        {/* Form Card */}
        <View style={styles.card}>

          {/* Name Row */}
          <View style={styles.nameRow}>
            <View style={styles.nameField}>
              <Text style={styles.label}>First name</Text>
              <TextInput
                style={styles.input}
                placeholder="Your first name"
                placeholderTextColor={COLORS.textLight}
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>
            <View style={styles.nameField}>
              <Text style={styles.label}>Last name</Text>
              <TextInput
                style={styles.input}
                placeholder="Last name"
                placeholderTextColor={COLORS.textLight}
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Email */}
          <Text style={styles.label}>Email address</Text>
          <TextInput
            style={styles.input}
            placeholder="your@email.com"
            placeholderTextColor={COLORS.textLight}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordWrap}>
            <TextInput
              style={styles.passwordInput}
              placeholder="At least 6 characters"
              placeholderTextColor={COLORS.textLight}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeBtn}
            >
              <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <Text style={styles.label}>Confirm password</Text>
          <TextInput
            style={styles.input}
            placeholder="Repeat your password"
            placeholderTextColor={COLORS.textLight}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Terms Checkbox */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAgreed(!agreed)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxText}>
              I agree to Bellava's{' '}
              <Text style={styles.link}>Terms of Service</Text>
              {' '}and{' '}
              <Text style={styles.link}>Privacy Policy</Text>
              . I understand Bellava is not a substitute for medical advice.
            </Text>
          </TouchableOpacity>

          {/* Create Account Button */}
          <TouchableOpacity
            style={[styles.createBtn, loading && styles.createBtnDisabled]}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.createBtnText}>Create Account 💜</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          {/* Apple Button */}
          <TouchableOpacity style={styles.appleBtn}>
            <Text style={styles.appleBtnText}>🍎  Continue with Apple</Text>
          </TouchableOpacity>

          {/* Google Button */}
          <TouchableOpacity style={styles.googleBtn}>
            <Text style={styles.googleBtnText}>🔵  Continue with Google</Text>
          </TouchableOpacity>

        </View>

        {/* Login Link */}
        <TouchableOpacity
          style={styles.loginLink}
          onPress={onGoToLogin}
        >
          <Text style={styles.loginLinkText}>
            Already have an account?{' '}
            <Text style={styles.loginLinkBold}>Sign in</Text>
          </Text>
        </TouchableOpacity>

        {/* Company */}
        <Text style={styles.company}>by Reine Mande Ltd · London 🇬🇧</Text>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  scrollContent: { padding: 24, paddingTop: 40 },
  logoWrap: { alignItems: 'center', marginBottom: 20 },
  logo: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.primary, shadowOpacity: 0.3,
    shadowRadius: 12, elevation: 6,
  },
  logoLetter: { color: '#fff', fontSize: 32, fontWeight: '800' },
  title: {
    fontSize: 28, fontWeight: '800',
    color: COLORS.text, textAlign: 'center', marginBottom: 8,
  },
  subtitle: {
    fontSize: 15, color: COLORS.textLight,
    textAlign: 'center', marginBottom: 28,
  },
  card: {
    backgroundColor: COLORS.white, borderRadius: 24,
    padding: 24,
    shadowColor: '#000', shadowOpacity: 0.06,
    shadowRadius: 16, elevation: 4,
  },
  nameRow: { flexDirection: 'row', gap: 12, marginBottom: 4 },
  nameField: { flex: 1 },
  label: {
    fontSize: 14, fontWeight: '700',
    color: COLORS.text, marginBottom: 8, marginTop: 12,
  },
  input: {
    backgroundColor: COLORS.background, borderRadius: 14,
    paddingHorizontal: 16, paddingVertical: 14,
    fontSize: 15, color: COLORS.text,
    borderWidth: 1.5, borderColor: COLORS.border,
  },
  passwordWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.background, borderRadius: 14,
    borderWidth: 1.5, borderColor: COLORS.border,
    paddingRight: 12,
  },
  passwordInput: {
    flex: 1, paddingHorizontal: 16, paddingVertical: 14,
    fontSize: 15, color: COLORS.text,
  },
  eyeBtn: { padding: 4 },
  eyeIcon: { fontSize: 18 },
  checkboxRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    gap: 12, marginTop: 20, marginBottom: 8,
  },
  checkbox: {
    width: 24, height: 24, borderRadius: 6,
    borderWidth: 2, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
    marginTop: 1, flexShrink: 0,
    backgroundColor: COLORS.background,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkmark: { color: '#fff', fontSize: 14, fontWeight: '800' },
  checkboxText: {
    flex: 1, fontSize: 13,
    color: COLORS.textLight, lineHeight: 20,
  },
  link: { color: COLORS.primary, fontWeight: '700' },
  createBtn: {
    backgroundColor: COLORS.primary, borderRadius: 50,
    paddingVertical: 16, alignItems: 'center',
    marginTop: 20, marginBottom: 8,
    shadowColor: COLORS.primary, shadowOpacity: 0.3,
    shadowRadius: 10, elevation: 4,
  },
  createBtnDisabled: { opacity: 0.7 },
  createBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  dividerRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 12, marginVertical: 16,
  },
  divider: { flex: 1, height: 1, backgroundColor: COLORS.border },
  dividerText: { fontSize: 13, color: COLORS.textLight },
  appleBtn: {
    borderWidth: 1.5, borderColor: COLORS.border,
    borderRadius: 50, paddingVertical: 14,
    alignItems: 'center', marginBottom: 10,
    backgroundColor: COLORS.white,
  },
  appleBtnText: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  googleBtn: {
    borderWidth: 1.5, borderColor: COLORS.border,
    borderRadius: 50, paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  googleBtnText: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  loginLink: { alignItems: 'center', marginTop: 24 },
  loginLinkText: { fontSize: 15, color: COLORS.textLight },
  loginLinkBold: { color: COLORS.primary, fontWeight: '700' },
  company: {
    textAlign: 'center', fontSize: 12,
    color: COLORS.textLight, marginTop: 16, opacity: 0.7,
  },
});
