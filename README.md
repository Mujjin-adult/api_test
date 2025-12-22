# 띠링인캠퍼스 (Ttring in Campus)

인천대학교 공지사항 알림 앱

## 프로젝트 구조

```
api_test/
├── docs/                           # API 문서
│   ├── api-docs.json              # OpenAPI 스펙
│   └── API_DOCUMENTATION.md       # API 상세 문서
│
├── Frontend/                       # React Native 프론트엔드
│   ├── components/                # UI 컴포넌트
│   │   ├── bottombar/            # 하단 탭바
│   │   ├── login/                # 로그인 관련
│   │   ├── maincontents/         # 메인 콘텐츠
│   │   │   ├── alert.tsx         # 알림 설정
│   │   │   ├── chatbot.tsx       # AI 챗봇 (개발 중)
│   │   │   ├── detail.tsx        # 공지사항 상세
│   │   │   ├── notificationList.tsx  # 받은 알림 목록
│   │   │   ├── scrapList.tsx     # 스크랩 목록
│   │   │   ├── search.tsx        # 검색
│   │   │   └── setting.tsx       # 설정
│   │   ├── splash/               # 스플래시 화면
│   │   ├── topmenu/              # 상단 메뉴
│   │   └── ui/                   # 공통 UI 컴포넌트
│   │
│   ├── screens/                   # 화면 컴포넌트
│   │   ├── AlertScreen.tsx       # 알림 화면
│   │   ├── ChatbotScreen.tsx     # 챗봇 화면
│   │   ├── DetailScreen.tsx      # 상세 화면
│   │   ├── HomeScreen.tsx        # 홈 화면
│   │   ├── ScrapScreen.tsx       # 스크랩 화면
│   │   ├── SearchScreen.tsx      # 검색 화면
│   │   └── SettingScreen.tsx     # 설정 화면
│   │
│   ├── services/                  # API 서비스
│   │   ├── authAPI.ts            # 인증 API
│   │   ├── bookmarkAPI.ts        # 북마크 API
│   │   ├── crawlerAPI.ts         # 크롤러 API
│   │   ├── noticeAPI.ts          # 공지사항 API
│   │   ├── preferenceAPI.ts      # 알림 설정 API
│   │   ├── searchAPI.ts          # 검색 API
│   │   └── userAPI.ts            # 사용자 API
│   │
│   ├── context/                   # React Context
│   │   ├── BookmarkContext.tsx   # 북마크 상태 관리
│   │   └── NotificationContext.tsx  # 알림 상태 관리
│   │
│   ├── config/                    # 설정 파일
│   │   └── firebaseConfig.ts     # Firebase 설정
│   │
│   └── package.json              # 프론트엔드 의존성
│
├── .gitignore                     # Git 제외 파일
└── README.md                      # 프로젝트 문서

```

## 주요 기능

### ✅ 구현 완료
- 🔐 **로그인/회원가입** (Firebase Authentication)
- 📢 **공지사항 조회** (카테고리별, 페이징)
- 🔔 **알림 설정** (카테고리별 구독)
- 📌 **북마크** (공지사항 저장)
- 🔍 **검색** (전문 검색)
- ⚙️ **설정** (로그아웃, 알림 설정)
- 🌐 **웹뷰** (공지사항 원문 보기, 페이지 네비게이션)

### 🚧 개발 중
- 🤖 **AI 챗봇**
- 👤 **내 정보 수정**
- 🎨 **화면 모드** (다크 모드)
- 💬 **문의하기**

## 기술 스택

### Frontend
- **React Native** (Expo)
- **TypeScript**
- **React Navigation** (네비게이션)
- **Firebase** (인증, FCM)
- **AsyncStorage** (로컬 저장소)

### API
- **REST API** (백엔드 서버)
- **OpenAPI 3.0** (API 스펙)

## 설치 및 실행

### 프론트엔드

```bash
cd Frontend
npm install
npm start
```

### 웹에서 실행
```bash
npm run web
```

### Android/iOS에서 실행
```bash
npm run android  # Android
npm run ios      # iOS
```

## API 문서

API 문서는 `docs/` 폴더에서 확인할 수 있습니다:
- `api-docs.json`: OpenAPI 3.0 스펙
- `API_DOCUMENTATION.md`: 상세 API 문서

## 주요 변경사항

### 2024-12-22
- ✅ 웹뷰 뒤로가기 버튼 중복 문제 해결
- ✅ 웹뷰 보는 중 카테고리 탭 변경 방지
- ✅ 알림 공지와 스크랩 공지 분리
- ✅ AI 챗봇 화면 추가 (개발 중 표시)
- ✅ 메뉴 화면 기능 구현 (로그아웃, 알림 설정)
- ✅ 새로운 API 클라이언트 생성 (공지사항, 검색, 북마크, 알림 설정)
- ✅ 웹뷰 페이지 간 네비게이션 개선 (뒤로/앞으로 버튼)

## 라이선스

MIT License
