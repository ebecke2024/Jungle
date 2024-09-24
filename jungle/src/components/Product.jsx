import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

// URL Endpoints from API
const PRODUCTS_API_URL = "https://localhost:7080/api/Products"; // Endpoint to fetch products
const ADD_TO_CART_API_URL = "https://localhost:7080/api/Cart"; // Endpoint to add products to cart

const ProductList = () => {
  const [products, setProducts] = useState([]);
  
  // Fetch products 
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(PRODUCTS_API_URL);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await fetch(ADD_TO_CART_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),  // Send productId to the cart API
      });

      if (response.ok) {
        alert('Product added to cart!');
      } else {
        alert('Failed to add product to cart.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <Container>
      <Row className="my-4">
        <h2>Our Products</h2>
      </Row>
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={6} md={4} lg={2} className="mb-4">
            <Card>
              <Card.Img variant="top" src={product.images} alt={product.productName} />
              <Card.Body>
                <Card.Title>{product.productName}</Card.Title>
                <Card.Text>
                  {product.productCategory}
                  <br />
                  <strong>Price: ${product.productPrice}</strong>
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => addToCart(product.productId)}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;