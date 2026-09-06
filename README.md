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
assets/site.css            the only stylesheet
assets/fonts/*.woff2       Libre Franklin + Spline Sans Mono (self-hosted, OFL)
favicon.svg                32×32 mark
apple-touch-icon.png       180×180 mark
robots.txt, sitemap.xml, .nojekyll
```

There is no JavaScript. The mark states, the responsive nav disclosure and the
reduced-motion behaviour are all CSS.

## Distribution

The website does not host a direct `.exe` download. All install entry points go
to the Microsoft Store listing:

https://apps.microsoft.com/detail/9NQLG89QM7CL

This keeps installation on the Store/MSIX path rather than asking users to run a
directly downloaded executable.

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
The boundary stays visible — in the system-flow note, in the capability table
and in the early-access ledger — without occupying the conceptual centre.

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

1. Sticky compact top bar — mark, wordmark, four links, Store CTA.
2. Hero — headline, four claim rows, Store CTA, AI-surface chips; right column
   is a worked example panel plus an "at a glance" spec list.
3. Use-case strip — back from leave / multiple accounts / lots of replies.
4. System flow — AI product → ReplyPort (local, routing, verification) →
   Outlook Classic, with the no-send-path note.
5. Where you use it — supported surfaces and what they avoid.
6. How it works — three roles, then the capability/trust table with the Send row.
7. Windows & Outlook — requirements, setup, distribution and scope.
8. Early access — Store CTA and the "by design, not by setting" ledger.
9. Footer.

## Placeholders still open

Everything below is marked in the HTML with a `data-pending` attribute.

| Item | `data-pending` | State |
|---|---|---|
| `Watch a 40-second demo` | `demo-video` | `hidden` until the video exists |
| Setup guide, Known limitations | `docs` | Pages do not exist; rendered as plain text, not links |
| Privacy, What we store, Contact | `legal` | Destinations not decided; rendered as plain text, not links |

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
