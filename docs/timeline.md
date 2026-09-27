# Timeline: the MOVEit Transfer / Cl0p mass-exploitation campaign

Plain-text mirror of `index.html`, generated from `assets/js/timeline-data.js`. See [sources.md](sources.md) for the numbered bibliography and [mitre-attck-mapping.md](mitre-attck-mapping.md) for the ATT&CK mapping.


## Precedent & staging

**2020-12 — FIN11's first managed-file-transfer zero-day: Accellion FTA** [2]

FIN11/TA505 — the actor later linked to Cl0p — exploits a zero-day in Accellion's legacy File Transfer Appliance. The playbook that will reappear in 2023 is set here: hit an internet-facing file-transfer product, drop a web shell, exfiltrate, extort without encrypting.

**2023-01 — GoAnywhere MFT zero-day (CVE-2023-0669) (CVE-2023-0669)** [1][2]

The same actor exploits a zero-day in Fortra's GoAnywhere MFT, compromising roughly 130 organisations in about ten days — a dress rehearsal for the much larger MOVEit campaign five months later.

**2023-01-mid — Exploitation infrastructure quietly comes online** [2]

Mandiant later traces an IP address used in the May 2023 MOVEit exploitation back to mid-January 2023, when it was already hosting an RDP service under the same TLS certificate — roughly five months of staging before the zero-day is fired.

**2023-05-20 — Second-stage infrastructure prepared** [2]

New RDP certificates are generated on the systems that will shortly be used for hands-on-keyboard data theft — the last staging step visible before exploitation begins.


## Zero-day exploitation

**2023-05-27 — CVE-2023-34362 exploited at scale over Memorial Day weekend (CVE-2023-34362)** [1][2][3]

Cl0p/FIN11 begins mass-exploiting an unauthenticated SQL-injection zero-day in Progress Software's MOVEit Transfer. The LEMURLOOT web shell — disguised as a legitimate component and authenticated via a hard-coded header — is uploaded to internet-facing servers; in some cases large volumes of files are exfiltrated within minutes.

**2023-05-28 — First customer notices; first web-shell samples surface** [2][3]

Progress Software is alerted after 'unusual activity' is flagged by a customer. The first LEMURLOOT samples (human2.aspx variants) reach VirusTotal, giving defenders their earliest look at the tool.


## Disclosure & patching

**2023-05-31 — Public disclosure and emergency patch (CVE-2023-34362)** [1][3]

Progress Software discloses CVE-2023-34362 and ships an emergency patch, warning it 'could lead to escalated privileges and unauthorized access.' The scale of exploitation already under way is not yet public.

**2023-06-02 — CISA adds the flaw to its Known Exploited Vulnerabilities catalogue** [1]

Confirmation that exploitation is active in the wild; US federal civilian agencies are placed on an accelerated remediation deadline.


## Cascading breaches

**2023-06-05 — Zellis breach cascades to UK household names — and to Ireland** [3][6]

UK payroll provider Zellis confirms compromise. British Airways, the BBC and Boots disclose that Zellis-held employee data was exposed; Aer Lingus reports roughly 5,000 current and former staff affected, including PPS numbers, name, address and employment dates.


## Attribution & advisories

**2023-06-06 — Cl0p claims credit; Mandiant folds UNC4857 into FIN11** [2][3]

Cl0p posts to its CL0P^_-LEAKS dark-web site claiming responsibility — and falsely claiming it had deleted any government data it stole. The same day, Mandiant merges the cluster tracked as UNC4857 into FIN11, citing shared infrastructure, certificate reuse and leak-site overlap.

**2023-06-07 — CISA and FBI issue joint advisory AA23-158A** [1]

The #StopRansomware advisory details the SQL-injection technique, LEMURLOOT's HTTP-header command set, and dozens of file hashes, IPs and domains for defenders to hunt on.


## Cascading breaches

**2023-06-08 — A second hop reaches Ireland's HSE** [7]

Ernst & Young — itself compromised via MOVEit — had been running MOVEit-based recruitment automation for Ireland's Health Service Executive. Around 20 individuals on an HSE recruitment panel have name, address and role details exposed: a breach two supply-chain hops from the original zero-day, with no financial data touched.


## Disclosure & patching

**2023-06-09 — A second SQL-injection flaw is patched (CVE-2023-35036)** [3][10]

Progress Software discloses and patches CVE-2023-35036, a further SQL-injection vulnerability surfaced during the post-incident code review — one patched zero-day rarely means the rest of the codebase is clean.


## Cascading breaches

**2023-06-12 — Ofcom, Transport for London and further victims confirmed** [3]

UK regulator Ofcom confirms personal and confidential information was downloaded; Transport for London and other organisations join the growing public victim list.


## Disclosure & patching

**2023-06-15 — A third flaw disclosed as US state and federal victims surface (CVE-2023-35708)** [3][9]

Progress discloses CVE-2023-35708. The same day, Louisiana's Office of Motor Vehicles and Oregon's Driver and Motor Vehicle Services confirm breaches affecting millions of residents, and the US Department of Energy is confirmed among the federal agencies hit.


## Extortion & long-tail impact

**2023-10-25 — Tracked victim count passes 2,500 organisations** [4][8]

Independent trackers put confirmed compromised organisations above 2,500, more than 80% US-based. Leak-site postings continue for months after the exploitation window itself closed at the end of May.

**2024-06-28 — Closing tally: 2,773 organisations, ~95.8 million people** [4][5]

Emsisoft's final count puts the campaign at 2,773 confirmed organisations and roughly 95.8 million individuals, reached overwhelmingly through one unauthenticated SQL-injection flaw in a single edge-facing file-transfer product — with no ransomware payload at all, only the threat of publication.

