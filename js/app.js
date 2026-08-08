// ===== APPLICATION STATE =====
let currentPage = 'home';
let currentSection = null;
let currentCategory = 'all';
let appStarted = false;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let readZikr = JSON.parse(localStorage.getItem('readZikr')) || [];
let fontSize = parseInt(localStorage.getItem('fontSize')) || 22;
let darkMode = localStorage.getItem('darkMode') === 'true';
let notificationsEnabled = localStorage.getItem('notifications') === 'true';
let dailyStreak = parseInt(localStorage.getItem('dailyStreak')) || 0;
let lastVisit = localStorage.getItem('lastVisit') || null;
let searchTerm = '';
let deferredPrompt = null;
let tiktokNotifShown = localStorage.getItem('tiktokNotifShown') === 'true';

// ===== DOM REFS =====
const $ = id => document.getElementById(id);
const homePage = $('homePage');
const zikrPage = $('zikrPage');
const settingsPage = $('settingsPage');
const sectionsGrid = $('sectionsGrid');
const quickSectionsGrid = $('quickSectionsGrid');
const sectionsCategories = $('sectionsCategories');
const currentTimeElement = $('currentTime');
const clockTimeEl = $('clockTime');
const clockSecondsEl = $('clockSeconds');
const clockPeriodEl = $('clockPeriod');
const clockDayEl = $('clockDay');
const clockGregorianEl = $('clockGregorian');
const clockHijriEl = $('clockHijri');
const progressPercent = $('progressPercent');
const progressFill = $('progressFill');
const completedStats = $('completedStats');
const remainingStats = $('remainingStats');
const streakStats = $('streakStats');
const totalReadStat = $('totalReadStat');
const favoritesStat = $('favoritesStat');
const streakStat = $('streakStat');
const completionStat = $('completionStat');
const searchInput = $('searchInput');
const themeToggle = $('themeToggle');
const fontSizeToggle = $('fontSizeToggle');
const settingsToggle = $('settingsToggle');
const toggleDarkModeBtn = $('toggleDarkModeBtn');
const changeFontSizeBtn = $('changeFontSizeBtn');
const toggleNotificationsBtn = $('toggleNotificationsBtn');
const resetProgressBtn = $('resetProgressBtn');
const exportDataBtn = $('exportDataBtn');
const importDataBtn = $('importDataBtn');
const shareAppBtn = $('shareAppBtn');
const rateAppBtn = $('rateAppBtn');
const joinTelegramBtn = $('joinTelegramBtn');
const backToHomeFromSettingsBtn = $('backToHomeFromSettingsBtn');
const dailyReminderBtn = $('dailyReminderBtn');
const randomZikrBtn = $('randomZikrBtn');
const privacyLink = $('privacyLink');
const termsLink = $('termsLink');
const helpLink = $('helpLink');
const currentYear = $('currentYear');
const notificationContainer = $('notificationContainer');
const loadingSpinner = $('loadingSpinner');
const contactModal = $('contactModal');
const contactModalClose = $('contactModalClose');
const contactForm = $('contactForm');
const contactDeveloperBtn = $('contactDeveloperBtn');
const shareModal = $('shareModal');
const shareModalClose = $('shareModalClose');
const installBtn = $('installBtn');
const installPrompt = $('installPrompt');
const installPromptBtn = $('installPromptBtn');
const installLaterBtn = $('installLaterBtn');
const installCloseBtn = $('installCloseBtn');
const settingsLanguageList = $('settingsLanguageList');

// ===== NEW HOME PAGE REFS =====
const hijriDateText = $('hijriDateText');

// ===== LOCALIZATION HELPERS =====
/** Shortcut for the i18n translate function. */
function t(key, params) {
    return I18N.t(key, params);
}

/**
 * Translate every static element (data-i18n) and re-render the language
 * picker, then refresh every dynamic part of the currently visible page.
 * Called automatically whenever the active language changes.
 */
function reRenderUI() {
    translateStaticDOM();
    renderLanguageOptions(settingsLanguageList, true);
    applyDarkMode();
    applyFontSize();
    updateNotificationsButton();
    if (currentPage === 'zikr' && currentSection) {
        openSection(currentSection);
    } else if (currentPage === 'home') {
        generateSections();
        generateQuickSections();
        updateProgress();
        updateStats();
    }
    updateTime();
}

/**
 * Render the language option buttons into a container.
 * @param {HTMLElement|null} container - target element
 * @param {boolean} checkable - show a check mark on the active language
 */
function renderLanguageOptions(container, checkable) {
    if (!container) return;
    container.innerHTML = '';
    I18N.supportedLanguages().forEach(lang => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'lang-option' + (I18N.current() === lang.code ? ' active' : '');
        btn.dataset.lang = lang.code;
        btn.innerHTML = `
            <span class="lang-flag">${lang.flag}</span>
            <span class="lang-name">
                <span class="lang-native">${lang.nativeName}</span>
                <span class="lang-en">${lang.name}</span>
            </span>
            ${checkable ? '<span class="lang-check"><i class="fas fa-check"></i></span>' : ''}`;
        btn.addEventListener('click', () => chooseLanguage(lang.code));
        container.appendChild(btn);
    });
}

/**
 * Set the app language. When chosen from the first-run screen it also boots
 * the app; otherwise the UI re-renders instantly via the change listener.
 * @param {string} code - supported language code (ar / en / so)
 */
async function chooseLanguage(code) {
    await I18N.setLanguage(code);
    if (languageScreenShown()) hideLanguageScreen();
    if (!appStarted) {
        appStarted = true;
        initApp();
    }
    hideLoading();
}

function languageScreenShown() {
    const sc = $('languageScreen');
    return !!(sc && sc.classList.contains('show'));
}

