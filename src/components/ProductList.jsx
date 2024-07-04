import React, { useEffect, useState } from 'react';
import ProductService from '../services/ProductService';
import ProductCard from './ProductCard';
import '../assets/styles/ProductList.css';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountDown, faSortAmountUp, faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import { getMaxRating } from '../utils/ProductUtils';
import PagePreloader from './PagePreloader';

/*
  Başta tüm ürünler listelenir
  Sıralama ve fiyata göre filtreleme 
  Sayfa başına belli sayıda ürün göstermek için sayfalama (pagination)
*/

const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .sort-options {
    display: flex;
    flex-wrap: wrap;
  }

  .sort-option {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #6fbe6b;
    transition: color 0.3s ease;
    padding: 5px;
    margin-right: 15px;

    &:hover {
      color: #a6d145;
    }

    svg {
      margin-right: 5px;
    }
  }

  .price-range-dropdown {
    position: relative;
    .sort-option {
      position: relative;
    }
  }

  .price-range-checkbox {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    border: 1px solid #ccc;
    padding: 10px;
    z-index: 10;
    width: 200px;
  }

  .price-range-dropdown:hover .price-range-checkbox {
    display: block;
  }

  @media (max-width: 768px) {
    .sort-options {
      flex-direction: column;
    }
  }
`;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [sortType, setSortType] = useState('');
  const maxRating = getMaxRating(products);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { products } = await ProductService.getProducts();
        setProducts(products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  const applyFiltersAndSort = (products) => {
    let updatedProducts = [...products];

    if (selectedPriceRanges.length > 0) {
      updatedProducts = updatedProducts.filter(product =>
        selectedPriceRanges.some(range =>
          product.price >= range.min && product.price < range.max
        )
      );
    }

    if (sortType === 'price_asc') {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === 'price_desc') {
      updatedProducts.sort((a, b) => b.price - a.price);
    } else if (sortType === 'rating_desc') {
      updatedProducts.sort((a, b) => b.rating - a.rating);
    } else if (sortType === 'createdAt_desc') {
      updatedProducts.sort((a, b) => new Date(b.meta.createdAt) - new Date(a.meta.createdAt));
    }

    return updatedProducts;
  };

  const handleSortChange = (selectedSort) => {
    setSortType(selectedSort);
  };

  const handlePriceRangeToggle = (min, max, checked) => {
    let updatedRanges = [...selectedPriceRanges];

    if (checked) {
      updatedRanges.push({ min, max });
    } else {
      updatedRanges = updatedRanges.filter(
        (range) => !(range.min === min && range.max === max)
      );
    }

    setSelectedPriceRanges(updatedRanges);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredAndSortedProducts = applyFiltersAndSort(products);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const priceRanges = [
    { min: 0, max: 600 },
    { min: 600, max: 1200 },
    { min: 1200, max: 1800 },
    { min: 1800, max: 2400 },
    { min: 2400, max: 3000 }
  ];

  if (loading) {
    return <PagePreloader />;
  };

  return (
    <div className='main-container'>
      <h2 className='header'>Product List</h2>
      <FilterBar>
        <div className="sort-options">
          <div className={`sort-option ${sortType === 'price_asc' && 'active'}`} onClick={() => handleSortChange('price_asc')}>
            <FontAwesomeIcon icon={faSortAmountDown} /> Price: Low to High
          </div>
          <div className={`sort-option ${sortType === 'price_desc' && 'active'}`} onClick={() => handleSortChange('price_desc')}>
            <FontAwesomeIcon icon={faSortAmountUp} /> Price: High to Low
          </div>
          <div className={`sort-option ${sortType === 'rating_desc' && 'active'}`} onClick={() => handleSortChange('rating_desc')}>
            <FontAwesomeIcon icon={faStar} /> Rating: High to Low
          </div>
          <div className={`sort-option ${sortType === 'createdAt_desc' && 'active'}`} onClick={() => handleSortChange('createdAt_desc')}>
            <FontAwesomeIcon icon={faClock} /> Newest
          </div>
          <div className="price-range-dropdown">
            <div className="sort-option">Price Range</div>
              <div className="price-range-checkbox">
                {priceRanges.map((range, index) => (
                  <div key={index} className="sort-option">
                    <input
                      type="checkbox"
                      id={`priceRange${index}`}
                      onChange={(e) => handlePriceRangeToggle(range.min, range.max, e.target.checked)}
                      checked={selectedPriceRanges.some(r => r.min === range.min && r.max === range.max)}
                    />
                    <label htmlFor={`priceRange${index}`}>
                      {range.min.toFixed(2)} - {range.max.toFixed(2)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </FilterBar>
      <div className="container">
        <div className="row">
          {currentProducts.map((product, index) => (
            <ProductCard key={index} product={product} maxRating={maxRating} />
          ))}
        </div>
      </div>
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} of {Math.ceil(filteredAndSortedProducts.length / productsPerPage)} </span>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredAndSortedProducts.length / productsPerPage)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;

