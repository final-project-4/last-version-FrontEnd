import React from 'react';

const Categories = props => {
   return (
       <div className="categories" onClick={() => props.handleClick(props.category.id)}>
           <h2>{props.category.name}</h2>
       </div>
   )
   }
   export default Categories;