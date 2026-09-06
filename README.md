# replyport.github.io

Public marketing site for **ReplyPort** — https://replyport.github.io

ReplyPort lets people use compatible AI chats to search, triage and prepare
replies across the Outlook accounts already configured on their Windows PC.
It does not require an Outlook add-in, keeps mailbox routing separate, creates
verified Outlook drafts locally, and has no send path.

## Stack

Hand-written static site. No framework, no build step, no backend — GitHub Pages
serves the files as they are.

```
index.html                 the whole page
assets/site.css            the only stylesheet
assets/fonts/*.woff2       Libre Franklin + Spline Sans Mono (self-hosted, OFL)
favicon.svg                32×32 mark
apple-touch-icon.png       180×180 mark
robots.txt, sitemap.xml, .nojekyll
```

There is no JavaScript. The mark states, responsive nav disclosure and
reduced-motion behaviour are all CSS.

## Distribution

The website does not host a direct `.exe` download. All install entry points go
to the Microsoft Store listing:

https://apps.microsoft.com/detail/9NQLG89QM7CL

This keeps installation on the Store/MSIX path rather than asking users to run a
directly downloaded executable.

## Design and product source

The visual system started from the approved Claude Design Direction A artifact
(`ReplyPort Site.dc.html` plus `build-notes.md`). The live site now intentionally
evolves the information architecture and copy while preserving that visual
identity: black-square/white-stroke mark, Libre Franklin + Spline Sans Mono,
off-white/ink/oxblood palette, grid, spacing and responsive treatment.

The canonical product intent and trust boundaries remain in the private
`SergeyVAlexeev/MailBridge` engineering repository, especially
`PRODUCT_VISION.md`, `AGENT_CONTEXT.md` and `PROTOCOL.md`.

## Current positioning

The site leads with the product value rather than the safety boundary:

- no Outlook add-in required;
- work across multiple configured Outlook accounts while keeping routing separate;
- use compatible AI chats for search, triage and batch reply preparation;
- real drafts are created and verified in Outlook;
- only the user sends.

The no-send property remains a core trust feature, but it is not the primary
marketing headline.

## Placeholders still open

Everything below is marked in the HTML with a `data-pending` attribute and a
comment. Search for `PLACEHOLDER`.

| Item | `data-pending` | State |
|---|---|---|
| `Watch a 40-second demo` | `demo-video` | `hidden` until the video exists |
| Setup guide, Known limitations, Changelog | `docs` | Pages do not exist; rendered as plain text, not links |
| Privacy, What we store, Contact | `legal` | Destinations not decided; rendered as plain text, not links |

No invented version number, download size, user count or usage metric should be
added to the marketing page. `Emails sent by ReplyPort — 0` is a product-boundary
statement, not a usage metric.

## Local preview

```bash
python -m http.server 8123
```
