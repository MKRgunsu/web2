import React from 'react';
import { Metadata } from 'next';
import { getCMSData } from '@/lib/supabase';
import Link from 'next/link';
import { ArrowRight, Calendar, MessageSquare, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
    title: '공지사항 | Your Post',
    description: '유어포스트의 새로운 소식과 안내사항을 확인하세요.',
};

export const dynamic = 'force-dynamic';

export default async function NoticeListPage() {
    const adminState = await getCMSData();
    const notices = adminState?.content?.noticeBoard || [];

    // 최신순 정렬
    const sortedNotices = [...notices].sort((a, b) => (b.id || 0) - (a.id || 0));

    return (
        <div className="bg-[#FCF9F5] min-h-screen pb-40">
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 text-center max-w-screen-xl mx-auto space-y-6">
                <span className="text-[#991717] font-black text-[10px] tracking-[0.3em] uppercase">Notice</span>
                <h1 className="text-4xl md:text-7xl font-black text-charcoal tracking-tighter leading-tight">
                    새로운 <span className="text-[#991717]">소식.</span>
                </h1>
                <p className="text-base md:text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed break-keep">
                    유어포스트의 공지사항과 업데이트 소식을 전해드립니다.
                </p>
            </section>

            {/* List Section */}
            <div className="max-w-screen-md mx-auto px-6 space-y-4">
                {sortedNotices.length > 0 ? (
                    sortedNotices.map((notice) => (
                        <Link
                            key={notice.id}
                            href={`/notice/${notice.id}`}
                            className="group bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex justify-between items-center"
                        >
                            <div className="space-y-3 flex-1 pr-4">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <Calendar size={12} className="text-[#991717]" />
                                    {notice.date || '2026-02-03'}
                                </div>
                                <h2 className="text-lg md:text-xl font-bold text-charcoal group-hover:text-[#991717] transition-colors line-clamp-1">
                                    {notice.title}
                                </h2>
                                <p className="text-sm text-gray-500 line-clamp-1 opacity-70">
                                    {notice.text}
                                </p>
                            </div>
                            <ChevronRight size={20} className="text-gray-300 group-hover:text-[#991717] group-hover:translate-x-1 transition-all" />
                        </Link>
                    ))
                ) : (
                    <div className="py-40 text-center border-2 border-dashed border-gray-200 rounded-[40px]">
                        <MessageSquare size={48} className="mx-auto text-gray-200 mb-4" />
                        <p className="text-gray-400 font-bold">등록된 공지사항이 없습니다.</p>
                    </div>
                )}
            </div>

            {/* Footer Link */}
            <div className="max-w-screen-md mx-auto px-6 pt-12 flex justify-center">
                <Link href="/" className="text-sm font-bold text-gray-400 hover:text-charcoal transition-colors flex items-center gap-2">
                    홈으로 돌아가기 <ArrowRight size={14} />
                </Link>
            </div>
        </div>
    );
}
