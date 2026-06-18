export const PORTFOLIO_DATA = {
  about: {
    name: "Parikar",
    tagline: "Full Stack Developer & Systems Explorer",
    bio: "I enjoy building web applications and then digging beneath the abstractions that make them work. From OAuth flows and type-safe APIs to Linux, networking, deployment, and system architecture, I'm fascinated by how software moves through the stack."
  },

  socials: [
    { name: "GitHub", url: "https://github.com/parikar" },
    { name: "LinkedIn", url: "https://linkedin.com/in/parikar" }
  ],

  questions: [
    "Where does complexity actually come from in software systems?",
    "How far can type safety be pushed across the frontend-backend boundary?",
    "What abstractions are worth keeping, and which ones hide too much?",
    "How does a request really travel from a browser to a database and back?"
  ],

  obsessions: [
    "OAuth & Identity",
    "Type-Safe APIs",
    "Linux",
    "Networking",
    "System Architecture",
    "Developer Tooling",
    "Self Hosting"
  ],

  admiredSystems: [
    "Git — A distributed system most developers use every day without fully appreciating its design.",
    "PostgreSQL — A database that keeps revealing deeper layers the more you study it.",
    "Linux — The foundation beneath most modern software infrastructure.",
    "TypeScript — A practical example of how tooling can dramatically improve developer experience."
  ],

  projects: [
    {
      id: "transparent-machine",
      title: "Transparent Machine",
      description:
        "A portfolio platform designed to reveal the mechanisms behind software systems through interactive architecture visualizations and layered explanations.",
      tech: ["React", "Vite", "Framer Motion"],
      links: {
        github: "https://github.com/parikar/transparent-machine",
        website: "https://parikar.in"
      }
    },

    {
      id: "inquest",
      title: "Inquest",
      description:
        "A form builder platform focused on creating, managing, and collecting structured responses through customizable forms.",
      tech: ["React", "Appwrite", "Tailwind CSS"],
      links: {
        github: null,
        website: null
      }
    },

    {
      id: "oidc-provider",
      title: "OIDC Authentication Service",
      description:
        "An identity provider implementing OAuth 2.0 and OpenID Connect concepts to better understand authentication, authorization, and token flows.",
      tech: ["Node.js", "Fastify", "TypeScript"],
      links: {
        github: null,
        website: null
      }
    },

    {
      id: "travelblogs",
      title: "TravelBlogs",
      description:
        "A blogging platform where users can create, manage, and share travel experiences through rich content and media.",
      tech: ["React", "Appwrite", "Tailwind CSS"],
      links: {
        github: null,
        website: null
      }
    }
  ]
};