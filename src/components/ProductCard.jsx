import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShoppingCart, FaHeart, FaStar, FaRegStar } from 'react-icons/fa';
import '../assets/styles/ProductCard.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/*
  Ürünleri kartlar halinde gösterebilmek için
  Ürünün foto, başlık, fiyat, derecelendirmesi özelliklerini gösteriyor
  Kart animasyonu için Framer Motion kullanıldı
*/

const ProductCard = ({ product, maxRating }) => {
  // ürünler içerisindeki en fazla olan oyu bulup ona göre ürün değerlendirmesini hesaplama yaptım
  const renderStars = (rating, maxRating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.round((rating / maxRating) * 5)) {
        stars.push(<FaStar key={i} className="text-warning" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-warning" />);
      }
    }
    return stars;
  };  

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <Link to={{ pathname: `/products/${product.id}`, state: { product } }} className="card h-100">
          <img src={product.thumbnail} className="card-img-top product-img" alt={product.title} />
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text"><strong>${product.price}</strong></p>
            <p className="card-text">{renderStars(product.rating, maxRating)}</p>
            <div className="d-flex justify-content-between">
              <FaShoppingCart className="icon text-primary" />
              <FaHeart className="icon text-danger" />
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  )
}

export default ProductCard