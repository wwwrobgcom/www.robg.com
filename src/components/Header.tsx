import React, { useState } from 'react';
import {
  Smartphone,
  Monitor,
  Eye,
  EyeOff,
  Download,
  Headphones,
  Bell,
  Wallet,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import { useTelecom } from '../context/TelecomContext';

export const Header: React.FC = () => {
  const {
    user,
    viewMode,
    setViewMode,
    setIsDownloadModalOpen,
    setIsSupportModalOpen,
    setIsNoticeModalOpen,
    setActiveTab,
  } = useTelecom();

  const [showBalance, setShowBalance] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top micro bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              অটো সার্ভার সচল (24/7 Auto System Online)
            </span>
            <span className="text-slate-400">|</span>
            <span>অফিসিয়াল ডোমেন: <strong className="text-white">www.om.com</strong></span>
            <span className="text-slate-400">|</span>
            <span>হেল্পলাইন: <span className="text-amber-300">01888-294710</span></span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSupportModalOpen(true)}
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <Headphones className="w-3.5 h-3.5 text-emerald-400" />
              <span>সাপোর্ট সেন্টার</span>
            </button>
            <span className="text-slate-600">•</span>
            <button
              onClick={() => setIsNoticeModalOpen(true)}
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              <span>নোটিশ বোর্ড</span>
            </button>
            <span className="text-slate-600">•</span>
            <span className="text-amber-300 font-semibold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600/30">
              {user.roleBengali}
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 text-left focus:outline-hidden"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-500 flex items-center justify-center text-white font-extrabold shadow-md shadow-emerald-600/20 text-lg tracking-tight">
                OM
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                    OM Telecom
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-emerald-300">
                    BD
                  </span>
                </div>
                <p className="text-xs font-semibold text-emerald-600 tracking-wide font-mono">
                  www.om.com
                </p>
              </div>
            </button>
          </div>

          {/* Interactive Mode Switcher: Web Portal vs Mobile App */}
          <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 hidden sm:flex items-center gap-1 shadow-inner">
            <button
              onClick={() => setViewMode('web')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'web'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5 text-emerald-600" />
              <span>ওয়েব পোর্টাল</span>
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'mobile'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>মোবাইল অ্যাপ মোড</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
            </button>
          </div>

          {/* User Balances & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Interactive Tap-to-Reveal Balance Pill (Standard in Bangladeshi Telecom apps) */}
            <div
              onClick={() => setShowBalance(!showBalance)}
              className="bg-emerald-50 border border-emerald-200 hover:border-emerald-300 cursor-pointer rounded-xl px-3 py-1.5 flex items-center gap-2 transition-all group select-none shadow-xs"
              title="ব্যালেন্স দেখতে ক্লিক করুন"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                <Wallet className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                  <span>মেইন ব্যালেন্স</span>
                  {showBalance ? (
                    <EyeOff className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Eye className="w-3 h-3 text-emerald-600 group-hover:scale-110 transition-transform" />
                  )}
                </div>
                <div className="font-extrabold text-slate-800 text-xs sm:text-sm">
                  {showBalance ? `৳${user.mainBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : 'ট্যাপ করুন'}
                </div>
              </div>
            </div>

            {/* Quick Add Balance Button */}
            <button
              onClick={() => setActiveTab('addbalance')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-xl shadow-sm shadow-emerald-600/30 flex items-center gap-1.5 transition-transform active:scale-95"
            >
              <span className="text-base leading-none font-bold">+</span>
              <span className="hidden xs:inline">ব্যালেন্স</span> যোগ
            </button>

            {/* Download APK Button */}
            <button
              onClick={() => setIsDownloadModalOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-2.5 sm:px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors border border-slate-700"
              title="Download Android App APK"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
              <span className="hidden md:inline">অ্যাপ ডাউনলোড</span>
              <span className="md:hidden">APK</span>
            </button>
          </div>
        </div>

        {/* Mobile View Switcher Row for small screens */}
        <div className="flex sm:hidden items-center justify-between pt-2 border-t border-slate-100 mt-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setViewMode('web')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                viewMode === 'web'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              ওয়েব মোড
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                viewMode === 'mobile'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              📱 অ্যাপ সিমুলেটর
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">ড্রাইভ:</span>
            <span className="font-bold text-slate-800">
              {showBalance ? `৳${user.driveBalance}` : '***'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
