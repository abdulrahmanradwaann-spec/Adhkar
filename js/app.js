// ===== APPLICATION STATE =====
let currentPage = 'home';
let currentSection = null;
let currentCategory = 'all';
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
const hijriDateElement = $('hijriDate');
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

// ===== UPDATE SYSTEM REFS =====
const updateOverlay = $('updateOverlay');
const updateVerNew = $('updateVerNew');
const updateVerOld = $('updateVerOld');
const updateDate = $('updateDate');
const updateChanges = $('updateChanges');
const updateProgressWrap = $('updateProgressWrap');
const updateProgressFill = $('updateProgressFill');
const updateProgressText = $('updateProgressText');
const updateButtons = $('updateButtons');
const updateNowBtn = $('updateNowBtn');
const updateLaterBtn = $('updateLaterBtn');

// ===== NEW HOME PAGE REFS =====
const hijriDateText = $('hijriDateText');

// ===== HIJRI DATE =====
function getHijriDate() {
    try {
        return new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
            month: 'long', day: 'numeric', year: 'numeric'
        }).format(new Date()).replace("هـ", "").trim();
    } catch {
        const names = ['محرم','صفر','ربيع الأول','ربيع الآخر','جمادى الأولى','جمادى الآخرة','رجب','شعبان','رمضان','شوال','ذو القعدة','ذو الحجة'];
        const d = new Date();
        const y = Math.round((d.getFullYear() - 622) * 0.97) + 1;
        const m = (d.getMonth() + 2) % 12 || 12;
        const day = Math.min(d.getDate(), 30);
        return `${day} ${names[m - 1]} ${y}`;
    }
}

// ===== TIME =====
function updateTime() {
    const now = new Date();
    let h = now.getHours();
    const period = h >= 12 ? 'مساءً' : 'صباحاً';
    h = h % 12 || 12;
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    if (clockTimeEl) clockTimeEl.textContent = `${h}:${m}`;
    if (clockSecondsEl) clockSecondsEl.textContent = s;
    if (clockPeriodEl) clockPeriodEl.textContent = period;

    const dayNames = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    if (clockDayEl) clockDayEl.textContent = dayNames[now.getDay()];

    const gregorian = now.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
    if (clockGregorianEl) clockGregorianEl.textContent = gregorian;

    const hijri = getHijriDate();
    if (clockHijriEl) clockHijriEl.textContent = hijri;

    const timeStr = now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateStr = now.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    if (currentTimeElement) currentTimeElement.textContent = `${dateStr} - ${timeStr}`;
    if (hijriDateElement) hijriDateElement.textContent = hijri;
    if (hijriDateText) hijriDateText.textContent = hijri;
}

// ===== INIT =====
function initApp() {
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
        showNotification('مرحباً بك في أذكاري', 'تم تحميل التطبيق بنجاح. استمتع بتجربة الأذكار اليومية.', 'success');
        if (!tiktokNotifShown) {
            setTimeout(() => showTiktokNotification(), 3000);
        }
    }, 1000);
    checkDailyReminder();
}

// ===== CATEGORY FILTERS =====
function setupCategoryFilters() {
    sectionsCategories?.querySelectorAll('.category-tab').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.category-tab').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            generateSections();
        });
    });
}

