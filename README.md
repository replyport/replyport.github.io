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
assets/measurement.js      launch attribution and optional OpenAI Ads measurement
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

## Launch measurement

`assets/measurement.js` keeps launch measurement deliberately small:

- It preserves the current OpenAI/UTM attribution parameters on internal site
  navigation without storing them in the ReplyPort app.
- For visitors arriving with `utm_source=chatgpt` and
  `utm_campaign=launch`, Microsoft Store links receive
  `cid=chatgpt_launch` so Partner Center can report Store page views and
  acquisitions for the campaign.
- It is ready to send the OpenAI standard `page_viewed` event and the custom
  `microsoft_store_click` event through the OpenAI Ads Measurement Pixel.
- The Pixel remains disabled while `OPENAI_PIXEL_ID` is blank. After creating
  the ReplyPort web data source in Ads Manager, set that public Pixel ID in
  `assets/measurement.js`. Never put an Ads API key or Conversions API key in
  this static site.

The Store-click event is a handoff event, not a purchase. Paid acquisitions and
installs are measured separately in Microsoft Partner Center.

## Setup guide

The public setup guide at [`setup/`](setup/) owns the three-step AI connection
process: share the `/ReplyPort` folder, copy the setup prompt from Control Centre,
and paste it into the AI to follow the guide. Installation, Outlook and mail-copying
prerequisites appear before those steps. The homepage links here instead of
maintaining its own instructions.

`setup/setup-prompt.txt` matches the copyable prompt on the page. The older
`chatgpt.txt` and `claude.txt` URLs retain the same prompt for existing links.
`agent-context.txt` redirects readers to the current guide; it is not an operating
protocol. Keep these download URLs working and do not invent setup instructions.

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
The no-send message stays visible in the film and How it works section.

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
  three-step email flow instead of one large band per idea;
- mono eyebrow labels on every block for scanability.

Layout tokens worth knowing: `--content` 1240px, `--gutter` 36px,
`--band-y` 48px, `--gap-lg` 52px. Breakpoints at 1180 / 980 / 767 / 520 / 360.

### Page structure

1. Shared top bar — How it works, Setup, Requirements and a Store link.
2. Homepage hero — product explanation, supported AI products, Store CTA and price.
3. Film — accessible controls, captions and a collapsible written description.
4. Use cases — triage, search across accounts and prepare several replies.
5. How it works — ask your AI, ReplyPort creates the draft, you review and send.
6. Requirements — Windows/Outlook/AI access, Store install and one Setup guide link.
7. Shared footer — product, installation and company links, plus affiliation notice.
8. Setup page — prerequisites, three steps, fallback prompt and troubleshooting.
9. Privacy page — full data-handling disclosures and contact information.

Keep detailed setup on `/setup/`. Avoid repeating feature tables, negative claims
or a second closing product pitch on the homepage. Retain the film's captions and
written description even when they repeat information: they provide access without
sound or video. Privacy disclosures should not be treated as marketing repetition.

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

## Product source

The canonical product intent and trust boundaries live in the private
`MailBridge` engineering repository — `AGENT_CONTEXT.md`, `PROTOCOL.md` and the
`docs/` acceptance and architecture notes.

## Local preview

```bash
python -m http.server 8123
```
