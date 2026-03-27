const SUPPORTED_LOCALES = ['en', 'ko', 'ja', 'zh'];

const TRANSLATIONS = {
    en: {
        title: 'Monitor and Dead Pixel Test',
        subtitle: 'Run browser-based monitor diagnostics and learn how to interpret the results.',
        fullscreen: 'Fullscreen',
        menu: 'Back to menu',
        guide_next: 'Click for next step',
        guide_contrast_gradient: 'Contrast gradient: each step should remain distinct.',
        guide_contrast_black: 'Black level: 1% to 5% patches should stay visible.',
        guide_contrast_white: 'White level: 95% to 100% patches should stay separable.',
        guide_gamma: 'Gamma: find the row that blends with the surrounding tone.',
        guide_readability: 'Readability: check edge sharpness, color fringing, and inversion comfort.',
        guide_uniformity: 'Uniformity: use a dark room and inspect corners, edges, and dirty-screen patterns.',
        guide_response: 'Motion: look for blur, overshoot, and duplicated trails.',
        guide_viewingAngle: 'Viewing angle: compare tint and brightness changes from left, right, above, and below.',
        warn_pixelFixer: 'Photosensitivity warning: this mode flashes rapidly. Continue?',
        msg_pixelFixer_stop: 'Press ESC to stop the pixel fixer.',
        t_deadPixel: 'Dead Pixel',
        t_viewingAngle: 'Viewing Angle',
        t_contrast: 'Contrast',
        t_readability: 'Readability',
        t_colorDifference: 'Color Difference',
        t_responseRate: 'Response Rate',
        t_gamma: 'Gamma',
        t_uniformity: 'Uniformity',
        t_burnIn: 'Burn-in',
        t_whiteBalance: 'White Balance',
        t_blackBalance: 'Black Balance',
        t_imageQuality: 'Image Quality',
        t_screenAdjust: 'Screen Adjust',
        t_pixelFixer: 'Pixel Fixer',
        t_refreshCadence: 'Refresh Cadence Mapper',
        t_inputLagTrainer: 'Input Lag Trainer',
        t_hdrClipping: 'HDR Clipping Simulator',
        t_subpixelInspector: 'Subpixel Inspector',
        readability_sentence: 'The quick brown fox jumps over the lazy dog. 1234567890'
    },
    ko: {
        title: '모니터 불량 화소 테스트',
        subtitle: '브라우저에서 모니터 이상 여부를 점검하고 결과 해석 방법까지 확인하세요.',
        fullscreen: '전체 화면',
        menu: '메뉴로 돌아가기',
        guide_next: '다음 단계로 진행하려면 클릭하세요',
        guide_contrast_gradient: '명암 그라데이션: 각 단계가 서로 구분되어야 합니다.',
        guide_contrast_black: '블랙 레벨: 1%에서 5% 패턴이 뭉개지지 않아야 합니다.',
        guide_contrast_white: '화이트 레벨: 95%에서 100% 구간이 분리되어 보여야 합니다.',
        guide_gamma: '감마: 배경과 가장 자연스럽게 섞이는 행을 찾으세요.',
        guide_readability: '가독성: 글자 가장자리 선명도, 색 번짐, 반전 시 읽기 편안함을 확인하세요.',
        guide_uniformity: '균일도: 어두운 환경에서 모서리 빛샘과 화면 얼룩을 확인하세요.',
        guide_response: '응답속도: 잔상, 역잔상, 이중 궤적이 보이는지 확인하세요.',
        guide_viewingAngle: '시야각: 좌우와 상하에서 색상과 밝기 변화를 비교하세요.',
        warn_pixelFixer: '광과민성 주의: 이 모드는 빠르게 점멸합니다. 계속하시겠습니까?',
        msg_pixelFixer_stop: '픽셀 복구를 중지하려면 ESC를 누르세요.',
        t_deadPixel: '불량 화소',
        t_viewingAngle: '시야각',
        t_contrast: '명암비',
        t_readability: '가독성',
        t_colorDifference: '색 구분',
        t_responseRate: '응답속도',
        t_gamma: '감마',
        t_uniformity: '균일도',
        t_burnIn: '번인',
        t_whiteBalance: '화이트 밸런스',
        t_blackBalance: '블랙 밸런스',
        t_imageQuality: '이미지 품질',
        t_screenAdjust: '화면 조정',
        t_pixelFixer: '픽셀 복구',
        t_refreshCadence: '주사율 리듬 검사',
        t_inputLagTrainer: '입력 지연 트레이너',
        t_hdrClipping: 'HDR 클리핑 시뮬레이터',
        t_subpixelInspector: '서브픽셀 검사',
        readability_sentence: '다람쥐 헌 쳇바퀴에 타고파. The quick brown fox jumps over the lazy dog. 1234567890'
    },
    ja: {
        title: 'モニター不良画素テスト',
        subtitle: 'ブラウザでディスプレイを点検し、結果の読み方まで確認できます。',
        fullscreen: '全画面',
        menu: 'メニューに戻る',
        guide_next: '次のステップへ進むにはクリックしてください',
        guide_contrast_gradient: 'コントラスト階調: すべての段階が見分けられる必要があります。',
        guide_contrast_black: '黒レベル: 1%から5%のパッチがつぶれずに見えるか確認してください。',
        guide_contrast_white: '白レベル: 95%から100%の差が残っているか確認してください。',
        guide_gamma: 'ガンマ: 背景になじむ行を探してください。',
        guide_readability: '可読性: 文字の輪郭、色にじみ、反転時の読みやすさを確認してください。',
        guide_uniformity: '均一性: 暗い部屋で四隅の光漏れやムラを確認してください。',
        guide_response: '応答速度: 残像、オーバーシュート、二重の軌跡を確認してください。',
        guide_viewingAngle: '視野角: 左右上下から色と明るさの変化を比べてください。',
        warn_pixelFixer: '光感受性への注意: このモードは高速に点滅します。続行しますか？',
        msg_pixelFixer_stop: 'ピクセル修復を停止するには ESC を押してください。',
        t_deadPixel: '不良画素',
        t_viewingAngle: '視野角',
        t_contrast: 'コントラスト',
        t_readability: '可読性',
        t_colorDifference: '色差',
        t_responseRate: '応答速度',
        t_gamma: 'ガンマ',
        t_uniformity: '均一性',
        t_burnIn: '焼き付き',
        t_whiteBalance: 'ホワイトバランス',
        t_blackBalance: 'ブラックバランス',
        t_imageQuality: '画質',
        t_screenAdjust: '画面調整',
        t_pixelFixer: 'ピクセル修復',
        t_refreshCadence: 'リフレッシュ解析',
        t_inputLagTrainer: '入力遅延トレーナー',
        t_hdrClipping: 'HDR クリッピング',
        t_subpixelInspector: 'サブピクセル検査',
        readability_sentence: 'The quick brown fox jumps over the lazy dog. 1234567890'
    },
    zh: {
        title: '显示器坏点测试',
        subtitle: '在浏览器中检查显示器状态，并了解如何判断测试结果。',
        fullscreen: '全屏',
        menu: '返回菜单',
        guide_next: '点击进入下一步',
        guide_contrast_gradient: '对比度阶梯：每一级都应保持可分辨。',
        guide_contrast_black: '黑位：1% 到 5% 的暗部块不应全部糊成一片。',
        guide_contrast_white: '白位：95% 到 100% 的亮部层级应仍可区分。',
        guide_gamma: '伽马：找到与背景最自然融合的那一行。',
        guide_readability: '可读性：检查文字边缘、彩边以及反相后的舒适度。',
        guide_uniformity: '均匀性：在较暗环境中观察边缘漏光和脏屏现象。',
        guide_response: '响应速度：观察拖影、反向拖影和双重轨迹。',
        guide_viewingAngle: '可视角：从左右和上下比较颜色与亮度变化。',
        warn_pixelFixer: '光敏风险提示：此模式会快速闪烁。是否继续？',
        msg_pixelFixer_stop: '按 ESC 可停止像素修复。',
        t_deadPixel: '坏点检测',
        t_viewingAngle: '可视角',
        t_contrast: '对比度',
        t_readability: '可读性',
        t_colorDifference: '色差',
        t_responseRate: '响应速度',
        t_gamma: '伽马',
        t_uniformity: '均匀性',
        t_burnIn: '烧屏',
        t_whiteBalance: '白平衡',
        t_blackBalance: '黑平衡',
        t_imageQuality: '图像质量',
        t_screenAdjust: '画面调整',
        t_pixelFixer: '像素修复',
        t_refreshCadence: '刷新节奏检测',
        t_inputLagTrainer: '输入延迟训练',
        t_hdrClipping: 'HDR 裁切模拟',
        t_subpixelInspector: '子像素检查',
        readability_sentence: 'The quick brown fox jumps over the lazy dog. 1234567890'
    }
};

export default class I18n {
    constructor(defaultLang = document.documentElement.lang || 'en') {
        this.currentLang = this.normalizeLang(defaultLang);
    }

    normalizeLang(lang) {
        const candidate = (lang || 'en').slice(0, 2).toLowerCase();
        return SUPPORTED_LOCALES.includes(candidate) ? candidate : 'en';
    }

    setLanguage(lang) {
        this.currentLang = this.normalizeLang(lang);
        document.documentElement.lang = this.currentLang;
    }

    t(key) {
        const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS.en;
        return dict[key] || TRANSLATIONS.en[key] || key;
    }
}
