import React, { useState, useEffect } from 'react';
import CategoryCard from './CategoryCard';
import ProductService from '../services/ProductService';
import '../assets/styles/CategoriesSection.css';

const CategoriesSection = ({ onSelectCategory, onShowAll }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { categories } = await ProductService.getProducts();
        setCategories(categories);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === 'Show All') {
      onShowAll();
    } else {
      onSelectCategory(category);
    }
  };

  const allCategories = ['Show All', ...categories];

  return (
    <div className="categories-section">
      <div className="header-section">
        <h2>Categories</h2>
      </div>
      <div className="category-cards-container">
        <div className="cards">
          {allCategories.map((category, index) => (
            <CategoryCard
              key={index}
              category={category}
              isSelected={category === selectedCategory}
              onClick={() => handleCategoryClick(category)}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
