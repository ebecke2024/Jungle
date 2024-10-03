import { useState, useEffect } from "react";
import useFetch from "./CustomHook/useFetch";
import { Button, Card, Col, Container, Row, Alert } from "react-bootstrap";

export default function Cart(image) {
    const [prod1, setProd1] = useState("");
    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    const [cartItems, setCartItems] = useState([]);
    const [showAlert, setShowAlert] = useState(false); // State to show/hide the alert
    const [alertMessage, setAlertMessage] = useState(''); // Alert message content
    const customerId = sessionStorage.getItem('customerId'); // Get customerId from sessionStorage
    const customerName = sessionStorage.getItem('customerName'); // Get customerName from sessionStorage
    const CART_API_URL = "https://localhost:7080/customer";
    const CART_DELETE_API_URL = "https://localhost:7080/api/Cart";


    // Fetch CustomerID/CustomerName from sessionStorage
    useEffect(() => {
        fetchCartItemsPerId();
    }, [customerId]);

    const fetchCartItemsPerId = async () => {
        try {   
            if (customerId) {
                const response = await fetch(`${CART_API_URL}/${customerId}`);
                const data = await response.json();
                setCartItems(data);
            }

        } catch (error) {
          console.error('Error fetching cart items:', error);
        } finally {
            setLoading(false);
        }
      };

    // Function to handle item removal
    const removeFromCart = async (cartId) => {
        try {
            const response = await fetch(`${CART_DELETE_API_URL}/${cartId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setCartItems(cartItems.filter(item => item.cartId !== cartId));
                setAlertMessage('Item removed from cart successfully!');
                setShowAlert(true); // Show the alert
                setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
            } else {
                setAlertMessage('Failed to remove item from cart.');
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
            }
        } catch (error) {
            console.error("Error removing item from cart:", error);
            setAlertMessage('An error occurred while removing the item.');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };
    
    if (loading) {
        return <Container style={{backgroundColor: 'white', padding: '20px' }}>Loading cart items...</Container>;
    }

    return (

        <Container style={{backgroundColor: 'white', padding: '20px' }}>
            <br />
            <h2>Cart Details for Customer {customerName}</h2>

            {showAlert && (
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                    {alertMessage}
                </Alert>
            )}

            {cartItems.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <Row className="justify-content-md-center" md={2}>
                    <br />
                    {cartItems.map((val, index) => (
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
                                        <Button variant="primary" id="removedFromCart"  onClick={() => removeFromCart(val.cartId)}>Remove From Cart</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            )}
        </Container>
    );
}
