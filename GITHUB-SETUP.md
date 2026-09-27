# Publishing to GitHub

The local repository is already initialised with an initial commit on `main`.

## 1. Create the repository

On GitHub, create a new **empty** public repository called `moveit-clop-breach-timeline` (no README, licence or .gitignore).

## 2. Push

```bash
cd moveit-clop-breach-timeline
git remote add origin https://github.com/<your-username>/moveit-clop-breach-timeline.git
git push -u origin main
```

## 3. Turn on GitHub Pages

Repository → **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The workflow in `.github/workflows/pages.yml` validates the timeline data and deploys the page on every push to `main`. The site will be live at:

```
https://<your-username>.github.io/moveit-clop-breach-timeline/
```

Add that URL to the repository's **About** section.

## 4. Suggested repository settings

- **Description:** A sourced, technical timeline of the 2023 MOVEit Transfer / Cl0p mass-exploitation campaign, with a MITRE ATT&CK mapping and full bibliography
- **Topics:** `cyber-threat-intelligence` `moveit` `cl0p` `data-breach` `incident-timeline` `mitre-attck` `cybersecurity` `edge-security`
- **Social preview:** take a screenshot of `index.html` and upload it under Settings → Social preview
