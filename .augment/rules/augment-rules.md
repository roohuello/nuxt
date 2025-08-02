---
type: "always_apply"
---

# Augment Development Rules

Essential coding rules optimized for AI-assisted development with Nuxt 4, Vue 3, TypeScript, and modern web practices.

# Foundation Layer

## Core Principles

- Write code like a senior full-stack developer with expertise in: Nuxt 4, Vue 3, Nuxt UI, Pinia, VueUse, Biome.js
- Always use pnpm as package manager
- Use descriptive names, keep functions small (<20 lines), follow single responsibility principle
- Leverage TypeScript's type system for code safety and maintainability
- Validate all inputs, sanitize outputs, follow security best practices

## Nuxt-Centric Modular Architecture

### Architecture Pattern for Nuxt 4 Templates

**Use the Nuxt-Centric Modular Architecture** - a hybrid approach combining layered architecture with feature-based organization, specifically designed for Nuxt 4 projects.

### Core Architecture Layers

```
📁 Presentation Layer    → UI concerns (pages, layouts, components)
📁 Business Logic Layer  → Application logic (composables, stores, middleware)
📁 Data Layer           → External data (API routes, services)
📁 Shared Layer         → Cross-cutting concerns (types, utils, constants)
📁 Feature Modules      → Complex features spanning multiple layers
```

### Recommended Folder Structure

**✅ DO:**
```
app/
├── components/              # 🎨 Presentation Layer
│   ├── ui/                 # Base UI components (buttons, forms, etc.)
│   │   ├── Button.vue
│   │   ├── Input.vue
│   │   └── Modal.vue
│   ├── layout/             # Layout-specific components
│   │   ├── Header.vue
│   │   ├── Sidebar.vue
│   │   └── Footer.vue
│   └── feature/            # Feature-specific components
│       ├── UserProfile.vue
│       └── ProductCard.vue
│
├── composables/            # 🧠 Business Logic Layer
│   ├── core/              # Core business logic
│   │   ├── useAuth.ts
│   │   ├── useValidation.ts
│   │   └── useNotifications.ts
│   ├── api/               # API interaction composables
│   │   ├── useUsers.ts
│   │   ├── useProducts.ts
│   │   └── useOrders.ts
│   └── feature/           # Feature-specific composables
│       └── useShoppingCart.ts
│
├── stores/                # 🗄️ Business Logic Layer
│   ├── core/              # Core application state
│   │   ├── auth.ts
│   │   ├── ui.ts
│   │   └── notifications.ts
│   └── feature/           # Feature-specific state
│       ├── products.ts
│       └── cart.ts
│
├── pages/                 # 🌐 Presentation Layer (Auto-routed)
├── layouts/               # 📐 Presentation Layer
├── middleware/            # 🛡️ Business Logic Layer
│
├── types/                 # 🏷️ Shared Layer
│   ├── api/               # API response types
│   │   ├── auth.ts
│   │   └── users.ts
│   ├── entities/          # Business entity types
│   │   ├── User.ts
│   │   └── Product.ts
│   └── ui/                # UI component types
│       └── components.ts
│
├── utils/                 # 🔧 Shared Layer
│   ├── validation/        # Input validation
│   │   ├── schemas.ts
│   │   └── rules.ts
│   ├── formatting/        # Data formatting
│   │   ├── dates.ts
│   │   └── currency.ts
│   └── constants/         # Application constants
│       ├── api.ts
│       └── ui.ts
│
└── features/              # 📦 Feature Modules (Complex features)
    └── authentication/
        ├── components/
        │   ├── LoginForm.vue
        │   └── RegisterForm.vue
        ├── composables/
        │   └── useAuthFlow.ts
        ├── stores/
        │   └── authFlow.ts
        ├── types/
        │   └── auth.ts
        └── utils/
            └── validation.ts

server/                    # 🖥️ Data Layer
├── api/                   # API endpoints
│   ├── auth/
│   │   ├── login.post.ts
│   │   └── logout.post.ts
│   ├── users/
│   │   ├── index.get.ts
│   │   ├── [id].get.ts
│   │   └── [id].patch.ts
│   └── products/
├── middleware/            # Server middleware
├── utils/                 # Server utilities
│   ├── validation.ts
│   ├── auth.ts
│   └── database.ts
└── types/                 # Server-side types
    ├── api.ts
    └── database.ts
```

