
import React, { useState, useEffect } from 'react';

const MyCart = (props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [discountMessage, setDiscountMessage] = useState("");
  const [finalTotal, setFinalTotal] = useState(0);




  // Χρησιμοποιούμε το useEffect για να παρακολουθούμε το itemsInCart και να ενημερώνουμε το localStorage
  useEffect(() => {
    // Αποθηκεύουμε το καλάθι στο localStorage όταν αλλάζει
    localStorage.setItem('itemsInCart', JSON.stringify(props.itemsInCart));
  }, [props.itemsInCart]);


  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeSidebar = () => {
    setIsCartOpen(false); 
  };

  const increaseQuantity = (itemIndex) => {
    const updatedItemsInCart = [...props.itemsInCart];
    updatedItemsInCart[itemIndex].quantity += 1;
    props.setItemsInCart(updatedItemsInCart);
    localStorage.setItem('itemsInCart', JSON.stringify(updatedItemsInCart));
  };

  const decreaseQuantity = (itemIndex) => {
    const updatedItemsInCart = [...props.itemsInCart];
    if (updatedItemsInCart[itemIndex].quantity > 0) {
      updatedItemsInCart[itemIndex].quantity -= 1;
      props.setItemsInCart(updatedItemsInCart);
      localStorage.setItem('itemsInCart', JSON.stringify(updatedItemsInCart));
    }
  };

  const removeItem = (titleToRemove) => {
    console.log(titleToRemove)
   
    const updatedItemsInCart = props.itemsInCart.filter((item) => item.title !== titleToRemove);
    props.setItemsInCart(updatedItemsInCart);
    localStorage.setItem('itemsInCart', JSON.stringify(updatedItemsInCart));
  };
  
  useEffect(() => {


  }, [props.itemsInCart]);



  useEffect(() => {
    let calculatedTotal = 0;
  
    props.itemsInCart.forEach((item) => {
      calculatedTotal += item.price * item.quantity;
    });
  
  if (calculatedTotal >= 100) {
    const discount = calculatedTotal * 0.1;
    const calculatedFinalTotal = calculatedTotal - discount;
  

    setDiscountMessage(`Έκπτωση 10% (${discount} €) εφαρμόστηκε στο συνολικό ποσό.`);
    setFinalTotal(calculatedFinalTotal);
  } else {
    setDiscountMessage("");
    setFinalTotal(0);
  }
  

    setTotal(calculatedTotal);
    localStorage.setItem('itemsInCart', JSON.stringify(props.itemsInCart));
  }, [props.itemsInCart])
  

  const handleBuyButtonClick = () => {
    // Δημιουργία του XML
    const xmlDoc = document.implementation.createDocument(null, 'basket');
    const basketElement = xmlDoc.documentElement;
  
    // Προσθέση των στοιχείων του καλαθιού στο XML
    props.itemsInCart.forEach((item) => {
      const productElement = xmlDoc.createElement('product');
      productElement.setAttribute('title', item.title);
      productElement.setAttribute('quantity', item.quantity);
      productElement.setAttribute('price', item.price);
  
      basketElement.appendChild(productElement);
    });
  
    // Μετατροπή του XML σε συμβολοσειρά
    const xmlString = new XMLSerializer().serializeToString(xmlDoc);
  

    console.log(xmlString);
  };
  

  return (
    <div className="my-cart-wrapper">
      <div className="my-cart">
        <button onClick={toggleCart}>My Cart</button>
      </div>
      {isCartOpen && (
        <div className="cart-sidebar">
          <button className='close-sidebar' onClick={closeSidebar}>X</button>

          <div className="my-total">
            <p>Total: {total}</p>
            {discountMessage && <p>{discountMessage}</p>}
            {finalTotal > 0 && <p>Final Total: {finalTotal}</p>}
          </div>



          <div className="list-of-items">
            {props.itemsInCart.map((item, index) => (
              <div className='one-item' key={index}>
                <button className='remove-item' onClick={() => removeItem(item.title)}>X</button>
                <p>Title: {item.title}</p>
                <div className="quantity-handle">
                  <button onClick={() => decreaseQuantity(index)}>-</button>
                  <p>Quantity: {item.quantity}</p>
                  <button onClick={() => increaseQuantity(index)}>+</button>
                </div>
                <p>Price: {item.price}</p>
              </div>
            ))}
          </div>
          <div className="buy">
            <button className='buy-button' onClick={handleBuyButtonClick}>Buy Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCart;

