import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';

function MainLayout({ children }) {
  return (
    <div>
      <Header />
      <Navigation />
      <main className="container mt-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;