/** Show the first-run language selection screen (fully translated). */
function showLanguageScreen() {
    const sc = $('languageScreen');
    if (!sc) return;
    const title = $('languageScreenTitle');
    const subtitle = $('languageScreenSubtitle');
    if (title) title.textContent = t('languageScreen.title');
    if (subtitle) subtitle.textContent = t('languageScreen.subtitle');
    renderLanguageOptions($('languageOptions'), false);
    sc.classList.add('show');
    document.body.style.overflow = 'hidden';
}

/** Hide the language selection screen. */
function hideLanguageScreen() {
    const sc = $('languageScreen');
    if (!sc) return;
    sc.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// ===== HIJRI DATE =====
/**
 * Convert a Gregorian date to the civil (tabular) Islamic date.
 * The well-known arithmetic algorithm used across Islamic date libraries.
 */
function gregorianToHijri(y, m, d) {
    const jd = Math.floor((1461 * (y + 4800 + Math.floor((m - 14) / 12))) / 4)
        + Math.floor((367 * (m - 2 - 12 * Math.floor((m - 14) / 12))) / 12)
        - Math.floor((3 * Math.floor((y + 4900 + Math.floor((m - 14) / 12)) / 100)) / 4)
        + d - 32075;
    let l = jd - 1948440 + 10632;
    const n = Math.floor((l - 1) / 10631);
    l = l - 10631 * n + 354;
    const j1 = Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719)
        + Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
    l = l - Math.floor((30 - j1) / 15) * Math.floor((17719 * j1) / 50)
        - Math.floor(j1 / 16) * Math.floor((15238 * j1) / 43) + 29;
    const hy = 30 * n + j1 - 30;
    const hm = Math.floor((24 * l) / 709);
    const hd = l - Math.floor((709 * hm) / 24);
    return { y: hy, m: hm, d: hd };
}

/**
 * Format today's Hijri date using the Islamic calendar for the active locale.
 * @param {string} loc - BCP-47 locale (e.g. 'ar-SA', 'en-US', 'so-SO')
 */
function getHijriDate(loc) {
    try {
        const fmt = new Intl.DateTimeFormat(loc + '-u-ca-islamic', {
            month: 'long', day: 'numeric', year: 'numeric'
        });
        const yearPart = fmt.formatToParts(new Date()).find(p => p.type === 'year');
        // Normalize Arabic-Indic digits (e.g. "١٤٤٨") to Western digits.
        const yv = String(yearPart ? yearPart.value : '').replace(/[٠-٩]/g,
            c => String('٠١٢٣٤٥٦٧٨٩'.indexOf(c)));
        const yNum = parseInt(yv, 10);
        // An unsupported locale silently falls back to the Gregorian calendar
        // (year > 1600). Detect it and recompute with the manual conversion.
        if (yNum > 1600) throw new Error('gregorian fallback');
        const formatted = fmt.format(new Date());
        return formatted.replace(/[ \u00A0]?هـ/g, '').replace(/[ \u00A0]?AH/gi, '').trim();
    } catch {
        const now = new Date();
        const hy = gregorianToHijri(now.getFullYear(), now.getMonth() + 1, now.getDate());
        return `${hy.d} ${t('months.' + (hy.m - 1))} ${hy.y}`;
    }
}

// ===== TIME =====
/** Update the live clock, day names, Gregorian and Hijri dates in the UI. */
function updateTime() {
    const now = new Date();
    const loc = I18N.locale();
    let h = now.getHours();
    const period = h >= 12 ? t('clock.pm') : t('clock.am');
    h = h % 12 || 12;
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    if (clockTimeEl) clockTimeEl.textContent = `${h}:${m}`;
    if (clockSecondsEl) clockSecondsEl.textContent = s;
    if (clockPeriodEl) clockPeriodEl.textContent = period;

    let dayName = '';
    try {
        dayName = new Intl.DateTimeFormat(loc, { weekday: 'long' }).format(now);
    } catch {
        dayName = t('days.' + now.getDay());
    }
    if (clockDayEl) clockDayEl.textContent = dayName;

    let gregorian = '';
    try {
        gregorian = now.toLocaleDateString(loc, { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
        gregorian = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    if (clockGregorianEl) clockGregorianEl.textContent = gregorian;

    const hijri = getHijriDate(loc);
    if (clockHijriEl) clockHijriEl.textContent = hijri;

    let timeStr = '', dateStr = '';
    try {
        timeStr = now.toLocaleTimeString(loc, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        dateStr = now.toLocaleDateString(loc, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
        timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
    if (currentTimeElement) currentTimeElement.textContent = `${dateStr} - ${timeStr}`;
    if (hijriDateText) hijriDateText.textContent = hijri;
}

// ===== INIT =====
/** Bootstrap the application: bind events, render data, start timers. */
function initApp() {
    translateStaticDOM();
    renderLanguageOptions(settingsLanguageList, true);
    if (currentYear) currentYear.textContent = new Date().getFullYear();
    applyDarkMode();
    applyFontSize();
    updateNotificationsButton();
    updateDailyStreak();
    generateSections();
    generateQuickSections();
    updateTime();
    setInterval(updateTime, 1000);
    updateProgress();
    updateStats();
    setupSearch();
    setupEventListeners();
    setupCategoryFilters();
    setupEnhancedFeatures();
    setupPWAInstall();
    setTimeout(() => {
        showNotification(t('notifications.welcomeTitle'), t('notifications.welcomeMsg'), 'success');
        if (!tiktokNotifShown) {
            setTimeout(() => showTiktokNotification(), 3000);
        }
    }, 1000);
    checkDailyReminder();
}

// ===== CATEGORY FILTERS =====
function setupCategoryFilters() {
    sectionsCategories?.querySelectorAll('.category-tab').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.category-tab').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            generateSections();
        });
    });
}

// ===== SECTIONS =====
/** Render the section cards grid filtered by the current category. */
function generateSections() {
    if (!sectionsGrid) return;
    sectionsGrid.innerHTML = '';
    let filtered = appConfig.sections;
    if (currentCategory !== 'all') filtered = filtered.filter(s => s.category === currentCategory);
    filtered.sort((a, b) => a.priority - b.priority);

    filtered.forEach(section => {
        const name = t(section.nameKey);
        const description = t(section.descriptionKey);
        const readCount = readZikr.filter(id => id.startsWith(section.id)).length;
        const progress = Math.min(100, Math.round((readCount / section.count) * 100));
        const card = document.createElement('div');
        card.className = 'section-card';
        card.dataset.sectionId = section.id;
        card.style.background = 'var(--light)';
        card.innerHTML = `
            <div class="section-card-top" style="background:linear-gradient(135deg, ${section.color} 0%, ${section.color}cc 50%, ${section.color}88 100%)">
                <div class="section-card-header">
                    <div class="section-icon"><i class="${section.icon}"></i></div>
                    <div class="section-title-wrapper">
                        <h3 class="section-title">${name}</h3>
                        <span class="section-badge">${t('sections.badges.' + section.category)}</span>
                    </div>
                </div>
            </div>
            <div class="section-card-body">
                <p class="section-desc">${description}</p>
                <div class="section-stats-row">
                    <div class="section-count-badge"><i class="${section.icon}"></i><span>${t('common.countZikr', { count: section.count })}</span></div>
                    <div class="section-progress-pct" style="color:${section.color}">${progress}%</div>
                </div>
                <div class="section-progress-track"><div class="section-progress-fill" style="width:${progress}%;background:linear-gradient(90deg, ${section.color}, ${section.color}aa)"></div></div>
            </div>
            <div class="section-card-footer">
                <div class="section-card-footer-right" style="color:${section.color}"><i class="${section.icon}"></i><span>${t('common.countZikr', { count: section.count })}</span></div>
                <span class="section-link" style="color:${section.color}">${t('sections.browse')} <i class="fas fa-arrow-left section-arrow"></i></span>
            </div>`;
        card.addEventListener('click', () => openSection(section.id));
        sectionsGrid.appendChild(card);
    });

    if (!sectionsGrid.children.length) {
        sectionsGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:50px">
            <i class="fas fa-filter" style="font-size:60px;color:var(--medium-gray);margin-bottom:20px"></i>
            <h3 style="color:var(--text-light)">${t('sections.emptyCategory')}</h3></div>`;
    }
}

function generateQuickSections() {
    if (!quickSectionsGrid) return;
    quickSectionsGrid.innerHTML = '';
    appConfig.sections.slice(0, 4).forEach(s => {
        const el = document.createElement('div');
        el.className = 'quick-section-card';
        el.dataset.sectionId = s.id;
        el.innerHTML = `<i class="${s.icon}" style="color:${s.color}"></i>
            <div class="quick-section-info">
                <div class="quick-section-name">${t(s.nameKey)}</div>
                <div class="quick-section-count">${t('common.countZikr', { count: s.count })}</div>
            </div>`;
        el.addEventListener('click', () => openSection(s.id));
        quickSectionsGrid.appendChild(el);
    });
}

function updateStats() {
    const readLen = readZikr.length;
    const favLen = favorites.length;
    const pct = `${Math.min(100, Math.round((readLen / appConfig.totalZikr) * 100))}%`;
    if (totalReadStat) totalReadStat.textContent = readLen;
    if (favoritesStat) favoritesStat.textContent = favLen;
    if (streakStat) streakStat.textContent = dailyStreak;
    if (completionStat) completionStat.textContent = pct;
}

function showTiktokNotification() {
    showNotification(t('notifications.tiktokTitle'), t('notifications.tiktokMsg'), 'info', TIKTOK_URL);
    localStorage.setItem('tiktokNotifShown', 'true');
}

// ===== DARK MODE =====
function applyDarkMode() {
    document.body.classList.toggle('dark-mode', darkMode);
    if (themeToggle) themeToggle.innerHTML = darkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    if (toggleDarkModeBtn) toggleDarkModeBtn.innerHTML = darkMode
        ? '<i class="fas fa-sun"></i> ' + t('settings.dayOn')
        : '<i class="fas fa-moon"></i> ' + t('settings.nightOn');
}

function toggleDarkMode() {
    darkMode = !darkMode;
    localStorage.setItem('darkMode', darkMode);
    applyDarkMode();
    showNotification(t('notifications.changed'), darkMode ? t('notifications.darkModeOn') : t('notifications.darkModeOff'), 'success');
}

// ===== FONT SIZE =====
function applyFontSize() {
    document.documentElement.style.setProperty('--font-size', `${fontSize}px`);
}

function changeFontSize() {
    fontSize += 2;
    if (fontSize > 28) fontSize = 18;
    localStorage.setItem('fontSize', fontSize);
    applyFontSize();
    showNotification(t('notifications.changed'), t('notifications.fontSizeChanged', { size: fontSize }), 'success');
}

// ===== NOTIFICATIONS =====
function updateNotificationsButton() {
    if (toggleNotificationsBtn) {
        toggleNotificationsBtn.innerHTML = notificationsEnabled
            ? '<i class="fas fa-bell-slash"></i> ' + t('settings.remindersOff')
            : '<i class="fas fa-bell"></i> ' + t('settings.remindersOn');
    }
}

function toggleNotifications() {
    notificationsEnabled = !notificationsEnabled;
    localStorage.setItem('notifications', notificationsEnabled);
    updateNotificationsButton();
    if (notificationsEnabled && 'Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
    showNotification(t('notifications.changed'), notificationsEnabled ? t('notifications.remindersOn') : t('notifications.remindersOff'), 'success');
}

function checkDailyReminder() {
    if (!notificationsEnabled) return;
    const now = new Date();
    const last = localStorage.getItem('lastReminder');
    const today = now.toDateString();
    if (last !== today) {
        const h = now.getHours();
        if ((h >= 6 && h <= 9) || (h >= 18 && h <= 21)) {
            const isMorning = h < 12;
            const title = isMorning ? t('notifications.reminderMorningTitle') : t('notifications.reminderEveningTitle');
            const msg = isMorning ? t('notifications.reminderMorningMsg') : t('notifications.reminderEveningMsg');
            showNotification(title, msg, 'info');
            localStorage.setItem('lastReminder', today);
        }
    }
}

// ===== STREAK =====
function updateDailyStreak() {
    const today = new Date().toDateString();
    if (lastVisit) {
        const last = new Date(lastVisit);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (last.toDateString() === yesterday.toDateString()) dailyStreak++;
        else if (last.toDateString() !== today) dailyStreak = 1;
    } else dailyStreak = 1;
    lastVisit = today;
    localStorage.setItem('lastVisit', lastVisit);
    localStorage.setItem('dailyStreak', dailyStreak);
    if (streakStats) streakStats.textContent = t('common.streak', { count: dailyStreak });
}

// ===== OPEN SECTION =====
/** Open a section page and render its header, filters and dhikr list. */
function openSection(sectionId) {
    currentSection = sectionId;
    const section = appConfig.sections.find(s => s.id === sectionId);
    if (!section) return;

    const name = t(section.nameKey);
    const description = t(section.descriptionKey);
    const readCount = readZikr.filter(id => id.startsWith(sectionId)).length;
    const progress = Math.min(100, Math.round((readCount / section.count) * 100));

    zikrPage.innerHTML = `
        <div class="zikr-header" style="background:linear-gradient(135deg,${section.color},${section.color}99)">
            <div class="zikr-header-content">
                <h2 class="zikr-title">${name}</h2>
                <p class="zikr-subtitle">${description}</p>
            </div>
            <div class="zikr-count"><i class="${section.icon}"></i><span>${t('zikr.progress', { count: section.count, progress })}</span></div>
        </div>
        <div class="zikr-controls">
            <button class="control-btn-large active" data-filter="all"><i class="fas fa-list"></i> ${t('zikr.filters.all')}</button>
            <button class="control-btn-large" data-filter="favorites"><i class="fas fa-heart"></i> ${t('zikr.filters.favorites')}</button>
            <button class="control-btn-large" data-filter="read"><i class="fas fa-check-circle"></i> ${t('zikr.filters.read')}</button>
            <button class="control-btn-large" data-filter="unread"><i class="fas fa-circle"></i> ${t('zikr.filters.unread')}</button>
            <button class="control-btn-large" data-filter="search" id="searchFilterBtn"><i class="fas fa-search"></i> ${t('zikr.filters.search')}</button>
        </div>
        <div class="search-container hidden" id="sectionSearchContainer">
            <div class="search-box">
                <input type="text" id="sectionSearchInput" class="search-input" placeholder="${t('zikr.searchPlaceholder', { name })}">
                <i class="fas fa-search search-icon"></i>
            </div>
        </div>
        <div class="zikr-list" id="zikrList"></div>
        <div class="navigation">
            <button class="nav-btn back-btn" id="backToHomeBtn"><i class="fas fa-arrow-right"></i> ${t('zikr.back')}</button>
            <button class="nav-btn secondary" id="markAllReadBtn"><i class="fas fa-check-double"></i> ${t('zikr.markAllRead')}</button>
        </div>`;

    generateZikrItems(sectionId);
    $('backToHomeBtn')?.addEventListener('click', () => showPage('home'));
    $('markAllReadBtn')?.addEventListener('click', markAllAsRead);
    $('searchFilterBtn')?.addEventListener('click', toggleSectionSearch);
    $('sectionSearchInput')?.addEventListener('input', e => {
        searchTerm = e.target.value;
        generateZikrItems(sectionId, getCurrentFilter());
    });
    document.querySelectorAll('.zikr-controls .control-btn-large').forEach(btn => {
        btn.addEventListener('click', function () {
            if (this.dataset.filter === 'search') { toggleSectionSearch(); return; }
            document.querySelectorAll('.zikr-controls .control-btn-large').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            generateZikrItems(sectionId, this.dataset.filter);
        });
    });
    showPage('zikr');
}

function toggleSectionSearch() {
    const el = $('sectionSearchContainer');
    if (!el) return;
    if (el.classList.contains('hidden')) {
        el.classList.remove('hidden');
        $('sectionSearchInput')?.focus();
    } else {
        el.classList.add('hidden');
        searchTerm = '';
        generateZikrItems(currentSection, getCurrentFilter());
    }
}

function getCurrentFilter() {
    const active = document.querySelector('.zikr-controls .control-btn-large.active');
    return active ? active.dataset.filter : 'all';
}

/** Return the dhikr text in the currently-selected language. */
function localizedZikrText(item) {
    const lang = I18N.current();
    if (lang === 'en') return item.en || item.text;
    if (lang === 'so') return item.so || item.text;
    return item.text;
}

// ===== GENERATE ZIKR ITEMS =====
/** Render the dhikr list for a section, applying filter and search. */
function generateZikrItems(sectionId, filter = 'all') {
    const list = $('zikrList');
    if (!list) return;
    list.innerHTML = '<div class="spinner"></div>';

    setTimeout(() => {
        list.innerHTML = '';
        let items = adhkarDatabase[sectionId] || [];

        if (filter === 'favorites') items = items.filter(i => favorites.includes(`${sectionId}_${i.id}`));
        else if (filter === 'read') items = items.filter(i => readZikr.includes(`${sectionId}_${i.id}`));
        else if (filter === 'unread') items = items.filter(i => !readZikr.includes(`${sectionId}_${i.id}`));

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            items = items.filter(i =>
                localizedZikrText(i).toLowerCase().includes(term) ||
                i.text.toLowerCase().includes(term) ||
                t(i.referenceKey).toLowerCase().includes(term) ||
                t(i.benefitsKey).toLowerCase().includes(term)
            );
        }

        items.forEach(item => {
            const zikrId = `${sectionId}_${item.id}`;
            const isFav = favorites.includes(zikrId);
            const isRead = readZikr.includes(zikrId);
            const el = document.createElement('div');
            el.className = `zikr-item ${isFav ? 'favorite' : ''} ${isRead ? 'read' : ''}`;
            el.dataset.id = zikrId;
            el.innerHTML = `
                <div class="zikr-item-header">
                    <div class="zikr-number">${item.id}</div>
                    <div class="zikr-actions">
                        <button class="action-btn favorite-btn ${isFav ? 'active' : ''}" title="${isFav ? t('zikr.removeFromFav') : t('zikr.addToFav')}"><i class="fas fa-heart"></i></button>
                        <button class="action-btn read-btn ${isRead ? 'active' : ''}" title="${isRead ? t('zikr.markUnread') : t('zikr.markRead')}"><i class="fas ${isRead ? 'fa-check-circle' : 'fa-circle'}"></i></button>
                        <button class="action-btn share-btn" title="${t('zikr.share')}"><i class="fas fa-share-alt"></i></button>
                        <button class="action-btn counter-btn" title="${t('zikr.counter')}"><i class="fas fa-redo"></i></button>
                    </div>
                </div>
                <div class="zikr-text">${localizedZikrText(item)}</div>
                <div class="zikr-details">
                    <div class="detail-row"><span class="detail-label"><i class="fas fa-redo"></i> ${t('zikr.repetition')}</span><span class="detail-value">${t(item.repetitionKey)}</span></div>
                    <div class="detail-row"><span class="detail-label"><i class="fas fa-book"></i> ${t('zikr.source')}</span><span class="detail-value">${t(item.referenceKey)} ${t(item.referenceNumberKey)}</span></div>
                    <div class="detail-row"><span class="detail-label"><i class="fas fa-star"></i> ${t('zikr.benefits')}</span><span class="detail-value">${t(item.benefitsKey)}</span></div>
                </div>
                <div class="zikr-counter hidden">
                    <div class="counter-display">0</div>
                    <button class="settings-btn counter-btn" id="incrementCounter">+</button>
                    <button class="settings-btn secondary" id="resetCounter">${t('zikr.reset')}</button>
                </div>`;

            const favBtn = el.querySelector('.favorite-btn');
            const readBtn = el.querySelector('.read-btn');
            const shareBtn = el.querySelector('.share-btn');
            const counterBtn = el.querySelector('.counter-btn');
            const incBtn = el.querySelector('#incrementCounter');
            const resetBtn = el.querySelector('#resetCounter');
            const counterDisp = el.querySelector('.counter-display');
            const counterCont = el.querySelector('.zikr-counter');

            favBtn?.addEventListener('click', () => toggleFavorite(zikrId, favBtn));
            readBtn?.addEventListener('click', () => toggleRead(zikrId, readBtn));
            shareBtn?.addEventListener('click', () => shareZikr(localizedZikrText(item), item.referenceKey));
            counterBtn?.addEventListener('click', () => counterCont.classList.toggle('hidden'));
            incBtn?.addEventListener('click', () => {
                let c = parseInt(counterDisp.textContent) + 1;
                counterDisp.textContent = c;
                const rep = item.repetitionCount || 0;
                if (rep && c >= rep) {
                    showNotification(t('zikr.completeTitle'), t('zikr.completeMsg', { count: rep }), 'success');
                    if (!isRead) toggleRead(zikrId, readBtn);
                }
            });
            resetBtn?.addEventListener('click', () => counterDisp.textContent = '0');

            list.appendChild(el);
        });

        if (!list.children.length) {
            list.innerHTML = `<div class="text-center mt-40">
                <i class="fas fa-search" style="font-size:60px;color:var(--medium-gray);margin-bottom:20px"></i>
                <h3 style="color:var(--text-light)">${t('zikr.emptyTitle')}</h3>
                <p style="color:var(--text-light)">${t('zikr.emptyHint')}</p></div>`;
        }
    }, 300);
}

// ===== FAVORITES & READ =====
function toggleFavorite(zikrId, btn) {
    const idx = favorites.indexOf(zikrId);
    if (idx === -1) {
        favorites.push(zikrId);
        btn.classList.add('active');
        showNotification(t('notifications.added'), t('notifications.addedMsg'), 'success');
    } else {
        favorites.splice(idx, 1);
        btn.classList.remove('active');
        showNotification(t('notifications.removed'), t('notifications.removedMsg'), 'info');
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateStats();
}

function toggleRead(zikrId, btn) {
    const idx = readZikr.indexOf(zikrId);
    if (idx === -1) {
        readZikr.push(zikrId);
        btn.classList.add('active');
        btn.innerHTML = '<i class="fas fa-check-circle"></i>';
        showNotification(t('notifications.excellent'), t('notifications.readMsg'), 'success');
    } else {
        readZikr.splice(idx, 1);
        btn.classList.remove('active');
        btn.innerHTML = '<i class="fas fa-circle"></i>';
    }
    localStorage.setItem('readZikr', JSON.stringify(readZikr));
    updateProgress();
    updateStats();
    if (currentSection) {
        const sec = appConfig.sections.find(s => s.id === currentSection);
        if (sec) {
            const rc = readZikr.filter(id => id.startsWith(currentSection)).length;
            const p = Math.min(100, Math.round((rc / sec.count) * 100));
            const el = document.querySelector('.zikr-count span');
            if (el) el.textContent = t('zikr.progress', { count: sec.count, progress: p });
        }
    }
}

function markAllAsRead() {
    if (!currentSection) return;
    if (confirm(t('confirm.markAllRead'))) {
        const sec = appConfig.sections.find(s => s.id === currentSection);
        if (sec) {
            for (let i = 1; i <= sec.count; i++) {
                const id = `${currentSection}_${i}`;
                if (!readZikr.includes(id)) readZikr.push(id);
            }
            localStorage.setItem('readZikr', JSON.stringify(readZikr));
            generateZikrItems(currentSection, getCurrentFilter());
            updateProgress();
            updateStats();
            showNotification(t('notifications.done'), t('notifications.allRead'), 'success');
        }
    }
}

// ===== SHARE =====
function shareZikr(text, referenceKey) {
    const reference = t(referenceKey);
    const textToShare = `${text}\n\n${t('notifications.shareSource', { reference })}\n\n${t('notifications.shareZikrFooter', { developer: t(DEVELOPER_KEY) })}\n${t('notifications.shareTiktok', { url: TIKTOK_URL })}`;
    if (navigator.share) {
        navigator.share({ title: t('notifications.shareTitle'), text: textToShare, url: window.location.href })
            .then(() => showNotification(t('share.shared'), t('share.sharedMsg'), 'success'))
            .catch(() => copyToClipboard(textToShare));
    } else copyToClipboard(textToShare);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => showNotification(t('notifications.copied'), t('notifications.copiedMsg'), 'success'))
        .catch(() => {
            const ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showNotification(t('notifications.copied'), t('notifications.copiedMsg'), 'success');
        });
}

// ===== PROGRESS =====
function updateProgress() {
    const total = appConfig.totalZikr;
    const read = readZikr.length;
    const pct = Math.min(100, Math.round((read / total) * 100));
    if (progressPercent) progressPercent.textContent = `${pct}%`;
    if (progressFill) progressFill.style.width = `${pct}%`;
    if (completedStats) completedStats.textContent = t('progressMeta.read', { count: read });
    if (remainingStats) remainingStats.textContent = t('progressMeta.remaining', { count: total - read });
    appConfig.sections.forEach(s => {
        const card = document.querySelector(`.section-card[data-section-id="${s.id}"]`);
        if (card) {
            const rc = readZikr.filter(id => id.startsWith(s.id)).length;
            const p = Math.min(100, Math.round((rc / s.count) * 100));
            const fill = card.querySelector('.section-progress-fill');
            const txt = card.querySelector('.section-progress-pct');
            if (fill) fill.style.width = `${p}%`;
            if (txt) txt.textContent = `${p}%`;
        }
    });
}

// ===== SEARCH =====
function setupSearch() {
    searchInput?.addEventListener('input', function (e) {
        const term = e.target.value.toLowerCase();
        searchTerm = term;
        appConfig.sections.forEach(s => {
            const card = document.querySelector(`.section-card[data-section-id="${s.id}"]`);
            if (card) {
                const match = (t(s.nameKey) + ' ' + t(s.descriptionKey)).toLowerCase().includes(term);
                if (term.length >= 2 && match) {
                    card.style.boxShadow = '0 0 0 3px var(--accent)';
                    card.style.transform = 'translateY(-5px)';
                } else {
                    card.style.boxShadow = '';
                    card.style.transform = '';
                }
            }
        });
    });
}

// ===== DATA MANAGEMENT =====
function resetProgress() {
    if (confirm(t('confirm.resetProgress'))) {
        favorites = []; readZikr = []; dailyStreak = 0;
        localStorage.setItem('favorites', JSON.stringify(favorites));
        localStorage.setItem('readZikr', JSON.stringify(readZikr));
        localStorage.setItem('dailyStreak', dailyStreak);
        updateProgress();
        generateSections();
        updateStats();
        if (currentPage === 'zikr' && currentSection) generateZikrItems(currentSection, getCurrentFilter());
        showNotification(t('notifications.reset'), t('notifications.resetMsg'), 'success');
    }
}

function exportData() {
    const data = { favorites, readZikr, dailyStreak, lastVisit, darkMode, fontSize, notificationsEnabled, exportDate: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = t('notifications.exportFileName', { date: new Date().toISOString().split('T')[0] });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification(t('notifications.exported'), t('notifications.exportedMsg'), 'success');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function (e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (ev) {
            try {
                const data = JSON.parse(ev.target.result);
                if (!data.favorites || !data.readZikr) throw new Error(t('notifications.invalidFile'));
                if (confirm(t('confirm.importData'))) {
                    favorites = data.favorites || [];
                    readZikr = data.readZikr || [];
                    dailyStreak = data.dailyStreak || 0;
                    lastVisit = data.lastVisit || null;
                    darkMode = data.darkMode ?? false;
                    fontSize = data.fontSize || 22;
                    notificationsEnabled = data.notificationsEnabled || false;
                    localStorage.setItem('favorites', JSON.stringify(favorites));
                    localStorage.setItem('readZikr', JSON.stringify(readZikr));
                    localStorage.setItem('dailyStreak', dailyStreak);
                    localStorage.setItem('lastVisit', lastVisit || '');
                    localStorage.setItem('darkMode', darkMode);
                    localStorage.setItem('fontSize', fontSize);
                    localStorage.setItem('notifications', notificationsEnabled);
                    applyDarkMode(); applyFontSize(); updateNotificationsButton();
                    updateProgress(); updateStats(); generateSections();
                    if (currentPage === 'zikr' && currentSection) generateZikrItems(currentSection, getCurrentFilter());
                    showNotification(t('notifications.imported'), t('notifications.importedMsg'), 'success');
                }
            } catch {
                showNotification(t('notifications.importError'), t('notifications.invalidFile'), 'error');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// ===== RANDOM / RATE =====
function showRandomZikr() {
    const sec = appConfig.sections[Math.floor(Math.random() * appConfig.sections.length)];
    openSection(sec.id);
    setTimeout(() => {
        const r = Math.floor(Math.random() * sec.count) + 1;
        const el = document.querySelector(`.zikr-item[data-id="${sec.id}_${r}"]`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.style.animation = 'bounce 1s';
            setTimeout(() => el.style.animation = '', 1000);
            showNotification(t('notifications.random'), t('notifications.randomMsg', { name: t(sec.nameKey) }), 'info');
        }
    }, 500);
}

function rateApp() {
    showNotification(t('notifications.thanks'), t('notifications.thanksMsg'), 'info');
}

// ===== PAGES =====
function showPage(page) {
    [homePage, zikrPage, settingsPage].forEach(p => p?.classList.remove('active'));
    if (page === 'home') { homePage?.classList.add('active'); currentPage = 'home'; updateProgress(); }
    else if (page === 'zikr') { zikrPage?.classList.add('active'); currentPage = 'zikr'; }
    else if (page === 'settings') { settingsPage?.classList.add('active'); currentPage = 'settings'; }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== MODALS =====
function openContactModal() {
    contactModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeContactModal() {
    contactModal?.classList.remove('active');
    document.body.style.overflow = 'auto';
    contactForm?.reset();
    const msg = $('contactMessageDiv');
    if (msg) { msg.className = 'form-message'; msg.style.display = 'none'; }
}
function openShareModal() {
    shareModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
    const inp = $('shareLinkInput');
    if (inp) inp.value = APP_URL || window.location.href;
}
function closeShareModal() {
    shareModal?.classList.remove('active');
    document.body.style.overflow = 'auto';
    const msg = $('shareMessageDiv');
    if (msg) { msg.className = 'form-message'; msg.style.display = 'none'; }
}

async function handleContactSubmit(e) {
    e.preventDefault();
    const name = $('contactName').value;
    const email = $('contactEmail').value;
    const subjectCode = $('contactSubject').value;
    const subject = t('contact.subjects.' + (subjectCode || 'other'));
    const message = $('contactMessage').value;
    const btn = $('contactSubmit');
    const msgDiv = $('contactMessageDiv');
    if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + t('contact.sending'); }
    setTimeout(() => {
        if (msgDiv) {
            msgDiv.textContent = t('contact.success');
            msgDiv.className = 'form-message success';
            msgDiv.style.display = 'block';
        }
        setTimeout(() => { contactForm?.reset(); if (msgDiv) msgDiv.style.display = 'none'; }, 2000);
        if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-paper-plane"></i> ' + t('contact.submit'); }
        window.open(`mailto:${DEVELOPER_EMAIL}?subject=${encodeURIComponent(t('contact.mailtoSubject', { subject }))}&body=${encodeURIComponent(t('contact.mailtoBody', { name, email, message }))}`, '_blank');
    }, 1500);
}

function shareViaWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(getShareText())}`, '_blank');
    showNotification(t('share.shared'), t('share.opening', { name: t('share.whatsapp') }), 'info');
}
function shareViaTelegram() {
    window.open(TIKTOK_URL, '_blank');
    showNotification(t('share.shared'), t('share.opening', { name: t('share.tiktok') }), 'info');
}
function shareViaTwitter() {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText())}`, '_blank');
    showNotification(t('share.shared'), t('share.opening', { name: t('share.twitter') }), 'info');
}
function shareViaFacebook() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(APP_URL || window.location.href)}`, '_blank');
    showNotification(t('share.shared'), t('share.opening', { name: t('share.facebook') }), 'info');
}
function getShareText() {
    return t('share.text', {
        appName: t(APP_NAME_KEY),
        description: t(APP_DESCRIPTION_KEY),
        developer: t(DEVELOPER_KEY),
        tiktok: TIKTOK_URL,
        version: APP_VERSION,
        url: APP_URL || window.location.href
    });
}
function copyShareLink() {
    const inp = $('shareLinkInput');
    if (!inp) return;
    inp.select(); inp.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(inp.value).then(() => {
        const msg = $('shareMessageDiv');
        if (msg) { msg.textContent = t('share.copied'); msg.className = 'form-message success'; msg.style.display = 'block'; setTimeout(() => msg.style.display = 'none', 3000); }
    }).catch(() => {
        document.execCommand('copy');
        const msg = $('shareMessageDiv');
        if (msg) { msg.textContent = t('share.copied'); msg.className = 'form-message success'; msg.style.display = 'block'; setTimeout(() => msg.style.display = 'none', 3000); }
    });
}

