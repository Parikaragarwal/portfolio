# Transparent Machine — Revision Notes (Applied Changes)

This document contains the modifications recommended after review of the original specification.

## 1. Simplify Motion Philosophy

Remove most hard-coded choreography timings from the specification.

Replace detailed sequences like:
- 200ms
- 700ms
- 1400ms
- 1700ms

with three motion categories:

### Fast
Immediate UI feedback, hover states, toggles.

### Standard
Panel transitions, depth reveals, navigation changes.

### Narrative
Large architectural reveals and first-visit experiences.

Principle:
Visitors should remember how the site felt, not how many milliseconds an animation lasted.

---

## 2. Adaptive Routing Animation

The Living Request concept remains.

However routing intensity should adapt.

### First-time visitors
Full request visualization.

### Returning visitors
Reduced animation.

### Frequent navigation
Minimal animation.

Goal:
The request metaphor should communicate meaning, never become friction.

---

## 3. Redesign Internals Mode

Remove the large DevTools-like side panel.

Replace it with "museum annotations."

### Internals Mode should show:

- structural labels
- architecture relationships
- routing paths
- component names
- layer indicators

### Internals Mode should NOT feel like:

- Chrome DevTools
- Grafana
- Monitoring software

Think:

'A guided architectural overlay.'

not

'A debugging environment.'

---

## 4. Add Personal Layer

The original specification explains the machine extremely well.

It does not explain the person behind it strongly enough.

Add a new homepage section.

## Current Questions

A living section that changes over time.

Examples:

- Why do abstractions inevitably leak?
- What makes software maintainable for ten years?
- Can complexity be compressed without losing meaning?
- What is the smallest useful abstraction?

Purpose:
Reveal curiosity instead of credentials.

---

## 5. Add "Current Obsessions" Section

Location:
Homepage, between Featured Work and Recent Thinking.

Format:

Short cards.

Examples:

- OIDC and identity systems
- Type-safe architectures
- Linux internals
- Networking fundamentals
- Developer tooling

This section evolves continuously.

It demonstrates what the builder is actively exploring.

---

## 6. Add Personal Philosophy Page Content

Expand About.

Add:

### How I Learn

### Things I Changed My Mind About

### Questions Still Open

### Systems I Admire

This prevents the site from becoming only a showcase of projects.

---

## 7. Preserve Core Principles

Keep unchanged:

- Transparent Machine
- Layer Peeling
- Living Request
- Systems Lab
- Architectural diagrams
- How This Site Works
- Honest technical explanations

These remain the core identity of the website.

---

## Final Direction

The website should help visitors understand:

1. What this engineer builds.
2. How this engineer thinks.
3. What this engineer is currently exploring.

Not just the machine.

The mind behind the machine.
