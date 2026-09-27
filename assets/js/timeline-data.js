/**
 * Single source of truth for the MOVEit / Cl0p breach timeline.
 *
 * `sources` is the numbered bibliography. Every fact in `events` and
 * `mitre` must cite at least one id from `sources` — scripts/validate-timeline.js
 * enforces this, and scripts/build-docs.js regenerates docs/sources.md and
 * docs/timeline.md from this file, so the diagram and the documentation
 * can never drift apart.
 */

const PHASES = [
  { id: "precedent",   label: "Precedent & staging",        color: "info" },
  { id: "exploit",     label: "Zero-day exploitation",      color: "crit" },
  { id: "disclosure",  label: "Disclosure & patching",      color: "warn" },
  { id: "cascade",     label: "Cascading breaches",         color: "accent" },
  { id: "attribution", label: "Attribution & advisories",   color: "violet" },
  { id: "aftermath",   label: "Extortion & long-tail impact", color: "umber" },
];

const SOURCES = [
  {
    id: "s1",
    authors: "CISA & FBI",
    title: "#StopRansomware: CL0P Ransomware Gang Exploits CVE-2023-34362 MOVEit Vulnerability",
    publication: "Cybersecurity Advisory AA23-158A",
    date: "2023-06-07",
    url: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-158a",
  },
  {
    id: "s2",
    authors: "Mandiant (Google Cloud)",
    title: "Zero-Day Vulnerability in MOVEit Transfer Exploited for Data Theft",
    publication: "Google Cloud Blog — Threat Intelligence",
    date: "2023-06-05",
    url: "https://cloud.google.com/blog/topics/threat-intelligence/zero-day-moveit-data-theft",
  },
  {
    id: "s3",
    authors: "Wikipedia contributors",
    title: "2023 MOVEit data breach",
    publication: "Wikipedia",
    date: "2026-09",
    url: "https://en.wikipedia.org/wiki/2023_MOVEit_data_breach",
    note: "Aggregator, cross-checked against the primary sources below",
  },
  {
    id: "s4",
    authors: "Emsisoft",
    title: "Unpacking the MOVEit Breach: Statistics and Analysis",
    publication: "Emsisoft Blog",
    date: "2024-06-28",
    url: "https://www.emsisoft.com/en/blog/44123/unpacking-the-moveit-breach-statistics-and-analysis/",
  },
  {
    id: "s5",
    authors: "TechCrunch",
    title: "MOVEit, the biggest hack of the year, by the numbers",
    publication: "TechCrunch",
    date: "2023-08-25",
    url: "https://techcrunch.com/2023/08/25/moveit-mass-hack-by-the-numbers/",
  },
  {
    id: "s6",
    authors: "RTÉ News",
    title: "5,000 Aer Lingus employees affected by cyber attack",
    publication: "RTÉ",
    date: "2023-06-06",
    url: "https://www.rte.ie/news/ireland/2023/0606/1387652-cyber-attack/",
  },
  {
    id: "s7",
    authors: "Cyber Security Hub",
    title: "Health Service Ireland latest victim of MOVEit cyber attack",
    publication: "CS Hub",
    date: "2023-06",
    url: "https://www.cshub.com/attacks/news/health-service-ireland-latest-victim-of-moveit-cyber-attack",
  },
  {
    id: "s8",
    authors: "DataBreachToday (ISMG)",
    title: "Known MOVEit Attack Victim Count Reaches 2,618 Organizations",
    publication: "DataBreachToday",
    date: "2023-12",
    url: "https://www.databreachtoday.com/known-moveit-attack-victim-count-reaches-2618-organizations-a-23640",
  },
  {
    id: "s9",
    authors: "Cybersecurity Dive",
    title: "Another MOVEit vulnerability found, as state and federal agencies reveal breaches",
    publication: "Cybersecurity Dive",
    date: "2023-06-16",
    url: "https://www.cybersecuritydive.com/news/third-moveit-CVE-state-federal-compromise/653235/",
  },
  {
    id: "s10",
    authors: "Progress Software",
    title: "MOVEit Transfer Critical Vulnerability — CVE-2023-35036 (9 June 2023)",
    publication: "Progress Community",
    date: "2023-06-09",
    url: "https://community.progress.com/s/article/MOVEit-Transfer-Critical-Vulnerability-CVE-2023-35036-June-9-2023",
  },
  {
    id: "s11",
    authors: "MITRE",
    title: "ATT&CK for Enterprise",
    publication: "MITRE ATT&CK",
    date: "2026-09",
    url: "https://attack.mitre.org/",
    note: "Technique framework used for the mapping below, not a source of case facts",
  },
];

