'use client';

import React, { useState } from 'react';
import { BarChart3, TrendingUp, PieChart, Download, Mail, ShieldCheck, FileText, ChevronDown } from 'lucide-react';
import { AdminState, ContentItem } from '@/types/admin';

interface InvestorContentProps {
   adminState: AdminState;
}

export default function InvestorContent({ adminState }: InvestorContentProps) {
   const irData = adminState?.content?.ir || [];

   // 더보기 상태 관리
   const [visibleCount, setVisibleCount] = useState(5);

   // 최신순 정렬 및 페이지네이션
   const sortedIR = [...irData].sort((a, b) => (b.id || 0) - (a.id || 0));
   const pagedIR = sortedIR.slice(0, visibleCount);

   return (
      <div className="animate-reveal bg-[#FCF9F5] pb-40">
         {/* SECTION 1: HERO */}
         <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center max-w-screen-lg mx-auto space-y-8 pt-20">
            <span className="text-burgundy-600 font-black text-[10px] tracking-[0.3em] uppercase">Investor Relations</span>
            <h1 className="text-4xl md:text-8xl font-black text-[#2D2D2D] tracking-tighter leading-tight break-keep">
               지속 가능한<br />
               <span className="text-burgundy-600">성장의 기록.</span>
            </h1>
            <p className="text-base md:text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed break-keep">
               유어포스트는 투명한 경영과 견고한 비즈니스 모델을 바탕으로<br />
               아날로그 커뮤니케이션 시장의 독보적인 미래 가치를 증명합니다.
            </p>
         </section>

         <div className="max-w-screen-xl mx-auto px-6 space-y-24">
            {/* SECTION 2: METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <MetricCard icon={<TrendingUp />} title="시장 확장성" value="N/A" desc="전년 대비 브랜드 협업 매출 성장률" />
               <MetricCard icon={<PieChart />} title="고객 유지율" value="N/A" desc="하루편지 정기 구독 리텐션 지표" />
               <MetricCard icon={<ShieldCheck />} title="고객 만족도" value="N/A" desc="자체고객 분석결과" />
            </div>

            {/* SECTION 3: IR DOCUMENTS */}
            <section className="space-y-12">
               <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                  <div className="space-y-4">
                     <h2 className="text-3xl font-black text-charcoal tracking-tight">공시 및 IR 자료</h2>
                     <p className="text-gray-500 font-medium">유어포스트의 경영 현황과 성과 리포트를 확인하실 수 있습니다.</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 gap-4">
                  {pagedIR.length > 0 ? (
                     pagedIR.map((item: ContentItem) => (
                        <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-lg transition-all group animate-reveal">
                           <div className="flex items-center gap-6">
                              <div className="w-12 h-12 bg-burgundy-50 text-burgundy-600 rounded-xl flex items-center justify-center">
                                 <FileText size={24} />
                              </div>
                              <div>
                                 <h4 className="text-xl font-black text-charcoal">{item.title}</h4>
                                 <p className="text-sm text-gray-400 font-medium">{item.content}</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-6">
                              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.date}</span>
                              <a href={item.link} className="flex items-center gap-2 bg-charcoal text-white px-6 py-3 rounded-xl text-xs font-black hover:bg-black transition-colors">
                                 자료 다운로드 <Download size={14} />
                              </a>
                           </div>
                        </div>
                     ))
                  ) : (
                     <div className="py-24 text-center border-2 border-dashed border-gray-200 rounded-[48px]">
                        <p className="text-gray-400 font-bold">등록된 공시 자료가 없습니다.</p>
                     </div>
                  )}
               </div>

               {sortedIR.length > visibleCount && (
                  <div className="flex justify-center pt-6">
                     <button
                        onClick={() => setVisibleCount(prev => prev + 5)}
                        className="flex items-center gap-3 bg-white border border-gray-100 text-charcoal px-10 py-4 rounded-2xl font-black text-xs hover:bg-gray-50 transition-all shadow-md group animate-reveal"
                     >
                        과거 IR 자료 더보기 (+{sortedIR.length - visibleCount})
                        <ChevronDown size={16} className="text-burgundy-600 group-hover:translate-y-1 transition-transform" />
                     </button>
                  </div>
               )}
            </section>

            {/* SECTION 4: CONTACT */}
            <section className="bg-charcoal text-white rounded-[32px] p-10 md:p-16 overflow-hidden relative shadow-xl">
               <div className="max-w-2xl space-y-10 relative z-10">
                  <h3 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight">투자 및 제휴 문의</h3>
                  <p className="text-gray-400 font-medium text-lg leading-relaxed break-keep">
                     유어포스트와 함께 아날로그의 미래를 그려갈 파트너사의 연락을 기다립니다.
                  </p>
                  <div className="pt-4">
                     <a href="mailto:contact@yourpost.co.kr" className="bg-burgundy-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-burgundy-600 transition-all flex items-center gap-3 w-fit">
                        IR 담당자 연락하기 <Mail size={20} />
                     </a>
                  </div>
               </div>
               <div className="absolute top-0 right-0 p-20 opacity-5"><BarChart3 size={400} /></div>
            </section>
         </div>
      </div>
   );
}

function MetricCard({ icon, title, value, desc }: any) {
   return (
      <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6 hover:-translate-y-2 transition-all">
         <div className="w-12 h-12 bg-burgundy-50 text-burgundy-600 rounded-xl flex items-center justify-center">{icon}</div>
         <div className="space-y-1">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</p>
            <p className="text-4xl font-black text-charcoal">{value}</p>
         </div>
         <p className="text-sm text-gray-500 font-medium leading-relaxed break-keep">{desc}</p>
      </div>
   );
}