import './App.css';
import Titel from './components/Title';
import MyStore from './components/MyStore';
import MyCart from './components/MyCart';

import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const items=[
    {id:'1',
    title:'product-1',
    price:20,
    },

    {
      id:'2',
      title:'product-2',
      price:30,
    },

    {
      id:'3',
      title:'product-3',
      price:13,
    },
  
    {
      id:'4',
      title:'product-4',
      price:7,
    },

    {
      id:'5',
      title:'product-5',
      price:15,
    },
  
    {
      id:'6',
      title:'product-6',
      price:25,
    },
  
    {
      id:'7',
      title:'product-7',
      price:10,
    },
  
    {
      id:'8',
      title:'product-8',
      price:35,
    },
  
    {
      id:'9',
      title:'product-9',
      price:5,
    },]



    const [itemsInCart, setItemsInCart] = useState([])

      // Ανάκτηση του καλαθιού από το localStorage κατά τη φόρτωση της σελίδας
        useEffect(() => {
          const storedItems = localStorage.getItem('itemsInCart');
          if (storedItems) {
            setItemsInCart(JSON.parse(storedItems));
          }
        }, []);

    const addToCart = (newItem) => {
      const itemAlreadyInCart = itemsInCart.find((item) => item.title === newItem.title);
      
    
      if (itemAlreadyInCart) {
        // Αν το στοιχείο υπάρχει, αυξήση της ποσότητα του
        itemAlreadyInCart.quantity += newItem.quantity;
        // itemAlreadyInCart.price =  newItem.price;
        console.log(itemAlreadyInCart.quantity)
      } else {
        // Αλλιώς, προσθέση του νέου στοιχείου στο itemsInCart
        setItemsInCart([...itemsInCart, newItem]);
      }
      console.log(itemsInCart)

      localStorage.setItem('itemsInCart', JSON.stringify(itemsInCart));
    };
  return (
    <div className="App">
      <div className='upper'>
        <Titel/>
        {/* <MyCart itemsInCart={itemsInCart}  setItemsInCart={setCartItems}/> */}
        <MyCart itemsInCart={itemsInCart} setItemsInCart={setItemsInCart} />


      </div>
      <MyStore items={items} addToCart={addToCart} >   </MyStore>
    </div>
  );
}

export default App;
