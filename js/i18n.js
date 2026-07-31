/**
 * ===== I18N ENGINE =====
 * Enterprise-grade Internationalization & Localization system.
 *
 * - Lazy-loads locale JSON files from /locales and caches them in memory.
 * - Arabic (ar) is the fallback dictionary, so a missing key never breaks UI.
 * - Provides `t(key, params)` with `{placeholder}` interpolation.
 * - Applies `lang`, `dir`, fonts and meta instantly with zero page reload.
 * - Emits a `languagechange` event so the UI can re-render seamlessly.
 */
const I18N = (() => {
    'use strict';

    /** Supported languages metadata (extend here to add a language). */
    const SUPPORTED_LANGUAGES = {
        ar: {
            code: 'ar',
            name: 'Arabic',
            nativeName: 'العربية',
            flag: '🇸🇦',
            dir: 'rtl',
            locale: 'ar-SA',
            headingFont: "'Cairo', sans-serif",
            bodyFont: "'Tajawal', sans-serif",
            hijri: true
        },
        en: {
            code: 'en',
            name: 'English',
            nativeName: 'English',
            flag: '🇺🇸',
            dir: 'ltr',
            locale: 'en-US',
            headingFont: "'Inter', sans-serif",
            bodyFont: "'Inter', sans-serif",
            hijri: false
        },
        so: {
            code: 'so',
            name: 'Somali',
            nativeName: 'Soomaali',
            flag: '🇸🇴',
            dir: 'ltr',
            locale: 'so-SO',
            headingFont: "'Noto Sans', sans-serif",
            bodyFont: "'Noto Sans', sans-serif",
            hijri: false
        }
    };

    const STORAGE_KEY = 'appLanguage';
    const BASE_LOCALE_DIR = 'locales';
    const FALLBACK_LANG = 'ar';

    let currentLang = FALLBACK_LANG;
    const cache = new Map();            // code -> locale object (in-memory dictionary)
    const listeners = new Set();        // language change subscribers
    let readyPromise = null;            // resolves when base + chosen locale are loaded

    /**
     * Normalize a language code (e.g. "en-US" -> "en", "ar-EG" -> "ar").
     */
    function normalize(code) {
        if (!code) return null;
        const c = String(code).trim().toLowerCase().split('-')[0];
        return SUPPORTED_LANGUAGES[c] ? c : null;
    }

    /**
     * Best-effort language detection from the browser, then device, then fallback.
     */
    function detectLanguage() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) return normalize(saved) || FALLBACK_LANG;
        } catch (e) { /* localStorage unavailable */ }
        if (navigator.languages && navigator.languages.length) {
            for (const l of navigator.languages) {
                const n = normalize(l);
                if (n) return n;
            }
        }
        return normalize(navigator.language) || FALLBACK_LANG;
    }

    /**
     * Fetch and parse a locale JSON file. On any network / parse error it
     * falls back to the bundled INLINE_LOCALES dictionary so the app never
     * shows raw keys (important when opened offline or directly via file://).
     */
    async function loadLocale(code) {
        if (cache.has(code)) return cache.get(code);
        let data = null;
        try {
            const resp = await fetch(`${BASE_LOCALE_DIR}/${code}.json`, { cache: 'no-cache' });
            if (!resp.ok) throw new Error('HTTP ' + resp.status);
            data = await resp.json();
        } catch (e) {
            data = (typeof INLINE_LOCALES !== 'undefined' && INLINE_LOCALES[code]) || null;
        }
        if (data && typeof data === 'object') {
            cache.set(code, data);
            return data;
        }
        // Last resort: Arabic dictionary, or an empty object.
        const fallback = cache.get(FALLBACK_LANG)
            || (typeof INLINE_LOCALES !== 'undefined' ? INLINE_LOCALES[FALLBACK_LANG] : null)
            || {};
        cache.set(code, fallback);
        return fallback;
    }

    /**
     * Resolve a dotted key to a value inside a dictionary.
     */
    function lookup(dict, key) {
        if (!key) return undefined;
        let val = dict;
        for (const part of String(key).split('.')) {
            if (val == null) return undefined;
            val = val[part];
        }
        return val;
    }

    /**
     * Translate a key with optional `{placeholder}` interpolation.
     * Resolution order: current language -> Arabic fallback -> raw key.
     */
    function t(key, params) {
        const cur = cache.get(currentLang) || {};
        const base = cache.get(FALLBACK_LANG) || {};
        let str = lookup(cur, key);
        if (str == null) str = lookup(base, key);
        if (str == null) return key;
        if (params) {
            for (const [k, v] of Object.entries(params)) {
                str = String(str).split(`{${k}}`).join(String(v));
            }
        }
        return str;
    }

    /**
     * Apply the current language to the whole document:
     * html[lang], html[dir], font CSS variables, and page meta tags.
     */
    function applyDocument() {
        const meta = SUPPORTED_LANGUAGES[currentLang];
        const root = document.documentElement;
        if (root) {
            root.setAttribute('lang', currentLang);
            root.setAttribute('dir', meta.dir);
            root.style.setProperty('--font-heading', meta.headingFont);
            root.style.setProperty('--font-body', meta.bodyFont);
        }
        // Keep PWA metadata in sync with the chosen language.
        if (document.title !== undefined) {
            document.title = t('app.metaTitle');
        }
        const setMeta = (name, content) => {
            const el = document.querySelector(`meta[name="${name}"]`);
            if (el && content) el.setAttribute('content', content);
        };
        setMeta('description', t('app.metaDescription'));
        setMeta('keywords', t('app.metaKeywords'));
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogTitle) ogTitle.setAttribute('content', t('app.metaOgTitle'));
        if (ogDesc) ogDesc.setAttribute('content', t('app.metaOgDescription'));
    }

    /**
     * Switch the active language, persist it, apply document changes and
     * notify subscribers. Never causes a reload or a white flash.
     */
    async function setLanguage(code) {
        const norm = normalize(code) || FALLBACK_LANG;
        if (norm === currentLang && cache.has(norm)) {
            return norm;
        }
        await loadLocale(norm);
        currentLang = norm;
        try {
            localStorage.setItem(STORAGE_KEY, norm);
        } catch (e) { /* storage may be blocked */ }
        applyDocument();
        listeners.forEach(fn => {
            try { fn(norm); } catch (e) { /* a listener must never break switching */ }
        });
        return norm;
    }

    /** Subscribe to language changes. Returns an unsubscribe function. */
    function onChange(fn) {
        listeners.add(fn);
        return () => listeners.delete(fn);
    }

    /** Get the current language code (e.g. 'en'). */
    function current() {
        return currentLang;
    }

    /** Get metadata for the current language. */
    function meta() {
        return SUPPORTED_LANGUAGES[currentLang];
    }

    /** Get the BCP-47 locale for date/number formatting. */
    function locale() {
        return meta().locale;
    }

    /** Whether the current language is RTL. */
    function isRTL() {
        return meta().dir === 'rtl';
    }

    /** List of supported language codes. */
    function supportedCodes() {
        return Object.keys(SUPPORTED_LANGUAGES);
    }

    /** List of supported language metadata objects. */
    function supportedLanguages() {
        return supportedCodes().map(c => SUPPORTED_LANGUAGES[c]);
    }

    /**
     * Initialize the system. Loads the base (Arabic) dictionary and the
     * detected/saved language in parallel, then applies everything.
     */
    function init() {
        if (!readyPromise) {
            readyPromise = (async () => {
                await loadLocale(FALLBACK_LANG);              // always available
                currentLang = detectLanguage();
                await loadLocale(currentLang);
                applyDocument();
            })();
        }
        return readyPromise;
    }

    return {
        SUPPORTED_LANGUAGES,
        normalize,
        detectLanguage,
        loadLocale,
        t,
        applyDocument,
        setLanguage,
        onChange,
        current,
        meta,
        locale,
        isRTL,
        supportedCodes,
        supportedLanguages,
        init
    };
})();

