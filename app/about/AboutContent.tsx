'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Clock, PenTool, Target, Users, ArrowRight, Mail } from 'lucide-react';

export default function AboutContent() {
  const router = useRouter();

  return (
    <div className="animate-reveal">
      <section className="min-h-[70vh] flex flex-col justify-center items-center px-6 text-center bg-[#FCF9F5] pt-16 pb-20">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="tag-pill"><Heart size={14} /> About YOURPOST</div>
          <h1 className="heading-hero word-keep">마음을 전하는<br /><span className="text-burgundy-600">가장 정중한 방법</span></h1>
          <p className="text-body-large word-keep pt-2">디지털 시대에도 변하지 않는 가치가 있습니다.<br />유어포스트는 그 가치를 지켜갑니다.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="layout-container">
          <div className="max-w-3xl mx-auto">
            <div className="border-l-4 border-burgundy-600 pl-8 space-y-6">
              <h2 className="heading-section">Our Mission</h2>
              <p className="text-emotional-p word-keep">빠르게 전송되고 쉽게 잊혀지는 메시지들 사이에서, 우리는 &apos;남겨지는 것&apos;의 가치를 고민합니다.</p>
              <p className="text-emotional-p word-keep">손으로 만져지는 종이의 질감, 우표를 붙이는 정성, 우편함에서 편지를 발견했을 때의 설렘. 이 모든 경험이 당신의 마음을 더 깊이 전달해 줄 것입니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#FCF9F5]">
        <div className="layout-container">
          <div className="text-center mb-16"><h2 className="heading-section">Core Values</h2><p className="text-body-medium">유어포스트가 지켜가는 세 가지 원칙</p></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-burgundy-50 text-burgundy-600 rounded-2xl flex items-center justify-center mx-auto"><Clock size={28} /></div>
              <h3 className="text-xl font-bold text-[#1D1D1F]">기다림의 미학</h3>
              <p className="text-gray-600 leading-relaxed">즉각적인 반응보다 기다림 끝에 오는 깊은 울림을 소중히 여깁니다.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-burgundy-50 text-burgundy-600 rounded-2xl flex items-center justify-center mx-auto"><PenTool size={28} /></div>
              <h3 className="text-xl font-bold text-[#1D1D1F]">정제된 언어</h3>
              <p className="text-gray-600 leading-relaxed">가벼운 말보다 여러 번 고쳐 쓴 정제된 글의 힘을 믿습니다.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-burgundy-50 text-burgundy-600 rounded-2xl flex items-center justify-center mx-auto"><Heart size={28} /></div>
              <h3 className="text-xl font-bold text-[#1D1D1F]">진심의 전달</h3>
              <p className="text-gray-600 leading-relaxed">형식적인 안부가 아닌, 사람의 온기가 담긴 진심만을 전합니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#1D1D1F] text-white">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">아날로그의 가치를<br /><span className="text-burgundy-400">현대적으로</span> 재해석합니다</h2>
              <p className="text-gray-300 text-lg leading-relaxed">유어포스트는 전통적인 편지의 감동은 그대로 유지하면서, 현대인의 라이프스타일에 맞는 새로운 경험을 설계합니다. 기술은 수단일 뿐, 본질은 언제나 &apos;마음&apos;입니다.</p>
              <div className="flex items-center gap-4"><Target size={24} className="text-burgundy-400" /><span className="text-lg">2026년 목표: N/A</span></div>
            </div>
            <div className="bg-white/5 rounded-3xl p-12 border border-white/10 flex items-center justify-center">
              <Mail size={100} className="text-burgundy-400 opacity-50" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="layout-container">
          <div className="text-center mb-16"><h2 className="heading-section">Leadership Team</h2><p className="text-body-medium">마음을 만드는 사람들</p></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <TeamMember name="윤세연" role="CEO" desc="고객 경험 설계" />
            <TeamMember name="성두현" role="Co-Founder" desc="고객 서비스 총괄" />
            <TeamMember name="조선형" role="Co-Founder" desc="브랜드 디자인" />
            <TeamMember name="박현택" role="Marketing" desc="마케팅 & IP" />
          </div>
        </div>
      </section>

      <section className="py-24 bg-burgundy-50">
        <div className="layout-container text-center max-w-2xl mx-auto space-y-8">
          <h2 className="heading-title word-keep">함께 성장할 파트너를<br />찾고 있습니다</h2>
          <p className="text-body-medium">작가, 일러스트레이터, 기업 파트너 모두 환영합니다.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button type="button" onClick={() => router.push('/collab')} className="btn-emotional-primary">협업 문의 <ArrowRight size={18} /></button>
            <button type="button" onClick={() => router.push('/careers')} className="btn-emotional-secondary">채용 정보</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function TeamMember({ name, role, desc }: { name: string; role: string; desc: string }) {
  return (
    <div className="text-center space-y-3">
      <div className="aspect-square bg-burgundy-50 rounded-2xl flex items-center justify-center"><Users size={40} className="text-burgundy-300" /></div>
      <div><h4 className="font-bold text-[#1D1D1F]">{name}</h4><p className="text-xs text-burgundy-600 font-medium">{role}</p></div>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
}