### Implementation Examples

**✅ DO:**
```typescript
// Presentation Layer - pages/users/[id].vue
<template>
  <UContainer>
    <UserProfile
      :user="user"
      :loading="loading"
      @update="handleUpdate"
    />
  </UContainer>
</template>

<script setup lang="ts">
// Auto-imported composables and types
const route = useRoute()
const { user, loading, updateUser } = useUsers()

// Fetch user data
await user.fetchById(route.params.id as string)

const handleUpdate = async (userData: UpdateUserInput) => {
  await updateUser(userData)
}
</script>

// Business Logic Layer - composables/api/useUsers.ts
export const useUsers = () => {
  const usersStore = useUsersStore()

  const fetchById = async (id: string) => {
    const { data } = await $fetch<User>(`/api/users/${id}`)
    usersStore.setCurrentUser(data)
    return data
  }

  const updateUser = async (userData: UpdateUserInput) => {
    const updated = await $fetch<User>(`/api/users/${userData.id}`, {
      method: 'PATCH',
      body: userData
    })
    usersStore.updateUser(updated)
    return updated
  }

  return {
    user: computed(() => usersStore.currentUser),
    loading: computed(() => usersStore.loading),
    fetchById,
    updateUser
  }
}

// Data Layer - server/api/users/[id].patch.ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody<UpdateUserInput>(event)

  // Validate input
  const validatedData = validateUpdateUser(body)

  // Update user in database
  const updatedUser = await updateUserInDatabase(id, validatedData)

  return { data: updatedUser }
})

// Shared Layer - types/entities/User.ts
export interface User {
  readonly id: UserId
  name: string
  email: Email
  role: 'admin' | 'user' | 'moderator'
  createdAt: Date
}

export type CreateUserInput = Omit<User, 'id' | 'createdAt'>
export type UpdateUserInput = Partial<Pick<User, 'name' | 'email'>>
```

### Key Architecture Benefits

**✅ DO:**
```typescript
// 1. Leverage Nuxt 4 auto-imports effectively
// composables/core/useAuth.ts - Auto-imported everywhere
export const useAuth = () => {
  const authStore = useAuthStore() // Auto-imported store
  const router = useRouter() // Auto-imported Nuxt composable

  return {
    user: computed(() => authStore.user),
    login: authStore.login,
    logout: async () => {
      await authStore.logout()
      await router.push('/login')
    }
  }
}

// 2. Clear separation of concerns
// pages/dashboard.vue - Only presentation logic
<template>
  <DashboardLayout>
    <UserStats :stats="userStats" />
    <RecentActivity :activities="activities" />
  </DashboardLayout>
</template>

<script setup lang="ts">
// Business logic delegated to composables
const { userStats } = useUserStats()
const { activities } = useRecentActivity()
</script>

// 3. Feature modules for complex functionality
// features/authentication/composables/useAuthFlow.ts
export const useAuthFlow = () => {
  const authStore = useAuthStore()
  const { validateCredentials } = useAuthValidation()
  const { trackAuthEvent } = useAuthAnalytics()

  const loginWithFlow = async (credentials: LoginCredentials) => {
    const validation = validateCredentials(credentials)
    if (!validation.success) return validation

    const result = await authStore.login(credentials)
    await trackAuthEvent('login_attempt', { success: result.success })

    return result
  }

  return { loginWithFlow }
}

// 4. Type safety across all layers
// types/api/auth.ts
export interface LoginCredentials {
  email: Email
  password: string
}

export interface AuthResponse {
  user: User
  token: string
  expiresAt: Date
}

// 5. Scalable patterns
// Small projects: Use basic layer structure
// Medium projects: Add feature folders within layers
// Large projects: Use full feature modules
// Enterprise: Extend with micro-frontend patterns
```

**❌ DON'T:**
```typescript
// Don't mix concerns across layers
// pages/users.vue - BAD: Direct API calls in presentation
<script setup lang="ts">
const users = await $fetch('/api/users') // Should use composable
</script>

// Don't bypass the architecture
// components/UserCard.vue - BAD: Direct store access
<script setup lang="ts">
const authStore = useAuthStore()
authStore.user = newUser // Should use composable action
</script>

// Don't create circular dependencies
// composables/useUsers.ts - BAD: Importing from features
import { useAuthFlow } from '~/features/auth/composables/useAuthFlow'
```

