import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home-page/HomePage';
import { AboutPage } from './pages/about-page/AboutPage';
import { NotFound } from './pages/not-found/NotFound';
import { Header } from './components/Header/Header';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    );
  }
}

export default App;