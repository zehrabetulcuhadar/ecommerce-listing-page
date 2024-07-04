import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledNavbar = styled(Navbar)`
  background-color: #f8f9fa;
  height: 100px;
  padding: 10px 0;

  @media (max-width: 768px) {
    height: 80px;
    padding: 5px 0;
  }

  @media (max-width: 576px) {
    height: 70px;
    padding: 3px 0;
  }
`;

const StyledBrand = styled(Navbar.Brand)`
  display: flex;
  align-items: center;
  width: auto;
`;

const Logo = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-image: url('logo.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  margin-right: 10px;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }

  @media (max-width: 576px) {
    width: 70px;
    height: 70px;
  }
`;

const SiteName = styled.span`
  font-size: 1.3rem;
  color: #000;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 576px) {
    font-size: 1.1rem;
  }
`;

const StyledNav = styled(Nav)`
  flex-direction: row;
  margin-left: auto;
`;

const StyledNavLink = styled(Nav.Link)`
  color: #000;
  font-size: 1.2rem;
  text-decoration: none;
  margin-right: 20px;

  &:hover {
    color: #007bff;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 576px) {
    font-size: 1rem;
  }
`;


const HeaderSection = () => {
  return (
    <StyledNavbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <StyledBrand >
          <Logo as={Link} to="/" />
          <SiteName>e-commerce</SiteName>
        </StyledBrand>
        <StyledNav>
          <StyledNavLink as={Link} to="/">Home</StyledNavLink>
          <StyledNavLink as={Link} to="/products">Products</StyledNavLink>
        </StyledNav>
      </Container>
    </StyledNavbar>
  );
};

export default HeaderSection;

