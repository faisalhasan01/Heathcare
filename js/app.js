/**
 * AURA HEALTH - JAVASCRIPT APPLICATION LOGIC
 * Reimagined Primary Care & 24/7 Virtual Health Platform
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initRotatingServices();
  initAppInteractiveTabs();
  initInsuranceChecker();
  initFaqAccordion();
  initModals();
  initSearchAutocomplete();
  initLocationDrawer();
  initMobileMenu();
});

/* ==========================================================================
   1. STICKY HEADER & SCROLL EFFECTS
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  });

  // Global banner dismiss
  const bannerClose = document.querySelector('.global-banner__close');
  const banner = document.querySelector('.global-banner');
  if (bannerClose && banner) {
    bannerClose.addEventListener('click', () => {
      banner.style.display = 'none';
    });
  }
}

/* ==========================================================================
   2. DYNAMIC ROTATING SERVICES CYCLER
   ========================================================================== */
function initRotatingServices() {
  const words = [
    'depression',
    'anxiety',
    'sleep issues',
    'weight management',
    'cancer screening',
    'heart health',
    'allergies',
    'coughs & colds',
    'asthma',
    'high blood pressure',
    'diabetes',
    'sports injuries',
    'skin rashes',
    'thyroid care',
    'chronic fatigue',
    'annual physicals'
  ];

  const container = document.getElementById('rotatingWordContainer');
  if (!container) return;

  let currentIndex = 0;
  let intervalId;

  function renderWord(index) {
    container.innerHTML = `<span class="rotating-word is-active">${words[index]}</span>`;
  }

  renderWord(0);

  function startRotation() {
    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % words.length;
      renderWord(currentIndex);
    }, 2400);
  }

  startRotation();

  // Handle clickable quick pills
  const pills = document.querySelectorAll('.service-pill-btn');
  pills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      clearInterval(intervalId);
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const topic = pill.getAttribute('data-service');
      container.innerHTML = `<span class="rotating-word is-active">${topic}</span>`;
      // Resume rotation after 6 seconds
      setTimeout(startRotation, 6000);
    });
  });
}

/* ==========================================================================
   3. APP INTERACTIVE FEATURE TABS & SMARTPHONE MOCKUP
   ========================================================================== */
function initAppInteractiveTabs() {
  const tabs = document.querySelectorAll('.app-feature-item');
  const phoneScreen = document.getElementById('phoneDynamicContent');
  if (!tabs.length || !phoneScreen) return;

  const mockScreens = {
    'video': `
      <div class="phone-video-call-view">
        <img src="assets/images/telehealth.jpg" alt="Telehealth Video Call" />
        <div class="phone-call-status">
          <span class="pulse-dot"></span> Live HD Video • 04:12
        </div>
      </div>
      <div class="phone-app-card">
        <div class="phone-app-card__header">CARE TEAM</div>
        <div class="phone-app-card__body">Dr. Sarah Jenkins, MD • Family Medicine</div>
      </div>
      <div class="phone-app-card" style="background:#e0f2fe; border-color:#bae6fd;">
        <div class="phone-app-card__header" style="color:#0284c7;">INCLUDED BENEFIT</div>
        <div class="phone-app-card__body" style="font-size:0.75rem;">$0 copay • Available 24/7/365 nationwide</div>
      </div>
    `,
    'messaging': `
      <div style="background:#f8fafc; border-radius:14px; padding:12px; height:200px; display:flex; flex-direction:column; gap:10px; overflow-y:auto;">
        <div style="background:#e2e8f0; padding:8px 12px; border-radius:12px 12px 12px 2px; font-size:0.76rem; max-width:85%;">
          Hello! I reviewed your blood pressure log from this morning. Numbers look optimal.
        </div>
        <div style="background:#2563eb; color:#fff; padding:8px 12px; border-radius:12px 12px 2px 12px; font-size:0.76rem; max-width:85%; align-self:flex-end;">
          Thank you Dr. Jenkins! Should I continue the same dosage?
        </div>
        <div style="background:#e2e8f0; padding:8px 12px; border-radius:12px 12px 12px 2px; font-size:0.76rem; max-width:85%;">
          Yes, maintain for the next 30 days and we'll recheck labs!
        </div>
      </div>
      <div class="phone-app-card" style="margin-top:10px;">
        <div class="phone-app-card__header">RESPONSE TIME</div>
        <div class="phone-app-card__body">Average reply under 15 minutes</div>
      </div>
    `,
    'refills': `
      <div class="phone-app-card" style="background:#fff; border:1px solid #e2e8f0; padding:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-weight:700; font-size:0.85rem; color:#0f172a;">Atorvastatin 20mg</span>
          <span style="background:#dcfce7; color:#166534; font-size:0.68rem; font-weight:700; padding:2px 8px; border-radius:99px;">Approved</span>
        </div>
        <div style="font-size:0.74rem; color:#64748b; margin-bottom:12px;">90-day supply • Free doorstep delivery</div>
        <button style="width:100%; background:#2563eb; color:#fff; border-radius:8px; padding:8px; font-size:0.75rem; font-weight:700;">Request Instant Refill</button>
      </div>
      <div class="phone-app-card" style="margin-top:10px;">
        <div class="phone-app-card__header">PHARMACY PARTNERSHIP</div>
        <div class="phone-app-card__body">Sent directly to your preferred local pharmacy or delivered same-day.</div>
      </div>
    `,
    'booking': `
      <div class="phone-app-card" style="background:#fff; padding:14px;">
        <div style="font-weight:700; font-size:0.84rem; margin-bottom:6px;">Next Available in Downtown Clinic</div>
        <div style="display:flex; gap:6px; margin-bottom:10px;">
          <span style="background:#eff6ff; color:#1d4ed8; font-weight:700; padding:4px 8px; border-radius:6px; font-size:0.72rem;">Today, 2:30 PM</span>
          <span style="background:#f1f5f9; color:#475569; font-weight:600; padding:4px 8px; border-radius:6px; font-size:0.72rem;">Today, 4:15 PM</span>
        </div>
        <div style="font-size:0.74rem; color:#64748b;">Guaranteed on-time start with zero waiting room delay.</div>
      </div>
      <div class="phone-app-card" style="margin-top:10px;">
        <div class="phone-app-card__header">LOCATIONS</div>
        <div class="phone-app-card__body">Over 120+ modern offices across 35 major cities.</div>
      </div>
    `,
    'labs': `
      <div class="phone-app-card" style="background:#fff; padding:14px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="font-weight:700; font-size:0.84rem;">Comprehensive Metabolic Panel</span>
          <span style="color:#059669; font-weight:700; font-size:0.72rem;">Normal</span>
        </div>
        <div style="font-size:0.74rem; color:#64748b;">Completed Oct 4 • Physician review attached</div>
        <div style="margin-top:10px; font-size:0.72rem; color:#2563eb; font-weight:600; cursor:pointer;">View full biometric trends & charts →</div>
      </div>
      <div class="phone-app-card" style="margin-top:10px;">
        <div class="phone-app-card__header">DROP-IN TESTING</div>
        <div class="phone-app-card__body">Walk in anytime for blood draws without appointment.</div>
      </div>
    `
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      const featureKey = tab.getAttribute('data-feature');
      if (mockScreens[featureKey]) {
        phoneScreen.innerHTML = mockScreens[featureKey];
      }
    });
  });
}

