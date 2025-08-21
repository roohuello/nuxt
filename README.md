# 🚀 Nuxt 4 Best Practices Template

A modern Nuxt 4 starter template demonstrating senior-level development practices, security best practices, and scalable architecture. This template provides a clean foundation with TypeScript, comprehensive documentation, and development guidelines to build production-ready applications.

## 📋 What's Included

This template comes pre-configured with:
- ⚡ **Nuxt 4** - Latest framework with advanced SSR capabilities
- 🎯 **TypeScript Support** - Full type safety and developer experience
- 🛡️ **Security-First Patterns** - Input validation and secure configuration
- 📚 **Memory Bank Documentation** - Comprehensive project documentation system
- 🏗️ **Production Ready** - Optimized build configuration and best practices
- 📦 **Package Manager** - pnpm for fast, efficient dependency management
- 🔧 **Code Quality** - Biome.js for linting and formatting

## 🛠️ Getting Started

### 1. Clone or Download This Template

**Option A: Clone with Git**
```bash
git clone <your-repository-url> my-nuxt-project
cd my-nuxt-project
```

**Option B: Download ZIP**
Download this repository as a ZIP file and extract it to your desired location.

### 2. Install Dependencies

Choose your preferred package manager and install the dependencies:

```bash
# npm
npm install

# pnpm (recommended for faster installs)
pnpm install

# yarn
yarn install

# bun (fastest option)
bun install
```

### 3. Start Development Server

Launch the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## 🎯 Customizing Your Project

### 1. Update Project Information
- [ ] Modify `package.json` with your project name, description, and author
- [ ] Update this README.md with your project-specific information
- [ ] Replace the default favicon and meta tags in `nuxt.config.ts`

### 2. Project Structure
```
your-project/
├── app/                    # Main application code
│   ├── app.vue            # Root component
│   ├── assets/css/        # Global styles
│   └── pages/             # Route components
├── server/                # Server-side code and API routes
├── memory-bank/           # Project documentation system
│   ├── projectbrief.md    # Project overview
│   ├── productContext.md  # Purpose and goals
│   ├── activeContext.md   # Current work focus
│   ├── systemPatterns.md  # Architecture patterns
│   ├── techContext.md     # Technology details
│   └── progress.md        # Development status
├── .clinerules/           # AI development guidelines
├── nuxt.config.ts         # Nuxt configuration
├── app.config.ts          # Application configuration
├── tsconfig.json          # TypeScript setup
├── biome.json             # Code quality configuration
└── package.json           # Dependencies and scripts
```

### 3. Add Your Content
- Replace the default pages in the `pages/` directory
- Add your components to the `components/` directory
- Customize layouts in the `layouts/` directory
- Configure your app settings in `nuxt.config.ts`

### 4. Development Guidelines
This template includes comprehensive development guidelines in `.clinerules/ai-guidelines.md`:
- **SSR-Safe Development** - All code must work with server-side rendering
- **Component Architecture** - Smart/dumb component separation
- **Security First** - Input validation and secure configuration
- **Performance Focus** - Optimized loading and rendering patterns
- **Type Safety** - Full TypeScript coverage with best practices

### 5. Memory Bank Documentation
The `memory-bank/` directory contains comprehensive project documentation:
- **projectbrief.md** - Project overview and requirements
- **productContext.md** - Purpose, goals, and target users
- **activeContext.md** - Current focus and next steps
- **systemPatterns.md** - Architecture and design patterns
- **techContext.md** - Technology stack and setup details
- **progress.md** - Current status and development roadmap

## 🚀 Production Deployment

### Build for Production

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

### Preview Production Build Locally

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

### Deploy Your Application
Check out the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for detailed deployment guides for various platforms including:
- Vercel
- Netlify
- AWS
- Digital Ocean
- And many more...

## 🏗️ Development Commands

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm preview          # Preview production build

# Code Quality
pnpm run lint         # Run Biome.js linting
pnpm run format       # Format code with Biome.js

# Dependencies
pnpm install          # Install dependencies
pnpm add <package>    # Add new dependency
pnpm remove <package> # Remove dependency
```

## 🎨 Key Features

- ✅ **Server-Side Rendering** - Optimized for SEO and performance
- ✅ **TypeScript Integration** - Full type safety across the application
- ✅ **Component Architecture** - Reusable, maintainable component patterns
- ✅ **State Management** - Pinia for predictable state handling
- ✅ **Security Practices** - Input validation and secure configurations
- ✅ **Accessibility** - WCAG compliant interfaces
- ✅ **Performance Optimization** - Lazy loading, code splitting, and caching
- ✅ **Developer Experience** - Hot reload, debugging tools, and clear documentation

## 📖 Learn More

- � [Nuxt Documentation](https://nuxt.com/docs/getting-started/introduction) - Learn about Nuxt features and API
- 🎓 [Nuxt Examples](https://nuxt.com/docs/examples) - Discover example applications
- 💬 [Nuxt Community](https://discord.nuxt.com) - Join the community on Discord

## 🤝 Contributing

This is a starter template meant to be customized for your specific needs. Feel free to:
- Fork this template for your own projects
- Submit issues or suggestions for improvements
- Share your projects built with this template

---

**Happy coding! 🎉** Start building something amazing with Nuxt.js!
