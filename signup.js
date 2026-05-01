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
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
          }
        }),
      });

      const data = await response.json();

      if (data.error) {
        if (data.error.includes('already registered') || data.msg?.includes('already registered')) {
          Alert.alert('Account exists', 'This email is already registered. Please log in. 💜');
        } else {
          Alert.alert('Sign up failed', data.error || data.msg || 'Please try again.');
        }
        setLoading(false);
        return;
      }

      if (data.id || data.user?.id) {
        Alert.alert('Welcome to Bellava! 💜', 'Please check your email to confirm your account, then log in.', [
          { text: 'Go to Login', onPress: () => onGoToLogin() }
        ]);
      } else {
        Alert.alert('Almost there! 💜', 'Please check your email to confirm your account.', [
          { text: 'Go to Login', onPress: () => onGoToLogin() }
        ]);
      }
    } catch (err) {
      Alert.alert('Connection error', 'Could not connect. Please check your internet and try again.');
    }
    setLoading(false);
  };
