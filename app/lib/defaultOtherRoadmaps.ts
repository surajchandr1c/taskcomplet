import { CardData, RoadmapCard } from "./storage";

export const defaultOtherRoadmapCards: RoadmapCard[] = [
  {
    title: "Full Stack",
    slug: "full-stack",
    description: "Complete roadmap for full stack web development (Frontend + Backend + DB).",
    items: ["Frontend Fundamentals", "Modern Frontend Library", "Backend Foundations", "Databases & Storage", "DevOps & Hosting"]
  },
  {
    title: "Data Analyst",
    slug: "data-analyst",
    description: "Learn to clean, analyze, and visualize data to drive business decisions.",
    items: ["Data Collection & Entry", "Database Queries (SQL)", "Python programming", "Data Visualization", "Statistics"]
  },
  {
    title: "Data Scientist",
    slug: "data-scientist",
    description: "Advanced data analysis, statistical modeling, machine learning, and big data.",
    items: ["Mathematical Foundations", "Python for Data Science", "Machine Learning Core", "Deep Learning & NLP", "Big Data & MLOps"]
  },
  {
    title: "AI Engineer",
    slug: "ai-engineer",
    description: "Build intelligent systems using modern deep learning, LLMs, and Generative AI.",
    items: ["Machine Learning Basics", "Deep Learning Core", "Generative AI", "LLM Applications (RAG)", "AI Deployment"]
  },
  {
    title: "Cyber Security",
    slug: "cyber-security",
    description: "Protect systems, networks, and data from digital threats and exploits.",
    items: ["Networking Basics", "System Security", "Cryptography", "Penetration Testing", "Incident Response"]
  },
  {
    title: "Game Developer",
    slug: "game-developer",
    description: "Design and program video games across platforms using top engines.",
    items: ["Mathematics & Physics", "Game Engines", "Programming", "Game Graphics & Audio", "Optimization & Release"]
  },
  {
    title: "C++",
    slug: "c-plus-plus",
    description: "Master modern C++ programming from syntax to high-performance concurrency.",
    items: [
      "Introduction", "Basic Syntax", "Operators", "Control Statements", "Functions",
      "Arrays & Strings", "Pointers & References", "Dynamic Memory", "Structures & Enums",
      "Object-Oriented Programming", "OOP Concepts", "Exception Handling", "Templates",
      "STL Containers", "STL Iterators & Algorithms", "STL Utilities", "File Handling",
      "Preprocessor Directives", "Namespaces", "Modern C++ (C++11/14/17)", "Modern C++ (C++20)",
      "Memory Management & Multithreading"
    ]
  },
  {
    title: "DSA",
    slug: "dsa",
    description: "Master Data Structures and Algorithms for technical interviews and problem solving.",
    items: ["Complexity Analysis", "Core Data Structures", "Sorting & Searching", "Advanced Data Structures", "Coding Paradigms"]
  },
  {
    title: "Vibe Coding",
    slug: "vibe-coding",
    description: "Learn to build production apps rapidly by pairing with AI coding assistants.",
    items: ["Prompt Engineering", "AI Code Assistants", "Code Reading & Review", "Iterative Architecture", "Deployment Automation"]
  },
  {
    title: "Python",
    slug: "python",
    description: "Learn Python from the ground up to advanced application building.",
    items: ["Syntax & Types", "Advanced Core", "Data Libraries", "Web Frameworks", "Testing & Packaging"]
  },
  {
    title: "Java",
    slug: "java",
    description: "Complete guide to Java enterprise development, concurrency, and OOP.",
    items: ["Java Syntax", "OOP Principles", "Collections Framework", "Spring Boot Framework", "Tools & Testing"]
  },
  {
    title: "React",
    slug: "react",
    description: "Master component-driven frontend interfaces using modern React hooks.",
    items: ["Component Foundations", "Hook API", "State Management", "Routing & Forms", "Performance Optimization"]
  },
  {
    title: "Next.js",
    slug: "nextjs",
    description: "Build production-ready React apps with file routing, server actions, and SSR.",
    items: ["Routing Core", "Rendering Strategies", "Data Fetching", "Advanced Features", "Production Deploy"]
  },
  {
    title: "JavaScript",
    slug: "javascript",
    description: "Master core JavaScript, async patterns, DOM manipulation, and modern ES6+.",
    items: ["Language Fundamentals", "Advanced Core", "Asynchronous JavaScript", "DOM & Browser APIs", "Modern Ecosystem"]
  },
  {
    title: "Angular",
    slug: "angular",
    description: "Build robust scalable client applications using Angular framework.",
    items: ["Angular Architecture", "Directives & Pipes", "Services & DI", "RxJS & Routing", "Forms & Testing"]
  }
];

