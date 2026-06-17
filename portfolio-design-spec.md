# Transparent Machine — Complete Product Design Specification

> *Every abstraction has an underlying mechanism.*

---

## Preface

This document is the complete design vision, interaction model, and visual blueprint for a personal portfolio that does not feel like a portfolio. It is not a template. It is not a starting point to be iterated. It is the final direction.

The site is called **Transparent Machine** — internally only. It is never referred to by that name to visitors. It simply behaves like one.

---

---

# 1. CORE PRODUCT VISION

---

## What Is This Website?

It is a living demonstration of the belief that built it.

Most portfolios are galleries — rows of finished work, frozen behind glass. This site is different. It is an architectural artifact that reveals itself progressively. Every surface conceals a mechanism. Every navigation event is a system event. The work is presented not as outcomes but as systems that were designed, built, and understood.

The website is also the primary piece of work in the portfolio. It embodies the same thinking that produced everything inside it.

## How Should Visitors Describe It After Leaving?

**The casual visitor** leaves saying: *"That was a really clean, elegant portfolio. I liked how it explained things."*

**The curious visitor** leaves saying: *"There were layers to everything. The more I looked, the more I found. It felt like reading documentation that was actually interesting."*

**The systems-minded visitor** leaves saying: *"The whole thing is built like the systems it's about. Navigation felt like routing. You could actually inspect how the site worked. I kept peeling things back."*

All three experiences are valid. All three are intentional.

## The Emotional Impression

**Intellectual delight.** The rare feeling of finding depth where you expected surface. Not overwhelm — delight. The experience of encountering a mind that thinks carefully about mechanisms and isn't afraid to show its work.

There should be a moment — different for each visitor, but guaranteed to happen — where they realize the site is doing something more than displaying information. That moment of recognition is the emotional core of the experience.

**Confidence without performance.** The site should feel like a person who doesn't need to convince you of anything. It simply shows you something true and lets you draw your own conclusions.

---

---

# 2. VISUAL LANGUAGE

---

## Color System

The palette is designed around a single tension: **warm surfaces, cool precision**. The background is human (slightly warm, paper-like). The structural elements are engineered (cool, exact, blueprint-precise). This is the visual expression of the site's core belief: that human thinking produces machine clarity.

### Foundation Surfaces

| Token | Hex | Role |
|---|---|---|
| `canvas` | `#F4F3EF` | Primary page background |
| `surface-0` | `#FFFFFF` | Elevated cards, modals |
| `surface-1` | `#EDECE8` | Recessed panels, diagram backgrounds |
| `surface-2` | `#E4E2DC` | Deep recesses, structural borders |

### Ink (Text)

| Token | Hex | Role |
|---|---|---|
| `ink-100` | `#1C1B1E` | Primary text — near-black, barely cool |
| `ink-60` | `#706D78` | Secondary text, labels, captions |
| `ink-30` | `#B4B1BB` | Tertiary text, placeholders, ghost elements |

### System Palette (The Signal Layer)

This is the architectural accent language. Used sparingly. Never decoratively.

| Token | Hex | Role |
|---|---|---|
| `signal-blue` | `#3D62A0` | Primary accent, active links, routing paths, active nodes |
| `signal-blue-subtle` | `#EEF2FA` | Background tint for blue-accented content blocks |
| `system-green` | `#2E7A59` | Resolved states, successful operations, "live" indicators |
| `system-amber` | `#C97A20` | Layer-peel moments, inspecting/revealing states |
| `system-amber-subtle` | `#FDF3E7` | Background tint during reveal animations |

The signal palette should never appear in large surface areas. These colors exist to say: *something is happening here.* Their restraint is what gives them meaning.

### Shadow System (Multi-Layer Soft Shadows)

All shadows use `#1C1B1E` as the shadow color.

| Level | Value | Used For |
|---|---|---|
| `shadow-resting` | `0 1px 3px rgba(28,27,30,0.04), 0 4px 12px rgba(28,27,30,0.06)` | Cards at rest |
| `shadow-hover` | `0 2px 8px rgba(28,27,30,0.06), 0 8px 24px rgba(28,27,30,0.10)` | Cards on hover |
| `shadow-elevated` | `0 4px 16px rgba(28,27,30,0.08), 0 16px 48px rgba(28,27,30,0.12)` | Modals, system panel |

### Dark Mode

Dark mode is not an inversion of light mode. It is a parallel system with its own calibrated values.

| Token | Hex |
|---|---|
| `canvas-dark` | `#141318` |
| `surface-dark-0` | `#1E1C22` |
| `surface-dark-1` | `#252329` |
| `ink-dark-100` | `#F0EFF2` |
| `ink-dark-60` | `#8C8996` |
| `signal-blue-dark` | `#6B8ECC` |
| `system-green-dark` | `#4AA87A` |

In dark mode, the diagram path lines are slightly lighter and slightly more luminous. The background grid in Internals mode becomes visible at a higher opacity (4% vs 2%) because the surface has less inherent texture to imply structure.

---

## Typography

Typography is the primary carrier of the site's personality. Two faces do the work. A third makes a rare, precise appearance as an accent.

### Display Face — Instrument Serif

Used for: hero headlines, project titles, key statements, pull quotes.

- Weight: 400 Regular — the restraint is the statement. Bold display type would read as shouting. This site speaks precisely.
- Italic: Used for quotations, emphasis, and moments of reflection. Never for decoration.
- Size range: 56px–96px desktop, 36px–64px mobile
- Line height: 1.10–1.15
- Letter spacing: –0.02em to –0.04em (tighten as size increases)

**The rule:** Instrument Serif appears fewer times per page than you think it should. When it appears, it matters.

### Body Face — Instrument Sans

Used for: all body text, navigation links, labels, UI chrome, form elements.

- Weights: 400 body, 500 medium emphasis, 600 for UI labels and navigation
- Size range: 14px–18px
- Line height: 1.65–1.70 for long-form body; 1.2–1.3 for UI elements
- Letter spacing: 0 to +0.01em

### Technical Accent Face — JetBrains Mono

