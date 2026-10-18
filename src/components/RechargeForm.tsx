import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Lock,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useTelecom } from '../context/TelecomContext';
import { OPERATORS, COMMISSION_RATES } from '../data/telecomData';
import { OperatorId } from '../types/telecom';

interface RechargeFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

export const RechargeForm: React.FC<RechargeFormProps> = ({ onSuccess, compact = false }) => {
  const { user, processRecharge, detectOperatorFromNumber } = useTelecom();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [operator, setOperator] = useState<OperatorId>('gp');
  const [simType, setSimType] = useState<'prepaid' | 'postpaid' | 'skitto'>('prepaid');
  const [amount, setAmount] = useState<string>('');
  const [pin, setPin] = useState('');
  const [showPinModal, setShowPinModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto detect operator when typing phone number
  useEffect(() => {
    const detected = detectOperatorFromNumber(phoneNumber);
    if (detected) {
      setOperator(detected);
    }
  }, [phoneNumber, detectOperatorFromNumber]);

  const quickAmounts = [20, 50, 100, 199, 299, 499, 999];

  const parsedAmount = parseFloat(amount) || 0;
  const roleConfig = COMMISSION_RATES[user.role];
  const estimatedCommission = parsedAmount > 0
    ? ((parsedAmount * roleConfig.rechargeBonusPer1000) / 1000).toFixed(2)
    : '0.00';

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanNum = phoneNumber.replace(/\s+/g, '');
    if (cleanNum.length < 11) {
      setErrorMsg('দয়া করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017xxxxxxxx)');
      return;
    }

    if (parsedAmount < 10) {
      setErrorMsg('নূন্যতম রিচার্জের পরিমাণ ১০ টাকা');
      return;
    }

    if (parsedAmount > user.mainBalance) {
      setErrorMsg(`অপর্যাপ্ত ব্যালেন্স! আপনার বর্তমান মেইন ব্যালেন্স ৳${user.mainBalance}`);
      return;
    }

    setShowPinModal(true);
  };

  const handleConfirmRecharge = () => {
    if (!pin) {
      setErrorMsg('৪ ডিজিটের পিন নম্বর লিখুন');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      const result = processRecharge({
        phoneNumber,
        operator,
        amount: parsedAmount,
        simType,
        pin,
      });

      setIsSubmitting(false);

      if (result.success) {
        setShowPinModal(false);
        setPin('');
        setAmount('');
        setPhoneNumber('');
        if (onSuccess) onSuccess();
      } else {
        setErrorMsg(result.message);
      }
    }, 600);
  };

  return (
    <div className={`bg-white rounded-2xl ${compact ? 'p-4' : 'p-6 sm:p-8'} shadow-sm border border-slate-200`}>
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span>ফ্লেক্সিলোড / মোবাইল রিচার্জ</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            সকল বাংলাদেশি অপারেটরে ৩ সেকেন্ডে অটো রিচার্জ
          </p>
        </div>
        <div className="text-right">
          <span className="text-[11px] text-slate-500 block">কমিশন রেট:</span>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            ৳{roleConfig.rechargeBonusPer1000}/১০০০
          </span>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs sm:text-sm text-red-700">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleInitialSubmit} className="space-y-4">
        {/* Mobile Number Input */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            মোবাইল নম্বর (Customer Mobile Number)
          </label>
          <div className="relative">
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="017xxxxxxxx বা 019xxxxxxxx"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-mono text-base font-medium placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all pl-11"
              maxLength={14}
              required
            />
            <Smartphone className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
            {operator && phoneNumber.length >= 3 && (
              <div className="absolute right-3 top-2.5">
                <span
                  className="px-2 py-1 rounded text-xs font-bold uppercase text-white shadow-xs"
                  style={{ backgroundColor: OPERATORS[operator]?.color || '#10b981' }}
                >
                  {OPERATORS[operator]?.bengaliName}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Operator Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            অপারেটর নির্বাচন করুন
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {(Object.keys(OPERATORS) as OperatorId[]).map((opKey) => {
              const op = OPERATORS[opKey];
              const isSelected = operator === opKey;
              return (
                <button
                  type="button"
                  key={opKey}
                  onClick={() => setOperator(opKey)}
                  className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                  }`}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[11px] font-extrabold shadow-xs mb-1"
                    style={{ backgroundColor: op.color }}
                  >
                    {op.logoText}
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">
                    {op.bengaliName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SIM Type (Prepaid / Postpaid / Skitto) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            সিম টাইপ (Connection Type)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'prepaid', title: 'প্রিপেইড (Prepaid)' },
              { id: 'postpaid', title: 'পোস্টপেইড (Postpaid)' },
              { id: 'skitto', title: 'স্কিটো (Skitto)' },
            ].map((st) => (
              <button
                type="button"
                key={st.id}
                onClick={() => setSimType(st.id as any)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  simType === st.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {st.title}
              </button>
            ))}
          </div>
        </div>

        {/* Amount Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700">
              রিচার্জের পরিমাণ (Taka)
            </label>
            {parsedAmount > 0 && (
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                আপনার লাভ/কমিশন: ৳{estimatedCommission}
              </span>
            )}
          </div>
          <div className="relative">
            <span className="absolute left-4 top-3 text-slate-500 font-bold text-lg">
              ৳
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-3 text-slate-900 text-lg font-bold placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-mono"
              required
              min={10}
            />
          </div>

          {/* Quick preset chips */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className="text-[11px] text-slate-400 font-medium mr-1">কুইক:</span>
            {quickAmounts.map((q) => (
              <button
                type="button"
                key={q}
                onClick={() => setAmount(q.toString())}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 active:bg-emerald-100 text-slate-700 hover:text-slate-900 text-xs font-semibold rounded-lg transition-colors border border-slate-200"
              >
                ৳{q}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 text-sm sm:text-base transition-transform active:scale-[0.99] mt-2 cursor-pointer"
        >
          <span>এগিয়ে যান (Proceed to Recharge)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Security PIN Confirmation Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <div className="text-center mb-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                পিন দিয়ে রিচার্জ সম্পন্ন করুন
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                সুরক্ষার জন্য আপনার ৪ ডিজিটের গোপন পিন প্রদান করুন
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2 mb-4 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">নম্বর:</span>
                <span className="font-mono font-bold text-slate-800">{phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">অপারেটর:</span>
                <span className="font-bold text-emerald-700 uppercase">
                  {OPERATORS[operator].bengaliName} ({simType})
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-1.5">
                <span className="text-slate-500">রিচার্জ পরিমাণ:</span>
                <span className="font-bold text-base text-slate-900">৳{parsedAmount}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>কমিশন পাবেন:</span>
                <span>+৳{estimatedCommission}</span>
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-red-600 mb-3 text-center font-medium">
                {errorMsg}
              </p>
            )}

            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-700 mb-1 text-center">
                আপনার একাউন্ট পিন (Default: 1234)
              </label>
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                className="w-full text-center text-2xl tracking-[0.5em] font-bold py-2.5 bg-slate-100 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-mono"
                autoFocus
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowPinModal(false);
                  setPin('');
                  setErrorMsg('');
                }}
                disabled={isSubmitting}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-100 transition-colors"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={handleConfirmRecharge}
                disabled={isSubmitting}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/30 flex items-center justify-center gap-1.5 transition-all"
              >
                {isSubmitting ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>কনফার্ম</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
