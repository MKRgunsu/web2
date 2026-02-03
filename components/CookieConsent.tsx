'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [cookieMode, setCookieMode] = useState<'once' | 'always' | 'none'>('once');

  // 페이지 뷰 추적 함수
  const trackPageView = useCallback(async () => {
    try {
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'page_view',
          page: window.location.pathname,
          consentMarketing: true,
          consentAnalytics: true
        })
      });
    } catch {
      // 실패해도 무시
    }
  }, []);

  useEffect(() => {
    const checkConsent = async () => {
      try {
        // CMS 설정 확인
        const cmsRes = await fetch('/api/admin/cms');
        if (cmsRes.ok) {
          const cmsData = await cmsRes.json();
          const settings = cmsData.cookieSettings;

          // 쿠키 설정이 비활성화되어 있거나 mode가 'none'이면 배너 표시 안함
          // enabled가 명시적으로 false일 때만 비활성화 (undefined는 활성화로 처리)
          if (settings?.enabled === false || settings?.mode === 'none') {
            setIsVisible(false);
            return;
          }

          // mode 저장
          setCookieMode(settings?.mode || 'once');
        }

        // 동의 여부 확인
        // localStorage 우선 확인 (빠른 반응용)
        const localConsent = localStorage.getItem('cookie-consented');
        if (localConsent === 'true') {
          setIsVisible(false);
          trackPageView();
          return;
        }

        const res = await fetch('/api/consent/check', {
          cache: 'no-store'
        });
        if (res.ok) {
          const { consented } = await res.json();
          if (consented) {
            localStorage.setItem('cookie-consented', 'true'); // 로컬 동기화
            trackPageView();
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
        } else {
          setIsVisible(true);
        }
      } catch {
        // 네트워크 오류 시 배너 표시
        setIsVisible(true);
      }
    };

    checkConsent();
  }, [trackPageView]);

  const handleAccept = async () => {
    try {
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'consent_agree',
          page: window.location.pathname,
          consentMarketing: true,
          consentAnalytics: true
        })
      });

      // 동의 후 페이지뷰도 추적
      trackPageView();
      localStorage.setItem('cookie-consented', 'true');
    } catch {
      // 실패해도 무시
    } finally {
      setIsVisible(false);
    }
  };

  const handleReject = async () => {
    try {
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'consent_reject',
          page: window.location.pathname,
          consentMarketing: false,
          consentAnalytics: false
        })
      });
    } catch {
      // 실패해도 무시
    } finally {
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:bottom-6 z-[80] animate-reveal">
      <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-5 md:p-6 max-w-sm">
        {/* 헤더 */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#FFF5F5] text-[#E62727] rounded-xl flex items-center justify-center flex-shrink-0">
              <Cookie size={18} />
            </div>
            <span className="text-sm font-bold text-charcoal">사이트 이용 안내</span>
          </div>
          <button
            type="button"
            onClick={handleReject}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mr-1 -mt-1"
            aria-label="닫기"
          >
            <X size={18} />
          </button>
        </div>

        {/* 내용 */}
        <p className="text-sm text-gray-600 leading-relaxed mb-5">
          원활한 서비스 제공을 위해 필수 쿠키를 사용합니다.{' '}
          <Link href="/privacy" className="text-[#E62727] hover:text-[#cc1f1f] underline underline-offset-2">
            개인정보처리방침
          </Link>
        </p>

        {/* 버튼 */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleReject}
            className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            거절
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 bg-[#E62727] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#cc1f1f] transition-colors shadow-md shadow-red-100"
          >
            동의
          </button>
        </div>
      </div>
    </div>
  );
}
