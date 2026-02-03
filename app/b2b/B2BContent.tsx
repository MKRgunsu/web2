'use client';

import React from 'react';
import { Building2, CheckCircle, Users, Gift, BarChart3, Shield, Mail, TrendingUp, Award } from 'lucide-react';
import { AdminState } from '@/types/admin';

interface B2BContentProps {
  adminState: AdminState;
}

export default function B2BContent({ adminState }: B2BContentProps) {
  const b2b = adminState?.prices?.b2b || { email: 'biz@yourpost.co.kr' };

  return (
    <div className="animate-reveal">
      <section className="min-h-[75vh] flex flex-col justify-center items-center px-6 text-center bg-[#FCF9F5] pt-16 pb-20">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="tag-pill"><Building2 size={14} /> Enterprise Solution</div>
          <h1 className="heading-hero word-keep">고객의 마음에 <span className="text-burgundy-600">오래 남는</span> 브랜드 경험</h1>
          <p className="text-body-large word-keep pt-2 max-w-2xl mx-auto">이메일 오픈율 N/A%, 문자 확인율 N/A%. 편지는 압도적인 개봉률을 자랑합니다. 그리고 보관합니다.</p>
          <div className="pt-6"><a href={`mailto:${b2b.email}`} className="btn-emotional-primary"><Mail size={18} /> 도입 문의하기</a></div>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-gray-100">
        <div className="layout-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><p className="text-3xl md:text-4xl font-bold text-burgundy-600">N/A</p><p className="text-sm text-gray-500 mt-1">편지 개봉률</p></div>
            <div><p className="text-3xl md:text-4xl font-bold text-burgundy-600">N/A</p><p className="text-sm text-gray-500 mt-1">기업 파트너</p></div>
            <div><p className="text-3xl md:text-4xl font-bold text-burgundy-600">N/A</p><p className="text-sm text-gray-500 mt-1">발송 편지</p></div>
            <div><p className="text-3xl md:text-4xl font-bold text-burgundy-600">N/A</p><p className="text-sm text-gray-500 mt-1">고객 만족도</p></div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#FCF9F5]">
        <div className="layout-container">
          <div className="text-center mb-16"><h2 className="heading-section">맞춤형 솔루션</h2><p className="text-body-medium">비즈니스 목표에 맞는 최적의 서비스를 제안합니다</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard icon={<Users />} title="크리에이터 리워드" desc="구독자 대상 한정판 굿즈, 엽서, 레터 키트 제작 및 발송" />
            <ServiceCard icon={<Gift />} title="웰컴 패키지" desc="신규 회원, VIP 고객을 위한 프리미엄 언박싱 경험 설계" />
            <ServiceCard icon={<Building2 />} title="임직원 케어" desc="입사 축하, 생일, 경조사 등" />
            <ServiceCard icon={<BarChart3 />} title="고객 감사 레터" desc="VIP 고객, 장기 고객 대상 편지 캠페인 운영" />
            <ServiceCard icon={<Shield />} title="보안 우편" desc="민감 서류, 계약서 등 기밀 문서 안전 발송" />
            <ServiceCard icon={<TrendingUp />} title="성과 리포트" desc="발송 현황, 반응률 등 상세 데이터 대시보드 제공" />
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#1D1D1F] text-white">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">디지털 마케팅으로는 <span className="text-burgundy-400">전할 수 없는 것</span>이 있습니다</h2>
              <p className="text-gray-300 text-lg leading-relaxed">클릭 한 번으로 삭제되는 이메일, 무시당하는 문자 알림. 하지만 우편함에 도착한 편지는 다릅니다. 물리적 실체가 주는 신뢰감, 정성이 느껴지는 경험. 그것이 브랜드 로열티의 시작입니다.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3"><CheckCircle size={20} className="text-burgundy-400" /><span>브랜드 호감도 상승 (N/A)</span></div>
                <div className="flex items-center gap-3"><CheckCircle size={20} className="text-burgundy-400" /><span>고객 재구매율 증가 (N/A)</span></div>
                <div className="flex items-center gap-3"><CheckCircle size={20} className="text-burgundy-400" /><span>SNS 자발적 공유율 상승 (N/A)</span></div>
              </div>
            </div>
            <div className="bg-white/5 rounded-3xl p-12 border border-white/10 flex items-center justify-center">
              <Award size={120} className="text-burgundy-400 opacity-50" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-burgundy-50">
        <div className="layout-container text-center max-w-2xl mx-auto space-y-8">
          <h2 className="heading-title word-keep">귀사의 브랜드 가치를<br />함께 높여드리겠습니다</h2>
          <p className="text-body-medium">상담은 무료입니다. 편하게 문의해 주세요.</p>
          <a href={`mailto:${b2b.email}`} className="btn-emotional-primary">이메일 문의</a>
          <p className="text-sm text-gray-500">{b2b.email}</p>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="card-emotional space-y-4">
      <div className="w-12 h-12 bg-burgundy-50 text-burgundy-600 rounded-xl flex items-center justify-center">
        {React.cloneElement(icon as React.ReactElement, { size: 22 })}
      </div>
      <h4 className="text-lg font-bold text-[#1D1D1F]">{title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
