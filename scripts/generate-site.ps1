$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$siteUrl = 'https://deadpixeltests.org'
$today = '2026-03-28'
$locales = @('en', 'ko', 'ja', 'zh')

function Write-Utf8NoBom {
    param([string]$Path, [string]$Content)
    $directory = Split-Path -Parent $Path
    if ($directory -and -not (Test-Path $directory)) {
        New-Item -ItemType Directory -Force -Path $directory | Out-Null
    }
    $encoding = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($Path, $Content, $encoding)
}

function LocalePath {
    param([string]$Locale, [string]$Slug = '')
    if ($Locale -eq 'root') { return $Slug }
    if ([string]::IsNullOrWhiteSpace($Slug)) { return "$Locale/index.html" }
    return "$Locale/$Slug"
}

function UrlFor {
    param([string]$Locale, [string]$Slug = '')
    if ($Locale -eq 'root') {
        if ([string]::IsNullOrWhiteSpace($Slug)) { return "$siteUrl/" }
        return "$siteUrl/$Slug"
    }
    if ([string]::IsNullOrWhiteSpace($Slug)) { return "$siteUrl/$Locale/" }
    return "$siteUrl/$Locale/$Slug"
}

function AlternateLinks {
    param([string]$Slug)
    $links = @()
    foreach ($locale in $locales) {
        $links += "    <link rel=""alternate"" hreflang=""$locale"" href=""$(UrlFor $locale $Slug)"">"
    }
    $links += "    <link rel=""alternate"" hreflang=""x-default"" href=""$(UrlFor 'root' $Slug)"">"
    return ($links -join "`n")
}

function JsonLd {
    param([hashtable]$Payload)
    return ($Payload | ConvertTo-Json -Depth 10 -Compress)
}

