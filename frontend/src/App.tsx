import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home/Home'
import Prices from './pages/Prices/Prices';
import Login from './pages/Admin/Login';
import { queryClient } from './api/queryClient';
import RedirectIfLogged from './auth/RedirectIfLogged';
import ProtectedRoute from './auth/ProtectRoute';
import AuthProvider from './auth/AuthProvider';

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prices" element={<Prices />} />

            <Route
              path="/login"
              element={
                <RedirectIfLogged>
                  <Login />
                </RedirectIfLogged>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <h1 className='text-red-400'>ADMIN PAGE</h1>
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter >
  )
}

export default App
