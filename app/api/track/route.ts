import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { anonymizeIP, extractIP } from '@/lib/ip-utils';

// Supabase 클라이언트 설정 (환경변수 폴백 처리)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * 사용자 행동 추적 API
 * POST 요청을 통해 페이지 조회 및 쿠키 동의 정보를 기록합니다.
 * GDPR/PIPA 준수: IP 주소는 익명화되어 저장됩니다.
 */
export async function POST(request: Request) {
  try {
    // Supabase 연결 확인
    if (!supabaseUrl || !supabaseKey) {
      console.error('[TRACK] Missing Supabase environment variables');
      return NextResponse.json({ success: false, error: 'Database not configured' }, { status: 500 });
    }

    // Supabase 클라이언트 생성 (SERVICE_ROLE_KEY 강제 사용)
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 요청 본문 파싱
    const body = await request.json();
    const { action, page, consentMarketing, consentAnalytics } = body;

    // User Agent 추출
    const userAgent = request.headers.get('user-agent') || '';

    // IP 주소 추출 및 익명화 (GDPR/PIPA 준수)
    const ip = anonymizeIP(extractIP(request.headers));

    // 접근 로그 저장
    const { error } = await supabase.from('access_logs').insert([
      {
        ip,
        action,
        page,
        user_agent: userAgent,
        consent_marketing: consentMarketing || false,
        consent_analytics: consentAnalytics || false,
      },
    ]);

    if (error) {
      console.error('[TRACK] DB Insert Error:', error.message);
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[TRACK] Tracking failed:', error);
    return NextResponse.json(
      { success: false, error: 'Tracking failed' },
      { status: 500 }
    );
  }
}