$copy = @{
    en = @{
        htmlLang = 'en'; siteName = 'Monitor and Dead Pixel Test'; tag = 'Independent browser-based display diagnostics';
        heroEyebrow = 'AdSense-ready multilingual display help center';
        heroTitle = 'Test your monitor and understand what the screen is telling you.';
        heroLead = 'Use browser-based checks for dead pixels, light bleed, ghosting, gamma, and burn-in, then read the judgment guides before deciding whether you need a return, service request, or calibration change.';
        heroPrimary = 'Run Dead Pixel Test'; heroSecondary = 'Browse diagnostic guides';
        navGuides = 'Guides'; navMethodology = 'Methodology'; navAbout = 'About'; navContact = 'Contact';
        stepsTitle = 'How to use this site without misreading the results';
        stepsLead = 'Monitor defects are easy to overreport. Follow the same order each time so your findings are repeatable.';
        modesTitle = 'Diagnostic modes'; modesLead = 'The homepage keeps direct access to high-value tests while the guides explain how to interpret them.';
        guidesTitle = 'Core guides for search traffic and AdSense review'; guidesLead = 'Each guide is written as a standalone answer page with method, judgment criteria, and limitations.';
        trustTitle = 'Why this site is structured for trust'; faqTitle = 'Frequently asked questions';
        guideHubTitle = 'Monitor test guides'; guideHubLead = 'Use these pages before making a warranty claim or assuming your panel is defective.';
        methodologyTitle = 'Methodology'; methodologyLead = 'We document what each test can prove, what it cannot prove, and which external conditions can change the result.';
        aboutTitle = 'About this project'; aboutLead = 'Monitor and Dead Pixel Test is an independent display diagnostics site for buyers, gamers, office users, and support teams that need repeatable visual checks.';
        contactTitle = 'Contact'; contactLead = 'Use the contact channel below for factual corrections, translation feedback, panel-specific requests, or browser compatibility reports.';
        privacyTitle = 'Privacy policy'; privacyLead = 'This site is designed to run tests in the browser without an account system. The policy below matches the current deployment state.';
        footerNote = 'Last major content update: 2026-03-28'; footerTrust = 'Operated as an independent multilingual monitor diagnostics site.';
        relatedLabel = 'Related tools'; mistakesLabel = 'Common mistakes'; checklistLabel = 'Recommended checklist'; overviewLabel = 'Overview'; judgeLabel = 'How to judge the result'; limitsLabel = 'Limits'; runTests = 'Run tests'; openPage = 'Open page';
        stats = @(
            @{ title = '18 browser tests'; text = 'Static, motion, and practical panel checks in one place.' },
            @{ title = '4 published languages'; text = 'English, Korean, Japanese, and Chinese pages stay aligned.' },
            @{ title = 'No account required'; text = 'Tests run in the browser and the guides explain the limits.' }
        );
        steps = @(
            @{ title = '1. Warm up the panel'; text = 'Use the display at native resolution, disable aggressive enhancement modes, and let it stabilize for at least 10 minutes.' },
            @{ title = '2. Run the right pattern'; text = 'Start with dead pixel, uniformity, and contrast checks, then move to motion, gamma, and burn-in if needed.' },
            @{ title = '3. Judge before reacting'; text = 'Use the guides to separate true defects from IPS glow, browser timing variance, reflections, and normal panel behavior.' }
        );
        trust = @(
            @{ title = 'Named operating policy'; text = 'About, contact, privacy, and methodology pages explain who runs the site and how updates are handled.' },
            @{ title = 'Original diagnostic content'; text = 'Guide pages explain symptoms and false positives instead of repeating generic marketing copy.' },
            @{ title = 'No forced language redirect'; text = 'Browser language is used only for recommendation so the visitor stays in control.' }
        );
        faq = @(
            @{ q = 'Can a website repair a physically dead pixel?'; a = 'No. A physically dead subpixel cannot be repaired by software. The pixel fixer may only help a stuck pixel in some cases.' },
            @{ q = 'Why does the motion result differ from the monitor OSD?'; a = 'Browser timing, compositing, and V-Sync behavior can shift the result. Use motion tools as practical indicators, not as lab instruments.' },
            @{ q = 'Is one bright corner always a defect?'; a = 'Not always. IPS glow, off-axis tint, and room reflections can imitate light bleed. Re-check from your normal seat in a dark room first.' }
        );
        methodologySections = @(
            @{ title = 'Visual-first testing'; text = 'These patterns are designed to expose visible issues in normal use. They do not replace lab-grade hardware instruments.' },
            @{ title = 'Environmental controls'; text = 'Brightness, room lighting, warm-up state, browser zoom, OS scaling, and viewing angle can all change the outcome.' },
            @{ title = 'Human reaction limits'; text = 'Input-lag and motion tools include your own reaction time and browser scheduling variance. Use them for relative comparison.' }
        );
        aboutSections = @(
            @{ title = 'Editorial approach'; text = 'The site avoids perfect-score claims and focuses on what a visitor can actually verify on a real panel.' },
            @{ title = 'Who it is for'; text = 'The audience includes people checking a newly delivered monitor, comparing settings after calibration, and preparing support evidence.' },
            @{ title = 'Update policy'; text = 'Guides and tests are revised when we can clarify judgment criteria, add stronger examples, or remove misleading claims.' }
        );
        contactSections = @(
            @{ title = 'Operating contact'; text = 'Brand: Dead Pixel Tests`nEmail: master@deadpixeltests.org' },
            @{ title = 'What to include'; text = 'Include monitor model, resolution, refresh rate, browser version, operating system, and what you expected to see.' },
            @{ title = 'Response window'; text = 'Routine factual corrections are usually reviewed within three business days.' }
        );
        privacySections = @(
            @{ title = 'Server logs'; text = 'Basic web logs may include IP address, request path, referrer, and user agent for uptime monitoring and abuse prevention.' },
            @{ title = 'On-page tests'; text = 'Test interactions are processed locally in the browser. The site does not require visitors to submit personal profiles.' },
            @{ title = 'Cookies and advertising'; text = 'Only essential language-preference storage is used at this stage. If analytics or advertising cookies are introduced later, this policy will be updated first.' }
        )
    }
    ko = @{
        htmlLang = 'ko'; siteName = '모니터 불량 화소 테스트'; tag = '광고 심사 대응형 다국어 모니터 진단 사이트';
        heroEyebrow = '애드센스 승인 대응형 다국어 디스플레이 가이드';
        heroTitle = '모니터를 테스트하고, 결과를 잘못 해석하지 않도록 설명까지 제공합니다.';
        heroLead = '불량 화소, 빛샘, 잔상, 감마, 번인 테스트를 브라우저에서 실행하고, 교환이나 AS를 판단하기 전에 어떤 결과가 실제 결함인지 가이드에서 확인할 수 있습니다.';
        heroPrimary = '불량 화소 테스트 실행'; heroSecondary = '진단 가이드 보기';
        navGuides = '가이드'; navMethodology = '방법론'; navAbout = '소개'; navContact = '문의';
        stepsTitle = '오진 없이 사용하는 기본 순서'; stepsLead = '모니터 결함은 환경 영향을 많이 받습니다. 같은 순서로 확인해야 결과를 비교할 수 있습니다.';
        modesTitle = '진단 모드'; modesLead = '홈에서는 핵심 테스트를 바로 실행할 수 있고, 각 가이드에서는 판독 기준과 한계를 따로 설명합니다.';
        guidesTitle = '검색 유입과 심사 대응을 위한 핵심 가이드'; guidesLead = '각 문서는 정의, 테스트 방법, 판독 기준, 흔한 오해, 관련 도구를 한 페이지에서 설명합니다.';
        trustTitle = '이 사이트를 신뢰형 정보 페이지로 보이게 하는 구조'; faqTitle = '자주 묻는 질문';
        guideHubTitle = '모니터 테스트 가이드'; guideHubLead = '교환이나 AS 요청 전, 아래 문서로 증상과 판독 기준을 먼저 확인하세요.';
        methodologyTitle = '방법론'; methodologyLead = '각 테스트가 무엇을 보여주고, 무엇은 보여주지 못하는지, 어떤 환경 변수가 결과를 흔드는지 공개합니다.';
        aboutTitle = '프로젝트 소개'; aboutLead = '모니터 불량 화소 테스트는 새 모니터 점검, 캘리브레이션 확인, 지원 문의 준비에 도움이 되는 독립형 디스플레이 진단 사이트입니다.';
        contactTitle = '문의'; contactLead = '사실 관계 정정, 번역 수정, 패널별 요청, 특정 브라우저나 GPU에서의 동작 문제 제보는 아래 연락처로 보내주세요.';
        privacyTitle = '개인정보처리방침'; privacyLead = '이 사이트는 로그인 없이 브라우저 안에서 테스트를 실행하는 구조를 기준으로 운영됩니다. 아래 내용은 현재 배포 상태에 맞춰 작성되었습니다.';
        footerNote = '마지막 주요 콘텐츠 업데이트: 2026-03-28'; footerTrust = '독립 운영형 다국어 모니터 진단 사이트로 관리합니다.';
        relatedLabel = '관련 도구'; mistakesLabel = '자주 하는 오해'; checklistLabel = '권장 확인 순서'; overviewLabel = '개요'; judgeLabel = '결과 판단 기준'; limitsLabel = '한계'; runTests = '테스트 실행'; openPage = '페이지 열기';
        stats = @(
            @{ title = '18개 테스트'; text = '정지 화면, 모션, 실사용 기준 점검 모드를 한곳에서 제공합니다.' },
            @{ title = '4개 언어 운영'; text = '영어, 한국어, 일본어, 중국어 페이지 구조를 함께 유지합니다.' },
            @{ title = '회원가입 없음'; text = '핵심 테스트는 브라우저에서 실행되고, 판독 기준은 문서로 설명합니다.' }
        );
        steps = @(
            @{ title = '1. 패널을 예열합니다'; text = '해상도를 기본값으로 두고 과도한 보정 기능을 끈 뒤 최소 10분 이상 켜 두세요.' },
            @{ title = '2. 맞는 패턴부터 실행합니다'; text = '불량 화소, 균일도, 명암비를 먼저 보고, 필요할 때 잔상, 감마, 번인 테스트로 넘어가세요.' },
            @{ title = '3. 바로 결론내리지 않습니다'; text = 'IPS 글로우, 시야각 색편차, 반사광을 결함으로 착각하지 않도록 가이드를 함께 확인하세요.' }
        );
        trust = @(
            @{ title = '운영 정보 공개'; text = '소개, 문의, 개인정보처리방침, 방법론 페이지에서 운영 원칙과 업데이트 기준을 명시합니다.' },
            @{ title = '원문형 진단 콘텐츠'; text = '단순 도구 나열이 아니라 실제 증상과 판독법을 문서로 제공합니다.' },
            @{ title = '강제 언어 이동 없음'; text = '브라우저 언어를 추천에만 사용하고, 사용자가 직접 언어를 선택할 수 있게 합니다.' }
        );
        faq = @(
            @{ q = '웹사이트로 실제 불량 화소를 고칠 수 있나요?'; a = '아니요. 물리적으로 죽은 서브픽셀은 소프트웨어로 수리할 수 없습니다. 픽셀 복구 모드는 일부 고정 화소에만 제한적으로 도움이 될 수 있습니다.' },
            @{ q = '잔상 테스트 결과가 모니터 OSD와 다른 이유는 무엇인가요?'; a = '브라우저 렌더링과 합성 방식 때문에 차이가 생길 수 있습니다. 실사용 지표로 보되, 장비 측정 대체값으로 보지는 마세요.' },
            @{ q = '모서리 한쪽이 밝으면 무조건 빛샘인가요?'; a = '그렇지 않습니다. IPS 글로우, OLED 시야각 변화, 주변 반사가 비슷하게 보일 수 있으므로 어두운 환경에서 정면 기준으로 다시 확인해야 합니다.' }
        );
        methodologySections = @(
            @{ title = '시각 중심 진단'; text = '이 사이트는 실제 사용 중 눈으로 보이는 문제를 찾기 위한 패턴을 제공합니다. 계측 장비를 대체하는 목적은 아닙니다.' },
            @{ title = '환경 변수 공개'; text = '밝기 설정, 실내 조명, 예열 상태, 브라우저 확대 비율, 운영체제 배율, 시야각은 모두 결과를 바꿀 수 있습니다.' },
            @{ title = '사람 반응 시간 한계'; text = '입력 지연과 모션 테스트에는 사용자의 반응 시간과 브라우저 스케줄링 오차가 함께 포함됩니다.' }
        );
        aboutSections = @(
            @{ title = '편집 원칙'; text = '광고성 표현 대신, 실제 패널에서 사용자가 스스로 확인할 수 있는 근거를 우선합니다.' },
            @{ title = '대상 사용자'; text = '새 제품 초기 불량을 확인하는 구매자, 설정 변경 후 화면 상태를 비교하는 사용자, 판매자나 제조사에 증빙을 준비하는 지원 담당자를 포함합니다.' },
            @{ title = '업데이트 기준'; text = '판독 기준을 더 명확하게 만들거나 잘못된 오해를 줄일 수 있을 때 문서와 도구를 수정합니다.' }
        );
        contactSections = @(
            @{ title = '운영 연락처'; text = '브랜드: Dead Pixel Tests`n이메일: master@deadpixeltests.org' },
            @{ title = '함께 보내면 좋은 정보'; text = '모니터 모델명, 해상도, 주사율, 브라우저 버전, 운영체제, 기대한 결과와 실제 보인 화면을 함께 적어 주세요.' },
            @{ title = '응답 기준'; text = '일반적인 사실 정정과 페이지 수정 요청은 보통 영업일 기준 3일 이내에 확인합니다.' }
        );
        privacySections = @(
            @{ title = '서버 로그'; text = '기본 웹 로그에는 안정성 확인과 남용 방지를 위해 IP 주소, 요청 경로, 참조 정보, 브라우저 식별 정보가 포함될 수 있습니다.' },
            @{ title = '테스트 실행 데이터'; text = '핵심 테스트는 브라우저 안에서 처리됩니다. 사용자가 결과를 제출하거나 계정을 만들지 않아도 도구를 사용할 수 있습니다.' },
            @{ title = '쿠키와 광고'; text = '현재는 언어 선택 유지에 필요한 최소 저장만 사용합니다. 향후 광고 또는 분석 쿠키를 도입하는 경우 실제 반영 전에 이 문서를 갱신합니다.' }
        )
    }
}
$copy['ja'] = @{
    htmlLang = 'ja'; siteName = 'モニター不良画素テスト'; tag = '多言語対応の独立ディスプレイ診断サイト';
    heroEyebrow = 'AdSense 審査を意識した多言語ディスプレイヘルプ';
    heroTitle = 'モニターをテストし、結果を誤読しないための説明までまとめています。';
    heroLead = '不良画素、光漏れ、残像、ガンマ、焼き付きのチェックをブラウザで実行し、その結果が本当に交換や修理判断につながるのかを各ガイドで確認できます。';
    heroPrimary = '不良画素テストを開始'; heroSecondary = '診断ガイドを見る';
    navGuides = 'ガイド'; navMethodology = '方法論'; navAbout = 'サイト情報'; navContact = 'お問い合わせ';
    stepsTitle = '誤判定を減らす使い方'; stepsLead = 'パネルの見え方は環境で変わります。毎回同じ順序で確認すると比較しやすくなります。';
    modesTitle = '診断モード'; modesLead = 'ホームから主要テストをすぐに実行し、詳細な判断基準は各ガイドで確認できます。';
    guidesTitle = '検索流入と審査に強いコアガイド'; guidesLead = '各ページは定義、テスト方法、判断基準、よくある誤解、関連ツールをまとめた独立ページです。';
    trustTitle = '信頼性を高めるための構成'; faqTitle = 'よくある質問';
    guideHubTitle = 'モニターテストガイド'; guideHubLead = '交換や修理を申請する前に、症状と判断基準をこのページ群で確認してください。';
    methodologyTitle = '方法論'; methodologyLead = '各テストで分かること、分からないこと、結果に影響する条件を公開します。';
    aboutTitle = 'このプロジェクトについて'; aboutLead = 'モニター不良画素テストは、新品チェック、設定変更後の比較、サポート相談前の証拠整理に役立つ独立型ディスプレイ診断サイトです。';
    contactTitle = 'お問い合わせ'; contactLead = '事実関係の修正、翻訳の改善提案、パネル別の要望、特定ブラウザや GPU での動作報告は以下の連絡先へお送りください。';
    privacyTitle = 'プライバシーポリシー'; privacyLead = 'このサイトはアカウント登録なしでブラウザ内テストを実行する構成を前提にしています。以下は現在の運用状態に合わせた内容です。';
    footerNote = '最終更新日: 2026-03-28'; footerTrust = '独立運営の多言語モニター診断サイトとして管理しています。';
    relatedLabel = '関連ツール'; mistakesLabel = 'よくある誤解'; checklistLabel = '確認チェックリスト'; overviewLabel = '概要'; judgeLabel = '判断の見方'; limitsLabel = '限界'; runTests = 'テストを実行'; openPage = 'ページを開く';
    stats = @(@{ title = '18種類のテスト'; text = '静止画、動画、実用判断に役立つモードをまとめています。' }, @{ title = '4言語公開'; text = '英語、韓国語、日本語、中国語の構成をそろえています。' }, @{ title = 'アカウント不要'; text = '主要テストはブラウザで実行され、制約は文書で説明します。' });
    steps = @(@{ title = '1. パネルを安定させる'; text = 'ネイティブ解像度に戻し、過度な補正機能を切り、少なくとも 10 分はウォームアップしてください。' }, @{ title = '2. 適切なパターンを使う'; text = 'まず不良画素、均一性、コントラストを確認し、必要に応じて残像、ガンマ、焼き付きを見ます。' }, @{ title = '3. すぐに欠陥と決めつけない'; text = 'IPS グロー、視野角による色変化、反射を区別するため、ガイドも必ず確認してください。' });
    trust = @(@{ title = '運営情報を公開'; text = 'About、Contact、Privacy、Methodology ページで運営方針と更新基準を説明します。' }, @{ title = '独自の診断解説'; text = 'ツール一覧だけで終わらせず、実際の症状と判定の考え方を文章で提供します。' }, @{ title = '強制的な言語移動なし'; text = 'ブラウザ言語はおすすめ表示にのみ使い、訪問者が自分で言語を選べます。' });
    faq = @(@{ q = 'サイトだけで本当に不良画素を直せますか？'; a = 'いいえ。物理的に壊れたサブピクセルはソフトウェアでは修復できません。ピクセル修復モードは一部の stuck pixel に限って補助になる場合があります。' }, @{ q = '残像テストの結果がモニター OSD と違うのはなぜですか？'; a = 'ブラウザのレンダリングや V-Sync の動作によって差が出ます。実用的な目安として使い、計測器の代替とは考えないでください。' }, @{ q = '四隅が明るいと必ず光漏れですか？'; a = '必ずしもそうではありません。IPS グローや反射が似た見え方をするため、暗室で正面から再確認してください。' });
    methodologySections = @(@{ title = '視覚中心の診断'; text = 'このサイトは日常使用で見える問題を把握するためのパターンを提供します。色度計やオシロスコープの代替ではありません。' }, @{ title = '環境条件の明示'; text = '輝度設定、部屋の明るさ、ウォームアップ、ブラウザ倍率、OS スケーリング、視野角は結果を左右します。' }, @{ title = '反応時間の限界'; text = '入力遅延やモーション系の結果には、利用者自身の反応とブラウザのスケジューリング誤差が含まれます。' });
    aboutSections = @(@{ title = '編集方針'; text = '誇張したスコアではなく、実際のパネルで訪問者が自分で確認できる根拠を優先します。' }, @{ title = '想定読者'; text = '新しく届いたモニターを確認する人、調整後の状態を比較する人、販売店やメーカーに問い合わせる前の準備をしたい人を想定しています。' }, @{ title = '更新基準'; text = '判定基準を明確にできるとき、誤解を減らせるとき、説明を強化できるときにガイドとテストを更新します。' });
    contactSections = @(@{ title = '運営連絡先'; text = 'ブランド: Dead Pixel Tests`nメール: master@deadpixeltests.org' }, @{ title = '記載してほしい内容'; text = 'モニターモデル、解像度、リフレッシュレート、ブラウザ版、OS、期待していた表示と実際の見え方を添えてください。' }, @{ title = '対応目安'; text = '通常の事実修正は 3 営業日以内を目安に確認します。' });
    privacySections = @(@{ title = 'サーバーログ'; text = '稼働監視、不正利用対策、障害調査のために IP、パス、参照元、ユーザーエージェントを含む基本ログを取得する場合があります。' }, @{ title = 'テストの処理'; text = '主要テストはブラウザ内で処理されます。画面結果の送信や会員登録なしで利用できます。' }, @{ title = 'Cookie と広告'; text = '現時点では言語設定保持のための最小限の保存のみを使用します。将来、広告や分析 Cookie を導入する場合は導入前に本ページを更新します。' })
}

