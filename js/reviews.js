(function () {
  'use strict';

  var sliderEl = document.getElementById('reviewsSlider');
  if (!sliderEl) return;

  var countryFlags = {
    Pakistan: '🇵🇰', India: '🇮🇳', 'United States': '🇺🇸', 'United Kingdom': '🇬🇧',
    Bangladesh: '🇧🇩', Philippines: '🇵🇭', Canada: '🇨🇦', Australia: '🇦🇺',
    'United Arab Emirates': '🇦🇪', Nigeria: '🇳🇬', Spain: '🇪🇸', Germany: '🇩🇪'
  };

  var defaultReviews = [
    { id: 1, firstName: 'Olivia', lastName: 'Parker', country: 'United Kingdom', flag: '🇬🇧', rating: 5, text: 'Very structured platform, payments are clear, support team responds on time. I got two regular students within a month.', reply: 'Thank you for your kind feedback. We\'re glad the structure and support system are working well for you.' },
    { id: 2, firstName: 'Arjun', lastName: 'Mehta', country: 'India', flag: '🇮🇳', rating: 5, text: 'Students are genuine and payment process is transparent. Everything works according to policy.', reply: 'We appreciate your positive words. Transparency is central to how we operate.' },
    { id: 3, firstName: 'Fatima', lastName: 'Rahman', country: 'Bangladesh', flag: '🇧🇩', rating: 5, text: 'Support team always communicates clearly before demo classes. Process feels organized.', reply: 'Thank you for your feedback. Clear communication is our priority.' },
    { id: 4, firstName: 'Daniel', lastName: 'Smith', country: 'United States', flag: '🇺🇸', rating: 5, text: 'Professional marketplace with serious students and fair policies.', reply: 'We\'re pleased you value the professionalism of our system.' },
    { id: 5, firstName: 'Ayesha', lastName: 'Khan', country: 'Pakistan', flag: '🇵🇰', rating: 5, text: 'Platform is organized and students are serious. Payment process is smooth.', reply: 'We\'re glad you find Nuha Tutors organized and reliable.' },
    { id: 6, firstName: 'Ahmed', lastName: 'Raza', country: 'Pakistan', flag: '🇵🇰', rating: 5, text: 'Got my first student quickly. Support guided me through everything professionally.', reply: 'Smooth onboarding is key for new tutors. Thank you!' },
    { id: 7, firstName: 'Maria', lastName: 'Santos', country: 'Philippines', flag: '🇵🇭', rating: 5, text: 'Been teaching 8 months here. Students are respectful and process is smooth.', reply: 'We appreciate your continued dedication.' },
    { id: 8, firstName: 'Priya', lastName: 'Sharma', country: 'India', flag: '🇮🇳', rating: 5, text: 'Stayed consistent and now teaching three regular students. Grateful I didn\'t give up.', reply: 'Persistence truly makes a difference on our platform.' }
  ];

  var storageKey = 'nuhaTutorReviewsListV1';
  var reviewsArray;
  try {
    var saved = localStorage.getItem(storageKey);
    reviewsArray = saved ? JSON.parse(saved) : defaultReviews.slice();
  } catch (e) {
    reviewsArray = defaultReviews.slice();
  }

  for (var i = reviewsArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = reviewsArray[i]; reviewsArray[i] = reviewsArray[j]; reviewsArray[j] = t;
  }

  var autoSlideTimer;
  var selectedRating = 5;

  function getColorForRating(r) {
    var theme = window.NuhaTheme || {};
    if (r >= 5) return theme.accent || '#e07a5f';
    if (r === 4) return theme.primaryLight || '#4a6fa5';
    if (r === 3) return '#c9a227';
    if (r === 2) return '#d4854a';
    return '#b85454';
  }

  function getStarSVG(filled, color) {
    var muted = (window.NuhaTheme && window.NuhaTheme.starMuted) || '#d0d8e0';
    return '<svg class="bt-safe-svg" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" fill="' + (filled ? color : muted) + '"/></svg>';
  }

  function generateStarsHTML(rating) {
    var c = getColorForRating(rating), html = '';
    for (var s = 1; s <= 5; s++) html += getStarSVG(s <= rating, c);
    return html;
  }

  function getScrollAmount() {
    var card = sliderEl.querySelector('.review-card');
    return card ? card.getBoundingClientRect().width + 20 : 0;
  }

  function renderCards() {
    sliderEl.innerHTML = '';
    var infinite = reviewsArray.concat(reviewsArray, reviewsArray);
    infinite.forEach(function (rev) {
      var card = document.createElement('div');
      card.className = 'review-card';
      card.innerHTML =
        '<div class="reviewer-info"><span class="flag-icon">' + rev.flag + '</span>' +
        '<div class="reviewer-name-country"><strong>' + rev.firstName + ' ' + rev.lastName + '</strong>' +
        '<span>' + rev.country + '</span></div></div>' +
        '<div class="bt-custom-star-row">' + generateStarsHTML(rev.rating) + '</div>' +
        '<p class="review-snippet">' + rev.text + '</p>' +
        '<span class="read-more-link">READ FULL &gt;</span>';
      card.addEventListener('click', function () { openReadFull(rev); });
      sliderEl.appendChild(card);
    });
    setTimeout(function () {
      var amt = getScrollAmount();
      if (amt) {
        sliderEl.style.scrollBehavior = 'auto';
        sliderEl.scrollLeft = reviewsArray.length * amt;
        sliderEl.style.scrollBehavior = 'smooth';
      }
    }, 100);
  }

  function scrollSlider(dir, isAuto) {
    var amt = getScrollAmount();
    if (!amt) return;
    var single = reviewsArray.length * amt;
    if (!isAuto) { stopAutoSlide(); setTimeout(startAutoSlide, 5000); }
    sliderEl.style.scrollBehavior = 'auto';
    if (dir === 1 && sliderEl.scrollLeft >= single * 2 - amt) sliderEl.scrollLeft -= single;
    else if (dir === -1 && sliderEl.scrollLeft <= amt) sliderEl.scrollLeft += single;
    sliderEl.style.scrollBehavior = 'smooth';
    sliderEl.scrollBy({ left: dir * amt });
  }

  function startAutoSlide() { stopAutoSlide(); autoSlideTimer = setInterval(function () { scrollSlider(1, true); }, 3500); }
  function stopAutoSlide() { clearInterval(autoSlideTimer); }

  window.scrollSlider = function (dir) { scrollSlider(dir, false); };
  window.openModal = function (id) {
    document.getElementById(id).classList.add('open');
    stopAutoSlide();
  };

  window.closeModal = function (id) {
    document.getElementById(id).classList.remove('open');
    startAutoSlide();
  };

  function openReadFull(rev) {
    document.getElementById('readHeading').textContent = 'Review by ' + rev.firstName + ' ' + rev.lastName;
    document.getElementById('readName').textContent = rev.firstName + ' ' + rev.lastName;
    document.getElementById('readCountry').textContent = rev.country;
    document.getElementById('readFlag').textContent = rev.flag;
    document.getElementById('readStars').innerHTML = generateStarsHTML(rev.rating);
    document.getElementById('readText').textContent = '"' + rev.text + '"';
    var replyBox = document.getElementById('brandReplyBox');
    if (rev.reply) {
      document.getElementById('brandReplyText').textContent = rev.reply;
      replyBox.style.display = 'block';
    } else replyBox.style.display = 'none';
    openModal('readModal');
  }

  function initStarPicker() {
    var wStars = document.getElementById('wStars');
    if (!wStars) return;
    var stars = wStars.querySelectorAll('svg');
    stars.forEach(function (star, idx) {
      star.style.cursor = 'pointer';
      star.addEventListener('click', function () {
        selectedRating = idx + 1;
        document.getElementById('wRatingValue').value = selectedRating;
        var c = getColorForRating(selectedRating);
        stars.forEach(function (s, i) {
          s.querySelector('path').setAttribute('fill', i < selectedRating ? c : ((window.NuhaTheme && window.NuhaTheme.starMuted) || '#d0d8e0'));
        });
      });
    });
    var c5 = getColorForRating(5);
    stars.forEach(function (s) { s.querySelector('path').setAttribute('fill', c5); });
  }

  function saveReviews() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(reviewsArray));
    } catch (err) {
      /* ignore quota errors */
    }
  }

  window.handleReviewSubmit = function (e) {
    e.preventDefault();
    var firstName = document.getElementById('wFirstName').value.trim();
    var lastName = document.getElementById('wLastName').value.trim();
    var country = document.getElementById('wCountry').value;
    var email = document.getElementById('wEmail').value.trim();
    var text = document.getElementById('wReview').value.trim();
    var rating = parseInt(document.getElementById('wRatingValue').value, 10) || 5;

    if (!firstName || !lastName || !country || !email || text.length < 10) return;

    var newReview = {
      id: Date.now(),
      firstName: firstName,
      lastName: lastName,
      country: country,
      flag: countryFlags[country] || '🌍',
      rating: Math.min(5, Math.max(1, rating)),
      text: text,
      reply: '',
      submittedAt: new Date().toISOString()
    };

    reviewsArray.unshift(newReview);
    saveReviews();
    renderCards();
    closeModal('writeModal');
    openModal('successModal');
    document.getElementById('reviewForm').reset();
    selectedRating = 5;
    initStarPicker();
  };

  sliderEl.addEventListener('mouseenter', stopAutoSlide);
  sliderEl.addEventListener('mouseleave', startAutoSlide);

  document.addEventListener('DOMContentLoaded', initStarPicker);
  renderCards();
  startAutoSlide();
})();
