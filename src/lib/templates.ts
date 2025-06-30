import { ProjectTemplate } from '@/types'

export const BUILTIN_TEMPLATES: ProjectTemplate[] = [
  {
    version: "2.0",
    metadata: {
      name: "Personal Finance SaaS",
      description: "Complete budgeting and expense tracking application",
      author: "Sprinter Templates",
      difficulty: "intermediate",
      estimatedDuration: "12-16 weeks",
      tags: ["fintech", "budgeting", "personal-finance", "dashboard"],
      category: "Financial",
      techStack: ["React", "Node.js", "PostgreSQL", "Stripe"],
      aiContext: {
        projectType: "Personal Finance SaaS",
        keyFeatures: ["expense tracking", "budget management", "financial reports", "goal setting"],
        targetAudience: "individuals and families managing personal finances",
        monetization: "freemium with premium features"
      }
    },
    project: {
      name: "Personal Finance SaaS",
      description: "Build a comprehensive budgeting and expense tracking SaaS application",
      startDateOffset: 0,
      launchDateOffset: 112, // 16 weeks
      totalSprints: 16,
      currentSprint: 1
    },
    tasks: [
      // Week 1-2: Foundation
      { title: "Set up development environment", category: "Development", priority: "High", estimatedHours: 8, status: "Not Started", dueDateOffset: 7 },
      { title: "Design database schema for users and accounts", category: "Development", priority: "High", estimatedHours: 12, status: "Not Started", dueDateOffset: 14 },
      { title: "Create user authentication system", category: "Development", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 14 },
      
      // Week 3-4: Core Features
      { title: "Build expense tracking interface", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 28 },
      { title: "Implement budget creation and management", category: "Development", priority: "High", estimatedHours: 18, status: "Not Started", dueDateOffset: 28 },
      { title: "Design financial dashboard UI", category: "Design", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 21 },
      
      // Week 5-6: Advanced Features
      { title: "Add bank account integration", category: "Development", priority: "Medium", estimatedHours: 24, status: "Not Started", dueDateOffset: 42 },
      { title: "Create financial reports and charts", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 42 },
      { title: "Implement goal tracking system", category: "Development", priority: "Medium", estimatedHours: 16, status: "Not Started", dueDateOffset: 42 },
      
      // Week 7-8: Monetization
      { title: "Integrate Stripe payment processing", category: "Development", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 56 },
      { title: "Build subscription management", category: "Development", priority: "High", estimatedHours: 18, status: "Not Started", dueDateOffset: 56 },
      { title: "Design pricing page", category: "Design", priority: "Medium", estimatedHours: 8, status: "Not Started", dueDateOffset: 49 },
      
      // Week 9-12: Testing & Polish
      { title: "Write comprehensive unit tests", category: "Testing", priority: "Medium", estimatedHours: 24, status: "Not Started", dueDateOffset: 84 },
      { title: "Conduct user acceptance testing", category: "Testing", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 84 },
      { title: "Optimize database performance", category: "Development", priority: "Medium", estimatedHours: 12, status: "Not Started", dueDateOffset: 84 },
      
      // Week 13-16: Launch Preparation
      { title: "Set up production infrastructure", category: "Operations", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 98 },
      { title: "Create user onboarding flow", category: "Design", priority: "High", estimatedHours: 12, status: "Not Started", dueDateOffset: 98 },
      { title: "Develop marketing landing page", category: "Marketing", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 105 },
      { title: "Launch beta program", category: "Marketing", priority: "Medium", estimatedHours: 8, status: "Not Started", dueDateOffset: 105 },
      { title: "Prepare launch campaign", category: "Marketing", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 112 }
    ],
    milestones: [
      { title: "MVP Foundation Complete", description: "Authentication and basic expense tracking ready", dueDateOffset: 28, status: "Not Started" },
      { title: "Core Features Released", description: "Budget management and dashboard operational", dueDateOffset: 56, status: "Not Started" },
      { title: "Premium Features Ready", description: "Bank integration and advanced reports complete", dueDateOffset: 84, status: "Not Started" },
      { title: "Production Launch", description: "Full SaaS platform live with payment processing", dueDateOffset: 112, status: "Not Started" }
    ]
  },

  {
    version: "2.0",
    metadata: {
      name: "CRM SaaS Platform",
      description: "Customer relationship management system for small businesses",
      author: "Sprinter Templates",
      difficulty: "advanced",
      estimatedDuration: "16-20 weeks",
      tags: ["crm", "sales", "customer-management", "business"],
      category: "Business",
      techStack: ["React", "Node.js", "MongoDB", "Redis"],
      aiContext: {
        projectType: "CRM SaaS Platform",
        keyFeatures: ["contact management", "sales pipeline", "email integration", "analytics"],
        targetAudience: "small to medium businesses managing customer relationships",
        monetization: "tiered subscription model"
      }
    },
    project: {
      name: "CRM SaaS Platform",
      description: "Build a comprehensive customer relationship management platform",
      startDateOffset: 0,
      launchDateOffset: 140, // 20 weeks
      totalSprints: 20,
      currentSprint: 1
    },
    tasks: [
      // Foundation
      { title: "Design CRM database architecture", category: "Development", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 7 },
      { title: "Set up multi-tenant system", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 14 },
      { title: "Create user roles and permissions", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 21 },
      
      // Core CRM Features
      { title: "Build contact management system", category: "Development", priority: "High", estimatedHours: 32, status: "Not Started", dueDateOffset: 35 },
      { title: "Implement sales pipeline interface", category: "Development", priority: "High", estimatedHours: 28, status: "Not Started", dueDateOffset: 49 },
      { title: "Create deal tracking system", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 49 },
      
      // Communication Features
      { title: "Integrate email communication", category: "Development", priority: "High", estimatedHours: 32, status: "Not Started", dueDateOffset: 70 },
      { title: "Build activity timeline", category: "Development", priority: "Medium", estimatedHours: 20, status: "Not Started", dueDateOffset: 70 },
      { title: "Add task and reminder system", category: "Development", priority: "Medium", estimatedHours: 18, status: "Not Started", dueDateOffset: 70 },
      
      // Analytics & Reports
      { title: "Create sales analytics dashboard", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 91 },
      { title: "Build custom report builder", category: "Development", priority: "Medium", estimatedHours: 28, status: "Not Started", dueDateOffset: 105 },
      { title: "Implement data export features", category: "Development", priority: "Medium", estimatedHours: 12, status: "Not Started", dueDateOffset: 105 },
      
      // Business Features
      { title: "Design subscription billing system", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 119 },
      { title: "Create team collaboration tools", category: "Development", priority: "Medium", estimatedHours: 20, status: "Not Started", dueDateOffset: 119 },
      { title: "Build API for third-party integrations", category: "Development", priority: "Medium", estimatedHours: 32, status: "Not Started", dueDateOffset: 133 },
      
      // Launch
      { title: "Conduct enterprise security audit", category: "Testing", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 133 },
      { title: "Create comprehensive documentation", category: "Misc", priority: "Medium", estimatedHours: 20, status: "Not Started", dueDateOffset: 140 },
      { title: "Launch enterprise sales program", category: "Marketing", priority: "High", estimatedHours: 12, status: "Not Started", dueDateOffset: 140 }
    ],
    milestones: [
      { title: "Multi-tenant Foundation", description: "User management and tenant isolation complete", dueDateOffset: 28, status: "Not Started" },
      { title: "Core CRM Features", description: "Contact and deal management operational", dueDateOffset: 70, status: "Not Started" },
      { title: "Communication Hub", description: "Email integration and activity tracking ready", dueDateOffset: 105, status: "Not Started" },
      { title: "Enterprise Launch", description: "Full-featured CRM platform with billing", dueDateOffset: 140, status: "Not Started" }
    ]
  },

  {
    version: "2.0",
    metadata: {
      name: "E-commerce Platform",
      description: "Multi-vendor marketplace with integrated payments",
      author: "Sprinter Templates",
      difficulty: "advanced",
      estimatedDuration: "18-24 weeks",
      tags: ["ecommerce", "marketplace", "payments", "inventory"],
      category: "E-commerce",
      techStack: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "AWS"],
      aiContext: {
        projectType: "E-commerce Platform",
        keyFeatures: ["multi-vendor support", "inventory management", "payment processing", "order fulfillment"],
        targetAudience: "entrepreneurs and businesses selling online",
        monetization: "transaction fees and premium seller features"
      }
    },
    project: {
      name: "E-commerce Platform",
      description: "Build a scalable multi-vendor e-commerce marketplace",
      startDateOffset: 0,
      launchDateOffset: 168, // 24 weeks
      totalSprints: 24,
      currentSprint: 1
    },
    tasks: [
      // Foundation
      { title: "Design e-commerce database schema", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 7 },
      { title: "Set up multi-vendor architecture", category: "Development", priority: "High", estimatedHours: 32, status: "Not Started", dueDateOffset: 21 },
      { title: "Create vendor onboarding system", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 28 },
      
      // Product Management
      { title: "Build product catalog system", category: "Development", priority: "High", estimatedHours: 28, status: "Not Started", dueDateOffset: 42 },
      { title: "Implement inventory management", category: "Development", priority: "High", estimatedHours: 32, status: "Not Started", dueDateOffset: 56 },
      { title: "Create product search and filtering", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 56 },
      
      // Shopping Experience
      { title: "Build shopping cart system", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 70 },
      { title: "Implement checkout process", category: "Development", priority: "High", estimatedHours: 28, status: "Not Started", dueDateOffset: 84 },
      { title: "Integrate multiple payment providers", category: "Development", priority: "High", estimatedHours: 32, status: "Not Started", dueDateOffset: 84 },
      
      // Order Management
      { title: "Create order processing system", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 98 },
      { title: "Build shipping integration", category: "Development", priority: "High", estimatedHours: 28, status: "Not Started", dueDateOffset: 112 },
      { title: "Implement return and refund system", category: "Development", priority: "Medium", estimatedHours: 20, status: "Not Started", dueDateOffset: 126 },
      
      // Analytics & Marketing
      { title: "Create vendor analytics dashboard", category: "Development", priority: "Medium", estimatedHours: 24, status: "Not Started", dueDateOffset: 140 },
      { title: "Build recommendation engine", category: "Development", priority: "Medium", estimatedHours: 32, status: "Not Started", dueDateOffset: 154 },
      { title: "Implement email marketing tools", category: "Development", priority: "Medium", estimatedHours: 20, status: "Not Started", dueDateOffset: 154 },
      
      // Launch Preparation
      { title: "Set up CDN and image optimization", category: "Operations", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 161 },
      { title: "Conduct load testing", category: "Testing", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 161 },
      { title: "Launch marketplace with initial vendors", category: "Marketing", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 168 }
    ],
    milestones: [
      { title: "Vendor Platform Ready", description: "Multi-vendor system and onboarding complete", dueDateOffset: 42, status: "Not Started" },
      { title: "Product Catalog Live", description: "Product management and search operational", dueDateOffset: 84, status: "Not Started" },
      { title: "Shopping Experience Complete", description: "Cart, checkout, and payments integrated", dueDateOffset: 126, status: "Not Started" },
      { title: "Marketplace Launch", description: "Full e-commerce platform live with vendors", dueDateOffset: 168, status: "Not Started" }
    ]
  },

  {
    version: "2.0",
    metadata: {
      name: "Project Management SaaS",
      description: "Team collaboration and project tracking platform",
      author: "Sprinter Templates",
      difficulty: "intermediate",
      estimatedDuration: "14-16 weeks",
      tags: ["project-management", "collaboration", "teams", "productivity"],
      category: "Productivity",
      techStack: ["React", "Node.js", "PostgreSQL", "Socket.io"],
      aiContext: {
        projectType: "Project Management SaaS",
        keyFeatures: ["task management", "team collaboration", "time tracking", "project analytics"],
        targetAudience: "teams and organizations managing projects",
        monetization: "per-user subscription pricing"
      }
    },
    project: {
      name: "Project Management SaaS",
      description: "Build a comprehensive team collaboration and project management platform",
      startDateOffset: 0,
      launchDateOffset: 112, // 16 weeks
      totalSprints: 16,
      currentSprint: 1
    },
    tasks: [
      // Foundation
      { title: "Design team-based architecture", category: "Development", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 7 },
      { title: "Create workspace and team management", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 14 },
      { title: "Build user invitation system", category: "Development", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 21 },
      
      // Core Features
      { title: "Implement project creation and management", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 28 },
      { title: "Build task management system", category: "Development", priority: "High", estimatedHours: 32, status: "Not Started", dueDateOffset: 42 },
      { title: "Create Kanban board interface", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 42 },
      
      // Collaboration
      { title: "Implement real-time updates", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 56 },
      { title: "Build comment and discussion system", category: "Development", priority: "Medium", estimatedHours: 18, status: "Not Started", dueDateOffset: 56 },
      { title: "Add file sharing and attachments", category: "Development", priority: "Medium", estimatedHours: 16, status: "Not Started", dueDateOffset: 70 },
      
      // Advanced Features
      { title: "Create time tracking system", category: "Development", priority: "Medium", estimatedHours: 24, status: "Not Started", dueDateOffset: 84 },
      { title: "Build project analytics dashboard", category: "Development", priority: "Medium", estimatedHours: 20, status: "Not Started", dueDateOffset: 84 },
      { title: "Implement notification system", category: "Development", priority: "Medium", estimatedHours: 16, status: "Not Started", dueDateOffset: 98 },
      
      // Business Features
      { title: "Create team billing and subscriptions", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 98 },
      { title: "Build admin and reporting tools", category: "Development", priority: "Medium", estimatedHours: 18, status: "Not Started", dueDateOffset: 105 },
      { title: "Launch team collaboration features", category: "Marketing", priority: "High", estimatedHours: 12, status: "Not Started", dueDateOffset: 112 }
    ],
    milestones: [
      { title: "Team Foundation", description: "Workspace and team management ready", dueDateOffset: 28, status: "Not Started" },
      { title: "Project Management Core", description: "Tasks and Kanban boards operational", dueDateOffset: 56, status: "Not Started" },
      { title: "Collaboration Platform", description: "Real-time updates and file sharing complete", dueDateOffset: 84, status: "Not Started" },
      { title: "Full Platform Launch", description: "Complete project management SaaS ready", dueDateOffset: 112, status: "Not Started" }
    ]
  },

  {
    version: "2.0", 
    metadata: {
      name: "Learning Management System",
      description: "Online course platform with interactive content",
      author: "Sprinter Templates",
      difficulty: "intermediate",
      estimatedDuration: "16-18 weeks",
      tags: ["education", "courses", "learning", "content-management"],
      category: "Education",
      techStack: ["Next.js", "Prisma", "PostgreSQL", "AWS S3", "Stripe"],
      aiContext: {
        projectType: "Learning Management System",
        keyFeatures: ["course creation", "video hosting", "student progress tracking", "assessments"],
        targetAudience: "educators and organizations offering online courses",
        monetization: "course sales and platform fees"
      }
    },
    project: {
      name: "Learning Management System",
      description: "Build an interactive online learning platform for educators",
      startDateOffset: 0,
      launchDateOffset: 126, // 18 weeks
      totalSprints: 18,
      currentSprint: 1
    },
    tasks: [
      // Foundation
      { title: "Design course and user architecture", category: "Development", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 7 },
      { title: "Create instructor and student roles", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 14 },
      { title: "Build course creation workflow", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 21 },
      
      // Content Management
      { title: "Implement video upload and streaming", category: "Development", priority: "High", estimatedHours: 32, status: "Not Started", dueDateOffset: 35 },
      { title: "Create lesson and chapter system", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 42 },
      { title: "Build interactive content editor", category: "Development", priority: "Medium", estimatedHours: 28, status: "Not Started", dueDateOffset: 56 },
      
      // Student Experience
      { title: "Create student dashboard", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 63 },
      { title: "Implement progress tracking", category: "Development", priority: "High", estimatedHours: 18, status: "Not Started", dueDateOffset: 70 },
      { title: "Build quiz and assessment system", category: "Development", priority: "Medium", estimatedHours: 24, status: "Not Started", dueDateOffset: 84 },
      
      // Engagement Features
      { title: "Add discussion forums", category: "Development", priority: "Medium", estimatedHours: 20, status: "Not Started", dueDateOffset: 91 },
      { title: "Create certificate generation", category: "Development", priority: "Medium", estimatedHours: 16, status: "Not Started", dueDateOffset: 98 },
      { title: "Implement course reviews and ratings", category: "Development", priority: "Medium", estimatedHours: 12, status: "Not Started", dueDateOffset: 105 },
      
      // Business Features
      { title: "Integrate course payment system", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 112 },
      { title: "Build instructor analytics", category: "Development", priority: "Medium", estimatedHours: 18, status: "Not Started", dueDateOffset: 119 },
      { title: "Launch course marketplace", category: "Marketing", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 126 }
    ],
    milestones: [
      { title: "Course Creation Platform", description: "Instructor tools and content upload ready", dueDateOffset: 42, status: "Not Started" },
      { title: "Student Learning Experience", description: "Video streaming and progress tracking operational", dueDateOffset: 84, status: "Not Started" },
      { title: "Interactive Learning Features", description: "Assessments and discussions complete", dueDateOffset: 112, status: "Not Started" },
      { title: "Marketplace Launch", description: "Full LMS with payments and analytics", dueDateOffset: 126, status: "Not Started" }
    ]
  },

  {
    version: "2.0",
    metadata: {
      name: "SaaS Analytics Platform",
      description: "Business intelligence and data visualization tool",
      author: "Sprinter Templates", 
      difficulty: "advanced",
      estimatedDuration: "20-24 weeks",
      tags: ["analytics", "data-visualization", "business-intelligence", "dashboard"],
      category: "Analytics",
      techStack: ["React", "D3.js", "Node.js", "ClickHouse", "Redis"],
      aiContext: {
        projectType: "SaaS Analytics Platform",
        keyFeatures: ["data ingestion", "custom dashboards", "real-time analytics", "API integrations"],
        targetAudience: "businesses needing data insights and reporting",
        monetization: "usage-based pricing with enterprise tiers"
      }
    },
    project: {
      name: "SaaS Analytics Platform",
      description: "Build a powerful business intelligence and data visualization platform",
      startDateOffset: 0,
      launchDateOffset: 168, // 24 weeks
      totalSprints: 24,
      currentSprint: 1
    },
    tasks: [
      // Foundation
      { title: "Design analytics data architecture", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 7 },
      { title: "Set up data ingestion pipeline", category: "Development", priority: "High", estimatedHours: 32, status: "Not Started", dueDateOffset: 21 },
      { title: "Create multi-tenant data isolation", category: "Development", priority: "High", estimatedHours: 28, status: "Not Started", dueDateOffset: 28 },
      
      // Data Processing
      { title: "Build real-time data processing", category: "Development", priority: "High", estimatedHours: 36, status: "Not Started", dueDateOffset: 49 },
      { title: "Implement data transformation engine", category: "Development", priority: "High", estimatedHours: 32, status: "Not Started", dueDateOffset: 63 },
      { title: "Create data quality monitoring", category: "Development", priority: "Medium", estimatedHours: 20, status: "Not Started", dueDateOffset: 70 },
      
      // Visualization Engine
      { title: "Build chart and graph library", category: "Development", priority: "High", estimatedHours: 40, status: "Not Started", dueDateOffset: 91 },
      { title: "Create drag-and-drop dashboard builder", category: "Development", priority: "High", estimatedHours: 36, status: "Not Started", dueDateOffset: 105 },
      { title: "Implement interactive filtering", category: "Development", priority: "Medium", estimatedHours: 24, status: "Not Started", dueDateOffset: 119 },
      
      // Advanced Features
      { title: "Add automated insights and alerts", category: "Development", priority: "Medium", estimatedHours: 28, status: "Not Started", dueDateOffset: 133 },
      { title: "Build API for data integrations", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 140 },
      { title: "Create white-label dashboard options", category: "Development", priority: "Medium", estimatedHours: 20, status: "Not Started", dueDateOffset: 154 },
      
      // Enterprise Features
      { title: "Implement role-based access control", category: "Development", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 147 },
      { title: "Add enterprise SSO integration", category: "Development", priority: "Medium", estimatedHours: 20, status: "Not Started", dueDateOffset: 161 },
      { title: "Launch enterprise analytics platform", category: "Marketing", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 168 }
    ],
    milestones: [
      { title: "Data Infrastructure", description: "Ingestion pipeline and processing ready", dueDateOffset: 49, status: "Not Started" },
      { title: "Analytics Engine", description: "Real-time processing and transformations operational", dueDateOffset: 91, status: "Not Started" },
      { title: "Visualization Platform", description: "Dashboard builder and charts complete", dueDateOffset: 133, status: "Not Started" },
      { title: "Enterprise Launch", description: "Full analytics platform with enterprise features", dueDateOffset: 168, status: "Not Started" }
    ]
  }
]

