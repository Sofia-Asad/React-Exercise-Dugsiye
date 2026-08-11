import { useState } from 'react';

const ShoppingCart = () => {
    const [products, setProducts] = useState([]); 
    const [name, setName] = useState(''); 
    const [price, setPrice] = useState('');

    const addProduct = () =>{
        if(name.trim() !== '' && price !== ''){
            const newProduct ={
                id: Date.now(), 
                name: name, 
                price: Number(price), 
                quantity: 1,
                
            }

            setProducts([...products, newProduct]);

            setName('')
            setPrice('')

        }
    }
    const increaseQuantity = (id) => {
        setProducts(products.map((product) => 
            product.id === id 
            ? { ...product, quantity: product.quantity + 1 } 
            : product)

        )
    }
    const decreaseQuantity = (id) => {
        setProducts(products.map((product) => 
            product.id === id && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 }
            : product )
        )
    }
    const removeProduct = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    }
    const totalPrice = products.reduce(
        (total, product) => total + product.price * product.quantity, 0);

        return(
            <div>
                <h2>Shopping Cart</h2> 

                <input type="text" value={name} onChange={(e) => setName(e.target.value)}placeholder="Product name" />

                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" /> 

                <button onClick={addProduct}>Add to Cart</button> 
                
                <h3>Products</h3> 

                <ul> {products.map((product) => (
                    <li key={product.id}> {product.name} - ${product.price} - Quantity: {product.quantity} 
                        <button onClick={() => increaseQuantity(product.id)}> + </button> 
                        <button onClick={() => decreaseQuantity(product.id)}> - </button><br /> 
                        <button onClick={() => removeProduct(product.id)}> Remove </button> 
                    </li> ))} 
                </ul> 
                    
                    <h3>Total: ${totalPrice}</h3>
            </div>
        )
    
}

export default ShoppingCart;