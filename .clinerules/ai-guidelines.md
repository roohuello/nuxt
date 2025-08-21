# AI Development Rules

Essential coding rules optimized for AI-assisted development with Nuxt 4, Vue 3, TypeScript, and modern web practices.

## General Principles

-   **Senior-Level Code:** Write clean, efficient, and maintainable code as expected from a senior full-stack developer.
-   **Clarity and Focus:** Use descriptive names for variables and functions. Keep functions small (<20 lines) and adhere to the single responsibility principle.
-   **Type Safety:** Fully leverage TypeScript's type system to build robust and maintainable code.
-   **Security First:** Validate all inputs and sanitize all outputs to prevent common vulnerabilities.
-   **Elegance over Verbosity:** Strive for concise and elegant solutions.
-   **Robustness:** Proactively address edge cases, race conditions, and potential security issues.
-   **Meaningful Comments:** Comment on the 'why' behind complex logic, not the 'what' that the code already explains.
-   **Performance Awareness:** Consider the performance implications of your code and suggest optimizations where applicable.

---

## Nuxt 4

#### **1. SSR-Safe API Access**
*   **Anti-Pattern:** Directly accessing browser-specific APIs like `window` or `document` in the main body of `<script setup>`, which causes errors during server-side rendering.
*   **Best Practice:** Guard client-side code with a `if (process.client)` check or place it within the `onMounted` lifecycle hook. For components that are purely client-side, wrap them in the `<ClientOnly>` component.

#### **2. Data Fetching**
*   **Anti-Pattern:** Using a client-side fetching library like `axios` directly in a component, which is not SSR-aware and can lead to double-fetching.
*   **Best Practice:** Use the built-in `useFetch` and `useAsyncData` composables. They provide SSR support, prevent double-fetching, and handle state management during hydration.

#### **3. Configuration and Secrets**
*   **Anti-Pattern:** Hardcoding API keys or placing secrets in the `public` section of `runtimeConfig`, which exposes them in the client-side JavaScript bundle.
*   **Best Practice:** Use `runtimeConfig` in `nuxt.config.ts`. Public keys go in `runtimeConfig.public`, while private keys for server-side use remain in the root of `runtimeConfig`.

#### **4. Image Optimization**
*   **Anti-Pattern:** Using the standard `<img>` tag for images, leading to unoptimized, slow-loading assets.
*   **Best Practice:** Use the `<NuxtImg>` and `<NuxtPicture>` components. They automatically handle resizing, format conversion, and lazy loading for optimal performance.

#### **5. SEO Meta Management**
*   **Anti-Pattern:** Manually adding meta tags in `nuxt.config.ts` for every page or ignoring them altogether.
*   **Best Practice:** Use the `useSeoMeta` composable within each page to dynamically manage title, description, and other metadata for superior SEO.

#### **6. Route Management**
*   **Anti-Pattern:** Using hardcoded URLs or `window.location` for navigation, which breaks SPA navigation and SSR.
*   **Best Practice:** Use Nuxt's `navigateTo()` composable and `<NuxtLink>` component for programmatic navigation and declarative linking.

---

## Vue 3

#### **1. Reactivity Declaration**
*   **Anti-Pattern:** Using `reactive` for primitive types (string, number, boolean), which does not work.
*   **Best Practice:** Use `ref` for all primitive values and `reactive` for objects and arrays.

#### **2. Modern `v-model`**
*   **Anti-Pattern:** Using the verbose `props` and `emits` boilerplate for creating `v-model` compatible components.
*   **Best Practice:** Use the `defineModel` macro (Vue 3.4+) for a more concise and type-safe implementation of `v-model`.

#### **3. Performance Optimization for Lists**
*   **Anti-Pattern:** Re-rendering large lists on every state change, even when their data has not changed.
*   **Best Practice:** Use the `v-memo` directive to cache a part of the template. It will only re-render if the dependencies in its array have changed.

