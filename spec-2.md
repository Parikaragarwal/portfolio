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


## Technology Authenticity Constraint

The purpose of this portfolio is to demonstrate real understanding and real work.

Therefore the design and proposed implementation must be grounded in technologies the builder actually uses or intends to use.

Do not introduce technologies merely because they are fashionable, architecturally interesting, or would make the project appear more sophisticated.

The implementation should be designed around the builder's actual ecosystem.

Current ecosystem includes:

* TypeScript
* React
* Next.js
* Node.js
* Fastify
* tRPC
* Tailwind CSS
* PostgreSQL
* Docker
* Linux
* VPS self-hosting
* OAuth 2.0 / OIDC systems

Potential future additions are acceptable only when they serve a clear purpose and align with existing interests and learning goals.

Avoid introducing technologies such as:

* Go
* Rust
* Python
* Elixir
* Kubernetes
* Kafka
* GraphQL
* Redis clusters
* Microservices
* Event-driven architectures

unless there is a specific, justified reason tied to a real project requirement.

The portfolio should feel like a natural extension of the builder's actual journey, not an AI-generated showcase of trendy technologies.

A simpler architecture built with technologies the builder genuinely understands is preferable to a more impressive architecture built around technologies they have never used.

The website should communicate:

"Here is what I actually know."

not

"Here is a collection of technologies that sound advanced."


## Implementation Constraints

The implementation phase begins immediately after this specification.

The purpose of this document is to design a portfolio that can actually be built and maintained by the builder.

Therefore all implementation decisions must obey the following constraints.

### Constraint 1 — Single Developer Feasibility

Assume the entire project is designed, implemented, deployed, and maintained by a single developer.

Solutions that introduce significant operational complexity should be rejected unless they provide exceptional value to the user experience.

---

### Constraint 2 — Existing Ecosystem First

Prefer technologies that are already part of the builder's current ecosystem or are natural extensions of it.

The implementation should feel like a progression of existing knowledge rather than a migration into an entirely new technology stack.

New technologies may be introduced only when they provide a substantial advantage to the final experience.

---

### Constraint 5 — Minimize New Learning Requirements

The portfolio itself is the primary project.

The builder should spend time creating:

* diagrams
* interactions
* visual systems
* project visualizations
* content experiences

rather than spending months learning unrelated frameworks solely to support the portfolio.

---
### Constraint 8 — The Builder Must Be Able To Own The Entire System

At any point, the builder should be capable of understanding, modifying, debugging, and extending every major part of the portfolio without depending on expertise in unrelated ecosystems.

The final solution should feel cohesive, understandable, and fully owned by its creator.


## Deployment and Operational Constraints

This portfolio will be deployed on a personally managed VPS under a personally owned domain.

The project must be designed with real-world deployment, maintenance, and long-term ownership in mind.

### Constraint 1 — Self-Hosted First

Assume the portfolio runs on a VPS owned and managed by the builder.

The design should not depend on managed cloud services unless they provide significant value that cannot reasonably be achieved through self-hosting.

The portfolio should remain fully deployable on a single VPS.

---

### Constraint 2 — Docker-Friendly Architecture

All major services should be designed to run cleanly in containers.

The final architecture should naturally support:

* Docker
* Docker Compose
* containerized deployment
* reproducible environments
* environment variable based configuration

Avoid designs that require complex manual server setup.

---

### Constraint 3 — Production Stability Over Novelty

Prefer mature, stable, widely-used technologies.

Avoid selecting technologies solely because they are newer or more experimental.

A slightly less exciting but battle-tested solution is preferable to a cutting-edge solution that increases maintenance burden.

---

### Constraint 4 — Long-Term Maintainability

Assume the project will remain online for years.

Design choices should favor:

* easy upgrades
* clear debugging
* predictable deployments
* minimal operational overhead

The builder should be able to return after months away and still understand the system.

---

### Constraint 5 — Graceful Degradation

The portfolio should remain functional even when advanced features fail.

Examples:

* content remains readable without animations
* navigation remains usable without visual routing effects
* projects remain accessible without architecture visualizations
* core content is never dependent on JavaScript-heavy interactions

The experience should be enhanced by visual systems, not powered entirely by them.

---

### Constraint 6 — Static-First Mentality

Whenever possible, prefer static generation, pre-rendering, caching, and content-driven approaches.

Only introduce server-side complexity when it provides clear user-facing value.

The majority of the website should behave like content, not an application.

---

### Constraint 7 — Performance Is Part of the Design

The website's systems-oriented philosophy must be reflected in its performance.

The portfolio should feel:

* fast
* responsive
* lightweight

Animation, visualizations, and architectural overlays should have strict performance budgets.

The site should never feel slower because it is attempting to demonstrate technical sophistication.

---

### Constraint 8 — Admin Panel Must Remain Practical

The admin system exists to make future project additions easy.

It should not evolve into a full CMS platform.

The admin experience should focus on:

* project management
* architecture visualizations
* content editing
* publishing workflow

Avoid unnecessary complexity such as:

* role systems
* enterprise workflows
* multi-tenant architectures
* complex permissions

The builder is the sole administrator.

---

### Constraint 9 — Deployment Simplicity

A fresh deployment should be achievable through a straightforward and documented process.

The portfolio should not require:

* Kubernetes
* distributed infrastructure
* microservices
* service meshes
* orchestration platforms

unless there is an overwhelming justification.

The architecture should respect the scale and purpose of the project.

