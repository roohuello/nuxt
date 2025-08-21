# System Patterns

## Architecture Overview
This Nuxt 4 application follows a component-based architecture with clear separation of concerns between presentation and business logic layers.

## Key Architectural Patterns

### Component Architecture
- **Smart Components (Pages/Containers)**: Handle data fetching, state management, and business logic
- **Dumb Components (Presentational)**: Receive data via props, emit events, focus on UI rendering
- **Component Hierarchy**: Follows parent-child relationships with clear data flow

### State Management
- **Pinia**: Primary state management solution
- **Pattern**: One store per feature domain
- **Usage**: Smart components interact with stores, dumb components receive data via props

### Data Fetching
- **Nuxt Composables**: useFetch, useAsyncData for SSR-aware data fetching
- **Pattern**: Data fetching in page components with prop drilling to children
- **Caching**: Leverage Nuxt's built-in caching mechanisms

### Routing
- **File-based Routing**: Pages directory structure determines routes
- **Pattern**: Index files for root routes, nested directories for nested routes
- **Dynamic Routes**: Bracket notation for dynamic parameters

## Design Patterns in Use

### Composition API Patterns
- **Reactive Declarations**: ref for primitives, reactive for objects
- **Composables**: Extract reusable logic into use-prefixed functions
- **Lifecycle Hooks**: onMounted, onUnmounted for side effect management

### SSR Patterns
- **Client-Side Guards**: process.client checks or onMounted for browser-specific code
- **Server-Safe APIs**: useFetch and useAsyncData for universal data fetching
- **Component Isolation**: ClientOnly wrapper for client-only components

### Security Patterns
- **Configuration Management**: runtimeConfig for environment-specific values
- **Input Validation**: Zod schemas for form validation
- **Sanitization**: Automatic sanitization through Vue's template interpolation

## Component Relationships
```
App (Root)
├── Pages (Route Components - Smart)
│   ├── Index Page
│   └── ... other pages
├── Components (Presentational - Dumb)
│   ├── UI Components
│   └── Layout Components
├── Composables (Reusable Logic)
└── Stores (Pinia State Management)
```

## Critical Implementation Paths

### 1. Component Development
- Follow naming conventions (PascalCase for components)
- Implement proper prop validation
- Use emit for parent-child communication
- Leverage slots for flexible composition

### 2. State Management Integration
- Create feature-specific Pinia stores
- Use storeToRefs for reactive destructuring
- Implement actions for state mutations
- Follow setup store syntax for TypeScript support

### 3. Data Flow Implementation
- Use Nuxt's data fetching composables
- Implement proper error handling
- Add loading states for better UX
- Cache data appropriately

### 4. Styling Architecture
- Centralize theme configuration in app.config.ts
- Use Nuxt UI components for consistency
- Implement dark mode support
- Follow utility-first CSS approach
