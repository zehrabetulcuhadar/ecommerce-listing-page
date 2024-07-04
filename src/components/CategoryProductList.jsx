import React, { useState, useEffect, useRef } from 'react';
import ProductService from '../services/ProductService';
import ProductCard from './ProductCard';
import '../assets/styles/CategoryProductList.css';
import { getMaxRating } from '../utils/ProductUtils';

/*
  Seçilen kategoriye göre o kategorideki ürünleri gösterir
  Ürünleri göstermek için ProductCard bileşenini kullanıyor
*/

const CategoryProductList = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const productListRef = useRef(null);
  const maxRating = getMaxRating(products);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const { products } = await ProductService.getProducts();
        let filteredProducts;
        if (selectedCategory === 'Show All') {
          filteredProducts = products;
        } else {
          filteredProducts = products.filter(product => product.category === selectedCategory);
        }
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (products.length > 0 && animateOut) {
      setAnimateOut(false);
      setTimeout(() => {
        setProducts([]);
        fetchProducts();
      }, 500);
    } else {
      fetchProducts();
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (products.length > 0 && !animateOut) {
      if (productListRef.current) {
        setTimeout(() => {
          productListRef.current.classList.add('animate-in');
        }, 100);
      }
    }
  }, [products, animateOut]);

  const handleAnimationEnd = () => {
    if (productListRef.current) {
      productListRef.current.classList.remove('animate-in');
    }
  };

  const handleCategoryChange = () => {
    if (products.length > 0) {
      setAnimateOut(true);
    } else {
      setAnimateOut(false);
    }
  };

  function capitalizeFirstLetter(string) { // ilk harfini büyük yapma
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <div className="CategoryProductList">
      <h2><span style={{ color: '#a3ceb9', padding: '5px 35px 5px 25px', background: '#1c1c1c'}}>{capitalizeFirstLetter(selectedCategory)}</span></h2>
      <div
        className={`product-list ${loading ? 'loading' : ''} ${animateOut ? 'animate-out' : ''}`}
        ref={productListRef}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="product-flex">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} className="ProductCard" style={{ animationDelay: `${index * 0.1}s` }} maxRating={maxRating} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryProductList;