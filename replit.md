# Arie Capital Onboarding Journey

## Overview

Arie Capital Onboarding Journey is a full-stack corporate account application platform that guides financial institutions through a multi-stage onboarding process. The application features a step-by-step workflow for collecting entity information, governance details, business operations, financial data, and compliance documentation. It includes real-time AI-powered compliance verification through an integrated chat agent that analyzes submissions and provides guidance throughout the application process.

The platform is designed with a professional, banking-appropriate tone and visual identity, featuring a clean card-based UI with progress tracking and document verification status indicators.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, utilizing a single-page application (SPA) architecture with client-side routing via Wouter.

**UI Component System**: Built on shadcn/ui components (Radix UI primitives) with a custom design system based on the "new-york" style. Components are highly composable and follow atomic design principles with path aliases for organized imports (`@/components`, `@/lib`, `@/hooks`).

**Styling Approach**: TailwindCSS with a custom theme extending the base configuration. The design system uses CSS variables for theming with a defined color palette (Navy #002b5c, Cyan #00a0df, Silver #b3c0c9) specified in the design guidelines. The application supports both light and dark modes through HSL color variables.

**Animation Strategy**: Framer Motion for page transitions, progress indicators, and interactive elements. Key animations include card flips, fade effects, progress bar "merging droplets" metaphor, and confetti celebration on completion.

**State Management**: React Query (@tanstack/react-query) handles server state with custom query client configuration. Application state flows through a multi-step form workflow where each stage maintains its own local state before persisting to the backend.

**Form Architecture**: Five distinct page components represent application stages:
1. EntityInformation - Company registration and contact details
2. GovernanceOwnership - Directors and Ultimate Beneficial Owners (UBOs)
3. BusinessOperations - Business description and geographical scope
4. AccountFinancialDetails - Financial projections and transaction volumes
5. DocumentationCompliance - Document uploads and regulatory consent

Each stage validates inputs before allowing progression, with data persisted incrementally to the backend.

### Backend Architecture

**Runtime**: Node.js with Express.js framework, using ES modules (`"type": "module"`).

**API Design**: RESTful endpoints structured around application lifecycle:
- `POST /api/applications` - Initialize new application with reference number generation
- `GET /api/applications/:id` - Retrieve application state
- `POST /api/applications/:id/chat` - Interact with compliance agent
- `GET /api/applications/:id/messages` - Retrieve chat history
- Stage-specific update endpoints for incremental data persistence

**Storage Abstraction**: Interface-based storage layer (`IStorage`) with an in-memory implementation (`MemStorage`) for development. The architecture supports swapping to database-backed storage without changing business logic. All data entities (applications, agent messages) use TypeScript interfaces derived from the database schema.

**AI Integration**: OpenAI-compatible API integration through Replit's AI Integrations service. The compliance agent uses a sophisticated system prompt defining its role as a "Compliance Verification Agent" that:
- Guides applicants through each stage
- Analyzes document completeness and quality
- Assigns compliance scores (0-100) based on weighted criteria
- Provides professional, actionable feedback

The agent maintains conversation context and stage awareness to provide relevant guidance.

### Data Storage Solutions

**Database ORM**: Drizzle ORM configured for PostgreSQL with schema-first approach.

**Schema Design**: Three primary tables defined in `shared/schema.ts`:
- `users` - Authentication (username/password)
- `applications` - Core application data with JSONB columns for stage-specific data (entityData, governanceData, businessData, financialData, documentationData)
- `agentMessages` - Chat conversation history linked to applications

**Data Persistence Strategy**: JSONB columns store flexible stage-specific data, allowing the schema to accommodate varying field requirements across different application stages without rigid column definitions. This approach balances structure (for core fields like status, scores) with flexibility (for stage-specific form data).

**Connection Management**: Neon serverless PostgreSQL driver with WebSocket configuration for connection pooling. Environment variable `DATABASE_URL` must be configured for database connectivity.

### External Dependencies

**Database**: 
- Neon Serverless PostgreSQL (`@neondatabase/serverless`)
- Drizzle ORM for type-safe database queries
- Connect-pg-simple for session management (included but authentication not fully implemented)

**AI Services**:
- OpenAI API accessed through Replit AI Integrations (environment variables: `AI_INTEGRATIONS_OPENAI_BASE_URL`, `AI_INTEGRATIONS_OPENAI_API_KEY`)
- Used for compliance agent conversational AI and document analysis

**UI Component Libraries**:
- Radix UI primitives for accessible, unstyled components
- Framer Motion for animations
- React Hook Form with Zod resolvers for form validation
- Lucide React for consistent iconography

**Development Tools**:
- Vite for frontend build tooling and development server
- TypeScript for type safety across the stack
- esbuild for backend bundling in production

**Styling Dependencies**:
- TailwindCSS with PostCSS for utility-first styling
- class-variance-authority (cva) for component variant management
- clsx and tailwind-merge for conditional class composition

**Notable Architectural Decisions**:

1. **Hybrid Storage Approach**: The codebase includes both in-memory storage (for quick development/testing) and database schema definitions, allowing flexible deployment modes.

2. **Monorepo Structure**: Shared TypeScript types between client and server via `@shared` path alias ensures type safety across the full stack.

3. **Progressive Enhancement**: The application workflow enforces sequential completion of stages, with validation at each step before progression.

4. **Design System Consistency**: Design guidelines document (design_guidelines.md) serves as single source of truth for visual language, ensuring consistency between design intent and implementation.

5. **Admin Dashboard**: Separate `/admin` route provides oversight view of all applications with filtering, search, and status tracking capabilities.