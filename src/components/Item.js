import { useState } from 'react';

const Item = (props) => {

    const [quantity, setQuantity] = useState(0);

    const handleAdd = () => {
        setQuantity(quantity + 1);
      };
    
      const handleRemove = () => {
        if (quantity > 0) {
          setQuantity(quantity - 1);
        }
      };

      const addToCart= () => {
        const newItem = {
            title: props.title,
            quantity: quantity,
            price: props.price,
        }
        props.addToCart(newItem);
      }

    return ( 
        <div className="item-wrapper">
            <p className="product-name">Product Name:{props.title}</p>
            <p className="price">Price:{props.price}</p>

            <div className="quantity-control">
                <button onClick={handleRemove} className='minus'>-</button>
                <span>{quantity}</span>
                <button onClick={handleAdd} className='plus'>+</button>
            </div>

            <button onClick={addToCart} className='add-to-cart-btn'>ADD TO CART</button>
        </div>

     );
}
 
export default Item;

