import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home/Home'
import Prices from './pages/Prices/Prices';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prices" element={<Prices />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
