import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, SafeAreaView, StatusBar,
  ScrollView, Alert, ActivityIndicator,
} from 'react-native';
import { createClient } from '@supabase/supabase-js';
import COLORS from './colors';

const supabase = createClient(
  'https://qtvjsvgrojiafyayxrmz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0dmpzdmdyb2ppYWZ5YXl4cm16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MTIyOTMsImV4cCI6MjA5MjI4ODI5M30.x3AeUcM2_Ur-NvezP8s4rluf_HM7SZIi0vWeLjZbjiY'
);

export default function LoginScreen({ onLoginSuccess, onGoToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert('Missing info', 'Please enter your email address. 💜');
      return;
    }
    if (!password) {
      Alert.alert('Missing info', 'Please enter your password. 💜');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          Alert.alert(
            'Incorrect details',
            'Your email or password is incorrect. Please try again. 💜'
          );
        } else if (error.message.includes('Email not confirmed')) {
          Alert.alert(
            'Email not confirmed',
            'Please check your inbox and confirm your email first. 💜'
          );
        } else {
          Alert.alert('Login failed', error.message);
        }
        setLoading(false);
        return;
      }

      if (!data?.user) {
        Alert.alert('Something went wrong', 'Please try again. 💜');
        setLoading(false);
        return;
      }

      // Get profile from database
      const { data: profile } = await supabase
        .from('profiles')
        .select('first_name, last_name, plan, journey')
        .eq('id', data.user.id)
        .single();

      setLoading(false);

      const name = profile
        ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim()
        : data.user.email;

      onLoginSuccess(
        name || 'Beautiful',
        data.user.email,
        profile?.plan || 'FREE',
        profile?.journey || 'wellbeing'
      );

    } catch (error) {
      console.log('Login error:', error);
      Alert.alert(
        'Connection error',
        'Please check your internet connection and try again. 💜'
      );
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert(
        'Enter your email',
        'Please enter your email address first, then tap Forgot Password. 💜'
      );
      return;
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim().toLowerCase()
      );
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert(
          '📧 Email sent!',
          'Check your inbox for a password reset link. 💜'
        );
      }
    } catch (e) {
      Alert.alert('Error', 'Could not send reset email. Please try again.');
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

        <Text style={styles.title}>Welcome back 💜</Text>
        <Text style={styles.subtitle}>Sign in to your Bellava account</Text>

        {/* Form Card */}
        <View style={styles.card}>

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
              placeholder="Your password"
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

          {/* Forgot Password */}
          <TouchableOpacity
            style={styles.forgotBtn}
            onPress={handleForgotPassword}
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginBtn, loading && styles.loginBtnDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.loginBtnText}>Sign In 💜</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          {/* Apple Button */}
          <TouchableOpacity
            style={styles.appleBtn}
            onPress={() => Alert.alert('Coming Soon', 'Apple Sign In coming soon! 💜')}
          >
            <Text style={styles.appleBtnText}>🍎  Continue with Apple</Text>
          </TouchableOpacity>

          {/* Google Button */}
          <TouchableOpacity
            style={styles.googleBtn}
            onPress={() => Alert.alert('Coming Soon', 'Google Sign In coming soon! 💜')}
          >
            <Text style={styles.googleBtnText}>🔵  Continue with Google</Text>
          </TouchableOpacity>

        </View>

        {/* Sign Up Link */}
        <TouchableOpacity
          style={styles.signupLink}
          onPress={onGoToSignup}
        >
          <Text style={styles.signupLinkText}>
            Don't have an account?{' '}
            <Text style={styles.signupLinkBold}>Create one free</Text>
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
  forgotBtn: { alignSelf: 'flex-end', marginTop: 10, marginBottom: 4 },
  forgotText: { fontSize: 13, color: COLORS.primary, fontWeight: '600' },
  loginBtn: {
    backgroundColor: COLORS.primary, borderRadius: 50,
    paddingVertical: 16, alignItems: 'center',
    marginTop: 20, marginBottom: 8,
    shadowColor: COLORS.primary, shadowOpacity: 0.3,
    shadowRadius: 10, elevation: 4,
  },
  loginBtnDisabled: { opacity: 0.7 },
  loginBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
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
  signupLink: { alignItems: 'center', marginTop: 24 },
  signupLinkText: { fontSize: 15, color: COLORS.textLight },
  signupLinkBold: { color: COLORS.primary, fontWeight: '700' },
  company: {
    textAlign: 'center', fontSize: 12,
    color: COLORS.textLight, marginTop: 16, opacity: 0.7,
  },
});
