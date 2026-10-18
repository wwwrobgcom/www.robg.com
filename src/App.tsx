/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TelecomProvider, useTelecom } from './context/TelecomContext';
import { Header } from './components/Header';
import { NoticeBanner } from './components/NoticeBanner';
import { WebPortalView } from './components/WebPortalView';
import { AppSimulator } from './components/AppSimulator';
import { Footer } from './components/Footer';
import { ReceiptModal } from './components/ReceiptModal';
import { DownloadApkModal } from './components/DownloadApkModal';
import { SupportModal } from './components/SupportModal';
import { NoticeModal } from './components/NoticeModal';

const TelecomApp: React.FC = () => {
  const { viewMode } = useTelecom();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Hind_Siliguri',sans-serif]">
      {/* Running Notice Ticker */}
      <NoticeBanner />

      {/* Main Header */}
      <Header />

      {/* Main Content View (Web Portal vs Mobile App Simulator) */}
      <main className="flex-1">
        {viewMode === 'web' ? <WebPortalView /> : <AppSimulator />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
      <ReceiptModal />
      <DownloadApkModal />
      <SupportModal />
      <NoticeModal />
    </div>
  );
};

export default function App() {
  return (
    <TelecomProvider>
      <TelecomApp />
    </TelecomProvider>
  );
}
