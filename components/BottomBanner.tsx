'use client';

import React, { useState, useEffect } from 'react';
import { X, Bell, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface BottomBannerProps {
    message: string;
    link?: string;
    linkType?: 'internal' | 'external';
    buttonText?: string;
    showButton?: boolean;
    color?: string;
}

export default function BottomBanner({
    message,
    link,
    linkType = 'external',
    buttonText = '자세히 보기',
    showButton = false,
    color = 'burgundy'
}: BottomBannerProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // 1.5초 후 부드럽게 등장
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    const colorStyles = {
        burgundy: {
            bg: 'bg-white/90',
            border: 'border-red-100',
            iconBg: 'bg-red-50',
            iconColor: 'text-[#E62727]',
            btnBg: 'bg-[#E62727]',
            btnText: 'text-white'
        },
        charcoal: {
            bg: 'bg-white/90',
            border: 'border-gray-200',
            iconBg: 'bg-gray-100',
            iconColor: 'text-gray-800',
            btnBg: 'bg-gray-800',
            btnText: 'text-white'
        }
    };

    const style = colorStyles[color as keyof typeof colorStyles] || colorStyles.burgundy;

    return (
        <div className="fixed z-[90] bottom-4 left-4 right-4 md:left-8 md:right-auto md:bottom-8 animate-reveal">
            <div className={`${style.bg} backdrop-blur-xl p-5 md:p-6 rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.12)] border ${style.border} max-w-sm w-full md:w-[320px] transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] group`}>
                {/* 닫기 버튼 */}
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="닫기"
                >
                    <X size={16} />
                </button>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${style.iconBg} ${style.iconColor} rounded-xl flex items-center justify-center`}>
                            <Bell size={18} className="group-hover:animate-bounce" />
                        </div>
                        <div className="flex flex-col">
                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${style.iconColor}`}>Announcement</span>
                            <div className="flex items-center gap-1.5">
                                <span className="text-sm font-bold text-gray-900">공지사항</span>
                                <Sparkles size={12} className="text-amber-400" />
                            </div>
                        </div>
                    </div>

                    <p className="text-[15px] font-medium text-gray-700 leading-relaxed break-keep">
                        {message}
                    </p>

                    {showButton && link && (
                        <div className="pt-2">
                            {linkType === 'external' ? (
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-full ${style.btnBg} ${style.btnText} py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-red-100/50`}
                                >
                                    {buttonText}
                                    <ExternalLink size={14} />
                                </a>
                            ) : (
                                <Link
                                    href={`/notice/${link}`}
                                    className={`w-full ${style.btnBg} ${style.btnText} py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-red-100/50`}
                                >
                                    {buttonText}
                                    <ArrowRight size={14} />
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
