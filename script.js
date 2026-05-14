/* ===========================================================
   Barbearia Soares — script.js
   =========================================================== */
(function () {
  "use strict";

  // -----------------------------------------------------------
  // CONFIG
  // -----------------------------------------------------------
  const WHATSAPP_NUMBER = "5534992040300";

  const SERVICES = [
    { id: "corte",            name: "Corte de Cabelo",                       duration: "35 min", price: "R$ 35,00",     group: "Cortes" },
    { id: "corte-sob",        name: "Corte e Sobrancelha",                   duration: "35 min", price: "R$ 40,00",     group: "Cortes" },
    { id: "corte-sob-cav",    name: "Corte, Sobrancelha e Cavanhaque",       duration: "40 min", price: "R$ 50,00",     group: "Cortes" },
    { id: "corte-barba",      name: "Corte e Barba",                         duration: "45 min", price: "R$ 60,00",     group: "Cortes" },
    { id: "corte-barba-sob",  name: "Corte, Barba e Sobrancelha",            duration: "45 min", price: "R$ 65,00",     group: "Cortes" },
    { id: "corte-barbo",      name: "Corte e Barboterapia",                  duration: "45 min", price: "R$ 60,00",     group: "Cortes" },
    { id: "corte-barbo-sob",  name: "Corte, Barboterapia e Sobrancelha",     duration: "45 min", price: "R$ 65,00",     group: "Cortes" },
    { id: "corte-pig",        name: "Corte e Pigmentação",                   duration: "45 min", price: "R$ 55,00",     group: "Cortes" },
    { id: "corte-hid",        name: "Corte e Hidratação",                    duration: "40 min", price: "R$ 65,00",     group: "Cortes" },
    { id: "corte-alis",       name: "Corte e Alisamento Fio a Fio",          duration: "45 min", price: "R$ 65,00",     group: "Cortes" },
    { id: "barbo",            name: "Barboterapia",                          duration: "20 min", price: "R$ 25,00",     group: "Avulsos & Tratamentos" },
    { id: "pezinho",          name: "Pezinho",                               duration: "10 min", price: "R$ 10,00",     group: "Avulsos & Tratamentos" },
    { id: "pezinho-barba",    name: "Pezinho e Barba",                       duration: "20 min", price: "R$ 35,00",     group: "Avulsos & Tratamentos" },
    { id: "coloracao",        name: "Luzes, Platinado, Selagem e Progressiva", duration: "1h",   price: "Sob consulta", group: "Avulsos & Tratamentos" },
  ];

  const BARBERS = [
    { id: "any",    name: "Qualquer", role: "Sem preferência", tag: "O primeiro disponível",      photo: null },
    { id: "luiz",   name: "Luiz",     role: "Master Barber",   tag: "Cortes clássicos & navalha", photo: "assets/barbers/luiz.jpg" },
    { id: "thiago", name: "Thiago",   role: "Barbeiro",        tag: "Degradês & desenhos",        photo: "assets/barbers/thiago.jpg" },
    { id: "lucas",  name: "Lucas",    role: "Barbeiro",        tag: "Tratamentos & finalização",  photo: "assets/barbers/lucas.jpg" },
  ];

  // Working hours by weekday (0=Sun ... 6=Sat). null = closed.
  const HOURS = {
    0: null,
    1: null,
    2: { open: "09:30", close: "19:30" },
    3: { open: "09:30", close: "19:30" },
    4: { open: "09:30", close: "19:30" },
    5: { open: "09:30", close: "19:30" },
    6: { open: "08:00", close: "18:00" },
  };

  const DAY_SHORT = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
  const DAY_LONG  = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
  const MONTHS_SHORT = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  const MONTHS_LONG  = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

  const GALLERY = [
    "01.jpg","05.jpg","03.jpg","13.jpg",
    "04.jpg","09.jpg","06.jpg","14.jpg",
    "16.jpg","02.jpg","12.jpg","15.jpg",
    "07.jpg","08.jpg","10.jpg","11.jpg",
  ].map(n => "assets/gallery/" + n);

  const REVIEWS = [
    { name: "Adriana Aparecida",              when: "Editado um mês atrás", photo: "assets/reviewers/adriana.png",
      text: "Barbearia Soares é o lugar certo! Meninos top, atendimento show e o preço é justo. Os meninos são 10 💈✂️" },
    { name: "Marcelo Siqueira",               when: "um mês atrás",         photo: null,
      text: "Profissional de alta performance, com preço justo está aí. Obrigado Lucas pelo excelentíssimo trabalho!" },
    { name: "Jeferson De carvalho",           when: "2 meses atrás",        photo: "assets/reviewers/jeferson.png",
      text: "Atendimento e profissionais super atenciosos. Ambiente limpo e aconchegante." },
    { name: "João Pedro Martins dos santos",  when: "2 meses atrás",        photo: "assets/reviewers/joao-pedro.png",
      text: "Sensacional, top demais a 01 de Udia." },
    { name: "Renato Eugênio",                 when: "2 meses atrás",        photo: "assets/reviewers/renato.png",
      text: "Top demais a barbearia, excelente atendimento." },
    { name: "Gabriel Ribeiro",                when: "um mês atrás",         photo: null,
      text: "Barbearia sensacional, ótimos profissionais. Sem palavras pro espaço, top. Recomendo!" },
    { name: "marcello vinicius",              when: "2 meses atrás",        photo: "assets/reviewers/marcello.png",
      text: "Corte com excelência." },
    { name: "Marcos Souza",                   when: "2 meses atrás",        photo: "assets/reviewers/marcos.png",
      text: "Barbearia top, recomendo." },
    { name: "Pedro Henrique Dias da Silva",   when: "2 meses atrás",        photo: null,
      text: "Ótimo atendimento, te traz a renovação para seu visual." },
    { name: "Pablo Eduardo",                  when: "2 meses atrás",        photo: null,
      text: "Barbearia top, ótimos profissionais. Recomendo!" },
    { name: "Thalles Aquino",                 when: "2 meses atrás",        photo: null,
      text: "Profissionalismo e excelência, eu indico!" },
    { name: "Aquiles Costa Carvalho",         when: "2 meses atrás",        photo: null,
      text: "A melhor, top demais." },
    { name: "Emmanuel Fernandes",             when: "2 meses atrás",        photo: null,
      text: "Barbearia de primeira, a melhor do Brasil." },
    { name: "José Monteiro Sena",             when: "2 meses atrás",        photo: null,
      text: "Muito bem atendido." },
    { name: "Jose Soares",                    when: "2 meses atrás",        photo: null,
      text: "Barbearia ótima qualidade, os meninos são feras." },
    { name: "Ian Alves",                      when: "2 meses atrás",        photo: null,
      text: "Muito boa avaliação. Barbeiro é extraordinário de bom." },
    { name: "_lc.queiroz",                    when: "Editado 2 meses atrás",photo: null,
      text: "Barbearia top! Experiência incrível, recomendo." },
    { name: "Gilberto Tomaz",                 when: "2 meses atrás",        photo: null,
      text: "Trabalho de qualidade!" },
  ];

  // -----------------------------------------------------------
  // STATE
  // -----------------------------------------------------------
  const state = {
    serviceId: null,
    barberId: null,
    date: null,   // Date
    time: null,   // "HH:MM"
  };

  // -----------------------------------------------------------
  // HELPERS
  // -----------------------------------------------------------
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        if (k === "class") node.className = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else if (k.startsWith("on") && typeof attrs[k] === "function") node.addEventListener(k.slice(2), attrs[k]);
        else node.setAttribute(k, attrs[k]);
      }
    }
    if (children) {
      (Array.isArray(children) ? children : [children]).forEach(c => {
        if (c == null) return;
        node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
      });
    }
    return node;
  }

  function timeToMin(t) { const [h,m]=t.split(":").map(Number); return h*60+m; }
  function minToTime(m) { return String(Math.floor(m/60)).padStart(2,"0")+":"+String(m%60).padStart(2,"0"); }

  function generateSlots(open, close, step = 30) {
    const out = [];
    for (let t = timeToMin(open); t + step <= timeToMin(close); t += step) out.push(minToTime(t));
    return out;
  }

  function fmtDateLong(d) {
    return DAY_LONG[d.getDay()] + ", " + d.getDate() + " de " + MONTHS_LONG[d.getMonth()];
  }
  function fmtDateShort(d) { return d.getDate() + "/" + String(d.getMonth()+1).padStart(2,"0"); }

  function initials(name) {
    return name.split(/\s+/).filter(Boolean).slice(0,2).map(s => (s[0]||"").toUpperCase()).join("");
  }

  function formatCPF(value) {
    const d = (value||"").replace(/\D/g,"").slice(0,11);
    if (d.length > 9) return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6,9)}-${d.slice(9)}`;
    if (d.length > 6) return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6)}`;
    if (d.length > 3) return `${d.slice(0,3)}.${d.slice(3)}`;
    return d;
  }
  function isValidCPF(value) {
    const c = (value||"").replace(/\D/g,"");
    if (c.length !== 11 || /^(\d)\1{10}$/.test(c)) return false;
    let sum = 0;
    for (let i=0;i<9;i++) sum += parseInt(c[i],10)*(10-i);
    let d1 = (sum*10) % 11; if (d1===10) d1=0;
    if (d1 !== parseInt(c[9],10)) return false;
    sum = 0;
    for (let i=0;i<10;i++) sum += parseInt(c[i],10)*(11-i);
    let d2 = (sum*10) % 11; if (d2===10) d2=0;
    return d2 === parseInt(c[10],10);
  }
  function formatPhone(value) {
    const d = (value||"").replace(/\D/g,"").slice(0,11);
    if (d.length > 10) return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
    if (d.length > 6)  return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
    if (d.length > 2)  return `(${d.slice(0,2)}) ${d.slice(2)}`;
    if (d.length > 0)  return `(${d}`;
    return "";
  }

  // -----------------------------------------------------------
  // NAV — scroll state + mobile burger
  // -----------------------------------------------------------
  const nav = document.getElementById("nav");
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobile-menu");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
  });
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    mobileMenu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    mobileMenu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }));

  // -----------------------------------------------------------
  // REVEAL ON SCROLL
  // -----------------------------------------------------------
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }});
    }, { threshold: 0 });
    document.querySelectorAll(".reveal").forEach(r => io.observe(r));
  } else {
    document.querySelectorAll(".reveal").forEach(r => r.classList.add("in"));
  }

  // -----------------------------------------------------------
  // SERVICES
  // -----------------------------------------------------------
  const servicesEl = document.getElementById("services");
  const hintService = document.getElementById("hint-service");

  function renderServices() {
    servicesEl.innerHTML = "";
    const groups = {};
    SERVICES.forEach(s => { (groups[s.group] = groups[s.group] || []).push(s); });

    Object.keys(groups).forEach(gname => {
      const g = el("div", { class: "services__group" }, [
        el("div", { class: "services__group-title" }, gname),
        el("div", { class: "services__list" }, groups[gname].map(s => {
          const btn = el("button", {
            type: "button",
            class: "service" + (state.serviceId === s.id ? " selected" : ""),
            "data-service": s.id,
          }, [
            el("span", { class: "service__check" }),
            el("span", { class: "service__body" }, [
              el("span", { class: "service__name" }, s.name),
              el("span", { class: "service__duration" }, s.duration),
            ]),
            el("span", { class: "service__price" }, s.price),
          ]);
          btn.addEventListener("click", () => {
            state.serviceId = s.id;
            renderServices();
            updateSummary();
          });
          return btn;
        })),
      ]);
      servicesEl.appendChild(g);
    });

    const sel = SERVICES.find(s => s.id === state.serviceId);
    hintService.textContent = sel ? "Selecionado" : "Selecione um";
  }

  // -----------------------------------------------------------
  // BARBERS
  // -----------------------------------------------------------
  const barbersEl = document.getElementById("barbers");
  const hintBarber = document.getElementById("hint-barber");

  function renderBarbers() {
    barbersEl.innerHTML = "";
    BARBERS.forEach(b => {
      const photoNode = b.photo
        ? el("img", { src: b.photo, alt: b.name, loading: "lazy" })
        : el("span", { class: "barber__glyph", "aria-hidden": "true", html:
            '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">'+
            '<circle cx="13" cy="14" r="5"/>'+
            '<path d="M5 30c1.6-4.5 4.5-7 8-7s6.4 2.5 8 7"/>'+
            '<circle cx="27" cy="11" r="3"/>'+
            '<path d="M22 21c1-2.5 3-4 5-4s4 1.5 5 4"/>'+
            '<circle cx="32" cy="22" r="2.5"/>'+
            '<path d="M28 31c.6-2.2 2-3.5 4-3.5s3.4 1.3 4 3.5"/>'+
            '</svg>' });

      const btn = el("button", {
        type: "button",
        class: "barber" + (state.barberId === b.id ? " selected" : "") + (!b.photo ? " barber--any" : ""),
        "data-barber": b.id,
      }, [
        el("span", { class: "barber__photo" }, photoNode),
        el("span", { class: "barber__name" }, b.name),
        el("span", { class: "barber__role" }, b.role),
        el("span", { class: "barber__tag" }, b.tag),
        el("span", { class: "barber__check", "aria-hidden": "true" }),
      ]);
      btn.addEventListener("click", () => {
        state.barberId = b.id;
        renderBarbers();
        updateSummary();
      });
      barbersEl.appendChild(btn);
    });

    const sel = BARBERS.find(b => b.id === state.barberId);
    hintBarber.textContent = sel ? sel.name : "Quem vai te atender";
  }

  // -----------------------------------------------------------
  // CALENDAR (next 14 days)
  // -----------------------------------------------------------
  const calendarEl = document.getElementById("calendar");

  function renderCalendar() {
    calendarEl.innerHTML = "";
    const now = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
      const closed = !HOURS[d.getDay()];
      const selected = state.date && d.toDateString() === state.date.toDateString();

      const cell = el("button", {
        type: "button",
        class: "day" + (selected ? " selected" : "") + (closed ? " day--closed" : ""),
      }, [
        el("div", { class: "day__weekday" }, DAY_SHORT[d.getDay()]),
        el("div", { class: "day__num" }, String(d.getDate())),
        el("div", { class: "day__month" }, closed ? "Fechado" : MONTHS_SHORT[d.getMonth()]),
      ]);
      if (closed) cell.disabled = true;
      cell.addEventListener("click", () => {
        if (closed) return;
        state.date = d;
        state.time = null;
        renderCalendar();
        renderTimes();
        updateSummary();
      });
      calendarEl.appendChild(cell);
    }
  }

  // -----------------------------------------------------------
  // TIME SLOTS
  // -----------------------------------------------------------
  const timesEl = document.getElementById("times");
  const hintTime = document.getElementById("hint-time");

  function renderTimes() {
    timesEl.innerHTML = "";

    if (!state.date) {
      hintTime.textContent = "Selecione uma data";
      timesEl.appendChild(el("div", { class: "times__empty" }, "Selecione uma data para ver os horários."));
      return;
    }

    const h = HOURS[state.date.getDay()];
    if (!h) {
      hintTime.textContent = "Fechado";
      timesEl.appendChild(el("div", { class: "times__empty" }, "Fechado neste dia."));
      return;
    }
    hintTime.textContent = DAY_SHORT[state.date.getDay()] + " · " + h.open + " — " + h.close;

    generateSlots(h.open, h.close, 30).forEach(t => {
      const btn = el("button", {
        type: "button",
        class: "time" + (state.time === t ? " selected" : ""),
      }, t);
      btn.addEventListener("click", () => {
        state.time = t;
        renderTimes();
        updateSummary();
      });
      timesEl.appendChild(btn);
    });
  }

  // -----------------------------------------------------------
  // CPF / PHONE / SUMMARY / SUBMIT
  // -----------------------------------------------------------
  const cpfInput = document.getElementById("cpf");
  const phoneInput = document.getElementById("phone");
  const nameInput = document.getElementById("name");
  const cpfError = document.getElementById("cpf-error");
  const btnConfirm = document.getElementById("btn-confirm");
  const summaryText = document.getElementById("summary-text");
  const summaryTotal = document.getElementById("summary-total");
  const form = document.getElementById("booking-form");

  cpfInput.addEventListener("input", () => {
    cpfInput.value = formatCPF(cpfInput.value);
    const ok = cpfInput.value.length === 0 || isValidCPF(cpfInput.value);
    cpfInput.setAttribute("aria-invalid", ok ? "false" : "true");
    cpfError.hidden = ok;
    updateSummary();
  });
  phoneInput.addEventListener("input", () => { phoneInput.value = formatPhone(phoneInput.value); });
  nameInput.addEventListener("input", updateSummary);

  function updateSummary() {
    const s = SERVICES.find(x => x.id === state.serviceId);
    const b = BARBERS.find(x => x.id === state.barberId);

    const parts = [
      s ? s.name : "Serviço a definir",
      b ? (b.id === "any" ? "sem preferência de barbeiro" : "com " + b.name) : null,
      state.date ? fmtDateShort(state.date) : null,
      state.time ? state.time : null,
    ].filter(Boolean);
    summaryText.textContent = parts.join(" · ");
    summaryTotal.textContent = s ? s.price : "—";

    const cpfOk = isValidCPF(cpfInput.value);
    btnConfirm.disabled = !(state.serviceId && state.barberId && state.date && state.time
                            && nameInput.value.trim().length > 1 && cpfOk);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (btnConfirm.disabled) return;

    const s = SERVICES.find(x => x.id === state.serviceId);
    const b = BARBERS.find(x => x.id === state.barberId);
    const lines = [
      "*Novo Agendamento — Barbearia Soares*",
      "",
      "*Cliente:* " + nameInput.value.trim(),
      "*CPF:* " + cpfInput.value,
      phoneInput.value.trim() ? "*Telefone:* " + phoneInput.value.trim() : null,
      "*Serviço:* " + s.name + "  (" + s.duration + " · " + s.price + ")",
      "*Barbeiro:* " + (b.id === "any" ? "Sem preferência" : b.name),
      "*Data:* " + fmtDateLong(state.date),
      "*Horário:* " + state.time,
      "",
      "Poderia confirmar disponibilidade, por favor? 💈",
    ].filter(Boolean);
    const msg = encodeURIComponent(lines.join("\n"));
    window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + msg, "_blank", "noopener");
  });

  // -----------------------------------------------------------
  // GALLERY
  // -----------------------------------------------------------
  const galleryGridEl = document.getElementById("gallery-grid");
  const btnVerMais = document.getElementById("btn-ver-mais");

  if (btnVerMais) {
    btnVerMais.addEventListener("click", () => {
      galleryGridEl.classList.remove("is-collapsed");
    });
  }

  GALLERY.forEach((src, i) => {
    const btn = el("button", {
      type: "button",
      class: "gallery__item",
      "aria-label": "Abrir foto " + (i+1),
    }, el("img", { src: src, alt: "Trabalho da Barbearia Soares " + (i+1), loading: "lazy" }));
    btn.addEventListener("click", () => openLightbox(i));
    galleryGridEl.appendChild(btn);
  });

  // -----------------------------------------------------------
  // LIGHTBOX
  // -----------------------------------------------------------
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCounter = document.getElementById("lightbox-counter");
  let lbIdx = 0;

  function openLightbox(i) {
    lbIdx = i;
    lightboxImg.src = GALLERY[i];
    lightboxCounter.textContent = String(i+1).padStart(2,"0") + " / " + String(GALLERY.length).padStart(2,"0");
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function navLightbox(dir) {
    lbIdx = (lbIdx + dir + GALLERY.length) % GALLERY.length;
    lightboxImg.src = GALLERY[lbIdx];
    lightboxCounter.textContent = String(lbIdx+1).padStart(2,"0") + " / " + String(GALLERY.length).padStart(2,"0");
  }
  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  document.querySelectorAll(".lightbox__nav").forEach(b => {
    b.addEventListener("click", (e) => { e.stopPropagation(); navLightbox(parseInt(b.dataset.lbDir, 10)); });
  });
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  lightboxImg.addEventListener("click", (e) => e.stopPropagation());
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") navLightbox(1);
    if (e.key === "ArrowLeft")  navLightbox(-1);
  });

  // -----------------------------------------------------------
  // REVIEWS
  // -----------------------------------------------------------
  const reviewsEl = document.getElementById("reviews");
  const palette = [
    "linear-gradient(135deg,#3A352B,#1B1815)",
    "linear-gradient(135deg,#2E2A21,#171510)",
    "linear-gradient(135deg,#403A2D,#1F1C16)",
    "linear-gradient(135deg,#2A2722,#100E0B)",
    "linear-gradient(135deg,#36302A,#181613)",
  ];

  REVIEWS.forEach((r, i) => {
    const avatar = r.photo
      ? el("img", { class: "review__avatar", src: r.photo, alt: r.name, loading: "lazy" })
      : (() => {
          const span = el("span", { class: "review__avatar" }, initials(r.name));
          span.style.background = palette[i % palette.length];
          return span;
        })();

    const stars = el("span", { class: "stars", "aria-label": "5 estrelas", html:
      '<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'.repeat(5)
    });

    const gIcon = el("span", { class: "review__google", title: "via Google Reviews", html:
      '<svg width="16" height="16" viewBox="0 0 48 48">'+
      '<path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C33.5 6.2 28.9 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>'+
      '<path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C33.5 6.2 28.9 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>'+
      '<path fill="#4CAF50" d="M24 44c4.9 0 9.3-1.9 12.6-4.9l-5.8-4.9c-1.9 1.3-4.3 2-6.8 2-5.3 0-9.7-3.4-11.3-8L6 33C9.3 39.6 16 44 24 44z"/>'+
      '<path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.4 5.8l5.8 4.9C40.2 35.5 44 30.2 44 24c0-1.3-.1-2.3-.4-3.5z"/>'+
      '</svg>'
    });

    const card = el("article", { class: "review" }, [
      el("div", { class: "review__head" }, [
        avatar,
        el("div", { class: "review__meta" }, [
          el("div", { class: "review__name" }, r.name),
          el("div", { class: "review__when" }, r.when),
        ]),
        gIcon,
      ]),
      stars,
      el("p", { class: "review__text" }, r.text),
    ]);
    reviewsEl.appendChild(card);
  });

  document.querySelectorAll(".reviews-nav").forEach(btn => {
    btn.addEventListener("click", () => {
      const dir = parseInt(btn.dataset.revDir, 10);
      const card = reviewsEl.querySelector(".review");
      const step = card ? card.getBoundingClientRect().width + 18 : 360;
      reviewsEl.scrollBy({ left: dir * step, behavior: "smooth" });
    });
  });

  // -----------------------------------------------------------
  // SCHEDULE — highlight today
  // -----------------------------------------------------------
  const today = new Date().getDay();
  document.querySelectorAll("#schedule-list li").forEach(li => {
    const range = li.dataset.day;
    if (!range) return;
    const days = range.includes("-")
      ? (() => { const [a,b] = range.split("-").map(Number); const out=[]; for (let i=a;i<=b;i++) out.push(i); return out; })()
      : [parseInt(range,10)];
    if (days.includes(today)) li.classList.add("is-today");
  });

  // -----------------------------------------------------------
  // FOOTER YEAR
  // -----------------------------------------------------------
  document.getElementById("year").textContent = new Date().getFullYear();

  // -----------------------------------------------------------
  // SMOOTH SCROLL FOR ANCHOR LINKS (offset for fixed nav)
  // -----------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  // -----------------------------------------------------------
  // INIT
  // -----------------------------------------------------------
  renderServices();
  renderBarbers();
  renderCalendar();
  renderTimes();
  updateSummary();
})();
