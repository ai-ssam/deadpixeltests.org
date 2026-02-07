/**
 * Internationalization (i18n) Module
 * Supports: en, es, fr, de, zh, ja, ko, tr, pt, it, ru
 */
export default class I18n {
    constructor() {
        this.currentLang = 'en'; // Default to English for global audience
        this.data = {
            'ko': {
                title: '모니터 무결점 테스트',
                subtitle: 'Monitor Perfect Test Checks',
                fullscreen: '전체화면',
                menu: '메뉴로 복귀',

                t_deadPixel: '불량화소',
                t_viewingAngle: '시야각',
                t_contrast: '명암비',
                t_readability: '가독성',
                t_colorDifference: '색상비',
                t_responseRate: '응답속도',
                t_gamma: '감마',
                t_uniformity: '빛샘/멍 현상',
                t_burnIn: '잔상/번인',
                t_whiteBalance: '화이트 밸런스',
                t_blackBalance: '블랙 밸런스',
                t_imageQuality: '이미지 표현',
                t_screenAdjust: '화면조정',
                t_pixelFixer: '불량화소 복구',

                d_deadPixel: '화면의 점(픽셀)이 제대로 나오는지 확인합니다.',
                d_viewingAngle: '화면을 위/아래/좌/우에서 볼 때의 변화를 확인합니다.',
                d_contrast: '밝고 어두운 부분을 얼마나 잘 구분하는지 확인합니다.',
                d_readability: '글자가 번지거나 뭉개지지 않고 잘 보이는지 확인합니다.',
                d_colorDifference: '색상 간의 미세한 차이를 모니터가 표현하는지 확인합니다.',
                d_responseRate: '빠르게 움직이는 화면에서 잔상이 남는지 확인합니다.',
                d_gamma: '모니터의 중간 밝기 톤(감마)이 적절한지 확인합니다.',
                d_uniformity: '화면 밝기가 균일한지, 빛이 새는지 확인합니다.',
                d_burnIn: '화면에 이전 자국이 남아있는지 확인합니다.',
                d_whiteBalance: '흰색이 누렇거나 파랗지 않고 정확한 흰색인지 확인합니다.',
                d_blackBalance: '검은색의 깊이와 디테일 표현력을 확인합니다.',
                d_imageQuality: '실제 사진을 통해 색감과 자연스러움을 확인합니다.',
                d_screenAdjust: '화면의 크기와 위치가 잘 맞는지 확인합니다.',
                d_pixelFixer: '빠른 색상 점멸로 굳어버린 픽셀을 깨웁니다. (주의 필요)',

                guide_next: '클릭하여 다음 색상',

                // Test specific messages
                guide_contrast_gradient: '명암비 그라데이션 - 모든 단계가 구분되어야 합니다.',
                guide_contrast_black: '블랙 레벨 - 1~5% 단계가 구분되는지 확인하세요.',
                guide_contrast_white: '화이트 레벨 - 95~100% 단계가 구분되는지 확인하세요.',
                guide_gamma: '감마 - 2.2 기준선이 배경과 비슷해 보이는 지점을 확인하세요.',
                guide_readability: '가독성 - 글자가 선명하게 보이는지 확인하세요. (클릭하여 반전)',
                guide_uniformity: '균일도 - 화면 전체의 밝기가 고른지 확인하세요.',
                guide_response: 'UFO가 잔상 없이 깨끗하게 지나가는지 확인하세요.',
                guide_viewingAngle: '상하좌우에서 색상이 변하지 않는지 확인하세요.',
                warn_pixelFixer: '광과민성 발작 경고: 시작하면 화면이 빠르게 점멸합니다. 계속하시겠습니까?',
                msg_pixelFixer_stop: 'ESC 키를 누르면 중지됩니다.',

                ad_top: '광고 영역 (Top Banner)',
                ad_side: '광고 영역 (Side)',
                ad_bottom: '광고 영역 (Bottom Display)'
            },
            'en': {
                title: 'Monitor and Dead Pixel Test',
                subtitle: 'Check your monitor for defects',
                fullscreen: 'Fullscreen',
                menu: 'Menu',
                t_deadPixel: 'Dead Pixel',
                t_viewingAngle: 'Viewing Angle',
                t_contrast: 'Contrast',
                t_readability: 'Readability',
                t_colorDifference: 'Color Difference',
                t_responseRate: 'Response Rate',
                t_gamma: 'Gamma',
                t_uniformity: 'Light Bleed',
                t_burnIn: 'Burn-in',
                t_whiteBalance: 'White Balance',
                t_blackBalance: 'Black Balance',
                t_imageQuality: 'Image Quality',
                t_screenAdjust: 'Screen Adjust',
                t_pixelFixer: 'Pixel Fixer',
                d_deadPixel: 'Check for dead, stuck, or hot pixels.',
                d_viewingAngle: 'Check color and brightness shifts from angles.',
                d_contrast: 'Check distinction between bright and dark areas.',
                d_readability: 'Check text sharpness and clarity.',
                d_colorDifference: 'Check ability to distinguish subtle colors.',
                d_responseRate: 'Check for motion blur and ghosting.',
                d_gamma: 'Check if mid-tones are displayed correctly.',
                d_uniformity: 'Check for backlight bleeding and uniformity.',
                d_burnIn: 'Check for image retention and burn-in.',
                d_whiteBalance: 'Check if white looks neutral and pure.',
                d_blackBalance: 'Check black levels and shadow details.',
                d_imageQuality: 'Check natural color reproduction.',
                d_screenAdjust: 'Check screen alignment and overscan.',
                d_pixelFixer: 'Attempt to fix stuck pixels. (Warning: Flashing)',
                guide_next: 'Click for next step',

                guide_contrast_gradient: 'Contrast Gradient - All steps should be distinguishable.',
                guide_contrast_black: 'Black Level - 1~5% steps should be distinguishable.',
                guide_contrast_white: 'White Level - 95~100% steps should be distinguishable.',
                guide_gamma: 'Gamma - Find where the center blends with background.',
                guide_readability: 'Readability - Check if text is sharp. (Click to invert)',
                guide_uniformity: 'Uniformity - Check for even brightness.',
                guide_response: 'Response - Check for ghosting trails.',
                guide_viewingAngle: 'Viewing Angle - Check for color shifts.',
                warn_pixelFixer: 'Photosensitivity Warning: Rapid flashing lights. Continue?',
                msg_pixelFixer_stop: 'Press ESC to stop.',

                ad_top: 'Ad Space',
                ad_side: 'Ad Space',
                ad_bottom: 'Ad Space'
            },
            'ja': {
                title: 'モニタードット抜けテスト',
                subtitle: 'ディスプレイの品質を確認',
                fullscreen: '全画面',
                menu: 'メニュー',
                t_deadPixel: 'ドット抜け',
                t_viewingAngle: '視野角',
                t_contrast: 'コントラスト',
                t_readability: '可読性',
                t_colorDifference: '色差',
                t_responseRate: '応答速度',
                t_gamma: 'ガンマ',
                t_uniformity: '光漏れ',
                t_burnIn: '焼き付き',
                t_whiteBalance: 'ホワイトバランス',
                t_blackBalance: 'ブラックバランス',
                t_imageQuality: '画質',
                t_screenAdjust: '画面調整',
                t_pixelFixer: 'ピクセル修復',
                d_deadPixel: '画面にドット抜けがないか確認します。',
                d_viewingAngle: '角度による色の変化を確認します。',
                d_contrast: '明暗の区別が正確か確認します。',
                d_readability: '文字が鮮明に見えるか確認します。',
                d_colorDifference: '微妙な色の違いを表現できるか確認します。',
                d_responseRate: '動きの速い映像で残像を確認します。',
                d_gamma: '中間階調の明るさを確認します。',
                d_uniformity: '画面の明るさが均一か確認します。',
                d_burnIn: '画面の焼き付きを確認します。',
                d_whiteBalance: '白が正確に表示されるか確認します。',
                d_blackBalance: '黒の深みと階調を確認します。',
                d_imageQuality: '写真で色合いを確認します。',
                d_screenAdjust: '画面の位置とサイズを調整します。',
                d_pixelFixer: '高速点滅でスタックピクセルを修復します。（注意）',
                guide_next: 'クリックして次へ',

                guide_contrast_gradient: 'コントラストグラデーション - 全ての段階が区別できる必要があります。',
                guide_contrast_black: 'ブラックレベル - 1〜5％の段階が区別できるか確認してください。',
                guide_contrast_white: 'ホワイトレベル - 95〜100％の段階が区別できるか確認してください。',
                guide_gamma: 'ガンマ - 中心が背景と混ざって見える位置を確認してください。',
                guide_readability: '可読性 - 文字が鮮明に見えるか確認してください。（クリックで反転）',
                guide_uniformity: '均一性 - 画面全体の明るさが均一か確認してください。',
                guide_response: '応答速度 - 残像がないか確認してください。',
                guide_viewingAngle: '視野角 - 色の変化がないか確認してください。',
                warn_pixelFixer: '光過敏性発作の警告: 高速点滅します。続けますか？',
                msg_pixelFixer_stop: 'ESCキーで停止します。',

                ad_top: '広告',
                ad_side: '広告',
                ad_bottom: '広告'
            },
            'zh': {
                title: '显示器坏点测试',
                subtitle: '专业屏幕检测工具',
                fullscreen: '全屏',
                menu: '菜单',
                t_deadPixel: '坏点检测',
                t_viewingAngle: '可视角度',
                t_contrast: '对比度',
                t_readability: '清晰度',
                t_colorDifference: '色彩区分',
                t_responseRate: '响应速度',
                t_gamma: '伽马值',
                t_uniformity: '漏光/均匀性',
                t_burnIn: '残影/烧屏',
                t_whiteBalance: '白平衡',
                t_blackBalance: '黑平衡',
                t_imageQuality: '图像质量',
                t_screenAdjust: '屏幕调整',
                t_pixelFixer: '坏点修复',
                d_deadPixel: '检查屏幕是否有死点或亮点。',
                d_viewingAngle: '检查不同角度下的色彩偏差。',
                d_contrast: '检查明暗对比表现能力。',
                d_readability: '检查文字显示的清晰锐利度。',
                d_colorDifference: '测试显示器区分相近颜色的能力。',
                d_responseRate: '检查动态画面的拖影和残像。',
                d_gamma: '检查中间色调的亮度表现。',
                d_uniformity: '检查背光均匀性和漏光情况。',
                d_burnIn: '检查屏幕是否有图像残留。',
                d_whiteBalance: '检查白色显示是否纯正。',
                d_blackBalance: '检查黑色深度和暗部细节。',
                d_imageQuality: '通过高清图片检查色彩还原。',
                d_screenAdjust: '检查画面大小位置是否正确。',
                d_pixelFixer: '高频闪烁修复卡死的像素。（警告：光敏癫痫）',
                guide_next: '点击继续',

                guide_contrast_gradient: '对比度渐变 - 所有层级应清晰可辨。',
                guide_contrast_black: '黑电平 - 确认1~5%灰度是否可辨。',
                guide_contrast_white: '白电平 - 确认95~100%灰度是否可辨。',
                guide_gamma: '伽马 - 寻找中心与背景融合的位置。',
                guide_readability: '清晰度 - 确认文字是否锐利。（点击反转）',
                guide_uniformity: '均匀性 - 确认屏幕亮度是否均匀。',
                guide_response: '响应速度 - 确认是否有拖影。',
                guide_viewingAngle: '可视角度 - 确认是否有色偏。',
                warn_pixelFixer: '光敏警告：屏幕将快速闪烁。继续？',
                msg_pixelFixer_stop: '按ESC键停止。',

                ad_top: '广告',
                ad_side: '广告',
                ad_bottom: '广告'
            },
            'es': {
                title: 'Prueba de Monitor',
                subtitle: 'Verifique defectos en su pantalla',
                fullscreen: 'Pantalla Completa',
                menu: 'Menú',
                t_deadPixel: 'Píxeles Muertos',
                t_viewingAngle: 'Ángulo de Visión',
                t_contrast: 'Contraste',
                t_readability: 'Legibilidad',
                t_colorDifference: 'Diferencia de Color',
                t_responseRate: 'Tiempo de Respuesta',
                t_gamma: 'Gamma',
                t_uniformity: 'Fuga de Luz',
                t_burnIn: 'Quemado de Imagen',
                t_whiteBalance: 'Balance de Blancos',
                t_blackBalance: 'Balance de Negros',
                t_imageQuality: 'Calidad de Imagen',
                t_screenAdjust: 'Ajuste de Pantalla',
                t_pixelFixer: 'Reparar Píxeles',
                d_deadPixel: 'Comprueba si hay píxeles muertos o atascados.',
                d_viewingAngle: 'Verifica cambios de color desde diferentes ángulos.',
                d_contrast: 'Verifica la distinción entre áreas claras y oscuras.',
                d_readability: 'Comprueba la nitidez y claridad del texto.',
                d_colorDifference: 'Verifica la capacidad de distinguir colores sutiles.',
                d_responseRate: 'Comprueba el desenfoque de movimiento y el ghosting.',
                d_gamma: 'Verifica si los tonos medios se muestran correctamente.',
                d_uniformity: 'Comprueba fugas de luz y uniformidad.',
                d_burnIn: 'Comprueba si hay retención de imagen.',
                d_whiteBalance: 'Verifica si el blanco se ve neutro.',
                d_blackBalance: 'Verifica los niveles de negro y detalles de sombras.',
                d_imageQuality: 'Comprueba la reproducción natural del color.',
                d_screenAdjust: 'Verifica la alineación de la pantalla.',
                d_pixelFixer: 'Intenta reparar píxeles atascados. (Advertencia: Parpadeo)',
                guide_next: 'Clic para siguiente',

                guide_contrast_gradient: 'Gradiente - Todos los pasos deben ser distinguibles.',
                guide_contrast_black: 'Nivel negro - Verifique pasos 1-5%.',
                guide_contrast_white: 'Nivel blanco - Verifique pasos 95-100%.',
                guide_gamma: 'Gamma - Encuentre donde se mezcla.',
                guide_readability: 'Legibilidad - Verifique nitidez. (Clic para invertir)',
                guide_uniformity: 'Uniformidad - Verifique brillo uniforme.',
                guide_response: 'Respuesta - Verifique estelas.',
                guide_viewingAngle: 'Ángulo - Verifique cambios de color.',
                warn_pixelFixer: 'Advertencia fotosensibilidad: Parpadeo rápido. ¿Continuar?',
                msg_pixelFixer_stop: 'Presione ESC para detener.',

                ad_top: 'Anuncio',
                ad_side: 'Anuncio',
                ad_bottom: 'Anuncio'
            },
            'fr': {
                title: 'Test Écran',
                subtitle: 'Vérifiez les défauts de votre moniteur',
                fullscreen: 'Plein écran',
                menu: 'Menu',
                t_deadPixel: 'Pixels Morts',
                t_viewingAngle: 'Angle de Vue',
                t_contrast: 'Contraste',
                t_readability: 'Lisibilité',
                t_colorDifference: 'Différence de Couleur',
                t_responseRate: 'Temps de Réponse',
                t_gamma: 'Gamma',
                t_uniformity: 'Fuite de Lumière',
                t_burnIn: 'Marquage (Burn-in)',
                t_whiteBalance: 'Balance des Blancs',
                t_blackBalance: 'Balance des Noirs',
                t_imageQuality: 'Qualité d\'Image',
                t_screenAdjust: 'Ajustement Écran',
                t_pixelFixer: 'Réparateur de Pixels',
                d_deadPixel: 'Vérifiez la présence de pixels morts ou bloqués.',
                d_viewingAngle: 'Vérifiez les changements de couleur selon l\'angle.',
                d_contrast: 'Vérifiez la distinction entre zones claires et sombres.',
                d_readability: 'Vérifiez la netteté et la clarté du texte.',
                d_colorDifference: 'Vérifiez la capacité à distinguer les couleurs subtiles.',
                d_responseRate: 'Vérifiez le flou de mouvement.',
                d_gamma: 'Vérifiez si les tons moyens sont affichés correctement.',
                d_uniformity: 'Vérifiez l\'uniformité du rétroéclairage.',
                d_burnIn: 'Vérifiez la rétention d\'image.',
                d_whiteBalance: 'Vérifiez si le blanc semble neutre.',
                d_blackBalance: 'Vérifiez les niveaux de noir.',
                d_imageQuality: 'Vérifiez la reproduction naturelle des couleurs.',
                d_screenAdjust: 'Vérifiez l\'alignement de l\'écran.',
                d_pixelFixer: 'Tente de réparer les pixels bloqués. (Attention : Clignotement)',
                guide_next: 'Cliquer pour continuer',

                guide_contrast_gradient: 'Dégradé - Toutes les étapes doivent être visibles.',
                guide_contrast_black: 'Niveau noir - Vérifiez 1-5%.',
                guide_contrast_white: 'Niveau blanc - Vérifiez 95-100%.',
                guide_gamma: 'Gamma - Trouvez où le centre se fond.',
                guide_readability: 'Lisibilité - Vérifiez la netteté. (Clic pour inverser)',
                guide_uniformity: 'Uniformité - Vérifiez la luminosité.',
                guide_response: 'Réponse - Vérifiez les traînées.',
                guide_viewingAngle: 'Angle - Vérifiez les changements.',
                warn_pixelFixer: 'Attention : Clignotement rapide. Continuer ?',
                msg_pixelFixer_stop: 'ESC pour arrêter.',

                ad_top: 'Publicité',
                ad_side: 'Publicité',
                ad_bottom: 'Publicité'
            },
            'de': {
                title: 'Monitor Test',
                subtitle: 'Überprüfen Sie Ihren Monitor',
                fullscreen: 'Vollbild',
                menu: 'Menü',
                t_deadPixel: 'Pixelfehler',
                t_viewingAngle: 'Blickwinkel',
                t_contrast: 'Kontrast',
                t_readability: 'Lesbarkeit',
                t_colorDifference: 'Farbunterschied',
                t_responseRate: 'Reaktionszeit',
                t_gamma: 'Gamma',
                t_uniformity: 'Ausleuchtung',
                t_burnIn: 'Einbrennen',
                t_whiteBalance: 'Weißabgleich',
                t_blackBalance: 'Schwarzabgleich',
                t_imageQuality: 'Bildqualität',
                t_screenAdjust: 'Bildschirmanpassung',
                t_pixelFixer: 'Pixel-Reparatur',
                d_deadPixel: 'Auf tote oder festsitzende Pixel prüfen.',
                d_viewingAngle: 'Farbveränderungen aus verschiedenen Winkeln prüfen.',
                d_contrast: 'Unterscheidung zwischen hellen und dunklen Bereichen prüfen.',
                d_readability: 'Textschärfe und Klarheit prüfen.',
                d_colorDifference: 'Fähigkeit zur Unterscheidung feiner Farben prüfen.',
                d_responseRate: 'Auf Bewegungsunschärfe und Ghosting prüfen.',
                d_gamma: 'Prüfen, ob Mitteltöne korrekt angezeigt werden.',
                d_uniformity: 'Auf Hintergrundbeleuchtungs-Bluten und Gleichmäßigkeit prüfen.',
                d_burnIn: 'Auf Bildrückstände prüfen.',
                d_whiteBalance: 'Prüfen, ob Weiß neutral aussieht.',
                d_blackBalance: 'Schwarztöne und Schattendetails prüfen.',
                d_imageQuality: 'Natürliche Farbwiedergabe prüfen.',
                d_screenAdjust: 'Bildschirmausrichtung prüfen.',
                d_pixelFixer: 'Versuch, festsitzende Pixel zu reparieren. (Warnung: Blinken)',
                guide_next: 'Klicken für weiter',

                guide_contrast_gradient: 'Verlauf - Alle Stufen sollten sichtbar sein.',
                guide_contrast_black: 'Schwarz - 1-5% prüfen.',
                guide_contrast_white: 'Weiß - 95-100% prüfen.',
                guide_gamma: 'Gamma - Wo verschmilzt die Mitte?',
                guide_readability: 'Lesbarkeit - Schärfe prüfen. (Klick zum Invertieren)',
                guide_uniformity: 'Gleichmäßigkeit - Helligkeit prüfen.',
                guide_response: 'Reaktion - Ghosting prüfen.',
                guide_viewingAngle: 'Winkel - Farbverschiebung prüfen.',
                warn_pixelFixer: 'Warnung: Schnelles Blinken. Fortfahren?',
                msg_pixelFixer_stop: 'ESC zum Stoppen.',

                ad_top: 'Anzeige',
                ad_side: 'Anzeige',
                ad_bottom: 'Anzeige'
            },
            'ru': {
                title: 'Тест Монитора',
                subtitle: 'Проверка экрана на дефекты',
                fullscreen: 'Полный экран',
                menu: 'Меню',
                t_deadPixel: 'Битые пиксели',
                t_viewingAngle: 'Угол обзора',
                t_contrast: 'Контрастность',
                t_readability: 'Читаемость',
                t_colorDifference: 'Цветопередача',
                t_responseRate: 'Время отклика',
                t_gamma: 'Гамма',
                t_uniformity: 'Равномерность',
                t_burnIn: 'Выгорание',
                t_whiteBalance: 'Баланс белого',
                t_blackBalance: 'Баланс черного',
                t_imageQuality: 'Качество фото',
                t_screenAdjust: 'Настройка экрана',
                t_pixelFixer: 'Лечение пикселей',
                d_deadPixel: 'Проверка на наличие битых или застрявших пикселей.',
                d_viewingAngle: 'Проверка искажения цвета под углом.',
                d_contrast: 'Проверка различия между светлыми и темными участками.',
                d_readability: 'Проверка четкости текста.',
                d_colorDifference: 'Проверка способности различать тонкие оттенки.',
                d_responseRate: 'Проверка на размытие в движении.',
                d_gamma: 'Проверка корректности отображения средних тонов.',
                d_uniformity: 'Проверка равномерности подсветки.',
                d_burnIn: 'Проверка на остаточное изображение.',
                d_whiteBalance: 'Проверка нейтральности белого цвета.',
                d_blackBalance: 'Проверка уровня черного и деталей в тенях.',
                d_imageQuality: 'Проверка естественной цветопередачи.',
                d_screenAdjust: 'Проверка геометрии и границ экрана.',
                d_pixelFixer: 'Попытка восстановить застрявшие пиксели. (Внимание: Мерцание)',

                guide_next: 'Нажмите для продолжения',
                guide_contrast_gradient: 'Градиент - все ступени должны быть видны.',
                guide_contrast_black: 'Черный - проверьте 1-5%.',
                guide_contrast_white: 'Белый - проверьте 95-100%.',
                guide_gamma: 'Гамма - найдите слияние.',
                guide_readability: 'Читаемость - проверьте четкость. (Клик для инверсии)',
                guide_uniformity: 'Равномерность - проверьте яркость.',
                guide_response: 'Отклик - проверьте шлейфы.',
                guide_viewingAngle: 'Угол - проверьте цвета.',
                warn_pixelFixer: 'Предупреждение: Быстрое мерцание. Продолжить?',
                msg_pixelFixer_stop: 'ESC для выхода.',

                ad_top: 'Реклама',
                ad_side: 'Реклама',
                ad_bottom: 'Реклама'
            },
            'it': {
                title: 'Test Monitor',
                subtitle: 'Controlla i difetti del monitor',
                fullscreen: 'Schermo intero',
                menu: 'Menu',
                t_deadPixel: 'Pixel Morti',
                t_viewingAngle: 'Angolo di Visione',
                t_contrast: 'Contrasto',
                t_readability: 'Leggibilità',
                t_colorDifference: 'Differenza Colore',
                t_responseRate: 'Tempo di Risposta',
                t_gamma: 'Gamma',
                t_uniformity: 'Uniformità',
                t_burnIn: 'Burn-in',
                t_whiteBalance: 'Bilanciamento Bianco',
                t_blackBalance: 'Bilanciamento Nero',
                t_imageQuality: 'Qualità Immagine',
                t_screenAdjust: 'Regolazione Schermo',
                t_pixelFixer: 'Riparazione Pixel',
                d_deadPixel: 'Controlla pixel morti o bloccati.',
                d_viewingAngle: 'Controlla i cambiamenti di colore da diverse angolazioni.',
                d_contrast: 'Controlla la distinzione tra aree chiare e scure.',
                d_readability: 'Controlla la nitidezza del testo.',
                d_colorDifference: 'Controlla la capacità di distinguere colori sottili.',
                d_responseRate: 'Controlla la sfocatura di movimento.',
                d_gamma: 'Controlla se i toni medi sono visualizzati correttamente.',
                d_uniformity: 'Controlla perdite di luce e uniformità.',
                d_burnIn: 'Controlla la ritenzione dell\'immagine.',
                d_whiteBalance: 'Controlla se il bianco appare neutro.',
                d_blackBalance: 'Controlla i livelli di nero.',
                d_imageQuality: 'Controlla la riproduzione naturale dei colori.',
                d_screenAdjust: 'Controlla l\'allineamento dello schermo.',
                d_pixelFixer: 'Tenta di riparare i pixel bloccati. (Attenzione: Lampeggiante)',
                guide_next: 'Clicca per continuare',

                guide_contrast_gradient: 'Gradiente - Tutti i passi devono essere visibili.',
                guide_contrast_black: 'Nero - Controlla 1-5%.',
                guide_contrast_white: 'Bianco - Controlla 95-100%.',
                guide_gamma: 'Gamma - Trova fusione.',
                guide_readability: 'Leggibilità - Controlla nitidezza. (Clic per invertire)',
                guide_uniformity: 'Uniformità - Controlla luminosità.',
                guide_response: 'Risposta - Controlla scie.',
                guide_viewingAngle: 'Angolo - Controlla colori.',
                warn_pixelFixer: 'Avviso: Lampeggiamento rapido. Continuare?',
                msg_pixelFixer_stop: 'ESC per fermare.',

                ad_top: 'Pubblicità',
                ad_side: 'Pubblicità',
                ad_bottom: 'Pubblicità'
            },
            'pt': {
                title: 'Teste de Monitor',
                subtitle: 'Verifique defeitos no monitor',
                fullscreen: 'Tela Cheia',
                menu: 'Menu',
                t_deadPixel: 'Pixels Mortos',
                t_viewingAngle: 'Ângulo de Visão',
                t_contrast: 'Contraste',
                t_readability: 'Legibilidade',
                t_colorDifference: 'Diferença de Cor',
                t_responseRate: 'Tempo de Resposta',
                t_gamma: 'Gama',
                t_uniformity: 'Vazamento de Luz',
                t_burnIn: 'Burn-in',
                t_whiteBalance: 'Balanço de Branco',
                t_blackBalance: 'Balanço de Preto',
                t_imageQuality: 'Qualidade de Imagem',
                t_screenAdjust: 'Ajuste de Tela',
                t_pixelFixer: 'Reparar Pixels',
                d_deadPixel: 'Verifique se há pixels mortos ou presos.',
                d_viewingAngle: 'Verifique mudanças de cor em diferentes ângulos.',
                d_contrast: 'Verifique a distinção entre áreas claras e escuras.',
                d_readability: 'Verifique a nitidez do texto.',
                d_colorDifference: 'Verifique a capacidade de distinguir cores sutis.',
                d_responseRate: 'Verifique desfoque de movimento.',
                d_gamma: 'Verifique se os tons médios são exibidos corretamente.',
                d_uniformity: 'Verifique vazamento de luz e uniformidade.',
                d_burnIn: 'Verifique retenção de imagem.',
                d_whiteBalance: 'Verifique se o branco parece neutro.',
                d_blackBalance: 'Verifique níveis de preto.',
                d_imageQuality: 'Verifique a reprodução natural das cores.',
                d_screenAdjust: 'Verifique o alinhamento da tela.',
                d_pixelFixer: 'Tenta reparar pixels presos. (Aviso: Piscando)',
                guide_next: 'Clique para continuar',

                guide_contrast_gradient: 'Gradiente - Todos os passos visíveis.',
                guide_contrast_black: 'Preto - Verifique 1-5%.',
                guide_contrast_white: 'Branco - Verifique 95-100%.',
                guide_gamma: 'Gama - Encontre fusão.',
                guide_readability: 'Legibilidade - Verifique nitidez. (Clique para inverter)',
                guide_uniformity: 'Uniformidade - Verifique brilho.',
                guide_response: 'Resposta - Verifique rastros.',
                guide_viewingAngle: 'Ângulo - Verifique cores.',
                warn_pixelFixer: 'Aviso: Piscando rápido. Continuar?',
                msg_pixelFixer_stop: 'ESC para parar.',

                ad_top: 'Anúncio',
                ad_side: 'Anúncio',
                ad_bottom: 'Anúncio'
            },
            'tr': {
                title: 'Monitör Testi',
                subtitle: 'Ekranınızı kontrol edin',
                fullscreen: 'Tam Ekran',
                menu: 'Menü',
                t_deadPixel: 'Ölü Piksel',
                t_viewingAngle: 'Görüş Açısı',
                t_contrast: 'Kontrast',
                t_readability: 'Okunabilirlik',
                t_colorDifference: 'Renk Farkı',
                t_responseRate: 'Tepki Süresi',
                t_gamma: 'Gama',
                t_uniformity: 'Işık Sızması',
                t_burnIn: 'Ekran Yanığı',
                t_whiteBalance: 'Beyaz Dengesi',
                t_blackBalance: 'Siyah Dengesi',
                t_imageQuality: 'Görüntü Kalitesi',
                t_screenAdjust: 'Ekran Ayarı',
                t_pixelFixer: 'Piksel Düzeltici',
                d_deadPixel: 'Ölü veya sıkışmış pikselleri kontrol edin.',
                d_viewingAngle: 'Farklı açılardan renk değişimlerini kontrol edin.',
                d_contrast: 'Aydınlık ve karanlık alanlar arasındaki ayrımı kontrol edin.',
                d_readability: 'Metin keskinliğini ve netliğini kontrol edin.',
                d_colorDifference: 'İnce renkleri ayırt etme yeteneğini kontrol edin.',
                d_responseRate: 'Hareket bulanıklığını kontrol edin.',
                d_gamma: 'Orta tonların doğru görüntülenip görüntülenmediğini kontrol edin.',
                d_uniformity: 'Arka ışık sızmasını ve homojenliği kontrol edin.',
                d_burnIn: 'Görüntü tutulmasını (burn-in) kontrol edin.',
                d_whiteBalance: 'Beyazın nötr görünüp görünmediğini kontrol edin.',
                d_blackBalance: 'Siyah seviyelerini kontrol edin.',
                d_imageQuality: 'Doğal renk üretimini kontrol edin.',
                d_screenAdjust: 'Ekran hizalamasını kontrol edin.',
                d_pixelFixer: 'Sıkışmış pikselleri düzeltmeyi dener. (Uyarı: Yanıp Sönen Işık)',
                guide_next: 'Devam etmek için tıkla',

                guide_contrast_gradient: 'Gradyan - Tüm adımlar görünmeli.',
                guide_contrast_black: 'Siyah - %1-5 kontrol et.',
                guide_contrast_white: 'Beyaz - %95-100 kontrol et.',
                guide_gamma: 'Gama - Birleşimi bul.',
                guide_readability: 'Okunabilirlik - Keskinliği kontrol et. (Tıkla ve çevir)',
                guide_uniformity: 'Homojenlik - Parlaklığı kontrol et.',
                guide_response: 'Tepki - İzleri kontrol et.',
                guide_viewingAngle: 'Açı - Renkleri kontrol et.',
                warn_pixelFixer: 'Uyarı: Hızlı yanıp sönme. Devam?',
                msg_pixelFixer_stop: 'Durdurmak için ESC.',

                ad_top: 'Reklam',
                ad_side: 'Reklam',
                ad_bottom: 'Reklam'
            }
        };

        this.init();
    }

