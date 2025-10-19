document.addEventListener('DOMContentLoaded', () => {
  const $ = id => document.getElementById(id);

  function initAgeForm() {
    const ageForm = $('ageForm');
    if (!ageForm) return;

    ageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('name').value.trim();
      const age = parseInt($('age').value, 10);

      if (!name) { alert('Inserisci un nome.'); return; }
      if (Number.isNaN(age)) { alert('Inserisci un\'età valida.'); return; }
      if (age < 18) { alert('Devi avere almeno 18 anni per accedere.'); return; }

      localStorage.setItem('soso_user', name);
      window.location.href = 'shop.html';
    });
  }

  function initShopPersonalization() {
    const siteTitle = $('siteTitle');
    const user = localStorage.getItem('soso_user');
    if (siteTitle && user) siteTitle.textContent = `SOSO Shop - ${user}`;
  }

  function initStyleToggle() {
    const styleBtn = $('styleBtn');
    if (!styleBtn) return;
    styleBtn.addEventListener('click', () => {
      document.body.classList.toggle('alt-text');
    });
  }

  function initThemeToggle() {
    const themeBtn = $('themeBtn');
    if (!themeBtn) return;
    themeBtn.addEventListener('click', () => document.body.classList.toggle('dark'));
  }

  function initContactForm() {
    const contactForm = $('contactForm');
    const feedback = $('formFeedback');
    const entriesList = $('entries');
    if (!contactForm) return;

    const showFeedback = (msg, isError = false) => {
      if (!feedback) return;
      feedback.textContent = msg;
      feedback.className = 'feedback ' + (isError ? 'error' : 'success');
    };

    function loadEntries() {
      if (!entriesList) return;
      const list = JSON.parse(localStorage.getItem('soso_entries') || '[]');
      entriesList.innerHTML = '';
      list.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} (${item.email}): ${item.message}`;
        entriesList.appendChild(li);
      });
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('cname');
      const email = $('cemail');
      const message = $('cmessage');

      [name, email, message].forEach(f => f && f.classList.remove('invalid'));

      let hasError = false;
      if (!name || !name.value.trim()) { if (name) name.classList.add('invalid'); hasError = true; }
      if (!email || !email.value.trim() || !email.value.includes('@')) { if (email) email.classList.add('invalid'); hasError = true; }
      if (!message || !message.value.trim() || message.value.trim().length < 10) { if (message) message.classList.add('invalid'); hasError = true; }

      if (hasError) { showFeedback('Ci sono errori nel form. Controlla i campi evidenziati.', true); return; }

      showFeedback('Grazie! Il tuo messaggio è stato inviato con successo.', false);
      const entries = JSON.parse(localStorage.getItem('soso_entries') || '[]');
      entries.unshift({ name: name.value.trim(), email: email.value.trim(), message: message.value.trim(), date: new Date().toISOString() });
      localStorage.setItem('soso_entries', JSON.stringify(entries));
      loadEntries();
      contactForm.reset();
    });

    loadEntries();

  }

  initAgeForm();
  initShopPersonalization();
  initStyleToggle();
  initThemeToggle();
  initContactForm();

});
