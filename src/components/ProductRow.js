import React from 'react';

const ProductRow = ({ product, startEditing, openDeleteModal }) => (
  <tr className="border-b">
    <td className="p-4">{product.name}</td>
    <td className="p-4">{product.description}</td>
    <td className="p-4">{product.price} €</td>
    <td className="p-4 text-right space-x-2">
      <button
        onClick={() => startEditing(product)}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Update
      </button>
      <button
        onClick={() => openDeleteModal(product)}  // Ouvrir la modale de confirmation
        className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
      >
        Delete
      </button>
    </td>
  </tr>
);

export default ProductRow;
