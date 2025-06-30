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
      { title: "Design e-commerce database schema", description: "Success Metrics:\n✅ Complete product, vendor, order, customer ERD\n✅ Multi-vendor data isolation design\n✅ Inventory tracking and reservation system\n✅ Order status and fulfillment workflow\n✅ Payment and commission calculations\n✅ Scalable architecture for 10k+ products\n✅ Migration scripts and seed data ready", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 7 },
      { title: "Set up multi-vendor architecture", description: "Success Metrics:\n✅ Vendor-specific storefront subdomains\n✅ Isolated vendor data and permissions\n✅ Centralized payment processing\n✅ Vendor commission calculation system\n✅ Bulk vendor management tools\n✅ Vendor performance analytics\n✅ Support for 1000+ concurrent vendors", category: "Development", priority: "High", estimatedHours: 32, status: "Not Started", dueDateOffset: 21 },
      { title: "Create vendor onboarding system", description: "Success Metrics:\n✅ Self-service vendor registration\n✅ Document verification workflow\n✅ Vendor profile and branding setup\n✅ Product catalog import tools\n✅ Payment and tax information collection\n✅ Vendor approval and activation process\n✅ Onboarding completion in <24 hours", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 28 },
      
      // Product Management
      { title: "Build product catalog system", description: "Success Metrics:\n✅ Rich product information architecture\n✅ Category and attribute management\n✅ Product variant and option handling\n✅ Bulk product import/export tools\n✅ Image and media management system\n✅ SEO optimization for product pages\n✅ Product approval workflow", category: "Development", priority: "High", estimatedHours: 28, status: "Not Started", dueDateOffset: 42 },
      { title: "Implement inventory management", description: "Success Metrics:\n✅ Real-time inventory tracking\n✅ Low stock alerts and notifications\n✅ Inventory reservation during checkout\n✅ Multi-location inventory support\n✅ Automated reorder point calculations\n✅ Inventory analytics and reporting\n✅ Integration with vendor systems", category: "Development", priority: "High", estimatedHours: 32, status: "Not Started", dueDateOffset: 56 },
      { title: "Create product search and filtering", description: "Success Metrics:\n✅ Full-text search with auto-complete\n✅ Advanced filtering by attributes\n✅ Price range and availability filters\n✅ Vendor and brand filtering\n✅ Search result ranking algorithm\n✅ Search analytics and optimization\n✅ <200ms search response time", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 56 },
      
      // Shopping Experience
      { title: "Build shopping cart system", description: "Success Metrics:\n✅ Persistent cart across sessions\n✅ Guest and authenticated user carts\n✅ Cart synchronization across devices\n✅ Bulk add/remove operations\n✅ Cart abandonment recovery\n✅ Wishlist and saved items\n✅ Cart conversion rate >15%", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 70 },
      { title: "Implement checkout process", description: "Success Metrics:\n✅ Single-page checkout flow\n✅ Guest checkout option\n✅ Address validation and autocomplete\n✅ Shipping method selection\n✅ Tax calculation integration\n✅ Order summary and confirmation\n✅ Checkout completion rate >80%", category: "Development", priority: "High", estimatedHours: 28, status: "Not Started", dueDateOffset: 84 },
      { title: "Integrate multiple payment providers", description: "Success Metrics:\n✅ Stripe, PayPal, and Apple Pay integration\n✅ Credit card tokenization and security\n✅ Digital wallet support\n✅ Split payments to vendors\n✅ Subscription and recurring billing\n✅ Fraud detection and prevention\n✅ Payment success rate >99%", category: "Development", priority: "High", estimatedHours: 32, status: "Not Started", dueDateOffset: 84 },
      
      // Order Management
      { title: "Create order processing system", description: "Success Metrics:\n✅ Automated order routing to vendors\n✅ Order status tracking and updates\n✅ Inventory allocation and fulfillment\n✅ Order modification and cancellation\n✅ Automated vendor notifications\n✅ Order analytics and reporting\n✅ Order processing time <30 minutes", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 98 },
      { title: "Build shipping integration", description: "Success Metrics:\n✅ Integration with UPS, FedEx, USPS\n✅ Real-time shipping rate calculations\n✅ Automated label generation\n✅ Tracking number distribution\n✅ Delivery confirmation handling\n✅ International shipping support\n✅ Shipping cost accuracy >98%", category: "Development", priority: "High", estimatedHours: 28, status: "Not Started", dueDateOffset: 112 },
      { title: "Implement return and refund system", description: "Success Metrics:\n✅ Self-service return initiation\n✅ Return merchandise authorization\n✅ Automated refund processing\n✅ Return tracking and status updates\n✅ Restocking and inventory updates\n✅ Return analytics and reporting\n✅ Return processing time <48 hours", category: "Development", priority: "Medium", estimatedHours: 20, status: "Not Started", dueDateOffset: 126 },
      
      // Analytics & Marketing
      { title: "Create vendor analytics dashboard", description: "Success Metrics:\n✅ Sales performance metrics\n✅ Product popularity analytics\n✅ Customer behavior insights\n✅ Commission and payout tracking\n✅ Market trend analysis\n✅ Customizable reporting tools\n✅ Real-time dashboard updates", category: "Development", priority: "Medium", estimatedHours: 24, status: "Not Started", dueDateOffset: 140 },
      { title: "Build recommendation engine", description: "Success Metrics:\n✅ Collaborative filtering algorithm\n✅ Product similarity recommendations\n✅ Personalized product suggestions\n✅ Cross-selling and upselling\n✅ Recommendation performance tracking\n✅ A/B testing for recommendations\n✅ Recommendation click-through rate >5%", category: "Development", priority: "Medium", estimatedHours: 32, status: "Not Started", dueDateOffset: 154 },
      { title: "Implement email marketing tools", description: "Success Metrics:\n✅ Automated email campaigns\n✅ Abandoned cart recovery emails\n✅ Product recommendation emails\n✅ Vendor newsletter system\n✅ Email template customization\n✅ Campaign analytics and tracking\n✅ Email open rate >25%", category: "Development", priority: "Medium", estimatedHours: 20, status: "Not Started", dueDateOffset: 154 },
      
      // Launch Preparation
      { title: "Set up CDN and image optimization", description: "Success Metrics:\n✅ Global CDN deployment\n✅ Automatic image compression\n✅ WebP format support\n✅ Lazy loading implementation\n✅ Image caching strategies\n✅ Page load time <2 seconds\n✅ Mobile optimization score >90%", category: "Operations", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 161 },
      { title: "Conduct load testing", description: "Success Metrics:\n✅ Performance testing with 10k+ concurrent users\n✅ Database query optimization\n✅ API response time <100ms\n✅ System stability under peak load\n✅ Scalability benchmarks established\n✅ Monitoring and alerting setup\n✅ 99.9% uptime SLA achievable", category: "Testing", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 161 },
      { title: "Launch marketplace with initial vendors", description: "Success Metrics:\n✅ 50+ verified vendors onboarded\n✅ 1000+ products in catalog\n✅ Marketing launch campaign executed\n✅ Customer acquisition strategy deployed\n✅ Vendor success metrics tracked\n✅ Platform GMV target $50k+ monthly\n✅ Customer satisfaction score >4.5/5", category: "Marketing", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 168 }
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
      { title: "Design course and user architecture", description: "Success Metrics:\n✅ Multi-role database design (student/instructor/admin)\n✅ Course hierarchy and content structure\n✅ User enrollment and permission system\n✅ Scalable content delivery architecture\n✅ Progress tracking data model\n✅ Assessment and grading framework\n✅ Support for 10k+ concurrent learners", category: "Development", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 7 },
      { title: "Create instructor and student roles", description: "Success Metrics:\n✅ Role-based access control system\n✅ Instructor content creation permissions\n✅ Student enrollment and access controls\n✅ Admin management capabilities\n✅ Role switching and multi-role support\n✅ Permission inheritance and overrides\n✅ Audit trail for role changes", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 14 },
      { title: "Build course creation workflow", description: "Success Metrics:\n✅ Intuitive course builder interface\n✅ Drag-and-drop curriculum organization\n✅ Course templates and presets\n✅ Bulk content import capabilities\n✅ Course preview and testing mode\n✅ Version control for course updates\n✅ Course creation time <2 hours", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 21 },
      
      // Content Management
      { title: "Implement video upload and streaming", description: "Success Metrics:\n✅ HD video upload with compression\n✅ Adaptive bitrate streaming\n✅ Video player with speed controls\n✅ Closed captioning support\n✅ Video analytics and engagement tracking\n✅ Mobile-optimized video delivery\n✅ 99.9% video uptime and <2s load time", category: "Development", priority: "High", estimatedHours: 32, status: "Not Started", dueDateOffset: 35 },
      { title: "Create lesson and chapter system", description: "Success Metrics:\n✅ Hierarchical content organization\n✅ Lesson sequencing and prerequisites\n✅ Chapter completion tracking\n✅ Drip content scheduling\n✅ Lesson notes and resources\n✅ Cross-lesson navigation\n✅ Content structure supports 100+ lessons", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 42 },
      { title: "Build interactive content editor", description: "Success Metrics:\n✅ Rich text editor with multimedia support\n✅ Interactive elements (polls, quizzes, exercises)\n✅ Code snippet embedding and highlighting\n✅ Mathematical equation support\n✅ Collaborative editing capabilities\n✅ Content templates and reusable blocks\n✅ Editor performance with large documents", category: "Development", priority: "Medium", estimatedHours: 28, status: "Not Started", dueDateOffset: 56 },
      
      // Student Experience
      { title: "Create student dashboard", description: "Success Metrics:\n✅ Personalized learning dashboard\n✅ Course progress visualization\n✅ Upcoming assignments and deadlines\n✅ Achievement badges and certificates\n✅ Learning streak and engagement metrics\n✅ Recommended courses and content\n✅ Dashboard load time <1 second", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 63 },
      { title: "Implement progress tracking", description: "Success Metrics:\n✅ Granular progress tracking per lesson\n✅ Time spent and engagement analytics\n✅ Completion percentages and milestones\n✅ Learning path recommendations\n✅ Progress sharing and social features\n✅ Resume functionality for interrupted sessions\n✅ Real-time progress updates", category: "Development", priority: "High", estimatedHours: 18, status: "Not Started", dueDateOffset: 70 },
      { title: "Build quiz and assessment system", description: "Success Metrics:\n✅ Multiple question types (MC, essay, coding)\n✅ Automated grading and feedback\n✅ Timed assessments and proctoring\n✅ Question bank and randomization\n✅ Grade book and analytics\n✅ Retake policies and attempts\n✅ Assessment completion rate >85%", category: "Development", priority: "Medium", estimatedHours: 24, status: "Not Started", dueDateOffset: 84 },
      
      // Engagement Features
      { title: "Add discussion forums", description: "Success Metrics:\n✅ Course-specific discussion boards\n✅ Threaded conversations and replies\n✅ Instructor Q&A and office hours\n✅ Peer-to-peer help and collaboration\n✅ Forum moderation and reporting\n✅ Search and categorization\n✅ Forum engagement rate >40%", category: "Development", priority: "Medium", estimatedHours: 20, status: "Not Started", dueDateOffset: 91 },
      { title: "Create certificate generation", description: "Success Metrics:\n✅ Automated certificate creation\n✅ Customizable certificate templates\n✅ Digital signature and verification\n✅ PDF download and sharing options\n✅ Certificate validation system\n✅ Completion criteria configuration\n✅ Certificate fraud prevention", category: "Development", priority: "Medium", estimatedHours: 16, status: "Not Started", dueDateOffset: 98 },
      { title: "Implement course reviews and ratings", description: "Success Metrics:\n✅ 5-star rating system with reviews\n✅ Review moderation and approval\n✅ Instructor response to reviews\n✅ Review analytics and insights\n✅ Review-based course recommendations\n✅ Review spam and abuse prevention\n✅ Average review completion rate >30%", category: "Development", priority: "Medium", estimatedHours: 12, status: "Not Started", dueDateOffset: 105 },
      
      // Business Features
      { title: "Integrate course payment system", description: "Success Metrics:\n✅ Multiple payment method support\n✅ One-time and subscription pricing\n✅ Course bundles and discounts\n✅ Instructor revenue sharing\n✅ Automated payouts and invoicing\n✅ Payment analytics and reporting\n✅ Payment success rate >99%", category: "Development", priority: "High", estimatedHours: 20, status: "Not Started", dueDateOffset: 112 },
      { title: "Build instructor analytics", description: "Success Metrics:\n✅ Student engagement metrics\n✅ Course completion analytics\n✅ Revenue and sales tracking\n✅ Video watch time analysis\n✅ Assessment performance insights\n✅ Marketing and promotion analytics\n✅ Real-time dashboard updates", category: "Development", priority: "Medium", estimatedHours: 18, status: "Not Started", dueDateOffset: 119 },
      { title: "Launch course marketplace", description: "Success Metrics:\n✅ 100+ courses at launch\n✅ 50+ verified instructors onboarded\n✅ Course discovery and search features\n✅ Marketing campaign execution\n✅ Student acquisition strategy\n✅ 1000+ student enrollments\n✅ Platform revenue target $5k+ monthly", category: "Marketing", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 126 }
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
      { title: "Design analytics data architecture", description: "Success Metrics:\n✅ Complete data warehouse schema design\n✅ OLAP cube structure optimized for queries\n✅ Time-series data storage strategy\n✅ Scalable partitioning for 100M+ records\n✅ Data retention policies defined\n✅ Backup and disaster recovery plan\n✅ Performance benchmarks for 1TB+ datasets", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 7 },
      { title: "Set up data ingestion pipeline", description: "Success Metrics:\n✅ Real-time streaming data ingestion\n✅ Batch processing for historical data\n✅ Support for 10+ data source connectors\n✅ Data validation and error handling\n✅ Auto-scaling based on data volume\n✅ Duplicate detection and deduplication\n✅ Data lineage tracking implemented", category: "Development", priority: "High", estimatedHours: 32, status: "Not Started", dueDateOffset: 21 },
      { title: "Create multi-tenant data isolation", description: "Success Metrics:\n✅ Complete tenant data segregation\n✅ Row-level security implemented\n✅ Tenant-specific data access controls\n✅ Cross-tenant data leakage prevention\n✅ Per-tenant resource quotas\n✅ Tenant onboarding automation\n✅ 100% data isolation compliance audit", category: "Development", priority: "High", estimatedHours: 28, status: "Not Started", dueDateOffset: 28 },
      
      // Data Processing
      { title: "Build real-time data processing", description: "Success Metrics:\n✅ Sub-second data processing latency\n✅ Stream processing for live analytics\n✅ Complex event processing capabilities\n✅ Real-time aggregation computations\n✅ Horizontal scaling to 1000+ events/sec\n✅ Fault tolerance and recovery\n✅ Processing time SLA <100ms average", category: "Development", priority: "High", estimatedHours: 36, status: "Not Started", dueDateOffset: 49 },
      { title: "Implement data transformation engine", description: "Success Metrics:\n✅ Visual ETL pipeline builder\n✅ 50+ pre-built transformation functions\n✅ Custom transformation scripting support\n✅ Data type conversion and validation\n✅ Schema evolution handling\n✅ Transformation testing framework\n✅ Performance optimization tools", category: "Development", priority: "High", estimatedHours: 32, status: "Not Started", dueDateOffset: 63 },
      { title: "Create data quality monitoring", description: "Success Metrics:\n✅ Automated data quality checks\n✅ Anomaly detection algorithms\n✅ Data freshness monitoring\n✅ Completeness and accuracy metrics\n✅ Quality score dashboard\n✅ Alert system for quality issues\n✅ Historical quality trend analysis", category: "Development", priority: "Medium", estimatedHours: 20, status: "Not Started", dueDateOffset: 70 },
      
      // Visualization Engine
      { title: "Build chart and graph library", description: "Success Metrics:\n✅ 20+ chart types (bar, line, pie, heatmap, etc.)\n✅ Interactive charts with zoom/pan\n✅ Real-time chart updates\n✅ Custom chart theming support\n✅ Mobile-responsive visualizations\n✅ Chart export to PNG/SVG/PDF\n✅ Performance with 100k+ data points", category: "Development", priority: "High", estimatedHours: 40, status: "Not Started", dueDateOffset: 91 },
      { title: "Create drag-and-drop dashboard builder", description: "Success Metrics:\n✅ Intuitive drag-and-drop interface\n✅ Widget library with 30+ components\n✅ Flexible grid layout system\n✅ Dashboard templates and themes\n✅ Real-time collaboration features\n✅ Version control for dashboards\n✅ Dashboard sharing and embedding", category: "Development", priority: "High", estimatedHours: 36, status: "Not Started", dueDateOffset: 105 },
      { title: "Implement interactive filtering", description: "Success Metrics:\n✅ Cross-dashboard filter synchronization\n✅ Date range and time-based filtering\n✅ Multi-dimensional filter combinations\n✅ Filter drill-down capabilities\n✅ Saved filter presets\n✅ Filter performance <200ms response\n✅ Advanced filter query builder", category: "Development", priority: "Medium", estimatedHours: 24, status: "Not Started", dueDateOffset: 119 },
      
      // Advanced Features
      { title: "Add automated insights and alerts", description: "Success Metrics:\n✅ AI-powered anomaly detection\n✅ Automated trend analysis\n✅ Smart alert threshold recommendations\n✅ Multi-channel alert delivery (email/SMS/Slack)\n✅ Alert escalation workflows\n✅ False positive reduction algorithms\n✅ 90%+ alert accuracy rate", category: "Development", priority: "Medium", estimatedHours: 28, status: "Not Started", dueDateOffset: 133 },
      { title: "Build API for data integrations", description: "Success Metrics:\n✅ RESTful API with comprehensive documentation\n✅ GraphQL endpoint for flexible queries\n✅ SDK libraries for popular languages\n✅ Rate limiting and authentication\n✅ Webhook support for real-time updates\n✅ API versioning and backward compatibility\n✅ Enterprise-grade SLA support", category: "Development", priority: "High", estimatedHours: 24, status: "Not Started", dueDateOffset: 140 },
      { title: "Create white-label dashboard options", description: "Success Metrics:\n✅ Complete UI customization capabilities\n✅ Custom branding and logo support\n✅ Configurable color schemes and themes\n✅ Custom domain and subdomain support\n✅ Embed-friendly iframe widgets\n✅ Branded report generation\n✅ Partner portal for white-label management", category: "Development", priority: "Medium", estimatedHours: 20, status: "Not Started", dueDateOffset: 154 },
      
      // Enterprise Features
      { title: "Implement role-based access control", description: "Success Metrics:\n✅ Granular permission system\n✅ Role hierarchy and inheritance\n✅ Data-level access controls\n✅ Dashboard and report permissions\n✅ Audit trail for access changes\n✅ Integration with enterprise directories\n✅ 100% compliance with security standards", category: "Development", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 147 },
      { title: "Add enterprise SSO integration", description: "Success Metrics:\n✅ SAML 2.0 and OAuth 2.0 support\n✅ Active Directory integration\n✅ Multi-factor authentication\n✅ Automated user provisioning\n✅ Session management and timeout\n✅ SSO testing with major providers\n✅ Enterprise security compliance", category: "Development", priority: "Medium", estimatedHours: 20, status: "Not Started", dueDateOffset: 161 },
      { title: "Launch enterprise analytics platform", description: "Success Metrics:\n✅ Enterprise sales collateral created\n✅ Pricing tiers and packaging defined\n✅ Customer success onboarding process\n✅ Technical documentation complete\n✅ 5+ enterprise pilot customers\n✅ Case studies and testimonials\n✅ $100k+ ARR target achieved", category: "Marketing", priority: "High", estimatedHours: 16, status: "Not Started", dueDateOffset: 168 }
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