$copy['zh'] = @{
    htmlLang = 'zh'; siteName = '显示器坏点测试'; tag = '面向多语言用户的独立显示器诊断站点';
    heroEyebrow = '为 AdSense 审核准备的多语言显示器帮助中心'; heroTitle = '不仅能测试显示器，还解释这些结果到底意味着什么。'; heroLead = '在浏览器中运行坏点、漏光、拖影、伽马和烧屏检查，并在决定退换货、报修或调校之前，先阅读对应的判断指南。'; heroPrimary = '开始坏点测试'; heroSecondary = '查看诊断指南'; navGuides = '指南'; navMethodology = '方法说明'; navAbout = '关于'; navContact = '联系'; stepsTitle = '减少误判的使用顺序'; stepsLead = '显示器问题很容易受环境影响。每次按同样顺序检查，更容易比较结果。'; modesTitle = '诊断模式'; modesLead = '首页保留高频测试直达入口，详细的判断依据则放在各自的说明页中。'; guidesTitle = '用于搜索流量和审核准备的核心指南'; guidesLead = '每篇指南都作为独立答案页，包含定义、测试方法、判断标准、常见误解和相关工具。'; trustTitle = '让站点更像可信信息站而不是单纯工具页'; faqTitle = '常见问题'; guideHubTitle = '显示器测试指南'; guideHubLead = '在申请退换货或售后之前，先用这些页面确认症状和判断标准。'; methodologyTitle = '方法说明'; methodologyLead = '我们会说明每项测试能证明什么、不能证明什么，以及哪些外部条件会改变结果。'; aboutTitle = '关于本站'; aboutLead = '显示器坏点测试是一个独立运营的显示器诊断站点，适合新机验货、校准后对比，以及售后沟通前的证据整理。'; contactTitle = '联系'; contactLead = '如需提交事实修正、翻译建议、面板专题需求，或反馈某个浏览器或 GPU 上的异常表现，请通过以下方式联系。'; privacyTitle = '隐私政策'; privacyLead = '本站以“无需账号、在浏览器内直接运行测试”为前提。以下内容与当前部署状态保持一致。'; footerNote = '最近一次主要内容更新：2026-03-28'; footerTrust = '按独立运营的多语言显示器诊断站点维护。'; relatedLabel = '相关工具'; mistakesLabel = '常见误判'; checklistLabel = '建议检查清单'; overviewLabel = '概述'; judgeLabel = '如何判断结果'; limitsLabel = '局限'; runTests = '运行测试'; openPage = '打开页面';
    stats = @(@{ title = '18 项测试'; text = '覆盖静态图、动态表现和实际排查场景。' }, @{ title = '4 种已发布语言'; text = '英文、韩文、日文和中文页面结构保持一致。' }, @{ title = '无需账号'; text = '核心测试在浏览器中运行，判断依据与限制通过文档说明。' });
    steps = @(@{ title = '1. 先让面板稳定'; text = '恢复原生分辨率，关闭过度增强功能，并至少预热 10 分钟。' }, @{ title = '2. 先跑基础图案'; text = '优先检查坏点、均匀性和对比度，再视需要进入拖影、伽马和烧屏测试。' }, @{ title = '3. 不要立刻下结论'; text = 'IPS glow、可视角偏色和环境反光都可能被误认成缺陷，请结合指南一起判断。' });
    trust = @(@{ title = '公开运营信息'; text = 'About、Contact、Privacy、Methodology 页面说明运营原则和更新标准。' }, @{ title = '原创诊断内容'; text = '不仅列出工具，还解释真实症状和判断思路。' }, @{ title = '不做强制跳转'; text = '浏览器语言只用于推荐，不会强制把访客跳到别的语言。' });
    faq = @(@{ q = '网站真的能修复物理坏点吗？'; a = '不能。物理损坏的子像素无法通过软件修复。像素修复模式只可能对部分卡住像素有一定帮助。' }, @{ q = '为什么拖影结果和显示器 OSD 不一样？'; a = '浏览器渲染和 V-Sync 行为都会影响结果。请把这些工具当作实用参考，而不是硬件测量替代。' }, @{ q = '角落发亮就一定是漏光吗？'; a = '不一定。IPS glow、侧视偏色以及环境反光都可能造成相似观感，请在暗室、正视位置再次确认。' });
    methodologySections = @(@{ title = '以肉眼判断为核心'; text = '本站提供的是日常使用场景下可见问题的检查图案，并不替代色度计或示波器等专业设备。' }, @{ title = '公开环境变量'; text = '亮度、室内光线、预热、浏览器缩放、系统缩放和可视角都会影响结果。' }, @{ title = '人的反应极限'; text = '输入延迟和动态测试包含人为反应时间与浏览器调度误差，更适合做相对比较。' });
    aboutSections = @(@{ title = '编辑原则'; text = '我们不追求夸张的满分结论，而是优先提供访客自己能够验证的判断依据。' }, @{ title = '适用人群'; text = '包括新显示器买家、需要比较调校前后差异的用户，以及准备联系商家或厂商支持的团队。' }, @{ title = '更新标准'; text = '当我们能进一步澄清判断标准、减少误解或提升说明质量时，会更新指南和测试页面。' });
    contactSections = @(@{ title = '运营联系方式'; text = '品牌：Dead Pixel Tests`n邮箱：master@deadpixeltests.org' }, @{ title = '建议附带的信息'; text = '请提供显示器型号、分辨率、刷新率、浏览器版本、操作系统，以及您预期看到的结果。' }, @{ title = '回复时间'; text = '常规事实修正一般会在三个工作日内查看。' });
    privacySections = @(@{ title = '服务器日志'; text = '为了稳定性监控、滥用防护和故障排查，基础日志可能包含 IP、请求路径、来源页面和用户代理。' }, @{ title = '测试处理方式'; text = '核心测试在浏览器本地执行。访客无需上传屏幕结果或创建账号即可使用主要功能。' }, @{ title = 'Cookie 与广告'; text = '当前仅使用维持语言选择所需的最小本地存储。如果未来引入广告或分析 Cookie，会在上线前先更新此页面。' })
}
$tests = @(
    @{ key = 'deadPixel'; icon = '🔍'; title = @{ en = 'Dead Pixel'; ko = '불량 화소'; ja = '不良画素'; zh = '坏点检测' }; desc = @{ en = 'Cycle solid colors to spot dead, stuck, or hot pixels.'; ko = '단색 화면을 순환해 죽은 화소, 고정 화소, 과점등 화소를 확인합니다.'; ja = '単色画面を切り替えて不良画素や stuck pixel を見つけます。'; zh = '切换纯色画面以发现坏点、卡点或亮点。' } },
    @{ key = 'uniformity'; icon = '🕯️'; title = @{ en = 'Light Bleed & Uniformity'; ko = '빛샘과 균일도'; ja = '光漏れと均一性'; zh = '漏光与均匀性' }; desc = @{ en = 'Inspect dark-room glow, edge bleed, and dirty-screen patterns.'; ko = '어두운 환경에서 빛샘, 가장자리 밝기, 얼룩을 점검합니다.'; ja = '暗い部屋で光漏れ、四隅の明るさ、ムラを確認します。'; zh = '在暗环境中检查漏光、边缘亮斑和脏屏现象。' } },
    @{ key = 'contrast'; icon = '🌗'; title = @{ en = 'Contrast'; ko = '명암비'; ja = 'コントラスト'; zh = '对比度' }; desc = @{ en = 'Check black crush and clipped highlights before judging panel range.'; ko = '암부 뭉개짐과 밝은 영역 손실을 함께 확인합니다.'; ja = '黒つぶれと白飛びをまとめて確認します。'; zh = '同时检查暗部死黑和高光丢失。' } },
    @{ key = 'responseRate'; icon = '🚀'; title = @{ en = 'Motion & Ghosting'; ko = '잔상과 응답속도'; ja = '残像と応答速度'; zh = '拖影与响应速度' }; desc = @{ en = 'Review blur, overshoot, and trailing behavior in motion.'; ko = '움직임에서 번짐, 역잔상, 궤적을 확인합니다.'; ja = '動く対象のぼやけ、オーバーシュート、残像を確認します。'; zh = '观察动态中的模糊、反向拖影和尾迹。' } },
    @{ key = 'gamma'; icon = '📊'; title = @{ en = 'Gamma'; ko = '감마'; ja = 'ガンマ'; zh = '伽马' }; desc = @{ en = 'Find whether midtones are too dark, too light, or appropriately balanced.'; ko = '중간톤이 너무 어둡거나 밝지 않은지 확인합니다.'; ja = '中間調が暗すぎるか明るすぎるかを確認します。'; zh = '检查中间调是否过暗、过亮或基本正常。' } },
    @{ key = 'burnIn'; icon = '👻'; title = @{ en = 'Burn-in'; ko = '번인'; ja = '焼き付き'; zh = '烧屏' }; desc = @{ en = 'Look for retained UI shapes, logos, and persistent shadows.'; ko = '잔상처럼 남아 있는 UI, 로고, 그림자를 확인합니다.'; ja = '残ったロゴや UI の影、持続的な残像を確認します。'; zh = '检查残留的界面轮廓、徽标和阴影。' } },
    @{ key = 'pixelFixer'; icon = '⚠️'; title = @{ en = 'Pixel Fixer'; ko = '픽셀 복구'; ja = 'ピクセル修復'; zh = '像素修复' }; desc = @{ en = 'Flashing recovery mode intended only for stuck-pixel attempts.'; ko = '고정 화소 복구를 시도하는 점멸 모드입니다.'; ja = 'stuck pixel に限定して試す点滅モードです。'; zh = '仅用于尝试修复卡住像素的闪烁模式。' } },
    @{ key = 'refreshCadence'; icon = '🧭'; title = @{ en = 'Refresh Cadence'; ko = '주사율 리듬'; ja = 'リフレッシュ解析'; zh = '刷新节奏' }; desc = @{ en = 'Estimate browser frame pacing stability in real time.'; ko = '브라우저 프레임 간격 안정성을 실시간으로 확인합니다.'; ja = 'ブラウザのフレーム間隔の安定性を見ます。'; zh = '实时估算浏览器帧节奏稳定性。' } }
)

