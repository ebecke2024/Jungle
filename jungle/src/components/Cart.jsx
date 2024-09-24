import { useState } from "react";
import useFetch from "./CustomHook/useFetch";
import { Badge, Button, Container, ListGroup } from "react-bootstrap";

export default function Cart() {
    const [prod1, setProd1] = useState("");
    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const [data] = useFetch(url); //Returns an array of JSON
    const handleSearch = () => {
        setUrl(`https://localhost:7080/customer/${prod1}`);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter Product Name"
                value={prod1}
                id="searchName"
                // 
                onChange={(e) => setProd1(e.target.value)}
            />
            <Button variant="primary" onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
            </Button>
        
            <ListGroup as="ul">
                {data &&
                    data.map((val, key) => {
                        return (
                                <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">Cart #</div>
                                Number of Cart
                                </div>
                                <Badge bg="primary" pill>
                                {val.cartId}
                                </Badge>
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">Product #</div>
                                Number of Product
                                </div>
                                <Badge bg="primary" pill>
                                {val.cartProductId}
                                </Badge>
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">Customer #</div>
                                Number of Customer
                                </div>
                                <Badge bg="primary" pill>
                                {val.cartCustomerId}
                                </Badge>
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">Payment #</div>
                                Number of Payment
                                </div>
                                <Badge bg="primary" pill>
                                {val.cartPaymentId}
                                </Badge>
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">Quantity of Product</div>
                                Number of Products in Cart
                                </div>
                                <Badge bg="primary" pill>
                                {val.qty}
                                </Badge>
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">Total Cost</div>
                                Cost of Total Products in your Cart
                                </div>
                                <Badge bg="primary" pill>
                                {val.productTotal}
                                </Badge>
                            </ListGroup.Item>
                        )
                })}
            </ListGroup>
        </div>
    );
}