#### **4. Shallow Reactivity for Performance**
*   **Anti-Pattern:** Using a deep `reactive` or `ref` for large, deeply nested objects where only top-level properties need to be tracked.
*   **Best Practice:** Use `shallowRef` and `shallowReactive` for large data structures to only track changes at the top level, improving performance.

#### **5. Async Component Loading**
*   **Anti-Pattern:** Manually managing loading states with `v-if` and boolean flags for asynchronous components.
*   **Best Practice:** Use the built-in `<Suspense>` component to declaratively handle loading and error states for components with an async `setup()` function.

#### **6. Composable Organization**
*   **Anti-Pattern:** Creating composables without clear input/output boundaries or mixing concerns.
*   **Best Practice:** Structure composables with clear inputs, outputs, and lifecycle management. Return objects with consistent naming patterns.

---

## Component Design & Architecture

#### **1. Component Responsibility (Smart vs. Dumb Components)**
*   **Anti-Pattern:** Creating large, monolithic components that fetch data, manage complex state, and contain intricate presentation logic.
*   **Best Practice:** Separate components by responsibility. **Smart/Container Components** (e.g., pages) handle data fetching and state management. **Dumb/Presentational Components** receive data via props, emit events, and are highly reusable.

#### **2. Prop and Event Naming**
*   **Anti-Pattern:** Using vague prop names like `data` or generic event names like `@click`.
*   **Best Practice:** Be descriptive. Name props clearly (e.g., `:users="activeUsers"`). For booleans, use names that sound like questions (e.g., `isDisabled`). Name events to describe what happened (e.g., `@user-updated`).

#### **3. Component Communication**
*   **Anti-Pattern:** Using event buses or global state for simple parent-child communication.
*   **Best Practice:** Use props for parent-to-child communication and events for child-to-parent communication. Use provide/inject for dependency injection in component hierarchies.

#### **4. Slot Design Patterns**
*   **Anti-Pattern:** Not providing fallback content for slots or using scoped slots unnecessarily.
*   **Best Practice:** Provide meaningful fallback content for slots and use scoped slots when you need to pass data from child to parent components.

---

## Custom Composables

#### **1. Reusable Logic Extraction**
*   **Anti-Pattern:** Duplicating stateful logic (e.g., API calls, form handling) across multiple components.
*   **Best Practice:** Extract any reusable, stateful logic into a custom composable. If you copy-paste more than a few lines of reactive logic, it should be a composable.

#### **2. Naming and Return Values**
*   **Anti-Pattern:** Naming composables without the `use` prefix or returning raw `ref` objects that can be mutated from anywhere.
*   **Best Practice:** Name composable files and functions with the `use` prefix (e.g., `useFormValidation.ts`). Return a `readonly` version of any state that should not be modified by the component and expose state-changing logic through returned functions.

#### **3. Composable Lifecycle Management**
*   **Anti-Pattern:** Not cleaning up event listeners, timers, or subscriptions in composables.
*   **Best Practice:** Use `tryOnScopeDispose` or `onScopeDispose` to clean up resources when the component scope is destroyed.

#### **4. Type-Safe Composables**
*   **Anti-Pattern:** Not providing proper TypeScript types for composable parameters and return values.
*   **Best Practice:** Use generics and proper typing to make composables type-safe and reusable across different contexts.

---

## Nuxt UI

#### **1. Theming and Customization**
*   **Anti-Pattern:** Overriding component styles with inline Tailwind CSS classes or scoped CSS. This approach is not reusable, ignores dark mode, and leads to style inconsistencies.
*   **Best Practice:** Centralize all component style customizations in the `app.config.ts` file. Modify the component's default appearance or create new `variants` to ensure all instances are consistent and theme-aware.

#### **2. Component Composition with Slots**
*   **Anti-Pattern:** Ignoring purpose-built named slots (like `header`, `footer`, `leading`) and instead rebuilding a component's internal structure manually within the default slot.
*   **Best Practice:** Leverage the provided named slots whenever possible. This results in cleaner, more declarative code that is easier to read and maintain.