$guides = @(
    @{ slug = 'guides/dead-pixel.html'; key = 'deadPixel'; title = @{ en = 'Dead pixel guide'; ko = '불량 화소 가이드'; ja = '不良画素ガイド'; zh = '坏点判断指南' }; summary = @{ en = 'Tell a dead pixel from dust, a stuck subpixel, or a viewing artifact.'; ko = '먼지, 고정 화소, 착시와 실제 불량 화소를 구분합니다.'; ja = 'ほこりや stuck pixel と本当の不良画素を見分けます。'; zh = '区分真实坏点、灰尘和卡点。' }; intro = @{ en = 'A dead pixel usually stays black on every solid-color pattern. A stuck pixel may stay red, green, blue, or white and can disappear on some backgrounds.'; ko = '불량 화소는 대부분 모든 단색 패턴에서 검게 남습니다. 고정 화소는 특정 색으로 남거나 배경에 따라 덜 보일 수 있습니다.'; ja = '不良画素は多くの場合、どの単色パターンでも黒い点として残ります。stuck pixel は背景によって見え方が変わります。'; zh = '坏点通常会在所有纯色画面上都保持黑色，而卡点会随着背景变化。' }; judge = @{ en = 'If one dot remains black on every color, the panel likely has a dead pixel.'; ko = '한 점이 모든 색에서 계속 검게 남는다면 실제 불량 화소일 가능성이 높습니다.'; ja = 'すべての色で同じ点が黒いままなら不良画素の可能性が高いです。'; zh = '如果同一点在所有颜色下都保持黑色，通常更接近真实坏点。' }; mistakes = @{ en = 'Confusing dust or a microfiber thread with a dead pixel.'; ko = '먼지나 섬유 조각을 불량 화소로 착각하는 경우.'; ja = 'ほこりや繊維を不良画素と勘違いすること。'; zh = '把灰尘或纤维误认成坏点。' }; limits = @{ en = 'Web tests alone cannot prove manufacturer warranty eligibility.'; ko = '웹 테스트만으로 제조사 교환 기준을 확정할 수는 없습니다.'; ja = 'ウェブテストだけでメーカー保証の対象かどうかを確定することはできません。'; zh = '网页测试本身不能直接证明一定符合厂商保修标准。' } },
    @{ slug = 'guides/stuck-pixel.html'; key = 'pixelFixer'; title = @{ en = 'Stuck pixel guide'; ko = '고정 화소 가이드'; ja = 'stuck pixel ガイド'; zh = '卡点判断指南' }; summary = @{ en = 'Understand when a colored subpixel might still change and when recovery attempts are pointless.'; ko = '색이 고정된 화소가 회복 가능성이 있는 경우와 없는 경우를 구분합니다.'; ja = '色付きの stuck pixel が回復しうるケースと期待しにくいケースを整理します。'; zh = '区分哪些彩色卡点还有恢复可能。' }; intro = @{ en = 'A stuck pixel is usually caused by one or more subpixels remaining on a fixed value.'; ko = '고정 화소는 보통 하나 이상의 서브픽셀이 특정 값에 멈춰 있는 상태입니다.'; ja = 'stuck pixel は、1 つ以上のサブピクセルが固定された状態です。'; zh = '卡点通常是某个或多个子像素停留在固定状态。' }; judge = @{ en = 'If the dot sometimes matches the surrounding image and sometimes does not, it is more consistent with a stuck pixel than a dead pixel.'; ko = '같은 점이 어떤 화면에서는 정상처럼 보이고 어떤 화면에서는 튄다면 고정 화소에 가깝습니다.'; ja = '背景によって見えたり見えなかったりするなら、dead pixel より stuck pixel の可能性が高いです。'; zh = '如果同一点在某些画面中看起来正常、在另一些画面中又异常，更像是卡点。' }; mistakes = @{ en = 'Running flashing recovery too long and expecting guaranteed repair.'; ko = '점멸 복구를 너무 오래 돌리면서 확정적 수리를 기대하는 경우.'; ja = '長時間点滅させれば必ず直ると考えること。'; zh = '长时间闪烁并期待一定修好。' }; limits = @{ en = 'No browser tool can tell whether the underlying transistor instability will return.'; ko = '브라우저 도구만으로 내부 구동 불안정이 재발할지 알 수는 없습니다.'; ja = '内部の不安定さが再発するかどうかをブラウザだけで判断することはできません。'; zh = '浏览器工具无法判断底层驱动不稳定是否会再次出现。' } },
    @{ slug = 'guides/light-bleed.html'; key = 'uniformity'; title = @{ en = 'Light bleed and uniformity guide'; ko = '빛샘과 균일도 가이드'; ja = '光漏れと均一性ガイド'; zh = '漏光与均匀性指南' }; summary = @{ en = 'Separate real edge bleed from IPS glow, off-axis tint, and room reflections.'; ko = '실제 빛샘과 IPS 글로우, 시야각 변화, 반사광을 구분합니다.'; ja = '実際の光漏れと IPS グロー、反射を区別します。'; zh = '区分真实漏光、IPS glow 和环境反光。' }; intro = @{ en = 'Light bleed usually appears near panel edges and remains in a similar shape.'; ko = '빛샘은 보통 패널 가장자리 근처에서 비슷한 형태로 반복해서 보입니다.'; ja = '光漏れはパネル端に近い位置で似た形のまま見えることが多いです。'; zh = '漏光通常出现在面板边缘附近，形状相对固定。' }; judge = @{ en = 'If the bright patch moves when you shift your viewing angle, IPS glow is more likely than true edge bleed.'; ko = '밝은 영역이 시야각에 따라 이동하면 실제 빛샘보다 IPS 글로우일 가능성이 높습니다.'; ja = '明るい部分が視野角で動くなら、実際の光漏れより IPS グローの可能性が高いです。'; zh = '如果亮区会随着视角变化而移动，更可能是 IPS glow。' }; mistakes = @{ en = 'Testing at unrealistic maximum brightness.'; ko = '비현실적으로 최대 밝기에서만 보는 경우.'; ja = '最大輝度だけで確認してしまうこと。'; zh = '只在极高亮度下测试。' }; limits = @{ en = 'Camera photos often exaggerate bleed because exposure rises automatically in dark scenes.'; ko = '카메라는 어두운 장면에서 자동 노출을 올려 빛샘을 과장하는 경우가 많습니다.'; ja = '暗い場面ではカメラの露出が上がるため、光漏れが実際より強く写ることがあります。'; zh = '相机会在暗场自动提高曝光，常常把漏光拍得更夸张。' } },
    @{ slug = 'guides/contrast.html'; key = 'contrast'; title = @{ en = 'Contrast guide'; ko = '명암비 가이드'; ja = 'コントラストガイド'; zh = '对比度判断指南' }; summary = @{ en = 'Check black crush, clipped whites, and whether your current settings hide detail.'; ko = '암부 뭉개짐, 화이트 클리핑, 설정으로 인한 디테일 손실을 확인합니다.'; ja = '黒つぶれ、白飛び、設定による階調損失を確認します。'; zh = '检查暗部死黑、高光裁切以及设置导致的细节损失。' }; intro = @{ en = 'Many bad-panel complaints are actually caused by aggressive brightness or contrast settings.'; ko = '많은 패널 불량 의심은 실제로는 밝기, 명암, 동적 보정 설정 때문입니다.'; ja = '多くの不良パネル報告は、実際には輝度やコントラスト設定に由来します。'; zh = '很多“面板有问题”的投诉，实际上来自过激的亮度或对比度设置。' }; judge = @{ en = 'If dark patches merge into one block, you are crushing shadow detail.'; ko = '어두운 단계가 한 덩어리로 보이면 암부가 뭉개진 것입니다.'; ja = '暗部が一塊に見えるなら黒つぶれです。'; zh = '如果暗部块全部融成一片，就是黑位压死。' }; mistakes = @{ en = 'Changing multiple OSD controls at once.'; ko = 'OSD 설정을 여러 개 동시에 바꾸는 경우.'; ja = 'OSD 設定を同時に複数変えること。'; zh = '一次同时改多个 OSD 选项。' }; limits = @{ en = 'A browser pattern cannot measure true contrast ratio numerically.'; ko = '브라우저 패턴으로 실제 명암비 수치를 측정할 수는 없습니다.'; ja = 'ブラウザパターンだけで実際のコントラスト比を数値化することはできません。'; zh = '浏览器图案不能精确测出真实对比度数值。' } },
    @{ slug = 'guides/motion-ghosting.html'; key = 'responseRate'; title = @{ en = 'Motion and ghosting guide'; ko = '잔상과 모션 가이드'; ja = '残像とモーションガイド'; zh = '拖影与动态表现指南' }; summary = @{ en = 'Use motion tests to separate normal blur from overdrive artifacts and pacing issues.'; ko = '정상적인 블러와 오버드라이브 역잔상, 프레임 간격 문제를 구분합니다.'; ja = '通常のぼやけとオーバードライブ由来の残像、フレーム間隔の乱れを分けて見ます。'; zh = '区分正常运动模糊、过冲伪影和帧节奏问题。' }; intro = @{ en = 'Fast movement exposes more than simple response time.'; ko = '빠른 움직임에서는 단순 응답속도 외에도 오버드라이브와 프레임 간격 문제가 드러납니다.'; ja = '高速移動では応答速度だけでなく、オーバードライブやフレーム間隔の乱れも見えます。'; zh = '高速运动场景下，影响观感的不只是响应速度。' }; judge = @{ en = 'Large bright halos behind moving objects usually suggest overdrive overshoot.'; ko = '이동 물체 뒤의 밝은 테두리가 크면 오버드라이브 과보정 가능성이 높습니다.'; ja = '動体の後ろに明るい縁が大きく出るならオーバードライブ過多が疑われます。'; zh = '若移动物体后方出现明显亮边，往往是过驱过头。' }; mistakes = @{ en = 'Testing through remote desktop or screen recording.'; ko = '원격 데스크톱이나 화면 녹화 상태에서 테스트하는 경우.'; ja = 'リモートデスクトップや録画しながらテストすること。'; zh = '在远程桌面或录屏状态下测试。' }; limits = @{ en = 'Browser motion tests cannot replace pursuit-camera analysis or hardware latency instrumentation.'; ko = '브라우저 모션 테스트가 추적 카메라 촬영이나 하드웨어 지연 계측을 대체할 수는 없습니다.'; ja = 'ブラウザのモーションテストは追従カメラやハードウェア計測の代替にはなりません。'; zh = '浏览器动态测试不能替代追踪相机分析或硬件延迟仪器。' } },
    @{ slug = 'guides/burn-in.html'; key = 'burnIn'; title = @{ en = 'Burn-in and image retention guide'; ko = '번인과 잔상 가이드'; ja = '焼き付きと残像ガイド'; zh = '烧屏与图像残留指南' }; summary = @{ en = 'Distinguish temporary image retention from persistent panel wear.'; ko = '일시적인 잔상과 실제 번인을 구분합니다.'; ja = '一時的な残像と恒久的な焼き付きを区別します。'; zh = '区分临时图像残留与真正的永久烧屏。' }; intro = @{ en = 'Image retention can fade after the content changes or the panel rests.'; ko = '일시 잔상은 화면이 바뀌거나 패널을 쉬게 하면 줄어들 수 있습니다.'; ja = '一時的な残像は表示内容を変えたり休ませたりすると薄れることがあります。'; zh = '临时残留在更换内容或静置后可能减轻。' }; judge = @{ en = 'If the retained shape clearly fades after rest, it is more consistent with temporary retention than permanent burn-in.'; ko = '남는 형상이 쉬게 한 뒤 분명히 약해지면 번인보다 일시 잔상에 가깝습니다.'; ja = '休ませた後に明らかに薄くなるなら、一時的な残像の可能性が高いです。'; zh = '如果轮廓在静置后明显减轻，更接近临时残留。' }; mistakes = @{ en = 'Testing immediately after showing a static app all day and assuming the result is permanent.'; ko = '하루 종일 같은 앱을 띄운 직후 바로 영구 번인이라고 단정하는 경우.'; ja = '同じアプリを長時間表示した直後に永久焼き付きと決めつけること。'; zh = '刚长时间显示静态画面后就直接认定为永久烧屏。' }; limits = @{ en = 'The site can help surface persistent patterns, but it cannot quantify panel wear.'; ko = '이 사이트는 남아 있는 패턴을 확인하는 데는 도움이 되지만 패널 열화 정도를 수치화하지는 못합니다.'; ja = 'このサイトは残るパターンの確認には役立ちますが、劣化度合いを数値化することはできません。'; zh = '本站可以帮助发现持续残留的图案，但不能量化面板损耗程度。' } },
    @{ slug = 'guides/gamma.html'; key = 'gamma'; title = @{ en = 'Gamma guide'; ko = '감마 가이드'; ja = 'ガンマガイド'; zh = '伽马指南' }; summary = @{ en = 'Use gamma patterns to see whether midtones are being crushed or lifted by the current picture mode.'; ko = '현재 화면 모드가 중간톤을 짓누르거나 띄우는지 확인합니다.'; ja = '現在の画質モードが中間調をつぶしていないか、持ち上げすぎていないかを確認します。'; zh = '检查当前画面模式是否压低或抬高了中间灰阶。' }; intro = @{ en = 'Gamma affects how midtones are distributed between black and white.'; ko = '감마는 검정과 흰색 사이의 중간톤 분포를 좌우합니다.'; ja = 'ガンマは黒と白の間にある中間調の配分を左右します。'; zh = '伽马会影响黑白之间中间调的分布。' }; judge = @{ en = 'The best row is usually the one whose center blends most naturally into the surrounding pattern.'; ko = '보통 가운데 패턴이 배경과 가장 자연스럽게 섞이는 행이 현재 감마에 가깝습니다.'; ja = '中心パターンが背景になじむ行が現在のガンマに近い目安です。'; zh = '通常与背景融合得最自然的那一行最接近当前伽马。' }; mistakes = @{ en = 'Changing color temperature and gamma together.'; ko = '색온도와 감마를 동시에 바꾸는 경우.'; ja = '色温度とガンマを同時に変えること。'; zh = '同时修改色温和伽马。' }; limits = @{ en = 'A browser pattern helps tune visual balance, but it cannot certify color accuracy.'; ko = '브라우저 패턴은 시각적 균형을 맞추는 데 도움이 되지만 정확한 색 정확도 인증을 대체하지는 못합니다.'; ja = 'ブラウザパターンは見え方のバランス調整には役立ちますが、色精度保証の代替にはなりません。'; zh = '浏览器图案有助于调整视觉平衡，但不能证明绝对色准。' } }
)
function ToolTitle([string]$Key, [string]$Locale) {
    return (($tests | Where-Object { $_.key -eq $Key } | Select-Object -First 1).title[$Locale])
}

