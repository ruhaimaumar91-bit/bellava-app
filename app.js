import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import SplashScreen from './splashscreen';
import OnboardingScreen from './onboarding';
import LoginScreen from './login';
import SignupScreen from './signup';
import DisclaimerScreen from './disclaimer';
import JourneyScreen from './journey';
import HomeScreen from './home';
import BellaScreen from './bella';
import CycleScreen from './cycle';
import CommunityScreen from './community';
import ProfileScreen from './profile';
import AdminScreen from './admin';
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
import DailyCheckInScreen from './dailycheckinscreen';

const COLORS = {
  primary: '#C9748F',
  background: '#FAF0F5',
  white: '#FFFFFF',
  text: '#2D1B2E',
  textLight: '#9B8FA0',
  border: '#EDE0E8',
  primaryLight: '#F9EEF3',
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

  const handleLoginSuccess = (name, email, plan, journey) => {
    setUserName(name || 'Beautiful');
    setUserEmail(email || '');
    setUserPlan(plan || 'FREE');
    setUserJourney(journey || 'wellbeing');
    setAppScreen('main');
  };

  const handleSignupSuccess = (name, email) => {
    setUserName(name || 'Beautiful');
    setUserEmail(email || '');
    setUserPlan('FREE');
    setUserJourney('wellbeing');
    setAppScreen('disclaimer');
  };

  const handleLogout = () => {
    setUserName('');
    setUserEmail('');
    setUserPlan('FREE');
    setUserJourney('wellbeing');
    setActiveTab('home');
    setSubScreen(null);
    setAppScreen('login');
  };

  const handleNavigate = (screen) => {
    if (screen === 'admin') {
      setSubScreen('admin');
    } else if (screen === 'profile') {
      setActiveTab('profile');
      setSubScreen(null);
    } else if (screen === 'home') {
      setActiveTab('home');
      setSubScreen(null);
    } else if (screen === 'cycle') {
      setActiveTab('cycle');
      setSubScreen(null);
    } else if (screen === 'bella') {
      setActiveTab('bella');
      setSubScreen(null);
    } else if (screen === 'community') {
      setActiveTab('community');
      setSubScreen(null);
    } else {
      setSubScreen(screen);
    }
  };

  // ── SPLASH ──
  if (appScreen === 'splash') {
    return (
      <SplashScreen onFinish={() => setAppScreen('onboarding')} />
    );
  }

  // ── ONBOARDING ──
  if (appScreen === 'onboarding') {
    return (
      <OnboardingScreen onFinish={() => setAppScreen('login')} />
    );
  }

  // ── LOGIN ──
  if (appScreen === 'login') {
    return (
      <LoginScreen
        onLoginSuccess={(name, email, plan, journey) => {
          handleLoginSuccess(name, email, plan, journey);
        }}
        onGoToSignup={() => setAppScreen('signup')}
      />
    );
  }

  // ── SIGNUP ──
  if (appScreen === 'signup') {
    return (
      <SignupScreen
        onSignupSuccess={(name, email) => {
          handleSignupSuccess(name, email);
        }}
        onGoToLogin={() => setAppScreen('login')}
      />
    );
  }

  // ── DISCLAIMER ──
  if (appScreen === 'disclaimer') {
    return (
      <DisclaimerScreen
        onAccept={() => setAppScreen('journey')}
      />
    );
  }

  // ── JOURNEY ──
  if (appScreen === 'journey') {
    return (
      <JourneyScreen
        onSelect={(journey) => {
          setUserJourney(journey);
          setAppScreen('main');
        }}
      />
    );
  }

  // ── MAIN APP ──
  if (appScreen === 'main') {

    // Sub screens
    if (subScreen === 'admin') {
      return (
        <AdminScreen onBack={() => setSubScreen(null)} />
      );
    }

    if (subScreen === 'checkin') {
      return (
        <DailyCheckInScreen
          onBack={() => setSubScreen(null)}
          userName={userName}
        />
      );
    }

    if (subScreen === 'tracker') {
      return (
        <TrackerScreen
          onBack={() => setSubScreen(null)}
          userJourney={userJourney}
        />
      );
    }

    if (subScreen === 'academy') {
      return (
        <AcademyScreen onBack={() => setSubScreen(null)} />
      );
    }

    if (subScreen === 'carefinder') {
      return (
        <CarefinderScreen onBack={() => setSubScreen(null)} />
      );
    }

    if (subScreen === 'symptomchecker') {
      return (
        <SymptomCheckerScreen onBack={() => setSubScreen(null)} />
      );
    }

    if (subScreen === 'nutrition') {
      return (
        <NutritionScreen
          onBack={() => setSubScreen(null)}
          userJourney={userJourney}
        />
      );
    }

    if (subScreen === 'babynames') {
      return (
        <BabyNamesScreen onBack={() => setSubScreen(null)} />
      );
    }

    if (subScreen === 'intimacy') {
      return (
        <IntimacyScreen onBack={() => setSubScreen(null)} />
      );
    }

    if (subScreen === 'pregnancy') {
      return (
        <PregnancyScreen onBack={() => setSubScreen(null)} />
      );
    }

    if (subScreen === 'subscription') {
      return (
        <SubscriptionScreen
          onBack={() => setSubScreen(null)}
          userPlan={userPlan}
          onUpgrade={(plan) => {
            setUserPlan(plan);
            setSubScreen(null);
          }}
        />
      );
    }

    if (subScreen === 'notifications') {
      return (
        <NotificationsScreen onBack={() => setSubScreen(null)} />
      );
    }

    // Main tabs
    const renderTab = () => {
      if (activeTab === 'home') {
        return (
          <HomeScreen
            userName={userName}
            userPlan={userPlan}
            userJourney={userJourney}
            onNavigate={handleNavigate}
          />
        );
      }
      if (activeTab === 'cycle') {
        return (
          <CycleScreen
            onBack={() => setActiveTab('home')}
            userPlan={userPlan}
            userJourney={userJourney}
          />
        );
      }
      if (activeTab === 'bella') {
        return (
          <BellaScreen
            onBack={() => setActiveTab('home')}
            userName={userName}
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
            onNavigate={handleNavigate}
          />
        );
      }
    };

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {renderTab()}
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          {TABS.map(tab => (
            <View
              key={tab.id}
              style={styles.tabItem}
            >
              <View
                style={[
                  styles.tabIconWrap,
                  activeTab === tab.id && styles.tabIconWrapActive,
                ]}
              >
                <Text
                  style={styles.tabEmoji}
                  onPress={() => {
                    setSubScreen(null);
                    setActiveTab(tab.id);
                  }}
                >
                  {tab.emoji}
                </Text>
              </View>
              <Text style={[
                styles.tabLabel,
                activeTab === tab.id && styles.tabLabelActive,
              ]}>
                {tab.label}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1 },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  tabIconWrap: {
    width: 48, height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconWrapActive: {
    backgroundColor: COLORS.primaryLight,
  },
  tabEmoji: { fontSize: 22 },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  tabLabelActive: {
    color: COLORS.primary,
    fontWeight: '800',
  },
});
