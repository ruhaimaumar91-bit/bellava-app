import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
} from 'react-native';

import SplashScreen from './splashscreen';
import OnboardingScreen from './onboarding';
import LoginScreen from './login';
import SignupScreen from './signup';
import DisclaimerScreen from './disclaimer';
import JourneyScreen from './journey';
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
import PregnancyScreen from './pregnancy';

const TABS = [
  { id: 'home', label: 'Home', emoji: '🏠' },
  { id: 'cycle', label: 'Cycle', emoji: '🌸' },
  { id: 'bella', label: 'Bella', emoji: '🤖' },
  { id: 'community', label: 'Connect', emoji: '👥' },
  { id: 'profile', label: 'Profile', emoji: '👤' },
];

const COLORS = {
  primary: '#C9748F',
  background: '#FAF0F5',
  white: '#FFFFFF',
  text: '#2D1B2E',
  textLight: '#9B8FA0',
  border: '#EDE0E8',
};

export default function App() {
  const [appScreen, setAppScreen] = useState('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [subScreen, setSubScreen] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPlan, setUserPlan] = useState('FREE');
  const [userJourney, setUserJourney] = useState(null);

  const handleLoginSuccess = (name, email) => {
    setUserName(name || 'Beautiful');
    setUserEmail(email || '');
    setAppScreen('main');
  };

  const handleSignupSuccess = (name, email) => {
    setUserName(name || 'Beautiful');
    setUserEmail(email || '');
    setAppScreen('disclaimer');
  };

  const handleLogout = () => {
    setUserName('');
    setUserEmail('');
    setUserPlan('FREE');
    setUserJourney(null);
    setSubScreen(null);
    setActiveTab('home');
    setAppScreen('login');
  };

  const handleUpgrade = (plan) => {
    setUserPlan(plan);
    setSubScreen(null);
  };

  const navigateTo = (screen) => {
    const tabIds = ['home', 'cycle', 'bella', 'community', 'profile'];
    if (tabIds.includes(screen)) {
      setActiveTab(screen);
      setSubScreen(null);
    } else {
      setSubScreen(screen);
    }
  };

  // ── SPLASH ──────────────────────────────────────────────

  if (appScreen === 'splash') {
    return <SplashScreen onFinish={() => setAppScreen('onboarding')} />;
  }

  // ── ONBOARDING ──────────────────────────────────────────

  if (appScreen === 'onboarding') {
    return <OnboardingScreen onFinish={() => setAppScreen('login')} />;
  }

  // ── LOGIN ───────────────────────────────────────────────

  if (appScreen === 'login') {
    return (
      <LoginScreen
        onSuccess={handleLoginSuccess}
        onGoToSignup={() => setAppScreen('signup')}
      />
    );
  }

  // ── SIGNUP ──────────────────────────────────────────────

  if (appScreen === 'signup') {
    return (
      <SignupScreen
        onSuccess={handleSignupSuccess}
        onGoToLogin={() => setAppScreen('login')}
      />
    );
  }

  // ── DISCLAIMER ──────────────────────────────────────────

  if (appScreen === 'disclaimer') {
    return (
      <DisclaimerScreen
        onAccept={() => setAppScreen('journey')}
      />
    );
  }

  // ── JOURNEY SELECTOR ────────────────────────────────────

  if (appScreen === 'journey') {
    return (
      <JourneyScreen
        userName={userName}
        onSelect={(journey) => {
          setUserJourney(journey);
          setAppScreen('main');
        }}
      />
    );
  }

  // ── SUB SCREENS ─────────────────────────────────────────

  if (appScreen === 'main' && subScreen) { 
    if (subScreen === 'pregnancy') {
  return (
    <PregnancyScreen
      onBack={() => setSubScreen(null)}
    />
  );
}

    if (subScreen === 'tracker') {
      return (
        <TrackerScreen
          onBack={() => setSubScreen(null)}
          userPlan={userPlan}
        />
      );
    }
    if (subScreen === 'academy') {
      return (
        <AcademyScreen
          onBack={() => setSubScreen(null)}
          userPlan={userPlan}
        />
      );
    }
    if (subScreen === 'carefinder') {
      return (
        <CareFinderScreen
          onBack={() => setSubScreen(null)}
          userPlan={userPlan}
        />
      );
    }
    if (subScreen === 'symptomchecker') {
      return (
        <SymptomCheckerScreen
          onBack={() => setSubScreen(null)}
        />
      );
    }
    if (subScreen === 'nutrition') {
      return (
        <NutritionScreen
          onBack={() => setSubScreen(null)}
        />
      );
    }
    if (subScreen === 'babynames') {
      return (
        <BabyNamesScreen
          onBack={() => setSubScreen(null)}
        />
      );
    }
    if (subScreen === 'intimacy') {
      return (
        <IntimacyScreen
          onBack={() => setSubScreen(null)}
        />
      );
    }
    if (subScreen === 'subscription') {
      return (
        <SubscriptionScreen
          onBack={() => setSubScreen(null)}
          onUpgrade={handleUpgrade}
          currentPlan={userPlan}
        />
      );
    }
    if (subScreen === 'notifications') {
      return (
        <NotificationsScreen
          onBack={() => setSubScreen(null)}
        />
      );
    }
    if (subScreen === 'admin') {
      return (
        <AdminScreen
          onBack={() => setSubScreen(null)}
          currentUserEmail={userEmail}
        />
      );
    }
  }

  // ── MAIN APP WITH BOTTOM NAV ─────────────────────────────

  if (appScreen === 'main') {
    const renderTab = () => {
      if (activeTab === 'home') {
        return (
          <HomeScreen
            userName={userName}
            userPlan={userPlan}
            userJourney={userJourney}
            onNavigate={navigateTo}
          />
        );
      }
      if (activeTab === 'cycle') {
        return (
          <CycleScreen
            onBack={() => setActiveTab('home')}
            userPlan={userPlan}
          />
        );
      }
      if (activeTab === 'bella') {
        return (
          <BellaScreen
            onBack={() => setActiveTab('home')}
            userPlan={userPlan}
            userJourney={userJourney}
          />
        );
      }
      if (activeTab === 'community') {
        return (
          <CommunityScreen
            onBack={() => setActiveTab('home')}
            userName={userName}
            userPlan={userPlan}
          />
        );
      }
      if (activeTab === 'profile') {
        return (
          <ProfileScreen
            onBack={() => setActiveTab('home')}
            userName={userName}
            userEmail={userEmail}
            userPlan={userPlan}
            userJourney={userJourney}
            onLogout={handleLogout}
            onNavigate={navigateTo}
          />
        );
      }
      return null;
    };

    return (
      <View style={styles.container}>
        {/* Screen Content */}
        <View style={styles.screenArea}>
          {renderTab()}
        </View>

        {/* Bottom Navigation Bar */}
        <SafeAreaView style={styles.bottomNav}>
          <View style={styles.bottomNavInner}>
            {TABS.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <TouchableOpacity
                  key={tab.id}
                  style={styles.tabBtn}
                  onPress={() => {
                    setActiveTab(tab.id);
                    setSubScreen(null);
                  }}
                >
                  <View style={[
                    styles.tabIconWrap,
                    isActive && styles.tabIconWrapActive,
                  ]}>
                    <Text style={styles.tabEmoji}>{tab.emoji}</Text>
                  </View>
                  <Text style={[
                    styles.tabLabel,
                    isActive && styles.tabLabelActive,
                  ]}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return <View style={styles.fallback} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screenArea: {
    flex: 1,
  },
  bottomNav: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 10,
  },
  bottomNavInner: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 12,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabIconWrap: {
    width: 44,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconWrapActive: {
    backgroundColor: '#F2D7DF',
  },
  tabEmoji: {
    fontSize: 22,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  tabLabelActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  fallback: {
    flex: 1,
    backgroundColor: '#FAF0F5',
  },
});
