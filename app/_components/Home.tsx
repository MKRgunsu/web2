'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Heart, ArrowRight, MessageSquare, HelpCircle, CheckCircle, Quote, ChevronDown, ChevronUp, Clock, Gift, Sparkles, Users, ExternalLink } from 'lucide-react';
import { AdminState, ContentItem } from '@/types/admin';

interface HomeProps {
  adminState: AdminState;
}

export default function Home({ adminState }: HomeProps) {
  const cta = adminState?.cta || { mainContactEmail: "biz@yourpost.co.kr", additionalInquiryLink: "#" };
  const [activeToast, setActiveToast] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleActionClick = (buttonType: 'proposal' | 'inquiry') => {
    if (buttonType === 'proposal') {
      const config = adminState.cta?.homeProposal ?? { type: 'email', value: cta.mainContactEmail };
      if (config.type === 'email') {
        setActiveToast('메일 앱을 열고 있어요');
        window.location.href = `mailto:${config.value}`;
      } else {
        window.open(config.value, '_blank');
      }
    } else {
      const config = adminState.cta?.homeInquiry ?? { type: 'link', value: cta.additionalInquiryLink };
      if (config.type === 'email') {
        setActiveToast('메일 앱을 열고 있어요');
        window.location.href = `mailto:${config.value}`;
      } else {
        window.open(config.value, '_blank');
      }
    }
    setTimeout(() => setActiveToast(null), 2500);
  };

  return (
    <div className="animate-reveal">
      {activeToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[200]">
          <div className="bg-[#1D1D1F] text-white px-5 py-3 rounded-full flex items-center gap-2 text-sm font-medium shadow-lg">
            <CheckCircle size={16} />
            {activeToast}
          </div>
        </div>
      )}

      {/* 히어로 - 유저 요청 카피 적용 */}
      <section className="min-h-[90vh] flex flex-col justify-center items-center px-6 text-center bg-[#FCF9F5] relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-burgundy-50/30 rounded-full blur-[120px] -z-10" />

        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <p className="text-[#6B5B4F] text-sm md:text-base font-medium tracking-wide">
            손으로 쓰고, 마음으로 전하는
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] text-[#3D3835] word-keep">
            요즘 세상에 편지라니,<br />
            <span className="text-[#991717]">그게 좋더라고요.</span>
          </h1>

          <p className="text-lg md:text-xl text-stone-500 leading-relaxed max-w-xl mx-auto word-keep font-light">
            카톡은 좀 가볍잖아요. 전화하긴 부담스럽고. <br></br>그래서 편지예요. 천천히, 제대로 전하고 싶을 때.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/ondaypost" className="btn-emotional-primary px-10 py-4 text-lg">
              하루편지 시작하기
            </Link>
            <Link href="/b2b" className="btn-emotional-secondary px-10 py-4 text-lg">
              비즈니스 문의하기
            </Link>
          </div>
        </div>
      </section>

      {/* 공감 - 스토리텔링 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-5">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight leading-snug text-[#3D3835] word-keep">
                하루에 메시지 몇 개 받으세요? <br></br> 근데 기억에 남는 건요?
              </h2>
              <div className="space-y-4 text-sm md:text-base text-gray-600 leading-relaxed word-keep">
                <p>
                  아침에 눈뜨면 알림이 쌓여있고, 읽다 보면 또 새 알림이 와요.<br></br> 답장하고 나면 금방 잊어버리죠. 그게 요즘 소통이에요.
                </p>
                <p>
                  편지는 다르더라고요. 쓰는 데 시간이 걸리니까 대충 못 써요. 받는 사람도 함부로 안 열어요. 뜯는 순간부터 이미 특별한 거예요.
                </p>
                <p className="text-burgundy-700 font-medium">
                  마지막으로 편지 받아본 게 언제예요? 그때 기분, 아직도 기억나지 않아요?
                </p>
              </div>
            </div>
            <div className="bg-burgundy-50/50 rounded-2xl p-6 md:p-8 border border-burgundy-100/30">
              <p className="text-lg md:text-xl text-[#3D3835] font-medium leading-relaxed text-center word-keep">
                &quot;요즘 누가 편지를 써?&quot;<br />
                <span className="text-gray-500 text-base">그런 말 들으면 이렇게 말해요.</span><br /><br />
                <span className="text-burgundy-700 font-bold">&quot;그러니까 더 특별한 거지.&quot;</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 숫자로 보는 유어포스트 - 디자인 디테일 상향 */}
      <section className="py-16 md:py-24 bg-white border-y border-stone-100">
        <div className="layout-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            <div className="space-y-2">
              <p className="text-xs font-black text-stone-300 uppercase tracking-widest">Since</p>
              <p className="text-3xl md:text-5xl font-bold text-[#1D1D1F]">2025</p>
              <p className="text-sm text-stone-500 font-medium tracking-tight">서비스 시작</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-black text-stone-300 uppercase tracking-widest">Promise</p>
              <p className="text-3xl md:text-5xl font-bold text-[#991717]">100%</p>
              <p className="text-sm text-stone-500 font-medium tracking-tight">진심전달</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-black text-stone-300 uppercase tracking-widest">Speed</p>
              <p className="text-3xl md:text-5xl font-bold text-[#991717]">3일</p>
              <p className="text-sm text-stone-500 font-medium tracking-tight">평균 배송</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-black text-stone-300 uppercase tracking-widest">Reach</p>
              <p className="text-3xl md:text-5xl font-bold text-[#1D1D1F]">전국</p>
              <p className="text-sm text-stone-500 font-medium tracking-tight">어디든 배달</p>
            </div>
          </div>
        </div>
      </section>

      {/* 하루편지 소개 - OndayContent와 동일한 메시지 적용 */}
      <section className="py-20 md:py-32 bg-[#FAF7F2]">
        <div className="layout-container">
          <div className="bg-white rounded-[40px] p-8 md:p-16 border border-stone-100 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-burgundy-50/50 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-burgundy-50 rounded-full">
                  <Sparkles size={14} className="text-[#991717]" />
                  <span className="text-xs md:text-sm font-bold text-burgundy-800 uppercase tracking-wider">OndayPost</span>
                </div>
                <h3 className="text-[32px] md:text-[48px] font-bold leading-[1.15] text-[#1D1D1F] word-keep">
                  화면이 아닌,<br></br> <span className="text-[#991717]">손으로 느끼는 위로</span>
                </h3>
                <div className="space-y-4">
                  <p className="text-lg md:text-xl text-stone-700 font-medium leading-relaxed word-keep">
                    편지는 꺼내 읽는 순간과, 남겨두었다가 다시 읽는 순간까지, <span className="text-[#991717]">두 번의 감동을 줍니다.</span>
                  </p>
                  <p className="text-base text-stone-500 leading-relaxed word-keep">
                    하루편지는 천천히 다가와, 마음 속에 오래 머무는 편지입니다. 말보다 느린 방식이지만, 오래 기억되고 마음에 남는 방식으로 위로를 전합니다.
                  </p>
                </div>
                <div className="pt-2">
                  <Link href="/ondaypost" className="btn-emotional-primary inline-flex">
                    하루편지 시작하기 <ArrowRight size={20} className="ml-2" />
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { title: "매주 정기 발송", desc: "한 주에 한 번, 정성을 담아 발송합니다." },
                  { title: "예측할 수 없는 도착", desc: "언제 올지 모르는 기대감이 일상에 활력을 줍니다." },
                  { title: "펼치는 순간의 온기", desc: "봉투를 열고 글을 마주할 때 비로소 전해지는 진심." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-6 bg-burgundy-50/30 rounded-2xl border border-burgundy-100/20">
                    <CheckCircle size={20} className="text-[#991717] mt-1 shrink-0" />
                    <div>
                      <h4 className="font-bold text-[#1D1D1F] mb-1">{item.title}</h4>
                      <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 하트센드 소개 - 서비스 본질 명확화 */}
      <section className="py-20 md:py-32 bg-white">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="bg-[#FAF7F2] rounded-[40px] p-8 md:p-14 border border-stone-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-burgundy-100/20 rounded-full blur-2xl -ml-16 -mt-16" />
                <div className="space-y-8 relative z-10 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-full">
                    <Heart size={14} className="text-[#991717]" />
                    <span className="text-xs md:text-sm font-bold text-stone-600 uppercase tracking-wider">Heartsend</span>
                  </div>
                  <h3 className="text-[32px] md:text-[44px] font-bold leading-[1.2] text-[#1D1D1F] word-keep">
                    마음은 가득한데,<br></br> <span className="text-[#991717]">글로 적기 어렵다면</span>
                  </h3>
                  <p className="text-lg text-stone-600 leading-relaxed word-keep">
                    당신의 진심 어린 사연을 들려주세요. 전문 작가가 내용을 다듬고, 정성스러운 편지로 직접 써서 상대방의 우편함까지 전해드립니다.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 bg-white rounded-2xl shadow-sm border border-stone-100">
                      <p className="text-xs text-stone-400 mb-1">Step 01</p>
                      <p className="font-bold text-stone-800">사연 상담</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl shadow-sm border border-stone-100">
                      <p className="text-xs text-stone-400 mb-1">Step 02</p>
                      <p className="font-bold text-stone-800">맞춤 대필</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl shadow-sm border border-stone-100">
                      <p className="text-xs text-stone-400 mb-1">Step 03</p>
                      <p className="font-bold text-stone-800">수기 제작</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl shadow-sm border border-stone-100">
                      <p className="text-xs text-stone-400 mb-1">Step 04</p>
                      <p className="font-bold text-stone-800">신속 발송</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Link href="/heartsend" className="btn-emotional-primary inline-flex">
                      하트센드 신청하기 <ArrowRight size={20} className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <div className="space-y-4">
                <span className="text-[#991717] font-black text-[10px] tracking-[0.3em] uppercase">Premium Ghostwriting</span>
                <h4 className="text-2xl md:text-3xl font-bold text-stone-800 leading-tight">
                  고백, 화해, 그리고 감사<br />
                  전하지 못한 마음을 대신 씁니다.
                </h4>
                <p className="text-stone-500 leading-relaxed word-keep">
                  첫 문장을 떼기 힘든 그 마음을 누구보다 잘 알기에, 유어포스트가 함께 고민하고 문장 하나하나에 온기를 담습니다. 받는 분의 기억에 영원히 남을 선물을 만들어보세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 회사 소개 섹션 (후기 대신 추가) */}
      <section className="py-20 md:py-32 bg-[#FAF7F2]">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-stone-200 rounded-full text-stone-500 text-xs font-bold tracking-widest uppercase shadow-sm">
                About YourPost
              </div>
              <h2 className="text-[32px] md:text-[44px] font-bold text-[#1D1D1F] leading-tight tracking-tight word-keep">
                디지털 시대에도<br />
                <span className="text-[#991717]">변하지 않는 진심</span>이 있습니다.
              </h2>
              <p className="text-lg text-stone-600 leading-relaxed word-keep">
                유어포스트는 빠르게 스쳐 지나가는 메시지 대신, 손끝으로 느껴지는 종이의 질감과 정성이 담긴 글씨를 통해 마음을 전합니다. <br /><br />
                우리는 기술을 통해 편리의 도구를 만들기보다, 사람과 사람 사이의 온기를 전하는 가장 정중한 방법을 제안합니다.
              </p>
              <div className="pt-4">
                <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold text-[#1D1D1F] hover:text-[#991717] transition-colors group">
                  브랜드 스토리 자세히 보기 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="relative aspect-square md:aspect-[4/3] bg-white rounded-[40px] border border-stone-100 shadow-xl overflow-hidden flex items-center justify-center p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-[#991717]/5 to-transparent"></div>
              <Mail size={120} className="text-[#991717]/20 relative z-10" strokeWidth={1} />
              <div className="absolute bottom-10 left-10 right-10 p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 shadow-sm">
                <p className="text-stone-700 font-medium text-sm leading-relaxed italic">
                  &quot;편지는 한 번 읽고 끝나지 않습니다. 시간이 흐른 뒤 다시 꺼내 읽을 때 비로소 진정한 위로가 완성됩니다.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28 bg-white">
        <div className="layout-container">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1D1D1F] mb-3">편지가 특별한 이유</h2>
            <p className="text-base md:text-lg text-gray-600">빠른 게 좋은 세상에서 느린 게 주는 것들</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-[#FCF9F5] p-6 md:p-7 rounded-2xl space-y-3">
              <div className="w-12 h-12 bg-burgundy-50 text-burgundy-600 rounded-xl flex items-center justify-center">
                <Clock size={22} />
              </div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">매주 정기 발송</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                한 주에 한 번, 정성을 담아 발송합니다.
              </p>
            </div>
            <div className="bg-[#FCF9F5] p-6 md:p-7 rounded-2xl space-y-3">
              <div className="w-12 h-12 bg-burgundy-50 text-burgundy-600 rounded-xl flex items-center justify-center">
                <Sparkles size={22} />
              </div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">예측할 수 없는 도착</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                언제 올지 모르는 기대감이 일상에 활력을 줍니다.
              </p>
            </div>
            <div className="bg-[#FCF9F5] p-6 md:p-7 rounded-2xl space-y-3">
              <div className="w-12 h-12 bg-burgundy-50 text-burgundy-600 rounded-xl flex items-center justify-center">
                <Heart size={22} />
              </div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">펼치는 순간의 온기</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                봉투를 열고 글을 마주할 때 비로소 전해지는 진심.
              </p>
            </div>
            <div className="bg-[#FCF9F5] p-6 md:p-7 rounded-2xl space-y-3">
              <div className="w-12 h-12 bg-burgundy-50 text-burgundy-600 rounded-xl flex items-center justify-center">
                <Mail size={22} />
              </div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">희소성의 가치</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                요즘 편지 보내는 사람 없잖아요. 받으면 진짜 특별해요.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* 기업 서비스 간단 소개 */}
      <section className="py-20 md:py-28 bg-white">
        <div className="layout-container">
          <div className="bg-[#3D3835] rounded-3xl p-8 md:p-12 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-5">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F5F0E8]/15 text-[#F5F0E8]/90 text-xs font-medium tracking-wide rounded-full">
                  B2B 서비스
                </span>
                <h3 className="text-2xl md:text-3xl font-bold leading-snug word-keep text-[#F5F0E8]">
                  기업에서도 편지를 보내요
                </h3>
                <p className="text-[#F5F0E8]/70 text-base md:text-lg leading-relaxed word-keep">
                  중요한 고객을 위한 감사 편지부터, 팀원을 위한 따뜻한 환영의 메시지까지. <br />
                  받는 분의 책상 위에 소중히 놓일 아날로그의 가치를 기업 서비스로 만나보세요. 잊히지 않는 브랜드 경험이 시작됩니다.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <div className="flex items-center gap-2 text-[#F5F0E8]/60 text-sm">
                    <Users size={16} />
                    <span>고객 감사 편지</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#F5F0E8]/60 text-sm">
                    <Gift size={16} />
                    <span>직원 웰컴키트</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#F5F0E8]/60 text-sm">
                    <Heart size={16} />
                    <span>팬레터 대행</span>
                  </div>
                </div>
                <Link href="/b2b" className="btn-emotional bg-[#F5F0E8] text-[#3D3835] hover:bg-cream inline-flex mt-3 font-semibold">
                  기업 서비스 알아보기 <ArrowRight size={18} />
                </Link>
              </div>
              <div className="flex justify-center">
                <div className="w-40 h-40 md:w-48 md:h-48 bg-[#F5F0E8]/5 rounded-full flex items-center justify-center border border-[#F5F0E8]/15">
                  <Mail size={64} className="text-[#C9B99A]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-[#FCF9F5]">
        <div className="layout-container max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1D1D1F] mb-3">자주 묻는 질문</h2>
            <p className="text-base md:text-lg text-gray-600">궁금한 점들 모아봤어요</p>
          </div>
          <div className="space-y-3">
            {(adminState?.content?.faq || [
              { id: 1, title: "편지가 도착하는 데 얼마나 걸릴까요?", text: "정성스럽게 쓰고 포장하는 시간이 필요해, 보통 3-5일 정도 소요됩니다. 조금은 느리더라도 한 통 한 통에 진심을 담아 우체국에 맡기고 있어요. 특별히 기념일이 있으시다면 미리 말씀해 주세요." },
              { id: 2, title: "익명으로 보내는 것도 가능한가요?", text: "네, 물론입니다. 보내는 분의 성함을 비워두거나 익명으로 처리하실 수 있어요. 가끔은 정체를 밝히지 않고 전하는 진심이 더 큰 울림을 주기도 하니까요." },
              { id: 3, title: "혹시 해외로도 보낼 수 있나요?", text: "아직은 국내 우편만 가능합니다. 한글과 종이가 주는 가치를 세계 어디서든 느낄 수 있도록 해외 배송 서비스도 열심히 준비하고 있습니다." },
              { id: 4, title: "글솜씨가 없는데 마음을 잘 전할 수 있을까요?", text: "그럼요. 저희의 대필 서비스는 화려한 문장을 만드는 것이 아니라, 당신의 투박한 진심을 가장 정중한 글로 옮겨드리는 일입니다. 상담을 통해 당신의 사연을 들려주시기만 하면 됩니다." },
              { id: 5, title: "중간에 취소하고 싶으면 어떡하죠?", text: "편지 작성이 시작되기 전이라면 언제든 전액 환불이 가능합니다. 다만, 정성을 담아 글을 쓰기 시작한 이후에는 취소가 어려워요. 주문 전 신중한 결정 부탁드려요." }
            ]).map((item: ContentItem, idx: number) => (
              <div key={item.id || idx} className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-[#1D1D1F] pr-4">{item.title}</span>
                  {openFaq === idx ? <ChevronUp size={20} className="text-burgundy-700 flex-shrink-0" /> : <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">{item.text}</p>
                    {item.link && (
                      <a
                        href={item.link}
                        target={item.openInNewTab !== false ? "_blank" : "_self"}
                        rel={item.openInNewTab !== false ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-2 mt-4 px-4 py-2.5 bg-[#F5F0E8] text-[#6B5B4F] rounded-xl text-sm font-medium hover:bg-burgundy-100 transition-colors"
                      >
                        {item.buttonText || '자세히 보기'}
                        {item.openInNewTab !== false && <ExternalLink size={14} />}
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-[#F5F0E8]">
        <div className="layout-container text-center max-w-xl mx-auto space-y-5">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight leading-snug text-[#3D3835] word-keep">
            마음 전하는 거,<br />생각보다 어렵지 않아요.
          </h2>
          <p className="text-sm md:text-base text-gray-600 word-keep">
            뭘 써야 할지 모르겠으면 일단 물어보세요.<br className="hidden sm:block" />
            같이 고민해 드릴게요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <button type="button" onClick={() => handleActionClick('proposal')} className="btn-cta-highlight">
              <Mail size={18} /> 지금 문의하기
            </button>
            <button type="button" onClick={() => handleActionClick('inquiry')} className="btn-emotional-secondary">
              <HelpCircle size={18} /> 상담 신청
            </button>
          </div>
        </div>
      </section>
      {/* 공지사항 & 뉴스룸 릴리스: 신뢰성 부여 (롤백된 디자인 톤에 맞춤) */}
      <section className="py-20 md:py-28 bg-white border-t border-gray-100">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            {/* 공지사항 */}
            <div className="space-y-10">
              <div className="flex items-end justify-between border-b border-gray-100 pb-6">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-[#1D1D1F]">공지사항</h2>
                  <p className="text-gray-400 text-xs">안내 및 업데이트 소식</p>
                </div>
                <Link href="/notice" className="text-xs font-bold text-[#991717] hover:underline flex items-center gap-1">
                  더보기 <ArrowRight size={14} />
                </Link>
              </div>
              <div className="space-y-1">
                {adminState?.content?.noticeBoard?.slice(0, 3).map((notice: ContentItem) => (
                  <Link
                    key={notice.id}
                    href={`/notice/${notice.id}`}
                    className="group flex flex-col gap-1 py-4 hover:bg-gray-50/50 px-2 rounded-xl transition-colors border-b border-gray-50 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-medium text-gray-300 shrink-0">{notice.date || '02.03'}</span>
                      <h4 className="text-[15px] font-bold text-[#3D3835] group-hover:text-[#991717] transition-colors line-clamp-1">{notice.title}</h4>
                    </div>
                  </Link>
                ))}
                {(!adminState?.content?.noticeBoard || adminState.content.noticeBoard.length === 0) && (
                  <p className="text-gray-300 text-sm py-4">공지사항이 없습니다.</p>
                )}
              </div>
            </div>

            {/* 뉴스룸 */}
            <div className="space-y-10">
              <div className="flex items-end justify-between border-b border-gray-100 pb-6">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-[#1D1D1F]">뉴스룸</h2>
                  <p className="text-gray-400 text-xs">언론 속의 유어포스트</p>
                </div>
                <Link href="/press" className="text-xs font-bold text-[#991717] hover:underline flex items-center gap-1">
                  더보기 <ArrowRight size={14} />
                </Link>
              </div>
              <div className="space-y-1">
                {adminState?.content?.press?.slice(0, 3).map((press: ContentItem) => (
                  <a
                    key={press.id}
                    href={press.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-1 py-4 hover:bg-gray-50/50 px-2 rounded-xl transition-colors border-b border-gray-50 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-medium text-gray-300 shrink-0">{press.date || 'News'}</span>
                      <h4 className="text-[15px] font-bold text-[#3D3835] group-hover:text-[#991717] transition-colors line-clamp-1">{press.title}</h4>
                    </div>
                  </a>
                ))}
                {(!adminState?.content?.press || adminState.content.press.length === 0) && (
                  <p className="text-gray-300 text-sm py-4">최근 소식이 없습니다.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: '유어포스트 (Your Post)',
            url: 'https://yourpost.co.kr',
            logo: 'https://yourpost.co.kr/images/logo.png',
            sameAs: [
              'https://instagram.com/yourpost_official',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+82-10-0000-0000',
              contactType: 'customer service',
              email: 'biz@yourpost.co.kr'
            }
          })
        }}
      />
    </div>
  );
}

function ReviewCard({ text, author, tag }: { text: string; author: string; tag: string }) {
  return (
    <div className="bg-white p-6 md:p-7 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col">
      <Quote size={18} className="text-[#9C8B7A]/40 mb-3" />
      <p className="text-gray-600 leading-relaxed mb-4 flex-1 text-sm md:text-base">&quot;{text}&quot;</p>
      <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-50">
        <span className="font-medium text-[#1D1D1F]">{author}</span>
        <span className="text-[#6B5B4F] text-xs">{tag}</span>
      </div>
    </div>
  );
}

// 공지사항 등 신규 기능에서 사용할 수도 있는 컴포넌트들 (롤백된 코드와의 호환성을 위해 유지)
function ValueCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="bg-[#FCF9F5] p-8 rounded-2xl space-y-4 border border-transparent hover:border-[#D4C8C1] transition-all">
      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#991717]">
        {icon}
      </div>
      <h4 className="text-lg font-bold text-[#1D1D1F]">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="px-4 py-1 bg-[#F5F0E8] border border-[#D4C8C1]/20 rounded-full text-[10px] text-[#6B5B4F] font-bold tracking-tight">
      {text}
    </span>
  );
}
