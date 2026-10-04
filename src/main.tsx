import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from './components/ErrorBoundary';
import { initSourceProtection } from './utils/security';

// Initialize anti-inspection and shortcut guards for production
initSourceProtection();

// Retrieve the Convex URL from the environment with a mock fallback to prevent runtime crashes prior to local link setup
const convexUrl = import.meta.env.VITE_CONVEX_URL || "https://mock-deployment.convex.cloud";
const convex = new ConvexReactClient(convexUrl);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <ConvexProvider client={convex}>
          <App />
        </ConvexProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>,
)
