import { CardData } from "./storage";

export const defaultBackendCardData: CardData = {
  tasks: [],
  sections: [
    {
      id: 201,
      heading: "1. Internet Fundamentals",
      tasks: [
        { id: 20101, text: "How the Internet Works", completed: false },
        { id: 20102, text: "HTTP & HTTPS", completed: false },
        { id: 20103, text: "DNS", completed: false },
        { id: 20104, text: "Domain Names", completed: false },
        { id: 20105, text: "Hosting", completed: false },
        { id: 20106, text: "Browsers", completed: false },
        { id: 20107, text: "Client-Server Architecture", completed: false },
        { id: 20108, text: "REST APIs", completed: false },
        { id: 20109, text: "GraphQL Basics", completed: false },
        { id: 20110, text: "WebSockets", completed: false },
        { id: 20111, text: "Cookies & Sessions", completed: false }
      ]
    },
    {
      id: 202,
      heading: "2. Operating System (Linux)",
      tasks: [
        { id: 20201, text: "Linux Basics", completed: false },
        { id: 20202, text: "Linux File System", completed: false },
        { id: 20203, text: "File Permissions", completed: false },
        { id: 20204, text: "Users & Groups", completed: false },
        { id: 20205, text: "Environment Variables", completed: false },
        { id: 20206, text: "Process Management", completed: false },
        { id: 20207, text: "Package Managers", completed: false },
        { id: 20208, text: "Shell Scripting", completed: false },
        { id: 20209, text: "Cron Jobs", completed: false },
        { id: 20210, text: "Linux Commands", completed: false }
      ]
    },
    {
      id: 203,
      heading: "3. Version Control",
      tasks: [
        { id: 20301, text: "Git", completed: false },
        { id: 20302, text: "GitHub", completed: false },
        { id: 20303, text: "Branching", completed: false },
        { id: 20304, text: "Merging", completed: false },
        { id: 20305, text: "Rebasing", completed: false },
        { id: 20306, text: "Pull Requests", completed: false },
        { id: 20307, text: "Git Workflow", completed: false }
      ]
    },
    {
      id: 204,
      heading: "4. Programming Language (Node.js)",
      tasks: [
        { id: 20401, text: "JavaScript Fundamentals", completed: false },
        { id: 20402, text: "ES6+", completed: false },
        { id: 20403, text: "Modules", completed: false },
        { id: 20404, text: "Event Loop", completed: false },
        { id: 20405, text: "Asynchronous Programming", completed: false },
        { id: 20406, text: "Promises", completed: false },
        { id: 20407, text: "Async/Await", completed: false },
        { id: 20408, text: "Error Handling", completed: false }
      ]
    },
    {
      id: 205,
      heading: "5. Package Managers",
      tasks: [
        { id: 20501, text: "npm", completed: false },
        { id: 20502, text: "Yarn", completed: false },
        { id: 20503, text: "pnpm", completed: false }
      ]
    },
    {
      id: 206,
      heading: "6. Node.js Core",
      tasks: [
        { id: 20601, text: "File System (fs)", completed: false },
        { id: 20602, text: "Path Module", completed: false },
        { id: 20603, text: "HTTP Module", completed: false },
        { id: 20604, text: "Events", completed: false },
        { id: 20605, text: "Streams", completed: false },
        { id: 20606, text: "Buffers", completed: false },
        { id: 20607, text: "Process", completed: false },
        { id: 20608, text: "OS Module", completed: false },
        { id: 20609, text: "Cluster", completed: false },
        { id: 20610, text: "Worker Threads", completed: false }
      ]
    },
    {
      id: 207,
      heading: "7. Express.js",
      tasks: [
        { id: 20701, text: "Express Basics", completed: false },
        { id: 20702, text: "Routing", completed: false },
        { id: 20703, text: "Middleware", completed: false },
        { id: 20704, text: "Controllers", completed: false },
        { id: 20705, text: "Routers", completed: false },
        { id: 20706, text: "Static Files", completed: false },
        { id: 20707, text: "Error Handling", completed: false },
        { id: 20708, text: "Validation", completed: false },
        { id: 20709, text: "Environment Variables", completed: false }
      ]
    },
    {
      id: 208,
      heading: "8. Databases",
      tasks: [
        { id: 20801, text: "SQL Basics", completed: false },
        { id: 20802, text: "PostgreSQL", completed: false },
        { id: 20803, text: "MySQL", completed: false },
        { id: 20804, text: "SQL Queries", completed: false },
        { id: 20805, text: "Joins", completed: false },
        { id: 20806, text: "Transactions", completed: false },
        { id: 20807, text: "Database Indexing (SQL)", completed: false },
        { id: 20808, text: "NoSQL Basics", completed: false },
        { id: 20809, text: "MongoDB", completed: false },
        { id: 20810, text: "CRUD Operations (MongoDB)", completed: false },
        { id: 20811, text: "Aggregation Framework", completed: false },
        { id: 20812, text: "Database Indexing (NoSQL)", completed: false },
        { id: 20813, text: "Replication", completed: false }
      ]
    },
    {
      id: 209,
      heading: "9. ORM / ODM",
      tasks: [
        { id: 20901, text: "Mongoose", completed: false },
        { id: 20902, text: "Prisma", completed: false },
        { id: 20903, text: "Sequelize", completed: false },
        { id: 20904, text: "TypeORM", completed: false }
      ]
    },
    {
      id: 210,
      heading: "10. API Development",
      tasks: [
        { id: 21001, text: "REST API Design", completed: false },
        { id: 21002, text: "CRUD Operations APIs", completed: false },
        { id: 21003, text: "API Design Best Practices", completed: false },
        { id: 21004, text: "Status Codes", completed: false },
        { id: 21005, text: "Pagination", completed: false },
        { id: 21006, text: "Filtering", completed: false },
        { id: 21007, text: "Sorting", completed: false },
        { id: 21008, text: "API Versioning", completed: false },
        { id: 21009, text: "GraphQL APIs", completed: false },
        { id: 21010, text: "gRPC", completed: false }
      ]
    },
    {
      id: 211,
      heading: "11. Authentication & Authorization",
      tasks: [
        { id: 21101, text: "JWT (JSON Web Tokens)", completed: false },
        { id: 21102, text: "Sessions", completed: false },
        { id: 21103, text: "Cookies", completed: false },
        { id: 21104, text: "OAuth Integration", completed: false },
        { id: 21105, text: "Role-Based Access Control (RBAC)", completed: false },
        { id: 21106, text: "Permissions", completed: false },
        { id: 21107, text: "Refresh Tokens", completed: false }
      ]
    },
    {
      id: 212,
      heading: "12. Security",
      tasks: [
        { id: 21201, text: "HTTPS & SSL/TLS", completed: false },
        { id: 21202, text: "CORS (Cross-Origin Resource Sharing)", completed: false },
        { id: 21203, text: "Helmet Security Middleware", completed: false },
        { id: 21204, text: "bcrypt Password Hashing", completed: false },
        { id: 21205, text: "XSS (Cross-Site Scripting) Prevention", completed: false },
        { id: 21206, text: "CSRF (Cross-Site Request Forgery) Prevention", completed: false },
        { id: 21207, text: "SQL Injection Prevention", completed: false },
        { id: 21208, text: "NoSQL Injection Prevention", completed: false },
        { id: 21209, text: "Rate Limiting", completed: false },
        { id: 21210, text: "Input Validation & Sanitization", completed: false }
      ]
    },
    {
      id: 213,
      heading: "13. File Handling",
      tasks: [
        { id: 21301, text: "Multer Middleware", completed: false },
        { id: 21302, text: "File Upload Basics", completed: false },
        { id: 21303, text: "Cloudinary Integration", completed: false },
        { id: 21304, text: "AWS S3 Uploads", completed: false },
        { id: 21305, text: "File Streaming", completed: false }
      ]
    },
    {
      id: 214,
      heading: "14. Caching",
      tasks: [
        { id: 21401, text: "Redis Basics", completed: false },
        { id: 21402, text: "Memory Cache", completed: false },
        { id: 21403, text: "API Response Caching", completed: false },
        { id: 21404, text: "Database Query Caching", completed: false }
      ]
    },
    {
      id: 215,
      heading: "15. Background Jobs & Queues",
      tasks: [
        { id: 21501, text: "BullMQ (Redis-based Queues)", completed: false },
        { id: 21502, text: "Agenda (MongoDB-based Jobs)", completed: false },
        { id: 21503, text: "RabbitMQ", completed: false },
        { id: 21504, text: "Apache Kafka", completed: false },
        { id: 21505, text: "Redis Pub/Sub", completed: false },
        { id: 21506, text: "Cron Jobs Scheduling", completed: false }
      ]
    },
    {
      id: 216,
      heading: "16. Logging & Monitoring",
      tasks: [
        { id: 21601, text: "Winston Logger", completed: false },
        { id: 21602, text: "Morgan HTTP Request Logger", completed: false },
        { id: 21603, text: "Pino Logger", completed: false },
        { id: 21604, text: "Prometheus Monitoring", completed: false },
        { id: 21605, text: "Grafana Dashboards", completed: false },
        { id: 21606, text: "Sentry Error Tracking", completed: false }
      ]
    },
    {
      id: 217,
      heading: "17. Testing",
      tasks: [
        { id: 21701, text: "Jest Testing Framework", completed: false },
        { id: 21702, text: "Supertest (HTTP Assertions)", completed: false },
        { id: 21703, text: "Postman API Testing", completed: false },
        { id: 21704, text: "Insomnia Client", completed: false },
        { id: 21705, text: "Cypress", completed: false },
        { id: 21706, text: "Playwright", completed: false }
      ]
    },
    {
      id: 218,
      heading: "18. Docker",
      tasks: [
        { id: 21801, text: "Docker Basics", completed: false },
        { id: 21802, text: "Images", completed: false },
        { id: 21803, text: "Containers", completed: false },
        { id: 21804, text: "Dockerfile", completed: false },
        { id: 21805, text: "Docker Compose", completed: false },
        { id: 21806, text: "Volumes", completed: false },
        { id: 21807, text: "Networks", completed: false }
      ]
    },
    {
      id: 219,
      heading: "19. CI/CD",
      tasks: [
        { id: 21901, text: "GitHub Actions", completed: false },
        { id: 21902, text: "Jenkins", completed: false },
        { id: 21903, text: "GitLab CI", completed: false },
        { id: 21904, text: "Deployment Pipelines", completed: false }
      ]
    },
    {
      id: 220,
      heading: "20. Deployment",
      tasks: [
        { id: 22001, text: "PM2 Process Manager", completed: false },
        { id: 22002, text: "Nginx Reverse Proxy", completed: false },
        { id: 22003, text: "Vercel Deployment", completed: false },
        { id: 22004, text: "Render & Railway Platforms", completed: false },
        { id: 22005, text: "DigitalOcean Drops & App Platform", completed: false },
        { id: 22006, text: "AWS EC2 Deployment", completed: false }
      ]
    },
    {
      id: 221,
      heading: "21. Cloud Services",
      tasks: [
        { id: 22101, text: "AWS IAM (Identity & Access Management)", completed: false },
        { id: 22102, text: "AWS EC2", completed: false },
        { id: 22103, text: "AWS S3", completed: false },
        { id: 22104, text: "AWS RDS", completed: false },
        { id: 22105, text: "AWS Lambda (Serverless)", completed: false },
        { id: 22106, text: "Azure Basics", completed: false },
        { id: 22107, text: "Google Cloud Platform Basics", completed: false }
      ]
    },
    {
      id: 222,
      heading: "22. Performance Optimization",
      tasks: [
        { id: 22201, text: "Database Indexing & Query Tuning", completed: false },
        { id: 22202, text: "Connection Pooling", completed: false },
        { id: 22203, text: "Compression (Gzip)", completed: false },
        { id: 22204, text: "API Pagination", completed: false },
        { id: 22205, text: "Lazy Loading & Chunking", completed: false },
        { id: 22206, text: "Caching Strategies", completed: false }
      ]
    },
    {
      id: 223,
      heading: "23. System Design",
      tasks: [
        { id: 22301, text: "Scalability Concepts", completed: false },
        { id: 22302, text: "Load Balancing", completed: false },
        { id: 22303, text: "High Availability Architecture", completed: false },
        { id: 22304, text: "Monolithic Architecture vs Microservices", completed: false },
        { id: 22305, text: "Event-Driven Architecture", completed: false },
        { id: 22306, text: "Serverless Design Pattern", completed: false },
        { id: 22307, text: "Distributed Caching", completed: false },
        { id: 22308, text: "Database Replication & Sharding", completed: false },
        { id: 22309, text: "Message Queues", completed: false }
      ]
    },
    {
      id: 224,
      heading: "24. DevOps Basics",
      tasks: [
        { id: 22401, text: "Linux Server Administration", completed: false },
        { id: 22402, text: "Git Version Control Operations", completed: false },
        { id: 22403, text: "Docker Containerization", completed: false },
        { id: 22404, text: "Kubernetes Orchestration Basics", completed: false },
        { id: 22405, text: "Terraform (Infrastructure as Code)", completed: false },
        { id: 22406, text: "Nginx Server Configurations", completed: false },
        { id: 22407, text: "CI/CD Automations", completed: false },
        { id: 22408, text: "Server Monitoring & Logging", completed: false }
      ]
    },
    {
      id: 225,
      heading: "25. Advanced Backend",
      tasks: [
        { id: 22501, text: "WebSockets for Real-time Apps", completed: false },
        { id: 22502, text: "Server-Sent Events (SSE)", completed: false },
        { id: 22503, text: "Advanced GraphQL (Federation)", completed: false },
        { id: 22504, text: "Microservices Communication", completed: false },
        { id: 22505, text: "gRPC Integration", completed: false },
        { id: 22506, text: "Event Sourcing & CQRS Pattern", completed: false },
        { id: 22507, text: "Domain-Driven Design (DDD)", completed: false },
        { id: 22508, text: "Payment Gateway Integration", completed: false },
        { id: 22509, text: "Email Services (Nodemailer, SendGrid)", completed: false },
        { id: 22510, text: "Push Notifications", completed: false },
        { id: 22511, text: "AI API Integration (OpenAI, Gemini)", completed: false }
      ]
    },
    {
      id: 226,
      heading: "26. MERN Stack Integration",
      tasks: [
        { id: 22601, text: "MERN Stack Architecture", completed: false },
        { id: 22602, text: "Connecting React Frontend with Express Backend", completed: false },
        { id: 22603, text: "MongoDB & Mongoose Integration in Express", completed: false },
        { id: 22604, text: "Full-Stack Authentication (JWT, Cookies, Context API)", completed: false },
        { id: 22605, text: "Deploying MERN Applications", completed: false }
      ]
    }
  ]
};
