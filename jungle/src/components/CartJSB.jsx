import { useState, useEffect } from "react";
import useFetch from "./CustomHook/useFetch";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

export default function Cart(image) {
    const [prod1, setProd1] = useState("");
    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(false);


    
    const [customerId, setCustomerId] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const CART_API_URL = "https://localhost:7080/customer";

    // Fetch CustomerID/CustomerName from sessionStorage
    useEffect(() => {
        const storedCustomerId = sessionStorage.getItem('customerId');
        const storedCustomerName = sessionStorage.getItem('customerName');

        if (storedCustomerId) {
            setCustomerId(storedCustomerId);  // Set customerId from sessionStorage
        }

        if (storedCustomerName) {
            setCustomerName(storedCustomerName);  // Set customerName from sessionStorage
        }

        fetchCartItemsPerId();
    }, []);

    const fetchCartItemsPerId = async () => {
        try {   
          const response = await fetch(`${CART_API_URL}/${customerId}`);
          const data = await response.json();
          setCartItems(data);
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      };

      
    const [data] = useFetch(url); //Returns an array of JSON
    const handleSearch = () => {
        setUrl(`https://localhost:7080/customer/${prod1}`);
    };

    return (
            <Container style={{backgroundColor: 'white', padding: '20px' }}>
            <br/>
            {/* <input
                type="number"
                placeholder="Enter Customer #"
                value={prod1}
                id="searchName"
                // 
                onChange={(e) => setProd1(e.target.value)}
            />
            <Button variant="primary" onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
            </Button> */}
            <hr/>

            <Row className="justify-content-md-center" md={2}>
            {cartItems &&
                cartItems.map((val) => {
                    return (
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Cart #{val.cartId}</Card.Title>
                                <Card.Text>
                                <p>Ordered By Customer #: {val.cartCustomerId}</p>
                                <p>Ordered by: {customerName}</p>
                                <p>Product #: {val.cartProductId}</p>
                                <p>Payment #: {val.cartPaymentId}</p>
                                <p>Quantity of Product: {val.qty}</p>
                                <p>Total Cost: {val.productTotal}</p>
                                </Card.Text>
                                <Row>
                                    <Col>
                                        <Button variant="primary" id="removedFromCart" onClick="()">Remove From Cart</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    )
            })}
            </Row>
        </Container>
    );
}
