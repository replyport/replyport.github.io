# replyport.github.io

Public marketing site for **ReplyPort** — https://replyport.github.io

ReplyPort is a small Windows program that lets an AI assistant put real reply
drafts into your Outlook Drafts folder. It has no send path; only the person
sends.

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

There is no JavaScript. The mark's three states, the responsive nav disclosure
and the reduced-motion behaviour are all CSS.

## Design source

The approved design is `ReplyPort Site.dc.html` (Direction A) with
`build-notes.md` as the implementation spec. Both live in the design handoff,
not in this repo. This site reproduces that design; the desktop render is
99.99% pixel-identical to it at 1440px.

**Do not restyle without a corresponding change to the design source.** Tokens,
type scale and spacing in `assets/site.css` mirror the design file exactly.

## Placeholders still open

Everything below is marked in the HTML with a `data-pending` attribute and a
comment. Search for `PLACEHOLDER`.

| Item | `data-pending` | State |
|---|---|---|
| `Install for Windows` (nav, hero, section 8) | `install-url` | No public installer URL yet — all three anchor to `#beta` |
| `Watch a 40-second demo` | `demo-video` | `hidden` until the video exists |
| `Request a beta seat` | `beta-intake` | Needs a no-backend route (mailto / form / issue template) |
| Setup guide, Known limitations, Changelog | `docs` | Pages do not exist; rendered as plain text, not links |
| Privacy, What we store, Contact | `legal` | Destinations not decided; rendered as plain text, not links |

The `Release`, `Beta users` and `Drafts created` rows from the design are held
back until there are real figures — see `build-notes.md` §9. `Emails sent by
ReplyPort — 0` stays, because it is a positioning statement rather than a
metric. No version number or download size appears on the page by design.

## Local preview

```bash
python -m http.server 8123
```
