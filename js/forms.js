function applyIcon(el, iconName) {
  if (!el || !window.NuhaIcons || !window.NuhaIcons[iconName]) return;
  el.setAttribute('data-icon', iconName);
  el.innerHTML = window.NuhaIcons[iconName];
  var svg = el.querySelector('svg');
  if (svg) {
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
  }
}

function populateSelectIcons(selectEl) {
  selectEl.querySelectorAll('.custom-select-icon, .custom-select-option-icon').forEach(function (el) {
    applyIcon(el, el.getAttribute('data-icon'));
  });
}

function updateTriggerIcon(selectEl, iconName) {
  var trigger = selectEl.querySelector('.custom-select-trigger');
  var iconEl = selectEl.querySelector('.custom-select-icon');
  if (trigger) trigger.classList.remove('is-placeholder');
  if (iconEl) applyIcon(iconEl, iconName || 'layers');
}

function getOptionIconName(option) {
  var iconEl = option.querySelector('.custom-select-option-icon');
  return iconEl ? iconEl.getAttribute('data-icon') : '';
}

function getOptionLabel(option) {
  var labelEl = option.querySelector('.custom-select-option-label');
  return labelEl ? labelEl.textContent.trim() : option.textContent.trim();
}

function resetCustomSelect(selectEl) {
  if (!selectEl) return;
  var hidden = selectEl.querySelector('input[type="hidden"]');
  var valueEl = selectEl.querySelector('.custom-select-value');
  var placeholder = selectEl.getAttribute('data-placeholder') || 'Select an option';
  var trigger = selectEl.querySelector('.custom-select-trigger');
  var iconEl = selectEl.querySelector('.custom-select-icon');
  if (hidden) hidden.value = '';
  if (valueEl) {
    valueEl.textContent = placeholder;
    valueEl.classList.add('custom-select-placeholder');
  }
  if (iconEl) iconEl.innerHTML = '';
  if (trigger) trigger.classList.add('is-placeholder');
  selectEl.querySelectorAll('.custom-select-option').forEach(function (opt) {
    opt.classList.remove('is-selected', 'is-focused');
  });
  selectEl.classList.remove('is-open');
  if (trigger) trigger.setAttribute('aria-expanded', 'false');
}