// ===== SECTIONS =====
function generateSections() {
    if (!sectionsGrid) return;
    sectionsGrid.innerHTML = '';
    let filtered = appConfig.sections;
    if (currentCategory !== 'all') filtered = filtered.filter(s => s.category === currentCategory);
    filtered.sort((a, b) => a.priority - b.priority);

    filtered.forEach(section => {
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
                        <h3 class="section-title">${section.name}</h3>
                        <span class="section-badge">${section.category === 'daily' ? 'يومي' : section.category === 'prayer' ? 'صلاة' : section.category === 'home' ? 'منزلي' : 'خاص'}</span>
                    </div>
                </div>
            </div>
            <div class="section-card-body">
                <p class="section-desc">${section.description}</p>
                <div class="section-stats-row">
                    <div class="section-count-badge"><i class="${section.icon}"></i><span>${section.count} ذكر</span></div>
                    <div class="section-progress-pct" style="color:${section.color}">${progress}%</div>
                </div>
                <div class="section-progress-track"><div class="section-progress-fill" style="width:${progress}%;background:linear-gradient(90deg, ${section.color}, ${section.color}aa)"></div></div>
            </div>
            <div class="section-card-footer">
                <div class="section-card-footer-right" style="color:${section.color}"><i class="${section.icon}"></i><span>${section.count} ذكر</span></div>
                <span class="section-link" style="color:${section.color}">تصفح الأذكار <i class="fas fa-arrow-left section-arrow"></i></span>
            </div>`;
        card.addEventListener('click', () => openSection(section.id));
        sectionsGrid.appendChild(card);
    });

    if (!sectionsGrid.children.length) {
        sectionsGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:50px">
            <i class="fas fa-filter" style="font-size:60px;color:var(--medium-gray);margin-bottom:20px"></i>
            <h3 style="color:var(--text-light)">لا توجد أقسام في هذا التصنيف</h3></div>`;
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
                <div class="quick-section-name">${s.name}</div>
                <div class="quick-section-count">${s.count} ذكر</div>
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
    showNotification('تابعنا على تيك توك!', 'تابعنا على تيك توك للحصول على تحديثات يومية بالأذكار والفوائد الإسلامية.', 'info', TIKTOK_URL);
    localStorage.setItem('tiktokNotifShown', 'true');
}

// ===== DARK MODE =====
function applyDarkMode() {
    document.body.classList.toggle('dark-mode', darkMode);
    if (themeToggle) themeToggle.innerHTML = darkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    if (toggleDarkModeBtn) toggleDarkModeBtn.innerHTML = darkMode
        ? '<i class="fas fa-sun"></i> تفعيل الوضع النهاري'
        : '<i class="fas fa-moon"></i> تفعيل الوضع الليلي';
}

function toggleDarkMode() {
    darkMode = !darkMode;
    localStorage.setItem('darkMode', darkMode);
    applyDarkMode();
    showNotification('تم التغيير', `تم ${darkMode ? 'تفعيل' : 'تعطيل'} الوضع الليلي`, 'success');
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
    showNotification('تم التغيير', `تم تغيير حجم الخط إلى ${fontSize}px`, 'success');
}

// ===== NOTIFICATIONS =====
function updateNotificationsButton() {
    if (toggleNotificationsBtn) {
        toggleNotificationsBtn.innerHTML = notificationsEnabled
            ? '<i class="fas fa-bell-slash"></i> تعطيل التذكيرات'
            : '<i class="fas fa-bell"></i> تفعيل التذكيرات';
    }
}

function toggleNotifications() {
    notificationsEnabled = !notificationsEnabled;
    localStorage.setItem('notifications', notificationsEnabled);
    updateNotificationsButton();
    if (notificationsEnabled && 'Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
    showNotification('تم التغيير', `تم ${notificationsEnabled ? 'تفعيل' : 'تعطيل'} التذكيرات`, 'success');
}

function checkDailyReminder() {
    if (!notificationsEnabled) return;
    const now = new Date();
    const last = localStorage.getItem('lastReminder');
    const today = now.toDateString();
    if (last !== today) {
        const h = now.getHours();
        if ((h >= 6 && h <= 9) || (h >= 18 && h <= 21)) {
            const t = h < 12 ? 'الصباح' : 'المساء';
            showNotification(`تذكير أذكار ${t}`, `حان وقت أذكار ${t}. افتح التطبيق لقراءتها.`, 'info');
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
    if (streakStats) streakStats.textContent = `سلسلة: ${dailyStreak} يوم`;
}

// ===== OPEN SECTION =====
function openSection(sectionId) {
    currentSection = sectionId;
    const section = appConfig.sections.find(s => s.id === sectionId);
    if (!section) return;

    const readCount = readZikr.filter(id => id.startsWith(sectionId)).length;
    const progress = Math.min(100, Math.round((readCount / section.count) * 100));

    zikrPage.innerHTML = `
        <div class="zikr-header" style="background:linear-gradient(135deg,${section.color},${section.color}99)">
            <div class="zikr-header-content">
                <h2 class="zikr-title">${section.name}</h2>
                <p class="zikr-subtitle">${section.description}</p>
            </div>
            <div class="zikr-count"><i class="${section.icon}"></i><span>${section.count} ذكر | ${progress}% مكتمل</span></div>
        </div>
        <div class="zikr-controls">
            <button class="control-btn-large active" data-filter="all"><i class="fas fa-list"></i> جميع الأذكار</button>
            <button class="control-btn-large" data-filter="favorites"><i class="fas fa-heart"></i> المفضلة</button>
            <button class="control-btn-large" data-filter="read"><i class="fas fa-check-circle"></i> المقروءة</button>
            <button class="control-btn-large" data-filter="unread"><i class="fas fa-circle"></i> غير المقروءة</button>
            <button class="control-btn-large" data-filter="search" id="searchFilterBtn"><i class="fas fa-search"></i> البحث</button>
        </div>
        <div class="search-container hidden" id="sectionSearchContainer">
            <div class="search-box">
                <input type="text" id="sectionSearchInput" class="search-input" placeholder="ابحث في ${section.name}...">
                <i class="fas fa-search search-icon"></i>
            </div>
        </div>
        <div class="zikr-list" id="zikrList"></div>
        <div class="navigation">
            <button class="nav-btn back-btn" id="backToHomeBtn"><i class="fas fa-arrow-right"></i> العودة للرئيسية</button>
            <button class="nav-btn secondary" id="markAllReadBtn"><i class="fas fa-check-double"></i> تعليم الكل كمقروء</button>
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
        btn.addEventListener('click', function() {
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

// ===== GENERATE ZIKR ITEMS =====
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
            const t = searchTerm.toLowerCase();
            items = items.filter(i => i.text.toLowerCase().includes(t) || i.reference.toLowerCase().includes(t) || i.benefits.toLowerCase().includes(t));
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
                        <button class="action-btn favorite-btn ${isFav ? 'active' : ''}" title="${isFav ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}"><i class="fas fa-heart"></i></button>
                        <button class="action-btn read-btn ${isRead ? 'active' : ''}" title="${isRead ? 'تعليم كغير مقروء' : 'تعليم كمقروء'}"><i class="fas ${isRead ? 'fa-check-circle' : 'fa-circle'}"></i></button>
                        <button class="action-btn share-btn" title="مشاركة الذكر"><i class="fas fa-share-alt"></i></button>
                        <button class="action-btn counter-btn" title="عداد التكرار"><i class="fas fa-redo"></i></button>
                    </div>
                </div>
                <div class="zikr-text">${item.text}</div>
                <div class="zikr-details">
                    <div class="detail-row"><span class="detail-label"><i class="fas fa-redo"></i> التكرار:</span><span class="detail-value">${item.repetition}</span></div>
                    <div class="detail-row"><span class="detail-label"><i class="fas fa-book"></i> المصدر:</span><span class="detail-value">${item.reference} ${item.reference_number}</span></div>
                    <div class="detail-row"><span class="detail-label"><i class="fas fa-star"></i> الفوائد:</span><span class="detail-value">${item.benefits}</span></div>
                </div>
                <div class="zikr-counter hidden">
                    <div class="counter-display">0</div>
                    <button class="settings-btn counter-btn" id="incrementCounter">+</button>
                    <button class="settings-btn secondary" id="resetCounter">إعادة</button>
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
            shareBtn?.addEventListener('click', () => shareZikr(item.text, item.reference));
            counterBtn?.addEventListener('click', () => counterCont.classList.toggle('hidden'));
            incBtn?.addEventListener('click', () => {
                let c = parseInt(counterDisp.textContent) + 1;
                counterDisp.textContent = c;
                const m = item.repetition.match(/\d+/);
                if (m) {
                    const rep = parseInt(m[0]);
                    if (c >= rep) {
                        showNotification('مبارك!', `أكملت ${rep} تكرار للذكر`, 'success');
                        if (!isRead) toggleRead(zikrId, readBtn);
                    }
                }
            });
            resetBtn?.addEventListener('click', () => counterDisp.textContent = '0');

            list.appendChild(el);
        });

        if (!list.children.length) {
            list.innerHTML = `<div class="text-center mt-40">
                <i class="fas fa-search" style="font-size:60px;color:var(--medium-gray);margin-bottom:20px"></i>
                <h3 style="color:var(--text-light)">لم يتم العثور على أذكار</h3>
                <p style="color:var(--text-light)">جرب تغيير عوامل التصفية أو مصطلحات البحث</p></div>`;
        }
    }, 300);
}

// ===== FAVORITES & READ =====
function toggleFavorite(zikrId, btn) {
    const idx = favorites.indexOf(zikrId);
    if (idx === -1) {
        favorites.push(zikrId);
        btn.classList.add('active');
        showNotification('تم الإضافة', 'تمت إضافة الذكر إلى المفضلة', 'success');
    } else {
        favorites.splice(idx, 1);
        btn.classList.remove('active');
        showNotification('تم الإزالة', 'تمت إزالة الذكر من المفضلة', 'info');
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
        showNotification('ممتاز!', 'تم تعليم الذكر كمقروء', 'success');
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
            if (el) el.textContent = `${sec.count} ذكر | ${p}% مكتمل`;
        }
    }
}

function markAllAsRead() {
    if (!currentSection) return;
    if (confirm('هل أنت متأكد من تعليم جميع أذكار هذا القسم كمقروءة؟')) {
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
            showNotification('تم بنجاح', 'تم تعليم جميع الأذكار كمقروءة', 'success');
        }
    }
}

// ===== SHARE =====
function shareZikr(text, reference) {
    const t = `${text}\n\nالمصدر: ${reference}\n\nشارك من تطبيق أذكاري - ${DEVELOPER}\nتيك توك: ${TIKTOK_URL}`;
    if (navigator.share) {
        navigator.share({ title: 'ذكر من تطبيق أذكاري', text: t, url: window.location.href })
            .then(() => showNotification('تم المشاركة', 'تم مشاركة الذكر بنجاح', 'success'))
            .catch(() => copyToClipboard(t));
    } else copyToClipboard(t);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => showNotification('تم النسخ', 'تم نسخ الذكر إلى الحافظة', 'success'))
    .catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showNotification('تم النسخ', 'تم نسخ الذكر إلى الحافظة', 'success');
    });
}

// ===== PROGRESS =====
function updateProgress() {
    const total = appConfig.totalZikr;
    const read = readZikr.length;
    const pct = Math.min(100, Math.round((read / total) * 100));
    if (progressPercent) progressPercent.textContent = `${pct}%`;
    if (progressFill) progressFill.style.width = `${pct}%`;
    if (completedStats) completedStats.textContent = `${read} مكتمل`;
    if (remainingStats) remainingStats.textContent = `${total - read} باقي`;
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
    searchInput?.addEventListener('input', function(e) {
        const term = e.target.value.toLowerCase();
        searchTerm = term;
        appConfig.sections.forEach(s => {
            const card = document.querySelector(`.section-card[data-section-id="${s.id}"]`);
            if (card) {
                const match = (s.name + ' ' + s.description).toLowerCase().includes(term);
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
    if (confirm('هل أنت متأكد من إعادة تعيين تقدمك؟ سيتم حذف جميع الأذكار المقروءة والمفضلة.')) {
        favorites = []; readZikr = []; dailyStreak = 0;
        localStorage.setItem('favorites', JSON.stringify(favorites));
        localStorage.setItem('readZikr', JSON.stringify(readZikr));
        localStorage.setItem('dailyStreak', dailyStreak);
        updateProgress();
        generateSections();
        updateStats();
        if (currentPage === 'zikr' && currentSection) generateZikrItems(currentSection, getCurrentFilter());
        showNotification('تم الإعادة', 'تم إعادة تعيين التقدم بنجاح', 'success');
    }
}

function exportData() {
    const data = { favorites, readZikr, dailyStreak, lastVisit, darkMode, fontSize, notificationsEnabled, exportDate: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `أذكاري_بيانات_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification('تم التصدير', 'تم تصدير بياناتك بنجاح', 'success');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(ev) {
            try {
                const data = JSON.parse(ev.target.result);
                if (!data.favorites || !data.readZikr) throw new Error('ملف غير صالح');
                if (confirm('هل أنت متأكد من استيراد البيانات؟ سيتم استبدال بياناتك الحالية.')) {
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
                    showNotification('تم الاستيراد', 'تم استيراد بياناتك بنجاح', 'success');
                }
            } catch { showNotification('خطأ', 'تعذر استيراد البيانات', 'error'); }
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
            showNotification('ذكر عشوائي', `تم اختيار ذكر من قسم ${sec.name}`, 'info');
        }
    }, 500);
}

function rateApp() {
    showNotification('شكراً لك!', 'نشكرك على تفكيرك في تقييم التطبيق.', 'info');
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
    const subject = $('contactSubject').value;
    const message = $('contactMessage').value;
    const btn = $('contactSubmit');
    const msgDiv = $('contactMessageDiv');
    if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...'; }
    setTimeout(() => {
        if (msgDiv) {
            msgDiv.textContent = 'تم إرسال رسالتك بنجاح! سنرد عليك في أقرب وقت.';
            msgDiv.className = 'form-message success';
            msgDiv.style.display = 'block';
        }
        setTimeout(() => { contactForm?.reset(); if (msgDiv) msgDiv.style.display = 'none'; }, 2000);
        if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-paper-plane"></i> إرسال الرسالة'; }
        window.open(`mailto:${DEVELOPER_EMAIL}?subject=${encodeURIComponent(`تطبيق أذكاري - ${subject}`)}&body=${encodeURIComponent(`الاسم: ${name}\nالبريد: ${email}\n\n${message}`)}`, '_blank');
    }, 1500);
}

function shareViaWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(getShareText())}`, '_blank');
    showNotification('تم المشاركة', 'جاري فتح واتساب', 'info');
}
function shareViaTelegram() {
    window.open(TIKTOK_URL, '_blank');
    showNotification('تم المشاركة', 'جاري فتح تيك توك', 'info');
}
function shareViaTwitter() {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText())}`, '_blank');
    showNotification('تم المشاركة', 'جاري فتح تويتر', 'info');
}
function shareViaFacebook() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(APP_URL || window.location.href)}`, '_blank');
    showNotification('تم المشاركة', 'جاري فتح فيسبوك', 'info');
}
function getShareText() {
    return `${APP_NAME} - ${APP_DESCRIPTION}\n\nالمطور: ${DEVELOPER}\nتيك توك: ${TIKTOK_URL}\nالإصدار: ${APP_VERSION}\nرابط التطبيق: ${APP_URL || window.location.href}`;
}
function copyShareLink() {
    const inp = $('shareLinkInput');
    if (!inp) return;
    inp.select(); inp.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(inp.value).then(() => {
        const msg = $('shareMessageDiv');
        if (msg) { msg.textContent = 'تم نسخ الرابط!'; msg.className = 'form-message success'; msg.style.display = 'block'; setTimeout(() => msg.style.display = 'none', 3000); }
    }).catch(() => {
        document.execCommand('copy');
        const msg = $('shareMessageDiv');
        if (msg) { msg.textContent = 'تم نسخ الرابط!'; msg.className = 'form-message success'; msg.style.display = 'block'; setTimeout(() => msg.style.display = 'none', 3000); }
    });
}

// ===== VERSION CONTROL SYSTEM =====
function parseVersion(v) {
    const parts = String(v).replace(/[^0-9.]/g, '').split('.').map(Number);
    return { major: parts[0] || 0, minor: parts[1] || 0, patch: parts[2] || 0 };
}
function compareVersions(a, b) {
    const va = parseVersion(a), vb = parseVersion(b);
    if (va.major !== vb.major) return va.major - vb.major;
    if (va.minor !== vb.minor) return va.minor - vb.minor;
    return va.patch - vb.patch;
}

// ===== UPDATE SYSTEM =====
async function checkForUpdates() {
    const lastDismissed = localStorage.getItem('updateDismissed');
    const dismissedVersion = localStorage.getItem('updateDismissedVersion');
    if (dismissedVersion === APP_VERSION) {
        // same version dismissed before, skip
    }
    try {
        const bust = '?t=' + Date.now();
        const resp = await fetch(UPDATE_JSON_URL + bust);
        if (!resp.ok) return;
        const data = await resp.json();
        if (!data.latestVersion) return;
        const hasUpdate = compareVersions(data.latestVersion, APP_VERSION) > 0;
        if (!hasUpdate) return;
        // Don't show again for same version if user dismissed it
        if (dismissedVersion === data.latestVersion && lastDismissed) {
            const hoursSince = (Date.now() - parseInt(lastDismissed)) / 3600000;
            if (hoursSince < 24) return; // re-show after 24h
        }
        showUpdateDialog(data);
    } catch (e) {
        // silently fail — no internet or bad JSON
    }
}

function showUpdateDialog(data) {
    if (!updateOverlay) return;
    const latest = data.changelog && data.changelog[0];
    const ver = latest ? latest.version : data.latestVersion;
    const date = latest ? latest.date : data.releaseDate;
    const changes = latest ? latest.changes : [];

    updateVerNew.textContent = 'v' + ver;
    updateVerOld.textContent = 'v' + APP_VERSION;
    if (date) {
        const d = new Date(date);
        updateDate.textContent = 'تاريخ الإصدار: ' + d.toLocaleDateString('ar-SA', { year:'numeric', month:'long', day:'numeric' });
    }

    let html = '';
    const icons = ['fa-sparkles','fa-bolt','fa-bug','fa-wand-magic-sparkles','fa-star'];
    changes.forEach((c, i) => {
        const icon = icons[i % icons.length];
        html += `<div class="update-change-item"><i class="fas ${icon} update-change-icon"></i><span>${c}</span></div>`;
    });
    updateChanges.innerHTML = html;

    updateProgressWrap.classList.add('hidden');
    updateButtons.classList.remove('hidden');
    updateProgressFill.style.width = '0%';
    updateProgressText.textContent = '0%';

    updateOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeUpdateDialog(userAction) {
    if (updateOverlay) updateOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    if (userAction === 'later') {
        // try to get latest version from overlay text
        const verText = updateVerNew ? updateVerNew.textContent.replace('v','') : '';
        localStorage.setItem('updateDismissedVersion', verText);
        localStorage.setItem('updateDismissed', Date.now());
    }
}

async function performUpdate() {
    if (!updateProgressWrap || !updateProgressFill || !updateProgressText || !updateButtons) return;
    updateButtons.classList.add('hidden');
    updateProgressWrap.classList.remove('hidden');

    const files = ['index.html','css/style.css','js/data.js','js/app.js','sw.js','manifest.json','update.json'];
    const total = files.length;
    let done = 0;
    const errors = [];

    try {
        for (const file of files) {
            try {
                updateProgressText.textContent = `${Math.round((done/total)*100)}%`;
                updateProgressFill.style.width = `${(done/total)*100}%`;

                const bust = file.includes('?') ? '&t=' + Date.now() : '?t=' + Date.now();
                const resp = await fetch('./' + file + bust);
                if (!resp.ok) throw new Error('HTTP ' + resp.status);
                const text = await resp.text();

                // Store new file content in localStorage (as backup)
                localStorage.setItem('_pending_' + file, text);

                done++;
                updateProgressText.textContent = `${Math.round((done/total)*100)}%`;
                updateProgressFill.style.width = `${(done/total)*100}%`;
            } catch (err) {
                errors.push(file);
                done++;
            }
        }

        // Store new version
        const newVer = updateVerNew ? updateVerNew.textContent.replace('v','') : '';
        localStorage.setItem('installedVersion', newVer);
        localStorage.setItem('updatePending', 'true');
        localStorage.setItem('updateTimestamp', Date.now());

        updateProgressFill.style.width = '100%';
        updateProgressText.textContent = '100%';

        // Clear service worker caches then reload
        await new Promise(r => setTimeout(r, 500));

        if ('caches' in window) {
            const keys = await caches.keys();
            for (const k of keys) await caches.delete(k);
        }

        // Write pending files to cache via service worker
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            const filesToCache = {};
            for (const file of files) {
                const content = localStorage.getItem('_pending_' + file);
                if (content) filesToCache[file] = content;
            }
            navigator.serviceWorker.controller.postMessage({
                type: 'APPLY_UPDATE',
                files: filesToCache
            });
        }

        // Clean pending data
        files.forEach(f => localStorage.removeItem('_pending_' + f));
        localStorage.removeItem('updatePending');

        // Reload after short delay
        setTimeout(() => location.reload(), 800);

    } catch (e) {
        // Update failed — rollback
        files.forEach(f => localStorage.removeItem('_pending_' + f));
        localStorage.removeItem('updatePending');
        localStorage.removeItem('installedVersion');
        updateProgressWrap.classList.add('hidden');
        updateButtons.classList.remove('hidden');
        updateProgressFill.style.width = '0%';
        if (typeof showNotification === 'function') {
            showNotification('فشل التحديث', 'حدث خطأ أثناء التحديث. يرجى المحاولة لاحقاً.', 'error');
        }
    }
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
        showNotification('تم التثبيت', 'تم تثبيت تطبيق أذكاري بنجاح!', 'success');
    });
}

function showInstallPrompt() { installPrompt?.classList.add('show'); }
function hideInstallPrompt() { installPrompt?.classList.remove('show'); }

async function installApp() {
    if (!deferredPrompt) { showNotification('التثبيت غير متاح', 'تعذر عرض خيار التثبيت', 'error'); return; }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') { hideInstallPrompt(); if (installBtn) installBtn.style.display = 'none'; }
    else { localStorage.setItem('installPromptDismissed', Date.now()); hideInstallPrompt(); }
    deferredPrompt = null;
}

// ===== NOTIFICATION =====
function showNotification(title, message, type = 'info', actionUrl = null) {
    if (!notificationContainer) return;
    const n = document.createElement('div');
    n.className = 'notification';
    const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
    const colors = { success: '#57cc99', error: '#ff6b6b', warning: '#ff9a3c', info: '#2d9cdb' };
    n.innerHTML = `
        <i class="fas ${icons[type] || 'fa-info-circle'} notification-icon" style="color:${colors[type] || '#2d9cdb'}"></i>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
            ${actionUrl ? `<button class="notification-action" data-url="${actionUrl}">انضم الآن</button>` : ''}
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
    privacyLink?.addEventListener('click', e => { e.preventDefault(); showNotification('سياسة الخصوصية', 'نحن نحترم خصوصيتك ولا نجمع أي بيانات شخصية.', 'info'); });
    termsLink?.addEventListener('click', e => { e.preventDefault(); showNotification('شروط الاستخدام', 'التطبيق مجاني للاستخدام الشخصي.', 'info'); });
    helpLink?.addEventListener('click', e => { e.preventDefault(); showNotification('المساعدة', `للحصول على المساعدة، راسلنا على: ${DEVELOPER_EMAIL}`, 'info'); });
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

    updateNowBtn?.addEventListener('click', performUpdate);
    updateLaterBtn?.addEventListener('click', () => closeUpdateDialog('later'));
    updateOverlay?.addEventListener('click', e => { if (e.target === updateOverlay) closeUpdateDialog('later'); });

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
            if (updateOverlay?.classList.contains('active')) closeUpdateDialog('later');
            if (contactModal?.classList.contains('active')) closeContactModal();
            if (shareModal?.classList.contains('active')) closeShareModal();
        }
    });

    window.addEventListener('online', () => showNotification('عودة الاتصال', 'تم استعادة الاتصال بالإنترنت', 'success'));
    window.addEventListener('offline', () => showNotification('لا يوجد اتصال', 'التطبيق يعمل دون اتصال', 'warning'));
}

// ===== LOADING =====
function showLoading() { loadingSpinner?.classList.remove('hidden'); }
function hideLoading() { loadingSpinner?.classList.add('hidden'); }

// ===== BOOT =====
document.addEventListener('DOMContentLoaded', () => {
    showLoading();
    setTimeout(() => {
        initApp();
        hideLoading();
        checkForUpdates();
        if (!localStorage.getItem('firstTime')) {
            setTimeout(() => {
                showNotification('أهلاً وسهلاً!', 'اضغط على أي قسم لبدء قراءة الأذكار.', 'info');
                localStorage.setItem('firstTime', 'true');
            }, 2000);
        }
    }, 500);
});
