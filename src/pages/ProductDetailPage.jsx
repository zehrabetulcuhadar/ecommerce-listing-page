import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../services/ProductService';
import HeaderSection from '../components/HeaderSection';
import ProductDetail from '../components/ProductDetail';
import { getMaxRating } from '../utils/ProductUtils';
import Footer from '../components/Footer.jsx';
import PagePreloader from '../components/PagePreloader.jsx';

/*
  Ürünün idsine göre ayrıntılarını getirir
  ProductService kullanarak ayrıntıları ve maxraiting alır
  Getirilen veriler ile ProductDetail oluşturuluyor
*/

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [maxRating, setMaxRating] = useState(0);

  useEffect(() => {
    const fetchProductAndRatings = async () => {
      try {
        const allProducts = await ProductService.getProducts();
        const maxRatingValue = getMaxRating(allProducts);
        setMaxRating(maxRatingValue);

        const productData = await ProductService.getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product details:', error.message);
      }
    };

    fetchProductAndRatings();
  }, [id]);

  if (!product) {
      return <PagePreloader />;
  }

  return (
    <div>
      <HeaderSection />
      <ProductDetail product={product} maxRating={maxRating} />
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
