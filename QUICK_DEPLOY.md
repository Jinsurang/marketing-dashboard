# 🚀 빠른 배포 스크립트

이 스크립트를 따라하면 5분 안에 배포할 수 있습니다!

## ✅ 체크리스트

### 1단계: Supabase 설정 (3분)
```bash
# 1. https://supabase.com 접속 → 로그인
# 2. "New Project" 클릭
# 3. 프로젝트 정보 입력:
#    - Name: marketing-dashboard
#    - Password: (안전한 비밀번호)
#    - Region: Northeast Asia (Seoul)
# 4. "Create" 클릭 → 1-2분 대기
```

### 2단계: 데이터베이스 테이블 생성 (1분)
```sql
-- Supabase → SQL Editor → New query → 아래 코드 복사 & 실행

CREATE TABLE marketing_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month VARCHAR(7) NOT NULL UNIQUE,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_marketing_data_month ON marketing_data(month);

ALTER TABLE marketing_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all access for authenticated users"
  ON marketing_data FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Enable read access for anon users"
  ON marketing_data FOR SELECT TO anon
  USING (true);
```

### 3단계: API 키 복사 (30초)
```bash
# Supabase → Settings → API
# 다음 정보 복사:
# - Project URL
# - anon public 키
```

### 4단계: GitHub 푸시 (1분)
```bash
# 터미널에서 실행:
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 5단계: Cloudflare Pages 배포 (2분)
```bash
# 1. https://dash.cloudflare.com 접속
# 2. Workers & Pages → Create → Pages → Connect to Git
# 3. GitHub 저장소 선택: marketing-dashboard
# 4. 빌드 설정:
#    - Framework: Next.js
#    - Build command: npm run build
#    - Build output: .next
# 5. Environment variables 추가:
#    - NEXT_PUBLIC_SUPABASE_URL: (복사한 URL)
#    - NEXT_PUBLIC_SUPABASE_ANON_KEY: (복사한 키)
# 6. "Save and Deploy" 클릭
```

## 🎉 완료!

배포 URL: `https://marketing-dashboard-xxx.pages.dev`

이 URL을 팀원들과 공유하세요!

---

## 🔧 문제 해결

### "Supabase connection failed"
→ 환경 변수가 올바르게 설정되었는지 확인

### "Build failed"
→ Cloudflare Pages → Deployments → 로그 확인

### 로컬에서 테스트하려면?
```bash
# .env.local 파일 생성 후:
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key

# 개발 서버 실행:
npm run dev
```
