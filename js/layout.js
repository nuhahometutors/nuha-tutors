(function () {
  'use strict';

  var TUTOR_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd6H73Y-ahtUKsvBSgN3bIW47xA0YVbk180vUSJ6Eo2LdrG6A/viewform';

  var PAGES = {
    home: 'index.html',
    'about-us': 'about-us.html',
    'online-tutoring': 'online-tutoring.html',
    'home-tuition': 'home-tuition.html',
    'o-level-tuition': 'o-level-tuition.html',
    'igcse-tuition': 'igcse-tuition.html',
    'as-level-tuition': 'as-level-tuition.html',
    'oxford-aqa-tuition': 'oxford-aqa-tuition.html',
    'pearson-edexcel-tuition': 'pearson-edexcel-tuition.html',
    'ib-tuition': 'ib-tuition.html',
    'caie-tuition': 'caie-tuition.html',
    'bise-tuition': 'bise-tuition.html',
    'entrance-exam-prep': 'entrance-exam-prep.html',
    'professional-writing': 'professional-writing.html',
    'become-a-tutor': TUTOR_FORM_URL,
    jobs: TUTOR_FORM_URL,
    registration: TUTOR_FORM_URL,
    contact: 'contact.html',
    disclaimer: 'disclaimer.html',
    definitions: 'definitions.html',
    'privacy-policy': 'privacy-policy.html',
    'terms-and-conditions': 'terms-and-conditions.html',
    liabilities: 'liabilities.html',
    circumvention: 'circumvention.html',
    conduct: 'conduct.html',
    transition: 'transition.html',
    shortlisting: 'shortlisting.html',
    'schedule-of-charges': 'schedule-of-charges.html'
  };

  var CONTACT = {
    email: 'NuhaTutors@gmail.com',
    whatsapp: ['03264702455', '03264702467'],
    tutorWhatsApp: '03264702455',
    tutorCtaLabel: 'Get Your Tutor Now',
    address: 'DHA Phase 03, Y-Block Lahore, Punjab Pakistan',
    social: [
      { name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/NuhaTutors' },
      { name: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/NuhaTutors' },
      { name: 'YouTube', icon: 'youtube', url: 'https://www.youtube.com/@NuhaTutors' },
      { name: 'TikTok', icon: 'tiktok', url: 'https://www.tiktok.com/@NuhaTutors' },
      { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/company/NuhaTutors' },
      { name: 'Reddit', icon: 'reddit', url: 'https://www.reddit.com/user/NuhaTutors' },
      { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com/NuhaTutors' }
    ]
  };

  var SOCIAL_ICONS = {
    instagram: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    facebook: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>',
    youtube: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    tiktok: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>',
    linkedin: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.063 2.063 0 01-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    reddit: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 000 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 00.029-.463.33.33 0 00-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 00-.232-.095z"/></svg>',
    twitter: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>'
  };

  function renderSiteLogo(linkClass) {
    linkClass = linkClass || 'logo-link';
    return (
      '<a href="index.html" class="' + linkClass + '" title="Nuha Tutors">' +
        '<span class="logo-text">Nuha <span>Tutors</span></span>' +
      '</a>'
    );
  }

  function waLink(number) {
    var digits = number.replace(/[^\d]/g, '');
    if (digits.charAt(0) === '0') digits = '92' + digits.slice(1);
    return 'https://wa.me/' + digits;
  }

  function telLink(number) {
    var digits = number.replace(/[^\d]/g, '');
    if (digits.charAt(0) === '0') digits = '92' + digits.slice(1);
    return 'tel:+' + digits;
  }

  function formatPhoneDisplay(number) {
    var digits = number.replace(/\s/g, '');
    if (digits.length === 11 && digits.charAt(0) === '0') {
      return digits.slice(0, 4) + ' ' + digits.slice(4);
    }
    return number;
  }

  function primaryPhone() {
    return CONTACT.whatsapp[0] || CONTACT.tutorWhatsApp;
  }

  function tutorCtaLink() {
    return waLink(CONTACT.tutorWhatsApp);
  }

  function renderSocialIcons() {
    return CONTACT.social.map(function (s) {
      var svg = SOCIAL_ICONS[s.icon] || '';
      return (
        '<a href="' + s.url + '" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="' + s.name + '" title="' + s.name + '">' +
          '<span class="social-icon" aria-hidden="true">' + svg + '</span>' +
        '</a>'
      );
    }).join('');
  }

  function renderContactItems() {
    var waHtml = CONTACT.whatsapp.map(function (num) {
      return '<a href="' + waLink(num) + '" target="_blank" rel="noopener noreferrer">' + formatPhoneDisplay(num) + '</a>';
    }).join('<br>');

    return (
      '<div class="contact-item">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>' +
        '<div><strong>Email</strong><br><a href="mailto:' + CONTACT.email + '">' + CONTACT.email + '</a></div>' +
      '</div>' +
      '<div class="contact-item">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>' +
        '<div><strong>WhatsApp</strong><br>' + waHtml + '</div>' +
      '</div>' +
      '<div class="contact-item">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
        '<div><strong>Address</strong><br>' + CONTACT.address + '</div>' +
      '</div>' +
      '<div class="contact-social">' +
        '<div class="social-links social-links-icons">' + renderSocialIcons() + '</div>' +
      '</div>'
    );
  }

  function renderFooterContact() {
    var waHtml = CONTACT.whatsapp.map(function (num) {
      return '<a href="' + waLink(num) + '" target="_blank" rel="noopener noreferrer">' + formatPhoneDisplay(num) + '</a>';
    }).join(' · ');

    return (
      '<div class="footer-contact-col">' +
        '<h4>Contact</h4>' +
        '<p class="footer-contact-line"><a href="mailto:' + CONTACT.email + '">' + CONTACT.email + '</a></p>' +
        '<p class="footer-contact-line">WhatsApp: ' + waHtml + '</p>' +
        '<p class="footer-contact-line">' + CONTACT.address + '</p>' +
        '<div class="footer-social social-links-icons">' + renderSocialIcons() + '</div>' +
      '</div>'
    );
  }

  function externalLinkAttrs(href) {
    return href && href.indexOf('http') === 0 ? ' target="_blank" rel="noopener noreferrer"' : '';
  }

  function link(page, label, activePage) {
    var href = PAGES[page];
    var cls = page === activePage ? ' class="active"' : '';
    return '<a href="' + href + '"' + cls + externalLinkAttrs(href) + '>' + label + '</a>';
  }

  var SERVICE_LINKS = [
    { href: 'online-tutoring.html', label: 'Online Tutoring' },
    { href: 'home-tuition.html', label: 'Home Tuition' },
    { href: 'professional-writing.html', label: 'Professional Writing' },
    { href: 'o-level-tuition.html', label: 'O-Level Tutoring' },
    { href: 'o-level-tuition.html#a-levels', label: 'A-Levels Tutoring' },
    { href: 'as-level-tuition.html', label: 'AS-Level Tutoring' },
    { href: 'igcse-tuition.html', label: 'IGCSE Tutoring' },
    { href: 'oxford-aqa-tuition.html', label: 'Oxford AQA Tutoring' },
    { href: 'pearson-edexcel-tuition.html', label: 'Pearson Edexcel Tutoring' },
    { href: 'ib-tuition.html', label: 'IB Tutoring' },
    { href: 'caie-tuition.html', label: 'CAIE Tutoring' },
    { href: 'bise-tuition.html', label: 'BISE Matric & Intermediate' },
    { href: 'entrance-exam-prep.html', label: 'Entrance & Competitive Exam Prep' }
  ];

  function renderServicesSubMenu() {
    return SERVICE_LINKS.map(function (item) {
      return '<li><a href="' + item.href + '">' + item.label + '</a></li>';
    }).join('');
  }

  function renderHeader(activePage) {
    var phone = primaryPhone();
    var phoneDisplay = formatPhoneDisplay(phone);
    var phoneHref = telLink(phone);
    return (
      '<div class="site-header-stack">' +
        '<div class="header-topbar">' +
          '<div class="header-topbar-inner">' +
            '<a href="' + phoneHref + '" class="header-topbar-phone">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>' +
              '<span>' + phoneDisplay + '</span>' +
            '</a>' +
            '<div class="header-topbar-social social-links-icons">' + renderSocialIcons() + '</div>' +
          '</div>' +
        '</div>' +
      '<header class="header" id="header">' +
        '<div class="header-inner">' +
          '<div class="logo">' + renderSiteLogo('logo-link') + '</div>' +
          '<a href="' + phoneHref + '" class="header-phone-link">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>' +
            '<span>' + phoneDisplay + '</span>' +
          '</a>' +
          '<nav class="nav-desktop">' +
            '<ul class="nav-main">' +
              '<li>' + link('home', 'Home', activePage) + '</li>' +
              '<li>' + link('about-us', 'About Us', activePage) + '</li>' +
              '<li class="has-dropdown">' +
                '<a href="index.html#Services">Services</a>' +
                '<ul class="sub-menu">' +
                  renderServicesSubMenu() +
                '</ul>' +
              '</li>' +
              '<li>' + link('become-a-tutor', 'Become a Tutor', activePage) + '</li>' +
              '<li class="has-dropdown">' +
                '<a href="#">Terms</a>' +
                '<ul class="sub-menu">' +
                  '<li><a href="disclaimer.html">Disclaimer</a></li>' +
                  '<li><a href="definitions.html">Definitions</a></li>' +
                  '<li><a href="privacy-policy.html">Privacy Policy</a></li>' +
                  '<li><a href="terms-and-conditions.html">General</a></li>' +
                  '<li><a href="liabilities.html">Liabilities</a></li>' +
                  '<li><a href="circumvention.html">Circumvention</a></li>' +
                  '<li><a href="conduct.html">Conduct</a></li>' +
                  '<li><a href="transition.html">Transition</a></li>' +
                  '<li><a href="shortlisting.html">Shortlisting</a></li>' +
                  '<li><a href="schedule-of-charges.html">Schedule Of Charges</a></li>' +
                '</ul>' +
              '</li>' +
              '<li><a href="' + tutorCtaLink() + '" class="btn-primary" target="_blank" rel="noopener noreferrer">' + CONTACT.tutorCtaLabel + '</a></li>' +
            '</ul>' +
          '</nav>' +
          '<button class="menu-toggle" id="menuToggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">' +
            '<span class="icon-open" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg></span>' +
            '<span class="icon-close" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></span>' +
          '</button>' +
        '</div>' +
      '</header>' +
      '</div>' +
      '<div class="mobile-overlay" id="mobileOverlay"></div>' +
      '<nav class="mobile-menu" id="mobileMenu" aria-label="Mobile navigation">' +
        '<div class="mobile-menu-bar">' +
          '<a href="index.html" class="logo-link logo-link-mobile">' +
            '<span class="logo-text">Nuha <span>Tutors</span></span>' +
          '</a>' +
          '<button class="mobile-menu-close" id="menuClose" type="button" aria-label="Close menu">' +
            '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>' +
          '</button>' +
        '</div>' +
        '<a href="' + phoneHref + '" class="mobile-menu-phone">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>' +
          phoneDisplay +
        '</a>' +
        '<ul class="nav-main">' +
          '<li><a href="index.html">Home</a></li>' +
          '<li><a href="about-us.html">About Us</a></li>' +
          '<li class="has-dropdown"><a href="index.html#Services">Services</a>' +
            '<ul class="sub-menu">' +
              renderServicesSubMenu() +
            '</ul></li>' +
          '<li><a href="' + TUTOR_FORM_URL + '"' + externalLinkAttrs(TUTOR_FORM_URL) + '>Become a Tutor</a></li>' +
          '<li class="has-dropdown"><a href="#">Terms</a>' +
            '<ul class="sub-menu">' +
              '<li><a href="disclaimer.html">Disclaimer</a></li>' +
              '<li><a href="definitions.html">Definitions</a></li>' +
              '<li><a href="privacy-policy.html">Privacy Policy</a></li>' +
              '<li><a href="terms-and-conditions.html">General</a></li>' +
              '<li><a href="schedule-of-charges.html">Schedule Of Charges</a></li>' +
            '</ul></li>' +
          '<li><a href="' + tutorCtaLink() + '" class="btn-primary" target="_blank" rel="noopener noreferrer">' + CONTACT.tutorCtaLabel + '</a></li>' +
        '</ul>' +
      '</nav>'
    );
  }

  function renderFooter() {
    return (
      '<footer id="footer">' +
        '<div class="footer-1">' +
          '<div class="footer-logo">' + renderSiteLogo('logo-link logo-link-footer') + '</div>' +
          '<div>' +
            '<h2 class="footer-tagline">Your Trusted Global Partner for Learning &amp; Child Development</h2>' +
            '<p>From comprehensive home schooling and premium tutoring (Online &amp; In-Person) to specialized speech therapy and daycare services. We bridge the gap with top-tier professionals tailored to your family\'s exact needs, ensuring growth at every step.</p>' +
          '</div>' +
        '</div>' +
        '<div class="footer-2">' +
          '<div>' +
            '<a href="online-tutoring.html">Online Tutoring Services</a>' +
            '<a href="professional-writing.html">Professional Writing Services</a>' +
            '<a href="' + TUTOR_FORM_URL + '"' + externalLinkAttrs(TUTOR_FORM_URL) + '>Become a Tutor</a>' +
          '</div>' +
          '<div>' + renderFooterContact() + '</div>' +
          '<div>' +
            '<a href="o-level-tuition.html">O/A Levels Tutoring</a>' +
            '<a href="privacy-policy.html">Privacy Policy</a>' +
            '<a href="terms-and-conditions.html">Terms and Conditions</a>' +
          '</div>' +
        '</div>' +
        '<div class="footer-innovators-wrap">' +
          '<div class="footer-innovators">' +
            '<div class="content-footer">' +
              '<h2 class="top-footer">Nurturing Creative Talents</h2>' +
              '<h2 class="second-heading">Building Tomorrow\'s Leaders</h2>' +
              '<p>The ultimate global network guiding struggling students straight to the top.</p>' +
            '</div>' +
            '<div class="footer-button">' +
              '<a href="contact.html" class="footer-btn">Contact Us</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="absolute-footer">' +
          '<div class="container">' +
            '<div class="copyright-footer"><span class="copyright-symbol">&copy;</span> ' + new Date().getFullYear() + ' Nuha Tutors. All Rights Reserved.</div>' +
            '<div class="footer-bottom-social social-links-icons">' + renderSocialIcons() + '</div>' +
          '</div>' +
        '</div>' +
      '</footer>'
    );
  }

  function renderLoader() {
    return (
      '<div class="page-loader">' +
        '<div class="page-loader-brand logo-loader">' +
          '<span class="logo-text logo-text-lg">Nuha <span>Tutors</span></span>' +
        '</div>' +
        '<div class="loader-dots" aria-hidden="true"><span></span><span></span><span></span></div>' +
      '</div>'
    );
  }

  function applyDynamicContactLinks() {
    document.querySelectorAll('[data-nuha-wa-link]').forEach(function (el) {
      el.href = tutorCtaLink();
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    });
  }

  function tutorFormLink() {
    return TUTOR_FORM_URL;
  }

  window.NuhaContact = {
    whatsapp: function () { return CONTACT.whatsapp.slice(); },
    tutorWhatsApp: function () { return CONTACT.tutorWhatsApp; },
    waLink: waLink,
    telLink: telLink,
    formatPhoneDisplay: formatPhoneDisplay,
    tutorCtaLink: tutorCtaLink,
    tutorFormLink: tutorFormLink
  };

  document.addEventListener('DOMContentLoaded', function () {
    var page = document.body.getAttribute('data-page') || 'home';
    var headerEl = document.getElementById('site-header');
    var footerEl = document.getElementById('site-footer');
    var loaderEl = document.getElementById('site-loader');

    if (loaderEl) loaderEl.innerHTML = renderLoader();
    if (headerEl) headerEl.innerHTML = renderHeader(page);
    if (footerEl) footerEl.innerHTML = renderFooter();
    var contactDetails = document.getElementById('contact-info-details');
    if (contactDetails) contactDetails.innerHTML = renderContactItems();
    applyDynamicContactLinks();
    document.dispatchEvent(new CustomEvent('site:layout-ready'));
  });
})();
