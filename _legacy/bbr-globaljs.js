/* ==========================================
   B&Br Technology — Global JavaScript
   ------------------------------------------
   WPCode: Add Snippet → JavaScript Snippet
   Name: "BBR Global JS"
   Insert: Auto Insert → Site Wide Footer
   Location: Run Everywhere
   ========================================== */

(function() {
  'use strict';

  var html = document.documentElement;
  var THEME_KEY = 'bbr-theme';

  /* ==========================================
     DARK MODE
     ========================================== */
  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch(e) {}
  }

  // Initialize
  var saved = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch(e) {}
  if (saved) {
    setTheme(saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  // Toggle clicks
  document.addEventListener('click', function(e) {
    var toggle = e.target.closest('.bbr-theme-toggle');
    if (toggle) {
      var current = html.getAttribute('data-theme') || 'light';
      setTheme(current === 'light' ? 'dark' : 'light');
      toggle.blur();
    }
  });


  /* ==========================================
     SCROLL — HEADER EFFECT
     ========================================== */
  var header = document.querySelector('.bbr-header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 30) {
        header.classList.add('bbr-header--scrolled');
      } else {
        header.classList.remove('bbr-header--scrolled');
      }
    }, { passive: true });
  }


  /* ==========================================
     MOBILE MENU
     ========================================== */
  var menuOpenIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  var menuCloseIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

  document.addEventListener('click', function(e) {
    var toggleBtn = e.target.closest('.bbr-mobile-toggle');
    if (toggleBtn) {
      var nav = document.querySelector('.bbr-mobile-nav');
      if (nav) {
        nav.classList.toggle('active');
        var isOpen = nav.classList.contains('active');
        toggleBtn.innerHTML = isOpen ? menuCloseIcon : menuOpenIcon;
        toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
    }

    // Close on link click
    if (e.target.closest('.bbr-mobile-nav a')) {
      var mobileNav = document.querySelector('.bbr-mobile-nav');
      var mobileBtn = document.querySelector('.bbr-mobile-toggle');
      if (mobileNav) {
        mobileNav.classList.remove('active');
        if (mobileBtn) {
          mobileBtn.innerHTML = menuOpenIcon;
          mobileBtn.setAttribute('aria-expanded', 'false');
        }
      }
    }
  });


  /* ==========================================
     SMOOTH SCROLL
     ========================================== */
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href^="#"]');
    if (link) {
      var href = link.getAttribute('href');
      if (href && href.length > 1) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var offset = 80;
          var y = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    }
  });


  /* ==========================================
     PRICING TABS
     ========================================== */
  document.addEventListener('click', function(e) {
    var tab = e.target.closest('.bbr-tab');
    if (!tab) return;

    var target = tab.getAttribute('data-tab');

    // Deactivate all tabs
    var allTabs = document.querySelectorAll('.bbr-tab');
    for (var i = 0; i < allTabs.length; i++) {
      allTabs[i].classList.remove('bbr-tab--active');
    }
    tab.classList.add('bbr-tab--active');

    // Switch panels
    var allPanels = document.querySelectorAll('.bbr-tab-panel');
    for (var j = 0; j < allPanels.length; j++) {
      allPanels[j].classList.remove('bbr-tab-panel--active');
    }
    var panel = document.getElementById('panel-' + target);
    if (panel) panel.classList.add('bbr-tab-panel--active');
  });


  /* ==========================================
     SCROLL REVEAL (Intersection Observer)
     ========================================== */
  function initReveal() {
    var reveals = document.querySelectorAll('.bbr-reveal, .bbr-stagger');
    if (!reveals.length || !('IntersectionObserver' in window)) {
      // Fallback: show everything
      for (var i = 0; i < reveals.length; i++) {
        reveals[i].classList.add('visible');
      }
      return;
    }

    var observer = new IntersectionObserver(function(entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('visible');
          observer.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    for (var j = 0; j < reveals.length; j++) {
      observer.observe(reveals[j]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }
  window.addEventListener('load', initReveal);


  /* ==========================================
     CONTACT FORM → Formspree (Enhanced)
     ========================================== */
  document.addEventListener('submit', function(e) {
    var form = e.target.closest('#bbr-contact-form');
    if (!form) return;

    e.preventDefault();

    var submitBtn = form.querySelector('.bbr-form__submit');
    submitBtn.classList.add('bbr-form__submit--sending');
    var textEl = submitBtn.querySelector('.bbr-form__submit-text');
    if (textEl) textEl.textContent = 'Sending...';
    else submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    var data = new FormData(form);
    var formData = {};
    data.forEach(function(value, key) { formData[key] = value; });
    var firstName = formData['first_name'] || '';

    fetch('https://formspree.io/f/mzdaenay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(function(res) {
      if (res.ok) {
        var greeting = firstName ? ('Thanks, ' + firstName + '!') : 'Message Received!';
        form.innerHTML =
          '<div class="bbr-form__success">' +
            '<div class="bbr-success-particles">' +
              '<span></span><span></span><span></span><span></span><span></span><span></span>' +
            '</div>' +
            '<div class="bbr-success-circle">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' +
            '</div>' +
            '<h3 class="bbr-heading" style="font-size:24px;margin-bottom:8px;">' + greeting + '</h3>' +
            '<p class="bbr-body" style="font-size:15px;max-width:380px;margin:0 auto 24px;line-height:1.65;">We\'ll review your project details and get back to you within 24 hours. Keep an eye on your inbox.</p>' +
            '<a href="/" class="bbr-btn bbr-btn--secondary" style="font-size:14px;padding:10px 24px;">Back to Home</a>' +
          '</div>';
      } else {
        submitBtn.classList.remove('bbr-form__submit--sending');
        if (textEl) textEl.textContent = 'Something went wrong — Try Again';
        else submitBtn.textContent = 'Something went wrong — Try Again';
        submitBtn.disabled = false;
      }
    })
    .catch(function() {
      submitBtn.classList.remove('bbr-form__submit--sending');
      if (textEl) textEl.textContent = 'Connection error — Try Again';
      else submitBtn.textContent = 'Connection error — Try Again';
      submitBtn.disabled = false;
    });
  });

})();