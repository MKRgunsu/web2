'use client';

import React, { useState } from 'react';
import { Megaphone, Info, AlertCircle, Clock, X, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface TopBannerProps {
  type?: 'none' | 'normal' | 'trip' | 'cs' | 'temp' | string;
  message: string;
  link?: string;
  linkType?: 'internal' | 'external';
  buttonText?: string;
  showButton?: boolean;
  color?: string;
}

export default function TopBanner({
  type = 'normal',
  message,
  link,
  linkType = 'external',
  buttonText = '더 알아보기',
  showButton = false,
  color
}: TopBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (type === 'none' || !isVisible) return null;

  const config = {
    normal: { icon: <Megaphone size={14} />, bg: 'bg-[#3D3835]', text: 'text-white' },
    trip: { icon: <Clock size={14} />, bg: 'bg-amber-100', text: 'text-amber-900' },
    cs: { icon: <Info size={14} />, bg: 'bg-[#FFF5F5]', text: 'text-[#991717]' },
    temp: { icon: <AlertCircle size={14} />, bg: 'bg-[#B31B1B]', text: 'text-white' }
  };

  const style = config[color as keyof typeof config] || config[type as keyof typeof config] || config.normal;

  const content = (
    <div className="flex-1 flex items-center justify-center gap-2 px-2">
      <div className="opacity-70 animate-pulse hidden md:block">{style.icon}</div>
      <span className="whitespace-pre-wrap tracking-tight break-keep leading-relaxed">{message}</span>
      {showButton && link && (
        <span className="hidden md:inline-flex items-center gap-1 ml-2 text-[10px] font-bold underline opacity-80 decoration-1 underline-offset-2">
          {buttonText}
          {linkType === 'external' ? <ExternalLink size={10} /> : <ArrowRight size={10} />}
        </span>
      )}
    </div>
  );

  return (
    <div className={`${style.bg} ${style.text} w-full py-3 px-4 md:px-6 flex items-center justify-between text-center text-[11px] font-bold z-[60] shadow-sm animate-reveal relative transition-colors duration-500 min-h-[48px]`}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsVisible(false);
        }}
        className="md:order-last opacity-60 hover:opacity-100 transition-opacity p-3 -ml-2 md:ml-0 md:-mr-2 shrink-0 rounded-full hover:bg-black/5 active:scale-95"
        aria-label="배너 닫기"
      >
        <X size={16} />
      </button>

      {link ? (
        linkType === 'external' ? (
          <a href={link} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center cursor-pointer">
            {content}
          </a>
        ) : (
          <Link href={link.startsWith('/') ? link : `/notice/${link}`} className="flex-1 flex items-center justify-center cursor-pointer">
            {content}
          </Link>
        )
      ) : (
        <div className="flex-1 flex items-center justify-center">
          {content}
        </div>
      )}

      <div className="w-8 md:hidden"></div>
    </div>
  );
}
