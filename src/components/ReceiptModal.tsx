import React, { useRef } from 'react';
import {
  Printer,
  CheckCircle2,
  Clock,
  Share2,
  X,
  FileCheck,
  ShieldCheck,
  Download,
} from 'lucide-react';
import { useTelecom } from '../context/TelecomContext';
import { OPERATORS } from '../data/telecomData';

export const ReceiptModal: React.FC = () => {
  const { selectedReceipt, setSelectedReceipt, user } = useTelecom();
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!selectedReceipt) return null;

  const handlePrint = () => {
    window.print();
  };

  const op = selectedReceipt.operator ? OPERATORS[selectedReceipt.operator] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-sm sm:max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95">
        {/* Top actions */}
        <div className="flex items-center justify-between p-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-extrabold text-xs">
              OM
            </div>
            <span className="font-bold text-sm tracking-wide">
              লেনদেন রশিদ (Digital Receipt)
            </span>
          </div>
          <button
            onClick={() => setSelectedReceipt(null)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Receipt Body */}
        <div ref={receiptRef} className="p-6 bg-white space-y-4">
          <div className="text-center pb-4 border-b border-dashed border-slate-300">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              OM Telecom
            </h2>
            <p className="text-xs font-mono font-bold text-emerald-600">
              www.om.com
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              অটো মাল্টি রিচার্জ ও ড্রাইভ সার্ভার
            </p>
            <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-extrabold px-3 py-1 rounded-full mt-2 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>লেনদেন সফল (TRANSACTION SUCCESSFUL)</span>
            </div>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">ট্রানজেকশন আইডি:</span>
              <span className="font-mono font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                {selectedReceipt.trxId}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500">লেনদেনের ধরণ:</span>
              <span className="font-bold text-slate-800 capitalize">
                {selectedReceipt.details}
              </span>
            </div>

            {selectedReceipt.targetNumber && (
              <div className="flex justify-between items-center">
                <span className="text-slate-500">গ্রাহক নম্বর:</span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {selectedReceipt.targetNumber}
                </span>
              </div>
            )}

            {op && (
              <div className="flex justify-between items-center">
                <span className="text-slate-500">মোবাইল অপারেটর:</span>
                <span
                  className="font-bold text-white text-xs px-2 py-0.5 rounded uppercase"
                  style={{ backgroundColor: op.color }}
                >
                  {op.bengaliName}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="text-slate-500">তারিখ ও সময়:</span>
              <span className="font-medium text-slate-700">
                {selectedReceipt.timestamp}
              </span>
            </div>

            <div className="flex justify-between items-center border-t border-dashed border-slate-300 pt-2.5">
              <span className="text-slate-700 font-bold text-sm">মোট পরিমাণ:</span>
              <span className="font-mono font-extrabold text-lg text-slate-900">
                ৳{selectedReceipt.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>

            {selectedReceipt.commissionEarned !== undefined && selectedReceipt.commissionEarned > 0 && (
              <div className="flex justify-between items-center bg-emerald-50 px-3 py-1.5 rounded-lg text-emerald-700 font-bold text-xs">
                <span>কমিশন অর্জিত:</span>
                <span>+৳{selectedReceipt.commissionEarned}</span>
              </div>
            )}

            <div className="flex justify-between items-center text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              <span>এজেন্ট / রিটেইলার:</span>
              <span className="font-semibold text-slate-700">
                {user.name} ({user.roleBengali})
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-dashed border-slate-300 text-center text-[11px] text-slate-400">
            <p>OM Telecom (www.om.com) সাথে থাকার জন্য ধন্যবাদ!</p>
            <p>যেকোনো প্রয়োজনে হেল্পলাইন: 01888-294710</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>প্রিন্ট / সেভ করুন</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedReceipt(null)}
            className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
