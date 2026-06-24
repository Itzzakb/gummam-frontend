import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { PageLayout } from './components/layout/PageLayout';
import { ListingProjects } from './pages/ListingProjects';
import { PropertyDetails } from './pages/PropertyDetails';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import { Membership } from './pages/Membership';
import { MyProfile } from './pages/MyProfile';
import { AgentList } from './pages/AgentList';
import { AgentDetails } from './pages/AgentDetails';
import { AgentProperties } from './pages/AgentProperties';
import { MapView } from './pages/MapView';
import { CrmPortal } from './pages/CrmPortal';
import { Blogs } from './pages/Blogs';
import { BlogDetails } from './pages/BlogDetails';
import { PostProperty } from './pages/PostProperty';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="search" element={<ListingProjects />} />
            <Route path="property/:id" element={<PropertyDetails />} />
            <Route path="membership" element={<Membership />} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="agents" element={<AgentList />} />
            <Route path="agent/:name" element={<AgentDetails />} />
            <Route path="agent/:name/properties" element={<AgentProperties />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blog/:id" element={<BlogDetails />} />
            <Route path="map-view" element={<MapView />} />
            <Route path="map-view/:locationParams" element={<MapView />} />
            <Route path="post-property" element={<PostProperty />} />
          </Route>
          <Route path="crm" element={<CrmPortal />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
