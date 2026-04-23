import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import SplashScreen from './splashscreen';
import OnboardingScreen from './onboarding';
import LoginScreen from './login';
import SignupScreen from './signup';
import DisclaimerScreen from './disclaimer';
import HomeScreen from './home';
import BellaScreen from './bella';
import CycleScreen from './cycle';
import TrackerScreen from './tracker';
import CommunityScreen from './community';
import AcademyScreen from './academy';
import CareFinderScreen from './carefinder';
import SymptomCheckerScreen from './symptomchecker';
import NutritionScreen from './nutrition';
import BabyNamesScreen from './babynames';
import IntimacyScreen from './intimacy';
import SubscriptionScreen from './subscription';
import ProfileScreen from './profile';
import NotificationsScreen from './notifications';
import AdminScreen from './admin';

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPlan, setUserPlan] = useState('FREE');

  const goTo = (screenName) => setScreen(screenName);

  const handleLoginSuccess = (name, email) => {
    setUserName(name || 'Beautiful');
    setUserEmail(email || '');
    setScreen('home');
  };

  const handleSignupSuccess = (name, email) => {
    setUserName(name || 'Beautiful');
    setUserEmail(email || '');
    setScreen('disclaimer');
  };

  const handleLogout = () => {
    setUserName('');
    setUserEmail('');
    setUserPlan('FREE');
    setScreen('login');
  };

  const handleUpgrade = (plan) => {
    setUserPlan(plan);
    setScreen('home');
  };

  if (screen === 'splash') {
    return <SplashScreen onFinish={() => goTo('onboarding')} />;
  }

  if (screen === 'onboarding') {
    return <OnboardingScreen onFinish={() => goTo('login')} />;
  }

  if (screen === 'login') {
    return (
      <LoginScreen
        onSuccess={handleLoginSuccess}
        onGoToSignup={() => goTo('signup')}
      />
    );
  }

  if (screen === 'signup') {
    return (
      <SignupScreen
        onSuccess={handleSignupSuccess}
        onGoToLogin={() => goTo('login')}
      />
    );
  }

  if (screen === 'disclaimer') {
    return <DisclaimerScreen onAccept={() => goTo('home')} />;
  }

  if (screen === 'home') {
    return (
      <HomeScreen
        userName={userName}
        userPlan={userPlan}
        onNavigate={goTo}
      />
    );
  }

  if (screen === 'bella') {
    return <BellaScreen onBack={() => goTo('home')} userPlan={userPlan} />;
  }

  if (screen === 'cycle') {
    return <CycleScreen onBack={() => goTo('home')} userPlan={userPlan} />;
  }

  if (screen === 'tracker') {
    return <TrackerScreen onBack={() => goTo('home')} userPlan={userPlan} />;
  }

  if (screen === 'community') {
    return (
      <CommunityScreen
        onBack={() => goTo('home')}
        userName={userName}
        userPlan={userPlan}
      />
    );
  }

  if (screen === 'academy') {
    return <AcademyScreen onBack={() => goTo('home')} userPlan={userPlan} />;
  }

  if (screen === 'carefinder') {
    return <CareFinderScreen onBack={() => goTo('home')} userPlan={userPlan} />;
  }

  if (screen === 'symptomchecker') {
    return <SymptomCheckerScreen onBack={() => goTo('home')} />;
  }

  if (screen === 'nutrition') {
    return <NutritionScreen onBack={() => goTo('home')} />;
  }

  if (screen === 'babynames') {
    return <BabyNamesScreen onBack={() => goTo('home')} />;
  }

  if (screen === 'intimacy') {
    return <IntimacyScreen onBack={() => goTo('home')} />;
  }

  if (screen === 'subscription') {
    return (
      <SubscriptionScreen
        onBack={() => goTo('home')}
        onUpgrade={handleUpgrade}
        currentPlan={userPlan}
      />
    );
  }

  if (screen === 'profile') {
    return (
      <ProfileScreen
        onBack={() => goTo('home')}
        userName={userName}
        userEmail={userEmail}
        userPlan={userPlan}
        onLogout={handleLogout}
        onNavigate={goTo}
      />
    );
  }

  if (screen === 'notifications') {
    return <NotificationsScreen onBack={() => goTo('home')} />;
  }

  if (screen === 'admin') {
    return (
      <AdminScreen
        onBack={() => goTo('home')}
        currentUserEmail={userEmail}
      />
    );
  }

  return <View style={styles.fallback} />;
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    backgroundColor: '#FAF0F5',
  },
});
