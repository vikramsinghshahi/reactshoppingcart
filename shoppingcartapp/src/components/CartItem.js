import React from 'react';

function CartItem(props) {
  return (
    <>
      <div className="cart-item">
        <img alt="" src={`/static/products/${props.sku}_2.jpg`} />
        <div className="card-item-details">
          <p className="card-item-name">{props.title}</p>
          <h5>
            {props.availableSizes[0]} | {props.style}
          </h5>
          <h5>Quantity:{props.quantity}</h5>
        </div>
        <div className="cart-price">
          <p onClick={() => props.deleteItem(props.id)} className="remove">
            X
          </p>
          <p className="price">{`${props.currencyFormat + props.price}`}</p>
          <span
            onClick={() => props.incrementQuantity(props.id)}
            className="cart-cross"
          >
            +
          </span>
          <span
            onClick={() => props.decrementQuantity(props.id)}
            className="cart-cross"
          >
            -
          </span>
        </div>
      </div>
    </>
  );
}

export default CartItem;