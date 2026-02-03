'use client';

import React from 'react';
import { Heart, Lock, Zap, MessageCircle, Star, Send, ArrowRight, CheckCircle, Quote, Clock, PenTool, Edit3 } from 'lucide-react';
import { AdminState } from '@/types/admin';

interface HeartsendContentProps {
  adminState: AdminState;
}

export default function HeartsendContent({ adminState }: HeartsendContentProps) {
  const heartsend = adminState?.prices?.heartsend || { available: true, link: '#' };
  const fullOption = heartsend.options?.fullGhostwriting;
  const editOption = heartsend.options?.editGhostwriting;

  // 옵션이 하나라도 활성화되어 있는지 확인
  const hasOptions = (fullOption?.enabled !== false) || (editOption?.enabled !== false);

  return (
    <div className="animate-reveal">
      {/* 히어로 - 아날로그 감성 배경으로 복구 */}
      <section className="min-h-[85vh] flex flex-col justify-center items-center px-6 text-center bg-[#FCF9F5] relative overflow-hidden pt-16 pb-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-burgundy-50/50 rounded-full blur-[100px] -z-10" />
        <div className="max-w-2xl mx-auto space-y-8 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-stone-200 rounded-full text-xs font-bold text-[#991717] uppercase tracking-wider shadow-sm"><Heart size={14} /> Premium Ghostwriting</span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.2] text-[#1D1D1F] word-keep">
            마음은 가득한데,<br /><span className="text-[#991717]">글로 적기 어렵다면</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-500 leading-relaxed word-keep font-light">
            당신의 진심 어린 사연을 들려주세요. 전문 작가가 내용을 다듬고, 정성스러운 편지로 직접 써서 상대방의 우편함까지 전해드립니다.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            {heartsend.available ? (
              <>
                <button type="button" onClick={() => document.getElementById('options')?.scrollIntoView({ behavior: 'smooth' })} className="btn-emotional-primary px-10 py-4 text-lg">옵션 선택하기</button>
                <button type="button" onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })} className="btn-emotional-secondary px-10 py-4 text-lg">진행 과정 보기</button>
              </>
            ) : (
              <div className="bg-gray-100 text-gray-500 px-8 py-4 rounded-2xl font-medium">지금은 대기 신청만 가능해요</div>
            )}
          </div>
        </div>
      </section>

      {/* 옵션 선택 섹션 */}
      {heartsend.available && hasOptions && (
        <section id="options" className="py-20 md:py-28 bg-white">
          <div className="layout-container">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-charcoal mb-3">어떤 도움이 필요하세요?</h2>
              <p className="text-base md:text-lg text-gray-600">상황에 맞는 옵션을 선택해 주세요</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* 완전 대필 옵션 */}
              {fullOption?.enabled !== false && (
                <div className="bg-cream p-8 rounded-3xl border-2 border-burgundy-200 hover:border-burgundy-400 transition-colors group">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 bg-burgundy-100 text-burgundy-600 rounded-xl flex items-center justify-center">
                      <PenTool size={22} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-charcoal">완전 대필-발송서비스</h3>
                      <p className="text-sm text-gray-500">처음부터 대신 써서 보내드려요.</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6 min-h-[48px]">
                    {fullOption?.description || '상황만 말씀해주세요. 처음부터 끝까지 대신 써드려요.'}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-burgundy-600">
                      {fullOption?.price || '25,980'}원
                    </div>
                    <a
                      href={fullOption?.link || heartsend.link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy-600 text-white rounded-xl font-semibold hover:bg-burgundy-700 transition-colors"
                    >
                      신청하기 <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              )}

              {/* 수정 대필 옵션 */}
              {editOption?.enabled !== false && (
                <div className="bg-cream p-8 rounded-3xl border-2 border-gray-200 hover:border-burgundy-300 transition-colors group">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center group-hover:bg-burgundy-100 group-hover:text-burgundy-600 transition-colors">
                      <Edit3 size={22} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-charcoal">제작-발송서비스</h3>
                      <p className="text-sm text-gray-500">보내주신 내용을 편지로 보내드려요</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6 min-h-[48px]">
                    {editOption?.description || '보내신 편지 내용 그대로 예쁜 편지로 만들어서 발송해 드려요.'}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-charcoal">
                      {editOption?.price || '19,000'}원
                    </div>
                    <a
                      href={editOption?.link || heartsend.link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                    >
                      신청하기 <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 하트센드란 */}
      <section className="py-20 md:py-28 bg-white">
        <div className="layout-container">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1D1D1F] mb-4">하트센드가 뭐예요?</h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              편지 쓰고 싶은데 뭘 어떻게 써야 할지,만들어서 보낼지 모르겠을 때 저희한테 맡겨주세요.<br></br>
              상황이랑 마음만 알려주시면 그걸 예쁜 문장으로 바꿔서 실제 편지로 보내드려요.<br></br>
              고백, 화해, 감사, 축하… 어떤 마음이든 괜찮아요.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FCF9F5] p-7 rounded-2xl text-center space-y-4">
              <div className="w-14 h-14 bg-burgundy-100 text-burgundy-500 rounded-xl flex items-center justify-center mx-auto"><MessageCircle size={24} /></div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">대신 써드려요</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                글솜씨 없어도 괜찮아요. 어떤 상황인지, 상대방이 누군지,
                어떤 마음인지만 알려주시면 제가 글로 옮겨드릴게요.
              </p>
            </div>
            <div className="bg-[#FCF9F5] p-7 rounded-2xl text-center space-y-4">
              <div className="w-14 h-14 bg-burgundy-100 text-burgundy-500 rounded-xl flex items-center justify-center mx-auto"><Zap size={24} /></div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">빠르게 보내드려요</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                급한 거 알아요. 기념일 깜빡했거나 갑자기 보내고 싶을 때도 있잖아요.
                최대한 빨리 완성해서 보내드릴게요.
              </p>
            </div>
            <div className="bg-[#FCF9F5] p-7 rounded-2xl text-center space-y-4">
              <div className="w-14 h-14 bg-burgundy-100 text-burgundy-500 rounded-xl flex items-center justify-center mx-auto"><Lock size={24} /></div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">비밀 철저히 지켜요</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                민감한 이야기 많이 하시잖아요. 절대 외부에 공유하지 않아요.
                작업 끝나면 내용도 삭제해요. 안심하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 진행 과정 */}
      <section id="process" className="py-20 md:py-28 bg-[#FCF9F5]">
        <div className="layout-container">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1D1D1F] mb-3">이렇게 진행돼요</h2>
            <p className="text-base md:text-lg text-gray-600">복잡하지 않아요. 4단계면 끝나요.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-burgundy-500 text-white rounded-full flex items-center justify-center mx-auto font-bold">1</div>
              <h4 className="font-bold text-[#1D1D1F]">간편 신청</h4>
              <p className="text-gray-600 text-sm">간단한 양식 작성하면 연락드려요</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-burgundy-500 text-white rounded-full flex items-center justify-center mx-auto font-bold">2</div>
              <h4 className="font-bold text-[#1D1D1F]">이야기 나누기</h4>
              <p className="text-gray-600 text-sm">어떤 상황인지 자세히 들어요</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-burgundy-500 text-white rounded-full flex items-center justify-center mx-auto font-bold">3</div>
              <h4 className="font-bold text-[#1D1D1F]">초안 확인</h4>
              <p className="text-gray-600 text-sm">쓴 글 보내드리면 수정 가능해요</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-burgundy-500 text-white rounded-full flex items-center justify-center mx-auto font-bold">4</div>
              <h4 className="font-bold text-[#1D1D1F]">발송</h4>
              <p className="text-gray-600 text-sm">실제 편지로 만들어서 보내드려요</p>
            </div>
          </div>
        </div>
      </section>

      {/* 이런 분들이 */}
      <section className="py-20 md:py-28 bg-white">
        <div className="layout-container">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1D1D1F] mb-3">이런 분들이 찾아오세요</h2>
            <p className="text-base md:text-lg text-gray-600">다양한 마음들을 전해드렸어요</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <div className="flex items-start gap-4 p-5 bg-[#FCF9F5] rounded-2xl">
              <Heart size={22} className="text-burgundy-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#1D1D1F] mb-1">좋아하는 사람에게 고백하고 싶어요</p>
                <p className="text-sm text-gray-600">마음은 확실한데 어떻게 말해야 할지 모르겠을 때</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-[#FCF9F5] rounded-2xl">
              <MessageCircle size={22} className="text-burgundy-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#1D1D1F] mb-1">오래된 친구와 화해하고 싶어요</p>
                <p className="text-sm text-gray-600">먼저 연락하기 어색하고 뭐라고 해야 할지 모르겠을 때</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-[#FCF9F5] rounded-2xl">
              <Star size={22} className="text-burgundy-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#1D1D1F] mb-1">부모님께 감사 인사 드리고 싶어요</p>
                <p className="text-sm text-gray-600">평소에 말로 표현 못 했던 것들 전하고 싶을 때</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-[#FCF9F5] rounded-2xl">
              <Send size={22} className="text-burgundy-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#1D1D1F] mb-1">기념일에 특별한 선물하고 싶어요</p>
                <p className="text-sm text-gray-600">물건보다 마음이 담긴 걸 주고 싶을 때</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-[#FCF9F5] rounded-2xl">
              <Clock size={22} className="text-burgundy-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#1D1D1F] mb-1">떠나는 동료에게 인사하고 싶어요</p>
                <p className="text-sm text-gray-600">퇴사하는 분께 그동안 고마웠다고 전하고 싶을 때</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-[#FCF9F5] rounded-2xl">
              <CheckCircle size={22} className="text-burgundy-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#1D1D1F] mb-1">사과하고 싶은 사람이 있어요</p>
                <p className="text-sm text-gray-600">잘못한 거 알지만 어떻게 사과해야 할지 모르겠을 때</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-20 md:py-28 bg-[#1D1D1F]">
        <div className="layout-container text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white word-keep leading-snug">
            지금 이 말을 하지않으면, 더 이상 전할 수 없을지도 모릅니다.
          </h2>
          <p className="text-white/60 text-base md:text-lg">
            망설이지 마세요. 마음을 전하는 가장 정중한 방법, 유어포스트가 함께합니다.
          </p>
          {heartsend.available ? (
            <a href={heartsend.link} target="_blank" rel="noopener noreferrer" className="btn-emotional bg-white text-[#1D1D1F] hover:bg-gray-100 inline-flex font-semibold px-10 py-4 text-lg">
              지금, 진심을 전해보세요 <ArrowRight size={18} />
            </a>
          ) : (
            <p className="text-white/50">현재 대기 신청만 받고 있어요.</p>
          )}
        </div>
      </section>
      {/* Structured Data (Service) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: '하트센드 (Heartsend)',
            description: '편지 대필 서비스. 마음은 있지만 글쓰기가 어려운 분들을 위해 사연을 듣고 정중한 편지로 작성해 드립니다.',
            provider: {
              '@type': 'Organization',
              name: '유어포스트'
            },
            areaServed: 'South Korea',
            offers: {
              '@type': 'Offer',
              priceCurrency: 'KRW',
              price: '25000',
              availability: heartsend.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
              url: 'https://yourpost.co.kr/heartsend'
            }
          })
        }}
      />
    </div>
  );
}
