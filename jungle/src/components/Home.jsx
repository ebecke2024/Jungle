import Button from 'react-bootstrap/Button';
import ProductList from './Product';
import ProductDetail from './ProductDetail';

export default function Home() {
    return (
        <div>
            <Button variant="secondary">This is a Bootstrap Button</Button>
            <h1>This is the Home Page</h1>
            <ProductList></ProductList>
            <ProductDetail></ProductDetail>
        </div>
    );
}