Used for: structural labels (in Internals mode), routing indicators, depth layer labels, metadata identifiers, protocol/system references in diagrams.

- Weight: 400 only
- Size: 10px–13px (always small — this face earns its presence through precision, not size)
- Uppercase for labels: `PROJECT_01`, `LAYER 0`, `COMPONENT: HERO`
- Normal case for values: `3.2ms`, `200 OK`, `/work/slug`
- **Usage constraint:** JetBrains Mono should occupy no more than 5% of text on any given page. Its scarcity is its signal.

### Type Scale

| Label | Font | Size | Weight | Use |
|---|---|---|---|---|
| `hero-xl` | Instrument Serif | 88px | 400 | Single-page hero only |
| `hero` | Instrument Serif | 64px | 400 | Project titles, large headings |
| `heading` | Instrument Serif | 40px | 400 | Section headings |
| `subheading` | Instrument Sans | 24px | 500 | Subsection headers |
| `body-lg` | Instrument Sans | 18px | 400 | Project narrative text |
| `body` | Instrument Sans | 16px | 400 | Standard body text |
| `label` | Instrument Sans | 14px | 600 | UI labels, nav items |
| `caption` | Instrument Sans | 13px | 400 | Supporting information |
| `mono-label` | JetBrains Mono | 11px | 400 | System identifiers, structural labels |
| `mono-data` | JetBrains Mono | 13px | 400 | Technical values, status |

---

## Shapes and Surfaces

**Border radius vocabulary:**

| Context | Radius | Rationale |
|---|---|---|
| Content cards | 12px | Approachable but structured — not pill-soft |
| Project diagram container | 16px | Slightly more generous — this is the showpiece |
| Chips and tags | 6px | Compact, precise |
| Input fields | 8px | Clean, usable |
| Depth indicators | 4px | Small elements need subtler rounding |
| Structural dividers | 0px | Lines have no personality — only function |
| System panel (Internals) | 12px left edges only | Slides in from the right; right edge meets viewport edge |

**Surface layering principle:** Every depth level in the experience corresponds to a surface level in the palette. Surface-0 is the top (most elevated). Surface-2 is the deepest visible layer. When you peel a layer, you descend in the surface hierarchy. This creates a physical logic: going deeper means going "into" the material.

---

## Spacing

Base unit: 4px. Everything derives from this.

```
4px  → micro: inline icons, tight label gaps
8px  → small: between related elements
12px → compact: caption-to-content gap
16px → base: default element separation
24px → medium: between sibling elements in a list
32px → section-internal: between content blocks in a section
48px → section: top/bottom padding of most sections
64px → section-large: major sections
96px → vertical rhythm: between major page sections
128px → breathing room: hero vertical padding
192px → page-scale: top/bottom page margin on long sections
```

---

## Motion Principles

### Philosophy

**Motion communicates, or it does not exist.**

Every animation on this site answers the question: *what does this motion tell the visitor?* If the answer is "nothing," the animation is cut. Decorative motion is a form of dishonesty — it implies effort where there is only distraction.

There are three legitimate reasons for motion on this site:

1. **Revealing hierarchy** — content appearing communicates that depth was discovered
2. **Confirming state change** — transitions communicate that the system responded
3. **Teaching the metaphor** — routing animations communicate that the site is a living system

### Timing Curves

Three curves. No others.

| Name | Value | Character | Used For |
|---|---|---|---|
| `spring` | `cubic-bezier(0.16, 1, 0.3, 1)` | Quick start, confident settle | Hover states, UI feedback, small reveals |
| `architectural` | `cubic-bezier(0.4, 0, 0.2, 1)` | Deliberate, measured, purposeful | Layer peeling, panel open/close |
| `routing` | `cubic-bezier(0.22, 1, 0.36, 1)` | Fast path-finding, smooth arrival | Navigation transitions |

### Duration Scale

| Name | Duration | Used For |
|---|---|---|
| `instant` | 80ms | State color changes, immediate feedback |
| `micro` | 120–160ms | Hover transitions, focus rings |
| `standard` | 280–340ms | Panel open/close, tab switching |
| `narrative` | 500–800ms | Page entry sequences, section reveals |
| `cinematic` | 800–1200ms | Layer peel, Internals mode activation |

**Exit animations are 60% of their entry duration.** Things leave faster than they arrive. This is physically intuitive and prevents the experience from feeling sluggish.

### The Staggered Reveal Principle

When multiple elements enter a view together (e.g., a list of project cards), they do not arrive simultaneously. They arrive in sequence with a small stagger: 60ms between each element. The effect: the system "building itself" rather than content "loading." This is not a cosmetic choice — it teaches visitors the hierarchy of the content.

### Motion Accessibility

All animations respect `prefers-reduced-motion`. When this preference is set:
- Fades are permitted (opacity transitions only)
- All translate/scale animations are eliminated
- The routing animation is replaced with a simple opacity transition
- The Internals mode reveals labels without the sequential choreography

---

## Illustration Style

There are no illustrations in the traditional sense. The **architectural diagram** is the illustration language. It is the primary visual asset of the entire site.

### Diagram Grammar

**Nodes:** Small circles. Radius 4–8px at normal scale, 6–12px for key components in hero diagrams. Never squares. Never icons inside nodes (at this scale — at larger detail views, small identifiers are permitted). Color: Signal Blue fill for active nodes, surface-0 with signal-blue stroke for passive nodes.

**Edges (Connection Paths):** Bezier curves — never straight lines, never 90-degree bends. The paths have a slight, natural curve that implies directionality without needing arrows on every edge. Stroke weight: 1px for secondary paths, 1.5px for primary data flows. Color: signal-blue at 60% opacity for primary flows, ink-30 for passive/background connections.

**Arrowheads:** Small, clean, 6px. Used selectively — only on edges where direction is the information. A connection between two peer components needs no arrow.

**Labels:** JetBrains Mono, 11px, ink-60. Node labels appear below the node. Edge labels appear at the midpoint of the edge, slightly offset. Never overlap paths.

