import React, { useState } from 'react';
import {
  Users,
  Award,
  TrendingUp,
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Zap,
} from 'lucide-react';
import { useTelecom } from '../context/TelecomContext';
import { COMMISSION_RATES } from '../data/telecomData';
import { UserRole } from '../types/telecom';

export const ResellerView: React.FC = () => {
  const { user, upgradeUserRole } = useTelecom();

  // Create Sub-User state
  const [newUserName, setNewUserName] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('retailer');
  const [newUserPin, setNewUserPin] = useState('1234');
  const [userCreatedMsg, setUserCreatedMsg] = useState('');
  const [upgradeMsg, setUpgradeMsg] = useState('');

  const tiers: UserRole[] = ['retailer', 'dealer', 'dgm', 'house', 'sub_admin'];

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUserCreatedMsg('');

    if (!newUserName || !newUserPhone) return;

    setUserCreatedMsg(`সফলভাবে "${newUserName}" (${newUserPhone}) এর নামে নতুন ${COMMISSION_RATES[newUserRole].title} একাউন্ট খোলা হয়েছে! পাসওয়ার্ড ও পিন SMS মারফত পাঠানো হয়েছে।`);
    setNewUserName('');
    setNewUserPhone('');
  };

  const handleUpgrade = (role: UserRole) => {
    setUpgradeMsg('');
    const success = upgradeUserRole(role);
    if (success) {
      setUpgradeMsg(`অভিনন্দন! আপনার একাউন্ট সফলভাবে "${COMMISSION_RATES[role].title}" এ আপগ্রেড করা হয়েছে!`);
    } else {
      setUpgradeMsg(`ব্যালেন্স পর্যাপ্ত নয়! এই লেভেলে আপগ্রেড করতে আরও ব্যালেন্স প্রয়োজন।`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-800 to-slate-900 text-white rounded-2xl p-6 shadow-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 text-purple-200 text-xs font-bold px-3 py-1 rounded-full mb-2">
            <Award className="w-3.5 h-3.5 text-yellow-300" />
            <span>রিসেলার নেটওয়ার্ক ও কমিশন সিস্টেম</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            রিসেলার ম্যানেজমেন্ট (Reseller Dashboard)
          </h1>
          <p className="text-purple-200 text-xs sm:text-sm mt-1">
            আপনার বর্তমান লেভেল: <strong className="text-yellow-300">{user.roleBengali}</strong>। সাব-ইউজার তৈরি করুন, প্রতি রিচার্জ ও ড্রাইভে বেশি কমিশন পেতে লেভেল আপগ্রেড করুন।
          </p>
        </div>
      </div>

      {upgradeMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{upgradeMsg}</span>
        </div>
      )}

      {/* Account Tier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {tiers.map((tKey) => {
          const config = COMMISSION_RATES[tKey];
          const isCurrent = user.role === tKey;
          return (
            <div
              key={tKey}
              className={`rounded-2xl p-4 border flex flex-col justify-between transition-all ${
                isCurrent
                  ? 'bg-gradient-to-b from-emerald-50 to-teal-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">
                    লেভেল
                  </span>
                  {isCurrent && (
                    <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      বর্তমান
                    </span>
                  )}
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm mb-3">
                  {config.title}
                </h3>

                <div className="space-y-2 text-xs border-t border-slate-100 pt-2.5 mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-500">রিচার্জ বোনাস:</span>
                    <span className="font-bold text-emerald-700">৳{config.rechargeBonusPer1000}/১০০০</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">অটো ড্রাইভ ছাড়:</span>
                    <span className="font-bold text-amber-600">{config.driveBonusPercentage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">ফি:</span>
                    <span className="font-bold text-slate-800">৳{config.costToUpgrade}</span>
                  </div>
                </div>
              </div>

              {!isCurrent && (
                <button
                  type="button"
                  onClick={() => handleUpgrade(tKey)}
                  className="w-full bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold py-2 rounded-xl transition-colors flex items-center justify-center gap-1"
                >
                  <span>আপগ্রেড (৳{config.costToUpgrade})</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Sub-User Creation Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
            <UserPlus className="w-5 h-5 text-purple-600" />
            <div>
              <h2 className="font-extrabold text-slate-900 text-base">
                নতুন ইউজার অ্যাকাউন্ট তৈরি করুন (Create Sub-User)
              </h2>
              <p className="text-xs text-slate-500">
                আপনার আন্ডারে রিটেইলার বা ডিলার একাউন্ট খুলে ব্যবসা বৃদ্ধি করুন
              </p>
            </div>
          </div>

          {userCreatedMsg && (
            <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{userCreatedMsg}</span>
            </div>
          )}

          <form onSubmit={handleCreateUser} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ইউজার / দোকানের নাম (User / Shop Name)
              </label>
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="যেমন: ভাই ভাই টেলিকম / মো: রহিম"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                মোবাইল নম্বর (Login Mobile Number)
              </label>
              <input
                type="tel"
                value={newUserPhone}
                onChange={(e) => setNewUserPhone(e.target.value)}
                placeholder="01xxxxxxxxx"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                maxLength={11}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  একাউন্ট পদবী (Account Role)
                </label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-purple-500"
                >
                  <option value="retailer">রিটেইলার (Retailer)</option>
                  <option value="dealer">ডিলার (Dealer)</option>
                  <option value="dgm">ডিজিএম (DGM)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  প্রাথমিক পিন (Default PIN)
                </label>
                <input
                  type="text"
                  value={newUserPin}
                  onChange={(e) => setNewUserPin(e.target.value)}
                  placeholder="1234"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-800"
                  maxLength={4}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-purple-700/20 text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.99] cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>সাব-ইউজার তৈরি করুন</span>
            </button>
          </form>
        </div>

        {/* Benefits Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xs space-y-3">
            <h3 className="font-extrabold text-base text-yellow-300 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-yellow-400" />
              <span>রিসেলারদের সুবিধা ও ইনকাম</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sadia Telecom BD এর মত আমাদের <strong>www.om.com</strong> প্ল্যাটফর্মে রিসেলাররা ৩ ভাবে আয় করতে পারেন:
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
                <strong className="text-emerald-400 block mb-0.5">১. সরাসরি রিচার্জ কমিশন:</strong>
                প্রতিবার ফ্লেক্সিলোডে সর্বোচ্চ ৳৪২ পর্যন্ত ইনস্ট্যান্ট কমিশন।
              </div>
              <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
                <strong className="text-amber-400 block mb-0.5">২. স্পেশাল ড্রাইভ ক্যাশব্যাক:</strong>
                প্রতিটি এমবি ও মিনিট প্যাকে ৳১৫০-৳৩৫০ পর্যন্ত সরাসরি মার্জিন।
              </div>
              <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
                <strong className="text-cyan-400 block mb-0.5">৩. সাব-ইউজার লাইফটাইম কমিশন:</strong>
                আপনার তৈরি করা রিটেইলারদের প্রতি রিচার্জে আপনার একাউন্টে অটো রিওয়ার্ড যোগ হবে।
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
