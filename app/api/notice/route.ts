import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function GET() {
    if (!supabaseUrl || !supabaseKey) {
        return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
        .from('site_settings')
        .select('data')
        .eq('id', 1)
        .maybeSingle();

    if (error) {
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }

    const noticeBoard = data?.data?.content?.noticeBoard || [];
    return NextResponse.json(noticeBoard);
}