**Animation — Path Drawing:** When a diagram enters the viewport, its edges draw themselves over 800ms. The order: primary data flows first, secondary connections after, labels last (fade in at 700ms). The effect is the system assembling itself as you watch.

**Animation — Active Pulse:** On homepage diagrams and in Systems Lab, active paths pulse. A subtle circular ripple emanates from the source node every 4 seconds. The ripple: signal-blue at 30% opacity, expanding from 8px to 24px radius, fading to 0 as it expands. One pulse at a time. Never multiple simultaneous pulses on the same diagram.

**Scale Range:**
- Miniature (project cards): 200×120px — gestural, recognizable, not detailed
- Standard (section diagrams): 500×320px — readable labels, clear topology
- Hero (project signature): full viewport width × 380px — detailed, annotated, the definitive view

---

---

# 3. INTERACTION PHILOSOPHY

---

## Navigation as Request Resolution

The site's primary metaphor: **every navigation action is a request being processed and resolved.**

This is never explained to visitors. It is demonstrated.

### The Routing Animation

When a visitor clicks any navigation link:

**Phase 1 — Request Sent (0–200ms):**
The current page's content gracefully composes out. Text and blocks slide upward by 12px while fading to 0% opacity. This is "the response being returned" — content departing the view. The navigation bar dims slightly (to 70% opacity), communicating that the system is mid-operation.

**Phase 2 — In Transit (200–500ms):**
A single small dot (8px, signal-blue) appears at the position of the clicked link and traverses a smooth bezier path to the center of the content area. The path is faint (signal-blue at 15% opacity), drawn ahead of the dot. The nav bar returns to full opacity as the dot arrives.

**Phase 3 — Response Resolved (500–900ms):**
New content "arrives." Elements enter from a neutral position (y: +16px) and settle into place in staggered sequence. The page is fully readable by 900ms from the initial click.

**The intentionality:** A first-time visitor may not consciously register this animation — the timing is short enough to feel like polish rather than performance. A systems-minded visitor will recognize the request/response metaphor immediately.

### Hover States on Navigation Links

Navigation links do not have underlines. On hover, the text color shifts from ink-60 to ink-100, and a very thin signal-blue underline draws from left to right (150ms, `spring` curve). The underline is not decoration — it is a signal that this link leads somewhere.

---

## The Depth System — Layer Peeling

Every content block that contains additional layers of explanation shows a **depth indicator** in its bottom-right corner.

### The Depth Indicator

A small stack of three horizontal lines:
```
████████  (100% opacity)
██████    (50% opacity)
████      (25% opacity)
```
Dimensions: 16px wide × 11px tall, with 3px between each line. Color: ink-30 at rest, signal-blue on hover. The visual language: three layers of content, each slightly less visible than the last.

A subtle label appears on hover: `SEE HOW THIS WORKS` in JetBrains Mono, 10px, signal-blue, positioned above the indicator.

### The Reveal Sequence

**Layer 0 → Layer 1 reveal:**

1. Visitor hovers depth indicator — indicator shifts to signal-blue, label appears (120ms fade)
2. Visitor clicks — the block performs a clean expansion:
   - Existing content (Layer 0) slides upward by 8px and shifts to 70% opacity (300ms, `architectural` curve)
   - Below it, a new section unfolds downward from 0px height to its natural height
   - The revealed section has surface-1 background with a subtle left border: 2px, signal-blue at 40% opacity
   - A small breadcrumb appears at the top of the revealed content in JetBrains Mono: `SURFACE → MECHANISM`
   - A close control (× in ink-60) sits at the top right
3. The revealed content fades into place as the expansion completes

**Layer 1 → Layer 2 reveal:** Uses identical mechanics. The breadcrumb becomes `SURFACE → MECHANISM → IMPLEMENTATION`. The second-level reveal uses system-amber instead of signal-blue for its left border — communicating increased depth, a different register.

### Three Standard Depths

| Layer | Name | Audience | Content |
|---|---|---|---|
| 0 | Surface | Anyone | What this is and why it matters. No assumed technical knowledge. |
| 1 | Mechanism | Curious visitors | How this works. Technical but accessible — explains the system. |
| 2 | Implementation | Developer audience | The actual decisions made. Tradeoffs. What was tried and rejected. |

### What Layer Peeling Is Not

Layer peeling is **not** a tooltip. It is not a modal. It is not a sidebar. It is an in-context expansion that restructures the current content block. The visitor never loses their place in the page.

Layer peeling is **not** required to understand the site. Layer 0 is always complete. Layers 1 and 2 are gifts for the curious.

---

## Information Reveal Through Scroll

Content reveals through scroll position — never on page load, never on a timer.

**Entry sequence for each major section:**

1. As the section enters the viewport (threshold: 15% visible), a thin horizontal separator line draws across the full content width from left to right (400ms, signal-blue at 20% opacity)
2. The section label appears immediately after the line completes (JetBrains Mono, 11px, signal-blue, uppercase)
3. Section content enters in stagger: each element fades in and rises 16px over 500ms, with 80ms delay between elements
4. If the section contains a diagram, the diagram container appears first (as a surface-1 rectangle), then the paths draw themselves beginning 200ms after the container appears

**No scroll-jacking.** Native browser scroll only. All animations are triggered by scroll position but never controlled by it. The visitor's scroll behavior is not interrupted or overridden under any circumstances.

---

## Page-Level Transitions

Beyond the routing animation, entire page entries follow a deliberate sequence:

- Navigation bar: always present, no transition needed
- Page title area: enters at full opacity immediately after routing animation resolves
- Body content: enters in stagger sequence, sections triggering as they enter viewport
- Diagrams: draw themselves as they enter viewport (not on page load)

**Departure:** When navigating away, only the content area animates out. The navigation bar remains stable — it is the system's persistent structure, not content.

---

---

# 4. HOMEPAGE BLUEPRINT

---

## Entry Sequence

The visitor arrives at a cream canvas. There is a deliberate pause of **200ms** before anything appears. This pause reads as: *the system is initializing.* It is not a loading state — it is a breath.

Then the content resolves.

---

## Section 1 — The Interface (Hero)

