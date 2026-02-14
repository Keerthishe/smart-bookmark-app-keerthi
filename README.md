Smart Bookmark App is a full-stack web application built using Next.js (App Router), Supabase (PostgreSQL, Authentication, Realtime), and Tailwind CSS. It allows users to securely log in with Google OAuth, create personal bookmarks, and experience real-time updates. Row Level Security (RLS) is implemented to ensure strict user data isolation. The application is fully deployed on Vercel with secure production configuration.

Features

Google OAuth authentication

Protected dashboard

Create, read, delete bookmarks

Real-time synchronization

Secure Row Level Security (RLS)

Responsive UI using Tailwind CSS

Production deployment on Vercel

Challenges Faced & Solutions

1. Environment Variables Not Loading (supabaseUrl is required)
The issue occurred because the .env.local file was incorrectly named .env.local.txt. Renaming the file properly and restarting the server resolved the problem. Production variables were also added manually in Vercel.

2. Module Not Found Errors
The supabase.ts file was initially saved as a text document instead of a .ts file. Correcting the file extension fixed the import issue.

3. Row Level Security Policy Errors
Bookmark insert failed due to RLS restrictions. The solution was to ensure user_id: user.id was included during insert operations and to properly configure the RLS policy using auth.uid() = user_id.

4. OAuth Redirect Issues in Production
Login redirection failed after deployment because production URLs were not added to Supabase Authentication redirect settings. Adding the Vercel domain fixed the issue.

From a technical perspective, this project demonstrates full-stack capabilities including secure OAuth integration, session handling, protected client-side routes, database schema design, row-level authorization policies, asynchronous data fetching, and real-time UI synchronization using Supabase's Postgres changes listener. The frontend is styled using Tailwind CSS with a modern and responsive layout. Environment variables are managed securely for both local development and production deployment. The application is deployed on Vercel, with Supabase configured for production site URLs and redirect handling.

This project showcases practical implementation of authentication flows, database security best practices, cloud deployment, and modern React-based UI development. It serves as a strong demonstration of full-stack development skills, including frontend engineering, backend integration, authentication management, and production deployment workflow.
