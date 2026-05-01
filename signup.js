import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, SafeAreaView, StatusBar,
  ScrollView, Alert, ActivityIndicator,
} from 'react-native';
import COLORS from './colors';

const SUPABASE_URL = 'https://qtvjsvgrojiafyayxrmz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0dmpzdmdyb2ppYWZ5YXl4cm16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MTIyOTMsImV4cCI6MjA5MjI4ODI5M30.x3AeUcM2_Ur-NvezP8s4rluf_HM7SZIi0vWeLjZbjiY';

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
    if (!firstName.trim()) { Alert.alert('Missing info', 'Please enter your first name. 💜'); return; }
    if (!email.trim()) { Alert.alert('Missing info', 'Please enter your email. 💜'); return; }
    if (!password) { Alert.alert('Missing info', 'Please enter a password. 💜'); return; }
    if (password.length < 6) { Alert.alert('Too short', 'Password must be at least 6 characters. 💜'); return; }
    if (password !== confirmPassword) { Alert.alert('No match', 'Passwords do not match. 💜'); return; }
    if (!agreed) { Alert.alert('Please agree', 'Please agree to the Terms of Service. 💜'); return; }
    setLoading(true);
    try {
      const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password,
          data: { first_name: firstName.trim(), last_name: lastName.trim() }
        }),
      });
      const data = await response.json();
      if (data.error || data.msg) {
        Alert.alert('Sign up failed', data.error || data.msg);
        setLoading(false);
        return;
      }
      Alert.alert('Welcome to Bellava! 💜', 'Check your email to confirm your account, then log in.', [
        { text: 'Go to Login', onPress: () => onGoToLogin() }
      ]);
    } catch (err) {
      Alert.alert('Connection error', 'Please check your internet and try again.');
    }
    setLoading(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF0F5" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>B</Text>
        </View>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>Join thousands of women on Bellava 💜</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.label}>First name</Text>
              <TextInput
                style={styles.input}
                placeholder="Reine"
                placeholderTextColor={COLORS.textLight}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={styles.halfField}>
              <Text style={styles.label}>Last name</Text>
              <TextInput
                style={styles.input}
                placeholder="Mande"
                placeholderTextColor={COLORS.textLight}
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@email.com"
            placeholderTextColor={COLORS.textLight}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Min 6 characters"
              placeholderTextColor={COLORS.textLight}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.showBtn}>{showPassword ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirm password</Text>
          <TextInput
            style={styles.input}
            placeholder="Repeat password"
            placeholderTextColor={COLORS.textLight}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
          />

          <TouchableOpacity style={styles.checkRow} onPress={() => setAgreed(!agreed)}>
            <View style={[styles.checkbox, agreed && styles.checkboxOn]}>
              {agreed && <Text style={styles.tick}>✓</Text>}
            </View>
            <Text style={styles.checkText}>
              I agree to Bellava's{' '}
              <Text style={styles.link}>Terms of Service</Text> and{' '}
              <Text style={styles.link}>Privacy Policy</Text>.{' '}
              I understand Bellava is not a substitute for medical advice.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, loading && styles.btnDisabled]}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.btnText}>Create Account 💜</Text>
            }
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity style={styles.appleBtn}>
            <Text style={styles.appleBtnText}>🍎  Continue with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.googleBtn}>
            <Text style={styles.googleBtnText}>🔵  Continue with Google</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onGoToLogin} style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account? <Text style={styles.loginLink}>Log in</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF0F5' },
  scroll: { alignItems: 'center', paddingHorizontal: 20, paddingBottom: 40 },
  logoCircle: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: COLORS.primary, alignItems: 'center',
    justifyContent: 'center', marginTop: 32, marginBottom: 12,
  },
  logoText: { color: '#fff', fontSize: 32, fontWeight: '800' },
  title: { fontSize: 26, fontWeight: '800', color: '#2D1B2E', marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: 15, color: '#9B8FA0', marginBottom: 24, textAlign: 'center' },
  card: {
    width: '100%', backgroundColor: '#fff', borderRadius: 24,
    padding: 24, shadowColor: '#C9748F', shadowOpacity: 0.08,
    shadowRadius: 16, elevation: 4,
  },
  row: { flexDirection: 'row', gap: 12 },
  halfField: { flex: 1 },
  label: { fontSize: 13, fontWeight: '600', color: '#2D1B2E', marginBottom: 6, marginTop: 14 },
  input: {
    backgroundColor: '#FAF0F5', borderRadius: 12, paddingHorizontal: 14,
    paddingVertical: 12, fontSize: 15, color: '#2D1B2E',
    borderWidth: 1, borderColor: '#EDE0E8',
  },
  passwordRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FAF0F5', borderRadius: 12,
    borderWidth: 1, borderColor: '#EDE0E8', paddingHorizontal: 14,
  },
  passwordInput: { flex: 1, paddingVertical: 12, fontSize: 15, color: '#2D1B2E' },
  showBtn: { color: '#C9748F', fontWeight: '700', fontSize: 13 },
  checkRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 18, gap: 10 },
  checkbox: {
    width: 22, height: 22, borderRadius: 6, borderWidth: 2,
    borderColor: '#C9748F', alignItems: 'center', justifyContent: 'center', marginTop: 2,
  },
  checkboxOn: { backgroundColor: '#C9748F' },
  tick: { color: '#fff', fontSize: 13, fontWeight: '800' },
  checkText: { flex: 1, fontSize: 13, color: '#9B8FA0', lineHeight: 20 },
  link: { color: '#C9748F', fontWeight: '700' },
  btn: {
    backgroundColor: '#C9748F', borderRadius: 50,
    paddingVertical: 16, alignItems: 'center', marginTop: 22,
  },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 18, gap: 10 },
  divider: { flex: 1, height: 1, backgroundColor: '#EDE0E8' },
  dividerText: { color: '#9B8FA0', fontSize: 13 },
  appleBtn: {
    borderWidth: 1.5, borderColor: '#2D1B2E', borderRadius: 50,
    paddingVertical: 14, alignItems: 'center', marginBottom: 10,
  },
  appleBtnText: { fontSize: 15, fontWeight: '700', color: '#2D1B2E' },
  googleBtn: {
    borderWidth: 1.5, borderColor: '#EDE0E8', borderRadius: 50,
    paddingVertical: 14, alignItems: 'center',
  },
  googleBtnText: { fontSize: 15, fontWeight: '700', color: '#2D1B2E' },
  loginRow: { marginTop: 24 },
  loginText: { fontSize: 14, color: '#9B8FA0' },
  loginLink: { color: '#C9748F', fontWeight: '700' },
});