### Migration and Scaling Patterns

**✅ DO:**
```typescript
// Phase 1: Basic layer organization
app/
├── components/
├── composables/
├── stores/
├── pages/
└── types/

// Phase 2: Add feature-specific folders
app/
├── components/
│   ├── ui/
│   └── feature/
├── composables/
│   ├── core/
│   └── api/
└── stores/
    ├── core/
    └── feature/

// Phase 3: Full feature modules for complex features
app/
├── features/
│   └── authentication/
│       ├── components/
│       ├── composables/
│       ├── stores/
│       └── types/
└── [existing structure]

// Phase 4: Enterprise patterns
app/
├── features/
│   ├── user-management/    # Micro-frontend module
│   ├── billing/           # Micro-frontend module
│   └── analytics/         # Micro-frontend module
└── shared/                # Shared utilities and types
```

# Development Layer

## Nuxt 4 & Vue 3 Essentials

### Auto-Imports and File-Based Routing
**✅ DO:**
```typescript
// Use auto-imported composables - no manual imports needed
const route = useRoute()
const { data: user } = await useFetch(`/api/users/${route.params.id}`)
const theme = useState('theme', () => 'light')

// File-based routing: pages/users/[id].vue
<script setup lang="ts">
definePageMeta({ title: 'User Profile', layout: 'dashboard' })
</script>
```

**❌ DON'T:**
```typescript
// Don't manually import auto-imported composables
import { useRoute, useFetch } from '#app'
import { ref } from 'vue'
```

### Nuxt UI Integration
**✅ DO:**
```typescript
// Nuxt UI components with proper TypeScript
<template>
  <UCard>
    <template #header>
      <h3 class="text-base font-semibold">User Profile</h3>
    </template>

    <UForm :schema="schema" :state="state" @submit="onSubmit">
      <UFormGroup label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>

      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" type="email" />
      </UFormGroup>

      <UButton type="submit" :loading="pending">
        Save Changes
      </UButton>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email')
})

const state = reactive({
  name: '',
  email: ''
})

const pending = ref(false)

const onSubmit = async (data: any) => {
  pending.value = true
  try {
    await $fetch('/api/users', { method: 'POST', body: data })
  } finally {
    pending.value = false
  }
}
</script>

// Dark mode with Nuxt UI
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

// Theme customization
<template>
  <UButton
    :color="isDark ? 'white' : 'black'"
    variant="solid"
    @click="colorMode.preference = isDark ? 'light' : 'dark'"
  >
    Toggle Theme
  </UButton>
</template>
```

### SSR-Safe Patterns
**✅ DO:**
```typescript
// Client-only components
<ClientOnly>
  <InteractiveChart />
  <template #fallback><div>Loading...</div></template>
</ClientOnly>

// SSR-safe state
const user = useState('user', () => null)
onMounted(() => {
  if (process.client) {
    // Browser-only code
  }
})
```

**❌ DON'T:**
```typescript
// Don't access browser APIs during SSR
const userAgent = navigator.userAgent // Error on server
const randomId = Math.random() // Hydration mismatch
```

### Composition API Patterns
**✅ DO:**
```typescript
<script setup lang="ts">
interface Props {
  userId: string
  onUpdate?: (user: User) => void
}

const props = defineProps<Props>()
const emit = defineEmits<{ update: [user: User] }>()

const user = ref<User | null>(null)
const loading = ref(false)

const fetchUser = async () => {
  loading.value = true
  try {
    const { data } = await $fetch<User>(`/api/users/${props.userId}`)
    user.value = data
  } finally {
    loading.value = false
  }
}

onMounted(fetchUser)
</script>
```

### Performance Optimization
**✅ DO:**
```typescript
// Lazy loading
const LazyChart = defineAsyncComponent(() => import('~/components/Chart.vue'))

// Efficient data fetching
const { data: posts } = await useLazyFetch('/api/posts')

// Proper caching
const { data } = await useFetch('/api/data', {
  key: 'expensive-data',
  server: true,
  default: () => []
})
```

