/**
 * Nuha Tutors — contact form submission storage (Vercel Blob server)
 */
(function (global) {
  var API_URL = (global.location && global.location.origin ? global.location.origin : '') + '/api/submissions';

  function uid() {
    return 'sub_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 9);
  }

  function buildEntry(formType, payload, meta) {
    meta = meta || {};
    var entry = {
      id: uid(),
      formType: formType,
      status: 'new',
      submittedAt: meta.submittedAt || new Date().toISOString(),
      data: Object.assign({}, payload)
    };
    delete entry.data.access_key;
    delete entry.data.botcheck;
    return entry;
  }

  function pushToServer(entry) {
    return fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    })
      .then(function (res) { return res.ok; })
      .catch(function () { return false; });
  }

  function postSubmission(formType, payload, meta) {
    var entry = buildEntry(formType, payload, meta);
    return pushToServer(entry).then(function (saved) {
      return { entry: entry, saved: saved };
    });
  }

  global.NuhaSubmissions = {
    postSubmission: postSubmission
  };
})(window);
