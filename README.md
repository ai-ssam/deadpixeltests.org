# 🖥️ Monitor Perfect Test Checks (모니터 무결점 테스트)

Web-based monitor testing utility for checking dead pixels, backlight bleeding, contrast, response rate, and more.
웹 기반의 모니터 테스트 도구입니다. 불량화소, 빛샘, 명암비, 응답속도 등 14가지 필수 항목을 검사할 수 있습니다.

## ✨ Features (주요 기능)

Provides 14 specialized tests in a single page SPA (Single Page Application).
14가지 전문 테스트를 단일 페이지 앱(SPA)으로 제공합니다.

1. **Dead Pixel (불량화소)**: Check for dead or stuck pixels with solid colors.
2. **Viewing Angle (시야각)**: Check color shifts from different angles.
3. **Contrast (명암비)**: Test gradation, black levels, and white levels.
4. **Readability (가독성)**: Verify text sharpness and clarity.
5. **Color Difference (색상비)**: Distinguish subtle color variations.
6. **Response Rate (응답속도)**: Check for motion blur and ghosting (Hz check).
7. **Gamma (감마)**: Verify mid-tone brightness (1.8, 2.2, 2.6).
8. **Uniformity (빛샘/멍)**: Check backlight uniformity.
9. **Burn-in (잔상/번인)**: Test for image retention.
10. **White Balance (화이트 밸런스)**: Check neutral white tone.
11. **Black Balance (블랙 밸런스)**: Check deep black levels.
12. **Image Quality (이미지 표현)**: Natural color check via high-quality photos.
13. **Screen Adjust (화면조정)**: Check screen alignment and geometry.
14. **Pixel Fixer (불량화소 복구)**: Rapid flashing utility to unstuck pixels.

## 🌍 Internationalization (다국어 지원)

Supports **11 languages** with auto-detection and manual switching:
- 🇰🇷 Korean (한국어)
- 🇺🇸 English (영어)
- 🇯🇵 Japanese (일본어)
- 🇨🇳 Chinese (중국어)
- 🇪🇸 Spanish (스페인어)
- 🇫🇷 French (프랑스어)
- 🇩🇪 German (독일어)
- 🇷🇺 Russian (러시아어)
- 🇮🇹 Italian (이탈리아어)
- 🇧🇷 Portuguese (포르투갈어)
- 🇹🇷 Turkish (터키어)

## 🛠️ Technology Stack (기술 스택)

- **Core**: HTML5, Vanilla JavaScript (ES6+ Modules), CSS3
- **Libraries**:
    - `flag-icons` (CSS for flag icons)
    - Google Fonts (Noto Sans KR)
- **Architecture**:
    - Component-based Test Classes
    - Centralized `I18n` Module
    - Responsive 3-Column Layout (AdSense Friendly)

## 📂 Project Structure

```
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   ├── app.js          # Main entry point
│   ├── i18n.js         # Internationalization dictionary & logic
│   └── tests/          # Individual test modules
│       ├── BaseTest.js # Base class for tests
│       ├── deadPixel.js
│       ├── contrast.js
│       └── ...
├── dev_plan/           # Development docs
├── index.html          # Main application file
└── README.md           # Project documentation
```

## 🚀 How to Run (실행 방법)

Simply open `index.html` in any modern web browser.
웹 브라우저에서 `index.html` 파일을 열기만 하면 됩니다.

Because it uses ES Modules, if you encounter CORS errors locally, please use a local server:
ES 모듈을 사용하므로 로컬에서 CORS 오류가 발생할 경우, 로컬 서버를 사용하세요:

```bash
# Using VS Code Live Server extension recommended
# Or with Python:
python -m http.server
# Or with Node.js serve:
npx serve .
```

## 💰 Monetization

Integrated with **Google AdSense**:
- Top Banner (Responsive)
- Bottom Banner (Responsive)
- Side Skyscrapers (160x600, Desktop Only)

---
© 2026 Helper Monitor Test Project. All rights reserved.
