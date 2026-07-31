// Inline locale dictionaries: guaranteed offline / file:// fallback so the UI
// never shows raw keys even when fetch() is blocked (e.g. opening index.html directly).
const INLINE_LOCALES = {
  ar: {
  "app": {
    "name": "أذكاري",
    "developer": "عبدالرحمن رضوان",
    "version": "3.0",
    "description": "تطبيق أذكاري - تطبيق متكامل للأذكار اليومية من القرآن الكريم والسنة النبوية الموثوقة. يحتوي على 700 ذكر موثوق من مصادر صحيحة مع مميزات متقدمة لتتبع التقدم والإشعارات.",
    "metaTitle": "أذكاري - تطبيق الأذكار الإسلامي المتكامل",
    "metaDescription": "تطبيق أذكاري - تطبيق متكامل للأذكار اليومية من القرآن الكريم والسنة النبوية الموثوقة.",
    "metaKeywords": "أذكار, أذكار يومية, أذكار الصباح, أذكار المساء, تطبيق إسلامي",
    "metaOgTitle": "أذكاري - تطبيق الأذكار الإسلامي المتكامل",
    "metaOgDescription": "تطبيق متكامل للأذكار اليومية من القرآن الكريم والسنة النبوية الموثوقة"
  },
  "languageScreen": {
    "title": "اختر لغتك",
    "subtitle": "اختر اللغة التي تفضلها لتجربة أفضل",
    "choose": "اختيار اللغة"
  },
  "common": {
    "back": "العودة للرئيسية",
    "joinNow": "انضم الآن",
    "later": "لاحقاً",
    "countZikr": "{count} ذكر",
    "streak": "سلسلة: {count} يوم"
  },
  "header": {
    "logoSubtitle": "الأذكار اليومية",
    "darkMode": "تبديل الوضع الليلي",
    "fontSize": "تغيير حجم الخط",
    "settings": "الإعدادات",
    "install": "تثبيت التطبيق"
  },
  "home": {
    "bismillah": "بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ",
    "subtitle": "تطبيق متكامل للأذكار اليومية من القرآن الكريم والسنة النبوية الموثوقة",
    "dailyReminder": "تذكير الأذكار اليومية",
    "randomZikr": "ذكر عشوائي",
    "progress": "تقدمك اليومي",
    "read": "مقروء",
    "favorites": "مفضلة",
    "streak": "أيام متتالية",
    "completion": "إنجاز",
    "searchPlaceholder": "ابحث في الأذكار...",
    "followUs": "تابعنا",
    "sectionsTitle": "أقسام الأذكار",
    "categories": {
      "all": "الكل",
      "daily": "يومية",
      "prayer": "صلاة",
      "home": "منزل",
      "special": "خاصة"
    },
    "features": {
      "favorites": "المفضلة",
      "progress": "تتبع التقدم",
      "nightMode": "الوضع الليلي",
      "search": "بحث متقدم"
    }
  },
  "clock": {
    "am": "صباحاً",
    "pm": "مساءً"
  },
  "sections": {
    "badges": {
      "daily": "يومي",
      "prayer": "صلاة",
      "home": "منزلي",
      "special": "خاص"
    },
    "browse": "تصفح الأذكار",
    "emptyCategory": "لا توجد أقسام في هذا التصنيف",
    "morning": {
      "name": "أذكار الصباح",
      "desc": "أذكار الصباح المأثورة عن النبي صلى الله عليه وسلم للحماية والبركة"
    },
    "evening": {
      "name": "أذكار المساء",
      "desc": "أذكار المساء المأثورة عن النبي صلى الله عليه وسلم للأمان والراحة"
    },
    "sleep": {
      "name": "أذكار النوم",
      "desc": "أذكار ما قبل النوم والأدعية المأثورة للنوم الهادئ"
    },
    "waking": {
      "name": "أذكار الاستيقاظ",
      "desc": "أذكار الاستيقاظ من النوم والأدعية المشروعة"
    },
    "prayer": {
      "name": "أذكار بعد الصلاة",
      "desc": "أذكار وأدعية بعد السلام من الصلاة"
    },
    "mosque": {
      "name": "أذكار المسجد",
      "desc": "أذكار دخول المسجد والخروج منه وأدعية الصلاة"
    },
    "home": {
      "name": "أذكار المنزل",
      "desc": "أذكار دخول المنزل والخروج منه والدخول والخروج من الخلاء"
    },
    "food": {
      "name": "أذكار الطعام",
      "desc": "أذكار الطعام والشراب والدعاء قبل الأكل وبعده"
    },
    "travel": {
      "name": "أذكار السفر",
      "desc": "أذكار السفر وأدعية الركوب والوصول والعودة"
    },
    "distress": {
      "name": "أذكار الهم والحزن",
      "desc": "أدعية الكرب والهم والحزن والابتلاء"
    }
  },
  "zikr": {
    "count": "{count} ذكر",
    "progress": "{count} ذكر | {progress}% مكتمل",
    "filters": {
      "all": "جميع الأذكار",
      "favorites": "المفضلة",
      "read": "المقروءة",
      "unread": "غير المقروءة",
      "search": "البحث"
    },
    "searchPlaceholder": "ابحث في {name}...",
    "repetition": "التكرار:",
    "source": "المصدر:",
    "benefits": "الفوائد:",
    "reset": "إعادة",
    "back": "العودة للرئيسية",
    "markAllRead": "تعليم الكل كمقروء",
    "emptyTitle": "لم يتم العثور على أذكار",
    "emptyHint": "جرب تغيير عوامل التصفية أو مصطلحات البحث",
    "completeTitle": "مبارك!",
    "completeMsg": "أكملت {count} تكرار للذكر",
    "addToFav": "إضافة إلى المفضلة",
    "removeFromFav": "إزالة من المفضلة",
    "markRead": "تعليم كمقروء",
    "markUnread": "تعليم كغير مقروء",
    "share": "مشاركة الذكر",
    "counter": "عداد التكرار"
  },
  "confirm": {
    "markAllRead": "هل أنت متأكد من تعليم جميع أذكار هذا القسم كمقروءة؟",
    "resetProgress": "هل أنت متأكد من إعادة تعيين تقدمك؟ سيتم حذف جميع الأذكار المقروءة والمفضلة.",
    "importData": "هل أنت متأكد من استيراد البيانات؟ سيتم استبدال بياناتك الحالية."
  },
  "settings": {
    "title": "إعدادات التطبيق",
    "appInfo": "معلومات التطبيق",
    "appName": "اسم التطبيق",
    "appVersion": "إصدار التطبيق",
    "copyright": "حقوق الملكية",
    "copyrightValue": "© 2026 عبدالرحمن رضوان",
    "zikrCount": "عدد الأذكار",
    "zikrCountValue": "700 ذكر في 10 أقسام",
    "tiktokAccount": "حسابنا على تيك توك",
    "followUs": "تابعنا",
    "customization": "التخصيص",
    "darkMode": "الوضع الليلي",
    "fontSize": "حجم الخط",
    "reminders": "التذكيرات",
    "language": "اللغة",
    "languageDesc": "اختر لغة التطبيق",
    "dataManagement": "إدارة البيانات",
    "resetProgress": "إعادة تعيين التقدم",
    "exportData": "تصدير البيانات",
    "importData": "استيراد البيانات",
    "nightOn": "تفعيل الوضع الليلي",
    "dayOn": "تفعيل الوضع النهاري",
    "changeFontSize": "تغيير حجم الخط",
    "remindersOn": "تفعيل التذكيرات",
    "remindersOff": "تعطيل التذكيرات",
    "resetBtn": "إعادة تعيين",
    "exportBtn": "تصدير البيانات",
    "importBtn": "استيراد البيانات"
  },
  "developer": {
    "title": "مطور تطبيق أذكاري",
    "desc": "تطبيق أذكاري هو تطبيق متكامل للأذكار اليومية من القرآن الكريم والسنة النبوية الموثوقة، تم تطويره بدقة وعناية لتقديم تجربة مستخدم فريدة ومفيدة للمسلمين حول العالم.",
    "zikrCount": "700 ذكر",
    "sections": "10 أقسام",
    "version": "الإصدار 3.0",
    "contact": "تواصل مع المطور",
    "share": "مشاركة التطبيق",
    "rate": "تقييم التطبيق",
    "follow": "تابعنا"
  },
  "footer": {
    "rightsPrefix": "جميع الحقوق محفوظة © 2026 - ",
    "rightsSuffix": " | عبدالرحمن رضوان",
    "tagline": "تطبيق أذكاري | الأذكار اليومية من القرآن والسنة",
    "followOn": "تابعنا على تيك توك",
    "version": "الإصدار 3.0",
    "privacy": "خصوصية",
    "terms": "شروط الاستخدام",
    "tiktok": "تيك توك",
    "help": "المساعدة"
  },
  "contact": {
    "title": "تواصل مع المطور",
    "name": "اسمك",
    "namePlaceholder": "أدخل اسمك",
    "email": "بريدك الإلكتروني",
    "emailPlaceholder": "example@email.com",
    "subject": "الموضوع",
    "subjectPlaceholder": "اختر موضوع الرسالة",
    "subjects": {
      "suggestion": "اقتراح تحسين",
      "problem": "مشكلة فنية",
      "inquiry": "استفسار عام",
      "partnership": "طلب تعاون",
      "other": "أخرى"
    },
    "message": "الرسالة",
    "messagePlaceholder": "اكتب رسالتك هنا...",
    "submit": "إرسال الرسالة",
    "sending": "جاري الإرسال...",
    "success": "تم إرسال رسالتك بنجاح! سنرد عليك في أقرب وقت.",
    "mailtoSubject": "تطبيق أذكاري - {subject}",
    "mailtoBody": "الاسم: {name}\nالبريد: {email}\n\n{message}"
  },
  "share": {
    "title": "مشاركة تطبيق أذكاري",
    "subtitle": "شارك التطبيق مع أحبابك لينالوا الأجر والثواب",
    "whatsapp": "واتساب",
    "tiktok": "تيك توك",
    "twitter": "تويتر",
    "facebook": "فيسبوك",
    "copy": "نسخ الرابط",
    "copied": "تم نسخ الرابط!",
    "shared": "تم المشاركة",
    "sharedMsg": "تم مشاركة الذكر بنجاح",
    "opening": "جاري فتح {name}",
    "text": "{appName} - {description}\n\nالمطور: {developer}\nتيك توك: {tiktok}\nالإصدار: {version}\nرابط التطبيق: {url}"
  },
  "install": {
    "title": "تثبيت تطبيق أذكاري",
    "desc": "ثبّت التطبيق على جهازك للوصول السريع للأذكار بدون إنترنت",
    "install": "تثبيت",
    "later": "لاحقاً",
    "done": "تم التثبيت",
    "doneMsg": "تم تثبيت تطبيق أذكاري بنجاح!",
    "notAvailable": "التثبيت غير متاح",
    "notAvailableMsg": "تعذر عرض خيار التثبيت"
  },
  "update": {
    "title": "تحديث جديد متوفر",
    "releaseDate": "تاريخ الإصدار: {date}",
    "now": "تحديث الآن",
    "later": "لاحقاً",
    "failed": "فشل التحديث",
    "failedMsg": "حدث خطأ أثناء التحديث. يرجى المحاولة لاحقاً."
  },
  "notifications": {
    "changed": "تم التغيير",
    "darkModeOn": "تم تفعيل الوضع الليلي",
    "darkModeOff": "تم تعطيل الوضع الليلي",
    "fontSizeChanged": "تم تغيير حجم الخط إلى {size}px",
    "remindersOn": "تم تفعيل التذكيرات",
    "remindersOff": "تم تعطيل التذكيرات",
    "reminderMorningTitle": "تذكير أذكار الصباح",
    "reminderEveningTitle": "تذكير أذكار المساء",
    "reminderMorningMsg": "حان وقت أذكار الصباح. افتح التطبيق لقراءتها.",
    "reminderEveningMsg": "حان وقت أذكار المساء. افتح التطبيق لقراءتها.",
    "tiktokTitle": "تابعنا على تيك توك!",
    "tiktokMsg": "تابعنا على تيك توك للحصول على تحديثات يومية بالأذكار والفوائد الإسلامية.",
    "welcomeTitle": "مرحباً بك في أذكاري",
    "welcomeMsg": "تم تحميل التطبيق بنجاح. استمتع بتجربة الأذكار اليومية.",
    "firstTimeTitle": "أهلاً وسهلاً!",
    "firstTimeMsg": "اضغط على أي قسم لبدء قراءة الأذكار.",
    "added": "تم الإضافة",
    "addedMsg": "تمت إضافة الذكر إلى المفضلة",
    "removed": "تم الإزالة",
    "removedMsg": "تمت إزالة الذكر من المفضلة",
    "excellent": "ممتاز!",
    "readMsg": "تم تعليم الذكر كمقروء",
    "done": "تم بنجاح",
    "allRead": "تم تعليم جميع الأذكار كمقروءة",
    "copied": "تم النسخ",
    "copiedMsg": "تم نسخ الذكر إلى الحافظة",
    "exported": "تم التصدير",
    "exportedMsg": "تم تصدير بياناتك بنجاح",
    "imported": "تم الاستيراد",
    "importedMsg": "تم استيراد بياناتك بنجاح",
    "importError": "تعذر استيراد البيانات",
    "invalidFile": "ملف غير صالح",
    "reset": "تم الإعادة",
    "resetMsg": "تم إعادة تعيين التقدم بنجاح",
    "random": "ذكر عشوائي",
    "randomMsg": "تم اختيار ذكر من قسم {name}",
    "thanks": "شكراً لك!",
    "thanksMsg": "نشكرك على تفكيرك في تقييم التطبيق.",
    "online": "عودة الاتصال",
    "onlineMsg": "تم استعادة الاتصال بالإنترنت",
    "offline": "لا يوجد اتصال",
    "offlineMsg": "التطبيق يعمل دون اتصال",
    "shareZikrFooter": "شارك من تطبيق أذكاري - {developer}",
    "shareSource": "المصدر: {reference}",
    "shareTitle": "ذكر من تطبيق أذكاري",
    "shareTiktok": "تيك توك: {url}",
    "exportFileName": "أذكاري_بيانات_{date}.json",
    "privacy": "سياسة الخصوصية",
    "privacyMsg": "نحن نحترم خصوصيتك ولا نجمع أي بيانات شخصية.",
    "terms": "شروط الاستخدام",
    "termsMsg": "التطبيق مجاني للاستخدام الشخصي.",
    "help": "المساعدة",
    "helpMsg": "للحصول على المساعدة، راسلنا على: {email}"
  },
  "days": ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
  "months": ["محرم", "صفر", "ربيع الأول", "ربيع الآخر", "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"],
  "progressMeta": {
    "read": "{count} مكتمل",
    "remaining": "{count} باقي"
  },
  "data": {
    "repetitions": {
      "once": "مرة واحدة",
      "threeTimes": "ثلاث مرات",
      "sevenTimes": "سبع مرات",
      "tenTimes": "عشر مرات",
      "thirtyThreeTimes": "ثلاث وثلاثين مرة",
      "hundredTimes": "مائة مرة"
    },
    "references": {
      "bukhari": "صحيح البخاري",
      "muslim": "صحيح مسلم",
      "tirmidhi": "سنن الترمذي",
      "abuDawud": "سنن أبي داود",
      "nasai": "سنن النسائي",
      "ibnMajah": "سنن ابن ماجه",
      "malik": "موطأ مالك",
      "ahmad": "مسند أحمد",
      "darimi": "سُنن الدارمي",
      "ibnHibban": "صحيح ابن حبان"
    },
    "referenceNumbers": {
      "n1": "رقم 3391",
      "n2": "رقم 2723",
      "n3": "رقم 2726",
      "n4": "رقم 5068",
      "n5": "رقم 5081",
      "n6": "رقم 2709",
      "n7": "رقم 5088",
      "n8": "رقم 3389",
      "n9": "رقم 6405",
      "n10": "رقم 3474",
      "n11": "رقم 925",
      "n12": "رقم 3577",
      "n13": "رقم 10480",
      "n14": "رقم 5090",
      "n15": "رقم 1555",
      "n16": "رقم 2721",
      "n17": "رقم 284",
      "n18": "رقم 3410",
      "n19": "رقم 3370",
      "n20": "رقم 591"
    },
    "benefits": {
      "b1": "حفظ من الله تعالى ووقاية من الشرور",
      "b2": "بركة في الرزق والعمل وتيسير الأمور",
      "b3": "طمأنينة للقلب وراحة للنفس وسكينة",
      "b4": "حماية من الشيطان وشركه ووساوسه",
      "b5": "أجر عظيم ورفعة في الدرجات ومغفرة للذنوب",
      "b6": "غفران الذنوب والخطايا وتكفير السيئات",
      "b7": "زيادة في الإيمان والتقوى واليقين",
      "b8": "قبول الدعاء واستجابة وتحقيق المطالب",
      "b9": "نور في القلب والبصر والسمع والبصيرة",
      "b10": "رضا الله تعالى والفوز بالجنة والنجاة من النار",
      "b11": "قوة في البدن وصحة وعافية من الأمراض",
      "b12": "سعادة في الدنيا والآخرة وفلاح وفوز",
      "b13": "تيسير الصعاب وتذليل العقبات",
      "b14": "حل المشاكل وزوال الهموم والغموم",
      "b15": "بركة في الوقت والعمر والأهل والمال",
      "b16": "حب الله تعالى ومحبته لعبده",
      "b17": "النجاة من الفتن والمحن والبلاء",
      "b18": "الستر والعفاف والعفة والحياء",
      "b19": "العلم النافع والفهم الصحيح",
      "b20": "الذكر الدائم والشكر المستمر"
    }
  }
}
,
  en: {
  "app": {
    "name": "Adhkari",
    "developer": "Abdulrahman Radwan",
    "version": "3.0",
    "description": "Adhkari - a complete app for daily adhkar (remembrances of Allah) from the Holy Quran and authentic Sunnah. Contains 700 authentic remembrances from reliable sources with advanced progress tracking and reminders.",
    "metaTitle": "Adhkari - Complete Islamic Remembrances App",
    "metaDescription": "Adhkari - a complete app for daily adhkar from the Holy Quran and the authentic Sunnah of the Prophet.",
    "metaKeywords": "adhkar, daily adhkar, morning adhkar, evening adhkar, islamic app",
    "metaOgTitle": "Adhkari - Complete Islamic Remembrances App",
    "metaOgDescription": "A complete app for daily adhkar from the Holy Quran and the authentic Sunnah"
  },
  "languageScreen": {
    "title": "Choose your language",
    "subtitle": "Select the language you prefer for the best experience",
    "choose": "Select language"
  },
  "common": {
    "back": "Back to Home",
    "joinNow": "Join Now",
    "later": "Later",
    "countZikr": "{count} Adhkar",
    "streak": "Streak: {count} days"
  },
  "header": {
    "logoSubtitle": "Daily Adhkar",
    "darkMode": "Toggle Dark Mode",
    "fontSize": "Change Font Size",
    "settings": "Settings",
    "install": "Install App"
  },
  "home": {
    "bismillah": "بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ",
    "subtitle": "A complete app for daily adhkar from the Holy Quran and the authentic Sunnah",
    "dailyReminder": "Daily Adhkar Reminder",
    "randomZikr": "Random Adhkar",
    "progress": "Your Daily Progress",
    "read": "Read",
    "favorites": "Favorites",
    "streak": "Day Streak",
    "completion": "Completion",
    "searchPlaceholder": "Search adhkar...",
    "followUs": "Follow Us",
    "sectionsTitle": "Adhkar Sections",
    "categories": {
      "all": "All",
      "daily": "Daily",
      "prayer": "Prayer",
      "home": "Home",
      "special": "Special"
    },
    "features": {
      "favorites": "Favorites",
      "progress": "Progress Tracker",
      "nightMode": "Dark Mode",
      "search": "Advanced Search"
    }
  },
  "clock": {
    "am": "AM",
    "pm": "PM"
  },
  "sections": {
    "badges": {
      "daily": "Daily",
      "prayer": "Prayer",
      "home": "Home",
      "special": "Special"
    },
    "browse": "Browse Adhkar",
    "emptyCategory": "No sections in this category",
    "morning": {
      "name": "Morning Adhkar",
      "desc": "Morning remembrances narrated from the Prophet (peace be upon him) for protection and blessings"
    },
    "evening": {
      "name": "Evening Adhkar",
      "desc": "Evening remembrances narrated from the Prophet (peace be upon him) for safety and peace of mind"
    },
    "sleep": {
      "name": "Adhkar before Sleep",
      "desc": "Remembrances before sleep and the authentic supplications for a restful night"
    },
    "waking": {
      "name": "Waking Up Adhkar",
      "desc": "Remembrances upon waking from sleep and the prescribed supplications"
    },
    "prayer": {
      "name": "Adhkar after Prayer",
      "desc": "Remembrances and supplications after the salutation of prayer"
    },
    "mosque": {
      "name": "Mosque Adhkar",
      "desc": "Remembrances for entering and leaving the mosque and supplications of prayer"
    },
    "home": {
      "name": "Home Adhkar",
      "desc": "Remembrances for entering and leaving home, and for entering and leaving the restroom"
    },
    "food": {
      "name": "Adhkar for Food",
      "desc": "Remembrances for food and drink, and the supplication before and after eating"
    },
    "travel": {
      "name": "Travel Adhkar",
      "desc": "Travel remembrances and supplications for boarding, arrival and return"
    },
    "distress": {
      "name": "Adhkar for Worry and Sorrow",
      "desc": "Supplications for distress, worry, sorrow and trials"
    }
  },
  "zikr": {
    "count": "{count} Adhkar",
    "progress": "{count} Adhkar | {progress}% complete",
    "filters": {
      "all": "All Adhkar",
      "favorites": "Favorites",
      "read": "Read",
      "unread": "Unread",
      "search": "Search"
    },
    "searchPlaceholder": "Search in {name}...",
    "repetition": "Repetition:",
    "source": "Source:",
    "benefits": "Benefits:",
    "reset": "Reset",
    "back": "Back to Home",
    "markAllRead": "Mark All as Read",
    "emptyTitle": "No adhkar found",
    "emptyHint": "Try changing the filters or search terms",
    "completeTitle": "Mubarak!",
    "completeMsg": "You completed {count} repetitions of this dhikr",
    "addToFav": "Add to Favorites",
    "removeFromFav": "Remove from Favorites",
    "markRead": "Mark as Read",
    "markUnread": "Mark as Unread",
    "share": "Share Dhikr",
    "counter": "Repetition Counter"
  },
  "confirm": {
    "markAllRead": "Are you sure you want to mark all adhkar in this section as read?",
    "resetProgress": "Are you sure you want to reset your progress? All read adhkar and favorites will be deleted.",
    "importData": "Are you sure you want to import the data? Your current data will be replaced."
  },
  "settings": {
    "title": "App Settings",
    "appInfo": "App Information",
    "appName": "App Name",
    "appVersion": "App Version",
    "copyright": "Copyright",
    "copyrightValue": "© 2026 Abdulrahman Radwan",
    "zikrCount": "Number of Adhkar",
    "zikrCountValue": "700 adhkar in 10 sections",
    "tiktokAccount": "Our TikTok Account",
    "followUs": "Follow Us",
    "customization": "Customization",
    "darkMode": "Dark Mode",
    "fontSize": "Font Size",
    "reminders": "Reminders",
    "language": "Language",
    "languageDesc": "Choose the app language",
    "dataManagement": "Data Management",
    "resetProgress": "Reset Progress",
    "exportData": "Export Data",
    "importData": "Import Data",
    "nightOn": "Enable Dark Mode",
    "dayOn": "Enable Light Mode",
    "changeFontSize": "Change Font Size",
    "remindersOn": "Enable Reminders",
    "remindersOff": "Disable Reminders",
    "resetBtn": "Reset",
    "exportBtn": "Export Data",
    "importBtn": "Import Data"
  },
  "developer": {
    "title": "Adhkari App Developer",
    "desc": "Adhkari is a complete app for daily adhkar from the Holy Quran and the authentic Sunnah, carefully developed to provide a unique and valuable experience for Muslims around the world.",
    "zikrCount": "700 Adhkar",
    "sections": "10 Sections",
    "version": "Version 3.0",
    "contact": "Contact the Developer",
    "share": "Share the App",
    "rate": "Rate the App",
    "follow": "Follow Us"
  },
  "footer": {
    "rightsPrefix": "All rights reserved © 2026 - ",
    "rightsSuffix": " | Abdulrahman Radwan",
    "tagline": "Adhkari | Daily adhkar from the Quran and Sunnah",
    "followOn": "Follow us on TikTok",
    "version": "Version 3.0",
    "privacy": "Privacy",
    "terms": "Terms of Use",
    "tiktok": "TikTok",
    "help": "Help"
  },
  "contact": {
    "title": "Contact the Developer",
    "name": "Your Name",
    "namePlaceholder": "Enter your name",
    "email": "Your Email",
    "emailPlaceholder": "example@email.com",
    "subject": "Subject",
    "subjectPlaceholder": "Choose a message subject",
    "subjects": {
      "suggestion": "Improvement Suggestion",
      "problem": "Technical Issue",
      "inquiry": "General Inquiry",
      "partnership": "Partnership Request",
      "other": "Other"
    },
    "message": "Message",
    "messagePlaceholder": "Write your message here...",
    "submit": "Send Message",
    "sending": "Sending...",
    "success": "Your message was sent successfully! We will reply to you as soon as possible.",
    "mailtoSubject": "Adhkari App - {subject}",
    "mailtoBody": "Name: {name}\nEmail: {email}\n\n{message}"
  },
  "share": {
    "title": "Share Adhkari",
    "subtitle": "Share the app with your loved ones so they can earn the reward",
    "whatsapp": "WhatsApp",
    "tiktok": "TikTok",
    "twitter": "Twitter",
    "facebook": "Facebook",
    "copy": "Copy Link",
    "copied": "Link copied!",
    "shared": "Shared",
    "sharedMsg": "The dhikr was shared successfully",
    "opening": "Opening {name}",
    "text": "{appName} - {description}\n\nDeveloper: {developer}\nTikTok: {tiktok}\nVersion: {version}\nApp link: {url}"
  },
  "install": {
    "title": "Install Adhkari",
    "desc": "Install the app on your device for quick access to adhkar without internet",
    "install": "Install",
    "later": "Later",
    "done": "Installed",
    "doneMsg": "Adhkari was installed successfully!",
    "notAvailable": "Install Not Available",
    "notAvailableMsg": "The install option could not be displayed"
  },
  "update": {
    "title": "A New Update Is Available",
    "releaseDate": "Release date: {date}",
    "now": "Update Now",
    "later": "Later",
    "failed": "Update Failed",
    "failedMsg": "An error occurred while updating. Please try again later."
  },
  "notifications": {
    "changed": "Changed",
    "darkModeOn": "Dark mode has been enabled",
    "darkModeOff": "Dark mode has been disabled",
    "fontSizeChanged": "Font size changed to {size}px",
    "remindersOn": "Reminders have been enabled",
    "remindersOff": "Reminders have been disabled",
    "reminderMorningTitle": "Morning Adhkar Reminder",
    "reminderEveningTitle": "Evening Adhkar Reminder",
    "reminderMorningMsg": "It's time for the morning adhkar. Open the app to read them.",
    "reminderEveningMsg": "It's time for the evening adhkar. Open the app to read them.",
    "tiktokTitle": "Follow us on TikTok!",
    "tiktokMsg": "Follow us on TikTok for daily updates with adhkar and Islamic benefits.",
    "welcomeTitle": "Welcome to Adhkari",
    "welcomeMsg": "The app has loaded successfully. Enjoy your daily adhkar experience.",
    "firstTimeTitle": "Welcome!",
    "firstTimeMsg": "Tap any section to start reading adhkar.",
    "added": "Added",
    "addedMsg": "The dhikr has been added to favorites",
    "removed": "Removed",
    "removedMsg": "The dhikr has been removed from favorites",
    "excellent": "Excellent!",
    "readMsg": "The dhikr has been marked as read",
    "done": "Done",
    "allRead": "All adhkar have been marked as read",
    "copied": "Copied",
    "copiedMsg": "The dhikr has been copied to the clipboard",
    "exported": "Exported",
    "exportedMsg": "Your data has been exported successfully",
    "imported": "Imported",
    "importedMsg": "Your data has been imported successfully",
    "importError": "Could not import the data",
    "invalidFile": "Invalid file",
    "reset": "Reset Done",
    "resetMsg": "Your progress has been reset successfully",
    "random": "Random Adhkar",
    "randomMsg": "A dhikr was selected from the {name} section",
    "thanks": "Thank you!",
    "thanksMsg": "We appreciate you thinking about rating the app.",
    "online": "Connection Restored",
    "onlineMsg": "Your internet connection has been restored",
    "offline": "No Connection",
    "offlineMsg": "The app works offline",
    "shareZikrFooter": "Shared from Adhkari - {developer}",
    "shareSource": "Source: {reference}",
    "shareTitle": "A Dhikr from Adhkari",
    "shareTiktok": "TikTok: {url}",
    "exportFileName": "Adhkari_data_{date}.json",
    "privacy": "Privacy Policy",
    "privacyMsg": "We respect your privacy and do not collect any personal data.",
    "terms": "Terms of Use",
    "termsMsg": "The app is free for personal use.",
    "help": "Help",
    "helpMsg": "For assistance, contact us at: {email}"
  },
  "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  "months": ["Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani", "Jumada al-Ula", "Jumada al-Akhirah", "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"],
  "progressMeta": {
    "read": "{count} read",
    "remaining": "{count} remaining"
  },
  "data": {
    "repetitions": {
      "once": "Once",
      "threeTimes": "Three times",
      "sevenTimes": "Seven times",
      "tenTimes": "Ten times",
      "thirtyThreeTimes": "Thirty-three times",
      "hundredTimes": "One hundred times"
    },
    "references": {
      "bukhari": "Sahih al-Bukhari",
      "muslim": "Sahih Muslim",
      "tirmidhi": "Jami' at-Tirmidhi",
      "abuDawud": "Sunan Abi Dawud",
      "nasai": "Sunan an-Nasa'i",
      "ibnMajah": "Sunan Ibn Majah",
      "malik": "Muwatta Malik",
      "ahmad": "Musnad Ahmad",
      "darimi": "Sunan ad-Darimi",
      "ibnHibban": "Sahih Ibn Hibban"
    },
    "referenceNumbers": {
      "n1": "No. 3391",
      "n2": "No. 2723",
      "n3": "No. 2726",
      "n4": "No. 5068",
      "n5": "No. 5081",
      "n6": "No. 2709",
      "n7": "No. 5088",
      "n8": "No. 3389",
      "n9": "No. 6405",
      "n10": "No. 3474",
      "n11": "No. 925",
      "n12": "No. 3577",
      "n13": "No. 10480",
      "n14": "No. 5090",
      "n15": "No. 1555",
      "n16": "No. 2721",
      "n17": "No. 284",
      "n18": "No. 3410",
      "n19": "No. 3370",
      "n20": "No. 591"
    },
    "benefits": {
      "b1": "Protection from Allah and safety from evil",
      "b2": "Blessings in provision and work, and ease of affairs",
      "b3": "Tranquility of the heart, peace of mind and serenity",
      "b4": "Protection from the devil, his shares and his whispers",
      "b5": "Great reward, elevation in ranks and forgiveness of sins",
      "b6": "Forgiveness of sins, misdeeds and expiation of evil deeds",
      "b7": "Increase in faith, piety and certainty",
      "b8": "Acceptance and response of supplication, and fulfillment of needs",
      "b9": "Light in the heart, sight, hearing and insight",
      "b10": "The pleasure of Allah and success in reaching Paradise and escaping Hellfire",
      "b11": "Strength of body, health and well-being from diseases",
      "b12": "Happiness in this life and the Hereafter, success and triumph",
      "b13": "Easing of difficulties and removal of obstacles",
      "b14": "Resolution of problems and removal of worries and grief",
      "b15": "Blessing in time, life, family and wealth",
      "b16": "The love of Allah and His love for His servant",
      "b17": "Safety from trials, tribulations and affliction",
      "b18": "Modesty, chastity, purity and honor",
      "b19": "Beneficial knowledge and sound understanding",
      "b20": "Constant remembrance and continuous gratitude"
    }
  }
}
,
  so: {
  "app": {
    "name": "Adhkari",
    "developer": "Cabdiraxmaan Radwan",
    "version": "3.0",
    "description": "Adhkari - barnaamij dhammaystiran oo loogu talagalay zikrooyinka maalinlaha ah ee Quraanka kariimka iyo Sunnada saxda ah. Wuxuu ka kooban yahay 700 zikr oo la aamini karo oo laga soo qaatay ilo sax ah, isagoo leh sifooyin horumarsan oo ku saabsan la socodka horumarka iyo xusuusinta.",
    "metaTitle": "Adhkari - Barnaamijka Zikrooyinka Islaamiga ah ee Dhammaystiran",
    "metaDescription": "Adhkari - barnaamij dhammaystiran oo loogu talagalay zikrooyinka maalinlaha ah ee Quraanka kariimka iyo Sunnada saxda ah ee Nabiga.",
    "metaKeywords": "zikr, zikrooyin, zikrooyin subax, zikrooyin galab, barnaamij islaami",
    "metaOgTitle": "Adhkari - Barnaamijka Zikrooyinka Islaamiga ah ee Dhammaystiran",
    "metaOgDescription": "Barnaamij dhammaystiran oo loogu talagalay zikrooyinka maalinlaha ah ee Quraanka kariimka iyo Sunnada saxda ah"
  },
  "languageScreen": {
    "title": "Dooro luqaddaada",
    "subtitle": "Xulo luqadda aad doorbideyso si aad u hesho khibrad fiican",
    "choose": "Dooro luqad"
  },
  "common": {
    "back": "Ku noqo bogga hore",
    "joinNow": "Hadda ku biir",
    "later": "Hadhow",
    "countZikr": "{count} Zikr",
    "streak": "Silsilad: {count} maalmood"
  },
  "header": {
    "logoSubtitle": "Zikrooyinka Maalinlaha",
    "darkMode": "Beddel Qaabka Mugdiga",
    "fontSize": "Beddel Cabbirka Xarfaha",
    "settings": "Go'aaminta",
    "install": "Guri App-ka"
  },
  "home": {
    "bismillah": "بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ",
    "subtitle": "Barnaamij dhammaystiran oo loogu talagalay zikrooyinka maalinlaha ah ee Quraanka kariimka iyo Sunnada saxda ah",
    "dailyReminder": "Xusuusinta Zikrooyinka Maalinlaha",
    "randomZikr": "Zikr Random",
    "progress": "Horumarkaaga Maalinlaha",
    "read": "La Akhriyay",
    "favorites": "Jecel",
    "streak": "Maalmo Isku Xigxiga",
    "completion": "Dhammeystir",
    "searchPlaceholder": "Raadi zikrooyinka...",
    "followUs": "Noo raac",
    "sectionsTitle": "Qaybaha Zikrooyinka",
    "categories": {
      "all": "Dhamaan",
      "daily": "Maalinle",
      "prayer": "Salaad",
      "home": "Guri",
      "special": "Gaar ah"
    },
    "features": {
      "favorites": "Jecel",
      "progress": "Daba-guridda Horumarka",
      "nightMode": "Qaabka Mugdiga",
      "search": "Raadin Sare"
    }
  },
  "clock": {
    "am": "SN",
    "pm": "GN"
  },
  "sections": {
    "badges": {
      "daily": "Maalinle",
      "prayer": "Salaad",
      "home": "Guri",
      "special": "Gaar ah"
    },
    "browse": "Daalaco zikrooyinka",
    "emptyCategory": "Ma jiraan qaybo ku jira fasalkan",
    "morning": {
      "name": "Zikrooyinka Subaxa",
      "desc": "Zikrooyinka subaxa ee ka soo foodleeyay Nabiga (CSW) si ilaalin iyo barako"
    },
    "evening": {
      "name": "Zikrooyinka Galabka",
      "desc": "Zikrooyinka galabka ee ka soo foodleeyay Nabiga (CSW) si ammaan iyo nasasho"
    },
    "sleep": {
      "name": "Zikrooyinka Hurdada",
      "desc": "Zikrooyinka ka hor hurdada iyo baryada la soo foodleeyay si hurdad xasiloon"
    },
    "waking": {
      "name": "Zikrooyinka Togashada",
      "desc": "Zikrooyinka togashada hurdada iyo baryada la xoojiyay"
    },
    "prayer": {
      "name": "Zikrooyinka Salaadda Kadib",
      "desc": "Zikrooyinka iyo baryada kadib salaan ka bixista salaadda"
    },
    "mosque": {
      "name": "Zikrooyinka Masaajidka",
      "desc": "Zikrooyinka gashida iyo ka bixista masaajidka iyo baryada salaadda"
    },
    "home": {
      "name": "Zikrooyinka Guriga",
      "desc": "Zikrooyinka gashida iyo ka bixista guriga iyo gashida iyo ka bixista suuliga"
    },
    "food": {
      "name": "Zikrooyinka Cuntada",
      "desc": "Zikrooyinka cuntada iyo cabitaanka iyo baryada ka hor iyo kadib cunista"
    },
    "travel": {
      "name": "Zikrooyinka Safarka",
      "desc": "Zikrooyinka safarka iyo baryada gaaditaanka, imaatinka iyo soo noqoshada"
    },
    "distress": {
      "name": "Zikrooyinka Walaaca iyo Murugada",
      "desc": "Baryada cidhiidhiga, walaaca, murugada iyo imtixaanka"
    }
  },
  "zikr": {
    "count": "{count} Zikr",
    "progress": "{count} Zikr | {progress}% dhammaystiran",
    "filters": {
      "all": "Dhamaan zikrooyinka",
      "favorites": "Jecel",
      "read": "La Akhriyay",
      "unread": "Aan la Akhriyin",
      "search": "Raadi"
    },
    "searchPlaceholder": "Raadi gudaha {name}...",
    "repetition": "Ku celis:",
    "source": "Isha:",
    "benefits": "Faa'iidooyinka:",
    "reset": "Dib u habayn",
    "back": "Ku noqo bogga hore",
    "markAllRead": "Ku calaamadee dhamaan kuwa la akhriyay",
    "emptyTitle": "Ma la helin zikrooyin",
    "emptyHint": "Iska day beddelka sifaynta ama erayada raadinta",
    "completeTitle": "Mubaarak!",
    "completeMsg": "Waxaad dhammaystirtay {count} ku celis oo zikr ah",
    "addToFav": "Ku dar jecelka",
    "removeFromFav": "Ka saar jecelka",
    "markRead": "Ku calaamadee sida la akhriyay",
    "markUnread": "Ku calaamadee sida aan la akhriyin",
    "share": "Wadaag Zikr",
    "counter": "Miyaanka Ku Celiska"
  },
  "confirm": {
    "markAllRead": "Ma hubtaa inaad ku calaamadeyso dhamaan zikrooyinka qaybtan sida kuwa la akhriyay?",
    "resetProgress": "Ma hubtaa inaad dib u dajiso horumarkaaga? Dhamaan zikrooyinka la akhriyay iyo jecelka waa la tirtiri doonaa.",
    "importData": "Ma hubtaa inaad soo gasho xogta? Xogtaada hadda jirta waa la beddeli doonaa."
  },
  "settings": {
    "title": "Go'aaminta Barnaamijka",
    "appInfo": "Macluumaadka Barnaamijka",
    "appName": "Magaca Barnaamijka",
    "appVersion": "Nooca Barnaamijka",
    "copyright": "Xuquuqda",
    "copyrightValue": "© 2026 Cabdiraxmaan Radwan",
    "zikrCount": "Tirada Zikrooyinka",
    "zikrCountValue": "700 zikr oo ku kala jira 10 qaybood",
    "tiktokAccount": "Xisaabtayada TikTok",
    "followUs": "Noo raac",
    "customization": "Habaynta",
    "darkMode": "Qaabka Mugdiga",
    "fontSize": "Cabbirka Xarfaha",
    "reminders": "Xusuusinta",
    "language": "Luqadda",
    "languageDesc": "Dooro luqadda barnaamijka",
    "dataManagement": "Maamulka Xogta",
    "resetProgress": "Dib u dajinta Horumarka",
    "exportData": "Soo-saarka Xogta",
    "importData": "Soo-gelinta Xogta",
    "nightOn": "Firii Qaabka Mugdiga",
    "dayOn": "Firii Qaabka Maalinta",
    "changeFontSize": "Beddel Cabbirka Xarfaha",
    "remindersOn": "Firii Xusuusinta",
    "remindersOff": "Dami Xusuusinta",
    "resetBtn": "Dib u daji",
    "exportBtn": "Soo-saar Xogta",
    "importBtn": "Soo-geli Xogta"
  },
  "developer": {
    "title": "Hor-dhiga Barnaamijka Adhkari",
    "desc": "Adhkari waa barnaamij dhammaystiran oo loogu talagalay zikrooyinka maalinlaha ah ee Quraanka kariimka iyo Sunnada saxda ah, oo si taxadar iyo daryeel leh loo horumariyay si loogu soo bandhigo khibrad isticmaale gaar ah oo waxtar leh dadka muslimiinta ah ee adduunka oo dhan.",
    "zikrCount": "700 Zikr",
    "sections": "10 Qaybood",
    "version": "Nooca 3.0",
    "contact": "La xiriir Hor-dhiga",
    "share": "Wadaag Barnaamijka",
    "rate": "Qiimee Barnaamijka",
    "follow": "Noo raac"
  },
  "footer": {
    "rightsPrefix": "Xuquuqda oo dhan way xifdisan yihiin © 2026 - ",
    "rightsSuffix": " | Cabdiraxmaan Radwaan",
    "tagline": "Adhkari | Zikrooyin maalinle ah oo Quraan iyo Sunna ah",
    "followOn": "Noo raac TikTok",
    "version": "Nooca 3.0",
    "privacy": "Qarsoonnida",
    "terms": "Shuruudaha Isticmaalka",
    "tiktok": "TikTok",
    "help": "Caawimo"
  },
  "contact": {
    "title": "La xiriir Hor-dhiga",
    "name": "Magacaaga",
    "namePlaceholder": "Gali magacaaga",
    "email": "Email-kaaga",
    "emailPlaceholder": "example@email.com",
    "subject": "Mawduuca",
    "subjectPlaceholder": "Dooro mawduuca farriinta",
    "subjects": {
      "suggestion": "Soo-jeedin hagaajin",
      "problem": "Dhibaato farsamo",
      "inquiry": "Weedhin guud",
      "partnership": "Codsi wada-shaqeyn",
      "other": "Kale"
    },
    "message": "Farriinta",
    "messagePlaceholder": "Qor farriintaada halkan...",
    "submit": "Dir Farriinta",
    "sending": "Waa la dirayaa...",
    "success": "Farriintaada si guul leh ayaa loo diray! Waanu kuu soo jawaabi doonaa dhawaatan.",
    "mailtoSubject": "Barnaamijka Adhkari - {subject}",
    "mailtoBody": "Magaca: {name}\nEmail: {email}\n\n{message}"
  },
  "share": {
    "title": "Wadaag Adhkari",
    "subtitle": "La wadaag barnaamijka dadka aad jeceshahay si ay u helaan ajir iyo khayr",
    "whatsapp": "WhatsApp",
    "tiktok": "TikTok",
    "twitter": "Twitter",
    "facebook": "Facebook",
    "copy": "Nuqul Linkiga",
    "copied": "Linkiga waa la nuqulay!",
    "shared": "Waa la wadaagay",
    "sharedMsg": "Zikr-ka si guul leh ayaa loo wadaagay",
    "opening": "Waa la furayaa {name}",
    "text": "{appName} - {description}\n\nHor-dhiga: {developer}\nTikTok: {tiktok}\nNooca: {version}\nLinkiga barnaamijka: {url}"
  },
  "install": {
    "title": "Guri Adhkari",
    "desc": "Guri barnaamijka qalabkaaga si aad si degdeg ah uga heli karto zikrooyinka adigoon internet lahayn",
    "install": "Guri",
    "later": "Hadhow",
    "done": "Waa la guriyay",
    "doneMsg": "Barnaamijka Adhkari si guul leh ayaa loo guriyay!",
    "notAvailable": "Gurida ma awoodo",
    "notAvailableMsg": "Ikhtiyaarka gurida lama soo bandhigi karo"
  },
  "update": {
    "title": "Cusboonaysiin Cusub ayaa diyaar ah",
    "releaseDate": "Taariikhda sii-deynta: {date}",
    "now": "Hadda Cusboonaysii",
    "later": "Hadhow",
    "failed": "Cusboonaysiintii waa fashilantay",
    "failedMsg": "Qalad ayaa ka dhacay cusboonaysiinta. Fadlan mar kale isku day hadhow."
  },
  "notifications": {
    "changed": "Waa la beddelay",
    "darkModeOn": "Qaabka mugdiga waa la firiiyay",
    "darkModeOff": "Qaabka mugdiga waa la damiyay",
    "fontSizeChanged": "Cabbirka xarfaha wuxuu noqday {size}px",
    "remindersOn": "Xusuusinta waa la firiiyay",
    "remindersOff": "Xusuusinta waa la damiyay",
    "reminderMorningTitle": "Xusuusinta Zikrooyinka Subaxa",
    "reminderEveningTitle": "Xusuusinta Zikrooyinka Galabka",
    "reminderMorningMsg": "Waqtigii zikrooyinka subaxa ayaa la soo gaadhay. Fur barnaamijka si aad u akhrido.",
    "reminderEveningMsg": "Waqtigii zikrooyinka galabka ayaa la soo gaadhay. Fur barnaamijka si aad u akhrido.",
    "tiktokTitle": "Noo raac TikTok!",
    "tiktokMsg": "Noo raac TikTok si aad u hesho cusboonaysiin maalinle ah oo zikrooyin iyo faa'iidooyin diineed ah.",
    "welcomeTitle": "Ku soo dhawoow Adhkari",
    "welcomeMsg": "Barnaamijku wuxuu si guul leh u soo gaxay. Ku raaxayso khibradaada zikrooyinka maalinlaha ah.",
    "firstTimeTitle": "Soo dhawoow!",
    "firstTimeMsg": "Taabo qayb kasta si aad u bilowdo akhrinta zikrooyinka.",
    "added": "Waa la daray",
    "addedMsg": "Zikr-ka ayaa lagu daray jecelka",
    "removed": "Waa laga saaray",
    "removedMsg": "Zikr-ka ayaa laga saaray jecelka",
    "excellent": "Waan fiican tahay!",
    "readMsg": "Zikr-ka waxaa loo calaamadeeyay sida la akhriyay",
    "done": "Guul ayaa laga gaadhay",
    "allRead": "Dhamaan zikrooyinka ayaa loo calaamadeeyay sida kuwa la akhriyay",
    "copied": "Waa la nuqulay",
    "copiedMsg": "Zikr-ka waxaa loo nuqulay xirmada",
    "exported": "Waa la soo saaray",
    "exportedMsg": "Xogtaada si guul leh ayaa loo soo saaray",
    "imported": "Waa la soo geliyay",
    "importedMsg": "Xogtaada si guul leh ayaa loo soo geliyay",
    "importError": "Xogta lama soo gelin karin",
    "invalidFile": "File aan shaqayn",
    "reset": "Dib-u-dajin oo dhammaystiran",
    "resetMsg": "Horumarkaaga si guul leh ayaa loo dib u dajiyay",
    "random": "Zikr Random",
    "randomMsg": "Zikr ayaa laga xulay qaybta {name}",
    "thanks": "Mahadsanid!",
    "thanksMsg": "Waanu ku mahadcelinaynaa ka fikirista qiimaynta barnaamijka.",
    "online": "Xiriirka waa la soo celiyay",
    "onlineMsg": "Xiriirka internetka ayaa dib loo soo celiyay",
    "offline": "Ma jiro xiriir",
    "offlineMsg": "Barnaamijku wuxuu u shaqeeyaa xiriir la'aan",
    "shareZikrFooter": "Waxaa laga wadaagay Adhkari - {developer}",
    "shareSource": "Isha: {reference}",
    "shareTitle": "Zikr ka yimid Adhkari",
    "shareTiktok": "TikTok: {url}",
    "exportFileName": "Xogta_Adhkari_{date}.json",
    "privacy": "Siyaasadda Qarsoonnida",
    "privacyMsg": "Waxaanu ixtiraamaynaa qarsoonnidaada mana ururinno wax xog shaqsi ah.",
    "terms": "Shuruudaha Isticmaalka",
    "termsMsg": "Barnaamijku waa bilaash oo isticmaalka shaqsi ah.",
    "help": "Caawimo",
    "helpMsg": "Si aad caawimo u hesho, nagala xiriir: {email}"
  },
  "days": ["Axad", "Isniin", "Talaado", "Arbaco", "Khamiis", "Jimce", "Sabti"],
  "months": ["Muxarram", "Safar", "Rabic al-Awwal", "Rabic al-Thaani", "Jumad al-Uula", "Jumad al-Akhira", "Rajab", "Shacbaan", "Ramadaan", "Shawwaal", "Dul Qicdah", "Dul Xijjah"],
  "progressMeta": {
    "read": "{count} waa la akhriyay",
    "remaining": "{count} ayaa hadhsan"
  },
  "data": {
    "repetitions": {
      "once": "Hal mar",
      "threeTimes": "Saddex jeer",
      "sevenTimes": "Toddoba jeer",
      "tenTimes": "Toban jeer",
      "thirtyThreeTimes": "Soddon iyo saddex jeer",
      "hundredTimes": "Boqol jeer"
    },
    "references": {
      "bukhari": "Saxiix Bukhaari",
      "muslim": "Saxiix Muslim",
      "tirmidhi": "Sunan Tirmidhi",
      "abuDawud": "Sunan Abuu Daawuud",
      "nasai": "Sunan Nasaaci",
      "ibnMajah": "Sunan Ibn Maajah",
      "malik": "Muwadda Maalik",
      "ahmad": "Musnad Axmed",
      "darimi": "Sunan Daarimi",
      "ibnHibban": "Saxiix Ibn Hibbaan"
    },
    "referenceNumbers": {
      "n1": "Lambar 3391",
      "n2": "Lambar 2723",
      "n3": "Lambar 2726",
      "n4": "Lambar 5068",
      "n5": "Lambar 5081",
      "n6": "Lambar 2709",
      "n7": "Lambar 5088",
      "n8": "Lambar 3389",
      "n9": "Lambar 6405",
      "n10": "Lambar 3474",
      "n11": "Lambar 925",
      "n12": "Lambar 3577",
      "n13": "Lambar 10480",
      "n14": "Lambar 5090",
      "n15": "Lambar 1555",
      "n16": "Lambar 2721",
      "n17": "Lambar 284",
      "n18": "Lambar 3410",
      "n19": "Lambar 3370",
      "n20": "Lambar 591"
    },
    "benefits": {
      "b1": "Ilaalinta Allaah iyo ka dhowrsanaanta sharrada",
      "b2": "Barako risqiga iyo shaqada iyo fududaynta arrimaha",
      "b3": "Degganaansho qalbiga, nasasho nafta iyo xasillooni",
      "b4": "Ka dhowrsanaanta shaydaanka, shirkadiisa iyo waswaasiyadiisa",
      "b5": "Ajir weyn, darajo sare iyo dambi dhaaf",
      "b6": "Dambiyada iyo khaladaadka waa la dhaafaa, xumaanta waa la tirtiraa",
      "b7": "Kordhin iimaanka, dhawrsanaanta iyo yaqiinta",
      "b8": "Aqbalaadda ducada, jawabta iyo fulinta baahiyaha",
      "b9": "Nuur qalbiga, araga, maqalka iyo fahanka",
      "b10": "Raalli ahaanshaha Allaah iyo guusha helista Jannada iyo ka baxsashada Naarta",
      "b11": "Xoog jidhka, caafimaad iyo ka fogaanshaha cudurrada",
      "b12": "Farxad adduunka iyo aakhiraba, liibaan iyo guul",
      "b13": "Fududaynta dhibaatooyinka iyo ka saarista caqabadaha",
      "b14": "Xallinta mushkiladaha iyo ka fogaanshaha walbahaarka iyo murugada",
      "b15": "Barako waqtiga, nolosha, qoyska iyo maalka",
      "b16": "Jecelka Allaah iyo jecelka Eebe addoonkiisa",
      "b17": "Ka nabadgelyada imtixaannada, masiibooyinka iyo belooyinka",
      "b18": "Dhawrsanaan, nadiifnimo iyo karaamo",
      "b19": "Cilmi waxtar leh iyo faham sax ah",
      "b20": "Xus joogto ah iyo mahadnaq aan kala go'ayn"
    }
  }
}

};
