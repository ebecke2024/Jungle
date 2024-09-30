import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import { SearchContext } from "../App";
import ProductDetail from "./ProductDetail";
import { Link } from "react-router-dom";

// URL Endpoints from API
const PRODUCTS_API_URL = "https://localhost:7080/api/Products"; // Endpoint to fetch products
const ADD_TO_CART_API_URL = "https://localhost:7080/api/Cart"; // Endpoint to add products to cart
const CATEGORIES_API_URL = "https://localhost:7080/api/Products/categories"; // Endpoint to fetch categories from products

const ProductList = (navigation) => {

  const [products, setProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [combinedProducts, setCombinedProducts] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { searchQuery, triggerSearch } = useContext(SearchContext);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [customerId, setCustomerId] = useState(null);

  // Fetch products
  useEffect(() => {
    fetchProducts();
    fetchCategories();

    const storedCustomerId = sessionStorage.getItem("customerId");
    if (storedCustomerId) {
      setCustomerId(storedCustomerId); // Set customerId from sessionStorage
    }
  }, []);

  // update page when applying filter
  useEffect(() => {
    filterByCategory();
  }, [selectedCategory]);

  useEffect(() => {
    filterBySearch();
  }, [triggerSearch]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(PRODUCTS_API_URL);
      const data = await response.json();
      setProducts(data);
      setCombinedProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filterByCategory = () => {
    const filtered = products.filter(
      (p) => selectedCategory === "All" || p.productCategory === selectedCategory
    );
    setFilteredProducts(filtered);
    combineProducts(filtered, searchedProducts);
  };

  const filterBySearch = () => {
    const searched = products.filter((p) =>
      p.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchedProducts(searched);
    combineProducts(filteredProducts, searched);
  };

  function combineProducts(filteredProducts, searchedProducts) {
    const searchedProductIds = new Set(searchedProducts.map((p) => p.productId));
    const combined = filteredProducts.filter((filteredProduct) =>
      searchedProductIds.has(filteredProduct.productId)
    );
    
    setCombinedProducts(combined);
  }
  
  const fetchCategories = async () => {
    try {
      const response = await fetch(CATEGORIES_API_URL);
      const data = await response.json();
      setCategories(["All", ...data]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Get quantity per item
  const handleQuantityChange = (productId, value) => {
    setQuantity({
      ...quantity,
      [productId]: value, //  quantity per product ID storage
    });
  };

  const addToCart = async (productId, productPrice) => {
    try {
      const selectedQuantity = quantity[products.productId] || 1;
      const cartItem = {
        cartProductId: productId,
        cartCustomerId: customerId, // get from session
        cartPaymentId: 1, // get from NOT sure why this is here!!!
        qty: selectedQuantity, // thus far we only add 1 to the cart
        productTotal: productPrice,
      };

      const response = await fetch(ADD_TO_CART_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem), // Send details to the cart API
      });

      const data = await response.json();
      setCart([...cart, data]); //updates the cart state

      if (response.ok) {
        alert("Product added to cart!");
      } else {
        alert("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Function to handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  if (!customerId) {
    return (
      <Container style={{ align: "center" }}>
        <br />
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Login Is Required</Card.Title>
            <Card.Text>Please login to access our products!</Card.Text>
            <Button variant="primary" href="/login">
              Login
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container style={{ backgroundColor: "white", padding: "20px" }}>
      <Row className="my-4">
        <Col>
          <h2>Our Products - {customerId}</h2>
        </Col>
        <Col>
          {/* Category Dropdown Filter */}
          <Row className="mb-4">
            <Col>
              <Form.Select
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
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
        {combinedProducts.map((product) => (
          <Col key={product.productId} sm={6} md={4} lg={2} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={product.images}
                alt={product.productName}
              />
              <Card.Body>
                <Card.Title>
                  <Link to={`productdetail/${product.productId}`}>{product.productName}</Link>
                </Card.Title>
                <Card.Text>
                  {product.productCategory}
                  <br />
                  <strong>Price: ${product.productPrice}</strong>
                  <br />
                  <strong>Qty: {product.inventory}</strong>
                  <br />
                  <Form.Group>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      value={quantity[product.productId] || 1} // Default quantity is 1
                      onChange={(e) =>
                        handleQuantityChange(product.productId, e.target.value)
                      }
                    />
                  </Form.Group>
                  <br />
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() =>
                    addToCart(product.productId, product.productPrice)
                  }
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
