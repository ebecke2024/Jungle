import { useState } from "react";
import useFetch from "./CustomHook/useFetch";
import { Card, Col, Container, Figure, Image, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  //var prod1 = document.getElementById('searchName').value;
  // var prod1 = "jeans";
  //var url = "https://localhost:7080/filter/" + prod1;

  // const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const url = `https://localhost:7080/api/Products/${id}`;
  // const [data] = useFetch(url); //Returns an array of JSON

  // prod1 = id;
  // const handleSearch = () => {
  //   setUrl(`https://localhost:7080/api/Products/${id}`);
  // };
  const [data] = useFetch(url);
  const dataArray = [];
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      dataArray.push([data[key]]);
    }
  }
  console.log( dataArray);

  return (
    <div>
      <Container>
        <hr/>
        <div>
          <Row>
            <Col>
          <Figure>
            <Figure.Image
              width={500}
              height={180}
              alt="171x180"
              src={dataArray[5]}
            />
          </Figure>
          </Col>
          <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{dataArray[1]}</Card.Title>
              <Card.Text>
                <p>Product ID: {dataArray[0]}</p>
                <p>Product Category: {dataArray[2]}</p>
                <p>Product Price: {dataArray[3]}</p>
                <p>Product Inventory: {dataArray[4]}</p>
              </Card.Text>
              <Button variant="primary" id="addedToCart">Add To Cart</Button>
            </Card.Body>
          </Card>
          </Col>
          </Row>
          <hr/>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetail;