function RenderFooter([string]$Locale) {
    $meta = $copy[$Locale]
    @"
        <footer class="site-footer">
            <nav class="footer-nav" aria-label="Footer">
                <a href="/$Locale/">Home</a>
                <a href="/$Locale/guides/">$($meta.navGuides)</a>
                <a href="/$Locale/methodology.html">$($meta.navMethodology)</a>
                <a href="/$Locale/about.html">$($meta.navAbout)</a>
                <a href="/$Locale/privacy.html">Privacy</a>
                <a href="/$Locale/contact.html">$($meta.navContact)</a>
            </nav>
            <div class="footer-meta">
                <p>$($meta.footerNote)</p>
                <p>$($meta.footerTrust)</p>
            </div>
        </footer>
"@
}

function RenderPage([string]$Locale, [string]$Slug, [string]$Title, [string]$Description, [string]$Body, [string]$SchemaType='WebPage') {
    $meta = $copy[$Locale]
    $canonicalLocale = if ($Locale -eq 'en' -and [string]::IsNullOrWhiteSpace($Slug)) { 'root' } else { $Locale }
    $canonical = UrlFor $canonicalLocale $Slug
    $schema = @{ '@context'='https://schema.org'; '@type'=$SchemaType; name=$Title; inLanguage=$meta.htmlLang; url=$canonical; description=$Description }
    @"
<!DOCTYPE html>
<html lang="$($meta.htmlLang)">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$Title</title>
    <meta name="description" content="$Description">
    <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1">
    <link rel="canonical" href="$canonical">
$(AlternateLinks $Slug)
    <link rel="icon" href="/favicon.png" type="image/png">
    <meta property="og:type" content="website">
    <meta property="og:title" content="$Title">
    <meta property="og:description" content="$Description">
    <meta property="og:url" content="$canonical">
    <meta property="og:image" content="$siteUrl/img/og-image.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="$Title">
    <meta name="twitter:description" content="$Description">
    <meta name="twitter:url" content="$canonical">
    <meta name="twitter:image" content="$siteUrl/img/og-image.png">
    <script type="application/ld+json">$(JsonLd $schema)</script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css">
    <link rel="stylesheet" href="/css/style.css">
</head>
<body data-locale="$Locale" data-slug="$Slug">
    <main class="dashboard">
        <header class="main-header">
            <div class="topbar">
                <a class="brand" href="/$Locale/">
                    <div class="brand-mark">🖥️</div>
                    <div class="brand-copy"><strong>$($meta.siteName)</strong><span>$($meta.tag)</span></div>
                </a>
                <div id="lang-switcher" class="lang-switcher"></div>
            </div>
            <nav class="inline-nav" aria-label="Primary">
                <a href="/$Locale/guides/">$($meta.navGuides)</a>
                <a href="/$Locale/methodology.html">$($meta.navMethodology)</a>
                <a href="/$Locale/about.html">$($meta.navAbout)</a>
                <a href="/$Locale/contact.html">$($meta.navContact)</a>
            </nav>
        </header>
$Body
$(RenderFooter $Locale)
    </main>
    <script type="module" src="/js/site.js"></script>
</body>
</html>
"@
}