    init() {
        // Detect language
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get('lang');

        // 1. URL Param Priority
        if (urlLang && this.data[urlLang]) {
            this.currentLang = urlLang;
        } else {
            // 2. Browser Preferences Priority
            // Check navigator.languages (ordered list of preferences)
            const langs = navigator.languages || [navigator.language || navigator.userLanguage];

            for (let lang of langs) {
                if (!lang) continue;
                const code = lang.slice(0, 2).toLowerCase();
                if (this.data[code]) {
                    this.currentLang = code;
                    break; // Found the best match
                }
            }
        }

        this.apply();
        this.renderLanguageSwitcher();
    }

    setLanguage(lang) {
        if (this.data[lang]) {
            this.currentLang = lang;
            this.apply();
            // Update URL without reload
            const url = new URL(window.location);
            url.searchParams.set('lang', lang);
            window.history.pushState({}, '', url);
        }
    }

    apply() {
        const dict = this.data[this.currentLang];
        if (!dict) return;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (dict[key]) {
                el.textContent = dict[key];
            }
        });

        // Explicitly update the document title for the browser tab
        if (dict['title']) {
            document.title = dict['title'];
        }

        document.documentElement.lang = this.currentLang;
    }

    /**
     * Get translated string by key
     * @param {string} key 
     * @returns {string} translated text
     */
    t(key) {
        const dict = this.data[this.currentLang] || this.data['en'];
        return dict[key] || key;
    }

    renderLanguageSwitcher() {
        const container = document.getElementById('lang-switcher');
        if (!container) return;

        container.innerHTML = '';
        const flags = [
            { code: 'ko', country: 'kr', name: 'Korean' },
            { code: 'en', country: 'us', name: 'English' },
            { code: 'ja', country: 'jp', name: 'Japanese' },
            { code: 'zh', country: 'cn', name: 'Chinese' },
            { code: 'es', country: 'es', name: 'Spanish' },
            { code: 'fr', country: 'fr', name: 'French' },
            { code: 'de', country: 'de', name: 'German' },
            { code: 'ru', country: 'ru', name: 'Russian' },
            { code: 'it', country: 'it', name: 'Italian' },
            { code: 'pt', country: 'br', name: 'Portuguese' },
            { code: 'tr', country: 'tr', name: 'Turkish' }
        ];

        flags.forEach(flag => {
            const btn = document.createElement('button');
            btn.className = 'lang-btn';
            btn.le = flag.name;

            // Create flag icon element
            const icon = document.createElement('span');
            icon.className = `fi fi-${flag.country}`;
            btn.appendChild(icon);

            if (this.currentLang === flag.code) btn.classList.add('active');

            btn.addEventListener('click', () => {
                this.setLanguage(flag.code);
                document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                if (!document.getElementById('test-container').classList.contains('hidden')) {
                    location.reload();
                }
            });
            container.appendChild(btn);
        });
    }
}
