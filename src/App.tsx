import { BrowserRouter } from "react-router-dom";
import AppRoutes from './Routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