/**
 * Translate every element tagged with a `data-i18n` attribute.
 * Supported attributes:
 *   data-i18n="key"                    -> textContent
 *   data-i18n-placeholder="key"        -> placeholder
 *   data-i18n-title="key"              -> title
 *   data-i18n-tooltip="key"            -> sibling .tooltip-text textContent
 *   data-i18n-html="key"               -> innerHTML
 */
function translateStaticDOM(root) {
    const scope = root || document;
    scope.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (!key) return;
        if (el.tagName === 'TITLE' || el.tagName === 'META') {
            if (el.tagName === 'META') {
                const content = I18N.t(key);
                if (content) el.setAttribute('content', content);
            }
            return;
        }
        if (el.hasAttribute('data-i18n-html')) {
            el.innerHTML = I18N.t(key);
        } else {
            el.textContent = I18N.t(key);
        }
    });
    scope.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (key) el.setAttribute('placeholder', I18N.t(key));
    });
    scope.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        if (key) el.setAttribute('title', I18N.t(key));
    });
    scope.querySelectorAll('[data-i18n-tooltip]').forEach(el => {
        const key = el.getAttribute('data-i18n-tooltip');
        const tip = el.querySelector('.tooltip-text');
        if (key && tip) tip.textContent = I18N.t(key);
    });
}