#### **3. Icon Usage**
*   **Anti-Pattern:** Installing a separate icon library or embedding SVG code directly. This adds unnecessary dependencies and leads to an inconsistent visual style.
*   **Best Practice:** Use the powerful, built-in icon system provided by Nuxt UI. Standardize on a single icon set (e.g., Lucide) and use the `i-` prefix convention (e.g., `i-lucide-arrow-left`).

#### **4. Managing Overlays (Modals & Slideovers)**
*   **Anti-Pattern:** Managing the `v-model` state of a global modal directly within the page, making it difficult for nested components to trigger it.
*   **Best Practice:** Create a dedicated composable or a Pinia store to manage the state of global overlays. This decouples the logic, allowing any component to easily open or close a modal.

#### **5. Form Validation**
*   **Anti-Pattern:** Writing manual validation logic with complex conditional checks inside component methods.
*   **Best Practice:** Use a schema-based validation library like Zod with Nuxt UI's `<UForm>` component for declarative and type-safe validation.

#### **6. User Notifications**
*   **Anti-Pattern:** Displaying errors or success messages using inconsistent methods like `alert()`.
*   **Best Practice:** Create a dedicated composable that uses Nuxt UI's `useToast` service. This ensures all user-facing notifications are consistent and centrally managed.

#### **7. Data Display Components**
*   **Anti-Pattern:** Not leveraging Nuxt UI's built-in data components like `<UTable>`, `<UCard>`, `<UBadge>` for consistent data presentation.
*   **Best Practice:** Use Nuxt UI's data display components with proper slot customization for consistent and accessible data presentation.

#### **8. Responsive Design**
*   **Anti-Pattern:** Using custom responsive logic instead of Nuxt UI's built-in responsive utilities.
*   **Best Practice:** Leverage Nuxt UI's responsive breakpoints and components that automatically adapt to different screen sizes.

---

## Styling & Design System

#### **1. Color System & Theme Consistency**
*   **Anti-Pattern:** Using arbitrary Tailwind color utilities (`text-red-500`, `bg-blue-600`, `border-gray-300`) directly in components, which bypasses the theme system and creates inconsistency.
*   **Best Practice:** Prefer theme-based colors through Nuxt UI's theming system or CSS custom properties. Define colors in `app.config.ts` and reference them consistently.

#### **2. OKLCH Color Format**
*   **Anti-Pattern:** Using RGB, HSL, or hex color formats which have poor color accuracy and gamut limitations.
*   **Best Practice:** Always use OKLCH color format for better color accuracy, wider color gamut support, and future-proofing. OKLCH provides more consistent color appearance across different devices.

#### **3. CSS Custom Properties**
*   **Anti-Pattern:** Hardcoding design tokens (spacing, colors, typography) directly in components or using magic numbers.
*   **Best Practice:** Define all design tokens as CSS custom properties in your main CSS file. Use a consistent naming convention (e.g., `--color-primary`, `--spacing-md`, `--font-size-base`).

#### **4. Dark Mode Implementation**
*   **Anti-Pattern:** Treating light mode as default and dark mode as an afterthought, or implementing dark mode with complex CSS overrides.
*   **Best Practice:** Implement dark mode first as the default theme, with light mode as a variant. Use CSS custom properties with light/dark values and the `color-scheme` property for better system integration.

#### **5. CSS Organization Patterns**
*   **Anti-Pattern:** Writing long CSS classes, deeply nested selectors, or mixing responsive breakpoints with component styles.
*   **Best Practice:** Keep CSS classes short and descriptive. Use mobile-first responsive design. Group related styles together and separate concerns. Prefer logical CSS properties over shorthand when clarity is important.

#### **6. Component Styling Strategy**
*   **Anti-Pattern:** Overriding component styles with complex CSS or inline styles, leading to maintainability issues.
*   **Best Practice:** Style components through Nuxt UI's theming system when possible. For custom components, use CSS custom properties to make them themeable. Avoid deep component styling overrides that break encapsulation.

---

## VueUse Motion

#### **1. Performant Animations**
*   **Anti-Pattern:** Animating layout-affecting CSS properties like `width`, `height`, or `margin`, which trigger expensive browser repaints.
*   **Best Practice:** Animate hardware-accelerated properties like `transform` (e.g., `translateX`, `scale`) and `opacity` for smooth, 60fps animations.

#### **2. Complex Animation Logic**
*   **Anti-Pattern:** Trying to manage complex, multi-stage animations using only the `v-motion` directive's variants.
*   **Best Practice:** For fine-grained control, chaining, and programmatic animations, use the `useMotion` composable. Reserve the `v-motion` directive for simpler transitions.

#### **3. Accessibility in Motion**
*   **Anti-Pattern:** Forcing animations on all users, which can cause issues for those with vestibular disorders.
*   **Best Practice:** Use the `useReducedMotion` composable from VueUse to detect the user's OS-level preference and disable or simplify animations accordingly.

#### **4. Animation Performance**
*   **Anti-Pattern:** Animating too many elements simultaneously or using expensive animation properties.
*   **Best Practice:** Limit concurrent animations and use `will-change` CSS property strategically to hint to the browser about upcoming animations.

---

## Pinia State Management

#### **1. Reactive Destructuring**
*   **Anti-Pattern:** Destructuring state from a store directly (e.g., `const { myValue } = myStore`), which breaks reactivity.
*   **Best Practice:** Use `storeToRefs` to create reactive references for the properties you want to use from the store.

#### **2. State Mutations**
*   **Anti-Pattern:** Modifying state directly from a component (e.g., `store.count++`), which makes state changes untraceable.
*   **Best Practice:** Always use actions to encapsulate state mutations. For simple changes, the `$patch` method can also be used.

#### **3. Store Definition**
*   **Anti-Pattern:** Using the Options API syntax for stores, which is less flexible with TypeScript.
*   **Best Practice:** Define Pinia stores using the setup store (Composition API) syntax for superior TypeScript inference and composability.

#### **4. Store Organization**
*   **Anti-Pattern:** Creating monolithic stores that handle too many concerns.
*   **Best Practice:** Create focused, domain-specific stores. Use store modules to organize related functionality.

#### **5. Store Hydration**
*   **Anti-Pattern:** Not considering SSR hydration when storing complex state.
*   **Best Practice:** Ensure stores work correctly with SSR by properly handling hydration and avoiding client-only state in server-rendered content.

---

## Supabase

#### **1. Security and Key Management**
*   **Anti-Pattern:** Exposing the `service_role` key on the client-side or hardcoding any keys directly in components.
*   **Best Practice:** Use the `@nuxtjs/supabase` module to manage keys. All elevated-privilege operations must be done in Nuxt server routes using the `serverSupabaseClient`.

#### **2. Data Access and Row Level Security (RLS)**
*   **Anti-Pattern:** Disabling RLS on tables for convenience and relying on client-side logic to filter sensitive data.
*   **Best Practice:** Enforce RLS on all tables containing user-specific or sensitive data. Write clear security policies in your database schema.

#### **3. Real-time Subscriptions**
*   **Anti-Pattern:** Creating real-time subscriptions in `onMounted` without cleaning them up, leading to memory leaks and multiple unnecessary connections.
*   **Best Practice:** Always store the subscription channel in a variable and call `supabase.removeChannel(channel)` in the `onUnmounted` hook to properly close the connection.

#### **4. Type Safety with Database Schema**
*   **Anti-Pattern:** Manually defining TypeScript interfaces for your database tables, which quickly become outdated.
*   **Best Practice:** Use the Supabase CLI (`supabase gen types typescript`) to automatically generate TypeScript types from your database schema for end-to-end type safety.

#### **5. Authentication Patterns**
*   **Anti-Pattern:** Not handling authentication state changes properly or storing sensitive auth data in client-side stores.
*   **Best Practice:** Use Supabase's built-in auth state management and `useSupabaseUser()` composable. Handle auth state changes with proper redirect logic.