## Image Optimization

### NuxtImg and NuxtPicture Usage
**✅ DO:**
```typescript
// Responsive images with NuxtImg
<template>
  <NuxtImg
    src="/hero-image.jpg"
    alt="Hero banner"
    width="1200"
    height="600"
    sizes="sm:100vw md:50vw lg:400px"
    :placeholder="[50, 25, 75, 5]"
    loading="lazy"
  />

  <!-- Modern format optimization -->
  <NuxtPicture
    src="/product-image.jpg"
    alt="Product showcase"
    :img-attrs="{
      class: 'rounded-lg shadow-md',
      style: 'aspect-ratio: 16/9'
    }"
    sizes="sm:100vw md:50vw lg:400px"
    format="webp,avif,jpg"
  />

  <!-- Integration with Nuxt UI -->
  <UCard>
    <template #header>
      <NuxtImg
        src="/avatar.jpg"
        alt="User avatar"
        width="40"
        height="40"
        class="rounded-full"
        :placeholder="[20, 20, 75, 5]"
      />
    </template>
    <p>User content here</p>
  </UCard>
</template>

// Dynamic image optimization
<script setup lang="ts">
interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
}

const optimizedImage = (props: ImageProps) => ({
  ...props,
  sizes: 'sm:100vw md:50vw lg:400px',
  format: 'webp,avif,jpg',
  quality: 80,
  loading: 'lazy' as const
})
</script>
```

**❌ DON'T:**
```typescript
// Don't use regular img tags for optimized images
<img src="/large-image.jpg" alt="Image" /> // No optimization

// Don't forget responsive sizing
<NuxtImg src="/image.jpg" width="1200" /> // Fixed width only
```

## SEO Optimization

### Meta Tags and Open Graph
**✅ DO:**
```typescript
// Dynamic SEO with useSeoMeta
<script setup lang="ts">
const route = useRoute()
const { data: post } = await useFetch(`/api/posts/${route.params.slug}`)

useSeoMeta({
  title: post.value?.title,
  description: post.value?.excerpt,
  ogTitle: post.value?.title,
  ogDescription: post.value?.excerpt,
  ogImage: post.value?.featuredImage,
  ogUrl: `https://example.com${route.path}`,
  twitterCard: 'summary_large_image',
  twitterImage: post.value?.featuredImage
})

// Structured data
useJsonld({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.value?.title,
  description: post.value?.excerpt,
  author: {
    '@type': 'Person',
    name: post.value?.author.name
  },
  datePublished: post.value?.publishedAt,
  image: post.value?.featuredImage
})

// Dynamic head management
useHead({
  title: computed(() => `${post.value?.title} | My Blog`),
  link: [
    {
      rel: 'canonical',
      href: `https://example.com${route.path}`
    }
  ]
})
</script>

// Sitemap generation (nuxt.config.ts)
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  }
})

