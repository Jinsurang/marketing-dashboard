# 🎯 마케팅 대시보드

실시간 마케팅 성과 분석 및 ROI 추적 대시보드

## ✨ 주요 기능

- 📊 **실시간 데이터 시각화**: 매출, 광고비, 유입수, 방문객 추이 분석
- 📈 **월간 트렌드 비교**: 전월 대비 증감률 자동 계산 (동일 기간 비교)
- 💰 **ROAS 분석**: 광고 투자 대비 수익률 실시간 모니터링
- 🎨 **직관적인 UI**: 깔끔한 카드 레이아웃과 인터랙티브 차트
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모두 지원

## 🚀 빠른 시작

### 로컬 개발 환경

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 프로덕션 배포

**5분 안에 배포하기**: [`QUICK_DEPLOY.md`](./QUICK_DEPLOY.md) 참고

**상세 가이드**: [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) 참고

## 🛠 기술 스택

- **Frontend**: Next.js 16 (App Router), React 19
- **Styling**: Tailwind CSS 4
- **Charts**: Chart.js + react-chartjs-2
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Cloudflare Pages
- **Icons**: Lucide React

## 📁 프로젝트 구조

```
marketing_singlemarks/
├── app/
│   ├── api/              # API 라우트
│   │   ├── data/         # 데이터 조회 API
│   │   └── save/         # 데이터 저장 API
│   ├── lib/              # 유틸리티 함수
│   │   ├── storage.js    # Supabase 연동
│   │   └── supabase.js   # Supabase 클라이언트
│   ├── page.js           # 메인 대시보드
│   └── layout.js         # 레이아웃
├── public/               # 정적 파일 (아이콘, 이미지)
├── DEPLOYMENT_GUIDE.md   # 상세 배포 가이드
├── QUICK_DEPLOY.md       # 빠른 배포 스크립트
└── README.md             # 이 파일

```

## 📊 데이터 구조

### Supabase 테이블: `marketing_data`

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID | Primary Key |
| month | VARCHAR(7) | 월 (YYYY-MM) |
| data | JSONB | 월별 마케팅 데이터 |
| created_at | TIMESTAMP | 생성 시각 |
| updated_at | TIMESTAMP | 수정 시각 |

### 데이터 예시

```json
{
  "2026-01": {
    "smartplace": {
      "2026-01-25": {
        "cost": 10000,
        "hq_exposure": 5000
      }
    },
    "toss": {
      "2026-01-02": {
        "cafe_revenue": 600000,
        "dinner_revenue": 4400000
      }
    },
    "catchtable": {
      "2026-01-18": {
        "reservation": 38,
        "walkin": 89
      }
    },
    "campaigns": [...]
  }
}
```

## 🔧 환경 변수

`.env.local` 파일 생성:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 📝 주요 기능 설명

### 1. 월간 트렌드 비교
- **동일 기간 비교**: 1월 1~20일 데이터는 12월 1~20일과 비교
- **공정한 분석**: 진행 중인 달도 정확한 증감률 표시
- **색상 코딩**: 증가(초록), 감소(빨강), 변화없음(회색)

### 2. ROAS 계산
```javascript
ROAS = (총 매출 / 총 광고비) × 100
```

### 3. 데이터 소스
- **Smartplace**: 유입수, 광고비
- **Toss**: 매출 (카페/디너)
- **Catchtable**: 방문객 (예약/워크인)
- **Meta/Naver**: 광고 캠페인

## 🤝 팀원 초대

### Cloudflare Pages
1. Cloudflare Dashboard → Members → Invite
2. 이메일 입력 및 권한 설정

### Supabase
1. Supabase Project → Settings → Team → Invite
2. 이메일 입력

## 📈 향후 계획

- [ ] 실시간 알림 기능
- [ ] 커스텀 리포트 생성
- [ ] 데이터 내보내기 (CSV/Excel)
- [ ] 다중 사용자 권한 관리
- [ ] 모바일 앱 (React Native)

## 🐛 문제 해결

### 데이터가 표시되지 않음
→ Supabase 연결 확인 (환경 변수)

### 빌드 실패
→ `npm run build` 로컬에서 테스트

### 권한 오류
→ Supabase RLS 정책 확인

## 📄 라이선스

Private - 팀 내부용

## 👨‍💻 개발자

작은마음홀로 마케팅팀

---

**배포 URL**: https://marketing-dashboard.pages.dev

**마지막 업데이트**: 2026-01-27
