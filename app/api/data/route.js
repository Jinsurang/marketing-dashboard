import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

const ADMIN_SUPABASE_URL = 'https://zkdzjqykotlkmvtcznsg.supabase.co';
const ADMIN_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprZHpqcXlrb3Rsa212dGN6bnNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTQ0MzU0NywiZXhwIjoyMDg1MDE5NTQ3fQ.E_o3tgethU0VEWhXUUPFdBQEyT5IQ41zkegiG007ORQ';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const targetMonth = searchParams.get('month');

    // Initialize Admin Client
    const supabaseAdmin = createClient(ADMIN_SUPABASE_URL, ADMIN_SUPABASE_KEY);

    try {
        if (targetMonth) {
            const { data, error } = await supabaseAdmin
                .from('marketing_data')
                .select('data')
                .eq('month', targetMonth)
                .single();

            if (error) {
                if (error.code === 'PGRST116') return NextResponse.json({});
                console.error("Supabase Load Error:", error);
                return NextResponse.json({});
            }
            return NextResponse.json(data?.data || {});
        } else {
            const { data, error } = await supabaseAdmin
                .from('marketing_data')
                .select('month, data')
                .order('month', { ascending: false });

            if (error) {
                console.error("Supabase Load Error:", error);
                return NextResponse.json({});
            }

            const allData = {};
            data.forEach(row => {
                allData[row.month] = row.data;
            });
            return NextResponse.json(allData);
        }
    } catch (error) {
        console.error("Internal Error:", error);
        return NextResponse.json({});
    }
}
