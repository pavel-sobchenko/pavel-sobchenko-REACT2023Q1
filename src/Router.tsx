import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home-page/HomePage';
import AboutPage from './pages/about-page/AboutPage';
import NotFound from './pages/not-found/NotFound';
import Header from './components/Header/Header';
import FormPage from './pages/form-page/FormPage';

function Router() {
  const [isSSR, setIsSSR] = useState(false);
  useEffect(() => {
    setIsSSR(true);
  }, []);
  return (
    isSSR && (
      <>
        <Header />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="form" element={<FormPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    )
  );
}

export default Router;
