import useFetch from "./CustomHook/useFetch";

const ProductDetail = () => {
    var url = "https://jsonplaceholder.typicode.com/photos";

    const[data] = useFetch(url);
    var prod1 = document.getElementById('searchName').value;
    
    return (
        <div>
            <input type="text" placeholder="Product Name" id="searchName"></input>
        </div>
    )
}

export default ProductDetail;