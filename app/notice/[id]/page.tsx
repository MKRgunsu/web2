import React from 'react';
import { getCMSData } from '@/lib/supabase';
import NoticeContent from '../NoticeContent';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const adminState = await getCMSData();
    const notices = adminState?.content?.noticeBoard || [];
    const notice = notices.find(item => item.id === parseInt(id));

    return {
        title: notice?.title || '공지사항',
        description: notice?.text?.substring(0, 100) || '유어포스트의 새로운 소식을 전해드립니다.',
    };
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const adminState = await getCMSData();

    return <NoticeContent id={id} adminState={adminState} />;
}
