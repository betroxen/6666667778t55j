
'use client';

import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import MinesGamePage from './pages/MinesGamePage';
import PlinkoGamePage from './pages/PlinkoGamePage';
import AboutUsPage from './pages/AboutUsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ResponsibleGamingPage from './pages/ResponsibleGamingPage';
import AMLPolicyPage from './pages/AMLPolicyPage';
import CommercialDisclosurePage from './pages/CommercialDisclosurePage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import MessagesPage from './pages/MessagesPage';
import RewardsPage from './pages/RewardsPage';
import CasinoDirectoryPage from './pages/CasinoDirectoryPage';
import BonusOffersPage from './pages/BonusOffersPage';
import LiveRTPTrackerPage from './pages/LiveRTPTrackerPage';
import ReviewMethodologyPage from './pages/ReviewMethodologyPage';
import ProvablyFairPage from './pages/ProvablyFairPage';
import SupportPage from './pages/SupportPage';
import CookiesPolicyPage from './pages/CookiesPolicyPage';
import CertifiedPlatformsPage from './pages/CertifiedPlatformsPage';
import AffiliatePage from './pages/AffiliatePage';
import CopyrightNoticePage from './pages/CopyrightNoticePage';
import FAQPage from './pages/FAQPage';
import ProtocolDeepDivePage from './pages/ProtocolDeepDivePage';
import GuidePage from './pages/GuidePage';
import { BonusCalculatorPage } from './pages/BonusCalculatorPage';
import { LoginModal } from './components/LoginModal';
import { RegisterModal } from './components/RegisterModal';
import { ReviewModal } from './components/ReviewModal';
import { Toaster } from './components/Toaster';

// Import Lenis and GSAP
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function App() {
  const appContext = useContext(AppContext);
  const lenisRef = useRef<Lenis | null>(null);
  
  if (!appContext) return null;

  const {
    isCollapsed, isMobileOpen, setIsMobileOpen,
    isLoggedIn, login, logout, openLoginModal, openRegisterModal, openReviewModal, setCurrentPage
  } = appContext;

  // --- LENIS INTEGRATION ---
  useEffect(() => {
      const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          smoothTouch: false, // Disable on touch to prevent scrolling conflicts
          normalizeWheel: true,
      });
      lenisRef.current = lenis;

      // Sync GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);
      
      gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
      });
      
      gsap.ticker.lagSmoothing(0); // Kill lag for instant response

      return () => {
          lenis.destroy();
          gsap.ticker.remove((time) => { lenis.raf(time * 1000) });
      };
  }, []);

  const renderPage = () => {
    switch (appContext.currentPage) {
      case 'Mines Game': return <MinesGamePage />;
      case 'Plinko Game': return <PlinkoGamePage />;
      case 'About Us': return <AboutUsPage />;
      case 'Analytics': return <AnalyticsPage />;
      case 'Terms of Service': return <TermsOfServicePage />;
      case 'Privacy Policy': return <PrivacyPolicyPage />;
      case 'Cookies Policy': return <CookiesPolicyPage />;
      case 'Responsible Gaming': return <ResponsibleGamingPage />;
      case 'AML & CTF Policy': return <AMLPolicyPage />;
      case 'Commercial Disclosure': return <CommercialDisclosurePage />;
      case 'Copyright Notice': return <CopyrightNoticePage />;
      case 'Profile': return <ProfilePage />;
      case 'Settings': return <SettingsPage />;
      case 'Messages': return <MessagesPage />;
      case 'Rewards': return <RewardsPage />;
      case 'Casino Directory': return <CasinoDirectoryPage />;
      case 'Bonus Offers': return <BonusOffersPage />;
      case 'Live RTP Tracker': return <LiveRTPTrackerPage />;
      case 'Bonus Calculator': return <BonusCalculatorPage />;
      case 'Review Methodology': return <ReviewMethodologyPage />;
      case 'Provably Fair': return <ProvablyFairPage />;
      case 'Protocol Deep Dive': return <ProtocolDeepDivePage />;
      case 'Tactical Guides': return <GuidePage />;
      case 'Support': return <SupportPage />;
      case 'FAQ': return <FAQPage />;
      case 'Certified Platforms': return <CertifiedPlatformsPage />;
      case 'Affiliate Program': return <AffiliatePage />;
      case 'Home': return <HomePage onRegisterClick={openRegisterModal} />;
      case 'Dashboard':
      default:
        return <DashboardPage />;
    }
  };

  // Sidebar width variable
  const sidebarWidth = isCollapsed ? '72px' : '256px';

  if (!isLoggedIn) {
    return (
      <div className="bg-[#050505] text-white font-rajdhani min-h-screen flex flex-col overflow-x-hidden">
        <LoginModal />
        <RegisterModal />
        <Toaster />
        <Header
          isLoggedIn={isLoggedIn}
          onLogout={logout}
          onOpenLogin={openLoginModal}
          onOpenRegister={openRegisterModal}
        />
        <main className="flex-grow pt-16">
          <HomePage onRegisterClick={openRegisterModal} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-white font-rajdhani min-h-screen overflow-x-hidden">
      <LoginModal />
      <RegisterModal />
      <ReviewModal />
      <Toaster />
      
      <Header
        isLoggedIn={isLoggedIn}
        onLogout={logout}
        onOpenLogin={openLoginModal}
        onOpenRegister={openRegisterModal}
        onOpenReview={openReviewModal}
        onToggleMobileNav={() => setIsMobileOpen(!isMobileOpen)}
      />
      
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={appContext.setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div
        className="relative flex flex-col min-h-screen transition-all duration-500 ease-out md:pl-[var(--sidebar-width)]"
        style={{ '--sidebar-width': sidebarWidth } as React.CSSProperties}
      >
        <main className="flex-grow pt-20 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1900px] mx-auto">
             {renderPage()}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
