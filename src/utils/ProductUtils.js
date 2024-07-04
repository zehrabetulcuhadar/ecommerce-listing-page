import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
// ürüneler arasındaki max puanı alır buna göre kıyaslanan ürünün yıldız derecesi hesaplanır
export const getMaxRating = (products) => {
  if (!Array.isArray(products) || products.length === 0) {
    return 0;
  }
  return Math.max(...products.map(product => product.rating));
};

export const renderStars = (rating, maxRating) => {
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
