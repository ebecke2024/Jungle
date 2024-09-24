import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';

// URL Endpoints from API
const PRODUCTS_API_URL = "https://localhost:7080/api/Products"; // Endpoint to fetch products
const ADD_TO_CART_API_URL = "https://localhost:7080/api/Cart"; // Endpoint to add products to cart
const CATEGORIES_API_URL = "https://localhost:7080/api/Products/categories" // Endpoint to fetch categories from products

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Fetch products 
  useEffect(() => {
    fetchProducts();
    fetchCategories();
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

  const fetchCategories = async () => {
    try {
      const response = await fetch(CATEGORIES_API_URL);
      const data = await response.json();
      setCategories(['All', ...data]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const addToCart = async (productId) => {
    try {
        const cartItem = {
            cartProductId: productId,
            cartCustomerId: 1, // get from session 
            cartPaymentid: 1, // get from NOT sure why this is here!!!
            qty: 1 // thus far we only add 1 to the cart
        };

        const response = await fetch(ADD_TO_CART_API_URL, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ cartItem }),  // Send details to the cart API
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

  // Function to handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

// Filter products based on the selected category
const filteredProducts = products.filter(product => 
    selectedCategory === 'All' || product.productCategory === selectedCategory
);

  return (
    <Container bacground-color="red">
      <Row className="my-4">
        <Col><h2>Our Products</h2></Col>
        <Col>
            {/* Category Dropdown Filter */}
            <Row className="mb-4">
                <Col>
                <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
                    {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                    ))}
                </Form.Select>
                </Col>
            </Row>
        </Col>
      </Row>

      <Row>
        {filteredProducts.map((product) => (
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