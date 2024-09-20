import useState from "react";
import NavigationBar from "./Navbar/NavigationBar";

const ProductList = () => {
    // const [product, setProduct] = useState(0);

    return (
        <div>
            <NavigationBar></NavigationBar>
            <hr/>
            <h1>All Products</h1>
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