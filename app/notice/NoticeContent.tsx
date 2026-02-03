'use client';

import React from 'react';
import { Calendar, ArrowLeft, Share2, MessageSquare, Info } from 'lucide-react';
import { AdminState, ContentItem } from '@/types/admin';
import Link from 'next/link';

interface NoticeContentProps {
    id: string;
    adminState: AdminState;
}

export default function NoticeContent({ id, adminState }: NoticeContentProps) {
    const notices = adminState?.content?.noticeBoard || [];
    const notice = notices.find(item => item.id === parseInt(id));

    if (!notice) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#FCF9F5]">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 text-gray-400">
                    <Info size={32} />
                </div>
                <h1 className="text-2xl font-black text-charcoal mb-2">공지사항을 찾을 수 없습니다</h1>
                <p className="text-gray-500 mb-8">요청하신 공지사항이 삭제되었거나 잘못된 접근입니다.</p>
                <Link href="/" className="px-8 py-3 bg-[#1D1D1F] text-white rounded-xl font-bold hover:scale-105 transition-all">
                    홈으로 돌아가기
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[#FCF9F5] min-h-screen pb-40">
            {/* Header bar */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-screen-md mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="p-2 -ml-2 text-gray-500 hover:text-charcoal transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <span className="text-xs font-black uppercase tracking-widest text-charcoal/40">Notice</span>
                    <button className="p-2 -mr-2 text-gray-500 hover:text-charcoal transition-colors">
                        <Share2 size={20} />
                    </button>
                </div>
            </div>

            <article className="max-w-screen-md mx-auto px-6 pt-12 animate-reveal">
                {/* Title Section */}
                <header className="space-y-6 mb-12">
                    <div className="flex items-center gap-2 text-[10px] font-black text-[#E62727] uppercase tracking-[0.2em]">
                        <MessageSquare size={12} />
                        <span>Official Announcement</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-charcoal leading-tight tracking-tight break-keep">
                        {notice.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-400 font-medium">
                        <div className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-[#E62727]/40" />
                            {notice.date || new Date().toISOString().split('T')[0]}
                        </div>
                        <div className="w-1 h-1 bg-gray-200 rounded-full" />
                        <div>관리자</div>
                    </div>
                </header>

                {/* Content Section */}
                <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-50 mb-12">
                    <div
                        className="prose prose-lg max-w-none text-gray-700 leading-relaxed break-keep font-medium
              prose-headings:font-black prose-headings:text-charcoal prose-headings:tracking-tight
              prose-p:mb-6 prose-strong:text-[#E62727] prose-strong:font-black"
                    >
                        {notice.text ? (
                            notice.text.split('\n').map((line, i) => (
                                <React.Fragment key={i}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))
                        ) : (
                            <p className="text-gray-400 italic">내용이 없습니다.</p>
                        )}
                    </div>
                </div>

                {/* Footer actions */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#1D1D1F] rounded-full flex items-center justify-center text-white font-black text-xs">
                            YP
                        </div>
                        <div>
                            <p className="text-sm font-black text-charcoal">유어포스트 팀</p>
                            <p className="text-xs text-gray-500 font-medium">디지털 시대를 위한 아날로그 편지</p>
                        </div>
                    </div>
                    <Link
                        href="/"
                        className="w-full md:w-auto px-10 py-4 bg-[#F5F0E8] text-charcoal rounded-[20px] text-sm font-black hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                    >
                        목록으로 보기
                    </Link>
                </div>
            </article>
        </div>
    );
}
