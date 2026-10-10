# replyport.github.io

Public marketing site for **ReplyPort** — https://replyport.github.io

ReplyPort is a bring-your-own-AI, multi-mailbox bridge for Outlook Classic: one
AI conversation across the Outlook accounts already configured on a Windows PC,
with real drafts created in the right account. It does not require an Outlook add-in or a cloud mailbox
integration, keeps each configured mailbox as its own routing and authority
domain, creates verified Outlook drafts locally, and has no send path.

## Stack

Hand-written static site. No framework, no build step, no backend — GitHub Pages
serves the files as they are.

```
index.html                 the home page
ai-multiple-outlook-accounts/index.html   landing page: AI across several Outlook accounts
ai-for-outlook-classic/index.html         landing page: ways to use AI with Outlook Classic
setup/index.html           consumer-facing AI setup guide
setup/*.txt                plain-text bootstrap download fallbacks
docs/index.html            technical documentation / product reference
assets/site.css            the only stylesheet
assets/measurement.js      launch attribution and optional OpenAI Ads measurement
assets/film.js             homepage film player (progressive enhancement)
assets/screens/            product screenshots (WebP + JPEG/PNG fallback, social card)
assets/film/               hero film: 1080p and 720p MP4, captions (VTT), poster (WebP + JPEG for social cards)
assets/fonts/*.woff2       Libre Franklin + Spline Sans Mono (self-hosted, OFL)
favicon.svg                32×32 mark
apple-touch-icon.png       180×180 mark
robots.txt, sitemap.xml, .nojekyll
```

JavaScript is progressive enhancement only: a clipboard helper on the setup
page, the contents folding and current-section highlight on the docs page, and
`assets/film.js`, the homepage film player. Without JavaScript the
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
- Microsoft Store links receive a `cid` so Partner Center can report Store
  page views and acquisitions by source. Recognised campaigns take precedence:
  `utm_source=chatgpt&utm_campaign=launch` gives `chatgpt_launch`, and
  `utm_source=google&utm_campaign=search_oct26` gives `google_search_oct26`.
  Any other visit is labelled by the page the Store link was clicked on:
  `site_home_v2`, `site_multiacct_v1`, `site_generic_v1`, `site_setup_v1`,
  `site_docs_v1` or `site_privacy_v1`. Add a new campaign's mapping in
  `addMicrosoftCampaignId` before sending traffic to it.
- Every Store link click also sends the Google Ads conversion
  `AW-18493139821/Suf_CMn4kZAdEO3Wm_JE` (a Store handoff, not a purchase).
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

Since 9 October 2026 the site follows the commercial strategy in
`Dropbox/ReplyPort promotion/2026-10-07 ChatGPT Pro - first-principles commercial strategy.md`.
ReplyPort is a bring-your-own-AI, multi-mailbox bridge for Outlook Classic, aimed
first at independent professionals with two or more Outlook accounts. It is not
positioned as "Claude for Outlook" or any other provider's product.

Value hierarchy, in order:

1. One AI conversation across multiple Outlook accounts.
2. Real drafts created in the correct mailbox.
3. Use the AI the customer already prefers.
4. Keep Outlook Classic and existing accounts.
5. No Outlook add-in required.
6. ReplyPort has no send function.
7. One-time purchase.

Homepage headline: "One AI conversation across your Outlook accounts." The first
proof is the dark-mode Outlook screenshot (`assets/screens/outlook-drafts.*`).
Since 0.3.12 (attaching files to drafts is available) the web copy is the
unedited Store screenshot, including its PDF attachment.

Safety language supports the differentiation rather than leading it. Name native
integrations (Claude for Outlook, ChatGPT's Outlook apps, Copilot) only fairly:
never claim they cannot connect to Outlook or handle several accounts unless that
has been tested and dated.

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

1. Shared top bar — Use cases, How it works, Requirements, Setup, Docs and a Store link.
2. Homepage hero — headline, supporting message, Store CTA and price, proof strip,
   supported AI products, and the Outlook drafts screenshot as first proof.
3. Who it is for (`#who`) — people with more than one Outlook account; three set-ups.
4. Three jobs (`#use-cases`) — orient across accounts (screenshot), find it in
   whichever account received it (the film, with transcript), prepare drafts in
   the right identities (screenshot).
5. How it works (`#how`) — five steps, ending with the person pressing Send.
6. Data flow (`#data`) — what runs on the PC, what goes to Dropbox, what the AI sees.
7. Requirements and fit (`#windows`) — needs, accounts and mail limits, not-a-fit
   list, policy note, Store CTA and price.
8. Questions (`#faq`) — fair "when to use ReplyPort" note and short FAQ.
9. Shared footer — product, guides and company links, plus affiliation notice.
10. Setup page — prerequisites, three steps, fallback prompt and troubleshooting.
11. Privacy page — full data-handling disclosures and contact information.
12. Docs page — the technical reference: feature status, architecture, AI
    workflows, mailbox routing, mirroring and folder coverage, attachments,
    safety model, lifecycle, privacy summary, limitations, roadmap,
    troubleshooting, result codes and technical architecture.
13. Landing pages — `/ai-multiple-outlook-accounts/` (routing across accounts,
    identity, examples, limits) and `/ai-for-outlook-classic/` (the ways to use AI
    with Outlook, when ReplyPort fits, what it can and cannot do). Each must answer
    a different question from the homepage; do not add thin keyword variants.

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

## Maintaining the documentation page

`docs/index.html` must describe what Store users can rely on, derived from the
current MailBridge source, `PROTOCOL.md`, `AGENT_CONTEXT.md`, release records and
open issues, not from memory or intent.

- **Version, pending release and review date** appear in the *Documentation
  status* panel at the top of the page (marked with an HTML comment), and the
  *Release status* table under *Updates*. Elsewhere the page says "the current
  release". Exceptions are deliberate "from version X" notes for behaviour that
  older installations lack.
- **Status labels** are the only way to mark maturity: `st--yes` *Available*
  (in the current public Store release), `st--soon` *Awaiting Store* (in a package
  submitted to the Store, not yet in the public listing), `st--dev` *In
  development* (merged into the application source, in no submitted package),
  `st--planned` *Planned* (accepted direction, not built), `st--no` *Not
  supported*. A restriction that still applies to the public release stays
  documented as a restriction, with *In development* beside it if a fix is merged. Never mark a feature Available before the
  Store listing shows the release containing it. Check with the public Store API
  (`storeedgefd.dsx.mp.microsoft.com/v9.0/products/9PPGN3H4QGJJ`) or the display
  catalog's package list, not with Partner Center status alone.
- When a release becomes public, review in this order: the status panel, the
  *Release status* table and its "Merged, in no Store package yet" list, the
  *Feature status* table, *Known limitations*, *Planned and under
  investigation*, the "current release" vs "In development" columns in *Which
  Dropbox folder*, *Consent for mail copying* and *Upgrades, moved folders and
  recovery*, *ZIP files*, then the setup page. Mail-copying and folder wording on
  `setup/index.html` describes the current public release. Move shipped
  items out of the roadmap.
- The Setup page and the three `setup/*.txt` downloads must match the setup
  prompt in Control Centre's `AiSetupText.cs` exactly.
- Do not publish private issue numbers, private paths, mailbox addresses, test
  identities, keys or token material. Explaining the HMAC/idempotency design
  conceptually is fine.

## Product source

The canonical product intent and trust boundaries live in the private
`MailBridge` engineering repository — `AGENT_CONTEXT.md`, `PROTOCOL.md` and the
`docs/` acceptance and architecture notes.

## Local preview

```bash
python -m http.server 8123
```
