import { useState } from "react";
import useFetch from "./CustomHook/useFetch";
import { Card, Col, Container, Figure, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const ProductDetail = (productID) => {
  //var prod1 = document.getElementById('searchName').value;
  // var prod1 = "jeans";
  //var url = "https://localhost:7080/filter/" + prod1;

  const [prod1, setProd1] = useState("");
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const [data] = useFetch(url); //Returns an array of JSON

  prod1 = productID;
  const handleSearch = () => {
    setUrl(`https://localhost:7080/api/Products/${prod1}`);
  };

  return (
    <div>
      <Container>
        {/* <input
          type="text"
          placeholder="Enter Product Name"
          value={prod1}
          id="searchName"
          onChange={(e) => setProd1(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
        <hr/> */}
        <p>{data.productId}</p>
        {data &&
          data.map((val, key) => {
            return (
              <div key={key}>
                <Row>
                  <Col>
                <Figure>
                  <Figure.Image
                    width={500}
                    height={180}
                    alt="171x180"
                    src={val.images}
                  />
                </Figure>
                </Col>
                <Col>
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>{val.productName}</Card.Title>
                    <Card.Text>
                      <p>Product Category: {val.productCategory}</p>
                      <p>Product Price: {val.productPrice}</p>
                      <p>Product Inventory: {val.inventory}</p>
                      <p>Product ID: {val.productId}</p>
                    </Card.Text>
                    <Button variant="primary" id="addedToCart">Add To Cart</Button>
                  </Card.Body>
                </Card>
                </Col>
                </Row>
                <hr/>
              </div>
            )
          })}
      </Container>
    </div>
  );
};

export default ProductDetail;
