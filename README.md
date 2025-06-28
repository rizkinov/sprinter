# Sprinter 🚀

A modern, Notion-style project management dashboard designed specifically for solo founders building SaaS products. Track your sprints, manage tasks, monitor progress, and stay focused on what matters most.

## ✨ Features

### 📊 **Dashboard Overview**
- Real-time project progress tracking with visual indicators
- Sprint-based workflow with weekly goals
- Task completion statistics and time tracking
- Clean, monochromatic design inspired by Notion

### 📋 **Task Management**
- Full CRUD operations for tasks
- Drag-and-drop Kanban board (To Do, In Progress, Done, Blocked)
- Priority levels (High, Medium, Low) with visual hierarchy
- Category organization (Development, Design, Testing, etc.)
- Time estimation and actual hours tracking

### 🎯 **Milestone Tracking**
- Dynamic milestone progress based on actual task completion
- Auto-calculated status (Not Started, In Progress, Completed)
- Timeline view with progress visualization
- Smart task association within milestone timeframes

### 📈 **Analytics & Insights**
- Task status distribution charts
- Priority distribution analysis
- Time tracking overview with progress bars
- Sprint progress monitoring
- Detailed task analytics table

### 🔐 **Authentication & Data**
- Secure user authentication with Supabase
- Row-level security for data isolation
- Real-time database updates
- User-specific project data

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Charts**: Recharts

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

1. **Create an Account**: Sign up with email/password
2. **Set Up Your Project**: Add project details and first milestone
3. **Add Tasks**: Create tasks with categories, priorities, and due dates
4. **Track Progress**: Use the Kanban board to move tasks through stages
5. **Monitor Analytics**: View detailed progress and time tracking data
6. **Manage Milestones**: Edit milestones and watch progress auto-calculate

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
│   ├── app/                 # Next.js app directory
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Main dashboard
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # shadcn/ui components
│   │   └── AuthForm.tsx   # Authentication component
│   ├── hooks/             # Custom React hooks
│   │   └── useAuth.ts     # Authentication hook
│   └── lib/               # Utilities and services
│       ├── database.ts    # Database service layer
│       ├── supabase.ts    # Supabase client
│       └── utils.ts       # Helper functions
├── supabase-schema.sql    # Database schema
├── SUPABASE_SETUP.md     # Setup guide
└── components.json       # shadcn/ui config
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

Built with ❤️ for solo founders who want to ship faster and stay organized.
