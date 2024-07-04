import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => { // sayfanın başına dönme
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={6} lg={3}>
            <h5>Ürün Kategorileri</h5>
            <ul className="list-unstyled">
              <li><a href="#" style={{ color: '#6fbe6b', transition: 'color 0.3s ease' }}>Elektronik</a></li>
              <li><a href="#" style={{ color: '#6fbe6b', transition: 'color 0.3s ease' }}>Giyim</a></li>
              <li><a href="#" style={{ color: '#6fbe6b', transition: 'color 0.3s ease' }}>Ev ve Yaşam</a></li>
              <li><a href="#" style={{ color: '#6fbe6b', transition: 'color 0.3s ease' }}>Spor</a></li>
            </ul>
          </Col>
          <Col md={6} lg={3}>
            <h5>Hakkımızda</h5>
            <ul className="list-unstyled">
              <li><a href="#" style={{ color: '#6fbe6b', transition: 'color 0.3s ease' }}>Biz Kimiz?</a></li>
              <li><a href="#" style={{ color: '#6fbe6b', transition: 'color 0.3s ease' }}>İletişim</a></li>
              <li><a href="#" style={{ color: '#6fbe6b', transition: 'color 0.3s ease' }}>Kariyer</a></li>
            </ul>
          </Col>
          <Col md={6} lg={3}>
            <h5>Müşteri Hizmetleri</h5>
            <ul className="list-unstyled">
              <li><a href="#" style={{ color: '#6fbe6b', transition: 'color 0.3s ease' }}>Sipariş Takibi</a></li>
              <li><a href="#" style={{ color: '#6fbe6b', transition: 'color 0.3s ease' }}>İade ve Değişim</a></li>
              <li><a href="#" style={{ color: '#6fbe6b', transition: 'color 0.3s ease' }}>SSS</a></li>
            </ul>
          </Col>
          <Col md={6} lg={3}>
            <h5>Bizi Takip Edin</h5>
            <ul className="list-unstyled d-flex justify-content-around">
              <li><a href="#" style={{ color: '#6fbe6b', transition: 'color 0.3s ease' }}> 
                <FaFacebookF style={{ transition: 'color 0.3s ease' }} /></a></li>
              <li><a href="#" style={{ color: '#6fbe6b', transition: 'color 0.3s ease' }}>
                <FaTwitter style={{ transition: 'color 0.3s ease' }} /></a></li>
              <li><a href="#" style={{ color: '#6fbe6b', transition: 'color 0.3s ease' }}>
                <FaInstagram style={{ transition: 'color 0.3s ease' }} /></a></li>
            </ul>
          </Col>
        </Row>
        <hr className="bg-light" />
        <Row>
          <Col className="text-center">
            <p style={{ color: '#d8d8d8' }}>&copy; 2024 E-Ticaret Sitesi. Tüm hakları saklıdır.</p>
          </Col>
        </Row>
        <Row className="justify-content-end">
          <Col md="auto" className="text-end">
            <button className="btn btn-link" onClick={scrollToTop} style={{ position: 'fixed', right: '20px', bottom: '20px' }}>
              <FaArrowUp size={30} style={{ color: '#6fbe6b', transition: 'color 0.3s ease' }} />
            </button>
          </Col>
        </Row>
      </Container>
      <style jsx>{`
        a:hover {
          color: #c9e965 !important;
        }
        .btn-link:hover {
          color: #c9e965 !important;
        }
        .btn-link:focus {
          text-decoration: none;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
