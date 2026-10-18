import React from 'react';
import {
  Wallet,
  Zap,
  Flame,
  FileText,
  CreditCard,
  ArrowRightLeft,
  Users,
  History,
  TrendingUp,
  Download,
  Headphones,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  Gift,
  ArrowRight,
} from 'lucide-react';
import { useTelecom } from '../context/TelecomContext';
import { RechargeForm } from './RechargeForm';
import { DrivePacksView } from './DrivePacksView';
import { BillPayView } from './BillPayView';
import { AddBalanceView } from './AddBalanceView';
import { HistoryView } from './HistoryView';
import { ResellerView } from './ResellerView';
import { TransferView } from './TransferView';
import { OPERATORS } from '../data/telecomData';

export const WebPortalView: React.FC = () => {
  const {
    user,
    activeTab,
    setActiveTab,
    driveOffers,
    transactions,
    setSelectedReceipt,
    setIsDownloadModalOpen,
    setIsSupportModalOpen,
    setViewMode,
  } = useTelecom();

  const topThreeDrives = driveOffers.slice(0, 3);
  const recentThreeTx = transactions.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Reseller / User Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Main Balance Card */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-emerald-100 mb-1">
            <span className="font-semibold">মেইন ব্যালেন্স (Main Balance)</span>
            <Wallet className="w-4 h-4 text-emerald-200" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight my-1">
            ৳{user.mainBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <div className="flex items-center justify-between text-xs pt-2 border-t border-emerald-500/50 mt-2">
            <span className="text-emerald-100">ফ্লেক্সিলোড ও বিল পে</span>
            <button
              onClick={() => setActiveTab('addbalance')}
              className="bg-white text-emerald-800 px-2 py-0.5 rounded-md font-bold text-[11px] hover:bg-emerald-50 transition-colors"
            >
              + অ্যাড করুন
            </button>
          </div>
        </div>

        {/* Drive Balance Card */}
        <div className="bg-gradient-to-br from-rose-600 to-red-700 text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-rose-100 mb-1">
            <span className="font-semibold">ড্রাইভ ব্যালেন্স (Drive Balance)</span>
            <Flame className="w-4 h-4 text-rose-200" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight my-1">
            ৳{user.driveBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <div className="flex items-center justify-between text-xs pt-2 border-t border-rose-500/50 mt-2">
            <span className="text-rose-100">স্পেশাল ড্রাইভ অফার</span>
            <button
              onClick={() => setActiveTab('drive')}
              className="bg-white text-rose-800 px-2 py-0.5 rounded-md font-bold text-[11px] hover:bg-rose-50 transition-colors"
            >
              ড্রাইভ কিনুন
            </button>
          </div>
        </div>

        {/* Today's Transactions Count */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold">আজকের মোট রিচার্জ</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono my-1">
            {user.totalRechargesToday} <span className="text-sm font-sans font-normal text-slate-500">টি</span>
          </div>
          <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 mt-2 flex items-center justify-between">
            <span>সাকসেস রেট: <strong className="text-emerald-600 font-bold">100%</strong></span>
            <span className="text-[11px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">অটো সার্ভার</span>
          </div>
        </div>

        {/* Today's Earnings */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold">আজকের মোট লাভ / কমিশন</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono my-1">
            ৳{user.totalEarningsToday.toFixed(2)}
          </div>
          <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 mt-2 flex items-center justify-between">
            <span>পদবী: <strong className="text-slate-800">{user.roleBengali}</strong></span>
            <button
              onClick={() => setActiveTab('resellers')}
              className="text-[11px] text-emerald-600 font-bold hover:underline"
            >
              আপগ্রেড →
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar for Web Portal */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {[
          { id: 'home', label: 'ড্যাশবোর্ড (Dashboard)', icon: Zap },
          { id: 'recharge', label: 'ফ্লেক্সিলোড (Recharge)', icon: Smartphone },
          { id: 'drive', label: 'ড্রাইভ অফার (Drive)', icon: Flame },
          { id: 'billpay', label: 'ইউটিলিটি বিল পে (Bill Pay)', icon: FileText },
          { id: 'addbalance', label: 'ব্যালেন্স যোগ (Add Balance)', icon: CreditCard },
          { id: 'transfer', label: 'ট্রান্সফার (Transfer)', icon: ArrowRightLeft },
          { id: 'history', label: 'খতিয়ান (History)', icon: History },
          { id: 'resellers', label: 'রিসেলার নেটওয়ার্ক', icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tab Content */}
      {activeTab === 'recharge' && <RechargeForm />}
      {activeTab === 'drive' && <DrivePacksView />}
      {activeTab === 'billpay' && <BillPayView />}
      {activeTab === 'addbalance' && <AddBalanceView />}
      {activeTab === 'transfer' && <TransferView />}
      {activeTab === 'history' && <HistoryView />}
      {activeTab === 'resellers' && <ResellerView />}

      {/* Dashboard Home View: Split Layout with Quick Actions */}
      {activeTab === 'home' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Quick Recharge Box */}
            <div className="lg:col-span-6">
              <RechargeForm compact={false} />
            </div>

            {/* Right: Top Hot Drive Offers */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-rose-500 fill-rose-500" />
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">
                        আজকের সেরা ড্রাইভ অফারসমূহ
                      </h3>
                      <p className="text-xs text-slate-500">সর্বোচ্চ ক্যাশব্যাক কমিশনযুক্ত প্যাক</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('drive')}
                    className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
                  >
                    <span>সকল প্যাক</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {topThreeDrives.map((offer) => {
                    const op = OPERATORS[offer.operator];
                    return (
                      <div
                        key={offer.id}
                        className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-emerald-50/20 transition-all flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-xs shadow-xs flex-shrink-0"
                            style={{ backgroundColor: op.color }}
                          >
                            {op.logoText}
                          </div>
                          <div>
                            <div className="font-bold text-xs sm:text-sm text-slate-900">
                              {offer.title}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              মেয়াদ: {offer.validity} • {offer.division === 'All' ? 'সারা দেশ' : offer.division}
                            </div>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <div className="font-extrabold text-sm text-slate-900 font-mono">
                            ৳{offer.offerPrice}
                          </div>
                          <span className="inline-block bg-emerald-600 text-yellow-300 font-bold text-[10px] px-1.5 py-0.5 rounded">
                            কমিশন ৳{offer.cashback}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => setActiveTab('drive')}
                  className="w-full mt-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <Flame className="w-4 h-4 text-rose-500" />
                  <span>আরও ড্রাইভ অফার দেখুন (সকল অপারেটর)</span>
                </button>
              </div>

              {/* Mobile App Callout Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-5 shadow-xs flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                    অ্যান্ড্রয়েড অ্যাপ্লিকেশন
                  </span>
                  <h4 className="font-bold text-sm sm:text-base">
                    মোবাইলে www.om.com অ্যাপ ব্যবহার করতে চান?
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    সরাসরি APK ফাইল ডাউনলোড করুন অথবা ব্রাউজারে মোবাইল অ্যাপ মোড দেখুন।
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                  <button
                    onClick={() => setViewMode('mobile')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors whitespace-nowrap"
                  >
                    অ্যাপ প্রিভিউ
                  </button>
                  <button
                    onClick={() => setIsDownloadModalOpen(true)}
                    className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-2 rounded-xl border border-white/20 transition-colors whitespace-nowrap"
                  >
                    APK ডাউনলোড
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-slate-500" />
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  সাম্প্রতিক লেনদেন (Recent Transactions)
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('history')}
                className="text-xs font-bold text-emerald-600 hover:underline"
              >
                সম্পূর্ণ খতিয়ান দেখুন →
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {recentThreeTx.map((tx) => (
                <div
                  key={tx.id}
                  className="py-3 flex items-center justify-between text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-xs">
                      {tx.trxId}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{tx.details}</div>
                      {tx.targetNumber && (
                        <div className="text-[11px] text-slate-500 font-mono">
                          {tx.targetNumber}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-mono font-extrabold text-slate-900">
                        ৳{tx.amount}
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold block">
                        সফল
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedReceipt(tx)}
                      className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200"
                    >
                      রশিদ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Telecom Technology & Architecture Explanation Card for the user */}
      <div className="bg-slate-900 text-slate-300 rounded-2xl p-6 shadow-sm border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-white font-extrabold text-base">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Sadia Telecom (sadiatelbd.com) এর মত ওয়েবসাইট এবং অ্যাপ যেভাবে তৈরি হয় ও চলে</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-1.5">
            <span className="text-emerald-400 font-extrabold block text-sm">
              ১. ফ্রন্টএন্ড ও ডোমেন (www.om.com)
            </span>
            <p className="text-slate-300 leading-relaxed">
              আপনার ডোমেন <strong>www.om.com</strong> এ এই সম্পূর্ণ রেসপন্সিভ ওয়েব পোর্টালটি লাইভ থাকে। ব্যবহারকারীরা যেকোনো ব্রাউজার দিয়ে লগইন করে রিচার্জ করতে পারেন।
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-1.5">
            <span className="text-amber-400 font-extrabold block text-sm">
              ২. অ্যান্ড্রয়েড মোবাইল অ্যাপ (APK)
            </span>
            <p className="text-slate-300 leading-relaxed">
              ওয়েবসাইটটিকে <strong>Android Studio / WebView / Capacitor</strong> দিয়ে বান্ডল করে <strong>.apk</strong> অ্যাপ ফাইলে রূপান্তর করা হয়। ব্যবহারকারীরা সরাসরি ফোনে ইন্সটল করে ব্যবহার করতে পারেন।
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-1.5">
            <span className="text-cyan-400 font-extrabold block text-sm">
              ৩. অটো রোবট / সিম সার্ভার
            </span>
            <p className="text-slate-300 leading-relaxed">
              গ্রামীনফোন, বাংলালিংক, রবি রিটেইলার সিমগুলো GSM Modem বা Android Phone এ স্থাপন করে USSD বা রিটেইলার অ্যাপের সাথে অটো রোবট কানেক্ট করে ২-৫ সেকেন্ডে অটো রিচার্জ ও ড্রাইভ নিশ্চিত করা হয়।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
