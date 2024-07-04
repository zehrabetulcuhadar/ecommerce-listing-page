import React from 'react'

const CarouselImage = ({ imageUrl }) => {
  return (
    <img
      className="d-block w-100"
      src={imageUrl}
      alt="Carousel slide"
      style={{ maxHeight: '500px', objectFit: 'cover' }}
    />
  )
}

export default CarouselImage