export const defaultOtherRoadmapsData: Record<string, CardData> = {
  "full-stack": {
    tasks: [],
    sections: [
      {
        id: 401,
        heading: "1. Frontend Fundamentals",
        tasks: [
          { id: 40101, text: "HTML5 Semantic Elements", completed: false },
          { id: 40102, text: "CSS3 Flexbox & Grid Layouts", completed: false },
          { id: 40103, text: "ES6+ JavaScript (Promises, Fetch, DOM)", completed: false }
        ]
      },
      {
        id: 402,
        heading: "2. Modern Frontend Library",
        tasks: [
          { id: 40201, text: "React Components & Hooks", completed: false },
          { id: 40202, text: "State Management (Redux/Zustand)", completed: false },
          { id: 40203, text: "Tailwind CSS Styling", completed: false }
        ]
      },
      {
        id: 403,
        heading: "3. Backend Foundations",
        tasks: [
          { id: 40301, text: "Node.js & Express API Routes", completed: false },
          { id: 40302, text: "REST API Design & MVC Pattern", completed: false },
          { id: 40303, text: "JSON Web Tokens (JWT) Auth", completed: false }
        ]
      },
      {
        id: 404,
        heading: "4. Databases & Storage",
        tasks: [
          { id: 40401, text: "SQL Schemas (PostgreSQL / MySQL)", completed: false },
          { id: 40402, text: "NoSQL Collections (MongoDB)", completed: false },
          { id: 40403, text: "Redis Caching Integration", completed: false }
        ]
      },
      {
        id: 405,
        heading: "5. DevOps & Hosting",
        tasks: [
          { id: 40501, text: "Docker Containers", completed: false },
          { id: 40502, text: "GitHub Actions CI/CD", completed: false },
          { id: 40503, text: "Vercel & AWS Deployments", completed: false }
        ]
      }
    ]
  },
  "data-analyst": {
    tasks: [],
    sections: [
      {
        id: 411,
        heading: "1. Data Collection & Entry",
        tasks: [
          { id: 41101, text: "Excel Formulas & Pivot Tables", completed: false },
          { id: 41102, text: "Data Importing & Formatting", completed: false },
          { id: 41103, text: "Data Cleaning & Deduplication", completed: false }
        ]
      },
      {
        id: 412,
        heading: "2. Database Queries (SQL)",
        tasks: [
          { id: 41201, text: "SQL SELECT & filtering", completed: false },
          { id: 41202, text: "Joins, Aggregations & Group By", completed: false },
          { id: 41203, text: "Subqueries & Window Functions", completed: false }
        ]
      },
      {
        id: 413,
        heading: "3. Python Programming",
        tasks: [
          { id: 41301, text: "Python Syntax & Loops", completed: false },
          { id: 41302, text: "Pandas DataFrames for Analysis", completed: false },
          { id: 41303, text: "NumPy Array calculations", completed: false }
        ]
      },
      {
        id: 414,
        heading: "4. Data Visualization",
        tasks: [
          { id: 41401, text: "Creating Tableau Dashboards", completed: false },
          { id: 41402, text: "PowerBI Interactive Reports", completed: false },
          { id: 41403, text: "Matplotlib & Seaborn plots", completed: false }
        ]
      },
      {
        id: 415,
        heading: "5. Statistics",
        tasks: [
          { id: 41501, text: "Probability Distributions", completed: false },
          { id: 41502, text: "Hypothesis Testing (p-value)", completed: false },
          { id: 41503, text: "A/B Testing Principles", completed: false }
        ]
      }
    ]
  },
  "data-scientist": {
    tasks: [],
    sections: [
      {
        id: 421,
        heading: "1. Mathematical Foundations",
        tasks: [
          { id: 42101, text: "Linear Algebra (Matrices, Vectors)", completed: false },
          { id: 42102, text: "Calculus (Derivatives, Gradients)", completed: false },
          { id: 42103, text: "Probability & Descriptive Statistics", completed: false }
        ]
      },
      {
        id: 422,
        heading: "2. Python for Data Science",
        tasks: [
          { id: 42201, text: "NumPy & Pandas essentials", completed: false },
          { id: 42202, text: "Data Preprocessing & Encoding", completed: false },
          { id: 42203, text: "Scikit-Learn library usage", completed: false }
        ]
      },
      {
        id: 423,
        heading: "3. Machine Learning Core",
        tasks: [
          { id: 42301, text: "Supervised Learning (Regression, Classification)", completed: false },
          { id: 42302, text: "Unsupervised Learning (Clustering, PCA)", completed: false },
          { id: 42303, text: "Model Evaluation & Hyperparameter Tuning", completed: false }
        ]
      },
      {
        id: 424,
        heading: "4. Deep Learning & NLP",
        tasks: [
          { id: 42401, text: "Artificial Neural Networks (ANN)", completed: false },
          { id: 42402, text: "CNNs for Computer Vision", completed: false },
          { id: 42403, text: "Text Tokenization & NLP Embeddings", completed: false }
        ]
      },
      {
        id: 425,
        heading: "5. Big Data & MLOps",
        tasks: [
          { id: 42501, text: "Big Data Processing with PySpark", completed: false },
          { id: 42502, text: "Model Versioning with MLflow", completed: false },
          { id: 42503, text: "Containerized deployments via Docker", completed: false }
        ]
      }
    ]
  },
  "ai-engineer": {
    tasks: [],
    sections: [
      {
        id: 431,
        heading: "1. Machine Learning Basics",
        tasks: [
          { id: 43101, text: "Data Analysis & Feature Engineering", completed: false },
          { id: 43102, text: "Supervised ML Classification Models", completed: false },
          { id: 43103, text: "Tuning Decision Trees & Forests", completed: false }
        ]
      },
      {
        id: 432,
        heading: "2. Deep Learning Core",
        tasks: [
          { id: 43201, text: "PyTorch Tensor Operations", completed: false },
          { id: 43202, text: "Training CNNs & Transfer Learning", completed: false },
          { id: 43203, text: "Attention Mechanism & Transformers", completed: false }
        ]
      },
      {
        id: 433,
        heading: "3. Generative AI",
        tasks: [
          { id: 43301, text: "Prompt Engineering Techniques", completed: false },
          { id: 43302, text: "Large Language Model Fine-Tuning", completed: false },
          { id: 43303, text: "Hugging Face Hub API Integrations", completed: false }
        ]
      },
      {
        id: 434,
        heading: "4. LLM Applications (RAG)",
        tasks: [
          { id: 43401, text: "Retrieval-Augmented Generation (RAG) Architecture", completed: false },
          { id: 43402, text: "Vector Databases (ChromaDB / Pinecone)", completed: false },
          { id: 43403, text: "LangChain or LlamaIndex scripting", completed: false }
        ]
      },
      {
        id: 435,
        heading: "5. AI Deployment",
        tasks: [
          { id: 43501, text: "Creating FastAPI endpoints for models", completed: false },
          { id: 43502, text: "Model Quantization & Optimization", completed: false },
          { id: 43503, text: "Continuous Monitoring of Model Drift", completed: false }
        ]
      }
    ]
  },
  "cyber-security": {
    tasks: [],
    sections: [
      {
        id: 441,
        heading: "1. Networking Basics",
        tasks: [
          { id: 44101, text: "OSI & TCP/IP Layer Protocol Suite", completed: false },
          { id: 44102, text: "DNS, IP routing, Subnetting", completed: false },
          { id: 44103, text: "HTTP & SSL/TLS Secure Handshakes", completed: false }
        ]
      },
      {
        id: 442,
        heading: "2. System Security",
        tasks: [
          { id: 44201, text: "Linux Command Line Security", completed: false },
          { id: 44202, text: "Windows Active Directory Auditing", completed: false },
          { id: 44203, text: "Bash / Python Security Scripting", completed: false }
        ]
      },
      {
        id: 443,
        heading: "3. Cryptography",
        tasks: [
          { id: 44301, text: "Symmetric Encryption (AES)", completed: false },
          { id: 44302, text: "Asymmetric Encryption (RSA/ECC)", completed: false },
          { id: 44303, text: "Hashing Algorithms (SHA-256)", completed: false }
        ]
      },
      {
        id: 444,
        heading: "4. Penetration Testing",
        tasks: [
          { id: 44401, text: "Port Scanning & Vuln analysis (Nmap)", completed: false },
          { id: 44402, text: "Exploiting vulns via Metasploit", completed: false },
          { id: 44403, text: "OWASP Top 10 Web Exploits", completed: false }
        ]
      },
      {
        id: 445,
        heading: "5. Incident Response",
        tasks: [
          { id: 44501, text: "SIEM log monitoring (Splunk / ELK)", completed: false },
          { id: 44502, text: "Log Analysis & Intrusion Detection", completed: false },
          { id: 44503, text: "Digital Forensics & Malware Analysis", completed: false }
        ]
      }
    ]
  },
  "game-developer": {
    tasks: [],
    sections: [
      {
        id: 451,
        heading: "1. Mathematics & Physics",
        tasks: [
          { id: 45101, text: "Vector Math & Matrix Transformations", completed: false },
          { id: 45102, text: "Trigonometry & Rotation Maths", completed: false },
          { id: 45103, text: "AABB Collision Detection & Rigidbody Physics", completed: false }
        ]
      },
      {
        id: 452,
        heading: "2. Game Engines",
        tasks: [
          { id: 45201, text: "Unity Engine Editor & Workflow", completed: false },
          { id: 45202, text: "Unreal Engine Editor basics", completed: false },
          { id: 45203, text: "Godot Engine Scene Tree layout", completed: false }
        ]
      },
      {
        id: 453,
        heading: "3. Programming",
        tasks: [
          { id: 45301, text: "C# Scripting for Unity API", completed: false },
          { id: 45302, text: "C++ & Blueprints in Unreal Engine", completed: false },
          { id: 45303, text: "Design Patterns (State, Observer, Command)", completed: false }
        ]
      },
      {
        id: 454,
        heading: "4. Game Graphics & Audio",
        tasks: [
          { id: 45401, text: "3D Asset import pipeline (Blender/FBX)", completed: false },
          { id: 45402, text: "Shader Graph / Material Editor coding", completed: false },
          { id: 45403, text: "Spatial Audio & sound triggers", completed: false }
        ]
      },
      {
        id: 455,
        heading: "5. Optimization & Release",
        tasks: [
          { id: 45501, text: "Framerate Profiling & Draw Calls", completed: false },
          { id: 45502, text: "Memory allocation & Garbage Collection", completed: false },
          { id: 45503, text: "Cross-platform compiling & Builds", completed: false }
        ]
      }
    ]
  },
  "c-plus-plus": {
    tasks: [],
    sections: [
      {
        id: 4601,
        heading: "1. Introduction",
        tasks: [
          { id: 460101, text: "What is C++ & History", completed: false },
          { id: 460102, text: "Installation & Setup", completed: false },
          { id: 460103, text: "First Program & Syntax Structure", completed: false },
          { id: 460104, text: "Compilation Process & Toolchains", completed: false }
        ]
      },
      {
        id: 4602,
        heading: "2. Basic Syntax",
        tasks: [
          { id: 460201, text: "Variables, Data Types & Keywords", completed: false },
          { id: 460202, text: "Identifiers, Constants & Literals", completed: false },
          { id: 460203, text: "Comments & Standard Input/Output", completed: false },
          { id: 460204, text: "Namespace Basics", completed: false }
        ]
      },
      {
        id: 4603,
        heading: "3. Operators",
        tasks: [
          { id: 460301, text: "Arithmetic & Assignment Operators", completed: false },
          { id: 460302, text: "Relational & Logical Operators", completed: false },
          { id: 460303, text: "Bitwise Operators & Ternary Operator", completed: false },
          { id: 460304, text: "sizeof Operator", completed: false }
        ]
      },
      {
        id: 4604,
        heading: "4. Control Statements",
        tasks: [
          { id: 460401, text: "Conditions: if, if-else, else-if & Nested if", completed: false },
          { id: 460402, text: "switch Statements", completed: false },
          { id: 460403, text: "Loops: for, while & do-while", completed: false },
          { id: 460404, text: "Range-based for Loop", completed: false },
          { id: 460405, text: "break, continue & return Statements", completed: false }
        ]
      },
      {
        id: 4605,
        heading: "5. Functions",
        tasks: [
          { id: 460501, text: "Function Declaration, Definition & Calls", completed: false },
          { id: 460502, text: "Parameters, Return Types & Default Arguments", completed: false },
          { id: 460503, text: "Function Overloading & Inline Functions", completed: false },
          { id: 460504, text: "Recursion & Lambda Functions", completed: false }
        ]
      },
      {
        id: 4606,
        heading: "6. Arrays & Strings",
        tasks: [
          { id: 460601, text: "One-Dimensional, Two-Dimensional & Multi-Dimensional Arrays", completed: false },
          { id: 460602, text: "Character Arrays & C-Style Strings", completed: false },
          { id: 460603, text: "std::string Class & Operations", completed: false }
        ]
      },
      {
        id: 4607,
        heading: "7. Pointers & References",
        tasks: [
          { id: 460701, text: "Pointer Basics & Pointer Arithmetic", completed: false },
          { id: 460702, text: "Pointer to Pointer & Void Pointers", completed: false },
          { id: 460703, text: "Function Pointers & Smart Pointers Introduction", completed: false },
          { id: 460704, text: "Reference Variables, Pass by Reference & Const References", completed: false }
        ]
      },
      {
        id: 4608,
        heading: "8. Dynamic Memory",
        tasks: [
          { id: 460801, text: "Dynamic Allocation: new, delete, new[] & delete[]", completed: false },
          { id: 460802, text: "Memory Management & Leak Prevention", completed: false }
        ]
      },
      {
        id: 4609,
        heading: "9. Structures & Enums",
        tasks: [
          { id: 460901, text: "Structures, Unions & Enums", completed: false },
          { id: 460902, text: "Enum Class (Scoped Enums)", completed: false }
        ]
      },
      {
        id: 4610,
        heading: "10. Object-Oriented Programming",
        tasks: [
          { id: 461001, text: "Classes, Objects & this Pointer", completed: false },
          { id: 461002, text: "Constructors & Destructors", completed: false },
          { id: 461003, text: "Access Specifiers (public, private, protected)", completed: false },
          { id: 461004, text: "Static Members & Methods", completed: false },
          { id: 461005, text: "Friend Functions & Friend Classes", completed: false }
        ]
      },
      {
        id: 4611,
        heading: "11. OOP Concepts",
        tasks: [
          { id: 461101, text: "Encapsulation & Abstraction", completed: false },
          { id: 461102, text: "Inheritance Types & Virtual Functions", completed: false },
          { id: 461103, text: "Polymorphism: Compile-time vs Runtime", completed: false },
          { id: 461104, text: "Abstract Classes & Pure Virtual Functions", completed: false },
          { id: 461105, text: "Operator Overloading", completed: false }
        ]
      },
      {
        id: 4612,
        heading: "12. Exception Handling",
        tasks: [
          { id: 461201, text: "Exception Handling: try, catch & throw", completed: false },
          { id: 461202, text: "Custom Exceptions & noexcept Specifier", completed: false }
        ]
      },
      {
        id: 4613,
        heading: "13. Templates",
        tasks: [
          { id: 461301, text: "Function Templates & Class Templates", completed: false },
          { id: 461302, text: "Template Specialization", completed: false },
          { id: 461303, text: "Variadic Templates", completed: false }
        ]
      },
      {
        id: 4614,
        heading: "14. STL Containers",
        tasks: [
          { id: 461401, text: "Sequential: array, vector, deque, list & forward_list", completed: false },
          { id: 461402, text: "Adapters: stack, queue & priority_queue", completed: false },
          { id: 461403, text: "Associative: set, multiset, map & multimap", completed: false },
          { id: 461404, text: "Unordered Associative: unordered_set, unordered_map, unordered_multiset & unordered_multimap", completed: false }
        ]
      },
      {
        id: 4615,
        heading: "15. STL Iterators & Algorithms",
        tasks: [
          { id: 461501, text: "Iterators: Input, Output, Forward, Bidirectional & Random Access", completed: false },
          { id: 461502, text: "Algorithms: sort, stable_sort, reverse & find", completed: false },
          { id: 461503, text: "Algorithms: binary_search, lower_bound & upper_bound", completed: false },
          { id: 461504, text: "Algorithms: permutations, accumulate, count, copy & transform", completed: false },
          { id: 461505, text: "Algorithms: unique, remove, rotate & partition", completed: false }
        ]
      },
      {
        id: 4616,
        heading: "16. STL Utilities",
        tasks: [
          { id: 461601, text: "pair & tuple utilities", completed: false },
          { id: 461602, text: "swap & move semantics", completed: false },
          { id: 461603, text: "optional, variant & any containers", completed: false }
        ]
      },
      {
        id: 4617,
        heading: "17. File Handling",
        tasks: [
          { id: 461701, text: "ifstream, ofstream & fstream classes", completed: false },
          { id: 461702, text: "Text Files Reading/Writing & Binary Files", completed: false }
        ]
      },
      {
        id: 4618,
        heading: "18. Preprocessor Directives",
        tasks: [
          { id: 461801, text: "#include, #define directives & Header Files", completed: false },
          { id: 461802, text: "Include Guards & #pragma once", completed: false }
        ]
      },
      {
        id: 4619,
        heading: "19. Namespaces",
        tasks: [
          { id: 461901, text: "Custom, Anonymous & Nested Namespaces", completed: false },
          { id: 461902, text: "Namespace Aliases", completed: false }
        ]
      },
      {
        id: 4620,
        heading: "20. Modern C++ (C++11/14/17)",
        tasks: [
          { id: 462001, text: "C++11: auto, decltype, nullptr, lambdas & range-for", completed: false },
          { id: 462002, text: "C++11: Move Semantics, Smart Pointers & constexpr", completed: false },
          { id: 462003, text: "C++14: Generic Lambdas & Return Type Deduction", completed: false },
          { id: 462004, text: "C++17: Structured Bindings & if constexpr", completed: false },
          { id: 462005, text: "C++17: optional, variant, any & filesystem library", completed: false }
        ]
      },
      {
        id: 4621,
        heading: "21. Modern C++ (C++20)",
        tasks: [
          { id: 462101, text: "Concepts & Constraints", completed: false },
          { id: 462102, text: "Modules & Coroutines", completed: false },
          { id: 462103, text: "Ranges Library & Spaceship Operator (<=>)", completed: false }
        ]
      },
      {
        id: 4622,
        heading: "22. Memory Management & Multithreading",
        tasks: [
          { id: 462201, text: "Stack Memory, Heap Memory & RAII Pattern", completed: false },
          { id: 462202, text: "Smart Pointers (unique_ptr, shared_ptr, weak_ptr)", completed: false },
          { id: 462203, text: "Multithreading: std::thread, Mutex & Locks (guard, unique)", completed: false },
          { id: 462204, text: "Condition Variables, Atomic & Future/Promise/Async", completed: false }
        ]
      }
    ]
  },
  "dsa": {
    tasks: [],
    sections: [
      {
        id: 4701,
        heading: "1. C++ Basics & Functions",
        tasks: [
          { id: 470101, text: "Variables, Data Types & Operators", completed: false },
          { id: 470102, text: "Input & Output, Type Casting & Comments", completed: false },
          { id: 470103, text: "Constants, Scope & References", completed: false },
          { id: 470104, text: "Memory Layout", completed: false },
          { id: 470105, text: "Control Flow: if, if-else, Nested if, Switch", completed: false },
          { id: 470106, text: "Loops: for, while, do while, break, continue, goto", completed: false },
          { id: 470107, text: "Function Declaration, Definition & Parameters", completed: false },
          { id: 470108, text: "Return Types, Pass by Value & Pass by Reference", completed: false },
          { id: 470109, text: "Inline Functions & Default Arguments", completed: false },
          { id: 470110, text: "Function Overloading & Recursion Basics", completed: false }
        ]
      },
      {
        id: 4702,
        heading: "2. Complexity Analysis",
        tasks: [
          { id: 470201, text: "Big O, Big Omega & Big Theta Notations", completed: false },
          { id: 470202, text: "Worst Case, Best Case & Average Case Complexity", completed: false },
          { id: 470203, text: "Amortized Analysis & Space Complexity", completed: false }
        ]
      },
      {
        id: 4703,
        heading: "3. Arrays",
        tasks: [
          { id: 470301, text: "Basics: Traversal, Searching, Insertion, Deletion & Update", completed: false },
          { id: 470302, text: "Prefix Sum & Difference Array", completed: false },
          { id: 470303, text: "Sliding Window & Two Pointer Techniques", completed: false },
          { id: 470304, text: "Kadane's Algorithm & Boyer-Moore Voting", completed: false },
          { id: 470305, text: "Binary Search & Dutch National Flag Algorithms", completed: false },
          { id: 470306, text: "Merge Intervals, Rotate Array & Rearrangement", completed: false },
          { id: 470307, text: "Matrix Traversal & Spiral Matrix", completed: false },
          { id: 470308, text: "Matrix Rotation & Transpose", completed: false }
        ]
      },
      {
        id: 4704,
        heading: "4. Strings",
        tasks: [
          { id: 470401, text: "Basics: Character Array, String Class, ASCII & Unicode", completed: false },
          { id: 470402, text: "Algorithms: Reverse String, Palindrome & Anagram", completed: false },
          { id: 470403, text: "Frequency Count & Substring Extraction", completed: false },
          { id: 470404, text: "Pattern Matching: KMP, Rabin-Karp & Z Algorithm", completed: false },
          { id: 470405, text: "Rolling Hash & Manacher's Algorithm", completed: false },
          { id: 470406, text: "String Compression Techniques", completed: false }
        ]
      },
      {
        id: 4705,
        heading: "5. Sorting",
        tasks: [
          { id: 470501, text: "Elementary: Bubble Sort, Selection Sort & Insertion Sort", completed: false },
          { id: 470502, text: "Intermediate: Merge Sort, Quick Sort & Heap Sort", completed: false },
          { id: 470503, text: "Shell Sort", completed: false },
          { id: 470504, text: "Linear: Counting Sort, Radix Sort & Bucket Sort", completed: false },
          { id: 470505, text: "Problems: Inversion Count & Sort Colors", completed: false }
        ]
      },
      {
        id: 4706,
        heading: "6. Searching",
        tasks: [
          { id: 470601, text: "Linear Search & Binary Search Basics", completed: false },
          { id: 470602, text: "Lower Bound & Upper Bound", completed: false },
          { id: 470603, text: "Binary Search on Answer & Ternary Search", completed: false },
          { id: 470604, text: "Exponential Search", completed: false },
          { id: 470605, text: "Applications: Peak Element & Search in Rotated Array", completed: false },
          { id: 470606, text: "Applications: Koko Eating Bananas, Aggressive Cows & Book Allocation", completed: false }
        ]
      },
      {
        id: 4707,
        heading: "7. Recursion",
        tasks: [
          { id: 470701, text: "Recursion Basics: Base Case & Recursive Tree", completed: false },
          { id: 470702, text: "Tail Recursion vs. Head Recursion", completed: false },
          { id: 470703, text: "Backtracking Introduction", completed: false },
          { id: 470704, text: "Problems: Factorial, Fibonacci & Power", completed: false },
          { id: 470705, text: "Problems: Tower of Hanoi & Generate Subsequences", completed: false }
        ]
      },
      {
        id: 4708,
        heading: "8. Linked List",
        tasks: [
          { id: 470801, text: "Types: Singly, Doubly, Circular & Circular Doubly", completed: false },
          { id: 470802, text: "Operations: Insert, Delete, Search & Reverse", completed: false },
          { id: 470803, text: "Middle Node, Merge Lists & Cycle Detection", completed: false },
          { id: 470804, text: "Intersection, Clone Linked List & Flatten List", completed: false },
          { id: 470805, text: "LRU Cache Implementation", completed: false }
        ]
      },
      {
        id: 4709,
        heading: "9. Stack",
        tasks: [
          { id: 470901, text: "Stack Implementations: Array & Linked List", completed: false },
          { id: 470902, text: "Applications: Parentheses Matching & Expression Evaluation", completed: false },
          { id: 470903, text: "Infix, Prefix & Postfix Conversions", completed: false },
          { id: 470904, text: "Next Greater Element & Previous Greater Element", completed: false },
          { id: 470905, text: "Stock Span & Largest Rectangle in Histogram", completed: false },
          { id: 470906, text: "Celebrity Problem & Min Stack", completed: false }
        ]
      },
      {
        id: 4710,
        heading: "10. Queue",
        tasks: [
          { id: 471001, text: "Queue Types: Simple, Circular, Deque & Priority Queue", completed: false },
          { id: 471002, text: "Applications: Sliding Window Maximum", completed: false },
          { id: 471003, text: "BFS Traversals, Rotten Oranges & First Negative Integer", completed: false }
        ]
      },
      {
        id: 4711,
        heading: "11. Hashing",
        tasks: [
          { id: 471101, text: "Concepts: Hash Function, Collisions, Chaining & Open Addressing", completed: false },
          { id: 471102, text: "Applications: Two Sum & Frequency Count", completed: false },
          { id: 471103, text: "Group Anagrams & Longest Consecutive Sequence", completed: false },
          { id: 471104, text: "Subarray Sum & Prefix Hashing", completed: false }
        ]
      },
      {
        id: 4712,
        heading: "12. Binary Tree",
        tasks: [
          { id: 471201, text: "Traversals: Inorder, Preorder, Postorder & Level Order", completed: false },
          { id: 471202, text: "Morris Traversal & Zigzag Traversal", completed: false },
          { id: 471203, text: "Height, Diameter & Balanced Tree Checks", completed: false },
          { id: 471204, text: "Maximum Path Sum & Boundary Traversal", completed: false },
          { id: 471205, text: "Views: Vertical Order, Top, Bottom, Left & Right Views", completed: false },
          { id: 471206, text: "Lowest Common Ancestor (LCA)", completed: false },
          { id: 471207, text: "Serialize & Deserialize Binary Trees", completed: false }
        ]
      },
      {
        id: 4713,
        heading: "13. Binary Search Tree",
        tasks: [
          { id: 471301, text: "BST Operations: Search, Insert & Delete", completed: false },
          { id: 471302, text: "Floor, Ceil, Successor & Predecessor", completed: false },
          { id: 471303, text: "Validate BST & Recover BST", completed: false },
          { id: 471304, text: "Kth Smallest, Kth Largest & BST Iterator", completed: false }
        ]
      },
      {
        id: 4714,
        heading: "14. Heap",
        tasks: [
          { id: 471401, text: "Basics: Max Heap, Min Heap, Insert, Delete & Heapify", completed: false },
          { id: 471402, text: "Build Heap & Heap Sort", completed: false },
          { id: 471403, text: "K Largest Elements & K Smallest Elements", completed: false },
          { id: 471404, text: "Merge K Sorted Arrays & Merge K Sorted Lists", completed: false },
          { id: 471405, text: "Median Finder & Top K Frequent Elements", completed: false }
        ]
      },
      {
        id: 4715,
        heading: "15. Trie",
        tasks: [
          { id: 471501, text: "Trie Basics: Insert, Delete, Search & Prefix Search", completed: false },
          { id: 471502, text: "Auto Complete, Word Dictionary & Maximum XOR", completed: false },
          { id: 471503, text: "Count Prefix", completed: false }
        ]
      },
      {
        id: 4716,
        heading: "16. AVL Tree",
        tasks: [
          { id: 471601, text: "Balance Factor, Rotations (Left, Right, LR, RL)", completed: false },
          { id: 471602, text: "AVL Insert & Delete Operations", completed: false }
        ]
      },
      {
        id: 4717,
        heading: "17. Red Black Tree",
        tasks: [
          { id: 471701, text: "Properties, Rotations & Recoloring", completed: false },
          { id: 471702, text: "RBT Insert & Delete", completed: false },
          { id: 471703, text: "Fixing Violations", completed: false }
        ]
      },
      {
        id: 4718,
        heading: "18. Segment Tree",
        tasks: [
          { id: 471801, text: "Build Segment Tree & Range Queries", completed: false },
          { id: 471802, text: "Point Update & Range Sum/Minimum Updates", completed: false },
          { id: 471803, text: "Lazy Propagation Techniques", completed: false }
        ]
      },
      {
        id: 4719,
        heading: "19. Fenwick Tree (BIT)",
        tasks: [
          { id: 471901, text: "Prefix Sum & Point Updates", completed: false },
          { id: 471902, text: "Range Queries & Coordinate Compression", completed: false }
        ]
      },
      {
        id: 4720,
        heading: "20. Graph",
        tasks: [
          { id: 472001, text: "Representations: Matrix & Adjacency List", completed: false },
          { id: 472002, text: "Traversals: BFS & DFS", completed: false },
          { id: 472003, text: "Cycle Detection in Undirected & Directed Graphs", completed: false },
          { id: 472004, text: "Shortest Paths: Dijkstra, Bellman-Ford & Floyd-Warshall", completed: false },
          { id: 472005, text: "0-1 BFS & Minimum Spanning Tree (Prim, Kruskal)", completed: false },
          { id: 472006, text: "Topological Sort: Kahn's Algorithm & DFS Method", completed: false },
          { id: 472007, text: "Strongly Connected Components (Kosaraju, Tarjan)", completed: false },
          { id: 472008, text: "Bridges & Articulation Points (Tarjan's Algorithm)", completed: false },
          { id: 472009, text: "Bipartite Graph, Euler Path & Hamiltonian Path", completed: false },
          { id: 472010, text: "Graph Coloring & Network Flow (Ford-Fulkerson, Edmonds-Karp)", completed: false }
        ]
      },
      {
        id: 4721,
        heading: "21. Disjoint Set Union (DSU)",
        tasks: [
          { id: 472101, text: "Operations: Find & Union", completed: false },
          { id: 472102, text: "Optimizations: Path Compression & Union by Rank/Size", completed: false },
          { id: 472103, text: "Connected Components, Cycle Detection & Kruskal's Applications", completed: false }
        ]
      },
      {
        id: 4722,
        heading: "22. Greedy Algorithms",
        tasks: [
          { id: 472201, text: "Activity Selection & Fractional Knapsack", completed: false },
          { id: 472202, text: "Huffman Coding & Job Sequencing", completed: false },
          { id: 472203, text: "Merge Intervals & Gas Station Problems", completed: false },
          { id: 472204, text: "Jump Game & Candy Distribution", completed: false }
        ]
      },
      {
        id: 4723,
        heading: "23. Backtracking",
        tasks: [
          { id: 472301, text: "N-Queens & Sudoku Solver", completed: false },
          { id: 472302, text: "Rat in a Maze & Word Search", completed: false },
          { id: 472303, text: "Combination Sum, Permutations & Subsets", completed: false },
          { id: 472304, text: "Palindrome Partitioning & Restore IP Addresses", completed: false }
        ]
      },
      {
        id: 4724,
        heading: "24. Dynamic Programming",
        tasks: [
          { id: 472401, text: "DP Basics: Memoization, Tabulation & Space Optimization", completed: false },
          { id: 472402, text: "1D DP: Fibonacci, Climbing Stairs, House Robber & Frog Jump", completed: false },
          { id: 472403, text: "2D Grid DP: Grid Paths, Minimum Path Sum & Cherry Pickup", completed: false },
          { id: 472404, text: "Knapsack: 0/1 Knapsack & Unbounded Knapsack", completed: false },
          { id: 472405, text: "Subsequences: Subset Sum, Equal Partition, Coin Change & Target Sum", completed: false },
          { id: 472406, text: "Strings DP: LCS, Edit Distance, Shortest Common Supersequence & Wildcard Matching", completed: false },
          { id: 472407, text: "LIS: Longest Increasing Subsequence, Largest Divisible Subset & Bitonic Sequence", completed: false },
          { id: 472408, text: "Matrix DP: Matrix Chain Multiplication & Burst Balloons", completed: false },
          { id: 472409, text: "Stock DP: Buy & Sell Stocks I, II, III, IV, Cooldown & Fee", completed: false },
          { id: 472410, text: "Tree DP: Diameter, Maximum Path & House Robber III", completed: false },
          { id: 472411, text: "Bitmask DP & Digit DP", completed: false }
        ]
      },
      {
        id: 4725,
        heading: "25. Bit Manipulation",
        tasks: [
          { id: 472501, text: "XOR, AND, OR, NOT & Left/Right Shifts", completed: false },
          { id: 472502, text: "Set, Unset, Toggle & Count Set Bits", completed: false },
          { id: 472503, text: "Power of Two & Single Number Finder", completed: false },
          { id: 472504, text: "Subsets using Bitmasking", completed: false }
        ]
      },
      {
        id: 4726,
        heading: "26. Mathematical Algorithms",
        tasks: [
          { id: 472601, text: "GCD & LCM: Euclidean & Extended Euclidean Algorithms", completed: false },
          { id: 472602, text: "Prime Numbers & Sieve of Eratosthenes", completed: false },
          { id: 472603, text: "Modular Arithmetic & Modular Inverse", completed: false },
          { id: 472604, text: "Fast Exponentiation & Matrix Exponentiation", completed: false },
          { id: 472605, text: "Catalan Numbers & Combinatorics Basics", completed: false },
          { id: 472606, text: "Probability Basics", completed: false }
        ]
      },
      {
        id: 4727,
        heading: "27. Advanced Data Structures & Algorithms",
        tasks: [
          { id: 472701, text: "Sparse Table, Ordered Set & Ordered Map", completed: false },
          { id: 472702, text: "Treap, Splay Tree, B Tree, B+ Tree & Skip List", completed: false },
          { id: 472703, text: "Rope, Bloom Filter, Suffix Array & Suffix Tree", completed: false },
          { id: 472704, text: "Cartesian Tree, Interval Tree & K-D Tree", completed: false },
          { id: 472705, text: "Divide and Conquer, Meet in the Middle & Mo's Algorithm", completed: false },
          { id: 472706, text: "Heavy-Light Decomposition (HLD) & Centroid Decomposition", completed: false },
          { id: 472707, text: "Binary Lifting & Lowest Common Ancestor (LCA)", completed: false },
          { id: 472708, text: "Euler Tour & Convex Hull", completed: false },
          { id: 472709, text: "String Processing: Aho-Corasick, FFT & String Hashing", completed: false }
        ]
      },
      {
        id: 4728,
        heading: "28. Competitive Programming & Interview Patterns",
        tasks: [
          { id: 472801, text: "Coordinate Compression & Sweep Line Algorithms", completed: false },
          { id: 472802, text: "Prefix XOR, Difference Array & BIT / Segment Trees", completed: false },
          { id: 472803, text: "Offline Queries, Monotonic Stack & Monotonic Queue", completed: false },
          { id: 472804, text: "Sliding Window & Randomized Algorithms", completed: false },
          { id: 472805, text: "Patterns: Two Pointers, Fast & Slow Pointers & Binary Search", completed: false },
          { id: 472806, text: "Patterns: Monotonic Stack, Prefix Sum, Hashing & BFS/DFS", completed: false },
          { id: 472807, text: "Patterns: Backtracking, Divide & Conquer, DP & Greedy", completed: false },
          { id: 472808, text: "Patterns: Heap, Union Find, Topological Sort & Traversals", completed: false }
        ]
      }
    ]
  },
  "vibe-coding": {
    tasks: [],
    sections: [
      {
        id: 481,
        heading: "1. Prompt Engineering",
        tasks: [
          { id: 48101, text: "Writing clear Markdown specs for AI", completed: false },
          { id: 48102, text: "Few-shot context prompt structuring", completed: false },
          { id: 48103, text: "Chain of Thought prompt logic templates", completed: false }
        ]
      },
      {
        id: 482,
        heading: "2. AI Code Assistants",
        tasks: [
          { id: 48201, text: "Configuring GitHub Copilot shortcuts", completed: false },
          { id: 48202, text: "Mastering Cursor AI composer tool", completed: false },
          { id: 48203, text: "Refactoring code using AI chats", completed: false }
        ]
      },
      {
        id: 483,
        heading: "3. Code Reading & Review",
        tasks: [
          { id: 48301, text: "Reviewing AI-generated code snippets", completed: false },
          { id: 48302, text: "Writing Unit Tests first (TDD mode)", completed: false },
          { id: 48303, text: "Finding bugs with interactive prompting", completed: false }
        ]
      },
      {
        id: 484,
        heading: "4. Iterative Architecture",
        tasks: [
          { id: 48401, text: "Drafting clean API schemas first", completed: false },
          { id: 48402, text: "Refining modular files structure", completed: false },
          { id: 48403, text: "Ensuring separation of concerns in code", completed: false }
        ]
      },
      {
        id: 485,
        heading: "5. Deployment Automation",
        tasks: [
          { id: 48501, text: "Writing GitHub Action scripts with AI", completed: false },
          { id: 48502, text: "Automated Linter and Formatter hooks", completed: false },
          { id: 48503, text: "AI-assisted server logs analysis", completed: false }
        ]
      }
    ]
  },
  "python": {
    tasks: [],
    sections: [
      {
        id: 491,
        heading: "1. Syntax & Types",
        tasks: [
          { id: 49101, text: "Variables, List, Tuple, Dict, Set", completed: false },
          { id: 49102, text: "For/While Loops & List Comprehensions", completed: false },
          { id: 49103, text: "Conditional Statements & functions", completed: false }
        ]
      },
      {
        id: 492,
        heading: "2. Advanced Core",
        tasks: [
          { id: 49201, text: "OOP (Classes, Inheritance, Dunder methods)", completed: false },
          { id: 49202, text: "File Reading & Writing operations", completed: false },
          { id: 49203, text: "Generators, Decorators & Closures", completed: false }
        ]
      },
      {
        id: 493,
        heading: "3. Data Libraries",
        tasks: [
          { id: 49301, text: "NumPy array computations", completed: false },
          { id: 49302, text: "Pandas CSV & Excel manipulation", completed: false },
          { id: 49303, text: "Web scraping with BeautifulSoup & Requests", completed: false }
        ]
      },
      {
        id: 494,
        heading: "4. Web Frameworks",
        tasks: [
          { id: 49401, text: "FastAPI REST endpoints creation", completed: false },
          { id: 49402, text: "Django MVC projects structures", completed: false },
          { id: 49403, text: "Flask quick prototyping setup", completed: false }
        ]
      },
      {
        id: 495,
        heading: "5. Testing & Packaging",
        tasks: [
          { id: 49501, text: "Writing tests using Pytest framework", completed: false },
          { id: 49502, text: "Pip, Virtualenvs, dependency locking", completed: false },
          { id: 49503, text: "Poetry dependency manager configuration", completed: false }
        ]
      }
    ]
  },
  "java": {
    tasks: [],
    sections: [
      {
        id: 501,
        heading: "1. Java Syntax",
        tasks: [
          { id: 50101, text: "Primitive Types & Type Casting", completed: false },
          { id: 50102, text: "Loops, Switch & Array creations", completed: false },
          { id: 50103, text: "Method signatures & Access modifiers", completed: false }
        ]
      },
      {
        id: 502,
        heading: "2. OOP Principles",
        tasks: [
          { id: 50201, text: "Encapsulation with private/get/set", completed: false },
          { id: 50202, text: "Inheritance & Interface abstractions", completed: false },
          { id: 50203, text: "Method Overriding & Overloading polymorphism", completed: false }
        ]
      },
      {
        id: 503,
        heading: "3. Collections Framework",
        tasks: [
          { id: 50301, text: "List, Set & Map concrete classes", completed: false },
          { id: 50302, text: "Generics & type safety checks", completed: false },
          { id: 50303, text: "Streams API & Lambda queries", completed: false }
        ]
      },
      {
        id: 504,
        heading: "4. Spring Boot Framework",
        tasks: [
          { id: 50401, text: "Spring REST API Controller routing", completed: false },
          { id: 50402, text: "Dependency Injection & AutoWired", completed: false },
          { id: 50403, text: "Hibernate ORM & Spring Data JPA", completed: false }
        ]
      },
      {
        id: 505,
        heading: "5. Tools & Testing",
        tasks: [
          { id: 50501, text: "Maven/Gradle dependency scripts", completed: false },
          { id: 50502, text: "JUnit 5 unit test assertions", completed: false },
          { id: 50503, text: "Mockito mocking framework basics", completed: false }
        ]
      }
    ]
  },
  "react": {
    tasks: [],
    sections: [
      {
        id: 511,
        heading: "1. Component Foundations",
        tasks: [
          { id: 51101, text: "JSX Syntax rules & structure", completed: false },
          { id: 51102, text: "Passing Props & Destructuring", completed: false },
          { id: 51103, text: "Lists rendering & Key attributes", completed: false }
        ]
      },
      {
        id: 512,
        heading: "2. Hook API",
        tasks: [
          { id: 51201, text: "useState local component state", completed: false },
          { id: 51202, text: "useEffect API fetch side effects", completed: false },
          { id: 51203, text: "useContext global configuration passing", completed: false }
        ]
      },
      {
        id: 513,
        heading: "3. State Management",
        tasks: [
          { id: 51301, text: "Redux Toolkit slices & selectors", completed: false },
          { id: 51302, text: "Zustand state store actions", completed: false },
          { id: 51303, text: "React Context API local updates", completed: false }
        ]
      },
      {
        id: 514,
        heading: "4. Routing & Forms",
        tasks: [
          { id: 51401, text: "React Router Outlet configurations", completed: false },
          { id: 51402, text: "React Hook Form input registers", completed: false },
          { id: 51403, text: "Zod Schema validation schema definitions", completed: false }
        ]
      },
      {
        id: 515,
        heading: "5. Performance Optimization",
        tasks: [
          { id: 51501, text: "React.memo component memoization", completed: false },
          { id: 51502, text: "useMemo & useCallback hook caches", completed: false },
          { id: 51503, text: "Lazy Loading & Suspense splits", completed: false }
        ]
      }
    ]
  },
  "nextjs": {
    tasks: [],
    sections: [
      {
        id: 521,
        heading: "1. Routing Core",
        tasks: [
          { id: 52101, text: "Next.js App Router folders structures", completed: false },
          { id: 52102, text: "Layouts, Pages & Nested Routes layout", completed: false },
          { id: 52103, text: "Dynamic Routes parsing parameters", completed: false }
        ]
      },
      {
        id: 522,
        heading: "2. Rendering Strategies",
        tasks: [
          { id: 52201, text: "React Server Components (RSC) default behavior", completed: false },
          { id: 52202, text: "Client Components ('use client' directive)", completed: false },
          { id: 52203, text: "SSR & Static Site Generation (SSG) options", completed: false }
        ]
      },
      {
        id: 523,
        heading: "3. Data Fetching",
        tasks: [
          { id: 52301, text: "Server-side Fetching with Next Cache", completed: false },
          { id: 52302, text: "Server Actions form submissions", completed: false },
          { id: 52303, text: "Route Handlers HTTP API endpoints", completed: false }
        ]
      },
      {
        id: 524,
        heading: "4. Advanced Features",
        tasks: [
          { id: 52401, text: "Next.js middleware cookies/headers rewrite", completed: false },
          { id: 52402, text: "Metadata API & OpenGraph tags configuration", completed: false },
          { id: 52403, text: "Next Image component optimizations", completed: false }
        ]
      },
      {
        id: 525,
        heading: "5. Production Deploy",
        tasks: [
          { id: 52501, text: "Vercel git-integration push setups", completed: false },
          { id: 52502, text: "Incremental Static Regeneration (ISR)", completed: false },
          { id: 52503, text: "Next Caching & CDN invalidation configurations", completed: false }
        ]
      }
    ]
  },
  "javascript": {
    tasks: [],
    sections: [
      {
        id: 531,
        heading: "1. Language Fundamentals",
        tasks: [
          { id: 53101, text: "let, const variables scopes", completed: false },
          { id: 53102, text: "Array methods (map, filter, reduce)", completed: false },
          { id: 53103, text: "Arrow functions & default params", completed: false }
        ]
      },
      {
        id: 532,
        heading: "2. Advanced Core",
        tasks: [
          { id: 53201, text: "Scope, Closures & Lexical environments", completed: false },
          { id: 53202, text: "Prototypes & class inheritance models", completed: false },
          { id: 53203, text: "Event Loop, Macro/Micro tasks queuing", completed: false }
        ]
      },
      {
        id: 533,
        heading: "3. Asynchronous JavaScript",
        tasks: [
          { id: 53301, text: "Callback functions structures", completed: false },
          { id: 53302, text: "Promises resolve, reject & chain patterns", completed: false },
          { id: 53303, text: "Async/Await syntax error handling", completed: false }
        ]
      },
      {
        id: 534,
        heading: "4. DOM & Browser APIs",
        tasks: [
          { id: 53401, text: "DOM Selector & Event Listeners", completed: false },
          { id: 53402, text: "LocalStorage & SessionStorage state store", completed: false },
          { id: 53403, text: "Fetch API integration endpoints", completed: false }
        ]
      },
      {
        id: 535,
        heading: "5. Modern Ecosystem",
        tasks: [
          { id: 53501, text: "ES Modules imports & exports syntax", completed: false },
          { id: 53502, text: "NPM commands dependency management", completed: false },
          { id: 53503, text: "Vite/Webpack build tools setups", completed: false }
        ]
      }
    ]
  },
  "angular": {
    tasks: [],
    sections: [
      {
        id: 541,
        heading: "1. Angular Architecture",
        tasks: [
          { id: 54101, text: "TypeScript Component layouts", completed: false },
          { id: 54102, text: "Templates & Data Binding syntax", completed: false },
          { id: 54103, text: "NgModules configurations", completed: false }
        ]
      },
      {
        id: 542,
        heading: "2. Directives & Pipes",
        tasks: [
          { id: 54201, text: "Built-in Structural Directives (*ngIf, *ngFor)", completed: false },
          { id: 54202, text: "Custom Directives creation", completed: false },
          { id: 54203, text: "Custom Pipes text transformations", completed: false }
        ]
      },
      {
        id: 543,
        heading: "3. Services & DI",
        tasks: [
          { id: 54301, text: "Dependency Injection injection scopes", completed: false },
          { id: 54302, text: "HttpClient fetching backend API resources", completed: false },
          { id: 54303, text: "State sharing services architecture", completed: false }
        ]
      },
      {
        id: 544,
        heading: "4. RxJS & Routing",
        tasks: [
          { id: 54401, text: "Observables subscriptions & pipes", completed: false },
          { id: 54402, text: "Router Outlet route configs setup", completed: false },
          { id: 54403, text: "Route Guards navigation checks", completed: false }
        ]
      },
      {
        id: 545,
        heading: "5. Forms & Testing",
        tasks: [
          { id: 54501, text: "Reactive Forms & validation groups", completed: false },
          { id: 54502, text: "Jasmine assertions specs design", completed: false },
          { id: 54503, text: "Karma test suite runs verification", completed: false }
        ]
      }
    ]
  }
};