const EVENTS = [
  {
    id: "e1",
    date: "2020-12",
    phase: "precedent",
    title: "FIN11's first managed-file-transfer zero-day: Accellion FTA",
    summary:
      "FIN11/TA505 — the actor later linked to Cl0p — exploits a zero-day in Accellion's legacy File Transfer Appliance. The playbook that will reappear in 2023 is set here: hit an internet-facing file-transfer product, drop a web shell, exfiltrate, extort without encrypting.",
    tags: ["Accellion FTA", "MFT playbook"],
    citations: ["s2"],
  },
  {
    id: "e2",
    date: "2023-01",
    phase: "precedent",
    title: "GoAnywhere MFT zero-day (CVE-2023-0669)",
    summary:
      "The same actor exploits a zero-day in Fortra's GoAnywhere MFT, compromising roughly 130 organisations in about ten days — a dress rehearsal for the much larger MOVEit campaign five months later.",
    tags: ["GoAnywhere MFT"],
    cveIds: ["CVE-2023-0669"],
    citations: ["s1", "s2"],
  },
  {
    id: "e3",
    date: "2023-01-mid",
    phase: "precedent",
    title: "Exploitation infrastructure quietly comes online",
    summary:
      "Mandiant later traces an IP address used in the May 2023 MOVEit exploitation back to mid-January 2023, when it was already hosting an RDP service under the same TLS certificate — roughly five months of staging before the zero-day is fired.",
    tags: ["Infrastructure reuse"],
    citations: ["s2"],
  },
  {
    id: "e4",
    date: "2023-05-20",
    phase: "precedent",
    title: "Second-stage infrastructure prepared",
    summary:
      "New RDP certificates are generated on the systems that will shortly be used for hands-on-keyboard data theft — the last staging step visible before exploitation begins.",
    tags: ["Staging"],
    citations: ["s2"],
  },
  {
    id: "e5",
    date: "2023-05-27",
    phase: "exploit",
    title: "CVE-2023-34362 exploited at scale over Memorial Day weekend",
    summary:
      "Cl0p/FIN11 begins mass-exploiting an unauthenticated SQL-injection zero-day in Progress Software's MOVEit Transfer. The LEMURLOOT web shell — disguised as a legitimate component and authenticated via a hard-coded header — is uploaded to internet-facing servers; in some cases large volumes of files are exfiltrated within minutes.",
    tags: ["Initial access", "LEMURLOOT"],
    cveIds: ["CVE-2023-34362"],
    citations: ["s1", "s2", "s3"],
  },
  {
    id: "e6",
    date: "2023-05-28",
    phase: "exploit",
    title: "First customer notices; first web-shell samples surface",
    summary:
      "Progress Software is alerted after 'unusual activity' is flagged by a customer. The first LEMURLOOT samples (human2.aspx variants) reach VirusTotal, giving defenders their earliest look at the tool.",
    tags: ["Detection"],
    citations: ["s2", "s3"],
  },
  {
    id: "e7",
    date: "2023-05-31",
    phase: "disclosure",
    title: "Public disclosure and emergency patch",
    summary:
      "Progress Software discloses CVE-2023-34362 and ships an emergency patch, warning it 'could lead to escalated privileges and unauthorized access.' The scale of exploitation already under way is not yet public.",
    tags: ["Patch released"],
    cveIds: ["CVE-2023-34362"],
    citations: ["s1", "s3"],
  },
  {
    id: "e8",
    date: "2023-06-02",
    phase: "disclosure",
    title: "CISA adds the flaw to its Known Exploited Vulnerabilities catalogue",
    summary:
      "Confirmation that exploitation is active in the wild; US federal civilian agencies are placed on an accelerated remediation deadline.",
    tags: ["CISA KEV"],
    citations: ["s1"],
  },
  {
    id: "e9",
    date: "2023-06-05",
    phase: "cascade",
    title: "Zellis breach cascades to UK household names — and to Ireland",
    summary:
      "UK payroll provider Zellis confirms compromise. British Airways, the BBC and Boots disclose that Zellis-held employee data was exposed; Aer Lingus reports roughly 5,000 current and former staff affected, including PPS numbers, name, address and employment dates.",
    tags: ["Zellis", "Supply chain", "Aer Lingus"],
    citations: ["s3", "s6"],
  },
  {
    id: "e10",
    date: "2023-06-06",
    phase: "attribution",
    title: "Cl0p claims credit; Mandiant folds UNC4857 into FIN11",
    summary:
      "Cl0p posts to its CL0P^_-LEAKS dark-web site claiming responsibility — and falsely claiming it had deleted any government data it stole. The same day, Mandiant merges the cluster tracked as UNC4857 into FIN11, citing shared infrastructure, certificate reuse and leak-site overlap.",
    tags: ["Attribution", "Cl0p"],
    citations: ["s2", "s3"],
  },
  {
    id: "e11",
    date: "2023-06-07",
    phase: "attribution",
    title: "CISA and FBI issue joint advisory AA23-158A",
    summary:
      "The #StopRansomware advisory details the SQL-injection technique, LEMURLOOT's HTTP-header command set, and dozens of file hashes, IPs and domains for defenders to hunt on.",
    tags: ["Joint advisory", "IOCs"],
    citations: ["s1"],
  },
  {
    id: "e12",
    date: "2023-06-08",
    phase: "cascade",
    title: "A second hop reaches Ireland's HSE",
    summary:
      "Ernst & Young — itself compromised via MOVEit — had been running MOVEit-based recruitment automation for Ireland's Health Service Executive. Around 20 individuals on an HSE recruitment panel have name, address and role details exposed: a breach two supply-chain hops from the original zero-day, with no financial data touched.",
    tags: ["HSE Ireland", "Second-order breach"],
    citations: ["s7"],
  },
  {
    id: "e13",
    date: "2023-06-09",
    phase: "disclosure",
    title: "A second SQL-injection flaw is patched",
    summary:
      "Progress Software discloses and patches CVE-2023-35036, a further SQL-injection vulnerability surfaced during the post-incident code review — one patched zero-day rarely means the rest of the codebase is clean.",
    tags: ["Second CVE"],
    cveIds: ["CVE-2023-35036"],
    citations: ["s3", "s10"],
  },
  {
    id: "e14",
    date: "2023-06-12",
    phase: "cascade",
    title: "Ofcom, Transport for London and further victims confirmed",
    summary:
      "UK regulator Ofcom confirms personal and confidential information was downloaded; Transport for London and other organisations join the growing public victim list.",
    tags: ["Regulator breach"],
    citations: ["s3"],
  },
  {
    id: "e15",
    date: "2023-06-15",
    phase: "disclosure",
    title: "A third flaw disclosed as US state and federal victims surface",
    summary:
      "Progress discloses CVE-2023-35708. The same day, Louisiana's Office of Motor Vehicles and Oregon's Driver and Motor Vehicle Services confirm breaches affecting millions of residents, and the US Department of Energy is confirmed among the federal agencies hit.",
    tags: ["Third CVE", "State government", "US federal"],
    cveIds: ["CVE-2023-35708"],
    citations: ["s3", "s9"],
  },
  {
    id: "e16",
    date: "2023-10-25",
    phase: "aftermath",
    title: "Tracked victim count passes 2,500 organisations",
    summary:
      "Independent trackers put confirmed compromised organisations above 2,500, more than 80% US-based. Leak-site postings continue for months after the exploitation window itself closed at the end of May.",
    tags: ["Long tail"],
    citations: ["s4", "s8"],
  },
  {
    id: "e17",
    date: "2024-06-28",
    phase: "aftermath",
    title: "Closing tally: 2,773 organisations, ~95.8 million people",
    summary:
      "Emsisoft's final count puts the campaign at 2,773 confirmed organisations and roughly 95.8 million individuals, reached overwhelmingly through one unauthenticated SQL-injection flaw in a single edge-facing file-transfer product — with no ransomware payload at all, only the threat of publication.",
    tags: ["Impact", "Exfiltration-only extortion"],
    citations: ["s4", "s5"],
  },
];