function RenderHome([string]$Locale) {
    $meta = $copy[$Locale]
    $stats = ($meta.stats | ForEach-Object { "<div class=""stat-card""><strong>$($_.title)</strong><p>$($_.text)</p></div>" }) -join "`n"
    $steps = ($meta.steps | ForEach-Object { "<div class=""step-card""><h3>$($_.title)</h3><p>$($_.text)</p></div>" }) -join "`n"
    $trust = ($meta.trust | ForEach-Object { "<div class=""trust-card""><h3>$($_.title)</h3><p>$($_.text)</p></div>" }) -join "`n"
    $faq = ($meta.faq | ForEach-Object { "<div class=""faq-item""><h3>$($_.q)</h3><p>$($_.a)</p></div>" }) -join "`n"
    $testCards = ($tests | ForEach-Object { "<button class=""test-card"" data-test=""$($_.key)""><div class=""icon"">$($_.icon)</div><div class=""title"">$($_.title[$Locale])</div><div class=""desc"">$($_.desc[$Locale])</div></button>" }) -join "`n"
    $guideCards = ($guides | ForEach-Object { "<a class=""guide-card"" href=""/$Locale/$($_.slug)""><span class=""meta"">$($meta.navGuides)</span><h3>$($_.title[$Locale])</h3><p>$($_.summary[$Locale])</p><span class=""arrow"">$($meta.openPage)</span></a>" }) -join "`n"
    $body = @"
        <div id="app">
            <main id="dashboard">
                <section class="hero">
                    <span class="eyebrow">$($meta.heroEyebrow)</span>
                    <h1>$($meta.heroTitle)</h1>
                    <p class="hero-lead">$($meta.heroLead)</p>
                    <div class="hero-actions">
                        <a class="btn btn-primary" href="#tests">$($meta.heroPrimary)</a>
                        <a class="btn btn-secondary" href="/$Locale/guides/">$($meta.heroSecondary)</a>
                    </div>
                    <div id="locale-recommendation" class="locale-banner"></div>
                    <div class="stats-grid">$stats</div>
                </section>
                <section class="content-block">
                    <h2 class="section-title">$($meta.stepsTitle)</h2>
                    <p class="section-copy">$($meta.stepsLead)</p>
                    <div class="steps-grid">$steps</div>
                </section>
                <section class="content-block" id="tests">
                    <h2 class="section-title">$($meta.modesTitle)</h2>
                    <p class="section-copy">$($meta.modesLead)</p>
                    <div class="test-grid">$testCards</div>
                </section>
                <section class="content-block">
                    <h2 class="section-title">$($meta.guidesTitle)</h2>
                    <p class="section-copy">$($meta.guidesLead)</p>
                    <div class="guide-grid">$guideCards</div>
                </section>
                <section class="content-block">
                    <h2 class="section-title">$($meta.trustTitle)</h2>
                    <div class="trust-grid">$trust</div>
                </section>
                <section class="faq-block">
                    <h2 class="section-title">$($meta.faqTitle)</h2>
                    $faq
                </section>
            </main>
            <div id="test-container" class="test-container hidden" aria-live="polite">
                <div id="test-content"></div>
                <div id="test-ui" class="test-ui-overlay">
                    <button id="btn-back" class="ui-btn"><span>↩</span><span>Menu</span></button>
                    <div class="test-guide-text" id="test-guide">Click for next step</div>
                </div>
            </div>
        </div>
"@
    $page = RenderPage -Locale $Locale -Slug '' -Title $meta.siteName -Description $meta.heroLead -Body $body -SchemaType 'WebApplication'
    return $page.Replace('</body>', "    <script type=""module"" src=""/js/app.js""></script>`n</body>")
}

