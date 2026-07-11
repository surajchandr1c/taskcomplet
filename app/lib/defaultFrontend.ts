import { CardData } from "./storage";

export const defaultFrontendCardData: CardData = {
  tasks: [],
  sections: [
    {
      id: 101,
      heading: "1. Internet",
      tasks: [
        { id: 10101, text: "How the Internet Works", completed: false },
        { id: 10102, text: "HTTP & HTTPS", completed: false },
        { id: 10103, text: "DNS", completed: false },
        { id: 10104, text: "Domain Names", completed: false },
        { id: 10105, text: "Hosting", completed: false },
        { id: 10106, text: "Browsers and How They Work", completed: false },
        { id: 10107, text: "Client-Server Architecture", completed: false },
        { id: 10108, text: "WebSockets", completed: false },
        { id: 10109, text: "REST API Basics", completed: false },
        { id: 10110, text: "Cookies", completed: false },
        { id: 10111, text: "Sessions", completed: false },
        { id: 10112, text: "CDN", completed: false }
      ]
    },
    {
      id: 102,
      heading: "2. Version Control",
      tasks: [
        { id: 10201, text: "Git", completed: false },
        { id: 10202, text: "Git Installation", completed: false },
        { id: 10203, text: "Repository", completed: false },
        { id: 10204, text: "Clone", completed: false },
        { id: 10205, text: "Init", completed: false },
        { id: 10206, text: "Add", completed: false },
        { id: 10207, text: "Commit", completed: false },
        { id: 10208, text: "Push", completed: false },
        { id: 10209, text: "Pull", completed: false },
        { id: 10210, text: "Fetch", completed: false },
        { id: 10211, text: "Branch", completed: false },
        { id: 10212, text: "Merge", completed: false },
        { id: 10213, text: "Rebase", completed: false },
        { id: 10214, text: "Cherry Pick", completed: false },
        { id: 10215, text: "Stash", completed: false },
        { id: 10216, text: "Tags", completed: false },
        { id: 10217, text: "Reset", completed: false },
        { id: 10218, text: "Revert", completed: false },
        { id: 10219, text: "Git Platforms (GitHub, GitLab, Bitbucket)", completed: false }
      ]
    },
    {
      id: 103,
      heading: "3. HTML",
      tasks: [
        { id: 10301, text: "Basics (Structure, Elements, Attributes, Comments)", completed: false },
        { id: 10302, text: "Text (Headings, Paragraphs, Lists, Links, Images)", completed: false },
        { id: 10303, text: "Tables", completed: false },
        { id: 10304, text: "Forms (Inputs, Labels, Select, Textarea, Radio, Checkbox, Buttons, Validation)", completed: false },
        { id: 10305, text: "Media (Audio, Video, iframe)", completed: false },
        { id: 10306, text: "Semantic HTML (header, nav, main, article, section, aside, footer)", completed: false },
        { id: 10307, text: "Accessibility (ARIA, Screen Readers, Keyboard Navigation)", completed: false },
        { id: 10308, text: "SEO (Meta Tags, Open Graph, Structured Data)", completed: false }
      ]
    },
    {
      id: 104,
      heading: "4. CSS",
      tasks: [
        { id: 10401, text: "Basics (Syntax, Selectors, Colors, Units, Comments)", completed: false },
        { id: 10402, text: "Box Model (Margin, Padding, Border, Width, Height)", completed: false },
        { id: 10403, text: "Typography (Fonts, Text Styling, Line Height, Letter Spacing)", completed: false },
        { id: 10404, text: "Backgrounds (Color, Image, Gradient)", completed: false },
        { id: 10405, text: "Position (Static, Relative, Absolute, Fixed, Sticky)", completed: false },
        { id: 10406, text: "Display (Block, Inline, Inline Block, None, Overflow, Float)", completed: false },
        { id: 10407, text: "Flexbox (Flex Direction, Justify Content, Align Items, Gap, Wrap, Order)", completed: false },
        { id: 10408, text: "CSS Grid (Rows, Columns, Grid Areas, Auto Flow)", completed: false },
        { id: 10409, text: "Responsive Design (Media Queries, Mobile First, Breakpoints)", completed: false },
        { id: 10410, text: "Animation (Transition, Transform, Keyframes)", completed: false },
        { id: 10411, text: "Advanced CSS (Variables, calc(), clamp(), object-fit, filter, backdrop-filter, aspect-ratio)", completed: false },
        { id: 10412, text: "CSS Architecture (BEM, CSS Modules, Atomic CSS)", completed: false },
        { id: 10413, text: "CSS Frameworks (Tailwind CSS, Bootstrap)", completed: false },
        { id: 10414, text: "Preprocessors (Sass, PostCSS)", completed: false }
      ]
    },
    {
      id: 105,
      heading: "5. JavaScript",
      tasks: [
        { id: 10501, text: "Fundamentals (Variables, Data Types, Operators, Loops, Functions)", completed: false },
        { id: 10502, text: "Arrays & Objects", completed: false },
        { id: 10503, text: "Strings, Numbers, Dates", completed: false },
        { id: 10504, text: "Scope (Global, Local, Block)", completed: false },
        { id: 10505, text: "ES6+ (let, const, Arrow, Template, Destructuring, Spread, Rest, Default Params)", completed: false },
        { id: 10506, text: "Modules & Classes", completed: false },
        { id: 10507, text: "DOM (Selecting, Creating, Removing Elements)", completed: false },
        { id: 10508, text: "Events & Event Delegation", completed: false },
        { id: 10509, text: "BOM (Window, History, Location, Navigator)", completed: false },
        { id: 10510, text: "Storage (Local Storage, Session Storage, Cookies)", completed: false },
        { id: 10511, text: "JSON", completed: false },
        { id: 10512, text: "Fetch API & AJAX", completed: false },
        { id: 10513, text: "Promises & Async Await", completed: false },
        { id: 10514, text: "Event Loop", completed: false },
        { id: 10515, text: "Error Handling (try, catch, finally)", completed: false },
        { id: 10516, text: "Regular Expressions", completed: false }
      ]
    },
    {
      id: 106,
      heading: "6. Package Managers",
      tasks: [
        { id: 10601, text: "npm", completed: false },
        { id: 10602, text: "yarn", completed: false },
        { id: 10603, text: "pnpm", completed: false }
      ]
    },
    {
      id: 107,
      heading: "7. Module Bundlers",
      tasks: [
        { id: 10701, text: "Vite", completed: false },
        { id: 10702, text: "Webpack", completed: false },
        { id: 10703, text: "Rollup", completed: false },
        { id: 10704, text: "Parcel", completed: false },
        { id: 10705, text: "esbuild", completed: false }
      ]
    },
    {
      id: 108,
      heading: "8. Linters & Formatters",
      tasks: [
        { id: 10801, text: "ESLint", completed: false },
        { id: 10802, text: "Prettier", completed: false }
      ]
    },
    {
      id: 109,
      heading: "9. TypeScript",
      tasks: [
        { id: 10901, text: "Basics (Types, Interfaces, Enums, Type Aliases, Generics)", completed: false },
        { id: 10902, text: "Advanced (Utility Types, Decorators, Modules, Declaration Files)", completed: false }
      ]
    },
    {
      id: 110,
      heading: "10. React",
      tasks: [
        { id: 11001, text: "Basics (JSX, Components, Props, State, Events)", completed: false },
        { id: 11002, text: "Hooks (useState, useEffect, useRef, useContext, useMemo, useCallback, useReducer, Custom Hooks)", completed: false },
        { id: 11003, text: "Routing (React Router)", completed: false },
        { id: 11004, text: "Forms & Context API", completed: false },
        { id: 11005, text: "Redux Toolkit", completed: false },
        { id: 11006, text: "Performance (Memoization, Lazy, Suspense, Code Splitting)", completed: false },
        { id: 11007, text: "API Integration (Axios, Fetch)", completed: false }
      ]
    },
    {
      id: 111,
      heading: "11. Next.js",
      tasks: [
        { id: 11101, text: "App Router & Pages Router", completed: false },
        { id: 11102, text: "Layouts & Routing (Dynamic Routes)", completed: false },
        { id: 11103, text: "Server Components & Client Components", completed: false },
        { id: 11104, text: "API Routes & Metadata", completed: false },
        { id: 11105, text: "Image Optimization & Middleware", completed: false },
        { id: 11106, text: "Authentication & Deployment", completed: false }
      ]
    },
    {
      id: 112,
      heading: "12. State Management",
      tasks: [
        { id: 11201, text: "Context API", completed: false },
        { id: 11202, text: "Redux Toolkit", completed: false },
        { id: 11203, text: "Zustand", completed: false },
        { id: 11204, text: "MobX", completed: false },
        { id: 11205, text: "Recoil", completed: false }
      ]
    },
    {
      id: 113,
      heading: "13. API Handling",
      tasks: [
        { id: 11301, text: "REST APIs", completed: false },
        { id: 11302, text: "GraphQL", completed: false },
        { id: 11303, text: "Axios & Fetch", completed: false },
        { id: 11304, text: "React Query / TanStack Query", completed: false }
      ]
    },
    {
      id: 114,
      heading: "14. Authentication",
      tasks: [
        { id: 11401, text: "JWT", completed: false },
        { id: 11402, text: "OAuth", completed: false },
        { id: 11403, text: "Session Authentication", completed: false },
        { id: 11404, text: "Cookies & Refresh Tokens", completed: false }
      ]
    },
    {
      id: 115,
      heading: "15. Testing",
      tasks: [
        { id: 11501, text: "Unit Testing (Jest, Vitest)", completed: false },
        { id: 11502, text: "Component Testing (React Testing Library)", completed: false },
        { id: 11503, text: "End-to-End (Cypress, Playwright)", completed: false }
      ]
    },
    {
      id: 116,
      heading: "16. Performance Optimization",
      tasks: [
        { id: 11601, text: "Lazy Loading & Image Optimization", completed: false },
        { id: 11602, text: "Code Splitting & Tree Shaking", completed: false },
        { id: 11603, text: "Memoization", completed: false },
        { id: 11604, text: "Bundle Analysis & Lighthouse", completed: false }
      ]
    },
    {
      id: 117,
      heading: "17. Web Security",
      tasks: [
        { id: 11701, text: "HTTPS & CORS", completed: false },
        { id: 11702, text: "CSP, XSS, CSRF", completed: false },
        { id: 11703, text: "SQL Injection Basics & Secure Auth", completed: false }
      ]
    },
    {
      id: 118,
      heading: "18. Browser APIs",
      tasks: [
        { id: 11801, text: "Clipboard & Geolocation APIs", completed: false },
        { id: 11802, text: "Notifications API & Web Workers", completed: false },
        { id: 11803, text: "WebSockets & Drag and Drop API", completed: false },
        { id: 11804, text: "File API & IndexedDB", completed: false }
      ]
    },
    {
      id: 119,
      heading: "19. Progressive Web Apps (PWA)",
      tasks: [
        { id: 11901, text: "Manifest & Service Workers", completed: false },
        { id: 11902, text: "Offline Support & Push Notifications", completed: false },
        { id: 11903, text: "Background Sync", completed: false }
      ]
    },
    {
      id: 120,
      heading: "20. Build & Deployment",
      tasks: [
        { id: 12001, text: "Vercel & Netlify", completed: false },
        { id: 12002, text: "Firebase Hosting & GitHub Pages", completed: false },
        { id: 12003, text: "Docker Basics", completed: false }
      ]
    },
    {
      id: 121,
      heading: "21. UI Libraries",
      tasks: [
        { id: 12101, text: "Material UI & Shadcn UI", completed: false },
        { id: 12102, text: "Chakra UI & Ant Design", completed: false },
        { id: 12103, text: "Radix UI", completed: false }
      ]
    },
    {
      id: 122,
      heading: "22. Animation Libraries",
      tasks: [
        { id: 12201, text: "Framer Motion & GSAP", completed: false },
        { id: 12202, text: "AOS & React Spring", completed: false }
      ]
    },
    {
      id: 123,
      heading: "23. Design & UI/UX",
      tasks: [
        { id: 12301, text: "Figma & Responsive Design", completed: false },
        { id: 12302, text: "Accessibility & Color Theory", completed: false },
        { id: 12303, text: "Typography & Design Systems", completed: false }
      ]
    },
    {
      id: 124,
      heading: "24. SEO",
      tasks: [
        { id: 12401, text: "Meta Tags & Sitemap", completed: false },
        { id: 12402, text: "Robots.txt & Open Graph", completed: false },
        { id: 12403, text: "Structured Data & Canonical URLs", completed: false }
      ]
    },
    {
      id: 125,
      heading: "25. MERN Stack Integration",
      tasks: [
        { id: 12501, text: "MERN Stack Architecture", completed: false },
        { id: 12502, text: "Connecting React Frontend with Express Backend", completed: false },
        { id: 12503, text: "MongoDB & Mongoose Integration in Express", completed: false },
        { id: 12504, text: "Full-Stack Authentication (JWT, Cookies, Context API)", completed: false },
        { id: 12505, text: "Deploying MERN Applications", completed: false }
      ]
    }
  ]
};
