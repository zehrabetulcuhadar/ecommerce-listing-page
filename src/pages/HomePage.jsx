import React, { useState, useEffect } from 'react';
import CategoriesSection from '../components/CategoriesSection';
import HeaderSection from '../components/HeaderSection';
import SliderSection from '../components/SliderSection';
import Footer from '../components/Footer';
import PagePreloader from '../components/PagePreloader';
import CategoryProductList from '../components/CategoryProductList';
import ProductService from '../services/ProductService';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { products, categories } = await ProductService.getProducts();
          setProducts(products);
          setCategories(categories);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false); 
        }
      };
  
      fetchData();
    }, []);
  
    const handleSelectCategory = (category) => {
      setSelectedCategory(category); 
    };
  
    const handleShowAll = () => {
      setSelectedCategory('Show All');
    };
  
    if (loading) {
      return <PagePreloader />;
    }
  
    return (
      <div className="App">
        <HeaderSection />
        <SliderSection />
        <CategoriesSection
          categories={categories}
          onSelectCategory={handleSelectCategory}
          onShowAll={handleShowAll}
        />
        {selectedCategory && <CategoryProductList selectedCategory={selectedCategory} />}
        <Footer />
      </div>
  )
}

export default HomePage