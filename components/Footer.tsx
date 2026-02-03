import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoImg from '../app/images/YourPost Logo.png';
import { AdminState } from '@/types/admin';

interface FooterProps {
  adminState: AdminState;
}

export default function Footer({ adminState }: FooterProps) {
  const cta = adminState?.cta || { additionalInquiryLink: "#" };
  const footerContactConfig = adminState?.cta?.footerContact ?? { type: 'link', value: cta.additionalInquiryLink || '#' };
  const footerContactHref = footerContactConfig.type === 'email'
    ? `mailto:${footerContactConfig.value}`
    : footerContactConfig.value;

  const companyInfo = {
    name: "유어포스트",
    representative: "윤세연",
    regNumber: "414-01-72641",
    email: "contact@yourpost.co.kr",
    motto: "마음과 마음 사이",
    subMotto: "마음을 전하는 다양한 방법을 제공합니다"
  };

  return (
    <footer className="bg-charcoal text-white py-12 md:py-16 px-5 mt-auto">
      <div className="layout-container space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* 브랜드 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 md:w-10 md:h-10">
                <Image src={logoImg} alt="YourPost Logo" fill className="object-contain" />
              </div>
              <span className="text-xl md:text-2xl font-bold">YOURPOST</span>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-burgundy-300">{companyInfo.motto}</p>
              <p className="text-sm text-gray-400 max-w-xs">{companyInfo.subMotto}</p>
            </div>
            <div className="pt-4 border-t border-white/10 space-y-1 text-xs text-gray-500">
              <p>상호: {companyInfo.name} | 대표: {companyInfo.representative}</p>
              <p>사업자등록번호: {companyInfo.regNumber}</p>
              <p>이메일: {companyInfo.email}</p>
            </div>
          </div>

          {/* 서비스 */}
          <div className="space-y-4 hidden md:block">
            <h4 className="text-xs font-bold uppercase tracking-widest text-burgundy-300">Services</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <FooterLink href="/ondaypost">하루편지</FooterLink>
              <FooterLink href="/heartsend">하트센드</FooterLink>
              <FooterLink href="/event">이벤트</FooterLink>
              <FooterLink href="/collab">콜라보</FooterLink>
              <FooterLink href="/b2b">B2B</FooterLink>
            </div>
          </div>

          {/* 회사 */}
          <div className="space-y-4 hidden md:block">
            <h4 className="text-xs font-bold uppercase tracking-widest text-burgundy-300">Company</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <FooterLink href="/about">회사 소개</FooterLink>
              <FooterLink href="/press">뉴스룸</FooterLink>
              <FooterLink href="/notice">공지사항</FooterLink>
              <FooterLink href="/careers">채용</FooterLink>
              <FooterLink href="/investor">IR / 투자</FooterLink>
              <FooterLink href={footerContactHref} external>문의하기</FooterLink>
            </div>
          </div>

          {/* 법적 */}
          <div className="space-y-4 hidden md:block">
            <h4 className="text-xs font-bold uppercase tracking-widest text-burgundy-300">Legal</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <FooterLink href="/privacy">개인정보처리방침</FooterLink>
              <FooterLink href="/terms">이용약관</FooterLink>
            </div>
          </div>

          {/* 모바일 링크 - 더 많은 링크 노출 및 터치 영역 개선 */}
          <div className="md:hidden space-y-6">
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-400">
              <FooterLink href="/ondaypost">하루편지</FooterLink>
              <FooterLink href="/heartsend">하트센드</FooterLink>
              <FooterLink href="/b2b">B2B</FooterLink>
              <FooterLink href="/about">회사 소개</FooterLink>
              <FooterLink href="/notice">공지사항</FooterLink>
              <FooterLink href="/careers">채용</FooterLink>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-gray-500">
              <FooterLink href="/privacy">개인정보처리방침</FooterLink>
              <FooterLink href="/terms">이용약관</FooterLink>
              <FooterLink href={footerContactHref} external>문의하기</FooterLink>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 text-xs text-gray-500">
          <p>&copy; 2024 Yourpost. All rights reserved.</p>
          <div className="flex gap-4 items-center">
            <span className="italic opacity-60">ANALOG MAIL Service</span>
            <Link href="/admin" className="opacity-30 hover:opacity-100 transition-opacity">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ children, href, external = false }: { children: React.ReactNode; href: string; external?: boolean }) {
  const className = "hover:text-white transition-colors";
  if (external) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
  }
  return <Link href={href} className={className}>{children}</Link>;
}
