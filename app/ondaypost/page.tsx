import React from 'react';
import { Metadata } from 'next';
import OndayContent from './OndayContent';
import { getCMSData } from '@/lib/supabase';

export const metadata: Metadata = {
  title: '하루편지 - 화면이 아닌, 손으로 느끼는 위로 | Your Post',
  description: '편지는 꺼내 읽는 순간과, 남겨두었다가 다시 읽는 순간까지, 두 번의 감동을 줍니다. 매주 한 통씩 배송되는 프리미엄 편지 구독 서비스. 월 9,900원.',
  keywords: ['하루편지', 'ondaypost', '정기구독', '편지서비스', '편지구독', '아날로그감성', '월간구독', '에세이', '편지', '감성편지', '작가', '정기구독편지', '위로', '힐링'],
  openGraph: {
    title: '하루편지 - 화면이 아닌, 손으로 느끼는 위로',
    description: '천천히 다가와, 마음 속에 오래 머무는 편지. 매주 한 통씩 배송되는 프리미엄 편지 구독 서비스.',
    type: 'website',
    url: 'https://yourpost.co.kr/ondaypost',
  }
};

export default async function OndayPostPage() {
  const adminState = await getCMSData();
  return <OndayContent adminState={adminState} />;
}