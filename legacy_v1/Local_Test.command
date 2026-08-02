#!/bin/bash
cd "$(dirname "$0")/frontend"
echo "🚀 로컬 서버를 가동합니다 (Frontend)..."
echo "👉 브라우저에서 'http://localhost:8080'에 접속해주세요."
echo "💡 (터미널 창을 닫으면 서버가 종료됩니다.)"
python3 -m http.server 8080