// ===== PWA =====
function setupPWAInstall() {
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) return;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        if (installBtn) { installBtn.style.display = 'flex'; installBtn.addEventListener('click', installApp); }
        const dismissed = localStorage.getItem('installPromptDismissed');
        const weekAgo = Date.now() - 7 * 86400000;
        if (dismissed !== 'permanent' && (!dismissed || parseInt(dismissed) < weekAgo)) {
            setTimeout(showInstallPrompt, 5000);
        }
    });
    window.addEventListener('appinstalled', () => {
        hideInstallPrompt();
        if (installBtn) installBtn.style.display = 'none';
        showNotification(t('install.done'), t('install.doneMsg'), 'success');
    });
}

function showInstallPrompt() { installPrompt?.classList.add('show'); }
function hideInstallPrompt() { installPrompt?.classList.remove('show'); }

async function installApp() {
    if (!deferredPrompt) { showNotification(t('install.notAvailable'), t('install.notAvailableMsg'), 'error'); return; }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') { hideInstallPrompt(); if (installBtn) installBtn.style.display = 'none'; }
    else { localStorage.setItem('installPromptDismissed', Date.now()); hideInstallPrompt(); }
    deferredPrompt = null;
}

// ===== NOTIFICATION =====
/** Show a toast notification with title, message and optional action. */
function showNotification(title, message, type = 'info', actionUrl = null) {
    if (!notificationContainer) return;
    const n = document.createElement('div');
    n.className = 'notification';
    const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
    const colors = { success: '#2D5A3D', error: '#ff6b6b', warning: '#e6b13a', info: '#D4AF37' };
    n.innerHTML = `
        <i class="fas ${icons[type] || 'fa-info-circle'} notification-icon" style="color:${colors[type] || '#D4AF37'}"></i>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
            ${actionUrl ? `<button class="notification-action" data-url="${actionUrl}">${t('common.joinNow')}</button>` : ''}
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>`;
    notificationContainer.appendChild(n);
    setTimeout(() => n.classList.add('show'), 10);
    const auto = setTimeout(() => { n.classList.remove('show'); setTimeout(() => n.remove(), 500); }, 5000);
    n.querySelector('.notification-close')?.addEventListener('click', () => { clearTimeout(auto); n.classList.remove('show'); setTimeout(() => n.remove(), 500); });
    const act = n.querySelector('.notification-action');
    if (act) act.addEventListener('click', () => { clearTimeout(auto); window.open(actionUrl, '_blank'); n.classList.remove('show'); setTimeout(() => n.remove(), 500); });
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    themeToggle?.addEventListener('click', toggleDarkMode);
    fontSizeToggle?.addEventListener('click', changeFontSize);
    settingsToggle?.addEventListener('click', () => showPage('settings'));
    toggleDarkModeBtn?.addEventListener('click', toggleDarkMode);
    changeFontSizeBtn?.addEventListener('click', changeFontSize);
    toggleNotificationsBtn?.addEventListener('click', toggleNotifications);
    resetProgressBtn?.addEventListener('click', resetProgress);
    exportDataBtn?.addEventListener('click', exportData);
    importDataBtn?.addEventListener('click', importData);
    shareAppBtn?.addEventListener('click', openShareModal);
    rateAppBtn?.addEventListener('click', rateApp);
    joinTelegramBtn?.addEventListener('click', () => window.open(TIKTOK_URL, '_blank'));
    backToHomeFromSettingsBtn?.addEventListener('click', () => showPage('home'));
    dailyReminderBtn?.addEventListener('click', () => { toggleNotifications(); showPage('settings'); });
    randomZikrBtn?.addEventListener('click', showRandomZikr);
    setupFooterLinks();
    setupEnhancedEventListeners();
}