---

## TypeScript Core Patterns

#### **1. Modeling States**
*   **Anti-Pattern:** Using multiple boolean flags (e.g., `isLoading`, `isError`) to represent the state of an operation.
*   **Best Practice:** Use discriminated unions to model distinct states like `{ status: 'loading' }`, `{ status: 'success', data: T }`, and `{ status: 'error', error: E }`.

#### **2. Type Safety**
*   **Anti-Pattern:** Using `any` to bypass type errors, which sacrifices type safety.
*   **Best Practice:** Strive for strong types. Use `unknown` for values with an uncertain type and perform type guarding before use.

#### **3. Type Manipulation**
*   **Anti-Pattern:** Manually redefining entire types to make small modifications.
*   **Best Practice:** Use TypeScript's built-in utility types like `Partial<T>`, `Omit<T, K>`, and `Readonly<T>` to create new types from existing ones.

#### **4. Generic Types**
*   **Anti-Pattern:** Not using generics for reusable functions and components, leading to type duplication.
*   **Best Practice:** Use generics to create flexible, type-safe functions and components that work with multiple data types.

#### **5. Type Guards and Assertions**
*   **Anti-Pattern:** Not validating API responses or external data before using them.
*   **Best Practice:** Create type guards and validation functions to ensure external data conforms to expected types before processing.

---

## Security Essentials

#### **1. XSS Prevention**
*   **Anti-Pattern:** Using `v-html` to render user-provided content, which can execute malicious scripts.
*   **Best Practice:** Avoid `v-html`. Vue's default template interpolation (`{{ }}`) automatically sanitizes content. If you must render HTML, use a trusted sanitization library first.

#### **2. Input Validation**
*   **Anti-Pattern:** Trusting any data received from the user or external APIs on the server-side.
*   **Best Practice:** Always validate and sanitize user input on the server-side before processing it or storing it in a database.

#### **3. CSRF Protection**
*   **Anti-Pattern:** Not implementing CSRF protection for state-changing operations.
*   **Best Practice:** Use Nuxt's built-in CSRF protection or implement proper token-based validation for forms and API endpoints.

#### **4. Secure Headers**
*   **Anti-Pattern:** Not setting security headers for the application.
*   **Best Practice:** Configure security headers in `nuxt.config.ts` using the security module or server middleware.

---

## Global Error Handling

#### **1. Centralized Error Management**
*   **Anti-Pattern:** Scattering `try...catch` blocks throughout the application with `console.log` and no user feedback.
*   **Best Practice:** Create a Nuxt plugin to set a global error handler. This plugin can catch unhandled exceptions, log them to a monitoring service, and show a user-friendly toast notification.

#### **2. Server and API Errors**
*   **Anti-Pattern:** Letting API errors crash the application or fail silently.
*   **Best Practice:** Use Nuxt's `useFetch` `error` return value to gracefully handle API failures. In server routes, use the `createError` utility to send proper HTTP error responses.

#### **3. Error Boundaries**
*   **Anti-Pattern:** Not implementing error boundaries for isolated component failures.
*   **Best Practice:** Use Vue's error capture hooks or create error boundary components to prevent cascading failures.

---

## Accessibility (a11y)

#### **1. Semantic HTML**
*   **Anti-Pattern:** Using `<div>` and `<span>` for everything, simulating interactive elements like buttons or links.
*   **Best Practice:** Use semantic HTML elements for their intended purpose (`<button>`, `<a>`, `<nav>`, `<main>`). This provides built-in keyboard accessibility and screen reader support.

#### **2. Form Accessibility**
*   **Anti-Pattern:** Creating forms without associating labels with their inputs.
*   **Best Practice:** Always use the `<label>` element and connect it to its corresponding `<input>` with the `for` attribute.

#### **3. Keyboard Navigation and Focus Management**
*   **Anti-Pattern:** Building custom components that trap focus or cannot be operated with a keyboard.
*   **Best Practice:** Ensure all interactive elements are reachable and operable using the Tab key. When opening a modal, programmatically move focus into it and return focus to the triggering element when closed.