function closeAllCustomSelects(except) {
  document.querySelectorAll('.custom-select.is-open').forEach(function (el) {
    if (el !== except) {
      el.classList.remove('is-open');
      var trigger = el.querySelector('.custom-select-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
      el.querySelectorAll('.custom-select-option.is-focused').forEach(function (opt) {
        opt.classList.remove('is-focused');
      });
    }
  });
}

function initCustomSelect(selectEl) {
  populateSelectIcons(selectEl);

  var hidden = selectEl.querySelector('input[type="hidden"]');
  var trigger = selectEl.querySelector('.custom-select-trigger');
  var valueEl = selectEl.querySelector('.custom-select-value');
  var options = selectEl.querySelectorAll('.custom-select-option');

  function setValue(option) {
    var val = option.getAttribute('data-value') || getOptionLabel(option);
    if (hidden) hidden.value = val;
    if (valueEl) {
      valueEl.textContent = getOptionLabel(option);
      valueEl.classList.remove('custom-select-placeholder');
    }
    updateTriggerIcon(selectEl, getOptionIconName(option));
    options.forEach(function (opt) {
      opt.classList.toggle('is-selected', opt === option);
      opt.classList.remove('is-focused');
    });
    selectEl.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.focus();
  }

  trigger.addEventListener('click', function () {
    var willOpen = !selectEl.classList.contains('is-open');
    closeAllCustomSelects(selectEl);
    selectEl.classList.toggle('is-open', willOpen);
    trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
  });

  options.forEach(function (option) {
    option.addEventListener('click', function () {
      setValue(option);
    });
    option.addEventListener('mouseenter', function () {
      options.forEach(function (opt) { opt.classList.remove('is-focused'); });
      option.classList.add('is-focused');
    });
  });

  trigger.addEventListener('keydown', function (e) {
    var focused = selectEl.querySelector('.custom-select-option.is-focused');
    var selectedIndex = focused ? Array.prototype.indexOf.call(options, focused) : -1;

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!selectEl.classList.contains('is-open')) {
        closeAllCustomSelects(selectEl);
        selectEl.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
      var next = e.key === 'ArrowDown'
        ? Math.min(selectedIndex + 1, options.length - 1)
        : Math.max(selectedIndex <= 0 ? 0 : selectedIndex - 1, 0);
      options.forEach(function (opt) { opt.classList.remove('is-focused'); });
      options[next].classList.add('is-focused');
      options[next].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (selectEl.classList.contains('is-open') && focused) {
        e.preventDefault();
        setValue(focused);
      } else if (e.key === ' ') {
        e.preventDefault();
        trigger.click();
      }
    } else if (e.key === 'Escape') {
      selectEl.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
}

var WEB3FORMS_ACCESS_KEY = '70216ef2-61d5-434e-998e-01e3098d0a53';
var WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

function buildFormPayload(form) {
  var payload = {};
  var formData = new FormData(form);
  formData.forEach(function (value, key) {
    if (key === 'botcheck') return;
    payload[key] = value;
  });
  if (!payload.access_key) {
    payload.access_key = WEB3FORMS_ACCESS_KEY;
  }
  if (!payload.subject) {
    payload.subject = form.getAttribute('data-subject') || 'Nuha Tutors Website Inquiry';
  }
  return payload;
}

function submitToWeb3Forms(payload) {
  return fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(function (res) { return res.json(); });
}

function handleFormSubmit(e, successMessage) {
  e.preventDefault();
  var form = e.target;
  var btn = form.querySelector('[type="submit"]');
  var originalLabel = btn ? (btn.dataset.label || btn.textContent) : '';

  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Sending...';
  }

  var payload = buildFormPayload(form);
  var formType = form.getAttribute('data-form-type') || form.id;
  var serverSave = Promise.resolve({ saved: false });

  if (window.NuhaSubmissions && window.NuhaSubmissions.postSubmission) {
    serverSave = window.NuhaSubmissions.postSubmission(formType, payload, {
      submittedAt: new Date().toISOString()
    });
  }

  Promise.all([submitToWeb3Forms(payload), serverSave])
    .then(function (results) {
      var web3Result = results[0];
      var stored = results[1];
      var saved = stored && stored.saved;
      if (web3Result.success) {
        alert(successMessage);
        form.reset();
        form.querySelectorAll('.custom-select').forEach(resetCustomSelect);
      } else if (saved) {
        alert('Your message was received. Email notification could not be sent — we will still review it.');
        form.reset();
        form.querySelectorAll('.custom-select').forEach(resetCustomSelect);
      } else {
        alert(web3Result.message || 'Unable to save your message. Please try again or contact us on WhatsApp.');
      }
    })
    .catch(function () {
      alert('Unable to send your message right now. Please try again or contact us on WhatsApp.');
    })
    .finally(function () {
      if (btn) {
        btn.disabled = false;
        btn.textContent = originalLabel || 'Submit';
      }
    });

  return false;
}

var CONTACT_AUDIENCE_COPY = {
  parent: {
    title: 'Parent Inquiry',
    intro: 'Tell us about your child\'s grade, subjects, and whether you prefer online or home tuition.',
    placeholder: 'Child\'s grade, subjects, preferred schedule, online or home tuition...'
  },
  teen: {
    title: 'Teen Inquiry',
    intro: 'Share your subjects, exam board, and what you need help with.',
    placeholder: 'Your grade, subjects, exam board, and what you need help with...'
  },
  student: {
    title: 'Teen Inquiry',
    intro: 'Share your subjects, exam board, and what you need help with.',
    placeholder: 'Your grade, subjects, exam board, and what you need help with...'
  }
};

function setContactAudience(role, options) {
  options = options || {};
  if (role === 'student') role = 'teen';

  var cards = document.querySelectorAll('.audience-card[data-audience]');
  var panels = document.querySelectorAll('.contact-role-form');
  if (!cards.length && !panels.length) return;

  cards.forEach(function (card) {
    var active = card.getAttribute('data-audience') === role;
    card.classList.toggle('is-selected', active);
    card.setAttribute('aria-pressed', active ? 'true' : 'false');
  });

  panels.forEach(function (panel) {
    var active = panel.getAttribute('data-role') === role;
    panel.classList.toggle('is-hidden', !active);
    panel.hidden = !active;
  });

  if (options.scroll !== false) {
    var formSection = document.getElementById('contact-form');
    if (formSection) {
      setTimeout(function () {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  }
}

function initContactAudience() {
  var cards = document.querySelectorAll('.audience-card[data-audience]');
  if (!cards.length) return;

  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      setContactAudience(card.getAttribute('data-audience'));
    });
  });

  var params = new URLSearchParams(window.location.search);
  var role = params.get('role');
  var initialRole = 'parent';
  if (role === 'teen' || role === 'student') initialRole = 'teen';
  else if (role === 'parent') initialRole = 'parent';
  setContactAudience(initialRole, { scroll: !!role });
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.form-submit').forEach(function (btn) {
    btn.dataset.label = btn.textContent;
  });

  document.querySelectorAll('.custom-select').forEach(initCustomSelect);
  initContactAudience();

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.custom-select')) {
      closeAllCustomSelects();
    }
  });
});
