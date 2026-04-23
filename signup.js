import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, SafeAreaView, StatusBar,
  Animated, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import COLORS from './colors';

export default function SignupScreen({ onSuccess, onGoToLogin }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
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

  const handleSignup = async () => {
    setError('');
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter your full name.');
      shake();
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      shake();
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      shake();
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      shake();
      return;
    }
    if (!agreed) {
      setError('Please agree to the Terms and Privacy Policy.');
      shake();
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess(firstName, email);
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
          {/* Header */}
          <View style={styles.headerArea}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoLetter}>B</Text>
            </View>
            <Text style={styles.title}>Create your account</Text>
            <Text style={styles.subtitle}>Join thousands of women on Bellava 💜</Text>
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

            <View style={styles.nameRow}>
              <View style={styles.nameField}>
                <Text style={styles.label}>First name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ada"
                  placeholderTextColor={COLORS.textLight}
                  value={firstName}
                  onChangeText={setFirstName}
                  autoCapitalize="words"
                />
              </View>
              <View style={styles.nameField}>
                <Text style={styles.label}>Last name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Lovelace"
                  placeholderTextColor={COLORS.textLight}
                  value={lastName}
                  onChangeText={setLastName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.inputFull}
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
                placeholder="At least 8 characters"
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

            <Text style={styles.label}>Confirm password</Text>
            <TextInput
              style={styles.inputFull}
              placeholder="Repeat your password"
              placeholderTextColor={COLORS.textLight}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />

            {/* Consent checkbox */}
            <TouchableOpacity
              style={styles.checkRow}
              onPress={() => setAgreed(!agreed)}
            >
              <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
                {agreed && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkLabel}>
                I agree to Bellava's{' '}
                <Text style={styles.checkLink}>Terms of Service</Text>
                {' '}and{' '}
                <Text style={styles.checkLink}>Privacy Policy</Text>.
                I understand Bellava is not a substitute for medical advice.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.signupBtn, loading && styles.signupBtnDisabled]}
              onPress={handleSignup}
              disabled={loading}
            >
              <Text style={styles.signupBtnText}>
                {loading ? 'Creating account...' : 'Create Account 💜'}
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

          {/* Login link */}
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={onGoToLogin}>
              <Text style={styles.loginLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 40 },
  headerArea: { alignItems: 'center', paddingTop: 40, marginBottom: 28 },
  logoCircle: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 14,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3, shadowRadius: 12, elevation: 4,
  },
  logoLetter: { color: '#fff', fontSize: 30, fontWeight: '800' },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.text, marginBottom: 6 },
  subtitle: { fontSize: 15, color: COLORS.textLight },
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
  nameRow: { flexDirection: 'row', gap: 12, marginBottom: 4 },
  nameField: { flex: 1 },
  label: {
    fontSize: 14, fontWeight: '700',
    color: COLORS.text, marginBottom: 8, marginTop: 4,
  },
  input: {
    backgroundColor: COLORS.background, borderRadius: 14,
    paddingHorizontal: 14, paddingVertical: 13,
    fontSize: 15, color: COLORS.text,
    borderWidth: 1.5, borderColor: COLORS.border,
  },
  inputFull: {
    backgroundColor: COLORS.background, borderRadius: 14,
    paddingHorizontal: 16, paddingVertical: 14,
    fontSize: 15, color: COLORS.text,
    borderWidth: 1.5, borderColor: COLORS.border,
    marginBottom: 16,
  },
  passwordRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.background, borderRadius: 14,
    borderWidth: 1.5, borderColor: COLORS.border, marginBottom: 16,
  },
  passwordInput: {
    flex: 1, paddingHorizontal: 16, paddingVertical: 14,
    fontSize: 15, color: COLORS.text,
  },
  eyeBtn: { paddingHorizontal: 14 },
  eyeIcon: { fontSize: 18 },
  checkRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    gap: 12, marginBottom: 20, marginTop: 4,
  },
  checkbox: {
    width: 22, height: 22, borderRadius: 6,
    borderWidth: 2, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
    marginTop: 2, flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkmark: { color: '#fff', fontSize: 13, fontWeight: '700' },
  checkLabel: { fontSize: 13, color: COLORS.textLight, flex: 1, lineHeight: 20 },
  checkLink: { color: COLORS.primary, fontWeight: '600' },
  signupBtn: {
    backgroundColor: COLORS.primary, borderRadius: 50,
    paddingVertical: 16, alignItems: 'center',
    shadowColor: COLORS.primary, shadowOpacity: 0.3,
    shadowRadius: 10, elevation: 3,
  },
  signupBtnDisabled: { opacity: 0.6 },
  signupBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
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
  loginRow: {
    flexDirection: 'row', justifyContent: 'center',
    alignItems: 'center', marginBottom: 16,
  },
  loginText: { fontSize: 15, color: COLORS.textLight },
  loginLink: { fontSize: 15, color: COLORS.primary, fontWeight: '700' },
});
