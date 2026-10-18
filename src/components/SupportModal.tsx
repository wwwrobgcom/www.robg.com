import React from 'react';
import {
  Headphones,
  PhoneCall,
  MessageCircle,
  Send,
  Mail,
  MapPin,
  Clock,
  X,
  ExternalLink,
} from 'lucide-react';
import { useTelecom } from '../context/TelecomContext';

export const SupportModal: React.FC = () => {
  const { isSupportModalOpen, setIsSupportModalOpen } = useTelecom();

  if (!isSupportModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95">
        <div className="p-4 bg-emerald-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Headphones className="w-5 h-5 text-emerald-200" />
            <h2 className="font-extrabold text-base">২৪/৭ কাস্টমার সাপোর্ট সেন্টার</h2>
          </div>
          <button
            onClick={() => setIsSupportModalOpen(false)}
            className="text-emerald-200 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs sm:text-sm">
          <p className="text-slate-600 leading-relaxed">
            OM Telecom (www.om.com) পরিবারের গ্রাহক ও রিসেলারদের যে কোনো সহযোগিতার জন্য আমাদের সাপোর্ট টিম সর্বদা প্রস্তুত রয়েছে।
          </p>

          <div className="space-y-2.5">
            {/* WhatsApp */}
            <a
              href="https://wa.me/8801888294710"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 group-hover:text-emerald-800">
                    হোয়াটসঅ্যাপ হেল্পলাইন (WhatsApp)
                  </h4>
                  <p className="font-mono text-emerald-700 font-bold">+880 1888-294710</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-emerald-600" />
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/omtelecombd"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl border border-sky-200 bg-sky-50 hover:bg-sky-100 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 group-hover:text-sky-800">
                    টেলিগ্রাম অফিশিয়াল চ্যানেল (Telegram)
                  </h4>
                  <p className="font-mono text-sky-700 font-bold">@omtelecombd</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-sky-600" />
            </a>

            {/* Direct Phone */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold">
                <PhoneCall className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900">জরুরী হটলাইন নাম্বার</h4>
                <p className="font-mono text-slate-800 font-bold">01700-000000 / 01888-294710</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900">ইমেইল সাপোর্ট</h4>
                <p className="font-mono text-slate-700">support@om.com / engrgopalsaha@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>সার্ভিস সময়: ২৪ ঘণ্টা (অটোমেটিক)</span>
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>ঢাকা, বাংলাদেশ</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
