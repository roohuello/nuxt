# Technology Context

## Core Technologies

### Framework
- **Nuxt 4**: Vue.js framework for universal applications
- **Vue 3**: Progressive JavaScript framework with Composition API
- **TypeScript**: Typed superset of JavaScript for enhanced development experience

### Styling
- **CSS**: Core styling language
- **Nuxt UI** (potential): Component library with Tailwind CSS integration
- **Main CSS**: Located in app/assets/css/main.css

### Package Management
- **pnpm**: Fast, disk space efficient package manager
- **package.json**: Dependency management and scripts configuration

### Development Tools
- **Biome.js**: Code formatter and linter
- **biome.json**: Configuration for code quality enforcement
- **VS Code**: Primary development environment

## Development Setup

### Prerequisites
- Node.js (version specified in package.json engines)
- pnpm package manager
- Git for version control

### Project Structure
```
├── app/                    # Application source code
│   ├── app.vue            # Root application component
│   ├── assets/            # Static assets
│   │   └── css/
│   │       └── main.css   # Global styles
│   └── pages/             # Page components (routing)
├── public/                # Static files (served directly)
├── server/                # Server-side code
│   └── api/               # API routes
├── memory-bank/           # Project documentation (current files)
├── nuxt.config.ts         # Nuxt configuration
├── app.config.ts          # Application configuration
├── tsconfig.json          # TypeScript configuration
├── biome.json             # Code quality configuration
└── package.json           # Dependencies and scripts
```

### Key Configuration Files

#### nuxt.config.ts
- Nuxt framework configuration
- Runtime configuration for environment variables
- Module integrations
- Build optimization settings

#### app.config.ts
- Application-level configuration
- Theme and UI component customization
- Global settings

#### tsconfig.json
- TypeScript compiler configuration
- Path aliases and module resolution
- Strict type checking settings

#### biome.json
- Code formatting rules
- Linting configuration
- Editor integration settings

## Dependencies Overview

### Runtime Dependencies
- **nuxt**: Core Nuxt framework
- **vue**: Vue.js core library
- **@nuxt/ui**: UI component library (if installed)

### Development Dependencies
- **typescript**: TypeScript compiler
- **@biomejs/biome**: Code quality tool
- **@types/* packages**: TypeScript definitions

## Tool Usage Patterns

### Package Management Commands
```bash
pnpm install              # Install dependencies
pnpm add <package>        # Add new dependency
pnpm remove <package>     # Remove dependency
pnpm update               # Update dependencies
```

### Development Workflow
```bash
pnpm run dev              # Start development server
pnpm run build            # Build for production
pnpm run preview          # Preview production build
pnpm run lint             # Run code quality checks
```

### Code Quality
- **Biome.js**: Automatic formatting and linting
- **TypeScript**: Compile-time type checking
- **Editor Integration**: Real-time feedback in VS Code

## Technical Constraints

### Framework Limitations
- SSR compatibility requirements
- Client-side only features need proper guards
- Routing follows file-based convention

### Performance Considerations
- Bundle size optimization
- Image optimization through NuxtImg
- Lazy loading for components and routes

### Browser Support
- Modern browser support (ES6+)
- Polyfills may be needed for older browsers
- Mobile-first responsive design approach

## Integration Points

### Potential Integrations
- **Supabase**: Backend-as-a-Service for database and auth
- **Pinia**: State management solution
- **VueUse**: Collection of Vue composition utilities
- **Nuxt Image**: Advanced image optimization
- **Nuxt SEO**: Search engine optimization tools

### API Integration
- Server routes in server/api/
- External API calls through useFetch
- Type-safe API responses with generated types
