import React from 'react';
import HeaderSection from '../components/HeaderSection';
import ProductList from '../components/ProductList';
import Footer from '../components/Footer';
import styled from 'styled-components';

const PageContainer = styled.div`
  background-color: #e8e8e8;
`;

const ProductPage = () => {
  return (
    <PageContainer>
      <HeaderSection />
      <ProductList />
      <Footer />
    </PageContainer>
  );
}

export default ProductPage;
