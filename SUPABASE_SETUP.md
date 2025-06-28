# Supabase Setup Guide for Solo Founder Dashboard

This guide will walk you through setting up Supabase for your Solo Founder Dashboard application.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Node.js and npm installed
- The Solo Founder Dashboard project cloned locally

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `solo-founder-dashboard`
   - **Database Password**: Choose a strong password
   - **Region**: Select the region closest to your users
5. Click "Create new project"
6. Wait for the project to be created (this takes a few minutes)

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
   - **service_role** key (also starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## Step 3: Configure Environment Variables

1. In your project root, create a `.env.local` file:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

2. Replace the placeholder values with your actual Supabase credentials
3. Make sure `.env.local` is in your `.gitignore` file (it should be by default)

## Step 4: Set Up the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the entire contents of `supabase-schema.sql` from your project
4. Paste it into the SQL editor
5. Click "Run" to execute the schema

This will create:
- `projects` table for storing project information
- `tasks` table for storing tasks
- `milestones` table for storing project milestones
- Proper indexes for performance
- Row Level Security (RLS) policies for data protection
- Automatic `updated_at` timestamp triggers

## Step 5: Configure Authentication

1. In your Supabase dashboard, go to **Authentication** → **Settings**
2. Under **Auth Providers**, make sure **Email** is enabled
3. Configure email settings:
   - **Enable email confirmations**: Turn this ON for production
   - **Enable email change confirmations**: Turn this ON
   - **Enable secure email change**: Turn this ON

### Email Templates (Optional)

You can customize the email templates in **Authentication** → **Email Templates**:
- **Confirm signup**: Sent when users register
- **Magic Link**: For passwordless login (if you enable it)
- **Change Email Address**: When users change their email
- **Reset Password**: For password recovery

## Step 6: Configure Security Settings

1. Go to **Authentication** → **Settings**
2. Under **Security**:
   - **Site URL**: Add your production domain (e.g., `https://yourdomain.com`)
   - **Redirect URLs**: Add allowed redirect URLs for auth callbacks

For development, add:
```
http://localhost:3000
```

For production, add your actual domain:
```
https://yourdomain.com
```

## Step 7: Test the Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)
4. You should see the authentication form
5. Try creating an account and signing in

## Step 8: Enable Real-time (Optional)

If you want real-time updates when data changes:

1. Go to **Database** → **Replication**
2. Enable replication for the tables you want to listen to:
   - `tasks`
   - `projects`
   - `milestones`

## Troubleshooting

### Common Issues

**"Invalid API key" error:**
- Double-check your environment variables
- Make sure you're using the correct anon key (not the service role key for client-side)
- Restart your development server after changing .env.local

**"Row Level Security" errors:**
- Make sure you're signed in
- Check that the RLS policies were created correctly
- Verify the user ID matches in your database

**Email confirmation not working:**
- Check your email spam folder
- Verify email settings in Supabase Auth
- For development, you can disable email confirmation temporarily

**Database connection errors:**
- Verify your project URL is correct
- Check that your Supabase project is running (not paused)
- Ensure your internet connection is stable

### Useful SQL Queries

**Check if tables were created:**
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

**View RLS policies:**
```sql
SELECT schemaname, tablename, policyname, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public';
```

**Check user data:**
```sql
SELECT * FROM auth.users;
```

## Production Considerations

1. **Environment Variables**: Set up proper environment variables in your hosting platform
2. **CORS**: Configure allowed origins in Supabase settings
3. **Rate Limiting**: Consider enabling rate limiting for auth endpoints
4. **Monitoring**: Set up alerts for database usage and errors
5. **Backups**: Supabase automatically backs up your database, but consider additional backup strategies
6. **SSL**: Ensure your production site uses HTTPS

## Next Steps

Once Supabase is set up:

1. The dashboard will automatically use real database storage
2. User authentication will work with email/password
3. All data will persist between sessions
4. Multiple users can have their own isolated data
5. You can view and manage data directly in the Supabase dashboard

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord Community](https://discord.supabase.com)
- [Next.js with Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

## Security Notes

- Never commit your `.env.local` file to version control
- Use the service role key only for server-side operations
- Always use the anon key for client-side operations
- Row Level Security ensures users can only access their own data
- Consider enabling MFA for your Supabase account 