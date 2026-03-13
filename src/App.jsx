import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Models from './pages/Models'
import Sectors from './pages/Sectors'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import Layout from './components/Layout'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Helper component to handle scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Refresh ScrollTrigger since the content length might have changed
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modelos" element={<Models />} />
          <Route path="/sectores" element={<Sectors />} />
          <Route path="/planes" element={<Pricing />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
