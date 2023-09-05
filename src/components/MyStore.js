import Item from "./Item";

// const MyStore = (props) => {
//     return ( 
//         <div className="my-store-wrapper">
//             <Item 
//             id={props.items[0].id}
//             title={props.items[0].title}
//             price={props.items[0].price}
//             ></Item>

//             <Item 
//             id={props.items[1].id}
//             title={props.items[1].title}
//             price={props.items[1].price}
//             ></Item>

//             <Item 
//             id={props.items[2].id}
//             title={props.items[2].title}
//             price={props.items[2].price}
//             ></Item>

//             <Item 
//             id={props.items[3].id}
//             title={props.items[3].title}
//             price={props.items[3].price}
//             ></Item>

//             <Item 
//             id={props.items[4].id}
//             title={props.items[4].title}
//             price={props.items[4].price}
//             ></Item>

//             <Item 
//             id={props.items[5].id}
//             title={props.items[5].title}
//             price={props.items[5].price}
//             ></Item>

//             <Item 
//             id={props.items[6].id}
//             title={props.items[6].title}
//             price={props.items[6].price}
//             ></Item>
//         </div>
//      );
// }








const MyStore = (props) => {

    const addToCart = (item) => {
        props.addToCart(item);
      };
    return (
      <div className="my-store-wrapper">
        <div className="items-container">
          {props.items.map((item) => (
            <Item key={item.id} id={item.id} title={item.title} price={item.price} addToCart={addToCart}  />
          ))}
        </div>
      </div>
    );
  };
 
export default MyStore;