**Viewport height: 100vh**

### Text Composition

Centered horizontally. Vertically: positioned at 42% from top — slightly above center, with room for the diagram below.

The text arrives in sequence:

```
(0ms)    — pause

(200ms)  — First line appears (fade, 400ms):
           "Every abstraction"
           Font: Instrument Serif, 72px, ink-100

(700ms)  — Second line appears (fade, 400ms):
           "has an underlying mechanism."
           Font: Instrument Serif, 72px, ink-100
           On entry: a signal-blue underline draws left-to-right beneath this line (600ms)
           The underline is interactive: hover reveals a small floating label in JetBrains Mono:
           "this site demonstrates what that means"

(1400ms) — Name appears below (fade, 300ms):
           Full name, Instrument Serif, 22px, ink-60

(1700ms) — Role appears:
           Single-line description, Instrument Sans, 16px, ink-60
           Example: "Software systems, web architecture, visible thinking."
```

### The Background Diagram

Simultaneously with the text sequence, a faint architectural diagram assembles behind the text at **3–4% opacity**. The diagram is a simplified request cycle: four nodes connected by bezier paths. Node labels are invisible at this opacity — the diagram is purely gestural at this stage.

The diagram is only visible to visitors who look for it. On hover anywhere in the hero area, the diagram subtly brightens to 12% opacity for 1.5 seconds, then returns to 3%. This is the first hint that there is something to discover.

### The Primary Hero Diagram

Below the text, a clean architectural diagram (700px × 320px maximum width, centered):

```
  ● CLIENT        ◆ DNS RESOLVER        ● ORIGIN SERVER        ● RESPONSE

  Nodes connected by animated bezier paths.
  Every 4 seconds, a pulse travels the complete path.
  Labels appear only on node hover.
```

This diagram is the first interactive element. Hovering each node reveals its role. Hovering an edge reveals what it carries. Nothing is labeled until you look.

### Scroll Indicator

A small downward chevron in ink-30 at bottom center. Pulses at 2.5-second intervals. Disappears after first scroll event.

---

## Section 2 — Selected Work