function RenderSimplePage([string]$Locale, [string]$Slug, [string]$Title, [string]$Lead, [array]$Sections) {
    $blocks = ($Sections | ForEach-Object { "<section class=""article-section""><h2 class=""section-title"">$($_.title)</h2><p>$($_.text -replace ""`n"", ""</p><p>"")</p></section>" }) -join "`n"
    $body = "<section class=""guide-hero""><span class=""eyebrow"">$Title</span><h1>$Title</h1><p>$Lead</p></section>`n$blocks"
    return RenderPage -Locale $Locale -Slug $Slug -Title $Title -Description $Lead -Body $body
}

function RenderGuidesIndex([string]$Locale) {
    $meta = $copy[$Locale]
    $cards = ($guides | ForEach-Object { "<a class=""guide-card"" href=""/$Locale/$($_.slug)""><span class=""meta"">$($meta.navGuides)</span><h3>$($_.title[$Locale])</h3><p>$($_.summary[$Locale])</p><span class=""arrow"">$($meta.openPage)</span></a>" }) -join "`n"
    $body = "<section class=""guide-hero""><span class=""eyebrow"">$($meta.navGuides)</span><h1>$($meta.guideHubTitle)</h1><p>$($meta.guideHubLead)</p></section><section class=""content-block""><div class=""guide-grid"">$cards</div></section>"
    return RenderPage -Locale $Locale -Slug 'guides/' -Title $meta.guideHubTitle -Description $meta.guideHubLead -Body $body -SchemaType 'CollectionPage'
}

