# Nusensia website

Responsive React + TypeScript implementation of the five screens in the supplied [Figma design](https://www.figma.com/design/nWaKTW3SSviZY0JjoxOpVZ/landing-page-nusensia?node-id=1-3822).

## Run locally

Requires Node.js 20.19+ or 22.12+ and pnpm.

```sh
pnpm install
pnpm dev
```

Open http://localhost:5173. Use `pnpm build` for the production build and `pnpm preview` to preview it.

## Pages and features

- `/` — Home
- `/solutions` — Software, Widya / Ampera, and interactive hardware categories
- `/portfolio` — Project links and resource previews
- `/clients` — Client logos, institutional procurement, and testimonials
- `/about` — Company story, principles, and team

Shared responsive navigation, mobile menu, accessible native dialogs, keyboard-operated hardware tabs, five-item testimonial carousel, ID / EN language selection with persistence, local fonts, local Figma assets, and a reduced-motion alternative are included. Unknown routes have a 404 screen. Routes use browser history; production hosting must rewrite unknown paths to `index.html`.

## Content and integration

Reusable content lives in `src/content.ts`; page components and shared interactions are in `src/App.tsx`; layout and responsive styles are in `src/styles.css`. The Indonesian copy is a translation of the English source design and should receive editorial review before launch.

- Consultation buttons open a validated form that **prepares a mailto draft** addressed to `hello@nusensia.com`. Users review and send it in their own email application. No message is sent by the website, and no backend or booking provider is assumed.
- CSIS and LMS links use the actual destinations embedded in Figma. Product buttons show the supplied product information and offer a demo request.
- Figma supplied a repeated document preview image, but no downloadable PDFs. “View” shows that preview; “Download” opens a request flow for the complete PDF. Replace this with the real PDF URLs when provided.
- Social profile URLs and legal documents were not supplied. Social buttons provide the company contact, and Privacy / Terms prepare requests for the corresponding information. Connect approved destinations before public launch.
- The hardware catalogue’s black image panels are present in the source Figma design and are intentionally retained. The specialized equipment tab offers a consultation because no catalogue content was supplied for that category.

## Design fidelity

Source desktop frames are 1440px wide. Layout adapts to tablet and mobile instead of scaling a fixed canvas. Original branding, logos, photographs, illustrations, screenshots, arrows, borders, and avatars are local assets in `public/assets`. Product and CTA backgrounds were exported as decorative assets to preserve Figma grain effects. The CTA background contains no text or controls; all website text and interactions remain native HTML.

Visible software headings use the exact two-second repeating motion keyframes from Figma, shared through `SectionHeading`. Motion is disabled when `prefers-reduced-motion` is enabled. The other motion nodes (`1:3990`, `1:3991`, `1:4254`, `1:4255`) belong to hidden placeholder title containers (`1:3988`, `1:4252`) and remain excluded, matching the visible design.

## Verification

With the local server running and Google Chrome installed:

```sh
pnpm test
```

The browser check covers all five routes at 1440, 1024, 768, 390, and 320px; horizontal overflow; image loading; console / request errors; navigation; mobile menu; tabs and keyboard control; carousel; validated email draft generation; language persistence; anchor navigation; and 404 behavior. It writes screenshots and an asset geometry report to `test-results/` (gitignored). No test sends messages or visits third-party project sites.

The production output is `dist/`. This project has not been published to a public host.