const MITRE = [
  { tactic: "Initial Access", technique: "T1190 — Exploit Public-Facing Application", note: "CVE-2023-34362 SQL injection against internet-facing MOVEit Transfer", citations: ["s1", "s11"] },
  { tactic: "Persistence", technique: "T1505.003 — Server Software Component: Web Shell", note: "LEMURLOOT (human2.aspx), header-authenticated ASP.NET web shell", citations: ["s1", "s2", "s11"] },
  { tactic: "Persistence", technique: "T1136.001 — Create Account: Local Account", note: "LEMURLOOT provisions a 'Health Check Service' admin-level account, then deletes it via SQL", citations: ["s2", "s11"] },
  { tactic: "Collection", technique: "T1005 — Data from Local System", note: "Enumeration and retrieval of files, folders and owners via injected SQL", citations: ["s2", "s11"] },
  { tactic: "Exfiltration", technique: "T1041 — Exfiltration Over C2 Channel", note: "Gzip-compressed files returned directly in the web shell's HTTP response", citations: ["s2", "s11"] },
  { tactic: "Impact", technique: "T1657 — Financial Theft", note: "Extortion via threatened publication on the CL0P^_-LEAKS site, no encryption payload used", citations: ["s3", "s4", "s11"] },
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { PHASES, SOURCES, EVENTS, MITRE };
}
if (typeof window !== "undefined") {
  window.TIMELINE_DATA = { PHASES, SOURCES, EVENTS, MITRE };
}