function setupFooterLinks() {
    privacyLink?.addEventListener('click', e => { e.preventDefault(); showNotification(t('notifications.privacy'), t('notifications.privacyMsg'), 'info'); });
    termsLink?.addEventListener('click', e => { e.preventDefault(); showNotification(t('notifications.terms'), t('notifications.termsMsg'), 'info'); });
    helpLink?.addEventListener('click', e => { e.preventDefault(); showNotification(t('notifications.help'), t('notifications.helpMsg', { email: DEVELOPER_EMAIL }), 'info'); });
}

function setupEnhancedFeatures() {
    contactDeveloperBtn?.addEventListener('click', openContactModal);
    contactModalClose?.addEventListener('click', closeContactModal);
    contactModal?.addEventListener('click', e => { if (e.target === contactModal) closeContactModal(); });
    contactForm?.addEventListener('submit', handleContactSubmit);
    shareModalClose?.addEventListener('click', closeShareModal);
    shareModal?.addEventListener('click', e => { if (e.target === shareModal) closeShareModal(); });

    const shareBtns = {
        shareWhatsApp: shareViaWhatsApp, shareTelegram: shareViaTelegram,
        shareTwitter: shareViaTwitter, shareFacebook: shareViaFacebook
    };
    Object.entries(shareBtns).forEach(([id, fn]) => {
        const el = $(id);
        if (el) el.addEventListener('click', fn);
    });
    $('shareLinkCopy')?.addEventListener('click', copyShareLink);
    joinTelegramBtn?.addEventListener('click', () => window.open(TIKTOK_URL, '_blank'));
}