// server/api/sitemap.xml.ts
export default defineEventHandler(async (event) => {
  const posts = await getPosts()

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://example.com</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${posts.map(post => `
        <url>
          <loc>https://example.com/blog/${post.slug}</loc>
          <lastmod>${post.updatedAt}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>`

  setHeader(event, 'content-type', 'application/xml')
  return sitemap
})
```

## Accessibility (a11y)

### ARIA and Semantic HTML
**✅ DO:**
```typescript
// Semantic HTML with Nuxt UI
<template>
  <main>
    <UCard>
      <template #header>
        <h1 class="text-2xl font-bold">Dashboard</h1>
      </template>

      <!-- Accessible form -->
      <UForm :schema="schema" :state="state" @submit="onSubmit">
        <UFormGroup
          label="Email Address"
          name="email"
          description="We'll never share your email"
          :error="errors.email"
        >
          <UInput
            v-model="state.email"
            type="email"
            :aria-describedby="errors.email ? 'email-error' : 'email-help'"
            :aria-invalid="!!errors.email"
          />
        </UFormGroup>

        <!-- Accessible button -->
        <UButton
          type="submit"
          :loading="pending"
          :aria-label="pending ? 'Saving changes...' : 'Save changes'"
        >
          Save
        </UButton>
      </UForm>

      <!-- Skip navigation -->
      <UButton
        variant="ghost"
        class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
        @click="skipToMain"
      >
        Skip to main content
      </UButton>

      <!-- Accessible modal -->
      <UModal
        v-model="isOpen"
        :ui="{ overlay: { background: 'bg-gray-200/75 dark:bg-gray-800/75' } }"
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <UCard>
          <template #header>
            <h2 id="modal-title">Confirm Action</h2>
          </template>
          <p id="modal-description">Are you sure you want to continue?</p>
        </UCard>
      </UModal>
    </UCard>
  </main>
</template>

<script setup lang="ts">
// Focus management
const skipToMain = () => {
  const main = document.querySelector('main')
  main?.focus()
}

// Keyboard navigation
const { escape } = useMagicKeys()
watch(escape, (pressed) => {
  if (pressed && isOpen.value) {
    isOpen.value = false
  }
})

// Screen reader announcements
const announce = (message: string) => {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', 'polite')
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message
  document.body.appendChild(announcement)

  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}
</script>
```

**❌ DON'T:**
```typescript
// Don't use divs for interactive elements
<div @click="submit">Submit</div> // Use UButton instead

// Don't forget alt text
<NuxtImg src="/chart.png" /> // Missing alt attribute

// Don't rely only on color for information
<span class="text-red-500">Error</span> // Add icon or text
```

# Quality Layer

## Biome.js Integration Patterns

### Vue-Specific Configuration
**✅ DO:**
```json
{
  "$schema": "https://biomejs.dev/schemas/2.1.1/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "lineWidth": 100
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "overrides": [
    {
      "includes": ["**/*.vue"],
      "linter": {
        "rules": {
          "correctness": {
            "noUnusedVariables": "off"
          },
          "style": {
            "useImportType": "off"
          }
        }
      }
    },
    {
      "includes": ["**/*.ts", "**/*.tsx"],
      "linter": {
        "rules": {
          "style": {
            "useImportType": "warn"
          }
        }
      }
    }
  ],
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "asNeeded"
    }
  },
  "assist": {
    "enabled": true,
    "actions": {
      "source": {
        "organizeImports": "on"
      }
    }
  }
}
```

**Key Biome.js Vue Integration Points:**
- **Disable noUnusedVariables for Vue files**: Vue's Composition API auto-imports can trigger false positives
- **Disable useImportType for Vue files**: Vue's reactivity system conflicts with type-only imports
- **Enable useImportType for TypeScript files**: Maintain type safety in non-Vue files
- **Organize imports automatically**: Keep imports clean and sorted

```

## TypeScript Core Patterns

### Type Safety
**✅ DO:**
```typescript
// Branded types for domain safety
type UserId = string & { readonly brand: unique symbol }
type Email = string & { readonly brand: unique symbol }
type ProblemId = string & { readonly brand: unique symbol }

// Proper interfaces
interface User {
  readonly id: UserId
  name: string
  email: Email
  role: 'admin' | 'user' | 'moderator'
  createdAt: Date
}

// Type guards
const isUser = (value: unknown): value is User => {
  return typeof value === 'object' && value !== null &&
         'id' in value && 'name' in value && 'email' in value
}

// Result types for error handling
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E }

// Safe API calls with Result pattern
const safeApiCall = async <T>(fn: () => Promise<T>): Promise<Result<T>> => {
  try {
    const data = await fn()
    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error('Unknown error')
    }
  }
}

// Usage
const result = await safeApiCall(() => fetchUser(id))
if (result.success) {
  console.log(result.data.name)
} else {
  console.error(result.error.message)
}
```

**❌ DON'T:**
```typescript
// Don't use any types
const processData = (data: any): any => data.someProperty

// Don't ignore TypeScript errors
// @ts-ignore
user.nonExistentProperty = 'value'
```

### Utility Types
**✅ DO:**
```typescript
// Use utility types for transformations
type CreateUserInput = Omit<User, 'id' | 'createdAt'>
type UpdateUserInput = Partial<Pick<User, 'name' | 'email'>>

// Generic constraints
interface Repository<T> {
  findById(id: string): Promise<T | null>
  save(entity: T): Promise<T>
}
```

## Security Hardening

### Input Validation & Sanitization
**✅ DO:**
```typescript
// Comprehensive validation with Zod
import { z } from 'zod'

