import React from 'react';
import { Bell, Volume2, X, Calendar, AlertCircle } from 'lucide-react';
import { useTelecom } from '../context/TelecomContext';
import { INITIAL_NOTICES } from '../data/telecomData';

export const NoticeModal: React.FC = () => {
  const { isNoticeModalOpen, setIsNoticeModalOpen } = useTelecom();

  if (!isNoticeModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 max-h-[85vh] flex flex-col">
        <div className="p-4 bg-amber-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-100" />
            <h2 className="font-extrabold text-base">নোটিশ বোর্ড (Notice Board)</h2>
          </div>
          <button
            onClick={() => setIsNoticeModalOpen(false)}
            className="text-amber-100 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4">
          {INITIAL_NOTICES.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border ${
                item.isImportant
                  ? 'bg-amber-50/70 border-amber-300'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                  {item.isImportant && (
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  )}
                  {item.title}
                </span>
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className="p-3 bg-slate-100 border-t border-slate-200 text-right">
          <button
            onClick={() => setIsNoticeModalOpen(false)}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
          >
            ঠিক আছে
          </button>
        </div>
      </div>
    </div>
  );
};
