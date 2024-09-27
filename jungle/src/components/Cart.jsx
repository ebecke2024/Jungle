import { useEffect, useState } from "react";
import useFetch from "./CustomHook/useFetch";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

export default function Cart() {
    const [prod1, setProd1] = useState("");
    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const [data] = useFetch(url); //Returns an array of JSON
    const handleSearch = () => {
        setUrl(`https://localhost:7080/customer/${prod1}`);
    };

    async function deleteCart(value) {
        // Simple DELETE request with fetch
        await fetch(`https://localhost:7080/api/Cart/${value}`, { method: 'DELETE' });
    }

    return (
        <div>
            <Container>
            <br/>
            <input
                type="number"
                placeholder="Enter Customer #"
                value={prod1}
                id="searchName"
                // 
                onChange={(e) => setProd1(e.target.value)}
            />
            <Button variant="primary" onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
            </Button>
            <hr/>
            <Row className="justify-content-md-center" md={2}>
            {data &&
                data.map((val, key) => {
                    return (
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Cart #{val.cartId}</Card.Title>
                                <Card.Text>
                                <p>Ordered By Customer #: {val.cartCustomerId}</p>
                                <p>Product #: {val.cartProductId}</p>
                                <p>Payment #: {val.cartPaymentId}</p>
                                <p>Quantity of Product: {val.qty}</p>
                                <p>Total Cost: {val.productTotal}</p>
                                </Card.Text>
                                <Row>
                                    <Col>
                                        <Button variant="primary" id="removedFromCart" onClick={()=>deleteCart(val.cartId)}>Remove Cart #{val.cartId}</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    )
            })}
            </Row>
        </Container>

        </div>
    );
}