const UserSchema = z.object({
  name: z.string().min(1).max(100).regex(/^[a-zA-Z\s]+$/, 'Only letters and spaces allowed'),
  email: z.string().email().max(255),
  age: z.number().int().min(13).max(120),
  role: z.enum(['user', 'admin', 'moderator'])
})

const validateUserInput = (input: unknown): User => {
  try {
    return UserSchema.parse(input)
  } catch (error) {
    throw new ValidationError('Invalid user data', { cause: error })
  }
}

// File upload validation with security checks
const validateFile = (file: File): void => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp']

  // Check MIME type
  if (!allowedTypes.includes(file.type)) {
    throw new ValidationError('Invalid file type')
  }

  // Check file extension
  const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))
  if (!allowedExtensions.includes(extension)) {
    throw new ValidationError('Invalid file extension')
  }

  // Check file size
  if (file.size > maxSize) {
    throw new ValidationError('File too large')
  }

  // Check for malicious filenames
  if (file.name.includes('..') || file.name.includes('/') || file.name.includes('\\')) {
    throw new ValidationError('Invalid filename')
  }
}
```

### CSRF Protection & Rate Limiting
**✅ DO:**
```typescript
// server/middleware/security.ts
export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)

  // CSRF protection for state-changing requests
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(event.node.req.method || '')) {
    const token = getCookie(event, 'csrf-token') || getHeader(event, 'x-csrf-token')

    if (!token) {
      throw createError({
        statusCode: 403,
        statusMessage: 'CSRF token required'
      })
    }

    const isValidToken = await verifyCsrfToken(token, event)
    if (!isValidToken) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Invalid CSRF token'
      })
    }
  }

  // Rate limiting by IP
  const clientIP = getClientIP(event)
  const rateLimitKey = `rate_limit:${clientIP}:${url.pathname}`

  const rateLimitResult = await checkRateLimit(rateLimitKey, {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // 100 requests per window
    skipSuccessfulRequests: false
  })

  if (!rateLimitResult.allowed) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too Many Requests',
      headers: {
        'Retry-After': rateLimitResult.retryAfter.toString(),
        'X-RateLimit-Limit': '100',
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': rateLimitResult.resetTime.toString()
      }
    })
  }
})

// CSRF token generation
export const generateCsrfToken = async (event: H3Event): Promise<string> => {
  const token = await generateSecureToken()
  setCookie(event, 'csrf-token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 // 24 hours
  })
  return token
}
```

### Security Headers & Content Security Policy
**✅ DO:**
```typescript
// nuxt.config.ts - Comprehensive security headers
export default defineNuxtConfig({
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          // Prevent clickjacking
          'X-Frame-Options': 'DENY',

          // Prevent MIME type sniffing
          'X-Content-Type-Options': 'nosniff',

          // Enable XSS protection
          'X-XSS-Protection': '1; mode=block',

          // Strict referrer policy
          'Referrer-Policy': 'strict-origin-when-cross-origin',

          // Permissions policy
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',

          // Content Security Policy
          'Content-Security-Policy': [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Adjust as needed
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https:",
            "font-src 'self'",
            "connect-src 'self'",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'"
          ].join('; '),

          // HSTS (only in production)
          ...(process.env.NODE_ENV === 'production' && {
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
          })
        }
      }
    }
  }
})

// server/api/csrf-token.get.ts
export default defineEventHandler(async (event) => {
  const token = await generateCsrfToken(event)
  return { csrfToken: token }
})
```

### XSS Prevention & Safe Rendering
**✅ DO:**
```typescript
// Safe content rendering
const sanitizeHtml = (content: string): string => {
  // Use DOMPurify or similar library
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: []
  })
}

// Safe element creation
const createSafeElement = (tag: string, content: string): HTMLElement => {
  const element = document.createElement(tag)
  element.textContent = content // Use textContent, not innerHTML
  return element
}

// Safe API calls with CSRF protection
const secureApiCall = async (url: string, data: any, options: RequestInit = {}) => {
  // Get CSRF token from meta tag or cookie
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ||
                   document.cookie.split('; ').find(row => row.startsWith('csrf-token='))?.split('=')[1]

  return await $fetch(url, {
    ...options,
    method: 'POST',
    body: data,
    headers: {
      'X-CSRF-Token': csrfToken || '',
      'Content-Type': 'application/json',
      ...options.headers
    }
  })
}

