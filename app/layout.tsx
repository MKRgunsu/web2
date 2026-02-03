import type { Metadata } from 'next';
import './globals.css';
import bannerImg from './images/banner_official.png';
import logoImg from './images/YourPost Logo.png';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Header from '../components/Header';
import Footer from '../components/Footer';
import TopBanner from '../components/TopBanner';
import BottomBanner from '../components/BottomBanner';
import Popup from '../components/Popup';
import CookieConsent from '../components/CookieConsent';
import { getCMSData } from '@/lib/supabase';

// 동적 렌더링 강제 (빌드 타임 fetch 방지 - 404 에러 해결)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    default: '유어포스트 | Your Post - 아날로그 감성 편지 플랫폼',
    template: '%s | 유어포스트'
  },
  description: '하루편지, 하트센드, 기업용 B2B 레터 서비스. 디지털 시대에 전하는 가장 정중한 마음, 유어포스트입니다.',
  keywords: ['편지', '아날로그', '하루편지', '하트센드', '유어포스트', '편지구독', '대필서비스', '편지배송', '감성편지'],
  authors: [{ name: '유어포스트', url: 'https://yourpost.co.kr' }],
  creator: '유어포스트',
  publisher: '유어포스트',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: '유어포스트 | Your Post',
    description: '마음을 전하는 가장 정중한 방법. 유어포스트의 아날로그 편지 서비스를 만나보세요.',
    url: 'https://yourpost.co.kr',
    siteName: 'Your Post',
    images: [
      {
        url: bannerImg.src,
        width: 1200,
        height: 630,
        alt: '유어포스트 공식 배너',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '유어포스트 | Your Post',
    description: '마음을 전하는 가장 정중한 방법. 아날로그 편지 서비스.',
    images: [bannerImg.src],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://yourpost.co.kr',
  },
  icons: {
    icon: logoImg.src,
    apple: logoImg.src,
  },
  metadataBase: new URL('https://yourpost.co.kr'),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const adminState = await getCMSData();

  return (
    <html lang="ko">
      <body>
        {adminState?.banner?.showTop && adminState?.banner?.top && (
          <TopBanner
            type={adminState.banner.top.type}
            message={adminState.banner.top.message || ''}
            link={adminState.banner.top.link}
            linkType={adminState.banner.top.linkType}
            buttonText={adminState.banner.top.buttonText}
            showButton={adminState.banner.top.showButton}
            color={adminState.banner.top.color}
          />
        )}
        <Header adminState={adminState} />
        {children}

        {adminState?.banner?.showBottom && adminState?.banner?.bottom && (
          <BottomBanner
            message={adminState.banner.bottom.message || ''}
            link={adminState.banner.bottom.link}
            linkType={adminState.banner.bottom.linkType}
            buttonText={adminState.banner.bottom.buttonText}
            showButton={adminState.banner.bottom.showButton}
            color={adminState.banner.bottom.color}
          />
        )}

        {adminState?.banner?.showPopup && adminState?.banner?.popup && (
          <Popup
            title={adminState.banner.popup.title || ''}
            message={adminState.banner.popup.message || ''}
            link={adminState.banner.popup.link}
            linkType={adminState.banner.popup.linkType}
            buttonText={adminState.banner.popup.buttonText}
            showButton={adminState.banner.popup.showButton}
          />
        )}
        {/* 쿠키 동의 컴포넌트 */}
        <CookieConsent />
        <Footer adminState={adminState} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}