---

### Constraint 10 — Ownership Over Convenience

When choosing between a solution that is easy to understand and one that is more automated but opaque, prefer the solution that the builder can fully understand and control.

The portfolio itself is a demonstration of understanding systems.

Its deployment architecture should reflect the same philosophy.
# Product Architecture and Implementation Constraints

This specification is not intended to produce a static portfolio website.

The final result must be a complete, production-grade, self-hosted product that powers the portfolio experience.

The public-facing portfolio is only one part of the overall system.

The final solution should include all required functionality necessary to operate, manage, extend, and maintain the portfolio without modifying source code for routine content updates.

---

## Product Scope

The final product consists of two primary applications.

### Public Experience

The public-facing portfolio experience described throughout this specification.

This includes:

* Homepage
* Projects
* Individual Project Pages
* About
* Systems Lab
* Thinking / Articles
* Internals Mode
* Architecture Visualizations
* Layer Peeling System
* Search and Discovery Features
* Theme System

### Private Administration Experience

A private administration interface used exclusively by the builder.

The purpose of this application is to manage portfolio content, projects, visualizations, and site data.

The builder should be able to operate the entire portfolio through the administration interface without requiring code changes for normal content management.

---

## Builder Technology Constraints

Assume implementation begins immediately.

Design the system around technologies that the builder already understands or is actively working with.

Preferred ecosystem:

* TypeScript
* JavaScript
* Node.js
* React
* Next.js
* SvelteKit
* Fastify
* tRPC
* Tailwind CSS
* PostgreSQL
* Docker
* Docker Compose
* Linux
* VPS self-hosting
* OAuth 2.0
* OpenID Connect

The final architecture should naturally fit within this ecosystem.

Avoid introducing entirely different ecosystems solely for this project.

Examples of technologies that should not be introduced without strong justification:

* Django
* Rails
* Laravel
* Spring
* Kubernetes
* Kafka
* Event Sourcing
* Complex Microservice Architectures
* Distributed Service Meshes

The implementation should feel like a natural evolution of the builder's current stack.

---

## Full Stack Requirement

The final system should be designed as a complete end-to-end application.

Assume ownership of the entire stack.

The solution should include:

### Frontend

Public website.

### Backend

Application server.

### Database

Persistent content storage.

### Authentication

Administration access.

### Media Storage

Project images and media.

### Visualization Storage

Architecture definitions and diagram metadata.

### Content Management

Projects, articles, experiments, questions, interests, and future content.

### Deployment

Containerized deployment.

### Backups

Data preservation and recovery strategy.

---

## Authentication Requirements

Authentication exists solely for administrative access.

This is not a multi-user platform.

This is not a SaaS product.

This is not a public authentication system.

There is only one administrator.

The system should support:

* Login route
* Secure session management
* Protected administration routes
* Logout functionality

The initial administrator identity should be:

Email:
[parikaragarwal@gmail.com](mailto:parikaragarwal@gmail.com)

Password:
To be configured later during implementation.

No user registration system is required.

No user management system is required.

No roles or permissions system is required.

No social authentication is required.

The builder is the sole administrator.

The authentication system should remain intentionally simple.

---

## Administration System Requirements

The administration interface should feel like an internal product rather than a CMS.

The builder should be able to:

### Manage Projects

* Create projects
* Edit projects
* Archive projects
* Publish projects
* Reorder projects
* Feature projects

### Manage Project Layers

Layer 0:
Surface

Layer 1:
Mechanism

Layer 2:
Implementation

Each layer should be editable independently.

### Manage Architecture Visualizations

The builder should be able to create and modify:

* Nodes
* Edges
* Labels
* Annotations
* Flow definitions
* Highlighted paths

without editing source code.

### Manage Writing

* Articles
* Notes
* System explanations
* Current questions
* Current obsessions

### Manage Site Content

* Homepage sections
* About page content
* Footer content
* Navigation content

---

## Infrastructure Constraints

The entire platform will be deployed on a personally managed VPS.

Assume ownership of:

* Domain
* VPS
* SSL
* Reverse proxy
* Containers
* Database

The architecture should remain realistic for a single developer.

---

## Containerization Requirements

The solution should be designed around Docker-first deployment.

All major services should be containerized.

Typical deployment should resemble:

* Reverse Proxy Container
* Application Container
* PostgreSQL Container
* Redis Container (only if justified)
* Optional Storage Container (if required)

The architecture should remain simple enough to deploy using Docker Compose.

Do not assume Kubernetes.

Do not assume cloud orchestration platforms.

Do not assume distributed infrastructure.

---

## Data Ownership

The builder should own all critical data.

Content should live in the database.

Media should be self-hosted.

Project definitions should be self-hosted.

Visualization definitions should be self-hosted.

The platform should remain portable between VPS providers.

---

## Stability Requirements

Prefer:

* LTS versions
* Stable releases
* Well-supported dependencies
* Mature libraries

Avoid:

* Experimental frameworks
* Beta software
* Rapidly changing ecosystems

The portfolio is intended to remain online for years.

Maintainability is more important than novelty.

---

## Architectural Principle

The portfolio's philosophy is:

"Every abstraction has an underlying mechanism."

The implementation should follow the same philosophy.

The builder should be able to understand:

* how requests flow
* how content is stored
* how authentication works
* how deployment works
* how infrastructure works

The system should prioritize ownership, clarity, maintainability, and understanding over unnecessary complexity.
