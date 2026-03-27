const LOCALES = [
    { code: 'en', country: 'us', label: 'English' },
    { code: 'ko', country: 'kr', label: '한국어' },
    { code: 'ja', country: 'jp', label: '日本語' },
    { code: 'zh', country: 'cn', label: '中文' }
];

const STORAGE_KEY = 'preferredLocale';

function getSupportedLocale(candidate) {
    const lang = (candidate || '').slice(0, 2).toLowerCase();
    return LOCALES.find((locale) => locale.code === lang)?.code || null;
}

function buildLocalizedPath(localeCode, slug) {
    if (localeCode === 'en') {
        return slug ? `/en/${slug}` : '/en/';
    }
    return slug ? `/${localeCode}/${slug}` : `/${localeCode}/`;
}

function renderLanguageSwitcher() {
    const switcher = document.getElementById('lang-switcher');
    if (!switcher) {
        return;
    }

    const currentLocale = document.body.dataset.locale || 'en';
    const slug = document.body.dataset.slug || '';

    switcher.innerHTML = '';

    LOCALES.forEach((locale) => {
        const link = document.createElement('a');
        link.className = `lang-btn${locale.code === currentLocale ? ' active' : ''}`;
        link.href = buildLocalizedPath(locale.code, slug);
        link.title = locale.label;
        link.setAttribute('aria-label', locale.label);
        link.dataset.locale = locale.code;
        link.innerHTML = `<span class="fi fi-${locale.country}"></span>`;
        link.addEventListener('click', () => {
            localStorage.setItem(STORAGE_KEY, locale.code);
        });
        switcher.appendChild(link);
    });
}

function renderLocaleRecommendation() {
    const banner = document.getElementById('locale-recommendation');
    if (!banner) {
        return;
    }

    const currentLocale = document.body.dataset.locale || 'en';
    const slug = document.body.dataset.slug || '';
    const preferred = localStorage.getItem(STORAGE_KEY);
    const browserLocale = getSupportedLocale(navigator.languages?.[0] || navigator.language);
    const recommended = preferred || browserLocale;

    if (!recommended || recommended === currentLocale) {
        banner.remove();
        return;
    }

    const locale = LOCALES.find((entry) => entry.code === recommended);
    if (!locale) {
        banner.remove();
        return;
    }

    const target = buildLocalizedPath(recommended, slug);
    banner.innerHTML = `
        <div class="locale-banner-copy">
            <strong>${locale.label}</strong>
            <span>This page is also available in your preferred language.</span>
        </div>
        <a class="btn btn-secondary" href="${target}" data-locale="${recommended}">Open ${locale.label}</a>
    `;
    banner.querySelector('a')?.addEventListener('click', () => {
        localStorage.setItem(STORAGE_KEY, recommended);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderLanguageSwitcher();
    renderLocaleRecommendation();
});
