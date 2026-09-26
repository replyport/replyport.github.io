# replyport.github.io

Public marketing site for **ReplyPort** — https://replyport.github.io

ReplyPort lets people use the AI products they already work in to search, triage
and prepare replies across the Outlook accounts already configured on their
Windows PC. It does not require an Outlook add-in or a cloud mailbox
integration, keeps each configured mailbox as its own routing and authority
domain, creates verified Outlook drafts locally, and has no send path.

## Stack

Hand-written static site. No framework, no build step, no backend — GitHub Pages
serves the files as they are.

```
index.html                 the whole page
setup/index.html           consumer-facing AI setup guide
setup/*.txt                plain-text bootstrap download fallbacks
assets/site.css            the only stylesheet
assets/film.js             homepage film player (progressive enhancement)
assets/film/               hero film: 1080p and 720p MP4, captions (VTT), poster (WebP + JPEG for social cards)
assets/fonts/*.woff2       Libre Franklin + Spline Sans Mono (self-hosted, OFL)
favicon.svg                32×32 mark
apple-touch-icon.png       180×180 mark
robots.txt, sitemap.xml, .nojekyll
```

JavaScript is progressive enhancement only: a clipboard helper on the setup
page, and `assets/film.js`, the homepage film player. Without JavaScript the
setup instructions stay readable and downloadable, and the film is a native
`<video>` with its own controls. The mark states, responsive nav disclosure and
reduced-motion behaviour are CSS.

## Distribution

The website does not host a direct `.exe` download. All install entry points go
to the Microsoft Store listing:

https://apps.microsoft.com/detail/restricted/9PPGN3H4QGJJ

This keeps installation on the Store/MSIX path rather than asking users to run a
directly downloaded executable.

## Setup guide

The public setup guide is implemented at [`setup/`](setup/). It gives normal
users a five-step flow: install ReplyPort and open Outlook Classic, enable the
mailboxes in ReplyPort Control Centre, make the Dropbox `/MailBridge` folder
available to the chosen AI surface, paste the short bootstrap instruction, and
then ask about mail normally. It keeps the no-Send boundary explicit.

The ChatGPT and Claude bootstrap text on that page is a short, consumer-facing
derivation of `bootstrap/CHATGPT_PROMPT.md` from the private ReplyPort
engineering repository. The full lean guide is published at
`setup/agent-context.txt` as a website release copy of the canonical
`AGENT_CONTEXT.md`. The private engineering repository remains the source of
truth. Canonical source commit:
`1d3f5b51c8f4cae1b8b92ebd530d21f49156cc11`. Synchronize the website release
copy whenever the canonical guide changes; this site must not become a second
source of truth.

## Positioning

The value hierarchy the page is built around, in order:

1. Use AI with the Outlook accounts already configured on the Windows PC.
2. No Outlook add-in and no cloud mailbox integration are required.
3. Work across several Outlook accounts while keeping routing and authority
   separate.
4. High-volume workflows: return from leave and triage a backlog, search across
   several work mailboxes, find what actually needs attention, prepare several
   reply drafts in one workflow.
5. Work from the AI surfaces the user already uses (ChatGPT / Work / Codex and
   Claude / Cowork / Claude Code).
6. Human-only Send is a strong trust boundary, but it is **not** the headline.

The old "we took the Send button away" pitch is deliberately no longer the lead.
The boundary stays visible — at the end of the film, in the fact strip under it,
in the capability table and in the early-access ledger — without occupying the
conceptual centre.

## Design

Identity comes from the approved Claude Design **Direction A** artifact
(`ReplyPort Site.dc.html` plus `build-notes.md`): black square + white diagonal
mark, Libre Franklin + Spline Sans Mono, off-white / ink / oxblood, square
corners, no shadows, hairline grids, rationed accent.

Information density comes from **Direction C** — but not its terminal
aesthetic. Concretely, relative to the original handoff:

- section padding cut from 88–104px to a `--band-y` of 48px (34px on mobile);
- section headings after the hero cut from 44–46px to a 21–28px clamp;
- body copy 15px/1.55, small copy 12.5–13.5px;
- more information side by side: spec lists, three-up strips, a compact
  system-flow diagram and a compact capability table instead of one large band
  per idea;
- mono eyebrow labels on every block for scanability.

Net effect at 1440px: the page went from **5714px to ~3485px tall (−39%)**
while carrying more information.

Layout tokens worth knowing: `--content` 1240px, `--gutter` 36px,
`--band-y` 48px, `--gap-lg` 52px. Breakpoints at 1180 / 980 / 767 / 520 / 360.

### Page structure

1. Sticky compact top bar — mark, wordmark, three links (How it works / Setup / Requirements), Store CTA.
2. Hero head — headline on the left; one-paragraph explanation, Store CTA and
   setup guide on the right.
3. The film — the 38-second narrated concept film at full content width, its
   control bar, a one-row fact strip (platform, mail client, add-in, accounts,
   AI surfaces, Send) and a collapsible written version of what it shows.
4. Use-case strip — back from leave / multiple accounts / lots of replies.
5. Where you use it — supported surfaces and what they avoid.
6. How it works — three roles, then the capability/trust table with the Send row.
7. Windows & Outlook — requirements, setup, distribution and scope.
8. Early access — Store CTA and the "by design, not by setting" ledger.
9. Footer.
10. Setup guide — consumer setup flow, ChatGPT and Claude bootstrap text, and
    an advanced link to the canonical full operating guide.

### The hero film

The film is the page's main explanation, not decoration. It is produced in the
separate `ReplyPort animation/hero-v2-concept-explainer` Remotion project; this
site ships web encodes of its master.

- `assets/film/replyport-film-1080.mp4` (H.264 1080p60, AAC, fast-start) and
  `replyport-film-720.mp4` (served to viewports up to 767px via `<source media>`).
- `assets/film/replyport-film-poster.webp` is the poster (frame at 18.9 s: the
  question resolved to the University account). The JPEG copy is only for
  Open Graph / Twitter cards.
- `assets/film/replyport-film.en.vtt` holds captions of the narration.

Playback: when at least half of the film is on screen it previews once,
silently, unless the visitor prefers reduced motion or has Data Saver on. It
pauses when scrolled away. Narration only starts from a click ("Watch the
film" / "Watch with sound"), which restarts the film from the beginning. Every
narrated line also appears as on-screen text in the film, and the written
version below the film describes each scene, so nothing depends on audio.

One film serves both colour schemes: it is a framed light object on either page
and ends on an ink card.

Local preview note: `python -m http.server` does not support HTTP range
requests, so seeking inside the video may not work locally. GitHub Pages
supports them.

## Placeholders still open

None. The earlier hidden `Watch a 40-second demo` placeholder is replaced by the
hero film. The setup guide and Privacy page are live; the old footer placeholders
for Known limitations, What we store, and Contact were removed rather than
shipping dead links.

## Copy guardrails

Preserve: Windows software; Outlook Classic; multiple configured accounts are
separate authority/routing domains; AI reasons over approved mirrored mail;
ReplyPort validates locally and creates real Outlook drafts; no ReplyPort send
path; only the person sends; provider-neutral architecture; Microsoft Store is
the only public install route.

Do not add: user counts, draft counts, install time, download size, unsupported
compatibility claims, or any implication of endorsement by Microsoft, OpenAI or
Anthropic. "No Outlook add-in required" is the correct framing; anything that
reads as bypassing an employer's or university's policy is not.

The three zeros in the early-access ledger are product-boundary statements, not
usage metrics.

## Product source

The canonical product intent and trust boundaries live in the private
`MailBridge` engineering repository — `AGENT_CONTEXT.md`, `PROTOCOL.md` and the
`docs/` acceptance and architecture notes.

## Local preview

```bash
python -m http.server 8123
```
