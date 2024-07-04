import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from './CarouselImage.jsx';

const SliderSection = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch('https://dummyjson.com/image/400x200?type=webp&text=I+am+a+webp+image');
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageUrl(imageUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);
  
  return (
    <Carousel>
      {[...Array(4)].map((_, index) => ( // aynı fotoyu kullanarak 4 kez dönmek için
        <Carousel.Item key={index}>
          <CarouselImage imageUrl={imageUrl} />
          <Carousel.Caption>
            <h3>{`Slide ${index + 1} label`}</h3>
            <p>{`Description for slide ${index + 1}`}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default SliderSection