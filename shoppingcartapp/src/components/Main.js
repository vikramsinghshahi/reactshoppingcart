import Products from './Products';
import React from 'react';

function Main(props) {
  return (
    <>
      <div className="main flex-80">
        <Products
          data={props.products}
          selectedSizes={props.selectedSizes}
          handleAddToCart={props.handleAddToCart}
        />
      </div>
    </>
  );
}

export default Main;