function RenderGuidePage([string]$Locale, [hashtable]$Guide) {
    $meta = $copy[$Locale]
    $body = @"
        <section class="guide-hero">
            <span class="eyebrow">$($meta.navGuides)</span>
            <h1>$($Guide.title[$Locale])</h1>
            <p>$($Guide.summary[$Locale])</p>
            <div class="cta-row"><a class="btn btn-primary" href="/$Locale/">$($meta.runTests)</a><a class="btn btn-secondary" href="/$Locale/guides/">$($meta.navGuides)</a></div>
        </section>
        <section class="article-section"><h2 class="section-title">$($meta.overviewLabel)</h2><p>$($Guide.intro[$Locale])</p></section>
        <section class="article-section"><h2 class="section-title">$($meta.judgeLabel)</h2><p>$($Guide.judge[$Locale])</p></section>
        <section class="article-section"><h2 class="section-title">$($meta.mistakesLabel)</h2><p>$($Guide.mistakes[$Locale])</p></section>
        <section class="article-section"><h2 class="section-title">$($meta.limitsLabel)</h2><p>$($Guide.limits[$Locale])</p></section>
        <section class="article-section"><h2 class="section-title">$($meta.relatedLabel)</h2><p>$(ToolTitle $Guide.key $Locale)</p></section>
"@
    return RenderPage -Locale $Locale -Slug $Guide.slug -Title $Guide.title[$Locale] -Description $Guide.summary[$Locale] -Body $body -SchemaType 'Article'
}

foreach ($locale in $locales) {
    Write-Utf8NoBom -Path (Join-Path $root (LocalePath $locale '')) -Content (RenderHome $locale)
    Write-Utf8NoBom -Path (Join-Path $root (LocalePath $locale 'guides/index.html')) -Content (RenderGuidesIndex $locale)
    foreach ($guide in $guides) { Write-Utf8NoBom -Path (Join-Path $root (LocalePath $locale $guide.slug)) -Content (RenderGuidePage $locale $guide) }
    $meta = $copy[$locale]
    Write-Utf8NoBom -Path (Join-Path $root (LocalePath $locale 'about.html')) -Content (RenderSimplePage $locale 'about.html' $meta.aboutTitle $meta.aboutLead $meta.aboutSections)
    Write-Utf8NoBom -Path (Join-Path $root (LocalePath $locale 'contact.html')) -Content (RenderSimplePage $locale 'contact.html' $meta.contactTitle $meta.contactLead $meta.contactSections)
    Write-Utf8NoBom -Path (Join-Path $root (LocalePath $locale 'privacy.html')) -Content (RenderSimplePage $locale 'privacy.html' $meta.privacyTitle $meta.privacyLead $meta.privacySections)
    Write-Utf8NoBom -Path (Join-Path $root (LocalePath $locale 'methodology.html')) -Content (RenderSimplePage $locale 'methodology.html' $meta.methodologyTitle $meta.methodologyLead $meta.methodologySections)
}

Write-Utf8NoBom -Path (Join-Path $root 'index.html') -Content ((RenderHome 'en').Replace('href="/en/"', 'href="/"').Replace('href="/en/about.html"', 'href="/about.html"').Replace('href="/en/contact.html"', 'href="/contact.html"').Replace('href="/en/privacy.html"', 'href="/privacy.html"').Replace('href="/en/methodology.html"', 'href="/methodology.html"').Replace('href="/en/guides/"', 'href="/guides/').Replace('href="/en/guides/', 'href="/guides/'))
Write-Utf8NoBom -Path (Join-Path $root 'guides/index.html') -Content ((RenderGuidesIndex 'en').Replace('href="/en/', 'href="/'))
foreach ($guide in $guides) { Write-Utf8NoBom -Path (Join-Path $root $guide.slug) -Content ((RenderGuidePage 'en' $guide).Replace('href="/en/', 'href="/')) }
Write-Utf8NoBom -Path (Join-Path $root 'about.html') -Content ((RenderSimplePage 'en' 'about.html' $copy.en.aboutTitle $copy.en.aboutLead $copy.en.aboutSections).Replace('href="/en/', 'href="/'))
Write-Utf8NoBom -Path (Join-Path $root 'contact.html') -Content ((RenderSimplePage 'en' 'contact.html' $copy.en.contactTitle $copy.en.contactLead $copy.en.contactSections).Replace('href="/en/', 'href="/'))
Write-Utf8NoBom -Path (Join-Path $root 'privacy.html') -Content ((RenderSimplePage 'en' 'privacy.html' $copy.en.privacyTitle $copy.en.privacyLead $copy.en.privacySections).Replace('href="/en/', 'href="/'))
Write-Utf8NoBom -Path (Join-Path $root 'methodology.html') -Content ((RenderSimplePage 'en' 'methodology.html' $copy.en.methodologyTitle $copy.en.methodologyLead $copy.en.methodologySections).Replace('href="/en/', 'href="/'))

$slugs = @('', 'guides/', 'guides/dead-pixel.html', 'guides/stuck-pixel.html', 'guides/light-bleed.html', 'guides/contrast.html', 'guides/motion-ghosting.html', 'guides/burn-in.html', 'guides/gamma.html', 'about.html', 'contact.html', 'privacy.html', 'methodology.html')
$lines = @('<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
foreach ($slug in $slugs) { $lines += "  <url><loc>$(UrlFor 'root' $slug)</loc><lastmod>$today</lastmod></url>" }
foreach ($locale in $locales) { foreach ($slug in $slugs) { $lines += "  <url><loc>$(UrlFor $locale $slug)</loc><lastmod>$today</lastmod></url>" } }
$lines += '</urlset>'
Write-Utf8NoBom -Path (Join-Path $root 'sitemap.xml') -Content ($lines -join "`n")
