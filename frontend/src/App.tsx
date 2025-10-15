import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home/Home'
import Prices from './pages/Prices/Prices';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
        </Routes>
        <Footer />
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