// Input sanitization for search queries
const sanitizeSearchQuery = (query: string): string => {
  return query
    .trim()
    .replace(/[<>\"'&]/g, '') // Remove potentially dangerous characters
    .substring(0, 100) // Limit length
}
```

### Authentication Security
**✅ DO:**
```typescript
// Secure session management
const createSecureSession = async (userId: string, event: H3Event) => {
  const sessionToken = await generateSecureToken()
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

  // Store session in secure storage (database/Redis)
  await storeSession(sessionToken, {
    userId,
    expiresAt,
    ipAddress: getClientIP(event),
    userAgent: getHeader(event, 'user-agent')
  })

  // Set secure cookie
  setCookie(event, 'session-token', sessionToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60, // 24 hours
    path: '/'
  })

  return sessionToken
}

// Password security
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

const validatePassword = (password: string): boolean => {
  // Minimum 8 characters, at least one uppercase, lowercase, number, and special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}
```

**❌ DON'T:**
```typescript
// Don't render user content directly
element.innerHTML = userComment // XSS vulnerability

// Don't expose secrets in client code
const API_KEY = 'sk-1234567890abcdef' // Never hardcode secrets

// Don't trust client-side validation only
if (clientValidation.isValid) { // Always validate on server
  saveData(data)
}

// Don't use weak session management
localStorage.setItem('authToken', token) // Vulnerable to XSS

// Don't ignore security headers
// Missing CSP, HSTS, X-Frame-Options, etc.
```

## Performance & Testing Basics

### Memory Management
**✅ DO:**
```typescript
// Proper cleanup
onUnmounted(() => {
  clearInterval(intervalId)
  removeEventListener('scroll', handleScroll)
})

// Efficient data structures
const cache = new Map() // Use Map for dynamic keys
const weakCache = new WeakMap() // Auto garbage collection
```

### Async Patterns
**✅ DO:**
```typescript
// Parallel operations
const [user, posts, notifications] = await Promise.all([
  fetchUser(id),
  fetchPosts(id),
  fetchNotifications(id)
])

// Error handling with timeout
const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> => {
  const timeout = new Promise<never>((_, reject) => 
    setTimeout(() => reject(new Error('Timeout')), ms)
  )
  return Promise.race([promise, timeout])
}
```

### Testing Fundamentals
**✅ DO:**
```typescript
// Descriptive test structure
describe('UserService', () => {
  it('should create user with valid data', async () => {
    // Arrange
    const userData = { name: 'John', email: 'john@example.com' }
    
    // Act
    const result = await userService.createUser(userData)
    
    // Assert
    expect(result).toMatchObject({ name: 'John', email: 'john@example.com' })
  })
})

// Mock external dependencies
const mockRepository = {
  save: jest.fn(),
  findById: jest.fn()
} as jest.Mocked<UserRepository>
```

## Common Anti-Patterns to Avoid

**❌ DON'T:**
```typescript
// Memory leaks
const globalCache = [] // Never cleaned up
setInterval(() => {}, 1000) // Never cleared

// Security vulnerabilities
const query = `SELECT * FROM users WHERE id = '${userId}'` // SQL injection
localStorage.setItem('authToken', token) // XSS accessible

// Performance issues
const items = reactive(largeArray) // Unnecessary reactivity
watch(largeObject, callback, { deep: true }) // Expensive deep watching

// Type safety violations
const user: any = await fetchUser() // Loses type safety
// @ts-ignore
user.invalidProperty = 'value' // Suppresses errors
```

# Production Layer

## Environment & Configuration

### Secure Configuration
**✅ DO:**
```typescript
// Environment validation
const config = {
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET
}

// Validate required env vars
const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET']
const missing = requiredEnvVars.filter(key => !process.env[key])
if (missing.length > 0) {
  throw new Error(`Missing env vars: ${missing.join(', ')}`)
}

// Runtime config in Nuxt
export default defineNuxtConfig({
  runtimeConfig: {
    apiSecret: process.env.API_SECRET, // Private
    public: {
      apiBase: process.env.API_BASE // Public
    }
  }
})
```

**❌ DON'T:**
```typescript
// Don't hardcode secrets
const API_KEY = 'sk-1234567890abcdef'
const DB_PASSWORD = 'mypassword123'

// Don't expose secrets in public config
runtimeConfig: {
  public: {
    apiSecret: process.env.API_SECRET // Wrong - exposed to client
  }
}
```

### Error Handling Patterns
**✅ DO:**
```typescript
// Structured error handling
class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message)
    this.name = 'AppError'
  }
}

