# Overview

This is a full-stack web application built with React frontend and Express backend, featuring a modern contact form submission system. The application appears to be designed as a professional website with coaching or business services focus, implementing a clean architecture with TypeScript throughout.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with a simple two-page structure (Home and NotFound)
- **UI Components**: Shadcn/ui component library built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: React Query (TanStack Query) for server state management and data fetching
- **Form Handling**: React Hook Form with Zod schema validation for type-safe form processing
- **Styling**: Tailwind CSS with custom design system variables and Google Fonts integration

## Backend Architecture
- **Framework**: Express.js with TypeScript in ESM module format
- **Database Layer**: Drizzle ORM configured for PostgreSQL with type-safe schema definitions
- **Storage Pattern**: Abstracted storage interface with in-memory implementation for development and database implementation for production
- **API Design**: RESTful endpoints with Zod validation for request/response handling
- **Development Setup**: Vite integration for hot module replacement in development mode

## Data Storage
- **Database**: PostgreSQL using Neon serverless database provider
- **ORM**: Drizzle ORM with automatic migration generation
- **Schema**: Type-safe database schemas with Zod integration for runtime validation
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple

## Authentication & Authorization
- **Session-based Authentication**: Server-side sessions stored in PostgreSQL
- **User Management**: Basic user schema with username/password authentication
- **Security**: CORS handling and secure session configuration

# External Dependencies

## Frontend Dependencies
- **UI Framework**: React with comprehensive Radix UI component ecosystem
- **Styling**: Tailwind CSS with PostCSS processing
- **Form Management**: React Hook Form with Hookform resolvers
- **Data Fetching**: TanStack React Query for server state management
- **Validation**: Zod for schema validation and type inference
- **Icons**: Lucide React icon library
- **Utilities**: Class variance authority, clsx, and tailwind-merge for styling utilities

## Backend Dependencies
- **Runtime**: Node.js with tsx for TypeScript execution
- **Database**: 
  - Neon serverless PostgreSQL (@neondatabase/serverless)
  - Drizzle ORM with PostgreSQL dialect
  - Connect-pg-simple for session storage
- **Validation**: Zod for API request/response validation
- **Build Tools**: ESBuild for production bundling

## Development Tools
- **Build System**: Vite with React plugin and runtime error overlay
- **Development Environment**: Replit-specific plugins for enhanced development experience
- **TypeScript**: Strict configuration with path mapping for clean imports
- **Code Quality**: ESLint and TypeScript compiler for code validation

## Third-party Integrations
- **Database Hosting**: Neon PostgreSQL serverless platform
- **Font Services**: Google Fonts for typography (Playfair Display, Inter)
- **Development Platform**: Replit for cloud-based development environment