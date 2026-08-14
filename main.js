/**
 * main.js — Conecta Vida
 *
 * Não existe servidor por trás disso (site 100% estático, pronto pro
 * GitHub Pages). O que dá a sensação de "backend" é a combinação de:
 *   1) conteúdo vindo de SITE_DATA (data.js), não fixo no HTML;
 *   2) progresso/leads salvos em localStorage entre visitas;
 *   3) pequenos delays simulados nas ações, com loading de verdade.
 *
 * Notas de segurança (site 100% front-end, sem banco/backend):
 *   - Nunca usamos innerHTML com texto digitado pelo usuário — só
 *     textContent/atributos, pra evitar XSS.
 *   - Links que abrem em nova aba levam rel="noopener noreferrer".
 *   - A Content-Security-Policy (no <head> do index.html) restringe
 *     de onde o site pode carregar script/estilo/fonte.
 *   - Não existe nenhuma chave ou segredo neste arquivo — não há nada
 *     sensível pra vazar, já que não há backend nem banco de dados.
 */

// remove a classe "no-js" o quanto antes, pra ativar as animações reveal
document.documentElement.classList.remove("no-js");

const ICONS = {
  gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="9" width="18" height="12" rx="1.5"/><path d="M3 9h18v4H3z" opacity=".4"/><path d="M12 9v12M12 9c-2-3-6-3-6-.5S9 9 12 9Zm0 0c2-3 6-3 6-.5S15 9 12 9Z"/></svg>',
  controller:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2.5" y="7.5" width="19" height="10" rx="4"/><path d="M7 10v4M5 12h4M15.5 11h.01M18 13h.01"/></svg>',
  people:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="8.5" cy="8" r="3"/><circle cx="16" cy="9.5" r="2.3"/><path d="M2.5 20c0-3.6 2.7-6 6-6s6 2.4 6 6"/><path d="M14.5 14.3c2.6.4 4.5 2.5 4.5 5.7"/></svg>',
  chart:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 20V10M11 20V4M18 20v-7"/><path d="M3 20h18"/></svg>',
};

document.addEventListener("DOMContentLoaded", () => {
  renderContent();
  initHeaderScroll();
  initNavToggle();
  initReveal();
  initCounters();
  initTestimonials();
  initContactForm();
  initCursorGlow();
  initScrollProgress();
  initBackToTop();
  initPlanCtaSync();
});

/* ---------------------------------------------------------
   Renderização de conteúdo a partir de SITE_DATA
--------------------------------------------------------- */
function renderContent() {
  document.querySelectorAll("[data-stat-group]").forEach((group) => {
    const key = group.dataset.statGroup;
    const data = SITE_DATA[key];
    if (!data) return;

    if (key === "trustBar") {
      group.innerHTML = data
        .map(
          (item) => `
        <div class="trust-item">
          <span class="trust-value">${item.value}</span>
          <span class="trust-label">${item.label}</span>
        </div>
      `,
        )
        .join("");
    }

    if (key === "problemStats" || key === "resultStats") {
      group.innerHTML = data
        .map(
          (stat) => `
        <div class="stat-card">
          <div class="stat-value" data-count-to="${stat.value}" data-suffix="${stat.suffix || ""}">
            0<span class="unit">${stat.unit || ""}</span>
          </div>
          <p class="stat-label">${stat.label}</p>
        </div>
      `,
        )
        .join("");
    }

    if (key === "pillars") {
      group.innerHTML = data
        .map(
          (p) => `
        <li class="card-shine">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
        </li>
      `,
        )
        .join("");
    }

    if (key === "features") {
      group.innerHTML = data
        .map(
          (f) => `
        <div class="feature-card card-shine">
          <div class="feature-icon">${ICONS[f.icon] || ""}</div>
          <h3>${f.title}</h3>
          <p>${f.desc}</p>
        </div>
      `,
        )
        .join("");
    }

    if (key === "plans") {
      group.innerHTML = data
        .map(
          (plan) => `
        <div class="plan-card card-shine ${plan.highlight ? "is-highlight" : ""}">
          ${plan.highlight ? '<span class="compare-badge">Mais popular</span>' : ""}
          <p class="plan-name">${plan.name}</p>
          <div class="plan-price">
            <span class="amount">${plan.price}</span>
            <span class="period">${plan.period}</span>
          </div>
          <p class="plan-desc">${plan.desc}</p>
          <ul class="plan-features">
            ${plan.features.map((f) => `<li>${f}</li>`).join("")}
          </ul>
          <a href="#contato" class="btn ${plan.highlight ? "btn-primary" : "btn-ghost"} btn-block plan-cta" data-plan="${plan.name}">${plan.cta}</a>
        </div>
      `,
        )
        .join("");
    }
  });

  const them = document.getElementById("compareThem");
  const us = document.getElementById("compareUs");
  if (them && us) {
    them.innerHTML = SITE_DATA.comparison.them
      .map((i) => `<li>${i}</li>`)
      .join("");
    us.innerHTML = SITE_DATA.comparison.us.map((i) => `<li>${i}</li>`).join("");
  }
}

/* ---------------------------------------------------------
   Header muda ao rolar
--------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById("siteHeader");
  const onScroll = () =>
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------------------------------------------------------
   Menu mobile
--------------------------------------------------------- */
function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen);
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------------------------------------------------------
   Reveal on scroll
--------------------------------------------------------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("is-visible"), i * 40);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  items.forEach((item) => io.observe(item));
}

