import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

// User provided Service Role Key for Admin Access (Bypasses RLS)
const ADMIN_SUPABASE_URL = 'https://zkdzjqykotlkmvtcznsg.supabase.co';
const ADMIN_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprZHpqcXlrb3Rsa212dGN6bnNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTQ0MzU0NywiZXhwIjoyMDg1MDE5NTQ3fQ.E_o3tgethU0VEWhXUUPFdBQEyT5IQ41zkegiG007ORQ';

export async function POST(request) {
    try {
        const { month, data } = await request.json();

        if (!month || !data) {
            return NextResponse.json({ error: 'Missing month or data' }, { status: 400 });
        }

        // Initialize Admin Client
        const supabaseAdmin = createClient(ADMIN_SUPABASE_URL, ADMIN_SUPABASE_KEY);

        // Direct Insert/Upsert using Admin Client
        const { error } = await supabaseAdmin
            .from('marketing_data')
            .upsert(
                { month, data },
                { onConflict: 'month' }
            );

        if (error) {
            console.error('SERVER SIDE SAVE ERROR:', JSON.stringify(error, null, 2));
            return NextResponse.json({ error: `DB Error: ${error.message} (Code: ${error.code})` }, { status: 500 });
        }

        return NextResponse.json({ status: 'success', message: `Data for ${month} saved` });

    } catch (error) {
        console.error('Internal Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Error' }, { status: 500 });
    }
}