**Background:** canvas (#F4F3EF) — same as the page. No section background change.

**Entry:** Section label draws in as described in the reveal sequence. Label text: `SELECTED WORK` in JetBrains Mono, signal-blue.

### Project Grid

2-column grid on desktop, 1-column on mobile. Maximum 4 projects on homepage (the full archive lives at `/work`).

**Project Card Anatomy:**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌──────────────────────┐   PROJECT_02                      │
│  │                      │                                   │
│  │  [Miniature diagram] │   Project Title                   │
│  │  180×120px          │   Instrument Serif, 22px           │
│  │  Animated on hover  │                                   │
│  │                      │   One-line descriptor.            │
│  └──────────────────────┘   Sans, 14px, ink-60             │
│                                                             │
│  2021 · Web System · Distributed             [depth: ···]  │
│  Small chips in surface-2/ink-60             Bottom right  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**At rest:** shadow-resting. White surface (surface-0). Border: none.

**On hover:**
- Shadow transitions to shadow-hover (280ms, `spring`)
- Card translates –2px on Y axis (subtle lift)
- The miniature diagram activates: paths pulse, active nodes light up (signal-blue)
- A 1px signal-blue border appears at 30% opacity around the card
- The depth indicator in the bottom-right glows to full opacity

**On click:** Routing animation initiates. The clicked card scales down slightly (to 98%) and dims to 90% opacity as the routing animation takes over.

---

## Section 3 — The Mechanism Teaser

**Purpose:** Introduce the depth system to visitors who have not discovered it themselves. This section demonstrates layer peeling rather than describing it.

**Content:** A single full-width content block. Surface-0 background with the resting shadow. Border-radius: 12px.

**Visual design:**

```
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│  HOW THIS PAGE ROUTES TO A PROJECT                                 │
│  JetBrains Mono, 11px, signal-blue                                │
│                                                                    │
│  When you clicked one of those projects just now, something        │
│  specific happened. The page didn't simply load — it resolved.     │
│  Navigation is treated as a request. There's a mechanism          │
│  underneath that transition.                                       │
│  Instrument Sans, 17px, ink-60, max-width 600px                   │
│                                                                    │
│                                               [depth indicator]   │
└────────────────────────────────────────────────────────────────────┘
```

The depth indicator here is slightly more prominent than in project cards. It is accompanied by the label `SEE HOW THIS WORKS`. When the visitor reveals Layer 1, they see:
- A small animated diagram of the routing mechanism
- A technical description of the transition sequence (what animates, in what order, and why)

This section teaches the depth system through use, not explanation.

---

## Section 4 — Recent Thinking

**Visual language:** Flat list. No card containers. The contrast with the project cards is deliberate — writing is different from systems. It is continuous, not bounded.

**Entry:** Same section label reveal. Label: `RECENT THINKING`

**List item structure (per post):**

```
──────────────────────────────────────────────────────────────────
2024.09.12                                              [SYSTEMS]
How DNS Actually Works — A Walk Through the Resolver Chain
One sentence that honestly describes what this post is about.
──────────────────────────────────────────────────────────────────
```

- Date: JetBrains Mono, 11px, ink-30
- Tag chip: JetBrains Mono, 10px, right-aligned, surface-2 background
- Title: Instrument Sans, 18px, 500 weight, ink-100
- Summary: Instrument Sans, 15px, ink-60

**Hover state:** The separator line above the hovered item shifts to signal-blue at 50% opacity. The title shifts 4px to the right (150ms, `spring` curve). No background change.

---

## Section 5 — The System (Homepage Mini-Map)

This section is visually quiet but intellectually significant. It is placed just before the footer.

**What it contains:** A live-rendered interactive node graph of the site's own information architecture.

**Visual design:**
- A surface-1 panel, full width, 52px vertical padding, border-radius 0 (full-bleed panel)
- Centered within it: a node graph, approximately 480px × 200px
- Nodes represent pages. The current page (Home) has a signal-blue pulse animation
- All other nodes are ink-20 circles, 10px radius
- Edges between nodes are 1px, ink-15
- On hover of any node: the node brightens to signal-blue, a JetBrains Mono label appears with the page name
- On click of any node: navigation to that page using the routing animation

**Label above the graph:**
`SITE ARCHITECTURE` in JetBrains Mono, signal-blue, centered

**Subtext below:** `You are at HOME` in JetBrains Mono, ink-30, centered

This section is the site teaching the visitor to navigate it as a system rather than a document.

---

## Footer

Three-column layout, surface-1 background, 64px vertical padding.

**Column 1 — Identity:**
Name in Instrument Serif, 18px
Role in Instrument Sans, 14px, ink-60
One sentence: the core belief.

**Column 2 — Navigation:**
Links in Instrument Sans, 14px, ink-60. No bullets. No icons.
`Work` / `Thinking` / `Systems` / `About`

**Column 3 — Connections:**
Presented as system identifiers in JetBrains Mono, 13px:
```
GH://username
LI://name
✉ mail@domain.tld
```
These are actual links. The identifier format is aesthetic, not functional fiction.

---

---

# 5. PROJECT EXPERIENCE BLUEPRINT

---

## Entry and Header

The routing animation completes, "arriving" at the top of the project page. The content assembles in strict sequence:

```
(0ms)    → Project identifier resolves:
           PROJECT_02  ·  SHIPPED
           JetBrains Mono, 11px, signal-blue · system-green

(200ms)  → Project title appears:
           Instrument Serif, 72px, ink-100

(500ms)  → Mission statement:
           Instrument Sans, 18px, ink-60, max-width 560px

(700ms)  → Metadata strip:
           2023  ·  Web System  ·  [Technology chips]
           JetBrains Mono, 11px, ink-30 separators
```

This sequence takes 900ms total. It feels deliberate — the system is presenting the project with intention.

---

## The Signature Diagram

Below the header, occupying the full content width (max 960px), contained in a surface-1 panel with 16px border-radius and a 32px internal padding.

This is the project's **architectural fingerprint**. It shows how the system actually works — not a screenshot of the UI, not a mockup. An architectural diagram unique to this project, drawn in the established visual language.

**Diagram entry sequence:**
1. Surface-1 container appears (300ms fade)
2. Nodes appear in logical order — source nodes first, sink nodes last (staggered at 80ms each)
3. Paths draw themselves between connected nodes (600ms total, sequential)
4. Labels fade in after paths complete (300ms)

**Legend:** In the bottom-right corner of the diagram container, a compact legend:
```
●  Client       ○  External Service       ▲  Decision Point
─  Data Flow    ╌  Async / Queued
```
JetBrains Mono, 10px, ink-60

**The diagram is the first "Layer 0" view.** It shows what the system does without explaining how. The deeper explanations come later.

---

## The Narrative

Following the diagram, the project's story is told in a clean typographic layout. This is prose-first. No bullet lists. No feature catalogs.

**Section labels** (JetBrains Mono, 11px, signal-blue, uppercase): `CONTEXT`, `THE PROBLEM`, `THE APPROACH`, `KEY DECISIONS`, `OUTCOMES`

**Body text:** Instrument Sans, 18px, ink-100, line-height 1.70, max-width 640px

**Callout blocks:** Key insights or turning points appear as a slightly inset paragraph:
- Left margin: 24px
- Left border: 2px solid signal-blue
- Text: Instrument Sans, 17px, ink-100, italic for one opening phrase

The narrative is Layer 0. A thoughtful visitor learns what was built, why it was built, and how it changed from the original plan.

---

## Depth Blocks

At key moments in the narrative — wherever there is a mechanism worth explaining — a **Depth Block** interrupts the flow.

**Visual design of a Depth Block:**

```
┌────────────────────────────────────────────────────────────────────┐
│  Surface-1 background, full content width, 32px padding all sides  │
│                                                                    │
│  This decision required choosing between two caching strategies.   │
│  The tradeoff was between consistency and read latency. Here's     │
│  the mechanism that drove the choice.                              │
│                                                                    │
│                                          [REVEAL MECHANISM ···]   │
└────────────────────────────────────────────────────────────────────┘
```

The `REVEAL MECHANISM` label uses JetBrains Mono, 11px, system-amber. The depth indicator uses system-amber for Layer 1 reveals (architecture) and signal-blue for structural/routing reveals. The color difference communicates the type of depth being revealed.

**Revealed Layer 1 content (example — caching architecture):**
- A zoomed-in diagram showing just the relevant subsystem
- Technical explanation in body text
- A small notation block: `WHY NOT ALTERNATIVE_APPROACH` — a 2–3 sentence honest dismissal

**Revealed Layer 2 content:**
- The actual decision moment: what was tried first, what broke, what changed
- A clean "Decision Summary" layout:
  ```
  CHOSEN: Write-through with TTL
  REJECTED: Write-behind (data loss risk on failure)
  REJECTED: No caching (latency target not achievable)
  ```
  JetBrains Mono, 12px, formatted as a precise list

---

## Outcomes

**Metrics (if public):** Large Instrument Serif numbers (56px) with JetBrains Mono labels (11px, ink-60) beneath. Three to five maximum.

**Reflection:** A brief prose section. What worked, what didn't. Written honestly, without spin.

**What Would Change:** One or two specific things that would be built differently now, and why. This section is what distinguishes a portfolio from a press release.

---

## Project Navigation

At the page bottom, two cards at 50% width each (side by side):
- Left: `← PREVIOUS PROJECT` with project name
- Right: `NEXT PROJECT →` with project name

Same card design as the homepage, but without the diagram thumbnail — just title and a single descriptor line.

---

---

# 6. SYSTEMS VIEW — REVEAL INTERNALS MODE

---

## The Toggle

**Location:** Right side of the persistent navigation bar, after the main navigation links.

**Visual design:** A small stack icon (the three-line depth indicator motif, 14px) plus the text `INTERNALS` in JetBrains Mono, 11px.

**At rest:** ink-30 — quiet, unassuming. It is always there. It never draws attention to itself.

**On hover:** signal-blue. A tooltip appears after 800ms: `"See how this site is structured"` in JetBrains Mono.

The toggle is **never animated unprompted**. It does not pulse. It does not glow. It waits.

---

## Activation Sequence

Activation is choreographed in four phases, totaling approximately 900ms.

### Phase 1 — The Grid (0–300ms)

The page canvas gains a very faint architectural grid overlay: horizontal and vertical lines at 32px intervals, signal-blue at 1.5% opacity on light mode (3% on dark mode). The grid does not overpower the content. It communicates: *structure has always been here.*

The transition uses the `architectural` timing curve. The grid does not "snap into view" — it materializes.

### Phase 2 — Component Labels (300–600ms)

Every major structural component of the page receives a small floating label at its top-left corner. Labels use JetBrains Mono, 10px, signal-blue, on a signal-blue-subtle background (small pill, 4px border-radius, 4px horizontal padding, 2px vertical padding).

Example labels:
```
NAVIGATION
HERO: PRIMARY_STATEMENT
PROJECT_GRID
DEPTH_BLOCK: MECHANISM_TEASER
SITE_MAP: ARCHITECTURE_VIEW
FOOTER
```

Labels appear in a staggered sequence from top to bottom, 30ms between each.

### Phase 3 — Connection Paths (600–800ms)

Thin dashed paths (1px, signal-blue at 25% opacity, 4px dash, 4px gap) appear between related elements — for example:
- Navigation links connect to their destination sections
- The depth indicator on a block connects to its revealed content area
- The site map nodes connect to the navigation links

These paths are static. They show relationships, not activity.

### Phase 4 — System Panel (800–900ms)

A compact panel (240px wide, full page height) slides in from the right viewport edge. It overlays the content slightly (content does not reflow). The panel has:
- surface-0 background
- shadow-elevated
- 12px border-radius on left edges only

**Panel content:**

```
┌─────────────────────────────────┐
│ SYSTEM STATUS                   │
│ JetBrains Mono, 11px, ink-30   │
├─────────────────────────────────┤
│ PAGE                            │
│ /work/project-slug              │
│                                 │
│ COMPONENTS                      │
│ 7 ACTIVE                        │
│                                 │
│ CURRENT DEPTH                   │
│ LAYER 0 — SURFACE               │
│                                 │
│ ROUTING PATH                    │
│ / → /work → /work/slug         │
│                                 │
│ SESSION                         │
│ 3 pages visited                 │
│ 2 mechanisms revealed           │
│ 1 project diagram explored      │
└─────────────────────────────────┘
```

All text in the panel is JetBrains Mono. Headings in 10px, ink-30. Values in 12px, ink-100.

---

## What Does NOT Change in Internals Mode

- Typography: unchanged
- Color scheme: unchanged (no inversion)
- Content: unchanged
- Layout: unchanged
- Interaction model: unchanged — everything still works normally

The Internals overlay is **purely additive**. It reveals structure without replacing the experience.

---

## The Honesty Constraint

Internals mode only shows what is true.

If a section is a simple text block, its label reads `CONTENT_BLOCK` — not some evocative system identifier. The routing paths shown reflect the actual information architecture. The component count reflects the actual number of structural elements on the page.

No fiction enters the Internals view. This is not a game — it is an honest inspection.

---

## Deactivation

A second click on the `INTERNALS` toggle reverses the sequence in reverse order, at 60% of the entry duration. The panel slides out first, then the paths disappear, then the labels fade, then the grid dissolves.

---

---

# 7. INFORMATION ARCHITECTURE

---

## Page Structure

```
/                               Homepage
│
├── /work                       Project Index
│   ├── /work/[slug]            Individual Project Page
│   └── /work/[slug]            (all projects follow the same template)
│
├── /thinking                   Writing Index
│   └── /thinking/[slug]        Individual Post
│
├── /systems                    Systems Lab Index
│   └── /systems/[slug]         Individual Experiment
│
└── /about                      About Page (single-scroll)
```

Maximum depth: **2 levels from root** for any content. This is a design constraint, not a technical one. A system that requires many hops to navigate is a poorly-designed system.

---

## Navigation Design

**Persistent navigation bar:** 56px height. Fixed position.

```
[Name]          WORK    THINKING    SYSTEMS                    [INTERNALS ···]
```

- Name: links to `/`, Instrument Serif, 17px, ink-100
- Center links: Instrument Sans, 14px, 500 weight, ink-60 at rest / ink-100 on hover
- INTERNALS: JetBrains Mono, 11px, ink-30 at rest

**Active state:** The current section's nav link gains a small signal-blue dot (4px) beneath it, positioned 2px below the text baseline.

**Background:** canvas at 92% opacity, backdrop-filter: blur(12px). A 1px bottom border in surface-2. This gives the nav its "floating" quality without being visually heavy.

---

## Cross-References

Projects and Thinking posts can reference each other via a **Related** block — a minimal surface-1 card at the bottom of the page:

```
┌────────────────────────────────────────┐
│  RELATED                               │
│                                        │
│  ↳  PROJECT_03 — [Project Title]      │
│     Reading "How DNS Works" in context │
└────────────────────────────────────────┘
```

Systems Lab experiments can reference the projects that motivated their creation.

---

## The About Page

The about page is a single continuous scroll. Not a resume. Not a timeline of every job. An honest portrait.

**Structure:**

**Section 1 — Statement**
A brief first-person statement. Not a pitch. The tone is: "Here is how I think about things." Maximum 4 sentences.

**Section 2 — What Interests Me**
Presented as prose, not a list. Three to four paragraphs about systems, architecture, how software actually works. This section has the depth system active — key concepts can be peeled back to see what they mean technically.

**Section 3 — How I Work**
A small architectural diagram of a working process. Input → Model → Output, with annotations. Instrument Sans, 16px for the text sections. The diagram is simple: three nodes.

**Section 4 — Significant Moments**
A minimal timeline of three to five moments that changed direction. Not every job. Not a LinkedIn summary. Just the inflection points.

```
2019 ──── First time I understood what a request actually is.
2021 ──── Built something real people used every day.
2023 ──── Started writing down what I was learning.
```

**Section 5 — Open For**
What kind of conversations are welcome. Clear, direct, no performance.

---

---

# 8. SYSTEMS LAB

---

## Purpose

The Systems Lab exists for things built to **understand** something, not ship something. These are not case studies. They are visible thinking — mechanisms examined for their own sake.

The Lab is the answer to: *"Where does someone who cares about how things work show that they care about how things work, without pretending to care about things they don't actually understand?"*

Every Lab experiment is intellectually honest. If it visualizes DNS resolution, it uses real DNS data. If it demonstrates TCP handshake, it shows the actual packet sequence. Nothing is simulated for aesthetic effect.

---

## The Lab's Relationship to the Portfolio

Projects show mechanisms **built to serve a product**.  
The Lab shows mechanisms **studied for their own sake**.

Together they form a complete picture: this person builds systems *and* understands systems. Neither is performance. Both are evidence.

The Lab also ensures the portfolio never runs out of things to say. Projects take months to build. Experiments take days to make visible. The Lab gives a site that's honest about the mechanism of its own creation something to show between major projects.

---

## How It Avoids Distraction

**The Lab is not promoted.** It sits third in the navigation. It never appears in homepage hero content. Project pages do not reference it from primary flow. You find the Lab by exploring.

**Lab entries are brief.** Each experiment has: a title, a one-sentence purpose, and an interactive demo. The demo is the explanation. There are no long narratives.

**The Lab's design language distinguishes it from the portfolio.** Lab cards use dashed borders (1.5px, surface-2) rather than the solid-border card style. The project identifier format changes: `EXP_01`, `EXP_02` instead of `PROJECT_01`. Status chips use different vocabulary: `INTERACTIVE`, `VISUAL`, `REFERENCE` instead of `SHIPPED`, `IN PROGRESS`.

**The Lab does not compete.** Lab entries are clearly experiments, not products. No outcomes sections. No impact metrics. No client names. Just: here's the mechanism.

---

## Lab Index Design

Grid layout. 3 columns on desktop, 1 on mobile. Dashed-border cards.

```
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
│ EXP_04                    [INTERACTIVE] │
│                                          │
│  [animated preview                       │
│   thumbnail, 160×100px]                 │
│                                          │
│  DNS Resolution Visualizer              │
│  Walk through a full resolver chain.    │
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```

Dashed border on hover shifts from ink-30 to signal-blue.

---

## Individual Lab Experiment Design

Split-view layout:

**Left 60%:** The interactive visualization or demo. Full height of the viewport content area. Interactive controls embedded directly in the visualization where needed.

**Right 40%:** The explanation, in layers (same depth system applies). Layer 0: what this shows and why it matters. Layer 1: how the visualization works. Layer 2: the actual mechanism being demonstrated.

No outcomes section. No reflection section. The experiment ends when the mechanism has been shown.

---

---

# 9. FUTURE PROJECT FRAMEWORK

---

## The Universal Project Model

Every future project joins the portfolio without requiring a redesign decision. The framework provides the structure. The content provides the differentiation.

This is not a template. A template produces sameness. This is a grammar — a set of rules within which every project can speak in its own voice.

---

## Required Elements (Every Project, No Exceptions)

### 1. The Routing Entry
Every project page begins with the routing animation resolving. Non-negotiable. This is the experience that makes every project feel part of the same system.

### 2. The Project Header
Structured precisely:
- Identifier: `PROJECT_[N]` where N is the chronological sequence number (permanent)
- Status badge: `SHIPPED` / `IN PROGRESS` / `ARCHIVED`
- Title: Instrument Serif
- Mission statement: one sentence, answering "what was this built to do?"
- Metadata strip: Year · Type · Technology labels

The identifier is permanent. `PROJECT_01` remains `PROJECT_01` forever, even if fifteen more projects are added after it. The number is not a ranking — it is a coordinate in the system's history.

### 3. The Signature Diagram
Every project has one architectural diagram. No exceptions. It must represent the actual system, not a generic representation of "web application."

The diagram is the project's fingerprint. Each is unique in topology. None vary in visual grammar.

### 4. The Layer Stack
All three layers must exist. Even if Layer 2 contains only three sentences about a specific decision, it must be present. The depth system must be consistent across every project.

### 5. The Honest Outcomes
Every project ends with: what worked, what didn't, what would change. No project ends with a victory lap.

---

## Optional Elements (By Project Type)

**For infrastructure / systems projects:**
- A live component: a real-time status indicator, a live query result, a request demonstrating the project in operation
- A performance metrics block (if metrics are public and meaningful)

**For interface / product projects:**
- Screenshots: maximum 3, always shown in context (in a device frame or within a diagram), never floating on white
- A user flow diagram alongside the technical architecture diagram

**For exploratory / research projects:**
- A `QUESTIONS` section: what was being investigated
- A `FINDINGS` section: what was actually discovered (which may differ from what was expected)
- A `STILL OPEN` section: what remains unresolved

---

## Diagram Language — Permanence Across Projects

All project diagrams are drawn from the same visual grammar. The visual consistency across the portfolio creates coherence without monotony — each diagram is unique in what it depicts, unified in how it depicts it.

What varies across diagrams:
- Topology (the specific structure of the system being depicted)
- Number of nodes and edges
- Highlighted paths (which flows are primary)
- Annotations relevant to the specific system

What never varies:
- Node style (small circles, consistent sizing)
- Edge style (bezier curves, 1–1.5px weight)
- Color vocabulary (signal-blue / system-green / system-amber)
- Label typography (JetBrains Mono, 11px)
- Legend format
- Animation behavior (path-drawing on entry, 4-second pulse interval)

---

## The Archive as System History

The project grid on `/work` shows all projects in reverse chronological order. Archived projects remain visible. They are never hidden, never apologized for. The archive communicates: *this person has been building things for some time. You can see where they started.*

As new projects are added, the mini-map on the homepage gains a new node. The system visibly grows.

---

---

# 10. DESIGN PRINCIPLES

---

These are the twenty principles that govern every design decision on this site. When a new feature is proposed, when a new project needs to be added, when a design question arises — these principles are the answer.

---

### 1 — Every metaphor must be earned.
The system metaphor is not decoration. Every design choice that invokes the "machine" metaphor must correspond to something real and accurate. Never use the language of systems to obscure rather than reveal.

### 2 — Depth is optional, not hidden.
Layer peeling is offered, never required. Layer 0 is complete on its own. The depth system is for the curious — not a gatekeeping mechanism, and not a reward for "correct" visitors.

### 3 — Motion communicates, or it is removed.
Every animation answers the question: *what does this motion tell the visitor?* If the answer is "nothing," the animation is cut. Decorative motion is a form of dishonesty about effort.

### 4 — Honesty over impressiveness.
If something is a web application, it is presented as a web application. Diagrams show what systems actually are, not idealized versions. Technical depth comes from accuracy, not from vocabulary choices.

### 5 — The architectural diagram is the primary visual language.
No hero images. No stock photography. No illustrations that aren't structural diagrams. The diagram IS the visual identity. Every project page contains at least one. Every Lab experiment contains at least one. The homepage diagram is the site's logo.

### 6 — Typography carries authority; restraint creates it.
Instrument Serif appears rarely. When it appears, it is significant. Overuse destroys the power of the typeface. The display face must be used fewer times than instinct suggests.

### 7 — Silence is a design decision.
White space is never "empty." Every open area communicates breathing room, and breathing room communicates confidence. The temptation to fill space must be resisted consistently.

### 8 — The Internals view never lies.
Whatever appears in Internals mode is structurally accurate. Routing paths reflect actual relationships. Component labels reflect actual structural roles. Fictional or aspirational information does not enter the Internals view.

### 9 — One depth at a time.
The visitor must never feel lost between layers. The current depth level is always visually clear. The return to the surface is always a single, unambiguous action. Nesting without clarity is a failure of information design.

### 10 — Projects age without apology.
Older projects remain in the system. They are not hidden when better work appears. `PROJECT_01` remains `PROJECT_01`. The archive is part of the story — where a person started is part of what they are now.

### 11 — The Lab is honest about what it is not.
Lab experiments are never presented as products. They are experiments. The dashed-border card style, the `EXP_` identifier, and the absence of outcome sections all communicate this clearly. The Lab's value is curiosity demonstrated, not accomplishment claimed.

### 12 — Dark mode is a parallel system, not an inversion.
Dark mode uses recalibrated values, not inverted light-mode values. Every surface, shadow, and diagram color is re-established from scratch for the dark context. Dark mode must feel native, not ported.

### 13 — Never show the seams of the metaphor.
The routing animation, depth indicators, system panel, and node graph all form a coherent whole. No design decision should create an inconsistency that breaks the metaphor for visitors who have internalized it. New features that don't fit the system metaphor are redesigned until they do.

### 14 — Performance is part of the aesthetic.
Fast page loads, smooth animations, instant hover responses — these are not just engineering goals. They are design choices. A site about understanding systems that runs poorly contradicts itself. Speed is the most honest demonstration of craft.

### 15 — Content drives diagram design, not the opposite.
Every architectural diagram begins with: *what is this system actually doing?* The answer determines the diagram's topology. Generic or template diagrams are not permitted. The diagram is evidence of understanding, not illustration.

### 16 — The writing is never a pitch.
All writing on the site — project narratives, about page, thinking posts — is written as honest reflection, not persuasion. The register is: *I built this. Here is what I understood. Here is what I missed.* Not: *I built this. It was a great success.*

### 17 — Growth should be visible but not disruptive.
As projects, posts, and experiments accumulate, the site should feel fuller — not more complex. The mini-map gains nodes. The grid gains entries. The archive grows. The information architecture accommodates growth without requiring structural redesign.

### 18 — The Internals toggle never demands attention.
The `INTERNALS` control is always present in the navigation. It never pulses, glows, or prompts. It waits. Visitors who find it find it because they looked. Those who never find it have a complete experience. Both paths are intentional.

### 19 — Accessibility is a non-negotiable system constraint.
The depth system is fully keyboard-navigable. Every animation respects `prefers-reduced-motion`. Color is never the only differentiator for meaningful information. The full experience — navigation, depth reveals, Internals mode — is usable without a pointing device, and readable without JavaScript active.

### 20 — The site is the best explanation of the person building it.
Every design decision — the diagram language, the depth system, the routing metaphor, the typography, the writing voice — collectively creates a portrait of someone who thinks carefully about how things work. Visitors should leave knowing, without being told, what kind of builder they just encountered. That knowledge arriving without being stated is the proof that the design worked.

---

---

# Appendix — Quick Reference

---

## Typefaces
| Face | Role | Source |
|---|---|---|
| Instrument Serif | Display, titles | Google Fonts |
| Instrument Sans | Body, UI | Google Fonts |
| JetBrains Mono | Technical accents | JetBrains / Google Fonts |

## Core Colors
| Token | Hex |
|---|---|
| canvas | #F4F3EF |
| surface-0 | #FFFFFF |
| surface-1 | #EDECE8 |
| ink-100 | #1C1B1E |
| ink-60 | #706D78 |
| signal-blue | #3D62A0 |
| system-green | #2E7A59 |
| system-amber | #C97A20 |

## Timing Curves
| Name | Value |
|---|---|
| spring | cubic-bezier(0.16, 1, 0.3, 1) |
| architectural | cubic-bezier(0.4, 0, 0.2, 1) |
| routing | cubic-bezier(0.22, 1, 0.36, 1) |

## Depth Layers
| Layer | Name | Audience |
|---|---|---|
| 0 | Surface | General visitors |
| 1 | Mechanism | Curious visitors |
| 2 | Implementation | Developer audience |

## Project Identifiers
| Format | Scope |
|---|---|
| `PROJECT_[N]` | Portfolio work — shipped or in progress |
| `EXP_[N]` | Systems Lab experiments |
| `ARCHIVED` | Retired projects (still visible, labeled clearly) |

---

*End of specification.*
