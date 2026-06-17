export const PORTFOLIO_DATA = {
  about: {
    name: "Parikar",
    tagline: "Software Engineer & Systems Explorer",
    bio: "I build transparent machines. I am fascinated by what happens beneath the surface—from the browser DOM to CPU instruction pipelines. This portfolio is not just a showcase of my work, but a living map of how I think, learn, and explore.",
  },
  obsessions: [
    "OIDC and identity systems",
    "Type-safe architectures",
    "Linux internals",
    "Networking fundamentals",
    "Developer tooling"
  ],
  questions: [
    "Why do abstractions inevitably leak?",
    "What makes software maintainable for ten years?",
    "Can complexity be compressed without losing meaning?",
    "What is the smallest useful abstraction?"
  ],
  admiredSystems: [
    "Git - for its brilliant merkle tree foundation.",
    "PostgreSQL - for unyielding reliability.",
    "Vite - for rethinking the bundler paradigm entirely."
  ],
  projects: [
    {
      id: "project-1",
      title: "Distributed KV Store",
      description: "A toy distributed key-value store built in Go using the Raft consensus algorithm.",
      tech: ["Go", "Raft", "gRPC"],
      layers: {
        surface: "A fast, scalable key-value database.",
        mechanism: "Nodes communicate via gRPC, electing a leader to handle writes.",
        implementation: "Append-only log for durability, snapshotting for compaction."
      }
    },
    {
      id: "project-2",
      title: "Browser Engine Toy",
      description: "A minimal HTML/CSS parser and layout engine written in Rust.",
      tech: ["Rust", "Parsing"],
      layers: {
        surface: "Renders basic HTML and CSS to an image.",
        mechanism: "Tokenizes HTML into a DOM tree, parses CSS into rules, computes styles.",
        implementation: "Uses a recursive descent parser and basic box model mathematics."
      }
    }
  ]
};
