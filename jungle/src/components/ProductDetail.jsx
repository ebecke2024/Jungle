import useFetch from "./CustomHook/useFetch";
import { Container } from "react-bootstrap";

const ProductDetail = () => {
    // var prod1 = document.getElementById('searchName').value;
    var prod1 = "Table";
    var url = "https://localhost:7080/filter/" + prod1;

    const[data] = useFetch(url);
    
    return (
        <div>
            <Container>
            <input type="text" placeholder="Enter Product Name" id="searchName"/>
            <table class="table table-bordered table-dark table-sm">
                <thead>
                    <tr>
                        <th scope="col">Product ID</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Product Category</th>
                        <th scope="col">Product Price</th>
                        <th scope="col">Product Inventory</th>
                        <th scope="col">Product Image</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.productId}</td>
                                <td>{val.productName}</td>
                                <td>{val.productCategory}</td>
                                <td>{val.productPrice}</td>
                                <td>{val.inventory}</td>
                                <td><img src={val.images} width="100px"/></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </Container>
        </div>
    )
}

export default ProductDetail;