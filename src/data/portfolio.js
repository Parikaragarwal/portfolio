export const PORTFOLIO_DATA = {
  about: {
    name: "Parikar Agarwal",
    tagline: "Full Stack Developer & Systems Explorer",
    bio: "I'm driven by understanding how software works beneath the abstractions. I enjoy building reliable backend systems, exploring distributed architecture, authentication, networking, Linux, and the infrastructure that powers modern applications. My goal is to engineer systems that are both practical and deeply understood.",
  },

  socials: [
    { name: "GitHub", url: "https://github.com/Parikaragarwal" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/parikarag/" },
  ],

  questions: [
    "What actually happens after I click 'Deploy'?",
    "How do large-scale systems stay reliable under failure?",
    "Which abstractions improve engineering, and which prevent understanding?",
    "How does data travel from a browser to server and back at every layer?",
  ],

  obsessions: [
    "Distributed Systems",
    "System Design",
    "Automation",
    "Real-Time Systems",
    "OAuth & Identity",
    "Type-Safe APIs",
    "Linux",
    "Networking",
    "Developer Infrastructure",
    "Data Structures & Algorithms",
  ],

  admiredSystems: [
    "Git — A beautifully designed distributed version control system hiding remarkable engineering beneath a simple interface.",
    "Computer Architecture — A field that explores how software interacts with hardware and how computers work under the hood.",
    "Linux — The operating system powering most of the modern internet.",
    "TypeScript — Proof that great tooling can fundamentally improve software engineering.",
  ],

  projects: [
    {
      id: "internals",
      title: "Internals",
      description:
        "An interactive portfolio that explains how modern software systems work through layered visualizations, animations, and architectural deep dives.",
      tech: ["React", "Vite", "Framer Motion", "TypeScript"],
      links: {
        github: "https://github.com/Parikaragarwal/portfolio",
        website: "https://parikar.in",
      },
    },

    {
      id: "inquest",
      title: "Inquest",
      description:
        "A modern form platform for creating, managing, and analyzing customizable forms with a type-safe full-stack architecture.",
      tech: ["React", "tRPC", "Redis", "TypeScript"],
      links: {
        github: "https://github.com/Parikaragarwal/Inquest",
        website: "https://inquest.parikar.in",
      },
    },

    {
      id: "shomei-auth",
      title: "Shomei Auth",
      description:
        "An OAuth 2.0 and OpenID Connect identity provider built to understand authentication, authorization, token lifecycles, and secure identity flows from first principles.",
      tech: ["Node.js", "PostgreSQL", "TypeScript"],
      links: {
        github: "https://github.com/Parikaragarwal/Shomei-auth",
        website: "https://auth.parikar.in",
      },
    },

    {
      id: "cell-city",
      title: "Cell City Telecom",
      description:
        "A production website built for a local mobile retailer, focused on delivering a responsive user experience and a reliable online presence for the business.",
      tech: ["React", "Appwrite", "Tailwind CSS"],
      links: {
        github: "https://github.com/Parikaragarwal/Cell-City",
        website: "https://www.cellcitytelecom.com/",
      },
    },
  ],
};