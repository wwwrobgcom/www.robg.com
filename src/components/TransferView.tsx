import React, { useState } from 'react';
import {
  ArrowRightLeft,
  CheckCircle2,
  AlertCircle,
  Lock,
  ArrowRight,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { useTelecom } from '../context/TelecomContext';

export const TransferView: React.FC = () => {
  const { user, processBalanceTransfer } = useTelecom();

  const [recipientPhone, setRecipientPhone] = useState('');
  const [walletType, setWalletType] = useState<'main' | 'drive'>('main');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const parsedAmount = parseFloat(amount) || 0;
  const currentBal = walletType === 'main' ? user.mainBalance : user.driveBalance;

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanNum = recipientPhone.replace(/\s+/g, '');
    if (cleanNum.length < 11) {
      setErrorMsg('সঠিক ১১ ডিজিটের প্রাপক মোবাইল নম্বর লিখুন');
      return;
    }

    if (parsedAmount < 10) {
      setErrorMsg('নূন্যতম ট্রান্সফারের পরিমাণ ১০ টাকা');
      return;
    }

    if (parsedAmount > currentBal) {
      setErrorMsg(`অপর্যাপ্ত ব্যালেন্স! আপনার ${walletType === 'main' ? 'মেইন' : 'ড্রাইভ'} ব্যালেন্স ৳${currentBal}`);
      return;
    }

    setShowConfirm(true);
  };

  const handleConfirmTransfer = () => {
    if (!pin) {
      setErrorMsg('৪ ডিজিটের পিন নম্বর লিখুন');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      const res = processBalanceTransfer({
        recipientPhone: recipientPhone.replace(/\s+/g, ''),
        walletType,
        amount: parsedAmount,
        pin,
      });

      setIsSubmitting(false);

      if (res.success) {
        setShowConfirm(false);
        setSuccessMsg(res.message);
        setRecipientPhone('');
        setAmount('');
        setPin('');
      } else {
        setErrorMsg(res.message);
      }
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-800 to-slate-900 text-white rounded-2xl p-6 shadow-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 text-teal-100 text-xs font-bold px-3 py-1 rounded-full mb-2">
            <ArrowRightLeft className="w-3.5 h-3.5 text-yellow-300" />
            <span>ইনস্ট্যান্ট ইউজার টু ইউজার ট্রান্সফার</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            ব্যালেন্স ট্রান্সফার (Balance Transfer)
          </h1>
          <p className="text-teal-100 text-xs sm:text-sm mt-1">
            www.om.com এর অন্য যেকোনো রিসেলার, রিটেইলার বা গ্রাহকের একাউন্টে তাৎক্ষণিক ব্যালেন্স ট্রান্সফার করুন সম্পূর্ণ ফ্রিতে (০% চার্জ)।
          </p>
        </div>
      </div>

      <div className="max-w-xl mx-auto bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs">
        {successMsg && (
          <div className="mb-5 p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center gap-2 text-xs sm:text-sm font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mb-5 p-3.5 bg-red-50 text-red-800 border border-red-200 rounded-xl flex items-center gap-2 text-xs sm:text-sm">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleInitialSubmit} className="space-y-4">
          {/* Wallet Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              কোন ব্যালেন্স থেকে ট্রান্সফার করবেন?
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setWalletType('main')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  walletType === 'main'
                    ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="text-xs font-bold text-slate-800">মেইন ব্যালেন্স</div>
                <div className="text-sm font-extrabold text-emerald-700 font-mono mt-0.5">
                  ৳{user.mainBalance}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setWalletType('drive')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  walletType === 'drive'
                    ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="text-xs font-bold text-slate-800">ড্রাইভ ব্যালেন্স</div>
                <div className="text-sm font-extrabold text-emerald-700 font-mono mt-0.5">
                  ৳{user.driveBalance}
                </div>
              </button>
            </div>
          </div>

          {/* Recipient Phone */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              প্রাপকের মোবাইল নম্বর (Recipient User Number)
            </label>
            <input
              type="tel"
              value={recipientPhone}
              onChange={(e) => setRecipientPhone(e.target.value)}
              placeholder="01xxxxxxxxx"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              maxLength={11}
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              ট্রান্সফারের পরিমাণ (Taka)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-500 font-bold">৳</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-8 pr-4 py-2.5 text-base font-bold font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                min={10}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 text-sm sm:text-base transition-transform active:scale-[0.99] cursor-pointer mt-2"
          >
            <Send className="w-4 h-4" />
            <span>এগিয়ে যান (Transfer Balance)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <div className="text-center mb-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                <ArrowRightLeft className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">ট্রান্সফার নিশ্চিতকরণ</h3>
              <p className="text-xs text-slate-500">সুরক্ষার জন্য পিন প্রদান করুন</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-slate-500">প্রাপক:</span>
                <span className="font-bold text-slate-800 font-mono">{recipientPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ওয়ালেট:</span>
                <span className="font-bold text-emerald-700 uppercase">{walletType} Balance</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-1.5 font-bold">
                <span className="text-slate-700">পরিমাণ:</span>
                <span className="text-slate-900 font-mono text-sm">৳{parsedAmount}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>চার্জ:</span>
                <span className="text-emerald-600 font-bold">৳0.00 (ফ্রি)</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-700 mb-1 text-center">
                আপনার ৪ ডিজিটের পিন (Default: 1234)
              </label>
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                className="w-full text-center text-xl tracking-widest font-mono font-bold py-2 bg-slate-100 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                disabled={isSubmitting}
                className="flex-1 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={handleConfirmTransfer}
                disabled={isSubmitting}
                className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-xs"
              >
                {isSubmitting ? 'প্রসেসিং...' : 'ট্রান্সফার নিশ্চিত'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
