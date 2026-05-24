// ===== TRANSLATIONS =====
const i18n = {
  ar: {
    nav_apps:         "تطبيقاتي",
    nav_about:        "عني",
    nav_contact:      "تواصل",
    hero_tag:         "مرحباً بك ",
    hero_title:       "تطبيقاتي",
    hero_sub:         "ومشاريعي البرمجية",
    hero_desc:        "مجموعة من التطبيقات والأدوات التي طورتها بشغف. استكشف وجرّب!",
    hero_btn:         "استعرض التطبيقات",
    apps_title:       "التطبيقات",
    apps_subtitle:    "كل ما طورته حتى الآن",
    filter_all:       "الكل",
    filter_mobile:    "موبايل",
    filter_web:       "ويب",
    filter_tool:      "أدوات",
    filter_game:      "ألعاب",
    badge_live:       "متاح الآن",
    badge_wip:        "قيد التطوير",
    balot_name:       "حاسبة بلوت برو",
    balot_desc:       "تطبيقك الأمثل لإدارة وتسجيل مباريات البلوت باحترافية. واجهات عصرية تدعم الوضع الداكن وتحليلات دقيقة.",
    yawmi_name:       "يومك",
    yawmi_desc:       "تطبيق لتنظيم يومك وإدارة مهامك. قريباً!",
    btn_more:         "اعرف أكثر",
    btn_soon:         "قريباً...",
    about_title:      "عني",
    about_desc:       "مطور شغوف في تطوير التطبيقات والويب وكل ما يخطر على بالك. أحب بناء أشياء تفرق وتترك أثر.",
    contact_title:    "تواصل معي",
    contact_subtitle: "لديك سؤال أو اقتراح؟ أنا هنا!",
    footer_text:      "© 2025 — جميع الحقوق محفوظة",
    count_label:      "مشروع",
  },
  en: {
    nav_apps:         "My Apps",
    nav_about:        "About",
    nav_contact:      "Contact",
    hero_tag:         "Welcome ",
    hero_title:       "My Apps",
    hero_sub:         "& Dev Projects",
    hero_desc:        "A collection of apps and tools I built with passion. Explore and try them out!",
    hero_btn:         "Browse Apps",
    apps_title:       "Applications",
    apps_subtitle:    "Everything I've built so far",
    filter_all:       "All",
    filter_mobile:    "Mobile",
    filter_web:       "Web",
    filter_tool:      "Tools",
    filter_game:      "Games",
    badge_live:       "Live",
    badge_wip:        "In Development",
    balot_name:       "BalotPro",
    balot_desc:       "Your ultimate app for managing and tracking Balot card games professionally. Modern UI with dark mode and detailed analytics.",
    yawmi_name:       "Yawmk",
    yawmi_desc:       "A daily planner and task manager. Coming soon!",
    btn_more:         "Learn More",
    btn_soon:         "Coming Soon...",
    about_title:      "About Me",
    about_desc:       "A passionate developer in apps, web, and everything in between. I love building things that matter and make a difference.",
    contact_title:    "Get in Touch",
    contact_subtitle: "Have a question or suggestion? I'm here!",
    footer_text:      "© 2025 — All Rights Reserved",
    count_label:      "projects",
  }
};

// ===== CURRENT LANG =====
let currentLang = localStorage.getItem('lang') || 'ar';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  const t = i18n[lang];

  // html dir & body class
  document.documentElement.lang = lang;
  document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
  document.body.classList.toggle('ltr', lang === 'en');

  // translate all [data-i18n] elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // update count label
  updateCount();

  // toggle button text
  const btn = document.getElementById('langToggle');
  btn.textContent = lang === 'ar' ? 'EN' : 'عر';
  btn.classList.toggle('active', lang === 'en');

  // page title
  document.title = lang === 'ar' ? 'Yasir.dev' : 'Yasir.dev';
}

// ===== LANG TOGGLE =====
document.getElementById('langToggle').addEventListener('click', () => {
  applyLang(currentLang === 'ar' ? 'en' : 'ar');
});

// ===== MOBILE MENU =====
const menuBtn    = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
function closeMobile() { mobileMenu.classList.remove('open'); }

// ===== FILTER BUTTONS =====
const filterBtns = document.querySelectorAll('.filter-btn');
const cards      = document.querySelectorAll('.app-card');

function updateCount() {
  const visible = document.querySelectorAll('.app-card:not(.hidden)').length;
  const label = i18n[currentLang].count_label;
  document.getElementById('countLabel').textContent = visible + ' ' + label;
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    cards.forEach(card => {
      card.classList.toggle('hidden', cat !== 'all' && card.dataset.cat !== cat);
    });
    updateCount();
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ===== CARD ENTRANCE ANIMATION =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

cards.forEach((card, i) => {
  card.style.opacity    = '0';
  card.style.transform  = 'translateY(20px)';
  card.style.transition = `opacity 0.4s ease ${i * 0.1}s, transform 0.4s ease ${i * 0.1}s, box-shadow 0.18s, border-color 0.18s`;
  observer.observe(card);
});

// ===== INIT =====
applyLang(currentLang);