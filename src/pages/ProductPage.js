import React, { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';
import Modal from '../components/Modal';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/api'; // API functions

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Fetch products on component load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name || formData.name.trim() === '') {
      alert('Le nom du produit ne peut pas être vide');
      return;
    }

    if (parseFloat(formData.price) <= 0) {
      alert('Le prix doit être un nombre positif');
      return;
    }

    // Map formData to backend field names
    const productData = {
      nom: formData.name,  // map name to nom
      description: formData.description,
      prix: parseFloat(formData.price), // map price to prix
    };

    try {
      if (editingProduct?.id) {
        // Update the product
        const updatedProduct = { ...editingProduct, ...productData };
        await updateProduct(editingProduct.id, updatedProduct);
        setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
      } else {
        // Add a new product
        const newProduct = await addProduct(productData);
        setProducts([...products, newProduct]);
      }
      closeModal();
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  const startEditing = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.nom,
      description: product.description,
      price: product.prix
    });
    setIsModalOpen(true);
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: ''
    });
    closeModal();
  };

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const removeProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(product => product.id !== id));
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: '' });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        onClick={openModal}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4"
      >
        Ajouter un produit
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-500 p-4">
          <h2 className="text-white text-xl font-semibold">Liste des Produits</h2>
        </div>

        {/* Product Table */}
        <div className="p-4">
          <ProductTable
            products={products}
            startEditing={startEditing}
            openDeleteModal={openDeleteModal}
          />
        </div>
      </div>

      {/* Modal for Product Form */}
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <ProductForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            cancelEditing={cancelEditing}
            editingProduct={editingProduct}
          />
        </Modal>
      )}

      {/* Modal for Delete Confirmation */}
      {isDeleteModalOpen && (
        <Modal closeModal={closeDeleteModal}>
          <div className="p-6 text-center">
            <h3 className="text-lg font-semibold">Êtes-vous sûr de vouloir supprimer ce produit ?</h3>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={() => removeProduct(productToDelete.id)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Supprimer
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Annuler
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProductPage;
