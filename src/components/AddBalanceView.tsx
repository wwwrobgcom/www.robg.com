import React, { useState } from 'react';
import {
  CreditCard,
  Copy,
  Check,
  Zap,
  Gift,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { useTelecom } from '../context/TelecomContext';
import { PAYMENT_NUMBERS, COMMISSION_RATES } from '../data/telecomData';

export const AddBalanceView: React.FC = () => {
  const { user, processAddBalance } = useTelecom();

  const [selectedMethod, setSelectedMethod] = useState(PAYMENT_NUMBERS[0].method);
  const [targetWallet, setTargetWallet] = useState<'main' | 'drive' | 'bank'>('main');
  const [senderNumber, setSenderNumber] = useState('');
  const [trxId, setTrxId] = useState('');
  const [amount, setAmount] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleConfig = COMMISSION_RATES[user.role];
  const parsedAmount = parseFloat(amount) || 0;
  const bonusEarned = parsedAmount > 0
    ? Number(((parsedAmount * roleConfig.addBalanceBonus) / 1000).toFixed(2))
    : 0;

  const handleCopyNumber = (num: string, idx: number) => {
    navigator.clipboard.writeText(num.replace(/[^0-9]/g, ''));
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackMsg(null);

    const cleanSender = senderNumber.replace(/\s+/g, '');
    if (cleanSender.length < 11) {
      setFeedbackMsg({ type: 'error', text: 'সঠিক ১১ ডিজিটের সেন্ডার নম্বর দিন।' });
      return;
    }

    if (!trxId || trxId.length < 6) {
      setFeedbackMsg({ type: 'error', text: 'সঠিক ট্রানজেকশন আইডি (TrxID) লিখুন।' });
      return;
    }

    if (parsedAmount < 50) {
      setFeedbackMsg({ type: 'error', text: 'নূন্যতম ৫০ টাকা ব্যালেন্স যোগ করতে হবে।' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const res = processAddBalance({
        method: selectedMethod,
        senderNumber: cleanSender,
        trxId,
        amount: parsedAmount,
        targetWallet,
      });

      setIsSubmitting(false);

      if (res.success) {
        setFeedbackMsg({ type: 'success', text: res.message });
        setSenderNumber('');
        setTrxId('');
        setAmount('');
      } else {
        setFeedbackMsg({ type: 'error', text: res.message });
      }
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-cyan-800 text-white rounded-2xl p-6 shadow-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 text-emerald-100 text-xs font-bold px-3 py-1 rounded-full mb-2">
            <Zap className="w-3.5 h-3.5 text-yellow-300" />
            <span>অটো ব্যালেন্স রিচার্জ - ২৪ ঘণ্টা সচল</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            অটো ব্যালেন্স অ্যাড (Auto Add Balance)
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1">
            বিকাশ, নগদ, রকেট বা উপায় থেকে টাকা পাঠিয়ে TrxID সাবমিট করলেই কোনো প্রকার অপেক্ষা ছাড়াই অটোমেটিক আপনার একাউন্টে ব্যালেন্স এবং কমিশন বোনাস যুক্ত হয়ে যাবে।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Payment Numbers & Rules */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <h2 className="font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <span>অফিসিয়াল একাউন্ট নম্বরসমূহ</span>
              <span className="text-[11px] font-normal text-slate-500">ট্যাপ করে কপি করুন</span>
            </h2>

            <div className="space-y-2.5">
              {PAYMENT_NUMBERS.map((pn, idx) => (
                <div
                  key={pn.method}
                  className="p-3 rounded-xl border border-slate-200 hover:border-emerald-300 bg-slate-50/70 hover:bg-emerald-50/40 transition-all flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-slate-900">{pn.method}</span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-semibold">
                        {pn.type}
                      </span>
                    </div>
                    <div className="font-mono font-extrabold text-sm text-emerald-800 mt-0.5">
                      {pn.number}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      চার্জ: <span className="text-emerald-600 font-semibold">{pn.fee}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyNumber(pn.number, idx)}
                    className="flex items-center gap-1 bg-white hover:bg-emerald-600 hover:text-white text-slate-700 border border-slate-300 hover:border-emerald-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-600">কপি হয়েছে</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>কপি</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Current Role Commission Card */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs">
            <div className="flex items-center gap-2 text-amber-900 font-bold mb-1">
              <Gift className="w-4 h-4 text-amber-600" />
              <span>আপনার একাউন্ট স্ট্যাটাস: {user.roleBengali}</span>
            </div>
            <p className="text-amber-800 leading-relaxed">
              প্রতি ১০০০ টাকা মেইন ব্যালেন্স যোগ করলে আপনি পাবেন <strong>৳{roleConfig.addBalanceBonus} কমিশন বোনাস</strong>! ব্যালেন্স সাবমিট করার সাথে সাথেই বোনাস যুক্ত হয়।
            </p>
          </div>
        </div>

        {/* Right Side: Add Balance Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs">
            <h2 className="font-bold text-slate-900 text-lg mb-1 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-600" />
              <span>টাকা পাঠানোর পর তথ্য দিন</span>
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              বিকাশ/নগদ/রকেট অ্যাপের মেসেজ থেকে সঠিক TrxID ও নম্বর লিখুন
            </p>

            {feedbackMsg && (
              <div
                className={`mb-5 p-4 rounded-xl flex items-center gap-3 text-xs sm:text-sm border ${
                  feedbackMsg.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-red-50 text-red-800 border-red-300'
                }`}
              >
                {feedbackMsg.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
                <span className="font-medium">{feedbackMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Target Wallet selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  কোন ব্যালেন্সে যোগ করবেন? (Target Wallet)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'main', label: 'মেইন ব্যালেন্স', sub: 'ফ্লেক্সিলোড ও রিচার্জ' },
                    { id: 'drive', label: 'ড্রাইভ ব্যালেন্স', sub: 'স্পেশাল ড্রাইভ অফার' },
                    { id: 'bank', label: 'ব্যাংক ব্যালেন্স', sub: 'ক্যাশ আউট ও সেভিংস' },
                  ].map((w) => (
                    <button
                      type="button"
                      key={w.id}
                      onClick={() => setTargetWallet(w.id as any)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        targetWallet === w.id
                          ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50/40'
                      }`}
                    >
                      <div className="font-bold text-xs text-slate-800">{w.label}</div>
                      <div className="text-[10px] text-slate-500">{w.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  পেমেন্ট মেথড (Payment Method)
                </label>
                <select
                  value={selectedMethod}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                >
                  {PAYMENT_NUMBERS.map((pn) => (
                    <option key={pn.method} value={pn.method}>
                      {pn.method} ({pn.number})
                    </option>
                  ))}
                </select>
              </div>

              {/* Sender Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  যে নম্বর থেকে টাকা পাঠিয়েছেন (Sender Mobile Number)
                </label>
                <input
                  type="tel"
                  value={senderNumber}
                  onChange={(e) => setSenderNumber(e.target.value)}
                  placeholder="01xxxxxxxxx"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  maxLength={11}
                  required
                />
              </div>

              {/* Amount */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    টাকার পরিমাণ (Amount in Taka)
                  </label>
                  {parsedAmount > 0 && (
                    <span className="text-xs font-bold text-emerald-600">
                      অটো বোনাস পাবেন: +৳{bonusEarned}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-2.5 text-slate-500 font-bold">
                    ৳
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="নূন্যতম ৫০ টাকা"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-8 pr-4 py-2.5 text-sm font-bold text-slate-900 font-mono focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    min={50}
                    required
                  />
                </div>

                {/* Quick preset chips */}
                <div className="flex items-center gap-1.5 mt-2">
                  {[200, 500, 1000, 2000, 5000].map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => setAmount(amt.toString())}
                      className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg border border-slate-200"
                    >
                      ৳{amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* TrxID */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ট্রানজেকশন আইডি (Transaction ID - TrxID)
                </label>
                <input
                  type="text"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value.toUpperCase())}
                  placeholder="যেমন: BKL9984210"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-extrabold uppercase text-emerald-900 tracking-wider focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  বিকাশ বা নগদ থেকে পাওয়া ৮-১০ অক্ষরের ট্রানজেকশন কোড
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 text-sm sm:text-base transition-transform active:scale-[0.99] cursor-pointer mt-4"
              >
                {isSubmitting ? (
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>ব্যালেন্স ভেরিফাই ও যোগ করুন</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
