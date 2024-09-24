import { Button, Card, Col, Container, Row } from "react-bootstrap";

export default function ProductV2({ id, name, category, price, picture}) {

    function addToCart(itemId) {
        // add the item to the users cart
    }

    return (
        <Card style={{ width: '19rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card.Img variant="top" src={picture} style={{ width: '15rem', height: '15rem' }} />
            </div>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    <div style={{ display: 'flex', float: 'right' }}>
                        <Button variant="primary" onClick={() => addToCart(id)} style={{}}>Add to Cart</Button>
                    </div>
                    
                    {category}
                    <br />
                    Price: {price}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}