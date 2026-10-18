import React, { useState } from 'react';
import {
  Smartphone,
  Wifi,
  BatteryCharging,
  Signal,
  Eye,
  EyeOff,
  Bell,
  User,
  Zap,
  Flame,
  FileText,
  CreditCard,
  ArrowRightLeft,
  Users,
  History,
  Headphones,
  Home,
  Layers,
  ChevronRight,
  ShieldCheck,
  Gift,
  Download,
  Info,
} from 'lucide-react';
import { useTelecom } from '../context/TelecomContext';
import { OPERATORS, COMMISSION_RATES } from '../data/telecomData';
import { RechargeForm } from './RechargeForm';
import { DrivePacksView } from './DrivePacksView';
import { BillPayView } from './BillPayView';
import { AddBalanceView } from './AddBalanceView';
import { HistoryView } from './HistoryView';
import { ResellerView } from './ResellerView';
import { TransferView } from './TransferView';

export const AppSimulator: React.FC = () => {
  const {
    user,
    setActiveTab,
    setIsDownloadModalOpen,
    setIsSupportModalOpen,
    setIsNoticeModalOpen,
  } = useTelecom();

  const [simActiveTab, setSimActiveTab] = useState<'home' | 'recharge' | 'drive' | 'history' | 'profile'>('home');
  const [subView, setSubView] = useState<'none' | 'billpay' | 'addbalance' | 'transfer' | 'resellers'>('none');
  const [showBalance, setShowBalance] = useState(false);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  const banners = [
    {
      title: 'রবি ও এয়ারটেল মেগা ড্রাইভ',
      sub: 'সর্বোচ্চ ৳৩২০ পর্যন্ত ক্যাশব্যাক কমিশন!',
      bg: 'from-rose-600 to-red-700',
    },
    {
      title: 'বিকাশ ও নগদে অটো ব্যালেন্স',
      sub: 'প্রতি ১০০০ টাকায় বোনাস ৳৩২ ডিলার কমিশন!',
      bg: 'from-emerald-600 to-teal-700',
    },
    {
      title: 'পল্লী বিদ্যুৎ ও ডেসকো বিল পে',
      sub: 'জিরো কনভিনিয়েন্স ফি - ইনস্ট্যান্ট ডিজিটাল রশিদ',
      bg: 'from-blue-600 to-indigo-700',
    },
  ];

  return (
    <div className="py-6 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-140px)]">
      {/* Top Controller helper */}
      <div className="mb-4 text-center max-w-md">
        <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-300 mb-1">
          <Smartphone className="w-3.5 h-3.5" />
          <span>www.om.com অফিসিয়াল অ্যান্ড্রয়েড অ্যাপ প্রিভিউ</span>
        </div>
        <p className="text-xs text-slate-500">
          ফোনে ব্যবহার করতে নিচে &quot;APK ডাউনলোড&quot; বাটনে ক্লিক করুন অথবা সরাসরি এই সিমুলেটরে সব ফিচার টেস্ট করুন
        </p>
      </div>

      {/* Android Device Shell Frame */}
      <div className="relative w-full max-w-[390px] h-[780px] bg-slate-900 rounded-[48px] p-3.5 shadow-2xl ring-1 ring-slate-800 border-4 border-slate-700 flex flex-col overflow-hidden">
        {/* Hardware details: Speaker slit & Front Camera punchhole */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-950 rounded-full z-50 flex items-center justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-800"></div>
          <div className="w-12 h-1.5 rounded-full bg-slate-900"></div>
        </div>

        {/* Screen Bezel Content */}
        <div className="w-full h-full bg-slate-50 rounded-[38px] overflow-hidden flex flex-col relative">
          {/* Status Bar */}
          <div className="h-9 bg-slate-900 text-white text-[11px] px-6 pt-1 flex items-center justify-between select-none font-mono">
            <span>2:45 PM</span>
            <div className="flex items-center gap-2">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <BatteryCharging className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          {/* App Header */}
          <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              {/* App Brand */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white text-emerald-700 flex items-center justify-center font-extrabold text-sm shadow-xs">
                  OM
                </div>
                <div>
                  <h3 className="font-extrabold text-sm leading-tight tracking-tight">
                    OM Telecom
                  </h3>
                  <span className="text-[10px] text-emerald-200 font-mono">www.om.com</span>
                </div>
              </div>

              {/* Right icons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsNoticeModalOpen(true)}
                  className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 text-white"
                >
                  <Bell className="w-3.5 h-3.5 text-amber-300" />
                </button>
                <button
                  onClick={() => setSimActiveTab('profile')}
                  className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 text-white"
                >
                  <User className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Tap to reveal balance card (Authentic Bangladeshi Telecom App style) */}
            <div className="mt-3 bg-black/25 rounded-2xl p-2.5 flex items-center justify-between border border-white/10">
              <div
                onClick={() => setShowBalance(!showBalance)}
                className="flex items-center gap-2 cursor-pointer flex-1 select-none"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/80 flex items-center justify-center text-white">
                  {showBalance ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <span className="text-[10px] text-emerald-200 block font-medium">
                    {showBalance ? 'মেইন ব্যালেন্স' : 'ব্যালেন্স জানতে ট্যাপ করুন'}
                  </span>
                  <div className="font-extrabold text-sm text-white font-mono">
                    {showBalance ? `৳${user.mainBalance.toFixed(2)}` : '••••••••'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSubView('addbalance')}
                className="bg-white text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-xl shadow-xs active:scale-95 transition-transform"
              >
                + অ্যাড ব্যালেন্স
              </button>
            </div>
          </div>

          {/* App Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
            {/* If subview is active */}
            {subView !== 'none' ? (
              <div>
                <button
                  onClick={() => setSubView('none')}
                  className="text-xs font-bold text-slate-600 hover:text-emerald-700 mb-2 flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200 w-fit"
                >
                  ← ব্যাক টু হোম
                </button>
                {subView === 'billpay' && <BillPayView />}
                {subView === 'addbalance' && <AddBalanceView />}
                {subView === 'transfer' && <TransferView />}
                {subView === 'resellers' && <ResellerView />}
              </div>
            ) : simActiveTab === 'recharge' ? (
              <RechargeForm compact={true} onSuccess={() => setSimActiveTab('history')} />
            ) : simActiveTab === 'drive' ? (
              <DrivePacksView onSuccess={() => setSimActiveTab('history')} />
            ) : simActiveTab === 'history' ? (
              <HistoryView />
            ) : simActiveTab === 'profile' ? (
              /* Profile tab inside mobile app */
              <div className="space-y-3">
                <div className="bg-white rounded-2xl p-4 border border-slate-200 text-center shadow-xs">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-extrabold text-xl mx-auto mb-2 border-2 border-emerald-500">
                    OM
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{user.name}</h3>
                  <p className="text-xs text-slate-500 font-mono">{user.phone}</p>
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-0.5 rounded-full mt-2">
                    {user.roleBengali}
                  </span>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">ইউজারনেম:</span>
                    <span className="font-bold text-slate-800">{user.username}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">মেইন ব্যালেন্স:</span>
                    <span className="font-bold text-emerald-700">৳{user.mainBalance}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">ড্রাইভ ব্যালেন্স:</span>
                    <span className="font-bold text-amber-700">৳{user.driveBalance}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500">আজকের রিচার্জ ইনকাম:</span>
                    <span className="font-bold text-emerald-600">৳{user.totalEarningsToday}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsDownloadModalOpen(true)}
                  className="w-full bg-slate-900 text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>অ্যান্ড্রয়েড APK ডাউনলোড করুন</span>
                </button>
              </div>
            ) : (
              /* Home View */
              <>
                {/* Promo Banner Slider */}
                <div
                  className={`bg-gradient-to-r ${banners[activeBannerIndex].bg} text-white rounded-2xl p-3.5 shadow-xs relative overflow-hidden transition-all`}
                >
                  <span className="text-[10px] bg-black/20 text-yellow-300 font-bold px-2 py-0.5 rounded-full inline-block mb-1">
                    স্পেশাল অফার
                  </span>
                  <h4 className="font-extrabold text-sm">
                    {banners[activeBannerIndex].title}
                  </h4>
                  <p className="text-[11px] text-white/90 mt-0.5">
                    {banners[activeBannerIndex].sub}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    {banners.map((_, i) => (
                      <span
                        key={i}
                        onClick={() => setActiveBannerIndex(i)}
                        className={`w-2 h-1 rounded-full cursor-pointer transition-all ${
                          activeBannerIndex === i ? 'bg-white w-4' : 'bg-white/40'
                        }`}
                      ></span>
                    ))}
                  </div>
                </div>

                {/* Operator Quick Circles */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800">অপারেটর নির্বাচন</span>
                    <span className="text-[10px] text-emerald-600 font-bold">অটো কানেক্ট</span>
                  </div>
                  <div className="grid grid-cols-6 gap-1.5">
                    {Object.values(OPERATORS).map((op) => (
                      <button
                        key={op.id}
                        onClick={() => setSimActiveTab('recharge')}
                        className="flex flex-col items-center group"
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-[11px] font-extrabold shadow-xs group-hover:scale-105 transition-transform"
                          style={{ backgroundColor: op.color }}
                        >
                          {op.logoText}
                        </div>
                        <span className="text-[10px] font-bold text-slate-700 mt-1">
                          {op.bengaliName}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 8-Grid Core Services (Sadia Telecom style) */}
                <div>
                  <span className="text-xs font-bold text-slate-800 block mb-2">
                    সকল সার্ভিস (Services)
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      {
                        title: 'ফ্লেক্সিলোড',
                        icon: Zap,
                        color: 'bg-emerald-100 text-emerald-700',
                        action: () => setSimActiveTab('recharge'),
                      },
                      {
                        title: 'ড্রাইভ প্যাক',
                        icon: Flame,
                        color: 'bg-rose-100 text-rose-700',
                        action: () => setSimActiveTab('drive'),
                      },
                      {
                        title: 'বিল পে',
                        icon: FileText,
                        color: 'bg-blue-100 text-blue-700',
                        action: () => setSubView('billpay'),
                      },
                      {
                        title: 'ব্যালেন্স অ্যাড',
                        icon: CreditCard,
                        color: 'bg-amber-100 text-amber-700',
                        action: () => setSubView('addbalance'),
                      },
                      {
                        title: 'ট্রান্সফার',
                        icon: ArrowRightLeft,
                        color: 'bg-teal-100 text-teal-700',
                        action: () => setSubView('transfer'),
                      },
                      {
                        title: 'রিসেলার',
                        icon: Users,
                        color: 'bg-purple-100 text-purple-700',
                        action: () => setSubView('resellers'),
                      },
                      {
                        title: 'হিস্টোরি',
                        icon: History,
                        color: 'bg-indigo-100 text-indigo-700',
                        action: () => setSimActiveTab('history'),
                      },
                      {
                        title: 'সাপোর্ট',
                        icon: Headphones,
                        color: 'bg-cyan-100 text-cyan-700',
                        action: () => setIsSupportModalOpen(true),
                      },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.title}
                          onClick={item.action}
                          className="bg-white rounded-xl p-2 border border-slate-200 hover:border-emerald-300 flex flex-col items-center text-center shadow-2xs hover:shadow-xs active:scale-95 transition-all"
                        >
                          <div
                            className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center mb-1`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-800 line-clamp-1">
                            {item.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Drive Offer Highlight */}
                <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      <span>জনপ্রিয় ড্রাইভ অফার</span>
                    </span>
                    <button
                      onClick={() => setSimActiveTab('drive')}
                      className="text-[11px] text-emerald-600 font-bold hover:underline"
                    >
                      সব দেখুন →
                    </button>
                  </div>
                  <div
                    onClick={() => setSimActiveTab('drive')}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-xs text-slate-900">
                        GP 50GB + 800 Min
                      </div>
                      <div className="text-[10px] text-slate-500">মেয়াদ ৩০ দিন | সারা দেশ</div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-red-600 block">৳649</span>
                      <span className="text-[10px] bg-red-600 text-white font-bold px-1.5 py-0.2 rounded">
                        ক্যাশব্যাক ৳250
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Android App Bottom Navigation Bar */}
          <div className="h-14 bg-white border-t border-slate-200 px-3 flex items-center justify-around select-none">
            {[
              { id: 'home', label: 'হোম', icon: Home },
              { id: 'drive', label: 'ড্রাইভ', icon: Flame },
              { id: 'recharge', label: 'রিচার্জ', icon: Zap, isCenter: true },
              { id: 'history', label: 'হিস্টোরি', icon: History },
              { id: 'profile', label: 'প্রোফাইল', icon: User },
            ].map((btn) => {
              const Icon = btn.icon;
              const isActive = simActiveTab === btn.id && subView === 'none';

              if (btn.isCenter) {
                return (
                  <button
                    key={btn.id}
                    onClick={() => {
                      setSubView('none');
                      setSimActiveTab('recharge');
                    }}
                    className="-mt-5 w-11 h-11 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/40 active:scale-95 transition-transform"
                    title="ফ্লেক্সিলোড"
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                );
              }

              return (
                <button
                  key={btn.id}
                  onClick={() => {
                    setSubView('none');
                    setSimActiveTab(btn.id as any);
                  }}
                  className={`flex flex-col items-center gap-0.5 transition-colors ${
                    isActive ? 'text-emerald-700 font-bold' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px]">{btn.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
