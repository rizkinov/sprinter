# Sprinter 🚀

A modern, Notion-style project management dashboard designed specifically for solo founders building SaaS products. Track your sprints, manage tasks, monitor progress, and stay focused on what matters most.

## ✨ Features

### 🏗️ **Multi-Project Management**
- Create and manage multiple projects simultaneously
- Collapsible sidebar with project switching
- Project-specific tasks, milestones, and analytics
- Safe project deletion with cascading cleanup

### 📋 **Advanced Task Management**
- Full CRUD operations with bulk actions
- Drag-and-drop Kanban board (To Do, In Progress, Done, Blocked)
- Priority levels (High, Medium, Low) with visual hierarchy
- 10+ task categories (Development, Design, Testing, Strategy, Finance, etc.)
- Advanced search and filtering capabilities
- Due date tracking and time estimation

### 🎯 **Intelligent Progress Tracking**
- Dynamic milestone progress based on actual task completion
- Auto-calculated status (Not Started, In Progress, Completed)
- Timeline view with progress visualization
- Smart task association within milestone timeframes

### 🏆 **Achievement System**
- Dynamic "Recent Wins" with 7 achievement types:
  - Daily task completions
  - High-priority task achievements
  - Multi-category diversity
  - Milestone completion celebrations
  - Weekly productivity streaks
  - Project completion milestones (50%, 75%, 100%)
  - First task completion for new users

### 🧠 **Focus Area Intelligence**
- 8 smart focus modes with actionable insights:
  - Urgent: Overdue tasks with immediate actions
  - Blocked: Stalled tasks with unblocking strategies
  - Today: Tasks due today with tomorrow preparation
  - Milestone: Deadline tracking with progress targets
  - High-Priority: Business-critical task emphasis
  - In-Progress: Completion-focused workflow
  - General: Progress-based guidance
  - Empty: Onboarding for new projects

### 📦 **Template System**
- 6 built-in professional SaaS templates:
  - Personal Finance SaaS (16 weeks, Intermediate)
  - CRM Platform (20 weeks, Advanced)
  - Project Management SaaS (16 weeks, Intermediate)
  - E-commerce Platform (24 weeks, Advanced)
  - Learning Management System (18 weeks, Intermediate)
  - SaaS Analytics Platform (24 weeks, Advanced)
- Template library with category filtering
- Template import/export with version 2.0 format
- AI-ready template structure for future integrations

### 📊 **Professional Export System**
- Multiple export formats: JSON, CSV, Templates
- Complete project export with metadata
- Template creation for sharing timelines
- Analytics data export for reporting

### 📈 **Analytics & Insights**
- Task status and priority distribution charts
- Time tracking overview with progress bars
- Sprint progress monitoring
- Detailed task analytics table
- Project completion tracking

### 🔐 **Enterprise Authentication & Security**
- Secure user authentication with Supabase
- Row-level security for complete data isolation
- Real-time database updates
- Multi-user support with project-specific access

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui with Radix UI primitives
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Authentication**: Supabase Auth with session management
- **Icons**: Lucide React
- **Charts**: Recharts for analytics visualization
- **Date Handling**: date-fns for date manipulation
- **File Management**: Template import/export system

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sprinter.git
   cd sprinter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor

4. **Environment setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Detailed Setup Guide

For detailed Supabase setup instructions, see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

## 📱 Usage

1. **Create an Account**: Sign up with email/password authentication
2. **Start from Template or Scratch**: 
   - Choose from 6 built-in SaaS templates, or
   - Create a custom project from scratch
3. **Multi-Project Workflow**: 
   - Manage multiple projects in collapsible sidebar
   - Switch between projects with one click
4. **Task Management**: 
   - Create tasks with 10+ categories, priorities, and due dates
   - Use advanced search and filtering
   - Perform bulk operations on multiple tasks
5. **Kanban Workflow**: Use the board to move tasks through stages
6. **Track Achievements**: Watch your "Recent Wins" update automatically
7. **Monitor Analytics**: View detailed progress and time tracking data
8. **Export & Share**: Export projects as templates or data for analysis

## 🎯 Key Accomplishments

### **Professional SaaS Templates**
- 6 comprehensive templates covering major SaaS categories
- Each template includes 15-20 detailed tasks with success metrics
- Professional completion criteria and business value metrics
- Ready-to-use project timelines from 16-24 weeks

### **Advanced Project Management**
- Multi-project architecture supporting unlimited projects
- Intelligent Focus Area system with 8 contextual modes
- Dynamic achievement tracking with 7 achievement types
- Professional export system with version 2.0 format

### **Enterprise-Ready Features**
- Row-level security ensuring complete data isolation
- Real-time updates with optimistic UI patterns
- Advanced search with multi-criteria filtering
- Bulk operations for efficient task management

### **Modern Tech Stack**
- Built on Next.js 15 with React 19
- TypeScript throughout for type safety
- Tailwind CSS 4 with shadcn/ui components
- Supabase backend with PostgreSQL

## 🎨 Design Philosophy

Sprinter follows a clean, monochromatic design inspired by Notion:

- **Minimal Color Palette**: Primarily grayscale with strategic color use for status indicators
- **Clear Hierarchy**: Typography and spacing create intuitive information architecture  
- **Functional Beauty**: Every element serves a purpose while maintaining aesthetic appeal
- **Consistent Interactions**: Familiar patterns for editing, navigation, and data entry

## 🏗 Project Structure

```
sprinter/
├── src/
│   ├── app/                      # Next.js app directory
│   │   ├── globals.css          # Global styles  
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Main dashboard (4600+ lines)
│   ├── components/              # Reusable UI components
│   │   ├── ui/                  # shadcn/ui components (13 components)
│   │   ├── AuthForm.tsx         # Authentication component
│   │   ├── TaskCard.tsx         # Kanban task card
│   │   ├── KanbanColumn.tsx     # Kanban column container
│   │   ├── SearchAndFilter.tsx  # Advanced search & filtering
│   │   ├── BulkActionsBar.tsx   # Bulk operations UI
│   │   ├── ConfirmationDialog.tsx # Reusable confirmation modals
│   │   ├── LoadingButton.tsx    # Loading state button
│   │   ├── LoadingOverlay.tsx   # Loading overlay component
│   │   └── ErrorBanner.tsx      # Error display component
│   ├── hooks/                   # Custom React hooks
│   │   └── useAuth.ts           # Authentication hook
│   ├── lib/                     # Utilities and services
│   │   ├── database.ts          # Database service layer
│   │   ├── dataManager.ts       # Legacy data utilities
│   │   ├── exportUtils.ts       # Export/import functionality
│   │   ├── templates.ts         # Built-in SaaS templates
│   │   ├── supabase.ts          # Supabase client
│   │   └── utils.ts             # Helper functions & icons
│   └── types/                   # TypeScript type definitions
│       └── index.ts             # Shared interfaces
├── public/                      # Static assets
│   └── *.svg                    # Icon files
├── supabase-schema.sql          # Database schema
├── SUPABASE_SETUP.md           # Setup guide
├── PROJECT_CLEANUP_AUDIT.md    # Project cleanup documentation
└── components.json             # shadcn/ui config
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Lucide](https://lucide.dev/) for the icon system
- [Tailwind CSS](https://tailwindcss.com/) for the styling system

---

**Sprinter** - Built with ❤️ for solo founders who want to ship faster and stay organized.

*A professional-grade project management system featuring multi-project support, intelligent templates, achievement tracking, and enterprise-ready architecture. Perfect for SaaS founders managing complex development timelines.*
