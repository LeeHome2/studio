# AI 영양 가이드 (AI Nutrition Guide)

## 개요 (Overview)

AI 영양 가이드는 사용자가 업로드한 음식 사진을 분석하여 영양 정보와 식단 추천을 제공하는 AI 기반 웹 애플리케이션입니다.

사용자가 식사 사진을 찍어 올리면, AI가 다음 정보를 순차적으로 분석하고 제공합니다.

1.  **음식 식별**: 사진 속의 음식이 무엇인지 인식합니다.
2.  **재료 분석**: 음식에 포함된 주요 재료를 나열합니다.
3.  **영양 정보 추정**: 칼로리, 단백질, 지방 함량을 예측합니다.
4.  **식단 추천**: 분석된 영양 정보를 바탕으로 한국어로 된 맞춤 식단 조언을 제공합니다.

이 프로젝트는 Firebase Studio 환경에서 개발되었습니다.

## 기술 스택 (Tech Stack)

-   **프레임워크**: Next.js (App Router)
-   **UI**: React, shadcn/ui, Tailwind CSS
-   **AI**: Genkit, Google Gemini (`gemini-2.5-flash`)
-   **언어**: TypeScript

## 시작하기 (Getting Started)

### 1. API 키 설정

이 프로젝트는 Google AI API를 사용합니다. 프로젝트 루트 디렉터리에 `.env` 파일을 생성하고, 발급받은 Gemini API 키를 추가해야 합니다.

```
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```

### 2. 개발 서버 실행

API 키 설정 후, 다음 명령어를 실행하여 개발 서버를 시작할 수 있습니다.

```bash
npm run dev
```

이제 브라우저에서 `http://localhost:9002`로 접속하여 애플리케이션을 확인할 수 있습니다.
