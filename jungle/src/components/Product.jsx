import useState from "react";
import NavigationBar from "./Navbar/NavigationBar";
import useFetch from "./CustomHook/useFetch";


const ProductList = () => {
    // const [product, setProduct] = useState(0);
    var url = "https://jsonplaceholder.typicode.com/posts";

    const[data] = useFetch(url);

    return (
        <div>
            <NavigationBar></NavigationBar>
            <hr/>
            <h1>All Products</h1>
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
            <hr/>
            <h1>Add Product</h1>
            <form>
                Product Name: <input type="text" name="pname"/>
                <br/>
                Product Price: <input type="text" name="pprice"/>
                <br/>
                Product Stock: <input type="text" name="pstock"/>
                <br/>
                Product Availability: <input type="text" name="pavailable"/>
                <br/>
                <button type="submit" value="submit">Submit</button>
                <button type="reset" value="reset">Reset</button>
            </form>
        </div>
    )
}

export default ProductList;