function setupEnhancedEventListeners() {
    installPromptBtn?.addEventListener('click', installApp);
    installLaterBtn?.addEventListener('click', () => { localStorage.setItem('installPromptDismissed', Date.now()); hideInstallPrompt(); });
    installCloseBtn?.addEventListener('click', () => { localStorage.setItem('installPromptDismissed', 'permanent'); hideInstallPrompt(); });

    document.addEventListener('keydown', e => {
        if (e.ctrlKey || e.metaKey) {
            const actions = {
                'd': toggleDarkMode, 'h': () => showPage('home'), 's': () => showPage('settings'),
                'r': showRandomZikr, 't': () => window.open(TIKTOK_URL, '_blank'),
                'f': () => {
                    if (currentPage === 'home') searchInput?.focus();
                    else if (currentPage === 'zikr') $('sectionSearchInput')?.focus();
                }
            };
            const action = actions[e.key.toLowerCase()];
            if (action) { e.preventDefault(); action(); }
        }
        if (e.key === 'Escape') {
            if (contactModal?.classList.contains('active')) closeContactModal();
            if (shareModal?.classList.contains('active')) closeShareModal();
        }
    });

    window.addEventListener('online', () => showNotification(t('notifications.online'), t('notifications.onlineMsg'), 'success'));
    window.addEventListener('offline', () => showNotification(t('notifications.offline'), t('notifications.offlineMsg'), 'warning'));
}

// ===== LOADING =====
function showLoading() { loadingSpinner?.classList.remove('hidden'); }
function hideLoading() { loadingSpinner?.classList.add('hidden'); }

// ===== BOOT =====
document.addEventListener('DOMContentLoaded', () => {
    showLoading();

    // The UI re-renders instantly whenever the active language changes.
    I18N.onChange(reRenderUI);

    I18N.init().then(() => {
        let hasSavedLanguage = false;
        try {
            hasSavedLanguage = !!localStorage.getItem('appLanguage');
        } catch (e) { /* storage may be blocked */ }

        if (!hasSavedLanguage) {
            // First run: show the language selection screen.
            translateStaticDOM();
            showLanguageScreen();
            hideLoading();
        } else {
            appStarted = true;
            setTimeout(() => {
                initApp();
                hideLoading();
                if (!localStorage.getItem('firstTime')) {
                    setTimeout(() => {
                        showNotification(t('notifications.firstTimeTitle'), t('notifications.firstTimeMsg'), 'info');
                        localStorage.setItem('firstTime', 'true');
                    }, 2000);
                }
            }, 500);
        }
    });
});
