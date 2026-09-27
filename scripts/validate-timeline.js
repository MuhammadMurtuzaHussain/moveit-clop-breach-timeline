#!/usr/bin/env node
/**
 * Structural validator for assets/js/timeline-data.js.
 * Fails the build if the timeline and its bibliography have drifted apart.
 */
const { PHASES, SOURCES, EVENTS, MITRE } = require("../assets/js/timeline-data.js");

const errors = [];
const warn = (msg) => errors.push(msg);

const phaseIds = new Set(PHASES.map((p) => p.id));
const sourceIds = new Set(SOURCES.map((s) => s.id));
const seenSourceIds = new Set();
const seenEventIds = new Set();

for (const s of SOURCES) {
  if (seenSourceIds.has(s.id)) warn(`Duplicate source id: ${s.id}`);
  seenSourceIds.add(s.id);
  for (const field of ["authors", "title", "publication", "date", "url"]) {
    if (!s[field]) warn(`Source ${s.id} is missing "${field}"`);
  }
  if (!/^https?:\/\//.test(s.url || "")) warn(`Source ${s.id} has a non-http(s) url: ${s.url}`);
}

let lastDate = null;
for (const e of EVENTS) {
  if (seenEventIds.has(e.id)) warn(`Duplicate event id: ${e.id}`);
  seenEventIds.add(e.id);

  for (const field of ["date", "phase", "title", "summary", "citations"]) {
    if (!e[field]) warn(`Event ${e.id} is missing "${field}"`);
  }
  if (e.phase && !phaseIds.has(e.phase)) {
    warn(`Event ${e.id} references unknown phase "${e.phase}"`);
  }
  if (!Array.isArray(e.citations) || e.citations.length === 0) {
    warn(`Event ${e.id} has no citations — every claim needs a source`);
  } else {
    for (const c of e.citations) {
      if (!sourceIds.has(c)) warn(`Event ${e.id} cites unknown source "${c}"`);
    }
  }

  // Chronological sanity check (string comparison works for YYYY, YYYY-MM, YYYY-MM-DD
  // and our "YYYY-MM-mid"/"YYYY-MM-DD-ish" variants share a sortable prefix).
  const normalised = (e.date || "").slice(0, 10);
  if (lastDate && normalised < lastDate) {
    warn(`Event ${e.id} (${e.date}) is out of chronological order (previous event was ${lastDate})`);
  }
  lastDate = normalised > (lastDate || "") ? normalised : lastDate;
}

for (const m of MITRE) {
  for (const field of ["tactic", "technique", "citations"]) {
    if (!m[field]) warn(`MITRE row "${m.technique || "?"}" is missing "${field}"`);
  }
  for (const c of m.citations || []) {
    if (!sourceIds.has(c)) warn(`MITRE row "${m.technique}" cites unknown source "${c}"`);
  }
}

if (EVENTS.length < 5) warn("Fewer than 5 events — is timeline-data.js populated?");

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s) found in timeline-data.js:\n`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}

console.log(
  `✓ timeline-data.js is consistent: ${EVENTS.length} events, ${SOURCES.length} sources, ${MITRE.length} MITRE ATT&CK rows, all citations resolve.`
);
