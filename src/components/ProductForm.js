import React from 'react';

const ProductForm = ({ formData, handleInputChange, handleSubmit, cancelEditing, editingProduct }) => (
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Nom du produit"
        className="w-full p-2 border rounded"
        required
      />
    </div>
    <div>
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Description"
        className="w-full p-2 border rounded"
        required
      />
    </div>
    <div>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
        placeholder="Prix"
        className="w-full p-2 border rounded"
        required
        step="0.01"
      />
    </div>
    <div className="flex space-x-4 justify-end mt-4">
      <button
        type="submit"
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        {editingProduct ? 'Mettre à jour' : 'Ajouter'}
      </button>
      <button
        type="button"
        onClick={cancelEditing}
        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
      >
        Annuler
      </button>
    </div>
  </form>
);

export default ProductForm;
