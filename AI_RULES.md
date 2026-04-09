# AI Rules for Development

## Tech Stack

- **React 18.2.0** - UI library for building the application interface
- **TypeScript 5.2.2** - Type-safe JavaScript for improved developer experience and code quality
- **Vite 5.2.0** - Fast build tool and development server
- **Tailwind CSS 3.4.3** - Utility-first CSS framework for styling
- **React Router** - Client-side routing for navigation between pages
- **shadcn/ui** - Pre-built, accessible UI components built on Radix UI
- **Lucide React 0.344.0** - Icon library for consistent iconography
- **Google GenAI (@google/genai)** - AI integration for generating architectural blueprints
- **PostCSS & Autoprefixer** - CSS processing and vendor prefixing

## Library Usage Rules

### UI Components
- **ALWAYS** use shadcn/ui components when available (Button, Input, Card, Dialog, etc.)
- Do NOT modify shadcn/ui component files directly - create new components if customization is needed
- All shadcn/ui components and their dependencies are already installed

### Styling
- **ALWAYS** use Tailwind CSS for styling components
- Use Tailwind classes extensively for layout, spacing, colors, and other design aspects
- Avoid writing custom CSS files unless absolutely necessary

### Icons
- **ALWAYS** use Lucide React for icons
- Import icons from `lucide-react` package

### Routing
- **ALWAYS** use React Router for navigation
- Keep all route definitions in `src/App.tsx`
- Place page components in `src/pages/` directory

### File Structure
- Source code MUST be in the `src/` folder
- Page components go in `src/pages/`
- Reusable components go in `src/components/`
- The main/default page is `src/pages/Index.tsx`
- ALWAYS update the main page to include new components so they are visible

### TypeScript
- **ALWAYS** use TypeScript for all new code
- Define types in `src/types.ts` or in component files when appropriate
- Use type annotations for function parameters and return types

### AI Integration
- Use the `@google/genai` package for AI functionality
- AI-related services should go in `src/services/` directory
- Follow the existing pattern in `services/geminiService.ts`

### Development Workflow
- Make efficient, surgical changes - only edit files related to the user's request
- Keep solutions simple and focused - avoid over-engineering
- Prioritize creating small, focused files and components
- All changes must be FULLY FUNCTIONAL - no placeholders or partial implementations
