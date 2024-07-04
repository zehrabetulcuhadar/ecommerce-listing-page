/*
  dummyjson.com dan ürünleri ve ayrıntılarını almak için
  tüm ürünleri - id ye göre ürünü - fiyat aralığına göre ürünleri getirmeyi sağlar
*/

import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

const ProductService = {
  async getProducts() {
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      const products = response.data.products;
      const categories = [...new Set(products.map(product => product.category))]; // Extract unique categories

      return { products, categories };
    } catch (error) {
      console.error('Error fetching products:', error.message);
      throw new Error('Error fetching products. Please try again later.');
    }
  },
  async getProductById(id) {
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      return response.data; // Assuming API returns product data
    } catch (error) {
      throw new Error(`Error fetching product: ${error.message}`);
    }
  },
  async getProductsByPriceRange(min, max) {
    try {
      const response = await axios.get(`${BASE_URL}/products?min_price=${min}&max_price=${max}`);
      const products = response.data.products;
      return { products };
    } catch (error) {
      console.error(`Error fetching products in price range ${min}-${max}:`, error.message);
      throw new Error(`Error fetching products in price range ${min}-${max}. Please try again later.`);
    }
  },
};

export default ProductService;
