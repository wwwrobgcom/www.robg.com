import React, { useState } from 'react';
import {
  History,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Smartphone,
  Flame,
  Zap,
  CreditCard,
  ArrowRightLeft,
} from 'lucide-react';
import { useTelecom } from '../context/TelecomContext';
import { OPERATORS } from '../data/telecomData';
import { Transaction, TransactionType } from '../types/telecom';

export const HistoryView: React.FC = () => {
  const { transactions, setSelectedReceipt } = useTelecom();

  const [activeFilter, setActiveFilter] = useState<'all' | TransactionType>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter((tx) => {
    const matchType = activeFilter === 'all' || tx.type === activeFilter;
    const matchSearch =
      tx.trxId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.targetNumber && tx.targetNumber.includes(searchTerm)) ||
      tx.details.toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-300">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            <span>সফল (Success)</span>
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-300 animate-pulse">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>প্রসেসিং (Processing)</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-[11px] font-bold px-2 py-0.5 rounded-full border border-blue-300">
            <Clock className="w-3 h-3 text-blue-600" />
            <span>অপেক্ষমান</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
            <AlertCircle className="w-3 h-3 text-rose-600" />
            <span>ব্যর্থ</span>
          </span>
        );
    }
  };

  const getTypeIcon = (type: TransactionType) => {
    switch (type) {
      case 'recharge':
        return <Zap className="w-4 h-4 text-emerald-600" />;
      case 'drive':
        return <Flame className="w-4 h-4 text-rose-600" />;
      case 'bill_pay':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'add_balance':
        return <CreditCard className="w-4 h-4 text-amber-600" />;
      case 'transfer':
        return <ArrowRightLeft className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-slate-800 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full mb-2">
              <History className="w-3.5 h-3.5" />
              <span>লাইভ লেনদেন খতিয়ান</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              ট্রানজেকশন হিস্টোরি (Transaction History)
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              আপনার একাউন্ট থেকে সম্পন্ন হওয়া সকল রিচার্জ, ড্রাইভ প্যাক, বিল পে ও ব্যালেন্স ট্রানজেকশনের বিস্তারিত বিবরণ।
            </p>
          </div>
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-right">
            <span className="text-[11px] text-slate-400 block">মোট ট্রানজেকশন:</span>
            <span className="text-lg font-mono font-extrabold text-emerald-400">
              {transactions.length} টি
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'সকল লেনদেন' },
            { id: 'recharge', label: 'ফ্লেক্সিলোড / রিচার্জ' },
            { id: 'drive', label: 'স্পেশাল ড্রাইভ' },
            { id: 'bill_pay', label: 'ইউটিলিটি বিল পে' },
            { id: 'add_balance', label: 'ব্যালেন্স অ্যাড' },
            { id: 'transfer', label: 'ব্যালেন্স ট্রান্সফার' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeFilter === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="TrxID, মোবাইল নম্বর বা বিবরণ দিয়ে সার্চ করুন..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Transactions List / Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredTransactions.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                className="p-4 sm:p-5 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5 border border-slate-200">
                    {getTypeIcon(tx.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-mono text-xs font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                        {tx.trxId}
                      </span>
                      {getStatusBadge(tx.status)}
                      {tx.operator && (
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase shadow-2xs"
                          style={{ backgroundColor: OPERATORS[tx.operator]?.color || '#10b981' }}
                        >
                          {OPERATORS[tx.operator]?.bengaliName}
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-slate-800">
                      {tx.details}
                    </div>
                    {tx.targetNumber && (
                      <div className="text-xs text-slate-500 font-mono mt-0.5">
                        প্রাপক: <strong>{tx.targetNumber}</strong>
                      </div>
                    )}
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {tx.timestamp}
                    </div>
                  </div>
                </div>

                {/* Amount, Commission & Receipt Button */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                  <div className="text-left sm:text-right">
                    <div className="font-extrabold text-base text-slate-900 font-mono">
                      ৳{tx.amount}
                    </div>
                    {tx.commissionEarned !== undefined && tx.commissionEarned > 0 && (
                      <div className="text-[11px] text-emerald-600 font-bold">
                        কমিশন: +৳{tx.commissionEarned}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedReceipt(tx)}
                    className="mt-1 sm:mt-2 text-xs font-bold text-slate-700 hover:text-emerald-600 bg-slate-100 hover:bg-emerald-50 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>রশিদ দেখুন</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h4 className="font-bold text-slate-700">কোন লেনদেন পাওয়া যায়নি</h4>
            <p className="text-xs text-slate-500 mt-1">
              অন্য কোনো ক্যাটাগরি অথবা সার্চ কি-ওয়ার্ড দিয়ে চেষ্টা করুন
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
