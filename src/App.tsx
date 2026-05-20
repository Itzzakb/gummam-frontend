import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { PageLayout } from './components/layout/PageLayout';
import { ListingProjects } from './pages/ListingProjects';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="search" element={<ListingProjects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
