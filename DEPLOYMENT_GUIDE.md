# 🚀 마케팅 대시보드 배포 가이드

## 📋 목차
1. [Supabase 설정](#1-supabase-설정)
2. [환경 변수 설정](#2-환경-변수-설정)
3. [Cloudflare Pages 배포](#3-cloudflare-pages-배포)
4. [팀원 초대](#4-팀원-초대)

---

## 1. Supabase 설정

### 1.1 프로젝트 생성
1. [Supabase](https://supabase.com) 로그인
2. "New Project" 클릭
3. 프로젝트 정보 입력:
   - Name: `marketing-dashboard`
   - Database Password: (안전한 비밀번호 생성)
   - Region: `Northeast Asia (Seoul)` 선택
4. "Create new project" 클릭 (1-2분 소요)

### 1.2 데이터베이스 테이블 생성
1. 좌측 메뉴에서 **SQL Editor** 클릭
2. "New query" 클릭
3. 아래 SQL 스크립트 복사 & 실행:

```sql
-- 월별 마케팅 데이터 테이블
CREATE TABLE marketing_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month VARCHAR(7) NOT NULL UNIQUE, -- 'YYYY-MM' 형식
  data JSONB NOT NULL, -- 전체 월 데이터 (JSON 구조 그대로 저장)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX idx_marketing_data_month ON marketing_data(month);

-- 자동 업데이트 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_marketing_data_updated_at
  BEFORE UPDATE ON marketing_data
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) 활성화
ALTER TABLE marketing_data ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽기/쓰기 가능하도록 정책 설정 (팀 내부용)
CREATE POLICY "Enable all access for authenticated users"
  ON marketing_data
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 익명 사용자도 읽기 가능 (선택사항)
CREATE POLICY "Enable read access for anon users"
  ON marketing_data
  FOR SELECT
  TO anon
  USING (true);
```

4. "Run" 버튼 클릭하여 실행

### 1.3 API 키 확인
1. 좌측 메뉴에서 **Project Settings** (톱니바퀴 아이콘) 클릭
2. **API** 탭 선택
3. 다음 정보 복사 (나중에 사용):
   - `Project URL` (예: `https://xxxxx.supabase.co`)
   - `anon public` 키 (API Key)

---

## 2. 환경 변수 설정

### 2.1 로컬 환경 변수 파일 생성
프로젝트 루트에 `.env.local` 파일 생성:

```bash
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

> ⚠️ **중요**: `.env.local` 파일은 `.gitignore`에 포함되어 있어 Git에 업로드되지 않습니다.

### 2.2 환경 변수 값 입력
위에서 복사한 Supabase 정보를 붙여넣기:
- `NEXT_PUBLIC_SUPABASE_URL`: Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: anon public 키

---

## 3. Cloudflare Pages 배포

### 3.1 GitHub 저장소 생성
1. [GitHub](https://github.com) 로그인
2. "New repository" 클릭
3. 저장소 정보 입력:
   - Repository name: `marketing-dashboard`
   - Private 선택 (팀 내부용)
4. "Create repository" 클릭

### 3.2 코드 푸시
터미널에서 실행:

```bash
# Git 초기화 (이미 되어있으면 생략)
git init

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit: Marketing Dashboard"

# GitHub 저장소 연결
git remote add origin https://github.com/your-username/marketing-dashboard.git

# 푸시
git branch -M main
git push -u origin main
```

### 3.3 Cloudflare Pages 설정
1. [Cloudflare Dashboard](https://dash.cloudflare.com) 로그인
2. 좌측 메뉴에서 **Workers & Pages** 클릭
3. **Create application** → **Pages** → **Connect to Git** 선택
4. GitHub 계정 연동 후 저장소 선택: `marketing-dashboard`
5. 빌드 설정:
   - **Framework preset**: `Next.js`
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/`
6. **Environment variables** 섹션에서 환경 변수 추가:
   - `NEXT_PUBLIC_SUPABASE_URL`: (Supabase URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (Supabase 키)
7. **Save and Deploy** 클릭

### 3.4 배포 완료
- 배포 완료 후 URL 확인 (예: `https://marketing-dashboard.pages.dev`)
- 이 URL을 팀원들과 공유하면 됩니다!

---

## 4. 팀원 초대

### 4.1 Cloudflare 팀원 초대
1. Cloudflare Dashboard → **Account Home**
2. **Members** 탭 클릭
3. **Invite** 버튼 클릭
4. 팀원 이메일 입력 및 권한 설정

### 4.2 Supabase 팀원 초대 (선택사항)
1. Supabase 프로젝트 → **Settings** → **Team**
2. **Invite** 클릭
3. 팀원 이메일 입력

---

## 🎉 배포 완료!

이제 팀원들이 다음 URL로 접속하여 대시보드를 사용할 수 있습니다:
- **프로덕션 URL**: `https://marketing-dashboard.pages.dev`

### 📝 추가 작업
- [ ] 커스텀 도메인 연결 (선택사항)
- [ ] Supabase 백업 설정
- [ ] 모니터링 설정

### 🔧 문제 해결
- 배포 실패 시: Cloudflare Pages → Deployments → 로그 확인
- 데이터 연결 오류: 환경 변수 확인
- 권한 오류: Supabase RLS 정책 확인
