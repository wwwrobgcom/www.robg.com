import React from 'react';
import {
  Smartphone,
  ShieldCheck,
  Headphones,
  Mail,
  MapPin,
  Lock,
  Download,
} from 'lucide-react';
import { useTelecom } from '../context/TelecomContext';

export const Footer: React.FC = () => {
  const {
    setIsDownloadModalOpen,
    setIsSupportModalOpen,
    setIsNoticeModalOpen,
    setViewMode,
  } = useTelecom();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-extrabold text-base shadow-md">
                OM
              </div>
              <div>
                <span className="font-extrabold text-white text-base block">
                  OM Telecom
                </span>
                <span className="text-[11px] font-mono text-emerald-400">
                  www.om.com
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              অনলাইন মাল্টি রিচার্জ, স্পেশাল ড্রাইভ অফার ও ইউটিলিটি বিল পে-এর নির্ভরযোগ্য প্ল্যাটফর্ম। দেশের যেকোনো প্রান্ত থেকে ২৪ ঘণ্টা নিরবচ্ছিন্ন সেবা।
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setIsDownloadModalOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>অ্যান্ড্রয়েড অ্যাপ (APK)</span>
              </button>
            </div>
          </div>

          {/* Quick Services */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-white text-sm">আমাদের সেবাসমূহ</h4>
            <ul className="space-y-1.5">
              <li>• অল অপারেটর ফ্লেক্সিলোড (GP, BL, Robi, Airtel, Teletalk)</li>
              <li>• স্পেশাল ইন্টারনেট ও মিনিট ড্রাইভ প্যাক</li>
              <li>• পল্লী বিদ্যুৎ, ডেসকো, ডিপিডিসি বিল পরিশোধ</li>
              <li>• অটো ব্যালেন্স অ্যাড (bKash, Nagad, Rocket, Upay)</li>
              <li>• রিসেলার ও ডিলারশিপ একাউন্ট ম্যানেজমেন্ট</li>
            </ul>
          </div>

          {/* Supported Operators */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-white text-sm">সাপোর্টেড অপারেটর ও ওয়ালেট</h4>
            <div className="flex flex-wrap gap-1.5">
              {['Grameenphone', 'Banglalink', 'Robi', 'Airtel', 'Teletalk', 'Skitto'].map((op) => (
                <span key={op} className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-[11px] font-semibold border border-slate-700">
                  {op}
                </span>
              ))}
            </div>
            <div className="pt-2">
              <span className="block text-[11px] text-slate-400 mb-1">পেমেন্ট গেটওয়ে:</span>
              <div className="flex flex-wrap gap-1.5">
                {['bKash', 'Nagad', 'Rocket', 'Upay', 'Bank Transfer'].map((m) => (
                  <span key={m} className="bg-slate-800/80 text-emerald-400 px-2 py-0.5 rounded text-[11px] font-mono border border-slate-700">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-white text-sm">যোগাযোগ ও হেল্পলাইন</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>হটলাইন: 01888-294710 (24/7)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>support@om.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>ঢাকা, বাংলাদেশ</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Lock className="w-4 h-4 flex-shrink-0" />
                <span>SSL 256-bit সুরক্ষিত অটো সার্ভার</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            কপিরাইট © ২০২৬ <strong>OM Telecom (www.om.com)</strong>। সর্বস্বত্ব সংরক্ষিত। Inspired by sadiatelbd.com.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewMode('web')}
              className="hover:text-slate-300 transition-colors"
            >
              ওয়েব পোর্টাল
            </button>
            <span>•</span>
            <button
              onClick={() => setViewMode('mobile')}
              className="hover:text-slate-300 transition-colors"
            >
              মোবাইল অ্যাপ মোড
            </button>
            <span>•</span>
            <button
              onClick={() => setIsSupportModalOpen(true)}
              className="hover:text-slate-300 transition-colors"
            >
              হেল্পলাইন
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
