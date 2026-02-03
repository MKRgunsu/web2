'use client';

import React from 'react';
import { Mail, Heart, Clock, Gift, Sparkles, ArrowRight, Check, Star } from 'lucide-react';
import { AdminState } from '@/types/admin';

interface OndayContentProps {
  adminState: AdminState;
}

export default function OndayContent({ adminState }: OndayContentProps) {
  const haru = adminState?.prices?.haru || { available: false, price: '0', link: '' };

  return (
    <div className="animate-reveal">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 text-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FCF9F5] via-[#F5F0E8] to-[#EDE7DD] -z-10" />

        {/* Floating decorative elements - reduced for minimalism but keeping the "rich" feel */}
        <div className="absolute top-[10%] left-[5%] w-32 h-32 bg-burgundy-100/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-[10%] right-[5%] w-40 h-40 bg-[#991717]/10 rounded-full blur-3xl animate-float-delayed" />

        <div className="max-w-4xl mx-auto space-y-6 md:space-y-10 pt-20 pb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-burgundy-100 shadow-sm animate-reveal" style={{ animationDelay: '0.1s' }}>
            <Sparkles size={14} className="text-[#991717]" />
            <span className="text-[13px] md:text-sm font-medium text-gray-700 tracking-tight">매주 한 통, 손끝으로 전하는 위로</span>
          </div>

          <h1 className="text-[32px] sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.2] md:leading-[1.1] text-[#1D1D1F] word-keep animate-reveal" style={{ animationDelay: '0.2s' }}>
            화면이 아닌, <span className="bg-gradient-to-r from-[#991717] to-[#801313] bg-clip-text text-transparent">손으로 느끼는 위로</span>
          </h1>


          <div className="space-y-4 md:space-y-6 animate-reveal" style={{ animationDelay: '0.3s' }}>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed word-keep max-w-3xl mx-auto font-light">
              편지는 꺼내 읽는 순간과, 남겨두었다가 다시 읽는 순간까지, <span className="font-semibold text-gray-800">두 번의 감동을 줍니다.</span>
            </p>

            <p className="text-base md:text-lg text-gray-500 leading-relaxed word-keep max-w-2xl mx-auto font-normal">
              하루편지는 천천히 다가와, 마음 속에 오래 머무는 편지입니다.<br></br> 말보다 느린 방식이지만, 오래 기억되고 마음에 남는 방식으로 위로를 전합니다.
            </p>
          </div>

          <div className="pt-6 md:pt-10 flex flex-col sm:flex-row justify-center gap-4 animate-reveal px-4" style={{ animationDelay: '0.4s' }}>
            {haru.available ? (
              <a
                href={haru.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta-highlight group order-1 sm:order-2 w-full sm:w-auto"
              >
                오늘부터 경험하기
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            ) : null}
            <button
              type="button"
              onClick={() => document.getElementById('value')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-emotional-secondary group order-2 sm:order-1 w-full sm:w-auto"
            >
              자세히 알아보기
            </button>
          </div>

          {/* Trust indicators */}
          <div className="pt-8 flex items-center justify-center gap-4 md:gap-8 text-[12px] md:text-sm text-gray-400 animate-reveal" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center gap-1.5">
              <Check size={14} className="text-[#991717]" />
              <span className="tracking-tight">매주 정기 발송</span>
            </div>
            <div className="w-[1px] h-3 bg-gray-200" />
            <div className="flex items-center gap-1.5">
              <Check size={14} className="text-[#991717]" />
              <span className="tracking-tight">언제든 해지 가능</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: 편지의 가치 */}
      <section id="value" className="py-20 md:py-32 bg-white">
        <div className="layout-container px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-burgundy-50 rounded-full mb-6 text-burgundy-700">
                <Mail size={14} />
                <span className="text-[12px] md:text-sm font-medium tracking-tight">편지 본연의 가치</span>
              </div>
              <h2 className="text-[28px] md:text-[42px] lg:text-[48px] font-bold tracking-tight text-[#1D1D1F] mb-6 leading-tight word-keep">
                편지는 그 자체로<br className="sm:hidden" /> 충분합니다.
              </h2>
              <p className="text-[17px] md:text-xl text-gray-600 leading-[1.7] word-keep max-w-3xl mx-auto font-light">
                하루편지는 불필요한 장식이나 구성 없이, 오직 편지 본연의 가치에 집중합니다. 손끝으로 글을 읽고, 때로는 접어두었다가 다시 꺼내는 경험 속에서 <span className="font-semibold text-gray-800">마음은 두 번 감동합니다.</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group bg-gradient-to-br from-[#FCF9F5] to-[#F5F0E8] p-8 md:p-10 rounded-[2rem] border border-burgundy-100/50 hover:border-burgundy-200 transition-all duration-300">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Heart size={24} className="text-[#991717]" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#1D1D1F] mb-4 tracking-tight">손끝으로 읽는 감동</h3>
                <p className="text-gray-600 leading-[1.6] word-keep text-[15px] md:text-[16px]">
                  디지털 화면이 아닌 종이의 질감, 잉크의 향기.<br className="sm:hidden" /> 편지를 펼치는 순간부터 시작되는<br className="sm:hidden" /> 하루편지만의 특별한 경험입니다.
                </p>
              </div>

              <div className="group bg-gradient-to-br from-[#FCF9F5] to-[#F5F0E8] p-8 md:p-10 rounded-[2rem] border border-burgundy-100/50 hover:border-burgundy-200 transition-all duration-300">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Clock size={24} className="text-[#991717]" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#1D1D1F] mb-4 tracking-tight">다시 꺼내는 위로</h3>
                <p className="text-gray-600 leading-[1.6] word-keep text-[15px] md:text-[16px]">
                  접어두었다가 다시 펼치는 순간,<br className="sm:hidden" /> 또 다른 감동이 찾아옵니다.<br className="hidden sm:block" /> 시간이 지날수록 더욱 깊어지는<br className="sm:hidden" /> 마음의 울림을 전합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 예측할 수 없는 설렘 */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-[#FCF9F5]">
        <div className="layout-container px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-burgundy-100 mb-6 text-burgundy-700">
                <Gift size={14} />
                <span className="text-[12px] md:text-sm font-medium">매주 한 통의 기쁨</span>
              </div>
              <h2 className="text-[28px] md:text-[42px] lg:text-[48px] font-bold tracking-tight text-[#1D1D1F] mb-6 leading-tight word-keep">
                정기적이지만,<br />
                정확히 알 수 없는 순간.
              </h2>
              <div className="space-y-4 md:space-y-6 text-gray-600 text-[17px] md:text-lg leading-relaxed word-keep font-light">
                <p>
                  편지는 매주 한 통씩 발송되지만,<br className="sm:hidden" /> 도착 시점은 미리 알 수 없습니다.
                </p>
                <p className="font-semibold text-gray-800">
                  받는 순간의 놀라움과 설렘,<br className="sm:hidden" /> 글을 펼치는 순간의 따뜻함이<br className="sm:hidden" /> 하루편지만의 매력입니다.
                </p>
                <p className="text-[15px] md:text-[16px] text-gray-500 pt-2 font-normal">
                  우편함을 열었을 때 마주하는 예상치 못한 기쁨.<br className="sm:hidden" /> 반복되는 일상 속에 작은 설렘을 선물합니다.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#991717]/10 to-burgundy-100/30 rounded-[2.5rem] blur-3xl opacity-60" />
              <div className="relative bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-burgundy-100/30">
                <div className="space-y-8">
                  {[
                    { title: "매주 정기 발송", desc: "한 주에 한 번, 정성을 담아 발송합니다.", icon: Check },
                    { title: "예측할 수 없는 도착", desc: "언제 올지 모르는 기대감이 일상에 활력을 줍니다.", icon: Sparkles },
                    { title: "펼치는 순간의 온기", desc: "봉투를 열고 글을 마주할 때 비로소 전해지는 진심.", icon: Heart }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-burgundy-50 rounded-full flex items-center justify-center shrink-0 mt-1">
                        <item.icon size={18} className="text-burgundy-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1D1D1F] mb-1 text-[16px] md:text-[18px] tracking-tight">{item.title}</h4>
                        <p className="text-gray-500 text-[14px] md:text-[15px] leading-relaxed font-light">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: 가격 안내 & 가치 제안 (Conversion Focus) */}
      <section className="py-20 md:py-32 bg-white">
        <div className="layout-container px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-[28px] md:text-[42px] font-bold tracking-tight text-[#1D1D1F] mb-6 leading-tight word-keep">
              일상 속 작은 투자
            </h2>
            <p className="text-[17px] md:text-xl text-gray-600 leading-relaxed word-keep mb-10 font-light">
              한 통의 편지가 주는 위로를,<br className="sm:hidden" /> 일상 속 작은 투자로 경험해 보세요.
            </p>

            <div className="bg-[#FCF9F5] p-8 md:p-16 rounded-[3rem] border border-burgundy-100/50 mb-10 max-w-2xl mx-auto shadow-sm">
              <div className="flex items-baseline justify-center gap-1.5 mb-6">
                <span className="text-[48px] md:text-[72px] font-bold text-[#991717] leading-none tracking-tighter">9,900</span>
                <span className="text-xl md:text-2xl font-bold text-[#1D1D1F]">원</span>
                <span className="text-gray-400 text-sm md:text-base ml-1">/월</span>
              </div>
              <p className="text-[15px] md:text-[17px] text-gray-600 mb-10 word-keep leading-relaxed font-normal">
                커피 한 잔보다 작은 금액으로 마음에 쉼표를 찍고,<br className="hidden sm:block" />
                다시 꺼내 읽을 때 또 한 번<br className="sm:hidden" /> 따뜻함을 느낄 수 있습니다.
              </p>

              <div className="grid grid-cols-3 gap-3 md:gap-4 mb-10">
                {[
                  { label: "매주 1통", desc: "정기 발송" },
                  { label: "2번의 감동", desc: "읽고, 다시 읽고" },
                  { label: "무한한 여운", desc: "마음에 남는 글" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/80 py-4 px-1 rounded-2xl shadow-sm border border-burgundy-100/20">
                    <div className="text-[15px] md:text-[18px] font-bold text-[#1D1D1F] mb-1 tracking-tight">{item.label}</div>
                    <div className="text-[10px] md:text-[11px] text-gray-400 font-medium uppercase tracking-widest leading-none">{item.desc}</div>
                  </div>
                ))}
              </div>

              {haru.available && (
                <a
                  href={haru.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta-highlight group w-full py-5 rounded-[1.25rem] text-lg font-bold shadow-lg"
                >
                  오늘부터 경험하기
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
              )}
            </div>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Check size={14} /> <span>배송비 포함</span>
              </div>
              <div className="w-[1px] h-3 bg-gray-200" />
              <div className="flex items-center gap-1">
                <Check size={14} /> <span>언제든 해지 가능</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: 디지털이 줄 수 없는 위로 */}
      <section className="py-20 md:py-32 bg-[#FCF9F5]">
        <div className="layout-container px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-white/50 rounded-[2.5rem] rotate-1 -z-10 shadow-sm" />
              <div className="relative bg-white p-8 md:p-14 rounded-[2.5rem] border border-burgundy-100/30 shadow-md">
                <div className="text-[40px] md:text-5xl text-burgundy-200 leading-none mb-4 md:mb-6 font-serif">"</div>
                <p className="text-[18px] md:text-[26px] text-[#1D1D1F] leading-[1.6] font-light italic mb-6 word-keep">
                  메신저나 SNS로는 전달되지 않는<br />
                  글씨와 손끝의 온기.
                </p>
                <p className="text-[16px] md:text-[18px] text-gray-500 leading-relaxed word-keep font-normal">
                  그 느린 속도 속에서 마음은 조금 더 오래 머무르고,<br className="sm:hidden" /> 생각은 더욱 깊게 남습니다.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-[28px] md:text-[42px] font-bold tracking-tight text-[#1D1D1F] leading-tight word-keep">
                디지털이 줄 수 없는<br />진정한 위로
              </h2>
              <div className="space-y-6">
                {[
                  { title: "종이의 질감", desc: "손끝으로 느껴지는 종이의 결, 그 촉감이 주는 아날로그적 안정감." },
                  { title: "느린 속도의 위로", desc: "빠르게 스쳐가는 메시지가 아닌, 천천히 읽고 음미하는 치유의 시간." },
                  { title: "오래 남는 기억", desc: "사라지는 알림이 아니라 소중히 보관하며 언제든 꺼내볼 수 있는 기록." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <Check size={20} className="text-burgundy-600 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-[#1D1D1F] mb-1 text-[16px] md:text-[18px] tracking-tight">{item.title}</h4>
                      <p className="text-gray-500 text-[14px] md:text-[15px] leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: 시간 속 여운 (Process) */}
      <section className="py-20 md:py-32 bg-white">
        <div className="layout-container px-6 text-center">
          <h2 className="text-[28px] md:text-[42px] font-bold tracking-tight text-[#1D1D1F] mb-6 word-keep">
            시간 속 여운
          </h2>
          <p className="text-[17px] md:text-xl text-gray-600 leading-relaxed word-keep mb-16 font-light max-w-2xl mx-auto">
            편지는 받는 순간뿐 아니라,<br className="sm:hidden" /> 남겨두었다가 다시 읽는 순간까지 위로를 전합니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-[1px] bg-gray-100 -z-10" />

            {[
              { n: "1", title: "받는 순간", desc: "우편함에서 편지를 발견하는 예기치 못한 설렘" },
              { n: "2", title: "읽는 순간", desc: "봉투를 열고 한 글자씩 천천히 음미하는 따뜻함" },
              { n: "∞", title: "다시 읽는 순간", desc: "시간이 흐른 뒤 꺼내 읽을 때 찾아오는 더욱 큰 감동" }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <div className="w-[72px] h-[72px] md:w-[90px] md:h-[90px] bg-white border border-burgundy-100 rounded-full flex items-center justify-center mb-6 group-hover:border-[#991717] group-hover:bg-burgundy-50/50 transition-all duration-300 shadow-sm">
                  <span className={`text-[24px] md:text-[28px] font-bold ${item.n === '∞' ? 'text-[#991717]' : 'text-burgundy-700'}`}>{item.n}</span>
                </div>
                <h4 className="text-[18px] md:text-[22px] font-bold text-[#1D1D1F] mb-3">{item.title}</h4>
                <p className="text-gray-500 text-[15px] md:text-[16px] leading-[1.6] font-light word-keep">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: 경험 설계 (Core Pillars) */}
      <section className="py-20 md:py-32 bg-[#FCF9F5]">
        <div className="layout-container px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[28px] md:text-[36px] font-bold tracking-tight text-[#1D1D1F] mb-12 text-center word-keep">
              오직 편지만을 위한 설계
            </h2>
            <div className="space-y-4">
              {[
                { title: "한 번 읽고 끝나지 않는 여운", desc: "편지는 한 번 읽고 사라지는 것이 아니라, 시간이 흘러 꺼내 읽을 때마다 또 다른 위로를 줍니다." },
                { title: "본질에 집중하도록 불필요한 구성 제외", desc: "글과 마음에 온전히 집중할 수 있도록, 화려한 장식 대신 편지 본연의 가치와 경험에만 집중했습니다." },
                { title: "나와 소중한 이들을 돌아보는 시간", desc: "구독자는 매주 편지를 마주하며, 바쁜 일상 속에서 자기 자신과 소중한 사람을 돌아보는 소중한 여유를 갖게 됩니다." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-7 md:p-10 rounded-[2rem] border border-burgundy-100/30 flex gap-5 md:gap-8 items-start hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-burgundy-50 rounded-[14px] flex items-center justify-center shrink-0 mt-1">
                    <Check size={20} className="text-burgundy-600" />
                  </div>
                  <div>
                    <h3 className="text-[18px] md:text-[22px] font-bold text-[#1D1D1F] mb-2 tracking-tight line-height-[1.4]">{item.title}</h3>
                    <p className="text-gray-600 leading-[1.6] word-keep text-[15px] md:text-[17px] font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Final CTA (Closing) */}
      <section className="py-24 lg:py-48 bg-[#1D1D1F] relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#991717]/15 rounded-full blur-[150px] -mr-[300px] -mt-[300px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-burgundy-700/10 rounded-full blur-[150px] -ml-[250px] -mb-[250px]" />

        <div className="layout-container relative z-10 text-center px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-[34px] sm:text-[44px] md:text-[60px] lg:text-[72px] font-bold tracking-tighter leading-[1.2] md:leading-[1.1] word-keep">
              한 통의 편지가 주는<br />
              작은 위로,<br className="sm:hidden" /> 오늘부터 시작해 보세요.
            </h2>
            <div className="space-y-4">
              <p className="text-[24px] md:text-[32px] font-light text-white/90 italic tracking-tighter">월 9,900원</p>
              <p className="text-[16px] md:text-[20px] text-white/60 font-light leading-relaxed max-w-2xl mx-auto word-keep">
                일상 속 작은 투자로 마음에 오래 남는<br className="sm:hidden" /> 따뜻한 순간을 선물하세요.
              </p>
            </div>

            <div className="pt-10">
              {haru.available ? (
                <a
                  href={haru.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 md:px-16 md:py-6 bg-[#991717] text-white rounded-[1.5rem] font-bold text-lg md:text-xl shadow-[0_20px_40px_rgba(153,23,23,0.3)] hover:bg-[#801313] hover:scale-105 active:scale-95 transition-all duration-300 group"
                >
                  지금 구독하기
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </a>
              ) : (
                <div className="inline-block px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-medium text-lg">
                  곧 다시 만나요
                </div>
              )}
            </div>

            <p className="text-white/40 text-[13px] md:text-[14px] pt-8 font-light tracking-wide">언제든 해지 가능 · 배송비 포함</p>
          </div>
        </div>
      </section>

      {/* Styled Data Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: '하루편지 (OndayPost)',
            description: '화면이 아닌, 손으로 느끼는 위로. 매주 한 통씩 배송되는 프리미엄 편지 구독 서비스.',
            image: 'https://yourpost.co.kr/images/onday-thumb.png',
            brand: {
              '@type': 'Brand',
              name: '유어포스트'
            },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'KRW',
              price: '9900',
              availability: haru.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
              url: 'https://yourpost.co.kr/ondaypost'
            }
          })
        }}
      />
    </div>
  );
}
