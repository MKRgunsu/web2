'use client';

import React, { useState, useEffect } from 'react';
import { X, Bell, ExternalLink, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface PopupProps {
  title: string;
  message: string;
  link?: string;
  linkType?: 'internal' | 'external';
  buttonText?: string;
  showButton?: boolean;
}

export default function Popup({
  title,
  message,
  link,
  linkType = 'external',
  buttonText = '더 알아보기',
  showButton = false
}: PopupProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!isVisible && Math.abs(currentScrollY - lastScrollY) > 500) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, lastScrollY]);

  if (!isVisible) return null;

  return (
    <div className="fixed z-[70] inset-0 flex items-center justify-center md:inset-auto md:bottom-6 md:left-6 md:block">
      <div
        className="absolute inset-0 bg-black/50 md:hidden"
        onClick={() => setIsVisible(false)}
        aria-hidden="true"
      />

      <div className="relative w-[calc(100%-32px)] max-w-sm md:w-72 bg-white rounded-2xl shadow-2xl overflow-hidden animate-reveal">
        <div className="h-1 bg-[#991717]" />

        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-burgundy-50 text-[#991717] rounded-lg flex items-center justify-center flex-shrink-0">
                <Bell size={16} />
              </div>
              <span className="text-xs font-bold text-[#991717] uppercase tracking-wide">공지</span>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mr-1 -mt-1"
              aria-label="닫기"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-2 mb-4">
            <h4 className="font-bold text-base text-[#1D1D1F] leading-snug break-keep">
              {title}
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed break-keep">
              {message}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {showButton && link && (
              linkType === 'external' ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#991717] text-white py-2.5 rounded-xl text-sm font-semibold hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  {buttonText} <ExternalLink size={14} />
                </a>
              ) : (
                <Link
                  href={link.startsWith('/') ? link : `/notice/${link}`}
                  onClick={() => setIsVisible(false)}
                  className="w-full bg-[#991717] text-white py-2.5 rounded-xl text-sm font-semibold hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  {buttonText} <ArrowRight size={14} />
                </Link>
              )
            )}
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${showButton && link ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-[#1D1D1F] text-white hover:bg-black'}`}
            >
              {showButton && link ? '닫기' : '확인'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
