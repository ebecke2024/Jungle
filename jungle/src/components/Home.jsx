import Button from 'react-bootstrap/Button';
import ProductList from './Product';
import ProductDetail from './ProductDetail';

export default function Home() {
    return (
        <div>
            <ProductList></ProductList>
            <ProductDetail></ProductDetail>
        </div>
    );
}