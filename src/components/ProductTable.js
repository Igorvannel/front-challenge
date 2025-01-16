import React from 'react';

const ProductTable = ({ products, startEditing, openDeleteModal }) => {
  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left p-4 font-semibold">Nom</th>
            <th className="text-left p-4 font-semibold">Description</th>
            <th className="text-left p-4 font-semibold">Prix</th>
            <th className="text-right p-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="p-4">{product.nom}</td>
              <td className="p-4">{product.description}</td>
              <td className="p-4">{product.prix} XAF</td>
              <td className="p-4 text-right">
                <div className="flex space-x-2 justify-end">
                  <button
                    onClick={() => startEditing(product)}
                    className="w-32 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => openDeleteModal(product)}
                    className="w-32 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Copywriting Signature en bas du tableau */}
      <div className="text-center p-4 mt-6 text-gray-600 font-medium">
        <p>"Challenge CRUD Product."</p>
        <p className="mt-2">– Igor Sibemou</p>
      </div>
    </div>
  );
};

export default ProductTable;
