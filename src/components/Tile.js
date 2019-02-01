import React from 'react';


const Tile = (props)=> {

   return(
       <div className="tile" onClick={() => {
           console.log("click")
           props.renderProduct(props.product)}
       }>

{/* // <h2>{props.product.rating}</h2>
<h2>{props.product.brand}</h2>
<h2>{props.product.description}</h2>
<h2>{props.product.expected_price}</h2>
<h2>{props.product.color}</h2>
<h2>{props.product.model_year}</h2> */}
<img src={props.product.image} alt=""  />
<h2>{props.product.name}</h2>

         </div>
   )

}

export default Tile;