import React from 'react';

const ProductShow = props => {

   return (
       <div className= "we have to delete this">
       <div
         className="back"
         onClick={() => {
           props.setCurrentProduct(null);
         }}
       >
         back
       </div>
       <div className="container">
         <div className="Product">
           <div>
           <h2>{props.activeProduct.name}</h2>
           <img src={props.activeProduct.image} alt="" />
             <h4>Rating:<br></br>{props.activeProduct.rating} / 5 ✭</h4>
           </div>
           <div>
             <div className="Product-details">

             <p>{props.activeProduct.brand}</p>
               <p>Description:<br></br> {props.activeProduct.description}</p>
               <p>Expected Price: <br></br>{props.activeProduct.expected_price}</p>
               <p>Color:<br></br>{props.activeProduct.color}</p>
               <p>Model:<br></br>{props.activeProduct.model_year}</p>


               <div className="Product-buttons">
                 <button onClick={() => {props.toggleModal(props.activeProduct)}}>Edit</button>

                 <button onClick={() => {props.deleteShow(props.activeShow.id)}}>Delete</button>
                 {/* <button onClick={() => {props.deleteProduct(props.activeProduct.id)}}>Delete</button> */}
                 {/* <button onClick={() => {props.deleteProduct(props.toggleModal.id)}}>Delete</button> */}
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
  
   );
 };



   export default ProductShow;