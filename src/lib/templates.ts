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
      { title: "Set up development environment", description: "Success Metrics:\n✅ Local dev server running with hot reload\n✅ Database connection established\n✅ All dependencies installed\n✅ Git workflow configured\n✅ Code formatting/linting setup", category: "Development", priority: "High", estimatedHours: 8, status: "Not Started", dueDateOffset: 7 },
      { title: "Design database schema for users and accounts", description: "Success Metrics:\n✅ ER diagram with user, account, transaction tables\n✅ Proper foreign key relationships\n✅ Data validation constraints\n✅ Migration scripts created\n✅ Database indexes optimized for queries", category: "Development", priority: "High", estimatedHours: 12, status: "Not Started", dueDateOffset: 14 },
      { title: "Create user authentication system", description: "Success Metrics:\n✅ Secure login/logout functionality\n✅ Password encryption with bcrypt\n✅ JWT token management\n✅ Password reset flow\n✅ Email verification system\n✅ Session management working", category: "Development", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 14 },
      
      // Week 3-4: Core Features
      { title: "Build expense tracking interface", description: "Success Metrics:\n✅ Add/edit/delete expense entries\n✅ Category selection with custom categories\n✅ Receipt photo upload\n✅ Expense search and filtering\n✅ Bulk import from CSV\n✅ Real-time expense total calculations", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 28 },
      { title: "Implement budget creation and management", description: "Success Metrics:\n✅ Create monthly/weekly budgets\n✅ Set spending limits per category\n✅ Budget vs actual spending tracking\n✅ Alert system for overspending\n✅ Budget templates for reuse\n✅ Progress visualization", category: "Development", priority: "High", estimatedHours: 18, status: "Not Started", dueDateOffset: 28 },
      { title: "Design financial dashboard UI", description: "Success Metrics:\n✅ Clean, intuitive dashboard layout\n✅ Key metrics displayed prominently\n✅ Interactive charts and graphs\n✅ Mobile-responsive design\n✅ Quick action buttons\n✅ Real-time data updates\n✅ User testing feedback incorporated", category: "Design", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 21 },
      
      // Week 5-6: Advanced Features
      { title: "Add bank account integration", description: "Success Metrics:\n✅ Connect to 3+ major banks via API\n✅ Automatic transaction import\n✅ Transaction categorization\n✅ Secure OAuth authentication\n✅ Handle duplicate detection\n✅ Bank connection status monitoring", category: "Development", priority: "Medium", estimatedHours: 24, status: "Not Started", dueDateOffset: 42 },
      { title: "Create financial reports and charts", description: "Success Metrics:\n✅ Monthly/yearly spending reports\n✅ Category breakdown charts\n✅ Income vs expense trends\n✅ Custom date range reports\n✅ Export to PDF/Excel\n✅ Scheduled report emails\n✅ Comparison period analysis", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 42 },
      { title: "Implement goal tracking system", description: "Success Metrics:\n✅ Set savings/debt payoff goals\n✅ Track progress with visual indicators\n✅ Goal deadline notifications\n✅ Multiple goal types supported\n✅ Achievement celebrations\n✅ Goal sharing capabilities", category: "Development", priority: "Medium", estimatedHours: 16, status: "Not Started", dueDateOffset: 42 },
      
      // Week 7-8: Monetization
      { title: "Integrate Stripe payment processing", description: "Success Metrics:\n✅ Secure credit card processing\n✅ Subscription billing automation\n✅ Failed payment handling\n✅ Tax calculation integration\n✅ Invoice generation\n✅ Refund processing\n✅ PCI compliance verified", category: "Development", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 56 },
      { title: "Build subscription management", description: "Success Metrics:\n✅ Multiple pricing tiers implemented\n✅ Upgrade/downgrade flows\n✅ Billing cycle management\n✅ Usage-based billing\n✅ Cancellation flow with retention\n✅ Customer billing portal\n✅ Dunning management", category: "Development", priority: "High", estimatedHours: 18, status: "Not Started", dueDateOffset: 56 },
      { title: "Design pricing page", description: "Success Metrics:\n✅ Clear feature comparison table\n✅ Compelling value propositions\n✅ Social proof and testimonials\n✅ FAQ section addressing objections\n✅ A/B tested call-to-action buttons\n✅ Mobile-optimized layout\n✅ Conversion rate >3%", category: "Design", priority: "Medium", estimatedHours: 8, status: "Not Started", dueDateOffset: 49 },
      
      // Week 9-12: Testing & Polish
      { title: "Write comprehensive unit tests", description: "Success Metrics:\n✅ >80% code coverage achieved\n✅ All API endpoints tested\n✅ Critical user flows covered\n✅ Edge cases and error scenarios\n✅ Automated test pipeline\n✅ Performance benchmarks established", category: "Testing", priority: "Medium", estimatedHours: 24, status: "Not Started", dueDateOffset: 84 },
      { title: "Conduct user acceptance testing", description: "Success Metrics:\n✅ 20+ beta users recruited\n✅ Core user journeys tested\n✅ Usability issues documented\n✅ Bug reports triaged and fixed\n✅ User satisfaction >4/5 stars\n✅ Performance metrics validated", category: "Testing", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 84 },
      { title: "Optimize database performance", description: "Success Metrics:\n✅ Query response time <200ms\n✅ Database indexes optimized\n✅ N+1 queries eliminated\n✅ Connection pooling configured\n✅ Caching strategy implemented\n✅ Load testing passed at 1000 users", category: "Development", priority: "Medium", estimatedHours: 12, status: "Not Started", dueDateOffset: 84 },
      
      // Week 13-16: Launch Preparation
      { title: "Set up production infrastructure", description: "Success Metrics:\n✅ Auto-scaling server deployment\n✅ SSL certificate configured\n✅ Database backups automated\n✅ Monitoring and alerting setup\n✅ CI/CD pipeline operational\n✅ 99.9% uptime SLA achievable", category: "Operations", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 98 },
      { title: "Create user onboarding flow", description: "Success Metrics:\n✅ 5-step guided setup process\n✅ Sample data populated\n✅ Progress indicators shown\n✅ Help tooltips and tutorials\n✅ >80% completion rate\n✅ First transaction within 24 hours", category: "Design", priority: "High", estimatedHours: 12, status: "Not Started", dueDateOffset: 98 },
      { title: "Develop marketing landing page", description: "Success Metrics:\n✅ Hero section with clear value prop\n✅ Feature benefits highlighted\n✅ Customer testimonials included\n✅ Email capture form\n✅ >20% signup conversion rate\n✅ SEO optimized for target keywords", category: "Marketing", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 105 },
      { title: "Launch beta program", description: "Success Metrics:\n✅ 50+ beta users onboarded\n✅ Feedback collection system\n✅ Bug reporting process\n✅ Regular user surveys\n✅ Product-market fit signals\n✅ 10+ user testimonials collected", category: "Marketing", priority: "Medium", estimatedHours: 8, status: "Not Started", dueDateOffset: 105 },
      { title: "Prepare launch campaign", description: "Success Metrics:\n✅ Launch announcement drafted\n✅ Social media content calendar\n✅ Press kit with assets\n✅ Influencer outreach list\n✅ Launch day timeline\n✅ Success metrics defined\n✅ 1000+ signups target", category: "Marketing", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 112 }
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
      { title: "Design CRM database architecture", description: "Success Metrics:\n✅ Complete ER diagram with customer, contact, deal, activity entities\n✅ Tenant isolation strategy implemented\n✅ Data relationships optimized\n✅ Scalability to 10,000+ contacts per tenant\n✅ Migration scripts and seed data ready", category: "Development", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 7 },
      { title: "Set up multi-tenant system", description: "Success Metrics:\n✅ Tenant isolation at database level\n✅ Subdomain routing implemented\n✅ Tenant-specific data access controls\n✅ Tenant registration and setup flow\n✅ Support for unlimited tenants\n✅ Performance testing with 100+ tenants", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 14 },
      { title: "Create user roles and permissions", description: "Success Metrics:\n✅ Admin, Manager, Sales Rep roles defined\n✅ Granular permission system (view/edit/delete)\n✅ Role-based dashboard customization\n✅ Permission inheritance and override\n✅ Audit trail for permission changes\n✅ 100% test coverage for access controls", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 21 },
      
      // Core CRM Features
      { title: "Build contact management system", description: "Success Metrics:\n✅ Add/edit/delete contacts with rich profiles\n✅ Custom fields and tags support\n✅ Contact deduplication system\n✅ Advanced search and filtering\n✅ Contact import from CSV/vCard\n✅ Relationship mapping between contacts\n✅ Contact interaction history tracking", category: "Development", priority: "High", estimatedHours: 32, status: "Not Started", dueDateOffset: 35 },
      { title: "Implement sales pipeline interface", description: "Success Metrics:\n✅ Drag-and-drop pipeline stages\n✅ Customizable pipeline workflows\n✅ Deal probability calculations\n✅ Pipeline performance metrics\n✅ Stage-specific automation rules\n✅ Forecast reporting\n✅ Multiple pipeline support", category: "Development", priority: "High", estimatedHours: 28, status: "Not Started", dueDateOffset: 49 },
      { title: "Create deal tracking system", description: "Success Metrics:\n✅ Deal creation with value and timeline\n✅ Deal stage progression tracking\n✅ Win/loss reason capture\n✅ Deal source attribution\n✅ Related contact and company linking\n✅ Deal activity timeline\n✅ Conversion rate analytics", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 49 },
      
      // Communication Features
      { title: "Integrate email communication", description: "Success Metrics:\n✅ Email sync with Gmail/Outlook\n✅ Email templates and sequences\n✅ Email open and click tracking\n✅ Automated follow-up campaigns\n✅ Email-to-contact matching\n✅ Email activity logging\n✅ Unsubscribe management", category: "Development", priority: "High", estimatedHours: 32, status: "Not Started", dueDateOffset: 70 },
      { title: "Build activity timeline", description: "Success Metrics:\n✅ Chronological activity feed\n✅ Multiple activity types (calls, emails, meetings)\n✅ Activity categorization and tagging\n✅ Automated activity capture\n✅ Activity search and filtering\n✅ Team activity visibility\n✅ Activity reporting dashboard", category: "Development", priority: "Medium", estimatedHours: 20, status: "Not Started", dueDateOffset: 70 },
      { title: "Add task and reminder system", description: "Success Metrics:\n✅ Task creation with due dates and priorities\n✅ Task assignment to team members\n✅ Automatic reminder notifications\n✅ Task completion tracking\n✅ Recurring task templates\n✅ Task reporting and analytics\n✅ Calendar integration", category: "Development", priority: "Medium", estimatedHours: 18, status: "Not Started", dueDateOffset: 70 },
      
      // Analytics & Reports
      { title: "Create sales analytics dashboard", description: "Success Metrics:\n✅ Real-time sales performance metrics\n✅ Revenue forecasting charts\n✅ Team performance comparisons\n✅ Conversion funnel analysis\n✅ Activity-to-outcome correlation\n✅ Customizable KPI widgets\n✅ Export to management reports", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 91 },
      { title: "Build custom report builder", description: "Success Metrics:\n✅ Drag-and-drop report designer\n✅ 20+ pre-built report templates\n✅ Custom date range selection\n✅ Advanced filtering options\n✅ Scheduled report delivery\n✅ Report sharing and collaboration\n✅ PDF/Excel export formats", category: "Development", priority: "Medium", estimatedHours: 28, status: "Not Started", dueDateOffset: 105 },
      { title: "Implement data export features", description: "Success Metrics:\n✅ Bulk data export in multiple formats\n✅ Selective field export options\n✅ Large dataset handling (10k+ records)\n✅ Export scheduling and automation\n✅ Data privacy compliance\n✅ Export audit trail\n✅ API endpoint for integrations", category: "Development", priority: "Medium", estimatedHours: 12, status: "Not Started", dueDateOffset: 105 },
      
      // Business Features
      { title: "Design subscription billing system", description: "Success Metrics:\n✅ Tiered pricing plans (Starter/Pro/Enterprise)\n✅ Per-user billing calculation\n✅ Automatic invoicing and payment collection\n✅ Usage tracking and overage billing\n✅ Billing cycle management\n✅ Payment method updates\n✅ Dunning and retry logic", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 119 },
      { title: "Create team collaboration tools", description: "Success Metrics:\n✅ @mention system for team communication\n✅ Shared contact and deal ownership\n✅ Team activity feeds\n✅ Collaborative deal notes\n✅ Team performance leaderboards\n✅ Role-based collaboration permissions\n✅ Team goal tracking", category: "Development", priority: "Medium", estimatedHours: 20, status: "Not Started", dueDateOffset: 119 },
      { title: "Build API for third-party integrations", description: "Success Metrics:\n✅ RESTful API with authentication\n✅ Rate limiting and security controls\n✅ 5+ pre-built integrations (Slack, Zapier, etc.)\n✅ Webhook system for real-time updates\n✅ Developer documentation and SDKs\n✅ API usage analytics\n✅ Enterprise-grade SLA support", category: "Development", priority: "Medium", estimatedHours: 32, status: "Not Started", dueDateOffset: 133 },
      
      // Launch
      { title: "Conduct enterprise security audit", description: "Success Metrics:\n✅ SOC 2 compliance assessment\n✅ Penetration testing completed\n✅ Data encryption at rest and in transit\n✅ GDPR/CCPA compliance verified\n✅ Security incident response plan\n✅ Regular vulnerability scanning\n✅ Third-party security certification", category: "Testing", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 133 },
      { title: "Create comprehensive documentation", description: "Success Metrics:\n✅ User onboarding guide and tutorials\n✅ Admin configuration documentation\n✅ API reference with code examples\n✅ Troubleshooting and FAQ sections\n✅ Video training library\n✅ Integration setup guides\n✅ 90%+ user satisfaction on docs", category: "Misc", priority: "Medium", estimatedHours: 20, status: "Not Started", dueDateOffset: 140 },
      { title: "Launch enterprise sales program", description: "Success Metrics:\n✅ Enterprise pricing tier defined\n✅ Sales collateral and case studies\n✅ Enterprise onboarding process\n✅ Dedicated account management\n✅ Custom contract templates\n✅ 10+ enterprise prospects identified\n✅ First enterprise client signed", category: "Marketing", priority: "High", estimatedHours: 12, status: "Not Started", dueDateOffset: 140 }
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
      { title: "Design team-based architecture", description: "Success Metrics:\n✅ Multi-workspace database design\n✅ Team member role definitions\n✅ Data isolation between workspaces\n✅ Scalable user permission system\n✅ Team size limits and billing tiers\n✅ Database migration scripts ready", category: "Development", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 7 },
      { title: "Create workspace and team management", description: "Success Metrics:\n✅ Workspace creation and configuration\n✅ Team member invitation flow\n✅ Role assignment (Owner, Admin, Member)\n✅ Workspace settings management\n✅ Team directory with profiles\n✅ Workspace switching interface", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 14 },
      { title: "Build user invitation system", description: "Success Metrics:\n✅ Email invitation with secure tokens\n✅ Bulk invitation support\n✅ Pending invitation management\n✅ Invitation expiry and resend\n✅ External user onboarding flow\n✅ Invitation acceptance tracking", category: "Development", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 21 },
      
      // Core Features
      { title: "Implement project creation and management", description: "Success Metrics:\n✅ Project templates and custom creation\n✅ Project timeline and milestone setup\n✅ Project member assignment\n✅ Project status tracking\n✅ Project archiving and deletion\n✅ Project dashboard overview\n✅ Cross-project reporting", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 28 },
      { title: "Build task management system", description: "Success Metrics:\n✅ Task creation with rich descriptions\n✅ Task assignment and due dates\n✅ Priority levels and labels\n✅ Task dependencies and blocking\n✅ Subtask creation and nesting\n✅ Task templates and recurring tasks\n✅ Bulk task operations", category: "Development", priority: "High", estimatedHours: 32, status: "Not Started", dueDateOffset: 42 },
      { title: "Create Kanban board interface", description: "Success Metrics:\n✅ Drag-and-drop task movement\n✅ Customizable board columns\n✅ WIP limits and visual indicators\n✅ Board filtering and search\n✅ Multiple board views per project\n✅ Board-level permissions\n✅ Mobile-responsive design", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 42 },
      
      // Collaboration
      { title: "Implement real-time updates", description: "Success Metrics:\n✅ Live task updates across users\n✅ Real-time notifications\n✅ Online user presence indicators\n✅ Collaborative editing detection\n✅ Conflict resolution for simultaneous edits\n✅ Performance with 50+ concurrent users", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 56 },
      { title: "Build comment and discussion system", description: "Success Metrics:\n✅ Threaded comments on tasks\n✅ @mention notifications\n✅ Rich text formatting support\n✅ Comment editing and deletion\n✅ File attachments in comments\n✅ Comment search and filtering\n✅ Email digest of discussions", category: "Development", priority: "Medium", estimatedHours: 18, status: "Not Started", dueDateOffset: 56 },
      { title: "Add file sharing and attachments", description: "Success Metrics:\n✅ Drag-and-drop file upload\n✅ File version management\n✅ File preview for common formats\n✅ Secure file sharing with permissions\n✅ 100MB per workspace storage\n✅ Integration with cloud storage\n✅ File activity tracking", category: "Development", priority: "Medium", estimatedHours: 16, status: "Not Started", dueDateOffset: 70 },
      
      // Advanced Features
      { title: "Create time tracking system", description: "Success Metrics:\n✅ Start/stop timer functionality\n✅ Manual time entry and editing\n✅ Time tracking reports and analytics\n✅ Billable vs non-billable hours\n✅ Team time tracking overview\n✅ Time budget alerts\n✅ Timesheet export features", category: "Development", priority: "Medium", estimatedHours: 24, status: "Not Started", dueDateOffset: 84 },
      { title: "Build project analytics dashboard", description: "Success Metrics:\n✅ Project progress visualization\n✅ Team productivity metrics\n✅ Task completion trends\n✅ Time allocation reports\n✅ Burndown and velocity charts\n✅ Custom KPI dashboards\n✅ Executive summary reports", category: "Development", priority: "Medium", estimatedHours: 20, status: "Not Started", dueDateOffset: 84 },
      { title: "Implement notification system", description: "Success Metrics:\n✅ Real-time browser notifications\n✅ Email notification preferences\n✅ Mobile push notifications\n✅ Digest emails for activity\n✅ Notification frequency controls\n✅ Custom notification rules\n✅ Notification history tracking", category: "Development", priority: "Medium", estimatedHours: 16, status: "Not Started", dueDateOffset: 98 },
      
      // Business Features
      { title: "Create team billing and subscriptions", description: "Success Metrics:\n✅ Per-user pricing tiers\n✅ Automated billing cycles\n✅ Team size monitoring and billing\n✅ Payment method management\n✅ Invoice generation and history\n✅ Usage-based feature limits\n✅ Billing admin portal", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 98 },
      { title: "Build admin and reporting tools", description: "Success Metrics:\n✅ Workspace analytics and insights\n✅ User activity monitoring\n✅ System health dashboards\n✅ Data export and backup tools\n✅ Security audit logs\n✅ Performance monitoring\n✅ Custom admin workflows", category: "Development", priority: "Medium", estimatedHours: 18, status: "Not Started", dueDateOffset: 105 },
      { title: "Launch team collaboration features", description: "Success Metrics:\n✅ Feature announcement campaign\n✅ Team onboarding tutorials\n✅ Success metrics tracking\n✅ User feedback collection\n✅ 10+ pilot teams recruited\n✅ 80%+ feature adoption rate\n✅ Customer success stories documented", category: "Marketing", priority: "High", estimatedHours: 12, status: "Not Started", dueDateOffset: 112 }
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