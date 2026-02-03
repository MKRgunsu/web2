import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { anonymizeIP, extractIP } from '@/lib/ip-utils';

// Supabase 클라이언트 설정 (환경변수 폴백 처리)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * 쿠키 동의 여부 확인 API
 * GET 요청을 통해 사용자의 동의 기록이 있는지 확인합니다.
 * IP 주소 기반으로 동의 여부를 판단합니다.
 */
export async function GET(request: Request) {
  try {
    // Supabase 연결 확인
    if (!supabaseUrl || !supabaseKey) {
      console.error('[CONSENT CHECK] Missing Supabase environment variables');
      return NextResponse.json(
        { consented: false },
        {
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        }
      );
    }

    // Supabase 클라이언트 생성 (SERVICE_ROLE_KEY 강제 사용)
    const supabase = createClient(supabaseUrl, supabaseKey);

    // IP 주소 추출 및 익명화
    const ip = anonymizeIP(extractIP(request.headers));

    // 해당 IP의 동의 기록 조회
    const { data, error } = await supabase
      .from('access_logs')
      .select('id')
      .eq('ip', ip)
      .eq('action', 'consent_agree')
      .limit(1);

    if (error) {
      console.error('[CONSENT CHECK] DB Query Error:', error.message);
      // 에러 발생 시 안전하게 동의하지 않은 것으로 처리 (배너 표시)
      return NextResponse.json(
        { consented: false },
        {
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        }
      );
    }

    // 동의 기록이 있으면 true, 없으면 false
    return NextResponse.json(
      { consented: data && data.length > 0 },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    console.error('[CONSENT CHECK] Check failed:', error);
    // 에러 발생 시 안전하게 동의하지 않은 것으로 처리
    return NextResponse.json(
      { consented: false },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  }
}
