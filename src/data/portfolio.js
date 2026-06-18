export const PORTFOLIO_DATA = {
  about: {
    name: "Parikar",
    tagline: "Software Engineer & Architect",
    bio: "I build systems and dismantle them to see how they work. I care about the lowest layers of abstraction and how data physically moves across the network."
  },
  socials: [
    { name: "GitHub", url: "https://github.com/parikar" },
    { name: "Twitter", url: "https://twitter.com/parikar" },
    { name: "LinkedIn", url: "https://linkedin.com/in/parikar" }
  ],
  questions: [
    "How does distributed consensus hold up under extreme Byzantine faults?",
    "Why did we abstract away the DOM instead of optimizing it directly?",
    "Can we build a fully functional OS kernel entirely in Rust for production?"
  ],
  obsessions: [
    "Database Internals", "Compilers", "TCP/IP Stack", "Event Loops", "WebAssembly"
  ],
  admiredSystems: [
    "Git - For its immutable DAG data structure that perfectly solves distributed state.",
    "PostgreSQL - The absolute gold standard of extensible, rock-solid engineering.",
    "Redis - Proving that single-threaded architecture can still dominate if done right."
  ],
  projects: [
    {
      id: "transparent-machine",
      title: "Transparent Machine",
      description: "A portfolio website that visually exposes its own rendering architecture.",
      tech: ["React", "Three.js", "Zustand"],
      links: {
        github: "https://github.com/parikar/transparent-machine",
        website: "https://parikar.com"
      }
    },
    {
      id: "rust-kv",
      title: "Distributed KV Store",
      description: "A toy distributed Key-Value store implementing a basic Raft consensus algorithm.",
      tech: ["Rust", "Tokio", "gRPC"],
      links: {
        github: "https://github.com/parikar/rust-kv",
        website: null
      }
    },
    {
      id: "custom-reconciler",
      title: "Mini React Reconciler",
      description: "A scratch-built virtual DOM reconciler to understand fiber tree traversal.",
      tech: ["JavaScript", "DOM API"],
      links: {
        github: "https://github.com/parikar/mini-reconciler",
        website: "https://demo.parikar.com/reconciler"
      }
    },
    {
      id: "wasm-physics",
      title: "WASM Physics Engine",
      description: "A 2D rigid body physics engine compiled to WebAssembly for browser use.",
      tech: ["C++", "WebAssembly", "Canvas API"],
      links: {
        github: "https://github.com/parikar/wasm-physics",
        website: "https://physics.parikar.com"
      }
    }
  ]
};