/* ---------------------------------------------------------
   Contadores animados
--------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll("[data-count-to]");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.4 },
  );
  counters.forEach((c) => io.observe(c));
}

function animateCount(el) {
  const target = parseFloat(el.dataset.countTo);
  const suffix = el.dataset.suffix || "";
  const duration = 1100;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * eased);
    el.childNodes[0].nodeValue = current + suffix;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.childNodes[0].nodeValue = target + suffix;
    }
  }
  requestAnimationFrame(tick);
}

/* ---------------------------------------------------------
   Carrossel de depoimentos
--------------------------------------------------------- */
function initTestimonials() {
  const wrap = document.getElementById("testimonial");
  const dotsWrap = document.getElementById("testimonialDots");
  const items = SITE_DATA.testimonials;
  let current = 0;
  let timer;

  function render() {
    const t = items[current];
    wrap.innerHTML = `
      <blockquote>“${t.quote}”</blockquote>
      <p class="who">${t.name} <span>· ${t.role}</span></p>
    `;
    [...dotsWrap.children].forEach((dot, i) =>
      dot.classList.toggle("is-active", i === current),
    );
  }

  dotsWrap.innerHTML = items
    .map(
      (_, i) =>
        `<button type="button" aria-label="Depoimento ${i + 1}" role="tab"></button>`,
    )
    .join("");

  [...dotsWrap.children].forEach((dot, i) => {
    dot.addEventListener("click", () => {
      current = i;
      render();
      restart();
    });
  });

  function restart() {
    clearInterval(timer);
    timer = setInterval(() => {
      current = (current + 1) % items.length;
      render();
    }, 6000);
  }

  render();
  restart();
}

/* ---------------------------------------------------------
   Formulário de contato → redireciona pro WhatsApp
   Sem backend: monta a mensagem no front-end, guarda um
   registro local (só pra essa demo) e abre o wa.me com o
   texto já pronto.
--------------------------------------------------------- */
function populatePlanSelect() {
  const select = document.getElementById("plano");
  if (!select) return;
  const options = SITE_DATA.plans
    .map(
      (p) =>
        `<option value="${p.name}">${p.name} (${p.price}${p.period})</option>`,
    )
    .join("");
  select.innerHTML = `<option value="">Selecione um plano</option>${options}<option value="Ainda não decidi">Ainda não decidi</option>`;
}

function buildWhatsAppMessage({ nome, plano, mensagem }) {
  return [
    "Olá, Conecta Vida! 👋",
    "",
    `Nome: ${nome}`,
    `Plano de interesse: ${plano}`,
    "",
    `Mensagem: ${mensagem}`,
  ].join("\n");
}

function initContactForm() {
  populatePlanSelect();

  const form = document.getElementById("contactForm");
  const btn = document.getElementById("submitBtn");
  const label = btn.querySelector(".btn-label");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const nome = form.nome.value.trim();
    const plano = form.plano.value;
    const mensagem = form.mensagem.value.trim();

    btn.disabled = true;
    label.textContent = "Preparando sua mensagem...";
    status.textContent = "";

    // pequeno delay simulado — sem chamada de rede real (não há backend)
    await new Promise((resolve) => setTimeout(resolve, 650));

    // registro local só pra essa demo — não é um banco de dados de verdade
    try {
      const log = JSON.parse(localStorage.getItem("conectavida_leads") || "[]");
      log.push({ nome, plano, mensagem, enviadoEm: new Date().toISOString() });
      localStorage.setItem("conectavida_leads", JSON.stringify(log));
    } catch (err) {
      /* localStorage indisponível — segue o fluxo normalmente */
    }

    const texto = buildWhatsAppMessage({ nome, plano, mensagem });
    const url = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    btn.disabled = false;
    label.textContent = "Continuar no WhatsApp";
    status.textContent = `Prontinho, ${nome.split(" ")[0]}! Abrimos o WhatsApp com sua mensagem pronta.`;
    form.reset();
    showToast("Redirecionando para o WhatsApp");
  });
}

/* ---------------------------------------------------------
   Clicar em "assinar plano X" pré-seleciona o plano no form
--------------------------------------------------------- */
function initPlanCtaSync() {
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(".plan-cta");
    if (!trigger) return;
    const select = document.getElementById("plano");
    if (select && trigger.dataset.plan) select.value = trigger.dataset.plan;
  });
}

/* ---------------------------------------------------------
   Brilho que segue o cursor (só desktop, respeita reduced-motion)
--------------------------------------------------------- */
function initCursorGlow() {
  const glow = document.getElementById("cursorGlow");
  if (!glow) return;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (!finePointer || reducedMotion) {
    glow.remove();
    return;
  }

  let x = window.innerWidth / 2,
    y = window.innerHeight / 2,
    raf = null;
  function apply() {
    glow.style.setProperty("--cursor-x", x + "px");
    glow.style.setProperty("--cursor-y", y + "px");
    raf = null;
  }
  window.addEventListener(
    "mousemove",
    (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    },
    { passive: true },
  );
}

/* ---------------------------------------------------------
   Barra de progresso de leitura
--------------------------------------------------------- */
function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;
  function update() {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    bar.style.width = pct + "%";
  }
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

/* ---------------------------------------------------------
   Botão voltar ao topo
--------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;
  function toggle() {
    btn.classList.toggle("is-visible", window.scrollY > 700);
  }
  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
}

/* ---------------------------------------------------------
   Toast simples
--------------------------------------------------------- */
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("is-visible"), 3200);
}
