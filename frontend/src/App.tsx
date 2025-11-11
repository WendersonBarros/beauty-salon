import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home/Home'
import Prices from './pages/Prices/Prices';
import Login from './pages/Admin/Login';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
