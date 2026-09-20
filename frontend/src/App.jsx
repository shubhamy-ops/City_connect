import React from 'react';
import { IssueProvider, useIssues } from './context/IssueContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { NotificationToast } from './components/NotificationToast';
import { AuthModal } from './components/AuthModal';

import { LandingPage } from './pages/LandingPage';
import { ReportPage } from './pages/ReportPage';
import { CitizenDashboard } from './pages/CitizenDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { IssueDetailPage } from './pages/IssueDetailPage';

const MainContent = () => {
  const { activePage } = useIssues();

  return (
    <main className="min-h-[calc(100vh-4rem-12rem)]">
      {activePage === 'landing' && <LandingPage />}
      {activePage === 'report' && <ReportPage />}
      {activePage === 'dashboard' && <CitizenDashboard />}
      {activePage === 'admin' && <AdminDashboard />}
      {activePage === 'detail' && <IssueDetailPage />}
    </main>
  );
};

export default function App() {
  return (
    <IssueProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
        <Navbar />
        <MainContent />
        <Footer />
        <NotificationToast />
        <AuthModal />
      </div>
    </IssueProvider>
  );
}