// Result pattern for explicit error handling
const safeApiCall = async <T>(fn: () => Promise<T>): Promise<Result<T>> => {
  try {
    const data = await fn()
    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error('Unknown error')
    }
  }
}

// Usage
const result = await safeApiCall(() => fetchUser(id))
if (result.success) {
  console.log(result.data.name)
} else {
  console.error(result.error.message)
}
```



## Pinia State Management

### Store Composition with TypeScript
**✅ DO:**
```typescript
// stores/auth.ts - Composition API store
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!user.value)

  const login = async (credentials: LoginCredentials) => {
    const { data } = await $fetch<{ user: User, token: string }>('/api/auth/login', {
      method: 'POST',
      body: credentials
    })

    user.value = data.user
    const token = useCookie('auth-token', { httpOnly: true, secure: true })
    token.value = data.token
  }

  const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    useCookie('auth-token').value = null
  }

  return { user: readonly(user), isAuthenticated, login, logout }
})

// stores/products.ts - Feature store
export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const loading = ref(false)

  const featuredProducts = computed(() => products.value.filter(p => p.featured))

  const fetchProducts = async () => {
    loading.value = true
    try {
      const { data } = await $fetch<Product[]>('/api/products')
      products.value = data
    } finally {
      loading.value = false
    }
  }

  return { products: readonly(products), loading, featuredProducts, fetchProducts }
})
```

**❌ DON'T:**
```typescript
// Don't use Options API stores in Nuxt 4
export const useAuthStore = defineStore('auth', {
  state: () => ({ user: null }) // Use Composition API instead
})

// Don't mutate state directly outside actions
const authStore = useAuthStore()
authStore.user = newUser // Use authStore.login() instead
```

### SSR-Safe Patterns
**✅ DO:**
```typescript
// plugins/auth.client.ts - Client initialization
export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  if (process.client) {
    await authStore.fetchCurrentUser()
  }
})

// composables/useAuthGuard.ts - Route protection
export const useAuthGuard = () => {
  const authStore = useAuthStore()

  const requireAuth = () => {
    if (!authStore.isAuthenticated) {
      throw createError({ statusCode: 401, statusMessage: 'Authentication required' })
    }
  }

  return { requireAuth }
}
```

## VueUse Composables

### Core Patterns and SSR-Safe Usage
**✅ DO:**
```typescript
// Essential VueUse composables
<script setup lang="ts">
// Storage with SSR safety
const theme = useLocalStorage('theme', 'light')
const searchHistory = useSessionStorage<string[]>('search-history', [])

// State management
const [isDarkMode, toggleDarkMode] = useToggle(false)
const { count, inc, dec } = useCounter(0, { min: 0, max: 100 })

// Performance optimization
const searchQuery = ref('')
const debouncedQuery = useDebouncedRef(searchQuery, 300)

// Browser APIs (client-only)
const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)
const isOnline = useOnline()
const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')

// DOM interactions
const target = ref<HTMLElement>()
const { isIntersecting } = useIntersectionObserver(target)

// Keyboard shortcuts
const { ctrl_s, escape } = useMagicKeys()
watch(ctrl_s, (pressed) => pressed && saveDocument())

// Async data management
const { state: userData, isLoading, execute } = useAsyncState(
  () => $fetch<User>(`/api/users/${route.params.id}`),
  null
)

// Auto-cleanup intervals
const { pause, resume } = useIntervalFn(() => {
  fetchLatestData()
}, 5000)

onUnmounted(() => pause())
</script>
```

**❌ DON'T:**
```typescript
// Don't use browser APIs without SSR checks
const { width } = useWindowSize() // Use with process.client check
const theme = useLocalStorage('theme') // Missing default value
```
