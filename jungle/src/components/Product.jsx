import useFetch from "./CustomHook/useFetch";
import { Accordion } from "react-bootstrap";


const ProductList = () => {
    var url = "https://jsonplaceholder.typicode.com/posts";

    const[data] = useFetch(url);

    return (
        <div>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Add Product</Accordion.Header>
                    <Accordion.Body>
                        <form>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="inputName">Name</label>
                                    <input type="email" class="form-control" id="inputPName" placeholder="Product Name"/>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="inputPrice">Price</label>
                                    <input type="number" class="form-control" id="inputPrice" placeholder="Product Price"/>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="inputStock">Stock</label>
                                    <input type="number" class="form-control" id="inputStock" placeholder="Product Stock"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputDescription">Description</label>
                                <input type="text" class="form-control" id="inputDescription" placeholder="Describe your Product..."/>
                            
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="availability" id="available" value="option1" checked/>
                                    <label class="form-check-label" for="available">
                                        Available
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="availability" id="notAvailable" value="option2"/>
                                    <label class="form-check-label" for="notAvailable">
                                        Not Available
                                    </label>
                                </div>
                            </div>
                            <div>
                                <button type="submit" class="btn btn-primary">Add Product</button>
                                <button type="reset" class="btn btn-primary">Reset</button>
                            </div>
                        </form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Product List</Accordion.Header>
                    <Accordion.Body>
                        <table class="table table-bordered table-dark table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">User ID</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Body</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data &&
                                    data.map((val, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{val.id}</td>
                                            <td>{val.userId}</td>
                                            <td>{val.title}</td>
                                            <td>{val.body}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default ProductList;