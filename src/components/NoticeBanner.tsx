import React from 'react';
import { Volume2, Bell } from 'lucide-react';
import { useTelecom } from '../context/TelecomContext';
import { INITIAL_NOTICES } from '../data/telecomData';

export const NoticeBanner: React.FC = () => {
  const { setIsNoticeModalOpen } = useTelecom();

  return (
    <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white text-xs sm:text-sm py-2 px-3 shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-shrink-0 font-bold bg-black/20 px-2 py-0.5 rounded-full text-amber-100 text-xs">
          <Volume2 className="w-3.5 h-3.5 animate-pulse text-yellow-300" />
          <span>জরুরী নোটিশ</span>
        </div>

        {/* Marquee Ticker */}
        <div
          onClick={() => setIsNoticeModalOpen(true)}
          className="overflow-hidden cursor-pointer whitespace-nowrap flex-1 hover:underline"
          title="সম্পূর্ণ নোটিশ পড়তে ক্লিক করুন"
        >
          <div className="inline-block animate-[marquee_25s_linear_infinite]">
            {INITIAL_NOTICES.map((n, i) => (
              <span key={n.id} className="mx-4 font-medium">
                ⚡ <strong className="text-yellow-200">{n.title}:</strong> {n.body}
                {i < INITIAL_NOTICES.length - 1 && '  |  '}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsNoticeModalOpen(true)}
          className="flex-shrink-0 flex items-center gap-1 bg-white text-orange-700 hover:bg-orange-50 px-2.5 py-1 rounded text-xs font-semibold shadow-xs transition-transform active:scale-95"
        >
          <Bell className="w-3 h-3 text-orange-600" />
          <span>সকল নোটিশ</span>
        </button>
      </div>
    </div>
  );
};