/* ==========================================================================
   4. INSURANCE CHECKER WIDGET
   ========================================================================== */
function initInsuranceChecker() {
  const select = document.getElementById('insuranceSelect');
  const checkBtn = document.getElementById('checkInsuranceBtn');
  const resultBox = document.getElementById('insuranceResultBox');
  const popularTags = document.querySelectorAll('.ins-tag');

  if (!checkBtn || !resultBox || !select) return;

  function verifyCarrier(carrierName) {
    if (!carrierName || carrierName === 'default') {
      showToast('Please select your insurance plan first.');
      return;
    }

    resultBox.style.display = 'flex';
    resultBox.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <div>
        <strong>${carrierName} is In-Network!</strong>
        <div style="font-size:0.78rem; opacity:0.9;">Your scheduled office visits, virtual primary care, and routine preventative exams are covered according to your plan benefits.</div>
      </div>
    `;
    showToast(`Verified: ${carrierName} is accepted at all Aura Health offices!`);
  }

  checkBtn.addEventListener('click', () => {
    verifyCarrier(select.value);
  });

  popularTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const insName = tag.getAttribute('data-name');
      select.value = insName;
      verifyCarrier(insName);
    });
  });
}

/* ==========================================================================
   5. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close other items
      faqItems.forEach(i => i.classList.remove('is-open'));

      if (!isOpen) {
        item.classList.add('is-open');
      }
    });
  });
}

/* ==========================================================================
   6. MODALS MANAGEMENT (Sign-up, Login, Booking, Search)
   ========================================================================== */
function initModals() {
  // Triggers
  const signupTriggers = document.querySelectorAll('[data-open-modal="signup"]');
  const loginTriggers = document.querySelectorAll('[data-open-modal="login"]');
  const bookTriggers = document.querySelectorAll('[data-open-modal="book"]');
  const searchTriggers = document.querySelectorAll('[data-open-modal="search"]');

  // Modals
  const signupModal = document.getElementById('signupModal');
  const loginModal = document.getElementById('loginModal');
  const bookModal = document.getElementById('bookModal');
  const searchModal = document.getElementById('searchModal');
  const allModals = document.querySelectorAll('.modal-overlay');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  signupTriggers.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(signupModal);
  }));

  loginTriggers.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(loginModal);
  }));

  bookTriggers.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(bookModal);
  }));

  searchTriggers.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(searchModal);
  }));

  // Close on backdrop or X button
  allModals.forEach(modal => {
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(modal));
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      allModals.forEach(modal => closeModal(modal));
    }
  });

  // Form Submissions Mock
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(signupModal);
      showToast('🎉 Welcome to Aura Health! Check your inbox to activate your care plan.');
    });
  }

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(loginModal);
      showToast('✅ Logged in successfully to your Aura Health portal.');
    });
  }

  const bookForm = document.getElementById('bookForm');
  if (bookForm) {
    bookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(bookModal);
      showToast('🗓️ Appointment confirmed! We’ve sent calendar invites & details.');
    });
  }
}

/* ==========================================================================
   7. LIVE SEARCH AUTOCOMPLETE
   ========================================================================== */
function initSearchAutocomplete() {
  const searchInput = document.getElementById('liveSearchInput');
  const resultsContainer = document.getElementById('searchResultsContainer');
  if (!searchInput || !resultsContainer) return;

  const directory = [
    { title: 'Annual Physical & Wellness Exam', category: 'Services', desc: 'Comprehensive 45-min head-to-toe preventive care' },
    { title: '24/7 On-Demand Video Chat', category: 'Telehealth', desc: 'Connect with a provider in 3 minutes with $0 copay' },
    { title: 'Mental Health & Mindset', category: 'Therapy', desc: 'Integrated depression, anxiety, and stress counseling' },
    { title: 'Drop-in Lab Services', category: 'Labs', desc: 'On-site routine blood tests & rapid panels with no line' },
    { title: 'Allergy, Cough & Flu Care', category: 'Illness', desc: 'Same-day urgent assessments and prescriptions' },
    { title: 'Women’s Health & Contraception', category: 'Specialty', desc: 'Pap smears, STI screening, IUDs and prenatal guidance' },
    { title: 'Men’s Health & Preventive Screenings', category: 'Specialty', desc: 'Cardiovascular risk, prostate health and vitality' },
    { title: 'San Francisco - Financial District Office', category: 'Locations', desc: '350 Bush Street, Suite 400' },
    { title: 'New York - Flatiron Office', category: 'Locations', desc: '18 W 18th Street, 5th Floor' },
    { title: 'Chicago - River North Office', category: 'Locations', desc: '401 N Michigan Ave' },
    { title: 'Austin - Downtown Office', category: 'Locations', desc: '500 W 2nd Street' },
    { title: 'Dr. Sarah Jenkins, MD', category: 'Providers', desc: 'Family Medicine & Integrative Health Specialist' },
    { title: 'Dr. David Park, MD', category: 'Providers', desc: 'Internal Medicine & Cardiovascular Prevention' }
  ];

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      resultsContainer.innerHTML = `
        <div style="padding: 20px; text-align: center; color: #94a3b8; font-size: 0.9rem;">
          Type a symptom, treatment, provider, or city to find instant matches...
        </div>
      `;
      return;
    }

    const filtered = directory.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.category.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 24px; text-align: center; color: #64748b;">
          No direct matches found for "<strong>${escapeHtml(query)}</strong>". Try searching for "telehealth", "doctor", or a city.
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = filtered.map(item => `
      <div class="search-result-row" style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; cursor: pointer; border-radius: 8px; transition: background 150ms;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong style="color:#0f172a; font-size:0.95rem;">${item.title}</strong>
          <span style="background:#e0f2fe; color:#0369a1; font-size:0.7rem; font-weight:700; padding:2px 8px; border-radius:99px;">${item.category}</span>
        </div>
        <p style="color:#64748b; font-size:0.82rem; margin-top:2px;">${item.desc}</p>
      </div>
    `).join('');

    // Clicking an item closes modal and triggers toast
    document.querySelectorAll('.search-result-row').forEach(row => {
      row.addEventListener('click', () => {
        const modal = document.getElementById('searchModal');
        if (modal) modal.classList.remove('is-active');
        document.body.style.overflow = '';
        showToast(`Navigating to ${row.querySelector('strong').innerText}`);
      });
    });
  });
}

/* ==========================================================================
   8. LOCATION DRAWER & CITY SELECTOR
   ========================================================================== */
function initLocationDrawer() {
  const locationPickerBtn = document.getElementById('locationPickerBtn');
  const cityDrawer = document.getElementById('cityDrawerModal');
  if (!locationPickerBtn || !cityDrawer) return;

  locationPickerBtn.addEventListener('click', () => {
    cityDrawer.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  });

  // Handle city pill clicks
  const cityPills = document.querySelectorAll('.city-select-pill');
  cityPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cityName = pill.getAttribute('data-city');
      const label = document.getElementById('currentLocationLabel');
      if (label) label.innerText = cityName;
      cityDrawer.classList.remove('is-active');
      document.body.style.overflow = '';
      showToast(`Location set to: ${cityName}. Displaying nearest offices.`);
    });
  });
}

/* ==========================================================================
   9. MOBILE MENU DRAWER
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.getElementById('mobileNavDrawer');
  const mobileClose = document.getElementById('mobileNavClose');

  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    mobileNav.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });

  if (mobileClose) {
    mobileClose.addEventListener('click', () => {
      mobileNav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  }

  // Close when tapping links
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
}

/* ==========================================================================
   10. REUSABLE TOAST NOTIFICATION
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('globalToastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3800);
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
