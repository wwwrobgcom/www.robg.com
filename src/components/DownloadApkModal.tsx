import React, { useState } from 'react';
import {
  Download,
  Smartphone,
  CheckCircle,
  X,
  QrCode,
  ShieldAlert,
  Info,
  Code,
  Globe,
  Share2,
} from 'lucide-react';
import { useTelecom } from '../context/TelecomContext';

export const DownloadApkModal: React.FC = () => {
  const { isDownloadModalOpen, setIsDownloadModalOpen, setViewMode } = useTelecom();
  const [downloadStarted, setDownloadStarted] = useState(false);

  if (!isDownloadModalOpen) return null;

  const handleDownload = () => {
    setDownloadStarted(true);
    // Create simulated file download
    const blob = new Blob(
      [
        `OM Telecom Android APK (www.om.com)\nVersion: 3.4.2\nPackage: com.om.telecom\nStatus: Verified\nPlatform: Android 7.0+\nServer URL: ${window.location.origin}\nReady to install on your phone.`
      ],
      { type: 'application/octet-stream' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'OM_Telecom_v3.4.apk';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="font-extrabold text-sm sm:text-base">
                মোবাইল অ্যাপ ডাউনলোড (Android APK)
              </h2>
              <p className="text-[11px] text-slate-400">অফিসিয়াল অ্যাপ নাম: www.om.com</p>
            </div>
          </div>
          <button
            onClick={() => setIsDownloadModalOpen(false)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Main Download Card */}
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-white border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-emerald-600/30 flex-shrink-0">
              OM
            </div>
            <div className="text-center sm:text-left flex-1">
              <h3 className="font-extrabold text-slate-900 text-base">
                OM Telecom Official App
              </h3>
              <p className="text-xs font-mono text-emerald-700 font-bold">
                Package: com.om.telecom (www.om.com)
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-[11px] text-slate-500 mt-1">
                <span>ভার্সন: v3.4.2</span>
                <span>•</span>
                <span>সাইজ: 12.4 MB</span>
                <span>•</span>
                <span className="text-emerald-600 font-bold">অটো আপডেট সাপোর্টেড</span>
              </div>
            </div>
          </div>

          {downloadStarted && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>ডাউনলোড শুরু হয়েছে! আপনার নোটিফিকেশন বার চেক করুন।</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="space-y-2">
            <button
              onClick={handleDownload}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 px-4 rounded-xl shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 text-sm transition-transform active:scale-[0.99] cursor-pointer"
            >
              <Download className="w-4 h-4 animate-bounce" />
              <span>Download OM_Telecom_v3.4.apk (12.4 MB)</span>
            </button>

            <button
              onClick={() => {
                setIsDownloadModalOpen(false);
                setViewMode('mobile');
              }}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-200"
            >
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>ওয়েব ব্রাউজারেই লাইভ মোবাইল অ্যাপ মোড টেস্ট করুন</span>
            </button>
          </div>

          {/* How to Build / Setup Guide (for the user) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2">
            <h4 className="font-extrabold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
              <Code className="w-4 h-4 text-purple-600" />
              <span>sadiatelbd.com এর মত ওয়েবসাইট ও অ্যাপ যেভাবে কাজ করে:</span>
            </h4>
            <div className="space-y-1.5 text-slate-600 leading-relaxed">
              <p>
                <strong>১. ওয়েবসাইট আর্কিটেকচার (www.om.com):</strong> আধুনিক React + Tailwind প্রযুক্তি যা যে কোনো ল্যাপটপ, মোবাইল বা ট্যাবলেটে ফাস্ট ওপেন হয়।
              </p>
              <p>
                <strong>২. মোবাইল অ্যাপ (Android APK):</strong> এই ওয়েবসাইটটিকে Android Studio অথবা Capacitor/WebView দিয়ে কনভার্ট করে এক ক্লিকেই <strong>.apk</strong> অ্যাপ ফাইলে রূপান্তর করা হয়।
              </p>
              <p>
                <strong>৩. মডেম বা সিম সার্ভার কানেকশন:</strong> ফ্লেক্সিলোডের জন্য বাংলালিংক/গ্রামীনফোন রিটেইলার সিমের সাথে অটো রোবট/API সার্ভার ইন্টিগ্রেশন করে অটো রিচার্জ এবং ড্রাইভ অ্যাক্টিভ হয়।
              </p>
            </div>
          </div>

          {/* Android Installation Tip */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
            <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">ইন্সটলেশন নির্দেশিকা:</strong>
              APK ডাউনলোড করার পর ফোনে &quot;Install from Unknown Sources / এই উৎস থেকে অ্যাপ ইনস্টল করুন&quot; অপশনটি Allow করলেই অ্যাপটি চালু হয়ে যাবে।
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 text-center text-xs text-slate-500">
          কপিরাইট © ২০২৬ OM Telecom (www.om.com) | সর্বস্বত্ব সংরক্ষিত
        </div>
      </div>
    </div>
  );
};
