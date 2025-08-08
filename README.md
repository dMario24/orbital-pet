# Orbital Pet (궤도 펫)

위성을 모티브로 한 다마고치 형태의 웹 서비스입니다. 사용자는 자신만의 위성 펫을 키우고 관리합니다.

## 🚀 시작하기

### 로컬 환경 설정

1.  저장소를 클론합니다.
    ```bash
    git clone https://github.com/your-repo/orbital-pet.git
    cd orbital-pet
    ```

2.  필요한 패키지를 설치합니다.
    ```bash
    npm install
    ```

3.  Supabase 환경 변수를 설정합니다.
    루트에 `.env.local` 파일을 생성하고, Supabase 프로젝트의 URL과 anon key를 추가합니다.
    ```
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

4.  개발 서버를 실행합니다.
    ```bash
    npm run dev
    ```
    브라우저에서 `http://localhost:3000`으로 접속하여 랜딩 페이지를 확인할 수 있습니다.

### 테스트

이 프로젝트는 E2E 테스트를 위해 Playwright를 사용하도록 설정되었습니다.

1.  Playwright 및 관련 브라우저를 설치합니다.
    ```bash
    npm install --save-dev @playwright/test
    npx playwright install --with-deps
    ```

2.  테스트를 실행합니다. (테스트 파일 작성 필요)
    ```bash
    npx playwright test
    ```

## ✨ 기술 스택

-   **Framework**: [Next.js](https://nextjs.org/) (v15.4.6)
    -   React 19, App Router, 서버 액션, `useFormState` 훅 등을 활용하여 모던 웹 애플리케이션을 구축합니다.
-   **Database**: [Supabase](https://supabase.io/)
    -   PostgreSQL 기반의 오픈소스 Firebase 대체재. 사용자 인증, 데이터베이스, 실시간 기능 등을 제공합니다.
-   **Deployment**: [Vercel](https://vercel.com/)
    -   Next.js와 완벽하게 통합된 배포 플랫폼.
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
    -   Utility-first CSS 프레임워크를 사용하여 빠르고 일관된 스타일링을 적용합니다.
-   **Testing**: [Playwright](https://playwright.dev/)
    -   End-to-end 테스트를 위한 자동화 라이브러리.

## 🚀 핵심 기능

(기존 내용과 동일)

## 📝 데이터베이스 스키마 (Supabase)

### `pets` 테이블
-   `id`: `uuid` (Primary Key)
-   `user_id`: `uuid` (Foreign Key to `auth.users`)
-   `name`: `text` (펫 이름)
-   `energy`: `integer` (에너지 레벨)
-   `signal`: `integer` (통신 감도 레벨)
-   `created_at`: `timestamp`

### `subscribers` 테이블 (사전 등록용)
-   `id`: `bigint` (Primary Key)
-   `email`: `text` (구독자 이메일, UNIQUE)
-   `created_at`: `timestamptz`

## 📚 공식 문서

-   [Next.js Documentation](https://nextjs.org/docs)
-   [Supabase Documentation](https://supabase.com/docs)
-   [Tailwind CSS Documentation](https://tailwindcss.com/docs)
-   [Playwright Documentation](https://playwright.dev/docs/intro)