#### **4. ARIA Attributes**
*   **Anti-Pattern:** Misusing or overusing ARIA attributes, which can confuse screen readers.
*   **Best Practice:** Use ARIA attributes sparingly and only when native HTML semantics are insufficient. Follow ARIA design patterns for custom components.

---

## Performance & Testing

#### **1. Memory Management**
*   **Anti-Pattern:** Creating event listeners or timers in `onMounted` without a corresponding cleanup step.
*   **Best Practice:** In the `onMounted` hook, return a function that cleans up the side effect, or use the `onUnmounted` hook to prevent memory leaks.

#### **2. Asynchronous Operations**
*   **Anti-Pattern:** Chaining multiple `await` calls for independent asynchronous operations, causing them to run sequentially.
*   **Best Practice:** Run independent async operations in parallel using `Promise.all` to improve performance.

#### **3. Test Isolation**
*   **Anti-Pattern:** Writing tests that depend on external services like live APIs, making them slow and unreliable.
*   **Best Practice:** Mock all external dependencies. This isolates the code you are testing, making tests faster and more predictable.

#### **4. Bundle Optimization**
*   **Anti-Pattern:** Not considering bundle size or importing entire libraries when only small parts are needed.
*   **Best Practice:** Use tree-shaking, code splitting, and dynamic imports to optimize bundle size. Analyze bundle composition regularly.

#### **5. Lazy Loading**
*   **Anti-Pattern:** Loading all components and data upfront, regardless of immediate need.
*   **Best Practice:** Implement lazy loading for components, images, and data that aren't immediately required for the initial view.

---

## PWA (Progressive Web App)

#### **1. Offline Support**
*   **Anti-Pattern:** Not planning for offline scenarios or caching strategies.
*   **Best Practice:** Implement proper caching strategies using Workbox and provide offline fallbacks for critical functionality.

#### **2. Installation and Updates**
*   **Anti-Pattern:** Not handling PWA installation prompts or update notifications.
*   **Best Practice:** Implement proper installation prompt handling and notify users of available updates with graceful reload mechanisms.

#### **3. Performance Optimization**
*   **Anti-Pattern:** Not optimizing PWA for performance metrics like Lighthouse scores.
*   **Best Practice:** Regularly audit PWA performance and implement optimizations for Core Web Vitals.

---

## Tooling, Code Style, and Conventions

#### **1. Code Formatting and Linting**
*   **Rule:** Adhere strictly to the formatting and linting rules defined in the `biome.json` file. Do not introduce custom formatting or disable linting rules without team consensus.

#### **2. Package Management**
*   **Rule:** Always use `pnpm` for installing, updating, and managing all project dependencies. Do not use `npm` or `yarn`.

#### **3. Component Naming**
*   **Rule:** Use multi-word, `PascalCase` names for components. Prefix with a common base for related components (e.g., `UserProfileCard.vue`, `UserProfileEditForm.vue`).

#### **4. File Naming**
*   **Rule:** Maintain consistency:
    *   **Components:** `PascalCase.vue` (e.g., `AppHeader.vue`)
    *   **Composables/Utils:** `camelCase.ts` (e.g., `useAuth.ts`)
    *   **Pages/Layouts:** `kebab-case.vue` (e.g., `user-profile.vue`)

#### **5. Directory Structure**
*   **Rule:** Follow the established directory structure:
    *   `app/` - Application components and pages
    *   `server/` - Server routes and API endpoints
    *   `composables/` - Reusable Vue composables (when created)
    *   `stores/` - Pinia stores (when created)
    *   `assets/` - Static assets and styles

#### **6. Git Workflow**
*   **Rule:** Follow conventional commit messages and maintain clean, focused commits. Use feature branches for development work.

#### **7. Documentation**
*   **Rule:** Document complex logic, API endpoints, and architectural decisions. Keep README.md updated with setup instructions and project overview.
