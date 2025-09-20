# RakshakApp - Punjab Disaster Preparedness Platform

A comprehensive disaster preparedness platform designed specifically for schools and colleges in Punjab. This application provides interactive maps, gamified learning experiences, virtual drills, and emergency response tools to help educational institutions prepare for various disaster scenarios.

## Features

- **Interactive Disaster Maps**: Visual representation of disaster-prone areas and evacuation routes
- **Gamified Learning**: Points, badges, and achievements to motivate students and staff
- **Virtual Drills**: Simulated emergency scenarios for practice and training
- **Emergency Tools**: Quick access to emergency contacts and procedures
- **Progress Tracking**: Monitor learning progress and drill completion rates
- **Multi-language Support**: Available in Punjabi and English

## Technologies Used

This project is built with modern web technologies:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript development
- **React 18** - Modern UI library with hooks and concurrent features
- **React Router** - Client-side routing
- **shadcn/ui** - Beautiful, accessible component library
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful icon library
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation
- **TanStack Query** - Powerful data synchronization for React

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_REPO_URL>
   cd punjab-prepared-ecosystem/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to view the application.

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── features-section.tsx
│   ├── hero-section.tsx
│   ├── navigation.tsx
│   └── sidebar.tsx
├── pages/              # Main application pages
│   ├── Auth.tsx
│   ├── Dashboard.tsx
│   ├── Index.tsx
│   └── NotFound.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── assets/             # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Deployment

The application can be deployed to any static hosting service:

- **Vercel**: `npm run build` and deploy the `dist` folder
- **Netlify**: Connect your repository and use `npm run build` as build command
- **GitHub Pages**: Use GitHub Actions to build and deploy
- **AWS S3**: Upload the `dist` folder contents to an S3 bucket

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please contact the RakshakApp team or create an issue in this repository.