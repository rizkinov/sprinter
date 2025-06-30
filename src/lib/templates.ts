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
      { title: "Set up development environment", description: "Success Metrics: ✅ Local dev server running with hot reload ✅ Database connection established ✅ All dependencies installed ✅ Git workflow configured ✅ Code formatting/linting setup", category: "Development", priority: "High", estimatedHours: 8, status: "Not Started", dueDateOffset: 7 },
      { title: "Design database schema for users and accounts", description: "Success Metrics: ✅ ER diagram with user, account, transaction tables ✅ Proper foreign key relationships ✅ Data validation constraints ✅ Migration scripts created ✅ Database indexes optimized for queries", category: "Development", priority: "High", estimatedHours: 12, status: "Not Started", dueDateOffset: 14 },
      { title: "Create user authentication system", description: "Success Metrics: ✅ Secure login/logout functionality ✅ Password encryption with bcrypt ✅ JWT token management ✅ Password reset flow ✅ Email verification system ✅ Session management working", category: "Development", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 14 },
      
      // Week 3-4: Core Features
      { title: "Build expense tracking interface", description: "Success Metrics: ✅ Add/edit/delete expense entries ✅ Category selection with custom categories ✅ Receipt photo upload ✅ Expense search and filtering ✅ Bulk import from CSV ✅ Real-time expense total calculations", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 28 },
      { title: "Implement budget creation and management", description: "Success Metrics: ✅ Create monthly/weekly budgets ✅ Set spending limits per category ✅ Budget vs actual spending tracking ✅ Alert system for overspending ✅ Budget templates for reuse ✅ Progress visualization", category: "Development", priority: "High", estimatedHours: 18, status: "Not Started", dueDateOffset: 28 },
      { title: "Design financial dashboard UI", description: "Success Metrics: ✅ Clean, intuitive dashboard layout ✅ Key metrics displayed prominently ✅ Interactive charts and graphs ✅ Mobile-responsive design ✅ Quick action buttons ✅ Real-time data updates ✅ User testing feedback incorporated", category: "Design", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 21 },
      
      // Week 5-6: Advanced Features
      { title: "Add bank account integration", description: "Success Metrics: ✅ Connect to 3+ major banks via API ✅ Automatic transaction import ✅ Transaction categorization ✅ Secure OAuth authentication ✅ Handle duplicate detection ✅ Bank connection status monitoring", category: "Development", priority: "Medium", estimatedHours: 24, status: "Not Started", dueDateOffset: 42 },
      { title: "Create financial reports and charts", description: "Success Metrics: ✅ Monthly/yearly spending reports ✅ Category breakdown charts ✅ Income vs expense trends ✅ Custom date range reports ✅ Export to PDF/Excel ✅ Scheduled report emails ✅ Comparison period analysis", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 42 },
      { title: "Implement goal tracking system", description: "Success Metrics: ✅ Set savings/debt payoff goals ✅ Track progress with visual indicators ✅ Goal deadline notifications ✅ Multiple goal types supported ✅ Achievement celebrations ✅ Goal sharing capabilities", category: "Development", priority: "Medium", estimatedHours: 16, status: "Not Started", dueDateOffset: 42 },
      
      // Week 7-8: Monetization
      { title: "Integrate Stripe payment processing", description: "Success Metrics: ✅ Secure credit card processing ✅ Subscription billing automation ✅ Failed payment handling ✅ Tax calculation integration ✅ Invoice generation ✅ Refund processing ✅ PCI compliance verified", category: "Development", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 56 },
      { title: "Build subscription management", description: "Success Metrics: ✅ Multiple pricing tiers implemented ✅ Upgrade/downgrade flows ✅ Billing cycle management ✅ Usage-based billing ✅ Cancellation flow with retention ✅ Customer billing portal ✅ Dunning management", category: "Development", priority: "High", estimatedHours: 18, status: "Not Started", dueDateOffset: 56 },
      { title: "Design pricing page", description: "Success Metrics: ✅ Clear feature comparison table ✅ Compelling value propositions ✅ Social proof and testimonials ✅ FAQ section addressing objections ✅ A/B tested call-to-action buttons ✅ Mobile-optimized layout ✅ Conversion rate >3%", category: "Design", priority: "Medium", estimatedHours: 8, status: "Not Started", dueDateOffset: 49 },
      
      // Week 9-12: Testing & Polish
      { title: "Write comprehensive unit tests", description: "Success Metrics: ✅ >80% code coverage achieved ✅ All API endpoints tested ✅ Critical user flows covered ✅ Edge cases and error scenarios ✅ Automated test pipeline ✅ Performance benchmarks established", category: "Testing", priority: "Medium", estimatedHours: 24, status: "Not Started", dueDateOffset: 84 },
      { title: "Conduct user acceptance testing", description: "Success Metrics: ✅ 20+ beta users recruited ✅ Core user journeys tested ✅ Usability issues documented ✅ Bug reports triaged and fixed ✅ User satisfaction >4/5 stars ✅ Performance metrics validated", category: "Testing", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 84 },
      { title: "Optimize database performance", description: "Success Metrics: ✅ Query response time <200ms ✅ Database indexes optimized ✅ N+1 queries eliminated ✅ Connection pooling configured ✅ Caching strategy implemented ✅ Load testing passed at 1000 users", category: "Development", priority: "Medium", estimatedHours: 12, status: "Not Started", dueDateOffset: 84 },
      
      // Week 13-16: Launch Preparation
      { title: "Set up production infrastructure", description: "Success Metrics: ✅ Auto-scaling server deployment ✅ SSL certificate configured ✅ Database backups automated ✅ Monitoring and alerting setup ✅ CI/CD pipeline operational ✅ 99.9% uptime SLA achievable", category: "Operations", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 98 },
      { title: "Create user onboarding flow", description: "Success Metrics: ✅ 5-step guided setup process ✅ Sample data populated ✅ Progress indicators shown ✅ Help tooltips and tutorials ✅ >80% completion rate ✅ First transaction within 24 hours", category: "Design", priority: "High", estimatedHours: 12, status: "Not Started", dueDateOffset: 98 },
      { title: "Develop marketing landing page", description: "Success Metrics: ✅ Hero section with clear value prop ✅ Feature benefits highlighted ✅ Customer testimonials included ✅ Email capture form ✅ >20% signup conversion rate ✅ SEO optimized for target keywords", category: "Marketing", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 105 },
      { title: "Launch beta program", description: "Success Metrics: ✅ 50+ beta users onboarded ✅ Feedback collection system ✅ Bug reporting process ✅ Regular user surveys ✅ Product-market fit signals ✅ 10+ user testimonials collected", category: "Marketing", priority: "Medium", estimatedHours: 8, status: "Not Started", dueDateOffset: 105 },
      { title: "Prepare launch campaign", description: "Success Metrics: ✅ Launch announcement drafted ✅ Social media content calendar ✅ Press kit with assets ✅ Influencer outreach list ✅ Launch day timeline ✅ Success metrics defined ✅ 1000+ signups target", category: "Marketing", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 112 }
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
      { title: "Design CRM database architecture", description: "Success Metrics: ✅ Complete ER diagram with customer, contact, deal, activity entities ✅ Tenant isolation strategy implemented ✅ Data relationships optimized ✅ Scalability to 10,000+ contacts per tenant ✅ Migration scripts and seed data ready", category: "Development", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 7 },
      { title: "Set up multi-tenant system", description: "Success Metrics: ✅ Tenant isolation at database level ✅ Subdomain routing implemented ✅ Tenant-specific data access controls ✅ Tenant registration and setup flow ✅ Support for unlimited tenants ✅ Performance testing with 100+ tenants", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 14 },
      { title: "Create user roles and permissions", description: "Success Metrics: ✅ Admin, Manager, Sales Rep roles defined ✅ Granular permission system (view/edit/delete) ✅ Role-based dashboard customization ✅ Permission inheritance and override ✅ Audit trail for permission changes ✅ 100% test coverage for access controls", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 21 },
      
      // Core CRM Features
      { title: "Build contact management system", description: "Success Metrics: ✅ Add/edit/delete contacts with rich profiles ✅ Custom fields and tags support ✅ Contact deduplication system ✅ Advanced search and filtering ✅ Contact import from CSV/vCard ✅ Relationship mapping between contacts ✅ Contact interaction history tracking", category: "Development", priority: "High", estimatedHours: 32, status: "Not Started", dueDateOffset: 35 },
      { title: "Implement sales pipeline interface", description: "Success Metrics: ✅ Drag-and-drop pipeline stages ✅ Customizable pipeline workflows ✅ Deal probability calculations ✅ Pipeline performance metrics ✅ Stage-specific automation rules ✅ Forecast reporting ✅ Multiple pipeline support", category: "Development", priority: "High", estimatedHours: 28, status: "Not Started", dueDateOffset: 49 },
      { title: "Create deal tracking system", description: "Success Metrics: ✅ Deal creation with value and timeline ✅ Deal stage progression tracking ✅ Win/loss reason capture ✅ Deal source attribution ✅ Related contact and company linking ✅ Deal activity timeline ✅ Conversion rate analytics", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 49 },
      
      // Communication Features
      { title: "Integrate email communication", description: "Success Metrics: ✅ Email sync with Gmail/Outlook ✅ Email templates and sequences ✅ Email open and click tracking ✅ Automated follow-up campaigns ✅ Email-to-contact matching ✅ Email activity logging ✅ Unsubscribe management", category: "Development", priority: "High", estimatedHours: 32, status: "Not Started", dueDateOffset: 70 },
      { title: "Build activity timeline", description: "Success Metrics: ✅ Chronological activity feed ✅ Multiple activity types (calls, emails, meetings) ✅ Activity categorization and tagging ✅ Automated activity capture ✅ Activity search and filtering ✅ Team activity visibility ✅ Activity reporting dashboard", category: "Development", priority: "Medium", estimatedHours: 20, status: "Not Started", dueDateOffset: 70 },
      { title: "Add task and reminder system", description: "Success Metrics: ✅ Task creation with due dates and priorities ✅ Task assignment to team members ✅ Automatic reminder notifications ✅ Task completion tracking ✅ Recurring task templates ✅ Task reporting and analytics ✅ Calendar integration", category: "Development", priority: "Medium", estimatedHours: 18, status: "Not Started", dueDateOffset: 70 },
      
      // Analytics & Reports
      { title: "Create sales analytics dashboard", description: "Success Metrics: ✅ Real-time sales performance metrics ✅ Revenue forecasting charts ✅ Team performance comparisons ✅ Conversion funnel analysis ✅ Activity-to-outcome correlation ✅ Customizable KPI widgets ✅ Export to management reports", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 91 },
      { title: "Build custom report builder", description: "Success Metrics: ✅ Drag-and-drop report designer ✅ 20+ pre-built report templates ✅ Custom date range selection ✅ Advanced filtering options ✅ Scheduled report delivery ✅ Report sharing and collaboration ✅ PDF/Excel export formats", category: "Development", priority: "Medium", estimatedHours: 28, status: "Not Started", dueDateOffset: 105 },
      { title: "Implement data export features", description: "Success Metrics: ✅ Bulk data export in multiple formats ✅ Selective field export options ✅ Large dataset handling (10k+ records) ✅ Export scheduling and automation ✅ Data privacy compliance ✅ Export audit trail ✅ API endpoint for integrations", category: "Development", priority: "Medium", estimatedHours: 12, status: "Not Started", dueDateOffset: 105 },
      
      // Business Features
      { title: "Design subscription billing system", description: "Success Metrics: ✅ Tiered pricing plans (Starter/Pro/Enterprise) ✅ Per-user billing calculation ✅ Automatic invoicing and payment collection ✅ Usage tracking and overage billing ✅ Billing cycle management ✅ Payment method updates ✅ Dunning and retry logic", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 119 },
      { title: "Create team collaboration tools", description: "Success Metrics: ✅ @mention system for team communication ✅ Shared contact and deal ownership ✅ Team activity feeds ✅ Collaborative deal notes ✅ Team performance leaderboards ✅ Role-based collaboration permissions ✅ Team goal tracking", category: "Development", priority: "Medium", estimatedHours: 20, status: "Not Started", dueDateOffset: 119 },
      { title: "Build API for third-party integrations", description: "Success Metrics: ✅ RESTful API with authentication ✅ Rate limiting and security controls ✅ 5+ pre-built integrations (Slack, Zapier, etc.) ✅ Webhook system for real-time updates ✅ Developer documentation and SDKs ✅ API usage analytics ✅ Enterprise-grade SLA support", category: "Development", priority: "Medium", estimatedHours: 32, status: "Not Started", dueDateOffset: 133 },
      
      // Launch
      { title: "Conduct enterprise security audit", description: "Success Metrics: ✅ SOC 2 compliance assessment ✅ Penetration testing completed ✅ Data encryption at rest and in transit ✅ GDPR/CCPA compliance verified ✅ Security incident response plan ✅ Regular vulnerability scanning ✅ Third-party security certification", category: "Testing", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 133 },
      { title: "Create comprehensive documentation", description: "Success Metrics: ✅ User onboarding guide and tutorials ✅ Admin configuration documentation ✅ API reference with code examples ✅ Troubleshooting and FAQ sections ✅ Video training library ✅ Integration setup guides ✅ 90%+ user satisfaction on docs", category: "Misc", priority: "Medium", estimatedHours: 20, status: "Not Started", dueDateOffset: 140 },
      { title: "Launch enterprise sales program", description: "Success Metrics: ✅ Enterprise pricing tier defined ✅ Sales collateral and case studies ✅ Enterprise onboarding process ✅ Dedicated account management ✅ Custom contract templates ✅ 10+ enterprise prospects identified ✅ First enterprise client signed", category: "Marketing", priority: "High", estimatedHours: 12, status: "Not Started", dueDateOffset: 140 }
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
      { title: "Design team-based architecture", description: "Success Metrics: ✅ Multi-workspace database design ✅ Team member role definitions ✅ Data isolation between workspaces ✅ Scalable user permission system ✅ Team size limits and billing tiers ✅ Database migration scripts ready", category: "Development", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 7 },
      { title: "Create workspace and team management", description: "Success Metrics: ✅ Workspace creation and configuration ✅ Team member invitation flow ✅ Role assignment (Owner, Admin, Member) ✅ Workspace settings management ✅ Team directory with profiles ✅ Workspace switching interface", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 14 },
      { title: "Build user invitation system", description: "Success Metrics: ✅ Email invitation with secure tokens ✅ Bulk invitation support ✅ Pending invitation management ✅ Invitation expiry and resend ✅ External user onboarding flow ✅ Invitation acceptance tracking", category: "Development", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 21 },
      
      // Core Features
      { title: "Implement project creation and management", description: "Success Metrics: ✅ Project templates and custom creation ✅ Project timeline and milestone setup ✅ Project member assignment ✅ Project status tracking ✅ Project archiving and deletion ✅ Project dashboard overview ✅ Cross-project reporting", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 28 },
      { title: "Build task management system", description: "Success Metrics: ✅ Task creation with rich descriptions ✅ Task assignment and due dates ✅ Priority levels and labels ✅ Task dependencies and blocking ✅ Subtask creation and nesting ✅ Task templates and recurring tasks ✅ Bulk task operations", category: "Development", priority: "High", estimatedHours: 32, status: "Not Started", dueDateOffset: 42 },
      { title: "Create Kanban board interface", description: "Success Metrics: ✅ Drag-and-drop task movement ✅ Customizable board columns ✅ WIP limits and visual indicators ✅ Board filtering and search ✅ Multiple board views per project ✅ Board-level permissions ✅ Mobile-responsive design", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 42 },
      
      // Collaboration
      { title: "Implement real-time updates", description: "Success Metrics: ✅ Live task updates across users ✅ Real-time notifications ✅ Online user presence indicators ✅ Collaborative editing detection ✅ Conflict resolution for simultaneous edits ✅ Performance with 50+ concurrent users", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 56 },
      { title: "Build comment and discussion system", description: "Success Metrics: ✅ Threaded comments on tasks ✅ @mention notifications ✅ Rich text formatting support ✅ Comment editing and deletion ✅ File attachments in comments ✅ Comment search and filtering ✅ Email digest of discussions", category: "Development", priority: "Medium", estimatedHours: 18, status: "Not Started", dueDateOffset: 56 },
      { title: "Add file sharing and attachments", description: "Success Metrics: ✅ Drag-and-drop file upload ✅ File version management ✅ File preview for common formats ✅ Secure file sharing with permissions ✅ 100MB per workspace storage ✅ Integration with cloud storage ✅ File activity tracking", category: "Development", priority: "Medium", estimatedHours: 16, status: "Not Started", dueDateOffset: 70 },
      
      // Advanced Features
      { title: "Create time tracking system", description: "Success Metrics: ✅ Start/stop timer functionality ✅ Manual time entry and editing ✅ Time tracking reports and analytics ✅ Billable vs non-billable hours ✅ Team time tracking overview ✅ Time budget alerts ✅ Timesheet export features", category: "Development", priority: "Medium", estimatedHours: 24, status: "Not Started", dueDateOffset: 84 },
      { title: "Build project analytics dashboard", description: "Success Metrics: ✅ Project progress visualization ✅ Team productivity metrics ✅ Task completion trends ✅ Time allocation reports ✅ Burndown and velocity charts ✅ Custom KPI dashboards ✅ Executive summary reports", category: "Development", priority: "Medium", estimatedHours: 20, status: "Not Started", dueDateOffset: 84 },
      { title: "Implement notification system", description: "Success Metrics: ✅ Real-time browser notifications ✅ Email notification preferences ✅ Mobile push notifications ✅ Digest emails for activity ✅ Notification frequency controls ✅ Custom notification rules ✅ Notification history tracking", category: "Development", priority: "Medium", estimatedHours: 16, status: "Not Started", dueDateOffset: 98 },
      
      // Business Features
      { title: "Create team billing and subscriptions", description: "Success Metrics: ✅ Per-user pricing tiers ✅ Automated billing cycles ✅ Team size monitoring and billing ✅ Payment method management ✅ Invoice generation and history ✅ Usage-based feature limits ✅ Billing admin portal", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 98 },
      { title: "Build admin and reporting tools", description: "Success Metrics: ✅ Workspace analytics and insights ✅ User activity monitoring ✅ System health dashboards ✅ Data export and backup tools ✅ Security audit logs ✅ Performance monitoring ✅ Custom admin workflows", category: "Development", priority: "Medium", estimatedHours: 18, status: "Not Started", dueDateOffset: 105 },
      { title: "Launch team collaboration features", description: "Success Metrics: ✅ Feature announcement campaign ✅ Team onboarding tutorials ✅ Success metrics tracking ✅ User feedback collection ✅ 10+ pilot teams recruited ✅ 80%+ feature adoption rate ✅ Customer success stories documented", category: "Marketing", priority: "High", estimatedHours: 12, status: "Not Started", dueDateOffset: 112 }
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