export const TEMPLATE_CATEGORIES = [
  { id: 'all', name: 'All Templates', count: BUILTIN_TEMPLATES.length },
  { id: 'financial', name: 'Financial', count: BUILTIN_TEMPLATES.filter(t => t.metadata.category === 'Financial').length },
  { id: 'business', name: 'Business', count: BUILTIN_TEMPLATES.filter(t => t.metadata.category === 'Business').length },
  { id: 'ecommerce', name: 'E-commerce', count: BUILTIN_TEMPLATES.filter(t => t.metadata.category === 'E-commerce').length },
  { id: 'productivity', name: 'Productivity', count: BUILTIN_TEMPLATES.filter(t => t.metadata.category === 'Productivity').length },
  { id: 'education', name: 'Education', count: BUILTIN_TEMPLATES.filter(t => t.metadata.category === 'Education').length },
  { id: 'analytics', name: 'Analytics', count: BUILTIN_TEMPLATES.filter(t => t.metadata.category === 'Analytics').length }
]

export const DIFFICULTY_COLORS = {
  'beginner': 'bg-green-100 text-green-800',
  'intermediate': 'bg-yellow-100 text-yellow-800', 
  'advanced': 'bg-red-100 text-red-800'
}

export const CATEGORY_ICONS = {
  'Financial': '💰',
  'Business': '🏢', 
  'E-commerce': '🛒',
  'Productivity': '⚡',
  'Education': '📚',
  'Analytics': '📊'
} 