# MOVEit / Cl0p Breach Timeline

A sourced, technical timeline of the 2023 MOVEit Transfer mass-exploitation campaign — one unauthenticated SQL-injection zero-day that reached over 2,700 organisations and roughly 96 million people, without a single ransomware payload.

> **Live demo:** enable GitHub Pages (see [GITHUB-SETUP.md](GITHUB-SETUP.md)) and open `https://<your-username>.github.io/moveit-clop-breach-timeline/`

## Why this exists

Most "breach timeline" write-ups are a listicle of dates. This one tries to do three things a CTI read-out should: show the actor's pattern *before* the headline event (Accellion FTA → GoAnywhere MFT → MOVEit Transfer is one group running the same play three times), map the intrusion onto MITRE ATT&CK, and cite a primary or authoritative source for every claim rather than asserting facts from memory.

## What's inside

| Component | Description |
|---|---|
| `index.html` | Interactive timeline diagram — filterable by phase, light/dark, with inline citation links |
| [`docs/timeline.md`](docs/timeline.md) | Plain-text mirror of the timeline, generated from the data file |
| [`docs/sources.md`](docs/sources.md) | Full numbered bibliography, generated from the data file |
| [`docs/mitre-attck-mapping.md`](docs/mitre-attck-mapping.md) | MOVEit/Cl0p mapped onto MITRE ATT&CK for Enterprise, generated from the data file |
| [`assets/js/timeline-data.js`](assets/js/timeline-data.js) | **Single source of truth** — 17 dated events, 11 sources, 6 ATT&CK rows |

## The diagram

Six phases, colour-coded and independently toggleable: **precedent & staging** (2020–May 2023), **zero-day exploitation** (27–31 May 2023), **disclosure & patching**, **cascading breaches**, **attribution & advisories**, and **extortion & long-tail impact** (through mid-2024). Each event card carries its date, a two-to-three sentence technical summary, relevant CVE/tool tags, and bracketed links straight down to the source in the bibliography — click `[2]` on the "zero-day exploited" card and it jumps to the Mandiant citation that supports it.

## Quick start

No build step and no dependencies to view it. Open `index.html` in a browser, or serve the folder:

```bash
git clone https://github.com/<your-username>/moveit-clop-breach-timeline.git
cd moveit-clop-breach-timeline
npm run serve        # or: python3 -m http.server 8080
```

Maintainer scripts (Node 18+):

```bash
npm run validate     # every event/MITRE row cites a real source id; dates are chronological
npm run docs         # regenerate docs/timeline.md, docs/sources.md, docs/mitre-attck-mapping.md
```

## How the facts were checked

Every event cites at least one source in [`docs/sources.md`](docs/sources.md). Primary and authoritative sources were preferred — the CISA/FBI joint advisory (AA23-158A), Mandiant's threat-intelligence write-up, and Progress Software's own vulnerability advisory — with Wikipedia used only as a cross-checking aggregator, and dated news reporting (RTÉ, Cyber Security Hub, TechCrunch, Cybersecurity Dive) used for country-specific and impact-scale detail that the primary advisories don't cover. `npm run validate` enforces that no event or ATT&CK row can exist without a citation that resolves to a real entry in the bibliography, so the diagram and its sourcing can't silently drift apart.

## Adapting or extending it

Everything content-related lives in [`assets/js/timeline-data.js`](assets/js/timeline-data.js): phases, events, sources and the ATT&CK mapping. Add a source first, then reference its `id` from any event — `npm run validate` will refuse an event that cites a source that doesn't exist. Ideas for follow-ups: a second case study built the same way (e.g. the October 2023 Okta support-system breach, or the Capital One 2019 SSRF/S3 case) to compare initial-access patterns side by side; a decision-tree overlay showing what would have stopped each phase (WAF rule, network segmentation, egress filtering, vendor patch SLA); an Ireland/EU-specific companion note on NIS2 Article 23 notification timelines against the dates in this campaign.

## Licence

MIT for the code and presentation. The underlying facts are drawn from the public sources cited in `docs/sources.md`; this project claims no ownership over them and is not affiliated with Progress Software, Cl0p, CISA, Mandiant, or any organisation named in the timeline.
