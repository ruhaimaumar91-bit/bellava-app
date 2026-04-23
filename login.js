import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, SafeAreaView, StatusBar,
  Animated, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import COLORS from './colors';

export default function LoginScreen({ onSuccess, onGoToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleLogin = async () => {
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      shake();
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      shake();
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const name = email.split('@')[0];
      onSuccess(name, email);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View style={styles.logoArea}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoLetter}>B</Text>
            </View>
            <Text style={styles.appName}>Bellava</Text>
            <Text style={styles.tagline}>Welcome back 💜</Text>
          </View>

          {/* Form */}
          <Animated.View
            style={[styles.form, { transform: [{ translateX: shakeAnim }] }]}
          >
            {error ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
              </View>
            ) : null}

            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor={COLORS.textLight}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Your password"
                placeholderTextColor={COLORS.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotBtn}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginBtn, loading && styles.loginBtnDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginBtnText}>
                {loading ? 'Signing in...' : 'Sign In 💜'}
              </Text>
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialBtnText}>🍎  Continue with Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialBtnText}>🌐  Continue with Google</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Sign up link */}
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={onGoToSignup}>
              <Text style={styles.signupLink}>Sign up free</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.legalText}>
            By signing in you agree to our Terms of Service and Privacy Policy.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 40 },
  logoArea: { alignItems: 'center', paddingTop: 48, marginBottom: 36 },
  logoCircle: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 14,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3, shadowRadius: 12, elevation: 4,
  },
  logoLetter: { color: '#fff', fontSize: 34, fontWeight: '800' },
  appName: { fontSize: 28, fontWeight: '800', color: COLORS.text, marginBottom: 6 },
  tagline: { fontSize: 16, color: COLORS.textLight },
  form: {
    backgroundColor: COLORS.white, borderRadius: 24,
    padding: 24, marginBottom: 20,
    shadowColor: '#000', shadowOpacity: 0.06,
    shadowRadius: 16, elevation: 3,
  },
  errorBox: {
    backgroundColor: '#FFF0F0', borderRadius: 12,
    padding: 12, marginBottom: 16,
    borderWidth: 1, borderColor: '#FFD0D0',
  },
  errorText: { color: COLORS.error, fontSize: 14, fontWeight: '600' },
  label: {
    fontSize: 14, fontWeight: '700',
    color: COLORS.text, marginBottom: 8, marginTop: 4,
  },
  input: {
    backgroundColor: COLORS.background, borderRadius: 14,
    paddingHorizontal: 16, paddingVertical: 14,
    fontSize: 15, color: COLORS.text,
    borderWidth: 1.5, borderColor: COLORS.border,
    marginBottom: 16,
  },
  passwordRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.background, borderRadius: 14,
    borderWidth: 1.5, borderColor: COLORS.border, marginBottom: 8,
  },
  passwordInput: {
    flex: 1, paddingHorizontal: 16, paddingVertical: 14,
    fontSize: 15, color: COLORS.text,
  },
  eyeBtn: { paddingHorizontal: 14 },
  eyeIcon: { fontSize: 18 },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 20, marginTop: 4 },
  forgotText: { fontSize: 13, color: COLORS.primary, fontWeight: '600' },
  loginBtn: {
    backgroundColor: COLORS.primary, borderRadius: 50,
    paddingVertical: 16, alignItems: 'center',
    shadowColor: COLORS.primary, shadowOpacity: 0.3,
    shadowRadius: 10, elevation: 3,
  },
  loginBtnDisabled: { opacity: 0.6 },
  loginBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  dividerRow: {
    flexDirection: 'row', alignItems: 'center',
    marginVertical: 20, gap: 10,
  },
  divider: { flex: 1, height: 1, backgroundColor: COLORS.border },
  dividerText: { fontSize: 13, color: COLORS.textLight },
  socialBtn: {
    borderWidth: 1.5, borderColor: COLORS.border,
    borderRadius: 50, paddingVertical: 14,
    alignItems: 'center', marginBottom: 12,
    backgroundColor: COLORS.white,
  },
  socialBtnText: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  signupRow: {
    flexDirection: 'row', justifyContent: 'center',
    alignItems: 'center', marginBottom: 16,
  },
  signupText: { fontSize: 15, color: COLORS.textLight },
  signupLink: { fontSize: 15, color: COLORS.primary, fontWeight: '700' },
  legalText: {
    fontSize: 11, color: COLORS.textLight,
    textAlign: 'center', lineHeight: 18, paddingHorizontal: 20,
  },
});
