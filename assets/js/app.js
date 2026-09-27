(function () {
  "use strict";
  const { PHASES, SOURCES, EVENTS, MITRE } = window.TIMELINE_DATA;

  const sourceIndex = Object.fromEntries(SOURCES.map((s, i) => [s.id, { ...s, num: i + 1 }]));
  const phaseIndex = Object.fromEntries(PHASES.map((p) => [p.id, p]));
  const activePhases = new Set(PHASES.map((p) => p.id));

  function formatDate(raw) {
    // Handles "2020-12", "2023-05-27", "2023-01-mid", "2023-05-20" (used as a stand-in for a range)
    const m = raw.match(/^(\d{4})-(\d{2})(?:-(\d{2}|mid))?$/);
    if (!m) return raw;
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const year = m[1];
    const month = months[parseInt(m[2], 10) - 1];
    if (!m[3]) return `${month} ${year}`;
    if (m[3] === "mid") return `Mid-${month} ${year}`;
    return `${parseInt(m[3], 10)} ${month} ${year}`;
  }

  function renderLegend() {
    const el = document.getElementById("legend");
    el.innerHTML = "";
    PHASES.forEach((p) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-pressed", "true");
      btn.dataset.phase = p.id;
      btn.innerHTML = `<span class="dot ${p.color}"></span>${p.label}`;
      btn.addEventListener("click", () => {
        if (activePhases.has(p.id)) {
          activePhases.delete(p.id);
          btn.setAttribute("aria-pressed", "false");
        } else {
          activePhases.add(p.id);
          btn.setAttribute("aria-pressed", "true");
        }
        applyFilter();
      });
      el.appendChild(btn);
    });
  }

  function citeLinks(ids) {
    return ids
      .map((id) => `<a href="#src-${id}" title="${sourceIndex[id].authors} — ${sourceIndex[id].title}">${sourceIndex[id].num}</a>`)
      .join("");
  }

  function renderTimeline() {
    const el = document.getElementById("timeline");
    el.innerHTML = "";
    EVENTS.forEach((e) => {
      const art = document.createElement("article");
      art.className = "event";
      art.dataset.phase = e.phase;

      const tags = (e.tags || []).map((t) => `<span class="tag ${phaseIndex[e.phase].color}">${t}</span>`).join("");
      const cves = (e.cveIds || []).map((c) => `<span class="tag cve">${c}</span>`).join("");

      art.innerHTML = `
        <div class="event-card">
          <div class="event-head">
            <span class="event-date">${formatDate(e.date)}</span>
            <h3 class="event-title">${e.title}</h3>
          </div>
          <p class="event-summary">${e.summary}</p>
          <div class="event-foot">
            ${tags}${cves}
            <span class="cite-links">${citeLinks(e.citations)}</span>
          </div>
        </div>`;
      el.appendChild(art);
    });
  }

  function applyFilter() {
    document.querySelectorAll(".event").forEach((el) => {
      el.classList.toggle("is-hidden", !activePhases.has(el.dataset.phase));
    });
  }

  function renderMitre() {
    const body = document.getElementById("mitre-body");
    body.innerHTML = MITRE.map(
      (m) => `<tr>
        <td>${m.tactic}</td>
        <td class="technique">${m.technique}</td>
        <td>${m.note}</td>
        <td>${citeLinks(m.citations)}</td>
      </tr>`
    ).join("");
  }

  function renderSources() {
    const el = document.getElementById("sources");
    el.innerHTML = SOURCES.map(
      (s) => `<li id="src-${s.id}">
        <strong>${s.authors}.</strong> "<a href="${s.url}" target="_blank" rel="noopener">${s.title}</a>." <em>${s.publication}</em>, ${s.date}.
        ${s.note ? `<span class="note">${s.note}</span>` : ""}
      </li>`
    ).join("");
  }

  function setupTheme() {
    const btn = document.getElementById("theme-toggle");
    const root = document.documentElement;
    const stored = (() => {
      try { return localStorage.getItem("timeline-theme"); } catch (_) { return null; }
    })();
    if (stored === "light" || stored === "dark") root.setAttribute("data-theme", stored);

    const current = () =>
      root.getAttribute("data-theme") ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    btn.addEventListener("click", () => {
      const next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("timeline-theme", next); } catch (_) { /* ignore */ }
    });
  }

  function renderStats() {
    document.getElementById("stat-events").textContent = EVENTS.length;
    document.getElementById("stat-sources").textContent = SOURCES.length;
    document.getElementById("stat-span").textContent =
      `${formatDate(EVENTS[0].date)} – ${formatDate(EVENTS[EVENTS.length - 1].date)}`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderLegend();
    renderTimeline();
    renderMitre();
    renderSources();
    renderStats();
    setupTheme();
  });
})();
