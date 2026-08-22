# Client proposal — Jeddah Sea

`Jeddah-Sea-Proposal.pdf` — 13-page A4 commercial proposal for Red Sea coastal
operators. This is the file to send. All contact details are filled in; the only
open commercial number is the one-time deployment fee.

## Still open

| Item | Where | Current text |
|---|---|---|
| One-time deployment fee | page 12 | `Quoted on brief` |

The 5,000 SAR annual support figure, the 7-day delivery ceiling, phone
(0506542290), website, and licence FL-004759783 are all set.

## Rebuilding the PDF

Screenshots in `opt/` are captured from the running app at 1440×900 @2x, then
resized to 1700px JPEG. Checkout screens are element captures of the modal panel.
To regenerate after editing `proposal.html`:

```bash
npm i playwright-core && node proposal/build-pdf.js
```

`build-pdf.js` renders `proposal.html` through headless Chrome and reports any
image that failed to load. Page geometry is driven by `@page { size: A4 }` plus
fixed `210mm × 297mm` `.page` blocks, so what the browser shows is what prints.
