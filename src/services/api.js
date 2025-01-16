import axios from 'axios';

// URL de base pour l'API (backend)
const API_URL = 'http://localhost:8070/api/products';

// Identifiants pour l'authentification
const username = 'igor';
const password = 'password123';

// Crée une fonction pour générer l'en-tête Authorization
const getAuthHeader = () => {
  return {
    'Authorization': 'Basic ' + btoa(`${username}:${password}`)
  };
};

// Fonction pour récupérer tous les produits
export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: getAuthHeader(), // Ajoute l'en-tête Authorization
    });
    return response.data;  // Retourne les produits
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    throw error;
  }
};

// Fonction pour ajouter un produit
export const addProduct = async (product) => {
  try {
    const response = await axios.post(API_URL, product, {
      headers: getAuthHeader(), // Ajoute l'en-tête Authorization
    });
    return response.data;  // Retourne le produit ajouté
  } catch (error) {
    console.error('Erreur lors de l\'ajout du produit:', error);
    throw error;
  }
};

// Fonction pour mettre à jour un produit
export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedProduct, {
      headers: getAuthHeader(), // Ajoute l'en-tête Authorization
    });
    return response.data;  // Retourne le produit mis à jour
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit:', error);
    throw error;
  }
};

// Fonction pour supprimer un produit
export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: getAuthHeader(), // Ajoute l'en-tête Authorization
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error);
    throw error;
  }
};
