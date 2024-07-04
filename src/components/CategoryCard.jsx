import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CategoryCard = ({ category, isSelected, onClick, index }) => {
  const cardHeight = 150; 
  const overlap = -40; // kartların örtüşme miktarı

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1100);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1100);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div
      className={`category-card ${isSelected ? 'selected' : ''}`}
      style={{
        position: isMobile ? 'static' : 'relative',
        top: isMobile ? '0' : isSelected ? + overlap : 0, // seçili kartın diğerlerinin üzerine çıkması için pozisyon ayarı
        left: isMobile ? '0' : index * overlap + 'px', // kartların yatayda birbirlerine göre pozisyonu birbirlerinin biraz üstünde durması için overlap
        width: isMobile ? '45%' : '120px', 
        height: isMobile ? '100px' : `${cardHeight}px`, 
        backgroundColor: isSelected ? '#007bff' : '#f8f9fa', // seçili ve seçili olmayan kartların arka plan rengi
        borderRadius: '10px',
        textAlign: 'center',
        lineHeight: isMobile ? '100px' : `${cardHeight}px`, // kart içeriğini dikey hizalamak için
        cursor: 'pointer',
        zIndex: isSelected ? 2 : 1, // seçilen kartın z-index'i diğerlerinden daha büyük olacak
        boxShadow: isSelected && !isMobile ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : '0px 2px 4px rgba(0, 0, 0, 0.1)', 
        background: isSelected ? 'linear-gradient(to bottom, #008b80, #55b26f)' : 'linear-gradient(to bottom, rgba(255, 255, 255), rgba(255, 255, 255))', 
      }}
      whileHover={!isMobile ? {
        top: isSelected ? + overlap + 10 : 0, // seçilen ve seçili olmayan kartların yukarı doğru hafif hareketi
        zIndex: isSelected ? 3 : 2, // üzerine gelindiğinde diğerlerinin üzerinde kalacak
        scale: 1.05, 
        transition: { duration: 0.1 },
        background: 'linear-gradient(to bottom, #b2d7d0, #add9c5)',
      } : {}}
      whileTap={!isMobile ? {
        top: isSelected ? -overlap + 15 : 0, // tıklandığında hafif yukarı hareket
      } : {}}
      onClick={onClick}
    >
      {category}
    </motion.div>
  );
};

export default CategoryCard;