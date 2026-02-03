'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { ChevronDown, Menu, X } from 'lucide-react';
import { AdminState } from '@/types/admin';

interface HeaderProps {
  adminState?: AdminState;
}

export default function Header(_props: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServiceOpen, setIsMobileServiceOpen] = useState(false);
  const [isMobileCompanyOpen, setIsMobileCompanyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path);
  };

  const closeMenu = () => {
    setIsServiceOpen(false);
    setIsCompanyOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileServiceOpen(false);
    setIsMobileCompanyOpen(false);
  };

  return (
    <>
      <nav className={`sticky top-0 w-full z-[100] h-14 md:h-16 transition-all duration-300 ${isScrolled ? 'bg-white border-b border-gray-100 shadow-sm' : 'bg-white border-b border-stone-100'}`}>
        <div className="layout-container h-full flex items-center justify-between">
          <Link href="/" className="outline-none" aria-label="홈으로 이동" onClick={closeMenu}>
            <Logo />
          </Link>

          {/* 데스크탑 메뉴 */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <NavBtn active={isActive('/')} href="/">홈</NavBtn>

            {/* 서비스 드롭다운 */}
            <div className="relative h-16 flex items-center" onMouseEnter={() => setIsServiceOpen(true)} onMouseLeave={() => setIsServiceOpen(false)}>
              <button type="button" className={`flex items-center gap-1 transition-colors ${isServiceOpen ? 'text-burgundy-600' : 'hover:text-[#1D1D1F]'}`}>
                서비스 <ChevronDown size={16} className={`transition-transform duration-200 ${isServiceOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-14 left-1/2 -translate-x-1/2 w-56 bg-white rounded-2xl shadow-lg border border-gray-100 p-2 transition-all duration-200 ${isServiceOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                <DropdownItem title="하루편지" desc="월간 구독 편지" href="/ondaypost" onClick={closeMenu} />
                <DropdownItem title="하트센드" desc="맞춤 편지 서비스" href="/heartsend" onClick={closeMenu} />
                <DropdownItem title="이벤트" desc="특별한 소식" href="/event" onClick={closeMenu} />
                <DropdownItem title="B2B" desc="기업 서비스" href="/b2b" onClick={closeMenu} />
              </div>
            </div>

            {/* 회사소개 드롭다운 */}
            <div className="relative h-16 flex items-center" onMouseEnter={() => setIsCompanyOpen(true)} onMouseLeave={() => setIsCompanyOpen(false)}>
              <button type="button" className={`flex items-center gap-1 transition-colors ${isCompanyOpen ? 'text-burgundy-600' : 'hover:text-[#1D1D1F]'}`}>
                회사 <ChevronDown size={16} className={`transition-transform duration-200 ${isCompanyOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-14 left-1/2 -translate-x-1/2 w-56 bg-white rounded-2xl shadow-lg border border-gray-100 p-2 transition-all duration-200 ${isCompanyOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                <DropdownItem title="회사소개" desc="유어포스트 이야기" href="/about" onClick={closeMenu} />
                <DropdownItem title="채용" desc="함께할 동료" href="/careers" onClick={closeMenu} />
                <DropdownItem title="뉴스룸" desc="보도자료" href="/press" onClick={closeMenu} />
                <DropdownItem title="IR" desc="투자정보" href="/investor" onClick={closeMenu} />
              </div>
            </div>

            <NavBtn active={isActive('/collab')} href="/collab">협업</NavBtn>
          </div>

          {/* 모바일 햄버거 - z-index 수정 */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-[200] w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="메뉴"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className="w-16 hidden md:block"></div>
        </div>
      </nav>

      {/* 모바일 오버레이 - z-index 수정 */}
      <div
        className={`fixed inset-0 bg-black/40 z-[150] transition-opacity duration-200 md:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeMenu}
      />

      {/* 모바일 메뉴 - z-index 수정 */}
      <div className={`fixed top-0 right-0 h-full w-[80vw] max-w-xs bg-white z-[180] shadow-2xl transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full pt-20 pb-6 px-5 overflow-y-auto">
          <div className="space-y-1">
            <MobileNavBtn active={isActive('/')} href="/" onClick={closeMenu}>홈</MobileNavBtn>

            {/* 모바일 서비스 */}
            <div>
              <button
                type="button"
                onClick={() => setIsMobileServiceOpen(!isMobileServiceOpen)}
                className={`w-full flex items-center justify-between py-3 px-4 rounded-xl font-medium transition-colors ${isMobileServiceOpen ? 'bg-burgundy-50 text-burgundy-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                서비스 <ChevronDown size={18} className={`transition-transform duration-200 ${isMobileServiceOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-200 ${isMobileServiceOpen ? 'max-h-40 mt-1' : 'max-h-0'}`}>
                <div className="space-y-1 pl-3">
                  <MobileSubItem title="하루편지" href="/ondaypost" onClick={closeMenu} />
                  <MobileSubItem title="하트센드" href="/heartsend" onClick={closeMenu} />
                  <MobileSubItem title="이벤트" href="/event" onClick={closeMenu} />
                  <MobileSubItem title="B2B" href="/b2b" onClick={closeMenu} />
                </div>
              </div>
            </div>

            {/* 모바일 회사 */}
            <div>
              <button
                type="button"
                onClick={() => setIsMobileCompanyOpen(!isMobileCompanyOpen)}
                className={`w-full flex items-center justify-between py-3 px-4 rounded-xl font-medium transition-colors ${isMobileCompanyOpen ? 'bg-burgundy-50 text-burgundy-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                회사 <ChevronDown size={18} className={`transition-transform duration-200 ${isMobileCompanyOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-200 ${isMobileCompanyOpen ? 'max-h-48 mt-1' : 'max-h-0'}`}>
                <div className="space-y-1 pl-3">
                  <MobileSubItem title="회사소개" href="/about" onClick={closeMenu} />
                  <MobileSubItem title="채용" href="/careers" onClick={closeMenu} />
                  <MobileSubItem title="뉴스룸" href="/press" onClick={closeMenu} />
                  <MobileSubItem title="IR" href="/investor" onClick={closeMenu} />
                </div>
              </div>
            </div>

            <MobileNavBtn active={isActive('/collab')} href="/collab" onClick={closeMenu}>협업</MobileNavBtn>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100 space-y-2">
            <Link href="/privacy" onClick={closeMenu} className="block text-sm text-gray-500 py-2 px-4">개인정보처리방침</Link>
            <Link href="/terms" onClick={closeMenu} className="block text-sm text-gray-500 py-2 px-4">이용약관</Link>
          </div>
        </div>
      </div>
    </>
  );
}

function NavBtn({ active, href, children }: { active: boolean; href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={`transition-colors py-1 ${active ? 'text-burgundy-600 font-semibold' : 'hover:text-[#1D1D1F]'}`}>
      {children}
    </Link>
  );
}

function DropdownItem({ title, desc, href, onClick }: { title: string; desc: string; href: string; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="block p-3 rounded-xl hover:bg-burgundy-50 transition-colors">
      <p className="font-medium text-[#1D1D1F] text-sm">{title}</p>
      <p className="text-xs text-gray-500">{desc}</p>
    </Link>
  );
}

function MobileNavBtn({ active, href, onClick, children }: { active: boolean; href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link href={href} onClick={onClick} className={`block py-3 px-4 rounded-xl font-medium transition-colors ${active ? 'bg-burgundy-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
      {children}
    </Link>
  );
}

function MobileSubItem({ title, href, onClick }: { title: string; href: string; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="block py-2.5 px-4 rounded-lg text-sm text-gray-600 hover:text-burgundy-600 hover:bg-burgundy-50 transition-colors">
      {title}
    </Link>
  );
}
