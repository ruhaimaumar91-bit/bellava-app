import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, StatusBar, Alert,
} from 'react-native';

import SplashScreen from './splashscreen';
import OnboardingScreen from './onboarding';
import LoginScreen from './login';
import SignupScreen from './signup';
import HomeScreen from './home';
import BellaScreen from './bella';
import CycleScreen from './cycle';
import CommunityScreen from './community';
import ProfileScreen from './profile';
import AcademyScreen from './academy';
import CarefinderScreen from './carefinder';
import SymptomCheckerScreen from './symptomchecker';
import NutritionScreen from './nutrition';
import BabyNamesScreen from './babynames';
import IntimacyScreen from './intimacy';
import PregnancyScreen from './pregnancy';
import SubscriptionScreen from './subscription';
import NotificationsScreen from './notifications';
import TrackerScreen from './tracker';
import AdminScreen from './admin';
import DisclaimerScreen from './disclaimer';
import JourneyScreen from './journey';

const COLORS = {
  primary: '#C9748F',
  background: '#FAF0F5',
  white: '#FFFFFF',
  text: '#2D1B2E',
  textLight: '#9B8FA0',
  border: '#EDE0E8',
};

const TABS = [
  { id: 'home', label: 'Home', emoji: '🏠' },
  { id: 'cycle', label: 'Tracker', emoji: '📅' },
  { id: 'bella', label: 'AI Chat', emoji: '💬' },
  { id: 'community', label: 'Learn', emoji: '📖' },
  { id: 'profile', label: 'Profile', emoji: '👤' },
];

export default function App() {
  const [appScreen, setAppScreen] = useState('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [subScreen, setSubScreen] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPlan, setUserPlan] = useState('FREE');
  const [userJourney, setUserJourney] = useState('wellbeing');

  const handleLogout = () => {
    setUserName('');
    setUserEmail('');
    setUserPlan('FREE');
    setUserJourney('wellbeing');
    setActiveTab('home');
    setSubScreen(null);
    setAppScreen('login');
  };

  // SPLASH
  if (appScreen === 'splash') {
    return <SplashScreen onFinish={() => setAppScreen('onboarding')} />;
  }

  // ONBOARDING
  if (appScreen === 'onboarding') {
    return (
      <OnboardingScreen
        onFinish={() => setAppScreen('disclaimer')}
      />
    );
  }

  // DISCLAIMER
  if (appScreen === 'disclaimer') {
    return (
      <DisclaimerScreen
        onAccept={() => setAppScreen('journey')}
      />
    );
  }

  // JOURNEY
  if (appScreen === 'journey') {
    return (
      <JourneyScreen
        onSelect={(journey) => {
          setUserJourney(journey);
          setAppScreen('signup');
        }}
      />
    );
  }

  // SIGNUP
  if (appScreen === 'signup') {
    return (
      <SignupScreen
        onSignupSuccess={(name, email, plan) => {
          setUserName(name || '');
          setUserEmail(email || '');
          setUserPlan(plan || 'FREE');
          setAppScreen('main');
        }}
        onGoToLogin={() => setAppScreen('login')}
      />
    );
  }

  // LOGIN
  if (appScreen === 'login') {
    return (
      <LoginScreen
        onLoginSuccess={(name, email, plan) => {
          setUserName(name || '');
          setUserEmail(email || '');
          setUserPlan(plan || 'FREE');
          setAppScreen('main');
        }}
        onGoToSignup={() => setAppScreen('signup')}
      />
    );
  }
  // MAIN APP
  if (appScreen === 'main') {

    // Sub screens
    if (subScreen === 'academy') return <AcademyScreen onBack={() => setSubScreen(null)} />;
    if (subScreen === 'carefinder') return <CarefinderScreen onBack={() => setSubScreen(null)} />;
    if (subScreen === 'symptomchecker') return <SymptomCheckerScreen onBack={() => setSubScreen(null)} />;
    if (subScreen === 'nutrition') return <NutritionScreen onBack={() => setSubScreen(null)} />;
    if (subScreen === 'babynames') return <BabyNamesScreen onBack={() => setSubScreen(null)} />;
    if (subScreen === 'intimacy') return <IntimacyScreen onBack={() => setSubScreen(null)} />;
    if (subScreen === 'pregnancy') return <PregnancyScreen onBack={() => setSubScreen(null)} />;
    if (subScreen === 'subscription') return <SubscriptionScreen onBack={() => setSubScreen(null)} />;
    if (subScreen === 'notifications') return <NotificationsScreen onBack={() => setSubScreen(null)} />;
    if (subScreen === 'tracker') return <TrackerScreen onBack={() => setSubScreen(null)} />;
    if (subScreen === 'admin') return <AdminScreen onBack={() => setSubScreen(null)} />;

    const renderScreen = () => {
      switch (activeTab) {
        case 'home':
          return (
            <HomeScreen
              userName={userName}
              userEmail={userEmail}
              userPlan={userPlan}
              userJourney={userJourney}
              onNavigate={(screen) => {
                if (screen === 'bella') setActiveTab('bella');
                else if (screen === 'cycle') setActiveTab('cycle');
                else if (screen === 'community') setActiveTab('community');
                else if (screen === 'profile') setActiveTab('profile');
                else setSubScreen(screen);
              }}
            />
          );
        case 'cycle':
          return (
            <CycleScreen
              userName={userName}
              userPlan={userPlan}
              onNavigate={(screen) => setSubScreen(screen)}
            />
          );
        case 'bella':
          return (
            <BellaScreen
              userName={userName}
              userPlan={userPlan}
              userJourney={userJourney}
            />
          );
        case 'community':
          return (
            <CommunityScreen
              userName={userName}
              userPlan={userPlan}
              onNavigate={(screen) => setSubScreen(screen)}
            />
          );
        case 'profile':
          return (
            <ProfileScreen
              userName={userName}
              userEmail={userEmail}
              userPlan={userPlan}
              onLogout={handleLogout}
              onNavigate={(screen) => setSubScreen(screen)}
            />
          );
        default:
          return (
            <HomeScreen
              userName={userName}
              userEmail={userEmail}
              userPlan={userPlan}
              onNavigate={(screen) => {
                if (screen === 'bella') setActiveTab('bella');
                else setSubScreen(screen);
              }}
            />
          );
      }
    };

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FAF0F5" />

        {/* Main Screen Content */}
        <View style={styles.content}>
          {renderScreen()}
        </View>

        {/* Bottom Tab Bar */}
        <View style={styles.tabBar}>
          {TABS.map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={styles.tabItem}
              onPress={() => {
                setActiveTab(tab.id);
                setSubScreen(null);
              }}
            >
              <View style={[
                styles.tabIconWrap,
                activeTab === tab.id && styles.tabIconWrapActive
              ]}>
                <Text style={styles.tabEmoji}>{tab.emoji}</Text>
              </View>
              <Text style={[
                styles.tabLabel,
                activeTab === tab.id && styles.tabLabelActive
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    );
  }

  return null;
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF0F5' },
  content: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#EDE0E8',
    paddingBottom: 8,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  tabIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconWrapActive: {
    backgroundColor: '#F9EEF3',
  },
  tabEmoji: { fontSize: 20 },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9B8FA0',
  },
  tabLabelActive: {
    color: '#C9748F',
    fontWeight: '800',
  },
});
