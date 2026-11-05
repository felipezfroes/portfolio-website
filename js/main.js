/* =============================================
   FZF — scripts compartilhados (home e estudos de caso, PT e EN)
   O idioma vem do atributo lang da página: <html lang="pt-BR"> ou <html lang="en">.
============================================= */
(() => {
  'use strict';

  const LANG = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'pt';

  /* Textos exibidos pelo JavaScript em cada idioma */
  const I18N = {
    pt: {
      errName: 'Informe seu nome.',
      errEmailEmpty: 'Informe seu e-mail.',
      errEmailInvalid: 'Informe um e-mail válido, como nome@exemplo.com.',
      errSubject: 'Selecione um assunto.',
      errMessage: 'Escreva uma mensagem com pelo menos 10 caracteres.',
      reviewFields: 'Revise os campos destacados antes de enviar.',
      sending: 'Enviando…',
      success: 'Mensagem enviada! Obrigado pelo contato — vou responder pelo e-mail informado.',
      sendError: 'Não foi possível enviar sua mensagem agora.',
      sendErrorAlt: 'Tente novamente em instantes ou escreva para ',
      mailtoInfo: 'Seu aplicativo de e-mail deve abrir com a mensagem pronta — é só enviar por lá.',
      mailtoAlt: 'Se nada acontecer, escreva para ',
      subjectPrefix: '[Portfólio]',
      referenceLabel: 'Site atual ou referência',
      deadlineLabel: 'Prazo desejado',
      invalidId: 'data-formspree-id inválido; usando envio por e-mail (mailto). Valor recebido:',
    },
    en: {
      errName: 'Please enter your name.',
      errEmailEmpty: 'Please enter your email.',
      errEmailInvalid: 'Please enter a valid email, like name@example.com.',
      errSubject: 'Please choose a subject.',
      errMessage: 'Please write a message with at least 10 characters.',
      reviewFields: 'Please review the highlighted fields before sending.',
      sending: 'Sending…',
      success: "Message sent! Thanks for reaching out — I'll reply to the email you provided.",
      sendError: "Your message couldn't be sent right now.",
      sendErrorAlt: 'Please try again in a moment or email ',
      mailtoInfo: 'Your email app should open with the message ready — just hit send there.',
      mailtoAlt: 'If nothing happens, email ',
      subjectPrefix: '[Portfolio · EN]',
      referenceLabel: 'Current website or reference',
      deadlineLabel: 'Preferred timeline',
      invalidId: 'Invalid data-formspree-id; falling back to email (mailto). Received:',
    },
  };
  const t = I18N[LANG];

  /* =============================================
     ANALYTICS (preparado, inativo)
     Nenhum script de rastreamento é carregado por este site.
     Quando um serviço for configurado (ver docs/CONFIGURACAO.md),
     os eventos abaixo passam a ser enviados automaticamente.
  ============================================= */
  function track(event, props = {}) {
    try {
      if (typeof window.plausible === 'function') {
        window.plausible(event, { props });
      } else if (window.umami && typeof window.umami.track === 'function') {
        window.umami.track(event, props);
      } else if (typeof window.gtag === 'function') {
        window.gtag('event', event, props);
      }
    } catch (_) {
      /* analytics nunca deve quebrar a página */
    }
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');
    const label = link.dataset.trackLabel || link.textContent.trim().replace(/\s+/g, ' ') || link.getAttribute('aria-label') || href;
    const card = link.closest('[data-project]');
    const project = card ? card.dataset.project : document.body.dataset.project;

    if (link.hasAttribute('data-lang-switch')) {
      track('language_switch', { from: LANG, to: link.getAttribute('hreflang') });
    } else if (href.endsWith('.pdf')) {
      track('cv_download', { label, lang: LANG });
    } else if (href.includes('github.com')) {
      track('github_click', { label, project: project || 'geral', lang: LANG });
    } else if (project) {
      track('project_click', { label, project, lang: LANG });
    }
  });

  /* =============================================
     NAVEGAÇÃO — destaca a seção visível
  ============================================= */
  // Seções equivalentes entre a home em português e a home em inglês.
  const SECTION_MAP = {
    inicio: 'home',
    caminhos: 'start-here',
    projetos: 'projects',
    'outros-projetos': 'more-projects',
    servicos: 'services',
    sobre: 'about',
    habilidades: 'skills',
    conquistas: 'achievements',
    contato: 'contact',
  };
  let currentSection = '';

  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"], .mobile-nav a[href^="#"]');
  const sections = document.querySelectorAll('main section[id]');

  if (sections.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        currentSection = entry.target.id;

        const id = `#${entry.target.id}`;
        const hasLink = [...navLinks].some((a) => a.getAttribute('href') === id);
        if (hasLink) navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach((section) => observer.observe(section));
  }

  /* =============================================
     SELETOR DE IDIOMA
     Leva à mesma página no outro idioma e, na home, à mesma seção.
     Não há redirecionamento automático por idioma do navegador ou país.
  ============================================= */
  function counterpartSection(id) {
    if (!id) return '';
    if (LANG === 'pt') return SECTION_MAP[id] || '';
    return Object.keys(SECTION_MAP).find((key) => SECTION_MAP[key] === id) || '';
  }

  document.querySelectorAll('a[data-lang-switch]').forEach((link) => {
    link.addEventListener('click', () => {
      const target = counterpartSection(currentSection || location.hash.slice(1));
      if (target && target !== 'inicio' && target !== 'home') link.hash = target;
    });
  });

  /* =============================================
     FORMULÁRIO DE CONTATO
     - Com data-formspree-id preenchido: envia ao Formspree sem recarregar.
     - Sem ID: abre o aplicativo de e-mail com a mensagem pronta (mailto).
     O mesmo formulário do Formspree atende as duas versões do site;
     o campo oculto "language" indica de qual versão veio a mensagem.
  ============================================= */
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Aceita só o ID ("xyzabcde") ou a URL completa ("https://formspree.io/f/xyzabcde").
  const rawFormspree = (form.dataset.formspreeId || '').trim();
  const idMatch = rawFormspree.match(/^(?:https:\/\/formspree\.io\/f\/)?([A-Za-z0-9]+)\/?$/);
  const formspreeId = idMatch ? idMatch[1] : '';
  const usesFormspree = Boolean(formspreeId);
  const fallbackEmail = form.dataset.fallbackEmail;

  if (rawFormspree && !usesFormspree) {
    console.warn(t.invalidId, rawFormspree);
  }

  const submitBtn = form.querySelector('.form-submit');
  const submitLabel = submitBtn.querySelector('.form-submit-label');
  const submitIcon = submitBtn.querySelector('i');
  const status = form.querySelector('.form-status');
  const defaultLabel = submitLabel.textContent;
  let isSending = false;

  if (usesFormspree) {
    form.action = `https://formspree.io/f/${formspreeId}`;
    form.removeAttribute('enctype');
  }

  /* Assunto pré-selecionado e campos opcionais de orçamento
     - Links com data-contact-subject="orcamento" (chave do data-key da opção) escolhem o assunto.
     - O endereço ?assunto=orcamento#contato (ou ?topic=…) faz o mesmo ao abrir a página.
     - Opções com data-extra mostram os campos opcionais; ocultos, eles ficam desativados
       e não são enviados. */
  const subjectSelect = form.querySelector('#cf-subject');
  const extraGroup = form.querySelector('#cf-extra');
  const extraInputs = extraGroup ? [...extraGroup.querySelectorAll('input')] : [];

  function updateExtraFields() {
    if (!extraGroup || !subjectSelect) return;
    const option = subjectSelect.selectedOptions[0];
    const show = Boolean(option && option.hasAttribute('data-extra'));
    extraGroup.hidden = !show;
    extraInputs.forEach((input) => { input.disabled = !show; });
  }

  function selectSubject(key) {
    if (!subjectSelect || !key) return;
    const option = subjectSelect.querySelector(`option[data-key="${CSS.escape(key)}"]`);
    if (!option) return;
    subjectSelect.value = option.value;
    if (subjectSelect.getAttribute('aria-invalid') === 'true') validateField(subjectSelect);
    updateExtraFields();
  }

  form.querySelectorAll('.form-privacy-mode').forEach((el) => {
    el.hidden = el.dataset.mode !== (usesFormspree ? 'formspree' : 'mailto');
  });

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const rules = {
    name: (v) => (v.length < 2 ? t.errName : ''),
    email: (v) => {
      if (!v) return t.errEmailEmpty;
      return EMAIL_PATTERN.test(v) ? '' : t.errEmailInvalid;
    },
    subject: (v) => (v ? '' : t.errSubject),
    message: (v) => (v.length < 10 ? t.errMessage : ''),
  };

  function validateField(field) {
    const rule = rules[field.name];
    if (!rule) return true;

    const message = rule(field.value.trim());
    const errorEl = document.getElementById(`${field.id}-error`);

    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (errorEl) errorEl.textContent = message;
    return !message;
  }

  const fields = [...form.querySelectorAll('input[name], select[name], textarea[name]')]
    .filter((field) => rules[field.name]);

  fields.forEach((field) => {
    field.addEventListener('blur', () => {
      if (field.value.trim() || field.getAttribute('aria-invalid')) validateField(field);
    });
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validateField(field);
    });
  });

  if (subjectSelect) {
    subjectSelect.addEventListener('change', updateExtraFields);

    document.querySelectorAll('a[data-contact-subject]').forEach((link) => {
      link.addEventListener('click', () => selectSubject(link.dataset.contactSubject));
    });

    const params = new URLSearchParams(window.location.search);
    selectSubject(params.get('assunto') || params.get('topic'));
    updateExtraFields();
  }

  // emailPrefix: quando informado, acrescenta um link para o e-mail como alternativa.
  function showStatus(type, text, emailPrefix = '') {
    status.className = `form-status is-visible ${type}`;
    status.textContent = text;

    if (emailPrefix) {
      const link = document.createElement('a');
      link.href = `mailto:${fallbackEmail}`;
      link.textContent = fallbackEmail;
      status.append(` ${emailPrefix}`, link, '.');
    }
  }

  function setLoading(loading) {
    isSending = loading;
    submitBtn.disabled = loading;
    submitBtn.classList.toggle('is-loading', loading);
    form.setAttribute('aria-busy', String(loading));
    submitLabel.textContent = loading ? t.sending : defaultLabel;
    submitIcon.className = loading ? 'bx bx-loader-alt' : 'bx bx-send';
  }

  function buildSubject(data) {
    return `${t.subjectPrefix} ${data.get('subject')} — ${data.get('name')}`;
  }

  function sendWithMailto(data) {
    const extras = [
      data.get('reference') ? `${t.referenceLabel}: ${data.get('reference')}` : '',
      data.get('deadline') ? `${t.deadlineLabel}: ${data.get('deadline')}` : '',
    ].filter(Boolean).join('\n');
    const body = `${data.get('message')}${extras ? `\n\n${extras}` : ''}\n\n—\n${data.get('name')}\n${data.get('email')}`;
    window.location.href = `mailto:${fallbackEmail}?subject=${encodeURIComponent(buildSubject(data))}&body=${encodeURIComponent(body)}`;
    showStatus('info', t.mailtoInfo, t.mailtoAlt);
  }

  async function sendWithFormspree(data) {
    setLoading(true);
    status.className = 'form-status';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        form.reset();
        updateExtraFields();
        fields.forEach((field) => field.removeAttribute('aria-invalid'));
        showStatus('success', t.success);
        track('contact_form_submit', { subject: data.get('subject'), lang: LANG });
        status.focus();
        return;
      }

      const result = await response.json().catch(() => null);
      const detail = result && Array.isArray(result.errors)
        ? result.errors.map((err) => err.message).join(' ')
        : '';
      throw new Error(detail);
    } catch (error) {
      // Falhas de rede (TypeError) não têm detalhe útil; erros do Formspree trazem a mensagem do serviço.
      const detail = error.name !== 'TypeError' && error.message ? ` (${error.message})` : '';
      showStatus('error', `${t.sendError}${detail}`, t.sendErrorAlt);
      status.focus();
    } finally {
      setLoading(false);
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isSending) return;

    const invalid = fields.filter((field) => !validateField(field));
    if (invalid.length) {
      showStatus('error', t.reviewFields);
      invalid[0].focus();
      return;
    }

    const data = new FormData(form);

    // Anti-spam: robôs costumam preencher o campo invisível.
    if (data.get('_gotcha')) return;

    data.set('_subject', buildSubject(data));

    if (usesFormspree) {
      sendWithFormspree(data);
    } else {
      sendWithMailto(data);
    }
  });
})();
