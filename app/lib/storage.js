import { supabase } from './supabase';

// Check if Supabase is configured
const isSupabaseConfigured = () => {
    return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
};

/**
 * Storage Adapter
 * Supabase를 우선 사용하고, 설정되지 않은 경우 로컬 JSON 파일 사용
 */
export const db = {
    /**
     * 월별 데이터 조회
     */
    async getData(month) {
        try {
            // Supabase 사용
            if (isSupabaseConfigured()) {
                if (month) {
                    const { data, error } = await supabase
                        .from('marketing_data')
                        .select('data')
                        .eq('month', month)
                        .single();

                    if (error) {
                        if (error.code === 'PGRST116') return {};
                        throw error;
                    }
                    return data?.data || {};
                } else {
                    const { data, error } = await supabase
                        .from('marketing_data')
                        .select('month, data')
                        .order('month', { ascending: false });

                    if (error) throw error;

                    const allData = {};
                    data.forEach(row => {
                        allData[row.month] = row.data;
                    });
                    return allData;
                }
            }

            // Fallback: 로컬 JSON 파일 사용 (개발 환경 전용)
            // Cloudflare Pages에서는 이 블록이 실행되지 않도록 함
            if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
                const fs = await import('fs');
                const path = await import('path');
                const DATA_FILE = path.join(process.cwd(), 'marketing_data.json');

                if (!fs.existsSync(DATA_FILE)) return {};
                const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
                const allData = JSON.parse(fileContent);

                if (month) return allData[month] || {};
                return allData;
            }

            return {};
        } catch (error) {
            console.error("Storage Load Error:", error);
            return {};
        }
    },

    /**
     * 월별 데이터 저장
     */
    async saveData(month, data) {
        try {
            // Supabase 사용
            if (isSupabaseConfigured()) {
                const { error } = await supabase
                    .from('marketing_data')
                    .upsert(
                        { month, data },
                        { onConflict: 'month' }
                    );

                if (error) throw error;
                return true;
            }

            // Fallback: 로컬 JSON 파일 사용 (개발 환경 전용)
            if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
                const fs = await import('fs');
                const path = await import('path');
                const DATA_FILE = path.join(process.cwd(), 'marketing_data.json');

                let allData = {};
                if (fs.existsSync(DATA_FILE)) {
                    allData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
                }
                allData[month] = data;
                fs.writeFileSync(DATA_FILE, JSON.stringify(allData, null, 2), 'utf8');
                return true;
            }

            return false;
        } catch (error) {
            console.error("Storage Save Error:", error);
            return false;
        }
    }
};
