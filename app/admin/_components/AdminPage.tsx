'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Settings, Bell, Shield, Trash2, Layout, Activity, CreditCard,
  CheckCircle, RefreshCcw, Sparkles, Newspaper, Mail, Download, ChevronLeft, ChevronRight, Briefcase, PieChart, HelpCircle, AlertTriangle, Send
} from 'lucide-react';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TabBtn, CategoryBtn, AdminCard, InputGroup, MarkdownEditor, ToggleGroup, ColorPicker, ServiceControl } from '../../../components/AdminUI';
import { AdminState, ContentItem } from '@/types/admin';

/**
 * 관리자 페이지 메인 컴포넌트
 * 사이트의 전반적인 설정, 콘텐츠(CMS), 보안 로그를 관리합니다.
 */
export default function AdminPage() {
  // --- 상태 관리 (States) ---
  const [adminState, setAdminState] = useState<AdminState>({});

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ id: '', password: '' });
  const [activeTab, setActiveTab] = useState('settings');
  const [editingCategory, setEditingCategory] = useState<string>('brandStory');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });
  const [supabaseError, setSupabaseError] = useState<string | null>(null);

  // 로그 관리용 상태
  const [logs, setLogs] = useState<any[]>([]);
  const [logPage, setLogPage] = useState(1);
  const [logTotalPages, setLogTotalPages] = useState(1);
  const [logStats, setLogStats] = useState<any>(null);

  /**
   * 컴포넌트 마운트 시 로그인 상태 확인
   * httpOnly 쿠키 존재 여부를 API 호출 성공 여부로 판단
   */
  useEffect(() => {
    checkLoginStatus();
  }, []);

  /**
   * 로그인 상태 확인 (쿠키 기반 세션 체크)
   */
  const checkLoginStatus = async () => {
    try {
      const res = await fetch('/api/admin/cms');

      if (res.ok) {
        // 인증 성공 - 로그인 상태로 전환
        setIsLoggedIn(true);
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          const errorMsg = res.headers.get('x-supabase-error');
          setSupabaseError(errorMsg);
          setAdminState(data);
        }
      } else {
        // 인증 실패 (401 등) - 로그인 폼 표시
        setIsLoggedIn(false);
      }
    } catch (e) {
      // 네트워크 오류 - 로그인 폼 표시
      setIsLoggedIn(false);
      console.error("Failed to check login status:", e);
    }
  };

  /**
   * 로그인 후 데이터 로드
   * @param silent - true일 경우 에러 토스트 표시 안 함 (저장 후 리로드 등)
   */
  const fetchAdminData = async (silent = false) => {
    try {
      const res = await fetch('/api/admin/cms');
      const contentType = res.headers.get("content-type");

      if (res.ok && contentType && contentType.includes("application/json")) {
        const data = await res.json();
        const errorMsg = res.headers.get('x-supabase-error');
        setSupabaseError(errorMsg);
        setAdminState(data);
      } else if (!res.ok && isLoggedIn && !silent) {
        // 로그인 상태인데 인증 실패 시에만 세션 만료 메시지 표시
        setIsLoggedIn(false);
        triggerToast('세션이 만료되었습니다. 다시 로그인해주세요.', 'error');
      }
    } catch (e) {
      console.error("Failed to fetch admin data:", e);
      if (isLoggedIn && !silent) {
        triggerToast('데이터 로드 중 오류가 발생했습니다.', 'error');
      }
    }
  };

  /**
   * 로그 데이터 로드 (페이지네이션)
   */
  const fetchLogs = useCallback(async (page: number) => {
    try {
      const res = await fetch(`/api/admin/logs?page=${page}&limit=10`);
      const contentType = res.headers.get("content-type");

      if (res.ok && contentType && contentType.includes("application/json")) {
        const data = await res.json();
        setLogs(data.logs || []);
        setLogTotalPages(data.pagination?.totalPages || 1);
        setLogStats(data.stats || null);
        setLogPage(page);
      } else if (res.status === 401) {
        setIsLoggedIn(false);
        triggerToast('보안 로그 접근 권한이 없습니다. 다시 로그인해주세요.', 'error');
      } else {
        triggerToast('로그 데이터를 불러오는데 실패했습니다.', 'error');
      }
    } catch (e) {
      console.error("Failed to fetch logs:", e);
      triggerToast('보안 로그를 불러오는 중 네트워크 오류가 발생했습니다.', 'error');
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && activeTab === 'logs') {
      fetchLogs(1);
    }
  }, [isLoggedIn, activeTab, fetchLogs]);

  /**
   * 데이터 저장 (수동 저장)
   */
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // 배너 내용 변경 시점 기록 (프론트엔드에서 '최초 접속' 또는 '내용 변경' 시에만 띄우기 위함)
      const stateToSave = {
        ...adminState,
        banner: {
          ...adminState.banner, // 기존 배너 설정을 그대로 유지하며 병합
          // 현재 시간을 기록하여 버전 관리 (내용이 바뀌었을 때만 사용자에게 다시 노출되도록 트리거 역할)
          lastModified: new Date().toISOString()
        }
      };

      const res = await fetch('/api/admin/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stateToSave),
      });
      if (res.ok) {
        setLastSaved(new Date());
        triggerToast('✅ 저장 완료!');
        fetchAdminData(true); // 저장 후 최신 데이터 다시 불러오기 (silent=true)
      } else {
        triggerToast('저장에 실패했습니다.', 'error');
      }
    } catch (e) {
      triggerToast('서버 오류가 발생했습니다.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * 알림 토스트 메시지 출력
   */
  const triggerToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: null }), 3000);
  }, []);

  /**
   * 서버 API를 통한 관리자 로그인 처리
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginForm.id, password: loginForm.password }),
      });

      const contentType = response.headers.get("content-type");

      if (response.ok && contentType && contentType.includes("application/json")) {
        setIsLoggedIn(true);
        triggerToast('시스템 권한을 획득했습니다.');
        fetchAdminData();
      } else {
        // JSON 응답이 아닐 경우 대비
        const errorData = contentType && contentType.includes("application/json")
          ? await response.json()
          : { message: '로그인 서버 응답 오류' };
        triggerToast(errorData.message || '인증 정보가 올바르지 않습니다.', 'error');
      }
    } catch (error) {
      triggerToast('서버 통신 중 오류가 발생했습니다.', 'error');
    }
  };

  /**
   * 로그아웃 처리
   */
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      setIsLoggedIn(false);
      triggerToast('로그아웃 되었습니다.');
    } catch (error) {
      // 실패하더라도 클라이언트 상태는 로그아웃 처리
      setIsLoggedIn(false);
    }
  };

  /**
   * 필드 업데이트 유틸리티
   * 중첩된 객체 구조('banner.top.message' 등)의 상태를 불변성을 유지하며 업데이트함
   */
  const updateField = useCallback((path: string, value: any) => {
    setAdminState((prev: any) => {
      const newState = { ...prev };
      const keys = path.split('.');
      let current: any = newState;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key] || typeof current[key] !== 'object') current[key] = {};
        current[key] = { ...current[key] }; // 불변성 유지 (Shallow copy)
        current = current[key];
      }
      current[keys[keys.length - 1]] = value;
      return newState;
    });
  }, [setAdminState]);

  /**
   * CMS 항목 삭제 처리
   */
  const deleteCMSItem = useCallback((category: string, id: number) => {
    if (!window.confirm('항목을 영구 파기하시겠습니까?')) return;
    setAdminState((prev) => {
      const currentList = (prev.content?.[category as keyof typeof prev.content] as ContentItem[] | undefined) ?? [];
      const updatedList = currentList.filter((item) => item.id !== id);
      return {
        ...prev,
        content: {
          ...prev.content,
          [category]: updatedList
        }
      };
    });
    triggerToast('데이터가 삭제되었습니다.', 'error');
  }, [setAdminState, triggerToast]);

  /**
   * 로그 CSV 다운로드
   */
  const downloadLogs = (days: number) => {
    window.open(`/api/admin/logs?download=true&days=${days}`, '_blank');
  };

  /**
   * 로그 삭제
   */
  const deleteLogs = async (type: 'auto' | 'all') => {
    if (!window.confirm(type === 'auto' ? '30일 지난 로그를 삭제합니까?' : '모든 로그를 삭제합니까?')) return;
    await fetch('/api/admin/logs', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type })
    });
    fetchLogs(1);
    triggerToast('로그가 정리되었습니다.');
  };

  // --- 비로그인 상태: 로그인 폼 렌더링 ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FCF9F5] via-[#F5F5F0] to-[#EEEEE8] flex items-center justify-center p-6 animate-reveal">
        <div className="bg-white p-12 md:p-16 rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-full max-w-md border-2 border-gray-200">
          <div className="w-24 h-24 bg-[#E62727] text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-red-200">
            <Shield size={48} strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl font-black text-[#1D1D1F] mb-3 tracking-tight text-center">관리자 로그인</h1>
          <p className="text-sm text-gray-500 font-semibold mb-10 text-center">YourPost Admin Panel</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">아이디</label>
              <input
                type="text"
                placeholder="관리자 아이디 입력"
                className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none font-semibold text-[#1D1D1F] border-2 border-gray-200 focus:border-[#E62727] focus:bg-white transition-all shadow-sm"
                value={loginForm.id}
                onChange={(e) => setLoginForm({ ...loginForm, id: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호 입력"
                className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none font-semibold text-[#1D1D1F] border-2 border-gray-200 focus:border-[#E62727] focus:bg-white transition-all shadow-sm"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#E62727] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#cc1f1f] active:scale-[0.98] transition-all shadow-[0_8px_24px_rgba(230,39,39,0.35)] hover:shadow-[0_12px_32px_rgba(230,39,39,0.45)] mt-8 border-2 border-[#cc1f1f]"
            >
              🔐 로그인
            </button>
          </form>

          {toast.type === 'error' && (
            <div className="mt-6 p-4 bg-red-50 border-2 border-red-300 rounded-2xl">
              <p className="text-red-700 text-sm font-bold text-center">{toast.message}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- 로그인 상태: 관리 대시보드 렌더링 ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FCF9F5] via-[#F5F5F0] to-[#EEEEE8] p-4 md:p-8 lg:p-12 flex flex-col gap-10 animate-reveal relative pb-40">
      <Analytics />
      <SpeedInsights />

      {/* 토스트 메시지 (상단 중앙) */}
      {toast.message && (
        <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[200] px-8 py-4 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.25)] flex items-center gap-3 font-bold text-sm border-2 animate-reveal ${toast.type === 'success'
          ? 'bg-green-50 text-green-700 border-green-300'
          : 'bg-red-50 text-red-700 border-red-300'
          }`}>
          {toast.type === 'success' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* 실시간 저장 버튼 (플로팅 - 하단 우측) */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col md:flex-row items-end md:items-center gap-4">
        <div className={`hidden md:flex px-5 py-3 rounded-2xl shadow-lg items-center gap-3 font-bold text-xs bg-white border-2 transition-all ${isSaving ? 'text-[#E62727] border-red-300 scale-105' : 'text-gray-500 border-gray-200'
          }`}>
          {isSaving ? <RefreshCcw size={16} className="animate-spin" /> : <CheckCircle size={16} className="text-green-500" />}
          {isSaving ? '저장 중...' : lastSaved ? `저장됨 ${lastSaved.toLocaleTimeString()}` : '저장 대기'}
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`px-8 py-4 rounded-2xl font-black text-base shadow-[0_8px_24px_rgba(230,39,39,0.35)] hover:shadow-[0_12px_32px_rgba(230,39,39,0.45)] active:scale-[0.95] transition-all border-2 ${isSaving
            ? 'bg-gray-400 text-white border-gray-500 cursor-not-allowed'
            : 'bg-[#E62727] text-white border-[#cc1f1f] hover:bg-[#cc1f1f]'
            }`}
        >
          💾 {isSaving ? '저장 중...' : '변경사항 저장'}
        </button>
      </div>

      {/* 상단 헤더 */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[32px] shadow-md border-2 border-gray-200">
        <div className="space-y-2">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#1D1D1F]">관리자 대시보드</h2>
          <div className="flex flex-wrap gap-3 mt-4">
            <TabBtn active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} label="⚙️ 기본 설정" icon={<Settings size={18} />} />
            <TabBtn active={activeTab === 'content'} onClick={() => setActiveTab('content')} label="📝 콘텐츠 CMS" icon={<Layout size={18} />} />
            <TabBtn active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} label="🔒 보안 로그" icon={<Activity size={18} />} />
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm font-bold text-gray-600 hover:text-[#E62727] px-6 py-3 border-2 border-gray-300 rounded-2xl bg-white shadow-md transition-all hover:border-[#E62727] hover:shadow-lg active:scale-95"
        >
          🚪 로그아웃
        </button>
      </header>

      {/* 탭 1: 기본 설정 섹션 */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <AdminCard title="서비스 및 가격 제어" icon={<CreditCard className="text-[#E62727]" />}>
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 pl-4">개인 서비스</h4>
              {/* Nullish coalescing (??) 연산자를 사용하여 undefined일 경우 기본값 제공 */}
              <ServiceControl label="하루편지" price={adminState.prices?.haru?.price ?? ''} link={adminState.prices?.haru?.link ?? ''} available={adminState.prices?.haru?.available ?? false} onUpdate={(f: any, v: any) => updateField(`prices.haru.${f}`, v)} />
              <ServiceControl label="하트센드" price={adminState.prices?.heartsend?.price ?? ''} link={adminState.prices?.heartsend?.link ?? ''} available={adminState.prices?.heartsend?.available ?? false} onUpdate={(f: any, v: any) => updateField(`prices.heartsend.${f}`, v)} />

              {/* 하트센드 옵션별 설정 */}
              <div className="mt-6 p-6 bg-[#FFF5F5] rounded-3xl border border-red-100 space-y-6">
                <h5 className="text-sm font-black text-charcoal flex items-center gap-2">
                  하트센드 옵션 설정
                </h5>

                {/* 완전 대필 옵션 */}
                <div className="p-5 bg-white rounded-2xl border border-gray-100 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-charcoal text-sm">완전 대필</p>
                      <p className="text-xs text-gray-500 mt-0.5">처음부터 대신 써드려요</p>
                    </div>
                    <ToggleGroup
                      label=""
                      active={adminState.prices?.heartsend?.options?.fullGhostwriting?.enabled ?? true}
                      onToggle={() => updateField('prices.heartsend.options.fullGhostwriting.enabled', !(adminState.prices?.heartsend?.options?.fullGhostwriting?.enabled ?? true))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup
                      label="가격"
                      value={adminState.prices?.heartsend?.options?.fullGhostwriting?.price ?? '39,000'}
                      onChange={(v) => updateField('prices.heartsend.options.fullGhostwriting.price', v)}
                    />
                    <InputGroup
                      label="신청 링크"
                      value={adminState.prices?.heartsend?.options?.fullGhostwriting?.link ?? ''}
                      onChange={(v) => updateField('prices.heartsend.options.fullGhostwriting.link', v)}
                    />
                  </div>
                  <InputGroup
                    label="설명 문구"
                    value={adminState.prices?.heartsend?.options?.fullGhostwriting?.description ?? '상황만 말씀해주세요. 처음부터 끝까지 대신 써드려요.'}
                    onChange={(v) => updateField('prices.heartsend.options.fullGhostwriting.description', v)}
                  />
                </div>

                {/* 수정 대필 옵션 */}
                <div className="p-5 bg-white rounded-2xl border border-gray-100 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-charcoal text-sm">수정 대필</p>
                      <p className="text-xs text-gray-500 mt-0.5">보내주신 내용을 다듬어드려요</p>
                    </div>
                    <ToggleGroup
                      label=""
                      active={adminState.prices?.heartsend?.options?.editGhostwriting?.enabled ?? true}
                      onToggle={() => updateField('prices.heartsend.options.editGhostwriting.enabled', !(adminState.prices?.heartsend?.options?.editGhostwriting?.enabled ?? true))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup
                      label="가격"
                      value={adminState.prices?.heartsend?.options?.editGhostwriting?.price ?? '25,000'}
                      onChange={(v) => updateField('prices.heartsend.options.editGhostwriting.price', v)}
                    />
                    <InputGroup
                      label="신청 링크"
                      value={adminState.prices?.heartsend?.options?.editGhostwriting?.link ?? ''}
                      onChange={(v) => updateField('prices.heartsend.options.editGhostwriting.link', v)}
                    />
                  </div>
                  <InputGroup
                    label="설명 문구"
                    value={adminState.prices?.heartsend?.options?.editGhostwriting?.description ?? '이미 쓴 내용이 있으면 보내주세요. 더 좋은 문장으로 다듬어드려요.'}
                    onChange={(v) => updateField('prices.heartsend.options.editGhostwriting.description', v)}
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 mt-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 pl-4 mb-4">기업 서비스</h4>
                <div className="bg-[#FCF9F5] p-8 rounded-[40px] space-y-6 border border-gray-50 transition-all hover:border-[#E62727]/10">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <span className="text-xl font-black text-charcoal">B2B 솔루션</span>
                    <ToggleGroup label="활성 상태" active={adminState.prices?.b2b?.available ?? false} onToggle={() => updateField('prices.b2b.available', !adminState.prices?.b2b?.available)} />
                  </div>
                  <InputGroup label="문의 이메일" value={adminState.prices?.b2b?.email ?? ''} onChange={(v) => updateField('prices.b2b.email', v)} />
                  <InputGroup label="안내 문구" value={adminState.prices?.b2b?.info ?? ''} onChange={(v) => updateField('prices.b2b.info', v)} />
                </div>
              </div>
            </div>
          </AdminCard>

          <AdminCard title="배너 및 팝업 제어" icon={<Bell className="text-[#E62727]" />}>
            <div className="space-y-8">
              {/* 상단 띠배너 설정 */}
              <div className="p-8 bg-[#fdfaf7] rounded-[40px] space-y-6 border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-black text-charcoal">📢 상단 띠 배너 설정</h4>
                  <ToggleGroup label="활성" active={adminState.banner?.showTop ?? false} onToggle={() => updateField('banner.showTop', !adminState.banner?.showTop)} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="배너 메시지" value={adminState.banner?.top?.message ?? ''} onChange={(v: any) => updateField('banner.top.message', v)} />
                  <div className="space-y-4">
                    <ToggleGroup label="링크 버튼 사용" active={adminState.banner?.top?.showButton ?? false} onToggle={() => updateField('banner.top.showButton', !(adminState.banner?.top?.showButton ?? false))} />
                    {adminState.banner?.top?.showButton && (
                      <div className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100">
                        <button
                          onClick={() => updateField('banner.top.linkType', 'internal')}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${adminState.banner?.top?.linkType === 'internal' ? 'bg-[#E62727] text-white' : 'bg-gray-100 text-gray-500'}`}
                        >내부 공지</button>
                        <button
                          onClick={() => updateField('banner.top.linkType', 'external')}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${adminState.banner?.top?.linkType === 'external' ? 'bg-[#E62727] text-white' : 'bg-gray-100 text-gray-500'}`}
                        >외부 링크</button>
                      </div>
                    )}
                  </div>
                </div>

                {adminState.banner?.top?.showButton && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="버튼 텍스트" value={adminState.banner?.top?.buttonText ?? '더 알아보기'} onChange={(v: any) => updateField('banner.top.buttonText', v)} />
                    <InputGroup
                      label={adminState.banner?.top?.linkType === 'internal' ? "공지 ID (숫자)" : "URL"}
                      value={adminState.banner?.top?.link ?? ''}
                      onChange={(v: any) => updateField('banner.top.link', v)}
                    />
                  </div>
                )}
                <ColorPicker label="테마 색상" value={adminState.banner?.top?.color} onChange={(c) => updateField('banner.top.color', c)} />
              </div>

              {/* 좌측 하단 배너 설정 */}
              <div className="p-8 bg-[#fdfaf7] rounded-[40px] space-y-6 border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-black text-charcoal">📍 좌측 하단 Floating 공지</h4>
                  <ToggleGroup label="활성" active={adminState.banner?.showBottom ?? false} onToggle={() => updateField('banner.showBottom', !(adminState.banner?.showBottom ?? false))} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="공지 메시지" value={adminState.banner?.bottom?.message ?? ''} onChange={(v: any) => updateField('banner.bottom.message', v)} />
                  <div className="space-y-4">
                    <ToggleGroup label="링크 버튼 사용" active={adminState.banner?.bottom?.showButton ?? false} onToggle={() => updateField('banner.bottom.showButton', !(adminState.banner?.bottom?.showButton ?? false))} />
                    {adminState.banner?.bottom?.showButton && (
                      <div className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100">
                        <button
                          onClick={() => updateField('banner.bottom.linkType', 'internal')}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${adminState.banner?.bottom?.linkType === 'internal' ? 'bg-[#E62727] text-white' : 'bg-gray-100 text-gray-500'}`}
                        >내부 공지</button>
                        <button
                          onClick={() => updateField('banner.bottom.linkType', 'external')}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${adminState.banner?.bottom?.linkType === 'external' ? 'bg-[#E62727] text-white' : 'bg-gray-100 text-gray-500'}`}
                        >외부 링크</button>
                      </div>
                    )}
                  </div>
                </div>

                {adminState.banner?.bottom?.showButton && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="버튼 텍스트" value={adminState.banner?.bottom?.buttonText ?? '자세히 보기'} onChange={(v: any) => updateField('banner.bottom.buttonText', v)} />
                    <InputGroup
                      label={adminState.banner?.bottom?.linkType === 'internal' ? "공지 ID (숫자)" : "URL"}
                      value={adminState.banner?.bottom?.link ?? ''}
                      onChange={(v: any) => updateField('banner.bottom.link', v)}
                    />
                  </div>
                )}
                <ColorPicker label="테마 색상" value={adminState.banner?.bottom?.color} onChange={(c) => updateField('banner.bottom.color', c)} />
              </div>

              {/* 팝업 설정 */}
              <div className="p-8 bg-[#fdfaf7] rounded-[40px] space-y-6 border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-black text-charcoal">🖼️ 중앙 팝업 설정</h4>
                  <ToggleGroup label="활성" active={adminState.banner?.showPopup ?? false} onToggle={() => updateField('banner.showPopup', !(adminState.banner?.showPopup ?? false))} />
                </div>

                <InputGroup label="팝업 제목" value={adminState.banner?.popup?.title ?? ''} onChange={(v: any) => updateField('banner.popup.title', v)} />
                <MarkdownEditor label="팝업 본문" value={adminState.banner?.popup?.message ?? ''} onChange={(v: any) => updateField('banner.popup.message', v)} />

                <div className="space-y-4">
                  <ToggleGroup label="팝업 버튼 실행" active={adminState.banner?.popup?.showButton ?? false} onToggle={() => updateField('banner.popup.showButton', !(adminState.banner?.popup?.showButton ?? false))} />
                  {adminState.banner?.popup?.showButton && (
                    <div className="p-6 bg-white rounded-3xl border border-gray-100 space-y-4">
                      <div className="flex gap-4 mb-4">
                        <button
                          onClick={() => updateField('banner.popup.linkType', 'internal')}
                          className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all ${adminState.banner?.popup?.linkType === 'internal' ? 'bg-[#E62727] text-white' : 'bg-gray-100 text-gray-500'}`}
                        >내부 공지로 이동</button>
                        <button
                          onClick={() => updateField('banner.popup.linkType', 'external')}
                          className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all ${adminState.banner?.popup?.linkType === 'external' ? 'bg-[#E62727] text-white' : 'bg-gray-100 text-gray-500'}`}
                        >외부 링크 (URL)</button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputGroup label="버튼 텍스트" value={adminState.banner?.popup?.buttonText ?? '자세히 보기'} onChange={(v: any) => updateField('banner.popup.buttonText', v)} />
                        <InputGroup
                          label={adminState.banner?.popup?.linkType === 'internal' ? "공지사항 ID (숫자)" : "이동 링크 URL"}
                          value={adminState.banner?.popup?.link ?? ''}
                          onChange={(v: any) => updateField('banner.popup.link', v)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 mt-8">
                <ToggleGroup label="쿠키 수집 활성화" active={adminState.cookieSettings?.enabled ?? true} onToggle={() => updateField('cookieSettings.enabled', !adminState.cookieSettings?.enabled)} />
                <div className="mt-4 p-4 bg-white rounded-2xl border border-gray-100">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">쿠키 안내 표시 빈도</label>
                  <select
                    className="w-full p-3 bg-[#FCF9F5] rounded-xl font-bold text-sm outline-none"
                    value={adminState.cookieSettings?.mode ?? 'once'}
                    onChange={(e) => updateField('cookieSettings.mode', e.target.value)}
                  >
                    <option value="once">최초 접속 시 1회만 표시 (권장)</option>
                    <option value="always">매 접속마다 표시</option>
                    <option value="none">표시 안 함 (비활성화)</option>
                  </select>
                </div>
              </div>
            </div>
          </AdminCard>

          {/* CTA 링크 관리 (전체 너비) */}
          <div className="lg:col-span-2">
            <AdminCard title="CTA 버튼 링크 관리" icon={<Send className="text-[#E62727]" />}>
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
                  <p className="text-xs font-bold text-blue-700">💡 각 버튼마다 이메일(mailto:) 또는 외부 링크(URL)를 선택할 수 있습니다.</p>
                </div>

                {/* 홈페이지 - 제안서 제출하기 버튼 */}
                <div className="p-6 bg-[#fdfaf7] rounded-3xl space-y-4 border border-gray-100">
                  <h4 className="text-sm font-black text-charcoal flex items-center gap-2">
                    📄 홈페이지 - &quot;제안서 제출하기&quot; 버튼
                  </h4>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => updateField('cta.homeProposal.type', 'email')}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${(adminState.cta?.homeProposal?.type ?? 'email') === 'email'
                        ? 'bg-[#E62727] text-white shadow-md'
                        : 'bg-white text-gray-600 border border-gray-200'
                        }`}
                    >
                      📧 이메일
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('cta.homeProposal.type', 'link')}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${(adminState.cta?.homeProposal?.type ?? 'email') === 'link'
                        ? 'bg-[#E62727] text-white shadow-md'
                        : 'bg-white text-gray-600 border border-gray-200'
                        }`}
                    >
                      🔗 링크
                    </button>
                  </div>
                  <InputGroup
                    label={(adminState.cta?.homeProposal?.type ?? 'email') === 'email' ? '이메일 주소' : '링크 URL'}
                    value={adminState.cta?.homeProposal?.value ?? 'biz@yourpost.co.kr'}
                    onChange={(v) => updateField('cta.homeProposal.value', v)}
                  />
                </div>

                {/* 홈페이지 - 1:1 온라인 문의 버튼 */}
                <div className="p-6 bg-[#fdfaf7] rounded-3xl space-y-4 border border-gray-100">
                  <h4 className="text-sm font-black text-charcoal flex items-center gap-2">
                    💬 홈페이지 - &quot;1:1 온라인 문의&quot; 버튼
                  </h4>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => updateField('cta.homeInquiry.type', 'email')}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${(adminState.cta?.homeInquiry?.type ?? 'link') === 'email'
                        ? 'bg-[#E62727] text-white shadow-md'
                        : 'bg-white text-gray-600 border border-gray-200'
                        }`}
                    >
                      📧 이메일
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('cta.homeInquiry.type', 'link')}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${(adminState.cta?.homeInquiry?.type ?? 'link') === 'link'
                        ? 'bg-[#E62727] text-white shadow-md'
                        : 'bg-white text-gray-600 border border-gray-200'
                        }`}
                    >
                      🔗 링크
                    </button>
                  </div>
                  <InputGroup
                    label={(adminState.cta?.homeInquiry?.type ?? 'link') === 'email' ? '이메일 주소' : '링크 URL'}
                    value={adminState.cta?.homeInquiry?.value ?? '#'}
                    onChange={(v) => updateField('cta.homeInquiry.value', v)}
                  />
                </div>

                {/* 협업 페이지 - 함께하기 버튼 */}
                <div className="p-6 bg-[#fdfaf7] rounded-3xl space-y-4 border border-gray-100">
                  <h4 className="text-sm font-black text-charcoal flex items-center gap-2">
                    🤝 협업 페이지 - &quot;함께하기&quot; 버튼
                  </h4>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => updateField('cta.collabButton.type', 'email')}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${(adminState.cta?.collabButton?.type ?? 'email') === 'email'
                        ? 'bg-[#E62727] text-white shadow-md'
                        : 'bg-white text-gray-600 border border-gray-200'
                        }`}
                    >
                      📧 이메일
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('cta.collabButton.type', 'link')}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${(adminState.cta?.collabButton?.type ?? 'email') === 'link'
                        ? 'bg-[#E62727] text-white shadow-md'
                        : 'bg-white text-gray-600 border border-gray-200'
                        }`}
                    >
                      🔗 링크
                    </button>
                  </div>
                  <InputGroup
                    label={(adminState.cta?.collabButton?.type ?? 'email') === 'email' ? '이메일 주소' : '링크 URL'}
                    value={adminState.cta?.collabButton?.value ?? 'biz@yourpost.co.kr'}
                    onChange={(v) => updateField('cta.collabButton.value', v)}
                  />
                </div>

                {/* 푸터 - 말 걸기 / 문의하기 링크 */}
                <div className="p-6 bg-[#fdfaf7] rounded-3xl space-y-4 border border-gray-100">
                  <h4 className="text-sm font-black text-charcoal flex items-center gap-2">
                    📍 푸터 - &quot;말 걸기 / 문의하기&quot; 링크
                  </h4>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => updateField('cta.footerContact.type', 'email')}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${(adminState.cta?.footerContact?.type ?? 'link') === 'email'
                        ? 'bg-[#E62727] text-white shadow-md'
                        : 'bg-white text-gray-600 border border-gray-200'
                        }`}
                    >
                      📧 이메일
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('cta.footerContact.type', 'link')}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${(adminState.cta?.footerContact?.type ?? 'link') === 'link'
                        ? 'bg-[#E62727] text-white shadow-md'
                        : 'bg-white text-gray-600 border border-gray-200'
                        }`}
                    >
                      🔗 링크
                    </button>
                  </div>
                  <InputGroup
                    label={(adminState.cta?.footerContact?.type ?? 'link') === 'email' ? '이메일 주소' : '링크 URL'}
                    value={adminState.cta?.footerContact?.value ?? '#'}
                    onChange={(v) => updateField('cta.footerContact.value', v)}
                  />
                </div>

                {/* 이메일 안내 */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mt-6">
                  <h5 className="text-xs font-black text-blue-800 mb-2 flex items-center gap-2">
                    <Mail size={14} /> 이메일 사용 시 안내사항
                  </h5>
                  <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
                    <li>이메일 선택 시, 사용자의 기본 메일 클라이언트가 자동으로 열립니다.</li>
                    <li>모바일에서는 Gmail, Outlook 등 설치된 이메일 앱이 실행됩니다.</li>
                    <li>외부 양식(Tally, Google Forms 등)을 사용하려면 &apos;링크&apos;를 선택하세요.</li>
                  </ul>
                </div>
              </div>
            </AdminCard>
          </div>
        </div>
      )}

      {/* 탭 2: 콘텐츠 CMS 섹션 */}
      {activeTab === 'content' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* 카테고리 사이드바 */}
          <div className="lg:col-span-1 space-y-4">
            <CategoryBtn active={editingCategory === 'brandStory'} onClick={() => setEditingCategory('brandStory')} label="브랜드 스토리" icon={<Sparkles size={18} />} />
            <CategoryBtn active={editingCategory === 'press'} onClick={() => setEditingCategory('press')} label="뉴스룸" icon={<Newspaper size={18} />} />
            <CategoryBtn active={editingCategory === 'noticeBoard'} onClick={() => setEditingCategory('noticeBoard')} label="공지사항 게시판" icon={<Bell size={18} className="text-[#E62727]" />} />
            <CategoryBtn active={editingCategory === 'careers'} onClick={() => setEditingCategory('careers')} label="채용 및 협업" icon={<Briefcase size={18} />} />
            <CategoryBtn active={editingCategory === 'events'} onClick={() => setEditingCategory('events')} label="이벤트" icon={<Mail size={18} />} />
            <CategoryBtn active={editingCategory === 'faq'} onClick={() => setEditingCategory('faq')} label="자주 묻는 질문 (FAQ)" icon={<HelpCircle size={18} />} />
          </div>

          {/* 카테고리별 상세 편집 영역 */}
          <div className="lg:col-span-3 bg-white p-12 rounded-[60px] shadow-sm border border-gray-100 min-h-[800px]">
            <div className="flex justify-between items-center border-b pb-8 mb-10">
              <h3 className="text-3xl font-black uppercase text-charcoal">{editingCategory} 관리</h3>
              <button
                onClick={() => {
                  const newItem = { id: Date.now(), title: '새 항목', text: '', date: new Date().toISOString().split('T')[0], order: 0 };
                  const currentList = (adminState.content?.[editingCategory as keyof typeof adminState.content] as ContentItem[] | undefined) || [];
                  updateField(`content.${editingCategory}`, [newItem, ...currentList]);
                  triggerToast('새 항목이 추가되었습니다.');
                }}
                className="bg-[#E62727] text-white px-8 py-4 rounded-2xl text-xs font-black shadow-lg hover:bg-[#cc1f1f] transition-colors"
              >
                + 신규 추가
              </button>
            </div>

            <div className="space-y-10">
              {((adminState.content?.[editingCategory as keyof typeof adminState.content] as ContentItem[] | undefined) ?? []).map((item: any) => (
                <div key={item.id} className="p-10 bg-[#FCF9F5] rounded-[40px] border border-gray-100 space-y-6 relative group transition-all hover:shadow-md">
                  <button
                    onClick={() => deleteCMSItem(editingCategory, item.id)}
                    className="absolute top-10 right-10 text-gray-300 hover:text-red-500 transition-colors"
                    title="항목 삭제"
                    aria-label="항목 삭제" // 접근성: 버튼에 명시적인 라벨 추가
                  >
                    <Trash2 size={24} />
                  </button>
                  <InputGroup
                    label="제목"
                    value={item.title}
                    onChange={(v: string) => {
                      const newList = ((adminState.content?.[editingCategory as keyof typeof adminState.content] as ContentItem[] | undefined) ?? []).map((i: any) => i.id === item.id ? { ...i, title: v } : i);
                      updateField(`content.${editingCategory}`, newList);
                    }}
                  />
                  <MarkdownEditor
                    label="내용"
                    value={item.text || ''}
                    onChange={(v: string) => {
                      const newList = ((adminState.content?.[editingCategory as keyof typeof adminState.content] as ContentItem[] | undefined) ?? []).map((i: any) => i.id === item.id ? { ...i, text: v } : i);
                      updateField(`content.${editingCategory}`, newList);
                    }}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InputGroup
                      label="연결 링크"
                      value={item.link || ''}
                      onChange={(v: string) => {
                        const newList = ((adminState.content?.[editingCategory as keyof typeof adminState.content] as ContentItem[] | undefined) ?? []).map((i: any) => i.id === item.id ? { ...i, link: v } : i);
                        updateField(`content.${editingCategory}`, newList);
                      }}
                    />
                    <InputGroup
                      label="버튼 텍스트"
                      value={item.buttonText || ''}
                      onChange={(v: string) => {
                        const newList = ((adminState.content?.[editingCategory as keyof typeof adminState.content] as ContentItem[] | undefined) ?? []).map((i: any) => i.id === item.id ? { ...i, buttonText: v } : i);
                        updateField(`content.${editingCategory}`, newList);
                      }}
                    />
                    <div className="flex items-end pb-1">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.openInNewTab ?? true}
                          onChange={(e) => {
                            const newList = ((adminState.content?.[editingCategory as keyof typeof adminState.content] as ContentItem[] | undefined) ?? []).map((i: any) => i.id === item.id ? { ...i, openInNewTab: e.target.checked } : i);
                            updateField(`content.${editingCategory}`, newList);
                          }}
                          className="w-5 h-5 rounded border-gray-300 text-[#E62727] focus:ring-[#E62727]"
                        />
                        <span className="text-sm font-medium text-gray-700">새 탭에서 열기</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 탭 3: 쿠키 분석 & 보안 로그 */}
      {activeTab === 'logs' && (
        <div className="space-y-8">
          {/* 쿠키 분석 대시보드 */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-charcoal flex items-center gap-3">
                <PieChart className="text-[#E62727]" size={24} />
                쿠키 수집 분석 대시보드
              </h3>
              <button onClick={() => fetchLogs(1)} className="p-3 text-gray-400 hover:text-[#E62727] border border-gray-200 rounded-xl transition-colors" title="새로고침">
                <RefreshCcw size={16} />
              </button>
            </div>

            {/* 주요 지표 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="p-6 bg-gradient-to-br from-red-50 to-red-100/50 rounded-2xl border border-red-200/30">
                <div className="text-xs font-bold text-[#E62727] uppercase tracking-widest mb-2">총 수집 로그</div>
                <div className="text-3xl font-black text-[#E62727]">{logStats?.total?.toLocaleString() || 0}</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl border border-green-200/30">
                <div className="text-xs font-bold text-green-600 uppercase tracking-widest mb-2">쿠키 동의율</div>
                <div className="text-3xl font-black text-green-700">{logStats?.consentRate || 0}%</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl border border-blue-200/30">
                <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">고유 방문자</div>
                <div className="text-3xl font-black text-blue-700">{logStats?.uniqueVisitors?.toLocaleString() || 0}</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl border border-purple-200/30">
                <div className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-2">최근 7일</div>
                <div className="text-3xl font-black text-purple-700">{logStats?.recentLogs?.toLocaleString() || 0}</div>
              </div>
            </div>

            {/* 상세 분석 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 동의 유형별 분석 */}
              <div className="p-6 bg-[#FCF9F5] rounded-2xl border border-gray-100">
                <h4 className="text-sm font-black text-charcoal mb-4 flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" /> 동의 유형 분석
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">쿠키 동의 완료</span>
                    <span className="font-bold text-green-600">{logStats?.consentAgree?.toLocaleString() || 0}건</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">쿠키 거부</span>
                    <span className="font-bold text-red-500">{logStats?.consentReject?.toLocaleString() || 0}건</span>
                  </div>
                  <div className="h-px bg-gray-200 my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">마케팅 동의</span>
                    <span className="font-bold text-[#E62727]">{logStats?.marketingConsent?.toLocaleString() || 0}건</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">분석 동의</span>
                    <span className="font-bold text-blue-500">{logStats?.analyticsConsent?.toLocaleString() || 0}건</span>
                  </div>
                </div>
              </div>

              {/* 인기 페이지 */}
              <div className="p-6 bg-[#FCF9F5] rounded-2xl border border-gray-100">
                <h4 className="text-sm font-black text-charcoal mb-4 flex items-center gap-2">
                  <Activity size={16} className="text-[#E62727]" /> 인기 페이지 TOP 5
                </h4>
                <div className="space-y-3">
                  {(logStats?.topPages || []).map((item: { page: string; count: number }, idx: number) => (
                    <div key={item.page} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${idx === 0 ? 'bg-[#E62727] text-white' : 'bg-gray-200 text-gray-600'}`}>
                          {idx + 1}
                        </span>
                        <span className="text-sm text-gray-700 truncate max-w-[150px]">{item.page || '/'}</span>
                      </div>
                      <span className="text-sm font-bold text-charcoal">{item.count}회</span>
                    </div>
                  ))}
                  {(!logStats?.topPages || logStats.topPages.length === 0) && (
                    <p className="text-sm text-gray-400 text-center py-4">데이터가 없습니다</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 다운로드 섹션 */}
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
            <h4 className="text-lg font-black text-charcoal mb-6 flex items-center gap-2">
              <Download size={20} className="text-[#E62727]" /> 데이터 다운로드
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button onClick={() => downloadLogs(7)} className="p-4 bg-[#FCF9F5] rounded-xl border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all text-center group">
                <div className="text-2xl mb-2">📅</div>
                <div className="text-sm font-bold text-charcoal">최근 7일</div>
                <div className="text-xs text-gray-400">CSV 다운로드</div>
              </button>
              <button onClick={() => downloadLogs(30)} className="p-4 bg-[#FCF9F5] rounded-xl border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all text-center group">
                <div className="text-2xl mb-2">📆</div>
                <div className="text-sm font-bold text-charcoal">최근 30일</div>
                <div className="text-xs text-gray-400">CSV 다운로드</div>
              </button>
              <button onClick={() => downloadLogs(90)} className="p-4 bg-[#FCF9F5] rounded-xl border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all text-center group">
                <div className="text-2xl mb-2">📊</div>
                <div className="text-sm font-bold text-charcoal">최근 90일</div>
                <div className="text-xs text-gray-400">CSV 다운로드</div>
              </button>
              <button onClick={() => window.open(`/api/admin/logs?download=true&days=365&format=json`, '_blank')} className="p-4 bg-[#FCF9F5] rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-center group">
                <div className="text-2xl mb-2">💾</div>
                <div className="text-sm font-bold text-charcoal">전체 JSON</div>
                <div className="text-xs text-gray-400">개발용 포맷</div>
              </button>
            </div>
          </div>

          {/* 실시간 로그 테이블 */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <h3 className="text-xl font-black text-charcoal">실시간 접속 로그</h3>
              <div className="flex gap-3">
                <button onClick={() => deleteLogs('auto')} className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-red-500 border border-gray-200 rounded-xl hover:border-red-300 transition-all">
                  30일 지난 로그 삭제
                </button>
                <button onClick={() => deleteLogs('all')} className="px-4 py-2 text-xs font-bold text-red-400 hover:text-red-600 border border-red-200 rounded-xl hover:border-red-400 transition-all">
                  전체 삭제
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl bg-[#FCF9F5] border border-gray-100">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-200 uppercase tracking-widest font-black bg-gray-50/50">
                    <th className="p-5">시간</th>
                    <th className="p-5">IP</th>
                    <th className="p-5">액션</th>
                    <th className="p-5">페이지</th>
                    <th className="p-5">마케팅</th>
                    <th className="p-5">분석</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log: any) => (
                    <tr key={log.id} className="border-b border-gray-100 hover:bg-white transition-colors">
                      <td className="p-5 font-mono text-gray-400 text-[11px]">{new Date(log.created_at || log.createdAt).toLocaleString('ko-KR')}</td>
                      <td className="p-5 font-bold text-charcoal">{log.ip}</td>
                      <td className="p-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${log.action === 'consent_agree' ? 'bg-green-100 text-green-700' :
                          log.action === 'consent_reject' ? 'bg-red-100 text-red-700' :
                            log.action === 'page_view' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-600'
                          }`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="p-5 text-gray-500 max-w-[150px] truncate">{log.page}</td>
                      <td className="p-5">{log.consent_marketing || log.consentMarketing ? <span className="text-green-500">✓</span> : <span className="text-gray-300">-</span>}</td>
                      <td className="p-5">{log.consent_analytics || log.consentAnalytics ? <span className="text-green-500">✓</span> : <span className="text-gray-300">-</span>}</td>
                    </tr>
                  ))}
                  {logs.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-10 text-center text-gray-400">수집된 로그가 없습니다</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* 페이지네이션 */}
            <div className="flex justify-center gap-4 items-center pt-6">
              <button disabled={logPage === 1} onClick={() => fetchLogs(logPage - 1)} className="p-3 rounded-xl hover:bg-gray-100 disabled:opacity-30 border border-gray-200" aria-label="이전 페이지">
                <ChevronLeft size={18} />
              </button>
              <span className="text-sm font-bold text-gray-500 px-4">{logPage} / {logTotalPages || 1}</span>
              <button disabled={logPage >= logTotalPages} onClick={() => fetchLogs(logPage + 1)} className="p-3 rounded-xl hover:bg-gray-100 disabled:opacity-30 border border-gray-200" aria-label="다음 페이지">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
