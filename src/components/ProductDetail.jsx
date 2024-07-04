import React from 'react';
import { renderStars } from '../utils/ProductUtils';
import { FaHeart, FaShoppingCart, FaComment, FaUser } from 'react-icons/fa';
import '../assets/styles/ProductDetail.css';

/*
  Ürünün ayrıntılarını göstermek için (ürün sayfası gibi)
  Ürünün stok durumu, markası, teslimat süresi, eklenme tarihi ve yorumları gösteriyor ilave olarak
*/

const ProductDetail = ({ product }) => {
    const createdAtDate = new Date(product.meta.createdAt);

    // tarihin formatını okunaklı olarak değiştirme
    const formattedDate = createdAtDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className="product-detail-container">
      <div className='up-section'>
        <div className="left-section card">
          <div className="image-container">
            <img src={product.thumbnail} alt={product.title} className="card-img-top product-image" />
          </div>
          <div className="card-body product-info">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text"><strong>Price:</strong> ${product.price}</p>
            <p className="card-text"><strong>Rating:</strong> {renderStars(product.rating, 5)}</p>
            <button className="btn btn-danger favorite-button"><FaHeart className="heart-icon" /> Add to Favorites</button>
          </div>
        </div>
        <div className="right-section card">
          <div className="card-body right-info">
            <p className="card-text"><strong>Description:</strong> {product.description}</p>
            <p className="card-text"><strong>Availability:</strong> {product.availabilityStatus}</p>
            <p className="card-text"><strong>Brand:</strong> {product.brand}</p>
            <p className="card-text"><strong>Shipping Information:</strong> {product.shippingInformation}</p>
            <p className="card-text"><strong>Date Added:</strong> {formattedDate}</p>
            <button className="btn btn-success cart-button"><FaShoppingCart className="cart-icon" /> Add to Cart</button>
          </div>
        </div>
      </div>
      <div className="bottom-section">
        <div className="reviews-container">
          {product.reviews.slice(0, 3).map((review, index) => (
            <div key={index} className="card review-item">
              <div className="card-body">
                <p className="card-text"><FaUser className="user-icon" /><strong>User:</strong> {review.reviewerName}</p>
                <p className="card-text"><strong>Rating:</strong> {renderStars(review.rating, 5)}</p>
                <p className="card-text"><FaComment className="comment-icon" /><strong>Comment:</strong> {review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
