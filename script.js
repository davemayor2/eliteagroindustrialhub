/* ==========================================================================
   Elite Agro Industrial Hub Ltd — Lightweight Interactive MVP Script
   ========================================================================== */

(function () {
  // 1. Sticky Header Scroll State
  const header = document.getElementById('siteHeader');
  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 36);
  };
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // 2. Mobile Navigation Drawer
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileBtn && mobileDrawer) {
    const toggleDrawer = (open) => {
      const next = typeof open === 'boolean' ? open : !mobileDrawer.classList.contains('is-open');
      mobileDrawer.classList.toggle('is-open', next);
      mobileBtn.classList.toggle('is-active', next);
      mobileBtn.setAttribute('aria-expanded', String(next));
      mobileDrawer.setAttribute('aria-hidden', String(!next));
    };

    mobileBtn.addEventListener('click', () => toggleDrawer());
    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => toggleDrawer(false));
    });
  }

  // 3. Interactive 4-Step "How It Works" Accordion
  const stepItems = document.querySelectorAll('.step-item');
  stepItems.forEach((item) => {
    const trigger = item.querySelector('.step-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', () => {
      stepItems.forEach((other) => {
        const isCurrent = other === item;
        other.classList.toggle('is-open', isCurrent);
        const btn = other.querySelector('.step-trigger');
        if (btn) btn.setAttribute('aria-expanded', String(isCurrent));
      });
    });
  });

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const willOpen = !item.classList.contains('is-open');
      faqItems.forEach((other) => {
        other.classList.remove('is-open');
        const otherBtn = other.querySelector('.faq-question');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });
      if (willOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 5. Package Quick-Select into Enquiry Form
  const packageSelect = document.getElementById('packageSelect');
  document.querySelectorAll('[data-select-package]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const value = btn.getAttribute('data-select-package');
      if (packageSelect && value) {
        packageSelect.value = value;
      }
    });
  });

  // 6. Copy Bank Account Number
  const copyBtn = document.getElementById('copyAccountBtn');
  const accountNumber = document.getElementById('accountNumber');
  if (copyBtn && accountNumber) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(accountNumber.textContent.trim());
        const original = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.textContent = original;
        }, 2000);
      } catch {
        copyBtn.textContent = '1310926873';
      }
    });
  }

  // 7. Official Estate Flyer Lightbox Modal
  const flyerModal = document.getElementById('flyerModal');
  const openTriggers = [
    document.getElementById('openFlyerBtn'),
    document.getElementById('flyerThumbBtn')
  ].filter(Boolean);
  const closeModalBtn = document.getElementById('closeFlyerModal');

  const setModalOpen = (open) => {
    if (!flyerModal) return;
    flyerModal.classList.toggle('is-open', open);
    flyerModal.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  openTriggers.forEach((el) => el.addEventListener('click', () => setModalOpen(true)));
  if (closeModalBtn) closeModalBtn.addEventListener('click', () => setModalOpen(false));
  if (flyerModal) {
    flyerModal.addEventListener('click', (e) => {
      if (e.target === flyerModal) setModalOpen(false);
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setModalOpen(false);
  });

  // 8. Enquiry Form Validation & Instant MVP Confirmation
  const enquiryForm = document.getElementById('enquiryForm');
  const formStatus = document.getElementById('formStatus');
  if (enquiryForm && formStatus) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = enquiryForm.fullName.value.trim();
      const phone = enquiryForm.phone.value.trim();
      const email = enquiryForm.email.value.trim();
      const chosen = enquiryForm.package.value;

      if (!name || !phone || !email || !email.includes('@')) {
        formStatus.textContent = 'Please enter your name, phone/WhatsApp number, and a valid email address.';
        formStatus.classList.add('is-error');
        return;
      }

      formStatus.classList.remove('is-error');
      formStatus.textContent = `Thank you, ${name}! Your enquiry for "${chosen}" has been received. Our Elite Agro advisory team will reach out shortly with subscription details and inspection dates.`;
      enquiryForm.reset();
    });
  }

  // 9. Footer Updates Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      const btnSpan = newsletterForm.querySelector('button span');
      if (input && input.value.includes('@')) {
        input.value = '';
        if (btnSpan) {
          const prev = btnSpan.textContent;
          btnSpan.textContent = 'Joined ✓';
          setTimeout(() => {
            btnSpan.textContent = prev;
          }, 2500);
        }
      }
    });
  }
})();
