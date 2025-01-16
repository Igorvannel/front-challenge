import React from 'react';
import ProductPage from './pages/ProductPage';  // Importation de la page de gestion des produits

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100"> {/* Centrer tout le contenu */}
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg"> {/* Contenu centré et avec une largeur max */}
        <ProductPage />
      </div>
    </div>
  );
};

export default App;
