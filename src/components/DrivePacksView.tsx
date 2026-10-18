import React, { useState } from 'react';
import {
  Flame,
  Search,
  Filter,
  CheckCircle,
  Tag,
  Zap,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Gift,
} from 'lucide-react';
import { useTelecom } from '../context/TelecomContext';
import { OPERATORS } from '../data/telecomData';
import { DriveOffer, OperatorId } from '../types/telecom';

interface DrivePacksViewProps {
  onSuccess?: () => void;
}

export const DrivePacksView: React.FC<DrivePacksViewProps> = ({ onSuccess }) => {
  const { driveOffers, user, processDrivePurchase } = useTelecom();

  const [selectedOperator, setSelectedOperator] = useState<string>('all');
  const [selectedDivision, setSelectedDivision] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Purchase modal states
  const [activeOffer, setActiveOffer] = useState<DriveOffer | null>(null);
  const [recipientPhone, setRecipientPhone] = useState('');
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter offers
  const filteredOffers = driveOffers.filter((offer) => {
    const matchOp = selectedOperator === 'all' || offer.operator === selectedOperator;
    const matchDiv = selectedDivision === 'All' || offer.division === 'All' || offer.division === selectedDivision;
    const matchSearch =
      offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchOp && matchDiv && matchSearch;
  });

  const handleOpenPurchase = (offer: DriveOffer) => {
    setActiveOffer(offer);
    setRecipientPhone('');
    setPin('');
    setErrorMsg('');
  };

  const handleConfirmPurchase = () => {
    if (!activeOffer) return;

    const cleanNum = recipientPhone.replace(/\s+/g, '');
    if (cleanNum.length < 11) {
      setErrorMsg('সঠিক ১১ ডিজিটের গ্রাহক মোবাইল নম্বর লিখুন');
      return;
    }

    if (!pin) {
      setErrorMsg('৪ ডিজিটের পিন নম্বর লিখুন');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      const result = processDrivePurchase({
        offerId: activeOffer.id,
        phoneNumber: cleanNum,
        pin,
      });

      setIsSubmitting(false);

      if (result.success) {
        setActiveOffer(null);
        if (onSuccess) onSuccess();
      } else {
        setErrorMsg(result.message);
      }
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white rounded-2xl p-5 sm:p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-black/20 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full mb-2">
            <Flame className="w-3.5 h-3.5 fill-yellow-400" />
            <span>লাইভ অটো ড্রাইভ সার্ভার - www.om.com</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            আজকের স্পেশাল ড্রাইভ অফার (Special Drive Packs)
          </h1>
          <p className="text-rose-100 text-xs sm:text-sm mt-1 max-w-2xl">
            প্রতিটি ড্রাইভে পাবেন সর্বোচ্চ ক্যাশব্যাক কমিশন (৳১৫০ থেকে ৳৩৫০ পর্যন্ত)। 
            অর্ডার দেওয়ার ১ থেকে ৫ মিনিটের মধ্যে অটোমেটিক কাস্টমারের নম্বরে অ্যাক্টিভ হবে।
          </p>
        </div>
        <div className="absolute right-3 -bottom-6 opacity-15 pointer-events-none">
          <Flame className="w-48 h-48 text-white" />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
        {/* Operator selection pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedOperator('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedOperator === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            সকল অপারেটর
          </button>
          {(Object.keys(OPERATORS) as OperatorId[]).map((opKey) => {
            const op = OPERATORS[opKey];
            const isSelected = selectedOperator === opKey;
            return (
              <button
                key={opKey}
                onClick={() => setSelectedOperator(opKey)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'text-white shadow-xs ring-2 ring-offset-1'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                style={{
                  backgroundColor: isSelected ? op.color : undefined,
                }}
              >
                <span>{op.logoText}</span>
                <span>{op.bengaliName}</span>
              </button>
            );
          })}
        </div>

        {/* Division and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Division selector */}
          <div className="w-full sm:w-auto flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              বিভাগ:
            </span>
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">সারা বাংলাদেশ (All BD)</option>
              <option value="Dhaka">ঢাকা বিভাগ (Dhaka)</option>
              <option value="Chittagong">চট্টগ্রাম বিভাগ (Chittagong)</option>
              <option value="Rajshahi">রাজশাহী বিভাগ (Rajshahi)</option>
              <option value="Khulna">খুলনা বিভাগ (Khulna)</option>
              <option value="Sylhet">সিলেট বিভাগ (Sylhet)</option>
            </select>
          </div>

          {/* Search box */}
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="প্যাক খুঁজুন (যেমন: 50GB, 1000 Min, 30 Days)..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOffers.length > 0 ? (
          filteredOffers.map((offer) => {
            const op = OPERATORS[offer.operator];
            return (
              <div
                key={offer.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top operator accent stripe */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: op.color }}
                ></div>

                <div>
                  {/* Header badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="px-2.5 py-0.5 rounded-lg text-white font-extrabold text-[11px] shadow-xs uppercase"
                      style={{ backgroundColor: op.color }}
                    >
                      {op.bengaliName}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="bg-slate-100 text-slate-600 text-[11px] font-semibold px-2 py-0.5 rounded-md">
                        {offer.division === 'All' ? 'সারা দেশ' : offer.division}
                      </span>
                      {offer.tag && (
                        <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-md border border-amber-300">
                          {offer.tag}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-extrabold text-slate-900 text-base mb-1 group-hover:text-emerald-700 transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
                    {offer.description}
                  </p>
                </div>

                {/* Price & Cashback Box */}
                <div>
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-3 mb-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-500">অপারেটর রেগুলার মূল্য:</span>
                      <span className="line-through text-slate-400 font-mono">
                        ৳{offer.regularPrice}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-slate-700 font-bold">ড্রাইভ রেট:</span>
                      <span className="font-extrabold text-lg text-slate-900 font-mono">
                        ৳{offer.offerPrice}
                      </span>
                    </div>

                    {/* Massive Cashback / Commission Banner */}
                    <div className="flex items-center justify-between bg-emerald-600 text-white px-2.5 py-1.5 rounded-lg text-xs font-bold shadow-xs">
                      <span className="flex items-center gap-1">
                        <Gift className="w-3.5 h-3.5 text-yellow-300" />
                        <span>কমিশন / ক্যাশব্যাক:</span>
                      </span>
                      <span className="text-sm text-yellow-300 font-extrabold font-mono">
                        ৳{offer.cashback}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    type="button"
                    onClick={() => handleOpenPurchase(offer)}
                    className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold py-2.5 px-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs active:scale-[0.98] cursor-pointer"
                  >
                    <span>ড্রাইভ কিনুন (Order Pack)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-200">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h4 className="font-bold text-slate-700">কোন ড্রাইভ অফার পাওয়া যায়নি</h4>
            <p className="text-xs text-slate-500 mt-1">
              অন্য কোনো অপারেটর বা বিভাগ নির্বাচন করে চেষ্টা করুন
            </p>
          </div>
        )}
      </div>

      {/* Drive Purchase Confirmation Modal */}
      {activeOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: OPERATORS[activeOffer.operator].color }}
                >
                  {OPERATORS[activeOffer.operator].logoText}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    ড্রাইভ প্যাক অর্ডার কনফার্মেশন
                  </h3>
                  <p className="text-[11px] text-slate-500">www.om.com ড্রাইভ গেটওয়ে</p>
                </div>
              </div>
              <button
                onClick={() => setActiveOffer(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Offer details card */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4 space-y-2 text-xs sm:text-sm">
              <div className="font-extrabold text-slate-900">{activeOffer.title}</div>
              <div className="text-xs text-slate-600">{activeOffer.description}</div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                <div>
                  <span className="text-slate-500 text-xs block">প্যাক মূল্য:</span>
                  <span className="font-extrabold text-slate-900 text-base">
                    ৳{activeOffer.offerPrice}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-emerald-600 text-xs font-bold block">আপনার ক্যাশব্যাক:</span>
                  <span className="font-extrabold text-emerald-600 text-base">
                    +৳{activeOffer.cashback}
                  </span>
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-4 mb-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  গ্রাহকের {OPERATORS[activeOffer.operator].bengaliName} নম্বর (Customer Phone Number)
                </label>
                <input
                  type="tel"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  placeholder="01xxxxxxxxx"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-mono font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  maxLength={11}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  আপনার ৪ ডিজিটের পিন (Default: 1234)
                </label>
                <input
                  type="password"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-center text-lg tracking-widest font-mono font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveOffer(null)}
                disabled={isSubmitting}
                className="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={handleConfirmPurchase}
                disabled={isSubmitting}
                className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/30 flex items-center justify-center gap-1.5 transition-all"
              >
                {isSubmitting ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>অর্ডার নিশ্চিত করুন</span>
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
