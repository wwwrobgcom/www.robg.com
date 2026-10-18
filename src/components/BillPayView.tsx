import React, { useState } from 'react';
import {
  Zap,
  Flame,
  Droplet,
  Wifi,
  CheckCircle2,
  AlertCircle,
  FileText,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { useTelecom } from '../context/TelecomContext';
import { BILL_PROVIDERS } from '../data/telecomData';
import { BillBiller } from '../types/telecom';

export const BillPayView: React.FC = () => {
  const { user, processBillPayment } = useTelecom();

  const [selectedCategory, setSelectedCategory] = useState<'electricity' | 'gas' | 'water' | 'internet'>('electricity');
  const [selectedBillerId, setSelectedBillerId] = useState<string>(BILL_PROVIDERS[0].id);
  const [accountNumber, setAccountNumber] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const billersInCategory = BILL_PROVIDERS.filter((b) => b.category === selectedCategory);
  const currentBiller = BILL_PROVIDERS.find((b) => b.id === selectedBillerId) || BILL_PROVIDERS[0];
  const parsedAmount = parseFloat(amount) || 0;

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!accountNumber || accountNumber.trim().length < 6) {
      setErrorMsg('সঠিক মিটার নম্বর বা এসএমএস একাউন্ট নম্বর লিখুন।');
      return;
    }

    if (!customerPhone || customerPhone.replace(/\s+/g, '').length < 11) {
      setErrorMsg('গ্রাহকের সঠিক ১১ ডিজিটের মোবাইল নম্বর লিখুন।');
      return;
    }

    if (parsedAmount < 10) {
      setErrorMsg('নূন্যতম বিলের পরিমাণ ১০ টাকা।');
      return;
    }

    if (parsedAmount > user.mainBalance) {
      setErrorMsg(`অপর্যাপ্ত ব্যালেন্স! আপনার বর্তমান মেইন ব্যালেন্স ৳${user.mainBalance}`);
      return;
    }

    setShowConfirm(true);
  };

  const handleConfirmPay = () => {
    if (!pin) {
      setErrorMsg('আপনার ৪ ডিজিটের পিন নম্বর লিখুন');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      const res = processBillPayment({
        billerId: currentBiller.nameBn,
        accountNo: accountNumber,
        phone: customerPhone,
        amount: parsedAmount,
        pin,
      });

      setIsSubmitting(false);

      if (res.success) {
        setShowConfirm(false);
        setAccountNumber('');
        setCustomerPhone('');
        setAmount('');
        setPin('');
      } else {
        setErrorMsg(res.message);
      }
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white rounded-2xl p-6 shadow-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 text-blue-100 text-xs font-bold px-3 py-1 rounded-full mb-2">
            <Zap className="w-3.5 h-3.5 text-yellow-300" />
            <span>ইউটিলিটি বিল পরিশোধ - ইনস্ট্যান্ট রিসিপ্ট</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            অনলাইন বিল পে (Utility Bill Pay)
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm mt-1">
            পল্লী বিদ্যুৎ (প্রিপেইড/পোস্টপেইড), ডেসকো, ডিপিডিসি, নেসকো, তিতাস গ্যাস, ওয়াসা এবং ব্রডব্যান্ড ইন্টারনেটের বিল পরিশোধ করুন ঘরে বসেই কোনো বাড়তি ঝামেলা ছাড়া।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Category & Form */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs">
          {/* Category Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            {[
              { id: 'electricity', label: 'বিদ্যুৎ বিল', icon: Zap, color: 'text-amber-500' },
              { id: 'gas', label: 'গ্যাস বিল', icon: Flame, color: 'text-orange-500' },
              { id: 'water', label: 'পানি / ওয়াসা', icon: Droplet, color: 'text-blue-500' },
              { id: 'internet', label: 'ইন্টারনেট', icon: Wifi, color: 'text-emerald-500' },
            ].map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id as any);
                    const firstInCat = BILL_PROVIDERS.find((b) => b.category === cat.id);
                    if (firstInCat) setSelectedBillerId(firstInCat.id);
                  }}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/40'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${cat.color}`} />
                  <span className="text-xs font-bold text-slate-800">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs sm:text-sm text-red-700">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleInitialSubmit} className="space-y-4">
            {/* Specific Biller Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                প্রতিষ্ঠান / বিলার নির্বাচন করুন
              </label>
              <select
                value={selectedBillerId}
                onChange={(e) => setSelectedBillerId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              >
                {billersInCategory.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.nameBn} - {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Account / Meter Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                এসএমএস একাউন্ট নম্বর / মিটার নম্বর (Account / Meter No)
              </label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="বিল কাগজের এসএমএস একাউন্ট বা গ্রাহক নম্বর লিখুন"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                required
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                পল্লী বিদ্যুতের ক্ষেত্রে বিল কাগজের ওপরের SMS Account Number লিখুন
              </span>
            </div>

            {/* Customer Contact Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                গ্রাহকের মোবাইল নম্বর (এসএমএস কনফার্মেশনের জন্য)
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="01xxxxxxxxx"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                maxLength={11}
                required
              />
            </div>

            {/* Bill Amount */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                বিলের পরিমাণ (Bill Amount in Taka)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-500 font-bold">৳</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-8 pr-4 py-2.5 text-base font-bold font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  min={10}
                  required
                />
              </div>
            </div>

            {/* Action button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 text-sm sm:text-base transition-transform active:scale-[0.99] cursor-pointer mt-2"
            >
              <FileText className="w-4 h-4" />
              <span>বিল যাচাই ও পরিশোধ করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Side: Instructions & Help */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-indigo-50/60 border border-indigo-200 rounded-2xl p-5 text-xs text-indigo-950">
            <h3 className="font-extrabold text-sm text-indigo-900 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <span>বিল পে করার নিয়মাবলী</span>
            </h3>
            <ul className="space-y-2 list-disc list-inside leading-relaxed text-indigo-900/80">
              <li>বিল পরিশোধের সাথে সাথেই ডিজিটাল রশিদ জেনারেট হবে।</li>
              <li>গ্রাহকের নম্বরে সরকারি বিদ্যুৎ অফিসের সাকসেস এসএমএস চলে যাবে।</li>
              <li>প্রতিটি সফল বিল পে-তে আপনি পাবেন ক্যাশব্যাক পয়েন্ট।</li>
              <li>কোনো কারণে বিল আটকে গেলে তাৎক্ষণিক আমাদের হেল্পলাইনে যোগাযোগ করতে পারবেন।</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <div className="text-center mb-4">
              <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-2">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">বিল পরিশোধ নিশ্চিতকরণ</h3>
              <p className="text-xs text-slate-500">{currentBiller.nameBn}</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-slate-500">গ্রাহক নম্বর:</span>
                <span className="font-bold text-slate-800">{customerPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">মিটার/একাউন্ট:</span>
                <span className="font-mono font-bold text-slate-800">{accountNumber}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-1.5 font-bold">
                <span className="text-slate-700">বিলের পরিমাণ:</span>
                <span className="text-indigo-700 font-mono text-sm">৳{parsedAmount}</span>
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
                className="w-full text-center text-xl tracking-widest font-mono font-bold py-2 bg-slate-100 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500"
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
                onClick={handleConfirmPay}
                disabled={isSubmitting}
                className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-xs"
              >
                {isSubmitting ? 'প্রসেসিং...' : 'বিল পে করুন'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
